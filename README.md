# 🚛 FleetForce

### Intelligent Fleet Management & Trip Dispatch System

FleetForce is a full-stack fleet management platform designed to manage vehicles, drivers, trips, maintenance, and analytics in a clean and scalable architecture.

Built with:

- ⚡ React + TypeScript
- 🎨 TailwindCSS + ShadCN UI
- 📊 Recharts
- 🗄 PocketBase (Backend + Database)
- 🧠 Custom Business Rule Engine

---

## 🌟 Features

### 🚛 Fleet Management

- View and manage vehicles
- Track availability and status
- Monitor utilization and total kilometers
- Dispatch vehicles directly from UI

### 👨‍✈️ Driver Management

- License expiry tracking
- On-duty / Off-duty validation
- Driver assignment logic

### 📦 Trip Management

- Create and manage trips
- Dispatch vehicles
- Complete trips
- Business rule enforcement:
    - Vehicle must be available
    - Driver must be on duty
    - License must not be expired
    - Cargo must not exceed vehicle capacity

### 📊 Analytics Dashboard

- KPI overview cards
- Trips per vehicle chart
- Distance over time
- Fleet status distribution
- Maintenance cost summary

### 🔧 Maintenance & Fuel Logs

- Track vehicle service records
- Log maintenance costs
- Record fuel consumption

---

## 🏗 Architecture

### Code Structure

- `utils/` → Pure business rules & calculations
- `services/` → Domain logic
- `persistence/` → Database operations
- `components/` → UI components
- `backend/` → PocketBase + seed script

---

## 🚀 How To Run (Linux / macOS)

```bash
./start/start_unix.sh
```

## 🚀 How To Run (Windows)

```bash
./start/start_windows.bat
```
