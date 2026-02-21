import pb from "@/lib/pocketbase";
import { handleTripDispatch, handleTripCompletion } from "./fleetEngine";

/* ================= FETCH ================= */

export const fetchAllData = async () => {
    try {
        const [vehicles, drivers, trips, maintenance] = await Promise.all([
            pb.collection("vehicles").getFullList(),
            pb.collection("drivers").getFullList(),
            pb.collection("trips").getFullList(),
            pb.collection("maintenance").getFullList(),
        ]);

        return { vehicles, drivers, trips, maintenance };
    } catch (error) {
        console.error("Fetch error:", error);
        return { vehicles: [], drivers: [], trips: [], maintenance: [] };
    }
};

/* ================= CREATE ================= */

export const createVehicle = async (data) => pb.collection("vehicles").create(data);

export const createDriver = async (data) => pb.collection("drivers").create(data);

export const createTrip = async (data) => pb.collection("trips").create(data);

/* ================= DISPATCH ================= */

export const dispatchTrip = async (trip, vehicle, driver) => {
    try {
        const result = handleTripDispatch(trip, vehicle, driver);

        if (!result.valid) {
            return result;
        }

        const [updatedVehicle, updatedTrip, updatedDriver] = await Promise.all([
            pb.collection("vehicles").update(vehicle.id, result.updatedVehicle),
            pb.collection("trips").update(trip.id, result.updatedTrip),
            pb.collection("drivers").update(driver.id, { status: "On Duty" }),
        ]);

        return {
            valid: true,
            updatedVehicle,
            updatedTrip,
            updatedDriver,
        };
    } catch (error) {
        console.error("Dispatch error:", error);
        return { valid: false, message: "Dispatch failed" };
    }
};

/* ================= COMPLETE ================= */

export const completeTrip = async (trip, vehicle, driver) => {
    try {
        const result = handleTripCompletion(trip, vehicle);

        if (!result.valid) {
            return result;
        }

        const [updatedVehicle, updatedTrip, updatedDriver] = await Promise.all([
            pb.collection("vehicles").update(vehicle.id, result.updatedVehicle),
            pb.collection("trips").update(trip.id, result.updatedTrip),
            pb.collection("drivers").update(driver.id, { status: "Off Duty" }),
        ]);

        return {
            valid: true,
            updatedVehicle,
            updatedTrip,
            updatedDriver,
            metrics: result.metrics, // fuel efficiency + cost/km
        };
    } catch (error) {
        console.error("Completion error:", error);
        return { valid: false, message: "Completion failed" };
    }
};
