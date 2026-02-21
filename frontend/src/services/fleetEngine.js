import {
  validateTripDispatch,
  dispatchVehicle,
  completeTripVehicleUpdate,
} from "../utils/businessRules";

import {
  calculateFuelEfficiency,
  calculateCostPerKm,
} from "../utils/analytics";

export const handleTripDispatch = (trip, vehicle, driver) => {
  const validation = validateTripDispatch({
    vehicle,
    driver,
    cargoWeight: trip.cargoWeight,
  });

  if (!validation.valid) return validation;

    return {
         valid: true,
         updatedVehicle: dispatchVehicle(vehicle),
        updatedTrip: {
         ...trip,
         status: "Dispatched",
        },
};

export const handleTripCompletion = (trip, vehicle) => {
  const updatedVehicle = completeTripVehicleUpdate(
    vehicle,
    trip.distance
  );

  const fuelEfficiency = calculateFuelEfficiency(
    trip.distance,
    trip.fuelUsed
  );

  const costPerKm = calculateCostPerKm(
    trip.expenses,
    trip.distance
  );

  return {
    updatedVehicle,
    updatedTrip: {
      ...trip,
      status: "Completed",
    },
    fuelEfficiency,
    costPerKm,
  };
 }