# Bing Webmaster: automatic page discovery and IndexNow (read-only findings and plan)

## What exists today (checked this turn)

- **IndexNow key file:** `public/de480e04401c43ff962683a0d46b58dc.txt`. Its content matches its filename. Live `https://www.yogjivan.com/<key>.txt` returns 200. The non-www address `yogjivan.com/<key>.txt` sends visitors to www (302). So www is the only correct host and key location.
- **No IndexNow sender anywhere:** no code, no backend function, no scheduled job and no publish hook. The 15 old submissions from July were made outside this codebase.
- **Saved credential names:** GOOGLE_SEARCH_CONSOLE_API_KEY, GOOGLE_SHEETS_API_KEY, LOVABLE_API_KEY, N8N_CRM_BRIDGE_TOKEN, TELEGRAM_API_KEY, plus the standard backend ones. There is no IndexNow or Bing credential. IndexNow does not need one: the public key file is the proof of ownership.
- **Sitemap:** `src/routes/sitemap[.]xml.ts` serves 54 URLs on live, all under `https://www.yogjivan.com`.
  - The main English pages are a hand-typed list (`STATIC_PATHS`).
  - Vietnamese pages come from `src/lib/locale-routes.ts` (`VI_ROUTES`).
  - Blog posts come from `src/lib/blog-posts.ts` (`BLOG_POSTS`).
  - **The gap:** a new English page is not added to the sitemap unless someone edits the hand-typed list.
- **Site search** already finds new pages automatically. `search-index-plugin.ts` with `src/lib/search/route-meta.ts` reads each page's own title/description settings and skips redirect, noindex and utility pages. This is the right single source of truth to reuse.
- **robots.txt** points to the www sitemap only, and blocks `/go/`.

## Flag image alt notice

- The flag is drawn by the phone-number country picker, from an outside image service (cdnjs twemoji). It uses `alt=""`.
- The surrounding button already has a readable label (`+84, select country`, in `SearchablePhoneInput.tsx`).
- So the flag is purely decorative and `alt=""` is the correct accessibility practice. **This is not a real accessibility gap.** No change is recommended. Adding text like "Vietnam flag" would make screen readers say the country twice.
- The hero background image (`alt=""`, `aria-hidden`) is also correctly decorative.
- An optional, separate idea: load flags without the outside image service. That is not needed for search engines.

## Proposed changes (next build, after approval)

1. **Automatic sitemap.** Build the sitemap from the same page list site search already uses (page metadata plus `BLOG_POSTS`). Keep the existing exclusions and the www base address. Remove the hand-typed list. Add a test that compares today's 54 URLs, so nothing silently drops out.
2. **IndexNow on publish, changed pages only.**
   - New endpoint `src/routes/api/public/indexnow/publish.ts`, triggered by Lovable's built-in "project published" event.
   - It verifies the event's signature with the official Standard Webhooks method, using a signing secret the owner pastes into Secrets.
   - It then reads the live sitemap and fetches each listed page. For each page it keeps a fingerprint of the visible content, ignoring scripts and version-numbered asset files.
   - It compares fingerprints against a small new table (`indexnow_state`: url, content_hash, last_submitted_at, last_status). The table is readable and writable only by the server.
   - It sends **only new or changed** canonical www URLs in one request to `api.indexnow.org/indexnow`: host `www.yogjivan.com`, the key, keyLocation on www, at most 10,000 URLs.
3. **Safety rules**
   - A URL is sent only if it is in the sitemap, starts with `https://www.yogjivan.com`, and has no `?`, `#`, `/go/` or tracking parameters. No personal data is involved anywhere.
   - Fingerprints are saved only after IndexNow returns 200 or 202. On 429 or a server error, nothing is saved, so the next publish retries naturally. No timers and no loops.
   - There is no "send the whole sitemap" path. The very first run saves fingerprints and sends only the pages changed since then. A one-time full send happens only if you choose it.
   - Nothing happens in visitors' browsers.
4. **Fallback if Events & Hooks is not on your plan** (it needs the Business plan): the same endpoint protected by a new secret token, triggered once by hand after each publish (for example from n8n). Same change-only logic.

## Dependencies you need to provide

- Lovable Events & Hooks access (Business plan), and creating the destination yourself in Settings, Events & Hooks.
- Or approval of the manual-token fallback.
- Webhook signature checking adds one small official library, `standardwebhooks`. This is the only new dependency.

## Validation

- Unit tests:
  - the sitemap matches the current 54 URLs
  - noindex, redirect and `/go/` pages are excluded
  - the URL filter rejects tracking parameters and the non-www host
  - unchanged fingerprints mean nothing is sent
  - 429 or 5xx responses save nothing
  - unsigned or forged events are rejected with 401
- A dry-run mode that only lists the URLs it would send.
- After publish, which needs your approval: send one real changed page, then confirm in Bing's IndexNow dashboard. A 202 answer only means "received", not "indexed".

## Cost

- About 55 page reads per publish on the live site, plus one IndexNow request.
- No AI use, no paid services, and a tiny database table.
- Build effort: one focused change of about 4 files, plus a test file and a database change.

## Out of scope

No noindex changes; School needs no fix. No broad SEO rewrite. No changes to secrets or access. No key regeneration. No publishing.
