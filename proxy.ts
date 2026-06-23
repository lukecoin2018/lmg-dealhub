import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  // PHASE 2 AUTH GATE: add '/course/:path*' here to intercept all course traffic at the middleware
  // level before it reaches the route handler. Combined with the auth check in
  // app/api/course/[slug]/route.ts, this gives two enforcement points for gating.
  matcher: [],
}

export default function proxy(_req: NextRequest) {
  return NextResponse.next()
}
