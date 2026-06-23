import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

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

  // PHASE 2 AUTH GATE: check session/entitlement here before serving; return 401/redirect if not allowed.
  // Example: const session = await getSession(req); if (!session) return NextResponse.redirect('/login');

  if (!ALLOWED_SLUGS.has(slug)) {
    return new NextResponse('Not Found', { status: 404 })
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
