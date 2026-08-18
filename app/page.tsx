import { redirect } from 'next/navigation'

export default function RootPage() {
  // Everyone lands on the Trail; approved users reach the dashboard via the
  // sidebar link. (The old / → /dashboard hop also triggered a stale-CSS-chunk
  // bug — removing the branch removes the failure mode.)
  redirect('/course')
}
