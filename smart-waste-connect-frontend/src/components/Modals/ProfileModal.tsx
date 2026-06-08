'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, User, Camera, Loader2, Phone, MapPin, Mail, Shield } from 'lucide-react'
import axiosInstance from '@/hooks/useAxios'
import toast from 'react-hot-toast'
import authService from '@/services/authService'

interface UserData {
  _id: string
  full_name: string
  address: string
  email: string
  role: string
  phone: string
  profile_pic?: string
  createdAt: string
}

interface ProfileModalProps {
  open: boolean
  onClose: () => void
  user: UserData | null
  onUpdate: (updated: UserData) => void
}

export default function ProfileModal({ open, onClose, user, onUpdate }: ProfileModalProps) {
  const [form, setForm] = useState({ full_name: '', address: '', email: '', phone: '' })
  const [preview, setPreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      setForm({
        full_name: user.full_name || '',
        address: user.address || '',
        email: user.email || '',
        phone: user.phone || '',
      })
      setPreview(user.profile_pic || null)
    }
  }, [user])

  if (!open) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('full_name', form.full_name)
      formData.append('address', form.address)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      if (imageFile) formData.append('profile_pic', imageFile)

      const res = await authService.updateProfile(formData)
      toast.success('Profile updated successfully')
      onUpdate(res.data.user)
      onClose()
    } catch (error: any) {
       toast.error(error?.response?.data?.message ||  error?.response?.data?.error || 'Failed to update profile')
      // toast.error( 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 ">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[#2d5a35] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">My Profile</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Avatar upload */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#e8f5e9] bg-[#e8f5e9]">
                {preview ? (
                  <Image src={preview} alt="profile" width={96} height={96} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#e8f5e9]">
                    <User size={36} className="text-[#2d5a35]" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#7FC155] rounded-full flex items-center justify-center shadow-md hover:bg-[#2d5a35] transition-colors"
              >
                <Camera size={14} className="text-white" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>
          <p className="text-center text-xs text-gray-400">Max 5MB · JPG, PNG, WEBP</p>

          {/* Role badge (read-only) */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 bg-[#e8f5e9] text-[#2d5a35] text-xs font-semibold px-3 py-1 rounded-full capitalize">
              <Shield size={12} /> {user?.role}
            </span>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <Field
              icon={<User size={15} />}
              label="Full Name"
              value={form.full_name}
              onChange={(v) => setForm((p) => ({ ...p, full_name: v }))}
            />
            <Field
              icon={<Mail size={15} />}
              label="Email"
              value={form.email}
              type="email"
              onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            />
            <Field
              icon={<Phone size={15} />}
              label="Phone"
              value={form.phone}
              type="tel"
              onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
            />
            <Field
              icon={<MapPin size={15} />}
              label="Address"
              value={form.address}
              onChange={(v) => setForm((p) => ({ ...p, address: v }))}
              textarea
            />
          </div>

          {/* Member since */}
          <p className="text-center text-xs text-gray-400">
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#2d5a35] text-white text-sm font-semibold hover:bg-[#7FC155] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  icon, label, value, onChange, type = 'text', textarea = false,
}: {
  icon: React.ReactNode; label: string; value: string
  onChange: (v: string) => void; type?: string; textarea?: boolean
}) {
  const base = "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#7FC155] focus:ring-1 focus:ring-[#7FC155] transition-all placeholder:text-gray-400"
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
        <span className="text-[#7FC155]">{icon}</span> {label}
      </label>
      {textarea ? (
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-none`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
    </div>
  )
}