import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import masterPortrait from "@/assets/img_20260620_125938.jpg.asset.json";

type Milestone = {
  year: string;
  title: string;
  body: string;
  region: string;
  // anchor on tree (percent of section)
  x: number;
  y: number;
  // card placement side
  side: "left" | "right";
};

const MILESTONES: Milestone[] = [
  { year: "2013", title: "Started Yoga", body: "Discipline and self-practice began under Indian masters.", region: "INDIA", x: 22, y: 70, side: "left" },
  { year: "2017", title: "Arrived in Vietnam", body: "Indian wisdom meets a new community.", region: "INDIA → VIETNAM", x: 14, y: 44, side: "left" },
  { year: "2019", title: "Founded Yog Jivan", body: "A sanctuary for healing and transformation was born.", region: "VIETNAM", x: 50, y: 14, side: "right" },
  { year: "2022", title: "Premium Studio Expansion", body: "Luxury spaces built for deeper healing experiences.", region: "VIETNAM", x: 86, y: 44, side: "right" },
  { year: "2026", title: "Global Vision", body: "Taking authentic yoga and therapeutic healing worldwide.", region: "GLOBAL", x: 78, y: 70, side: "right" },
];

const PILLARS = [
  { icon: "𑗉", title: "Rooted in India", body: "Ancient wisdom, timeless values." },
  { icon: "✿", title: "Grown in Vietnam", body: "Nourished by culture, community & trust." },
  { icon: "✦", title: "Branching Globally", body: "Touching lives across borders & hearts." },
  { icon: "☀", title: "Future Ready", body: "Building a legacy of healing & purpose." },
];

// Deterministic pseudo-random particles
const PARTICLES = Array.from({ length: 48 }).map((_, i) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  const r1 = s - Math.floor(s);
  const r2 = Math.abs(Math.sin(i * 78.233)) % 1;
  const r3 = Math.abs(Math.cos(i * 39.42)) % 1;
  return {
    left: r1 * 100,
    top: r2 * 100,
    size: 1 + r3 * 3,
    delay: r1 * 8,
    duration: 9 + r2 * 10,
    opacity: 0.25 + r3 * 0.55,
  };
});

export function FounderJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const treeY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const mistY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 35%, color-mix(in oklab, var(--gold) 10%, transparent) 0%, transparent 70%), linear-gradient(180deg, oklch(0.10 0.012 60) 0%, oklch(0.07 0.01 55) 60%, oklch(0.05 0.008 50) 100%)",
      }}
    >
      {/* Ambient mist */}
      <motion.div
        aria-hidden
        style={{ y: mistY }}
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_8%,transparent),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,oklch(0.04_0.005_50/0.9),transparent_70%)]" />
      </motion.div>

      {/* Faint India ↔ Vietnam map outlines */}
      <svg
        aria-hidden
        viewBox="0 0 1600 1100"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] mix-blend-screen"
      >
        <defs>
          <linearGradient id="route-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--gold)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* dot grid suggesting a map */}
        {Array.from({ length: 40 }).map((_, r) =>
          Array.from({ length: 60 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 27 + 14} cy={r * 27 + 14} r="0.9" fill="var(--gold)" />
          )),
        )}
        {/* India blob */}
        <path
          d="M 240 380 q 30 -60 90 -70 q 70 -10 110 30 q 30 40 10 110 q -20 70 -80 100 q -70 30 -110 -10 q -40 -50 -50 -100 q -10 -30 30 -60 z"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
        />
        {/* Vietnam strip */}
        <path
          d="M 1200 320 q 40 60 30 150 q -10 80 -50 160 q -40 90 -100 130 q -20 -50 10 -130 q 30 -90 50 -180 q 20 -90 60 -130 z"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
        />
      </svg>

      {/* Animated golden India→Vietnam route */}
      <svg
        aria-hidden
        viewBox="0 0 1600 1100"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M 320 460 C 600 220, 1000 220, 1280 460"
          fill="none"
          stroke="url(#route-grad)"
          strokeWidth="1.4"
          strokeDasharray="3 8"
          opacity="0.55"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="110" dur="9s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Floating golden particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "color-mix(in oklab, var(--gold) 90%, white)",
              boxShadow: "0 0 8px color-mix(in oklab, var(--gold) 80%, transparent)",
              opacity: p.opacity,
              animation: `yj-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes yj-float {
          0%, 100% { transform: translate3d(0,0,0); opacity: var(--o, 0.4); }
          50% { transform: translate3d(0,-40px,0); opacity: 1; }
        }
        @keyframes yj-breathe {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 18px color-mix(in oklab, var(--gold) 35%, transparent)); }
          50% { transform: scale(1.012); filter: drop-shadow(0 0 36px color-mix(in oklab, var(--gold) 55%, transparent)); }
        }
        @keyframes yj-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.18); }
        }
        @keyframes yj-draw {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="relative container-luxe pt-12 md:pt-16 pb-10 md:pb-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto relative z-20">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            Tree of Transformation
            <span className="h-px w-10 bg-[color:var(--gold)]" />
          </p>
          <h2 className="mt-5 fluid-title">The Journey of Yog Jivan</h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">
            A journey rooted in discipline, grown in devotion, and guided by purpose to transform lives.
          </p>
        </div>

        {/* TREE STAGE */}
        <motion.div
          style={{ y: treeY }}
          className="relative mt-10 md:mt-16 w-full"
        >
          <div className="relative w-full" style={{ minHeight: "clamp(560px, 70vh, 820px)" }}>
            {/* Banyan Tree SVG */}
            <svg
              aria-hidden
              viewBox="0 0 1000 900"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              style={{ animation: "yj-breathe 9s ease-in-out infinite", transformOrigin: "50% 70%" }}
            >
              <defs>
                <linearGradient id="trunk-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="branch-grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.15" />
                </linearGradient>
                <radialGradient id="canopy-glow" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.28" />
                  <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                </radialGradient>
                <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              {/* canopy aura */}
              <ellipse cx="500" cy="340" rx="520" ry="320" fill="url(#canopy-glow)" />

              {/* roots */}
              <g stroke="url(#trunk-grad)" strokeWidth="2.5" fill="none" opacity="0.85">
                <path d="M 500 720 C 440 760, 360 800, 240 840" />
                <path d="M 500 720 C 560 760, 640 800, 760 840" />
                <path d="M 500 720 C 470 780, 430 820, 360 880" />
                <path d="M 500 720 C 530 780, 570 820, 640 880" />
                <path d="M 500 720 C 500 800, 500 850, 500 890" />
              </g>

              {/* hanging banyan tendrils */}
              <g stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1" fill="none">
                {Array.from({ length: 14 }).map((_, i) => {
                  const x = 180 + i * 50;
                  const sway = 10 + (i % 3) * 6;
                  return (
                    <path
                      key={i}
                      d={`M ${x} 220 q ${sway} 120, 0 240`}
                    />
                  );
                })}
              </g>

              {/* trunk */}
              <path
                d="M 470 720 C 478 600, 492 500, 488 380 C 486 320, 504 280, 500 220"
                stroke="url(#trunk-grad)"
                strokeWidth="22"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 470 720 C 478 600, 492 500, 488 380 C 486 320, 504 280, 500 220"
                stroke="var(--gold)"
                strokeOpacity="0.35"
                strokeWidth="34"
                fill="none"
                strokeLinecap="round"
                filter="url(#soft-glow)"
              />

              {/* primary branches → reach toward each milestone */}
              <g fill="none" strokeLinecap="round">
                {/* to 2013 left low (22%,70%) -> svg ~ (220,630) */}
                <path d="M 488 470 C 400 510, 320 580, 220 630" stroke="url(#branch-grad)" strokeWidth="5" />
                {/* to 2017 left mid (14%,44%) -> (140,396) */}
                <path d="M 492 380 C 360 360, 240 380, 140 396" stroke="url(#branch-grad)" strokeWidth="5" />
                {/* to 2019 top (50%,14%) -> (500,126) */}
                <path d="M 500 240 C 500 200, 500 160, 500 126" stroke="url(#branch-grad)" strokeWidth="5" />
                {/* to 2022 right mid (86%,44%) -> (860,396) */}
                <path d="M 508 380 C 640 360, 760 380, 860 396" stroke="url(#branch-grad)" strokeWidth="5" transform="scale(-1 1) translate(-1000 0)" />
                {/* to 2026 right low (78%,70%) -> (780,630) */}
                <path d="M 512 470 C 600 510, 680 580, 780 630" stroke="url(#branch-grad)" strokeWidth="5" />
              </g>

              {/* leafy clusters */}
              <g fill="var(--gold)" opacity="0.18">
                <circle cx="220" cy="630" r="56" />
                <circle cx="140" cy="396" r="62" />
                <circle cx="500" cy="126" r="78" />
                <circle cx="860" cy="396" r="62" />
                <circle cx="780" cy="630" r="56" />
                <circle cx="340" cy="280" r="48" />
                <circle cx="660" cy="280" r="48" />
              </g>
              <g fill="var(--gold)" opacity="0.35" filter="url(#soft-glow)">
                <circle cx="500" cy="220" r="120" />
              </g>

              {/* milestone glow nodes */}
              {MILESTONES.map((m) => {
                const cx = (m.x / 100) * 1000;
                const cy = (m.y / 100) * 900;
                return (
                  <g key={m.year}>
                    <circle cx={cx} cy={cy} r="14" fill="var(--gold)" opacity="0.18" />
                    <circle cx={cx} cy={cy} r="6" fill="var(--gold)" style={{ animation: "yj-pulse 3s ease-in-out infinite" }} />
                  </g>
                );
              })}
            </svg>

            {/* Center founder portrait */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              {/* sacred geometry behind */}
              <svg viewBox="0 0 300 300" className="absolute -inset-12 md:-inset-16 opacity-60 pointer-events-none" aria-hidden>
                <g fill="none" stroke="var(--gold)" strokeOpacity="0.4" strokeWidth="0.6">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const a = (i * Math.PI) / 3;
                    return <circle key={i} cx={150 + Math.cos(a) * 36} cy={150 + Math.sin(a) * 36} r="58" />;
                  })}
                  <circle cx="150" cy="150" r="58" />
                  <circle cx="150" cy="150" r="92" strokeOpacity="0.25" />
                  <circle cx="150" cy="150" r="120" strokeOpacity="0.15" />
                </g>
              </svg>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1 }}
                className="relative"
              >
                <div className="relative h-44 w-44 md:h-56 md:w-56 rounded-full overflow-hidden ring-1 ring-[color:var(--gold)]/60 shadow-[0_30px_120px_-20px_color-mix(in_oklab,var(--gold)_70%,transparent)]">
                  <img src={masterPortrait.url} alt="Master Anil Choudhary" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="absolute -inset-2 rounded-full border border-[color:var(--gold)]/40 pointer-events-none" />
                <div className="absolute -inset-5 rounded-full border border-[color:var(--gold)]/20 pointer-events-none" />
                <div className="mt-5 text-center">
                  <div className="text-[0.6rem] uppercase tracking-[0.34em] text-[color:var(--gold)]">Master · Founder</div>
                  <div className="mt-2 font-display text-xl md:text-2xl">Anil Choudhary</div>
                </div>
              </motion.div>
            </div>

            {/* Milestone cards positioned on branches */}
            <div className="absolute inset-0 hidden md:block">
              {MILESTONES.map((m, i) => (
                <MilestoneCard key={m.year} m={m} index={i} />
              ))}
            </div>

            {/* Mobile fallback stack */}
            <div className="md:hidden absolute inset-x-0 bottom-2 px-4">
              <div className="grid gap-3">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="glass-luxe rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.28em]">
                      <span className="text-[color:var(--gold)]">{m.year}</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-[color:var(--gold)]/50 to-transparent" />
                      <span className="text-muted-foreground">{m.region}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg leading-tight">{m.title}</h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">{m.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium pillar ribbon */}
        <div className="relative mt-14 md:mt-20">
          <div className="glass-luxe rounded-[1.75rem] p-3 md:p-4">
            <div className="grid gap-2 md:gap-0 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[color:var(--gold)]/15">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="group relative p-5 md:p-6 transition-colors hover:bg-[color-mix(in_oklab,var(--gold)_4%,transparent)] rounded-2xl"
                >
                  <div
                    className="grid h-11 w-11 place-items-center rounded-full text-[color:var(--gold)] text-lg ring-1 ring-[color:var(--gold)]/40"
                    style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)" }}
                  >
                    {p.icon}
                  </div>
                  <div className="mt-4 text-[0.62rem] uppercase tracking-[0.3em] text-[color:var(--gold)]">{p.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  <div className="pointer-events-none absolute inset-x-5 bottom-3 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm italic text-muted-foreground max-w-xl mx-auto">
          “A journey rooted in discipline, grown in devotion, and guided by purpose to transform lives.”
          <span className="block not-italic mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-[color:var(--gold)]">— Master Anil Choudhary</span>
        </p>
      </div>
    </section>
  );
}

function MilestoneCard({ m, index }: { m: Milestone; index: number }) {
  // offset card from anchor so it doesn't sit on the node
  const offsetX = m.side === "left" ? -2 : 2;
  const offsetY = m.y < 30 ? 8 : m.y > 60 ? -2 : 0;
  const left = `${m.x + offsetX}%`;
  const top = `${m.y + offsetY}%`;
  const translate = m.side === "left" ? "-translate-x-full" : "translate-x-0";

  return (
    <motion.div
      initial={{ opacity: 0, x: m.side === "left" ? -24 : 24, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.1 }}
      className={`absolute ${translate} -translate-y-1/2 z-20`}
      style={{ left, top, width: "min(280px, 24vw)" }}
    >
      {/* connector dot */}
      <div
        aria-hidden
        className={`absolute top-1/2 -translate-y-1/2 ${m.side === "left" ? "-right-3" : "-left-3"} h-2 w-2 rounded-full`}
        style={{ background: "var(--gold)", boxShadow: "0 0 16px var(--gold)" }}
      />
      <div className="glass-luxe rounded-2xl p-4 md:p-5 backdrop-blur-xl border border-[color:var(--gold)]/20 hover:border-[color:var(--gold)]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--gold)_60%,transparent)]">
        <div className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.3em]">
          <span className="text-[color:var(--gold)] font-medium">{m.year}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[color:var(--gold)]/50 to-transparent" />
        </div>
        <h3 className="mt-2 font-display text-base md:text-lg leading-tight">{m.title}</h3>
        <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-foreground">{m.body}</p>
        <div className="mt-2.5 text-[0.55rem] uppercase tracking-[0.28em] text-[color:var(--gold)]/80">⌖ {m.region}</div>
      </div>
    </motion.div>
  );
}
