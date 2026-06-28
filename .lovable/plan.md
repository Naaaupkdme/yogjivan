## Yog Jivan Sanctuary — Premium Redesign & Performance Overhaul

Preserving existing dark luxury identity, gold accents, and multilingual architecture. No rebuild from scratch — surgical upgrades to existing components.

### 1. Performance Foundation (highest impact)

- Convert `src/routes/index.tsx` to lazy-load all below-the-fold sections via `React.lazy` + `Suspense` with skeleton fallbacks. Only Hero + SiteHeader render eagerly.
- Create `src/components/site/LuxuryImage.tsx` — reusable image primitive: native `loading="lazy"`, `decoding="async"`, fade-in on load, optional dark overlay (35%), gold shimmer, 28px radius, desktop-only hover zoom, graceful fallback.
- Audit Framer Motion: replace always-on animations with `whileInView` (viewport-triggered, `once: true`).
- Reduce `AmbientCanvas` particle count on mobile; disable on `prefers-reduced-motion`.
- Add `<link rel="preload">` for hero video poster + LCP image in route head.

### 2. Global Design Tokens

- In `src/styles.css`, add section spacing utilities: `.section-y` → `padding-block: clamp(72px, 10vw, 120px)`.
- Apply across all section components.

### 3. Section-Level Upgrades (preserve existing structure)

| Section | Action |
|---|---|
| Hero | Update copy to new headline/sub, keep trust metrics, ensure WhatsApp secondary CTA visible |
| TrustSection | Already has background image support — verify 35% overlay + shimmer |
| **NEW** WhyChooseYogJivan | 6 premium feature cards (glass, gold icons, viewport-triggered) |
| Programs/Services | Upgrade cards with parallax (desktop only), 45% overlay, disable motion on mobile |
| **NEW** FounderStory | Timeline + portrait (reuse FounderJourney data, simplify) |
| Gallery | Already masonry + lightbox — verify lazy loading via LuxuryImage |
| **NEW** VideoTestimonials | Slider with YouTube embeds, auto-pause on slide change |
| Programs (pricing) | Strip prices, show "Premium Packages Available" badges, single CTA |
| **NEW** FAQ | 10 SEO FAQs with accordion + FAQPage JSON-LD schema |
| SmartConsultation | Convert to right-side floating slide-in panel with 5-step form |
| FloatingWhatsApp | Move to left side, always visible |

### 4. SEO & Accessibility

- Add LocalBusiness + FAQPage + BreadcrumbList JSON-LD to root + index route.
- Remove `maximum-scale` / `user-scalable=no` from viewport meta.
- Verify single H1 per route, alt text on all images.

### 5. Mobile UX

- Disable parallax + hover effects via `md:` breakpoints.
- Keep existing `MobileStickyCTA` (already left/right split).
- Increase tap target min-height to 44px on all CTAs.

### Technical Notes

- All new sections lazy-imported in `routes/index.tsx`.
- LuxuryImage replaces `<img>` tags incrementally in upgraded sections only (don't touch unrelated ones).
- FAQ component uses shadcn `Accordion` (already installed).
- VideoTestimonials uses `<iframe>` with `loading="lazy"` + intersection-observer pause.
- No new dependencies needed.

### Out of Scope

- Email/WhatsApp backend integration wiring (form already submits to Supabase leads table; "ready" hooks remain).
- Translating new copy strings (existing `src/lib/language.tsx` continues to work; new strings added in English, follow existing pattern).
