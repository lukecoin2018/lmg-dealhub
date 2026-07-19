# Creators (creators.lmg.media) — Project Context for Claude Code

> **Note on accuracy:** This file was created June 2026, right after the dashboard was
> deployed and Supabase auth was removed. Where this document and the live repo/server
> disagree, **trust the live repo** — verify with `git status`, `find`, and by reading the
> actual files before making changes. Items marked _(planned)_ are not built yet.

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
- **There is currently NO auth.** The app originally used Supabase purely to gate the
  dashboard behind a login. That Supabase project was **deleted**, and all Supabase auth was
  **removed** (June 2026): `@supabase/ssr` + `@supabase/supabase-js` uninstalled, the
  `lib/supabase/` client/server/middleware deleted, the `(auth)/login` + `(auth)/signup`
  routes deleted, `proxy.ts` reduced to a passthrough, all `getUser`/`getSession` calls
  stripped. The app is a fully OPEN hub.
- **No persistence/backend.** Data-bearing pages (deals, negotiate, calculator results,
  contract preview) are local-state / in-session only. Contract drafts persist via
  `localStorage`. Nothing is saved server-side; there is no database.
- **Planned (Phase 2):** standalone account creation + login for THIS subdomain (not shared
  with lmg.media). When added, the access tiers are: **course access ⊂ dashboard access**
  (everyone with course access has dashboard access; not everyone with dashboard access has
  course access). Build new gating as an **entitlements** model, not a single boolean.

---

## Routes (app)
Top-level routes present after the dashboard deploy: `/` (DealHub marketing landing page —
_slated for removal/redirect to `/dashboard`, not yet done_), `/dashboard`, `/calculator`,
`/negotiate`, `/contracts`, `/contracts/generate`, `/brands`, `/deals`.

> The root `/` still shows the inherited DealHub marketing landing page (Hero, Pricing,
> "Sign In"/"Start Free" — the auth CTAs now point at deleted routes). Cleanup task:
> redirect `/` → `/dashboard` and remove `components/landing/*` + dead auth nav links. _(planned)_

---

## Current Status _(July 2026)_

### Course — content-complete, Module 1 videos live
All 10 module lesson pages are built and content-complete (`/course/module-1` through `/course/module-10`). The data-driven lesson template (`lib/course/moduleData.ts` → `LessonLayout` / `VideoSegment` / `visuals/`) is fully populated for every module with written copy, visual components, progress rails, roadmap, and ebook/workbook CTAs.

**Module 1:** all 5 videos live (Bunny Stream, library 708086). Modules 2–10 show the "IN PRODUCTION" placeholder until footage is uploaded. Module 10 has a Course Complete panel instead of a next-module card (correct by design).

**Course landing page:** redesigned as the guided "Trail" linear-journey page — two-column desktop (hero left / trail right), single-column mobile. Module 1 links live; modules 2–10 display-only with lock icons. File: `app/course/page.tsx`.

**Lesson-page mobile overflow:** fixed. Root causes were `.sc-table` / `.obj-table` fixed widths (now `min-width` only, scrollable inside `overflow-x: auto` wrappers) and `.vp-glow` oversized radial gradient (clamped). All 10 lesson pages confirmed overflow-free on iPhone Safari.

**Ebooks/workbooks mobile:** all 20 `course-content/*.html` files patched via `scripts/patch-ebook-mobile.js` (idempotent). Injected `@media screen and (max-width: 860px)` block collapses multi-column grids to single-column; `body { align-items: stretch }` fills device width. Print/PDF output unchanged. Button text simplified to "Save PDF" (⌘P removed). Re-run the script after any source changes — it checks for the `lmg-mobile-v1` sentinel before patching.

### Open to-do items — in priority order

1. **Videos for modules 2–10** — see Video Pipeline section below.

2. **Tool CTA rewire** — several ebook/workbook docs link to placeholder anchors; rewire in both `source/` and `course-content/`: `#rate-calculator`→`/calculator` (M4), `#negotiation-assistant`→`/negotiate` (M6), `#contract-builder`→`/contracts` (M7), `#templates-pack`→TBD (M5). _(planned)_

---

## Video Pipeline

Videos are hosted on **Bunny Stream**, library **`708086`**, domain-locked to `creators.lmg.media`. Player accent color: `#FF4D94`.

Each segment's `videoEmbed` field in `lib/course/moduleData.ts` holds the full embed URL:
```
https://player.mediadelivery.net/embed/708086/{videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true
```
`null` = "IN PRODUCTION" placeholder renders. A non-null string renders the iframe directly — no other code changes needed. The `duration` field should be set to the real runtime in `"M:SS"` format (e.g. `"3:04"`); `durationToTimecode` in `VideoSegment.tsx` handles both `"M:SS"` and the legacy `"N min"` placeholder format.

**Module 1 — all 5 segments live:**

| Segment | Chapter | Duration | Bunny video ID |
|---------|---------|----------|----------------|
| seg-1 | Ch 1.1 | 1:49 | `1c1eb408-f40c-46f1-803c-2a0834ca4826` |
| seg-2 | Ch 1.2 | 3:04 | `c29096a2-e943-405a-9a38-b14a943de51d` |
| seg-3 | Ch 1.3 | 2:51 | `66ab7344-1271-49c4-b541-d1e17b609742` |
| seg-4 | Ch 1.4 | 2:17 | `7d42a3f2-8eb6-431c-bb5d-830d675b6731` |
| seg-5 | Ch 1.5 | 1:52 | `f498acea-caef-47c7-8f46-e99f86b6aa23` |

**Modules 2–10 — awaiting footage.** Repeatable process per module:

1. Rename files one-indexed to match chapters (e.g. `m2-ch2-1.mp4`, `m2-ch2-2.mp4`, …).
2. Upload to Bunny Stream library `708086`.
3. In the Bunny dashboard, confirm autoplay is off for each video.
4. Copy the embed URL for each video (`player.mediadelivery.net/embed/708086/{id}?…`).
5. In `lib/course/moduleData.ts`, set `videoEmbed` to the copied URL and `duration` to the real runtime (`"M:SS"`) for each segment.
6. Commit and push to `origin`; pull and rebuild on the VPS.

**Mobile containment:** the iframe renders inside `.segment-video` (`width:100%; aspect-ratio:16/9; overflow:hidden`) — no fixed width, no overflow risk on any screen size.

---

## Lesson Pages _(All 10 modules complete — Module 1 videos live)_
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
- **Videos modules 2–10** — awaiting footage; see Video Pipeline section. _(in progress)_
- **Tool CTA rewire** — ebook/workbook placeholder anchors need real routes; see Open to-do items. _(planned)_
- **Root `/` still the DealHub landing page** — redirect to `/dashboard` + remove
  `components/landing/*` and dead auth nav links (Sign In / Start Free point at deleted
  routes). _(planned)_
- **Phase 2 auth** — standalone accounts + login for this subdomain; entitlements model
  (course ⊂ dashboard); optionally upgrade workbook progress from `localStorage` to
  account-synced via the `data-k` hook. _(planned)_
- **Leftover auth UI** — check for profile/avatar/"Sign In" elements in the dashboard header
  that reference removed auth and no longer do anything; clean up when convenient.
- **npm audit** reports vulnerabilities (incl. a critical) — typical for Next deps; do NOT
  `npm audit fix --force` (breaks builds). Revisit deliberately later.
