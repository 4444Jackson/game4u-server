# 部署版 Dockerfile —— 运行时零依赖（relay.cjs 仅用 Node 内置模块，无需 npm install）
# 已自带构建好的 dist/，单阶段即可。如需重新构建前端，见 README「重新构建前端」。
FROM node:20-alpine

WORKDIR /app

# 运行时只需要这三个 + 静态资源 dist（src 一并带上便于追溯/重建）
COPY relay.cjs sim-core.js package.json ./
COPY dist ./dist
COPY src ./src

ENV PORT=8123 \
    TICK_HZ=30 \
    NODE_ENV=production

EXPOSE 8123

# 进程崩溃由容器 restart 策略兜底；pm2 非必需
CMD ["node", "relay.cjs"]
