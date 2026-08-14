// main.js — 主控：菜单 / 建房(主机) / 加入(客户端) / 游戏循环
import './styles.css';
import { Game } from './game.js';
import { ClientNet, relayUrl } from './net.js';
import { Controls, updateHud, loadSettings, saveSettings, defaultSettings, lockPointer, unlockPointer, lockLandscape, unlockOrientation, centerNotify } from './ui.js';
import { GAME_CONFIG, talentCost, talentTotalCost } from '../gameConfig.js';


// ---- 全局错误可视化（无控制台环境也能看到报错）----
// 三条规矩，避免它自己变成 bug：
//   ① 良性拒绝不显示——指针锁/全屏被浏览器策略拒绝是预期内的（冷却期、非用户手势、iOS 不支持），
//      不是程序错误，却会走 unhandledrejection，以前会在页面顶部挂一条永不消失的红条挡视野。
//   ② 同一条消息只占一行，重复只累加 ×N，不无限堆高。
//   ③ 12 秒后自动消失，也可点击立即关掉——调试信息不该永久霸占屏幕。
const BENIGN_ERR = /pointer\s*lock|exited the lock|requestPointerLock|fullscreen|Permissions check failed|user gesture/i;
const _errLines = new Map();   // msg -> 出现次数
let _errHideTimer = null;
function _dropErrBox() {
  const b = document.getElementById('errbox');
  if (b) b.remove();
  _errLines.clear();
  clearTimeout(_errHideTimer); _errHideTimer = null;
}
function showErr(msg) {
  msg = String(msg == null ? '' : msg);
  if (!msg || BENIGN_ERR.test(msg)) return;
  let box = document.getElementById('errbox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'errbox';
    box.title = '点击关闭';
    box.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:9999;background:#b71c1c;color:#fff;font:12px/1.5 monospace;padding:8px 10px;white-space:pre-wrap;max-height:45vh;overflow:auto;cursor:pointer;';
    box.addEventListener('click', _dropErrBox);
    (document.body || document.documentElement).appendChild(box);
  }
  _errLines.set(msg, (_errLines.get(msg) || 0) + 1);
  box.textContent = [..._errLines].map(([m, c]) => (c > 1 ? `${m}  ×${c}` : m)).join('\n');
  clearTimeout(_errHideTimer);
  _errHideTimer = setTimeout(_dropErrBox, 12000);
}
window.addEventListener('error', (e) => showErr('[error] ' + (e.message || e.error) + (e.error && e.error.stack ? '\n' + e.error.stack : '')));
window.addEventListener('unhandledrejection', (e) => showErr('[reject] ' + (e.reason && (e.reason.stack || e.reason.message) || e.reason)));

// 设备检测：触摸设备(手机/平板)用摇杆；有精确指针(鼠标)的用 WASD + 鼠标
const IS_TOUCH = (typeof window !== 'undefined') && window.matchMedia &&
  (window.matchMedia('(pointer: coarse)').matches || (!window.matchMedia('(pointer: fine)').matches && 'ontouchstart' in window));
const CTRL_MODE = IS_TOUCH ? 'touch' : 'pc';

let game, controls;

const el = (id) => document.getElementById(id);
const show = (id) => el(id).classList.remove('hidden');
const hide = (id) => el(id).classList.add('hidden');
// 关掉「用完即应自关」的浮层：设置面板 + 布局提示条。
// 它们都能在主菜单或局内被点开，却只在极少几个点被关；一旦离开所在上下文
// （回大厅 / 建房 / 加入 / 进 mode-select）若不清，就会一直盖在前面挡操作。
// 局内临时点开设置仍由「设置按钮 / ✕」手动关，不在这里触发。
function closeOverlays() {
  hide('settings-panel');
  hide('layout-hint');
}

// ============ 「主机」与「房主」是两回事，切勿混用 ============
// 【主机 host】= 谁在跑权威模拟。本部署是中心化 relay 进程(sim-core.js)，浏览器一方永远只是客户端。
// 【房主 owner】= 谁有开局/重开权（relay 侧的 room.hostCid）。只是一个权限标记，可以移交。
//               房主并不跑模拟，所以房主换人不影响谁是主机。
let mode = null;        // 网络角色：'host'=自己建的房 | 'client'=加入别人的房。**不表示房主权限**
let net = null;
let myId = 'host';
// 本部署是中心化 relay：浏览器永远是客户端，绝不跑权威模拟（模拟只在 relay 进程的 sim-core.js 上）。
// 是否持有房主权限（开局/重开）。建房即为真；relay 移交(hostChanged)后接任者也为真。
// 【禁止】用 mode === 'host' 代替它——那是网络角色，接任房主的 mode 仍是 'client'。
let isRoomOwner = false;
// 由 relay 的 hostChanged 移交而来的「接任房主」：他是以客户端身份进房的，本地 gameMode/gameLives/
// versusConfig 等都是自己的默认值，并非原房主建房时选的。发 startGame 时必须省略这些字段，
// 让 relay 回退到 room.meta，否则一按「再来一局」就会把房间玩法悄悄改成接任者的默认设置。
let isPromotedOwner = false;
function loadName() {
  try { const n = localStorage.getItem('zlan_name'); if (n && n.trim()) return n.trim().slice(0, 12); } catch (_) {}
  return '玩家' + Math.floor(Math.random() * 900 + 100);
}
function saveName(n) { try { localStorage.setItem('zlan_name', (n || '').toString().slice(0, 12)); } catch (_) {} }
// 持久身份 pid：客户端本地唯一存的一点点东西（≈40 字节）。所有游戏状态都在服务端，
// 客户端只拿它在重连时认领原席位（命数/杀数/天赋原样接回，不至于刷新一下就白捡满命或丢进度）。
function loadPid() {
  try {
    let v = localStorage.getItem('zlan_pid');
    if (!v) { v = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); localStorage.setItem('zlan_pid', v); }
    return v;
  } catch (_) { return 'u' + Math.random().toString(36).slice(2, 12); }
}
let myName = loadName();
const myPid = loadPid();
let loopRunning = false;

// 开房间时选中的游戏类型（房主设定，权威）
let gameMode = 'wave';  // 'wave' 僵尸浪潮 | 'versus' 对战（无僵尸）
let gameLives = 1;      // 命条数（房主设定；wave 默认 1、versus 默认 3；0 = 无限命）
let gameTarget = 100;   // 僵尸浪潮击杀目标（房主设定；0 = 无限/无尽生存）
let gameBounce = false; // 房主设定：子弹撞墙/障碍是否反弹
let gameZmix = 'progress'; // 僵尸出现方式：'progress' 随进度逐步引入 | 'mix' 全程混出
const DEFAULT_LIVES = 3;  // 对战模式默认命条数

// ---- 对战：房主高级配置（13 项变量 → gameConfig 覆盖对象；仅 versus 模式读取/下发） ----
function readAdvConfig() {
  const num = (id, dflt) => {
    const e = el(id); if (!e) return dflt;
    const v = parseFloat(e.value);
    return Number.isFinite(v) ? v : dflt;
  };
  return {
    COMBAT: {
      baseHP: num('cfg-baseHP', 100),
      baseDamage: num('cfg-baseDamage', 34),
      baseMoveSpeed: num('cfg-baseMoveSpeed', 12),
      fireRate: num('cfg-fireRate', 6.25),
      bulletSpeed: num('cfg-bulletSpeed', 32),
      jumpForce: num('cfg-jumpForce', 9.5),
    },
    TALENT: { pointsPerPlayer: num('cfg-talentPoints', 10) | 0 },
    ROOM: {
      timeLimit: num('cfg-timeLimit', 10) | 0,
      playerScale: num('cfg-playerScale', 1),
      maxPlayers: num('cfg-maxPlayers', 8) | 0,
      baseLives: gameLives,   // 与上方「每人命条数」选择联动（单一来源）
    },
  };
}
// versus 时随建房/开局下发的配置（wave 不带，保持浪潮模式原行为不受影响）
const versusConfig = () => (gameMode === 'versus' ? readAdvConfig() : null);
// 房主发给 relay 的开局指令。接任房主（isPromotedOwner）只发 type，玩法/命数/目标/反弹/出怪方式
// 一律留空 → relay 侧回退到 room.meta（建房时原房主选的），避免"换个房主房间玩法就变了"。
const startGameMsg = () => (isPromotedOwner
  ? { type: 'startGame' }
  : { type: 'startGame', mode: gameMode, lives: gameLives, target: gameMode === 'wave' ? gameTarget : 0, bounce: gameBounce, zmix: gameZmix, config: versusConfig() });

// ---- 对战：本地天赋加点状态（开局前可改；变更即上行，服务器端校验） ----
const talent = { atk: 0, def: 0, spd: 0, size: 0, lives: 0 };
let _talentPulled = false;   // 是否已从快照回填过服务端天赋（每次 welcome 后置 false，回填一次即可）
let _tpLastSig = '';   // 面板状态签名（避免 rAF 每帧重绘 DOM）
function _talentCfg() {
  const cfg = game && game.state && game.state.config;
  return (cfg && cfg.TALENT) ? cfg.TALENT : GAME_CONFIG.TALENT;
}
function _sendTalentNow() {
  const t = { ...talent };
  if (net && net.sendTalent) net.sendTalent(t);
}
// 每帧驱动（签名不变则零 DOM 操作）：显示条件 = 对战 && 天赋点 > 0 && (等待房 || 我方死亡等复活)
//   —— 等待房：早到玩家(含房主)开局前配置；复活窗口：死亡→复活倒计时期间可「重装上阵」重新调配
//   —— 结算(win/lose)不再弹：游戏已结束，再配装无意义，且会盖住结算按钮（修复「结束弹出天赋界面」）
// 面板弹不弹只看两件事：① 现在是不是配置窗口 ② 我的 ready 标志位是不是 0（权威端下发）。
// 不再用本地"已手动关闭"记忆——那份记忆在重连时（页面没刷新、窗口条件一直为真）永远复位不了，
// 就是「接回席位却说在等待我配置天赋、面板又不弹」的根因。标志位由服务端统一清（离线/阵亡/开局/回等待房）。
let _optHideUntil = 0;   // 乐观隐藏截止时刻：点✔后先本地收起，等标志位回传；若 ready 包丢了，1.5s 后自动重弹
function syncTalentPanel(state) {
  const tp = el('talent-panel'); if (!tp || !state) return;
  const T = _talentCfg();
  const pts = T.pointsPerPlayer | 0;
  const me = state.players && state.players[myId];
  const dead = me && !me.alive && (me.respawnCd || 0) > 0;   // 死亡且处于复活倒计时 = 配置窗口
  const inWindow = pts > 0 && state.mode === 'versus' && ((state.status === 'waiting') || dead);
  const flagOn = !!(me && me.ready);                          // 权威端认定"我已配好"
  if (flagOn || !inWindow) _optHideUntil = 0;                 // 标志位已到位 / 窗口关了 → 乐观期作废
  const showIt = inWindow && !flagOn && Date.now() >= _optHideUntil;
  const used = talentTotalCost(talent);
  const sig = `${showIt}|${dead}|${pts}|${used}|${talent.atk},${talent.def},${talent.spd},${talent.size},${talent.lives}`;
  if (sig === _tpLastSig) return;
  const wasHidden = tp.classList.contains('hidden');
  _tpLastSig = sig;
  const titleEl = el('tp-title');
  if (titleEl) titleEl.textContent = dead ? '⚔ 趁复活改配装' : '🎖 天赋加点';
  tp.classList.toggle('hidden', !showIt);
  if (!showIt) return;
  // 面板刚弹出：若指针被锁定则主动解锁，把光标还给玩家点加点按钮
  if (wasHidden) unlockPointer();
  const left = pts - used;
  const ptsEl = el('tp-points'); if (ptsEl) ptsEl.textContent = `剩余 ${left} 点`;
  tp.querySelectorAll('.tp-row').forEach((row) => {
    const key = row.dataset.t;
    const lv = talent[key] | 0;
    const lvEl = row.querySelector('.tp-lv'); if (lvEl) lvEl.textContent = String(lv);
    const nextCost = talentCost(lv + 1) - talentCost(lv);   // 升下一级的边际花费
    const costEl = row.querySelector('.tp-cost');
    if (costEl) costEl.textContent = lv >= (T.maxLevel | 0) ? 'MAX' : `+${nextCost}点`;
    const plus = row.querySelector('.tp-plus'), minus = row.querySelector('.tp-minus');
    if (plus) plus.disabled = lv >= (T.maxLevel | 0) || nextCost > left;
    if (minus) minus.disabled = lv <= 0;
  });
}

// 操作设置（灵敏度 + 可拖动布局），localStorage 持久化
const settings = loadSettings();

// ---------------- 建立网络连接（只连 WS，不自动 join；建房/加入由 createRoom/joinRoom 触发）----------------
async function connectNet() {
  net = new ClientNet();
  if (net.setName) net.setName(myName);
  // 注册状态回调（welcome 设置 myId；state 应用快照；roomList 渲染房间列表）
  net.onState((snap) => {
    if (!snap || typeof snap !== 'object') return;
    if (snap.type === 'welcome') {
      myId = snap.id; if (game) game.myId = myId;
      // 服务端会带回当前房主。重连场景下我可能已经不是房主了（走时移交给了别人，回来不夺回），
      // 也可能反过来（我离线期间没人接任）。以服务端为准刷新权限标记与按钮文案。
      if (snap.owner !== undefined && snap.owner !== null) {
        const wasOwner = isRoomOwner;
        isRoomOwner = (snap.owner === myId);
        // 重连接回的房主一律按"接任房主"发最简 startGame（本地 gameMode/config 可能是默认值，
        // 让服务端回退到 room.meta，避免一按开始就把房间玩法悄悄改成我的默认设置）
        if (isRoomOwner && snap.resumed) isPromotedOwner = true;
        const rb = el('btn-restart'); if (rb) rb.textContent = isRoomOwner ? '再来一局' : '催房主重开';
        refreshStartBtn();
        if (wasOwner && !isRoomOwner) centerNotify('房主已移交给他人 👑');
      }
      // 重连/新进房：本地天赋副本清空，等第一帧快照按服务端的 talent 回填（服务端才是权威，且离线期间原样保留）。
      // 不回填的话：页面一刷新本地就是全 0，玩家随手点一下「+」就会把这份 0 反向覆盖回服务端 = 天赋凭空蒸发。
      _talentPulled = false;
      if (snap.resumed) centerNotify('已接回原席位（命数/战绩保留）🔄');
      return;
    }
    if (snap.type === 'static') {
      if (game) game.applyStatic(snap);   // 一次性静态数据（地形+房主配置）：建房/加入/接管/开局各发一次
      return;
    }
    if (snap.type === 'leftRoom') { return; }   // 主动回大厅的确认回执（UI 已在点击时切走）
    if (snap.type === 'error') { centerNotify(snap.msg || '操作被拒绝'); return; }
    if (snap.type === 'nudgeHost') { centerNotify(`${snap.name || '玩家'} 催你再来一局 🔁`); return; }   // 客户端催房主重开
    if (snap.type === 'hostChanged') {   // 原房主退出，relay 已把房主移交给房内剩余第一人
      if (snap.hostId === myId) {
        // 【只提升房主权限，绝不改 mode】权威模拟仍在 relay 上，我依旧是网络意义上的客户端。
        isRoomOwner = true; isPromotedOwner = true;
        const rb = el('btn-restart'); if (rb) rb.textContent = '再来一局';   // 权限变了，按钮文案必须跟着变
        refreshStartBtn();                                                   // 等待房的「开始」按钮也要放出来
        centerNotify('原房主已退出，你成为新房主 👑');
      } else {
        centerNotify(`${snap.name || '玩家'} 成为新房主 👑`);
      }
      return;
    }
    if (snap.type === 'state') {
      // 进房后第一帧带天赋的快照：把服务端权威天赋回填进本地副本（只做一次，之后本地改动照常上行）
      if (!_talentPulled && Array.isArray(snap.players)) {
        const mine = snap.players.find((p) => p.id === myId);
        if (mine && mine.talent) { Object.assign(talent, mine.talent); _talentPulled = true; _tpLastSig = ''; }
      }
      game.applySnapshot(snap);   // HUD 由渲染帧统一驱动，避免每快照重复重建计分板
    }
  });
  net.onRoomList((list) => renderRoomList(list));
  // 「王者460」式延迟 HUD：每收到一次 pong 回显就刷新（net.js ClientNet 每 1s 测一次 RTT）
  net.onRtt((rtt) => updatePingHud(rtt));
  // 浏览器连中心化 relay（权威服务器）。地址由 relay 注入页面的 window.__RELAY_WS__ 接管，跨设备打开即自动连；
  // ?host= URL 参数仍可手动覆盖。
  const ip = null;
  await net.connect(ip);
  el('hud-status').textContent = '已连接房间';
  const hi = el('host-info');
  if (hi) {
    hi.classList.remove('hidden');
    hi.innerHTML = `游戏地址：<b>${location.origin}</b>　·　把这个地址发给好友，他们打开即可搜索并加入你的房间`;
  }
}

// 回到大厅（主动离开当前房间）：服务器置 state=0 保留席位（命数/战绩都在，回来可认领），
// 关闭连接、清房主权限、回主菜单。绝不触发自动重连（close 会置 _leftIntent）。
function goLobby() {
  stopLoop();
  if (net) {
    if (net.leaveRoom) { try { net.leaveRoom(); } catch (_) {} }   // 上行 leaveRoom（setOffline 保席位）
    if (net.close) { try { net.close(); } catch (_) {} }          // 关 WS（置 _leftIntent，不再自动重连）
  }
  net = null;
  isRoomOwner = false; isPromotedOwner = false;
  el('hud-status').textContent = '';
  hide('hud'); hide('result'); hide('talent-panel');
  closeOverlays();   // 局内点「回到大厅」时设置面板/布局提示条若开着，一并收掉，否则盖在菜单前
  show('menu');
}

// 等待房「开始」按钮的显隐与文案：房主看得见按钮，其他人看提示。
// 除进房外，房主移交 / 重连接回房主 / 结算后回等待房 都要重刷——
// 否则接任房主回到等待房时按钮还是隐藏的，整局卡死在等待房没人能开始。
// asOwner 省略时按当前 isRoomOwner 判定。
function refreshStartBtn(asOwner) {
  const owner = (asOwner === undefined) ? isRoomOwner : !!asOwner;
  const sw = el('btn-start-wave');
  const hint = el('wave-hint');
  const md = (game && game.state && game.state.mode) || gameMode;
  if (owner) {
    // disabled 必须在这里无条件复位：它唯一的置 true 来源是对战等待房的 canStart 门槛(ui.js)，
    // 而「回到大厅→再建房」并不重建 DOM，置灰状态会原样带进新房间；wave 等待房又没有任何代码
    // 会把它置回 false（只有 status==='playing' 那一处会），于是开不了局→永远进不了 playing→死锁。
    // 进房即复位，对战的置灰交给下一帧快照按 canStart 重新判定。
    if (sw) { sw.style.display = ''; sw.disabled = false; sw.textContent = md === 'versus' ? '⚔️ 开始对战' : '🧟 开始僵尸浪潮'; }
    // 对战的提示行要留着给 ui.js 写 ready 名单（谁还没配好 / 全员已备好），只有 wave 才藏
    if (hint && md !== 'versus') hint.style.display = 'none';
  } else {
    if (sw) sw.style.display = 'none';
    if (hint) { hint.style.display = ''; if (md !== 'versus') hint.textContent = '等待房主开始游戏…'; }
  }
}

// 进入游戏（等待态）：房主显示「开始」按钮；客户端显示「等待房主开始」
function enterGame(isHost) {
  const wo = el('wave-overlay');
  if (wo) {
    wo.classList.remove('hidden');
    refreshStartBtn(isHost);
  }
  // 上行输入 —— 指令流（现代 FPS 同步）：
  // 不再用 33ms 定时器发"按键状态"（状态式起停/变向生效时长与服务器差 1~2 tick → 持续对账回拉 = 460 感）。
  // 改为：渲染帧循环里每帧喂输入 → game.predictTick 按固定 1/60 切成带 seq 的指令
  // → 本地立即模拟（零延迟）→ 经 onCmds 批量上行 → 服务器逐条精确模拟并回 ack → 客户端回滚重放。
  if (game) game.onCmds = (cmds) => { if (net && net.send) net.send({ type: 'input', cmds }); };
  startLoop();
}

// ---------------- 主机（建房）流程 ----------------
// opts = { bounce, zmix }：子弹反弹开关 / 僵尸出现方式（房主在 mode-select 选定）
async function startHost(gm, lv, opts) {
  // 自己建的房：网络角色 host（浏览器建房者），并天然持有房主权限；玩法由本地选项决定，非接任
  mode = 'host'; myId = 'host'; isRoomOwner = true; isPromotedOwner = false;
  { const rb = el('btn-restart'); if (rb) rb.textContent = '再来一局'; }   // 房主直接重开：文案随身份刷新（初始化只设过一次，房主路径必须再校正）
  if (gm) gameMode = gm;
  if (lv != null) gameLives = lv;
  if (opts) { if ('bounce' in opts) gameBounce = !!opts.bounce; if (opts.zmix) gameZmix = opts.zmix; if ('target' in opts && opts.target != null) gameTarget = opts.target | 0; }
  // 名字从建房页输入框取（主机/客户端都可改）
  const nm = el('player-name-create') ? el('player-name-create').value.trim() : '';
  if (nm) { myName = nm.slice(0, 12); saveName(myName); }
  hide('menu'); hide('join'); hide('mode-select');
  closeOverlays();   // 建房前若开着设置/布局提示，进房后一起收掉，否则盖住 HUD
  show('hud');
  applyControlVisibility();
  game.hostInit(myName);
  game.state.mode = gameMode;   // 等待房阶段本地立即持有正确 mode（天赋面板显隐依赖它；relay 快照到达前也正确）
  const vc = versusConfig();
  if (vc && game.setConfig) game.setConfig(vc);   // 浏览器建房也本地预置房主配置（与 relay 快照到达前 HUD 一致）
  try {
    await connectNet();
    // relay 多房间：建房并带模式/选项/名字，建房者成为房主
    await net.createRoom({ name: myName, mode: gameMode, lives: gameLives, target: gameMode === 'wave' ? gameTarget : 0, bounce: gameBounce, zmix: gameZmix, config: versusConfig(), pid: myPid });
    enterGame(true);
  }
  catch (e) { alert('建房失败：' + e.message); show('menu'); hide('hud'); }
}

// 打开「选择游戏类型」面板（建房前）
function openModeSelect() {
  gameMode = 'wave'; gameLives = 1; gameTarget = 100; gameBounce = false; gameZmix = 'progress';
  const ms = el('mode-select');
  if (!ms) { startHost('wave', 1, { bounce: false, zmix: 'progress', target: 100 }); return; }
  // 重置 UI 状态
  const bWave = el('mode-wave'), bVersus = el('mode-versus');
  if (bWave) bWave.classList.add('active');
  if (bVersus) bVersus.classList.remove('active');
  const bBounce = el('bounce-toggle');
  if (bBounce) bBounce.checked = false;
  const nc = el('player-name-create'); if (nc && !nc.value) nc.value = myName;
  const zP = el('zmix-progress'), zM = el('zmix-mix');
  if (zP) zP.classList.add('active');
  if (zM) zM.classList.remove('active');
  updateLivesLabel(); updateTargetLabel();
  syncModeOptions();
  closeOverlays();   // 菜单里开着设置就点「建房」时，别让设置盖住选类型页
  hide('menu'); show('mode-select');
}

function updateLivesLabel() {
  const lab = el('lives-label');
  if (lab) lab.textContent = gameLives === 0 ? '∞' : String(gameLives);
}

function updateTargetLabel() {
  const lab = el('target-label');
  if (lab) lab.textContent = gameTarget === 0 ? '∞' : String(gameTarget);
}

// 根据当前模式联动建房选项显隐：
//   - 命数：两种模式都可设（wave 默认 1、versus 默认 3；0 = 无限命）
//   - 击杀目标 / 僵尸出现方式：仅僵尸浪潮显示（对战无僵尸，这两项无意义）
function syncModeOptions() {
  const isVersus = gameMode === 'versus';
  const livesRow = el('lives-row');
  if (livesRow) livesRow.classList.toggle('hidden', false);
  const targetRow = el('target-row');
  if (targetRow) targetRow.classList.toggle('hidden', isVersus);
  const zmixRow = el('zmix-row');
  if (zmixRow) zmixRow.classList.toggle('hidden', isVersus);
  // 高级配置（13 项对战规则）仅对战模式显示
  const adv = el('adv-config');
  if (adv) adv.classList.toggle('hidden', !isVersus);
}

// ---------------- 客户端（加入）流程：搜索房间 → 选房进 ----------------
async function startJoin() {
  mode = 'client'; isRoomOwner = false; isPromotedOwner = false;   // 回主菜单后重新加入：清掉上一局接任来的房主权限，避免身份粘连
  { const rb = el('btn-restart'); if (rb) rb.textContent = '催房主再来一局'; }   // 客户端改为催房主：文案随身份刷新
  closeOverlays();   // 菜单里开着设置就点「加入房间」时，别让设置盖住搜索页
  hide('menu'); show('join');
  // 进入搜索界面先清空上次的房间卡片、显示「尚未搜索」：否则回大厅(net=null)后
  // 还能点到旧卡片缓存 → joinSelected 时 net 已空、必崩。卡片只由「搜索房间」产出。
  const rl = el('room-list');
  if (rl) rl.innerHTML = '<div class="empty">尚未搜索房间。点「搜索房间」查看可加入的房间。</div>';
  // 预填名字
  const nm = el('player-name-join');
  if (nm && !nm.value) nm.value = myName;
}

// 搜索房间：浏览器走 relay listRooms
async function doSearch() {
  const nm = el('player-name-join');
  if (nm && nm.value.trim()) { myName = nm.value.trim().slice(0, 12); saveName(myName); if (net && net.setName) net.setName(myName); }
  try {
    await connectNet();
    net.listRooms();                // relay 房间列表
  } catch (e) {
    alert('连接失败：' + e.message + '\n请确认服务器已开 relay 且两台设备在同一网络。');
  }
}


// 渲染房间列表（服务器下发的 roomList）
function renderRoomList(list) {
  const rl = el('room-list');
  if (!rl) return;
  if (!list || list.length === 0) {
    rl.innerHTML = '<div class="empty">暂无房间。让好友先「创建房间」吧。</div>';
    return;
  }
  rl.innerHTML = '';
  for (const r of list) {
    const card = document.createElement('div');
    card.className = 'room-card';
    const isVs = r.mode === 'versus';
    const modeLabel = isVs ? '对战' : '僵尸浪潮';
    const players = (r.players && r.players.length) ? r.players.join('、') : '（暂无玩家）';
    const opt = isVs
      ? ('命 ' + (r.lives === 0 ? '∞' : r.lives))
      : ('命 ' + (r.lives === 0 ? '∞' : r.lives) + ' · 目标 ' + (r.target === 0 ? '∞' : r.target));
    card.innerHTML =
      '<div class="rc-main">' +
        '<div class="rc-name">' + escapeHtml(r.name) + '<span class="mode-badge' + (isVs ? ' versus' : '') + '">' + modeLabel + '</span></div>' +
        '<div class="rc-sub">' + r.count + ' 人 · ' + escapeHtml(players) + ' · ' + (r.status === 'playing' ? '进行中' : '等待中') + '</div>' +
        '<div class="rc-opt">' + opt + '</div>' +
      '</div>' +
      '<button class="join-btn" data-room="' + escapeHtml(r.id) + '">加入</button>';
    rl.appendChild(card);
  }
  rl.querySelectorAll('.join-btn').forEach((btn) => {
    btn.onclick = () => joinSelected(btn.getAttribute('data-room'));
  });
}

// 选房加入
async function joinSelected(roomId) {
  try {
    // 自建 net：进入搜索界面时 net 可能因回大厅被置空，且房间卡片只由「搜索房间」产出；
    // 这里兜底确保 net 存在再发 joinRoom（与 createRoom/doSearch 对称，不再依赖其副作用）
    if (!net) await connectNet();
    await net.joinRoom(roomId, myName, myPid);
    hide('join'); closeOverlays(); show('hud');
    applyControlVisibility();
    enterGame(false);
  } catch (e) {
    alert('加入失败：' + e.message);
  }
}

// ---------------- 显示/隐藏对应控制 ----------------
function applyControlVisibility() {
  const touchUI = el('controls');      // 左摇杆
  const lookUI = el('look-zone');      // 右半屏滑动转视角
  const fireUI = el('btn-fire');       // 射击键
  const jumpUI = el('btn-jump');       // 跳跃键
  const pcUI = el('pc-help');          // WASD 提示
  if (CTRL_MODE === 'touch') {
    [touchUI, lookUI, fireUI, jumpUI].forEach((e) => e && e.classList.remove('hidden'));
    if (pcUI) pcUI.classList.add('hidden');
  } else {
    [touchUI, lookUI, fireUI, jumpUI].forEach((e) => e && e.classList.add('hidden'));
    if (pcUI) pcUI.classList.remove('hidden');
  }
}

// ---------------- 游戏循环 ----------------
// 游戏循环：渲染走 rAF（前台才跑）；浏览器只负责渲染 + 上行输入，权威模拟与广播全在 relay 进程(sim-core.js)。
let lastInput = null;        // 本渲染帧读到的输入（getInput 每帧只调一次，结果在此共享）

// 实时帧率 HUD（正式功能，非调试）：用 requestAnimationFrame 的真实回调间隔算 FPS，
// 不依赖 ?debug，撤调试埋点时此 HUD 保留。每 0.5s 刷新一次显示。
// 它是渲染真实吞吐——若它满 60 但画面仍跳，说明是网络/快照抖动而非帧率。
let _fpsEl = null, _fpsLast = 0, _fpsCount = 0, _fpsAccum = 0;
function ensureFpsHud() {
  if (_fpsEl || typeof document === 'undefined') return;
  _fpsEl = document.createElement('div');
  _fpsEl.id = 'fps-hud';
  _fpsEl.textContent = '-- FPS';
  _fpsEl.style.cssText = 'position:fixed;top:4px;right:6px;z-index:30;'
    + 'font:600 12px/1.3 ui-monospace,Menlo,Consolas,monospace;'
    + 'color:#7CFFB2;background:rgba(0,0,0,.42);padding:2px 7px;border-radius:7px;'
    + 'pointer-events:none;-webkit-user-select:none;user-select:none;letter-spacing:.3px;';
  document.body.appendChild(_fpsEl);
}

// 网络延迟 HUD（参考王者「460」式指示器）：显示手机↔relay 的实时往返延迟(RTT)，
// 颜色随延迟分级——绿(流畅)/黄(可感)/红(严重卡顿预警)。FPS 只反映屏幕重绘、测不出网络，
// 这个才反映「网络波动」：满 60 帧但延迟红 = 屏幕在重绘、游戏世界却在等服务器。
let _pingEl = null, _rttEma = null;
function ensurePingHud() {
  if (_pingEl || typeof document === 'undefined') return;
  _pingEl = document.createElement('div');
  _pingEl.id = 'ping-hud';
  _pingEl.textContent = '📶 --';
  _pingEl.style.cssText = 'position:fixed;top:26px;right:6px;z-index:30;'
    + 'font:600 12px/1.3 ui-monospace,Menlo,Consolas,monospace;'
    + 'color:#9aa0a6;background:rgba(0,0,0,.42);padding:2px 7px;border-radius:7px;'
    + 'pointer-events:none;-webkit-user-select:none;user-select:none;letter-spacing:.3px;';
  document.body.appendChild(_pingEl);
}
function updatePingHud(rtt) {
  if (!_pingEl) return;
  // EMA 平滑（0.7 旧 + 0.3 新），避免数字乱跳又保留对突变的响应
  _rttEma = (_rttEma == null) ? rtt : (_rttEma * 0.7 + rtt * 0.3);
  const v = Math.round(_rttEma);
  let color, label;
  if (v <= 80)       { color = '#7CFFB2'; label = '📶 ' + v + 'ms'; }       // 流畅
  else if (v <= 180) { color = '#FFD166'; label = '📶 ' + v + 'ms'; }       // 可感延迟
  else               { color = '#FF5C5C'; label = '⚠ ' + v + 'ms 高延迟'; } // 严重（王者「460」同款预警）
  _pingEl.textContent = label;
  _pingEl.style.color = color;
}

// ── U4 / Quarkium 内核识别（夸克与 UC 同为 UC 团队出品、同一内核系）──────────────
// 依据 UC 官方开发者文档《U4内核的游戏模式》(developers.uc.cn/blog/open_cnktmy.html)：
//   ① "浏览器 requestAnimationFrame 的实现比较复杂，需要在 UI 线程注册 vSync 的回调，并且涉及
//      多次进程/线程间的双向通讯……反而导致了额外的开销，增加了 CPU 的占用。在游戏模式下使用
//      setTimeout 让主线程自己控制游戏循环，延迟更低，CPU 占用更低。" ⇒ U4 上 setTimeout 优于 rAF。
//   ② "在 WebGL 绘制的过程中最好不要同时频繁更新其它 DOM 元素……浏览器需要同时运行两条渲染
//      流水线，性能反而会变得更糟糕。" ⇒ 本工程原先每帧都调 updateHud/syncTalentPanel 改 DOM，
//      正撞这条禁忌；U4 上把 HUD 降到 10Hz。
// 之所以按 UA 分流而不是全局改：标准 Chromium（Edge/Chrome/vivo 自带）上 rAF 与 vSync 对齐、
// 每帧更 DOM 也无惩罚，实测本来就丝滑 ⇒ 一行都不动，零回归风险。
const IS_U4 = (() => {
  try { return /Quark|UCBrowser|UCWEB/i.test(navigator.userAgent || ''); } catch (_) { return false; }
})();
const LOOP_DT = 1000 / 60;        // U4 setTimeout 主循环目标节拍
const HUD_MS = IS_U4 ? 100 : 0;   // U4：HUD/DOM 更新降到 ~10Hz；0 = 每帧（标准内核保持原行为）
let _loopTimer = null;            // U4 setTimeout 循环句柄（stopLoop 需清理，否则回大厅后仍在跑）
let _hudLastT = 0;


function startLoop() {
  if (loopRunning) return;
  loopRunning = true;
  if (_loopTimer) { clearTimeout(_loopTimer); _loopTimer = null; }   // 清掉上一局可能残留的循环
  _hudLastT = 0;
  _fpsLast = 0; _fpsCount = 0; _fpsAccum = 0;   // 重置 FPS 统计，避免回环重启时一帧巨 dt
  _rttEma = null;                                // 重置延迟平滑，避免上一局旧值残留
  ensureFpsHud();   // 帧率 HUD 进游戏即显示（正式功能，非调试）
  ensurePingHud();  // 网络延迟 HUD（同正式功能）


  function frame(t) {
    if (!loopRunning) return;   // 软复位/回菜单后由 stopLoop 置 false，rAF 链在此自然断掉
    // 实时帧率：用 rAF 真实回调间隔累算，每 0.5s 刷新一次（真实渲染吞吐，非造假）
    if (_fpsLast) {
      _fpsAccum += (t - _fpsLast);
      _fpsCount++;
      if (_fpsAccum >= 500) {
        const fps = Math.round(_fpsCount * 1000 / _fpsAccum);
        if (_fpsEl) _fpsEl.textContent = fps + ' FPS';
        _fpsAccum = 0; _fpsCount = 0;
      }
    }
    _fpsLast = t;
    if (game) {
      game.myPitch = (controls && controls.getAimPitch) ? controls.getAimPitch() : 0;       // 本地俯仰角喂给相机
      game.myYaw = (controls && controls.aimYaw != null) ? controls.aimYaw : null;           // 本地瞬时 yaw 喂给相机：零延迟跟手，准星即弹道
      // 每帧喂当前输入状态：predictTick 会按固定 1/60 把它切成带 seq 的指令（本地模拟+上行）
      // 注意：getInput() 会消费跳跃边沿（读一次即清零），所以一帧只准调用一次，
      // 每帧只调一次 getInput（跳跃边沿读后即清），结果缓存给本帧其余消费者复用——否则边沿被吃掉 ⇒ 按跳没反应。
      if (controls && controls.getInput) {
        const inp = controls.getInput();
        lastInput = inp;
        if (game.feedLocalInput) game.feedLocalInput(inp);
      }
    }
    game.render();
    // HUD/天赋面板是 DOM 更新。U4 内核在 WebGL 绘制期频繁改 DOM 会被迫跑两条渲染流水线（官方
    // 明令的禁忌，见 IS_U4 处引文）⇒ 降到 10Hz；标准内核 HUD_MS=0，行为与改动前完全一致。
    if (!HUD_MS || (t - _hudLastT) >= HUD_MS) {
      _hudLastT = t;
      updateHud(game.state, myId);
      syncTalentPanel(game.state);   // 对战等待态：天赋面板显隐/点数刷新（签名不变零开销）
    }
    schedule();
  }

  // 排下一帧：U4 用 setTimeout 自己控节拍（官方推荐，不依赖 vSync 回调）；其余浏览器保持原生 rAF。
  // 注：U4 会把 setTimeout 贴到自身最小间隔（~5.5ms），故 render 可能跑满该地板、帧率虚高，
  // 但游戏逻辑是服务端 60Hz 权威 + 客户端固定 1/60 步长，render 空转不改速度，无害。
  let _lastSchedT = performance.now();
  function schedule() {
    if (!loopRunning) return;
    if (!IS_U4) { requestAnimationFrame(frame); return; }
    const now = performance.now();
    const delay = Math.max(0, LOOP_DT - (now - _lastSchedT));
    _lastSchedT = now;
    _loopTimer = setTimeout(() => { if (loopRunning) frame(performance.now()); }, delay);
  }
  schedule();   // 首帧立即跑


}

// 停止渲染循环（软复位用）：置 false 让 rAF 链自然断；U4 的 setTimeout 循环需显式清
function stopLoop() {
  loopRunning = false;
  if (_loopTimer) { clearTimeout(_loopTimer); _loopTimer = null; }   // U4 setTimeout 循环需显式清，否则回大厅后仍在渲染
}

// ---------------- 全屏切换（FPS 常见：F 键 / 按钮，兼容 iOS webkit）----------------
// 手机端进全屏时顺手锁横屏（安卓 Chrome 支持；iOS Safari 锁不了，竖屏照常能玩——布局按方向各存一套）
function toggleFullscreen() {
  const de = document.documentElement;
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
  const entering = !fsEl;
  try {
    // requestFullscreen/exitFullscreen 同样返回 Promise，被拒（非用户手势、iOS Safari 不支持、
    // 权限策略）时不 catch 会冒泡成 unhandledrejection → 顶部红条。良性，静默吞掉。
    const p = entering
      ? (de.requestFullscreen || de.webkitRequestFullscreen || function () {}).call(de)
      : (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
    if (p && typeof p.catch === 'function') {
      // 方向锁必须在全屏生效之后才允许调用，所以挂在 Promise 后面；失败也静默
      p.then(() => { if (entering && CTRL_MODE === 'touch') lockLandscape(); }).catch(() => {});
    } else if (entering && CTRL_MODE === 'touch') {
      setTimeout(() => lockLandscape(), 60);   // 老式同步 API 兜底
    }
    if (!entering) unlockOrientation();        // 退出全屏解锁方向，别把系统方向一直占着
  } catch (_) { /* iOS Safari 可能不支持，静默忽略 */ }
  // 全屏切换后主动 resize 一次（保险：部分浏览器 fullscreenchange 不触发 window resize）
  setTimeout(() => game && game.resize(), 80);
}

// ---------------- 初始化应用（等 DOM ready）----------------
function initApp() {
  const canvas = document.getElementById('game-canvas');
  game = new Game(canvas);
  const modeOpt = { mode: CTRL_MODE, canvas, moveEl: document.getElementById('joy-move'), lookEl: document.getElementById('look-zone'), fireEl: document.getElementById('btn-fire'), jumpEl: document.getElementById('btn-jump'), settings };
  controls = new Controls(modeOpt);

  el('btn-create').onclick = () => openModeSelect();
  el('btn-join').onclick = () => startJoin();
  el('btn-search-rooms').onclick = () => doSearch();
  el('btn-back').onclick = () => { if (net && net.close) { try { net.close(); } catch (_) {} } net = null; closeOverlays(); show('menu'); hide('join'); };

  // 预填玩家名（主机/客户端输入框都默认用已保存的名字）
  const ni = el('player-name-join'); if (ni && !ni.value) ni.value = myName;
  const nc = el('player-name-create'); if (nc && !nc.value) nc.value = myName;

  // 模式选择面板
  const bWave = el('mode-wave'), bVersus = el('mode-versus');
  if (bWave) bWave.onclick = () => {
    gameMode = 'wave';
    gameLives = 1; gameTarget = 100;          // wave 默认值：1 命 / 100 击杀
    bWave.classList.add('active'); bVersus && bVersus.classList.remove('active');
    updateLivesLabel(); updateTargetLabel();
    syncModeOptions();
  };
  if (bVersus) bVersus.onclick = () => {
    gameMode = 'versus';
    gameLives = DEFAULT_LIVES;                 // versus 默认可调命数
    bVersus.classList.add('active'); bWave && bWave.classList.remove('active');
    updateLivesLabel();
    syncModeOptions();
  };
  const bLess = el('lives-less'), bMore = el('lives-more');
  if (bLess) bLess.onclick = () => { gameLives = Math.max(0, gameLives - 1); updateLivesLabel(); };   // 两种模式都允许 0 = 无限命
  if (bMore) bMore.onclick = () => { gameLives = Math.min(20, gameLives + 1); updateLivesLabel(); };
  const tLess = el('target-less'), tMore = el('target-more');
  if (tLess) tLess.onclick = () => { gameTarget = Math.max(0, gameTarget - 10); updateTargetLabel(); };
  if (tMore) tMore.onclick = () => { gameTarget = Math.min(500, gameTarget + 10); updateTargetLabel(); };
  const bModeStart = el('btn-mode-start');
  if (bModeStart) bModeStart.onclick = () => startHost(gameMode, gameLives, { bounce: gameBounce, zmix: gameZmix, target: gameMode === 'wave' ? gameTarget : 0 });
  const bModeBack = el('btn-mode-back');
  if (bModeBack) bModeBack.onclick = () => { hide('mode-select'); closeOverlays(); show('menu'); };

  // 子弹反弹开关 + 僵尸出现方式（房主设定，权威）
  const bBounce = el('bounce-toggle');
  if (bBounce) bBounce.onchange = () => { gameBounce = !!bBounce.checked; };
  const zProg = el('zmix-progress'), zMix = el('zmix-mix');
  if (zProg) zProg.onclick = () => { gameZmix = 'progress'; zProg.classList.add('active'); zMix && zMix.classList.remove('active'); };
  if (zMix) zMix.onclick = () => { gameZmix = 'mix'; zMix.classList.add('active'); zProg && zProg.classList.remove('active'); };

  const restartBtn = el('btn-restart');
  restartBtn.textContent = isRoomOwner ? '再来一局' : '催房主再来一局';   // 判「房主权限」而非网络角色：接任房主也要显示"再来一局"
  restartBtn.onclick = () => {
    closeOverlays();   // 结算页若开着设置就点「再来一局」，进游戏/回等待房后一起收掉
    // 有房主权限者（网页建房 / relay 移交来的接任房主）
    if (isRoomOwner) {
      const md = (game && game.state && game.state.mode) || gameMode;
      // 对战：不直接重开，先回等待房——上一局结束时全员 ready 已作废，必须给大家重新配天赋的机会。
      // （直接 startGame 会被"等待配置天赋"门槛顶回来，且那时面板根本不弹 = 死锁，见 sim-core.backToWaiting）
      if (md === 'versus') {
        if (net && net.send) net.send({ type: 'backToWaiting' });
        refreshStartBtn();
        return;
      }
      // 僵尸浪潮：没有 ready 门槛，保持原节奏直接重开
      if (net && net.send) net.send(startGameMsg());
      return;
    }
    // 客户端（非房主）：没有开局权限——改为催房主再来一局（房主收到后弹中央提示，由其手动重开）
    if (net && net.send) {
      net.send({ type: 'nudgeHost', action: 'restart', name: myName });
      centerNotify('已催房主再来一局 🔁');
      el('hud-status').textContent = '已催房主再来一局，等待房主重开…';
    }
  };
  el('btn-start-wave').onclick = () => {
    closeOverlays();   // 等待房里开着设置就点「开始」，进游戏后一起收掉
    // 有房主权限者：把开局指令发给权威端(relay) 执行；无权限者仍发 startGame 请求由权威端裁决
    if (isRoomOwner) {
      if (net && net.send) net.send(startGameMsg());
    } else if (net && net.send) {
      net.send({ type: 'startGame', mode: gameMode, lives: gameLives, target: gameMode === 'wave' ? gameTarget : 0, bounce: gameBounce, zmix: gameZmix, config: versusConfig() });
    }
    el('wave-overlay').classList.add('hidden');
  };

  // 天赋加点面板：−/＋ 按钮（本地立即校验 + 上行；服务器端 setTalent 再兜底校验）
  document.querySelectorAll('#talent-panel .tp-row').forEach((row) => {
    const key = row.dataset.t;
    const plus = row.querySelector('.tp-plus'), minus = row.querySelector('.tp-minus');
    if (plus) plus.onclick = () => {
      const T = _talentCfg();
      const lv = talent[key] | 0;
      if (lv >= (T.maxLevel | 0)) return;
      const nextCost = talentCost(lv + 1) - talentCost(lv);
      const left = (T.pointsPerPlayer | 0) - talentTotalCost(talent);
      if (nextCost > left) return;
      talent[key] = lv + 1;
      _sendTalentNow();
      if (game && game.state) syncTalentPanel(game.state);
    };
    if (minus) minus.onclick = () => {
      if ((talent[key] | 0) <= 0) return;
      talent[key] -= 1;
      _sendTalentNow();
      if (game && game.state) syncTalentPanel(game.state);
    };
  });

  // 「✔ 配好了」：把 ready 标志位置 1（局内局外同一条路径，不分场合）。
  //   标志位一到位，面板自然收起；下次离线/阵亡/开局/回等待房被清 0 时又自然弹出。
  //   若正在对局中(复活窗口)，顺手把指针锁回画布，复活即无缝回到战斗视角。
  const tpClose = el('tp-close');
  if (tpClose) tpClose.onclick = () => {
    // 乐观隐藏：先本地收起，别等一个 RTT。1.5s 内标志位没回来（ready 包丢了）就重新弹出，不会卡死看不见面板。
    _optHideUntil = Date.now() + 1500;
    const tp = el('talent-panel'); if (tp) tp.classList.add('hidden');
    _tpLastSig = '';   // 强制下帧重算签名
    if (net && net.send) net.send({ type: 'ready', ready: true });
    // 刚 exitPointerLock 不久，浏览器处于 ~1.25s 锁定冷却期 → lockPointer 会自动排队补锁（不再抛 reject）
    if (game && game.state && game.state.status === 'playing') {
      lockPointer(document.getElementById('game-canvas'));
    }
  };

  // 全屏开关：右上角按钮（手机/电脑均可点）+ PC 端按 F 键；切换后重适配渲染
  const fsBtn = el('btn-fullscreen');
  if (fsBtn) fsBtn.onclick = () => toggleFullscreen();
  window.addEventListener('keydown', (e) => { if (e.code === 'KeyF') { e.preventDefault(); toggleFullscreen(); } });
  ['fullscreenchange', 'webkitfullscreenchange'].forEach((ev) =>
    document.addEventListener(ev, () => game && game.resize()));

  // ---------------- 设置面板（按设备类型拆分：PC=鼠标灵敏度+改键 / 触摸=转视角·摇杆·布局）----------------
  const sPanel = el('settings-panel');
  const applySettingsVisibility = () => {
    const pc = el('set-pc'), touch = el('set-touch');
    if (CTRL_MODE === 'touch') { pc && pc.classList.add('hidden'); touch && touch.classList.remove('hidden'); }
    else { pc && pc.classList.remove('hidden'); touch && touch.classList.add('hidden'); }
  };
  el('btn-settings').onclick = () => { sPanel.classList.toggle('hidden'); applySettingsVisibility(); };
  // 局内设置→回到大厅：避免「困死」（如结算后无路可退）。等价于主动离开房间，席位保留可重连。
  const leaveLobbyBtn = el('btn-leave-lobby');
  if (leaveLobbyBtn) leaveLobbyBtn.onclick = () => goLobby();
  // 结算层「回主菜单」也走同一路径（置 _leftIntent，不会因自动重连又弹回房间）
  el('btn-result-menu').onclick = () => goLobby();
  el('set-close').onclick = () => sPanel.classList.add('hidden');

  // ---- 触摸：转视角/摇杆灵敏度 + 拖动布置 ----
  const setLook = el('set-look'), setJoy = el('set-joy');
  const valLook = el('val-look'), valJoy = el('val-joy');
  setLook.value = settings.lookSens; valLook.textContent = settings.lookSens.toFixed(1);
  setJoy.value = settings.joySens; valJoy.textContent = settings.joySens.toFixed(1);
  setLook.oninput = () => {
    settings.lookSens = parseFloat(setLook.value);
    valLook.textContent = settings.lookSens.toFixed(1);
    if (controls) controls.lookSens = settings.lookSens;
    saveSettings(settings);
  };
  setJoy.oninput = () => {
    settings.joySens = parseFloat(setJoy.value);
    valJoy.textContent = settings.joySens.toFixed(1);
    if (controls) { controls.joySens = settings.joySens; if (controls.move) controls.move.sens = settings.joySens; }
    saveSettings(settings);
  };
  const setEditBtn = el('set-edit');
  const layoutHint = el('layout-hint');
  const refreshEditBtn = () => {
    setEditBtn.textContent = '拖动布置：' + (settings.editMode ? '开' : '关');
    setEditBtn.classList.toggle('primary', settings.editMode);
    [el('joy-move'), el('btn-fire'), el('btn-jump')].forEach((e) => e && e.classList.toggle('editing', settings.editMode));
    // 布置中：把设置面板收起（否则它盖住要拖的按钮，竖屏几乎全挡），改用顶部浮条 + 「完成」退出
    if (layoutHint) {
      layoutHint.classList.toggle('hidden', !settings.editMode);
      const o = el('lh-orient');
      if (o) o.textContent = (window.innerWidth >= window.innerHeight) ? '横屏' : '竖屏';
    }
    if (settings.editMode) sPanel.classList.add('hidden');
  };
  const setEdit = (on) => {
    settings.editMode = !!on;
    if (controls && controls.setLayoutEdit) controls.setLayoutEdit(settings.editMode);
    refreshEditBtn();
    saveSettings(settings);
  };
  setEditBtn.onclick = () => setEdit(!settings.editMode);
  const lhDone = el('lh-done');
  if (lhDone) lhDone.onclick = () => setEdit(false);
  // 布置中转屏：浮条上的方向文案跟着更新（提醒"现在改的是另一套布局"）
  window.addEventListener('orientationchange', () => setTimeout(refreshEditBtn, 200));
  window.addEventListener('resize', () => { if (settings.editMode) refreshEditBtn(); });
  el('set-reset').onclick = () => {
    // 重置：恢复默认灵敏度 + 横竖屏两套默认布局
    Object.assign(settings, defaultSettings());
    if (controls) {
      controls.lookSens = settings.lookSens;
      controls.joySens = settings.joySens;
      if (controls.move) controls.move.sens = settings.joySens;
      controls._applyLayout();
    }
    setLook.value = settings.lookSens; valLook.textContent = settings.lookSens.toFixed(1);
    setJoy.value = settings.joySens; valJoy.textContent = settings.joySens.toFixed(1);
    refreshEditBtn();
    saveSettings(settings);
  };
  refreshEditBtn();
  if (settings.editMode && controls && controls.setLayoutEdit) controls.setLayoutEdit(true);

  // ---- 电脑：鼠标灵敏度 + 自定义按键 ----
  const setMouse = el('set-mouse'), valMouse = el('val-mouse');
  setMouse.value = settings.mouseSens; valMouse.textContent = settings.mouseSens.toFixed(1);
  setMouse.oninput = () => {
    settings.mouseSens = parseFloat(setMouse.value);
    valMouse.textContent = settings.mouseSens.toFixed(1);
    if (controls) controls.mouseSens = settings.mouseSens;
    saveSettings(settings);
  };
  const KEY_ACTS = ['forward', 'back', 'left', 'right', 'jump'];
  const refreshKeyBtns = () => {
    KEY_ACTS.forEach((act) => {
      const b = document.querySelector('.key-btn[data-act="' + act + '"]');
      const kb = b && b.querySelector('b'); if (kb) kb.textContent = codeToLabel(settings.keys[act]);
    });
  };
  refreshKeyBtns();
  let rebinding = null;
  document.querySelectorAll('.key-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (rebinding) return; // 已在等待按键，忽略
      const act = btn.dataset.act;
      rebinding = act;
      const kb = btn.querySelector('b'); btn.classList.add('listening');
      const old = kb ? kb.textContent : '';
      if (kb) kb.textContent = '…';
      const onKey = (e) => {
        e.preventDefault(); e.stopPropagation(); // 捕获阶段拦截，避免误触游戏内移动/跳跃
        settings.keys[act] = e.code;
        if (controls) controls.keysMap = settings.keys;
        if (kb) kb.textContent = codeToLabel(e.code);
        btn.classList.remove('listening'); rebinding = null;
        saveSettings(settings);
      };
      window.addEventListener('keydown', onKey, { capture: true, once: true });
      setTimeout(() => { // 5 秒未按键则取消重绑
        if (rebinding === act) {
          window.removeEventListener('keydown', onKey, { capture: true });
          if (kb) kb.textContent = old; btn.classList.remove('listening'); rebinding = null;
        }
      }, 5000);
    });
  });
  el('set-keys-reset').onclick = () => {
    Object.assign(settings.keys, defaultSettings().keys);
    if (controls) controls.keysMap = settings.keys;
    refreshKeyBtns(); saveSettings(settings);
  };

  // 夸克/U4 内核兼容警告：仅此类浏览器在主菜单揭示兼容提示条（game.js 已对其做渲染降级兜底）
  if (IS_U4) { const w = document.getElementById('u4-warn'); if (w) w.hidden = false; }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// 把 KeyboardEvent.code 转成简短可读标签（PC 设置面板改键显示用）
function codeToLabel(code) {
  if (!code) return '?';
  let m;
  if ((m = /^Key([A-Z])$/.exec(code))) return m[1];
  if ((m = /^Digit(\d)$/.exec(code))) return m[1];
  if ((m = /^Arrow(Up|Down|Left|Right)$/.exec(code))) return { Up: '↑', Down: '↓', Left: '←', Right: '→' }[m[1]];
  const map = { Space: '␣', ShiftLeft: 'LShift', ShiftRight: 'RShift', ControlLeft: 'LCtrl', ControlRight: 'RCtrl', AltLeft: 'LAlt', AltRight: 'RAlt', Tab: 'Tab', Enter: 'Enter', Backquote: '`' };
  return map[code] || code;
}

// ---------------- 页面真正卸载时主动断开（F5 / 关标签页 / 前进后退）----------------
// 不做这一步的话，「何时关闭连接」完全交由浏览器自行决定：慢的时候（页面重、WebGL 资源多、
// 无线网抖动）关闭帧迟迟发不出去，其他玩家眼里退出者的模型会继续杵在场上，最坏要等
// 40 秒心跳超时才消失。这里抢在浏览器动手之前自己先断，把残留压到毫秒级。
//
// 注意语义：这是「自己走的时候说一声」，不是清退别人 ——
//   · 切后台 / 锁屏进 bfcache（persisted=true）一律跳过，切回来还能接着玩；
//   · relay 的心跳超时原样保留，不缩短、不额外踢人。
let _leftOnUnload = false;
function leaveOnUnload(e) {
  if (e && e.persisted) return;   // 切后台/锁屏进 bfcache 跳过，切回来还能接着玩
  if (_leftOnUnload) return;   // pagehide 与 beforeunload 可能都触发，只执行一次
  _leftOnUnload = true;
  try { if (net && net.close) net.close(); } catch (_) {}
}
window.addEventListener('pagehide', leaveOnUnload);
window.addEventListener('beforeunload', leaveOnUnload);

console.log('[Game4U] 就绪。模式: 桌面/HTML（中心化 relay 客户端）', '| 控制:', CTRL_MODE);
