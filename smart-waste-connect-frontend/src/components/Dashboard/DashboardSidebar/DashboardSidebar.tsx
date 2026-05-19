// components/Dashboard/DashboardSidebar/DashboardSidebar.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import wasteLogo from '../../../../public/images/smart-waste-small-logo.png'
import { sidebarMenus, UserRole } from '@/config/sidebarMenus'

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()
  const menus = sidebarMenus[role] || []

  return (
    <div className="w-[220px] min-h-screen bg-[#2d5a35] flex flex-col justify-between py-6 shadow-xl">
      {/* Logo */}
      <div>
        <div className="flex justify-center mb-8">
          <Image src={wasteLogo} alt="waste-logo" width={72} height={72} />
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 px-3">
          {menus.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all md:text-base
                  ${isActive
                    ? "bg-[#7FC155] text-white shadow-md"
                    : "text-green-100 hover:bg-white/10"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

     
    </div>
  )
}