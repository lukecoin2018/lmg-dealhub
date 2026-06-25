# UI Kit · LMG Media Website

Visual reconstruction of the **lmg.media** marketing homepage. There was no codebase or Figma provided, so this kit was rebuilt from the homepage screenshot (`uploads/Screenshot 2026-05-14 at 11.33.47.png`) plus the section spec in `uploads/LMG Media Branding 2025.pdf`.

Open `index.html` to see the interactive page.

## Surfaces

| Section | File | Notes |
| --- | --- | --- |
| Top bar (logo, nav, theme & lang toggles, Sign In, Get Started) | `Header.jsx` | Sticky, blurs on scroll, links to all pages |
| Hero (silk background, dual CTA, stats strip) | `Hero.jsx` | Pixel-aligned with screenshot |
| For Brands / For Influencers split | `AudienceSplit.jsx` | Two-column with role-specific CTA |
| Niches grid | `NichesGrid.jsx` | Lifestyle, Fashion, Luxury, Travel, Wellness, Fitness, AI |
| Services (photo cards, audience color-coded) | `ServicesList.jsx` | Pixel-matched to live site — toggle Influencer ↔ Brand |
| FAQs | `FAQs.jsx` | Accordion |
| Footer | `Footer.jsx` | Wordmark, links, social, fine print |
| Sign-In / Get Started modal | `AuthModal.jsx` | Fake auth, two-tab (brand / influencer) |
| Atoms (Button, Icon, Eyebrow, etc.) | `shared.jsx` | Used across pages |

## Pages

| Page | File | Notes |
| --- | --- | --- |
| Homepage | `index.html` | Hero + audience + niches + services + FAQ + footer |
| Resources library | `resources.html` | Featured This Week + filter sidebar + resource grid |
| Resource detail | `resource-detail.html` | Purple gradient hero + body + Free-Download sidebar |
| Insights blog | `insights.html` | Dark editorial hero + sidebar (categories + Stay Updated) + posts |

## Interactions wired up

- Header **theme toggle** flips `data-theme` between light and dark.
- Header **EN | ES** flips a tiny `lang` state. Most copy stays English; a couple of strings flip just to demonstrate.
- **Sign In** and **Get Started** open the `AuthModal`. Two tabs: Brand / Influencer. Fake submit dismisses the modal and shows a thank-you toast.
- **Niche chips** filter the Services list.
- **FAQ accordion** opens one at a time.
- Scrolling past 80 px applies the blurred sticky header background.

## Known gaps (please share to upgrade)

- No real photography library — we use a single silk-fabric crop from the screenshot for the hero. The brief calls for "4K video snippets" and "custom-shot photography (Sasha Samsonova, Studio BONFOI)" — drop assets in `../../assets/` and we'll wire them in.
- No vector logo. The wordmark is rendered with **Playfair Display** to match the screenshot; swap in the real SVG when available.
- Form submission is faked — no backend.
- We did not recreate every long-form info page (e.g. "How to become a social media influencer"). Links are placeholders.
