// 玩家穿模专项测量：玩家可视/受击是【随 aim 旋转】的方块(OBB)，移动却是圆柱(moveCircle)
// 目的：量出旋转方块相对「边界墙」「interior 障碍」的真实穿入深度，并评估改用 OBB 解算的可行性
import { MAP, WALL_T, BOUND_INNER, STEP, genObstacles, stepPlayerPhysics, WALL_CLEAR } from './map-core.js';

const PR = 0.6;                       // PLAYER_HW：玩家半边长（可视方块底面 1.2）
const f = (v) => v.toFixed(4);
const DIAG = PR * Math.SQRT2;         // 方块外接圆半径 = 对角半长

console.log(`玩家半边长=${PR}  可视方块=${PR * 2}×${PR * 2}  外接圆半径(对角半长)=${f(DIAG)}`);
console.log(`场地 MAP=${MAP}  墙内侧面 BOUND_INNER=${BOUND_INNER}`);
console.log('');

// ---------- 1. 边界墙：yaw 扫描，量旋转方块越墙深度 ----------
// 圆柱移动被 clampBound(radius=0.6) 夹住 → 圆心最远 BOUND_INNER-0.6=36.9
// 但方块随 yaw 转，其在 X 轴的投影半宽 = PR*(|cos|+|sin|)，yaw=45° 时达 0.8485
console.log('=== 1. 边界墙：玩家贴墙时不同朝向的越墙深度 ===');
const cx = BOUND_INNER - PR;          // 圆柱夹取后的圆心极限位置
let worstYaw = 0, worstPoke = -1e9;
for (let deg = 0; deg <= 90; deg += 15) {
  const yaw = deg * Math.PI / 180;
  const proj = PR * (Math.abs(Math.cos(yaw)) + Math.abs(Math.sin(yaw)));  // OBB 在 X 轴投影半宽
  const poke = cx + proj - BOUND_INNER;
  if (poke > worstPoke) { worstPoke = poke; worstYaw = deg; }
  console.log(`  yaw=${String(deg).padStart(2)}°  投影半宽=${f(proj)}  方块外缘=${f(cx + proj)}  越墙=${f(poke)}m  ${poke > 1e-6 ? '❌' : '✅'}`);
}
console.log(`  → 最坏 yaw=${worstYaw}°，越墙 ${f(worstPoke)}m（理论 PR*(√2-1)=${f(PR * (Math.SQRT2 - 1))}）`);
console.log('');

// ---------- 2. SAT：OBB(玩家) vs AABB(障碍) 最小穿透深度 ----------
function obbAabbPoke(px, pz, half, yaw, o) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const ux = c, uz = s, vx = -s, vz = c;          // OBB 两轴
  const ow = o.w / 2, od = o.d / 2;
  const dx = px - o.x, dz = pz - o.z;
  const axes = [[1, 0], [0, 1], [ux, uz], [vx, vz]];
  let minOv = Infinity;
  for (const [ax, az] of axes) {
    const rA = Math.abs(ax) * ow + Math.abs(az) * od;                       // AABB 投影半径
    const rB = half * (Math.abs(ax * ux + az * uz) + Math.abs(ax * vx + az * vz)); // OBB 投影半径
    const d = Math.abs(dx * ax + dz * az);
    const ov = rA + rB - d;
    if (ov <= 0) return 0;                        // 该轴分离 → 不相交
    if (ov < minOv) minOv = ov;
  }
  return minOv;
}

// ---------- 3. 真实 stepPlayerPhysics 压测 ----------
const obs = genObstacles(24);
const dt = 1 / 60, SECS = 120, SPD = 6;
const opts = { spd: SPD, radius: PR, supR: Math.min(0.25, PR * 0.5), jumpV: 9.5, gravity: 24, coyote: 0.10, fireInterval: 0.15 };

let maxWall = 0, maxObs = 0, nWall = 0, nObs = 0, samples = 0;
let wallCase = null, obsCase = null;

for (let k = 0; k < 8; k++) {                     // 8 个玩家各跑一遍，覆盖更多墙面/障碍
  const p = { x: (Math.random() - 0.5) * 20, z: (Math.random() - 0.5) * 20, y: 0, vy: 0, aim: Math.random() * 6.28, grounded: true, coyoteT: 0, jumpBuf: 0, fireCd: 0 };
  let mx = 1, mz = -1, turn = 0;
  for (let i = 0; i < SECS / dt; i++) {
    if (i % 25 === 0) { mx = Math.random() * 2 - 1; mz = Math.random() * 2 - 1; }
    turn += (Math.random() - 0.5) * 0.35;         // 持续转向：覆盖全部 yaw
    const yaw = turn;
    stepPlayerPhysics(p, { mx, mz, ax: Math.sin(yaw), az: Math.cos(yaw), fire: false }, dt, obs, opts);
    if (p.y > 0.1) continue;                      // 只统计地面层（跳上障碍顶不算穿模）
    samples++;
    // 边界墙：取 X/Z 两轴投影
    const projX = PR * (Math.abs(Math.cos(p.aim)) + Math.abs(Math.sin(p.aim)));
    const wp = Math.max(Math.abs(p.x), Math.abs(p.z)) + projX - BOUND_INNER;
    if (wp > 1e-6) { nWall++; if (wp > maxWall) { maxWall = wp; wallCase = { x: +f(p.x), z: +f(p.z), yawDeg: +((p.aim * 180 / Math.PI) % 360).toFixed(1) }; } }
    // interior 障碍
    for (const o of obs) {
      if ((o.t || 0) * STEP <= 0.1) continue;
      const pk = obbAabbPoke(p.x, p.z, PR, p.aim, o);
      if (pk > 1e-6) { nObs++; if (pk > maxObs) { maxObs = pk; obsCase = { x: +f(p.x), z: +f(p.z), yawDeg: +((p.aim * 180 / Math.PI) % 360).toFixed(1), o: { x: o.x, z: o.z, w: o.w, d: o.d } }; } break; }
    }
  }
}

console.log(`=== 2. 真实 stepPlayerPhysics 压测（8 玩家 × ${SECS}s，${samples} 样本）===`);
console.log(`  边界墙    越墙样本=${nWall}  最大越墙=${f(maxWall)}m  ${maxWall > 0.01 ? '❌ 有穿模' : '✅'}`);
if (wallCase) console.log(`            最坏案例: ${JSON.stringify(wallCase)}`);
console.log(`  interior  嵌入样本=${nObs}  最大嵌入=${f(maxObs)}m  ${maxObs > 0.01 ? '❌ 有穿模' : '✅'}`);
if (obsCase) console.log(`            最坏案例: ${JSON.stringify(obsCase)}`);
console.log('');

// ---------- 4. 若改用 OBB 解算：窄通道可行性 ----------
console.log('=== 3. 假设改用 OBB 解算：窄通道几何可行性 ===');
const corridor = BOUND_INNER - PR - (MAP - WALL_CLEAR - 2 - 0);  // 参考注释口径，直接用已知可走带
const CORR = 1.3;                                  // map-core.js:48-49 注释：墙↔障碍通道中心可走带 1.3m
console.log(`  已知最窄通道可走带 = ${CORR}m（墙↔障碍，见 map-core.js:48 注释）`);
console.log(`  玩家圆柱直径       = ${f(PR * 2)}m  → 圆柱解算：${PR * 2 <= CORR ? '✅ 能过' : '❌ 过不去'}（旋转无关，任意朝向都能过）`);
console.log(`  玩家方块对角线     = ${f(DIAG * 2)}m  → OBB 解算：${DIAG * 2 <= CORR ? '✅ 能过' : '❌ 转身即卡死'}`);
// 通道内允许的最大 yaw：投影半宽 ≤ 通道半宽
const halfCorr = CORR / 2;
let maxDeg = 0;
for (let deg = 0; deg <= 45; deg += 0.5) {
  const yaw = deg * Math.PI / 180;
  if (PR * (Math.abs(Math.cos(yaw)) + Math.abs(Math.sin(yaw))) <= halfCorr) maxDeg = deg;
}
console.log(`  OBB 解算下，通道内玩家最多只能转 ±${maxDeg}°（超出则方块两侧同时嵌墙 → 几何无解，必被卡死或弹飞）`);
