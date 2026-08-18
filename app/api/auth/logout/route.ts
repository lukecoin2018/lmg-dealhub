import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth/session'

export async function POST() {
  // Relative Location on purpose: behind nginx the app's request host is
  // localhost:30003, so any absolute URL built from the request would send
  // users to a dead localhost address. (NextResponse.redirect() only accepts
  // absolute URLs, hence the hand-built 303.)
  const res = new NextResponse(null, {
    status: 303,
    headers: { Location: '/login' },
  })
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}
