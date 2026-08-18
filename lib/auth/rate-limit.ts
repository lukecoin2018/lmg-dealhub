// Simple in-memory login rate limiter: max 5 failed attempts per 15 minutes,
// keyed by ip|email. State lives in process memory — resets on restart, which is
// acceptable for now (single-process deploy on the VPS).

const MAX_FAILURES = 5
const WINDOW_MS = 15 * 60 * 1000

interface Entry {
  failures: number
  windowStart: number
}

const globalForRl = globalThis as unknown as { __lmgLoginRl?: Map<string, Entry> }

function store(): Map<string, Entry> {
  if (!globalForRl.__lmgLoginRl) globalForRl.__lmgLoginRl = new Map()
  return globalForRl.__lmgLoginRl
}

function key(ip: string, email: string): string {
  return `${ip}|${email}`
}

export function isRateLimited(ip: string, email: string): boolean {
  const entry = store().get(key(ip, email))
  if (!entry) return false
  if (Date.now() - entry.windowStart > WINDOW_MS) {
    store().delete(key(ip, email))
    return false
  }
  return entry.failures >= MAX_FAILURES
}

export function recordFailure(ip: string, email: string): void {
  const k = key(ip, email)
  const now = Date.now()
  const entry = store().get(k)
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store().set(k, { failures: 1, windowStart: now })
  } else {
    entry.failures += 1
  }
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (store().size > 1000) {
    for (const [mapKey, mapEntry] of store()) {
      if (now - mapEntry.windowStart > WINDOW_MS) store().delete(mapKey)
    }
  }
}

export function clearFailures(ip: string, email: string): void {
  store().delete(key(ip, email))
}
