const http = require('http');
const crypto = require('crypto');
const PORT = 8200, HOST = '127.0.0.1', ZR = 0.9;

function enc(s) {
  const p = Buffer.from(s);
  const l = p.length;
  const mask = crypto.randomBytes(4);
  let h;
  if (l < 126) { h = Buffer.alloc(2); h[1] = 0x80 | l; }
  else if (l < 65536) { h = Buffer.alloc(4); h[1] = 0x80 | 126; h.writeUInt16BE(l, 2); }
  else { h = Buffer.alloc(10); h[1] = 0x80 | 127; h.writeBigUInt64BE(BigInt(l), 2); }
  h[0] = 0x81;
  const m = Buffer.alloc(l);
  for (let i = 0; i < l; i++) m[i] = p[i] ^ mask[i % 4];
  return Buffer.concat([h, mask, m]);
}
function dec(d) {
  if (d.length < 2) return null;
  const b0 = d[0], b1 = d[1];
  let len = b1 & 0x7f, off = 2;
  if (len === 126) { if (d.length < 4) return null; len = d.readUInt16BE(2); off = 4; }
  else if (len === 127) { if (d.length < 10) return null; len = Number(d.readBigUInt64BE(2)); off = 10; }
  if (d.length < off + len) return null;
  return { op: b0 & 0x0f, p: d.slice(off, off + len), rest: d.slice(off + len) };
}
function open() {
  return new Promise((res, rej) => {
    const k = crypto.randomBytes(16).toString('base64');
    const r = http.request({ host: HOST, port: PORT, path: '/', headers: { Connection: 'Upgrade', Upgrade: 'websocket', 'Sec-WebSocket-Key': k, 'Sec-WebSocket-Version': '13' } });
    r.on('upgrade', (rs, s) => res(s));
    r.on('error', rej);
    r.end();
  });
}
function wait(sock, pred, t) {
  t = t || 4000;
  return new Promise((res, rej) => {
    const to = setTimeout(() => rej(new Error('timeout')), t);
    const on = (c) => {
      let buf = sock.__buf || Buffer.alloc(0);
      buf = Buffer.concat([buf, c]);
      sock.__buf = buf;
      let f;
      while ((f = dec(buf))) {
        buf = f.rest; sock.__buf = buf;
        if (f.op === 8) { clearTimeout(to); sock.removeListener('data', on); return; }
        if (f.op === 1 || f.op === 2) {
          let m; try { m = JSON.parse(f.p.toString()); } catch (_) { continue; }
          if (m && pred(m)) { clearTimeout(to); sock.removeListener('data', on); res(m); return; }
        }
      }
    };
    sock.on('data', on);
  });
}
const send = (s, o) => s.write(enc(JSON.stringify(o)));

function gap(z, obs) {
  let best = 1e9; // 正=离墙间隙, 负=嵌墙深度
  for (const o of obs) {
    const dx = Math.abs(z.x - o.x);
    const dz = Math.abs(z.z - o.z);
    const ex = o.w / 2 + ZR;
    const ez = o.d / 2 + ZR;
    const gx = ex - dx;
    const gz = ez - dz;
    let local;
    if (gx > 0 && gz > 0) {
      local = -Math.min(gx, gz); // 两轴都重叠 => 真实嵌墙(负)
    } else {
      const sx = dx - ex;
      const sz = dz - ez;
      if (sx > 0 && sz > 0) local = Math.sqrt(sx * sx + sz * sz);
      else local = Math.max(sx, sz);
    }
    if (local < best) best = local;
  }
  return best;
}

(async () => {
  const ws = await open();
  let obs = null, frames = 0, tot = 0, emb = 0, maxEmb = 0, minGapAll = 1e9;
  const byK = {};
  ws.on('data', (c) => {
    let buf = ws.__buf || Buffer.alloc(0);
    buf = Buffer.concat([buf, c]);
    let f;
    while ((f = dec(buf))) {
      buf = f.rest;
      if (f.op === 8) { ws.destroy(); return; }
      if (f.op !== 1 && f.op !== 2) continue;
      let m; try { m = JSON.parse(f.p.toString()); } catch (_) { continue; }
      if (m && Array.isArray(m.map) && m.map.length) obs = m.map;
      if (m && Array.isArray(m.zombies)) {
        frames++;
        for (const z of m.zombies) {
          const g = gap(z, obs || []);
          tot++;
          const k = z.k || 'walker';
          byK[k] = byK[k] || { n: 0, emb: 0, min: 1e9, max: 0 };
          byK[k].n++;
          byK[k].min = Math.min(byK[k].min, g);
          byK[k].max = Math.max(byK[k].max, -g);
          if (g < 0) { emb++; byK[k].emb++; }
          if (g < minGapAll) minGapAll = g;
          if (-g > maxEmb) maxEmb = -g;
        }
      }
    }
    ws.__buf = buf;
  });
  send(ws, { type: 'listRooms' });
  const w = wait(ws, (m) => m.type === 'welcome' || m.type === 'error');
  send(ws, { type: 'createRoom', name: 'raw探针', mode: 'wave' });
  const r = await w;
  if (!r || r.type === 'error') { console.log('建房失败', JSON.stringify(r)); process.exit(2); }
  send(ws, { type: 'startGame', mode: 'wave' });
  await new Promise((rv) => setTimeout(rv, 700));
  console.log('=== 障碍原始数据(前3个) ===');
  console.log(JSON.stringify((obs || []).slice(0, 3)));
  console.log('障碍总数=' + (obs ? obs.length : 0));
  await new Promise((rv) => setTimeout(rv, 20000));
  console.log('\n=== 20s 实测 ===');
  console.log('样本=' + tot + ' 嵌墙=' + emb + ' 率=' + (tot ? (100 * emb / tot).toFixed(2) : 0) + '% 最大嵌=' + maxEmb.toFixed(4) + 'm 最近墙间隙=' + minGapAll.toFixed(4) + 'm');
  for (const k of Object.keys(byK)) {
    const b = byK[k];
    console.log('  ' + k + ': n=' + b.n + ' 嵌=' + b.emb + ' 最近间隙=' + b.min.toFixed(4) + 'm 最深嵌=' + b.max.toFixed(4) + 'm');
  }
  ws.destroy();
})().catch((e) => { console.error('异常', e.message); process.exit(2); });
