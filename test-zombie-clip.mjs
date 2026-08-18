// 量化僵尸「视觉方块穿模」深度：验证根因是否为「移动用圆(内切) vs 渲染/受击用轴对齐方块」的口径差。
//
// 几何推导（待验证）：moveCircle 只保证 中心→障碍最近点 >= ZR(0.9)。
// 僵尸渲染/受击是轴对齐方块(半边长 0.9)。当中心相切于障碍【角】且呈 45° 时，
// 方块角插入最深 = ZR*(1 - 1/√2) = 0.9*0.2929 ≈ 0.2636 m。
// 若实测最大穿透 ≈ 0.264 → 解算本身正确，穿模纯粹是口径差（不是卡死、不是解算失败）。
// 若实测显著 > 0.264 → 另有 bug（y 门控/clampv 破坏解算/生成点即重叠）。

import { Sim } from './sim-core.js';

const ZR = 0.9;          // 僵尸半边长（渲染 1.8×1.8 / 受击 obbOverlap 同值）
const STEP = 1.5;

// 僵尸轴对齐方块 vs 障碍 AABB 的穿透深度（XZ 平面，仅统计地面僵尸 y≈0）
function boxPenetration(o, zx, zz) {
  const oMinX = o.x - o.w / 2, oMaxX = o.x + o.w / 2;
  const oMinZ = o.z - o.d / 2, oMaxZ = o.z + o.d / 2;
  const zMinX = zx - ZR, zMaxX = zx + ZR;
  const zMinZ = zz - ZR, zMaxZ = zz + ZR;
  const ovX = Math.min(zMaxX, oMaxX) - Math.max(zMinX, oMinX);
  const ovZ = Math.min(zMaxZ, oMaxZ) - Math.max(zMinZ, oMinZ);
  if (ovX <= 0 || ovZ <= 0) return 0;
  return Math.min(ovX, ovZ);          // 标准 AABB 最小穿透深度
}

// 圆(移动碰撞口径)是否重叠 —— 用于区分「解算失败」与「纯口径差」
function circlePenetration(o, zx, zz) {
  const cx = Math.max(o.x - o.w / 2, Math.min(zx, o.x + o.w / 2));
  const cz = Math.max(o.z - o.d / 2, Math.min(zz, o.z + o.d / 2));
  const dx = zx - cx, dz = zz - cz;
  const d = Math.hypot(dx, dz);
  return d < ZR ? ZR - d : 0;
}

const ROUNDS = 40, SECONDS = 40, DT = 1 / 60;
let boxMax = 0, circMax = 0;
let boxFrames = 0, circFrames = 0, totalFrames = 0;
const hist = new Map();                 // 穿透深度分布（0.05 分桶）
const modeCount = { wander: 0, chase: 0 };
let spawnOverlapBox = 0, spawnOverlapCirc = 0, spawnTotal = 0;
const samples = [];

for (let r = 0; r < ROUNDS; r++) {
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('wave', 3, {});
  const p = sim.state.players['p1'];
  const seen = new Set();

  // 玩家随机游走（钉死不动会让僵尸围攻停下，污染统计）
  let wa = Math.random() * Math.PI * 2, wt = 0;

  for (let t = 0; t < SECONDS; t += DT) {
    wt -= DT;
    if (wt <= 0) { wt = 1 + Math.random() * 2; wa = Math.random() * Math.PI * 2; }
    p.x = Math.max(-36, Math.min(36, p.x + Math.sin(wa) * 6 * DT));
    p.z = Math.max(-36, Math.min(36, p.z + Math.cos(wa) * 6 * DT));

    sim.step(DT);
    const obs = sim.state.obstacles || [];

    for (const z of sim.state.zombies) {
      if (z.k === 'flyer') continue;                 // flyer 巡航穿障是设计语义，不计
      if ((z.y || 0) > 0.1) continue;                // 仅地面态

      // 生成瞬间（首次见到该 id）单独统计
      if (!seen.has(z.id)) {
        seen.add(z.id);
        spawnTotal++;
        let sb = 0, sc = 0;
        for (const o of obs) {
          if ((z.y || 0) >= o.t * STEP - 0.01) continue;
          sb = Math.max(sb, boxPenetration(o, z.x, z.z));
          sc = Math.max(sc, circlePenetration(o, z.x, z.z));
        }
        if (sb > 1e-6) spawnOverlapBox++;
        if (sc > 1e-6) spawnOverlapCirc++;
      }

      totalFrames++;
      let bp = 0, cp = 0, worstObs = null;
      for (const o of obs) {
        if ((z.y || 0) >= o.t * STEP - 0.01) continue;   // 顶面之上不挡（与 moveCircle 同判据）
        const b = boxPenetration(o, z.x, z.z);
        if (b > bp) { bp = b; worstObs = o; }
        cp = Math.max(cp, circlePenetration(o, z.x, z.z));
      }
      if (bp > 1e-6) {
        boxFrames++;
        if (bp > boxMax) boxMax = bp;
        const bucket = (Math.floor(bp / 0.05) * 0.05).toFixed(2);
        hist.set(bucket, (hist.get(bucket) || 0) + 1);
        // 该帧 walker 处于「看不见→游荡」还是「看得见→直冲」：用 wt/wa 是否活跃近似
        if (z.k === 'walker') {
          if ((z.wt || 0) > 0) modeCount.wander++; else modeCount.chase++;
        }
        if (samples.length < 8 && bp > 0.15) {
          samples.push(`k=${z.k} 穿透=${bp.toFixed(3)} 圆穿透=${cp.toFixed(3)} z=(${z.x.toFixed(2)},${z.z.toFixed(2)}) obs=(${worstObs.x.toFixed(1)},${worstObs.z.toFixed(1)},w${worstObs.w},d${worstObs.d})`);
        }
      }
      if (cp > 1e-6) { circFrames++; if (cp > circMax) circMax = cp; }
    }
  }
}

const theo = ZR * (1 - 1 / Math.SQRT2);
console.log('=== 僵尸穿模量化（方块口径 vs 圆口径）===');
console.log(`采样帧: ${totalFrames}`);
console.log('');
console.log('【方块口径】渲染/受击（半边长 0.9，轴对齐）');
console.log(`  穿模帧: ${boxFrames} (${(boxFrames / totalFrames * 100).toFixed(1)}%)`);
console.log(`  最大穿透: ${boxMax.toFixed(4)} m`);
console.log(`  内切圆口径下的几何上限 ZR*(1-1/√2) = ${theo.toFixed(4)} m（回归基线：曾实测 0.2636）`);
console.log(`  判定: ${boxMax < 0.005
  ? '✅ 穿模归零 → 移动已用方块口径(moveBoxAxis)，与渲染/受击同口径'
  : boxMax <= theo + 0.005
    ? '❌ 退回内切圆口径(moveCircle)：方块角外伸导致斜贴滑行时持续穿模'
    : '❌ 超出几何上限 → 另有解算 bug'}`);
console.log('');
console.log('【圆口径】移动碰撞（半径 0.9）');
console.log(`  重叠帧: ${circFrames} (${(circFrames / totalFrames * 100).toFixed(2)}%)`);
console.log(`  最大重叠: ${circMax.toFixed(4)} m  ${circMax < 0.01 ? '✅ 圆几乎从不嵌入 → 解算/兜底无需修' : '⚠️ 圆也嵌入 → 解算确有失败'}`);
console.log('');
console.log('【生成瞬间】');
console.log(`  样本: ${spawnTotal}  方块重叠: ${spawnOverlapBox} (${(spawnOverlapBox / spawnTotal * 100).toFixed(1)}%)  圆重叠: ${spawnOverlapCirc} (${(spawnOverlapCirc / spawnTotal * 100).toFixed(1)}%)`);
console.log('');
console.log('【walker 穿模时所处模式】');
console.log(`  游荡(看不见): ${modeCount.wander}   直冲(看得见): ${modeCount.chase}`);
console.log('');
console.log('【穿透深度分布】');
[...hist.entries()].sort((a, b) => +a[0] - +b[0]).forEach(([k, v]) => {
  console.log(`  ${k}~${(+k + 0.05).toFixed(2)}m: ${'#'.repeat(Math.max(1, Math.round(v / Math.max(1, boxFrames) * 60)))} ${v}`);
});
console.log('');
console.log('【抽样】');
samples.forEach((s) => console.log('  ' + s));
