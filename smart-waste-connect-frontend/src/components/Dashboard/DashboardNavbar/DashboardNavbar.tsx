'use client'
import { FaRegBell } from 'react-icons/fa'
import ProfileDropdown from './ProfileDropdown'

interface UserProps {
  full_name: string
  image?: string
  role?: string
}

interface DashboardNavbarProps {
  user: UserProps | null
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {
  return (
    <div className='bg-[#2d5a35] w-full h-[70px] shadow-lg flex items-center justify-between px-6 text-white'>
      {/* Left: Welcome */}
      <h1 className='text-xl font-bold tracking-tight'>
        Welcome back,{' '}
        <span className='text-[#7FC155]'>{user?.full_name || 'User'}</span>
      </h1>

      {/* Right: Actions */}
      <div className='flex items-center gap-4'>
        {/* Notification Bell */}
        <button className='w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#7FC155] transition-colors duration-200 relative'>
          <FaRegBell size={18} />
          {/* Optional badge */}
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-[#2d5a35]' />
        </button>

        {/* Profile Dropdown */}
        <ProfileDropdown user={user} />
      </div>
    </div>
  )
}