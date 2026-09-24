import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { breadcrumbSchema } from "@/lib/schema";

const SITE = "https://yogjivan.com";
const PATH = "/research/yoga-participation-statistics";
const TITLE = "Yoga Participation Statistics: What Primary Sources Actually Say (2026 edition)";
const DESCRIPTION =
  "A citation-ready review of official U.S., Viet Nam and global yoga or physical-activity statistics, with scope, limitations and primary-source links.";

const SOURCES = {
  cdc: {
    short: "CDC/NCHS Data Brief No. 501",
    title: "Yoga Among Adults Age 18 and Older: United States, 2022",
    href: "https://www.cdc.gov/nchs/products/databriefs/db501.htm",
  },
  nccih: {
    short: "NCCIH",
    title: "Complementary, Alternative, or Integrative Health: What’s In a Name?",
    href: "https://www.nccih.nih.gov/health/complementary-alternative-or-integrative-health-whats-in-a-name",
  },
  vietnam: {
    short: "WHO Viet Nam STEPS 2021 report",
    title: "National survey on the risk factors of noncommunicable diseases in Viet Nam, 2021",
    href: "https://cdn.who.int/media/docs/default-source/ncds/ncd-surveillance/data-reporting/viet-nam/viet_nam_step_2021_report.pdf",
  },
  global: {
    short: "WHO global release",
    title: "Nearly 1.8 billion adults at risk of disease from not doing enough physical activity",
    href: "https://www.who.int/news/item/26-06-2024-nearly-1.8-billion-adults-at-risk-of-disease-from-not-doing-enough-physical-activity",
  },
} as const;

type Source = (typeof SOURCES)[keyof typeof SOURCES];

const TABLE_ROWS = [
  {
    geography: "United States",
    year: "2022",
    population: "Adults age 18+; civilian noninstitutionalized population",
    metric: "16.9% practiced yoga in the past 12 months (age-adjusted).",
    source: SOURCES.cdc,
  },
  {
    geography: "United States",
    year: "2022",
    population: "Adults age 18+, by sex (age-adjusted)",
    metric: "Women 23.3%; men 10.3% practiced yoga in the past 12 months.",
    source: SOURCES.cdc,
  },
  {
    geography: "United States",
    year: "2022",
    population: "Adults age 18+, by age group (age-specific, not age-adjusted)",
    metric: "Ages 18–44: 21.3%; ages 45–64: 14.1%; age 65+: 8.0%. Age-specific percentages are not age-adjusted.",
    source: SOURCES.cdc,
  },
  {
    geography: "United States",
    year: "2022",
    population: "Adults age 18+ who practiced yoga in the past 12 months",
    metric: "80.0% used yoga to restore overall health; 57.4% practiced meditation as part of yoga; 28.8% used yoga to treat or manage pain (age-adjusted).",
    source: SOURCES.cdc,
  },
  {
    geography: "United States",
    year: "2012 and 2017",
    population: "U.S. adults surveyed by the National Health Interview Survey",
    metric: "9.5% practiced yoga in 2012; 14.3% in 2017. Survey-year estimates require comparability caution.",
    source: SOURCES.nccih,
  },
  {
    geography: "Viet Nam",
    year: "2021 (with 2015 comparison)",
    population: "Adults age 18–69",
    metric: "22.2% had insufficient physical activity in 2021, versus 28.1% in 2015. Not a yoga participation estimate.",
    source: SOURCES.vietnam,
  },
  {
    geography: "Global",
    year: "2022",
    population: "Adults worldwide",
    metric: "31%, about 1.8 billion adults, did not meet recommended physical activity levels. Not a yoga participation estimate.",
    source: SOURCES.global,
  },
] as const;

const ATTRIBUTION =
  "Yog Jivan Editorial Team (2026). “Yoga Participation Statistics: What Primary Sources Actually Say (2026 edition).” Reviewed 24 September 2026. https://yogjivan.com/research/yoga-participation-statistics";

export const Route = createFileRoute("/research/yoga-participation-statistics")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Yog Jivan` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE}${PATH}` },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Yoga Participation Statistics", PATH)),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: "2026-09-24",
          dateModified: "2026-09-24",
          author: { "@type": "Organization", name: "Yog Jivan Editorial Team", url: SITE },
          publisher: { "@type": "Organization", name: "Yog Jivan", url: SITE },
          mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${PATH}` },
          articleSection: "Research",
          citation: Object.values(SOURCES).map((source) => source.href),
        }),
      },
    ],
  }),
  component: ResearchPage,
});

function SourceLink({ source, label }: { source: Source; label?: string }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[color:var(--gold)] underline decoration-[color:var(--gold)]/35 underline-offset-4 hover:decoration-[color:var(--gold)]"
    >
      {label ?? source.short}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

function ResearchPage() {
  const [copied, setCopied] = useState(false);

  const copyAttribution = async () => {
    try {
      await navigator.clipboard.writeText(ATTRIBUTION);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="pt-32 md:pt-40">
      <header className="container-luxe max-w-5xl">
        <Link to="/blog" className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-[color:var(--gold)]">
          Journal &amp; research
        </Link>
        <p className="eyebrow mt-8">Source review</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{TITLE}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          A compact reference for writers and readers who need official figures with the denominator, survey year and scope still attached.
        </p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-y border-border/60 py-4 text-xs text-muted-foreground">
          <span>By Yog Jivan Editorial Team</span>
          <span>First edition</span>
          <time dateTime="2026-09-24">Reviewed 24 Sep 2026</time>
        </div>
      </header>

      <div className="container-luxe grid max-w-5xl gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="methodology">
            <h2 id="methodology" className="font-display text-3xl">Methodology</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                This page extracts only the figures specified from four official agency publications. We checked the geography, surveyed year, age range, denominator, reference period and whether a percentage was age-adjusted before reproducing it.
              </p>
              <p>
                The U.S. figures describe self-reported yoga practice. The Viet Nam and global WHO figures describe insufficient physical activity, not yoga participation. We do not combine these unlike measures or use them to estimate a yoga market.
              </p>
            </div>
          </section>

          <section aria-labelledby="us-findings">
            <p className="eyebrow">United States</p>
            <h2 id="us-findings" className="mt-3 font-display text-3xl">What the U.S. surveys report</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["16.9%", "U.S. adults age 18+ who practiced yoga in the past 12 months in 2022"],
                ["23.3%", "Women, compared with 10.3% of men"],
                ["21.3%", "Adults ages 18–44, compared with 14.1% at 45–64 and 8.0% at 65+"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-lg border border-[color:var(--gold)]/20 bg-white/[0.03] p-5">
                  <div className="font-display text-3xl text-gold-gradient">{value}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{label}</p>
                  <p className="mt-3 text-xs"><SourceLink source={SOURCES.cdc} label="Primary source" /></p>
                </div>
              ))}
            </div>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                CDC’s National Center for Health Statistics reports that an age-adjusted 16.9% of U.S. adults age 18 and older practiced yoga in the past 12 months in 2022. Women were at 23.3% and men at 10.3%, also age-adjusted. By age, the estimates were 21.3% for ages 18–44, 14.1% for ages 45–64, and 8.0% for age 65 and older; as age-specific percentages, these are not age-adjusted. <SourceLink source={SOURCES.cdc} />
              </p>
              <p>
                Among U.S. adult yoga practitioners, age-adjusted estimates show 80.0% used yoga to restore overall health, 57.4% practiced meditation as part of yoga, and 28.8% used yoga to treat or manage pain. These are percentages of yoga practitioners, not of all U.S. adults, and the wording describes respondents’ reported reasons rather than proof of an outcome. <SourceLink source={SOURCES.cdc} />
              </p>
              <p>
                NCCIH reports that 9.5% of U.S. adults practiced yoga in 2012 and 14.3% in 2017. That supports a rise between those two survey years, but comparisons should retain the named survey years and methodology rather than be extended into an unsupported current trend. <SourceLink source={SOURCES.nccih} />
              </p>
            </div>
          </section>

          <section aria-labelledby="context-not-yoga" className="rounded-lg border border-[color:var(--gold)]/25 bg-white/[0.03] p-6 sm:p-8">
            <p className="eyebrow">Context, not yoga prevalence</p>
            <h2 id="context-not-yoga" className="mt-3 font-display text-3xl">Viet Nam and global physical activity</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/85">
              <p>
                The WHO Viet Nam STEPS 2021 report says 22.2% of adults ages 18–69 did not meet the WHO recommendation on physical activity for health in 2021, compared with 28.1% in 2015. <strong>This is not a Viet Nam yoga participation estimate.</strong> <SourceLink source={SOURCES.vietnam} />
              </p>
              <p>
                WHO’s global release says 31% of adults worldwide—about 1.8 billion people—did not meet recommended physical activity levels in 2022. <strong>This is also not a yoga participation figure.</strong> <SourceLink source={SOURCES.global} />
              </p>
            </div>
          </section>

          <section aria-labelledby="source-table">
            <p className="eyebrow">Writer’s source table</p>
            <h2 id="source-table" className="mt-3 font-display text-3xl">Use the exact scope, not just the number</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Each row preserves the geography, surveyed year and population required to quote the metric responsibly.</p>
            <div className="mt-6 overflow-x-auto rounded-lg border border-border/70">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">Primary-source yoga participation and physical-activity statistics reviewed 24 September 2026</caption>
                <thead className="bg-white/[0.05] text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--gold)]">
                  <tr>
                    <th scope="col" className="p-4">Geography</th>
                    <th scope="col" className="p-4">Surveyed year</th>
                    <th scope="col" className="p-4">Population</th>
                    <th scope="col" className="p-4">Exact metric</th>
                    <th scope="col" className="p-4">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {TABLE_ROWS.map((row) => (
                    <tr key={`${row.geography}-${row.year}-${row.metric}`} className="align-top">
                      <td className="p-4 font-medium text-foreground">{row.geography}</td>
                      <td className="p-4 text-muted-foreground">{row.year}</td>
                      <td className="p-4 leading-relaxed text-muted-foreground">{row.population}</td>
                      <td className="p-4 leading-relaxed text-foreground/90">{row.metric}</td>
                      <td className="p-4"><SourceLink source={row.source} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="limitations">
            <h2 id="limitations" className="font-display text-3xl">Limitations and update policy</h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/85">
              <li>U.S. yoga estimates are self-reported and refer to practice during the past 12 months.</li>
              <li>The overall and sex-specific CDC figures reproduced here are age-adjusted; the age-group percentages are age-specific and not age-adjusted.</li>
              <li>The sources use different age ranges, questionnaires, reference periods and geographic scopes, so the U.S., Viet Nam and global percentages are not directly comparable.</li>
              <li>The Viet Nam STEPS measure covers overall physical activity and does not report yoga as a separate activity.</li>
              <li>The global WHO estimate concerns recommended physical activity levels, not yoga.</li>
              <li>This is an editorial review of primary sources, not original research, a market-size estimate or evidence that yoga causes a health outcome.</li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              First published and reviewed 24 September 2026. We will revise this page when a relevant official source is corrected, superseded or replaced by a newer comparable survey. Material changes will be reflected in the reviewed date and page text.
            </p>
          </section>

          <section aria-labelledby="sources">
            <h2 id="sources" className="font-display text-3xl">Primary sources</h2>
            <ol className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {Object.values(SOURCES).map((source, index) => (
                <li key={source.href} className="flex gap-3">
                  <span className="text-[color:var(--gold)]">{index + 1}.</span>
                  <span><SourceLink source={source} label={source.title} /></span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="cite-this-page" className="rounded-lg border border-[color:var(--gold)]/25 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="cite-this-page" className="font-display text-2xl">Cite this page</h2>
              <Button type="button" variant="outline" onClick={copyAttribution} aria-live="polite">
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copied ? "Copied" : "Copy citation"}
              </Button>
            </div>
            <p className="mt-5 select-all break-words rounded-md border border-border/70 bg-[color:var(--onyx)]/35 p-4 font-mono text-xs leading-relaxed text-foreground/80">{ATTRIBUTION}</p>
            <p className="mt-3 text-xs text-muted-foreground">For a specific statistic, cite the linked primary source as well as this editorial summary.</p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28" aria-label="On this page">
          <div className="rounded-lg border border-border/70 bg-white/[0.02] p-5">
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--gold)]">On this page</p>
            <nav className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <a href="#methodology" className="hover:text-foreground">Methodology</a>
              <a href="#us-findings" className="hover:text-foreground">U.S. findings</a>
              <a href="#context-not-yoga" className="hover:text-foreground">Viet Nam &amp; global context</a>
              <a href="#source-table" className="hover:text-foreground">Source table</a>
              <a href="#limitations" className="hover:text-foreground">Limitations</a>
              <a href="#sources" className="hover:text-foreground">Primary sources</a>
              <a href="#cite-this-page" className="hover:text-foreground">Cite this page</a>
            </nav>
          </div>
        </aside>
      </div>
    </article>
  );
}