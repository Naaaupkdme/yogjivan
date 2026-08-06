# Master Global Release Pack 7 — Navigation Repair + Pre-Publish Release Gate
Date: 2026-08-06 · Mode: Build · Status: verified locally, awaiting publish approval

## 1. Root cause (reproduced)
At 1024×768 and 1280×800 the full-site menu rendered only ~70–90px tall and its
links were unreachable. The overlay was a `position: fixed` descendant of
`<header>`, and the header uses `backdrop-filter`. In Chromium a `backdrop-filter`
value other than `none` creates a **containing block** for fixed-position
descendants, so `inset-0` resolved against the header box (header height), not the
viewport. This is a structural containing-block bug, not a z-index or overflow bug.

## 2. Fix
- New `src/components/site/BodyPortal.tsx` renders overlays into `document.body`,
  outside every transformed / filtered / backdrop-filtered ancestor.
- `SiteHeader` menu overlay is portalled, sized `100dvh` + `min-h-screen` + `w-screen`,
  and owns its own internal scroll container.
- `SiteSearch` dialog is portalled the same way (it had the identical latent bug).
- Scroll lock uses `position: fixed` on `<body>` with saved scroll offset and exact
  restoration on close; `body[data-menu-open="true"]` is the single state flag.
- Focus is moved into the panel on open, trapped with Tab/Shift+Tab, Escape closes,
  and focus returns to the hamburger trigger. `aria-expanded` / `aria-controls`
  (`#yj-full-menu`) wired on the trigger; overlay is `role="dialog" aria-modal="true"`.
- Panel is full-screen up to 1279px and a right drawer from 1280px up.
- Menu items rendered as a two-column grid on tablets so the whole menu fits.

## 3. Stacking hierarchy (single source of truth, documented in SiteHeader)
| Layer | z-index |
|---|---|
| Floating CTAs (WhatsApp, consultation, mobile sticky bar) | 40 |
| Site header | 50 |
| Cookie consent banner | 60 |
| Full-site menu overlay (portalled) | 70 |
| Search dialog (portalled) | 90 |

`body[data-menu-open="true"] [data-floating-cta]` hides all floating conversion
controls while the menu is open, so nothing overlaps the menu or the close button.
Overlay fade respects `prefers-reduced-motion`.

## 4. Navigation QA — measured with Playwright
Viewports: 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1440×1024.

| Check | Result |
|---|---|
| Overlay height == viewport height | ✅ all 6 (844/932/1024/768/800/1024) |
| Overlay parent is `<body>` | ✅ all 6 |
| Menu list scrollable, last item ("Book Free Trial") reachable | ✅ all 6 |
| Close button visible and clickable | ✅ all 6 |
| Escape closes, `aria-expanded` returns to `false` | ✅ all 6 |
| Focus returns to hamburger trigger | ✅ all 6 |
| Body scroll position restored (`position: static`) | ✅ all 6 |
| Horizontal overflow | ❌ none, all 6 |
| Floating CTAs hidden while open | ✅ (`visibility: hidden`) |

## 5. Search QA (390 / 1024 / 1440)
Dialog is full-viewport and portalled to body at all widths; Escape closes.
Top result destinations: `online` → Private/Online cluster, `private` →
`/personal-training#private-online-yoga`, `beginner` → `/yoga-for-beginners`,
`camera` → `/blog/online-yoga-camera-setup`, `hai duong` → `/programs` (studio),
`pricing` → `/programs`, Vietnamese `yoga trực tuyến` → online cluster,
nonsense query → polished "No results" state with fallback links.

## 6. Cumulative SEO / content release gate — 20 routes crawled locally
All returned **HTTP 200**, exactly **one `<h1>`**, self-referencing **apex canonical**
(`https://yogjivan.com/...`), and **zero horizontal overflow**.

Fixed this pass:
- Titles trimmed under 60 chars: `/yoga-for-stress` (68 → 45), `/yoga-for-weight-loss` (67 → 55).
- Meta descriptions trimmed under 160 chars: `/about` (204), `/privacy` (193),
  `/yoga-for-weight-loss` (170), `/yoga-for-stress` (167), `/yoga-for-beginners` (162).
- Blog `seoTitle` / `seoDescription` re-scanned: none exceed limits.

Facts, pricing, trial wording, addresses and trust claims unchanged — still sourced
from `src/lib/facts/*`. No new medical or outcome claims introduced.

## 7. Build verification
`bunx tsgo --noEmit` → clean. `bun run build` → success (Nitro/Cloudflare output generated).

## 8. Prompt completion table
| Requirement | Status | Evidence |
|---|---|---|
| Reproduce tablet-landscape clipping | ✅ | Overlay measured at header height pre-fix, 1024×768 & 1280×800 |
| Identify true root cause | ✅ | `backdrop-filter` containing block on `<header>` |
| Viewport-level overlay (portal, 100dvh) | ✅ | Parent `BODY`, height == viewport, 6 breakpoints |
| Internal scrolling, all links reachable | ✅ | Last link reachable after scroll, 6 breakpoints |
| Body scroll lock + exact restore | ✅ | `position: fixed` technique, verified `static` + offset after close |
| Focus trap, Escape, focus restore, ARIA | ✅ | `aria-expanded` toggles, focus returns to trigger |
| Documented stacking hierarchy | ✅ | Section 3 + comment block in `SiteHeader.tsx` |
| Floating CTAs never overlap menu | ✅ | `data-floating-cta` + `body[data-menu-open]` rule |
| Search dialog free of same bug | ✅ | Portalled, verified at 3 widths |
| Reduced-motion respected | ✅ | `@media (prefers-reduced-motion: reduce)` in `styles.css` |
| Cumulative SEO gate (200s, H1, canonical, titles, desc) | ✅ | Section 6, 20 routes |
| Typecheck + production build | ✅ | Section 7 |
| Publish | ⏳ Not done | Awaiting explicit approval per execution rules |

## 9. Known, pre-existing, out of scope
A React hydration warning appears in the dev preview from `caret-color: transparent`
injected into form inputs by the preview tooling on `SmartConsultation` /
`SearchablePhoneInput`. It is dev-preview-only, unrelated to navigation, and was
present before this pack.

## 10. Manual actions for the user
1. Review the menu on a real tablet in landscape and on iOS Safari.
2. Approve publish; after publishing, re-run a live check of the menu, search and
   WhatsApp/consultation lead paths on the production domain.
