# Phase 3C — Post-Implementation Security, Supply-Chain and Production Verification

Read-only. No code, package.json, bun.lock, install, or deployment changes were made.

## 1. Repository state

Package manager: **bun 1.3.3** (build `274e01c7`). Single lockfile: `bun.lock` (text). Registry for every entry: `europe-west1/west4-npm.pkg.dev/lovable-core-prod/sandbox-npm-cache` (the managed npm mirror) — no git, file, http, or unknown-registry dependencies. Every entry carries a `sha512` integrity hash. No `trustedDependencies` block anywhere; `bunfig.toml` keeps `minimumReleaseAge = 86400` with the four pre-existing `@lovable.dev/*` exclusions. No `ignoreScripts`, no custom install scanner, no scripts in `package.json` that read secrets or call external URLs (`dev`, `build`, `build:dev`, `preview`, `lint`, `format` only).

`package.json` and `bun.lock` are synchronized: every declared range is satisfied by the resolved entry, and all four `overrides` are reflected in the lock.

Overrides present: `seroval 1.5.6`, `undici 7.29.0`, `js-yaml 4.3.1`, `@hono/node-server 1.19.17`, plus the legacy `pnpm.overrides.entities 4.5.0` (inert under bun).

Resolved versions (from `bun.lock`, exactly one copy of each):

| Package | Declared | Resolved |
|---|---|---|
| @tanstack/react-start | ^1.168.34 | 1.168.34 |
| @tanstack/react-router | ^1.170.18 | 1.170.18 |
| @tanstack/router-plugin | ^1.168.23 | 1.168.23 |
| @tanstack/start-server-core | (transitive) | 1.169.17 |
| @tanstack/start-client-core | (transitive) | 1.170.14 |
| @tanstack/start-plugin-core | (transitive) | 1.171.25 |
| @tanstack/router-core | (transitive) | 1.171.15 |
| @tanstack/history | (transitive) | 1.162.0 |
| @tanstack/router-generator | (transitive) | 1.167.21 |
| seroval | ^1.5.6 + override | 1.5.6 |
| undici | override 7.29.0 | **not installed** (no lock entry; only `undici-types@6.21.0`, a types-only package) |
| js-yaml | override 4.3.1 | 4.3.1 |
| @hono/node-server | override 1.19.17 | 1.19.17 |
| hono | (transitive) | 4.12.31 |
| @lovable.dev/mcp-js | ^0.24.0 | 0.24.0 |

Note on undici: `@tanstack/start-plugin-core` moved from 1.169.6 to 1.171.25 and no longer pulls `cheerio`, so the undici chain disappeared entirely. The override is harmless but now unused. `xmlbuilder2@4.0.3` remains and its `js-yaml ^4.1.1` resolves to the overridden 4.3.1.

Commit/build identifier: not exposed to this environment — see section 6.

## 2. All @tanstack packages vs GHSA-g7cv-rxg3-hmpx / CVE-2026-45321

| Package | Resolved | Listed as compromised | Status |
|---|---|---|---|
| @tanstack/devtools-client | 0.0.8 | no | Safe |
| @tanstack/devtools-event-bus | 0.4.2 | no | Safe |
| @tanstack/devtools-event-client | 0.5.0 | no | Safe |
| @tanstack/devtools-vite | 0.8.1 | no | Safe |
| @tanstack/history | 1.162.0 | no | Safe |
| @tanstack/query-core | 5.100.1 | no | Safe |
| @tanstack/react-query | 5.100.1 | no | Safe |
| @tanstack/react-router | 1.170.18 | no (bad: 1.169.5, 1.169.8) | Safe |
| @tanstack/react-start | 1.168.34 | no (bad: 1.167.68, 1.167.71) | Safe |
| @tanstack/react-start-client | 1.168.16 | no | Safe |
| @tanstack/react-start-rsc | 0.1.33 | no | Safe |
| @tanstack/react-start-server | 1.167.22 | no | Safe (see note) |
| @tanstack/react-store | 0.9.3 | no | Safe |
| @tanstack/router-core | 1.171.15 | no | Safe |
| @tanstack/router-generator | 1.167.21 | no | Safe |
| @tanstack/router-plugin | 1.168.23 | no (bad: 1.167.38, 1.167.41) | Safe |
| @tanstack/router-utils | 1.162.2 | no | Safe |
| @tanstack/start-client-core | 1.170.14 | no | Safe |
| @tanstack/start-fn-stubs | 1.162.0 | no | Safe |
| @tanstack/start-plugin-core | 1.171.25 | no (bad: 1.169.23, 1.169.26) | Safe |
| @tanstack/start-server-core | 1.169.17 | no (bad: 1.167.33, 1.167.36) | Safe |
| @tanstack/start-storage-context | 1.167.17 | no | Safe |
| @tanstack/store | 0.9.3 | no | Safe |
| @tanstack/virtual-file-routes | 1.162.0 | no | Safe |

Evidence: exact version strings read from `bun.lock`; none matches any listed compromised exact version. No duplicate copy of any `@tanstack/*` package exists in the lock.

Note on `@tanstack/react-start-server@1.167.22`: this is a **different package** from `start-server-core`. It is pinned by `@tanstack/react-start@1.168.34` and itself depends on `start-server-core@1.169.17` (the patched one). Version 1.167.22 of `react-start-server` is not on the compromised list.

**Install history: not verifiable.** Git history and CI install logs are not accessible from this environment, so no claim is made about whether a compromised version was ever installed in the past. Only the current lockfile state is proven.

## 3. Previous findings re-verified

- **A. GHSA-9m65-766c-r333** — `start-server-core 1.169.17` ≥ 1.167.30. Patched. `submitLeadToCrm` (`src/lib/submit-lead.functions.ts`) still has: strict Zod `inputValidator`, per-IP rate limit (5/60s), `stripFormula()` sanitation, and no privileged side effect (forwards to the Make webhook only). Unchanged by the upgrade.
- **B. GHSA-mv8w-475r-vwqw / CVE-2026-59940 (seroval)** — one resolved copy, `1.5.6` ≥ 1.5.3. Safe.
- **C. undici** — no resolved copy at all; the vulnerable chain no longer exists. No second copy.
- **D. js-yaml** — one resolved copy, `4.3.1`. No older duplicate.
- **E. @hono/node-server** — one resolved copy, `1.19.17`. Production runs on Cloudflare Workers via nitro (`dist/server/wrangler.json` generated by the build); no Node server, no `serve-static`, not Windows.

## 4. Audit commands

| Command | Exit code | Findings |
|---|---|---|
| `bun audit` | 0 (with error text) | `error: audit request failed (status 404)` — the managed registry mirror does not implement the npm advisory endpoint |
| `bun audit --prod` | same | same |
| `bun audit --audit-level=high` | same | same |
| `bun audit --prod --audit-level=high` | same | same |
| `bun audit --json` | not run | same endpoint, would fail identically |
| Platform dependency scanner (npm-audit backed) | success | **No high or critical severity vulnerabilities found** |

`bun audit` is structurally unavailable in this environment; the platform scanner reading the same `bun.lock` is the substitute evidence. No remaining high/critical alerts, so the per-alert table is empty.

## 5. Lockfile and registry integrity

No git/file/http dependencies. Single managed registry. Integrity hashes present on every entry. No duplicate versions of any audited package, so no override is bypassed. No suspicious lifecycle scripts observed in the manifest; native binary packages (`@oxc-parser/*`, `@rolldown/*`, esbuild, lightningcss) are the standard prebuilt toolchain set. Recommendation (not applied): drop the now-unused `undici` override and the inert `pnpm.overrides` block at the next dependency window.

## 6. Compatibility, build and smoke tests

Peer requirements read from the lock are mutually satisfied: `react-start 1.168.34` pins each sibling exactly, `router-core` and `start-server-core` each resolve to a single version, and no override conflicts exist. Install produced no unresolved-peer entries in the lock.

Build: `bun run build` → **exit 0**, built in 1.74s. SSR bundles under `dist/server/`, client under `dist/client/`, worker output `dist/server/wrangler.json` + `.wrangler/deploy/config.json` generated. Only two warnings, both pre-existing and benign: chunk-size advisory and `inlineDynamicImports ignored because codeSplitting is specified`. No errors, no bundle failures.

| Test | Result |
|---|---|
| `/` | 200, SSR H1 present, no hydration error |
| `/online-yoga-classes` | 200, SSR HTML |
| `/programs` | 200, SSR HTML |
| `/blog` | 200, SSR HTML |
| `/blog/why-traditional-hatha-still-matters` | 200, H1 "Why traditional Hatha still matters in 2026" |
| `/yoga-for-back-pain` | 200, SSR HTML |
| `/contact` | 200, SSR HTML |
| `/sitemap.xml` | 200, XML |
| `/robots.txt` | 200 |
| random 404 URL | 404, H1 "Page not found", `robots: noindex, follow` |
| `/online` | resolves to the online-classes page locally; **production returns 301 → https://yogjivan.com/online-yoga-classes** |

Workflow code paths inspected (no test lead submitted): `src/lib/leads.ts` still inserts into `leads` then calls `submitLeadToCrm`; the Make webhook failure path stays non-fatal; email queue routes intact under `src/routes/lovable/email/{auth,queue}`; `analytics.ts` still sets Consent Mode v2 denied defaults before gtag, `send_page_view: false` with manual route tracking, and gates every `fbq` call behind marketing consent; WhatsApp/Zalo links intact in `src/lib/social.ts`. Navigation across breakpoints was not re-exercised in a browser this phase — see remaining actions.

## 7. Deployment truth

Live `https://yogjivan.com` responds 200 with correct SSR H1 and a working `/online` 301. However the live entry bundle is `assets/index-CmJqjMws.js` while the fresh local build emits `assets/index-D4PXIjm-.js` (and `arrow-right-CfjT3Rmo.js` vs live `arrow-right-DUwh42aa.js`). Vendor-chunk hashes change when framework versions change, so this is consistent with production still serving a pre-upgrade build. No commit hash, build ID, or deploy timestamp is exposed in the production response headers or in the repository, and preview/production lockfile parity cannot be read from here.

**MANUAL VERIFICATION REQUIRED** — the dependency-update commit is not proven live. Publishing from the editor is the action that would make it live.

## Tables

**TABLE A — Prompt completion**

| Requirement | Completed | Evidence | Remaining action |
|---|---|---|---|
| Repo/lockfile/bunfig state | Yes | Section 1 | none |
| Exact declared + resolved versions | Yes | Section 1 table | none |
| Manifest/lock synchronized | Yes | overrides reflected in lock | none |
| All @tanstack packages vs advisory | Yes | Section 2 | none |
| Install history safety | **No** | git/CI history inaccessible | manual, if required |
| Previous findings A–E | Yes | Section 3 | none |
| `bun audit` variants | Partial | registry 404; platform scanner used | none |
| Lockfile/registry integrity | Yes | Section 5 | optional override cleanup |
| Peer/compat check | Yes | Section 6 | none |
| Clean production build | Yes | exit 0, worker output | none |
| 11 smoke tests | Yes | Section 6 table | none |
| Workflow regression | Partial (code-level) | Section 6 | browser nav check + one manual lead test |
| Deployment truth | Yes (as unproven) | Section 7 | publish, then re-verify |

**TABLE B — Current security state**

| Advisory | Package | Resolved | Vulnerable | Reachable | Status |
|---|---|---|---|---|---|
| GHSA-9m65-766c-r333 | @tanstack/start-server-core | 1.169.17 | No | n/a | Resolved |
| GHSA-mv8w-475r-vwqw / CVE-2026-59940 | seroval | 1.5.6 | No | n/a | Resolved |
| undici advisories | undici | not installed | No | No | Resolved (dependency removed) |
| GHSA-h67p-54hq-rp68, GHSA-52cp-r559-cp3m | js-yaml | 4.3.1 | No | build-only | Resolved |
| GHSA-frvp-7c67-39w9 | @hono/node-server | 1.19.17 | No | not applicable (Workers) | Resolved |
| GHSA-g7cv-rxg3-hmpx / CVE-2026-45321 | all @tanstack/* | see Table C | No | n/a | Clean (current state) |

**TABLE C — see Section 2 table** (24 packages, all Safe).

**TABLE D — see Section 4 table.**

**TABLE E — Regression testing**

| Test | Result | Evidence | Manual follow-up |
|---|---|---|---|
| Production build | Pass | exit 0, worker + SSR output | none |
| 11 route smoke tests | Pass | Section 6 | none |
| 404 noindex | Pass | `noindex, follow` | none |
| `/online` redirect | Pass (prod 301) | curl | none |
| Consent Mode v2 / GA4 dedup / Pixel gating | Pass (code) | analytics.ts | optional live tag check |
| Lead insert + Make webhook + email queue | Pass (code) | leads.ts, submit-lead.functions.ts, email routes | one labelled manual test lead |
| Mobile/tablet/desktop nav | Not re-tested | — | quick manual pass |

**TABLE F — Deployment truth**

| Item | Result | Evidence |
|---|---|---|
| Commit published | Unknown | no build ID exposed |
| Live build = updated lockfile | Likely No | live `index-CmJqjMws.js` ≠ local `index-D4PXIjm-.js` |
| Deploy timestamp | Unavailable | headers show CDN date only |
| Preview/prod lockfile parity | Unverifiable | not exposed |

## Explicit statements

- **Actually implemented:** all four TanStack/override changes are present and resolved in `bun.lock`.
- **Only planned:** nothing outstanding from Phase 3A.
- **Independently verified:** resolved versions, override effectiveness, absence of compromised TanStack versions, registry/integrity cleanliness, clean build, 11 route smoke tests, server-function hardening.
- **Not verified:** historical install safety, live deployment parity, browser-level navigation and a real lead submission.
- **package.json / bun.lock:** clean and synchronized.
- **High/critical audit findings remaining:** none.
- **Compromised TanStack version present:** none in the current lockfile.
- **Deployment live:** not proven.
- **Phase 3 closable:** yes, once the update is published and the live bundle re-checked.

---

SECURITY PHASE STATUS:
- PASS WITH MANUAL VERIFICATION

HIGH/CRITICAL VULNERABILITIES REMAINING:
- NO

COMPROMISED TANSTACK VERSION PRESENT:
- NO

LIVE DEPLOYMENT VERIFIED:
- NO

BUILD MODE REQUIRED NEXT:
- NO

PHASE 3 SAFE TO CLOSE:
- YES (after publishing the current build)

NEXT RECOMMENDED PHASE:
Phase 4 — Content Source-of-Truth and Trust Cleanup
