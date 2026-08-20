// test-live-probe.cjs —— 连【正在运行的 live 服务】实测僵尸嵌墙率（铁证，不靠仿真）
// 连 ws://127.0.0.1:PORT（默认 8200，即你用 start-main.bat 起的服务），
// 建房(wave)→开局→收快照，把每个僵尸真实坐标对照障碍算 AABB 嵌墙率，并按类型 k 分桶。
// 判据：僵尸视觉/受击是轴对齐方块(半边长 ZR=0.9)，障碍是 AABB。
//   嵌墙 = |z.x-o.x| < ZR+o.w/2 且 |z.z-o.z| < ZR+o.d/2。
//   若 live 服务跑了 moveBoxAxis，此值应恒为 0；若游荡被回退成 moveCircle，则游荡僵尸会 >0。
const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8200;
const HOST = process.env.HOST || '127.0.0.1';
const ZR = 0.9; // 僵尸方块半边长（与 map-core ZR 一致）

function encodeClientFrame(str) {
  const payload = Buffer.from(str, 'utf8');
  const len = payload.length;
  const mask = crypto.randomBytes(4);
  let header;
  if (len < 126) { header = Buffer.alloc(2); header[1] = 0x80 | len; }
  else if (len < 65536) { header = Buffer.alloc(4); header[1] = 0x80 | 126; header.writeUInt16BE(len, 2); }
  else { header = Buffer.alloc(10); header[1] = 0x80 | 127; header.writeBigUInt64BE(BigInt(len), 2); }
  header[0] = 0x81;
  const masked = Buffer.alloc(len);
  for (let i = 0; i < len; i++) masked[i] = payload[i] ^ mask[i % 4];
  return Buffer.concat([header, mask, masked]);
}
function parseServerFrame(data) {
  if (data.length < 2) return null;
  const b0 = data[0], b1 = data[1];
  const opcode = b0 & 0x0f;
  let len = b1 & 0x7f;
  let offset = 2;
  if (len === 126) { if (data.length < 4) return null; len = data.readUInt16BE(2); offset = 4; }
  else if (len === 127) { if (data.length < 10) return null; len = Number(data.readBigUInt64BE(2)); offset = 10; }
  if (data.length < offset + len) return null;
  return { opcode, payload: data.slice(offset, offset + len), rest: data.slice(offset + len) };
}
function open() {
  return new Promise((resolve, reject) => {
    const key = crypto.randomBytes(16).toString('base64');
    const req = http.request({ host: HOST, port: PORT, path: '/', headers: { Connection: 'Upgrade', Upgrade: 'websocket', 'Sec-WebSocket-Key': key, 'Sec-WebSocket-Version': '13' } });
    req.on('upgrade', (res, socket) => resolve(socket));
    req.on('error', reject);
    req.end();
  });
}
function waitMsg(socket, pred, timeout = 4000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), timeout);
    const onData = (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      let f;
      while ((f = parseServerFrame(buf))) {
        buf = f.rest;
        if (f.opcode === 0x8) { clearTimeout(t); socket.removeListener('data', onData); return; }
        if (f.opcode === 0x1 || f.opcode === 0x2) {
          let m; try { m = JSON.parse(f.payload.toString('utf8')); } catch (_) { continue; }
          if (m && pred(m)) { clearTimeout(t); socket.removeListener('data', onData); resolve(m); return; }
        }
      }
    };
    let buf = Buffer.alloc(0);
    socket.on('data', onData);
  });
}
const send = (socket, obj) => socket.write(encodeClientFrame(JSON.stringify(obj)));

function embeddedPoke(z, obs) {
  let maxPoke = 0;
  for (const o of obs) {
    const ox = o.w / 2 + ZR - Math.abs(z.x - o.x);
    const oz = o.d / 2 + ZR - Math.abs(z.z - o.z);
    if (ox > 0 && oz > 0) {
      const poke = Math.min(ox, oz);
      if (poke > maxPoke) maxPoke = poke;
    }
  }
  return maxPoke;
}

(async () => {
  const ws = await open();
  console.log('[probe] 已连 live 服务 ws://' + HOST + ':' + PORT);

  let capBuf = Buffer.alloc(0);
  let obstacles = null;
  let frames = 0, zombieFrames = 0, totalSamples = 0, embeddedSamples = 0;
  const byKind = {};
  let maxPokeEver = 0;

  ws.on('data', (chunk) => {
    capBuf = Buffer.concat([capBuf, chunk]);
    let f;
    while ((f = parseServerFrame(capBuf))) {
      capBuf = f.rest;
      if (f.opcode === 0x8) { ws.destroy(); return; }
      if (f.opcode !== 0x1 && f.opcode !== 0x2) continue;
      let m; try { m = JSON.parse(f.payload.toString('utf8')); } catch (_) { continue; }
      if (m && Array.isArray(m.map) && m.map.length) obstacles = m.map; // 地形（开局后下发）
      if (m && Array.isArray(m.zombies)) {
        frames++;
        const zs = m.zombies;
        if (zs.length) zombieFrames++;
        for (const z of zs) {
          const poke = embeddedPoke(z, obstacles || []);
          totalSamples++;
          const k = z.k || 'walker';
          byKind[k] = byKind[k] || { n: 0, emb: 0, maxPoke: 0 };
          byKind[k].n++;
          if (poke > 0) { embeddedSamples++; byKind[k].emb++; byKind[k].maxPoke = Math.max(byKind[k].maxPoke, poke); }
          if (poke > maxPokeEver) maxPokeEver = poke;
        }
      }
    }
  });

  send(ws, { type: 'listRooms' });
  const welcome = waitMsg(ws, (m) => m.type === 'welcome' || m.type === 'error');
  send(ws, { type: 'createRoom', name: 'live探针', mode: 'wave' });
  let r = await welcome;
  if (!r || r.type === 'error') { console.log('[probe] 建房失败:', JSON.stringify(r)); process.exit(2); }
  console.log('[probe] 建房成功 roomId=' + r.roomId + ' cid=' + r.id + ' owner=' + r.owner);

  // 开局（我是房主）→ 触发 broadcastStatic 重发地形
  send(ws, { type: 'startGame', mode: 'wave' });
  await new Promise((res) => setTimeout(res, 700));
  if (!obstacles) { console.log('[probe] 未收到地形 map，退出'); process.exit(2); }
  console.log('[probe] 收到障碍 ' + obstacles.length + ' 个');

  // 收集 15 秒
  await new Promise((res) => setTimeout(res, 15000));

  console.log('\n==== LIVE 实测结果（live 服务实际发出的坐标，非仿真）====');
  console.log('采样帧数=' + frames + ' 含僵尸帧=' + zombieFrames);
  console.log('僵尸样本总数=' + totalSamples + ' 嵌墙样本=' + embeddedSamples +
    ' 嵌墙率=' + (totalSamples ? (100 * embeddedSamples / totalSamples).toFixed(2) : '0') + '%');
  console.log('最大穿入深度=' + maxPokeEver.toFixed(4) + ' m  (圆解算理论上限 ZR*(1-1/√2)=' + (ZR * (1 - 1 / Math.sqrt(2))).toFixed(4) + ' m)');
  console.log('--- 按类型分桶 ---');
  for (const k of Object.keys(byKind)) {
    const b = byKind[k];
    console.log('  ' + k + ': 样本=' + b.n + ' 嵌墙=' + b.emb + ' 率=' + (b.n ? (100 * b.emb / b.n).toFixed(2) : '0') +
      '% 最大穿=' + b.maxPoke.toFixed(4) + 'm');
  }
  ws.destroy();
  process.exitCode = 0;
})().catch((e) => { console.error('[probe] 异常:', e.message); process.exitCode = 2; });
