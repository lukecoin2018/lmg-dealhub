import { NextResponse, type NextRequest } from 'next/server'
import { updateUserProfile } from '@/lib/auth/db'
import { getCurrentUser } from '@/lib/auth/session'
import { parseName, parseOptIn } from '@/lib/auth/validation'

// Logged-in user edits their display name and Pro-launch email choice.
// Name may stay empty only for accounts that never had one.

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Please log in again.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { name: rawName, proLaunchOptIn: rawOptIn } = (body ?? {}) as Record<string, unknown>
  const parsed = parseName(rawName, false)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }
  if (!parsed.value && user.name) {
    return NextResponse.json({ error: "Name can't be blank." }, { status: 400 })
  }

  const updated = updateUserProfile(user.id, {
    name: parsed.value,
    proLaunchOptIn: parseOptIn(rawOptIn),
  })
  if (!updated) {
    return NextResponse.json({ error: 'Please log in again.' }, { status: 401 })
  }

  return NextResponse.json({
    ok: true,
    name: updated.name,
    proLaunchOptIn: updated.pro_launch_opt_in === 1,
    proLaunchOptInAt: updated.pro_launch_opt_in_at,
  })
}
