import { useEffect } from "react";
import pb from "./lib/pocketbase";

function App() {
    useEffect(() => {
        pb.collection("vehicles")
            .getFullList()
            .then((data) => console.log("Vehicles:", data))
            .catch((err) => console.error(err));
    }, []);

    return <h1>FleetFlow</h1>;
}

export default App;
