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

### Course — content-complete, Modules 1–2 fully live
All 10 lesson pages are built and content-complete (`/course/module-1` through `/course/module-10`). The data-driven template (`lib/course/moduleData.ts` → `LessonLayout` / `VideoSegment` / `visuals/`) is fully populated for every module. Module 10 has a Course Complete panel instead of a next-module card (correct by design).

**Videos:** Modules 1 and 2 fully live. Modules 3–10 show the "IN PRODUCTION" placeholder pending footage. Module 2 was originally built with 5 chapters but had 6 videos; Chapter 2.5 "Make Brands Find You" (inbound discovery) was added and the former closer renumbered to 2.6 — a preview of the reconcile step required for each remaining module.

**Course landing page:** redesigned as the "Trail" linear-journey page — two-column desktop (hero left / trail right), single-column mobile. Module 1 CTA links live; Modules 2–10 display-only with lock icons. Soft sequential guidance, not hard gating — real gating deferred to the auth phase. File: `app/course/page.tsx`.

**Lesson-page mobile overflow:** fixed. Root causes: `.sc-table` (500px) and `.obj-table` (480px) had fixed widths in `styles/lesson.css` — converted to `min-width` inside `overflow-x: auto` wrappers; `.vp-glow` fixed radial gradient clamped. `overflow-x: clip` safety net on the lesson content wrapper. All 10 pages confirmed overflow-free on iPhone Safari.

**Ebooks/workbooks mobile:** all 20 `course-content/*.html` files patched via `scripts/patch-ebook-mobile.js` (idempotent). Root cause: fixed 816px `.page` width centered with no mobile reflow. Fix: `@media screen and (max-width: 860px)` reflows `.page` to 100% width, stacks multi-column grids, pins toolbar. `@media print` still locks US Letter — PDF output unchanged. Button text simplified to "Save PDF". Re-run the script after any source changes; it checks for the `lmg-mobile-v1` sentinel.

### Open to-do items — in priority order

1. **Videos modules 3–10** — wire each module as footage finalises; see Video Pipeline section for the repeatable recipe. Footage inventory: M3=6, M4=7, M5=7, M6=7, M7=7; M8–M10 still in production. Some videos still being edited (non-talking-head elements) — wire a module only once footage is FINAL (re-uploading changes the Bunny video ID and forces a re-wire).

2. **Course polish pass** — remove the rate-calculator link in Module 1; other small content/link fixes (TBD list).

3. **Dashboard reskin** — align the DealHub dashboard with the course's light editorial look (course tokens, Playfair/Manrope, `#FAFAF8`). Dashboard already has a light mode; intent is to make light the default and match the course aesthetic. Dark-toggle-vs-light-only TBD. _(planned)_

4. **Access gate after Module 1** — phased: email capture → login/accounts (replacing per-device `localStorage` progress) → payment. This is the deferred auth phase that also enables real sequential module gating on the landing page. _(planned)_
   - When the paid gate goes live: switch the `RateCalculatorMini` upsell block from Variant 2 (checklist + pink ✓) to Variant 3 (checklist + lock icons). The lock framing is correct once content is actually gated — premature while the course is free. See `components/course/visuals/RateCalculatorMini.tsx`.
   - When the paid gate goes live: update the Module 1 Ch 1.5 "Continue to Module 2 →" CTA (`nextHref`/`nextLabel` on seg-5 in `moduleData.ts`) to point at the enroll/unlock/paywall flow instead of `/course/module-2` directly.

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

**Modules 3–10 — awaiting footage.**

**Repeatable per-module recipe:**
1. **Reconcile counts first** — video count often differs from built chapter count. Compare: live chapters in `moduleData.ts` vs. chapter spec in `module-N.md` vs. available video files. Decide add/merge/drop per module BEFORE uploading. (Module 2 was the first example: 5 built chapters, 6 videos → added Ch 2.5.)
2. Rename files one-indexed by content to match chapters (`module-N-1.mp4` = Ch N.1, etc. — exports are zero-indexed from the editing tool).
3. Upload to Bunny library `708086`.
4. Per video: confirm autoplay is OFF, copy the embed URL.
5. In `moduleData.ts`: set `videoEmbed` + `duration` (`"M:SS"`) for each segment.
6. Deploy + device-test: all players show, play on iPhone Safari, no horizontal overflow, durations correct.

Domain-lock and player color are library-wide — set once, not repeated per module.

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
- **Videos modules 3–10** — in progress; see Open to-do items and Video Pipeline section.
- **Root `/` still the DealHub landing page** — redirect to `/dashboard` + remove
  `components/landing/*` and dead auth nav links (Sign In / Start Free point at deleted
  routes). _(planned)_
- **Leftover auth UI** — profile/avatar/"Sign In" elements in the dashboard header reference
  removed auth; clean up when convenient.
- **npm audit** reports vulnerabilities (incl. a critical) — typical for Next deps; do NOT
  `npm audit fix --force` (breaks builds). Revisit deliberately later.
