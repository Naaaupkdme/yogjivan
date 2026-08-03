# Phase 4B1 — Facts, Trust & Consistency Cleanup (2026-08-04)

Internal audit record. Build mode, no publish.

## Scope implemented

| # | Requirement | Status |
|---|---|---|
| 1 | Typed central fact files under `src/lib/facts` (brand, teacher, contact, locations, online-class, pricing, trial, policies, trust) | Completed |
| 2 | Contact normalized: +84 782 046 066 / tel:+84782046066 / wa.me/84782046066 / zalo.me/84782046066 / hello@yogjivan.com | Completed |
| 3 | Formal addresses normalized to Thành phố Hải Phòng 170000; "Hai Duong urban area" retained as local descriptor; no "Hai Duong Province" | Completed |
| 4 | Canonical title "Founder & Lead Yoga Teacher"; no invented certification body/year | Completed |
| 5 | Trial normalized (3 days free live group + 1 complimentary private, no card, one offer per new student, 15-min onboarding/health conversation) | Completed |
| 6 | Plan ladder 19.99 / 54.99 / 99.99 / 179.99 USD; no $49; no VND exposure; no /pricing route | Completed |
| 7 | Class facts: 60 min, max 8, camera-on with privacy note, EN/VI/HI, 48h catch-up, same-teacher continuity; aerial Studio 1 only | Completed |
| 8 | Legally safer refund/cancellation wording added to pricing area + FAQ | Completed |
| 9 | 12+ years, 1,000+ students, 20+ countries retained; no 10,000+ | Completed |
| 10 | Google proof only with Maps link; AggregateRating/Review schema absent; no unsourced "Verified Google Review" labels | Completed |
| 11 | Public 91% corporate claim removed; neutral non-numeric wording in its slot | Completed |
| 12 | Class-demo placeholder and dummy testimonial videos removed (no dQw4w9WgXcQ); no stock substitutes | Completed |
| 13 | FAQ / schema / metadata / `public/llms.txt` / `public/pricing.md` aligned | Completed |
| 14 | No changes to analytics, forms, Supabase, Make.com, dependencies, sitemap, branding | Completed |

## Files changed this pass

| File | Change |
|---|---|
| `src/routes/online-yoga-classes.tsx` | Trial summary from facts; added Refunds & Cancellation block under pricing |
| `src/lib/faqs.ts` | Added refund/cancellation FAQ sourced from `REFUND_POLICY` |
| `docs/audits/phase-4b1-facts-trust-cleanup-2026-08-04.md` | This record |

(The `src/lib/facts/*` library and the sitewide normalization edits were landed earlier in Phase 4B and verified unchanged here.)

## Verification searches

All clean in `src/` and `public/` (matches only in comments or the deliberate `UNPUBLISHED_CLAIMS` registry, never rendered):
`$49/month`, `dQw4w9WgXcQ`, `10,000+`, public `91%`, `Hai Duong Province`, `wa.me/message`, `AggregateRating`, `Verified Google Review`.

## Tests

| Check | Result |
|---|---|
| `bun run build` | Success |
| `tsgo --noEmit` | Clean |
| Smoke: `/`, `/online-yoga-classes`, `/programs`, `/corporate`, `/testimonials`, `/contact`, `/sitemap.xml`, `/robots.txt` | 200 |
| Random unknown path | 404 + noindex |

## Remaining issues

| Item | Note |
|---|---|
| Real media (class demo, testimonial videos, student photos, certifications) | Not supplied; sections stay hidden |
| 91% stress-reduction claim | Held unpublished pending methodology |
