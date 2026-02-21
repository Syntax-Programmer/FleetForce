"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/app-navbar"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { VehiclesPage } from "@/components/pages/vehicles-page"
import { DriversPage } from "@/components/pages/drivers-page"
import { TripsPage } from "@/components/pages/trips-page"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, BarChart3, Settings } from "lucide-react"

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  vehicles: "Vehicles",
  drivers: "Drivers",
  trips: "Trips",
  maintenance: "Maintenance",
  analytics: "Analytics",
  settings: "Settings",
}

function PlaceholderPage({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-1 items-center justify-center py-20">
      <Card className="max-w-sm w-full text-center">
        <CardHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-6" />
          </div>
          <CardTitle className="mt-4 text-card-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This section is under development. Check back soon for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function FleetForceDashboard() {
  const [activePage, setActivePage] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />
      case "vehicles":
        return <VehiclesPage />
      case "drivers":
        return <DriversPage />
      case "trips":
        return <TripsPage />
      case "maintenance":
        return <PlaceholderPage title="Maintenance" icon={Wrench} />
      case "analytics":
        return <PlaceholderPage title="Analytics" icon={BarChart3} />
      case "settings":
        return <PlaceholderPage title="Settings" icon={Settings} />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless open */}
      <div className={cn("hidden lg:block", mobileMenuOpen && "!block")}>
        <AppSidebar
          activePage={activePage}
          onNavigate={(page) => {
            setActivePage(page)
            setMobileMenuOpen(false)
          }}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"
        )}
      >
        <AppNavbar
          pageTitle={pageTitles[activePage] || "Dashboard"}
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="flex-1 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
