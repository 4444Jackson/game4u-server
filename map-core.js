// map-core.js — 地图/障碍物/碰撞/视线/寻路/僵尸AI 共享核心（纯逻辑，无渲染依赖）
// 由 sim-core.js（relay 权威模拟）与 src/game.js（浏览器客户端：渲染 + 本地预测）共同 import，
// 作为地形/碰撞规则的单一真源——两处 import 同一份，天然一致，无需手工镜像。
//
// 【坐标系语义（重要，勿误读为"两套坐标系"）】
// 全项目唯一权威坐标系 = 连续米制浮点 (x, z)。实体位置、碰撞判定、路径点全部用它表达。
// STEP 与 GRID_CELL 不是坐标系，而是两个"即用即弃"的采样刻度，彼此从不换算：
//   - STEP(1.5m)：仅在 genObstacles 生成期用一次，把随机数吸附到整齐刻度；产物仍是米制坐标。
//   - GRID_CELL(2m)：仅在 findPath 内部活着（米→格号→BFS→立刻换算回米制路径点），格号从不泄漏到寻路之外。
// 因此不存在"向前3格"这种格数语义，也就没有度量衡歧义。
// 刻意不把 GRID_CELL 对齐成 1.5：格半宽 1.0 ≈ 僵尸半径 0.9 才是关键对齐——
// 保证"被标记可走的格子中心，僵尸站上去必然真的可走"；改 1.5 反而采样过度保守且格子数暴涨。

export const MAP = 38;          // 场地半边长
export const STEP = 1.5;        // 高度档位：每档 1.5m（单次跳跃最高 ~1.88m → 1 档跳得上，2 档上不去）
export const MAX_TIER = 4;      // 障碍物最高 4 档 = 6m
const CENTER_CLEAR = 13;        // 中心出生区留空半径
export const WALL_CLEAR = 3.0;  // 障碍离边界墙净距：须使"墙↔障碍"通道中心可走带宽度 ≥ 玩家直径(1.2m)，杜绝贴两边卡死
const GRID_CELL = 2;            // 寻路网格边长(米)。格半宽1.0≈僵尸半径0.9：可走格中心必真可走（勿改1.5"对齐"STEP，见文件头注释）
const GRID_N = Math.ceil((MAP * 2) / GRID_CELL);
const PLAYER_HW = 0.6;  // 玩家碰撞方块半边长（与 sim-core.PLAYER_OBS_R 一致；可视方块底面 1.2 = 2×此值）
const BULLET_R = 0.12;  // 子弹碰撞方块半边长（与 sim-core.BULLET_RADIUS 一致；可视方块 0.24 见方 → 所见即碰撞）

const clampv = (v, a, b) => Math.max(a, Math.min(b, v));

// ---------------- 障碍物生成 ----------------
// 不做「楼梯/掩体」分类模板——只有随机方块，高度取离散档位。
// 能不能跳上去/绕上去，由布局随机涌现，且整数档位判定杜绝浮点卡脚。
export function genObstacles(count = 24) {
  const obs = [];
  let tries = 0;
  const snap = (v) => Math.round(v / STEP) * STEP;   // 障碍几何量化到统一步长(STEP)，杜绝无步长随机数的浮点尾差
  while (obs.length < count && tries < 500) {
    tries++;
    const w = snap(3 + Math.random() * 5);
    const d = snap(3 + Math.random() * 5);
    const x = snap((Math.random() * 2 - 1) * (MAP - 5));
    const z = snap((Math.random() * 2 - 1) * (MAP - 5));
    const t = 1 + Math.floor(Math.random() * MAX_TIER);   // 高度档 1..4（已离散）
    if (Math.hypot(x, z) < CENTER_CLEAR + Math.max(w, d) / 2) continue;  // 出生区留空
    // 离墙净距 ≥WALL_CLEAR(3.0m)：墙在 ±38、玩家中心被钳在 ±37，故"墙↔障碍"通道中心可走带
    // = (MAP-1) - (障碍边缘 + 玩家半径) = 37 - (35.0 + 0.6) = 1.4m > 玩家直径 1.2m，
    // 玩家落进此缝也只会贴一边、绝不会同时贴障碍与墙而卡死（再加 depenetratePlayer 兜底，双保险）。
    if (Math.abs(x) + w / 2 > MAP - WALL_CLEAR || Math.abs(z) + d / 2 > MAP - WALL_CLEAR) continue;
    let ok = true;
    for (const o of obs) {
      // 通道约束名义值 1.6m，但因位置/尺寸都量化到 STEP(1.5) → 任意两障碍实际间隙必为 0.75 的整数倍，
      // "≥1.6" 里最小的 0.75 倍数是 2.25 → 真实地图通道下限 = 2.25m：
      // 僵尸(Ø1.8)可过(余0.45m)、玩家(Ø1.2)更轻松(余1.05m)，不存在"僵尸挤不过通道"的死角。
      if (Math.abs(x - o.x) < (w + o.w) / 2 + 1.6 &&
          Math.abs(z - o.z) < (d + o.d) / 2 + 1.6) { ok = false; break; }
    }
    if (!ok) continue;
    obs.push({ x: +x.toFixed(2), z: +z.toFixed(2), w: +w.toFixed(2), d: +d.toFixed(2), t });
  }
  return obs;
}

// (x,z) 处脚下的支撑面高度（0=地面；站在障碍物上=其顶面高度）
export function topAt(obs, x, z, r = 0) {
  let top = 0;
  for (const o of obs) {
    if (x > o.x - o.w / 2 - r && x < o.x + o.w / 2 + r &&
        z > o.z - o.d / 2 - r && z < o.z + o.d / 2 + r) {
      const h = o.t * STEP;
      if (h > top) top = h;
    }
  }
  return top;
}

// OBB-OBB 重叠判定（SAT，2D 俯视）。盒子由中心 + 半边长(ahw,ahd) + 朝向(ayaw 弧度) 描述。
// 仅用于「伤害/命中」判定（子弹命中实体、僵尸近战）——碰撞箱 = 可视方块本体，严格贴合建模，
// 打中任一角都算数，不会因内切圆留角而丢伤害。移动/体积碰撞另用 circleOverlapObs(圆柱)，互不影响。
export function obbOverlap(ax, az, ahw, ahd, ayaw, bx, bz, bhw, bhd, byaw) {
  const ca = Math.cos(ayaw), sa = Math.sin(ayaw);
  const cb = Math.cos(byaw), sb = Math.sin(byaw);
  const axes = [
    [ca, sa],    // A 本地 x 轴
    [-sa, ca],   // A 本地 z 轴
    [cb, sb],    // B 本地 x 轴
    [-sb, cb],   // B 本地 z 轴
  ];
  const dx = ax - bx, dz = az - bz;
  for (const [nx, nz] of axes) {
    const ra = ahw * Math.abs(ca * nx + sa * nz) + ahd * Math.abs(-sa * nx + ca * nz);
    const rb = bhw * Math.abs(cb * nx + sb * nz) + bhd * Math.abs(-sb * nx + cb * nz);
    if (Math.abs(dx * nx + dz * nz) > ra + rb) return false;
  }
  return true;
}

// ── 体积/移动碰撞：圆柱体（俯视即圆，半径控距防穿模） ──
// 旋转无关：圆不随实体 yaw 变形状，故「贴墙转身」永远不会把角戳进墙，也不会因 yaw 不同步而穿模。
// 实体移动只走这套，保证顺滑、零旋转耦合、绝不卡墙。
// 圆 vs 障碍 AABB（仅 XZ 平面）：取障碍最近点，判距离 < r。
export function circleOverlapObs(obs, x, z, r, y = 0) {
  for (const o of obs) {
    if (y < o.t * STEP - 0.01) {           // 实体底面低于障碍顶 → 才可能被挡；站在顶面之上则越过
      const cx = clampv(x, o.x - o.w / 2, o.x + o.w / 2);
      const cz = clampv(z, o.z - o.d / 2, o.z + o.d / 2);
      const dx = x - cx, dz = z - cz;
      if (dx * dx + dz * dz < r * r) return true;
    }
  }
  return false;
}

// 连续滑动碰撞（CS/Source 引擎 trace-and-slide 的 2D 简化版，行业标配）：
// 尝试整步位移 (nx,nz)；若与障碍重叠，则沿「最小推出向量」把人顶出到刚好 r 处（圆不嵌入障碍），
// 再把本步剩余位移沿碰撞面【切线】方向投影继续走——于是贴墙能顺滑滑行、挤进两障碍形成的
// 内角也不卡脚（多次迭代分别推开各面并各自滑动）。圆 vs AABB：圆天然能滑过锐角，配合滑动投影
// 彻底消除旧版「先X后Z分轴回退」在内角/外角处反复回退导致的卡顿/卡脚。最多迭代 4 次处理多障碍。
// 签名保持不变：玩家/僵尸/本地预测三处调用自动升级，无需改动调用点。
export function moveCircle(obs, px, pz, nx, nz, r, y = 0) {
  const clampX = (v) => clampv(v, -MAP + 1, MAP - 1);
  let x = nx, z = nz;
  for (let iter = 0; iter < 4; iter++) {
    // 找当前最嵌(顶出量最大)的障碍
    let hnx = 0, hnz = 0, push = 0;
    for (const o of obs) {
      if (y >= o.t * STEP - 0.01) continue;            // 站在顶面之上则不挡（与 circleOverlapObs 同判据）
      const cx = clampv(x, o.x - o.w / 2, o.x + o.w / 2);
      const cz = clampv(z, o.z - o.d / 2, o.z + o.d / 2);
      const ddx = x - cx, ddz = z - cz, d2 = ddx * ddx + ddz * ddz;
      if (d2 < r * r) {
        let nx, nz, p;
        if (d2 < 1e-9) {
          // 圆心恰在障碍矩形内（零法线退化，正常逐帧步进不会触发）：用来源方向(px,pz)推回来源侧，避免穿墙
          if (Math.abs(px - o.x) >= Math.abs(pz - o.z)) {
            nx = (px <= o.x) ? -1 : 1; nz = 0;
            const edge = (px <= o.x) ? (o.x - o.w / 2) : (o.x + o.w / 2);
            p = Math.abs(x - edge) + r;
          } else {
            nx = 0; nz = (pz <= o.z) ? -1 : 1;
            const edge = (pz <= o.z) ? (o.z - o.d / 2) : (o.z + o.d / 2);
            p = Math.abs(z - edge) + r;
          }
        } else {
          const d = Math.sqrt(d2);
          p = r - d; nx = ddx / d; nz = ddz / d;
        }
        if (p > push) { push = p; hnx = nx; hnz = nz; }
      }
    }
    if (push <= 0) break;                              // 已不重叠 → 走到目标
    x += hnx * push; z += hnz * push;                  // 顶出到刚好 r
    // 剩余位移 = 从当前位置朝原始目标(nx,nz)方向、投影到碰撞面切线（滑动）
    let rx = nx - x, rz = nz - z;
    const dot = rx * hnx + rz * hnz;
    rx -= dot * hnx; rz -= dot * hnz;
    x += rx; z += rz;
    if (rx * rx + rz * rz < 1e-6) break;               // 切线方向也走不动（被多面夹死）→ 停在最远可行点
  }
  return { x: clampX(x), z: clampX(z) };
}

// 落地/移动后兜底去穿透(depenetration)：
// 若玩家圆柱与某障碍重叠(典型：跳起后从空中飘入"障碍↔墙"窄缝再落地，落地只 snap y 不重解碰撞)，
// 沿最小平移向量把人顶出到刚好不重叠。否则该位置所有方向的移动都会被 moveCircle 判为"仍重叠→回退"，
// 表现为"人冻住但视角(aim)能转"的伪卡死。每帧在权威模拟与本地预测落地后各调用一次。
// 迭代处理多障碍/钳位回弹，最多 6 次必收敛；真·无解(理论上已不存在)时朝地图中心顶出。
export function depenetratePlayer(obs, p, r = PLAYER_HW) {
  for (let iter = 0; iter < 6; iter++) {
    let bx = 0, bz = 0, bpush = 0;   // 取当前最嵌(顶出量最大)的障碍，一次性顶出
    for (const o of obs) {
      if (p.y >= o.t * STEP - 0.01) continue;   // 站在顶面之上则不挡（与 circleOverlapObs 同判据）
      const minx = o.x - o.w / 2, maxx = o.x + o.w / 2;
      const minz = o.z - o.d / 2, maxz = o.z + o.d / 2;
      const cx = clampv(p.x, minx, maxx), cz = clampv(p.z, minz, maxz);
      const dx = p.x - cx, dz = p.z - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 >= r * r) continue;
      let nx, nz, push;
      if (d2 > 1e-9) { const d = Math.sqrt(d2); nx = dx / d; nz = dz / d; push = r - d; }
      else { const d = Math.hypot(p.x, p.z) || 1; nx = -p.x / d; nz = -p.z / d; push = r; } // 圆心恰在障碍内：朝地图中心(出生留空区)顶出
      if (push > bpush) { bx = nx * push; bz = nz * push; bpush = push; }
    }
    if (bpush <= 0) break;
    p.x = clampv(p.x + bx, -MAP + 1, MAP - 1);
    p.z = clampv(p.z + bz, -MAP + 1, MAP - 1);
  }
}

// ---------------- 视线（线段 vs AABB，2D 俯视 + 高度过滤）----------------
export function hasLOS(obs, x1, z1, x2, z2, eyeY = 1.1) {
  for (const o of obs) {
    if (o.t * STEP <= eyeY) continue;   // 低于视线高度的矮块不挡视线
    if (segAABB(x1, z1, x2, z2, o.x - o.w / 2, o.z - o.d / 2, o.x + o.w / 2, o.z + o.d / 2)) return false;
  }
  return true;
}
function segAABB(x1, z1, x2, z2, minx, minz, maxx, maxz) {
  let t0 = 0, t1 = 1;
  const dx = x2 - x1, dz = z2 - z1;
  const axes = [[x1, dx, minx, maxx], [z1, dz, minz, maxz]];
  for (const [p, d, mn, mx] of axes) {
    if (Math.abs(d) < 1e-9) { if (p < mn || p > mx) return false; }
    else {
      let ta = (mn - p) / d, tb = (mx - p) / d;
      if (ta > tb) { const t = ta; ta = tb; tb = t; }
      if (ta > t0) t0 = ta;
      if (tb < t1) t1 = tb;
      if (t0 > t1) return false;
    }
  }
  return true;
}

// ---------------- 寻路（BFS 网格，地图小无需 A*）----------------
export function buildGrid(obs) {
  const cells = new Uint8Array(GRID_N * GRID_N);
  for (let j = 0; j < GRID_N; j++) {
    for (let i = 0; i < GRID_N; i++) {
      const x = -MAP + (i + 0.5) * GRID_CELL;
      const z = -MAP + (j + 0.5) * GRID_CELL;
      if (circleOverlapObs(obs, x, z, 0.9, 0)) cells[j * GRID_N + i] = 1;
    }
  }
  return { n: GRID_N, cells };
}
const cellOf = (v) => clampv(Math.floor((v + MAP) / GRID_CELL), 0, GRID_N - 1);

export function findPath(grid, sx, sz, tx, tz) {
  const n = grid.n, cells = grid.cells;
  const si = cellOf(sx), sj = cellOf(sz), ti = cellOf(tx), tj = cellOf(tz);
  const start = sj * n + si, goal = tj * n + ti;
  if (start === goal) return null;
  const prev = new Int32Array(n * n).fill(-1);
  prev[start] = start;
  const q = [start];
  let head = 0, found = -1;
  while (head < q.length) {
    const c = q[head++];
    if (c === goal) { found = c; break; }
    const ci = c % n, cj = (c - ci) / n;
    if (ci + 1 < n) visit(cj * n + ci + 1, c);
    if (ci - 1 >= 0) visit(cj * n + ci - 1, c);
    if (cj + 1 < n) visit((cj + 1) * n + ci, c);
    if (cj - 1 >= 0) visit((cj - 1) * n + ci, c);
  }
  function visit(nc, from) {
    if (!cells[nc] && prev[nc] === -1) { prev[nc] = from; q.push(nc); }
  }
  if (found < 0) return null;
  const path = [];
  let c = found;
  while (c !== start) {
    const ci = c % n, cj = (c - ci) / n;
    path.push({ x: -MAP + (ci + 0.5) * GRID_CELL, z: -MAP + (cj + 0.5) * GRID_CELL });
    c = prev[c];
  }
  path.reverse();
  return path;
}

// ---------------- 子弹 vs 障碍/围墙 ----------------
// 返回 true = 子弹应消失；bounce=true 时改为镜面反弹（撞面反转速度分量）
// 子弹（有朝向小方块，半边长 BULLET_R，朝向沿飞行方向）撞围墙/障碍：反弹或消失
export function bulletWorld(obs, b, px, pz, bounce) {
  const W = MAP - 0.4;
  if (Math.abs(b.x) > W) {
    if (!bounce) return true;
    b.x = Math.sign(b.x) * 2 * W - b.x;
    b.vx = -b.vx;
  }
  if (Math.abs(b.z) > W) {
    if (!bounce) return true;
    b.z = Math.sign(b.z) * 2 * W - b.z;
    b.vz = -b.vz;
  }
  const by = (b.y == null) ? 1.2 : b.y;
  for (const o of obs) {
    if (by >= o.t * STEP) continue;   // 飞得比箱顶高 → 直接越过
    // 体积碰撞（圆柱）：子弹圆心 vs 障碍 AABB，最近点距离 < 半径 即撞
    const cx = clampv(b.x, o.x - o.w / 2, o.x + o.w / 2);
    const cz = clampv(b.z, o.z - o.d / 2, o.z + o.d / 2);
    const dx = b.x - cx, dz = b.z - cz;
    if (dx * dx + dz * dz >= BULLET_R * BULLET_R) continue;   // 未撞该障碍 → 看下一个
    if (!bounce) return true;        // 命中且不开反弹 → 子弹消失
    const minx = o.x - o.w / 2, maxx = o.x + o.w / 2;
    const minz = o.z - o.d / 2, maxz = o.z + o.d / 2;
    const wasInX = px > minx && px < maxx;
    const wasInZ = pz > minz && pz < maxz;
    if (wasInX && wasInZ) return true;   // 上一帧已在框内（极端）→ 消失防抖
    if (!wasInX) {
      b.x = (px <= minx) ? 2 * minx - b.x : 2 * maxx - b.x;
      b.vx = -b.vx;
    }
    if (!wasInZ) {
      b.z = (pz <= minz) ? 2 * minz - b.z : 2 * maxz - b.z;
      b.vz = -b.vz;
    }
  }
  return false;
}

// ---------------- 僵尸类型与 AI ----------------
// walker 视线型：只追看得见的玩家，看不见就慢速游荡
// seeker 寻路型：BFS 网格绕障找人（限频重算）
// flyer  贴地飞：低空飞行越过障碍直追，可攻击高处玩家
export function pickZombieKind(score, zmix) {
  if (zmix === 'mix') {
    const r = Math.random();
    return r < 0.5 ? 'walker' : (r < 0.8 ? 'seeker' : 'flyer');
  }
  // 默认：随击杀进度逐步引入
  const pool = ['walker'];
  if (score >= 8) pool.push('seeker');
  if (score >= 20) pool.push('flyer');
  return pool[Math.floor(Math.random() * pool.length)];
}

export const ZSTAT = {
  walker: { hp: 3, spd: 1.0 },
  seeker: { hp: 4, spd: 0.95 },
  flyer:  { hp: 2, spd: 1.05 }
};

const ZR = 0.9;            // 僵尸碰撞方块半边长（轴对齐，不随转向）
const MELEE_Y = 1.7;       // 地面僵尸近战可及高度：1 档(1.5)仍会被咬，2 档(3.0)安全
const FLYER_ATK_Y = 1.6;

// 推进单只僵尸一帧；ctx = { obs, grid, players }
// 返回被攻击命中的玩家对象（由调用方结算伤害/死亡，模式差异留在两侧 sim），未攻击返回 null
export function stepZombie(z, dt, ctx) {
  const { obs, grid, players } = ctx;
  let tp = null, best = 1e9;
  for (const id in players) {
    const p = players[id];
    if (!p.alive) continue;
    const d = Math.hypot(p.x - z.x, p.z - z.z);
    if (d < best) { best = d; tp = p; }
  }
  z.atkCd -= dt;
  if (!tp) return null;

  // 伤害判定用严格方块：僵尸方块(轴对齐) vs 玩家方块(随瞄准转)，本体相切即命中（不膨胀、不丢角）
  const meleeHit = obbOverlap(z.x, z.z, ZR, ZR, 0, tp.x, tp.z, PLAYER_HW, PLAYER_HW, tp.aim);

  if (z.k === 'flyer') {
    const a = Math.atan2(tp.x - z.x, tp.z - z.z);
    z.x = clampv(z.x + Math.sin(a) * z.speed * dt, -MAP + 1, MAP - 1);
    z.z = clampv(z.z + Math.cos(a) * z.speed * dt, -MAP + 1, MAP - 1);
    const cruise = Math.max(topAt(obs, z.x, z.z, ZR) + 0.5, tp.y);
    z.y = (z.y || 0) + (cruise - (z.y || 0)) * Math.min(1, 6 * dt);
    if (meleeHit && Math.abs((z.y || 0) - tp.y) < FLYER_ATK_Y && z.atkCd <= 0) {
      z.atkCd = 0.8;
      return tp;
    }
    return null;
  }

  let dir;
  if (z.k === 'seeker') {
    z.pt = (z.pt || 0) - dt;
    if (z.pt <= 0 || !z.path || !z.path.length) {
      z.pt = 0.6;
      z.path = (grid && findPath(grid, z.x, z.z, tp.x, tp.z)) || [];
    }
    if (z.path.length && Math.hypot(z.path[0].x - z.x, z.path[0].z - z.z) < 1.0) z.path.shift();
    const wp = z.path[0];
    dir = wp ? Math.atan2(wp.x - z.x, wp.z - z.z) : Math.atan2(tp.x - z.x, tp.z - z.z);
  } else {
    // walker：看得见才追，看不见半速游荡
    if (hasLOS(obs, z.x, z.z, tp.x, tp.z)) {
      dir = Math.atan2(tp.x - z.x, tp.z - z.z);
    } else {
      z.wt = (z.wt || 0) - dt;
      if (z.wt <= 0) { z.wt = 1.5 + Math.random() * 2; z.wa = Math.random() * Math.PI * 2; }
      const nx = z.x + Math.sin(z.wa) * z.speed * 0.45 * dt;
      const nz = z.z + Math.cos(z.wa) * z.speed * 0.45 * dt;
      const c = moveCircle(obs, z.x, z.z, nx, nz, ZR, 0);
      z.x = clampv(c.x, -MAP + 1, MAP - 1);
      z.z = clampv(c.z, -MAP + 1, MAP - 1);
      return null;
    }
  }
  const nx = z.x + Math.sin(dir) * z.speed * dt;
  const nz = z.z + Math.cos(dir) * z.speed * dt;
  const c = moveCircle(obs, z.x, z.z, nx, nz, ZR, 0);
  z.x = clampv(c.x, -MAP + 1, MAP - 1);
  z.z = clampv(c.z, -MAP + 1, MAP - 1);
  if (meleeHit && tp.y < MELEE_Y && z.atkCd <= 0) {
    z.atkCd = 0.8;
    return tp;
  }
  return null;
}
