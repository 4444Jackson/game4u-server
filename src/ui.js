// ui.js — 虚拟摇杆 + HUD

let _layoutEdit = false; // 布局编辑模式：开启时可拖动摇杆/射击/跳跃键定位（此时控件只挪位置、不触发功能）


// ---------------- 屏幕方向 ----------------
// 手机横屏/竖屏可用区域差别很大（844x390 vs 390x844），同一套百分比布局在另一方向必然错位，
// 所以两套布局分开存（settings.layouts.landscape / .portrait），切方向自动套用对应那套。
export function currentOrientation() {
  if (typeof window === 'undefined') return 'landscape';
  const w = window.innerWidth || 0, h = window.innerHeight || 0;
  return w >= h ? 'landscape' : 'portrait';
}

// 全屏时尝试锁横屏：安卓 Chrome 支持；iOS Safari 不支持（返回 false，竖屏照常能玩）
export function lockLandscape() {
  if (typeof screen === 'undefined') return false;
  try {
    const so = screen.orientation;
    if (so && typeof so.lock === 'function') {
      const p = so.lock('landscape');
      // lock() 返回 Promise，不支持/被拒时不 catch 会冒成 unhandledrejection（顶部红条），静默吞掉
      if (p && typeof p.catch === 'function') p.catch(() => {});
      return true;
    }
    const legacy = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
    if (typeof legacy === 'function') { legacy.call(screen, 'landscape'); return true; }
  } catch (_) {}
  return false;
}

export function unlockOrientation() {
  if (typeof screen === 'undefined') return;
  try {
    const so = screen.orientation;
    if (so && typeof so.unlock === 'function') { so.unlock(); return; }
    const legacy = screen.unlockOrientation || screen.mozUnlockOrientation || screen.msUnlockOrientation;
    if (typeof legacy === 'function') legacy.call(screen);
  } catch (_) {}
}

// ---------------- Pointer Lock 安全封装 ----------------
// 现代浏览器 requestPointerLock() / exitPointerLock() 返回 Promise，被拒时若不 catch 会冒泡成
// unhandledrejection（页面顶部挂一条永不消失的红色报错条）。而「被拒」在这里几乎都是良性的：
//   · Chrome 在退出锁定后有约 1.25s 冷却期，期间任何锁定请求必被拒
//     （点天赋面板「✔ 配好了」立刻回锁战斗视角，正好撞上这个 → 每局都弹 [reject]）
//   · 页面失焦、文档不可见、上一次请求尚未完成时再次请求
// 所以统一走这里：吞掉 rejection，并在冷却期结束后自动补锁一次（玩家无感）。
let _plExitAt = 0;          // 最近一次「锁被解除」的时间戳（含玩家按 ESC 自己退出）
let _plRetryTimer = null;   // 冷却期内排队的补锁定时器
const PL_COOLDOWN = 1400;   // Chrome 冷却约 1.25s，留余量

if (typeof document !== 'undefined') {
  document.addEventListener('pointerlockchange', () => {
    if (!document.pointerLockElement) _plExitAt = Date.now();
  });
  // 锁定被浏览器拒绝时也会走这里（非 Promise 路径），同样静默——不打扰玩家
  document.addEventListener('pointerlockerror', () => {}, false);
}

export function lockPointer(target, _isRetry) {
  if (!target || typeof document === 'undefined') return;
  if (document.pointerLockElement === target) return;
  const wait = PL_COOLDOWN - (Date.now() - _plExitAt);
  if (wait > 0 && !_isRetry) {                    // 还在冷却期：排队，冷却完再锁
    clearTimeout(_plRetryTimer);
    _plRetryTimer = setTimeout(() => lockPointer(target, true), wait);
    return;
  }
  try {
    const p = target.requestPointerLock();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  } catch (_) {}
}

export function unlockPointer() {
  if (typeof document === 'undefined') return;
  _plExitAt = Date.now();
  clearTimeout(_plRetryTimer); _plRetryTimer = null;   // 取消排队的补锁：面板要用光标，别被抢回去
  if (!document.pointerLockElement) return;
  try {
    const p = document.exitPointerLock();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  } catch (_) {}
}

// 输入统一走 Pointer Events + setPointerCapture（2026-08-10 实机日志定责后改造）：
//   旧版用 Touch Events 手动跟踪 identifier，在 Android/夸克上有个致命坑——第二根手指（开火/滑屏）落下时，
//   系统常对第一根手指补发 touchcancel。旧代码把 touchcancel 一律当"抬起"复位 active/touchId，
//   可手指其实还按在摇杆上、浏览器不会再补发 touchstart ⇒ 摇杆彻底哑火，直到玩家抬手重按才活。
//   实机日志正是这个形状：touchMoves 整窗掉 0 而 frames 仍 90（游戏在跑、只是不报移动）。
//   Pointer Events 每根手指有唯一稳定 pointerId，setPointerCapture 后该指的全部事件锁定派发到本元素，
//   多指互不干扰由平台保证，不再需要扫 e.touches，也不会被邻指的 cancel 误伤。
export class Joystick {
  constructor(el, sens = 1) {
    this.el = el;
    this.sens = sens;
    this.knob = el.querySelector('.knob');
    this.x = 0; this.y = 0; this.active = false;
    this.pointerId = null;   // 跟踪起始于本摇杆的那根手指；已占用时后落的指一律忽略
    this._lastMoveT = 0;     // 调试：上次收到本摇杆 move 的时间戳（算卡死间隔用）
    this._bind();
  }
  _bind() {
    // move/up/cancel 一律挂 window，不依赖 setPointerCapture。
    // 旧版用 el.setPointerCapture：Android 多指时平台会"无声夺走"某指的捕获(lostpointercapture)，
    // 元素级监听器自此收不到该指后续 move，摇杆哑火 = 双指滑动卡顿/"一下"。
    // window 级监听器无视捕获，任何指的事件都照收，只按 pointerId 过滤，多指永不因夺指丢事件。
    const el = this.el;
    const onDown = (e) => {
      if (_layoutEdit) return;          // 编辑模式：交给 _enableDrag 拖位置，不当摇杆使
      if (this.pointerId !== null) return;   // 已有手指在控，第二指不抢
      this.pointerId = e.pointerId;
      this.active = true;
      this._lastMoveT = performance.now();   // 重置间隔基准，避免从陈旧时间算起
      this._move(e);
      if (e.cancelable) e.preventDefault();
    };
    const onMove = (e) => {
      if (!this.active) return;
      if (e.pointerId !== this.pointerId) {
        // 【摇杆锁死修复】安卓长按静默换指：系统在不派发 pointercancel/up（本端 joyCancel/joyLostCap
        // 全程=0）的情况下，把 move 的 pointerId 一路递增重编号。旧代码这里直接早退 ⇒ 摇杆只收到约半数
        // move、方向冻结 = 用户说的"锁在一个方向、像被挡住"。实测 155/323 采样窗 joyIdMismatch>0、累计
        // 6018 次，recPid 固定而 lastRecPid 持续递增即铁证。
        // 修正：仍 active 且新指落在本摇杆感应区附近 → 认定同一根手指被系统重编号，接纳它继续控摇杆；
        //       远处来的异指（如开火/转视角那一侧）忽略，不抢（Minecraft/元气骑士：只认压在感应区的手指）。
        const r = this.el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const near = Math.hypot(e.clientX - cx, e.clientY - cy) <= r.width * 1.5;
        if (!near) return;
        this.pointerId = e.pointerId;   // 接纳换指
      }
      const now = performance.now();
      this._lastMoveT = now;
      this._move(e);
      if (e.cancelable) e.preventDefault();
    };
    const onUp = (e) => {
      if (e.pointerId !== this.pointerId) return;
      this.pointerId = null;
      this.active = false; this.x = 0; this.y = 0;
      this._lastMoveT = 0;
      this.knob.style.transform = 'translate(0,0)';
    };
    // pointercancel = 系统抢走这根手指；lostpointercapture = 捕获被夺。两者都不影响 window 级监听收到事件，
    // 这里只计数 + 复位，不再依赖"捕获持有"来保证派发。
    const onCancel = (e) => {
      onUp(e);
    };
    const onLost = (e) => {
      onUp(e);
    };
    el.addEventListener('pointerdown', onDown);
    // window 级：捕获被夺也照收本指事件
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    window.addEventListener('lostpointercapture', onLost);
  }
  _move(e) {
    const rect = this.el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    // PointerEvent 自带本指坐标，无需再扫 e.touches 找 identifier
    let dx = e.clientX - cx, dy = e.clientY - cy;
    const r = rect.width / 2;
    const er = r / (this.sens || 1); // 灵敏度：值越大摇杆越易推到满
    let L = Math.hypot(dx, dy);
    if (L > er) { dx = dx / L * er; dy = dy / L * er; L = er; }
    // 手感整形（纯客户端输入，不影响服务器权威与同步）：
    // 死区 DZ + 响应曲线。死区消手指静止微抖；曲线让小幅推杆更精细、推满仍是满速。
    // 注意死区"重映射"而非"截断"——死区外从 0 重新拉伸到 1，避免越过死区瞬间速度突跳。
    const nl = er > 0 ? L / er : 0;          // 归一化幅度 [0,1]
    const DZ = 0.12;
    let out = 0;
    if (nl > DZ) {
      out = (nl - DZ) / (1 - DZ);
      out = Math.pow(out, 1.5);              // 1.5 次幂响应曲线
    }
    const ux = L > 0 ? dx / L : 0, uy = L > 0 ? dy / L : 0;
    this.x = ux * out; this.y = uy * out;
    this.knob.style.transform = `translate(${dx}px, ${dy}px)`;
  }
  get vec() { return { x: this.x, y: this.y }; }
}

export class Controls {
  constructor({ mode, canvas, moveEl, lookEl, fireEl, jumpEl, settings }) {
    this.mode = mode;        // 'touch' | 'pc'
    this.canvas = canvas;
    this.settings = settings || defaultSettings();
    this.lookSens = this.settings.lookSens;
    this.joySens = this.settings.joySens;
    this.mouseSens = this.settings.mouseSens;   // PC：鼠标灵敏度（影响 yaw/pitch 转动速度）
    this.keysMap = this.settings.keys;           // PC：按键映射（前/后/左/右/跳，可在设置里改）
    this.aimYaw = 0;         // 累计视角(yaw)：PC 由鼠标累加、触摸由右半屏滑动累加；映射到 sim 的 aim
    this.aimPitch = 0;       // 上下俯仰(pitch)，仅本地相机用（看天/看地）
    this.jumpQueued = false; // 跳跃边沿（按下时置位，上行一次后消费）
    this.fire = false;       // 射击：PC 左键按住 / 触摸射击键按住
    this.keys = {};          // PC：按键状态
    this.moveEl = moveEl; this.lookEl = lookEl; this.fireEl = fireEl; this.jumpEl = jumpEl;

    this._dragStops = [];    // 每个可拖动控件的「强制收尾」函数：切屏/失焦时统一调用，防监听器残留把按钮锁在手指下
    this._orient = currentOrientation();

    if (mode === 'touch') {
      this.move = new Joystick(moveEl, this.joySens);  // 左摇杆：移动（灵敏度可调）
      this._bindTouchLook(lookEl);   // 右半屏：滑动转视角（灵敏度可调）
      this._bindTouchFire(fireEl);   // 射击键
      this._bindTouchJump(jumpEl);   // 跳跃键
      this._enableDrag(moveEl, 'joy');   // 可拖动布局
      this._enableDrag(fireEl, 'fire');
      this._enableDrag(jumpEl, 'jump');
      this._bindOrientation();       // 横竖屏切换：收尾拖动 + 套用该方向的布局
      this._applyLayout();
    } else {
      this._bindPC();
    }
  }

  _bindPC() {
    const k = this.keysMap;
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === k.jump && !e.repeat) { this.jumpQueued = true; e.preventDefault(); } // 跳跃键（默认空格，可改），按住不自动连跳(bhop)；并阻止页面滚动
    });
    window.addEventListener('keyup', (e) => { this.keys[e.code] = false; });
    const canvas = this.canvas;
    if (canvas) {
      canvas.addEventListener('mousedown', (e) => {
        // 天赋面板打开时：不锁指针、不开火，把光标留给加点操作（点「配好了」后恢复）
        const tp = document.getElementById('talent-panel');
        if (tp && !tp.classList.contains('hidden')) return;
        if (e.button === 0) this.fire = true;
        // 点击画面锁定鼠标，获得无限移动的视角控制（冷却期内会自动排队补锁，不抛 reject）
        lockPointer(canvas);
      });
      window.addEventListener('mouseup', (e) => { if (e.button === 0) this.fire = false; });
    }
    // 鼠标移动 → 改变 yaw(左右) 与 pitch(上下)；灵敏度受 mouseSens 控制，pitch 限 ±85° 防翻转
    const PITCH_LIM = Math.PI / 2 - 0.05;
    const BASE = 0.0025 * this.mouseSens;
    document.addEventListener('mousemove', (e) => {
      if (typeof e.movementX === 'number') this.aimYaw -= e.movementX * BASE;
      if (typeof e.movementY === 'number') {
        this.aimPitch -= e.movementY * BASE;
        this.aimPitch = Math.max(-PITCH_LIM, Math.min(PITCH_LIM, this.aimPitch));
      }
    });
  }

  // 触摸：右侧半屏滑动转视角。改为 window 级监听，与摇杆同样不依赖 setPointerCapture：
  // Android 多指夺指时捕获会被无声夺走，element 级监听自此收不到该指 move ⇒ 视角卡死。window 级照收不漏。
  _bindTouchLook(lookEl) {
    if (!lookEl) return;
    const PITCH_LIM = Math.PI / 2 - 0.05;
    let id = null, lx = 0, ly = 0;
    const onDown = (e) => {
      if (id !== null) return;                 // 已有手指在转视角，后落的指不抢
      id = e.pointerId; lx = e.clientX; ly = e.clientY;
      if (e.cancelable) e.preventDefault();
    };
    let smDx = 0, smDy = 0;                  // 视角滑动低通状态（指数平滑，吃掉手指高频抖）
    const SM = 0.5;                          // 平滑系数：越大越跟手、越小越稳；0.5 起步，需实机调
    const onMove = (e) => {
      if (id === null) return;
      if (e.pointerId !== id) {
        // 【视角卡死修复】与摇杆同一根因：安卓长按静默换指，不派 cancel/up 就换 id ⇒ 转视角冻结。
        // 新指位置距本控制上一帧位置很近 → 同一根手指被重编号，接纳继续转；位置跳变很远（异指）忽略。
        const dxp = e.clientX - lx, dyp = e.clientY - ly;
        if (Math.hypot(dxp, dyp) > 150) return;   // 150px：同指正常滑动单帧位移远小于此，异指才会触发
        id = e.pointerId;   // 接纳换指
      }
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      // 低通：只对平滑后的位移累加视角，避免手指抖动 100% 传导到准星（转屏更稳、长距离扫视仍跟手）
      smDx = smDx * (1 - SM) + dx * SM;
      smDy = smDy * (1 - SM) + dy * SM;
      this.aimYaw -= smDx * (0.005 * this.lookSens);
      this.aimPitch -= smDy * (0.005 * this.lookSens);
      this.aimPitch = Math.max(-PITCH_LIM, Math.min(PITCH_LIM, this.aimPitch));
      if (e.cancelable) e.preventDefault();
    };
    const onUp = (e) => { if (e.pointerId === id) id = null; };
    const onCancel = (e) => { if (e.pointerId === id) { id = null; } };
    lookEl.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  }

  // 触摸：射击键（按住即开火）。window 级 up/cancel：手指滑出按钮也能可靠收手，不再依赖捕获；
  // 夺指时 element 级监听丢事件的问题从源头消除。
  _bindTouchFire(fireEl) {
    if (!fireEl) return;
    let id = null;
    const swallow = (e) => { if (e) { if (e.cancelable) e.preventDefault(); e.stopPropagation(); } };
    const onDown = (e) => {
      swallow(e);
      if (id !== null) return;
      id = e.pointerId;
      if (_layoutEdit) return;
      this.fire = true;
    };
    const onUp = (e) => {
      if (id !== null && e.pointerId !== id) return;   // 别的手指抬起，不停火
      id = null; swallow(e); this.fire = false;
    };
    const onCancel = (e) => { if (e.pointerId === id) onUp(e); };
    fireEl.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  }

  // 触摸：跳跃键（按下置位跳跃边沿，松手不清零——由 getInput 上行时消费）。同样 window 级 up/cancel，不依赖捕获。
  _bindTouchJump(jumpEl) {
    if (!jumpEl) return;
    let id = null;
    const swallow = (e) => { if (e) { if (e.cancelable) e.preventDefault(); e.stopPropagation(); } };
    const onDown = (e) => {
      swallow(e);
      if (id !== null) return;
      id = e.pointerId;
      if (_layoutEdit) return;
      this.jumpQueued = true;
    };
    const onUp = (e) => { if (id !== null && e.pointerId !== id) return; id = null; swallow(e); };
    const onCancel = (e) => { if (e.pointerId === id) onUp(e); };
    jumpEl.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  }

  // 取当前屏幕方向对应的那套布局（横/竖各一套；缺失则按默认补齐）
  _layout() {
    const s = this.settings;
    if (!s.layouts) s.layouts = { landscape: defaultLayout('landscape'), portrait: defaultLayout('portrait') };
    const o = currentOrientation();
    if (!s.layouts[o]) s.layouts[o] = defaultLayout(o);
    const L = s.layouts[o];
    for (const k of ['joy', 'fire', 'jump']) if (!L[k]) L[k] = defaultLayout(o)[k];
    // 兼容旧字段：让 settings.joy/fire/jump 始终镜像"当前方向"的布局
    s.joy = L.joy; s.fire = L.fire; s.jump = L.jump;
    return L;
  }

  // 应用保存的布局（xPct/yPct 均为「控件中心距屏幕左/上边的百分比」，配合 CSS translate(-50%,-50%) 居中锚定）
  // 注意：历史版本这里写的是 style.bottom，而默认值 yPct(80/60/84) 是按"距顶部"设计的 →
  //       三个控件全被顶到屏幕上半部。现统一为 top，语义与数值对齐。
  _applyLayout() {
    const L = this._layout();
    const place = (elx, p) => {
      if (!elx || !p) return;
      const c = clampToScreen(elx, p);
      p.xPct = c.xPct; p.yPct = c.yPct;   // 越界回收（例如横屏布局套到竖屏后跑到屏幕外）
      if (!elx.style) return;
      elx.style.left = c.xPct + '%';
      elx.style.top = c.yPct + '%';
      elx.style.bottom = 'auto';
      elx.style.right = 'auto';
    };
    place(this.moveEl, L.joy);
    place(this.fireEl, L.fire);
    place(this.jumpEl, L.jump);
  }

  // 横竖屏切换：先强制收尾正在进行的拖动（这是"切屏后按钮被锁住跟手"的根因），再套用该方向的布局
  _bindOrientation() {
    if (typeof window === 'undefined' || !window.addEventListener) return;
    let t = null;
    const onChange = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const o = currentOrientation();
        const changed = o !== this._orient;
        this._orient = o;
        this._applyLayout();
        if (changed) { this._stopAllDrags(); saveSettings(this.settings); }   // 仅方向真变才中断拖动（地址栏显隐等 resize 不再误伤）
      }, 150);   // 防抖：orientationchange 与 resize 会连发，且切屏瞬间 innerWidth/Height 还没稳定
    };
    window.addEventListener('orientationchange', onChange);
    window.addEventListener('resize', onChange);
    this._onOrientChange = onChange;
  }

  _stopAllDrags() { for (const stop of (this._dragStops || [])) { try { stop(); } catch (_) {} } }

  // 布局编辑模式：在元素上捕获 pointerdown，拖动即改位置并存盘（不影响正常游玩）
  // 一并改 Pointer Events + setPointerCapture：捕获后本指的 move/up 一定回到本元素，
  // 于是不用再往 window 上挂一堆临时监听（旧版那套"挂了忘摘 → 按钮永久跟手"的坑从源头消失）。
  _enableDrag(elx, key) {
    if (!elx || !elx.addEventListener) return;
    let dragId = null;     // 本次拖动跟踪的 pointerId
    let dragging = false;
    let rafId = 0;         // transform 写入的 rAF 句柄（合并高频 pointermove，避免每事件一次同步样式）
    let pending = null;    // 最近一次指针坐标 {x, y}，由 rAF 统一消费
    let L = null;          // 本次拖动的布局对象引用（onDown 取一次，避免每帧 _layout() 重算）

    // 真正改位置：只用 transform 像素偏移（GPU 合成层，零 reflow）。基准 left/top 已在 onDown 归零，
    // 这里 translate3d 自带 px，再叠 translate(-50%,-50%) 保持居中锚定，与静态 CSS 一致。
    const flush = () => {
      rafId = 0;
      if (!pending || !L) return;
      const W = window.innerWidth || 1, H = window.innerHeight || 1;
      const PAD = 4;   // 中心可贴边到 4%，比旧版半控件宽边距更宽松
      const xPct = Math.max(PAD, Math.min(100 - PAD, pending.x / W * 100));
      const yPct = Math.max(PAD, Math.min(100 - PAD, pending.y / H * 100));
      L[key] = { xPct, yPct };
      const pxX = xPct / 100 * W, pxY = yPct / 100 * H;
      elx.style.transform = `translate3d(${pxX}px, ${pxY}px, 0) translate(-50%, -50%)`;
    };

    const move = (ev) => {
      if (!dragging) return;
      if (ev.pointerId !== dragId) {
        // 【键位拖动锁死修复】与摇杆/视角同一根因（a3a7fe4 日志实锤）：安卓长按静默换指，
        // 不派 cancel/up 就把 move 的 pointerId 重编号。拖动中本控件用 transform 始终跟着手指，
        // 故换指后的 move 仍落在控件中心附近；新指落在本控件附近 → 认定同一根手指被重编号，接纳继续拖；
        // 远处异指忽略不抢（避免邻指抬起误接管）。
        const r = elx.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        if (Math.hypot(ev.clientX - cx, ev.clientY - cy) > Math.max(r.width, r.height) * 2) return;
        dragId = ev.pointerId;
      }
      if (ev.cancelable) ev.preventDefault();
      pending = { x: ev.clientX, y: ev.clientY };
      if (!rafId) rafId = requestAnimationFrame(flush);   // 合并到下一帧，一次写入
    };

    const stop = () => {
      if (!dragging) return;
      dragging = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      pending = null;
      elx.removeEventListener('pointermove', move);
      elx.removeEventListener('pointerup', end);
      elx.removeEventListener('pointercancel', end);
      elx.removeEventListener('lostpointercapture', end);
      window.removeEventListener('blur', stop);
      // 主动交还捕获（会补发一次 lostpointercapture，但此时 dragging 已 false，end 直接返回，幂等）
      if (dragId != null) { try { elx.releasePointerCapture(dragId); } catch (_) {} }
      dragId = null;
      // 交还 CSS 静态定位：清掉拖动期的内联 transform/left/top，恢复 translate(-50%,-50%) 与 :active 缩放
      elx.classList.remove('dragging');
      elx.style.transform = '';
      elx.style.left = '';
      elx.style.top = '';
      this._applyLayout();   // 写回 left/top 百分比（静态定位）+ 用真实尺寸做一次越界回收
      saveSettings(this.settings);
    };

    const end = (ev) => {
      if (ev && dragId != null && ev.pointerId !== dragId) {
        // 同上：安卓换指后抬起，新指落在本控件附近才认（避免异指抬起误结束），否则忽略
        const r = elx.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        if (Math.hypot(ev.clientX - cx, ev.clientY - cy) > Math.max(r.width, r.height) * 2) return;
        dragId = ev.pointerId;
      }
      stop();
    };

    const onDown = (e) => {
      if (!_layoutEdit) return;                               // 仅编辑模式生效
      if (dragging) return;                                   // 已在拖，第二指不抢
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      dragging = true;
      dragId = e.pointerId;
      L = this._layout();
      try { elx.setPointerCapture(e.pointerId); } catch (_) {}
      // 拖动期改用 transform 定位：先归零 left/top（仅一次 reflow），再以内联 transform 像素定位（之后每帧零 reflow）
      const W = window.innerWidth || 1, H = window.innerHeight || 1;
      const cur = (L[key]) || { xPct: 50, yPct: 50 };
      elx.style.left = '0px'; elx.style.top = '0px';
      elx.style.transform = `translate3d(${cur.xPct / 100 * W}px, ${cur.yPct / 100 * H}px, 0) translate(-50%, -50%)`;
      elx.classList.add('dragging');   // 挂 will-change: transform，提升到合成层
      elx.addEventListener('pointermove', move);
      elx.addEventListener('pointerup', end);
      elx.addEventListener('pointercancel', end);
      elx.addEventListener('lostpointercapture', end);        // ← 切屏/系统手势打断时的唯一出口
      window.addEventListener('blur', stop);
    };

    elx.addEventListener('pointerdown', onDown, { capture: true });
    (this._dragStops || (this._dragStops = [])).push(stop);
  }

  getAimPitch() { return this.aimPitch || 0; }

  getInput() {
    if (this.mode === 'touch') {
      const m = this.move.vec;
      const mx = m.x, mz = m.y;
      // 朝向由累计 yaw 推导（与 PC 一致），射击键控制 fire，跳跃键消费 jumpQueued 边沿
      const ax = Math.sin(this.aimYaw), az = Math.cos(this.aimYaw);
      const jump = this.jumpQueued; this.jumpQueued = false;
      return { mx, mz, ax, az, pitch: this.aimPitch || 0, fire: this.fire, jump };  // pitch 进弹道：视角即子弹方向
    }
    // PC：按自定义按键移动；aim 由鼠标 yaw 推导为单位向量，sim 端 atan2 还原
    const k = this.keysMap;
    let mx = 0, mz = 0;
    if (this.keys[k.forward]) mz -= 1;
    if (this.keys[k.back]) mz += 1;
    if (this.keys[k.left]) mx -= 1;
    if (this.keys[k.right]) mx += 1;
    const ax = Math.sin(this.aimYaw), az = Math.cos(this.aimYaw);
    const jump = this.jumpQueued; this.jumpQueued = false; // 跳跃边沿：消费一次后清零
    return { mx, mz, ax, az, pitch: this.aimPitch || 0, fire: this.fire, jump };  // pitch 进弹道：视角即子弹方向
  }
}

// 布局编辑开关。
Controls.prototype.setLayoutEdit = function (v) {
  _layoutEdit = !!v;
  if (_layoutEdit) {
    // 进编辑模式时把"正在按住"的功能态清干净：否则刚才按住射击键切进编辑会一直卡在开火
    this.fire = false;
    this.jumpQueued = false;
    if (this.move) {
      this.move.active = false; this.move.x = 0; this.move.y = 0;
      if (this.move.knob && this.move.knob.style) this.move.knob.style.transform = 'translate(0,0)';
    }
  } else {
    this._stopAllDrags && this._stopAllDrags();   // 退出编辑：收尾所有拖动监听
  }
};

// 把控件中心夹在屏幕内（含自身尺寸的一半），避免横屏布局套到竖屏后跑出屏幕点不到
export function clampToScreen(elx, p) {
  const W = (typeof window !== 'undefined' && window.innerWidth) || 800;
  const H = (typeof window !== 'undefined' && window.innerHeight) || 600;
  const w = (elx && elx.offsetWidth) || 84;
  const h = (elx && elx.offsetHeight) || 84;
  const mx = Math.min((w / 2) / W * 100, 4), my = Math.min((h / 2) / H * 100, 4);   // 边距封顶 4%，比半控件宽更宽松
  const cx = Math.max(mx, Math.min(100 - mx, Number(p.xPct)));
  const cy = Math.max(my, Math.min(100 - my, Number(p.yPct)));
  return { xPct: Number.isFinite(cx) ? cx : 50, yPct: Number.isFinite(cy) ? cy : 50 };
}

// ---------------- 设置（灵敏度 + 可拖动布局，localStorage 持久化）----------------
export const SETTINGS_KEY = 'zombie-ui-settings';
export const LAYOUT_VER = 2;   // 布局结构版本：1=单套且 yPct 语义混乱，2=横竖分离且 yPct=距顶部

// 每个方向一套默认布局。xPct/yPct = 控件中心距屏幕左/上边的百分比。
export function defaultLayout(orient) {
  if (orient === 'portrait') {
    // 竖屏：纵向富裕，控件整体下沉到拇指区
    return {
      joy: { xPct: 21, yPct: 80 },
      fire: { xPct: 80, yPct: 71 },
      jump: { xPct: 80, yPct: 87 },
    };
  }
  // 横屏：纵向紧张，射击/跳跃上下叠放但留足边距
  return {
    joy: { xPct: 14, yPct: 72 },
    fire: { xPct: 88, yPct: 64 },
    jump: { xPct: 88, yPct: 86 },
  };
}

export function defaultSettings() {
  const land = defaultLayout('landscape');
  return {
    lookSens: 1.0, joySens: 1.0, mouseSens: 1.0,
    keys: { forward: 'KeyW', back: 'KeyS', left: 'KeyA', right: 'KeyD', jump: 'Space' },
    layoutVer: LAYOUT_VER,
    layouts: { landscape: land, portrait: defaultLayout('portrait') },
    // 兼容字段：镜像"当前方向"的布局，由 Controls._layout() 每次刷新
    joy: land.joy, fire: land.fire, jump: land.jump,
    editMode: false,
  };
}

function mergeLayout(base, p) {
  const out = {};
  for (const k of ['joy', 'fire', 'jump']) {
    const b = base[k], q = (p && p[k]) || null;
    out[k] = {
      xPct: (q && typeof q.xPct === 'number') ? q.xPct : b.xPct,
      yPct: (q && typeof q.yPct === 'number') ? q.yPct : b.yPct,
    };
  }
  return out;
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const d = defaultSettings();
      const p = JSON.parse(raw) || {};
      // 用全新目标对象逐层合并默认值，避免顶层 Object.assign 把缺字段的嵌套对象整体替换掉
      const s = Object.assign({}, d, p);
      s.keys = Object.assign({}, d.keys, p.keys || {});
      if (typeof s.mouseSens !== 'number') s.mouseSens = d.mouseSens;

      // 布局迁移：旧存档只有单套 joy/fire/jump，且那套值是"距顶部"设计却被当 bottom 用（上下颠倒），
      // 加上拖动功能一直没生效——旧值必然就是旧默认值，没有用户自定义可保。直接重置为 v2 双方向默认。
      if ((p.layoutVer | 0) >= LAYOUT_VER && p.layouts) {
        s.layouts = {
          landscape: mergeLayout(d.layouts.landscape, p.layouts.landscape),
          portrait: mergeLayout(d.layouts.portrait, p.layouts.portrait),
        };
      } else {
        s.layouts = { landscape: defaultLayout('landscape'), portrait: defaultLayout('portrait') };
      }
      s.layoutVer = LAYOUT_VER;
      const cur = s.layouts[currentOrientation()] || s.layouts.landscape;
      s.joy = cur.joy; s.fire = cur.fire; s.jump = cur.jump;
      return s;
    }
  } catch (_) {}
  return defaultSettings();
}
export function saveSettings(s) { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (_) {} }

// ---- 战斗反馈状态（跨帧跟踪本地 hp/kills/alive 变化与已播报事件）----
const _fb = { lastHp: null, lastKills: null, lastAlive: true, lastEvent: 0, lastStatus: '' };

function _flashHit() {
  const f = document.getElementById('hitflash');
  if (!f) return;
  f.classList.add('on');
  clearTimeout(_fb._hfT);
  _fb._hfT = setTimeout(() => f.classList.remove('on'), 220);
}

function _centerNotify(text, cls) {
  const n = document.getElementById('center-notify');
  if (!n) return;
  n.textContent = text;
  n.className = 'center-notify show' + (cls ? ' ' + cls : '');
  clearTimeout(_fb._cnT);
  _fb._cnT = setTimeout(() => { n.className = 'center-notify'; }, 1600);
}
// 对外导出：其他模块(如 main.js 主机端弹「催再来一局」提示)复用同一个中央通知条
export const centerNotify = _centerNotify;

function _addFeed(html) {
  const kf = document.getElementById('killfeed');
  if (!kf) return;
  const line = document.createElement('div');
  line.className = 'kf-line';
  line.innerHTML = html;
  kf.appendChild(line);
  while (kf.children.length > 5) kf.removeChild(kf.firstChild);
  setTimeout(() => { if (line.parentNode) line.parentNode.removeChild(line); }, 4000);
}

let _sbSig = '';   // 计分板内容签名：未变化则不重建 DOM（避免每帧回流导致手机端卡顿）

export function updateHud(state, myId) {
  const mode = state.mode || 'wave';
  const waveEl = document.getElementById('hud-wave');
  const statusEl = document.getElementById('hud-status');
  const playersEl = document.getElementById('hud-players');

  // 顶部计数条：僵尸浪潮显示击杀进度；对战显示先到 N 杀目标 / 剩余时间 / 我的命
  if (waveEl) {
    if (mode === 'versus') {
      const me = state.players[myId];
      const myLives = me ? (me.lives ?? 1) : 0;
      const myKills = me ? (me.kills || 0) : 0;
      const cfg = state.config || null;
      const tl = cfg && cfg.ROOM ? cfg.ROOM.timeLimit : 0;
      const infLives = (state.livesMax | 0) === 0;   // 命数0 = 无限命
      let txt = `⚔ ${myKills} 杀 · 命 ${infLives ? '∞' : myLives}`;
      if (tl > 0 && state.status === 'playing') {
        const remain = Math.max(0, tl * 60 - (state.matchTime || 0));
        const mm = Math.floor(remain / 60), ss = Math.floor(remain % 60);
        txt += ` · ⏱ ${mm}:${String(ss).padStart(2, '0')}`;
      }
      waveEl.textContent = txt;
    } else {
      const tgt = state.target > 0 ? `${state.score}/${state.target}` : `${state.score}/∞`;
      const lv = state.livesMax === 0 ? '∞' : state.livesMax;
      waveEl.textContent = `击杀 ${tgt} · 命 ${lv}`;
    }
  }

  // ---- 本地战斗反馈：受击红闪 / 击杀 +1 / 被击杀提示 ----
  // （自身血量数字显示在左上计分板每行血条旁，底部中央血条已移除）
  const me = state.players[myId];
  if (me) {
    if (_fb.lastHp != null && me.hp < _fb.lastHp && me.alive) _flashHit();          // 掉血 → 红闪
    if (_fb.lastKills != null && me.kills > _fb.lastKills && mode === 'versus') {
      _centerNotify(`⚔ 击杀 +${me.kills - _fb.lastKills}！`, 'kill');               // 击杀 → +1 浮字
    }
    if (_fb.lastAlive && !me.alive && state.status === 'playing') {
      const willRespawn = (me.lives ?? 0) > 0 || (state.livesMax | 0) === 0;   // 无限命(0)永远重生
      _centerNotify(willRespawn ? '💀 你被击杀了，即将重生…' : '💀 你已出局', 'death');
    }
    _fb.lastHp = me.hp; _fb.lastKills = me.kills; _fb.lastAlive = me.alive;
  }
  // 击杀播报（对战：服务器事件日志增量渲染）
  if (mode === 'versus' && state.events && state.events.length) {
    for (const ev of state.events) {
      if (ev.id <= _fb.lastEvent) continue;
      _fb.lastEvent = ev.id;
      const kn = state.players[ev.killer] ? state.players[ev.killer].name : '?';
      const vn = state.players[ev.victim] ? state.players[ev.victim].name : '?';
      _addFeed(`<b>${escapeHtml(kn)}</b> ⚔ ${escapeHtml(vn)}`);
    }
  }
  // 新一局开始：重置事件游标（服务器 events 清空、id 重新从 1 起）
  if (state.status === 'playing' && _fb.lastStatus !== 'playing') { _fb.lastEvent = 0; _fb.lastHp = null; _fb.lastKills = null; _fb.lastAlive = true; }
  _fb.lastStatus = state.status;

  // 状态小标签：不再显示个人"胜者"，对战结束统称"本局结束"
  if (statusEl) {
    let t = '等待中';
    if (state.status === 'playing') t = '进行中';
    else if (state.status === 'win') {
      t = mode === 'versus' ? '本局结束' : '胜利';
    } else if (state.status === 'lose') {
      t = mode === 'versus' ? '团灭出局' : '失败';
    }
    statusEl.textContent = t;
  }

  // 玩家列表（计分板）：对战按击杀数降序排列并显示 ⚔ 杀数；死亡时标注重生 / 出局
  // 性能：每帧(60Hz)驱动的 HUD 若全量重建 DOM 会触发大量回流 → 手机端明显卡顿。
  //  用签名比对，仅当计分板内容真正变化时才重建一次（掉血/击杀/复活/加入等）。
  if (playersEl) {
    let list = Object.keys(state.players).map((id) => state.players[id]);
    if (mode === 'versus') list.sort((a, b) => (b.kills || 0) - (a.kills || 0));
    const sig = list.map((p) =>
      `${p.id}:${p.hp | 0}:${p.maxHp | 0}:${p.alive ? 1 : 0}:${p.lives ?? 0}:${p.kills || 0}:${(p.color >>> 0).toString(16)}`
    ).join('|') + '#' + myId + '#' + mode;
    if (sig !== _sbSig) {
      _sbSig = sig;
      playersEl.innerHTML = '';
      for (const p of list) {
        const id = p.id;
        const pct = Math.max(0, p.hp) / p.maxHp * 100;
        const colorHex = '#' + (p.color >>> 0).toString(16).padStart(6, '0');
        let tag = '';
        if (mode === 'versus') {
          if (!p.alive && (p.lives ?? 0) > 0) tag = ' 💀重生';
          else if (!p.alive) tag = ' 💀出局';
        } else if (!p.alive) tag = ' 💀';
        const _inf = (state.livesMax | 0) === 0;   // 命数0 = 无限命
        const livesBadge = (mode === 'versus' && (_inf || (state.livesMax || 1) > 1))
          ? ` <span class="lives-badge">${_inf ? 'x∞' : 'x' + (p.lives ?? 1)}</span>` : '';
        const killsBadge = (mode === 'versus')
          ? `<span class="kills-badge">⚔${p.kills || 0}</span>` : '';
        const div = document.createElement('div');
        div.className = 'ph';
        div.innerHTML = `<span class="dot" style="background:${colorHex}"></span>` +
          `<span>${escapeHtml(p.name)}${id === myId ? '(你)' : ''}${tag}${livesBadge}</span>` +
          killsBadge +
          `<span class="bar"><i style="width:${pct}%;background:${pct < 30 ? '#e53935' : '#4caf50'}"></i></span>` +
          `<span class="hp-num">${p.alive ? Math.max(0, Math.round(p.hp)) : '—'}</span>`;
        playersEl.appendChild(div);
      }
    }
  }

  // 等待房层（wave-overlay）：对战模式显示 ready 门槛提示，并据此置灰房主「开始」按钮
  const waveOv = document.getElementById('wave-overlay');
  const startWaveBtn = document.getElementById('btn-start-wave');
  if (waveOv) {
    if (state.status === 'playing') {
      waveOv.classList.add('hidden');
      if (startWaveBtn) startWaveBtn.disabled = false;
    } else if (state.status === 'waiting') {
      // 结算后房主点「再来一局」→ 权威端 backToWaiting 把 status 打回 waiting，
      // 这里必须把等待房层重新放出来（它在上一局开局时被 btn-start-wave 手动隐藏过）
      waveOv.classList.remove('hidden');
      if (mode === 'versus') {
        // 全员 ready 门槛提示：直接读每位玩家的 ready 标志位（唯一真源），离线席位不计入门槛
        const online = Object.values(state.players).filter((p) => p.on !== 0);
        const waitingNames = online.filter((p) => p.ready !== 1).map((p) => p.name);
        const hint = document.getElementById('wave-hint');
        if (hint) {
          hint.style.display = '';
          if (online.length < 2) hint.textContent = '⚔ 对战至少需要 2 人，邀请好友加入…';
          else if (waitingNames.length) hint.textContent = '⏳ 等待配置天赋：' + waitingNames.join('、');
          else hint.textContent = '✅ 全员已备好，房主可开始！';
        }
        // 人不够 / 有人没配好 → 房主「开始」按钮置灰（versusCanStart 与服务器同源判定）
        if (startWaveBtn) startWaveBtn.disabled = !state.canStart;
      } else {
        // wave 无任何开局门槛（单人开荒合法、不需要配天赋）→ 按钮恒可点。
        // 必须在此显式放开按钮：若它曾被对战房置灰（回大厅不重建 DOM，状态跟着人走），
        // 进 wave 房后若不放回可点态 → 永远开不了局 → 永远进不到 playing 那条复位分支 → 死锁。
        if (startWaveBtn) startWaveBtn.disabled = false;
      }
    }
  }

  // 结算层：对战结束不判个人胜者，统称"本局结束"并放出战绩板；wave 显示客观目标结果
  const result = document.getElementById('result');
  const rt = document.getElementById('result-text');
  const rb = document.getElementById('result-board');
  if (result && rt) {
    if (state.status === 'win') {
      result.classList.remove('hidden');
      rt.textContent = (mode === 'versus') ? '本局结束' : '🎉 清场胜利！';
      // 战绩板（仅对战）：按杀数降序列出 每人杀数 + 剩余命数
      if (rb) {
        if (mode === 'versus') {
          const infL = (state.livesMax | 0) === 0;
          const list = Object.values(state.players).slice()
            .sort((a, b) => (b.kills || 0) - (a.kills || 0) || (b.lives || 0) - (a.lives || 0));
          rb.innerHTML = list.map((p, i) => {
            const colorHex = '#' + (p.color >>> 0).toString(16).padStart(6, '0');
            const lv = infL ? '∞' : (p.lives ?? 0);
            return `<div class="rb-row${p.id === myId ? ' me' : ''}">` +
              `<span class="rb-rank">${i + 1}</span>` +
              `<span class="dot" style="background:${colorHex}"></span>` +
              `<span class="rb-name">${escapeHtml(p.name)}${p.id === myId ? '(你)' : ''}</span>` +
              `<span class="rb-stat">⚔ ${p.kills || 0}</span>` +
              `<span class="rb-stat">❤ ${lv}</span></div>`;
          }).join('');
          rb.classList.remove('hidden');
        } else rb.classList.add('hidden');
      }
    } else if (state.status === 'lose') {
      result.classList.remove('hidden');
      rt.textContent = (mode === 'versus') ? '💀 团灭出局' : '💀 全员阵亡';
      if (rb) rb.classList.add('hidden');
    } else {
      result.classList.add('hidden'); // playing/waiting：隐藏结算层，支持失败后「再来一局」
      if (rb) rb.classList.add('hidden');
    }
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
