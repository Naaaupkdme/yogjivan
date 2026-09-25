# Truth-maintenance patch

## Objective
Apply a narrow, no-publish factual cleanup to the current Yog Jivan site without changing integrations, routes, dependencies, language behavior, schedules, or the research page.

## Verified current state
- The editable checkout reports `bfd0a0dbe4a45fb35c755e305fcd7305cd4a52f4`; requested commit `84de78908a3e839d49fe1f21dfdf0e1094c01c73` is a descendant whose differences are limited to unrelated package/lockfile/generated database-type cleanup.
- The target content files match the requested scope, so this patch will not touch those unrelated differences.
- Lead forms currently write directly to the managed site database; the retired Make.com forward is not active.
- The free-trial offer exists as a centralized site constant and appears throughout the site, but the supplied scope requires removing it from the two machine-readable public documents unless independently verified by a current explicit source.

## Changes
1. **Privacy page**
   - Remove Make.com.
   - Describe only the confirmed direct database submission and stated uses.
   - Remove unsupported fixed retention and response-time promises, and avoid broad legal guarantees.
   - Preserve the existing GA4, Meta Pixel, consent controls, contact channels, canonical, and metadata structure.

2. **Corporate page**
   - Replace productivity, retention, stress-reduction, posture-outcome, and “genuinely effective” wording with neutral service descriptions.
   - Remove the max-eight live online class metric from generic corporate content.
   - Keep the verified organization formats, experience, countries served, studios, imagery, enquiry path, canonical, and metadata.

3. **Public factual documents**
   - Remove the unverified trial sections from `public/llms.txt` and `public/pricing.md` only.
   - Reframe therapeutic/condition wording as non-medical practice support without treatment, cure, diagnosis, or outcome implications.
   - Preserve confirmed online membership prices, class format, private/studio/corporate enquiry pricing, locations, hours, contacts, and teacher facts.
   - Update the pricing document’s review date to the patch date.

## Verification
- Run the project’s TypeScript check and production build without dependency changes.
- Test `/privacy`, `/corporate`, `/llms.txt`, `/pricing.md`, `/`, `/vi`, and `/research/yoga-participation-statistics` at desktop and mobile widths.
- Verify HTTP status, canonical/title/description where applicable, no horizontal overflow, no console errors, the research page remains intact, and Vietnamese Zalo-first behavior remains present.
- Review the final diff and report exact changed paths, actual checkout commit SHA, preview URL, test evidence, remaining factual holds, and READY/HOLD recommendation.
- Do not publish or deploy.
