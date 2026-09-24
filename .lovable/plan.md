# Yoga participation statistics research page

## Objective
Create a durable, citation-ready first edition at `/research/yoga-participation-statistics`, reviewed 24 September 2026, using only the four specified primary sources and preserving Yog Jivan’s current visual system.

## Current-state findings
- The site uses TanStack file routes with per-page canonical, Open Graph, Twitter, breadcrumb, and JSON-LD metadata.
- Journal articles use a reusable data model, but their template attributes every article to Master Anil and cannot express source tables or claim-level citations. This research page therefore needs a dedicated route rather than being forced into the standard blog template.
- The sitemap explicitly lists canonical routes. The Journal and site search are the most natural discovery paths without adding another primary-navigation item.
- Existing analytics, language routing, Vietnamese Zalo behavior, contact flows, and business facts will remain unchanged.

## Implementation
1. Add the dedicated research route with:
   - Exact requested title and Yog Jivan Editorial Team byline.
   - “Reviewed 24 Sep 2026” and a clear first-edition/update note.
   - Short methodology defining primary-source selection, denominator checks, age adjustment, and scope rules.
   - Claim-by-claim external links beside every statistic.
   - A responsive writer-focused table covering geography, surveyed year, population, exact metric, and source.
   - Separate U.S., Viet Nam, and global sections; the Viet Nam and global physical-activity figures will be explicitly labelled as non-yoga estimates.
   - Limitations covering survey comparability, geography, age ranges, self-reporting, age adjustment, and the absence of a verified Viet Nam yoga participation estimate.
   - A simple copyable attribution in plain text with a copy control and non-JavaScript-readable fallback.
2. Add `Article` and breadcrumb structured data with Yog Jivan Editorial Team as the organization author; set canonical, self-referencing `og:url`, unique description, `og:type=article`, and Twitter metadata. No invented share image.
3. Add the route to the XML sitemap and make it discoverable from the Journal and site search using restrained contextual links.
4. Verify primary-source wording and source titles directly against CDC/NCHS, NCCIH, WHO Viet Nam, and WHO global materials before finalizing copy.

## Quality and release checks
- Confirm every number, denominator, year, and qualifier against the supplied source.
- Verify the route, links, citation copy action, metadata, structured data, sitemap entry, keyboard access, and layouts at mobile, tablet, and desktop widths.
- Run focused tests and the project build checks.
- Do not publish. Return the preview URL and exact edited-file list for review.
