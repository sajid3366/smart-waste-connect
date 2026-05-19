// config/sidebarMenus.ts
import { LayoutDashboard, Truck, DollarSign, History, ShoppingCart, CreditCard, Users, Settings } from "lucide-react"

export type UserRole = "admin"

export const sidebarMenus: Record<UserRole, { label: string; href: string; icon: React.ElementType }[]> = {
  admin: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Household Users", href: "/dashboard/household-users", icon: Users },
    { label: "Buyers", href: "/dashboard/buyers", icon: ShoppingCart },
    { label: "Drivers", href: "/dashboard/drivers", icon: Truck },
  ],
//   household: [
//     { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//     { label: "Pickup History", href: "/dashboard/pickup-history", icon: History },
//     { label: "Request Pickups", href: "/dashboard/request-pickups", icon: Truck },
//     { label: "Payment", href: "/dashboard/payment", icon: CreditCard },
//   ],
//   driver: [
//     { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//     { label: "Assigned Pickups", href: "/dashboard/assigned-pickups", icon: Truck },
//     { label: "Salary", href: "/dashboard/salary", icon: DollarSign },
//   ],
//   buyer: [
//     { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//     { label: "Waste Order", href: "/dashboard/waste-order", icon: ShoppingCart },
//     { label: "Payment", href: "/dashboard/payment", icon: CreditCard },
//   ],
}