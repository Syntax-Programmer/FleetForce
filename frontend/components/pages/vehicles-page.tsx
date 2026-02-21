"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck, MapPin, Weight } from "lucide-react";
import { fetchAllData, createVehicle } from "@/lib/services/persistence";

export function VehiclesPage() {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        vehicleNumber: "",
        type: "",
        maxCapacity: "",
    });

    const load = async () => {
        const data = await fetchAllData();
        setVehicles(data.vehicles);
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreate = async (e: any) => {
        e.preventDefault();

        await createVehicle({
            vehicleNumber: form.vehicleNumber,
            type: form.type,
            maxCapacity: Number(form.maxCapacity),
            status: "Available",
            totalKm: 0,
        });

        setForm({ vehicleNumber: "", type: "", maxCapacity: "" });
        setShowForm(false);
        await load();
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: any = {
            Available: "bg-success/15 text-success border-success/20",
            "On Trip": "bg-primary/15 text-primary border-primary/20",
            "In Shop": "bg-warning/15 text-warning border-warning/20",
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
                    <h2 className="text-xl font-bold">Fleet Vehicles</h2>
                    <p className="text-sm text-muted-foreground">{vehicles.length} vehicles</p>
                </div>

                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add Vehicle"}
                </Button>
            </div>

            {/* FORM */}
            {showForm && (
                <Card>
                    <CardContent className="p-6">
                        <form
                            onSubmit={handleCreate}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                        >
                            <input
                                required
                                placeholder="Vehicle Number"
                                className="border p-2 rounded"
                                value={form.vehicleNumber}
                                onChange={(e) =>
                                    setForm({ ...form, vehicleNumber: e.target.value })
                                }
                            />

                            <input
                                required
                                placeholder="Type"
                                className="border p-2 rounded"
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                            />

                            <input
                                required
                                type="number"
                                placeholder="Max Capacity"
                                className="border p-2 rounded"
                                value={form.maxCapacity}
                                onChange={(e) => setForm({ ...form, maxCapacity: e.target.value })}
                            />

                            <Button type="submit" className="col-span-full">
                                Create Vehicle
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* GRID */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex justify-between border-b px-5 py-4">
                                <div className="flex gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Truck className="size-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{vehicle.vehicleNumber}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {vehicle.type}
                                        </p>
                                    </div>
                                </div>

                                <StatusBadge status={vehicle.status} />
                            </div>

                            <div className="space-y-3 px-5 py-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="size-3.5" />
                                        Total KM
                                    </span>
                                    <span>{vehicle.totalKm}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <Weight className="size-3.5" />
                                        Max Capacity
                                    </span>
                                    <span>{vehicle.maxCapacity} kg</span>
                                </div>
                            </div>

                            <div className="border-t px-5 py-3">
                                <Button
                                    className="w-full"
                                    size="sm"
                                    disabled={vehicle.status !== "Available"}
                                >
                                    {vehicle.status}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
