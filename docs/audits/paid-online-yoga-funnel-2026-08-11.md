# MASTER CORE PACK 1 — Online Yoga Booking & Paid Traffic Funnel (2026-08-11)

Scope: new isolated paid-traffic landing page `/book-online-yoga`, short lead form
with attribution capture, index isolation, no changes to existing organic pages.

## Prompt-completion table

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | Dedicated conversion landing page `/book-online-yoga` | Completed | `src/routes/book-online-yoga.tsx`, HTTP 200, single H1 |
| 2 | No site navigation / reduced exit paths | Completed | `__root.tsx` bare-landing branch hides header, footer, exit-intent, floating CTAs, sticky CTA; only WhatsApp + Privacy remain |
| 3 | Noindex isolation, does not compete with `/online-yoga-classes` | Completed | `robots`/`googlebot` = `noindex, nofollow`; `Disallow: /book-online-yoga` in `public/robots.txt`; absent from sitemap and site search |
| 4 | Real WebP imagery of Master Anil / real students | Completed | 4 user-supplied WebP uploaded to CDN under `src/assets/paid/` |
| 5 | Short lead form (name, WhatsApp, optional email, intent, optional time) | Completed | `src/components/site/BookOnlineYogaForm.tsx`, zod validated |
| 6 | Attribution tracking (UTM, gclid, fbclid, referrer, landing path) | Completed | `src/lib/attribution.ts`, first-touch localStorage; stored in `leads.meta` |
| 7 | Distinct lead source | Completed | `source = website_paid_online_yoga`; leads insert policy widened to allow it |
| 8 | Conversion event fires only after confirmed lead | Completed | `trackGenerateLead` called after successful insert only; no PII sent |
| 9 | Facts strictly from source of truth | Completed | Trial, pricing ladder, 60 min, max 8, 15-min onboarding, languages all imported from `src/lib/facts/*` |
| 10 | No invented private-session prices | Completed | Private pricing shown as enquiry only |
| 11 | End-to-end submission test | Completed | Playwright submit → row persisted with source + attribution meta; test row deleted afterwards |
| 12 | Mobile + desktop QA, zero horizontal overflow, zero console errors | Completed | 390px and 1280px runs both clean |

## Manual actions for the site owner
- Point paid campaigns at `https://yogjivan.com/book-online-yoga` with UTM parameters.
- In GA4, use `generate_lead` with `form_id = book_online_yoga` as the conversion.
- Private 1-on-1 online pricing is still shown as "by enquiry" pending confirmation.
