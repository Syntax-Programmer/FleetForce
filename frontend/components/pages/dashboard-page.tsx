"use client"

import { KpiCards } from "@/components/dashboard/kpi-cards"
import { ChartsSection } from "@/components/dashboard/charts-section"
import { RecentTripsTable } from "@/components/dashboard/recent-trips-table"

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <KpiCards />
      <ChartsSection />
      <RecentTripsTable />
    </div>
  )
}
