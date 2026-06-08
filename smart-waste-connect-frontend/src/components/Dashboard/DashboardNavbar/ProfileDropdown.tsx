'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { User, Settings, LogOut } from 'lucide-react'
import { removeToken } from '@/utils/tokenStorage'
import authService from '@/services/authService'
import toast from 'react-hot-toast'
import ProfileModal from '@/components/Modals/ProfileModal'
import SettingModal from '@/components/Modals/SettingModal'


interface UserProps {
  _id?: string
  full_name: string
  address?: string
  email?: string
  role?: string
  phone?: string
  profile_pic?: string
  image?: string
  createdAt?: string
}

interface ProfileDropdownProps {
  user: UserProps | null
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserProps | null>(user)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  console.log(user,   'user')

  useEffect(() => { setCurrentUser(user) }, [user])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      const res = await authService.logout()
      if (res.status === 200) {
        toast.success('Successfully logged out')
        removeToken()
        setOpen(false)
        router.push('/login')
      }
    } catch {
      toast.error('Failed to log out')
    }
  }

  const avatarSrc = currentUser?.profile_pic || currentUser?.image || null

  return (
    <>
      <div className='relative' ref={dropdownRef}>
        {/* Trigger */}
        <button onClick={() => setOpen((p) => !p)} className='flex items-center gap-2 group focus:outline-none'>
          <div className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30 group-hover:ring-[#7FC155] transition-all duration-200'>
            {avatarSrc ? (
              <Image src={avatarSrc} alt='profile' width={40} height={40} className='object-cover w-full h-full' />
            ) : (
              <div className='w-full h-full bg-[#7FC155] flex items-center justify-center'>
                <User size={20} className='text-white' />
              </div>
            )}
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className='absolute -right-3 top-[calc(100%+12px)] w-56 rounded-2xl overflow-hidden shadow-2xl z-50 border border-white/10 bg-[#1e3d24] animate-in fade-in slide-in-from-top-2 duration-150'>
            {/* User info */}
            <div className='px-4 py-3 border-b border-white/10 bg-[#2d5a35]'>
              <div className='flex items-center gap-3'>
                <div className='w-9 h-9 rounded-full overflow-hidden shrink-0 ring-2 ring-[#7FC155]/50'>
                  {avatarSrc ? (
                    <Image src={avatarSrc} alt='profile' width={36} height={36} className='object-cover w-full h-full' />
                  ) : (
                    <div className='w-full h-full bg-[#7FC155] flex items-center justify-center'>
                      <User size={16} className='text-white' />
                    </div>
                  )}
                </div>
                <div className='min-w-0'>
                  <p className='text-white text-sm font-semibold truncate'>{currentUser?.full_name || 'User'}</p>
                  {currentUser?.role && (
                    <p className='text-[#7FC155] text-[11px] font-medium capitalize'>{currentUser.role}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className='py-1.5'>
              <button
                onClick={() => { setOpen(false); setProfileOpen(true) }}
                className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-100 hover:bg-white/10 hover:text-white transition-colors duration-150 group'
              >
                <span className='text-[#7FC155] group-hover:scale-110 transition-transform duration-150'><User size={15} /></span>
                Profile
              </button>
              <button
                onClick={() => { setOpen(false); setSettingOpen(true) }}
                className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-100 hover:bg-white/10 hover:text-white transition-colors duration-150 group'
              >
                <span className='text-[#7FC155] group-hover:scale-110 transition-transform duration-150'><Settings size={15} /></span>
                Settings
              </button>
            </div>

            {/* Logout */}
            <div className='border-t border-white/10 py-1.5'>
              <button
                onClick={handleLogout}
                className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150 group'
              >
                <span className='group-hover:scale-110 transition-transform duration-150'><LogOut size={15} /></span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={currentUser as any}
        onUpdate={(updated) => setCurrentUser(updated)}
      />
      <SettingModal
        open={settingOpen}
        onClose={() => setSettingOpen(false)}
      />
    </>
  )
}