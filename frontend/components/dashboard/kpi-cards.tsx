"use client";

import { Card } from "@/components/ui/card";
import { Route, Truck, CircleCheck, Gauge, Wrench } from "lucide-react";

const iconMap = {
    totalTrips: Route,
    activeFleet: Truck,
    availableFleet: CircleCheck,
    utilization: Gauge,
    maintenance: Wrench,
};

export function KpiCards({ dashboard }) {
    const data = [
        {
            key: "totalTrips",
            label: "Total Trips",
            value: dashboard.totalTrips,
        },
        {
            key: "activeFleet",
            label: "Active Vehicles",
            value: dashboard.activeFleet,
        },
        {
            key: "availableFleet",
            label: "Available Vehicles",
            value: dashboard.availableFleet,
        },
        {
            key: "utilization",
            label: "Vehicle Utilization",
            value: dashboard.utilizationPercentage + "%",
        },
        {
            key: "maintenance",
            label: "Maintenance Cost",
            value: "₹" + dashboard.totalMaintenanceCost,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((kpi) => {
                const Icon = iconMap[kpi.key];

                return (
                    <Card
                        key={kpi.label}
                        className="group relative overflow-hidden py-4 transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-start gap-4 px-5">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="size-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {kpi.label}
                                </p>
                                <p className="text-xl font-bold text-card-foreground tracking-tight">
                                    {kpi.value}
                                </p>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
