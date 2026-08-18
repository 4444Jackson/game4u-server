// 边界墙 + interior 障碍双重穿模验证（离线跑真实 map-core，不依赖运行中的服务）
// 之前的探针只量 snap.map 里的 interior 障碍，边界墙不在该列表 → 漏测了边界穿模。
import { MAP, WALL_T, BOUND_INNER, STEP, genObstacles, buildGrid, stepZombie, moveCircle, moveBoxAxis, ZSTAT } from './map-core.js';

const ZR = 0.9, PR = 0.6;
const f = (v) => v.toFixed(4);

console.log(`场地 MAP=${MAP}  墙厚 WALL_T=${WALL_T}  墙内侧面 BOUND_INNER=${BOUND_INNER}`);
console.log('');

// ---------- 1. 单元级：把实体硬推向边界外，看夹取后外缘落在哪 ----------
console.log('=== 1. 边界夹取单元测试（目标点设在墙外 999m，看夹到哪）===');
for (const [name, half, fn] of [['僵尸 moveCircle', ZR, moveCircle], ['僵尸 moveBoxAxis', ZR, moveBoxAxis], ['玩家 moveCircle', PR, moveCircle]]) {
  const r = fn([], 0, 0, 999, 999, half, 0);
  const edge = r.x + half;                       // 方块外缘位置
  const poke = edge - BOUND_INNER;               // >0 = 越过墙内侧面 = 穿墙
  console.log(`${name.padEnd(18)} 中心=${f(r.x)}  外缘=${f(edge)}  越墙=${f(poke)}m  ${poke > 1e-6 ? '❌ 穿墙' : '✅ 相切/内侧'}`);
}
console.log('');

// ---------- 2. AI 级：跑真实 stepZombie，统计边界间隙 & interior 嵌入 ----------
const obs = genObstacles(24);
const grid = buildGrid(obs);
const players = { p1: { x: 0, z: 0, y: 0, aim: 0, alive: true } };

// 僵尸沿四边生成（复刻 sim-core._spawnZombie 的边缘出生），只测地面 walker（用户看到的绿僵尸）
const zombies = [];
for (let i = 0; i < 40; i++) {
  const S = BOUND_INNER - ZR - 0.3;
  const e = i % 4;
  let x, z;
  if (e === 0) { x = -S + Math.random() * 2 * S; z = -S; }
  else if (e === 1) { x = -S + Math.random() * 2 * S; z = S; }
  else if (e === 2) { x = -S; z = -S + Math.random() * 2 * S; }
  else { x = S; z = -S + Math.random() * 2 * S; }
  zombies.push({
    id: i, k: 'walker', x, z, y: 0,
    hp: ZSTAT.walker.hp, speed: 3.2 * ZSTAT.walker.spd,
    atkCd: 0, wt: 0, wa: Math.random() * Math.PI * 2, pt: 0, path: []
  });
}

// 边界间隙：正=离墙还有余量，负=方块外缘越过墙内侧面（穿墙）
const wallGap = (zz, half) => BOUND_INNER - Math.max(Math.abs(zz.x), Math.abs(zz.z)) - half;
// interior 嵌入：两轴都重叠才算，取较小穿透轴（AABB vs AABB）
function obsPoke(zz, half) {
  let worst = 0;
  for (const o of obs) {
    if (zz.y >= o.t * STEP - 0.01) continue;          // 站在顶面之上不挡
    const ox = o.w / 2 + half - Math.abs(zz.x - o.x);
    const oz = o.d / 2 + half - Math.abs(zz.z - o.z);
    if (ox > 0 && oz > 0) { const p = Math.min(ox, oz); if (p > worst) worst = p; }
  }
  return worst;
}

const dt = 1 / 38;
let minWallGap = 1e9, maxObsPoke = 0, samples = 0, wallViolate = 0, obsViolate = 0;
let worstWallCase = null, worstObsCase = null;

for (let frame = 0; frame < 38 * 90; frame++) {          // 90 秒
  for (const z of zombies) {
    stepZombie(z, dt, { obs, grid, players });
    samples++;
    const g = wallGap(z, ZR);
    if (g < minWallGap) { minWallGap = g; worstWallCase = { x: z.x, z: z.z }; }
    if (g < -1e-6) wallViolate++;
    const p = obsPoke(z, ZR);
    if (p > maxObsPoke) { maxObsPoke = p; worstObsCase = { x: z.x, z: z.z }; }
    if (p > 1e-6) obsViolate++;
  }
}

console.log('=== 2. 真实 AI 压测（40 只 walker × 90 秒 = ' + samples + ' 样本）===');
console.log(`边界墙   最小间隙 = ${f(minWallGap)}m   ${minWallGap < -1e-6 ? `❌ 穿墙 ${f(-minWallGap)}m` : '✅ 无穿墙'}   越界样本=${wallViolate}`);
if (worstWallCase) console.log(`         最贴墙位置 x=${f(worstWallCase.x)} z=${f(worstWallCase.z)}（外缘 ${f(Math.max(Math.abs(worstWallCase.x), Math.abs(worstWallCase.z)) + ZR)} vs 墙内面 ${BOUND_INNER}）`);
console.log(`interior 最大嵌入 = ${f(maxObsPoke)}m   ${maxObsPoke > 0.01 ? '❌ 有穿模' : '✅ 无穿模'}   嵌入样本=${obsViolate}`);
if (worstObsCase && maxObsPoke > 0.01) console.log(`         最深位置 x=${f(worstObsCase.x)} z=${f(worstObsCase.z)}`);
