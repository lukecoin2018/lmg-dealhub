# LMG Media — Design System

A complete brand & UI design system for **LMG Media**, a premium influencer-marketing agency. This system gives design agents and Claude Code the assets, tokens, copy rules, and ready-made UI components to mock and ship work in LMG's brand voice.

> **Tagline:** _Where Quality Brands Meet Iconic Influence._
> **Web:** https://lmg.media

---

## Sources

| Source | Where it lives now |
| --- | --- |
| `LMG Media Branding 2025.pdf` (official kit — colors, logo, voice, services, hero spec) | `uploads/LMG Media Branding 2025.pdf` (also distilled into this README) |
| Homepage screenshot | `uploads/Screenshot 2026-05-14 at 11.33.47.png` |
| **Real logo file** (PNG, transparent, yellow Didone wordmark) | `uploads/lmgmedialogo copy.png` → `assets/lmg-logo.png` |
| **Frontpage source** (Next.js page.tsx with section composition + SEO structured data) | `uploads/page (96).tsx.txt` (kept as `.txt` reference so the design-system compiler doesn't try to bundle its unresolvable `@/…` / npm imports) |
| **AI Match Finder source** (Next.js `ai-match-finder.tsx`, uses framer-motion + lucide-react) | `uploads/ai-match-finder.tsx.txt` (same `.txt` reason) |
| Site screenshots: Resource detail (purple hero), Featured This Week, Insights blog, For Influencers services, For Brands services | `uploads/Screenshot 2026-05-14 at 12.0[3-5].*.png` → `assets/ref-*.png` |
| Social screenshots: TikTok feed, TikTok detail, Instagram grid | `uploads/Screenshot 2026-05-14 at 12.1[4-5].*.png` → `assets/ref-tiktok-*.png`, `assets/ref-instagram-grid.png` |
| Live website | https://lmg.media (full GitHub repo not provided — contains sensitive info per user) |

> The `page.tsx` we received references these section components: `<HeroSection />`, `<AIMatchFinder />`, `<AIMatchingStatsSection />`, `<DualAudienceSection />`, `<ServicesOverview />`, `<FAQSection />`, `<CTASection />`. Our `ui_kits/website/` mirrors that composition. **The AI Match Finder + AI Matching Stats sections are noted but not yet built** — share those component sources if you'd like them mirrored exactly.

---

## What LMG Media does

LMG Media is a **premium influencer-marketing agency** — a strategic connector between brands/advertisers and high-impact influencers. The agency specializes in data-driven matchmaking, AI-powered vetting, and end-to-end campaign management, focused on the **10K–1M follower** range across **lifestyle, luxury, fashion, wellness, travel, fitness, tech, and AI** verticals.

There are **two audiences** the brand speaks to in parallel, and the website is structured around both:

1. **Brands & Advertisers** — marketing managers / brand directors, 25–45, urban hubs (NYC, LA, Miami, London, Dubai, Sydney). Pain: vetting influencers, measuring ROI, managing many relationships. Primary CTA: **Start Your Campaign**.
2. **Influencers / Creators** — content creators 21–35, 20K+ followers. Pain: low-ball offers, scaling without losing authenticity. Primary CTA: **Join as Influencer**.

### Services (used as section content in UI kit)

- **For Brands:** Strategic Campaign Development · Influencer Sourcing · Contracting · Content Production · Brand Consulting · Performance Analytics
- **For Influencers:** Personal Brand Development · Content Production Support · Growth & Monetization · Exclusive Brand Partnerships · Contract Negotiation
- **Niches:** Lifestyle · Travel · Fashion · Luxury · Fitness & Wellness · AI Influencers

---

## Content Fundamentals

Tone is **professional yet dynamic** — the brand positions itself as a "strategic partner" rather than a service provider. Copy blends analytical confidence with editorial polish. Think _Vogue Business meets a McKinsey deck_.

**Voice attributes** (from the official kit):

- **Strategic yet creative** — analysis with creative solutions, never one or the other.
- **Contemporary, not trendy** — modern without slang or hype cycles.
- **Accessible** — professional without unnecessary jargon. Plain-language definitions even for industry terms (e.g. "Macro influencer" gets a one-line definition).
- **Authentic** — _genuine connections_ over manufactured engagement. The word "authentic" is load-bearing — use it.
- **Results-oriented** — outcomes-first, but the creative process is respected.

**Writing rules**

| | Yes | No |
| --- | --- | --- |
| Pronouns | _We_ connect, _your_ campaign | I, me, our team's |
| Sentence rhythm | Bold short statement → refined elaboration | Run-on marketing speak |
| Numbers | Specific (`35.6% YoY Growth`, `86% Consumer Influence Rate`, `10K–1M Follower Range`) | Vague ("a lot", "many") |
| Casing | Title Case for nav, section labels, CTAs. Sentence case for body. | ALL CAPS for body or long strings |
| Emoji | **Never in product copy.** No emoji in any text. | 🎉 ✨ 🔥 |
| Industry terms | Define on first mention ("micro-influencer (10K–50K followers)") | Assume reader knows |
| Eyebrow labels | `FOR BRANDS` · `FOR INFLUENCERS` · `OUR APPROACH` (uppercase, wide-tracked) | Same case as body |

**Signature phrases to lean on**

- "Where Quality Brands Meet Iconic Influence" (the headline pattern — bold neutral start, accent-color noun, accent-color noun)
- "Connecting visionary brands with influential voices…"
- "Strategic Creator Partnerships"
- "Authentic collaborations that drive ROI"
- "Data-driven matchmaking"

**Headline pattern.** Two-line statement where the brand-defining noun gets the **yellow** treatment and the audience-defining noun gets the **pink** treatment. Example: _"Where Quality Brands Meet **Iconic** **Influence**"_ — `Iconic` yellow, `Influence` pink. Reverse for influencer-side pages.

**CTA copy.** Active, two- or three-word imperatives, no exclamation marks:
`Start Your Campaign` · `Join as Influencer` · `Discover Our Approach` · `Get Started` · `Sign In`. Avoid "Click here", "Learn more!".

---

## Visual Foundations

LMG Media has **two distinct visual modes** working in tension:

1. **Editorial luxury** — homepage hero, page chrome. Soft silk-fabric photography, generous whitespace, restrained type, yellow + pink + blue used sparingly as accent words on white. _Refined._
2. **Maximalist color-blocking** — service cards, resource photography, social feeds (TikTok / Instagram). Big flat fields of **pink + yellow + electric blue + black** behind AI-generated luxury imagery (neon-pink hair, vintage Ferraris, private jets in Monaco, diamond chokers, gold leaf desserts). _Bold._

Both are LMG. Use the editorial mode for navigation, hero, and copy-heavy sections. Use the maximalist mode for photography, card art, social, and any time the brand is asserting itself visually. The link between the two is the **yellow / pink / blue trio** — those colors anchor everything.

### Color

- **Yellow `#FFD700`** is the dominant brand color — used for the logo, primary CTAs (`Get Started`, `Start Your Campaign`, `Download Now - Free`), and the "brand" accent word in headlines. Featured pills are yellow on dark photography.
- **Pink `#FF4D94`** is the **For Influencers** color. Every influencer-facing surface — pill badges, CTA buttons, card-icon badge backgrounds, key-features accent lines, "+N more features" links — uses pink.
- **Blue `#3AAFF4`** is the **For Brands** color, AND the **data/stats** color. Brand-side service cards, CTAs (`Get Quote`), and pill badges; stat tickers (`35.6% YoY Growth`).
- **Audience color-coding is the single most important pattern.** Every section that addresses brands uses blue; every section that addresses influencers uses pink. Never cross them.
- **Grey `#3A3A3A`** is body text. **White `#FFFFFF`** / `#FAFAF8` is the dominant page background.
- **Purple → Pink → Magenta gradient** (`--grad-resource: linear-gradient(135deg, #B341E8, #D63D8E, #FF4D94)`) is used for **resource detail hero banners**. Always wide & tall, with white type.
- **Black `#0A0A0A`** is the dark-mode page color AND the background for social-feed thumbnails. Dark mode is officially supported ("evening browsing elegance").

### Typography

- **Logo:** Didone-style serif (matches Playfair Display) in `--lmg-yellow`. The wordmark stacks `LMG` (heavy serif) over `MEDIA` (thin, wide-tracked). Use the supplied PNG (`assets/lmg-logo.png`), not a re-typed version.
- **Display headlines:** Bold sans (Manrope 800) at 48–88 px, tight tracking. Used with multi-colored accent words (`<span class="lmg-accent-yellow">Iconic</span> <span class="lmg-accent-pink">Influence</span>`).
- **UI / body:** Manrope or DM Sans, 14–17 px, line-height 1.55.
- **Substitution note:** the brief never names a font. Manrope + Playfair Display are best-guess Google Fonts. Please share the production webfonts.

### Photography

- **AI-generated luxury imagery is the signature.** Pink-haired model, sunglasses with LMG Media logo, private jets, Monaco at dusk, vintage Ferraris, diamond jewelry, marble tables with gold-leaf desserts, conference rooms with influencer mood boards. High-saturation, high-contrast.
- Photographs often sit on a **pink + yellow + blue color-blocked background** (split horizontal/vertical fields) — that's the LMG photographic signature on social.
- Every card has a photo. Avoid copy-only cards.

### Layout & Spacing

- Container max-width **1200 px** (content), **1440 px** (wide hero). Gutters `clamp(20px, 4vw, 48px)`.
- **Service cards are the workhorse layout**: full-bleed photo on top with an audience pill badge in the top-right (`For Brands` blue / `For Influencers` pink), colored icon-badge + title row, paragraph, vertical-rule "Key Features:" list with audience-colored bullet dots, `+N more features` link, and a **dual CTA**: primary filled (audience color) + outline (audience color).
- **Resource cards** use a different pattern: photo with a tiny `level` pill (top-left), circle icon (top-right), optional yellow `Featured` pill (bottom-left), audience accent line (bottom 4 px), then a tight body with title + 2-line excerpt.
- 96 px between major sections; 128 px around the hero.

### Motion

- Editorial mode: soft fades, gentle parallax, no overshoot. 240 ms base, 900 ms hero.
- Maximalist mode: video loops cut fast (6 seconds, looped), bold zoom-ins on photography, neon-color light streaks across photos.
- **Hover state** on cards: lift 2–3 px, deepen shadow. Buttons: deepen audience color, no scale. **Never bounce.**

### Borders, Cards, Shadows

- Cards have **no visible border** — they sit on white with a subtle shadow (`--shadow-sm` → `--shadow-md` on hover) and rounded `--r-lg` (16 px).
- Shadows are **warm-grey ambient**, never blue or black-saturated. Layered: `0 8px 24px + 0 2px 6px`.
- Hairlines (`--border-1: #E8E6DF`) only on input fields, table rows, footer divider.

### Corner Radii

- Buttons & inputs: **10–12 px** (`--r-md`).
- Pills (audience badges, level pills, lang toggle): `--r-pill` (999 px).
- Cards: **16 px** (`--r-lg`); large hero containers: **24 px** (`--r-xl`).
- Icon-badge squares (the pink/blue rounded squares behind service-card icons): **14 px**.

### Transparency & Blur

- **Sticky header** uses `background: rgba(255,255,255,0.85); backdrop-filter: blur(14px)` after scroll-past-60 px.
- **Hero overlay** uses a soft 35–55% white wash over photography to protect text legibility.
- **Modal overlay** uses `rgba(20,18,12,0.5) + blur(6px)`.
- Used nowhere else — no glass cards, no frosted nav items.

---

## Iconography

LMG Media's icons are **thin, line-based, monochrome** — they appear in the screenshot as small flourishes next to stat callouts (a 📈 chart-up, ▶ play, 👥 users — but those are illustrative glyphs in the screenshot, not emoji). The brand uses icons sparingly: only to mark stat callouts, action verbs, and form-field affordances. **Never decorative.**

- **System used:** [Lucide](https://lucide.dev) — line-based, ~1.5-px stroke, monochrome. Free, CDN-available, ~1400 icons. Matches the editorial-minimal vibe of the screenshot.
- **Substitution note:** LMG Media has no published icon set. Lucide is our pick; if the team has a custom set, swap it in.
- **Color:** icons inherit `currentColor` and are typically `--fg-1` or `--fg-2`. Accent-color icons (yellow / pink / blue) only when paired with the matching stat color, e.g. blue `trending-up` next to `86% Consumer Influence Rate`.
- **Size:** 16px in body copy, 20px in buttons, 24px in section headers, 32px+ in feature/stat tiles.
- **Emoji:** never. The screenshot's "🌐 EN | ES" globe is a `globe` icon, not an emoji.
- **Unicode dingbats:** avoided. Use real icons or nothing.

CDN usage:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="trending-up" style="color: var(--lmg-blue)"></i>
<script>lucide.createIcons();</script>
```

Assets currently in `assets/`:

- `lmg-logo.png` — wordmark (cropped from screenshot, white background)
- `lmg-logo-transparent.png` — wordmark with transparent bg
- `hero-silk-bg.jpg` — cream silk fabric photograph (for hero / luxury surfaces)

> If higher-resolution vector logo files exist (SVG/AI/PDF), please share them — the current logo is a raster crop from the homepage screenshot.

---

## Components (exported)

The reusable React atoms are exposed on `window.LMGMediaDesignSystem_019e25` once the bundle (`_ds_bundle.js`) is loaded. Each lives in `components/<Name>/` with a `<Name>.jsx` (`export function <Name>`), a `<Name>.d.ts` (props), and a `@dsCard` preview that renders it live. They render against the classes in `components.css`, so include `colors_and_type.css` + `components.css` too.

| Component | What it is | Key props |
| --- | --- | --- |
| **Button** | Primary action button. | `variant` (`primary` yellow / `secondary` pink / `blue` / `ghost` / `outline` / `dark`), `size`, `icon`, `iconRight` (Lucide names) |
| **Badge** | Pill for audience tags, levels, status. | `tone` (`pink` influencers / `blue` brands / `yellow` featured / `neutral` / `dark` / `outline`), `icon` |
| **StatTile** | Signature stat callout. | `value`, `label`, `tone` (`blue` data / `pink` / `yellow`) |
| **ServiceCard** | The workhorse audience-coded card — photo, badge, key-feature list, dual CTA. | `audience` (`brand` blue / `influencer` pink), `pill`, `photo`, `icon`, `title`, `description`, `features[]`, `moreCount` |

```html
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Badge, StatTile, ServiceCard } = window.LMGMediaDesignSystem_019e25;
</script>
```

> Audience color-coding is load-bearing: pink for influencers, blue for brands, yellow for the brand itself. Never cross them. Icon names come from Lucide; call `lucide.createIcons()` after render for any component using an `icon` prop.

## Folder index

```
README.md                  ← you are here
SKILL.md                   ← agent-skill entry point (cross-compatible with Claude Code skills)
colors_and_type.css        ← all design tokens (CSS vars) + base type rules
components.css             ← button / input / card / badge / service-card patterns
components/                ← exported React components (Button, Badge, StatTile, ServiceCard)
assets/                    ← logos, hero backgrounds, real visual material
preview/                   ← Design-System-tab cards (one HTML per token cluster)
course/                    ← Brand Partnership Playbook ebooks + workbooks (10 modules)
ui_kits/
  website/                 ← marketing site recreation (homepage, sections — global-script demo app)
explorations/              ← side-by-side design directions for new surfaces (lesson-page/, etc.)
uploads/                   ← original brand assets (do not modify; copy out as needed)
```

### UI kits

| Kit | Folder | Surfaces covered |
| --- | --- | --- |
| **Website** (lmg.media) | `ui_kits/website/` | Homepage (`index.html`): header, hero, audience split, niches, services (photo cards w/ audience color), FAQs, footer. Resources library (`resources.html`): featured-this-week card + filter sidebar + resource grid. Resource detail (`resource-detail.html`): purple-pink gradient hero. Insights blog (`insights.html`): dark editorial hero + sidebar + post grid. |

(No mobile app or dashboard was provided — only the marketing site.)

---

## Open questions for the team

1. **Brand fonts** — the PDF describes "contemporary clean typography" but doesn't name a font. We substituted Manrope (UI) + Playfair Display (display/logo). Confirm or swap.
2. **AI Match Finder + AI Matching Stats components** — the `page.tsx` we received references `<AIMatchFinder />` and `<AIMatchingStatsSection />`. Share the section sources and we'll mirror them on the homepage.
3. **Photography library** — the service-card photos are currently cropped from the provided screenshots. If you can share the originals (or a Google Drive of approved photography), we'll swap them in cleanly without the baked-in `For Brands` / `For Influencers` pill overlays.
4. **Resource-hero gradient angle / stops** — we approximated `linear-gradient(135deg, #B341E8 → #D63D8E → #FF4D94)` from the resource-detail screenshot. Confirm or override.
5. **Dark mode** — we generated a dark-mode pass on top of the same accents. Confirm.
6. **Icon set** — Lucide is the substitution. Is there a custom set we should drop in?
7. **GitHub access** — if you can extract a sanitized branch with components only (no env / API keys), we can mirror the design 1:1.
