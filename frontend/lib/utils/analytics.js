/* ================= TOTAL TRIPS ================= */

export const getTotalTrips = (trips = []) => trips.length;

/* ================= FUEL EFFICIENCY ================= */

export const calculateFuelEfficiency = (distance = 0, fuelUsed = 0) => {
    if (!fuelUsed || !distance) return 0;

    return Number((distance / fuelUsed).toFixed(2));
};

/* ================= COST PER KM ================= */

export const calculateCostPerKm = (cost = 0, distance = 0) => {
    if (!distance) return 0;

    return Number((cost / distance).toFixed(2));
};

/* ================= UTILIZATION ================= */

export const calculateUtilization = (vehicles = []) => {
    if (!vehicles.length) return 0;

    const active = vehicles.filter((v) => v.status === "On Trip").length;

    return Number(((active / vehicles.length) * 100).toFixed(1));
};

/* ================= MAINTENANCE COST ================= */

export const getMaintenanceCostSummary = (logs = []) => {
    if (!logs.length) return 0;

    return logs.reduce((total, log) => total + (log.cost || 0), 0);
};
