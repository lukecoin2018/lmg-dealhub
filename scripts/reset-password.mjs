#!/usr/bin/env node
// One-off admin utility: set a new password for an existing user.
// The app has no self-service password reset, so this is the only way to
// recover an account whose password is lost.
//
// Usage (run from the app directory so node_modules resolves):
//   DATABASE_PATH=/path/to/creators.db node scripts/reset-password.mjs <email> <new-password>
//
// DATABASE_PATH defaults to ./dev.db, matching lib/auth/db.ts. Password rules
// match the signup route: 8 characters minimum, 72 bytes maximum.

import fs from 'node:fs'
import path from 'node:path'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

function fail(msg) {
  console.error(`Error: ${msg}`)
  process.exit(1)
}

const [rawEmail, password] = process.argv.slice(2)
if (!rawEmail || !password) {
  console.error('Usage: node scripts/reset-password.mjs <email> <new-password>')
  process.exit(1)
}

const email = rawEmail.trim().toLowerCase()
if (password.length < 8) fail('Password must be at least 8 characters.')
if (Buffer.byteLength(password, 'utf8') > 72) fail('Password must be at most 72 bytes.')

const dbPath = path.resolve(process.env.DATABASE_PATH ?? './dev.db')
if (!fs.existsSync(dbPath)) {
  fail(`No database at ${dbPath}. Set DATABASE_PATH to the file the app uses.`)
}

const db = new Database(dbPath)
const user = db.prepare('SELECT id, email FROM users WHERE email = ?').get(email)
if (!user) fail(`No user with email ${email} in ${dbPath}.`)

const hash = bcrypt.hashSync(password, 12)
db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, user.id)
db.close()

console.log(`Password updated for ${user.email} (id ${user.id}).`)
