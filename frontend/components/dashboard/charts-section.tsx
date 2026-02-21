"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

function ChartTooltipContent({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
            <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
            {payload.map((entry: any, index: number) => (
                <p key={index} className="text-sm font-semibold text-card-foreground">
                    {entry.name}: {entry.value.toLocaleString()}
                </p>
            ))}
        </div>
    );
}

export function ChartsSection({ vehicles, trips, maintenance }) {
    /* ========================
     Trips Per Vehicle
  ========================= */

    const tripsPerVehicle = vehicles.map((v: any) => ({
        vehicle: v.vehicleNumber,
        trips: trips.filter((t: any) => t.vehicle === v.id).length,
    }));

    /* ========================
     Distance Over Time (by month)
  ========================= */

    const distanceMap: Record<string, number> = {};

    trips.forEach((trip: any) => {
        if (trip.status !== "Completed") return;

        const date = new Date(trip.created);
        const month = date.toLocaleString("default", { month: "short" });

        if (!distanceMap[month]) {
            distanceMap[month] = 0;
        }

        distanceMap[month] += trip.distance || 0;
    });

    const distanceOverTime = Object.entries(distanceMap).map(([month, distance]) => ({
        month,
        distance,
    }));

    /* ========================
     Vehicle Status Distribution
  ========================= */

    const vehicleStatusDistribution = [
        {
            status: "Available",
            count: vehicles.filter((v: any) => v.status === "Available").length,
            fill: "var(--color-success)",
        },
        {
            status: "On Trip",
            count: vehicles.filter((v: any) => v.status === "On Trip").length,
            fill: "var(--color-chart-1)",
        },
        {
            status: "In Shop",
            count: vehicles.filter((v: any) => v.status === "In Shop").length,
            fill: "var(--color-warning)",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Bar Chart */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Trips per Vehicle</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={tripsPerVehicle}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="vehicle" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Bar
                                    dataKey="trips"
                                    name="Trips"
                                    fill="var(--color-chart-1)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Line Chart */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Distance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={distanceOverTime}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line
                                    type="monotone"
                                    dataKey="distance"
                                    name="Distance (km)"
                                    stroke="var(--color-chart-2)"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Vehicle Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={vehicleStatusDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={4}
                                    dataKey="count"
                                    nameKey="status"
                                >
                                    {vehicleStatusDistribution.map((entry, index) => (
                                        <Cell key={index} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
