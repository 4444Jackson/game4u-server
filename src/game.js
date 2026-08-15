// game.js — 浏览器客户端：Three.js 渲染 + 本地输入预测（权威模拟只在 relay 的 sim-core.js，本文件不跑权威逻辑）
import * as THREE from 'three';
// 地形/碰撞/视线/寻路/僵尸AI 等共享逻辑来自 map-core.js，与权威端(relay) import 同一份，无需手工镜像。
import {
  MAP, STEP, genObstacles, topAt, moveCircle, depenetratePlayer, obbOverlap, buildGrid,
  bulletWorld, pickZombieKind, ZSTAT, stepZombie
} from '../map-core.js';
import { makeConfig, computeStats, talentTotalCost } from '../gameConfig.js';

// ---- 调参 ----
const PLAYER_OBS_R = 0.6;    // 玩家碰撞方块半边长基准（= 可视方块底面 1.2 / 2；OBB 随瞄准转）。实战半径 = 此值 × 受击面积缩放
const SUPPORT_R = 0.25;      // 站立支撑判定半径（必须 < PLAYER_OBS_R，防止贴墙瞬移上顶）
const ZOMBIE_RADIUS = 0.9;   // 僵尸碰撞方块半边长（轴对齐，不随转向）
const BULLET_RADIUS = 0.12;  // 与可视方块 0.24 见方一致（所见即碰撞）
const BULLET_LIFE = 1.3;
const BULLET_EYE = 1.6;      // 出膛高度 = 射手脚底 + 1.6（与相机眼睛同高：视角即弹道，无视差）
const ZOMBIE_SPEED = 4.4;
const ZOMBIE_DMG = 9;
const DEFAULT_WAVE_TARGET = 100;  // 僵尸浪潮默认击杀目标（房主可改；0 = 无限/无尽生存）
const MAX_ZOMBIES = 22;
const SPAWN_INTERVAL = 1.1;
const DEFAULT_LIVES = 3;     // 对战模式默认命条数（房主可改；僵尸浪潮固定 1）
const RESPAWN_TIME = 2.5;    // 死亡后重生倒计时(秒)
const GRAVITY = 24;          // 重力加速度(m/s²)
const JUMP_BUFFER = 0.15;    // 跳跃缓冲：按下后记住 0.15s，落地/coyote 窗口内才起跳
const COYOTE = 0.10;         // 土狼时间：离地后 0.10s 内仍可起跳（走下箱顶边缘不卡）
const VISUAL_H = 1.8;        // 玩家可视方块高度（用于子弹命中高度判定；随缩放同步）

const PALETTE = [0x4f9bff, 0xff9f43, 0x2ecc71, 0xff5e7e, 0xb56bff, 0x46d6d6];

// 内置默认建模（离线/mod.json 加载失败时的兜底）：纯色方块，不依赖任何贴图文件。
// 三种僵尸各自配色，仅靠方块也能区分类型（walker 绿 / seeker 橙 / flyer 紫带翼盘）。
const DEFAULT_MOD = {
  // 「我的世界头颅」式单一方块：底面边长=贴墙碰撞直径（玩家1.2/僵尸1.8），可视体积=碰撞体积
  player: { tintByPlayer: true, parts: [
    { size: [1.2, 1.8, 1.2], pos: [0, 0.9, 0], color: '#4f9bff', roughness: 0.55, metalness: 0.1 },
    // 头发：史蒂夫式深色发盖，坐在头顶上方（不重叠脚本体，避免 z-fighting），noTint 保持自身颜色
    { size: [1.18, 0.30, 1.18], pos: [0, 1.95, 0], color: '#3b2a1a', noTint: true, roughness: 0.9, metalness: 0.0 }
  ]},
  zombie_walker: { parts: [
    { size: [1.8, 1.55, 1.8], pos: [0, 0.775, 0], color: '#6fae4f', roughness: 0.85, metalness: 0.0 }
  ]},
  zombie_seeker: { parts: [
    { size: [1.8, 1.6, 1.8], pos: [0, 0.8, 0], color: '#d98b3a', roughness: 0.8, metalness: 0.05 }
  ]},
  zombie_flyer: { parts: [
    { size: [1.8, 1.2, 1.8], pos: [0, 0.6, 0], color: '#8e6bd6', roughness: 0.5, metalness: 0.2 }
  ]},
  zombie: { parts: [  // 兜底（无 k 字段时）
    { size: [1.8, 1.55, 1.8], pos: [0, 0.775, 0], color: '#6fae4f', roughness: 0.85, metalness: 0.0 }
  ]},
  bullet: { parts: [
    { size: [0.24, 0.24, 0.24], pos: [0, 0, 0], color: '#fff2a0', emissive: '#ffd000', emissiveIntensity: 1.4 }
  ]}
};

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    // U4/Quarkium（夸克、UC）内核上关抗锯齿并声明不透明：官方《U4内核的游戏模式》推荐的上下文参数
    // （alpha:false 免去与页面背景的额外合成，antialias:false 省掉一遍多重采样解析）。
    // 标准 Chromium（Edge/Chrome/vivo 自带）保持 antialias:true 原画质，完全不受影响。
    const _u4 = (() => { try { return /Quark|UCBrowser|UCWEB/i.test(navigator.userAgent || ''); } catch (_) { return false; } })();
    // U4 官方「游戏模式」：必须自己用 gameMode:true 建上下文（Three 不认这个非标准属性，
    // 故先手动 getContext 再把 context 交给 Three）。官方要求：全屏不透明 canvas、
    // 每帧绘制完调 gl.submit() 提交帧。是否真开成功只能问 getContextAttributes().gameMode，
    // 开不成就自动退回普通上下文——不影响标准内核，也不影响 U4 上的正常渲染。
    let _ctx = null, _gameMode = false;
    if (_u4) {
      const attrs = { alpha: false, antialias: false, depth: true, stencil: true, powerPreference: 'high-performance', gameMode: true };
      try { _ctx = canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs); } catch (_) { _ctx = null; }
      if (_ctx) {
        try { _gameMode = !!(_ctx.getContextAttributes() || {}).gameMode; } catch (_) { _gameMode = false; }
      }
    }
    this._gl = _ctx;
    this._gameMode = _gameMode;
    this.renderer = new THREE.WebGLRenderer(_ctx
      ? { canvas, context: _ctx, antialias: false, alpha: false, powerPreference: 'high-performance' }
      : (_u4 ? { canvas, antialias: false, alpha: false, powerPreference: 'high-performance' }
             : { canvas, antialias: true }));
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);   // 蓝天（sky blue）
    this.scene.fog = new THREE.Fog(0x87ceeb, 60, 170);    // 雾色=天色，远处自然融入天空

    this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, 400);
    this.camera.position.set(0, 1.6, 0);
    // 第一人称不挂任何手臂/枪模型：角色建模是纯方块，视角里保持干净（准星即弹道）
    this.scene.add(this.camera);

    this._buildWorld();

    this.playerMeshes = new Map();
    this.zombieMeshes = new Map();
    this.bulletMeshes = new Map();

    this.myId = 'host';
    this.state = this._emptyState();
    this.config = makeConfig();   // 权威配置：主机模式房主可覆盖；客户端模式随快照同步（预测同口径的关键）

    this.snaps = [];            // 客户端插值缓冲：最近若干快照 {t, snap}
    this.clientInterp = false;  // 收到快照后进入客户端插值模式
    this.myPitch = 0;           // 本地玩家俯仰角(pitch)，由 Controls 喂入，仅用于第一人称相机，无服务器参与
    this.myYaw = null;          // 本地玩家瞬时水平朝向(yaw)，由 Controls 喂入：相机零延迟跟手，准星即弹道

    // ---- 本地预测（client-side prediction）----
    // 本地玩家的移动/跳跃在客户端用与服务器完全相同的 map-core 代码即时模拟（零延迟跟手）。
    // 关键：预测用「固定 1/60 步长」(predictTick 累加器) 与服务器消费指令的口径逐条对齐，
    // 双端同一份 _stepPredCmd / _stepPlayerOnce 逻辑 → 碰撞解算逐位一致 → 重放不发散。
    this.pred = null;           // 预测状态 {x,z,y,vy,grounded,jumpBuf,coyoteT,fireCd}；null=尚未开始/交回服务器权威
    this.predInput = null;      // 当前输入状态（每渲染帧由 main.js 喂入，predictTick 切成指令）
    this.predHist = [];         // 预测位置短史 {t,x,z,y}（保留供调试/统计发散量）
    this._lastRT = 0;           // 上一渲染帧时间戳（预测步长 dt 来源）
    this._predAcc = 0;          // 预测固定步长累加器（1/60，与服务器逐条消费指令同口径）
    this._simT = 0;             // 累计模拟时间(s)，预测状态带时间戳用于渲染延迟插值
    this._predStates = [];      // 预测状态缓冲 [{t,x,z,y}]（带 sim 时间戳，渲染时按 now-延迟 取包围段插值）

    // ---- 指令流 + 回滚重放（现代 FPS 同步；替代旧"平滑回拉"对账）----
    // 每个预测步生成一条带 seq 的指令 → 本地立即模拟 → 存未确认队列 → 批量上行；
    // 服务器按 seq 逐条精确模拟并回传 ack；收到快照后回滚到快照运动学状态、丢弃 seq≤ack、
    // 重放剩余未确认指令。模拟确定性 ⇒ 重放结果与预测逐位一致 ⇒ 零回拉。
    this._cmdSeq = 0;           // 指令序号（单调递增）
    this._unacked = [];         // 未确认指令队列 [{seq,mx,mz,ax,az,pitch,fire,jump}]
    this._pendingCmds = [];     // 本帧新生成、待上行的指令
    this._jumpLatch = false;    // 跳跃边沿锁存（见 feedLocalInput：防高帧率下按跳被下一帧覆盖吞掉）
    this.onCmds = null;         // main.js 注入：cmds → net.send({type:'input', cmds})

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // ---- 建模资源（MOD 化）：实体外观由 public/assets/entities/mod.json + 贴图驱动 ----
    this.assetBase = new URL('assets/entities/', document.baseURI).href;
    this.entityMod = null;
    this._texCache = {};
    this._loadEntityMod();

  }

  _emptyState() {
    return {
      players: {},
      zombies: [],
      bullets: [],
      obstacles: [],       // 障碍物 [{x,z,w,d,t}] t=高度档位(×STEP)
      grid: null,          // 寻路网格（不入快照）
      bounce: false,       // 房主设定：子弹撞墙/障碍是否反弹
      zmix: 'progress',    // 僵尸出现方式：'progress' 随进度逐步引入 | 'mix' 全程混出
      score: 0,
      target: DEFAULT_WAVE_TARGET,
      status: 'waiting',
      mode: 'wave',        // 'wave' 僵尸浪潮 | 'versus' 对战（无僵尸）
      livesMax: 1,         // 对战模式：每位玩家的基础命条数（房主设定，不含天赋命数加成）
      winner: null,        // 对战模式：恒为 null（已不再判个人胜者，结束统称"本局结束"）
      nextZid: 1,
      nextBid: 1,
      spawnCd: 0,
      matchTime: 0,        // 本局已进行秒数（时间上限判定）
      nextEventId: 1,
      events: [],          // 击杀事件滚动日志（id/killer/victim/t）
    };
  }

  _buildWorld() {
    const hemi = new THREE.HemisphereLight(0xcfe6ff, 0x8f9aa5, 0.95); // 白天环境光：天光偏蓝、地面反光亮灰（配合蓝天，不再是夜色）
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.15);
    dir.position.set(22, 42, 18);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    const d = 52;
    const c = dir.shadow.camera;
    c.left = -d; c.right = d; c.top = d; c.bottom = -d; c.near = 1; c.far = 130;
    this.scene.add(dir);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(MAP * 2, MAP * 2),
      new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.95, metalness: 0.0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const grid = new THREE.GridHelper(MAP * 2, MAP, 0x6b7280, 0x9aa3ad);
    grid.position.y = 0.02;
    this.scene.add(grid);

    // 边界围墙：6m 高砖纹混凝土墙（程序生成砖缝贴图），走到边上一眼就知道“此路不通”
    // 注意：BoxGeometry 必须用 (w, wallH, dpt)——旧代码深度写死 t 导致东西两侧墙变成 1×3×1 小柱子（隐形墙 bug）
    const brickCanvas = document.createElement('canvas');
    brickCanvas.width = 128; brickCanvas.height = 128;
    {
      const g = brickCanvas.getContext('2d');
      g.fillStyle = '#a7adb5'; g.fillRect(0, 0, 128, 128);          // 混凝土底色（亮灰，白天光下清晰）
      g.strokeStyle = '#7e848c'; g.lineWidth = 5;                    // 砖缝
      for (let y = 0; y <= 128; y += 32) { g.beginPath(); g.moveTo(0, y); g.lineTo(128, y); g.stroke(); }
      for (let r = 0; r < 4; r++) {
        const off = (r % 2) ? 32 : 0;
        for (let x = off; x <= 128; x += 64) { g.beginPath(); g.moveTo(x, r * 32); g.lineTo(x, r * 32 + 32); g.stroke(); }
      }
    }
    const wallH = 6, t = 1, S = MAP;
    const mkWall = (w, dpt, x, z) => {
      const tex = new THREE.CanvasTexture(brickCanvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(Math.max(w, dpt) / 4, wallH / 4);              // 砖块约 2×1m，沿墙长重复
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, metalness: 0 });
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, dpt), mat);
      m.position.set(x, wallH / 2, z);
      m.castShadow = true; m.receiveShadow = true;
      this.scene.add(m);
    };
    mkWall(S * 2 + t, t, 0, -S); mkWall(S * 2 + t, t, 0, S);
    mkWall(t, S * 2 + t, -S, 0); mkWall(t, S * 2 + t, S, 0);

    // 障碍物容器：每局地形重随机后由 _rebuildObstacles 重建
    this.obstacleGroup = new THREE.Group();
    this.scene.add(this.obstacleGroup);
  }

  // 按 map-core 的障碍物数据重建实体方块（高度 = 档位 × STEP）
  _rebuildObstacles(obs) {
    if (!this.obstacleGroup) return;
    for (const ch of [...this.obstacleGroup.children]) {
      this.obstacleGroup.remove(ch);
      ch.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    }
    const mat = new THREE.MeshStandardMaterial({ color: 0xd1493f, roughness: 0.85, metalness: 0.05 });
    for (const o of (obs || [])) {
      const h = o.t * STEP;
      const m = new THREE.Mesh(new THREE.BoxGeometry(o.w, h, o.d), mat);
      m.position.set(o.x, h / 2, o.z);
      m.castShadow = true; m.receiveShadow = true;
      this.obstacleGroup.add(m);
    }
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // ---------- 建模资源（MOD 化） ----------
  // 实体外观完全由 public/assets/entities/mod.json + 贴图决定。
  // fetch 失败（如离线或资源缺失）时回退到内置 DEFAULT_MOD，保证总能渲染。
  async _loadEntityMod() {
    try {
      const res = await fetch(this.assetBase + 'mod.json');
      if (res.ok) {
        this.entityMod = await res.json();
        this._collectTextures();
        this._clearMeshes(); // 用新配置重建已有网格
      }
    } catch (e) {
      console.warn('[assets] mod.json 加载失败，使用内置默认建模', e);
    }
  }

  _collectTextures() {
    const mod = this.entityMod;
    if (!mod) return;
    for (const type in mod) {
      // 僵尸贴图延迟到实际生成僵尸网格时再加载（见 _buildEntityFor→_loadTexture）：
      // 这样对战模式（无僵尸）永远不会去 fetch 僵尸贴图，实现按模式资源隔离。
      if (type.startsWith('zombie')) continue;
      const cfg = mod[type];
      if (!cfg || !cfg.parts) continue;
      for (const part of cfg.parts) if (part.texture) this._loadTexture(part.texture);
    }
  }

  _loadTexture(name) {
    const url = this.assetBase + name;
    if (this._texCache[url]) return this._texCache[url];
    const tex = new THREE.TextureLoader().load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.anisotropy = 4;
    this._texCache[url] = tex;
    return tex;
  }

  _buildMaterial(part, tint) {
    const opts = { roughness: part.roughness ?? 0.6, metalness: part.metalness ?? 0.1 };
    if (part.texture) {
      opts.map = this._loadTexture(part.texture);
      opts.color = 0xffffff; // 颜色由贴图决定
    } else {
      opts.color = part.color ? new THREE.Color(part.color) : new THREE.Color(0x888888);
    }
    if (tint) opts.color = new THREE.Color(tint); // 玩家按个人调色板着色
    if (part.emissive) {
      opts.emissive = new THREE.Color(part.emissive);
      opts.emissiveIntensity = part.emissiveIntensity ?? 1.0;
    }
    return new THREE.MeshStandardMaterial(opts);
  }

  _makeBoxPart(part, tint) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(part.size[0], part.size[1], part.size[2]),
      this._buildMaterial(part, tint)
    );
    mesh.position.set(part.pos?.[0] || 0, part.pos?.[1] || 0, part.pos?.[2] || 0);
    mesh.castShadow = true;
    return mesh;
  }

  // 按类型构建实体：composed of box parts（正方体建模）
  // typeKey 显式指定，便于僵尸按 k 选不同建模条目（zombie_walker/seeker/flyer）
  _buildEntityFor(typeKey, tint) {
    const cfg = (this.entityMod && this.entityMod[typeKey]) || DEFAULT_MOD[typeKey] || DEFAULT_MOD.zombie;
    const g = new THREE.Group();
    const parts = (cfg && cfg.parts) || DEFAULT_MOD.zombie.parts;
    const useTint = tint && cfg && cfg.tintByPlayer;
    for (const part of parts) {
      // noTint 部件（如玩家头发）保持自身颜色，不被玩家调色板染色
      const t = (useTint && !part.noTint) ? tint : null;
      g.add(this._makeBoxPart(part, t));
    }
    return g;
  }

  _playerMesh(color) { return this._buildEntityFor('player', color); }
  _zombieMesh(k) {
    // 按僵尸类型选择建模条目；缺省回退到 zombie
    const key = (k === 'walker' || k === 'seeker' || k === 'flyer') ? ('zombie_' + k) : 'zombie';
    return this._buildEntityFor(key, null);
  }
  _bulletMesh() { return this._buildEntityFor('bullet', null); }

  // ---------- 主机：初始化 / 玩家管理 ----------
  hostInit(hostName = '主机') {
    this.state = this._emptyState();
    this.config = makeConfig();
    this.myId = 'host';
    this.state.players['host'] = this._mkPlayer('host', hostName, PALETTE[0]);
    this._clearMeshes();
  }

  // 房主覆盖配置（任意子集）；在 startGame 前调用
  setConfig(overrides) {
    this.config = makeConfig(overrides);
    if (this.state) this.state.config = this.config;   // HUD/天赋面板读 state.config（两条路径同口径）
    return this.config;
  }

  _mkPlayer(id, name, color) {
    return {
      id, name, color, x: (Math.random() * 2 - 1) * 10, z: (Math.random() * 2 - 1) * 10,
      y: 0, vy: 0, grounded: true,
      jumpBuf: 0, coyoteT: 0,   // 跳跃缓冲 / 土狼时间（客户端本地状态，权威值以服务器快照为准）
      hp: 100, maxHp: 100, aim: 0, alive: true,
      // 连接态(state) 与 生命态(out/alive) 正交：
      //   state: 1=在线 0=离线（WS 断/主动退出，不区分、不超时、随时可回）
      //   out  : true=本局命数耗尽永久出局（唯一参与"本局是否结束"的标记）
      state: 1, out: false,
      // ready: 天赋"配好没配好"的唯一标志位。0=没配/要重配，1=配好了。
      //   置 0：离线 / 阵亡 / 开局 / 回等待房；置 1：点「✔ 配好了」
      ready: 0,
      lives: 1, respawnCd: 0,   // 对战模式：剩余命数 / 死亡重生倒计时
      input: { mx: 0, mz: 0, ax: 0, az: 0, pitch: 0, fire: false, jump: false }, fireCd: 0, kills: 0,
      talent: { atk: 0, def: 0, spd: 0, size: 0, lives: 0 },  // 天赋等级（开局前由玩家分配）
      stats: null,   // 派生实战数值（startGame 时按 config+talent 计算）
      radius: PLAYER_OBS_R,   // 碰撞半径（含受击面积缩放）
    };
  }

  // 玩家分配天赋（开局前）。校验不超过点数；越界忽略。
  setTalent(id, talent) {
    const p = this.state.players[id];
    if (!p) return;
    const t = { atk: 0, def: 0, spd: 0, size: 0, lives: 0 };
    for (const k in t) t[k] = Math.max(0, Math.min(talent && talent[k] | 0, this.config.TALENT.maxLevel));
    if (talentTotalCost(t) > this.config.TALENT.pointsPerPlayer) return;
    p.talent = t;
    // 立即按新天赋重算实战数值，使天赋在「等待房 / 复活窗口」分配后即时生效，
    // 不必等到 startGame / 复活（修复「天赋要死一次才发挥作用」「有时开局不生效」的竞态）
    const st = computeStats(this.config, p.talent);
    p.stats = st;
    p.radius = PLAYER_OBS_R * st.scale;
  }



  // 房主点击「开始游戏」：mode='wave'(僵尸浪潮) | 'versus'(对战，无僵尸)
  // lives：对战强制 ≥1；僵尸浪潮允许 0 = 无限命（死亡后重生）。target：0 = 无限击杀（无尽生存）
  // opts = { bounce, zmix, target, config }：子弹反弹开关 / 僵尸出现方式 / 击杀目标 / 房主配置覆盖
  startGame(mode, lives, opts) {
    const o = opts || {};
    const s = this.state;
    if (o.config) this.setConfig(o.config);
    s.mode = (mode === 'versus') ? 'versus' : 'wave';
    // 命数缺省：对战按 ROOM.baseLives（需求文档变量）；僵尸浪潮沿用原默认 1（不受对战配置影响）
    let lv;
    if (lives === undefined || lives === null) lv = (mode === 'versus') ? this.config.ROOM.baseLives : 1;
    else lv = lives | 0;
    s.livesMax = Math.max(0, lv);   // 两种模式统一：0 = 无限命（死亡后自动重生，永不出局）
    s.winner = null;
    s.bounce = !!o.bounce;
    s.zmix = o.zmix === 'mix' ? 'mix' : 'progress';
    let t = DEFAULT_WAVE_TARGET;
    if (o.target !== undefined && o.target !== null) t = o.target | 0;
    s.target = t;
    s.matchTime = 0;
    s.events = [];
    s.nextEventId = 1;
    // 每局重新随机地形（离散高度档位障碍物）+ 重建寻路网格 + 重建障碍网格
    s.obstacles = genObstacles(24);
    s.grid = buildGrid(s.obstacles);
    this._rebuildObstacles(s.obstacles);
    for (const id in s.players) {
      const p = s.players[id];
      const st = computeStats(this.config, p.talent);
      p.stats = st;
      p.radius = PLAYER_OBS_R * st.scale;
      p.maxHp = this.config.COMBAT.baseHP;
      p.hp = p.maxHp;
      // 命数 = 基础 + 天赋命数加成；基础 0 = 无限命（保持 0 标记，天赋加成不参与）
      p.lives = s.livesMax === 0 ? 0 : s.livesMax + st.extraLives;
      p.out = false;            // 新一局：所有人清空出局标记
      p.ready = 0;              // 新一局：标志位全清
      p.respawnCd = 0;
      p.input = { mx: 0, mz: 0, ax: 0, az: 0, pitch: 0, fire: false, jump: false };
      p.cmdQueue = []; p.lastAckSeq = 0;
      p.fireCd = 0; p.kills = 0;
      // 离线者：保持 state=0 不入场（命数已按新局发好），回来时由服务器(relay)重新刷进
      if (p.state === 0) { p.alive = false; continue; }
      p.alive = true;
      p.y = 0; p.vy = 0; p.grounded = true;
      p.jumpBuf = 0; p.coyoteT = 0;
      p.x = (Math.random() * 2 - 1) * 10;
      p.z = (Math.random() * 2 - 1) * 10;
      p.aim = 0;
    }
    s.zombies = []; s.bullets = []; s.score = 0;
    s.spawnCd = 0.6; s.status = 'playing';
  }



  // 静态数据一次性下发：仅建房/加入/接管/开局时由 relay 各发一次。
  // 仅在此重建地形 + 存 config，不进每帧 applySnapshot 热路径（省 JSON.stringify + 省带宽）。
  applyStatic(snap) {
    if (!snap || typeof snap !== 'object') return;
    const s = this.state;
    if (snap.config) { this.config = snap.config; s.config = snap.config; }
    // 地形允许为空数组：回等待房/未开局时 map=[]，必须照样清掉旧障碍方块（不能因 length===0 跳过）。
    // 否则权威端(relay)把地形重置成空白，客户端却永远留着上局的障碍物。
    if (snap.map && Array.isArray(snap.map)) {
      const sig = JSON.stringify(snap.map);
      if (sig !== this._mapSig) {
        this._mapSig = sig;
        s.obstacles = snap.map;
        this._rebuildObstacles(snap.map);   // 传 [] 时：dispose 旧方块 + 不建新方块 = 清场
      }
    }
  }

  // ---------- 客户端：应用快照 ----------
  applySnapshot(snap) {
    // 防御：加入「已销毁/异常」房间时可能收到残缺快照（缺 players/zombies/bullets 数组），
    // 直接 return 跳过该帧，避免读取 undefined 的 property 报错；下一帧拿到合法快照即恢复正常
    if (!snap || !Array.isArray(snap.players) || !Array.isArray(snap.zombies) || !Array.isArray(snap.bullets)) {
      console.warn('[applySnapshot] 丢弃残缺快照（缺少 players/zombies/bullets 数组）');
      return;
    }
    const s = this.state;
    // 缓冲快照用于插值（保留约 1s 历史）
    this.clientInterp = true;
    const nowP = performance.now();
    // 插值时间轴优先用【服务器发送时刻 snap.st】而非到达时刻：
    // 到达时刻含 WebSocket/定时器每帧几 ms 的抖动，会直接变成插值速度抖动（卡卡感/偶发冻帧闪跳）。
    // 用 st + 缓慢校准的时钟偏移（EMA 5%）映射到本地时钟，时间轴与服务器节拍严格同构。
    let ts = nowP;
    if (snap.st != null) {
      if (this._stOff == null) this._stOff = nowP - snap.st;
      else this._stOff += (nowP - snap.st - this._stOff) * 0.05;
      ts = this._stOff + snap.st;
      const last = this.snaps[this.snaps.length - 1];
      if (last && ts <= last.t) ts = last.t + 0.1;   // 保证单调递增（时钟偏移微调不至倒流）
    }
    this.snaps.push({ t: ts, snap });
    while (this.snaps.length > 2 && this.snaps[0].t < nowP - 1000) this.snaps.shift();

    // 元信息（名字/颜色/存活/击杀/命数）与分数/状态/模式立即采用最新快照
    s.mode = snap.mode || 'wave';
    s.livesMax = (snap.livesMax === undefined || snap.livesMax === null) ? 1 : snap.livesMax | 0;   // 0 = 无限命，不能被 ||1 吞掉
    s.winner = snap.winner || null;
    s.bounce = !!snap.bounce;
    s.zmix = snap.zmix || 'progress';
    s.matchTime = snap.matchTime || 0;
    s.events = snap.events || [];
    s.canStart = (snap.canStart === undefined) ? true : !!snap.canStart;   // ready 已随每个玩家下发，无房间级名单
    if (snap.owner) s.owner = snap.owner;                          // 房主（重连后据此恢复权限标记）
    // 配置随快照同步：客户端预测的移速/跳跃/半径必须与权威同口径（否则天赋加移速后必发散/橡皮筋）
    if (snap.config) { this.config = snap.config; s.config = snap.config; }
    // 地形：仅在内容变化时重建障碍网格（避免每帧重建）
    if (snap.map) {
      const sig = JSON.stringify(snap.map);
      if (sig !== this._mapSig) {
        this._mapSig = sig;
        s.obstacles = snap.map;
        this._rebuildObstacles(snap.map);
      }
    }
    s.players = {};
    for (const p of snap.players) {
      // on=0 的离线席位是精简包（无坐标/运动学）：补 0 兜底，防止插值/渲染算出 NaN 位置。
      // 它仍留在 players 里，供玩家列表与战绩板显示"离线"，只是不上图（syncMeshes 里 visible=false）。
      s.players[p.id] = {
        ...p, input: { mx: 0, mz: 0, ax: 0, az: 0, fire: false }, fireCd: 0,
        on: (p.on === undefined) ? 1 : p.on, out: !!p.out,
        x: p.x || 0, y: p.y || 0, z: p.z || 0, aim: p.aim || 0,
        kills: p.kills || 0, lives: p.lives ?? 1, respawnCd: p.respawnCd || 0
      };
    }
    s.zombies = snap.zombies.map((z) => ({ ...z, speed: 0, atkCd: 0 }));
    s.bullets = snap.bullets.map((b) => ({ ...b, vx: 0, vz: 0, vy: 0, life: 1, owner: null }));
    s.score = snap.score; s.target = snap.target; s.status = snap.status;

    // ---- 本地预测对账：回滚 + 重放（现代 FPS 同步，替代旧"平滑回拉"）----
    // 快照回传 ack = 服务器已模拟到的最后指令序号。做法：
    //   ① 丢弃 seq≤ack 的未确认指令（服务器已算过）
    //   ② 从快照的完整运动学状态(x,z,y,vy,grounded,jumpBuf,coyoteT)出发
    //   ③ 用同一个确定性单步函数逐条重放剩余未确认指令
    // 模拟确定性 ⇒ 重放终点与之前的预测逐位一致 ⇒ 零回拉、零橡皮筋。
    // 真分歧（被别人挤开/服务器丢指令）时，重放天然落在"服务器版本+我之后的操作"上——这正是权威修正该有的样子。
    const mp = snap.players.find((q) => q.id === this.myId);
    if (mp) {
      if (!mp.alive || (mp.respawnCd || 0) > 0) {
        this.pred = null; this.predHist.length = 0; this._predStates.length = 0;
        this._unacked.length = 0;   // 死亡/重生期间交回服务器权威
      } else if (this.pred && mp.ack != null && mp.ack > 0) {
        // ① 丢弃已确认指令
        const ack = mp.ack | 0;
        while (this._unacked.length && this._unacked[0].seq <= ack) this._unacked.shift();
        // ② 回滚到快照运动学状态
        const pr = {
          x: mp.x, z: mp.z, y: mp.y || 0,
          vy: mp.vy || 0, grounded: !!mp.gr,
          jumpBuf: mp.jb || 0, coyoteT: mp.ct || 0, fireCd: mp.fcd || 0,
        };
        // ③ 重放剩余未确认指令（每条固定 1/60，与服务器消费口径一致）
        for (const cmd of this._unacked) this._stepPredCmd(pr, cmd, 1 / 60, mp);
        this.pred = pr;
      }
      // 快照没带 ack（旧版服务器）时不动 pred：预测继续自由跑，交由用户对比 A/B 手感
    }
  }

  // 客户端插值：在最近两段快照间按 (now-INTERP) 线性插值，得到连续位置（消除瞬移）
  interpolate(now) {
    if (!this.clientInterp || this.snaps.length === 0) return;
    const INTERP = 50; // 渲染延迟(ms)：须 ≥2 个广播间隔(60Hz→33ms)；仅影响他人/僵尸/子弹，本地玩家走预测零延迟
    const rt = now - INTERP;
    const snaps = this.snaps;
    let a = snaps[0], b = snaps[snaps.length - 1];
    for (let i = 0; i < snaps.length; i++) {
      if (snaps[i].t > rt) { b = snaps[i]; a = i > 0 ? snaps[i - 1] : snaps[i]; break; }
    }
    const span = (b.t - a.t) || 1;
    const f = Math.max(0, Math.min(1, (rt - a.t) / span));
    const A = a.snap, B = b.snap;
    const lerp = (u, v) => u + (v - u) * f;
    const lerpAim = (u, v) => { let d = v - u; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return u + d * f; };

    const Am = new Map(A.players.map((p) => [p.id, p]));
    for (const id in this.state.players) {
      const Bp = B.players.find((p) => p.id === id), Ap = Am.get(id), t = this.state.players[id];
      if (t.on === 0) continue;   // 离线席位无坐标，插值会算出 NaN
      if (Bp && Ap && Bp.on !== 0 && Ap.on !== 0) { t.x = lerp(Ap.x, Bp.x); t.y = lerp(Ap.y || 0, Bp.y || 0); t.z = lerp(Ap.z, Bp.z); t.aim = lerpAim(Ap.aim, Bp.aim); }
      else if (Bp && Bp.on !== 0) { t.x = Bp.x; t.y = Bp.y || 0; t.z = Bp.z; t.aim = Bp.aim; }
    }
    const Az = new Map(A.zombies.map((z) => [z.id, z]));
    for (const z of this.state.zombies) {
      const Bz = B.zombies.find((z2) => z2.id === z.id), Azp = Az.get(z.id);
      if (Bz && Azp) { z.x = lerp(Azp.x, Bz.x); z.z = lerp(Azp.z, Bz.z); }
      else if (Bz) { z.x = Bz.x; z.z = Bz.z; }
    }
    const Ab = new Map(A.bullets.map((b) => [b.id, b]));
    for (const b of this.state.bullets) {
      const Bb = B.bullets.find((b2) => b2.id === b.id), Abp = Ab.get(b.id);
      if (Bb && Abp) { b.x = lerp(Abp.x, Bb.x); b.y = lerp(Abp.y || 0, Bb.y || 0); b.z = lerp(Abp.z, Bb.z); }
      else if (Bb) { b.x = Bb.x; b.y = Bb.y || 0; b.z = Bb.z; }
    }
  }

  // ---------- 渲染同步 ----------
  _ensure(map, key, factory) {
    let m = map.get(key);
    if (!m) { m = factory(); m.userData.first = true; map.set(key, m); this.scene.add(m); }
    return m;
  }

  syncMeshes() {
    const s = this.state;
    const seenP = new Set();
    for (const id in s.players) {
      const p = s.players[id]; seenP.add(id);
      const m = this._ensure(this.playerMeshes, id, () => this._playerMesh(p.color));
      m.visible = (p.on !== 0) && p.alive;   // 离线者从图中移除存在（席位保留，但人不在场上）
      if (p.on === 0) continue;              // 离线无坐标，跳过定位（否则 position 被 0,0,0 拽走）
      // 受击面积天赋：视觉模型与碰撞箱同步缩放（所见即所判）
      const psc = (p.scale != null) ? p.scale : (p.stats ? p.stats.scale : 1);
      if (m.scale.x !== psc) m.scale.setScalar(psc);
      if (m.userData.first) {
        m.position.set(p.x, p.y, p.z); m.userData.first = false;
      } else if (this.clientInterp) {
        m.position.set(p.x, p.y, p.z); // 客户端已插值，直接定位即平滑
      } else {
        m.position.x += (p.x - m.position.x) * 0.35;
        m.position.z += (p.z - m.position.z) * 0.35;
        m.position.y = p.y;
      }
      m.rotation.y = p.aim;
    }
    for (const [id, m] of this.playerMeshes) if (!seenP.has(id)) { this.scene.remove(m); this.playerMeshes.delete(id); }

    const seenZ = new Set();
    for (const z of s.zombies) {
      seenZ.add(z.id);
      const my = z.y || 0;
      const m = this._ensure(this.zombieMeshes, z.id, () => this._zombieMesh(z.k));
      if (m.userData.first) { m.position.set(z.x, my, z.z); m.userData.first = false; }
      else if (this.clientInterp) { m.position.set(z.x, my, z.z); }
      else { m.position.x += (z.x - m.position.x) * 0.4; m.position.z += (z.z - m.position.z) * 0.4; }
      m.position.y = my;   // 飞行僵尸 y 连续变化，直接定位（不插值滞后）
    }
    for (const [id, m] of this.zombieMeshes) if (!seenZ.has(id)) { this.scene.remove(m); this.zombieMeshes.delete(id); }

    const seenB = new Set();
    for (const b of s.bullets) {
      seenB.add(b.id);
      const m = this._ensure(this.bulletMeshes, b.id, () => this._bulletMesh());
      m.position.set(b.x, b.y || 1.0, b.z);
    }
    for (const [id, m] of this.bulletMeshes) if (!seenB.has(id)) { this.scene.remove(m); this.bulletMeshes.delete(id); }
  }

  // ---------- 本地预测（指令流版）----------
  // main.js 每渲染帧喂入当前输入状态；predictTick 按固定步长把它切成带 seq 的指令
  feedLocalInput(inp) {
    // 跳跃是「边沿」：controls.getInput() 读一次即清零。本函数每渲染帧被调用，而 predictTick
    // 只在 1/60 才把输入打包成指令 —— 高帧率下（144Hz≈每 2.4 帧才一步）抓到 jump:true 的那帧
    // 会被紧接着的 jump:false 覆盖，预测步根本没看见 ⇒ 按跳没反应（帧率越高丢得越多）。
    // 故在此锁存边沿，由 _predStepOnce 生成指令时才消费：每次按跳必定恰好兑现一条指令。
    if (inp && inp.jump) this._jumpLatch = true;
    this.predInput = inp;
  }

  // 每渲染帧本地模拟自己的移动/跳跃——与 sim-core.step 玩家段逐行同构（同一套 map-core 碰撞）
  // 固定步长预测：累加真实帧时间，按 1/60 步进，与服务器同口径 → 碰撞解算一致，不再发散。
  // 每帧最多追 5 步（防卡顿/切后台后的螺旋死亡），多余时间丢弃。
  predictTick(realDt) {
    const FIXED = 1 / 60;
    this._predAcc += realDt;
    if (this._predAcc > 0.25) this._predAcc = 0.25;  // 防爆炸式追帧
    let steps = 0;
    while (this._predAcc >= FIXED && steps < 5) {
      this._simT += FIXED;
      this._predStepOnce(FIXED);
      if (this.pred) this._predStates.push({ t: this._simT, x: this.pred.x, z: this.pred.z, y: this.pred.y });
      this._predAcc -= FIXED;
      steps++;
    }
    // 修剪状态缓冲（保留约 0.5s，足够渲染延迟插值取包围段）
    while (this._predStates.length && this._predStates[0].t < this._simT - 0.5) this._predStates.shift();
    // 本帧生成的指令批量上行（一帧一包，最多 5 条）
    if (this._pendingCmds.length && this.onCmds) {
      this.onCmds(this._pendingCmds.splice(0));
    }
  }

  // 渲染用插值预测位置：带模拟时间戳的状态缓冲 + 渲染延迟(1 步)插值。
  // 始终在「渲染时刻 = simT - 1步」两侧的真实状态间线性插值 → 任意帧率/掉帧都不溢出、不抖动。
  _predRender() {
    if (!this.pred) return null;
    const st = this._predStates;
    if (st.length === 0) return { x: this.pred.x, z: this.pred.z, y: this.pred.y };
    // 渲染时刻 = 模拟时间 - 1 步 + 累加器余量。余量(_predAcc)每帧随真实时间连续增长，
    // 加上它后 rt 在两个模拟步之间平滑前进，插值因子 f 在 0→1 连续扫过 → 本地角色位置连续插值。
    // 旧写法只用 _simT（阶梯状，只在 tick 那一帧跳），导致 f 恒为 0、本地角色一格一格蹦 = 手机"不跟手/顿挫"。
    const rt = this._simT - (1 / 60) + this._predAcc;
    if (rt <= st[0].t) return { x: st[0].x, z: st[0].z, y: st[0].y };
    let a = st[0], b = st[st.length - 1];
    for (let i = st.length - 1; i >= 0; i--) {
      if (st[i].t <= rt) { a = st[i]; b = st[i + 1] || st[i]; break; }
    }
    const span = (b.t - a.t) || 1;
    const f = Math.max(0, Math.min(1, (rt - a.t) / span));
    return {
      x: a.x + (b.x - a.x) * f,
      z: a.z + (b.z - a.z) * f,
      y: a.y + (b.y - a.y) * f,
    };
  }

  _predStepOnce(dt) {
    if (!this.clientInterp || !this.myId) return;
    const sp = this.state.players[this.myId];
    if (!sp || !sp.alive) {
      this.pred = null; this.predHist.length = 0; this._predStates.length = 0;
      this._unacked.length = 0; this._pendingCmds.length = 0;   // 死亡：清未确认队列（服务器同样丢弃）
      this._jumpLatch = false;                                   // 死亡期间按的跳不留到复活瞬间兑现
      return;
    }
    if (!this.pred) this.pred = { x: sp.x, z: sp.z, y: sp.y || 0, vy: 0, grounded: true, jumpBuf: 0, coyoteT: 0, fireCd: 0 };
    // 1) 把当前输入状态切成一条带 seq 的指令（方向用本地瞬时 yaw：转身走位零延迟）
    const inp = this.predInput || { mx: 0, mz: 0 };
    const yaw = (this.myYaw != null) ? this.myYaw : sp.aim;
    const cmd = {
      seq: ++this._cmdSeq,
      mx: inp.mx || 0, mz: inp.mz || 0,
      ax: Math.sin(yaw), az: Math.cos(yaw),
      pitch: (this.myPitch != null) ? this.myPitch : (inp.pitch || 0),
      fire: !!inp.fire, jump: this._jumpLatch,
    };
    this._jumpLatch = false;   // 边沿只兑现一条指令（不重复武装 → 不会一次按跳连跳两下）
    // 2) 本地立即模拟这条指令（零延迟跟手）
    this._stepPredCmd(this.pred, cmd, dt, sp);
    // 3) 存入未确认队列 + 待上行批
    this._unacked.push(cmd);
    if (this._unacked.length > 180) this._unacked.shift();   // 3s 兜底（正常 ack 会及时清）
    this._pendingCmds.push(cmd);
  }

  // 确定性单步：用一条指令推进一份预测状态（预测与回滚重放共用同一函数 → 逐位一致）。
  // 与 sim-core._stepPlayerOnce 玩家段逐行同构（同一套 map-core 碰撞 / gameConfig 数值）。
  _stepPredCmd(pr, cmd, dt, sp) {
    if (cmd.jump) pr.jumpBuf = JUMP_BUFFER;   // 与服务器 queueCmds→step 的武装时机一致
    let mx = cmd.mx || 0, mz = cmd.mz || 0;
    const ml = Math.hypot(mx, mz);
    if (ml > 1) { mx /= ml; mz /= ml; }
    // 方向取指令里的 ax/az（重放时用"当时"的朝向，而非现在的相机）——与服务器同口径
    const sa = cmd.ax, ca = cmd.az;
    const fwd = -mz, strafe = mx;
    const dx = fwd * sa - strafe * ca;
    const dz = fwd * ca + strafe * sa;
    const obs = this.state.obstacles || [];
    // 移速/半径/跳跃力全部与权威同口径（config 随快照同步；天赋加成用快照里自己的 talent 派生）——
    // 任何一项不一致都会导致预测发散 → 重放偏差，绝不许硬编码
    const myStats = computeStats(this.config, sp.talent);
    const spd = myStats.moveSpeed;
    const myR = PLAYER_OBS_R * (sp.scale || myStats.scale || 1);
    const nx = clamp(pr.x + dx * spd * dt, -MAP + 1, MAP - 1);
    const nz = clamp(pr.z + dz * spd * dt, -MAP + 1, MAP - 1);
    const mv = moveCircle(obs, pr.x, pr.z, nx, nz, myR, pr.y);
    pr.x = mv.x; pr.z = mv.z;
    // 支撑判定半径必须与服务器同口径（随碰撞半径缩放，恒<半径）：
    // 否则缩小体型者贴墙时，客户端用固定 SUPPORT_R=0.25 误判"站在顶面"瞬移上顶(y=1.5)，
    // 而服务器用 min(0.25, r*0.5)=0.06 判定在地面(y=0) → 预测与权威每帧不一致 → 侧边中等高度处闪烁。
    //（用户实测：缩放到最小、贴近障碍时必现；正常体型两侧一致故不闪。）这是客户端预测唯一的竖直支撑差异点。
    const sup = topAt(obs, pr.x, pr.z, Math.min(SUPPORT_R, myR * 0.5));
    // 跳跃缓冲 + 土狼时间（与服务器 step 完全同口径 → 起跳时机一致，不发散）
    if (pr.grounded) pr.coyoteT = COYOTE;
    else if (pr.coyoteT > 0) pr.coyoteT -= dt;
    if (pr.jumpBuf > 0 && (pr.grounded || pr.coyoteT > 0)) {
      pr.vy = this.config.COMBAT.jumpForce; pr.grounded = false; pr.jumpBuf = 0; pr.coyoteT = 0;
    } else if (pr.jumpBuf > 0) {
      pr.jumpBuf -= dt;
    }
    if (pr.grounded && pr.y > sup + 0.01) pr.grounded = false;
    if (!pr.grounded) {
      pr.vy -= GRAVITY * dt;
      pr.y += pr.vy * dt;
      if (pr.y <= sup && pr.vy <= 0) { pr.y = sup; pr.vy = 0; pr.grounded = true; }
    } else {
      pr.y = sup;
    }
    // 落地/移动兜底去穿透（与权威模拟一致）：客户端预测落进窄缝也顶出，不卡在本地
    depenetratePlayer(obs, pr, myR);
  }

  updateCamera() {
    const p = this.state.players[this.myId];
    // 本地预测优先：用固定步长模拟 + 渲染插值的平滑位置（零延迟跟手且任意帧率顺滑）
    const pr = this._predRender();
    const tx = pr ? pr.x : (p ? p.x : 0), tz = pr ? pr.z : (p ? p.z : 0);
    // 相机朝向用【本地瞬时】yaw/pitch（Controls 每帧喂入），不用服务器回传插值的 p.aim——
    // 否则转镜头时相机滞后一个网络往返，准星与实际弹道方向对不上（“子弹不从准星出”的真凶）
    const aim = (this.myYaw != null) ? this.myYaw : (p ? p.aim : 0);
    const selfY = pr ? pr.y : (p ? p.y : 0);
    const eye = 1.6 + selfY;
    // 第一人称：相机贴在角色眼睛高度（含跳跃高度），沿瞄准方向看（含上下俯仰 pitch）
    if (this.clientInterp) this.camera.position.set(tx, eye, tz); // 客户端已插值，直接定位
    else this.camera.position.lerp(new THREE.Vector3(tx, eye, tz), 0.25);
    const pitch = this.myPitch || 0;
    const dirX = Math.sin(aim) * Math.cos(pitch);
    const dirY = Math.sin(pitch);
    const dirZ = Math.cos(aim) * Math.cos(pitch);
    this.camera.lookAt(
      this.camera.position.x + dirX * 12,
      eye + dirY * 12,
      this.camera.position.z + dirZ * 12
    );
    // 隐藏本地角色（避免第一人称看到自己身体穿插）
    const me = this.playerMeshes.get(this.myId);
    if (me) me.visible = false;
  }

  render() {
    const now = performance.now();
    let dt = (now - (this._lastRT || now)) / 1000;
    this._lastRT = now;
    if (dt > 0.25) dt = 0.25;   // 防切后台/卡顿后的大 dt 引发跳变
    if (this.clientInterp) { this.predictTick(dt); this.interpolate(now); }
    this.syncMeshes();
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    // U4 游戏模式要求每帧绘制完显式提交，否则画面不上屏（仅 gameMode 真开成功时才调）
    if (this._gameMode && this._gl && this._gl.submit) {
      try { this._gl.submit(); } catch (e) {}
    }
  }

  _clearMeshes() {
    for (const m of this.playerMeshes.values()) this.scene.remove(m);
    for (const m of this.zombieMeshes.values()) this.scene.remove(m);
    for (const m of this.bulletMeshes.values()) this.scene.remove(m);
    this.playerMeshes.clear(); this.zombieMeshes.clear(); this.bulletMeshes.clear();
  }
}
