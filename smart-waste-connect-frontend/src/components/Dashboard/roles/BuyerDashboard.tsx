'use client'
import { useEffect, useState } from 'react'
import { ShoppingBag, TrendingUp, Package, CheckCircle, Clock, AlertCircle, DollarSign, BarChart2 } from 'lucide-react'
import axiosInstance from '@/hooks/useAxios'

interface BuyerStats {
  totalPurchases: { label: string; value: string }[]
  activeOrders: { zone: string; count: number; status: string }[]
  spendingSummary: { monthly: number; yearly: number }
  wasteByType: { type: string; amount: string; percentage: number }[]
  recentTransactions: { id: string; type: string; amount: string; date: string; status: 'completed' | 'pending' | 'cancelled' }[]
}

export default function BuyerDashboard() {
  const [stats, setStats] = useState<BuyerStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/buyer/dashboard-stats')
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const fallbackStats: BuyerStats = {
    totalPurchases: [{ label: 'Total Purchases', value: '128' }],
    activeOrders: [
      { zone: 'Mirpur 10', count: 4, status: 'In Transit' },
      { zone: 'Mirpur 11', count: 2, status: 'Processing' },
      { zone: 'Dhanmondi', count: 3, status: 'Pending' },
    ],
    spendingSummary: { monthly: 12400, yearly: 148800 },
    wasteByType: [
      { type: 'Organic', amount: '2.4 Ton', percentage: 60 },
      { type: 'Recyclable', amount: '1.1 Ton', percentage: 27 },
      { type: 'Hazardous', amount: '0.5 Ton', percentage: 13 },
    ],
    recentTransactions: [
      { id: '#TXN-001', type: 'Organic Waste', amount: '৳ 4,200', date: 'Jun 05, 2026', status: 'completed' },
      { id: '#TXN-002', type: 'Recyclable Waste', amount: '৳ 1,800', date: 'Jun 04, 2026', status: 'pending' },
      { id: '#TXN-003', type: 'Mixed Waste', amount: '৳ 3,100', date: 'Jun 03, 2026', status: 'completed' },
      { id: '#TXN-004', type: 'Hazardous Waste', amount: '৳ 950', date: 'Jun 02, 2026', status: 'cancelled' },
    ],
  }

  const data = stats || fallbackStats

  if (loading) return <DashboardSkeleton />

  return (
    <div className="space-y-6 bg-[#e8f5e9] p-4">
      <div>
        <h2 className="text-2xl font-bold text-[#2d5a35]">Buyer Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Smart Waste Connect LTD.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<ShoppingBag size={22} />}
          label="Total Purchases"
          value={data.totalPurchases?.[0]?.value || '0'}
          sub="All time orders"
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<Package size={22} />}
          label="Active Orders"
          value={String(data.activeOrders?.reduce((a, b) => a + b.count, 0) || 0)}
          sub="Currently processing"
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
        <StatCard
          icon={<DollarSign size={22} />}
          label="Monthly Spend"
          value={`৳ ${(data.spendingSummary?.monthly || 0).toLocaleString()}`}
          sub="This month"
          color="bg-[#e8f5e9]"
          iconColor="text-[#2d5a35]"
        />
        <StatCard
          icon={<TrendingUp size={22} />}
          label="Yearly Spend"
          value={`৳ ${(data.spendingSummary?.yearly || 0).toLocaleString()}`}
          sub="This year"
          color="bg-[#f0fdf4]"
          iconColor="text-[#7FC155]"
        />
      </div>

      {/* Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Orders by Zone */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Active Orders by Zone</h3>
          </div>
          <div className="space-y-3">
            {data.activeOrders.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-600">{item.zone}</span>
                  <span className="ml-2 text-xs text-gray-400">{item.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7FC155] rounded-full"
                      style={{ width: `${Math.min((item.count / 10) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#2d5a35] w-5 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waste Type Breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={18} className="text-[#7FC155]" />
            <h3 className="font-semibold text-gray-700">Purchased Waste Breakdown</h3>
          </div>
          <div className="space-y-3 mt-2">
            {data.wasteByType.map((w, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span className="font-medium">{w.type}</span>
                  <span>{w.amount} · {w.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${w.percentage}%`,
                      backgroundColor: i === 0 ? '#2d5a35' : i === 1 ? '#7FC155' : '#a8d89a',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Spending summary boxes */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-gray-100">
            <div className="bg-[#f0fdf4] rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-[#2d5a35]">৳ {(data.spendingSummary.monthly / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Monthly</p>
            </div>
            <div className="bg-[#e8f5e9] rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-[#2d5a35]">৳ {(data.spendingSummary.yearly / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Yearly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={18} className="text-[#7FC155]" />
          <h3 className="font-semibold text-gray-700">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Order ID</th>
                <th className="text-left pb-2 font-medium">Type</th>
                <th className="text-left pb-2 font-medium">Amount</th>
                <th className="text-left pb-2 font-medium">Date</th>
                <th className="text-left pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recentTransactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-mono text-xs text-gray-500">{txn.id}</td>
                  <td className="py-3 text-gray-700">{txn.type}</td>
                  <td className="py-3 font-semibold text-[#2d5a35]">{txn.amount}</td>
                  <td className="py-3 text-gray-400 text-xs">{txn.date}</td>
                  <td className="py-3">
                    <StatusBadge status={txn.status} />
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

function StatusBadge({ status }: { status: 'completed' | 'pending' | 'cancelled' }) {
  const map = {
    completed: { bg: 'bg-green-50', text: 'text-green-700', icon: <CheckCircle size={12} />, label: 'Completed' },
    pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: <Clock size={12} />, label: 'Pending' },
    cancelled: { bg: 'bg-red-50', text: 'text-red-500', icon: <AlertCircle size={12} />, label: 'Cancelled' },
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