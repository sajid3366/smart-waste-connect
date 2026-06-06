// app/dashboard/[...not-found]/page.tsx
import { notFound } from 'next/navigation'

export default function DashboardCatchAll() {
  notFound()
}