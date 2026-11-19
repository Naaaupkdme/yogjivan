# Meta Pixel — implementation note

- Dataset: 1752860699056785 (portfolio 578760686515386). Category left unchanged (None).
- Loads only on yogjivan.com / yogjivan.in hosts, after marketing consent, never on sensitive health paths.
- Manual Only mode: `fbq("set", "autoConfig", false, ID)` runs once, before `init`
  (Meta Pixel docs, "Automatic configuration"). Stops automatic button/metadata collection.
  This is data minimisation, not a way around Meta category restrictions or eligibility review.
- Allowlisted events: PageView, ViewContent, Contact, Lead. Custom data always `{}`; Lead carries only an event ID.
- Like any Pixel, the browser still sends IP address, user agent, page URLs/referrer and Meta cookies.
  Personal contact fields and free-text messages are not added to events.
- Conversions API: not enabled. No server token exists.

## Browser QA note (2026-11-19)
- Header/menu links are plain `<a href>` links, so each click is a new page load. Each load gets its own Pixel script, `init` and PageView, which is expected.
- In-app `<Link>` navigation (same page load): one PageView per distinct path+search; hash changes and repeat consent saves add none.
- Test scripts must not `import('/src/lib/analytics.ts')` from the page in dev. That loads a second copy of the module and fakes a duplicate init.
