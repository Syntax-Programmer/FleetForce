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
    if (!trip || !vehicle || !driver) {
        return { valid: false, message: "Missing trip, vehicle or driver" };
    }

    const validation = validateTripDispatch({
        vehicle,
        driver,
        cargoWeight: trip.cargoWeight || 0,
    });

    if (!validation.valid) {
        return validation;
    }

    return {
        valid: true,
        updatedVehicle: dispatchVehicle(vehicle),
        updatedTrip: {
            ...trip,
            status: "On Trip", // IMPORTANT: keep consistent with dashboard
        },
    };
};
