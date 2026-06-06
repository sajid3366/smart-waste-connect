// app/dashboard/page.tsx
'use client'
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { UserRole } from "@/config/sidebarMenus"

// Import each role's dashboard content as a component
import AdminDashboard from "@/components/Dashboard/roles/AdminDashboard"
import HouseholdDashboard from "@/components/Dashboard/roles/HouseholdDashboard"
import DriverDashboard from "@/components/Dashboard/roles/DriverDashboard"
import BuyerDashboard from "@/components/Dashboard/roles/BuyerDashboard"
// import ServiceProviderDashboard from "@/components/Dashboard/roles/ServiceProviderDashboard"

const dashboardMap: Record<UserRole, React.ReactNode> = {
  admin: <AdminDashboard />,
  household: <HouseholdDashboard />,
  driver: <DriverDashboard />,
  buyer: <BuyerDashboard />,
//   serviceprovider: <ServiceProviderDashboard />,
}

export default function DashboardPage() {
  const [role, setRole] = useState<UserRole | null>(null)

  useEffect(() => {
    const savedRole = Cookies.get('role') as UserRole
    setRole(savedRole || null)
  }, [])

  if (!role) return <div>Loading...</div>

  return <>{dashboardMap[role]}</>
}