@echo off
cd /d "%~dp0"

REM ===== Build the client bundle BEFORE starting, so dist/ is always fresh =====
REM ===== This kills the trap: "restart bat but client is still old" =====
echo Building client bundle (vite build)...
"C:\Users\Lenovo\.workbuddy\binaries\node\versions\22.22.2\node.exe" node_modules/vite/bin/vite.js build || echo [warn] vite build failed, relay will start with existing dist/

REM ===== Ensure port 8200 is free: terminate whatever process holds it (port-based, not a hardcoded PID) =====
REM ===== This kills the OTHER trap: a stale relay from before the fix is still serving old code =====
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /i "LISTENING" ^| findstr ":8200"') do (
  echo Port 8200 is held by PID %%a - terminating it so the relay can bind fresh code
  taskkill /PID %%a /F
)

REM ===== Start relay in THIS window. Closing this window stops the server (no separate stop needed) =====
echo Starting relay (HTTP + WebSocket authoritative server) on PORT 8200...
echo This window IS the server. Close it to stop.
echo Browser: http://127.0.0.1:8200
echo.
set PORT=8200
set TICK_HZ=60
"C:\Users\Lenovo\.workbuddy\binaries\node\versions\22.22.2\node.exe" relay.cjs
