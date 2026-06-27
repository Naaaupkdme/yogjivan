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
  { year: "2013", title: "Started Yoga", body: "Discipline and self-practice began under Indian masters.", country: "INDIA", Icon: Flower2 },
  { year: "2017", title: "Moved to Vietnam", body: "Indian wisdom meets a new community across the sea.", country: "VIETNAM", Icon: Globe2 },
  { year: "2019", title: "Founded Yog Jivan", body: "A sanctuary for healing and transformation was born.", country: "VIETNAM", Icon: Landmark },
  { year: "2022", title: "Premium Studio Expansion", body: "Luxury spaces crafted for deeper healing experiences.", country: "VIETNAM", Icon: Building2 },
  { year: "2024", title: "Global Online Community", body: "Live sessions reaching seekers in 20+ countries.", country: "GLOBAL", Icon: Laptop },
  { year: "2026", title: "Global Healing Vision", body: "Authentic yoga and therapeutic mastery for the world.", country: "WORLDWIDE", Icon: Earth },
];

// S-curve path coordinates (viewBox 100 x 1200)
const PATH_D = "M50 20 C 85 120, 15 240, 50 360 S 85 600, 50 720 S 15 960, 50 1180";

export function FounderJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_55%)]" />

      {/* Golden particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[color:var(--gold)]/60 blur-[1px]"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `float-y ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
              opacity: 0.35,
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
          <h2 className="mt-5 fluid-title">
            A Path <span className="italic text-gold-gradient">Rooted in Devotion</span>
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
            From a small mat in India to a global sanctuary of healing — a journey of discipline,
            growth and purpose.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* SVG S-curve — desktop only */}
          <svg
            viewBox="0 0 100 1200"
            preserveAspectRatio="none"
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[160px] -translate-x-1/2 md:block"
          >
            <defs>
              <linearGradient id="goldLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.87 0.06 84)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="oklch(0.79 0.09 82)" stopOpacity="1" />
                <stop offset="100%" stopColor="oklch(0.87 0.06 84)" stopOpacity="0.2" />
              </linearGradient>
              <filter id="goldGlow">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Faint base path */}
            <path d={PATH_D} fill="none" stroke="oklch(0.79 0.09 82 / 0.18)" strokeWidth="1.4" />
            {/* Animated draw */}
            <motion.path
              d={PATH_D}
              fill="none"
              stroke="url(#goldLine)"
              strokeWidth="1.6"
              strokeLinecap="round"
              filter="url(#goldGlow)"
              style={{ pathLength }}
            />
          </svg>

          {/* Mobile vertical line */}
          <div
            aria-hidden
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/60 to-transparent md:hidden"
          />

          <ol className="relative space-y-12 md:space-y-20">
            {MILESTONES.map((m, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li key={m.year} className="relative">
                  {/* Node dot */}
                  <div className="absolute left-5 top-6 -translate-x-1/2 md:left-1/2">
                    <span className="relative grid h-4 w-4 place-items-center">
                      <span className="absolute inset-0 animate-[pulse-ring_2.6s_ease-out_infinite] rounded-full bg-[color:var(--gold)]/60" />
                      <span className="relative h-3 w-3 rounded-full bg-[color:var(--gold)] shadow-[0_0_18px_3px_color-mix(in_oklab,var(--gold)_60%,transparent)]" />
                    </span>
                  </div>

                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.05 * idx }}
                    className={`ml-12 md:ml-0 md:w-[44%] ${
                      isLeft ? "md:mr-auto md:pr-10 md:text-right" : "md:ml-auto md:pl-10"
                    }`}
                  >
                    <div className="glass-luxe relative rounded-2xl p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]/50 hover:shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
                      <div
                        className={`flex items-center gap-3 ${
                          isLeft ? "md:flex-row-reverse md:text-right" : ""
                        }`}
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/50 bg-black/40 text-[color:var(--gold)] shadow-[0_0_20px_-4px_color-mix(in_oklab,var(--gold)_60%,transparent)]">
                          <m.Icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                        <div>
                          <div className="font-display text-3xl leading-none text-gold-gradient">
                            {m.year}
                          </div>
                          <div className="mt-1 text-[0.62rem] tracking-[0.25em] text-[color:var(--gold)]/80">
                            {m.country}
                          </div>
                        </div>
                      </div>
                      <h3 className="mt-4 font-display text-xl md:text-2xl leading-tight">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">
                        {m.body}
                      </p>
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
