import { motion } from "framer-motion";
import { LuxuryImage } from "./LuxuryImage";
import { masterImages, masterAlts } from "@/lib/images";

const TIMELINE = [
  { year: "Pre-2017", title: "Formation in India", body: "Years of dedicated study — Diploma and Master's Degree in Yoga, rooted in the classical Indian lineage." },
  { year: "2017", title: "Arrival in Vietnam", body: "Master Anil moved to Hai Duong with a mission: bring authentic Indian yoga to Vietnamese and international students." },
  { year: "2019", title: "Sanctuary Studio Opens", body: "Yog Jivan's first dedicated studio opens, becoming a refuge for consistent practice and supportive, therapeutic-style yoga." },
  { year: "2022", title: "Global Online Community", body: "Programs reach students in 20+ countries through live online classes and private mentorship." },
  { year: "Today", title: "1000+ Lives Transformed", body: "A growing sanctuary — corporate wellness, therapeutic recovery, kids programs and international retreats." },
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
            12+ years of practice. Diploma and Master's Degree in Yoga. A mission to share authentic Indian wellness with the world.
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
