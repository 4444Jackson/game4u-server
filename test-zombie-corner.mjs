// 针对用户疑虑「改方解算会靠近障碍被弹挤」的专项测量。
// 对比 内切圆 moveCircle vs 轴对齐方块 moveBoxAxis 在三类角部场景下的「弹挤」表现：
//   (1) 凸角绕行：实体对角冲向单方块角，测单帧最大回弹 + 推出轴翻转次数
//   (2) 凹角嵌入：实体被推进 L 形凹兜，测是否过早被弹出来(离开兜口)
//   (3) 窄缝挤入：实体沿窄缝侧滑，测是否卡顿/异常回弹
// 关键：两套解算跑在同一组障碍与同一组驱动序列上（确定性），只换碰撞函数。
import { moveCircle, MAP, STEP } from './map-core.js';

const ZR = 0.9;
const clampv = (v, a, b) => Math.max(a, Math.min(b, v));

// 与生产一致的轴对齐方块解算（含确定性 tie-break：X 优先于 Z，避免轴翻转抖动）
function moveBoxAxis(obs, px, pz, nx, nz, hw, y = 0) {
  let x = nx, z = nz;
  for (let iter = 0; iter < 4; iter++) {
    let hnx = 0, hnz = 0, push = 0;
    for (const o of obs) {
      if (y >= o.t * STEP - 0.01) continue;
      const minx = o.x - o.w / 2 - hw, maxx = o.x + o.w / 2 + hw;
      const minz = o.z - o.d / 2 - hw, maxz = o.z + o.d / 2 + hw;
      if (x <= minx || x >= maxx || z <= minz || z >= maxz) continue;
      const dL = x - minx, dR = maxx - x, dD = z - minz, dU = maxz - z;
      const m = Math.min(dL, dR, dD, dU);
      let cnx, cnz;
      if (m === dL) { cnx = -1; cnz = 0; }
      else if (m === dR) { cnx = 1; cnz = 0; }
      else if (m === dD) { cnx = 0; cnz = -1; }
      else { cnx = 0; cnz = 1; }
      if (m > push) { push = m; hnx = cnx; hnz = cnz; }
    }
    if (push <= 0) break;
    x += hnx * push; z += hnz * push;
    let rx = nx - x, rz = nz - z;
    const dot = rx * hnx + rz * hnz;
    rx -= dot * hnx; rz -= dot * hnz;
    x += rx; z += rz;
    if (rx * rx + rz * rz < 1e-6) break;
  }
  return { x: clampv(x, -MAP + 1, MAP - 1), z: clampv(z, -MAP + 1, MAP - 1) };
}

// 返回每帧的 {corr: 回弹向量模, axis: 推出轴 'x'|'z'|''}（axis 仅方块解算有意义）
function drive(solver, obs, start, velFn, frames) {
  let x = start.x, z = start.z;
  let maxCorr = 0, sumCorr = 0, collFrames = 0, flips = 0;
  let lastAxis = '';
  const traj = [];
  for (let f = 0; f < frames; f++) {
    const v = velFn(f);
    const nx = x + v.dx, nz = z + v.dz;
    const c = solver(obs, x, z, nx, nz, ZR, 0);
    const corr = Math.hypot(c.x - nx, c.z - nz);
    let axis = '';
    if (corr > 1e-6) {
      // 推出轴由「解算后相对目标位移」的主分量判定
      const rx = c.x - nx, rz = c.z - nz;
      axis = Math.abs(rx) > Math.abs(rz) ? 'x' : 'z';
    }
    if (corr > maxCorr) maxCorr = corr;
    if (corr > 1e-6) { sumCorr += corr; collFrames++; if (axis && axis !== lastAxis && lastAxis) flips++; if (axis) lastAxis = axis; }
    x = c.x; z = c.z;
    traj.push([x, z]);
  }
  return { maxCorr, meanCorr: collFrames ? sumCorr / collFrames : 0, collFrames, flips, traj };
}

// —— 场景 1：凸角绕行（单方块，实体从 +x+z 对角冲向方块角）——
const box = [{ x: 0, z: 0, w: 2, d: 2, t: 1 }];
function approachCorner(f) {
  // 恒定朝方块角 (-x,-z 方向) 冲，模拟贴角滑行
  const dx = -0.15, dz = -0.15;
  return { dx, dz };
}
const c1 = {
  circle: drive(moveCircle, box, { x: 4, z: 4 }, approachCorner, 200),
  box: drive(moveBoxAxis, box, { x: 4, z: 4 }, approachCorner, 200),
};

// —— 场景 2：凹角嵌入（L 形凹兜，实体被推进角落，测是否被弹出来）——
// 横墙 z=5(挡 z>4.5)、竖墙 x=5(挡 x>4.5)，凹兜在 x<4.5,z<4.5，内角 (4.5,4.5)
const niche = [
  { x: 0, z: 5, w: 12, d: 1, t: 1 },
  { x: 5, z: 0, w: 1, d: 12, t: 1 },
];
function pushIntoNiche(f) { return { dx: 0.12, dz: 0.12 }; } // 朝内角推
function inPocket(x, z) { return x < 4.5 && z < 4.5; }
function nicheTest(solver) {
  const r = drive(solver, niche, { x: 2.5, z: 2.5 }, pushIntoNiche, 200);
  let leftPocket = 0;
  for (const [x, z] of r.traj) if (!inPocket(x, z)) leftPocket++;
  return { ...r, leftPocket };
}
const c2 = { circle: nicheTest(moveCircle), box: nicheTest(moveBoxAxis) };

// —— 场景 3：窄缝侧滑（两平行墙留 3.0 宽缝，实体沿缝滑过）——
const gap = [
  { x: 0, z: 2, w: 20, d: 1, t: 1 },
  { x: 0, z: -2, w: 20, d: 1, t: 1 },
];
function slideGap(f) { return { dx: 0.18, dz: 0 }; } // 纯沿 x 滑，z 居中=0 刚好在缝中
const c3 = {
  circle: drive(moveCircle, gap, { x: -8, z: 0 }, slideGap, 200),
  box: drive(moveBoxAxis, gap, { x: -8, z: 0 }, slideGap, 200),
};

console.log('=== 方解算「弹挤」专项测量（圆 vs 方块，同场景同序列）===\n');
const fmt = (r) => `maxCorr=${r.maxCorr.toFixed(4)}m  meanCorr=${r.meanCorr.toFixed(4)}m  collFrames=${r.collFrames}  axisFlips=${r.flips}`;
console.log('【场景1 凸角绕行】实体 (4,4) 对角冲向方块角');
console.log('  圆  :', fmt(c1.circle));
console.log('  方块:', fmt(c1.box));
console.log(`  → 方块单帧最大回弹 ${c1.box.maxCorr > c1.circle.maxCorr ? '略大' : '≤'} 圆；轴翻转 ${c1.box.flips} 次（圆无此概念）\n`);

console.log('【场景2 凹角嵌入】实体 (2.5,2.5) 被推入 L 形凹兜，测是否过早弹出来');
console.log('  圆  :', fmt(c2.circle), ` leftPocket=${c2.circle.leftPocket}`);
console.log('  方块:', fmt(c2.box), ` leftPocket=${c2.box.leftPocket}`);
console.log(`  → leftPocket=离开兜口帧数；方块 ${c2.box.leftPocket > c2.circle.leftPocket ? '更多(更易被弹出来)' : '≤'} 圆\n`);

console.log('【场景3 窄缝侧滑】缝宽3.0，实体沿缝纯 x 滑');
console.log('  圆  :', fmt(c3.circle));
console.log('  方块:', fmt(c3.box));
console.log(`  → 方块侧滑回弹 ${c3.box.meanCorr > 0.02 ? '明显' : '可忽略'}\n`);

console.log('=== 结论 ===');
const benign = c1.box.maxCorr <= c1.circle.maxCorr + 0.02 && c2.box.leftPocket <= c2.circle.leftPocket + 5 && c3.box.meanCorr < 0.02;
console.log(benign
  ? '✅ 方块解算未引入显著弹挤：最大回弹≤圆、未更易被弹离凹兜、侧滑回弹可忽略。'
  : '⚠️ 方块解算出现可感知弹挤，需重新评估（考虑回退解算或改用外切圆/缩尺寸）。');
