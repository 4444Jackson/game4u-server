// test-client-interp.cjs —— 复刻客户端 interpolate() 线性插值，实测插值是否切角穿墙
// 抓真实快照流(带 snap.st) → 以 60fps 渲染时钟复刻客户端插值 → 量每个插值位置的 AABB 嵌墙深度。
// 判据与客户端一致：僵尸可视/受击方块半边长 ZR=0.9，与 map-core 的 moveBoxAxis 同口径。
const http = require('http');
const crypto = require('crypto');
const PORT = process.env.PORT ? Number(process.env.PORT) : 8200;
const HOST = process.env.HOST || '127.0.0.1';
const ZR = 0.9;

function encodeClientFrame(str) {
  const payload = Buffer.from(str, 'utf8');
  const len = payload.length;
  const mask = crypto.randomBytes(4);
  let header;
  if (len < 126) { header = Buffer.alloc(2); header[1] = 0x80 | len; }
  else if (len < 65536) { header = Buffer.alloc(4); header.writeUInt16BE(len, 2); header[1] = 0x80 | 126; }
  else { header = Buffer.alloc(10); header[1] = 0x80 | 127; header.writeBigUInt64BE(BigInt(len), 2); header[1] = 0x80 | 126; }
  header[0] = 0x81;
  const masked = Buffer.alloc(len);
  for (let i = 0; i < len; i++) masked[i] = payload[i] ^ mask[i % 4];
  return Buffer.concat([header, mask, masked]);
}
function parseServerFrame(data) {
  if (data.length < 2) return null;
  const b0 = data[0], b1 = data[1];
  const opcode = b0 & 0x0f;
  let len = b1 & 0x7f; let offset = 2;
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
    if (ox > 0 && oz > 0) maxPoke = Math.max(maxPoke, Math.min(ox, oz));
  }
  return maxPoke;
}
// 复刻客户端 interpolate()：在最近两段快照间按 rt=now-50ms 线性插值
function clientInterpAt(snaps, rt) {
  const INTERP = 50;
  const rtt = rt - INTERP;
  let a = snaps[0], b = snaps[snaps.length - 1];
  for (let i = 0; i < snaps.length; i++) {
    if (snaps[i].t > rtt) { b = snaps[i]; a = i > 0 ? snaps[i - 1] : snaps[i]; break; }
  }
  const span = (b.t - a.t) || 1;
  const f = Math.max(0, Math.min(1, (rtt - a.t) / span));
  const lerp = (u, v) => u + (v - u) * f;
  const out = {};
  const Az = new Map(a.snap.zombies.map((z) => [z.id, z]));
  for (const Bz of b.snap.zombies) {
    const Azp = Az.get(Bz.id);
    if (Azp) out[Bz.id] = { x: lerp(Azp.x, Bz.x), z: lerp(Azp.z, Bz.z) };
    else out[Bz.id] = { x: Bz.x, z: Bz.z };
  }
  return out;
}

(async () => {
  const ws = await open();
  console.log('[interp] 已连 live 服务 ws://' + HOST + ':' + PORT);
  let capBuf = Buffer.alloc(0);
  let obstacles = null;
  const snaps = [];           // {t: st(ms 单调), snap}
  let lastSt = null, intervals = [];
  let rawMaxPoke = 0, rawEmb = 0, rawN = 0;
  let interpMaxPoke = 0, interpEmb = 0, interpN = 0;
  let byKindRaw = {}, byKindInterp = {};

  ws.on('data', (chunk) => {
    capBuf = Buffer.concat([capBuf, chunk]);
    let f;
    while ((f = parseServerFrame(capBuf))) {
      capBuf = f.rest;
      if (f.opcode === 0x8) { ws.destroy(); return; }
      if (f.opcode !== 0x1 && f.opcode !== 0x2) continue;
      let m; try { m = JSON.parse(f.payload.toString('utf8')); } catch (_) { continue; }
      if (m && Array.isArray(m.map) && m.map.length) obstacles = m.map;
      if (m && Array.isArray(m.zombies)) {
        const st = (m.st != null) ? m.st : (lastSt == null ? 0 : lastSt + 16);
        if (lastSt != null) intervals.push(st - lastSt);
        lastSt = st;
        snaps.push({ t: st, snap: m });
        // 原始(服务端直发)每帧嵌墙
        for (const z of m.zombies) {
          const p = embeddedPoke(z, obstacles || []);
          const k = z.k || 'walker';
          byKindRaw[k] = byKindRaw[k] || { n: 0, emb: 0, mx: 0 };
          byKindRaw[k].n++; rawN++;
          if (p > 0) { rawEmb++; byKindRaw[k].emb++; }
          if (p > byKindRaw[k].mx) byKindRaw[k].mx = p;
          if (p > rawMaxPoke) rawMaxPoke = p;
        }
      }
    }
  });

  send(ws, { type: 'listRooms' });
  const welcome = waitMsg(ws, (m) => m.type === 'welcome' || m.type === 'error');
  send(ws, { type: 'createRoom', name: '插值探针', mode: 'wave' });
  let r = await welcome;
  if (!r || r.type === 'error') { console.log('[interp] 建房失败:', JSON.stringify(r)); process.exit(2); }
  send(ws, { type: 'startGame', mode: 'wave' });
  await new Promise((res) => setTimeout(res, 700));
  if (!obstacles) { console.log('[interp] 未收到地形'); process.exit(2); }
  console.log('[interp] 收到障碍 ' + obstacles.length + ' 个；采集 20s...');
  await new Promise((res) => setTimeout(res, 20000));

  // 复刻客户端插值：以 60fps 推进渲染时钟，覆盖 [snaps[1].t, snaps[last].t]
  const t0 = snaps[0].t, t1 = snaps[snaps.length - 1].t;
  const FRAME = 1000 / 60;
  for (let rt = t0; rt <= t1; rt += FRAME) {
    // 取包围 rt 的快照窗口（客户端保留 1s）
    const win = snaps.filter((s) => s.t <= rt + 1 && s.t >= rt - 1000);
    if (win.length < 2) continue;
    const interp = clientInterpAt(win, rt);
    for (const id in interp) {
      const z = interp[id];
      const p = embeddedPoke(z, obstacles || []);
      const k = 'z';
      byKindInterp[k] = byKindInterp[k] || { n: 0, emb: 0, mx: 0 };
      byKindInterp[k].n++; interpN++;
      if (p > 0) { interpEmb++; byKindInterp[k].emb++; }
      if (p > byKindInterp[k].mx) byKindInterp[k].mx = p;
      if (p > interpMaxPoke) interpMaxPoke = p;
    }
  }

  const avgInterval = intervals.length ? intervals.reduce((a, b) => a + b, 0) / intervals.length : 0;
  const minInterval = intervals.length ? Math.min(...intervals) : 0;
  const maxInterval = intervals.length ? Math.max(...intervals) : 0;

  console.log('\n==== 服务端直发 vs 客户端插值(复刻) 嵌墙实测 ====');
  console.log('快照间隔(ms): 均值=' + avgInterval.toFixed(1) + ' 最小=' + minInterval + ' 最大=' + maxInterval);
  console.log('\n--- 服务端直发(每帧, 未插值) ---');
  console.log('样本=' + rawN + ' 嵌墙=' + rawEmb + ' 率=' + (rawN ? (100 * rawEmb / rawN).toFixed(2) : '0') + '% 最大穿=' + rawMaxPoke.toFixed(4) + 'm');
  for (const k of Object.keys(byKindRaw)) { const b = byKindRaw[k]; console.log('  ' + k + ': 样本=' + b.n + ' 嵌墙=' + b.emb + ' 率=' + (b.n ? (100 * b.emb / b.n).toFixed(2) : '0') + '% 最大穿=' + b.mx.toFixed(4) + 'm'); }
  console.log('\n--- 客户端插值(60fps 复刻) ---');
  console.log('插值样本=' + interpN + ' 嵌墙=' + interpEmb + ' 率=' + (interpN ? (100 * interpEmb / interpN).toFixed(2) : '0') + '% 最大穿=' + interpMaxPoke.toFixed(4) + 'm');
  console.log('\n结论: 若"插值最大穿"显著 > "直发最大穿"，则穿墙来自客户端线性插值切角，需改插值策略(如跳过墙角/用服务端物理插值)。');
  ws.destroy();
  process.exitCode = 0;
})().catch((e) => { console.error('[interp] 异常:', e.message); process.exitCode = 2; });
