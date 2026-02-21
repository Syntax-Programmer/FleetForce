import {
    validateTripDispatch,
    dispatchVehicle,
    completeTripVehicleUpdate,
} from "@/lib/utils/businessRules";

import { calculateFuelEfficiency, calculateCostPerKm } from "@/lib/utils/analytics";

/* =========================
   TRIP COMPLETION
========================= */
export const handleTripCompletion = (trip, vehicle) => {
    if (!trip || !vehicle) {
        return { valid: false, message: "Trip or vehicle missing" };
    }

    const updatedVehicle = completeTripVehicleUpdate(vehicle, trip.distance || 0);

    const fuelEfficiency = calculateFuelEfficiency(trip.distance || 0, trip.fuelUsed || 0);

    const costPerKm = calculateCostPerKm(trip.expenses || 0, trip.distance || 0);

    return {
        valid: true,
        updatedVehicle,
        updatedTrip: {
            ...trip,
            status: "Completed",
        },
        metrics: {
            fuelEfficiency,
            costPerKm,
        },
    };
};

/* =========================
   TRIP DISPATCH
========================= */
export const handleTripDispatch = (trip, vehicle, driver) => {
    if (vehicle.status !== "Available") {
        return { valid: false, message: "Vehicle not available" };
    }

    if (driver.status !== "On Duty") {
        return { valid: false, message: "Driver not on duty" };
    }

    if (trip.cargoWeight > vehicle.maxCapacity) {
        return { valid: false, message: "Over capacity" };
    }

    return {
        valid: true,
        updatedVehicle: {
            ...vehicle,
            status: "On Trip",
        },
    };
};
