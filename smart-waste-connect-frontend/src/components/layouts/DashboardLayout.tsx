// components/layouts/DashboardLayout.tsx
import React from "react";
import Link from "next/link";
import { Bell, LogOut } from "lucide-react";
import Image from "next/image";

export function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { name: string; role: string; avatar: string };
}) {
  return (
    <div className="flex w-full min-h-screen bg-[#e9f4ec]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1f5033] text-white p-6 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-green-500 w-12 h-12 rounded-xl"></div>
            <h2 className="text-xl font-semibold">Smart Waste</h2>
          </div>

          {/* Menu */}
          <nav className="space-y-4">
            <Link href="/dashboard" className="block hover:text-gray-300">
              Dashboard
            </Link>
            {user.role === "admin" && (
              <>
                <Link href="/service-providers" className="block hover:text-gray-300">
                  Service Providers
                </Link>
                <Link href="/household" className="block hover:text-gray-300">
                  Household Users
                </Link>
                <Link href="/buyers" className="block hover:text-gray-300">
                  Buyers
                </Link>
                <Link href="/drivers" className="block hover:text-gray-300">
                  Drivers
                </Link>
              </>
            )}
            {user.role === "buyer" && (
              <>
                <Link href="/orders" className="block hover:text-gray-300">
                  Waste Orders
                </Link>
                <Link href="/payment" className="block hover:text-gray-300">
                  Payment
                </Link>
              </>
            )}
            {user.role === "driver" && (
              <>
                <Link href="/assigned-pickups" className="block hover:text-gray-300">
                  Assigned Pickups
                </Link>
                <Link href="/salary" className="block hover:text-gray-300">
                  Salary
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Logout */}
        <Link href="/logout" className="flex items-center gap-2 text-white">
          <LogOut size={18} /> Logout
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-[#1f5033]">
            Welcome back {user.name}
          </h1>
          <div className="flex items-center gap-4">
            <Bell className="text-[#1f5033]" />
            <Image
              src={user.avatar}
              className="w-10 h-10 rounded-full border"
              alt="user"
              width={10}
              height={10}
            />
          </div>
        </header>

        {/* Dynamic children */}
        <main>{children}</main>
      </div>
    </div>
  );
}

// Example of Admin layout file using this shared component
// app/admin/layout.tsx
// import DashboardLayout from "@/components/layouts/DashboardLayout";

export  function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      user={{
        name: "Ahtesham Sajid",
        role: "admin",
        avatar: "/admin-avatar.png",
      }}
    >
      {children}
    </DashboardLayout>
  );
}

// app/admin/page.tsx
export function Page() {
  return <div className="p-4 bg-white rounded-xl shadow">Welcome to the Admin Dashboard</div>;
}

// Household Layout
// app/household/layout.tsx
export function HouseholdDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      user={{ name: "Household User", role: "household", avatar: "/user.png" }}
    >
      {children}
    </DashboardLayout>
  );
}

// Driver Layout
// app/driver/layout.tsx
export function DriverDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      user={{ name: "Driver", role: "driver", avatar: "/driver.png" }}
    >
      {children}
    </DashboardLayout>
  );
}
