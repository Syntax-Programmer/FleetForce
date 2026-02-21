const { exec } = require("child_process");

console.log("🚀 Starting FleetForce...");

// Start PocketBase
exec("cd backend && ./pocketbase-linux serve", (err) => {
    if (err) console.error(err);
});

// Wait 2 seconds then seed
setTimeout(() => {
    console.log("🌱 Seeding database...");
    exec("node backend/seed.js", (err, stdout) => {
        if (err) console.error(err);
        console.log(stdout);
    });
}, 2000);

// Wait 4 seconds then start frontend
setTimeout(() => {
    console.log("🖥 Starting frontend...");
    exec("cd frontend && npm run dev", (err) => {
        if (err) console.error(err);
    });
}, 4000);
