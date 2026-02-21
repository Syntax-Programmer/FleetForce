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
import { Star } from "lucide-react"
import { drivers } from "@/lib/mock-data"

export function DriversPage() {
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
          <CardTitle className="text-sm font-semibold text-card-foreground">All Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>License Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Vehicle</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.name}>
                  <TableCell className="font-medium text-foreground">{driver.name}</TableCell>
                  <TableCell className="text-muted-foreground">{driver.phone}</TableCell>
                  <TableCell className="text-muted-foreground">{driver.licenseExpiry}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        driver.status === "On Duty"
                          ? "bg-success/15 text-success border-success/20"
                          : "bg-muted text-muted-foreground border-border"
                      }
                    >
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{driver.assignedVehicle}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5 fill-warning text-warning" />
                      <span className="text-sm font-medium text-card-foreground">{driver.rating}</span>
                    </span>
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
