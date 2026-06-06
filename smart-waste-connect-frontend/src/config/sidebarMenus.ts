// config/sidebarMenus.ts
import {
  LayoutDashboard,
  Truck,
  ShoppingCart,
  Users,
  CreditCard,
  History,
  Briefcase,
} from "lucide-react"

export type UserRole = "admin" | "household" | "driver" | "buyer"

export interface MenuItem {
  label: string
  href?: string
  icon: React.ElementType
  children?: { label: string; href: string }[]
}

export const sidebarMenus: Record<UserRole, MenuItem[]> = {
  admin: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  
    {
      label: "Household User",
      icon: Users,
      href: "/dashboard/household-users",
      children: [
        { label: "All Users", href: "/dashboard/household-users" },
        { label: "Pickup Requests", href: "/dashboard/household-users/pickup-requests" },
      ],
    },
    {
      label: "Buyer",
      icon: ShoppingCart,
      href: "/dashboard/buyers",
      children: [
        { label: "All Buyers", href: "/dashboard/buyers" },
        { label: "Orders", href: "/dashboard/buyers/orders" },
      ],
    },
    {
      label: "Driver",
      icon: Truck,
      href: "/dashboard/drivers",
      children: [
        { label: "All Drivers", href: "/dashboard/drivers" },
        { label: "Assignments", href: "/dashboard/drivers/assignments" },
      ],
    },
  ],
  household: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Pickup History", href: "/dashboard/pickup-history", icon: History },
    { label: "Request Pickups", href: "/dashboard/request-pickups", icon: Truck },
    { label: "Payment", href: "/dashboard/payment", icon: CreditCard },
  ],
  driver: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Assigned Pickups", href: "/dashboard/assigned-pickups", icon: Truck },
    { label: "Salary", href: "/dashboard/salary", icon: CreditCard },
  ],
  buyer: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Waste Order", href: "/dashboard/waste-order", icon: ShoppingCart },
    { label: "Payment", href: "/dashboard/payment", icon: CreditCard },
  ],
}