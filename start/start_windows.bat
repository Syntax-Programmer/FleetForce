@echo off

echo Starting FleetForce...

cd /d %~dp0
cd ../backend

start pocketbase-windows.exe serve

cd ../frontend

echo Starting frontend server at http://127.0.0.1:8000

python -m http.server 8000
