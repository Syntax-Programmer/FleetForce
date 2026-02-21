"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus } from "lucide-react"
import { vehicles, drivers, recentTrips, type Trip } from "@/lib/mock-data"
import { useState } from "react"

function StatusBadge({ status }: { status: Trip["status"] }) {
  const styles = {
    Available: "bg-success/15 text-success border-success/20",
    "On Trip": "bg-primary/15 text-primary border-primary/20",
    Maintenance: "bg-warning/15 text-warning border-warning/20",
    Completed: "bg-muted text-muted-foreground border-border",
  }

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  )
}

export function TripsPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Trips</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage fleet trips
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="size-4" />
          {showForm ? "Hide Form" : "Create Trip"}
        </Button>
      </div>

      {/* Create Trip Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-card-foreground">Create New Trip</CardTitle>
            <CardDescription>Fill in the trip details below to dispatch a vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle</Label>
                <Select>
                  <SelectTrigger id="vehicle" className="w-full">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles
                      .filter((v) => v.status === "Available")
                      .map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.id} - {v.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="driver">Driver</Label>
                <Select>
                  <SelectTrigger id="driver" className="w-full">
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers
                      .filter((d) => d.status === "Off Duty")
                      .map((d) => (
                        <SelectItem key={d.name} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input id="distance" type="number" placeholder="Enter distance" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo Weight (kg)</Label>
                <Input id="cargo" type="number" placeholder="Enter cargo weight" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Used (L)</Label>
                <Input id="fuel" type="number" placeholder="Enter fuel used" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenses">Expenses ($)</Label>
                <Input id="expenses" type="number" placeholder="Enter expenses" />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <Button type="submit" className="w-full sm:w-auto">
                  Submit Trip
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-card-foreground">All Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip ID</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Vehicle ID</TableHead>
                <TableHead className="text-right">Distance</TableHead>
                <TableHead className="text-right">Fuel Used</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium text-foreground">{trip.id}</TableCell>
                  <TableCell>{trip.driver}</TableCell>
                  <TableCell className="font-mono text-xs">{trip.vehicleId}</TableCell>
                  <TableCell className="text-right">{trip.distance}</TableCell>
                  <TableCell className="text-right">{trip.fuelUsed}</TableCell>
                  <TableCell className="text-right">{trip.expenses}</TableCell>
                  <TableCell>
                    <StatusBadge status={trip.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="size-4" />
                      <span className="sr-only">View trip {trip.id}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
