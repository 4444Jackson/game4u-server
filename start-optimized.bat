@echo off
echo ==============================================
echo  Game4U local test launcher (zombie-lan-server)
echo  PORT=8200  isolated from prod 8123
echo ==============================================
set "NODE_DIR=C:\Users\Lenovo\.workbuddy\binaries\node\versions\22.22.2"
if exist "%NODE_DIR%\node.exe" set "PATH=%NODE_DIR%;%PATH%"
cd /d "%~dp0"
set PORT=8200
set TICK_HZ=60
echo Starting relay server ...
echo Browser: http://127.0.0.1:8200
echo Press Ctrl+C to stop
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8200"
node relay.cjs
pause
