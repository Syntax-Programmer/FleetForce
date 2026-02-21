export const kpiData = [
  { label: "Total Trips", value: "1,284", icon: "route" as const, change: "+12.5%" },
  { label: "Active Vehicles", value: "42", icon: "truck" as const, change: "+3" },
  { label: "Available Vehicles", value: "18", icon: "circle-check" as const, change: "-2" },
  { label: "Fuel Efficiency", value: "8.4 km/l", icon: "fuel" as const, change: "+0.3" },
  { label: "Cost per KM", value: "$2.15", icon: "dollar" as const, change: "-$0.12" },
  { label: "Vehicle Utilization", value: "78%", icon: "gauge" as const, change: "+5%" },
  { label: "Maintenance Cost", value: "$24,500", icon: "wrench" as const, change: "-$1,200" },
  { label: "ROI", value: "142%", icon: "trending" as const, change: "+8%" },
]

export const tripsPerVehicle = [
  { vehicle: "TRK-001", trips: 45 },
  { vehicle: "TRK-002", trips: 38 },
  { vehicle: "TRK-003", trips: 52 },
  { vehicle: "TRK-004", trips: 29 },
  { vehicle: "TRK-005", trips: 41 },
  { vehicle: "TRK-006", trips: 35 },
  { vehicle: "TRK-007", trips: 48 },
]

export const distanceOverTime = [
  { month: "Jan", distance: 12400 },
  { month: "Feb", distance: 13200 },
  { month: "Mar", distance: 11800 },
  { month: "Apr", distance: 15600 },
  { month: "May", distance: 14200 },
  { month: "Jun", distance: 16800 },
  { month: "Jul", distance: 17200 },
  { month: "Aug", distance: 15400 },
  { month: "Sep", distance: 18100 },
  { month: "Oct", distance: 16500 },
  { month: "Nov", distance: 19200 },
  { month: "Dec", distance: 20100 },
]

export const vehicleStatusDistribution = [
  { status: "Available", count: 18, fill: "var(--color-success)" },
  { status: "On Trip", count: 24, fill: "var(--color-chart-1)" },
  { status: "Maintenance", count: 8, fill: "var(--color-warning)" },
  { status: "Idle", count: 10, fill: "var(--color-muted-foreground)" },
]

export type Trip = {
  id: string
  driver: string
  vehicleId: string
  distance: string
  fuelUsed: string
  expenses: string
  status: "Completed" | "On Trip" | "Available" | "Maintenance"
}

export const recentTrips: Trip[] = [
  { id: "TRP-2841", driver: "Marcus Johnson", vehicleId: "TRK-001", distance: "245 km", fuelUsed: "28.5 L", expenses: "$142.00", status: "Completed" },
  { id: "TRP-2842", driver: "Sarah Chen", vehicleId: "TRK-003", distance: "312 km", fuelUsed: "36.2 L", expenses: "$198.50", status: "On Trip" },
  { id: "TRP-2843", driver: "David Park", vehicleId: "TRK-005", distance: "189 km", fuelUsed: "22.1 L", expenses: "$105.75", status: "Completed" },
  { id: "TRP-2844", driver: "Lisa Wang", vehicleId: "TRK-002", distance: "—", fuelUsed: "—", expenses: "—", status: "Maintenance" },
  { id: "TRP-2845", driver: "James Miller", vehicleId: "TRK-007", distance: "478 km", fuelUsed: "55.8 L", expenses: "$287.00", status: "On Trip" },
  { id: "TRP-2846", driver: "Emma Wilson", vehicleId: "TRK-004", distance: "156 km", fuelUsed: "18.3 L", expenses: "$89.25", status: "Completed" },
  { id: "TRP-2847", driver: "Robert Taylor", vehicleId: "TRK-006", distance: "—", fuelUsed: "—", expenses: "—", status: "Available" },
  { id: "TRP-2848", driver: "Ana Rodriguez", vehicleId: "TRK-008", distance: "367 km", fuelUsed: "42.6 L", expenses: "$215.50", status: "Completed" },
]

export type Vehicle = {
  id: string
  name: string
  status: "Available" | "On Trip" | "Maintenance"
  totalKm: string
  maxCapacity: string
  utilization: number
}

export const vehicles: Vehicle[] = [
  { id: "TRK-001", name: "Freightliner Cascadia", status: "Available", totalKm: "124,500 km", maxCapacity: "22,000 kg", utilization: 82 },
  { id: "TRK-002", name: "Volvo VNL 860", status: "Maintenance", totalKm: "98,200 km", maxCapacity: "20,000 kg", utilization: 45 },
  { id: "TRK-003", name: "Kenworth T680", status: "On Trip", totalKm: "156,300 km", maxCapacity: "24,000 kg", utilization: 91 },
  { id: "TRK-004", name: "Peterbilt 579", status: "Available", totalKm: "87,100 km", maxCapacity: "22,000 kg", utilization: 68 },
  { id: "TRK-005", name: "Mack Anthem", status: "On Trip", totalKm: "201,400 km", maxCapacity: "25,000 kg", utilization: 95 },
  { id: "TRK-006", name: "International LT", status: "Available", totalKm: "65,800 km", maxCapacity: "20,000 kg", utilization: 72 },
  { id: "TRK-007", name: "Western Star 5700", status: "On Trip", totalKm: "178,900 km", maxCapacity: "23,000 kg", utilization: 88 },
  { id: "TRK-008", name: "DAF XF", status: "Available", totalKm: "45,200 km", maxCapacity: "21,000 kg", utilization: 55 },
  { id: "TRK-009", name: "Scania R500", status: "Maintenance", totalKm: "134,600 km", maxCapacity: "24,000 kg", utilization: 38 },
]

export type Driver = {
  name: string
  licenseExpiry: string
  status: "On Duty" | "Off Duty"
  assignedVehicle: string
  phone: string
  rating: number
}

export const drivers: Driver[] = [
  { name: "Marcus Johnson", licenseExpiry: "2027-03-15", status: "On Duty", assignedVehicle: "TRK-001", phone: "+1 (555) 0121", rating: 4.8 },
  { name: "Sarah Chen", licenseExpiry: "2026-11-22", status: "On Duty", assignedVehicle: "TRK-003", phone: "+1 (555) 0134", rating: 4.9 },
  { name: "David Park", licenseExpiry: "2027-06-08", status: "Off Duty", assignedVehicle: "TRK-005", phone: "+1 (555) 0147", rating: 4.6 },
  { name: "Lisa Wang", licenseExpiry: "2026-09-30", status: "Off Duty", assignedVehicle: "TRK-002", phone: "+1 (555) 0158", rating: 4.7 },
  { name: "James Miller", licenseExpiry: "2027-01-18", status: "On Duty", assignedVehicle: "TRK-007", phone: "+1 (555) 0169", rating: 4.5 },
  { name: "Emma Wilson", licenseExpiry: "2026-12-05", status: "On Duty", assignedVehicle: "TRK-004", phone: "+1 (555) 0172", rating: 4.9 },
  { name: "Robert Taylor", licenseExpiry: "2027-08-20", status: "Off Duty", assignedVehicle: "TRK-006", phone: "+1 (555) 0183", rating: 4.4 },
  { name: "Ana Rodriguez", licenseExpiry: "2026-07-12", status: "On Duty", assignedVehicle: "TRK-008", phone: "+1 (555) 0194", rating: 4.8 },
]
