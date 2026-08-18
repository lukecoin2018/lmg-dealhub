import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'

export default async function RootPage() {
  // Anonymous + not-yet-approved → the Trail landing page (the funnel).
  // Approved customers → the dashboard hub. Fresh DB read, same as the gate.
  const user = await getCurrentUser()
  if (user && user.has_access === 1) redirect('/dashboard')
  redirect('/course')
}
