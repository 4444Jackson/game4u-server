// 诊断 v3：walker 卡墙时到底处于「直冲(chase, hasLOS=true)」还是「随机游荡(wander, hasLOS=false)」
// 回答用户质疑："现在也不是随机游荡呀，当前的寻路不对吗？"
import { Sim } from './sim-core.js';
import { circleOverlapObs, hasLOS } from './map-core.js';

const ZR = 0.9, DT = 1 / 60, FRAMES = 2400, GAMES = 60;

let totalSpawn = 0, spawnOverlap = 0;
let embedByMode = { chase: 0, wander: 0 };   // 卡死实例(>1s) 按 walker 当时模式
let embedStuckByK = { walker: 0, seeker: 0, flyer: 0 };
let samples = [];

for (let g = 0; g < GAMES; g++) {
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('wave', 1, {});
  const p = sim.state.players['p1'];
  p.x = 0; p.z = 0;
  const obs = sim.state.obstacles;

  const embed = {}, last = {};
  let prev = 0, t = 0;

  for (let f = 0; f < FRAMES; f++) {
    t += DT;
    p.x = Math.cos(t * 0.7) * 14 + Math.sin(t * 1.9) * 4;   // 玩家随机游走，确保有目标且走位
    p.z = Math.sin(t * 0.6) * 14 + Math.cos(t * 2.1) * 4;

    sim.step(DT);
    const zs = sim.state.zombies;
    if (zs.length > prev) {
      for (let i = prev; i < zs.length; i++) {
        totalSpawn++;
        if (circleOverlapObs(obs, zs[i].x, zs[i].z, ZR, 0)) spawnOverlap++;
      }
    }
    prev = zs.length;

    for (const z of zs) {
      const inObs = circleOverlapObs(obs, z.x, z.z, ZR, 0);
      const lp = last[z.id];
      const moved = lp ? Math.hypot(z.x - lp.x, z.z - lp.z) : 1;
      const stuck = inObs && moved < 0.02;
      if (stuck) {
        embed[z.id] = (embed[z.id] || 0) + 1;
        if (embed[z.id] === 61) {                 // 卡死满 1s 的那一帧，记录模式
          const los = hasLOS(obs, z.x, z.z, p.x, p.z);
          if (z.k === 'walker') embedByMode[los ? 'chase' : 'wander']++;
          embedStuckByK[z.k] = (embedStuckByK[z.k] || 0) + 1;
          if (samples.length < 8) samples.push({ k: z.k, mode: los ? 'chase' : 'wander', x: +z.x.toFixed(1), z: +z.z.toFixed(1) });
        }
      } else embed[z.id] = 0;
      last[z.id] = { x: z.x, z: z.z };
    }
  }
}

console.log(`生成总数=${totalSpawn}  生成即重叠障碍=${spawnOverlap} (${totalSpawn ? (100 * spawnOverlap / totalSpawn).toFixed(1) : 0}%)`);
console.log(`卡死实例(连续>1s) 按类型: ${JSON.stringify(embedStuckByK)}`);
console.log(`walker 卡死时模式: 直冲chase(hasLOS)=${embedByMode.chase}  随机游荡wander=${embedByMode.wander}`);
console.log('抽样:', JSON.stringify(samples));
