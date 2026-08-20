# Game4U 云服务器版

一个**部署在云服务器上的多人僵尸射击游戏**（纯 WebSocket，零运行时依赖，小内存 VPS 也能跑）。

- 部署者：有一台云服务器（任意 Linux，1GiB 内存即可）
- 玩家：任何有浏览器的设备（手机/电脑），**无需安装任何东西**，打开网址即可

## 怎么玩

1. 按下面任一方式把服务跑起来
2. 云控制台**安全组/防火墙放行 TCP 8123**
3. 把 `http://<服务器公网IP>:8123` 发给朋友 → 打开即进房间列表 → 加入开玩

## 部署方式（三选一）

### 方式 A：直接跑（最快）

```bash
cd /opt/game4u
PORT=8123 TICK_HZ=30 node relay.cjs     # 或 npm start
```

### 方式 B：systemd（生产推荐，开机自启 + 崩溃自拉）

```bash
sudo cp zombie-lan.service /etc/systemd/system/
sudo systemctl enable --now zombie-lan
```

> service 里 `User=www-data`，请改成实际部署用户（不要用 root）。

### 方式 C：Docker

```bash
docker compose up -d --build
```

## 上 HTTPS（可选但推荐）

1. 准备一个域名，解析到服务器
2. 按 `nginx.conf` 反代到 `127.0.0.1:8123`（注意保留 WebSocket 的 `Connection: upgrade` 头）
3. `certbot --nginx -d 你的域名` 拿免费证书
4. 页面一旦走 https，客户端**自动切 wss://**，无需改代码

## 为什么适合小服务器

- **运行时零 npm 依赖**：只用 Node 内置模块（http/fs/crypto），1GiB 内存很宽裕
- **60Hz 权威模拟**：多房间、房主移交、断线认领席位都在
- 机器偏卡可把 `TICK_HZ` 降到 30，负载减半，客户端仍平滑

## 环境变量

| 变量 | 默认 | 说明 |
|------|------|------|
| `PORT` | `8123` | 监听端口（服务器需放行） |
| `TICK_HZ` | `60` | 模拟+广播帧率（1-60） |

## 自测

```bash
node test-smoke.cjs   # 全 PASS 即 listRooms/createRoom/leaveRoom 链路正常
```

## 目录结构

```
game4u-server/
├── relay.cjs          # 服务器主程序（权威模拟 + 静态页 + WebSocket）
├── sim-core.js        # 权威模拟内核
├── src/               # 浏览器端源码
├── Dockerfile         # 单阶段镜像
├── docker-compose.yml
├── nginx.conf         # HTTPS 反代模板
├── zombie-lan.service # systemd 单元
└── test-smoke.cjs     # 冒烟测试
```

## License

仅供学习交流。游戏素材与引擎为个人原创。
