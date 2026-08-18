import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

export interface UserRow {
  id: number
  email: string
  password_hash: string
  has_access: number
  created_at: string
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
  `)
  return db
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
