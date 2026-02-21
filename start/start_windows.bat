@echo off
echo Starting FleetForce...

cd /d %~dp0
cd ..\backend

echo Detected Windows

start "" pocketbase-windows.exe serve

timeout /t 3 >nul
echo Seeding database...
node seed.js

cd ..\frontend

echo Installing frontend dependencies...
call npm install

echo Starting frontend (Vite dev server)...
call npm run dev
