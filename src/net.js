// net.js — 网络层封装（浏览器中继客户端 + 原生 APK 桥；上层 main.js/game.js 通过统一接口调用）
// 传输层分两种，上层(main.js/game.js)通过统一接口调用，不感知差异：
//   • APK 原生桥 (window.ZombieLan, Java)：主机 TCP 服务 + UDP 广播发现，真机联机（零服务器/自动发现）— 情景1
//   • 浏览器中继 (WebSocket 连本地 relay.cjs)：两电脑 HTML 联机，主机电脑跑免费本地进程当权威服务器 — 情景2
//
// 重要：情景2 下浏览器(无论建房还是加入)都是 relay 的「玩家」，协议统一（多房间）：
//   上行 {type:'listRooms'} / {type:'createRoom',name,playerName,mode,lives,target,bounce,zmix}
//        / {type:'joinRoom',roomId,name} / {type:'input',...} / {type:'startGame',mode,lives,target,bounce,zmix}
//   下行 {type:'roomList',rooms} / {type:'welcome',id,roomId} / {type:'state',...}（权威快照，由 relay 里的 Sim 算出）
//   mode: 'wave' 僵尸浪潮 | 'versus' 对战
//   lives: 命条数（房主设定；wave 也生效，0 = 无限命）；target: 僵尸浪潮击杀目标（0 = 无尽生存）
//   注意：connect() 只建立 WebSocket，不再自动 join；建房/加入由 createRoom/joinRoom 显式触发。

const bridge = (typeof window !== 'undefined') ? window.ZombieLan : null;
export const HAS_NATIVE = !!bridge;
export const HAS_CAP = HAS_NATIVE;

export const DEFAULT_PORT = 5000;
export const DEFAULT_BROADCAST_PORT = 5001;
export const RELAY_PORT = 8123;

if (typeof window !== 'undefined') window.ZB = window.ZB || {};

function call(method, arg) {
  if (!bridge) return null;
  const r = bridge[method](arg ? JSON.stringify(arg) : '');
  if (typeof r === 'string' && r.length) { try { return JSON.parse(r); } catch (_) { return r; } }
  return r;
}

// 中继地址：URL ?host=IP 优先；否则页面由 relay 注入的 __RELAY_WS__；都没有则回退本机
export function relayUrl() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  if (params.get('host')) return `ws://${params.get('host')}:${RELAY_PORT}`;
  if (window.__RELAY_WS__) return window.__RELAY_WS__;
  return null;
}

// 作为玩家连入中继（建房/加入共用）。仅建立 WebSocket，不自动 join（由 createRoom/joinRoom 触发）。
function connectRelay(url) {
  return new Promise((resolve, reject) => {
    let ws;
    try { ws = new WebSocket(url); } catch (e) { reject(e); return; }
    const to = setTimeout(() => { try { ws.close(); } catch (_) {} reject(new Error('relay 连接超时')); }, 4000);
    ws.onopen = () => { clearTimeout(to); resolve(ws); };
    ws.onerror = () => { clearTimeout(to); reject(new Error('relay 连接失败（确认服务器已运行 relay）')); };
  });
}

// ---------------- 原生(APK)专用网络层 ----------------
// 【命名注意】叫 HostNet 但它并不等于「房主」，而是【主机】：本机跑权威模拟(game.js)时用的传输层。
// 唯一实例化点是 main.js 的 `HAS_NATIVE ? new HostNet() : new ClientNet()`，所以浏览器（含网页建房者）
// 永远拿到 ClientNet —— 网页建房只是房主，模拟在 relay 上，它在网络意义上仍是客户端。
// 因此 start() 里那条非原生的连 relay 分支实际不可达，仅作兜底保留。
// 附带结论：hostChanged / nudgeHost 这类 relay 消息只会到 ClientNet，APK 侧收不到，
// 故「接任房主」不可能发生在 APK 上（也就不会误触发本地权威模拟）。
export class HostNet {
  constructor() {
    this.ip = 'dev';
    this.port = DEFAULT_PORT;
    this.ws = null;
    this._name = '玩家' + Math.floor(Math.random() * 900 + 100);
    this.connected = false;
    this._onState = null;
    this._onRoomList = null;
    this._onRoomFound = null;
    this._onHostDropped = null;
    this._onClientConnected = null;
    this._onClientDisconnected = null;
    this._onClientMessage = null;
  }

  async start(roomName, port = DEFAULT_PORT, broadcastPort = DEFAULT_BROADCAST_PORT) {
    if (HAS_NATIVE) {
      const r = call('startHost', { roomName, port, broadcastPort });
      this.ip = r.ip; this.port = r.port;
      return r;
    }
    // 情景2：作为玩家连入中继（建房者的本机已在跑 relay）。仅连 WS，建房由 createRoom 触发。
    const url = relayUrl() || `ws://localhost:${RELAY_PORT}`;
    this.ws = await connectRelay(url);
    this._bindWs();
    this.ip = (typeof location !== 'undefined') ? location.hostname : 'localhost';
    this.port = RELAY_PORT;
    console.log('[net-relay] 主机(玩家)接入中继', url);
    return { ip: this.ip, port: this.port };
  }

  _bindWs() {
    if (!this.ws) return;
    this.ws.onmessage = (e) => {
      let m; try { m = JSON.parse(e.data); } catch (_) { return; }
      if (m.type === 'welcome') { this._onState && this._onState(m); if (this._welcomeResolver) { this._welcomeResolver(m); this._welcomeResolver = null; } }
      else if (m.type === 'state') this._onState && this._onState(m);
    };
  }

  onState(cb) { this._onState = cb; if (HAS_NATIVE) window.ZB.onState = (data) => { try { cb(JSON.parse(data)); } catch (_) {} }; }
  // APK 原生桥无 relay RTT（延迟 HUD 在原生情景下不显示），这里留空实现保持接口一致
  onRtt(cb) { this._onRtt = cb; }
  // 原生主机不通过 WS 接收 roomList（房间即本机单房），但需实现统一接口，避免上层无条件调用崩溃
  onRoomList(cb) { this._onRoomList = cb; }
  // 原生主机无需列出远程房间（它本身就是唯一房间）；加入/搜索走原生 TCP/UDP 发现，不走 WS listRooms
  listRooms() { /* no-op：原生情景下无远端房间列表可拉 */ }

  // ---- 以下为原生(情景1)【客户端】加入远端主机所需（APK↔APK）----
  setName(name) { this._name = name; }

  // 收到 UDP 广播发现的主机列表（Java startScan → window.ZB.onRoomFound）
  onRoomFound(cb) {
    this._onRoomFound = cb;
    if (HAS_NATIVE) window.ZB.onRoomFound = (data) => { try { cb(JSON.parse(data)); } catch (_) {} };
  }

  // 与主机 TCP 连接意外断开（游戏中主机掉线）：回调由上层弹提示并退回菜单
  onHostDropped(cb) { this._onHostDropped = cb; }

  // 启动局域网 UDP 扫描，发现主机（主机通过广播公告自身）
  scan() { if (HAS_NATIVE) call('startScan', { broadcastPort: DEFAULT_BROADCAST_PORT }); }
  stopScan() { if (HAS_NATIVE) call('stopScan'); }

  // 以客户端身份 TCP 连接远端主机（port 默认 5000）。连接成功 resolve；失败/掉线 reject
  connectClient(ip, port = DEFAULT_PORT) {
    return new Promise((resolve, reject) => {
      if (!HAS_NATIVE) { reject(new Error('仅原生支持')); return; }
      this.connected = false;   // 每次连接尝试都从「未连接」起步，确保失败时走 reject 而非 onHostDropped
      window.ZB._connectResolve = () => { this.connected = true; resolve(); };
      window.ZB._connectReject = (msg) => {
        if (this.connected) { if (this._onHostDropped) this._onHostDropped(); }
        else reject(new Error(msg || 'connect-failed'));
      };
      call('connect', { ip, port, name: this._name });
    });
  }
  // 以下仅为原生(情景1)主机保留；中继模式下用不到
  onClientConnected(cb) { this._onClientConnected = cb; if (HAS_NATIVE) window.ZB.onClientConnected = cb; }
  onClientDisconnected(cb) { this._onClientDisconnected = cb; if (HAS_NATIVE) window.ZB.onClientDisconnected = cb; }
  onClientMessage(cb) {
    this._onClientMessage = cb;
    if (HAS_NATIVE) window.ZB.onClientMessage = (cid, data) => { try { cb(cid, JSON.parse(data)); } catch (_) { cb(cid, data); } };
  }

  broadcast(data) {
    if (HAS_NATIVE) { call('broadcast', { data: JSON.stringify(data) }); return; }
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(data));
  }
  sendTo(cid, data) {
    if (HAS_NATIVE) { call('sendTo', { clientId: cid, data: JSON.stringify(data) }); return; }
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(data));
  }
  // 原生客户端上行消息（joinRoom/input/talent 等）到远端主机（走 TCP，由 Java 转发到主机 onClientMessage）
  send(obj) {
    if (HAS_NATIVE) { call('send', { data: JSON.stringify(obj) }); return; }
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(obj));
  }
  stop() {
    if (HAS_NATIVE) { call('stopHost'); return; }
    if (this.ws) { try { this.ws.close(); } catch (_) {} this.ws = null; }
  }
  // 退出/返回：原生(情景1)下既断开客户端 TCP(若连着远端主机)，也停掉本机主机服务(若自己是主机)
  // —— 两种角色共用 HostNet，close 对不适用的一侧是无害空操作。
  close() {
    if (HAS_NATIVE) { call('disconnect'); call('stopHost'); return; }
    if (this.ws) { try { this.ws.close(); } catch (_) {} this.ws = null; }
  }

  // 把权威快照(已 JSON 字符串)推给所有经 WS 加入的浏览器客户端（手机原生主机桥接用）
  pushWsState(json) {
    if (HAS_NATIVE && json) call('pushWsState', { data: json });
  }
}

// ---------------- 客户端（中继多房间）----------------
export class ClientNet {
  constructor() {
    this.connected = false;
    this.ws = null;
    this.clientId = 'bc-' + Math.random().toString(36).slice(2, 9);
    this._name = '玩家' + Math.floor(Math.random() * 900 + 100);
    this._onState = null;
    this._onRoomList = null;
    this._welcomeResolver = null;
    this._welcomeRejecter = null;
    this._leftIntent = false;       // 主动「回到大厅」/退出：close 时不再自动重连
    this._reconnectTimer = null;    // 断线重连定时器
    this._joinInfo = null;          // {type,roomId,name,pid,opts}：断线自动重连认领原席位用
    this._pingTimer = null;         // RTT 测速/保活定时器（1s）
    this._onRtt = null;             // RTT 回调（main.js 用于「王者460」式延迟 HUD）
    this._relayUrl = null;          // 当前连接的 relay 地址（重连用）
  }

  setName(name) { this._name = name; }

  async connect(ip, port = RELAY_PORT) {
    if (HAS_NATIVE) {
      return new Promise((resolve, reject) => {
        this._resolve = resolve; this._reject = reject;
        if (typeof window !== 'undefined') {
          window.ZB._connectResolve = () => { this.connected = true; resolve(); };
          window.ZB._connectReject = (msg) => { this.connected = false; reject(new Error(msg || 'connect-failed')); };
        }
        call('connect', { ip, port, name: this._name });
      });
    }
    // 情景2：作为玩家连入中继（ip 为空=用页面注入地址；否则连指定主机IP）。仅连 WS，不自动 join。
    const url = (ip && ip !== 'localhost' && ip !== '127.0.0.1')
      ? `ws://${ip}:${port}`
      : (relayUrl() || `ws://localhost:${port}`);
    this._relayUrl = url;
    this.ws = await connectRelay(url);
    // RTT 测速 + 保活：每 1s 发一次 {type:'ping',t:发送时刻}（relay 原样回显 t，见 relay.cjs）。
    // 既给「王者460」式延迟 HUD 提供真实往返延迟，也兼作连接保活（服务器靠任何流量判定在线）。
    this._pingTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === 1) this.send({ type: 'ping', t: (typeof performance !== 'undefined' ? performance.now() : Date.now()) });
    }, 1000);
    this._bindWs();
    this.connected = true;
  }

  // WS 事件绑定（连接与重连共用同一套处理器）
  _bindWs() {
    if (!this.ws) return;
    this.ws.onmessage = (e) => this._handleMessage(e);
    this.ws.onclose = () => this._handleClose();
  }

  _handleMessage(e) {
    let m; try { m = JSON.parse(e.data); } catch (_) { return; }
    if (m.type === 'welcome') {
      this._onState && this._onState(m);
      // 记下房间号：断线自动重连时用 joinRoom 认领原席位（带 pid，命数/战绩保留）
      if (this._joinInfo) this._joinInfo.roomId = (m.roomId || this._joinInfo.roomId) || null;
      if (this._welcomeResolver) { this._welcomeResolver(m); this._welcomeResolver = null; this._welcomeRejecter = null; }
    } else if (m.type === 'state') {
      this._onState && this._onState(m);
    } else if (m.type === 'static') {
      this._onState && this._onState(m);
    } else if (m.type === 'roomList') {
      this._onRoomList && this._onRoomList(m.rooms || []);
    } else if (m.type === 'error') {
      // 建房/加入被拒（房间不存在/已满）：reject 等待中的 Promise，UI 弹提示
      if (this._welcomeRejecter) { this._welcomeRejecter(new Error(m.msg || '操作被拒绝')); this._welcomeRejecter = null; this._welcomeResolver = null; }
    } else if (m.type === 'nudgeHost') {
      // 客户端催房主重开：转发给上层 onState 处理（房主端弹中央提示）；relay 已按 hostCid 定向下发
      this._onState && this._onState(m);
    } else if (m.type === 'hostChanged') {
      // 原房主退出，relay 已把房主移交给房内剩余第一人 → 全房广播，上层据此升级身份/刷新按钮文案
      this._onState && this._onState(m);
    } else if (m.type === 'pong') {
      // RTT 回显：t 是客户端发送 ping 时的时间戳（同一时钟基准），now-t 即往返延迟
      const tt = m.t;
      if (tt != null) {
        const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
        this._onRtt && this._onRtt(now - tt);
      }
    }
  }

  // WS 非主动断开（掉线/服务器崩/网络抖）：自动带 pid 重连，认领原席位（命数/战绩保留）。
  // 主动「回到大厅」/退出会先置 _leftIntent=true（见 leaveRoom/close），此处即不再重连。
  _handleClose() {
    this.connected = false;
    if (this._pingTimer) { clearInterval(this._pingTimer); this._pingTimer = null; }
    if (this._leftIntent) return;
    this._scheduleReconnect();
  }

  _scheduleReconnect() {
    if (this._reconnectTimer || this._leftIntent || !this._joinInfo) return;
    this._reconnectTimer = setTimeout(async () => {
      this._reconnectTimer = null;
      if (this._leftIntent || !this._joinInfo) return;   // 期间已主动离开/退出 → 放弃重连
      try {
        this.ws = await connectRelay(this._relayUrl);
        this._bindWs();
        this.connected = true;
        // 重新认领原席位：统一走 joinRoom（房主重建连也走此路，按 pid 找回旧 cid；
        // 若原房已被拆，joinRoom 会收到 error，上层弹提示，玩家可回菜单重搜）
        const ji = this._joinInfo;
        if (ji.roomId) this.send({ type: 'joinRoom', roomId: ji.roomId, name: ji.name, pid: ji.pid || null });
        else if (ji.type === 'create') this.send({ type: 'createRoom', name: ji.name, playerName: ji.name, mode: ji.opts && ji.opts.mode, lives: ji.opts && ji.opts.lives, target: ji.opts && ji.opts.target, bounce: ji.opts && ji.opts.bounce, zmix: ji.opts && ji.opts.zmix, config: (ji.opts && ji.opts.config) || null, pid: ji.pid });
      } catch (_) {
        this._scheduleReconnect();   // 重连失败：退避后重试（仍带 pid 认领）
      }
    }, 1500);
  }

  onState(cb) {
    this._onState = cb;
    if (HAS_NATIVE) window.ZB.onState = (data) => { try { cb(JSON.parse(data)); } catch (_) {} };
  }

  // RTT 延迟回调（「王者460」式 HUD 用）。浏览器中继(ClientNet)下由 pong 回显驱动；APK 原生桥无 relay RTT，回调不触发。
  onRtt(cb) { this._onRtt = cb; }

  onRoomList(cb) { this._onRoomList = cb; }

  // 请求房间列表（服务器回 roomList → onRoomList）
  listRooms() { this.send({ type: 'listRooms' }); }

  // 建房：返回 Promise，收到 welcome 时 resolve（此时 myId 已设置）；被拒(error)时 reject。
  // 携带 pid：即便建房者掉线，relay 也能按 pid 认领其原席位（命数/战绩保留，不会白捡满命或丢进度）。
  createRoom(o) {
    return new Promise((resolve, reject) => {
      this._welcomeResolver = resolve;
      this._welcomeRejecter = reject;
      this._joinInfo = { type: 'create', name: o.name, pid: o.pid || null, roomId: null, opts: o };
      this.send({ type: 'createRoom', name: o.name, playerName: o.playerName || o.name, mode: o.mode, lives: o.lives, target: o.target, bounce: o.bounce, zmix: o.zmix, config: o.config || null, pid: o.pid });
    });
  }

  // 上行天赋分配（开局前；服务器 Sim.setTalent 校验点数）
  sendTalent(t) { this.send({ type: 'talent', talent: t }); }

  // 加入指定房间：返回 Promise，收到 welcome 时 resolve；被拒(房间不存在/已满)时 reject。
  // 携带 pid：断线重连时按 pid 认领原席位（不碰命数）。relay 的 joinRoom 会优先尝试认领。
  joinRoom(roomId, name, pid) {
    return new Promise((resolve, reject) => {
      this._welcomeResolver = resolve;
      this._welcomeRejecter = reject;
      this._joinInfo = { type: 'join', roomId, name, pid: pid || null };
      this.send({ type: 'joinRoom', roomId, name, pid: pid || null });
    });
  }

  // 主动「回到大厅」（局内 设置→回到大厅）：上行 leaveRoom（服务器置 state=0 保留席位），
  // 并清掉 _joinInfo——之后即便 WS 意外断也不自动回原房（玩家已在菜单，意图就是离开）。
  leaveRoom() {
    this.send({ type: 'leaveRoom' });
    this._joinInfo = null;
  }

  // 对战开局门槛信号：点「✔ 配好了」且当前非 playing 时上行（服务器记入 room.ready）。
  sendReady(ready) { this.send({ type: 'ready', ready: !!ready }); }

  send(obj) {
    if (HAS_NATIVE) { call('send', { data: JSON.stringify(obj) }); return; }
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(obj));
  }
  close() {
    this._leftIntent = true;   // 显式断开：不再自动重连
    this.connected = false;
    if (this._pingTimer) { clearInterval(this._pingTimer); this._pingTimer = null; }
    if (this._reconnectTimer) { clearTimeout(this._reconnectTimer); this._reconnectTimer = null; }
    if (HAS_NATIVE) { call('disconnect'); return; }
    if (this.ws) { try { this.ws.close(); } catch (_) {} this.ws = null; }
  }
}
