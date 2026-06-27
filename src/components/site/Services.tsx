import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Globe2, HeartHandshake, Leaf, ShieldCheck, Sparkles, Users2 } from "lucide-react";
import imgPrivate from "@/assets/img_5569.jpg.asset.json";
import imgStudio from "@/assets/fb_img_1685724561436.jpg.asset.json";
import imgTherapeutic from "@/assets/img_20260624_wa0037.jpg.asset.json";
import imgAdvanced from "@/assets/yog_jivan_acro_arch.png.asset.json";

type Program = {
  num: string;
  title: string;
  italic: string;
  blurb: string;
  bullets: string[];
  cta: string;
  to: string;
  image: { url: string };
};

const PROGRAMS: Program[] = [
  {
    num: "01",
    title: "Private",
    italic: "Transformation",
    blurb: "One-to-one personalized sessions to unlock your true potential and inner balance.",
    bullets: ["Personal Assessment", "Customized Yoga Plan", "Posture Correction", "Lifestyle Guidance", "Mind-Body Transformation"],
    cta: "Explore Program",
    to: "/personal-training",
    image: imgPrivate,
  },
  {
    num: "02",
    title: "Luxury",
    italic: "Studio Classes",
    blurb: "Experience the energy of collective practice in our serene, premium studio environment.",
    bullets: ["Up to 50 Members (Indoor)", "Up to 200+ Members (Outdoor)", "All Levels Welcome", "Expert Guidance"],
    cta: "View Class Schedule",
    to: "/programs",
    image: imgStudio,
  },
  {
    num: "03",
    title: "Therapeutic",
    italic: "Recovery",
    blurb: "Healing-focused yoga for pain relief, posture correction and natural wellness restoration.",
    bullets: ["Back & Neck Pain Relief", "Stress & Anxiety Relief", "Posture Correction", "Mobility & Flexibility"],
    cta: "Heal With Us",
    to: "/programs",
    image: imgTherapeutic,
  },
  {
    num: "04",
    title: "Advanced Yoga",
    italic: "Mastery",
    blurb: "Take your practice to the next level with strength, flexibility and advanced techniques.",
    bullets: ["Strength & Balance", "Advanced Asanas", "Acro Yoga", "Personal Growth"],
    cta: "Master Your Practice",
    to: "/programs",
    image: imgAdvanced,
  },
];

const PILLARS = [
  { Icon: Leaf, title: "Expert Guidance", body: "Learn from Master Anil Choudhary" },
  { Icon: ShieldCheck, title: "Safe & Authentic", body: "Traditional techniques with modern approach" },
  { Icon: HeartHandshake, title: "Holistic Healing", body: "Body, mind, breath & soul alignment" },
  { Icon: Globe2, title: "Online & Offline", body: "Practice from anywhere in the world" },
];

export function Services() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_45%)]" />
      <div className="container-luxe relative">
        {/* Editorial eyebrow line */}
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 text-center">
          <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
          <p className="eyebrow">Transform your body, heal your mind, elevate your soul</p>
          <Sparkles className="h-3.5 w-3.5 text-[color:var(--gold)]" />
        </div>

        {/* 2x2 editorial grid */}
        <div className="mt-10 grid gap-5 md:gap-6 sm:grid-cols-2">
          {PROGRAMS.map((p, idx) => (
            <motion.article
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-[1.4rem] border border-[color:var(--gold)]/20 bg-[linear-gradient(180deg,oklch(0.16_0.008_60/0.85),oklch(0.10_0.005_60/0.95))] shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--gold)_40%,transparent)] transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]/50 hover:shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
              style={{ maxHeight: 580 }}
            >
              {/* IMAGE 60% */}
              <div className="relative h-[52%] min-h-[240px] overflow-hidden">
                <img
                  src={p.image.url}
                  alt={`${p.title} ${p.italic}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,color-mix(in_oklab,var(--onyx)_92%,transparent))]" />
                {/* Number badge */}
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/60 bg-black/60 backdrop-blur text-[0.72rem] font-medium tracking-[0.1em] text-[color:var(--gold)]">
                  {p.num}
                </div>
              </div>

              {/* CONTENT 40% */}
              <div className="relative flex flex-1 flex-col p-5 md:p-6">
                <h3 className="font-display text-2xl md:text-[1.7rem] leading-[1.05]">
                  {p.title} <span className="block italic text-gold-gradient">{p.italic}</span>
                </h3>
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-muted-foreground">{p.blurb}</p>

                <ul className="mt-3 grid gap-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[0.78rem] text-foreground/85">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" strokeWidth={2.4} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={p.to}
                  className="btn-gold mt-5 w-full justify-between"
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pillar ribbon */}
        <div className="mt-8 rounded-2xl border border-[color:var(--gold)]/15 bg-[color:var(--onyx)]/40 p-4 md:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-base leading-tight text-foreground">{title}</div>
                  <p className="mt-1 text-[0.76rem] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
