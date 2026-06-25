---
name: lmg-media-design
description: Use this skill to generate well-branded interfaces and assets for LMG Media, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick brand facts

- **LMG Media** is a premium influencer-marketing agency. Web: https://lmg.media
- Tagline: _Where Quality Brands Meet Iconic Influence._
- Brand colors: Yellow `#FFD700`, Pink `#FF4D94`, Blue `#3AAFF4`, Grey `#3A3A3A`
- Fonts: Manrope (UI) + Playfair Display (display/logo). Both Google Fonts.
- Two audiences in parallel: **Brands** (yellow accent) and **Influencers** (pink accent). Blue is reserved for **data/stats**.
- Visual feel: editorial luxury, warm neutrals, generous whitespace, photography-led. No emoji. No gradients as backgrounds.

## Key files

- `colors_and_type.css` — all design tokens (CSS variables). Import in every artifact.
- `components.css` — buttons, inputs, cards, badges, stat tiles, niche chips.
- `assets/` — wordmark + hero silk background.
- `ui_kits/website/` — full marketing-site recreation. Components are small JSX files (Header, Hero, AudienceSplit, NichesGrid, ServicesList, FAQs, Footer, AuthModal).
- `preview/` — small cards rendering each token cluster. Useful as visual reference.

## Starter snippet

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
<script src="https://unpkg.com/lucide@0.475.0/dist/umd/lucide.min.js"></script>

<button class="lmg-btn lmg-btn-primary">Start Your Campaign</button>
<button class="lmg-btn lmg-btn-secondary">Join as Influencer</button>
<span class="lmg-eyebrow" style="color: var(--lmg-pink)">For Influencers</span>
<h1 class="lmg-display-1">Where Quality Brands Meet <span class="lmg-accent-yellow">Iconic</span> <span class="lmg-accent-pink">Influence</span></h1>
```

## Voice

Professional yet dynamic. Strategic, contemporary, accessible, authentic, results-oriented. No emoji. Specific numbers over vague claims (`35.6% YoY`, `10K–1M Follower Range`). Active two- or three-word CTAs (`Start Your Campaign`, `Join as Influencer`).
