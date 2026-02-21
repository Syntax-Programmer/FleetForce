"use client"

import { Card } from "@/components/ui/card"
import {
  Route,
  Truck,
  CircleCheck,
  Fuel,
  DollarSign,
  Gauge,
  Wrench,
  TrendingUp,
} from "lucide-react"
import { kpiData } from "@/lib/mock-data"

const iconMap = {
  route: Route,
  truck: Truck,
  "circle-check": CircleCheck,
  fuel: Fuel,
  dollar: DollarSign,
  gauge: Gauge,
  wrench: Wrench,
  trending: TrendingUp,
} as const

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => {
        const Icon = iconMap[kpi.icon]
        return (
          <Card
            key={kpi.label}
            className="group relative overflow-hidden py-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-4 px-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Icon className="size-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
                <p className="text-xl font-bold text-card-foreground tracking-tight">{kpi.value}</p>
                <p className="text-xs font-medium text-success">{kpi.change}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
