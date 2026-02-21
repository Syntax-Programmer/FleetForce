// ================================
// TRIP DISPATCH VALIDATION
// ================================

export const validateTripDispatch = ({ vehicle, driver, cargoWeight }) => {
  if (!vehicle || vehicle.status !== "Available") {
    return { valid: false, message: "Vehicle not available" };
  }

  if (!driver || driver.status !== "On Duty") {
    return { valid: false, message: "Driver not on duty" };
  }

  if (new Date(driver.licenseExpiry) < new Date()) {
    return { valid: false, message: "Driver license expired" };
  }

  if (cargoWeight > vehicle.maxCapacity) {
    return { valid: false, message: "Cargo exceeds vehicle capacity" };
  }

  return { valid: true };
};


// ================================
// STATUS TRANSITIONS
// ================================

export const dispatchVehicle = (vehicle) => ({
  ...vehicle,
  status: "On Trip",
});

export const completeTripVehicleUpdate = (vehicle, distance) => ({
  ...vehicle,
  status: "Available",
  totalKm: vehicle.totalKm + distance,
});