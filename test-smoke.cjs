// test-smoke.cjs —— 零依赖 WebSocket 冒烟测试（仅用 Node 内置 http/crypto）
// 验证 relay.cjs 协议链路：listRooms(空) → createRoom → welcome → listRooms(含新房) → leaveRoom。
// 用法： node test-smoke.cjs            （默认连 ws://127.0.0.1:8123）
//        PORT=8123 node test-smoke.cjs
// 与原始 _smoke_webrtc_host.js 不同：本脚本不需要 `ws` 包，直接手搓 WebSocket 握手+帧。

const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8123;
const HOST = process.env.HOST || '127.0.0.1';
const URL = `ws://${HOST}:${PORT}`;

const results = [];
function check(name, cond, extra) {
  results.push({ name, ok: !!cond });
  console.log((cond ? 'PASS' : 'FAIL') + ': ' + name + (extra != null ? '  -> ' + extra : ''));
}

// 客户端→服务器帧必须带掩码
function encodeClientFrame(str) {
  const payload = Buffer.from(str, 'utf8');
  const len = payload.length;
  const mask = crypto.randomBytes(4);
  let header;
  if (len < 126) { header = Buffer.alloc(2); header[1] = 0x80 | len; }
  else if (len < 65536) { header = Buffer.alloc(4); header[1] = 0x80 | 126; header.writeUInt16BE(len, 2); }
  else { header = Buffer.alloc(10); header[1] = 0x80 | 127; header.writeBigUInt64BE(BigInt(len), 2); }
  header[0] = 0x81; // FIN + text
  const masked = Buffer.alloc(len);
  for (let i = 0; i < len; i++) masked[i] = payload[i] ^ mask[i % 4];
  return Buffer.concat([header, mask, masked]);
}

// 服务器→客户端帧（无掩码）
function parseServerFrame(data) {
  if (data.length < 2) return null;
  const b0 = data[0], b1 = data[1];
  const opcode = b0 & 0x0f;
  let len = b1 & 0x7f;
  let offset = 2;
  if (len === 126) { if (data.length < 4) return null; len = data.readUInt16BE(2); offset = 4; }
  else if (len === 127) { if (data.length < 10) return null; len = Number(data.readBigUInt64BE(2)); offset = 10; }
  if (data.length < offset + len) return null;
  const payload = data.slice(offset, offset + len);
  return { opcode, payload, rest: data.slice(offset + len) };
}

function open() {
  return new Promise((resolve, reject) => {
    const key = crypto.randomBytes(16).toString('base64');
    const req = http.request({
      host: HOST, port: PORT, path: '/',
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
        'Sec-WebSocket-Key': key,
        'Sec-WebSocket-Version': '13',
      },
    });
    req.on('upgrade', (res, socket) => resolve(socket));
    req.on('error', reject);
    req.end();
  });
}

function waitMsg(socket, type, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout waiting ' + type)), timeout);
    const onData = (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      let f;
      while ((f = parseServerFrame(buf))) {
        buf = f.rest;
        if (f.opcode === 0x8) { clearTimeout(t); socket.removeListener('data', onData); return; } // close
        if (f.opcode === 0x1 || f.opcode === 0x2) {
          let m; try { m = JSON.parse(f.payload.toString('utf8')); } catch (_) { continue; }
          if (m && m.type === type) { clearTimeout(t); socket.removeListener('data', onData); resolve(m); return; }
        }
      }
    };
    let buf = Buffer.alloc(0);
    socket.on('data', onData);
  });
}

const send = (socket, obj) => socket.write(encodeClientFrame(JSON.stringify(obj)));

(async () => {
  let roomId = null;
  const ws = await open();
  check('WebSocket 握手成功', !!ws, URL);

  // 1) 初始 listRooms
  const lr0 = waitMsg(ws, 'roomList');
  send(ws, { type: 'listRooms' });
  let r = await lr0;
  check('listRooms 返回数组', Array.isArray(r.rooms), 'rooms=' + (r.rooms || []).length);

  // 2) 建房
  const welcome = waitMsg(ws, 'welcome');
  send(ws, { type: 'createRoom', name: '冒烟房', mode: 'wave' });
  r = await welcome;
  roomId = r.roomId;
  check('createRoom → welcome(含 id/roomId/owner)', !!r.id && !!roomId && r.owner === r.id, 'cid=' + r.id + ' room=' + roomId);

  // 3) 再 listRooms 应能看到新房
  const lr1 = waitMsg(ws, 'roomList');
  send(ws, { type: 'listRooms' });
  r = await lr1;
  const seen = r.rooms && r.rooms.find((x) => x.id === roomId);
  check('listRooms 能看到刚建的房', !!seen, 'name=' + (seen && seen.name) + ' count=' + (seen && seen.count));

  // 4) 离开
  const left = waitMsg(ws, 'leftRoom');
  send(ws, { type: 'leaveRoom' });
  r = await left;
  check('leaveRoom → leftRoom', !!r, 'type=' + (r && r.type));

  ws.destroy();
  const passed = results.filter((x) => x.ok).length;
  console.log('\n==== 结果: ' + passed + '/' + results.length + ' 通过 ====');
  // 用 process.exitCode + 自然退出，避免 process.exit() 在 stdout 异步刷新前抢退（会导致输出丢失/退出码异常）
  process.exitCode = passed === results.length ? 0 : 1;
})().catch((e) => { console.error('测试异常:', e.message); process.exitCode = 2; });
