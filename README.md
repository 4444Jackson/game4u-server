# Game4U —— 服务器部署版

Game4U（多人联机）游戏的**中心化权威服务器部署版**。基于你 `2026-07-27` 工程里的纯 WebSocket 版本整理而来，**未改动原文件夹与 zip 任何内容**。

## 这版做了什么（相对原工程）

- **去掉 werift WebRTC 中继层**：中心化服务器下 DataChannel 也是「浏览器↔服务器」，省不了服务器负载，反而在 Node 内每连接起一个 PeerConnection 很吃内存。去掉后**运行时零 npm 依赖**，1GiB 小机也能轻松跑。
- **wss:// 自适应**：页面注入的 WS 地址按 `location.protocol` 自动选 `wss://`（HTTPS）或 `ws://`（HTTP）。日后套 nginx + 证书上 HTTPS，客户端无需改代码即自动走 wss。
- **帧率可配**：`TICK_HZ` 环境变量控制模拟+广播帧率（默认 60Hz，与原版一致），`step` 的 dt 同步缩放，物理保持实时。调小更省 CPU/带宽，调大更跟手。

权威模拟（sim-core.js）跑在服务器 Node 进程里，所有浏览器都是客户端，协议与旧版完全一致（多房间 / 接管 / 房主移交 / 离线精简包都在）。

## 服务器配置评估

你的实例：**2 vCPU / 1GiB / 200Mbps 峰值 / ¥40 月 —— 够用。**

- **内存**：纯 WS 版只依赖 Node 内置模块，单进程多房间，1GiB 很宽裕。werift 才是 1GiB 杀手，已去掉。
- **带宽**：峰值 200Mbps 远超需求。最坏估算（8 人房 + 40 僵尸 + 20 子弹，每帧快照约 2KB）60Hz 下发约 8Mbps/房，几十个房才吃满。带宽永远不是瓶颈，**CPU（JSON 序列化）与内存才是**，去 werift 后两者都松。
- 真要更稳，把 `TICK_HZ` 降到 20~30 即可再砍负载；或升到 2GiB 内存（非必需）。

## 目录结构

```
zombie-lan-server/
├── relay.cjs            # 服务器主程序（权威模拟 + HTTP 静态 + WebSocket），零依赖
├── sim-core.js          # 权威模拟内核（与客户端无关，纯逻辑）
├── dist/                # 已构建的前端（直接由 relay.cjs 托管，无需再构建）
├── src/                 # 前端源码（纯 WS 客户端），用于追溯 / 重新构建
├── package.json         # 仅 three/vite 用于重建前端；运行时不需要
├── Dockerfile           # 单阶段，运行时零依赖
├── docker-compose.yml   # 一行 docker compose up -d 起服
├── zombie-lan.service   # systemd 单元（生产直跑 Node）
├── nginx.conf           # HTTPS 反代 + WebSocket 升级模板
├── test-smoke.cjs       # 零依赖冒烟测试（验证 listRooms/createRoom 链路）
└── README.md
```

## 部署方式（三选一）

### 方式 A：直接跑（最快验证）

```bash
# 在服务器上（Node.js 应用镜像已自带 node）
cd /opt/zombie-lan
PORT=8123 TICK_HZ=30 node relay.cjs
# 或 npm start
```

在云控制台**安全组/防火墙放行 TCP 8123**，浏览器开 `http://<公网IP>:8123` 即可玩。

### 方式 B：systemd（生产推荐，开机自启 + 崩溃自拉）

```bash
sudo cp zombie-lan.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now zombie-lan
sudo journalctl -u zombie-lan -f   # 看日志
```

> service 里 `User=www-data`，请改成你实际部署用的普通用户（不要用 root）。

### 方式 C：Docker

```bash
docker compose up -d --build
# 或 docker build -t zombie-lan . && docker run -d -p 8123:8123 -e TICK_HZ=30 --restart unless-stopped zombie-lan
```

## 访问方式

- **先用 IP 直接跑（最简）**：`http://<公网IP>:8123` → 客户端自动 `ws://` 连同端口。免域名、免证书，立刻能玩。
- **日后上 HTTPS（手机/公网友好、安全）**：准备一个域名，按 `nginx.conf` 反代到 `127.0.0.1:8123`，再 `certbot --nginx -d 你的域名` 拿免费证书。页面一旦走 https，客户端**自动切 wss://**，无需改代码。

> 注意：relay.cjs 在同一端口既服务静态页面又收 WebSocket，nginx 的 `Connection "upgrade"` 必须保留。

## 环境变量

| 变量 | 默认 | 说明 |
|------|------|------|
| `PORT` | `8123` | 监听端口（服务器需放行该 TCP 端口） |
| `TICK_HZ` | `60` | 模拟+广播帧率（1~60）。默认 60 跟手；小机偏卡可降到 30 省 CPU/带宽 |

## 自测

```bash
node test-smoke.cjs          # 默认连 ws://127.0.0.1:8123
PORT=8123 node test-smoke.cjs
```

全 PASS 即协议链路正常（listRooms / createRoom / welcome / leaveRoom）。

## 重新构建前端（可选）

只有当你改了 `src/` 才需要；默认 `dist/` 已构建好可直接用。

```bash
npm install        # 装 three + vite（仅构建期需要）
npm run build      # 产出 dist/，relay.cjs 会自动托管
```

## 优化小结（你要求的"减轻数据传输负载"）

1. **去 werift 中继层** —— 最直接：每连接不再在服务器内起 WebRTC PeerConnection，1GiB 内存从"勉强"变"宽裕"。
2. **广播帧率可配（默认 60Hz）** —— CPU 与下行带宽约减半，客户端靠 `st` 时间戳插值平滑，手感无碍。
3. **离线玩家精简包** —— 快照里离线席位只发几十字节（名字/命数/杀数），不发位置/运动学，避免"离线的人每秒白占十几 KB"。
4. （未做，后续可选）二进制快照 MsgPack、兴趣区域裁剪 —— 减负更大但需改客户端，建议先跑通再迭代。

---
*本目录为独立部署副本，原 `2026-07-27-16-58-28` 工程与 `zombie-lan-20260813.zip` 均未做任何修改。*
