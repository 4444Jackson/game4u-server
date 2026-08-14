// net.js — 网络层封装（浏览器中继客户端）。
// 本部署是中心化 relay：浏览器一律是 relay 的「玩家」，协议统一（多房间）。
//   上行 {type:'listRooms'} / {type:'createRoom',name,playerName,mode,lives,target,bounce,zmix}
//        / {type:'joinRoom',roomId,name} / {type:'input',...} / {type:'startGame',mode,lives,target,bounce,zmix}
//   下行 {type:'roomList',rooms} / {type:'welcome',id,roomId} / {type:'state',...}（权威快照，由 relay 里的 Sim 算出）
//        / {type:'static',...}（一次性地形+房主配置）
//   mode: 'wave' 僵尸浪潮 | 'versus' 对战
//   lives: 命条数（房主设定；wave 也生效，0 = 无限命）；target: 僵尸浪潮击杀目标（0 = 无尽生存）
//   注意：connect() 只建立 WebSocket，不再自动 join；建房/加入由 createRoom/joinRoom 显式触发。

export const RELAY_PORT = 8123;

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
    // 作为玩家连入中继（ip 为空=用页面注入地址；否则连指定主机IP）。仅连 WS，不自动 join。
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
  }

  // RTT 延迟回调（「王者460」式 HUD 用），由 pong 回显驱动。
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
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(obj));
  }
  close() {
    this._leftIntent = true;   // 显式断开：不再自动重连
    this.connected = false;
    if (this._pingTimer) { clearInterval(this._pingTimer); this._pingTimer = null; }
    if (this._reconnectTimer) { clearTimeout(this._reconnectTimer); this._reconnectTimer = null; }
    if (this.ws) { try { this.ws.close(); } catch (_) {} this.ws = null; }
  }
}
