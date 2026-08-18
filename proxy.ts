import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session'
import { findUserById } from '@/lib/auth/db'

// THE ACCESS GATE. Everything matched below requires logged-in AND has_access=1,
// checked against a FRESH DB read (never the JWT claim) so admin grants/revocations
// take effect without re-login. Runs on the Node runtime (Next 16 proxy default),
// which is what allows better-sqlite3 here.
//
// Open by allowlist (exact match — see OPEN_PATHS; note the module-1 vs module-10
// prefix trap). /login, /signup, /pending, /admin, /api/auth/* are not matched at
// all. /api/course/[slug] enforces the same rule itself (defense in depth) — see
// app/api/course/[slug]/route.ts.

export const config = {
  matcher: [
    '/course/:path*',
    '/dashboard/:path*',
    '/calculator/:path*',
    '/negotiate/:path*',
    '/contracts/:path*',
    '/brands/:path*',
    '/deals/:path*',
  ],
}

// Free tier: landing page + Module 1 lesson + Module 1 ebook/workbook wrappers.
const OPEN_PATHS = new Set([
  '/course',
  '/course/module-1',
  '/course/module-1-ebook',
  '/course/module-1-workbook',
])

// Redirects must reach the client with a RELATIVE Location (behind nginx the
// request host is localhost:30003 — absolute URLs built from it are dead links).
// The middleware adapter refuses relative Location headers no matter how the
// response is constructed (ERR_INVALID_URL — verified against a prod build), so
// we REWRITE internally to /api/gate/[dest], whose route handler emits the
// relative redirect. The URL built from req.url below is server-internal only —
// the browser never sees it.
function gateRedirect(req: NextRequest, dest: 'signup' | 'pending'): NextResponse {
  return NextResponse.rewrite(new URL(`/api/gate/${dest}`, req.url))
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (OPEN_PATHS.has(pathname)) {
    return NextResponse.next()
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value
  const session = token ? await verifySessionToken(token) : null
  if (!session) {
    return gateRedirect(req, 'signup') // new lead — signup links to login
  }

  const user = findUserById(session.userId) // fresh read; JWT hasAccess is advisory only
  if (!user || user.has_access !== 1) {
    return gateRedirect(req, 'pending')
  }

  return NextResponse.next()
}
