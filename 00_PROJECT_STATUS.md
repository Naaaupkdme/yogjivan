# Yog Jivan Website Project Status

Last Updated: 2026-11-18 (File 29 Delegated Pricing & Enquiry Polish)
Branch: `feat/file25-v3-design-media`
Base Checkpoint: `2b6bf0b`

## Status Overview

| Workstream | Status | Summary |
|---|---|---|
| Corporate Benefits Asset Fix | **Completed & Verified** | Replaced baked-in dark left padding in `corporate-benefits-768.webp` with clean 768×432 16:9 crop from `corporate-chair-hero-desktop.webp`. Instructor, all 4 seated employees, and chairs 100% visible on mobile and desktop without artificial borders. |
| Couples Pricing & Plans Section | **Completed & Verified** | Implemented approved delegated rates with dominant group totals: Single US$36, 6-pack US$192 ($32.00/session, save $24), 12-pack US$349 ($29.08/session, save $83, badge "Recommended plan"), 24-pack US$669 ($27.88/session, save $195, badge "Lowest price per session"), Custom plan. Card CTAs: "Enquire about 6 sessions", "Enquire about 12 sessions", "Enquire about 24 sessions", "Request a custom plan". Prefills `#shared-enquiry-summary` in form. |
| Family Pricing & Plans Section | **Completed & Verified** | Implemented approved delegated rates with dominant group totals for both 3 and 4 pax. 3 pax: Single US$44, 6/$228 ($38.00/session, save $36), 12/$429 ($35.75/session, save $99, Recommended), 24/$819 ($34.13/session, save $237, Lowest rate). 4 pax: Single US$52, 6/$276 ($46.00/session, save $36), 12/$519 ($43.25/session, save $105, Recommended), 24/$999 ($41.63/session, save $249, Lowest rate). Built static crawlable comparison container for SSR SEO. |
| Enquiry Form Summary UX | **Completed & Verified** | Built dynamic `#shared-enquiry-summary` container directly under `#shared-plan-select` displaying formatted group total, per-session rate, and savings against single session rate. Dynamically updates when switching household size (3 vs 4) or plan selection. |
| Documentation Parity | **Completed & Verified** | Synchronized `public/pricing.md`, `public/llms.txt`, FAQs in `online-couples-yoga.tsx` and `online-family-yoga.tsx`, and `shared-offers.ts`. All figures match across cards, SSR HTML, FAQs, and AI/crawler texts. |
| Automated Verification & QA | **Passed (19/19 files, 184 tests)** | TypeScript zero errors (`tsc -p tsconfig.json --noEmit`), Vitest 184/184 passing, Nitro production build succeeded, Headless Chrome CDP tests passing across 320px, 390px, 1440px with zero horizontal overflow. |

## Candidate Scope & Boundaries
- Stop at candidate review before merge or publish.
- Preserved existing Corporate copy, pricing by enquiry, complimentary demo offer, PDFs, and CTAs.
- Preserved Solo US$25 single rate and 12/20/24 packs.
- File 24 Help (`feat/help-feedback-reviews`) remains isolated on its own branch.
