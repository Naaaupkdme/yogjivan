import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flower2, Globe2, Landmark, Building2, Laptop, Earth } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  body: string;
  country: string;
  Icon: typeof Flower2;
};

const MILESTONES: Milestone[] = [
  { year: "2013", title: "Started Yoga", body: "Discipline born under Indian masters.", country: "INDIA", Icon: Flower2 },
  { year: "2017", title: "Moved to Vietnam", body: "Indian wisdom meets a new community.", country: "VIETNAM", Icon: Globe2 },
  { year: "2019", title: "Founded Yog Jivan", body: "A sanctuary for healing was born.", country: "VIETNAM", Icon: Landmark },
  { year: "2022", title: "Studio Expansion", body: "Luxury spaces for deeper healing.", country: "VIETNAM", Icon: Building2 },
  { year: "2024", title: "Global Community", body: "Live sessions across 20+ countries.", country: "GLOBAL", Icon: Laptop },
  { year: "2026", title: "Global Vision", body: "Therapeutic mastery for the world.", country: "WORLDWIDE", Icon: Earth },
];

// Flowing river path across 2 rows × 3 columns (viewBox 1200 × 420).
// Enters left, sweeps through row 1, descends, sweeps back through row 2, exits right.
const RIVER_D =
  "M40 110 C 220 60, 380 160, 600 110 S 980 60, 1160 130 C 1100 220, 980 240, 900 310 S 600 360, 400 310 S 120 280, 40 320";

export function FounderJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="section-tight relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_55%)]" />

      {/* Golden particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[color:var(--gold)]/55 blur-[1px]"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `float-y ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
              opacity: 0.32,
            }}
          />
        ))}
      </div>

      <div className="container-luxe relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            The Journey of Yog Jivan
            <span className="h-px w-10 bg-[color:var(--gold)]" />
          </p>
          <h2 className="mt-4 fluid-title">
            A Path <span className="italic text-gold-gradient">Rooted in Devotion</span>
          </h2>
          <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
            From a mat in India to a global sanctuary of healing.
          </p>
        </div>

        {/* Desktop: 2×3 grid with flowing golden river path behind */}
        <div className="relative mx-auto mt-10 hidden md:block max-w-6xl">
          <svg
            viewBox="0 0 1200 420"
            preserveAspectRatio="none"
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.87 0.06 84)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="oklch(0.79 0.09 82)" stopOpacity="1" />
                <stop offset="100%" stopColor="oklch(0.87 0.06 84)" stopOpacity="0.15" />
              </linearGradient>
              <filter id="riverGlow">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d={RIVER_D} fill="none" stroke="oklch(0.79 0.09 82 / 0.15)" strokeWidth="1.4" />
            <motion.path
              d={RIVER_D}
              fill="none"
              stroke="url(#river)"
              strokeWidth="1.8"
              strokeLinecap="round"
              filter="url(#riverGlow)"
              style={{ pathLength }}
            />
          </svg>

          <div className="relative grid grid-cols-3 gap-x-6 gap-y-10">
            {MILESTONES.map((m, idx) => (
              <MilestoneCard key={m.year} m={m} idx={idx} />
            ))}
          </div>
        </div>

        {/* Mobile: compact stack */}
        <div className="relative mx-auto mt-8 md:hidden">
          <div
            aria-hidden
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/55 to-transparent"
          />
          <ol className="space-y-6">
            {MILESTONES.map((m, idx) => (
              <li key={m.year} className="relative pl-12">
                <span className="absolute left-5 top-5 -translate-x-1/2 h-3 w-3 rounded-full bg-[color:var(--gold)] shadow-[0_0_14px_3px_color-mix(in_oklab,var(--gold)_60%,transparent)]" />
                <MilestoneCard m={m} idx={idx} compact />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({ m, idx, compact = false }: { m: Milestone; idx: number; compact?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.05 * idx, ease: "easeOut" }}
      className={`glass-luxe group relative rounded-2xl p-4 md:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]/55 hover:shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)] ${
        compact ? "" : "min-h-[170px]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/50 bg-black/40 text-[color:var(--gold)] shadow-[0_0_16px_-4px_color-mix(in_oklab,var(--gold)_60%,transparent)] transition-transform duration-500 group-hover:scale-110">
          <m.Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>
        <div>
          <div className="font-display text-2xl leading-none text-gold-gradient">{m.year}</div>
          <div className="mt-1 text-[0.55rem] tracking-[0.25em] text-[color:var(--gold)]/80">
            {m.country}
          </div>
        </div>
      </div>
      <h3 className="mt-3 font-display text-lg leading-tight">{m.title}</h3>
      <p className="mt-1 text-[0.78rem] leading-relaxed text-muted-foreground">{m.body}</p>
    </motion.article>
  );
}
