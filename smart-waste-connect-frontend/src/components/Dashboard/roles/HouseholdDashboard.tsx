'use client'
import { useEffect, useState } from 'react'
import { Home, Recycle, Calendar, Clock, CheckCircle, AlertCircle, Leaf, TrendingUp } from 'lucide-react'
import axiosInstance from '@/hooks/useAxios'

interface HouseholdStats {
  wasteSubmitted: { type: string; amount: string }[]
  upcomingPickup: { date: string; time: string; zone: string; status: string } | null
  pickupHistory: { id: string; date: string; wasteType: string; amount: string; status: 'collected' | 'missed' | 'pending' }[]
  ecoScore: { score: number; label: string; monthlyKg: number }
  serviceRequests: { label: string; value: string }[]
}

export default function HouseholdDashboard() {
  const [stats, setStats] = useState<HouseholdStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/household/dashboard-stats')
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const fallbackStats: HouseholdStats = {
    wasteSubmitted: [
      { type: 'Organic', amount: '18 kg' },
      { type: 'Recyclable', amount: '6 kg' },
      { type: 'Hazardous', amount: '1 kg' },
    ],
    upcomingPickup: {
      date: 'Jun 08, 2026',
      time: '9:00 AM – 11:00 AM',
      zone: 'Mirpur 10',
      status: 'Scheduled',
    },
    pickupHistory: [
      { id: '#PKP-074', date: 'Jun 01, 2026', wasteType: 'Organic', amount: '5 kg', status: 'collected' },
      { id: '#PKP-065', date: 'May 25, 2026', wasteType: 'Recyclable', amount: '3 kg', status: 'collected' },
      { id: '#PKP-058', date: 'May 18, 2026', wasteType: 'Mixed', amount: '4 kg', status: 'missed' },
      { id: '#PKP-049', date: 'May 11, 2026', wasteType: 'Organic', amount: '6 kg', status: 'collected' },
    ],
    ecoScore: { score: 82, label: 'Eco Champion', monthlyKg: 25 },
    serviceRequests: [{ label: 'Open Requests', value: '1' }, { label: 'Resolved', value: '5' }],
  }

  const data = stats || fallbackStats

  if (loading) return <DashboardSkeleton />

  const ecoScoreColor =
    data.ecoScore.score >= 80 ? '#2d5a35' : data.ecoScore.score >= 50 ? '#7FC155' : '#f59e0b'

  return (
    <div className="space-y-6 bg-[#e8f5e9] p-4">
      <div>
        <h2 className="text-2xl font-bold text-[#2d5a35]">Household Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Smart Waste Connect LTD.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<Recycle size={22} />}
          label="Waste Submitted"
          value={data.wasteSubmitted?.[0]?.amount || '—'}
          sub={data.wasteSubmitted?.[0]?.type || 'This month'}
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<Calendar size={22} />}
          label="Next Pickup"
          value={data.upcomingPickup?.date || 'Not scheduled'}
          sub={data.upcomingPickup?.time || '—'}
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
        <StatCard
          icon={<Leaf size={22} />}
          label="Eco Score"
          value={`${data.ecoScore.score}/100`}
          sub={data.ecoScore.label}
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          label="Monthly Waste"
          value={`${data.ecoScore.monthlyKg} kg`}
          sub="Total this month"
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
      </div>

      {/* Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Pickup Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Upcoming Pickup</h3>
          </div>
          {data.upcomingPickup ? (
            <div className="bg-[#f0fdf4] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Date</span>
                <span className="text-sm font-bold text-[#2d5a35]">{data.upcomingPickup.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Time</span>
                <span className="text-sm font-semibold text-gray-700">{data.upcomingPickup.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Zone</span>
                <span className="text-sm text-gray-600">{data.upcomingPickup.zone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Status</span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {data.upcomingPickup.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Calendar size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No upcoming pickup scheduled</p>
            </div>
          )}

          {/* Waste submitted breakdown */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3">Waste Submitted</p>
            <div className="flex flex-wrap gap-2">
              {data.wasteSubmitted.map((w, i) => (
                <span key={i} className="bg-[#e8f5e9] text-[#2d5a35] text-xs font-semibold px-3 py-1 rounded-full">
                  {w.type}: {w.amount}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Eco Score + Service Requests */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Leaf size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Eco Score & Activity</h3>
          </div>

          {/* Eco Score Visual */}
          <div className="flex items-center gap-6 mb-5">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e8f5e9" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={ecoScoreColor} strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - data.ecoScore.score / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold" style={{ color: ecoScoreColor }}>{data.ecoScore.score}</span>
                <span className="text-xs text-gray-400">/100</span>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-[#2d5a35]">{data.ecoScore.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">You've submitted {data.ecoScore.monthlyKg} kg this month</p>
              <p className="text-xs text-gray-400 mt-1">Keep up the great work! 🌱</p>
            </div>
          </div>

          {/* Service Requests */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-[#7FC155]" />
              <p className="text-sm font-semibold text-gray-700">Service Requests</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.serviceRequests.map((r, i) => (
                <div key={i} className={`${i === 0 ? 'bg-yellow-50' : 'bg-[#f0fdf4]'} rounded-xl p-3 text-center`}>
                  <p className={`text-2xl font-bold ${i === 0 ? 'text-yellow-700' : 'text-[#2d5a35]'}`}>{r.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pickup History */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Home size={18} className="text-[#7FC155]" />
          <h3 className="font-semibold text-gray-700">Pickup History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left pb-2 font-medium">ID</th>
                <th className="text-left pb-2 font-medium">Date</th>
                <th className="text-left pb-2 font-medium">Waste Type</th>
                <th className="text-left pb-2 font-medium">Amount</th>
                <th className="text-left pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.pickupHistory.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="py-3 text-gray-600 text-xs">{p.date}</td>
                  <td className="py-3 text-gray-700">{p.wasteType}</td>
                  <td className="py-3 font-semibold text-[#2d5a35]">{p.amount}</td>
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

function StatusBadge({ status }: { status: 'collected' | 'missed' | 'pending' }) {
  const map = {
    collected: { bg: 'bg-green-50', text: 'text-green-700', icon: <CheckCircle size={12} />, label: 'Collected' },
    missed: { bg: 'bg-red-50', text: 'text-red-500', icon: <AlertCircle size={12} />, label: 'Missed' },
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: <Clock size={12} />, label: 'Pending' },
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