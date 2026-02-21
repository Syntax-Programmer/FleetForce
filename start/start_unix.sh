#!/bin/bash

echo "🚀 Starting FleetForce..."

cd "$(dirname "$0")"
cd ../backend

OS="$(uname)"

if [ "$OS" = "Linux" ]; then
    echo "🐧 Detected Linux"
    chmod +x pocketbase-linux
    ./pocketbase-linux serve &
elif [ "$OS" = "Darwin" ]; then
    echo "🍎 Detected macOS"
    chmod +x pocketbase-mac
    ./pocketbase-mac serve &
else
    echo "❌ Unsupported OS: $OS"
    exit 1
fi

echo "⏳ Waiting for PocketBase to boot..."
sleep 3

echo "🌱 Seeding database..."
node seed.js

cd ../frontend

echo "📦 Installing frontend dependencies..."
npm install

echo "🖥 Starting frontend (Vite dev server)..."
npm run dev
