<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Lead automation: DB trigger -> lead_outbox (service-only) -> /api/public/leads/dispatch (token from automation_settings) -> Sheets/Telegram via connector gateway; delivery toggled in automation_settings. Why: idempotent retries, no client-side secrets.
- Public WhatsApp CTAs use waHref() -> /go/whatsapp (POST on real click records anonymous whatsapp_clicks row; GET only redirects). Why: first-party attribution without bots/prefetch inflating clicks.
- Final lead submissions (website + MCP) go only through /api/public/leads/submit or the MCP handler -> submit_lead_guarded() (service role; rate limits, duplicate suppression, HMAC fingerprints); anon RLS allows partial statuses only. Why: spam cannot bypass protection or trigger alerts. Ops: docs/ops/lead-anti-spam.md.
- n8n CRM bridge: POST /api/public/n8n-crm-control (Bearer N8N_CRM_BRIDGE_TOKEN, disabled if unset) -> crm_apply_action() updates only leads.crm_* + lead_crm_events (request_id idempotency). Why: n8n never writes the DB directly; outbox/Sheets/Telegram untouched.
- Commerce review uses a browser-safe static catalogue in src/lib/commerce, a path layout with distinct catalogue/detail leaves, and isolated noindex metadata; do not register these draft routes in sitemap, search or global navigation. Why: review must not launch selling or change yoga funnels.
- Commerce photos use inspected owner assets via src/lib/commerce/photos.ts and durable asset pointers, with full-frame object-contain and responsive renditions. Why: prevent temporary URL exposure, identity-altering crops and fabricated product imagery.
- Site search pages are generated from each route file's head() metadata by search-index-plugin.ts (virtual:yj-search-index, lazy-loaded) plus BLOG_POSTS; never add a hand-written page list — only generic query aliases live in src/lib/site-search.ts. Why: new public pages appear automatically and redirect/noindex/utility routes stay out.
- Lead AI scoring runs in the outbox prepare step (src/lib/leads/ai-score*.ts), sends only minimised non-PII/non-health fields, fails soft to null, and never flags a call for an invalid phone. Why: triage must never block delivery or leak private data.
- Help AI answers (/api/public/help/ask): prices and health handoff are deterministic from src/lib/facts via src/lib/help/knowledge.ts; the AI sees only price-stripped facts, must cite fact ids, and caps live in src/lib/help/ask-config.ts with DB-enforced daily counters; no question text is stored. Why: answers cannot drift from page prices or give health advice, and cost stays bounded.
- sitemap.xml is built by src/lib/sitemap-entries.ts from virtual:yj-search-index + BLOG_POSTS (no hand-typed list); IndexNow is operator-triggered outside the app using the public key file on www. Why: new public pages reach the sitemap automatically without new secrets or tables.
- Enquiry logistics notes use dedicated bounded metadata keys in leads.meta, never goals or notification mirrors; shared UI/server limits count UTF-16 code units. Why: preserve complete notes without widening goal limits or exposing free text downstream.
- Leadership uses shared bilingual content and portraits, with each About leaf emitting only the new Person linked to the existing Organization; search and sitemap continue deriving pages from route metadata. Why: avoid duplicate identity nodes and page registries.
