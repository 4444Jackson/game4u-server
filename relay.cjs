// relay.cjs — Game4U 权威游戏服务器（中心化部署版：纯 WebSocket，无 P2P / 无本地主机）
// 同一端口同时提供：HTTP 静态资源（dist 前端） + WebSocket 权威模拟与转发。
// 支持【多房间】：单个进程内托管多个独立房间，每个房间各自跑一套 Sim。
// 权威模拟（sim-core.js）在本 Node 进程内运行，不在被浏览器节流的后台标签里，
//   彻底消除"房主标签被节流→卡顿"；所有浏览器一律是客户端，只上行输入、接收快照。
//
// 玩家连入流程：listRooms 看房间列表 → createRoom 建房（建房者即房主）→ joinRoom 选房加入。
//
// 与本地旧版（ZombieLAN：房主浏览器即主机 + WebRTC P2P）的区别：
//   1) 去掉 WebRTC / werift 中继层 —— 中心化服务器下数据通道也是「浏览器↔服务器」，省不了服务器负载，
//      反而每个连接要在 Node 内起一个 PeerConnection、很吃内存；改为纯 WebSocket 后运行时零 npm 依赖。
//   2) 页面 WS 地址 wss:// 自适应：页面走 https 时自动用 wss://，否则 ws://
//      （日后套 nginx + Let's Encrypt 上 HTTPS，客户端无需改代码即自动切 wss）。
//   3) 模拟/广播帧率由环境变量 TICK_HZ 控制（默认 60Hz，与原版僵尸联机一致）；dt 同步缩放，物理保持实时。
//
// 运行： node relay.cjs
//   环境变量：PORT=8123（监听端口）   TICK_HZ=60（模拟+广播帧率，1~60，默认 60）
// 依赖：仅 Node 内置模块（http / fs / path / crypto），无需 npm install。

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8123;
// 模拟+广播帧率：默认 60Hz（与原版 zombie-lan 一致）。step 的 dt 与此同步，物理保持实时。
// 若同时开很多房、服务器 CPU/带宽吃紧，可设 TICK_HZ=30 约减半负载；客户端靠插值平滑，手感略顿。
const TICK_HZ = (process.env.TICK_HZ && Number(process.env.TICK_HZ) > 0) ? Number(process.env.TICK_HZ) : 60;
const TICK_DT = 1 / TICK_HZ;
const DIST = path.join(__dirname, 'dist');
const WS_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';


const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
};

const RESPAWN_TIME = 2.5;   // 须与 sim-core.js 保持一致：死亡后重生倒计时(秒)

// 【二值在场模型】玩家只有两种连接态，不做第三种，也不做任何超时探活：
//   state=1 在线（默认初值）
//   state=0 离线 —— WS 断开 与 主动"回到大厅" 合并为同一状态，不区分原因、不设超时、随时可回。
// 离线 ≠ 踢出房间：sim 里的玩家对象保留（命数/杀数/天赋都在），只是从图上移除存在；
// 回来时"当刷进来"（随机撒点，不还原离开前位置）。全员 state=0 → 房间立即销毁（无墓碑期）。
//   · 正常关闭（F5 / 关标签页 / 点退出）→ WS 关闭帧(0x8) 或 TCP close → 立刻置 0。
//   · 脏断（拔网线 / WiFi 掉 / 手机息屏 / 强杀进程）→ 无信号，连接挂着，客户端 15s ping 断流后由 TCP 判定。
// 之所以不做超时探活：客户端只在「游戏中且存活」时才上行，大厅等待/死亡待复活天然静默，
// 任何统一超时都会误杀真实在线的玩家。
const conns = new Set();               // 所有活着的 WS 连接

function sendFrame(socket, str) {
  const payload = Buffer.from(str, 'utf8');
  const len = payload.length;
  let header;
  if (len < 126) { header = Buffer.alloc(2); header[1] = len; }
  else if (len < 65536) { header = Buffer.alloc(4); header[1] = 126; header.writeUInt16BE(len, 2); }
  else { header = Buffer.alloc(10); header[1] = 127; header.writeBigUInt64BE(BigInt(len), 2); }
  header[0] = 0x81; // FIN + text
  try { socket.write(Buffer.concat([header, payload])); } catch (_) {}
}

function parseFrame(data) {
  if (data.length < 2) return null;
  const b0 = data[0], b1 = data[1];
  const opcode = b0 & 0x0f;
  const masked = (b1 & 0x80) !== 0;
  let len = b1 & 0x7f;
  let offset = 2;
  if (len === 126) { if (data.length < 4) return null; len = data.readUInt16BE(2); offset = 4; }
  else if (len === 127) { if (data.length < 10) return null; len = Number(data.readBigUInt64BE(2)); offset = 10; }
  let maskKey;
  if (masked) { if (data.length < offset + 4) return null; maskKey = data.slice(offset, offset + 4); offset += 4; }
  if (data.length < offset + len) return null;
  let payload = data.slice(offset, offset + len);
  if (masked) {
    const out = Buffer.alloc(len);
    for (let i = 0; i < len; i++) out[i] = payload[i] ^ maskKey[i % 4];
    payload = out;
  }
  return { opcode, payload, rest: data.slice(offset + len) };
}

// ---------------- 多房间权威模拟：每个房间一套 Sim 跑在 Node 进程 ----------------
// 【术语】本进程就是「主机」——权威模拟(sim-core.js)在这里跑，所有浏览器一律是客户端。
//         room.ownerCid 是「房主」，仅表示开局/重开权限，可在原房主退出时移交；它不跑任何模拟。
//         所以房主换人 ≠ 主机换人，房主走了这局照常继续（sim 还在本进程里 tick）。
//         注意：线上协议字段仍叫 nudgeHost / hostChanged / hostId，其中的 "host" 均指【房主】，
//         为兼容已发布的客户端未改名，读代码时勿与本进程这个真正的主机混淆。
(async () => {
  const { Sim } = await import('./sim-core.js');
  const rooms = new Map();      // roomId -> { id, sim, players:Map<conn,cid>, meta, ownerCid（房主，非主机）}
  let nextCid = 1;
  let nextRid = 1;
  const newRoomId = () => 'r' + (nextRid++);


  function relaySend(conn, obj) {
    if (conn && conn.readyState === 1) sendFrame(conn.socket, JSON.stringify(obj));
  }

  // 一次性下发静态数据（地形 + 房主配置）：地形只在 startGame 重随机、永不逐帧变，
  // 没必要每帧塞进快照。建房/加入/接管/开局 各发一次，客户端据此(重)建地形。
  function broadcastStatic(room) {
    const obj = room.sim.staticState();
    for (const [c] of room.players) relaySend(c, obj);
  }

  // 在线花名册（state===1）——人数/满员/ready 一律以它为准，离线席位不占位、不阻塞
  function roster(room) {
    return Object.values(room.sim.state.players).filter((p) => p.state === 1);
  }

  // 对战开局门槛：在线人数 ≥2 且全员 ready（"✔ 配好了"）。wave 不设门槛（单人开荒合法）。
  // ready 直接读玩家标志位（sim 里的唯一真源），房间层不再维护第二份名单。
  function versusCanStart(room) {
    const r = roster(room);
    if (r.length < 2) return false;
    return r.every((p) => p.ready === 1);
  }

  // 房间摘要（给客户端列表面板用）
  function roomSummary(room) {
    const s = room.sim.state;
    const r = roster(room);
    return {
      id: room.id,
      name: room.meta.name,
      mode: s.mode || room.meta.mode,
      lives: room.meta.lives,
      target: room.meta.target,
      status: s.status,
      count: r.length,                       // 只数在线玩家（离线席位不算人头，不然房间看着永远满）
      players: r.map((p) => p.name),
      bounce: room.meta.bounce,
      zmix: room.meta.zmix,
    };
  }

  function onWsMessage(conn, text) {
    if (conn._stale) return;   // 已被接管(takeover)的老连接：丢弃其后所有消息，控制权已移交新连接
    let msg; try { msg = JSON.parse(text); } catch (_) { return; }
    // ping/pong：客户端用来测 RTT（参考王者「460」延迟指示器）。客户端发 {type:'ping',t:发送时刻}，
    // 这里原样回显 t，客户端收到 pong 时用 当前时刻-t 即得往返延迟。t 为客户端时钟基准，不受服务端时区影响。
    if (msg.type === 'ping') { relaySend(conn, { type: 'pong', t: msg.t }); return; }


    // 列出可加入的房间
    if (msg.type === 'listRooms') {
      const list = [];
      for (const room of rooms.values()) {
        // 只列有效房间：房主异常断开且房间空了会被 onWsClose 删；这里再挡一道并发/竞态导致的空房
        if (!room || room.players.size === 0) continue;
        list.push(roomSummary(room));
      }
      relaySend(conn, { type: 'roomList', rooms: list });
      return;
    }

    // 建房：新建一个独立房间，建房者成为房主
    if (msg.type === 'createRoom') {
      const roomId = newRoomId();
      const sim = new Sim();
      const room = {
        id: roomId,
        sim,
        players: new Map(),
        meta: {
          name: (msg.name || '房间').toString().slice(0, 24),
          mode: msg.mode || 'wave',
          // lives 允许 null = 未指定：startGame 时透传 undefined，让 Sim 按 config.ROOM.baseLives 取默认
          // （之前 `msg.lives|0` 把未传强转成 0，导致对战 baseLives 配置永远被覆盖成 max(1,0)=1）
          lives: (msg.lives !== undefined && msg.lives !== null) ? (msg.lives | 0) : null,
          target: (msg.target !== undefined && msg.target !== null) ? (msg.target | 0) : 100,
          bounce: !!msg.bounce,
          zmix: msg.zmix || 'progress',
          config: msg.config || null,   // 房主 13 项高级配置（对战模式；null=全默认）
        },
        ownerCid: null,
        pids: new Map(),        // pid(客户端 localStorage 持久身份) -> cid，重连据此认领原席位
      };
      if (msg.config) { try { sim.setConfig(msg.config); } catch (_) {} }
      // 等待房阶段快照也要带正确 mode：否则客户端天赋面板判定 mode==='versus' 永远不成立（面板在等待房不显示的根因）
      sim.state.mode = (room.meta.mode === 'versus') ? 'versus' : 'wave';
      rooms.set(roomId, room);
      const cid = 'p' + (nextCid++);
      conn._cid = cid;
      conn._roomId = roomId;
      conn._pid = (msg.pid || '').toString().slice(0, 64);
      if (conn._pid) room.pids.set(conn._pid, cid);
      room.players.set(conn, cid);
      room.ownerCid = cid;
      sim.addPlayer(cid, (msg.playerName || msg.name || ('玩家' + cid)).toString().slice(0, 16));
      relaySend(conn, { type: 'welcome', id: cid, roomId, owner: cid });
      broadcastStatic(room);   // 建房即下发静态数据（等待房地形为空，但 config 可能已含房主高级配置）
      console.log('[relay] 建房', roomId, '房主=', cid, 'name=', room.meta.name, 'mode=', room.meta.mode);
      return;
    }

    // 加入指定房间
    if (msg.type === 'joinRoom') {
      const room = rooms.get(msg.roomId);
      if (!room) { relaySend(conn, { type: 'error', msg: '房间不存在或已关闭' }); return; }
      const pid = (msg.pid || '').toString().slice(0, 64);

      // ① 接管(takeover)：pid 命中任一旧席位（不论它当前是否在线）→ 一律接管那个 cid。
      //    不再要求 seat.state===0：旧连接可能还活着（刷新页面/同 pid 开第二个标签页/网络抖动重连快于旧 socket 关闭），
      //    此时若"当新人"会开第二个席位 → 房间出现"两个自己"的 bug。接管保证每个 pid 全局只有一个 cid。
      const oldCid = pid ? room.pids.get(pid) : null;
      const seat = oldCid ? room.sim.state.players[oldCid] : null;
      if (seat) {
        // 旧席位若仍被一个活着的老 conn 占着 → 把它标失效并从路由表摘掉：既防其后续 close 重复 detach，
        // 也防它继续发指令干扰（onWsMessage 会跳过 _stale）。新连接成为该 cid 的唯一控制者（最新连接赢）。
        for (const [oldConn, c] of room.players) {
          if (c === oldCid) {
            oldConn._stale = true; oldConn._cid = null; oldConn._roomId = null;
            room.players.delete(oldConn);
            break;
          }
        }
        conn._cid = oldCid;
        conn._roomId = msg.roomId;
        conn._pid = pid;
        room.players.set(conn, oldCid);
        if (msg.name) seat.name = msg.name.toString().slice(0, 16);
        // 仅旧席位确实离线(state===0)才"当刷进来"（随机撒点满血）；若仍在线(state===1，接管刷新/第二标签页)
        // 则只接管控制、保持现有位置与状态，不瞬移、不重置命数。绝不对在线席位调 setOnline。
        const wasOffline = seat.state === 0;
        if (wasOffline) room.sim.setOnline(oldCid);
        // 注意：resumed 必须用 wasOffline（setOnline 已把 state 改回 1），不能现读 seat.state
        relaySend(conn, { type: 'welcome', id: oldCid, roomId: msg.roomId, resumed: wasOffline, owner: room.ownerCid });
        broadcastStatic(room);   // 接管/重连：若房已在进行中，把当前地形一起补发（否则重连后地形丢失）
        console.log('[relay] 接管席位 房间', msg.roomId, 'cid=', oldCid, '旧席位state=', seat.state, 'lives=', seat.lives, 'out=', seat.out);
        return;
      }

      // ② 新人入场。满员只数在线玩家：离线席位不占坑（否则走掉的人会把房间永久堵死）
      const maxP = (room.meta.config && room.meta.config.ROOM && room.meta.config.ROOM.maxPlayers) || 8;
      if (roster(room).length >= maxP) {
        relaySend(conn, { type: 'error', msg: '房间已满（' + maxP + ' 人）' });
        return;
      }
      const cid = 'p' + (nextCid++);
      conn._cid = cid;
      conn._roomId = msg.roomId;
      conn._pid = pid;
      if (pid) room.pids.set(pid, cid);
      room.players.set(conn, cid);
      room.sim.addPlayer(cid, (msg.name || ('玩家' + cid)).toString().slice(0, 16));
      // 晚加入：房间已在进行中 → 新人以「死亡→复活倒计时」进入（给一次天赋配置机会），而非满血直接参战；
      // 其命数与在场者一致（基础命数；新人不带天赋命数加成）。
      // 注意这里只对【真·新人】发命数——重连走上面 ① 分支，绝不能路过这里，否则等于白捡一条满命。
      if (room.sim.state.status === 'playing') {
        const sp = room.sim.state.players[cid];
        sp.alive = false;
        sp.respawnCd = RESPAWN_TIME;
        sp.lives = room.sim.state.livesMax;   // 0 = 无限命
        sp.out = false;
      }
      relaySend(conn, { type: 'welcome', id: cid, roomId: msg.roomId, owner: room.ownerCid });
      broadcastStatic(room);   // 晚加入：若房已在进行中，把当前地形一起补发
      console.log('[relay] 加入房间', msg.roomId, 'cid=', cid, 'name=', msg.name);
      return;
    }

    // 准备就绪：客户端点"✔ 配好了"就上行（局内复活窗口也发，不分场合）。
    // 标志位写进玩家对象：既让面板收起，也顺带满足对战开局门槛，一处生效两处受用。
    if (msg.type === 'ready') {
      const room = conn._roomId && rooms.get(conn._roomId);
      if (!room || !conn._cid) return;
      room.sim.setReady(conn._cid, msg.ready !== false);
      return;
    }

    // 主动离开房间（局内 设置→回到大厅）：等价于掉线，但不关 WS——
    // 客户端还要用这条连接回大厅刷房间列表。走同一条 detach 路径，语义完全一致。
    if (msg.type === 'leaveRoom') {
      detachConn(conn, 'leaveRoom');
      relaySend(conn, { type: 'leftRoom' });
      return;
    }

    // 输入：路由到本连接所属房间
    //   新格式（指令流）：{ type:'input', cmds:[{seq,mx,mz,ax,az,pitch,fire,jump},...] } → 逐条精确模拟+ack
    //   旧格式（状态式）：{ type:'input', mx,mz,... } → 兼容保留（旧客户端仍可玩）
    if (msg.type === 'input') {
      const room = conn._roomId && rooms.get(conn._roomId);
      if (room && conn._cid) {
        if (Array.isArray(msg.cmds)) room.sim.queueCmds(conn._cid, msg.cmds);
        else room.sim.setInput(conn._cid, msg);
      }
      return;
    }

    // 天赋分配（开局前）：路由到本连接所属房间；Sim.setTalent 内部校验点数/等级上限
    if (msg.type === 'talent') {
      const room = conn._roomId && rooms.get(conn._roomId);
      if (room && conn._cid) room.sim.setTalent(conn._cid, msg.talent || {});
      return;
    }

    // 开始游戏：仅房主可发
    if (msg.type === 'startGame') {
      const room = conn._roomId && rooms.get(conn._roomId);
      if (!room) return;
      if (conn._cid !== room.ownerCid) {
        console.log('[relay] 非房主尝试开局，已忽略 (room=', room.id, ')');
        return;
      }
      const t = (msg.target !== undefined) ? (msg.target | 0) : room.meta.target;
      // lives 三级取值：本次显式 > 建房时显式 > undefined（Sim 内按模式取 config.ROOM.baseLives / 1）
      let lv;
      if (msg.lives !== undefined && msg.lives !== null) lv = msg.lives | 0;
      else if (room.meta.lives !== null && room.meta.lives !== undefined) lv = room.meta.lives;
      else lv = undefined;
      const cfg = msg.config || room.meta.config || null;
      if (cfg) room.meta.config = cfg;
      // mode/bounce/zmix 也做 meta 兜底：房主移交后，接任者并不知道原房主建房时选的玩法/反弹/出怪方式，
      // 其 startGame 会省略这些字段（见 main.js 的 isPromotedOwner），此处必须沿用 room.meta 而非当成默认值。
      const md = (msg.mode !== undefined && msg.mode !== null) ? msg.mode : room.meta.mode;
      const bo = (msg.bounce !== undefined) ? !!msg.bounce : !!room.meta.bounce;
      const zm = msg.zmix || room.meta.zmix || 'progress';
      // 对战开局门槛：在线 ≥2 人 且 全员 ready。单人不允许先开对战（否则一开局就只剩自己没 out → 秒结算）。
      // wave 不设门槛：单人开荒本来就合法，加人数下限会误杀。
      if (md === 'versus' && !versusCanStart(room)) {
        const r = roster(room);
        const waiting = r.filter((p) => p.ready !== 1).map((p) => p.name);
        relaySend(conn, {
          type: 'error',
          msg: r.length < 2 ? '对战至少需要 2 人' : ('等待配置天赋：' + waiting.join('、')),
        });
        console.log('[relay] 房间', room.id, '对战开局被拒：在线', r.length, '人，未 ready=', waiting.join('|'));
        return;
      }
      room.sim.startGame(md, lv, { bounce: bo, zmix: zm, target: t, config: cfg });   // 内部会清空全员 ready 标志位
      broadcastStatic(room);   // 开局重随机地形 → 全房重建网格（这之后每帧快照不再含 map）
      console.log('[relay] 房间', room.id, '开始游戏 mode=', md, 'lives=', lv, 'target=', t, 'bounce=', bo, 'zmix=', zm);
      return;
    }

    // 回等待房（结算后房主点「再来一局」走这条，仅房主可发）：清场 + 全员 ready 归零 + status 回 waiting。
    // 不直接 startGame 的原因见 sim-core.backToWaiting 注释——直接重开会撞上"第二局永远开不了"的死锁。
    if (msg.type === 'backToWaiting') {
      const room = conn._roomId && rooms.get(conn._roomId);
      if (!room) return;
      if (conn._cid !== room.ownerCid) {
        console.log('[relay] 非房主尝试回等待房，已忽略 (room=', room.id, ')');
        return;
      }
      room.sim.backToWaiting();
      broadcastStatic(room);   // 等待房地形已重置为空白，把新(空)地图下发，清掉客户端缓存的旧障碍
      console.log('[relay] 房间', room.id, '回到等待房，全员重新配天赋');
      return;
    }

    // 催房主重开：非房主客户端发来 → 转发给房主连接（房主端弹中央提示）
    if (msg.type === 'nudgeHost') {
      const room = conn._roomId && rooms.get(conn._roomId);
      if (!room || conn._cid === room.ownerCid) return;   // 房主自己发的忽略
      for (const [c, cid] of room.players) {
        if (cid === room.ownerCid) { relaySend(c, { type: 'nudgeHost', name: msg.name || '玩家' }); break; }
      }
      console.log('[relay] 转发催重开 → 房主 (room=', room.id, ')');
      return;
    }
  }

  // 把一条连接从它所在的房间摘出去。掉线(onWsClose) 与 主动回大厅(leaveRoom) 共用此路径——
  // 二值模型下这两件事就是同一件事：把玩家置为 state=0，对象留在 sim 里等他回来。
  function detachConn(conn, reason) {
    const roomId = conn._roomId;
    conn._cid = null;
    conn._roomId = null;
    if (!roomId || !rooms.has(roomId)) return;
    const room = rooms.get(roomId);
    const leftCid = room.players.get(conn);
    room.players.delete(conn);
    if (leftCid) {
      room.sim.setOffline(leftCid);      // ★ 不再 removePlayer：真删会让对战"总人数"分母塌陷，剩 1 人立刻误判结束
                                         //   （setOffline 内部已把 ready 标志位清 0，回来要重新"✔ 配好了"）
      console.log('[relay] 玩家离场(' + reason + ') 房间', roomId, 'cid=', leftCid, '→ state=0（席位保留）');
    }
    // 全员离线 → 房间立即销毁（无墓碑期，用户明确否决）
    if (room.players.size === 0) {
      rooms.delete(roomId);
      console.log('[relay] 房间', roomId, '全员离线，已销毁');
      return;
    }
    // 房主退出但房内还有人 → 移交房主。
    // 不移交则 ownerCid 成悬空引用（指向已不存在的 cid），后果三连：
    //   ① startGame 的 `conn._cid !== room.ownerCid` 对所有人成立 → 剩下的人谁都开不了局；
    //   ② nudgeHost 遍历找不到接收者 → 催重开石沉大海（relay 却仍打印"已转发"日志，误导排查）；
    //   ③ listRooms 只看 players.size>0 → 死房仍在列表可被加入，新人进来同样开不了局。
    // 已开局的那一把不受影响（sim 继续 tick 广播），卡死点在结算后无人能重开。
    if (leftCid && leftCid === room.ownerCid) {
      // Map 保序 → 由最早加入的、仍在线(state===1)的玩家接任；原房主回来不夺回
      let heir = null;
      for (const [, cid] of room.players) {
        const p = room.sim.state.players[cid];
        if (p && p.state === 1) { heir = cid; break; }
      }
      if (heir) {
        room.ownerCid = heir;
        const np = room.sim.state.players[heir];
        const nextName = (np && np.name) || '玩家';
        // 字段名 hostChanged/hostId 里的 host 指【房主】（沿用旧协议名），主机自始至终是本 relay 进程，未变更
        for (const [c] of room.players) relaySend(c, { type: 'hostChanged', hostId: heir, name: nextName });
        console.log('[relay] 房间', roomId, '原房主', leftCid, '已离场，房主移交 →', heir, nextName);
      }
    }
  }

  function onWsClose(conn) {
    if (conn._closed) return;       // 幂等：关闭帧直触 + TCP close 事件可能双触发，避免重复清理/重复移交
    conn._closed = true;
    conns.delete(conn);
    detachConn(conn, 'ws-close');
  }

  // HTTP：serve dist

  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';

    const file = path.join(DIST, urlPath);
    if (!file.startsWith(DIST)) { res.writeHead(403); res.end('forbidden'); return; }

    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end('not found: ' + urlPath); return; }
      const ext = path.extname(file);
      // 关闭缓存：mod.json / 贴图改了刷新即生效，便于「改文件夹自定义花纹」。
      // .js/.css 也必须 no-cache：vite 产物文件名固定(assets/index.js 无内容哈希)，
      // 无缓存头时浏览器启发式缓存会让普通刷新(F5)拿到旧逻辑——曾导致"3D弹道已发布但玩家仍是旧平飞"。
      const noCache = (ext === '.png' || ext === '.json' || ext === '.html' || ext === '.js' || ext === '.css');
      const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' };
      if (noCache) headers['Cache-Control'] = 'no-cache';
      res.writeHead(200, headers);
      if (ext === '.html') {
        let html = data.toString('utf8');
        // 远程联机(HTTPS 反代 / Cloudflare Tunnel 等)兼容：页面走 https 时 WS 必须用 wss://，否则浏览器按混合内容拦截。
        // location.host 已含端口（如 game.example.com:8123），客户端 net.js 据 __RELAY_WS__ 直连本服同端口。
        const inject = '<script>window.__RELAY__=true;window.__RELAY_WS__=(location.protocol==="https:"?"wss://":"ws://")+location.host;</script>';
        html = html.replace('</head>', inject + '</head>');
        res.end(html);
      } else {
        res.end(data);
      }
    });
  });

  // WebSocket 升级
  server.on('upgrade', (req, socket) => {
    const key = req.headers['sec-websocket-key'];
    if (!key) { socket.destroy(); return; }
    const accept = crypto.createHash('sha1').update(key + WS_GUID).digest('base64');
    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n'
    );
    const conn = { socket, _cid: null, _roomId: null, _pid: null, readyState: 1 };
    // 关掉 Nagle：本服下行小快照，Nagle 会攒包等 ACK，把本该一帧的下行拖成偶发抖动。实时游戏一律要低延迟不要合并。
    try { socket.setNoDelay(true); } catch (_) {}
    conns.add(conn);
    let buf = Buffer.alloc(0);
    socket.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      let frame;
      while ((frame = parseFrame(buf))) {
        buf = frame.rest;
        if (frame.opcode === 0x8) { conn.readyState = 0; try { socket.destroy(); } catch (_) {} onWsClose(conn); return; }
        if (frame.opcode === 0x1 || frame.opcode === 0x2) onWsMessage(conn, frame.payload.toString('utf8'));
      }
    });
    socket.on('close', () => { conn.readyState = 0; onWsClose(conn); });
    // 注意：socket 'error' 多为瞬时写错/网络抖动（WebSocket 写失败是 async 发射，不被 sendFrame 的
    // try/catch 吞掉），绝不能当断线处理——否则等待/大厅期连接静默（客户端心跳已移除），一个抖动就被误判
    // 离场→房间被删（"等待就算退出"）。真断线由 TCP 'close'(FIN/RST) 判定，且 'error' 后通常会紧接 'close'，
    // 由上面的 handler 统一清场（onWsClose 有 _closed 幂等保护）。这里仅记录，不主动断线。
    // Node 要求有 error 监听器，否则 ECONNRESET/EPIPE 会抛未捕获异常崩进程（每次客户端非正常退出都会触发）；
    // 此处仅静默吞掉，不碰状态——真断线由 close 统一判定。
    socket.on('error', () => {});
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log('[relay] 权威游戏服务器已启动（多房间 · 零依赖 · 纯 WebSocket，模拟跑在 Node 进程）');
    console.log(`        本机:   http://127.0.0.1:${PORT}`);
    console.log(`        模拟/广播帧率 TICK_HZ=${TICK_HZ}（改小更省 CPU/带宽，改大更跟手；物理保持实时）`);
    console.log(`        公网:   在云防火墙/安全组放行 TCP ${PORT} 后，用 http://<公网IP>:${PORT} 访问`);
  });

  // 权威模拟 + 广播：单定时器（TICK_HZ 次/秒）——step 完立刻广播同份快照。
  // 合并模拟与广播：快照间隔严格 = 1 个模拟步，客户端插值段不会因双定时器节拍偏差而周期性顿挫。
  // dt 与帧率同步缩放，物理始终实时（30Hz→dt=1/30，60Hz→dt=1/60，每秒累计都是 1.0s 模拟时间）。
  setInterval(() => {
    for (const room of rooms.values()) {
      try { room.sim.step(TICK_DT); } catch (e) { console.error('[relay] step error', room.id, e); continue; }
      let snap;
      try { snap = room.sim.snapshot(); } catch (e) { continue; }
      snap.st = Date.now();   // 服务器发送时刻：客户端以此为插值时间轴，滤掉到达抖动
      // 房间级状态随快照下发（几十字节）：客户端据此渲染 ready 名单、置灰"开始"按钮、标记房主
      snap.owner = room.ownerCid;
      snap.canStart = (snap.mode === 'versus') ? versusCanStart(room) : true;   // ready 名单已随每个玩家下发，不再另发
      for (const [c] of room.players) {
        relaySend(c, snap);
        const now = Date.now();
        c._lastSnapT = now;
      }
    }
  }, 1000 / TICK_HZ);
})();
