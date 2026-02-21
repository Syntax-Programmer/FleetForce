import pb from "../lib/pocketbase";
import { handleTripDispatch, handleTripCompletion } from "./fleetEngine";

export const dispatchTrip = async (trip, vehicle, driver) => {
    const result = handleTripDispatch(trip, vehicle, driver);

    if (!result.valid) return result;

    await pb.collection("vehicles").update(vehicle.id, result.updatedVehicle);
    await pb.collection("trips").update(trip.id, result.updatedTrip);
    await pb.collection("drivers").update(driver.id, { status: "On Duty" });

    return result;
};

export const completeTrip = async (trip, vehicle, driver) => {
    const result = handleTripCompletion(trip, vehicle);

    await pb.collection("vehicles").update(vehicle.id, result.updatedVehicle);
    await pb.collection("trips").update(trip.id, result.updatedTrip);
    await pb.collection("drivers").update(driver.id, { status: "Off Duty" });

    return result;
};
