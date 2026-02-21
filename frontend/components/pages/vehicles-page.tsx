"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Truck, MapPin, Weight, Gauge } from "lucide-react"
import { vehicles, type Vehicle } from "@/lib/mock-data"

function VehicleStatusBadge({ status }: { status: Vehicle["status"] }) {
  const styles = {
    Available: "bg-success/15 text-success border-success/20",
    "On Trip": "bg-primary/15 text-primary border-primary/20",
    Maintenance: "bg-warning/15 text-warning border-warning/20",
  }

  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  )
}

export function VehiclesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Fleet Vehicles</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your fleet of {vehicles.length} vehicles
          </p>
        </div>
        <Button>Add Vehicle</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="group overflow-hidden py-0 transition-shadow hover:shadow-md">
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Truck className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{vehicle.id}</p>
                    <p className="text-xs text-muted-foreground">{vehicle.name}</p>
                  </div>
                </div>
                <VehicleStatusBadge status={vehicle.status} />
              </div>

              {/* Stats */}
              <div className="space-y-3 px-5 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-3.5" />
                    Total KM
                  </span>
                  <span className="font-medium text-card-foreground">{vehicle.totalKm}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Weight className="size-3.5" />
                    Max Capacity
                  </span>
                  <span className="font-medium text-card-foreground">{vehicle.maxCapacity}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Gauge className="size-3.5" />
                      Utilization
                    </span>
                    <span className="font-medium text-card-foreground">{vehicle.utilization}%</span>
                  </div>
                  <Progress value={vehicle.utilization} className="h-1.5" />
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border px-5 py-3">
                <Button
                  className="w-full"
                  size="sm"
                  variant={vehicle.status === "Available" ? "default" : "outline"}
                  disabled={vehicle.status !== "Available"}
                >
                  {vehicle.status === "Available" ? "Dispatch" : vehicle.status === "On Trip" ? "Tracking" : "In Maintenance"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
