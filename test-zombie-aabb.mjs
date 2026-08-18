// 实验：僵尸移动碰撞口径「内切圆(现状) vs 轴对齐方块 AABB(候选)」对比。
// 不修改生产代码——本脚本复刻 stepZombie 的地面僵尸移动，仅替换碰撞解算器。
//
// 背景（已由 test-zombie-clip.mjs 实测坐实）：
//   moveCircle 保证 中心→障碍最近点 >= ZR，圆重叠恒为 0（解算无误、僵尸不会卡死）。
//   但渲染/受击是【轴对齐方块 半边长 ZR】，方块角比内切圆多外伸 ZR*(1-1/√2)≈0.264m，
//   斜贴障碍滑行时该角持续插入 → 肉眼「半身穿模」。
//
// 候选修法：移动也用轴对齐方块(AABB vs AABB，Minkowski 化为「点 vs 膨胀矩形」)，
//   与渲染/受击同口径 → 穿模应归零，且不像「改用外接圆」那样在正面贴墙留间隙。
// 待验证风险：AABB 推出是轴对齐的，圆能滑过的锐角/内角，方块可能来回振荡卡住
//   （moveCircle 注释明确写了「圆天然能滑过锐角」）。故必须量化卡死率与接近能力。

import { genObstacles, buildGrid, hasLOS, findPath, moveCircle, MAP, STEP } from './map-core.js';

const ZR = 0.9;
const clampv = (v, a, b) => Math.max(a, Math.min(b, v));

// —— 候选解算：轴对齐方块 AABB。与 moveCircle 同构的 trace-and-slide，
//    仅把「圆 vs AABB 最近点」换成「点 vs 膨胀 AABB」（Minkowski 和，精确等价 AABB vs AABB）。
function moveBoxAxis(obs, px, pz, nx, nz, hw, y = 0) {
  let x = nx, z = nz;
  for (let iter = 0; iter < 4; iter++) {
    let hnx = 0, hnz = 0, push = 0;
    for (const o of obs) {
      if (y >= o.t * STEP - 0.01) continue;
      const minx = o.x - o.w / 2 - hw, maxx = o.x + o.w / 2 + hw;
      const minz = o.z - o.d / 2 - hw, maxz = o.z + o.d / 2 + hw;
      if (x <= minx || x >= maxx || z <= minz || z >= maxz) continue;   // 未落入膨胀矩形 → 不重叠
      const dL = x - minx, dR = maxx - x, dD = z - minz, dU = maxz - z;
      const m = Math.min(dL, dR, dD, dU);                              // 最小穿透轴
      let cnx, cnz;
      if (m === dL) { cnx = -1; cnz = 0; }
      else if (m === dR) { cnx = 1; cnz = 0; }
      else if (m === dD) { cnx = 0; cnz = -1; }
      else { cnx = 0; cnz = 1; }
      if (m > push) { push = m; hnx = cnx; hnz = cnz; }
    }
    if (push <= 0) break;
    x += hnx * push; z += hnz * push;                                  // 顶出到刚好相切
    let rx = nx - x, rz = nz - z;                                      // 剩余位移投影到碰撞面切线（滑动）
    const dot = rx * hnx + rz * hnz;
    rx -= dot * hnx; rz -= dot * hnz;
    x += rx; z += rz;
    if (rx * rx + rz * rz < 1e-6) break;
  }
  return { x: clampv(x, -MAP + 1, MAP - 1), z: clampv(z, -MAP + 1, MAP - 1) };
}

// 僵尸轴对齐方块(渲染/受击口径) vs 障碍 AABB 的穿透深度
function boxPenetration(o, zx, zz) {
  const ovX = Math.min(zx + ZR, o.x + o.w / 2) - Math.max(zx - ZR, o.x - o.w / 2);
  const ovZ = Math.min(zz + ZR, o.z + o.d / 2) - Math.max(zz - ZR, o.z - o.d / 2);
  if (ovX <= 0 || ovZ <= 0) return 0;
  return Math.min(ovX, ovZ);
}

// 确定性随机：两套解算跑在完全相同的地图与行为序列上
let seed = 20260818;
const lcg = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

const DT = 1 / 60, SECONDS = 40, ROUNDS = 30, NZ = 22;
const ZSPEED = 3.2;   // 与 ZSTAT walker 同量级即可（本实验只比较解算器差异）

function run(solverName, solver) {
  seed = 20260818;                       // 每套解算复位种子 → 相同地图/序列
  const realRandom = Math.random;
  Math.random = lcg;                     // 劫持：让 genObstacles 也确定性

  let boxFrames = 0, boxMax = 0, totalFrames = 0;
  let stuckEvents = 0, distSum = 0, distN = 0;

  try {
    for (let r = 0; r < ROUNDS; r++) {
      const obs = genObstacles(24);
      const grid = buildGrid(obs);
      const player = { x: 0, z: 0, y: 0, alive: true };
      let pwa = lcg() * Math.PI * 2, pwt = 0;

      // 沿围墙边缘生成（与 _spawnZombie 同口径 ZEDGE = MAP-1-ZR-0.3）
      const ZEDGE = MAP - 1 - ZR - 0.3;
      const zs = [];
      for (let i = 0; i < NZ; i++) {
        const side = Math.floor(lcg() * 4), t = (lcg() * 2 - 1) * ZEDGE;
        const pos = side === 0 ? { x: t, z: -ZEDGE } : side === 1 ? { x: t, z: ZEDGE }
          : side === 2 ? { x: -ZEDGE, z: t } : { x: ZEDGE, z: t };
        zs.push({
          id: i, k: i % 3 === 1 ? 'seeker' : 'walker', x: pos.x, z: pos.z, y: 0,
          speed: ZSPEED, wt: 0, wa: 0, pt: 0, path: null, stillFrames: 0,
        });
      }

      for (let t = 0; t < SECONDS; t += DT) {
        pwt -= DT;
        if (pwt <= 0) { pwt = 1 + lcg() * 2; pwa = lcg() * Math.PI * 2; }
        player.x = clampv(player.x + Math.sin(pwa) * 6 * DT, -36, 36);
        player.z = clampv(player.z + Math.cos(pwa) * 6 * DT, -36, 36);

        for (const z of zs) {
          const ox = z.x, oz = z.z;
          let dir = null;

          if (z.k === 'seeker') {
            z.pt -= DT;
            if (z.pt <= 0 || !z.path || !z.path.length) {
              z.pt = 0.6;
              z.path = findPath(grid, z.x, z.z, player.x, player.z) || [];
            }
            if (z.path.length && Math.hypot(z.path[0].x - z.x, z.path[0].z - z.z) < 1.0) z.path.shift();
            const wp = z.path[0];
            dir = wp ? Math.atan2(wp.x - z.x, wp.z - z.z) : Math.atan2(player.x - z.x, player.z - z.z);
          } else if (hasLOS(obs, z.x, z.z, player.x, player.z)) {
            dir = Math.atan2(player.x - z.x, player.z - z.z);
          } else {
            z.wt -= DT;
            if (z.wt <= 0) { z.wt = 1.5 + lcg() * 2; z.wa = lcg() * Math.PI * 2; }
            const st = z.speed * 0.45 * DT;
            const c = solver(obs, z.x, z.z, z.x + Math.sin(z.wa) * st, z.z + Math.cos(z.wa) * st, ZR, 0);
            z.x = clampv(c.x, -MAP + 1, MAP - 1); z.z = clampv(c.z, -MAP + 1, MAP - 1);
          }

          if (dir !== null) {
            const c = solver(obs, z.x, z.z, z.x + Math.sin(dir) * z.speed * DT, z.z + Math.cos(dir) * z.speed * DT, ZR, 0);
            z.x = clampv(c.x, -MAP + 1, MAP - 1); z.z = clampv(c.z, -MAP + 1, MAP - 1);
          }

          // 穿模统计（渲染/受击方块口径）
          totalFrames++;
          let bp = 0;
          for (const o of obs) {
            if (o.t * STEP - 0.01 <= 0) continue;
            const b = boxPenetration(o, z.x, z.z);
            if (b > bp) bp = b;
          }
          if (bp > 1e-6) { boxFrames++; if (bp > boxMax) boxMax = bp; }

          // 卡死统计：净位移极小且离玩家尚远(非围攻抖动) → 连续 60 帧记一次
          const moved = Math.hypot(z.x - ox, z.z - oz);
          const dp = Math.hypot(player.x - z.x, player.z - z.z);
          if (moved < 0.005 && dp > 3) {
            z.stillFrames++;
            if (z.stillFrames === 60) stuckEvents++;
          } else z.stillFrames = 0;

          distSum += dp; distN++;
        }
      }
    }
  } finally {
    Math.random = realRandom;
  }

  return {
    solverName,
    clipPct: boxFrames / totalFrames * 100,
    boxMax,
    stuckEvents,
    avgDist: distSum / distN,
    totalFrames,
  };
}

const A = run('内切圆 moveCircle (现状)', moveCircle);
const B = run('轴对齐方块 moveBoxAxis (候选)', moveBoxAxis);

console.log('=== 僵尸移动碰撞口径对比（相同地图/序列，确定性随机）===');
console.log(`采样帧: ${A.totalFrames} / ${B.totalFrames}\n`);
for (const r of [A, B]) {
  console.log(`【${r.solverName}】`);
  console.log(`  视觉方块穿模帧: ${r.clipPct.toFixed(2)}%   最大穿透: ${r.boxMax.toFixed(4)} m`);
  console.log(`  卡死事件(净位移≈0 连续1s 且距玩家>3m): ${r.stuckEvents}`);
  console.log(`  平均距玩家: ${r.avgDist.toFixed(2)} m（越小=越能正常接近，用于检测是否被卡在角落）`);
  console.log('');
}
console.log('=== 结论 ===');
console.log(`穿模: ${A.clipPct.toFixed(2)}% → ${B.clipPct.toFixed(2)}%  ${B.clipPct < 0.01 ? '✅ 归零' : B.clipPct < A.clipPct ? '⬇ 下降' : '❌ 未改善'}`);
console.log(`卡死: ${A.stuckEvents} → ${B.stuckEvents}  ${B.stuckEvents <= A.stuckEvents ? '✅ 未恶化' : `⚠️ 增加 ${B.stuckEvents - A.stuckEvents}（AABB 轴对齐推出在内角振荡）`}`);
console.log(`接近能力: ${A.avgDist.toFixed(2)}m → ${B.avgDist.toFixed(2)}m  ${B.avgDist <= A.avgDist + 0.5 ? '✅ 未明显变差' : '⚠️ 变差（可能被障碍挡更多）'}`);
