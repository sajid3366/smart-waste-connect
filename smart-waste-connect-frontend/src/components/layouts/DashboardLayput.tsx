'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { DashboardNavbar } from '@/components/Dashboard/DashboardNavbar/DashboardNavbar'
import { DashboardSidebar } from '@/components/Dashboard/DashboardSidebar/DashboardSidebar'
import { UserRole } from '@/config/sidebarMenus'
import authService from '@/services/authService'

interface UserProps {
  full_name: string
  image?: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [role, setRole] = useState<UserRole | null>(null)
  const [user, setUser] = useState<UserProps | null>(null)

  useEffect(() => {
    const savedRole = Cookies.get('role') as UserRole
    setRole(savedRole || null)
  }, [])

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const res = await authService.getCurrentUserProfile()
      setUser(res.data.user)
    } catch (error) {
      console.error('Error fetching current user profile:', error)
    }
  }

  if (!role) return null

  return (
    <div className='flex h-screen overflow-hidden bg-[#f0f4f0] text-gray-800'>
      <DashboardSidebar role={role} />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <DashboardNavbar user={user} />

        <main className='flex-1 overflow-y-auto p-2'>
          {children}
        </main>
      </div>
    </div>
  )
}