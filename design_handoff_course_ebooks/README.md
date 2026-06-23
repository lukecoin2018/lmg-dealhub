# Handoff — LMG Media Course: All 10 Modules (Ebooks + Workbooks) for Next.js

This package contains the **complete** course — **The Complete Brand Partnership Playbook** — as 20
finished, self-contained documents: an **Ebook** and an **interactive Workbook** for each of the 10
modules.

| # | Module | Ebook | Workbook | Workbook's live/interactive feature |
|---|--------|-------|----------|--------------------------------------|
| 1 | The Partnership Landscape | ✓ | Where You Are, Where You're Going | Live engagement-rate calculator |
| 2 | Finding & Attracting Brands | ✓ | Build Your Pipeline | Target-brand list, media-kit builder |
| 3 | Vetting Opportunities | ✓ | Your Deal Filter | Live scorecard (auto-totals + verdict) |
| 4 | Know Your Worth (Pricing) | ✓ | Your Numbers, Locked In | Live range→pitch sentence + rate card |
| 5 | The Perfect Pitch | ✓ | Build & Send Your Pitch | Six-block pitch builder + follow-up scheduler |
| 6 | Negotiating Like a Pro | ✓ | Negotiate From Strength | Anchor/target/floor sheet + objection rehearsal |
| 7 | Contracts & Legal | ✓ | Lock It Down | 8-section contract review + FTC cheat sheet |
| 8 | Delivering Results & Reporting | ✓ | Deliver Like a Partner | Content brief, shot list, performance report |
| 9 | Building Long-Term Partnerships | ✓ | Turn Deals Into a Business | Live retainer calculator (TCV) |
| 10 | Protect & Scale (Capstone) | ✓ | Protect & Scale Your Business | Live business audit (weakest-link) + 90-day plan |

Every **workbook** is fillable in the browser, auto-saves to `localStorage`, and exports a PDF with
the typed answers baked in. Every document prints perfectly on US Letter.

> ⚠️ **Read this first — these are NOT mockups to rebuild in React.**
> The goal is to **serve these HTML files as-is**. They are complete, standalone documents (their own
> CSS + a little vanilla JS for the fillable fields, `localStorage` persistence, and the live
> calculators). Rewriting them as React components would add work and risk breaking the print layout
> and the save-as-PDF behavior. **Host them as static files and link/embed them.**

---

## What's in this bundle

```
design_handoff_course_ebooks/
├── README.md                          ← you are here
├── public-course/                     ← PRODUCTION-READY. Drop into Next.js /public/course/
│   ├── module-1-ebook.html            ← 20 single-file, self-contained docs
│   ├── module-1-workbook.html             (CSS + fonts + images all inlined)
│   ├── module-2-ebook.html
│   ├── module-2-workbook.html
│   │   … (modules 3–9, ebook + workbook each) …
│   ├── module-10-ebook.html
│   └── module-10-workbook.html
└── source/                            ← EDITABLE source (to make changes / re-style)
    ├── course/
    │   ├── lmg-course.css             ← ONE shared design system for ALL 20 documents
    │   ├── Module 1 - Ebook.html
    │   ├── Module 1 - Workbook.html
    │   │   … all 20 module HTML files …
    │   └── Module 10 - Workbook.html
    └── assets/
        ├── m1-cover.jpg  m1-outro.jpg ← per-module imagery (cover shared by the
        ├── m2-cover.jpg  m2-outro.jpg     module's ebook+workbook; outro on the ebook)
        │   … through …
        └── m10-cover.jpg m10-outro.jpg
```

**`public-course/` vs `source/` — which do I use?**
- `public-course/*.html` are fully **inlined** (one file each — images embedded as base64, so they
  range ~1.8–11 MB). Zero path/config to worry about — ideal to ship immediately.
- `source/` is the maintainable version: small HTML files that all share one `lmg-course.css` and
  link to real image files. Use this to edit copy/design. Re-inline afterward if you want single-file
  bundles again (see "Editing" below).

Pick **one** approach for production (see the two options next).

---

## Integrating into Next.js

### Option A — Static files in `/public` (simplest, recommended to start)

1. Copy everything from `public-course/` into your Next.js app at `public/course/`:
   ```
   your-nextjs-app/public/course/module-1-ebook.html  … module-10-workbook.html
   ```
2. They're served directly, e.g.:
   - `https://yoursite.com/course/module-1-ebook.html`
   - `https://yoursite.com/course/module-4-workbook.html`
3. Link to them with a plain `<a>` (NOT `next/link` — these are static HTML outside the router):
   ```tsx
   <a href="/course/module-1-ebook.html">Read the Module 1 Ebook</a>
   <a href="/course/module-1-workbook.html">Open the Module 1 Workbook</a>
   ```

This is enough to test on your VPS today. Fillable workbooks, live calculators, and Save-as-PDF all
work with no backend.

### Option B — Embed inside a styled course page (nicer in-app experience)

Keep the files in `public/course/` and wrap them in a route so they sit inside your site chrome (nav,
breadcrumbs, "mark complete", etc.). Use an `<iframe>` — the document keeps its own print/PDF
behavior:

```tsx
// app/course/[slug]/page.tsx   (slug e.g. "module-4-workbook")
export default function CourseDoc({ params }: { params: { slug: string } }) {
  return (
    <main style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      {/* your header / lesson nav here */}
      <iframe
        src={`/course/${params.slug}.html`}
        title="Course document"
        style={{ flex: 1, width: "100%", border: "none" }}
      />
    </main>
  );
}
```

> The Save-as-PDF button inside the iframe still works. To trigger it from YOUR chrome, call
> `iframeRef.current?.contentWindow?.print()`.

### A module-library index (optional)

```tsx
// app/course/page.tsx
const modules = [
  { n: 1,  title: "The Partnership Landscape" },
  { n: 2,  title: "Finding & Attracting Brands" },
  { n: 3,  title: "Vetting Opportunities" },
  { n: 4,  title: "Know Your Worth (Pricing)" },
  { n: 5,  title: "The Perfect Pitch" },
  { n: 6,  title: "Negotiating Like a Pro" },
  { n: 7,  title: "Contracts & Legal" },
  { n: 8,  title: "Delivering Results & Reporting" },
  { n: 9,  title: "Building Long-Term Partnerships" },
  { n: 10, title: "Protect & Scale" },
];

export default function CourseIndex() {
  return (
    <ul>
      {modules.map((m) => (
        <li key={m.n}>
          <strong>Module {m.n} — {m.title}</strong>
          <a href={`/course/module-${m.n}-ebook.html`}>Ebook</a>
          <a href={`/course/module-${m.n}-workbook.html`}>Workbook</a>
        </li>
      ))}
    </ul>
  );
}
```

---

## ⚠️ Wire up the tool CTA links before going live

Several ebooks/workbooks reference LMG's interactive tools via **placeholder anchor links**. Find &
replace these with your real lmg.media URLs (they appear as `href="#..."` on "Open the …" buttons):

| Placeholder | Points to | Appears in |
|---|---|---|
| `#rate-calculator` | Your Rate Calculator | Module 4 |
| `#templates-pack` | Outreach Email & DM Templates | Module 5 |
| `#negotiation-assistant` | Negotiation Assistant | Module 6 |
| `#contract-builder` | Contract Builder | Module 7 |

A simple find-and-replace across the files (in `source/` then re-inline, **or** directly in
`public-course/`) does it.

---

## How the interactive workbooks work (important behavior notes)

- **Fillable fields** are native inputs/textareas/checkboxes/radios styled as worksheet lines, boxes,
  and pills.
- **Live calculations** (per module): engagement rate (M1), deal scorecard + verdict band (M3),
  pricing range→pitch sentence (M4), retainer total contract value (M9), business-audit weakest-link
  (M10). All run client-side, no backend.
- **Persistence**: each workbook saves answers to its own **`localStorage`** key
  (`lmg-m1-workbook-v1` … `lmg-m10-workbook-v1`) and restores on reload. Each has a **Clear** button
  in its on-screen toolbar.
- **No backend required.**
- ⚠️ **`localStorage` is per-browser/per-device.** A student's answers do NOT follow them to another
  device or sync to an account. Fine for self-paced use. If you later want cross-device saving inside
  a logged-in course platform, that's the point to add a backend: each input has a stable `data-k`
  attribute, so you can read/POST the same field set to your API instead of `localStorage`. The
  save/restore logic lives in the `<script>` at the bottom of each workbook HTML.

## Save as PDF

Every document has a "⌘P · Save PDF" button (top toolbar) that calls `window.print()`. Print CSS is
tuned: US Letter, one page per sheet, backgrounds/photos preserved (`print-color-adjust: exact`). Tell
users (or default your print flow to): **Margins: None**, **enable "Background graphics"**. The
toolbar is hidden in print.

To also offer pre-rendered static PDFs, print each ebook once yourself and host the `.pdf` in
`public/course/` alongside the HTML.

---

## Editing & re-styling

- **All visual styling lives in ONE file:** `source/course/lmg-course.css` — the design system for
  every module (colors, type, page chrome, ebook components prefixed `eb-`, workbook components
  prefixed `wb-`). Edit once, every module updates.
- **Imagery:** each module has `m{N}-cover.jpg` (used by that module's ebook AND workbook cover) and
  `m{N}-outro.jpg` (the ebook's closing page). Swap a file to re-image a module — keep the filename.
- **To regenerate the single-file production bundles after editing**, inline each HTML with its assets
  (any HTML inliner that base64-embeds CSS/fonts/images). Or skip bundling and ship the `source/`
  version: copy `lmg-course.css` + the `assets/` images into `public/course/`, preserving the relative
  paths the HTML expects (`lmg-course.css` next to the HTML, images under `../assets/`).

## File-size note

The `public-course/` bundles embed their images, so they're larger (~1.8–11 MB each). If size matters
for your VPS/CDN, serve the `source/` version instead with separate, web-optimized images (convert the
cover JPGs to WebP). The HTML references are easy to repoint.

---

## Design tokens (for reference / brand consistency)

| Token | Value | Use |
|---|---|---|
| Pink (audience: creators) | `#FF4D94` | primary accent, headings, fills |
| Yellow | `#FFD700` | highlights, callouts |
| Blue (data) | `#3AAFF4` | audience snapshot / data |
| Grey (text) | `#3A3A3A` | body copy |
| Paper | `#ffffff` / `#faf9f6` | page backgrounds |
| Display font | Playfair Display | the "LMG MEDIA" wordmark only |
| Sans font | Manrope | all headings + body |
| Mono font | JetBrains Mono | page numbers / small meta |
| Page size | 816 × 1056 px | US Letter @ 96 dpi |

Brand wordmark = serif **LMG** + wide-tracked sans **MEDIA**.
