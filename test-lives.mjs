// 命数诚实模型(deaths) 边界验证：直接驱动真实 sim-core API（kill→step→respawn）
import { Sim } from './sim-core.js';

let pass = 0, fail = 0;
function ok(cond, msg) {
  if (cond) { pass++; console.log('  ✓ ' + msg); }
  else { fail++; console.log('  ✗ ' + msg); }
}
function stepUntilSettled(sim, pid, maxSteps = 400) {
  for (let i = 0; i < maxSteps; i++) {
    sim.step(0.02);
    const p = sim.state.players[pid];
    if (!p || p.alive || p.out) return p;
  }
  return sim.state.players[pid];
}

// ---------- 1. 开局有限命 + 天赋命 ----------
console.log('[1] 开局：基础3 + 天赋命2 → 剩余5, deaths=0');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 2 });
  sim.startGame('versus', 3, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  ok(p.deaths === 0, 'deaths=0');
  ok(p.lives === 5, 'lives=3+2=5 (得 ' + p.lives + ')');
}

// ---------- 2. 死亡1次 → 剩余−1, deaths=1 ----------
console.log('[2] 死亡1次');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 2 });
  sim.startGame('versus', 3, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  sim._killPlayer(p);
  ok(p.deaths === 1, 'deaths=1 (得 ' + p.deaths + ')');
  ok(p.lives === 4, 'lives=5-1=4 (得 ' + p.lives + ')');
  ok(p.alive === false && p.respawnCd > 0, '阵亡进入重生倒计时');
}

// ---------- 3. 复活 → 剩余=4, deaths 不变, alive ----------
console.log('[3] 复活');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 2 });
  sim.startGame('versus', 3, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  sim._killPlayer(p);
  const r = stepUntilSettled(sim, 'a');
  ok(r.alive === true, '复活 alive');
  ok(r.deaths === 1, '复活后 deaths 仍为1 (得 ' + r.deaths + ')');
  ok(r.lives === 4, '复活后 lives=4 (得 ' + r.lives + ')');
}

// ---------- 4. 复活窗口天赋+1 → 剩余+1 不重复加 ----------
console.log('[4] 复活窗口天赋调高：+1命, 不重复加');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 2 });
  sim.startGame('versus', 3, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  sim._killPlayer(p); stepUntilSettled(sim, 'a');   // deaths=1, lives=4
  sim._killPlayer(p);                               // deaths=2, lives=3 (预算3+2=5)
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 3 }); // 复活窗口天赋↑
  const r = stepUntilSettled(sim, 'a');
  ok(r.deaths === 2, 'deaths=2 (得 ' + r.deaths + ')');
  ok(r.lives === 4, 'lives=预算(3+3=6)-2=4 (得 ' + r.lives + ', 正确+1, 未翻倍)');
}

// ---------- 5. 复活窗口天赋调低 → 剩余下降; 深坑→出局(复活段绝不复活) ----------
console.log('[5] 复活窗口天赋调低 + 深坑出局');
{
  // 5a: 死亡时即 remaining<=0 → 直接 out
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 2 }); // 预算3
  sim.startGame('versus', 1, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  sim._killPlayer(p); // d1 lives2
  sim._killPlayer(p); // d2 lives1 (未out)
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 0 }); // 预算变1
  sim._killPlayer(p); // d3, remaining=1+0-3=-2 -> out
  ok(p.out === true, '5a 死亡时 remaining<=0 → out (得 ' + p.out + ')');
  ok(p.lives === 0, '5a lives=0');
}
{
  // 5b: 死亡时 remaining>0(未out)，复活窗口调低天赋→复活段判出局，绝不「0命复活」
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 2 }); // 预算3
  sim.startGame('versus', 1, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  sim._killPlayer(p); // d1 lives2 (未out, 进重生)
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 0 }); // 预算变1
  const r = stepUntilSettled(sim, 'a');
  ok(r.out === true, '5b 复活窗口调低天赋→复活段判出局 (得 ' + r.out + ')');
  ok(r.alive === false, '5b 不复活 (alive=' + r.alive + ')');
}

// ---------- 6. 无限命：死N次仍无限复活，deaths 不变 ----------
console.log('[6] 无限命(livesMax=0)');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.startGame('versus', 0, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  ok(p.lives === 0, 'lives=0 哨兵(∞)');
  sim._killPlayer(p);
  ok(p.deaths === 0, '无限命不记 deaths (得 ' + p.deaths + ')');
  const r = stepUntilSettled(sim, 'a');
  ok(r.alive === true && r.out === false, '无限命复活, 不出局');
  ok(r.lives === 0, '复活后仍为0哨兵');
}

// ---------- 7. 晚加入：deaths=0 满命入场，kill 后按诚实模型 ----------
console.log('[7] 晚加入(relay 设 deaths=0,lives=livesMax) 行为一致');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.startGame('versus', 3, { config: { ROOM: { respawnTime: 0.05 } } });
  // 模拟 relay 晚加入：新人尚未死亡
  const sp = sim.state.players['b'];
  sp.deaths = 0; sp.lives = 3; // 等同 relay.cjs 晚加入设定
  sim._killPlayer(sp);
  ok(sp.deaths === 1, '晚加入者 deaths=1 (得 ' + sp.deaths + ')');
  ok(sp.lives === 2, '晚加入者 lives=3-1=2 (得 ' + sp.lives + ')');
  const r = stepUntilSettled(sim, 'b');
  ok(r.alive === true && r.lives === 2, '晚加入者正常复活, lives=2');
}

// ---------- 8. 出局者永不复活 ----------
console.log('[8] 出局者不再复活');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 0 });
  sim.startGame('versus', 1, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  sim._killPlayer(p); // d1, remaining=1-1=0 -> out
  ok(p.out === true, '已出局');
  for (let i = 0; i < 50; i++) sim.step(0.02);
  ok(p.out === true && p.alive === false && p.respawnCd === 0, '出局后永不复活');
}

// ---------- 9. 对战仅剩1人 → 结束(versusWin 仍只看 !out) ----------
console.log('[9] 对战结束判定');
{
  const sim = new Sim();
  sim.addPlayer('a', 'A'); sim.addPlayer('b', 'B');
  sim.setTalent('a', { atk: 0, def: 0, spd: 0, size: 0, lives: 0 });
  sim.startGame('versus', 1, { config: { ROOM: { respawnTime: 0.05 } } });
  const p = sim.state.players['a'];
  sim._killPlayer(p); // out
  sim.step(0.02);
  ok(sim.state.status === 'win', '仅剩1人 → status=win (得 ' + sim.state.status + ')');
}

console.log('\n结果: ' + pass + ' 通过, ' + fail + ' 失败');
process.exit(fail === 0 ? 0 : 1);
