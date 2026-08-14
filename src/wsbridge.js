// wsbridge.js — 手机原生主机 ↔ 浏览器(WebSocket) 的桥。
// 把 relay.cjs 协议消息(listRooms/createRoom/joinRoom/input/talent/startGame)转进
// 手机本地的 game 权威模拟(host sim)，浏览器客户端因此与 APK 客户端、手机本机玩家
// 全部处在【同一套模拟】里。纯函数工厂，便于单测；main.js 负责把返回的处理器挂到 window.ZB。
//
// 协议与 relay.cjs 完全同构：浏览器(client)侧 ClientNet 代码零改动即可连入。
export function createWsHandlers(ctx) {
  // ctx = {
  //   getGame:   () => game,                 // 主机权威模拟（host sim）
  //   getRoomName: () => string,            // 房间显示名（房主昵称）
  //   getIsHost: () => boolean,             // 当前是否已有浏览器房主建过房
  //   setIsHost: (b) => void,
  // }
  const newId = () => 'wb' + Math.random().toString(36).slice(2, 9);
  const normMsg = (m) => (typeof m === 'string') ? JSON.parse(m) : (m || {});

  return {
    // 房间列表（单房间模型：手机主机即唯一房间 r1）
    listRooms() {
      const g = ctx.getGame();
      if (!g || !g.state) return [];
      const s = g.state;
      const online = Object.values(s.players).filter((p) => p.state !== 0);
      return [{
        id: 'r1', name: ctx.getRoomName() || '房间', mode: s.mode, lives: s.livesMax,
        target: s.target, status: s.status, count: online.length,   // 离线席位不算人头
        players: online.map((p) => p.name), bounce: s.bounce, zmix: s.zmix,
      }];
    },

    // 建房：单房间模型下手机主机即唯一房主，浏览器"建房"等同加入——
    // 只注册为 sim 的一名远程玩家，不抢占 host 权限、也不覆盖手机已设的 mode/config
    createRoom(msg) {
      return this.joinRoom(msg);
    },

    // 加入：先按 pid 认领离线旧席位（重连），否则注册为新的远程玩家
    joinRoom(msg) {
      const g = ctx.getGame();
      const m = normMsg(msg);
      const pid = (m.pid || '').toString().slice(0, 64);
      const nm = (m.name || ctx.getRoomName() || '浏览器').toString().slice(0, 16);
      if (g && g.hostClaimSeat) {
        const old = g.hostClaimSeat(pid);
        if (old) {
          const sp = g.state.players[old];
          if (sp) sp.name = nm;
          // 仅旧席位离线(state===0)才"当刷进来"（随机撒点满血）；仍在线(state===1，接管刷新/第二标签页)
          // 则只接管控制、保持现有位置与状态，不瞬移/不重置命数。绝不对在线席位调 hostSetOnline。
          if (sp && sp.state === 0) g.hostSetOnline(old);
          return { cid: old, roomId: 'r1', resumed: !!(sp && sp.state === 0) };
        }
      }
      const cid = newId();
      if (g && g.hostAddPlayer) g.hostAddPlayer(cid, nm);
      if (g && g.hostBindPid) g.hostBindPid(pid, cid);
      return { cid, roomId: 'r1' };
    },

    // 输入：指令流(cmds) → hostQueueCmds；旧状态式 → hostSetInput
    input(cid, msg) {
      const g = ctx.getGame();
      if (!g) return;
      const m = normMsg(msg);
      if (m && Array.isArray(m.cmds)) g.hostQueueCmds(cid, m.cmds);
      else if (m) g.hostSetInput(cid, m);
    },

    // 天赋分配（开局前）
    talent(cid, msg) {
      const g = ctx.getGame();
      if (!g || !g.setTalent) return;
      const m = normMsg(msg);
      g.setTalent(cid, (m && m.talent) || {});
    },

    // 准备就绪（对战开局门槛）：客户端点"✔ 配好了"且非 playing 时上行
    ready(cid, msg) {
      const g = ctx.getGame();
      if (!g || !g.hostSetReady) return;
      const m = normMsg(msg);
      g.hostSetReady(cid, m.ready !== false);
    },

    // 开始游戏：仅房主可发。对战需在线 ≥2 人且全员 ready（wave 不设门槛）
    startGame(cid, msg) {
      const g = ctx.getGame();
      if (!g || !ctx.getIsHost()) return;
      const m = normMsg(msg);
      const md = m.mode || 'wave';
      if (md === 'versus' && g.hostVersusCanStart && !g.hostVersusCanStart()) return;
      g.startGame(md, m.lives, { bounce: m.bounce, zmix: m.zmix, target: m.target, config: m.config });   // 内部清空全员 ready
    },

    // 催房主重开：浏览器客户端经 WS 桥催原生主机（ctx.onNudge 由 main.js 弹中央提示）
    nudge(cid, msg) {
      const m = normMsg(msg);
      if (ctx.onNudge) ctx.onNudge((m && m.name) || '玩家');
    },

    // 主动离开房间（局内 设置→回到大厅）：与掉线同一语义，置为离线、席位保留
    leaveRoom(cid) {
      this.removePlayer(cid);
    },

    // 断线/离场：置 state=0（不删对象）。真删只在房间销毁时做——
    // 否则对战"总人数"分母塌陷，剩 1 人立刻误判本局结束。
    removePlayer(cid) {
      const g = ctx.getGame();
      if (!g) return;
      if (g.hostSetOffline) g.hostSetOffline(cid);   // 内部已清 ready 标志位（回来要重新"✔ 配好了"）
    },
  };
}
