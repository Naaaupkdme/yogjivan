# Phase 5A — Local CTR, Beginner SEO/AEO/GEO and Lead-Path Sprint (2026-08-04)

## Files changed
- `src/routes/index.tsx` — homepage head() rewritten (local-first title/description/OG/Twitter), obsolete `keywords` meta removed, WebSite `SearchAction` removed, `LocalIntro` added.
- `src/components/site/LocalIntro.tsx` — new visible answer-style intro (two studios serving the Hai Duong urban area + live online), contextual internal links to /yoga-for-beginners, /online-yoga-classes, /programs, /personal-training, /contact.
- `src/lib/language.tsx` — hero copy (EN + VI) rewritten local-first; added `hero.online` label.
- `src/components/site/Hero.tsx` — primary CTA = studio enquiry (/contact#consultation), secondary = /online-yoga-classes, WhatsApp demoted to a text link.
- `src/routes/yoga-for-beginners.tsx` — full rewrite (see below).

## Homepage search intent
- Old: "Authentic Indian Online Yoga · Live Worldwide" — online-first, no local entity clarity.
- New: "Yoga Classes in Hai Duong | Two Studios & Live Online — Yog Jivan"; H1/hero and a visible intro state who is served, where the studios are, and that live online is available.

## Beginner page search intent
- Old: generic "Yoga for Beginners — Start with Confidence", duplicated long cards + FAQ accordion, "Free First Class" trust stat.
- New: "Yoga for Beginners in Hai Duong & Live Online"; answer capsule + 5 quick answers, single accordion as the one visible Q&A source, studio-vs-online decision section, three CTAs (open / mid / final).

## Unsupported claims removed
- All fixed timelines (weeks 1–2, 2–4, 3–4, 6–8, 8–12), cycle-regularity, HRV proxy, guaranteed sleep/posture/mobility gains, "4-week practice map".
- "Free First Class" stat and generic free-trial wording → centralized `TRIAL.summary` (3 days free live group access + 1 complimentary private session, no card, one per new student), explicitly online-only.
- Contradictory "3-minute intake" → confirmed 15-minute online onboarding/health-assessment.
- Added `HEALTH_DISCLAIMER` (short in safety Q&A, long in final CTA).

## Schema
- Homepage: removed `SearchAction`; kept WebSite/Organization/LocalBusiness/Person/breadcrumb. No AggregateRating.
- Beginner page: FAQPage now mirrors exactly the five visible accordion questions/answers; BreadcrumbList unchanged.

## CTA paths preserved
`/contact#consultation`, `/online-yoga-classes`, `SOCIAL.whatsapp`. No analytics event names, forms, Supabase, Make.com, consent or dependency changes.

## Tests
- `bunx tsgo --noEmit` — clean.

## Deferred / manual
- Not published. Live production verification, Search Console re-submission and CTR measurement pending after publish.
