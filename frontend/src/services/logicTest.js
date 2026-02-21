import { vehicles, drivers } from "../data/demoData";
import { handleTripDispatch } from "./fleetEngine";

export const runLogicTests = () => {
    console.log("TEST 1 - Over Capacity");
    console.log(handleTripDispatch({ cargoWeight: 6000 }, vehicles[0], drivers[0]));

    console.log("TEST 2 - Driver Off Duty");
    console.log(handleTripDispatch({ cargoWeight: 3000 }, vehicles[0], drivers[1]));

    console.log("TEST 3 - Valid Case");
    console.log(handleTripDispatch({ cargoWeight: 3000 }, vehicles[0], drivers[0]));
};
