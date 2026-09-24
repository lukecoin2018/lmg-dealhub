import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

export interface UserRow {
  id: number
  email: string
  password_hash: string
  has_access: number
  created_at: string
  last_login_at: string | null // sqlite "YYYY-MM-DD HH:MM:SS" (UTC), null until first login
}

// Singleton on globalThis so dev-server HMR doesn't stack up open handles.
const globalForDb = globalThis as unknown as { __lmgAuthDb?: Database.Database }

function openDb(): Database.Database {
  const dbPath = process.env.DATABASE_PATH ?? './dev.db'
  const resolved = path.resolve(dbPath)
  fs.mkdirSync(path.dirname(resolved), { recursive: true })

  const db = new Database(resolved)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      has_access    INTEGER NOT NULL DEFAULT 0,
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS password_resets (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used_at    TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS password_resets_user_id ON password_resets(user_id);
  `)
  migrate(db)
  return db
}

// Additive migrations for databases created before a column existed.
function migrate(db: Database.Database): void {
  const cols = (db.pragma('table_info(users)') as { name: string }[]).map((c) => c.name)
  if (!cols.includes('last_login_at')) {
    db.exec('ALTER TABLE users ADD COLUMN last_login_at TEXT')
  }
}

export function getDb(): Database.Database {
  if (!globalForDb.__lmgAuthDb) {
    globalForDb.__lmgAuthDb = openDb()
  }
  return globalForDb.__lmgAuthDb
}

export function findUserByEmail(email: string): UserRow | undefined {
  return getDb()
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email.trim().toLowerCase()) as UserRow | undefined
}

export function findUserById(id: number): UserRow | undefined {
  return getDb().prepare('SELECT * FROM users WHERE id = ?').get(id) as UserRow | undefined
}

export function listUsers(): UserRow[] {
  return getDb()
    .prepare('SELECT * FROM users ORDER BY created_at DESC, id DESC')
    .all() as UserRow[]
}

export function setUserAccess(id: number, hasAccess: 0 | 1): UserRow | undefined {
  getDb().prepare('UPDATE users SET has_access = ? WHERE id = ?').run(hasAccess, id)
  return findUserById(id)
}

export function createUser(email: string, passwordHash: string): UserRow {
  const normalized = email.trim().toLowerCase()
  const result = getDb()
    .prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)')
    .run(normalized, passwordHash)
  return findUserById(Number(result.lastInsertRowid))!
}

export function setUserPassword(id: number, passwordHash: string): void {
  getDb().prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, id)
}

// ---- Password resets --------------------------------------------------------
// Only a SHA-256 hash of the token is stored; the raw token lives in the email
// link alone. Tokens are single-use and short-lived (see reset-request route).

export interface PasswordResetRow {
  id: number
  user_id: number
  token_hash: string
  expires_at: string
  used_at: string | null
  created_at: string
}

export function createPasswordReset(userId: number, tokenHash: string, expiresAt: Date): void {
  const db = getDb()
  // Requesting a new link retires any earlier unused ones for this user.
  db.prepare("UPDATE password_resets SET used_at = datetime('now') WHERE user_id = ? AND used_at IS NULL").run(userId)
  db.prepare('INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)').run(
    userId,
    tokenHash,
    expiresAt.toISOString(),
  )
}

/** Returns the reset row only if it is unused and unexpired. */
export function findValidPasswordReset(tokenHash: string): PasswordResetRow | undefined {
  const row = getDb()
    .prepare('SELECT * FROM password_resets WHERE token_hash = ? AND used_at IS NULL')
    .get(tokenHash) as PasswordResetRow | undefined
  if (!row) return undefined
  if (new Date(row.expires_at).getTime() < Date.now()) return undefined
  return row
}

export function consumePasswordReset(id: number): void {
  getDb().prepare("UPDATE password_resets SET used_at = datetime('now') WHERE id = ?").run(id)
}

export function countPendingUsers(): number {
  const row = getDb().prepare('SELECT COUNT(*) AS n FROM users WHERE has_access = 0').get() as { n: number }
  return row.n
}

export function deleteUser(id: number): void {
  const db = getDb()
  // Explicit cleanup rather than relying on ON DELETE CASCADE, which SQLite
  // only honours with foreign_keys=ON.
  db.transaction(() => {
    db.prepare('DELETE FROM password_resets WHERE user_id = ?').run(id)
    db.prepare('DELETE FROM users WHERE id = ?').run(id)
  })()
}

export function touchLastLogin(id: number): void {
  getDb().prepare("UPDATE users SET last_login_at = datetime('now') WHERE id = ?").run(id)
}
