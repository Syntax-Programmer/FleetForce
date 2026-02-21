#!/bin/bash

echo "Starting FleetForce..."

cd "$(dirname "$0")"
cd ../backend

OS="$(uname)"

if [ "$OS" = "Linux" ]; then
    echo "Detected Linux"
    chmod +x pocketbase_linux/pocketbase
    ./pocketbase_0.36.4_linux_amd64/pocketbase serve &

elif [ "$OS" = "Darwin" ]; then
    echo "Detected macOS"
    chmod +x pocketbase_mac/pocketbase
    ./pocketbase_0.36.4_darwin_amd64/pocketbase serve &

else
    echo "Unsupported OS: $OS"
    exit 1
fi

cd ../frontend

echo "Starting frontend server at http://127.0.0.1:8000"

python3 -m http.server 8000
