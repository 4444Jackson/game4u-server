// 回归测试：复活 / 等待房重配天赋时，剩余命数必须与「诚实模型」即时同步，
// 否则 HUD 会先显示 livesMax（无天赋加成）再跳成含天赋值（即隔壁项目报告的复活中命数闪烁）。
// 同时验证：无限命(livesMax===0) 场景下 setTalent 不应误改 p.lives（恒为 0 标记）。
import { Sim } from './sim-core.js';

let pass = 0, fail = 0;
function check(name, cond, extra) {
  if (cond) { pass++; console.log(`  ✅ ${name}`); }
  else { fail++; console.log(`  ❌ ${name}  ${extra || ''}`); }
}

// ---- 场景 A：有限命，复活窗口内调高天赋命数，p.lives 立即同步 ----
{
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('versus', 3 /*livesMax*/, {});
  const p = sim.state.players['p1'];
  check('A0 开局命数=基础+天赋(0)', p.lives === 3, `got ${p.lives}`);

  // 死一次：deaths=1 → lives = 3 + 0 - 1 = 2
  sim._killPlayer(p);
  check('A1 死亡后 lives=2', p.lives === 2, `got ${p.lives}`);
  check('A2 进入复活态(alive=false,respawnCd>0,state=1,!out)',
    !p.alive && p.respawnCd > 0 && p.state === 1 && !p.out);

  // 复活窗口内把天赋命数 +1（lives:1 → extraLives=1）
  sim.setTalent('p1', { lives: 1 });
  // 期望 lives = livesMax(3) + extraLives(1) - deaths(1) = 3
  check('A3 复活中调天赋后 lives 即时同步为 3', p.lives === 3, `got ${p.lives}`);
}

// ---- 场景 B：无限命(livesMax===0)，setTalent 不得误改 p.lives（恒为 0 标记）----
{
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('versus', 0 /*无限命*/, {});
  const p = sim.state.players['p1'];
  check('B0 无限命开局 p.lives=0 标记', p.lives === 0, `got ${p.lives}`);

  sim._killPlayer(p); // 无限命分支：p.lives 保持 0
  check('B1 无限命死亡后 p.lives 仍=0', p.lives === 0, `got ${p.lives}`);

  sim.setTalent('p1', { lives: 3 }); // 高天赋命数
  check('B2 无限命下 setTalent 不误改 p.lives（仍=0）', p.lives === 0, `got ${p.lives}`);
}

// ---- 场景 C：命数耗尽已 out 者，setTalent 不应复活命数 ----
{
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('versus', 1 /*1 命*/, {});
  const p = sim.state.players['p1'];
  sim._killPlayer(p); // 1 命 → 死亡即 out
  check('C0 单命死亡后 out=true', p.out === true);
  check('C1 out 后 p.lives=0', p.lives === 0, `got ${p.lives}`);
  sim.setTalent('p1', { lives: 2 }); // 即便调高天赋命数
  check('C2 out 后 setTalent 不复活命数（仍=0）', p.lives === 0, `got ${p.lives}`);
}

// ---- 端到端：驱动真实 step() 重生/出局/无限命路径，确认收敛未改边界行为 ----
function advance(sim, seconds, dt = 1 / 60) {
  let t = 0;
  while (t < seconds) { sim.step(dt); t += dt; }
}

// 场景 D：有限命完整重生周期 + 复活窗口内调天赋，重生后命数仍为诚实模型
// 对战模式只会在 ≥2 人时开局（已限制单人不能开对战），加一个保持存活的 p2 仅为贴合真实多人对局、
// 让 _stepWorld 重生循环真正跑起来；单人开局是 API 直调造出的假象，与此处命数收敛无关。
{
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.addPlayer('p2', 'B');           // 对手：始终保持存活，避免 1v0 自动判胜
  sim.startGame('versus', 3, {});
  const p = sim.state.players['p1'];
  sim._killPlayer(p);                 // deaths=1 → lives=2, respawnCd≈2.5
  sim.setTalent('p1', { lives: 1 });  // 复活窗口调天赋 extraLives=1 → lives=3 (site4)
  check('D1 死亡后进入复活倒计时且 lives 已同步=3', !p.alive && p.respawnCd > 0 && p.lives === 3);
  advance(sim, 3);                    // 跨过重生时间，_stepWorld 触发重生(site3)
  check('D2 重生后 alive=true', p.alive === true, `alive=${p.alive}`);
  check('D3 重生后命数=诚实模型 3（site3 与 site4 同口径）', p.lives === 3, `got ${p.lives}`);
}

// 场景 E：单命耗尽 → out，推进时间也不复活（验证 site2 的 remaining>0 判定未被 clamp 改变）
{
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('versus', 1, {});
  const p = sim.state.players['p1'];
  sim._killPlayer(p);                 // 1 命 → remaining=0 → out
  check('E1 单命死亡即 out', p.out === true && p.alive === false && p.lives === 0);
  advance(sim, 3);
  check('E2 出局后推进时间仍 out（不再复活）', p.out === true && p.alive === false);
}

// 场景 F：无限命(0) 完整周期，重生后恒为 0 标记、绝不出局（验证 site2/3 的无限分支不走 livesRemaining）
{
  const sim = new Sim();
  sim.addPlayer('p1', 'A');
  sim.startGame('versus', 0, {});
  const p = sim.state.players['p1'];
  check('F0 无限命开局 p.lives=0 标记', p.lives === 0);
  sim._killPlayer(p);                 // 无限分支：lives=0, respawnCd≈2.5, !out
  check('F1 无限命死亡不 out', p.out === false && p.lives === 0);
  advance(sim, 3);
  check('F2 无限命重生 alive=true', p.alive === true);
  check('F3 无限命重生 p.lives 仍=0 标记、仍 !out', p.lives === 0 && p.out === false, `lives=${p.lives}`);
}

console.log(`\n=== verify_lives: ${pass} pass / ${fail} fail ===`);
process.exit(fail ? 1 : 0);
