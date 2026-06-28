# Yog Jivan Legacy — World-Class Luxury Upgrade Plan

Preserving the existing dark luxury theme, gold/amber palette, animations and brand identity. This is an *upgrade* on top of the current site, not a rebuild.

Given the scope (8 phases, 30+ sub-features), I'll ship in **4 build waves** so you can review progressively. Each wave is independently shippable.

---

## Wave 1 — Conversion Layer (Phase 1 + page-level CRO)

New components:
- `MobileStickyCTA.tsx` — fixed bottom bar (mobile only, hidden ≥md), "Book Free Trial" + "WhatsApp", glassmorphism + gold glow, `bottom-[env(safe-area-inset-bottom)]`, offset so it never overlaps `FloatingWhatsApp` (move WhatsApp button up on mobile when bar is visible).
- `FloatingConsultationCTA.tsx` — appears after `30s` OR `scrollY > 50%` (whichever first). Glass card top-right desktop / inline mobile. Dismiss → `localStorage` for 7 days.
- `ExitIntentModal.tsx` — desktop: `mouseleave` on top edge; mobile: `>75%` scroll. Single shadcn `Dialog`. Dismissal persisted in `localStorage`.
- Mount all three in `__root.tsx` so they're sitewide.

## Wave 2 — Trust & Credibility (Phase 2)

- Extend `TrustSection.tsx` with new "Trusted Worldwide" block: animated SVG world map (dot grid + 6 gold arcs from India → VN/US/UK/FR/AU/CA), "20+ Countries" headline.
- New `FounderCredentials.tsx` — 6 luxury glass cards (12+ Yrs, Master Degree, 1000+ Students, Certified Indian Master, Global Educator, Therapeutic Specialist).
- New `SuccessStories.tsx` — luxury carousel with photo / problem / transformation / quote / country / duration (3 stories: back pain, stress, anxiety). Reuse existing gallery photos.
- New `GoogleReviews.tsx` — carousel with star rating, verified badge, "via Google" source. Replaces/augments existing Testimonials trust strip.

## Wave 3 — Services Expansion (Phase 3)

- Enhance existing `Services.tsx` cards: background image at 20% opacity + 1.5px blur + dark gradient overlay, shimmer sweep, hover zoom 1.05, ambient gold glow. (Most already exists — tune values to spec.)
- Remove any visible price → replace with "Personalized Luxury Programs" badge sitewide (audit `Programs.tsx`, `Services.tsx`, route pages).
- New sections appended to homepage flow:
  1. `SignatureJourneys.tsx` — Private Mentorship / Therapeutic Healing / Global Online (3 large editorial cards).
  2. `WhoIsThisFor.tsx` — 6 audience cards (Busy Professionals, Chronic Pain, Stress, Beginners, Advanced, Corporate Leaders).
  3. `PhilosophyLineage.tsx` — vertical timeline: Ancient Wisdom → Modern Science → Personal Transformation → Lifelong Wellbeing.
  4. `WellnessMethod.tsx` — 4-step process: Assessment → Customized Program → Guided Practice → Tracking.

## Wave 4 — SEO, Performance, Luxury Polish, A11y, i18n (Phases 4–8)

SEO:
- Per-route `head()` audit for all routes (`/`, `/about`, `/programs`, `/gallery`, `/contact`, `/corporate`, `/online`, `/personal-training`, `/blog`, `/testimonials`) — unique title, description, canonical, OG, Twitter card.
- Root JSON-LD: `Organization` + `LocalBusiness` + `YogaStudio` (2 studio addresses) + `BreadcrumbList` helpers.
- FAQ schema on `/programs`; Review schema on `/testimonials`.
- Improve `robots.txt`; sitemap server route already exists — verify entries.

Performance:
- Add `loading="lazy"` + explicit `width`/`height` on all `<img>` (CLS).
- Hero video keeps `preload="metadata"`; hero poster `<link rel="preload" as="image">` in route head.
- Audit gallery images for `decoding="async"`.

Luxury experience:
- `ScrollProgress.tsx` — top 2px gold gradient bar, scaleX with scrollYProgress.
- `MouseParallax.tsx` — desktop-only wrapper, ≤10px translate; opt-in via `data-parallax` attribute on hero accent layer.
- `SacredDivider.tsx` — SVG mandala-line divider component for between major sections.
- `LuxuryLoader.tsx` — first-paint loader: gold logo + particle burst, fades on `load`. Mount in `__root.tsx`, gated by sessionStorage so it only shows once per session.

Accessibility:
- Sweep for missing `aria-label` on icon-only buttons; add focus-visible rings using existing `--gold` token; ensure `alt` on every `<img>`; verify single `<main>` per route.

Internationalization:
- Extend `src/lib/language.tsx` to support `'en' | 'vi' | 'hi'` (hi stub-ready, falls back to en).
- Add `useTimezone()` hook → `Intl.DateTimeFormat().resolvedOptions().timeZone`, surface in `SmartConsultation` review step ("Times shown in your timezone: Asia/Saigon").

---

## Technical notes

- All new sections follow existing `glass-luxe` / `section-tight` / gold-gradient conventions in `styles.css`.
- No new heavy dependencies. Reuse `framer-motion`, existing GSAP, existing assets.
- Pricing audit will use `rg "\\$|VND|₫|/mo|/month|price"` across `src/` to catch every instance.
- All new copy bilingual via `useLang()` keys.
- Estimated final bundle delta: ~25–35KB gzip (mostly the 4 new content sections).

## Order of execution after approval

1. Wave 1 (CRO) — ~6 file writes
2. Wave 2 (Trust) — ~4 new components + 1 edit
3. Wave 3 (Services + pricing sweep) — ~5 new components + edits
4. Wave 4 (SEO/perf/polish/a11y/i18n) — route head() pass + 4 polish components + language extension

Reply "go" to ship Wave 1, or "ship all" to run all four waves back-to-back.
