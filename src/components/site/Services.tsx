import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, User, Users2, HeartPulse, Flame, Briefcase, Smile } from "lucide-react";

type Program = {
  num: string;
  title: string;
  italic: string;
  blurb: string;
  bullets: string[];
  cta: string;
  to: string;
  Icon: typeof User;
};

const PROGRAMS: Program[] = [
  {
    num: "01",
    title: "Private",
    italic: "Transformation",
    blurb: "One-to-one personalized sessions for true inner balance.",
    bullets: ["Personal Assessment", "Customized Plan", "Posture Correction", "Lifestyle Guidance"],
    cta: "Explore Program",
    to: "/personal-training",
    Icon: User,
  },
  {
    num: "02",
    title: "Luxury",
    italic: "Studio Classes",
    blurb: "Collective practice in a serene, premium environment.",
    bullets: ["Indoor & Outdoor", "All Levels Welcome", "Expert Guidance", "Curated Schedules"],
    cta: "View Schedule",
    to: "/programs",
    Icon: Users2,
  },
  {
    num: "03",
    title: "Therapeutic",
    italic: "Recovery",
    blurb: "Healing-focused yoga for pain relief and restoration.",
    bullets: ["Back & Neck Relief", "Stress Relief", "Posture Correction", "Mobility & Flexibility"],
    cta: "Discover Healing",
    to: "/programs",
    Icon: HeartPulse,
  },
  {
    num: "04",
    title: "Advanced",
    italic: "Yoga Mastery",
    blurb: "Strength, flexibility and advanced asana techniques.",
    bullets: ["Strength & Balance", "Advanced Asanas", "Acro Yoga", "Personal Growth"],
    cta: "Master Your Practice",
    to: "/programs",
    Icon: Flame,
  },
  {
    num: "05",
    title: "Corporate",
    italic: "Wellness",
    blurb: "On-site sessions that elevate team energy and focus.",
    bullets: ["Employee Wellness", "Stress Reduction", "Team Building", "Productivity"],
    cta: "Request Proposal",
    to: "/corporate",
    Icon: Briefcase,
  },
  {
    num: "06",
    title: "Kids",
    italic: "Yoga",
    blurb: "Playful, safe practice for growing minds and bodies.",
    bullets: ["Focus & Concentration", "Flexibility", "Confidence Building", "Healthy Growth"],
    cta: "Enroll Child",
    to: "/programs",
    Icon: Smile,
  },
];

export function Services() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_45%)]" />
      <div className="container-luxe relative">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 text-center">
          <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
          <p className="eyebrow">Transform your body, heal your mind, elevate your soul</p>
          <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, idx) => (
            <motion.article
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              className="group glass-luxe relative flex flex-col rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[color:var(--gold)]/55 hover:shadow-[0_30px_70px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
              style={{ maxHeight: 320 }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/45 bg-black/35 text-[color:var(--gold)] shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--gold)_60%,transparent)] transition-transform duration-500 group-hover:scale-110">
                  <p.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="text-[0.62rem] tracking-[0.2em] text-[color:var(--gold)]/70">
                  {p.num}
                </span>
              </div>

              <h3 className="mt-3 font-display text-xl leading-tight">
                {p.title} <span className="italic text-gold-gradient">{p.italic}</span>
              </h3>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted-foreground">
                {p.blurb}
              </p>

              <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-1.5 text-[0.72rem] text-foreground/85">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-[color:var(--gold)]" strokeWidth={2.6} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={p.to}
                className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)] transition-all duration-300 group-hover:gap-2.5"
              >
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
