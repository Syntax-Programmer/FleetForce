import {
  getTotalTrips,
  calculateUtilization,
  getMaintenanceCostSummary,
} from "../utils/analytics";

export const generateFleetDashboard = (
  vehicles,
  trips,
  maintenanceLogs
) => {
  const activeFleet = vehicles.filter(
    (v) => v.status === "On Trip"
  ).length;

  const availableFleet = vehicles.filter(
    (v) => v.status === "Available"
  ).length;

  const inMaintenance = vehicles.filter(
    (v) => v.status === "In Shop"
  ).length;

  return {
    totalTrips: getTotalTrips(trips),
    activeFleet,
    availableFleet,
    inMaintenance,
    utilizationPercentage: calculateUtilization(vehicles),
    totalMaintenanceCost:
      getMaintenanceCostSummary(maintenanceLogs),
  };
};