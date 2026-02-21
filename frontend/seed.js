const PocketBase = require("pocketbase").default;

const pb = new PocketBase("http://127.0.0.1:8090");

// 🔐 YOUR REAL SUPERUSER CREDENTIALS
const ADMIN_EMAIL = "admin@fleetforce.com";
const ADMIN_PASSWORD = "ANAND6308anand";

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const vehicleTypes = [
    "Freight Truck",
    "Container Carrier",
    "Heavy Hauler",
    "Refrigerated Truck",
    "Flatbed Truck",
];

const driverNames = [
    "Marcus Johnson",
    "Sarah Chen",
    "David Park",
    "Lisa Wang",
    "James Miller",
    "Emma Wilson",
    "Robert Taylor",
    "Ana Rodriguez",
];

async function seed() {
    try {
        console.log("🔐 Logging in...");

        // ✅ Correct modern auth
        await pb.collection("_superusers").authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

        console.log("🚛 Creating Vehicles...");
        const vehicles = [];

        for (let i = 1; i <= 8; i++) {
            const vehicle = await pb.collection("vehicles").create({
                vehicleNumber: `TRK-${String(i).padStart(3, "0")}`,
                type: vehicleTypes[random(0, vehicleTypes.length)],
                maxCapacity: random(15000, 30000),
                status: "Available",
                totalKm: random(20000, 200000),
            });

            vehicles.push(vehicle);
        }

        console.log("👨‍✈️ Creating Drivers...");
        const drivers = [];

        for (let i = 0; i < driverNames.length; i++) {
            const driver = await pb.collection("drivers").create({
                name: driverNames[i],
                licenseNumber: `DL-${random(100000, 999999)}`,
                licenseExpiry: "2027-12-31",
                status: i % 2 === 0 ? "On Duty" : "Off Duty",
            });

            drivers.push(driver);
        }

        console.log("📦 Creating Trips...");
        const trips = [];

        for (let i = 0; i < 10; i++) {
            const vehicle = vehicles[random(0, vehicles.length)];
            const driver = drivers[random(0, drivers.length)];

            const trip = await pb.collection("trips").create({
                vehicle: vehicle.id,
                driver: driver.id,
                cargoWeight: random(5000, 20000),
                startLocation: "Mumbai",
                endLocation: "Delhi",
                distance: random(200, 1500),
                status: "Completed",
                fuelUsed: random(50, 300),
                expenses: random(5000, 30000),
            });

            trips.push(trip);
        }

        console.log("🔧 Creating Maintenance Logs...");
        for (let i = 0; i < 5; i++) {
            const vehicle = vehicles[random(0, vehicles.length)];

            await pb.collection("maintenance").create({
                vehicle: vehicle.id,
                issue: "General Service",
                cost: random(3000, 15000),
                status: i % 2 === 0 ? "Open" : "Closed",
            });
        }

        console.log("⛽ Creating Fuel Logs...");
        for (let i = 0; i < 8; i++) {
            const vehicle = vehicles[random(0, vehicles.length)];
            const trip = trips[random(0, trips.length)];

            await pb.collection("fuelLogs").create({
                vehicle: vehicle.id,
                trip: trip.id,
                liters: random(40, 200),
                cost: random(3000, 15000),
            });
        }

        console.log("✅ SEED COMPLETE!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err.response || err);
        process.exit(1);
    }
}

seed();
