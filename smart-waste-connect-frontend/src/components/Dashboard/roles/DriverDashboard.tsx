'use client'
import { useEffect, useState } from 'react'
import { Truck, MapPin, CheckCircle, Clock, Navigation, Package, Star } from 'lucide-react'
import axiosInstance from '@/hooks/useAxios'

interface DriverStats {
  todayPickups: { completed: number; pending: number; total: number }
  assignedZones: { zone: string; requests: number }[]
  performance: { rating: number; completionRate: number; totalDeliveries: number }
  upcomingPickups: { id: string; address: string; zone: string; time: string; wasteType: string; status: 'assigned' | 'en-route' | 'completed' }[]
}

export default function DriverDashboard() {
  const [stats, setStats] = useState<DriverStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/driver/dashboard-stats')
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const fallbackStats: DriverStats = {
    todayPickups: { completed: 7, pending: 3, total: 10 },
    assignedZones: [
      { zone: 'Mirpur 10', requests: 5 },
      { zone: 'Mirpur 11', requests: 3 },
      { zone: 'Pallabi', requests: 2 },
    ],
    performance: { rating: 4.8, completionRate: 96, totalDeliveries: 342 },
    upcomingPickups: [
      { id: '#PKP-081', address: '14/A, Block-C, Mirpur 10', zone: 'Mirpur 10', time: '10:30 AM', wasteType: 'Organic', status: 'en-route' },
      { id: '#PKP-082', address: '22, Road-5, Mirpur 11', zone: 'Mirpur 11', time: '11:00 AM', wasteType: 'Recyclable', status: 'assigned' },
      { id: '#PKP-083', address: '8/B, Pallabi', zone: 'Pallabi', time: '11:45 AM', wasteType: 'Mixed', status: 'assigned' },
      { id: '#PKP-080', address: '5, Section 6, Mirpur', zone: 'Mirpur 10', time: '09:00 AM', wasteType: 'Hazardous', status: 'completed' },
    ],
  }

  const data = stats || fallbackStats

  if (loading) return <DashboardSkeleton />

  const completionPct = Math.round((data.todayPickups.completed / (data.todayPickups.total || 1)) * 100)

  return (
    <div className="space-y-6 bg-[#e8f5e9] p-4">
      <div>
        <h2 className="text-2xl font-bold text-[#2d5a35]">Driver Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Smart Waste Connect LTD.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<CheckCircle size={22} />}
          label="Completed Today"
          value={String(data.todayPickups.completed)}
          sub={`of ${data.todayPickups.total} assigned`}
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<Clock size={22} />}
          label="Pending Pickups"
          value={String(data.todayPickups.pending)}
          sub="Remaining today"
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
        <StatCard
          icon={<Star size={22} />}
          label="Driver Rating"
          value={`${data.performance.rating} ★`}
          sub="Average score"
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<Truck size={22} />}
          label="Total Deliveries"
          value={String(data.performance.totalDeliveries)}
          sub={`${data.performance.completionRate}% completion rate`}
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
      </div>

      {/* Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's Progress */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Navigation size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Today's Progress</h3>
          </div>

          {/* Circular-style progress */}
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e8f5e9" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#7FC155" strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPct / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#2d5a35]">{completionPct}%</span>
                <span className="text-xs text-gray-400">Done</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex justify-between items-center bg-[#f0fdf4] rounded-lg px-3 py-2">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-bold text-[#2d5a35]">{data.todayPickups.completed}</span>
              </div>
              <div className="flex justify-between items-center bg-[#fef9ec] rounded-lg px-3 py-2">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-bold text-yellow-600">{data.todayPickups.pending}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-bold text-gray-700">{data.todayPickups.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Zones */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Assigned Zones</h3>
          </div>
          <div className="space-y-3">
            {data.assignedZones.map((z, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{z.zone}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2d5a35] rounded-full"
                      style={{ width: `${Math.min((z.requests / 10) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#2d5a35] w-5 text-right">{z.requests}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Performance badges */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3">Performance</p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[#e8f5e9] text-[#2d5a35] text-xs font-semibold px-3 py-1 rounded-full">
                ★ {data.performance.rating} Rating
              </span>
              <span className="bg-[#e8f5e9] text-[#2d5a35] text-xs font-semibold px-3 py-1 rounded-full">
                {data.performance.completionRate}% Completion
              </span>
              <span className="bg-[#e8f5e9] text-[#2d5a35] text-xs font-semibold px-3 py-1 rounded-full">
                {data.performance.totalDeliveries} Total Trips
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Pickups Table */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Package size={18} className="text-[#7FC155]" />
          <h3 className="font-semibold text-gray-700">Today's Pickup Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left pb-2 font-medium">ID</th>
                <th className="text-left pb-2 font-medium">Address</th>
                <th className="text-left pb-2 font-medium">Zone</th>
                <th className="text-left pb-2 font-medium">Time</th>
                <th className="text-left pb-2 font-medium">Waste</th>
                <th className="text-left pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.upcomingPickups.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="py-3 text-gray-700 max-w-[180px] truncate">{p.address}</td>
                  <td className="py-3 text-gray-500 text-xs">{p.zone}</td>
                  <td className="py-3 text-gray-600 font-medium">{p.time}</td>
                  <td className="py-3 text-gray-500 text-xs">{p.wasteType}</td>
                  <td className="py-3">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: 'assigned' | 'en-route' | 'completed' }) {
  const map = {
    completed: { bg: 'bg-green-50', text: 'text-green-700', icon: <CheckCircle size={12} />, label: 'Completed' },
    'en-route': { bg: 'bg-blue-50', text: 'text-blue-600', icon: <Navigation size={12} />, label: 'En Route' },
    assigned: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: <Clock size={12} />, label: 'Assigned' },
  }
  const s = map[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      {s.icon} {s.label}
    </span>
  )
}

function StatCard({ icon, label, value, sub, color, iconColor }: {
  icon: React.ReactNode; label: string; value: string; sub: string; color: string; iconColor: string
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
        {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-2xl p-5 h-24 border border-gray-100" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 h-48 border border-gray-100" />
        <div className="bg-white rounded-2xl p-5 h-48 border border-gray-100" />
      </div>
    </div>
  )
}