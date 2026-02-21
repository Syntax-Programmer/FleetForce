export const getTotalTrips = (trips) => trips.length;

export const calculateFuelEfficiency = (distance, fuelUsed) => {
  if (!fuelUsed) return 0;
  return (distance / fuelUsed).toFixed(2);
};

export const calculateCostPerKm = (cost, distance) => {
  if (!distance) return 0;
  return (cost / distance).toFixed(2);
};

export const calculateUtilization = (vehicles) => {
  const active = vehicles.filter(v => v.status === "On Trip").length;
  return ((active / vehicles.length) * 100).toFixed(1);
};

export const getMaintenanceCostSummary = (logs) =>
  logs.reduce((total, log) => total + log.cost, 0);