import pb from "@/lib/pocketbase";
import { handleTripDispatch, handleTripCompletion } from "./fleetEngine";

/* ================= FETCH ================= */

export const fetchAllData = async () => {
    const vehicles = await pb.collection("vehicles").getFullList();
    const drivers = await pb.collection("drivers").getFullList();
    const trips = await pb.collection("trips").getFullList();
    const maintenance = await pb.collection("maintenance").getFullList();

    return { vehicles, drivers, trips, maintenance };
};

/* ================= CREATE ================= */

export const createVehicle = async (data) => await pb.collection("vehicles").create(data);

export const createDriver = async (data) => await pb.collection("drivers").create(data);

export const createTrip = async (data) => await pb.collection("trips").create(data);

/* ================= DISPATCH ================= */

export const dispatchTrip = async (trip, vehicle, driver) => {
    try {
        const result = handleTripDispatch(trip, vehicle, driver);
        if (!result.valid) return result;

        await pb.collection("vehicles").update(vehicle.id, result.updatedVehicle);
        await pb.collection("trips").update(trip.id, result.updatedTrip);
        await pb.collection("drivers").update(driver.id, { status: "On Duty" });

        return { valid: true };
    } catch (error) {
        console.error(error);
        return { valid: false, message: "Dispatch failed" };
    }
};

/* ================= COMPLETE ================= */

export const completeTrip = async (trip, vehicle, driver) => {
    try {
        const result = handleTripCompletion(trip, vehicle);

        await pb.collection("vehicles").update(vehicle.id, result.updatedVehicle);
        await pb.collection("trips").update(trip.id, result.updatedTrip);
        await pb.collection("drivers").update(driver.id, { status: "Off Duty" });

        return { valid: true };
    } catch (error) {
        console.error(error);
        return { valid: false, message: "Completion failed" };
    }
};
