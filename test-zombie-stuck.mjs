// 仿真复现 v2：修正测试桩（玩家随机游走，避免"围着打"污染），分类诊断僵尸卡墙真因
import { Sim } from './sim-core.js';
import { circleOverlapObs } from './map-core.js';

const ZR = 0.9;
const DT = 1 / 60;
const FRAMES = 2400;            // 40s
const GAMES = 60;

let totalSpawn = 0, spawnOverlap = 0;
// 嵌墙卡死：inObs(嵌入障碍) 且 几乎不动，连续>1s
let embedStuckByK = { walker: 0, seeker: 0, flyer: 0 };
let embedStuckSamples = [];
let embedStuckFrames = 0;       // 嵌墙卡死总帧数

for (let g = 0; g < GAMES; g++) {
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('wave', 1, {});
  const p = sim.state.players['p1'];
  p.x = 0; p.z = 0;
  const obs = sim.state.obstacles;

  const embed = {};             // zid -> 连续嵌墙卡死帧数
  const last = {};
  let prevCount = 0;
  let t = 0;

  for (let f = 0; f < FRAMES; f++) {
    // 玩家随机游走（模拟真实走位，且离中心稍远以触发路径经过障碍）
    t += DT;
    p.x = Math.cos(t * 0.7) * 14 + Math.sin(t * 1.9) * 4;
    p.z = Math.sin(t * 0.6) * 14 + Math.cos(t * 2.1) * 4;

    sim.step(DT);
    const zs = sim.state.zombies;

    if (zs.length > prevCount) {
      for (let i = prevCount; i < zs.length; i++) {
        totalSpawn++;
        if (circleOverlapObs(obs, zs[i].x, zs[i].z, ZR, 0)) spawnOverlap++;
      }
    }
    prevCount = zs.length;

    for (const z of zs) {
      const inObs = circleOverlapObs(obs, z.x, z.z, ZR, 0);
      const lp = last[z.id];
      const moved = lp ? Math.hypot(z.x - lp.x, z.z - lp.z) : 1;
      const stuck = inObs && moved < 0.02;
      if (stuck) {
        embed[z.id] = (embed[z.id] || 0) + 1;
        embedStuckFrames++;
        if (embed[z.id] === 61 && embedStuckSamples.length < 6) {
          embedStuckSamples.push({ k: z.k, x: +z.x.toFixed(1), z: +z.z.toFixed(1),
            wall: (Math.abs(z.x) > 35 || Math.abs(z.z) > 35) });
        }
        if (embed[z.id] > 60) embedStuckByK[z.k] = (embedStuckByK[z.k] || 0) + 1;
      } else {
        embed[z.id] = 0;
      }
      last[z.id] = { x: z.x, z: z.z };
    }
  }
}

const pct = totalSpawn ? (100 * spawnOverlap / totalSpawn).toFixed(1) : '0';
console.log(`局数=${GAMES} 生成总数=${totalSpawn}`);
console.log(`生成即重叠障碍(卡墙源头): ${spawnOverlap} (${pct}%)  ← 若~0说明生成环节OK`);
console.log(`嵌墙卡死僵尸-帧数(修正后)=${embedStuckFrames}`);
console.log(`嵌墙卡死僵尸-实例数(连续>1s) 按类型: ${JSON.stringify(embedStuckByK)}`);
console.log(`嵌墙卡死抽样(连续>1s):`);
for (const s of embedStuckSamples) console.log('  ', JSON.stringify(s));
