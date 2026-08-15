// gameConfig.js — 集中配置 + 天赋数学（权威单一来源）
// 由 sim-core.js（relay 权威）与 src/game.js（浏览器客户端）共同 import，
// 作为「基础数值 / 天赋汇率 / 阶梯造价」的单一真源——两处 import 同一份，完全一致，无需手工镜像。
//
// 命名惯例（见需求文档附录）：CATEGORY_key，如 COMBAT_baseDamage、TALENT_costTable。
// ⚠️ 默认值 = 上线前已调好手感的原硬编码值（勿凭文档占位值改动，防止破坏现有丝滑手感与
//    客户端预测同口径——预测端与权威端速度不一致会直接导致 20m+ 发散/橡皮筋）。
//    房主可在开局前覆盖任意子集（见 setConfig / startGame opts.config）。

export const GAME_CONFIG = {
  // 战斗与角色基础数值（天赋在其上做加法叠加）
  COMBAT: {
    baseDamage: 34,       // 单发基础伤害（原 PVP_DMG=34，约 3 发致死；最终伤害 = max(攻-防, 1)）
    baseMoveSpeed: 12,    // 基础移速 (m/s)（原 PLAYER_SPEED=12，与客户端预测同口径）
    baseHP: 100,          // 基础血量（原 PLAYER_MAXHP=100）
    bulletSpeed: 32,      // 子弹速度 (m/s)（原 BULLET_SPEED=32）
    fireRate: 6.25,       // 射速 (发/秒)（原 FIRE_INTERVAL=0.16s → 6.25/s）
    jumpForce: 9.5,       // 跳跃初速度 (m/s)（原 JUMP_V=9.5：1 档跳得上、2 档上不去）
  },
  // 天赋系统：5 天赋 + 阶梯造价
  TALENT: {
    pointsPerPlayer: 10,  // 每局每位玩家可分配天赋点（房主设定；0 = 禁用天赋）
    attackPerLevel: 3,    // 攻击：每级 +3 伤害
    defensePerLevel: 2,   // 防御：每级 -2 受伤
    speedPerLevel: 0.3,   // 移速：每级 +0.3 m/s
    scalePerLevel: 0.05,  // 受击面积：每级 -0.05 缩放（同步缩放碰撞箱与视觉模型）
    livesPerLevel: 1,     // 命数：每级 +1 复活次数
    costTable: [1, 1, 2, 2, 3, 4], // 阶梯造价：升到 Lv.N 的累计花费 = sum(costTable[0..N-1])
    maxLevel: 6,          // 开放等级上限（Lv.7+ 不开放）
  },
  // 房间（对战模式）配置项——全部由房主设定，对全房生效。
  // 结束条件只有两条：
  //   A. 命数淘汰：未出局者 ≤1 人 → 直接结束（不显示个人胜者，统称"本局结束"）
  //   B. 限时到点：直接结束、不强判胜者，结果 = 战绩板（各自杀数 + 剩余命数）
  ROOM: {
    timeLimit: 10,        // 时间上限（分钟）：到点直接结束出战绩板；0 = 不限时
    maxPlayers: 8,        // 房间最大人数
    mapSize: 50,          // 地图边长（米，正方形）。【已拍板 2026-07-30：固定值不开放房主调整】与 map-core.js 的 MAP 常量必须一致，动它需专项回归（碰撞/出生点/寻路/预测），不要接入配置面板
    baseLives: 3,         // 初始命数（死亡后复活次数；0 = 无限命——配合 timeLimit=0 即「敞开无限玩」）
    playerScale: 1.0,     // 玩家模型大小缩放系数
    respawnTime: 2.5,    // 死亡后重生倒计时(秒)；房主建房时可自定义（见 main.js gameRespawn）
  },
};

// 把房主覆盖项（任意子集）合并到默认配置，返回新对象（不修改原 GAME_CONFIG）
export function makeConfig(overrides) {
  const o = overrides || {};
  const cfg = {
    COMBAT: { ...GAME_CONFIG.COMBAT },
    TALENT: { ...GAME_CONFIG.TALENT, costTable: [...GAME_CONFIG.TALENT.costTable] },
    ROOM: { ...GAME_CONFIG.ROOM },
  };
  if (o.COMBAT) Object.assign(cfg.COMBAT, o.COMBAT);
  if (o.TALENT) Object.assign(cfg.TALENT, o.TALENT);
  if (o.ROOM) Object.assign(cfg.ROOM, o.ROOM);
  return cfg;
}

// 升到指定等级（1 基）的累计花费；level <= 0 返回 0
export function talentCost(level) {
  const tbl = GAME_CONFIG.TALENT.costTable;
  let sum = 0;
  const n = Math.max(0, Math.min(level | 0, tbl.length));
  for (let i = 0; i < n; i++) sum += tbl[i];
  return sum;
}

// 一组天赋的累计花费（用于校验不超过点数）
export function talentTotalCost(t) {
  t = t || {};
  return (
    talentCost(t.atk | 0) + talentCost(t.def | 0) + talentCost(t.spd | 0) +
    talentCost(t.size | 0) + talentCost(t.lives | 0)
  );
}

// 由基础配置 + 天赋等级派生单玩家实战数值
export function computeStats(cfg, talent) {
  const C = cfg.COMBAT, T = cfg.TALENT;
  const t = talent || {};
  const atk = t.atk | 0, def = t.def | 0, spd = t.spd | 0, size = t.size | 0, lives = t.lives | 0;
  return {
    damage: C.baseDamage + atk * T.attackPerLevel,           // 单发伤害 = 基础 + 攻击加成
    defense: def * T.defensePerLevel,                        // 受伤减免（被命中时扣除）
    moveSpeed: C.baseMoveSpeed + spd * T.speedPerLevel,      // 移速 = 基础 + 移速加成
    // 受击面积缩放 = 房主全局体型 × 天赋缩身（同步碰撞箱与视觉，下限 0.2 防不可见）
    scale: Math.max(0.2, ((cfg.ROOM && cfg.ROOM.playerScale) || 1) * (1 - size * T.scalePerLevel)),
    extraLives: lives * T.livesPerLevel,                    // 额外命数 = 命数等级
  };
}
