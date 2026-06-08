'use client'
import { useState } from 'react'
import { X, Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react'
import axiosInstance from '@/hooks/useAxios'
import toast from 'react-hot-toast'
import { removeToken } from '@/utils/tokenStorage'
import { useRouter } from 'next/navigation'
import authService from '@/services/authService'
import axios from 'axios'

interface SettingModalProps {
  open: boolean
  onClose: () => void
}

type Tab = 'password' | 'account'

export default function SettingModal ({ open, onClose }: SettingModalProps) {
  const [tab, setTab] = useState<Tab>('password')

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
      <div className='bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='bg-[#2d5a35] px-6 py-4 flex items-center justify-between'>
          <h2 className='text-white font-bold text-lg'>Settings</h2>
          <button
            onClick={onClose}
            className='text-white/70 hover:text-white transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className='flex gap-3 p-5 pb-0'>
          <TabBtn
            label='Password Settings'
            active={tab === 'password'}
            onClick={() => setTab('password')}
          />
          <TabBtn
            label='Account Settings'
            active={tab === 'account'}
            onClick={() => setTab('account')}
          />
        </div>

        {/* Panel */}
        <div className='p-5'>
          {tab === 'password' ? (
            <PasswordPanel onClose={onClose} />
          ) : (
            <AccountPanel onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}

function TabBtn ({
  label,
  active,
  onClick
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
        ${
          active
            ? 'bg-[#2d5a35] text-white shadow-md'
            : 'border border-[#2d5a35]/30 text-[#2d5a35] hover:bg-[#e8f5e9]'
        }`}
    >
      {label}
    </button>
  )
}

/* ── Password Panel ── */
function PasswordPanel ({ onClose }: { onClose: () => void }) {
  const [fields, setFields] = useState({
    current: '',
    newPass: '',
    confirm: ''
  })
  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false
  })
  const [loading, setLoading] = useState(false)

  const toggle = (key: keyof typeof show) =>
    setShow(p => ({ ...p, [key]: !p[key] }))

  const handleSubmit = async () => {
    if (!fields.current || !fields.newPass || !fields.confirm) {
      toast.error('All fields are required')
      return
    }
    if (fields.newPass !== fields.confirm) {
      toast.error('Passwords do not match')
      return
    }
    if (fields.newPass.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await authService.changePassword(fields.current, fields.newPass)
      toast.success('Password changed successfully')
      setFields({ current: '', newPass: '', confirm: '' })
      onClose()
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            err.response?.data?.error ||
            'Failed to change password'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='bg-[#e8f5e9] rounded-xl p-4'>
        <h3 className='text-[#2d5a35] font-bold text-base mb-4'>
          Set New Password
        </h3>

        <PasswordField
          label='Current Password'
          required
          value={fields.current}
          show={show.current}
          onChange={v => setFields(p => ({ ...p, current: v }))}
          onToggle={() => toggle('current')}
          placeholder='Enter your current password'
        />
        <PasswordField
          label='New Password'
          required
          value={fields.newPass}
          show={show.newPass}
          onChange={v => setFields(p => ({ ...p, newPass: v }))}
          onToggle={() => toggle('newPass')}
          placeholder='Enter your new password'
        />
        <PasswordField
          label='Confirm New Password'
          required
          value={fields.confirm}
          show={show.confirm}
          onChange={v => setFields(p => ({ ...p, confirm: v }))}
          onToggle={() => toggle('confirm')}
          placeholder='Confirm your new password'
          last
        />
      </div>

      <div className='flex gap-3'>
        <button
          onClick={onClose}
          className='flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors'
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className='flex-1 py-2.5 rounded-xl bg-[#2d5a35] text-white text-sm font-semibold hover:bg-[#7FC155] transition-colors disabled:opacity-60 flex items-center justify-center gap-2'
        >
          {loading && <Loader2 size={15} className='animate-spin' />}
          Confirm Change
        </button>
      </div>
    </div>
  )
}

function PasswordField ({
  label,
  value,
  show,
  onChange,
  onToggle,
  placeholder,
  required,
  last = false
}: {
  label: string
  value: string
  show: boolean
  required?: boolean
  last?: boolean
  onChange: (v: string) => void
  onToggle: () => void
  placeholder: string
}) {
  return (
    <div className={last ? '' : 'mb-3'}>
      <label className='text-xs font-semibold text-gray-600 mb-1 block'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='relative'>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className='w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm text-gray-800 focus:outline-none focus:border-[#7FC155] focus:ring-1 focus:ring-[#7FC155] transition-all placeholder:text-gray-400'
        />
        <button
          type='button'
          onClick={onToggle}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  )
}

/* ── Account Panel ── */
function AccountPanel ({ onClose }: { onClose: () => void }) {
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirmed) {
      setConfirmed(true)
      return
    }
    setLoading(true)
    try {
      await axiosInstance.delete('/user/delete-account')
      toast.success('Account deleted')
      removeToken()
      router.push('/login')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            err.response?.data?.error ||
            'Failed to delete account'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      {/* Danger zone card */}
      <div className='border border-red-200 rounded-xl p-4 bg-red-50'>
        <div className='flex items-start gap-3 mb-3'>
          <div className='w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0'>
            <AlertTriangle size={18} className='text-red-500' />
          </div>
          <div>
            <h3 className='font-bold text-red-600 text-sm'>Delete Account</h3>
            <p className='text-xs text-red-400 mt-0.5 leading-relaxed'>
              This action is permanent and cannot be undone. All your data,
              pickup history, and settings will be permanently removed.
            </p>
          </div>
        </div>

        {confirmed && (
          <div className='bg-red-100 border border-red-200 rounded-lg px-3 py-2 mb-3'>
            <p className='text-xs text-red-600 font-medium text-center'>
              ⚠️ Click again to permanently delete your account
            </p>
          </div>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all
            ${
              confirmed
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-white border border-red-300 text-red-500 hover:bg-red-50'
            } disabled:opacity-60`}
        >
          {loading && <Loader2 size={15} className='animate-spin' />}
          {confirmed ? 'Yes, Delete My Account' : 'Delete My Account'}
        </button>
      </div>

      <button
        onClick={() => {
          setConfirmed(false)
          onClose()
        }}
        className='w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors'
      >
        Cancel
      </button>
    </div>
  )
}
