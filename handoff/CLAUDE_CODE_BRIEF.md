# Redesign brief: `creators.lmg.media/course`

**Project:** `lmg-dealhub` (the creators site). Deployed via Webuzo as the `creators` Node 20 app, port 30003, path `/home/lukelmg/public_html/creators`.
**Not this project:** `lmg-media` (the main site, `lmg.media`, `public_html/lmgmedia`, port 30000). It is a completely separate codebase; nothing is shared. Only copy assets *out of* it, never import code from it.

## 0. What to do, in order

1. Read this file, then open `reference/course-page.html` in a browser — that page **is** the approved design. Match it.
2. Find the existing course landing route in this repo (it renders `/course`: currently the "The Complete Brand Partnership *Playbook*" hero + "The Journey" list; the page's `<title>` is "Brand Partnership Playbook · LMG Media"). Work out the stack from the repo (likely Next.js — the live page carries a `next-size-adjust` meta tag) and match its conventions: components, styling approach, routing, data.
3. Copy the assets listed in §3 into this project's public folder.
4. Rebuild the `/course` page section by section (§2), porting `reference/course-page.html` + `reference/brand.css` into the project's own component/style system. Keep all existing behaviour (§4).
5. Check §5 (responsive + a11y) and §6 (done criteria). Take screenshots at 1440, 1024, 768 and 390 wide if you have a browser tool.

Do not redesign anything beyond the `/course` landing page. Module pages, login, and the rate calculator are out of scope, except that the shared header/footer may be applied to them if the repo already shares a layout component.

## 1. Design system (from `reference/brand.css`)

| Token | Value | Use |
|---|---|---|
| `--lmg-pink` | `#E8578B` | Primary accent: CTAs, italic *Playbook*, eyebrows, live chip |
| `--lmg-yellow` | `#F6D64A` | Tiny accents only (live dot, capstone flag ring). Never the logo. |
| `--lmg-blue` | `#6EB1E8` | Tertiary; one stat rule + one icon tint |
| `--lmg-ink` | `#1A1A1A` | Text, logo, Module 1 feature panel |
| `--lmg-cream` | `#FBF9F6` | Page background |
| `--lmg-paper` | `#FFFFFF` | Cards, Journey section |
| `--lmg-line` / `--lmg-line-2` | `#ECE7E0` / `#D9D2C8` | Hairlines, card borders, number rings |

**Type:** Playfair Display (700 for headings, 400 italic for the accent words) + DM Sans (400/500/600/700) for everything else. Load from Google Fonts or self-host; both are already used on lmg.media so this keeps the two sites consistent.

**Logo:** the real LMG Media logo asset from `lmg-media`, **black** by default (pink is the only alternative). Never yellow/gold. See §3.

**Shape:** pill buttons (`999px`), 18–20px radius on cards, 24px on the Module 1 panel, 28px on the closing pink band.

## 2. Page structure (top to bottom)

All copy below is final; use it verbatim unless a line is marked *[review]*.

### 2.1 Header (sticky)
- Left: LMG Media logo · thin vertical divider · "Brand Partnership *Playbook*" (Playfair, *Playbook* italic pink). Whole group links to `/course`.
- Right: `← lmg.media` (→ `https://lmg.media/for-influencers`) · `Log in` outline pill (→ `/login`) · `Start Module 1 — free` pink pill (→ `/course/module-1`).
- Under 900px hide the `← lmg.media` link; under 600px hide the course name and Log in (keep logo + pink CTA).

### 2.2 Hero (2 columns, copy left / cover right)
- Eyebrow: `The Playbook · For creators`
- H1: `The business side of being a creator, taught properly.` — *properly* in italic pink Playfair 400.
- Lead: `Pricing, pitching, contracts, renewals — the system behind every professional partnership. Whether you work with us, with another agency, or on your own, this is the foundation.`
- Sub: `Ten modules, taught on video, built from the same playbooks we use on real deals. Module 1 and the rate calculator are free — no account, no card, no catch.`
- Primary CTA: `Start Module 1 — free` → `/course/module-1`. Secondary underlined link: `Already working with us? It's still yours →` → `/login`.
- Meta line (uppercase, tracked): `10 modules · 50 videos · 10 workbooks · Module 1 free, no account` (last item pink).
- Right column: the cover image at 520px, rotated 2°, drop shadow; a soft pink rounded rectangle rotated −4° behind it and a pale yellow circle top-right; a floating white chip bottom-left: pink "1" circle + `MODULE 1 · LIVE NOW` / `The Partnership Landscape`, linking to `/course/module-1`.
- Under 900px the cover column moves **above** the copy, cover at ~360px, chip centred.

### 2.3 Pillars (4 cards)
Heading `The system behind every professional partnership`; right-aligned note `What the ten modules cover`.
Cards (icon tint · title · line) — the four lines are suggested copy *[review]*:
1. pink · **Pricing** · Know your worth and put a number on it — before the brand does.
2. gold · **Pitching** · Find the right brands, then reach them with a pitch that gets answered.
3. blue · **Contracts** · Usage, terms and the clauses that quietly cost creators money.
4. pink · **Renewals** · Turn one deal into a partnership that renews — at a higher rate.

Icons are inline stroke SVGs (in the reference file). 4 → 2 → 1 columns at 1100 / 600px.

### 2.4 The Journey (white section)
- Eyebrow `The journey`; H2 `Ten modules. One guided path.`; text `From your first brand deal to scaling a partnership business. Begin at the beginning — the course builds in order.`; right: lock icon + `Modules 2–10 unlock in order`.
- **Module 1 feature panel** (black, full width): pink "1" circle · yellow live label `Start here · Free · Live now` · `The Partnership Landscape` · `How the creator–brand economy actually works, where the money flows, and where you fit in.` · white pill `Enter Module 1`. The whole panel is one link to `/course/module-1`.
- **Modules 2–10** as a 3-column grid of cards (2 cols <900px, 1 col <600px). Each card: number ring · `MODULE 0N` label (Module 10 reads `MODULE 10 · CAPSTONE`) · title · lock icon on the right. Render from the **existing module data** in the repo; keep existing links `/course/module-N`. Show the lock only when the module is locked for the current user, and give unlocked modules the same card without the lock (a completed state, if the app tracks it, can swap the number ring for a pink filled ring).
- Below the grid: yellow-ringed flag icon + `**Capstone complete.** A partnership business that protects and scales itself.`

### 2.5 Why this one (5/7 columns)
Left: eyebrow `Why this one`; H2 `Built from the playbooks we use on real deals.`; text `Every creator we work with knows this business. The Playbook is where that starts — whoever ends up handling your deals.`
Right, three stats with a coloured top rule (pink / yellow / blue):
- `50` · Videos, taught on camera · *[review]* Across ten modules — the same material we use when we take a deal to the table.
- `10` · Workbooks you keep · *[review]* One per module, so what you work through in the videos leaves with you.
- `Free` · Module 1 + rate calculator · No account, no card, no catch. Decide whether it's for you before you sign up.

### 2.6 Closing band (pink, rounded, inset from the page edges)
Kicker `Start Module 1` · H2 `Begin at the beginning.` · `The Partnership Landscape is free and open. Watch it, work the workbook, and the course opens up from there.` · white pill `Start Module 1 — free` → `/course/module-1` · small note `No account required for Module 1`.

### 2.7 Footer
LMG Media logo · italic tagline `Where Quality Brands Meet Iconic Influence` · links `For Influencers` (`https://lmg.media/for-influencers`), `Apply to work with us` (`https://lmg.media/for-influencers/apply`), `Privacy` (`https://lmg.media/privacy-policy`) · `© 2026 LMG Media`.

## 3. Assets — copy from `lmg-media`, do not hotlink

The two sites are separate apps on separate ports; `creators` must serve its own files.

| Asset | Where it lives in `lmg-media` | Put it at (in `lmg-dealhub`) |
|---|---|---|
| Playbook cover (the "book" image on lmg.media/for-influencers, "The Playbook" section) | somewhere under `public/` — search the repo for the `<img>` whose alt is *Cover of The Complete Brand Partnership Playbook* to find the source file. Use the **original full-resolution file**, not a resized/optimised variant. | `public/images/playbook-cover.png` (or `.webp` + `.png` fallback). Keep the transparent background/shadow if the source has one. |
| LMG Media logo (black version) | `public/lmgmedialogo.png` is the one served at `https://lmg.media/lmgmedialogo.png`; look in the repo for a black variant and an SVG/vector source and prefer those. | `public/images/lmg-logo.png` (or `.svg`) — the reference page uses `/images/lmg-logo.png` in the header and footer |

Logo rule: use the **black** version of the LMG Media logo (pink is acceptable; yellow/gold is not). If `lmg-media` only has a coloured raster version, ask before substituting anything — do not draw or approximate the logo yourself.

Fonts: Google Fonts link is in the reference `<head>`. If the repo self-hosts fonts, add Playfair Display (400 italic, 700) and DM Sans (400, 500, 600, 700).

## 4. Keep working

- All existing routes and links: `/course/module-1` … `/course/module-10`, `/login`.
- Whatever logic decides which modules are locked/unlocked/completed for the logged-in user. The old page showed a lock on modules 2–10 for anonymous users; the new cards do the same.
- The `Log in` state: if the app swaps `Log in` for the user's name/avatar when authenticated, keep that in the new header.
- Any analytics or tracking on the CTAs.
- The `<title>` and meta description (update the description to the one in the reference `<head>` if you like).

## 5. Responsive and accessibility

- Breakpoints as in the reference CSS: 1100 / 900 / 600px. Nothing may scroll horizontally at 390px.
- Real `<a>`/`<button>` elements for everything clickable; `h1 → h2 → h3` in order; `aria-label` on the logo link; icons `aria-hidden="true"`.
- Visible focus ring (pink, 3px offset) on every link and button. `prefers-reduced-motion` disables the hover lift.
- Text contrast: body greys are already ≥ 4.5:1 on cream — don't lighten them.
- Cover image: `width`/`height` attributes set, `fetchpriority="high"`, `alt="Cover of The Complete Brand Partnership Playbook"`.

## 6. Done when

- [ ] `/course` visually matches `reference/course-page.html` at 1440px (same order, spacing, type, colours).
- [ ] Cover is the full-resolution file copied from `lmg-media`, served from this project.
- [ ] Logo is the real LMG Media logo asset, black version (never yellow).
- [ ] Module cards render from real data; lock state respects the logged-in user.
- [ ] All links above resolve; no console errors; no horizontal scroll at 390px.
- [ ] Lighthouse accessibility ≥ 95 on the page.

## 7. Suggested Claude Code prompt

> Read `handoff/CLAUDE_CODE_BRIEF.md` and open `handoff/reference/course-page.html`. Rebuild the `/course` landing page in this repo to match that reference exactly, following the brief's sections in order. The Playbook cover and the LMG logo must be copied from the `lmg-media` project at `../lmg-media` (adjust the path) into this project's `public/images/` — do not hotlink lmg.media. Keep all existing routes, auth state and module lock logic. When done, list any copy lines marked *[review]* that I should confirm, and screenshot the page at 1440 and 390 wide.
