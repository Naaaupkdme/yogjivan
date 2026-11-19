# Meta Pixel Manual Only — real-browser dry run (read-only)

Baseline: commit `7e78319` (after `b751aac`, `bde626b`). No code edits, no publish.

## What the test does
- Launch headless Chromium; open `https://www.yogjivan.com/...` but use Playwright request routing so every request for that hostname is answered by the local dev server (`localhost:8080`). The committed host check sees the real approved hostname; it is not changed.
- Intercept ALL requests to `connect.facebook.net`, `facebook.com`, `*.facebook.com`, `facebook.net`: none reach Meta. `fbevents.js` is replaced by a local stub that only records `fbq` arguments, so no beacons, cookies or events leave the browser.
- Block any real enquiry endpoint (`/api/public/leads/*`) to be safe; no form is submitted.

## Scenarios recorded
1. Marketing rejected: no `fbevents.js` request, `window.fbq` undefined, zero Meta requests.
2. Marketing accepted on `/`: recorded queue shows `set autoConfig false 1752860699056785` exactly once, before `init` once, then one `PageView`.
3. SPA navigation to `/private-online-yoga`: one more PageView, `ViewContent` with `{}`; no second set/init.
4. Synthetic `metaEvent("Lead", undefined, "synthetic-id")` from the page: `{}` plus `eventID` only. Labelled as a dispatch test, not real intake or Meta receipt.
5. Sensitive page (`/yoga-for-back-pain`) and Help panel open: no Meta calls.
6. Scan of recorded arguments for email, phone, name or message text.

Artifacts: script, JSON log of fbq calls and intercepted URLs, screenshots in `/mnt/documents/meta-manual-only-qa/`.

## Fallback
If HTTPS hostname routing or SSR hydration fails after one short attempt, stop and report the exact limitation (no further proxy experiments).

## Report
- Exact commit; dev-preview build log entry vs no production build run; live site still on the earlier release.
- Unpublished: Help panel + feedback, Help AI answers, Meta data minimisation, Manual Only mode.
- Release blockers: owner publish approval; Meta event eligibility still unconfirmed; Help Telegram needs a live check after publish; no admin sign-in for counts page.
- Noted for a later build only: stale code comment "dataset category: Health & wellness" (analytics.ts line 283) should say category is None/unset. Account category untouched.
