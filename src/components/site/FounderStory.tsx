import { motion } from "framer-motion";
import { LuxuryImage } from "./LuxuryImage";
import { masterImages, masterAlts } from "@/lib/images";
import { PUBLIC_TRUST } from "@/lib/facts/trust";

const TIMELINE = [
  { year: "Founder", title: "Master Anil Choudhary", body: "Founder & Lead Yoga Teacher of Yog Jivan. He sets the teaching approach the whole team follows." },
  { year: "Experience", title: "12+ Years Teaching", body: "Classical Indian yoga — Hatha, Ashtanga and pranayama — taught with careful progression and attention to alignment." },
  { year: "Reach", title: `${PUBLIC_TRUST.studentsTaught} Students Guided`, body: `Yog Jivan has guided students from ${PUBLIC_TRUST.countries} countries, in-studio and live online.` },
  { year: "Studios", title: "Two Studios", body: "Serving the Hai Duong urban area with dedicated practice spaces." },
  { year: "Model", title: "Live Online + Private Team", body: "Live online group classes led by Master Anil; private and studio sessions matched with the Yog Jivan teaching team." },
];

export function FounderStory() {
  return (
    <section id="founder" className="section-y relative overflow-hidden">
      <div className="container-luxe relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" /> Founder
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-5 fluid-title">Meet Master Anil Choudhary.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Master Anil Choudhary is the Founder & Lead Yoga Teacher of Yog Jivan. 12+ years of teaching classical Indian yoga — Hatha, Ashtanga and pranayama — with a team-based approach that has guided 10,000+ students from 20+ countries.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative lg:sticky lg:top-28"
          >
            <LuxuryImage
              src={masterImages.founderPortrait}
              alt={masterAlts.founderPortrait}
              aspect="4 / 5"
              overlay
              shimmer
              radius={32}
              eager
            />

          </motion.div>

          <ol className="relative space-y-8 lg:space-y-10 pl-6 sm:pl-10">
            {/* timeline rail */}
            <div
              aria-hidden
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent, color-mix(in oklab, var(--gold) 50%, transparent), color-mix(in oklab, var(--gold) 30%, transparent), transparent)",
              }}
            />
            {TIMELINE.map((step, i) => (
              <motion.li
                key={step.year}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-[26px] sm:-left-[34px] top-1.5 grid h-4 w-4 place-items-center rounded-full"
                  style={{
                    background: "var(--gold)",
                    boxShadow:
                      "0 0 0 4px color-mix(in oklab, var(--gold) 18%, transparent), 0 0 20px color-mix(in oklab, var(--gold) 60%, transparent)",
                  }}
                />
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-primary">{step.year}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-xl">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
