import { motion } from "framer-motion";
import masterPortrait from "@/assets/img_20260620_125938.jpg.asset.json";
import { useLang } from "@/lib/language";

const MILESTONES = [
  { year: "2013", title: "Started Yoga", body: "Discipline and self-practice began under Indian masters.", region: "INDIA" },
  { year: "2017", title: "Arrived in Vietnam", body: "Indian wisdom meets a new community.", region: "INDIA → VN" },
  { year: "2019", title: "Founded Yog Jivan", body: "A sanctuary for healing and transformation.", region: "VIETNAM" },
  { year: "2022", title: "Premium Studio Expansion", body: "Luxury space built for deeper experiences.", region: "VIETNAM" },
  { year: "2026", title: "Global Vision", body: "Taking authentic yoga and therapeutic healing worldwide.", region: "GLOBAL" },
];

const PILLARS = [
  { icon: "𑗉", title: "Rooted in India", body: "Ancient wisdom, timeless values." },
  { icon: "✿", title: "Grown in Vietnam", body: "Nourished by culture, community & trust." },
  { icon: "✦", title: "Branching Globally", body: "Touching lives across borders." },
  { icon: "☀", title: "Future Ready", body: "A legacy of healing & purpose." },
];

export function FounderJourney() {
  const { t } = useLang();

  return (
    <section className="section-pad relative overflow-hidden">
      {/* Faint map + India→Vietnam arc */}
      <svg viewBox="0 0 1200 700" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]">
        <defs>
          <radialGradient id="mapfade2" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="routeGrad2" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--gold)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1200" height="700" fill="url(#mapfade2)" className="text-primary" />
        {Array.from({ length: 36 }).map((_, r) =>
          Array.from({ length: 60 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 19 + 10} r="1" fill="currentColor" className="text-primary" />
          )),
        )}
        <path d="M 380 220 Q 600 90 820 240" fill="none" stroke="url(#routeGrad2)" strokeWidth="1.5" strokeDasharray="4 6">
          <animate attributeName="stroke-dashoffset" from="0" to="60" dur="6s" repeatCount="indefinite" />
        </path>
        <circle cx="380" cy="220" r="3.5" fill="var(--gold)" />
        <circle cx="820" cy="240" r="3.5" fill="var(--gold)" />
        <text x="360" y="205" fontSize="10" letterSpacing="3" fill="var(--gold)">INDIA</text>
        <text x="800" y="225" fontSize="10" letterSpacing="3" fill="var(--gold)">VIETNAM</text>
      </svg>

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-1/3 h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 14%, transparent), transparent 70%)" }} />
      <div className="pointer-events-none absolute right-[-8%] bottom-1/4 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold-soft) 10%, transparent), transparent 70%)" }} />

      <div className="container-luxe relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />Tree of Transformation<span className="h-px w-10 bg-primary" /></p>
          <h2 className="mt-5 fluid-title">The Journey of Yog Jivan</h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">
            A journey rooted in discipline, grown in devotion, and guided by purpose to transform lives.
          </p>
        </div>

        {/* Tree — central portrait + organic branching */}
        <div className="relative mt-16 md:mt-24 grid lg:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center">
          {/* LEFT branches (India / earlier) */}
          <div className="space-y-6 md:space-y-10 lg:text-right order-2 lg:order-1">
            {MILESTONES.slice(0, 2).map((m, i) => (
              <Branch key={m.year} m={m} side="left" delay={i * 0.12} />
            ))}
          </div>

          {/* Center trunk + portrait */}
          <div className="relative order-1 lg:order-2 flex flex-col items-center">
            {/* trunk */}
            <div aria-hidden className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--gold)]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--gold)]/40 to-transparent blur-md" />
            </div>

            {/* canopy SVG arches */}
            <svg viewBox="0 0 400 200" aria-hidden className="absolute -top-6 left-1/2 -translate-x-1/2 w-72 md:w-96 opacity-70">
              <g fill="none" stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="0.9">
                <path d="M 200 200 C 120 140, 60 120, 30 60" />
                <path d="M 200 200 C 280 140, 340 120, 370 60" />
                <path d="M 200 200 C 160 130, 130 100, 110 30" />
                <path d="M 200 200 C 240 130, 270 100, 290 30" />
                <path d="M 200 200 C 200 130, 200 80, 200 10" />
              </g>
            </svg>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.1 }}
              className="relative z-10 mt-2"
            >
              <div className="relative h-44 w-44 md:h-56 md:w-56 rounded-full overflow-hidden ring-1 ring-[color:var(--gold)]/50 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--gold)_60%,transparent)]">
                <img src={masterPortrait.url} alt="Master Anil Choudhary" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* halo rings */}
              <div aria-hidden className="absolute inset-[-12px] rounded-full border border-[color:var(--gold)]/30" />
              <div aria-hidden className="absolute inset-[-24px] rounded-full border border-[color:var(--gold)]/15" />
              <div className="mt-5 text-center">
                <div className="text-[0.6rem] uppercase tracking-[0.32em] text-primary">Master · Founder</div>
                <div className="mt-2 font-display text-xl md:text-2xl">Anil Choudhary</div>
              </div>
            </motion.div>

            {/* roots */}
            <svg viewBox="0 0 400 120" aria-hidden className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-72 md:w-96 opacity-60">
              <g fill="none" stroke="var(--gold)" strokeOpacity="0.45" strokeWidth="0.9">
                <path d="M 200 0 C 150 30, 110 60, 50 110" />
                <path d="M 200 0 C 250 30, 290 60, 350 110" />
                <path d="M 200 0 C 200 40, 200 70, 200 115" />
                <path d="M 200 0 C 180 30, 160 60, 130 110" />
                <path d="M 200 0 C 220 30, 240 60, 270 110" />
              </g>
            </svg>
          </div>

          {/* RIGHT branches (Vietnam / later) */}
          <div className="space-y-6 md:space-y-10 order-3">
            {MILESTONES.slice(2).map((m, i) => (
              <Branch key={m.year} m={m} side="right" delay={i * 0.12} />
            ))}
          </div>
        </div>

        {/* Four pillars */}
        <div className="mt-16 md:mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="glass-luxe rounded-2xl p-5"
            >
              <div className="text-[color:var(--gold)] text-xl">{p.icon}</div>
              <div className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] text-primary">{p.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm italic text-muted-foreground max-w-xl mx-auto">
          “A journey rooted in discipline, grown in devotion, and guided by purpose to transform lives.”
          <span className="block not-italic mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-primary">— Master Anil Choudhary</span>
        </p>
      </div>
    </section>
  );
}

function Branch({ m, side, delay }: { m: (typeof MILESTONES)[number]; side: "left" | "right"; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative"
    >
      <div className={`glass-luxe rounded-2xl p-5 md:p-6 max-w-md ${side === "left" ? "lg:ml-auto" : ""}`}>
        <div className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.3em]">
          <span className="text-primary">{m.year}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[color:var(--gold)]/50 to-transparent" />
          <span className="text-muted-foreground">{m.region}</span>
        </div>
        <h3 className="mt-3 font-display text-xl md:text-2xl leading-tight">{m.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
      </div>
    </motion.div>
  );
}
