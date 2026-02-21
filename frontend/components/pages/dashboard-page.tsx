"use client";

import { useEffect, useState } from "react";
import { fetchAllData } from "@/lib/services/persistence";
import { generateFleetDashboard } from "@/lib/services/dashboardEngine";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { RecentTripsTable } from "@/components/dashboard/recent-trips-table";

export function DashboardPage() {
    const [dashboard, setDashboard] = useState<any>(null);
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [trips, setTrips] = useState<any[]>([]);
    const [maintenance, setMaintenance] = useState<any[]>([]);
    const [fuelLogs, setFuelLogs] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const data = await fetchAllData();

            setVehicles(data.vehicles);
            setTrips(data.trips);
            setMaintenance(data.maintenance);
            setFuelLogs(data.fuelLogs);

            const summary = generateFleetDashboard(data.vehicles, data.trips, data.maintenance);

            setDashboard(summary);
        }

        load();
    }, []);

    if (!dashboard) {
        return <div className="p-10">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            <KpiCards dashboard={dashboard} />
            <ChartsSection vehicles={vehicles} trips={trips} maintenance={maintenance} />
            <RecentTripsTable trips={trips} />
        </div>
    );
}
