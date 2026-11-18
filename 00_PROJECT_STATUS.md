# Yog Jivan Website Project Status

Last Updated: 2026-11-18 (File 29 Candidate Implementation)
Branch: `feat/file25-v3-design-media`
Base Checkpoint: `99875c1`

## Status Overview

| Workstream | Status | Summary |
|---|---|---|
| Corporate Benefits Asset Fix | **Completed & Verified** | Replaced baked-in dark left padding in `corporate-benefits-768.webp` with clean 768×432 16:9 crop from `corporate-chair-hero-desktop.webp`. Instructor, all 4 seated employees, and chairs 100% visible on mobile and desktop without artificial borders. |
| Couples Pricing & Plans Section | **Completed & Verified** | Added "See plans and pricing" anchor in hero (`#couples-plans`). Added Single Session banner ($36 total / $18 each). Built accessible 4-card grid (6, 12, 24 with $120 discount, Custom). Removed old 4-session pack ($132). Prefills `SharedYogaEnquiryForm` on card CTA click. |
| Family Pricing & Plans Section | **Completed & Verified** | Added "See plans and pricing" anchor in hero (`#family-plans`). Interactive 3 vs 4 household size switcher. Single Session banner keeping both reference rates ($44 / $52) visible. Built accessible 4-card grid (6, 12, 24 with $144 discount, Custom). Removed old 4-session pack ($160 / $192). Prefills `SharedYogaEnquiryForm` with plan and pax on card CTA click. |
| Enquiry Form Synchronization | **Completed & Verified** | `SharedYogaEnquiryForm` now accepts `initialPlan`, `plan`, `onPlanChange`, renders `#shared-plan-select`, includes `preferred_plan` in metadata and payload. |
| Documentation Parity | **Completed & Verified** | Reconciled `public/pricing.md`, `public/llms.txt`, `src/lib/facts/shared-offers.ts`, `src/lib/facts/contact.ts`, and `src/routes/__root.tsx`. Updated Instagram to `https://www.instagram.com/yogjivan.yoga/`. |
| Automated Verification & QA | **Passed (19/19 files, 183 tests)** | TypeScript zero errors (`tsc --noEmit`), Vitest 183/183 passing, Headless Chrome CDP tests passing across 320px, 390px, 1440px with zero horizontal overflow. |

## Candidate Scope & Boundaries
- Stop at candidate review before merge or publish.
- Preserved existing Corporate copy, pricing by enquiry, complimentary demo offer, PDFs, and CTAs.
- Preserved Solo US$25 single rate and 12/20/24 packs.
- File 24 Help (`feat/help-feedback-reviews`) remains isolated on its own branch.
