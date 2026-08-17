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

console.log(`\n=== verify_lives: ${pass} pass / ${fail} fail ===`);
process.exit(fail ? 1 : 0);
