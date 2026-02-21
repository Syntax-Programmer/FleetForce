"use client";

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
import { Eye } from "lucide-react";

function StatusBadge({ status }) {
    const styles = {
        Draft: "bg-muted text-muted-foreground border-border",
        Dispatched: "bg-primary/15 text-primary border-primary/20",
        Completed: "bg-success/15 text-success border-success/20",
    };

    return (
        <Badge variant="outline" className={styles[status] || ""}>
            {status}
        </Badge>
    );
}

export function RecentTripsTable({ trips }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-semibold text-card-foreground">
                    Recent Trips
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Trip ID</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead className="text-right">Distance</TableHead>
                            <TableHead className="text-right">Fuel Used</TableHead>
                            <TableHead className="text-right">Expenses</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {trips.slice(0, 8).map((trip) => (
                            <TableRow key={trip.id}>
                                <TableCell className="font-medium">{trip.id}</TableCell>

                                <TableCell>{trip.expand?.driver?.name}</TableCell>

                                <TableCell className="font-mono text-xs">
                                    {trip.expand?.vehicle?.vehicleNumber}
                                </TableCell>

                                <TableCell className="text-right">
                                    {trip.distance || 0} km
                                </TableCell>

                                <TableCell className="text-right">{trip.fuelUsed || 0} L</TableCell>

                                <TableCell className="text-right">₹{trip.expenses || 0}</TableCell>

                                <TableCell>
                                    <StatusBadge status={trip.status} />
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon-sm">
                                        <Eye className="size-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
