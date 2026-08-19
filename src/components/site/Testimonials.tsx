import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { PUBLIC_TRUST_METRICS, GOOGLE_RATING } from "@/lib/facts/trust";
import { LOCATIONS } from "@/lib/facts/locations";

/**
 * COMMUNITY & VERIFICATION SECTION (formerly the testimonial carousel).
 *
 * HARD RULE: no invented students, quotes, countries, initials or star rows.
 * Every previous hardcoded testimonial was unverified and has been removed.
 *
 * VERIFIED_QUOTES stays EMPTY until Yog Jivan supplies a real student quote
 * WITH written permission. Adding an entry renders the quote block again with
 * no redesign. Never add a quote sourced from a draft, an example or an AI.
 *
 * Google ratings are shown only next to a direct Google Maps link so a visitor
 * can verify them, and never as AggregateRating/Review JSON-LD on our own pages.
 */

type VerifiedQuote = {
  /** Attribution exactly as the student permitted it. */
  attribution: string;
  quote: string;
};

const VERIFIED_QUOTES: VerifiedQuote[] = [];

const STUDIOS = [
  { name: LOCATIONS.studio1.name, area: LOCATIONS.studio1.localDescriptor, maps: LOCATIONS.studio1.googleMaps },
  { name: LOCATIONS.studio2.name, area: LOCATIONS.studio2.localDescriptor, maps: LOCATIONS.studio2.googleMaps },
];

export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />Our community<span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-4 font-display leading-[1.1]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
            A practising community, in Vietnam and <span className="italic text-gold-gradient">worldwide.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Two studios serving the Hai Duong urban area, plus live online classes for students in
            other countries.
          </p>
        </div>

        {/* Trust strip — single source of truth: src/lib/facts/trust.ts */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {PUBLIC_TRUST_METRICS.map((t) => (
            <div key={t.label} className="glass-soft rounded-[0.9rem] px-3 py-3 text-center">
              <div className="font-display text-base leading-none text-gold-gradient sm:text-lg">{t.value}</div>
              <div className="mt-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{t.label}</div>
            </div>
          ))}
        </div>

        {/* Verifiable reviews — rating shown only with a direct Google Maps link. */}
        {GOOGLE_RATING.displayable && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2"
          >
            {STUDIOS.map((s) => (
              <a
                key={s.name}
                href={s.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-luxe group rounded-[1.5rem] p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {s.area}
                </div>
                <div className="mt-3 font-display text-lg leading-snug">{s.name}</div>
                <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                  <span className="font-display text-xl">{GOOGLE_RATING.value}</span>
                  <span className="text-muted-foreground">on Google · {GOOGLE_RATING.reviewsLabel}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.22em] text-primary group-hover:text-foreground">
                  Read the reviews on Google <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            ))}
          </motion.div>
        )}

        {/* Written student quotes appear here only once permission exists. */}
        {VERIFIED_QUOTES.length > 0 && (
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
            {VERIFIED_QUOTES.map((q) => (
              <figure key={q.attribution} className="glass-luxe rounded-[1.5rem] p-6">
                <blockquote className="text-base leading-relaxed text-foreground/90">"{q.quote}"</blockquote>
                <figcaption className="mt-4 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {q.attribution}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
          <p className="inline-flex items-center gap-2 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
            We publish student words only with written permission, so this page stays honest.
          </p>
          <a
            href="https://youtube.com/@yogjivanvietnam?si=MClExD8wRgaoWbvR"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the Yog Jivan YouTube channel"
            className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-primary transition-colors hover:text-foreground"
          >
            Visit our YouTube channel <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
