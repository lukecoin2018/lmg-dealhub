import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { getCurrentUser } from '@/lib/auth/session'

const ALLOWED_SLUGS = new Set([
  'module-1-ebook', 'module-1-workbook',
  'module-2-ebook', 'module-2-workbook',
  'module-3-ebook', 'module-3-workbook',
  'module-4-ebook', 'module-4-workbook',
  'module-5-ebook', 'module-5-workbook',
  'module-6-ebook', 'module-6-workbook',
  'module-7-ebook', 'module-7-workbook',
  'module-8-ebook', 'module-8-workbook',
  'module-9-ebook', 'module-9-workbook',
  'module-10-ebook', 'module-10-workbook',
])

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!ALLOWED_SLUGS.has(slug)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // ACCESS GATE (defense in depth — proxy.ts gates the wrapper pages, but this
  // route must never leak Module 2–10 HTML on its own). Module 1 docs are free.
  // getCurrentUser() re-reads has_access from the DB, so admin grants apply
  // without re-login. 401/403 (not redirects): this is fetched by iframes/curl.
  const isFree = slug === 'module-1-ebook' || slug === 'module-1-workbook'
  if (!isFree) {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (user.has_access !== 1) {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  // Resolve strictly inside course-content/ — no path traversal possible since slug is allowlisted
  const filePath = path.join(process.cwd(), 'course-content', `${slug}.html`)

  try {
    const html = await readFile(filePath, 'utf-8')
    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch {
    return new NextResponse('Not Found', { status: 404 })
  }
}
