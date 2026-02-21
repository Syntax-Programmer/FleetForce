"use client";

import { useEffect, useState } from "react";
import { fetchAllData } from "@/lib/services/persistence";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function DriversPage() {
    const [drivers, setDrivers] = useState<any[]>([]);
    const [trips, setTrips] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const data = await fetchAllData();
            setDrivers(data.drivers);
            setTrips(data.trips);
            setVehicles(data.vehicles);
        }

        load();
    }, []);

    const getAssignedVehicle = (driverId: string) => {
        const activeTrip = trips.find((t) => t.driver === driverId && t.status === "Dispatched");

        if (!activeTrip) return "—";

        const vehicle = vehicles.find((v) => v.id === activeTrip.vehicle);

        return vehicle?.vehicleNumber || "—";
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Drivers</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your team of {drivers.length} drivers
                    </p>
                </div>
                <Button>Add Driver</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-semibold text-card-foreground">
                        All Drivers
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Driver Name</TableHead>
                                <TableHead>License Number</TableHead>
                                <TableHead>License Expiry</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assigned Vehicle</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {drivers.map((driver) => (
                                <TableRow key={driver.id}>
                                    <TableCell className="font-medium">{driver.name}</TableCell>

                                    <TableCell className="text-muted-foreground">
                                        {driver.licenseNumber}
                                    </TableCell>

                                    <TableCell className="text-muted-foreground">
                                        {driver.licenseExpiry}
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                driver.status === "On Duty"
                                                    ? "bg-success/15 text-success border-success/20"
                                                    : driver.status === "Suspended"
                                                      ? "bg-warning/15 text-warning border-warning/20"
                                                      : "bg-muted text-muted-foreground border-border"
                                            }
                                        >
                                            {driver.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="font-mono text-xs">
                                        {getAssignedVehicle(driver.id)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
