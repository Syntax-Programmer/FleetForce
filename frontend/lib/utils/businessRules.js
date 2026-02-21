// ================================
// TRIP DISPATCH VALIDATION
// ================================

export const validateTripDispatch = ({ vehicle, driver, cargoWeight = 0 }) => {
    if (!vehicle) {
        return { valid: false, message: "Vehicle not found" };
    }

    if (vehicle.status !== "Available") {
        return { valid: false, message: "Vehicle not available" };
    }

    if (!driver) {
        return { valid: false, message: "Driver not found" };
    }

    if (driver.status !== "On Duty") {
        return { valid: false, message: "Driver not on duty" };
    }

    if (!driver.licenseExpiry) {
        return { valid: false, message: "Driver license expiry missing" };
    }

    const today = new Date();
    const expiry = new Date(driver.licenseExpiry);

    if (isNaN(expiry.getTime())) {
        return { valid: false, message: "Invalid license expiry date" };
    }

    if (expiry < today) {
        return { valid: false, message: "Driver license expired" };
    }

    const capacity = Number(vehicle.maxCapacity) || 0;
    const weight = Number(cargoWeight) || 0;

    if (weight <= 0) {
        return { valid: false, message: "Cargo weight must be greater than 0" };
    }

    if (weight > capacity) {
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

export const completeTripVehicleUpdate = (vehicle, distance = 0) => {
    const km = Number(vehicle.totalKm) || 0;
    const tripDistance = Number(distance) || 0;

    return {
        ...vehicle,
        status: "Available",
        totalKm: km + tripDistance,
    };
};
