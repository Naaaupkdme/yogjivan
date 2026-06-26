## Scope

Rebuild every section of the homepage to match the 11 design boards in your PDF, plus add the new Smart Wellness Journey quiz. The current site already has the right bones (dark luxury theme, gold accents, glass, ambient canvas). This pass replaces composition, hierarchy, imagery, and storytelling — not the design system.

I'll keep the existing token system (Champagne Gold, Onyx, Ivory, Bronze are already close — I'll only retune the palette to your exact hex: #050505 / #1B120D / #C8A46A / #F4EBDD / #7A5C3A). Typography swaps to Cormorant Garamond (headings) + Inter (body) loaded via `<link>` in `__root.tsx`.

## What changes, board by board

1. **Header** — narrower floating glass pill, larger logo, ALL CAPS wordmark already there; add EN/VI + FB/YT/WA icons + gold "Book Free Trial" CTA in a tighter row.
2. **Hero** — keep 65/35 split + ping‑pong video; tighten copy to the three‑line headline; add three trust badges at the bottom (12+ Years • 1000+ Students • 20+ Countries).
3. **Founder Journey → Tree of Transformation** — full rebuild. SVG Banyan tree (roots in India, branches into Vietnam), circular gold portrait of Master Anil at the trunk, 5 milestones woven into branches (2013/2017/2019/2022/2026), faint India→Vietnam map arc behind.
4. **Trust & Credibility** — keep 6 editorial image cards, retune copy + add 01–06 numerals, swap to the 6 board‑specified scenes (community / outdoor class / world map / therapeutic hands / master+student / video testimonial).
5. **Programs** — 4 large editorial cards (Private / Studio / Therapeutic / Advanced) with cinematic imagery, numbered, benefit bullets, gold CTAs.
6. **Transformation Story** — split layout: editorial copy on left, before/after evolution slider on right (mastery evolution, not body transformation).
7. **Gallery** — large hero image + masonry with category filters (Master Anil / Community / Transformations / Events / Retreats) and cinematic lightbox.
8. **Community** — "Held by People. Shaped by Ritual." 3 emotional blocks (outdoor / studio celebration / retreat).
9. **Smart Wellness Journey (NEW)** — 6‑step luxury quiz with gold progress rail: Details → Goals → Experience → Health → Preferences → Done. Submits to WhatsApp link.
10. **Testimonials** — large quote cards + country flags + Google rating strip + video thumbnails.
11. **Consultation** — split: studio imagery + WhatsApp/email/2 studios on left, premium form on right, interactive embedded map below.
12. **Footer** — Gita quote top, Instagram strip, newsletter, quick links, studio details, social, founder signature, gold particles.

## Global polish

- Palette retuned to your exact hex values in `src/styles.css`.
- Cormorant Garamond + Inter loaded via `<link>` in `__root.tsx`; `--font-display` updated.
- Section reveal animations standardized (Framer Motion `whileInView`, slow easing).
- Lotus bloom page loader, scroll progress bar, cursor glow (desktop only), floating Sanskrit quotes.
- Floating WhatsApp already present — kept.

## What I will NOT change

- Routing, server functions, language provider API, asset URLs, SEO scaffold in `__root.tsx` (only meta copy refreshed).
- Existing shadcn components, FloatingWhatsApp, AmbientCanvas.

## Out of scope (call out if you want them)

- Ambient sound toggle (needs audio asset + autoplay UX decision).
- Real Instagram API strip (will use curated image strip instead).
- Real Google Reviews API (will use static curated quotes with Google badge).

## Order of execution

1. Tokens + fonts (`styles.css`, `__root.tsx`).
2. Header + Hero refinements.
3. Tree of Transformation (biggest new build).
4. Trust, Programs, Transformation, Gallery, Community refinements.
5. Smart Wellness Journey quiz (new component + mount on home).
6. Testimonials, Consultation, Footer refinements.
7. Global effects (loader, scroll progress, cursor glow).

Reply "go" and I'll start shipping; or tell me which boards to prioritize first if you'd rather see this land in waves.