'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import wasteLogo from '../../../../public/images/smart-waste-small-logo.png'
import { sidebarMenus, UserRole, MenuItem } from '@/config/sidebarMenus'

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()
  const menus = sidebarMenus[role] || []

  // Track which parent menus are open by label
  // Auto-open any parent whose child matches the current path
  const getInitialOpen = () => {
    const open: Record<string, boolean> = {}
    menus.forEach((item) => {
      if (item.children?.some((c) => pathname.startsWith(c.href))) {
        open[item.label] = true
      }
    })
    return open
  }

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(getInitialOpen)

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => {
      const isCurrentlyOpen = prev[label]
      // Close all, then open the clicked one (unless it was already open)
      const allClosed: Record<string, boolean> = {}
      menus.forEach((item) => { allClosed[item.label] = false })
      return isCurrentlyOpen ? allClosed : { ...allClosed, [label]: true }
    })
  }

  return (
    <div className="w-[220px] h-screen flex-shrink-0 bg-[#2d5a35] flex flex-col py-6 shadow-xl overflow-y-auto">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Image src={wasteLogo} alt="waste-logo" width={72} height={72} />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {menus.map((item) => {
          const Icon = item.icon
          const hasChildren = item.children && item.children.length > 0
          const isOpen = openMenus[item.label]
          const isParentActive =
            item.href && !hasChildren
              ? pathname === item.href
              : item.children?.some((c) => pathname.startsWith(c.href))

          if (hasChildren) {
            return (
              <div key={item.label}>
                {/* Parent toggle button */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isParentActive
                      ? 'bg-white/15 text-white'
                      : 'text-green-100 hover:bg-white/10'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-white/15 pl-3 pb-1">
                    {item.children!.map((child) => {
                      const isChildActive = pathname === child.href
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all
                            ${isChildActive
                              ? 'bg-[#7FC155] text-white shadow-md'
                              : 'text-green-200 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          }

          // Regular flat link
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isParentActive
                  ? 'bg-[#7FC155] text-white shadow-md'
                  : 'text-green-100 hover:bg-white/10'
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}