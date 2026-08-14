// sim-core.js — 纯模拟核心（权威游戏逻辑，无 THREE / 无渲染依赖）
// 同一份逻辑在 Node 端由 relay.cjs 跑（权威服务器），浏览器端不引用本文件。
// ⚠️ 与 src/game.js 的 hostStep 逻辑必须保持同步：手机原生(情景1)走 game.js 的 hostStep，
//    两电脑 HTML(情景2) 走本文件的 Sim。修改模拟规则时两处都要改。
// 地形/碰撞/视线/寻路/僵尸AI 已抽到 map-core.js 共享，两侧 import 同一份，天然一致。
// 配置 / 天赋数学来自 gameConfig.js（单一来源），两侧 import 同一份，杜绝数值漂移。

import {
  MAP, STEP, genObstacles, topAt, moveCircle, depenetratePlayer, obbOverlap, buildGrid,
  bulletWorld, pickZombieKind, ZSTAT, stepZombie
} from './map-core.js';
import { makeConfig, computeStats, talentTotalCost } from './gameConfig.js';

const PLAYER_OBS_R = 0.6;    // 玩家碰撞方块半边长基准（= 可视方块底面 1.2 / 2；OBB 随瞄准转）。实战半径 = 此值 × 受击面积缩放
const SUPPORT_R = 0.25;      // 站立支撑判定半径（必须 < 玩家半径，防止贴墙瞬移上顶）
const ZOMBIE_RADIUS = 0.9;   // 僵尸碰撞方块半边长（轴对齐，不随转向）
const BULLET_RADIUS = 0.12;  // 与可视方块 0.24 见方一致（所见即碰撞）
const BULLET_LIFE = 1.3;
const BULLET_EYE = 1.6;      // 出膛高度 = 射手脚底 + 1.6（与相机眼睛同高：视角即弹道，无视差）
const ZOMBIE_SPEED = 4.4;
const ZOMBIE_DMG = 9;
const DEFAULT_WAVE_TARGET = 100;  // 僵尸浪潮默认击杀目标（房主可改；0 = 无限/无尽生存）
const MAX_ZOMBIES = 22;
const SPAWN_INTERVAL = 1.1;
const DEFAULT_RESPAWN = 2.5;  // 死亡后重生倒计时(秒)默认值；可被 config.ROOM.respawnTime 覆盖（房主建房时可自定义）
const GRAVITY = 24;
const JUMP_BUFFER = 0.15;    // 跳跃缓冲：按下后记住 0.15s，落地/coyote 窗口内才起跳（落地前一点点按跳不丢）
const COYOTE = 0.10;         // 土狼时间：离地后 0.10s 内仍可起跳（走下箱顶边缘不卡）
const VISUAL_H = 1.8;        // 玩家可视方块高度（用于子弹命中高度判定；随缩放同步）

const PALETTE = [0x4f9bff, 0xff9f43, 0x2ecc71, 0xff5e7e, 0xb56bff, 0x46d6d6];
const EMPTY_EVENTS = [];   // 击杀日志为空时的共享占位（快照只读不写，安全复用）

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class Sim {
  constructor() {
    this.state = this._emptyState();
    this.config = makeConfig();   // 权威配置（房主可覆盖）
  }

  _emptyState() {
    return {
      players: {},
      zombies: [],
      bullets: [],
      obstacles: [],       // 障碍物 [{x,z,w,d,t}] t=高度档位(×STEP)
      grid: null,          // 寻路网格（不入快照）
      score: 0,
      target: DEFAULT_WAVE_TARGET,
      status: 'waiting',
      mode: 'wave',        // 'wave' 僵尸浪潮 | 'versus' 对战（无僵尸）
      livesMax: 1,         // 对战模式：每位玩家的基础命条数（房主设定，不含天赋命数加成）
      winner: null,        // 对战模式：恒为 null（已不再判个人胜者，结束统称"本局结束"）
      bounce: false,       // 房主设定：子弹撞墙/障碍是否反弹
      zmix: 'progress',    // 僵尸出现方式：'progress' 随进度逐步引入 | 'mix' 全程混出
      nextZid: 1,
      nextBid: 1,
      spawnCd: 0,
      matchTime: 0,        // 本局已进行秒数（用于时间上限判定）
      nextEventId: 1,
      events: [],          // 击杀事件滚动日志（id/killer/victim/t），供客户端击杀提示
    };
  }

  // 房主覆盖配置（任意子集）；在 startGame 前调用。
  setConfig(overrides) {
    this.config = makeConfig(overrides);
    return this.config;
  }

  _mkPlayer(id, name, color) {
    return {
      id, name, color,
      x: (Math.random() * 2 - 1) * 10,
      z: (Math.random() * 2 - 1) * 10,
      y: 0, vy: 0, grounded: true,   // 跳跃：高度(y)、垂直速度(vy)、是否着地
      jumpBuf: 0, coyoteT: 0,        // 跳跃缓冲计时 / 土狼时间计时（缓冲+coyote 防丢跳与卡边）
      hp: 100, maxHp: 100,
      aim: 0, alive: true,
      // 连接态(state) 与 生命态(out/alive) 正交，互不干扰：
      //   state: 1=在线（默认初值） 0=离线（WS 断 / 主动退出，两者不区分、不超时、随时可回）
      //   out  : true=本局命数耗尽永久出局（只有它参与"本局是否结束"的判定）
      //   alive: 局内瞬时生死（死亡→重生 是 state=1 的子过程，与离线无关）
      state: 1, out: false,
      // ready: 天赋"配好没配好"的唯一标志位（0=没配/要重配，1=配好了）。全局只此一处真源，
      //   置 0：离线 / 阵亡 / 开局 / 回等待房；置 1：本人点「✔ 配好了」。
      //   两处用途共用同一位：① 天赋面板要不要弹（0 就弹）② 对战能不能开局（在线者全 1 才行）
      ready: 0,
      lives: 1, respawnCd: 0,   // 对战模式：剩余命数 / 死亡重生倒计时
      input: { mx: 0, mz: 0, ax: 0, az: 0, pitch: 0, fire: false, jump: false },
      cmdQueue: [], lastAckSeq: 0, useCmdStream: false,   // 指令流：未消费队列 / 已确认序号 / 是否指令驱动
      fireCd: 0, kills: 0,
      talent: { atk: 0, def: 0, spd: 0, size: 0, lives: 0 },  // 天赋等级（开局前由玩家分配）
      stats: null,   // 派生实战数值（startGame 时按 config+talent 计算）
      radius: PLAYER_OBS_R,   // 碰撞半径（含受击面积缩放）
    };
  }

  addPlayer(id, name) {
    if (this.state.players[id]) return;
    const color = PALETTE[Object.keys(this.state.players).length % PALETTE.length];
    const p = this._mkPlayer(id, name || ('玩家' + id), color);
    this.state.players[id] = p;
  }

  // 离线（WS 断 / 主动"回到大厅"，两者合并为同一状态）：不删对象、不踢出房间。
  // 从图上移除存在（alive=false、清瞬时量），但 lives/out/score/kills/talent 全部保留。
  setOffline(id) {
    const p = this.state.players[id];
    if (!p || p.state === 0) return;
    p.state = 0;
    p.alive = false;
    p.respawnCd = 0;
    p.ready = 0;   // 离线即作废"配好了"：回来时面板自动重弹，给一次重配机会
    // 清瞬时量：回来时"当刷进来"，不带陈旧动量/输入/指令积压
    p.vy = 0; p.grounded = true; p.jumpBuf = 0; p.coyoteT = 0; p.fireCd = 0;
    p.input = { mx: 0, mz: 0, ax: 0, az: 0, pitch: 0, fire: false, jump: false };
    p.cmdQueue = []; p.lastAckSeq = 0; p.useCmdStream = false;   // ack 归零：重连后新客户端 seq 从 1 起，否则会被当成陈旧指令全丢
  }

  // 上线/重连：回来"当刷进来"——随机撒点、满血入场，不还原离开前的位置。
  // 不碰 lives/out/score/kills/talent（命数照常）；已 out 者只回旁观、不复活。
  setOnline(id) {
    const p = this.state.players[id];
    if (!p) return;
    p.state = 1;
    p.cmdQueue = []; p.lastAckSeq = 0; p.useCmdStream = false;
    p.input = { mx: 0, mz: 0, ax: 0, az: 0, pitch: 0, fire: false, jump: false };
    p.respawnCd = 0;
    const st = computeStats(this.config, p.talent);
    p.stats = st;
    p.radius = PLAYER_OBS_R * st.scale;
    if (p.out) { p.alive = false; return; }   // 命数已耗尽：只回来看，不重新入场
    p.maxHp = this.config.COMBAT.baseHP;
    p.hp = p.maxHp; p.alive = true;
    p.y = 0; p.vy = 0; p.grounded = true; p.jumpBuf = 0; p.coyoteT = 0; p.fireCd = 0;
    p.x = (Math.random() * 2 - 1) * 10;
    p.z = (Math.random() * 2 - 1) * 10;
    p.aim = 0;
  }

  // 玩家分配天赋（开局前）。校验不超过点数；越界忽略。
  setTalent(id, talent) {
    const p = this.state.players[id];
    if (!p) return;
    const t = { atk: 0, def: 0, spd: 0, size: 0, lives: 0 };
    for (const k in t) t[k] = clamp(talent && talent[k] | 0, 0, this.config.TALENT.maxLevel);
    if (talentTotalCost(t) > this.config.TALENT.pointsPerPlayer) return;  // 超点数则拒绝
    p.talent = t;
    // 立即按新天赋重算实战数值，使天赋在「等待房 / 复活窗口」分配后即时生效，
    // 不必等到 startGame / 复活（修复「天赋要死一次才发挥作用」「有时开局不生效」的竞态）
    const st = computeStats(this.config, p.talent);
    p.stats = st;
    p.radius = PLAYER_OBS_R * st.scale;
  }

  // 置"配好了"标志位。玩家点「✔ 配好了」时调用（局内局外同一条路径，不分支）。
  setReady(id, v) {
    const p = this.state.players[id];
    if (p) p.ready = (v === false) ? 0 : 1;
  }

  setInput(id, input) {
    const p = this.state.players[id];
    if (p) {
      p.input = input;
      // 跳跃按下边沿 → 武装缓冲（持续 JUMP_BUFFER 秒，不被后续 jump:false 冲掉）
      if (input && input.jump) p.jumpBuf = JUMP_BUFFER;
    }
  }

  // 指令流上行（现代 FPS 同步）：客户端每预测步生成一条带 seq 的指令
  //   cmd = { seq, mx, mz, ax, az, pitch, fire, jump }
  // 只接收 seq 单调递增的新指令（去重/防乱序）；队列上限防恶意灌包。
  queueCmds(id, cmds) {
    const p = this.state.players[id];
    if (!p || !Array.isArray(cmds)) return;
    if (!p.cmdQueue) { p.cmdQueue = []; p.lastAckSeq = 0; }
    for (const c of cmds) {
      const seq = c && c.seq | 0;
      if (seq <= p.lastAckSeq) continue;                                  // 已消费过 → 丢弃
      const tail = p.cmdQueue.length ? p.cmdQueue[p.cmdQueue.length - 1].seq : p.lastAckSeq;
      if (seq <= tail) continue;                                          // 队列里已有 → 丢弃
      if (p.cmdQueue.length >= 120) p.cmdQueue.shift();                   // 上限 2 秒积压，防灌包
      p.cmdQueue.push({
        seq,
        mx: +c.mx || 0, mz: +c.mz || 0,
        ax: +c.ax || 0, az: +c.az || 0,
        pitch: +c.pitch || 0,
        fire: !!c.fire, jump: !!c.jump,
      });
    }
    p.useCmdStream = true;   // 收到过指令流 → 该玩家切换为指令驱动（不再吃状态式 input）
  }

  // 房主点击「开始游戏」——opts = { lives, bounce, zmix, target, config }
  //   mode='wave'    僵尸浪潮：一波波僵尸，击杀达标(清场)胜利；全员阵亡失败
  //   mode='versus'  对战：无僵尸，子弹互相命中扣血；结束条件 = 只剩最后一人有命 / 限时到点出战绩板
  //  - 等待态(waiting)：开新局；已结束/进行中：软重开（重置在场玩家、重新随机地形）
  startGame(mode, lives, opts) {
    const o = opts || {};
    const s = this.state;
    if (o.config) this.setConfig(o.config);
    s.mode = (mode === 'versus') ? 'versus' : 'wave';
    // 命数缺省：对战按 ROOM.baseLives（房间属性，房主设）；僵尸浪潮沿用原默认 1（不受对战配置影响）。
    // 两种模式统一约定：0 = 无限命（死亡后自动重生，永不出局）。
    let lv;
    if (lives === undefined || lives === null) lv = (mode === 'versus') ? this.config.ROOM.baseLives : 1;
    else lv = lives | 0;
    s.livesMax = Math.max(0, lv);
    s.winner = null;
    s.bounce = !!o.bounce;
    s.zmix = o.zmix === 'mix' ? 'mix' : 'progress';
    // 击杀目标：0 = 无限（无尽生存，不靠击杀获胜）；缺省按默认 100
    let t = DEFAULT_WAVE_TARGET;
    if (o.target !== undefined && o.target !== null) t = o.target | 0;
    s.target = t;
    s.matchTime = 0;
    s.events = [];
    s.nextEventId = 1;

    // 每局重新随机地形（离散高度档位障碍物）+ 重建寻路网格
    this.state.obstacles = genObstacles(24);
    this.state.grid = buildGrid(this.state.obstacles);

    for (const id in this.state.players) {
      const p = this.state.players[id];
      const st = computeStats(this.config, p.talent);
      p.stats = st;
      p.radius = PLAYER_OBS_R * st.scale;
      p.maxHp = this.config.COMBAT.baseHP;
      p.hp = p.maxHp;
      // 命数 = 基础 + 天赋命数加成；基础 0 = 无限命（天赋加成无意义，保持 0 标记无限）
      p.lives = s.livesMax === 0 ? 0 : s.livesMax + st.extraLives;
      p.out = false;            // 新一局：所有人清空出局标记
      p.ready = 0;              // 新一局：标志位全清（下次回等待房/阵亡时重新弹面板要求重配）
      p.respawnCd = 0;
      p.input = { mx: 0, mz: 0, ax: 0, az: 0, pitch: 0, fire: false, jump: false };
      p.cmdQueue = []; p.lastAckSeq = 0;
      p.fireCd = 0; p.kills = 0;
      // 离线者：保持 state=0 不入场（命数已按新局发好），回来时由 setOnline 随机撒点刷进来
      if (p.state === 0) { p.alive = false; continue; }
      p.alive = true;
      p.y = 0; p.vy = 0; p.grounded = true; p.jumpBuf = 0; p.coyoteT = 0;
      p.x = (Math.random() * 2 - 1) * 10;
      p.z = (Math.random() * 2 - 1) * 10;
      p.aim = 0;
    }
    s.zombies = [];
    s.bullets = [];
    s.score = 0;
    s.spawnCd = 0.6;
    s.status = 'playing';
  }

  // 结算后「再来一局」：回到空白等待房。
  // 设计（用户拍板）：房主不变、房间配置不变、其他原班玩家一并留在房里，但世界彻底重置为一个
  // 崭新空白局（地形清空、分数/事件/子弹/僵尸清空、全员天赋待重配）。
  // 实现【复用建房时的初始化入口】：先抽走「房间配置 + 在线花名册（身份/连接态）」，再
  // `this.state = this._emptyState()` 一刀切回空白等待态（障碍/分数/事件/子弹/僵尸全清），
  // 最后把配置与花名册填回。与「第一次建房」走完全同一条链路，无重复逻辑、不会漏清字段。
  backToWaiting() {
    const s = this.state;
    // —— 保留：房间配置（模式/命数/反弹/出怪/目标/高级配置）——
    const kept = {
      mode: s.mode, livesMax: s.livesMax, bounce: s.bounce,
      zmix: s.zmix, target: s.target, config: this.config,
    };
    // —— 保留：在线花名册（id/name/color/连接态/天赋），离线席位也不丢，回来时再撒点 ——
    const roster = [];
    for (const id in s.players) {
      const p = s.players[id];
      roster.push({ id, name: p.name, color: p.color, state: p.state, talent: p.talent });
    }
    // —— 一刀切回空白等待房（复用建房入口，障碍/世界全清）——
    this.state = this._emptyState();
    const ns = this.state;
    // —— 填回房间配置（不变）——
    ns.mode = kept.mode; ns.livesMax = kept.livesMax; ns.bounce = kept.bounce;
    ns.zmix = kept.zmix; ns.target = kept.target; this.config = kept.config;
    // —— 原班人马重新入房（全新空白席位，ready=0 自动弹天赋面板；连接态/天赋保留）——
    for (const r of roster) {
      const p = this._mkPlayer(r.id, r.name, r.color);
      p.state = r.state;
      p.talent = r.talent;                 // 天赋沿用上局（面板仍会弹，可改配）
      if (r.state === 0) p.alive = false;  // 离线席位：保持不入场
      ns.players[r.id] = p;
    }
  }

  // 击杀一名玩家：无限命(房间 livesMax===0)只进重生倒计时不扣命；否则扣 1 命，仍有命则重生，
  // 命数耗尽 → out=true（永久出局，唯一参与"本局是否结束"的标记）。
  // ⚠️ 无限命判定必须看 livesMax 而不是 p.lives<=0——后者与"有限命刚好扣到 0"二义，
  //    会让出局者被当成无限命反复重生（历史 bug）。
  // 「敞开无限玩」= 房主设 命数0 + 限时0，自然永不收场，无需特殊分支（旧 0/0 _isFreePlay 已废除）。
  _killPlayer(p) {
    p.alive = false;
    p.ready = 0;   // 阵亡即作废"配好了"：复活窗口内面板自动弹出，可「重装上阵」改配装
    if (this.state.livesMax === 0) {
      p.lives = 0;
      p.respawnCd = (this.config.ROOM.respawnTime) || DEFAULT_RESPAWN;     // 无限命：死亡后重生，不扣命，永不 out
    } else {
      p.lives -= 1;
      if (p.lives > 0) p.respawnCd = (this.config.ROOM.respawnTime) || DEFAULT_RESPAWN;
      else { p.lives = 0; p.out = true; p.respawnCd = 0; }
    }
  }

  _spawnBullet(p) {
    // 视角即弹道：速度向量 = 视线单位向量(yaw+pitch) × 子弹速度，恒速直飞（无重力/加速度）
    const a = p.aim;
    const LIM = Math.PI / 2 - 0.05;   // 与相机 pitch 限位一致
    const pitch = Math.max(-LIM, Math.min(LIM, (p.input && p.input.pitch) || 0));
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const speed = this.config.COMBAT.bulletSpeed;
    const stat = p.stats || computeStats(this.config, p.talent);
    this.state.bullets.push({
      id: this.state.nextBid++,
      x: p.x + Math.sin(a) * cp * 1.1,       // 出膛点 = 眼睛位置沿视线前移 1.1m
      z: p.z + Math.cos(a) * cp * 1.1,
      y: p.y + BULLET_EYE + sp * 1.1,
      vx: Math.sin(a) * cp * speed,
      vz: Math.cos(a) * cp * speed,
      vy: sp * speed,
      life: BULLET_LIFE,
      owner: p.id,
      dmg: stat.damage,        // 预存攻击者单发伤害（含攻击天赋），命中时与受害者防御结算
    });
  }

  _spawnZombie() {
    const S = MAP - 1;
    const edge = Math.floor(Math.random() * 4);
    let x, z;
    if (edge === 0) { x = -S + Math.random() * 2 * S; z = -S; }
    else if (edge === 1) { x = -S + Math.random() * 2 * S; z = S; }
    else if (edge === 2) { x = -S; z = -S + Math.random() * 2 * S; }
    else { x = S; z = -S + Math.random() * 2 * S; }
    const k = pickZombieKind(this.state.score, this.state.zmix);
    const st = ZSTAT[k];
    this.state.zombies.push({
      id: this.state.nextZid++,
      k, x, z, y: 0,
      hp: st.hp,
      speed: ZOMBIE_SPEED * st.spd * (0.85 + Math.random() * 0.4),
      atkCd: 0
    });
  }

  step(dt) {
    const s = this.state;
    const obs = s.obstacles;
    const FIRE_INTERVAL = 1 / this.config.COMBAT.fireRate;
    const PLAYER_SPEED = (p) => (p.stats ? p.stats.moveSpeed : this.config.COMBAT.baseMoveSpeed);
    const JUMP_V = this.config.COMBAT.jumpForce;

    // 玩家移动 / 射击（waiting 与 playing 都执行：开局前双方可自由走位、预瞄）
    for (const id in s.players) {
      const p = s.players[id];
      if (p.state === 0) continue;   // 离线：不在图上，完全不模拟（回来时 setOnline 重新撒点）
      if (!p.alive) {
        // 死亡期间不模拟，但要把积压指令确认掉（ack 推进 + 清队列），
        // 否则复活瞬间会被最多 2s 的陈旧移动指令拖着跑
        if (p.cmdQueue && p.cmdQueue.length) {
          p.lastAckSeq = p.cmdQueue[p.cmdQueue.length - 1].seq;
          p.cmdQueue.length = 0;
        }
        continue;
      }
      if (p.useCmdStream) {
        // 指令流玩家：逐条消费带 seq 的指令，每条按固定 1/60s 精确模拟。
        // 每 tick 最多消费 3 条（网络抖动积压时快速追平）；队列空则本 tick 不动——
        // 服务器绝不"猜"输入多走一步，保证客户端重放与服务器逐位一致（零回拉的前提）。
        let n = 0;
        while (p.cmdQueue && p.cmdQueue.length && n < 3) {
          const cmd = p.cmdQueue.shift();
          p.input = cmd;                                  // aim/pitch/fire 等旁路逻辑仍读 p.input
          if (cmd.jump) p.jumpBuf = JUMP_BUFFER;          // 跳跃边沿武装缓冲（与 setInput 同构）
          this._stepPlayerOnce(p, cmd, 1 / 60, obs, FIRE_INTERVAL, PLAYER_SPEED, JUMP_V);
          p.lastAckSeq = cmd.seq;
          n++;
        }
        continue;
      }
      this._stepPlayerOnce(p, p.input, dt, obs, FIRE_INTERVAL, PLAYER_SPEED, JUMP_V);
    }

    this._stepWorld(dt);
  }

  // 单玩家一步物理（移动/跳跃/瞄准/开火）。指令流与状态式共用，保证同口径。
  _stepPlayerOnce(p, inp, dt, obs, FIRE_INTERVAL, PLAYER_SPEED, JUMP_V) {
    {
      let mx = inp.mx, mz = inp.mz;
      const ml = Math.hypot(mx, mz);
      if (ml > 1) { mx /= ml; mz /= ml; }
      // 移动方向直接取输入瞄准向量(ax/az)，与客户端预测同口径；
      // 注意：p.aim 在本步末尾(下方)才从输入更新，若这里用 p.aim 会是「上一 tick 的朝向」(陈旧 1 步)，
      // 转向时客户端用当前 yaw、服务器用旧 yaw → 圆形走位路径持续错位 → 撞障碍角被顶反方向 → 发散 20m+。
      const aimX = (Math.abs(inp.ax) + Math.abs(inp.az) > 1e-3) ? inp.ax : Math.sin(p.aim);
      const aimZ = (Math.abs(inp.ax) + Math.abs(inp.az) > 1e-3) ? inp.az : Math.cos(p.aim);
      const sa = aimX, ca = aimZ;
      const fwd = -mz, strafe = mx;
      const dx = fwd * sa - strafe * ca;
      const dz = fwd * ca + strafe * sa;
      const spd = PLAYER_SPEED(p);
      const nx = clamp(p.x + dx * spd * dt, -MAP + 1, MAP - 1);
      const nz = clamp(p.z + dz * spd * dt, -MAP + 1, MAP - 1);
      // 体积/移动碰撞：圆柱（半径=PLAYER_OBS_R×受击面积缩放，旋转无关、贴墙顺滑）；伤害判定另用 obbOverlap 严格方块
      const mv = moveCircle(obs, p.x, p.z, nx, nz, p.radius, p.y);
      p.x = mv.x; p.z = mv.z;
      // 垂直：支撑面 = 脚下障碍物顶面(或地面 0)；跳跃/走出边缘自然下落。
      // 支撑判定半径随玩家碰撞半径缩放（恒 < 半径），否则缩小体型者贴墙会被误判"站在顶面"瞬移上顶。
      const sup = topAt(obs, p.x, p.z, Math.min(SUPPORT_R, p.radius * 0.5));
      // 跳跃缓冲 + 土狼时间：grounded 时刷新 coyote；离地后 coyote 倒计时；缓冲在落地/coyote 窗口内才起跳
      if (p.grounded) p.coyoteT = COYOTE;
      else if (p.coyoteT > 0) p.coyoteT -= dt;
      if (p.jumpBuf > 0 && (p.grounded || p.coyoteT > 0)) {
        p.vy = JUMP_V; p.grounded = false; p.jumpBuf = 0; p.coyoteT = 0;
      } else if (p.jumpBuf > 0) {
        p.jumpBuf -= dt;   // 仍悬空：缓冲倒计时，落地瞬间触发起跳（不丢跳）
      }
      if (p.grounded && p.y > sup + 0.01) p.grounded = false;   // 走出箱顶边缘 → 下落
      if (!p.grounded) {
        p.vy -= GRAVITY * dt;
        p.y += p.vy * dt;
        if (p.y <= sup && p.vy <= 0) { p.y = sup; p.vy = 0; p.grounded = true; }
      } else {
        p.y = sup;
      }
      // 落地/移动兜底去穿透：若落点在障碍里(空中飘入窄缝)，沿最小平移向量顶出，杜绝伪卡死
      depenetratePlayer(obs, p, p.radius);
      if (Math.hypot(inp.ax, inp.az) > 0.15) p.aim = Math.atan2(inp.ax, inp.az);
      p.fireCd -= dt;
      if (inp.fire && p.fireCd <= 0) {
        p.fireCd = FIRE_INTERVAL;
        this._spawnBullet(p);
      }
    }
  }

  // 世界模拟（子弹/僵尸/重生/胜负）——与玩家步进解耦，每 tick 恒跑一次
  _stepWorld(dt) {
    const s = this.state;
    const obs = s.obstacles;

    // 子弹（连续碰撞 CCD）：每 tick 位移切成 ≤0.3m 子步逐段检测，消除近距死区与高速隧穿；
    // 生成点(p0)单独检一次，覆盖枪口前那一段（原端点检测跳过的起点）
    for (let i = s.bullets.length - 1; i >= 0; i--) {
      const b = s.bullets[i];
      const byaw = Math.atan2(b.vx, b.vz);   // 子弹朝向（沿飞行方向）
      const travel = Math.hypot(b.vx, b.vz, b.vy || 0) * dt;
      const STEPS = Math.max(1, Math.ceil(travel / 0.3));
      const sdt = dt / STEPS;
      let hit = false;

      // 命中其他实体（玩家/僵尸）：沿当前子弹位置做 OBB 接触判定，返回是否命中并结算伤害
      const testTargets = () => {
        if (s.mode === 'versus' && s.status === 'playing') {
          // 对战：子弹命中其他存活玩家（OBB 精确接触 + 高度够得着）
          for (const id in s.players) {
            const p = s.players[id];
            if (!p.alive || p.id === b.owner) continue;
            if (obbOverlap(b.x, b.z, BULLET_RADIUS, BULLET_RADIUS, byaw, p.x, p.z, p.radius, p.radius, p.aim) &&
                b.y > p.y - 0.2 && b.y < p.y + VISUAL_H * (p.stats ? p.stats.scale : 1) + 0.5) {
              const dmg = Math.max((b.dmg || this.config.COMBAT.baseDamage) - (p.stats ? p.stats.defense : 0), 1);
              p.hp -= dmg;
              if (p.hp <= 0) {
                p.hp = 0;
                if (b.owner && s.players[b.owner]) {
                  s.players[b.owner].kills += 1;
                  s.events.push({ id: s.nextEventId++, killer: b.owner, victim: p.id, t: s.matchTime });
                  if (s.events.length > 12) s.events.shift();
                }
                this._killPlayer(p);
              }
              return true;
            }
          }
        } else {
          // 僵尸浪潮：子弹命中僵尸（OBB 精确接触 + 飞行僵尸按其飞行高度判定）
          for (const z of s.zombies) {
            const zy = z.y || 0;
            if (obbOverlap(b.x, b.z, BULLET_RADIUS, BULLET_RADIUS, byaw, z.x, z.z, ZOMBIE_RADIUS, ZOMBIE_RADIUS, 0) &&
                b.y > zy - 0.3 && b.y < zy + 2.0) {
              z.hp -= 1;
              if (z.hp <= 0) {
                z.dead = true; s.score += 1;
                if (b.owner && s.players[b.owner]) s.players[b.owner].kills += 1;
              }
              return true;
            }
          }
        }
        return false;
      };

      // 生成点(p0)先检一次：消除枪口前约 1.1m 死区（原实现跳过起点）
      if (testTargets()) { s.bullets.splice(i, 1); continue; }

      for (let st = 0; st < STEPS && !hit; st++) {
        const px = b.x, pz = b.z;
        b.x += b.vx * sdt; b.z += b.vz * sdt; b.y += (b.vy || 0) * sdt; b.life -= sdt;
        if (testTargets()) { hit = true; break; }
        // 撞围墙/障碍：房主开了反弹则镜面反弹，否则消失（子步内 px→b 已是短线段，墙>0.3m 必被检）
        if (bulletWorld(obs, b, px, pz, s.bounce)) { hit = true; break; }
        // 落地：低头打地面 → 消失（开反弹则向上弹起，与墙面镜面反弹一致）
        if (b.y <= 0) {
          if (s.bounce) { b.y = -b.y; b.vy = -(b.vy || 0); }
          else { hit = true; break; }
        }
      }
      if (hit || b.life <= 0) s.bullets.splice(i, 1);
    }
    s.zombies = s.zombies.filter((z) => !z.dead);

    // 仅进入游戏(playing)后才生成僵尸并结算胜负；waiting 阶段只跑上面的移动/射击
    if (s.status !== 'playing') return;

    // 对战模式：累计计时
    if (s.mode === 'versus') s.matchTime += dt;

    // 僵尸 AI（仅僵尸浪潮模式）：三类行为在 map-core.stepZombie 中实现
    if (s.mode === 'wave') {
      const ctx = { obs, grid: s.grid, players: s.players };
      for (const z of s.zombies) {
        const victim = stepZombie(z, dt, ctx);
        if (victim) {
          victim.hp -= ZOMBIE_DMG;
          if (victim.hp <= 0) { victim.hp = 0; this._killPlayer(victim); }
        }
      }

      // 生成
      s.spawnCd -= dt;
      if (s.spawnCd <= 0 && s.zombies.length < MAX_ZOMBIES) {
        s.spawnCd = SPAWN_INTERVAL;
        this._spawnZombie();
      }
    }

    // 复活倒计时：死亡且处于重生倒计时中即重生（对战有限命 / 僵尸浪潮无限命都会触发）
    for (const id in s.players) {
      const p = s.players[id];
      if (p.state === 0 || p.out) continue;   // 离线者不在图上、出局者不再复活
      if (!p.alive && p.respawnCd > 0) {
        p.respawnCd -= dt;
        if (p.respawnCd <= 0) {
          // 复活时按「当前天赋分配」重算实战数值（重装上阵：死亡等复活期间可重新调配天赋）
          const st = computeStats(this.config, p.talent);
          p.stats = st;
          p.radius = PLAYER_OBS_R * st.scale;
          p.hp = p.maxHp; p.alive = true;
          p.y = 0; p.vy = 0; p.grounded = true;
          p.jumpBuf = 0; p.coyoteT = 0;
          p.x = (Math.random() * 2 - 1) * 10;
          p.z = (Math.random() * 2 - 1) * 10;
          p.aim = 0; p.fireCd = 0;
        }
      }
    }

    // 胜负
    if (s.mode === 'versus') {
      this._versusWin();
    } else {
      // 僵尸浪潮结束条件（不含任何人数下限，单人开荒同样成立）：
      //   胜 = 击杀达标（target>0）；负 = 在线的人全部 out（命数耗尽永久出局）
      //   离线者(state=0)既不计入在场、也不触发判负——他只是暂时不在，随时能回来
      const roster = Object.values(s.players).filter((p) => p.state === 1);
      if (s.target > 0 && s.score >= s.target) s.status = 'win';   // 0 = 无限，不靠击杀获胜
      else if (roster.length > 0 && roster.every((p) => p.out)) s.status = 'lose';
    }
  }

  // 对战结束条件（不判个人胜者，结束即出战绩板）：只看「命数」和「时间」两件事。
  //   A. 命数淘汰（仅当 livesMax>0 有限命）：未出局(out=false)者 ≤1 人 → 结束（同归于尽也结束）
  //   B. 限时到点（timeLimit>0）→ 结束
  // ⚠️ 两条铁律：
  //   1) 不加任何「人数 >= 2」的前置——房主可以自己先开一局，靠 out 而不是靠人数判断；
  //   2) 离线(state=0) 不等于出局：熄屏/掉线/回大厅的人 out 仍为 false，照样占着分母，
  //      所以「2 人局有 1 人熄屏」不会结算，只有命数打光或时间到才收场。
  //   livesMax===0(无限命) 时永不 out，A 条自然失效，命0+限时0 = 敞开无限玩。
  _versusWin() {
    const s = this.state;
    const players = Object.values(s.players);
    if (players.length === 0) return;
    // B. 限时到点：时间就是终止条件，结算看战绩板
    if (this.config.ROOM.timeLimit > 0 && s.matchTime >= this.config.ROOM.timeLimit * 60) {
      s.status = 'win'; return;
    }
    // A. 命数淘汰：只数还没 out 的人（含离线者），≤1 即收场
    if (s.livesMax > 0) {
      const remain = players.filter((p) => !p.out);
      if (remain.length <= 1) s.status = 'win';
    }
  }

  snapshot() {
    const s = this.state;
    return {
      type: 'state',
      mode: s.mode, livesMax: s.livesMax, winner: s.winner || null,
      bounce: s.bounce,
      matchTime: s.matchTime,
      events: s.events.length ? s.events.slice() : EMPTY_EVENTS,    // 击杀滚动日志（空时复用同一空数组，省每帧切片）
      // 离线玩家只发精简包（on:0）——他不在图上，位置/运动学/天赋一概不发，
      // 客户端据此隐藏其模型；名字/命数/杀数保留，战绩板与玩家列表仍能显示"离线"席位。
      // 这同时是唯一的真性能点：否则离线席位每秒白占十几 KB，手机端 JSON.parse 直接卡。
      // ready 两个分支都发（1 字节）：客户端据此决定天赋面板弹不弹、等待房列谁还没配好。
      // 不再另发房间级 ready 名单——标志位只此一份真源，避免两处口径打架。
      players: Object.values(s.players).map((p) => (p.state === 0 ? {
        id: p.id, name: p.name, color: p.color, on: 0,
        lives: p.lives, kills: p.kills || 0, out: !!p.out, alive: false, ready: p.ready | 0,
      } : {
        on: 1, out: !!p.out, ready: p.ready | 0,
        id: p.id, name: p.name, x: p.x, z: p.z, y: p.y, hp: p.hp, maxHp: p.maxHp,
        ack: p.lastAckSeq || 0,   // 指令流：服务器已模拟到的最后指令序号（客户端据此丢弃已确认指令、重放其余）
        // 回滚重放所需完整运动学状态（vy/着地/跳跃缓冲/土狼计时/开火冷却）——缺任何一项，跳跃中的重放起点就错
        vy: p.vy || 0, gr: p.grounded ? 1 : 0, jb: p.jumpBuf || 0, ct: p.coyoteT || 0, fcd: p.fireCd || 0,
        aim: p.aim, alive: p.alive, color: p.color, kills: p.kills || 0,
        lives: p.lives, respawnCd: p.respawnCd || 0,
        scale: p.stats ? p.stats.scale : 1,
        talent: p.talent
      })),
      zombies: s.zombies.map((z) => ({ id: z.id, k: z.k || 'walker', x: z.x, z: z.z, y: z.y || 0, hp: z.hp })),
      bullets: s.bullets.map((b) => ({ id: b.id, x: b.x, z: b.z, y: b.y || 0 })),
      score: s.score, target: s.target, status: s.status
    };
  }

  // 静态数据（地形 map + 房主配置 config）：永不逐帧变化，改为一次性下发（relay 在
  // 建房/加入/接管/startGame 时各发一次），避免每帧快照白塞 ~1.3KB 冗余。
  // 客户端 applyStatic 仅在收到本消息时（重）建地形、存 config，不进每帧热路径。
  staticState() {
    return {
      type: 'static',
      config: this.config,
      map: this.state.obstacles,
    };
  }
}
