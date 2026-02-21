"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus } from "lucide-react";

import { fetchAllData, createTrip, dispatchTrip, completeTrip } from "@/lib/services/persistence";

export function TripsPage() {
    const [trips, setTrips] = useState<any[]>([]);
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [drivers, setDrivers] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        vehicle: "",
        driver: "",
        distance: "",
        cargoWeight: "",
        fuelUsed: "",
        expenses: "",
    });

    const load = async () => {
        const data = await fetchAllData();
        setTrips(data.trips);
        setVehicles(data.vehicles);
        setDrivers(data.drivers);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreateTrip = async (e: any) => {
        e.preventDefault();

        const newTrip = await createTrip({
            vehicle: form.vehicle,
            driver: form.driver,
            distance: Number(form.distance),
            cargoWeight: Number(form.cargoWeight),
            fuelUsed: Number(form.fuelUsed),
            expenses: Number(form.expenses),
            status: "Draft",
        });

        setShowForm(false);
        setForm({
            vehicle: "",
            driver: "",
            distance: "",
            cargoWeight: "",
            fuelUsed: "",
            expenses: "",
        });

        await load();
    };

    const handleDispatch = async (trip: any) => {
        const vehicle = vehicles.find((v) => v.id === trip.vehicle);
        const driver = drivers.find((d) => d.id === trip.driver);

        const result = await dispatchTrip(trip, vehicle, driver);

        if (!result.valid) {
            alert(result.message);
        }

        await load();
    };

    const handleComplete = async (trip: any) => {
        const vehicle = vehicles.find((v) => v.id === trip.vehicle);
        const driver = drivers.find((d) => d.id === trip.driver);

        await completeTrip(trip, vehicle, driver);
        await load();
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: any = {
            Draft: "bg-muted text-muted-foreground border-border",
            Dispatched: "bg-primary/15 text-primary border-primary/20",
            Completed: "bg-success/15 text-success border-success/20",
        };

        return (
            <Badge variant="outline" className={styles[status]}>
                {status}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Trips</h2>
                    <p className="text-sm text-muted-foreground">Create and manage fleet trips</p>
                </div>

                <Button onClick={() => setShowForm(!showForm)}>
                    <Plus className="size-4 mr-2" />
                    {showForm ? "Hide Form" : "Create Trip"}
                </Button>
            </div>

            {/* FORM */}
            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Create Trip</CardTitle>
                        <CardDescription>Dispatch a vehicle with driver</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={handleCreateTrip}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {/* VEHICLE */}
                            <div>
                                <Label>Vehicle</Label>
                                <Select onValueChange={(val) => setForm({ ...form, vehicle: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select vehicle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehicles
                                            .filter((v) => v.status === "Available")
                                            .map((v) => (
                                                <SelectItem key={v.id} value={v.id}>
                                                    {v.vehicleNumber}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* DRIVER */}
                            <div>
                                <Label>Driver</Label>
                                <Select onValueChange={(val) => setForm({ ...form, driver: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select driver" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {drivers
                                            .filter((d) => d.status === "On Duty")
                                            .map((d) => (
                                                <SelectItem key={d.id} value={d.id}>
                                                    {d.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Input
                                placeholder="Distance"
                                type="number"
                                onChange={(e) => setForm({ ...form, distance: e.target.value })}
                            />

                            <Input
                                placeholder="Cargo Weight"
                                type="number"
                                onChange={(e) => setForm({ ...form, cargoWeight: e.target.value })}
                            />

                            <Input
                                placeholder="Fuel Used"
                                type="number"
                                onChange={(e) => setForm({ ...form, fuelUsed: e.target.value })}
                            />

                            <Input
                                placeholder="Expenses"
                                type="number"
                                onChange={(e) => setForm({ ...form, expenses: e.target.value })}
                            />

                            <Button type="submit" className="col-span-full">
                                Create Trip
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* TABLE */}
            <Card>
                <CardHeader>
                    <CardTitle>All Trips</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell>{trip.id}</TableCell>
                                    <TableCell>{trip.vehicle}</TableCell>
                                    <TableCell>{trip.driver}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={trip.status} />
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {trip.status === "Draft" && (
                                            <Button size="sm" onClick={() => handleDispatch(trip)}>
                                                Dispatch
                                            </Button>
                                        )}

                                        {trip.status === "Dispatched" && (
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleComplete(trip)}
                                            >
                                                Complete
                                            </Button>
                                        )}
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
