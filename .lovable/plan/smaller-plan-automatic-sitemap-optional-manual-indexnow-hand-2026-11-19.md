# Smaller plan: automatic sitemap + optional manual IndexNow handoff

## Verified current state (read-only)

- **IndexNow key file:** `public/de480e04401c43ff962683a0d46b58dc.txt` matches its own filename.
  - Live `https://www.yogjivan.com/<key>.txt` returns 200.
  - The non-www address redirects (302) to www.
  - So the only correct host and keyLocation is `www.yogjivan.com`.
- **No IndexNow sender exists** anywhere in the project: no code, backend function, scheduled job or publish hook. The 15 July submissions came from somewhere outside this project.
- **Saved credential names (names only):** GOOGLE_SEARCH_CONSOLE_API_KEY, GOOGLE_SHEETS_API_KEY, LOVABLE_API_KEY, N8N_CRM_BRIDGE_TOKEN, TELEGRAM_API_KEY, plus standard backend keys. IndexNow needs no credential beyond the public key file.
- **Sitemap:** `src/routes/sitemap[.]xml.ts` serves 54 www URLs.
  - English pages come from a hand-typed list.
  - Vietnamese pages come from `src/lib/locale-routes.ts`.
  - Blog posts come from `src/lib/blog-posts.ts`.
  - **Gap:** a new English page is left out until someone edits that list by hand.
- **Site search already discovers pages automatically.** `search-index-plugin.ts` with `src/lib/search/route-meta.ts` reads each page's own metadata and skips redirect, noindex and utility pages.
- **n8n** runs locally on your side, so I cannot inspect it. I will not claim any n8n automation works.
- **Flag alt notice:** this is not a real accessibility gap.
  - The flag sits inside the phone country picker button, which already has its own label (`+84, select country`).
  - `alt=""` is therefore the correct marking for a decorative image.
  - No change is proposed.

## Part A: automatic sitemap (application change, after approval)

1. Generate the sitemap from the same page metadata that site search uses, plus `BLOG_POSTS`.
   - Reuse the search tool's exclusions (noindex, redirects, utility pages, shop review pages, `/go/`).
   - Keep the www base address and the blog `lastmod` dates.
2. Remove the hand-typed English list. The Vietnamese list stays the source for Vietnamese pages wherever it is already authoritative.
3. Add a test that locks in today's exact 54 canonical URLs, so the switch is provably identical. A test page with noindex or a redirect must not appear.
4. The work touches about 2 files plus 1 test file.
   - No new database table, secret, access or dependency.
   - Nothing changes in the CRM, n8n bridge, forms or tracking.

## Part B (optional, separate): manual IndexNow after publish via n8n

There is no app code and no new credential. The key is public by design.

**Handoff for you:** a new, separate n8n workflow. Your existing CRM workflows are not touched.

1. **Manual Trigger** node, with a field where you paste the changed page addresses (one per line).
2. **Code** node that keeps only lines starting with `https://www.yogjivan.com/`, drops anything with `?`, `#` or `/go/`, removes duplicates, and caps the list at 100.
3. **HTTP Request** node: POST to `https://api.indexnow.org/indexnow`, JSON body:
   `{"host":"www.yogjivan.com","key":"<key from the file name>","keyLocation":"https://www.yogjivan.com/<key>.txt","urlList":[...]}`
4. **Responses:** 200 or 202 means accepted. 429 means stop and try once later by hand. 400, 403 or 422 means check the URL list or the key file. There are no automatic retry loops.
5. **Rule:** run it once after each publish, only for pages that were actually added or changed. Never paste the whole sitemap.

The same request also works as a one-line `curl` command if you prefer not to use n8n. I can provide the exact text.

## Validation

- **Part A:** the 54-URL equality test, the exclusion test, the full existing test suite, and a check that the preview sitemap matches today's live sitemap.
- **Part B:** after your next publish, send one changed page (for example `/school-yoga`), then confirm it appears in Bing's IndexNow dashboard. A 202 only means received, not indexed.

## Cost

- **Part A:** small one-time build. No runtime cost.
- **Part B:** zero in the app. One free IndexNow request per manual run.

## Out of scope

No webhook, database table, secret or Business-plan feature. No noindex changes. No broad SEO rewrite. No publishing.
