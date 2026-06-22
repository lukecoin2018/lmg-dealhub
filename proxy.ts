import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: [],
}

export default function proxy(_req: NextRequest) {
  return NextResponse.next()
}
