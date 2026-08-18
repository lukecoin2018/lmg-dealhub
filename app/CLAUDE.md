# Creators (creators.lmg.media) — Project Context for Claude Code

> **Note on accuracy:** This file was created June 2026, right after the dashboard was
> deployed and Supabase auth was removed. **Last status update: August 2026** (all course
> videos live). Where this document and the live repo/server disagree, **trust the live
> repo** — verify with `git status`, `find`, and by reading the actual files before making
> changes. Items marked _(planned)_ are not built yet.

## Project Overview
`creators.lmg.media` is the **creator-facing platform/hub** for LMG Media — the gated
platform side that was deliberately split out of the main marketing site. It started as a
copy of the "DealHub" influencer dashboard and is being adapted for LMG's own purposes.

- **Live site:** https://creators.lmg.media
- **GitHub:** https://github.com/lukecoin2018/lmg-dealhub  (remote `origin`)
  - A second remote `luke` → https://github.com/lukecoin2018/dealhub exists on the local
    folder. **Push LMG work to `origin` only.** `luke`/`dealhub` is a separate lineage —
    don't cross-push.
- **VPS:** Webuzo Application Manager app named `creators`, Node.js 20, **port 30003**
- **VPS path:** `/home/lukelmg/public_html/creators/`
- **Local dev path (Mac):** the `lmg-dealhub` folder

### Relationship to lmg.media
- `lmg.media` = the marketing/agency site (brand-led). Separate repo
  (`lukecoin2018/lmg-media`), separate VPS app (`lmgmedia`, port 30000), separate Claude
  sessions. **Do not build against it from here.**
- `creators.lmg.media` (this repo) = the gated platform: dashboard tools + (now) the course.
- The two are **separate codebases with separate auth** by design. There is currently NO
  shared identity between them. _(Future creator accounts will be created on this subdomain
  on its own — see Auth below.)_

---

## Tech Stack
- **Framework:** Next.js 16.1.4 (App Router, Turbopack)
- **Language:** TypeScript + TSX
- **Node:** 20  (`/usr/local/apps/nodejs20/bin/` on the VPS)
- **Middleware entrypoint:** `proxy.ts` (NOT a root `middleware.ts`) — currently a clean
  passthrough (`NextResponse.next()`), no protection.
- **Build command:** `npm run build`
- **Process:** managed by Webuzo Application Manager (start command `npx next start -p 30003`)

---

## Auth — IMPORTANT (current state)
- **Auth FOUNDATION built (August 2026), content NOT gated yet.** Simple email+password
  accounts: SQLite (`better-sqlite3`) `users` table auto-created at
  `DATABASE_PATH` (env; `./dev.db` locally, outside the repo on the VPS), bcrypt hashes
  (`bcryptjs`, cost 12), JWT session (`jose`, HS256, secret from `SESSION_SECRET` env) in
  an httpOnly `lmg_session` cookie (30 days, sameSite=lax, secure in prod).
  - Core: `lib/auth/` — `db.ts` (singleton + user queries), `session.ts` (`getSession()`
    JWT-only for display; **`getCurrentUser()` re-reads `has_access` from the DB — the
    single gating seam**, so an admin toggle takes effect without re-login),
    `validation.ts`, `rate-limit.ts` (in-memory, 5 failed logins / 15 min per ip+email).
  - Routes: `/signup`, `/login` (pages, course light/editorial style, shared
    `components/auth/AuthForm.tsx` + `AuthShell.tsx`); POST `/api/auth/signup`,
    `/api/auth/login`, `/api/auth/logout`. Course header shows email + Log out
    (`components/auth/HeaderAuth.tsx`, server component — makes `/course/*` dynamic).
  - `users` schema: `id`, `email` (unique, lowercased), `password_hash`, `has_access`
    (integer, default 0 — no payments wired; admin toggles it manually via sqlite for now),
    `created_at`.
  - **Not built yet:** content gating (all content still open), email verification,
    password reset (slots in beside `lib/auth/session.ts` — see comment there:
    `password_resets` table + reset routes), payments/Stripe.
  - History: the original Supabase auth was deleted June 2026 (project deleted, packages
    uninstalled, `(auth)` routes removed, `proxy.ts` reduced to a passthrough).
- **Persistence:** the SQLite users DB is the only server-side data. Data-bearing pages
  (deals, negotiate, calculator results, contract preview) remain local-state /
  in-session only; contract drafts persist via `localStorage`.
- **Planned — the access gate / "auth phase":** standalone account creation + login for THIS
  subdomain (not shared with lmg.media), one login covering both the course and the dashboard.
  > **Naming note:** older comments in this repo call the auth work **"Phase 2"** (the
  > `// PHASE 2` marker in `LessonLayout.tsx`, the "Phase 2 auth seam" on the course route
  > handler, the workbook `data-k` hooks). That predates the current numbering, where Phase 1
  > = the Module 1 sales page and Phase 2 = the dashboard reskin. **Those `PHASE 2` code
  > markers mean the auth phase** — don't confuse them with the reskin.

  When added, the access tiers are: **course access ⊂ dashboard access**
  (everyone with course access has dashboard access; not everyone with dashboard access has
  course access). Build new gating as an **entitlements** model, not a single boolean.

---

## Routes (app)
Top-level routes present after the dashboard deploy: `/` (now redirects to `/dashboard` —
`app/page.tsx`; `components/landing/*` cleanup may still be pending), `/dashboard`,
`/calculator`, `/negotiate`, `/contracts`, `/contracts/generate`, `/brands`, `/deals`, and
(August 2026) `/login`, `/signup` + `/api/auth/{signup,login,logout}`.

> The root `/` still shows the inherited DealHub marketing landing page (Hero, Pricing,
> "Sign In"/"Start Free" — the auth CTAs now point at deleted routes). Cleanup task:
> redirect `/` → `/dashboard` and remove `components/landing/*` + dead auth nav links. _(planned)_

---

## Current Status _(August 2026)_

### Course — content-complete, ALL 10 MODULES LIVE
All 10 lesson pages are built and content-complete (`/course/module-1` through `/course/module-10`). The data-driven template (`lib/course/moduleData.ts` → `LessonLayout` / `VideoSegment` / `visuals/`) is fully populated for every module. Module 10 has a Course Complete panel instead of a next-module card (correct by design).

**Videos: ALL 10 MODULES LIVE.** Every chapter in every module is wired to real Bunny video — no "IN PRODUCTION" placeholders remain anywhere in the course. Final shape: **56 chapters, ~2h29m of video.**

| Module | Chapters | Runtime | Structural change during wiring |
|--------|----------|---------|----------------------------------|
| M1  | 5 | 11:53 | — |
| M2  | 6 | 14:40 | added Ch 2.5 "Make Brands Find You"; old closer → 2.6 |
| M3  | 5 | 11:37 | — (clean 1:1) |
| M4  | 6 | 14:11 | added Ch 4.3 "Pricing Your Deliverables"; 4.3–4.5 → 4.4–4.6 |
| M5  | 5 | 11:35 | — (clean 1:1; 2 app walkthroughs deferred) |
| M6  | 6 | 16:26 | added Ch 6.5 "Your Non-Negotiables"; old closer → 6.6 |
| M7  | 6 | 21:24 | split Ch 7.2 into Part 1 / Part 2; 7.3–7.5 → 7.4–7.6 |
| M8  | 5 | 13:42 | — (clean 1:1) |
| M9  | 5 | 13:30 | — (kept at 5; "Maintaining the Relationship" deferred) |
| M10 | 7 | 20:28 | split 10.3 → 10.3 / 10.4; added 10.7 finale; old 10.4–10.5 → 10.5–10.6 |

Chapter counts routinely did **not** match video counts as footage arrived — reconciling that (add / split / defer) was the norm, not the exception. Per-video Bunny IDs are not duplicated here; **`moduleData.ts` is the source of truth.**

### Deferred videos _(each needs an insert-and-renumber when footage lands)_
App-walkthrough videos were skipped for now. When they arrive, follow the established pattern (M2 2.5, M4 4.3, M6 6.5, M10 10.4) — new chapter takes the position's `seg-N` id, later segments shift up, both `id` and `eyebrow` renumber.

- **M5 — 2 app walkthroughs** (`module-5-5`, `module-5-6`). Straight inserts.
- **M9 — "Maintaining the Relationship."** Not a straight insert: its content currently lives **inside 9.5's second paragraph** (quarterly check-ins, proactive wins, 24-hour replies, "a retainer that's signed but not nurtured doesn't renew"). Adding the chapter means **lifting that material out of 9.5** into the new chapter, then renumbering — the same de-duplication call made for 6.5/6.6 and 10.6/10.7, so the beat lands once.

### Phase status
- **Phase 1 — DONE.** Module 1 sales page + embedded mini rate calculator (`RateCalculatorMini`, reusing `lib/calculator-engine.ts` rather than a second implementation), honest upsell pointing at "Module 04".
- **Phase 2 — mostly done.** Dashboard reskin to the course light/editorial theme: token/theme reskin is live, pink active-nav, light default with the dark toggle kept. Sidebar is icons-only collapsible with a "Course" link below the tool nav. **Typography-matching polish is parked** — see backlog item 3.
- **Next major phase — the access gate.** Not started; being scoped in a separate effort. See Open to-do items.

### Course — other completed work

**Course landing page:** redesigned as the "Trail" linear-journey page — two-column desktop (hero left / trail right), single-column mobile. Module 1 CTA links live; Modules 2–10 display-only with lock icons. Soft sequential guidance, not hard gating — real gating deferred to the auth phase. File: `app/course/page.tsx`.

**Lesson-page mobile overflow:** fixed. Root causes: `.sc-table` (500px) and `.obj-table` (480px) had fixed widths in `styles/lesson.css` — converted to `min-width` inside `overflow-x: auto` wrappers; `.vp-glow` fixed radial gradient clamped. `overflow-x: clip` safety net on the lesson content wrapper. All 10 pages confirmed overflow-free on iPhone Safari.

**Ebooks/workbooks mobile:** all 20 `course-content/*.html` files patched via `scripts/patch-ebook-mobile.js` (idempotent). Root cause: fixed 816px `.page` width centered with no mobile reflow. Fix: `@media screen and (max-width: 860px)` reflows `.page` to 100% width, stacks multi-column grids, pins toolbar. `@media print` still locks US Letter — PDF output unchanged. Button text simplified to "Save PDF". Re-run the script after any source changes; it checks for the `lmg-mobile-v1` sentinel.

### Open to-do items — in priority order

1. **Access gate (the auth phase) — NEXT MAJOR PHASE.** Module 1 free → Module 2+ requires an account + payment, with **one login shared across the course and the dashboard**. Not started; being scoped separately. This phase also:
   - converts the landing page's **soft module locks** (2–10 visible-but-not-clickable) into real gating;
   - switches `RateCalculatorMini`'s upsell from Variant 2 (checklist + pink ✓) to **Variant 3** (checklist + lock icons) — the lock framing is only honest once content is actually gated. See `components/course/visuals/RateCalculatorMini.tsx`;
   - repoints the Module 1 Ch 1.5 **"Continue to Module 2 →" CTA** (`nextHref`/`nextLabel` on seg-5 in `moduleData.ts`) at the enroll/paywall flow instead of `/course/module-2`. That CTA becomes the paywall.
   - Build gating as an **entitlements** model, not a single boolean (see Auth section: course access ⊂ dashboard access).

2. **Deferred videos** — M5's 2 app walkthroughs and M9's "Maintaining the Relationship". See Deferred videos above; the M9 one requires lifting content out of 9.5, not just an insert.

3. **Small polish backlog** _(none blocking)_
   - **M10 finale roadmap badge** — `CourseRoadmap` renders "You are here" on module 10 in the 10.7 finale. Should read **"complete"** for the capstone. Component change in `components/course/visuals/CourseRoadmap.tsx`.
   - **M7 contract-sections chip overflow** — `.cs-row-left` is ~52px holding ~56px of content, so the `REQUIRED`/`CRITICAL`/`OPTIONAL` chips bleed ~4px. Affects all 12 chips in both visual variants, desktop and mobile. **Cosmetic only** — no page-level horizontal scroll. Pre-existing, not introduced by the 7.2 split.
   - **Dashboard typography** — card fonts and logo font/weight don't yet match the CD mockup. Token/theme reskin is done; this is the remaining gap. **Parked for a dedicated session with CD's literal type spec** — don't guess at it piecemeal.

4. **Course polish pass** — small content/link fixes (TBD list).

---

## Video Pipeline

Videos hosted on **Bunny Stream**, library **`708086`**. Security: domain-locked to `creators.lmg.media` (Bunny Security → allowed domains + block-direct-url-access ON); token authentication OFF so embed URLs are simple and non-expiring. Player accent color `#FF4D94` — set library-wide in Bunny Player settings, not per video.

Wiring is **data-only** in `lib/course/moduleData.ts`. Each segment's `videoEmbed` holds:
```
https://player.mediadelivery.net/embed/708086/{videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true
```
`null` → "IN PRODUCTION" placeholder. Non-null string → iframe renders directly, no component change needed. Duration: `"M:SS"` for real videos (e.g. `"3:04"`); `"N min"` for unfilmed placeholders. `durationToTimecode` in `VideoSegment.tsx` handles both formats.

**Mobile containment:** iframe renders inside `.segment-video` (`width:100%; aspect-ratio:16/9; overflow:hidden`) — no fixed width, no overflow risk on any screen size.

**Module 1 — live (5 segments):**

| Seg | Chapter | Duration | Bunny video ID |
|-----|---------|----------|----------------|
| seg-1 | Ch 1.1 | 1:49 | `1c1eb408-f40c-46f1-803c-2a0834ca4826` |
| seg-2 | Ch 1.2 | 3:04 | `c29096a2-e943-405a-9a38-b14a943de51d` |
| seg-3 | Ch 1.3 | 2:51 | `66ab7344-1271-49c4-b541-d1e17b609742` |
| seg-4 | Ch 1.4 | 2:17 | `7d42a3f2-8eb6-431c-bb5d-830d675b6731` |
| seg-5 | Ch 1.5 | 1:52 | `f498acea-caef-47c7-8f46-e99f86b6aa23` |

**Module 2 — live (6 segments):**

| Seg | Chapter | Duration | Bunny video ID |
|-----|---------|----------|----------------|
| seg-1 | Ch 2.1 | 1:41 | `f2f08327-7ea3-430e-a49b-9db913ab5f79` |
| seg-2 | Ch 2.2 | 3:06 | `3cf60a86-8537-44bc-9951-67ab2da167e4` |
| seg-3 | Ch 2.3 | 2:28 | `e52e71ac-3a49-46dd-b50f-58e01e0e173f` |
| seg-4 | Ch 2.4 | 2:43 | `2af1bbd1-fd55-4c02-b4ae-d5d7f4c645e8` |
| seg-5 | Ch 2.5 | 3:05 | `f5c764be-5bdd-4780-9778-6251a95b67b9` |
| seg-6 | Ch 2.6 | 1:37 | `49a074d3-9668-4e1f-bae3-c74d7909a1a4` |

**Modules 3–10 — all live** (wired July–August 2026). Per-video IDs are not mirrored here to avoid drift; read `moduleData.ts`. See the status table above for chapter counts, runtimes, and the structural change each module needed.

**Two traps worth knowing before you wire anything:**
- **Stale dev server.** The Next dev server can keep serving the OLD module data after an edit — surviving a hard reload, showing "IN PRODUCTION" or stale durations even though the file on disk is correct. Hit this twice (M5, M10). Confirm the file with `grep` first, then `preview_stop` → `rm -rf .next/cache` → restart. `curl -s localhost:3000/course/module-N` is the fastest way to check SSR truth. **Tell the user to rebuild, not just restart, after pulling on the VPS** for the same reason.
- **Renumbering shifts saved progress.** Completion is keyed by segment id in `localStorage`. Renumbering `seg-N` on an insert means anyone mid-course sees their checkmarks land on the wrong chapters. Accepted every time so far (pre-launch); re-confirm if that changes.

**Repeatable per-module recipe:**
1. **Reconcile counts first** — video count often differs from built chapter count. Compare: live chapters in `moduleData.ts` vs. chapter spec in `module-N.md` vs. available video files. Decide add/merge/drop per module BEFORE uploading. (Module 2 was the first example: 5 built chapters, 6 videos → added Ch 2.5.)
2. Rename files one-indexed by content to match chapters (`module-N-1.mp4` = Ch N.1, etc. — exports are zero-indexed from the editing tool).
3. Upload to Bunny library `708086`.
4. Per video: confirm autoplay is OFF, copy the embed URL.
5. In `moduleData.ts`: set `videoEmbed` + `duration` (`"M:SS"`) for each segment.
6. Deploy + device-test: all players show, play on iPhone Safari, no horizontal overflow, durations correct.

Domain-lock and player color are library-wide — set once, not repeated per module.

---

## Lesson Pages _(All 10 modules complete — all videos live)_
Real Next.js lesson pages live at `/course/module-N`. All 10 modules are at `app/course/module-N/page.tsx`.

**Template:** `components/course/LessonLayout.tsx` (client) renders any module from a `ModuleData` object. To add a new module: create a data object in `lib/course/moduleData.ts` matching the `ModuleData` type, add any new visual components to `components/course/visuals/` and register them in the `getVisual()` switch in `LessonLayout.tsx`, add CSS to `styles/lesson.css`, then create a page at `app/course/module-N/page.tsx` that imports the data object and renders `<LessonLayout data={moduleN} />`. The course index (`app/course/page.tsx`) picks up the new lesson link automatically — just import the module export and add it to the `builtLessons` set at the top of that file.

**Data structure (`lib/course/moduleData.ts`):** Each module has `number`, `slug`, `title`, `heroCopy`, `heroImage`, `ebookCover`, `ebookSlug`, `workbookSlug`, `nextModule` (null for Module 10), and `segments[]`. Each segment has `id`, `eyebrow`, `title`, `summary`, `paragraphs[]`, `visualId`, `duration` (`"M:SS"` for real videos, `"N min"` for placeholders), and `videoEmbed` (null = IN PRODUCTION placeholder; Bunny embed URL = live — see Video Pipeline section).

**Progress rail:** Completion stored in `localStorage` under `lmg-lesson-progress-v1-{slug}` (object of `segmentId → boolean`). Marked with a `// PHASE 2` comment in `LessonLayout.tsx` — swap the hook for a per-user API call when auth lands. Segment IDs are the stable keys for that API.

**Styling:** All lesson-page CSS is in `styles/lesson.css` (design tokens + layout classes). Edit that file to restyle — no TSX changes needed. A follow-up restyle pass is planned to align the lesson visual language more closely with the ebook design (warmer, less editorial). The current style is intentionally not over-invested.

**Course index:** `app/course/page.tsx` is dynamic — it imports all built module exports and derives the `builtLessons` set automatically, so Lesson links appear for every module whose data object is imported. No manual threshold to edit.

---

## The Course _(in progress / planned)_
"The Complete Brand Partnership Playbook" — 10 modules, each with an **Ebook** + an
interactive **Workbook** (20 self-contained HTML docs). Built in Claude Design; delivered as
a handoff bundle (`design_handoff_course_ebooks/` — `public-course/` inlined files +
`source/` editable masters sharing one `lmg-course.css`).

**Critical:** these are **finished standalone HTML documents** — own CSS, vanilla JS, live
calculators, `localStorage` persistence (keys `lmg-m1-workbook-v1` … `lmg-m10-workbook-v1`),
tuned print/Save-as-PDF. **Do NOT rebuild as React.** Serve as-is.

**Serving model (gate-ready):** course HTML lives in `course-content/` **OUTSIDE `/public`**
(files in `/public` can't be auth-gated later). Served via a route handler validated against
a 20-doc allowlist, embedded in `/course/[slug]` via iframe, with a `/course` index.
**The route handler is the single Phase 2 auth seam** — a future session adds the
session/entitlement check there (and/or a `proxy.ts` matcher on `/course/*`). Course is
**FREE and OPEN now**; gating comes with Phase 2 auth.

**Workbook progress** is per-browser `localStorage` today. Each input has a stable `data-k`
attribute — the hook for swapping to account-synced API persistence in Phase 2 without
touching the documents.

---

## Deployment Workflow
```bash
# Mac → GitHub:
cd <lmg-dealhub folder>
git add -A && git commit -m "..." && git push origin main

# VPS:
cd /home/lukelmg/public_html/creators
git pull origin main
/usr/local/apps/nodejs20/bin/npm install      # only when package.json changed
/usr/local/apps/nodejs20/bin/npm run build
# then restart the `creators` app in Webuzo (stop → start), or:
# fuser -k 30003/tcp  (then start in Webuzo)
```
- Watch the VPS `npm run build` succeed BEFORE restarting.
- Course HTML files are large (inlined images, up to ~11 MB each). Ensure they're not caught
  by `.gitignore`; expect slower push/pull.
- Folder perms: keep `creators/` at `755` (matches the other VPS apps; Webuzo created it 750).

---

## Working Conventions
- **Recon before risky changes:** ask for a read-only "what imports X / what routes exist /
  what references Y" pass before editing. Have CC show the file plan before editing.
- **One change per commit/pass** where possible (auth removal, landing cleanup, course — each
  its own checkpoint), so any step is independently revertible.
- **Verify the working directory** before building/committing (this repo, not `lmg-media`).
- Don't rebuild the course HTML as React; don't break its print/PDF or `localStorage`.
- Brand accents (from the course design system): pink `#FF4D94` (creator-audience primary),
  yellow `#FFD700` (highlights), blue `#3AAFF4` (data). Dashboard is dark-themed.

---

## Known Issues / Pending Work
- **Videos** — complete. All 10 modules live; only the deferred M5/M9 chapters remain (see Deferred videos).
- **M10 finale roadmap badge** and **M7 chip overflow** — cosmetic; see Small polish backlog.
- **Dashboard typography** — parked pending CD's literal type spec; see Small polish backlog.
- **Root `/` still the DealHub landing page** — redirect to `/dashboard` + remove
  `components/landing/*` and dead auth nav links (Sign In / Start Free point at deleted
  routes). _(planned)_
- **Leftover auth UI** — profile/avatar/"Sign In" elements in the dashboard header reference
  removed auth; clean up when convenient.
- **npm audit** reports vulnerabilities (incl. a critical) — typical for Next deps; do NOT
  `npm audit fix --force` (breaks builds). Revisit deliberately later.
