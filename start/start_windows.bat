@echo off

echo Starting FleetForce...

cd /d %~dp0
cd ../backend

start pocketbase_0.36.4_windows_amd64\pocketbase.exe serve

cd ../frontend

echo Starting frontend server at http://127.0.0.1:8000

python -m http.server 8000
