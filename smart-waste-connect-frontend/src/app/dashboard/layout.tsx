// app/dashboard/layout.tsx
'use client'

import DashboardLayout from "@/components/layouts/DashboardLayput"


export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}