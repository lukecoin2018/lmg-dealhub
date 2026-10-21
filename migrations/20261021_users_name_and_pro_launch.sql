-- Users table: display name and optional Pro-launch email consent.
--
-- This app does not use Supabase. Accounts live in the SQLite database at
-- DATABASE_PATH (./dev.db locally). lib/auth/db.ts migrate() applies these
-- columns automatically the first time the app opens the database, including
-- on the next production boot. You do not need to run this file for the
-- columns to exist.
--
-- Run it manually only if you want the columns before that boot, and only
-- once. If a column already exists, that ALTER fails; skip it and continue.
-- Existing rows keep name NULL, pro_launch_opt_in 0, and a null timestamp.

ALTER TABLE users ADD COLUMN name TEXT;
ALTER TABLE users ADD COLUMN pro_launch_opt_in INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN pro_launch_opt_in_at TEXT;
