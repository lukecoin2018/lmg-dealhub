import { NextResponse, type NextRequest } from 'next/server'

// Redirect bridge for the access gate (proxy.ts). Next's middleware adapter
// refuses relative Location headers (ERR_INVALID_URL), but route handlers emit
// them fine — so the middleware REWRITES here internally and this handler sends
// the client-visible redirect with a strictly relative Location (never built
// from the request host; behind nginx that host is localhost:30003).

const DESTINATIONS: Record<string, string> = {
  signup: '/signup',
  pending: '/pending',
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ dest: string }> },
) {
  const { dest } = await params
  const location = DESTINATIONS[dest]
  if (!location) {
    return new NextResponse(null, { status: 404 })
  }
  const res = new NextResponse(null, { status: 307 })
  res.headers.set('Location', location)
  return res
}
