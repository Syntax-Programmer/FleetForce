"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { recentTrips, type Trip } from "@/lib/mock-data"

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

export function RecentTripsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-card-foreground">Recent Trips</CardTitle>
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
  )
}
