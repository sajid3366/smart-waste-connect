import { DashboardNavbar } from "@/components/Dashboard/DashboardNavbar/DashboardNavbar"
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar/DashboardSidebar"

export default function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen text-white bg-[#386641E3]">
      {/* Sidebar (Left) */}
      <DashboardSidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <DashboardNavbar />
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
