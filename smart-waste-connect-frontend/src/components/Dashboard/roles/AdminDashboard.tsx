'use client'
import { useEffect, useState } from 'react'
import { Recycle, Users, Truck, ShoppingBag, TrendingUp, MapPin, AlertCircle } from 'lucide-react'
import axiosInstance from '@/hooks/useAxios'

interface AdminStats {
  totalWaste: { type: string; amount: string }[]
  pickupRequestsToday: { zone: string; count: number }[]
  totalServiceRequests: { label: string; value: string }[]
  householdUsers: { daily: number; weekly: number }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/admin/dashboard-stats')
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [axiosInstance])

  if (loading) return <DashboardSkeleton />

  return (
    <div className="space-y-6  bg-[#e8f5e9] p-4">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#2d5a35]">Admin Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Smart Waste Connect LTD.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<Recycle size={22} />}
          label="Total Waste Collected"
          value={stats?.totalWaste?.[0]?.amount || '—'}
          sub={stats?.totalWaste?.[0]?.type || 'Organic Waste'}
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<Truck size={22} />}
          label="Pickup Requests Today"
          value={String(stats?.pickupRequestsToday?.reduce((a, b) => a + b.count, 0) || 0)}
          sub="Across all zones"
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
        <StatCard
          icon={<Users size={22} />}
          label="Household Users"
          value={`${stats?.householdUsers?.daily || 0} Daily`}
          sub={`${stats?.householdUsers?.weekly || 0} Weekly`}
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<ShoppingBag size={22} />}
          label="Service Requests"
          value={stats?.totalServiceRequests?.[0]?.value || 'None'}
          sub="Total open requests"
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pickup Requests by Zone */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Pickup Requests by Zone</h3>
          </div>
          <div className="space-y-3">
            {(stats?.pickupRequestsToday || [
              { zone: 'Mirpur 10', count: 11 },
              { zone: 'Mirpur 11', count: 8 },
            ]).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.zone}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7FC155] rounded-full"
                      style={{ width: `${Math.min((item.count / 20) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#2d5a35] w-6 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Household Daily/Weekly */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Household User Activity</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-[#f0fdf4] rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-[#2d5a35]">{stats?.householdUsers?.daily || 10}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">Daily</p>
            </div>
            <div className="bg-[#e8f5e9] rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-[#2d5a35]">{stats?.householdUsers?.weekly || 5}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">Weekly</p>
            </div>
          </div>

          {/* Total Waste Types */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3">Waste Breakdown</p>
            <div className="flex flex-wrap gap-2">
              {(stats?.totalWaste || [{ type: 'Organic-waste', amount: '100 Ton' }]).map((w, i) => (
                <span key={i} className="bg-[#e8f5e9] text-[#2d5a35] text-xs font-semibold px-3 py-1 rounded-full">
                  {w.type}: {w.amount}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={18} className="text-[#7FC155]" />
          <h3 className="font-semibold text-gray-700">Total Service Requests</h3>
        </div>
        <div className="flex items-center gap-3">
          {(stats?.totalServiceRequests || [{ label: 'Request', value: 'None' }]).map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{r.label}:</span>
              <span className={`font-bold ${r.value === 'None' ? 'text-gray-400' : 'text-[#2d5a35]'}`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, color, iconColor }: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
  color: string
  iconColor: string
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
      <div className={`${color} ${iconColor} p-3 rounded-xl`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-xl font-bold text-gray-800 mt-0.5">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 h-24 border border-gray-100" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 h-48 border border-gray-100" />
        <div className="bg-white rounded-2xl p-5 h-48 border border-gray-100" />
      </div>
    </div>
  )
}