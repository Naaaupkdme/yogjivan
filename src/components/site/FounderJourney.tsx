import { motion } from "framer-motion";
import masterMeditation from "@/assets/img_20260620_125938.jpg.asset.json";
import advancedPosture from "@/assets/fb_img_1691544924455.jpg.asset.json";
import { useLang } from "@/lib/language";

const MILESTONES = [
  { year: "2013", title: "The Beginning", body: "Began dedicated yoga practice in India under traditional masters." },
  { year: "2017", title: "Crossing Borders", body: "Moved to Vietnam with a mission to share authentic yoga knowledge." },
  { year: "2019", title: "Yog Jivan Founded", body: "Built a refined sanctuary where healing meets quiet luxury." },
  { year: "2022", title: "Premium Expansion", body: "Grew into a full luxury wellness experience with two studios." },
  { year: "2026", title: "Global Sanctuary", body: "Serving students worldwide through studio, retreat & online." },
];

export function FounderJourney() {
  const { t } = useLang();

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Faint world map texture + India→Vietnam route */}
      <svg viewBox="0 0 1200 600" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]">
        <defs>
          <radialGradient id="mapfade" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#mapfade)" className="text-primary" />
        {/* simplified continent dot grid */}
        {Array.from({ length: 32 }).map((_, r) =>
          Array.from({ length: 60 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 19 + 10} r="1" fill="currentColor" className="text-primary" />
          )),
        )}
        {/* India → Vietnam arc */}
        <path d="M 420 280 Q 560 140 720 270" fill="none" stroke="url(#routeGrad)" strokeWidth="1.5" strokeDasharray="4 6">
          <animate attributeName="stroke-dashoffset" from="0" to="60" dur="6s" repeatCount="indefinite" />
        </path>
        <defs>
          <linearGradient id="routeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="420" cy="280" r="3" fill="var(--gold)" />
        <circle cx="720" cy="270" r="3" fill="var(--gold)" />
      </svg>

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-1/3 h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 14%, transparent), transparent 70%)" }} />
      <div className="pointer-events-none absolute right-[-8%] bottom-1/4 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold-soft) 10%, transparent), transparent 70%)" }} />

      <div className="container-luxe relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />{t.story.eyebrow}<span className="h-px w-10 bg-primary" /></p>
          <h2 className="mt-5 fluid-title">The Journey of Yog Jivan</h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">{t.story.intro}</p>
        </div>

        {/* Tree */}
        <div className="relative mt-16 md:mt-24">
          {/* Central glowing trunk */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--gold)]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--gold)]/40 to-transparent blur-md" />
          </div>

          {/* Floating particles */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span key={i} aria-hidden
              className="absolute left-1/2 h-1 w-1 rounded-full bg-[color:var(--gold)]/70"
              style={{ top: `${(i * 7) % 95}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2], x: [(i % 2 ? -1 : 1) * 6, (i % 2 ? 1 : -1) * 6, (i % 2 ? -1 : 1) * 6] }}
              transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}

          {/* Founder portraits — woven into the tree */}
          <div className="hidden md:block">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.1 }}
              src={masterMeditation.url} alt="Master Anil in meditation"
              className="absolute left-[2%] top-[18%] h-56 w-44 lg:h-72 lg:w-56 rounded-[1.5rem] object-cover ring-1 ring-[color:var(--gold)]/30 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 }}
              src={advancedPosture.url} alt="Master Anil in advanced posture"
              className="absolute right-[2%] bottom-[12%] h-56 w-44 lg:h-72 lg:w-56 rounded-[1.5rem] object-cover ring-1 ring-[color:var(--gold)]/30 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
            />
          </div>

          <ol className="relative grid gap-12 md:gap-16">
            {MILESTONES.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="relative grid md:grid-cols-2 md:gap-10 items-center"
                >
                  {/* Branch line */}
                  <svg aria-hidden viewBox="0 0 200 40" className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-10 w-[40%] ${left ? "right-1/2" : "left-1/2 -scale-x-100"}`}>
                    <path d="M 0 20 Q 80 20 200 20" fill="none" stroke="url(#branchGrad)" strokeWidth="1.2" />
                    <defs>
                      <linearGradient id="branchGrad" x1="0" x2="1">
                        <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.85" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Trunk node */}
                  <span aria-hidden className="absolute left-1/2 -translate-x-1/2 z-10 grid h-5 w-5 place-items-center">
                    <span className="absolute h-5 w-5 rounded-full bg-[color:var(--gold)]/20 blur-md" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_18px_2px_color-mix(in_oklab,var(--gold)_70%,transparent)]" />
                  </span>

                  {/* Card */}
                  <div className={`${left ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"} px-4 md:px-0`}>
                    <div className="glass-luxe rounded-[1.5rem] p-5 md:p-6 inline-block max-w-md">
                      <div className="text-[0.62rem] uppercase tracking-[0.32em] text-primary">{m.year}</div>
                      <h3 className="mt-2 text-xl md:text-2xl leading-tight font-display">{m.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
