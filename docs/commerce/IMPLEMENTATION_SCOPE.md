# Vietnamese shop — authorised review foundation

## Objective and current state
Add a factual Vietnamese catalogue and business-enquiry entry to the existing yoga site, not a commerce launch. Requested baseline: `be60df1b24a493a41d9554bfadc0d5babf08fb4d`; inspected starting HEAD: `9fdbcf2f90f012181bde356f2dfc5947757c7364`. Do not roll back existing work.

## Build boundary
Six static samples; catalogue category tabs; SSR product details and genuine missing-product 404; B2B information; Zalo-first external contact and unchanged safe WhatsApp helper. Neutral accessible image/video placeholders. Unique Vietnamese metadata, noindex/follow, self-canonical, no Product/Offer schema, no sitemap or primary-navigation additions.

## UX and truth
Preserve site shell and tokens; introduce only a scoped green accent token. Large readable type, simple unframed sections, mobile one/two-column grid according to readability, keyboard tabs and focus-visible links. Products have no numeric price, count of available stock, ordering or checkout. Known pack contents only; supplier-card text distinguished from independent verification. Incense safety and non-medical traditional symbolism.

## Technical and release boundary
Browser-safe static typed catalogue shared by routes; no server function, persistence, migrations, integrations, dependency changes or funnel changes. Tests cover six distinct IDs, known gift-pack contents, unknown lookup and absence of transactional data. Verify SSR, metadata, sitemap exclusion, route navigation, missing slug, mobile/tablet/desktop, keyboard filtering and enquiry destinations without opening chats or submitting leads. Harness owns build/typecheck; report unavailable checks honestly. Publish requires separate owner approval after release gates.