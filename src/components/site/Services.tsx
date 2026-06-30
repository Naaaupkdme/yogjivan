import type { CSSProperties, PointerEvent } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenText,
  Briefcase,
  Check,
  ClipboardList,
  Flame,
  Globe2,
  HeartPulse,
  Mountain,
  Smile,
  Sparkles,
  User,
  Users2,
} from "lucide-react";
// Background imagery temporarily replaced with luxury onyx + gold gradients.
// New optimized imagery will be wired back through `service.image` once uploaded.

// Per-card gradient palettes — each gives a distinct mood while keeping the
// onyx + gold luxury identity coherent across the grid.
const GRADIENTS: Record<string, string> = {
  private:
    "radial-gradient(circle at 28% 22%, rgba(212,175,55,0.22), transparent 48%), linear-gradient(150deg, #0c0a08 0%, #181210 55%, #0a0807 100%)",
  studio:
    "radial-gradient(circle at 50% 18%, rgba(243,228,200,0.22), transparent 52%), linear-gradient(160deg, #0a0a0c 0%, #15110d 60%, #08070a 100%)",
  therapeutic:
    "radial-gradient(circle at 18% 14%, rgba(212,175,55,0.2), transparent 42%), linear-gradient(170deg, #0a0c0d 0%, #14110f 55%, #07090a 100%)",
  mastery:
    "radial-gradient(circle at 60% 38%, rgba(212,175,55,0.2), transparent 44%), linear-gradient(140deg, #0a0807 0%, #18130d 60%, #07060a 100%)",
  corporate:
    "radial-gradient(circle at 80% 20%, rgba(212,175,55,0.18), transparent 46%), linear-gradient(165deg, #0a0a0d 0%, #12110f 55%, #07080a 100%)",
  kids:
    "radial-gradient(circle at 18% 10%, rgba(255,214,135,0.24), transparent 48%), linear-gradient(160deg, #0d0a08 0%, #1a140e 55%, #08070a 100%)",
  online:
    "radial-gradient(circle at 70% 70%, rgba(212,175,55,0.18), transparent 46%), linear-gradient(145deg, #08090c 0%, #12110f 55%, #07080a 100%)",
  retreat:
    "radial-gradient(circle at 78% 8%, rgba(255,210,124,0.24), transparent 44%), linear-gradient(160deg, #0a0907 0%, #17130d 55%, #07060a 100%)",
  philosophy:
    "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.18), transparent 50%), linear-gradient(155deg, #0a0807 0%, #14110d 60%, #07060a 100%)",
  consultation:
    "radial-gradient(circle at 50% 14%, rgba(212,175,55,0.2), transparent 46%), linear-gradient(165deg, #0a0a0c 0%, #15110f 55%, #07080a 100%)",
};

type ServiceVariant =
  | "private"
  | "studio"
  | "therapeutic"
  | "mastery"
  | "corporate"
  | "kids"
  | "online"
  | "retreat"
  | "philosophy"
  | "consultation";

type Service = {
  num: string;
  title: string;
  italic: string;
  blurb: string;
  bullets: string[];
  cta: string;
  to: "/personal-training" | "/programs" | "/corporate";
  Icon: typeof User;
  image: string;
  variant: ServiceVariant;
  opacity: number;
  blur: number;
  brightness: number;
  saturation?: number;
  scale?: number;
  hoverScale?: number;
  parallax?: number;
  position?: string;
  overlay: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Private",
    italic: "Transformation",
    blurb: "One-to-one transformation through individualized therapeutic guidance.",
    bullets: ["Personal Assessment", "Customized Plan", "Posture Correction", "Lifestyle Guidance"],
    cta: "Explore Program",
    to: "/personal-training",
    Icon: User,
    variant: "private",
    opacity: 0.16,
    blur: 8,
    brightness: 0.45,
    saturation: 0.8,
    parallax: 18,
    position: "center center",
    overlay:
      "linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.82))",
  },
  {
    num: "02",
    title: "Luxury",
    italic: "Studio Classes",
    blurb: "Premium guided practice in a refined studio community.",
    bullets: ["Indoor & Outdoor", "All Levels Welcome", "Expert Guidance", "Curated Schedules"],
    cta: "View Schedule",
    to: "/programs",
    Icon: Users2,
    variant: "studio",
    opacity: 0.14,
    blur: 10,
    brightness: 0.42,
    scale: 1.1,
    overlay:
      "radial-gradient(circle at center, rgba(212,175,55,0.14) 0%, rgba(0,0,0,0.16) 32%, rgba(0,0,0,0.78) 100%), linear-gradient(180deg, rgba(0,0,0,0.56), rgba(0,0,0,0.82))",
  },
  {
    num: "03",
    title: "Therapeutic",
    italic: "Recovery",
    blurb: "Restorative healing for recovery, relief and nervous system balance.",
    bullets: ["Back & Neck Relief", "Stress Relief", "Posture Support", "Mobility & Flexibility"],
    cta: "Discover Healing",
    to: "/programs",
    Icon: HeartPulse,
    variant: "therapeutic",
    opacity: 0.15,
    blur: 9,
    brightness: 0.4,
    overlay:
      "radial-gradient(circle at 18% 12%, rgba(212,175,55,0.16), transparent 30%), linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.84))",
  },
  {
    num: "04",
    title: "Advanced",
    italic: "Yoga Mastery",
    blurb: "Elite discipline for strength, refinement and advanced asana control.",
    bullets: ["Strength & Balance", "Advanced Asanas", "Precision Practice", "Personal Growth"],
    cta: "Master Your Practice",
    to: "/programs",
    Icon: Flame,
    variant: "mastery",
    opacity: 0.14,
    blur: 7,
    brightness: 0.38,
    hoverScale: 1.08,
    overlay:
      "radial-gradient(circle at 52% 36%, rgba(212,175,55,0.12), transparent 28%), linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.84))",
  },
  {
    num: "05",
    title: "Corporate",
    italic: "Wellness",
    blurb: "Executive wellness experiences for clarity, resilience and performance.",
    bullets: ["Employee Wellness", "Stress Reduction", "Team Building", "Productivity"],
    cta: "Request Proposal",
    to: "/corporate",
    Icon: Briefcase,
    variant: "corporate",
    opacity: 0.14,
    blur: 8,
    brightness: 0.42,
    overlay:
      "linear-gradient(180deg, rgba(0,0,0,0.52), rgba(0,0,0,0.82))",
  },
  {
    num: "06",
    title: "Kids",
    italic: "Yoga",
    blurb: "Playful practice that nurtures confidence, focus and healthy growth.",
    bullets: ["Focus & Concentration", "Flexibility", "Confidence Building", "Healthy Growth"],
    cta: "Enroll Child",
    to: "/programs",
    Icon: Smile,
    variant: "kids",
    opacity: 0.15,
    blur: 8,
    brightness: 0.5,
    overlay:
      "radial-gradient(circle at 10% 0%, rgba(255,214,135,0.18), transparent 34%), linear-gradient(180deg, rgba(0,0,0,0.48), rgba(0,0,0,0.78))",
  },
  {
    num: "07",
    title: "Online Global",
    italic: "Classes",
    blurb: "Practice live with Yog Jivan from anywhere in the world.",
    bullets: ["Live Interactive Sessions", "Global Community", "Flexible Schedule", "Personalized Guidance"],
    cta: "Join Online",
    to: "/programs",
    Icon: Globe2,
    variant: "online",
    opacity: 0.15,
    blur: 8,
    brightness: 0.4,
    overlay:
      "linear-gradient(180deg, rgba(0,0,0,0.56), rgba(0,0,0,0.84))",
  },
  {
    num: "08",
    title: "Retreat & Nature",
    italic: "Experiences",
    blurb: "Reconnect with yourself in breathtaking natural environments.",
    bullets: ["Nature Meditation", "Weekend Retreats", "Mountain Practice", "Inner Rejuvenation"],
    cta: "Explore Retreats",
    to: "/programs",
    Icon: Mountain,
    variant: "retreat",
    opacity: 0.16,
    blur: 8,
    brightness: 0.48,
    overlay:
      "radial-gradient(circle at 78% 6%, rgba(255,210,124,0.2), transparent 24%), linear-gradient(180deg, rgba(0,0,0,0.44), rgba(0,0,0,0.8))",
  },
  {
    num: "09",
    title: "Traditional Yoga",
    italic: "Philosophy",
    blurb: "Learn authentic yogic wisdom beyond physical practice.",
    bullets: ["Yoga Sutras", "Meditation Science", "Yogic Lifestyle", "Spiritual Understanding"],
    cta: "Learn Philosophy",
    to: "/programs",
    Icon: BookOpenText,
    variant: "philosophy",
    opacity: 0.15,
    blur: 9,
    brightness: 0.4,
    overlay:
      "linear-gradient(180deg, rgba(0,0,0,0.56), rgba(0,0,0,0.84))",
  },
  {
    num: "10",
    title: "Holistic Lifestyle",
    italic: "Consultation",
    blurb: "Personal guidance for sustainable transformation.",
    bullets: ["Health Assessment", "Lifestyle Planning", "Habit Transformation", "Wellness Roadmap"],
    cta: "Book Consultation",
    to: "/personal-training",
    Icon: ClipboardList,
    variant: "consultation",
    opacity: 0.15,
    blur: 8,
    brightness: 0.45,
    overlay:
      "radial-gradient(circle at 50% 14%, rgba(212,175,55,0.12), transparent 28%), linear-gradient(180deg, rgba(0,0,0,0.52), rgba(0,0,0,0.82))",
  },
];

const PARTICLES = [
  { left: "10%", top: "14%", size: 72, delay: "0s", duration: "20s" },
  { left: "78%", top: "18%", size: 62, delay: "4s", duration: "17s" },
  { left: "18%", top: "72%", size: 58, delay: "8s", duration: "22s" },
  { left: "84%", top: "76%", size: 84, delay: "2s", duration: "19s" },
] as const;

function ServiceAmbient({ variant }: { variant: ServiceVariant }) {
  return (
    <>
      <div className="service-card__vignette absolute inset-0" />
      <div className="service-card__cursor absolute inset-0" />
      <div className="service-card__shimmer absolute inset-0" />
      <div className="service-card__particles absolute inset-0">
        {PARTICLES.map((particle, index) => (
          <span
            key={`${variant}-${index}`}
            className="service-card__particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {variant === "studio" ? <div className="service-card__gold-vignette absolute inset-0" /> : null}
      {variant === "therapeutic" ? <div className="service-card__breathing-glow absolute inset-0" /> : null}
      {variant === "mastery" ? <div className="service-card__spotlight absolute inset-0" /> : null}
      {variant === "corporate" ? <div className="service-card__glass-reflection absolute inset-0" /> : null}
      {variant === "kids" ? <div className="service-card__sun-rays absolute inset-0" /> : null}
      {variant === "retreat" ? <div className="service-card__sunrise-glow absolute inset-0" /> : null}
      {variant === "philosophy" ? <div className="service-card__sacred-geometry absolute inset-0" /> : null}
      {variant === "consultation" ? <div className="service-card__warm-glow absolute inset-0" /> : null}

      {variant === "online" ? (
        <div className="service-card__world-lines absolute inset-0">
          <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M12 72 C28 48, 38 40, 52 48 S74 70, 88 44" />
            <path d="M18 30 C30 24, 44 26, 58 40 S78 52, 92 30" />
            <path d="M24 82 C40 66, 54 62, 74 76" />
            <circle cx="12" cy="72" r="1.5" />
            <circle cx="52" cy="48" r="1.5" />
            <circle cx="88" cy="44" r="1.5" />
            <circle cx="18" cy="30" r="1.25" />
            <circle cx="92" cy="30" r="1.25" />
            <circle cx="74" cy="76" r="1.25" />
          </svg>
        </div>
      ) : null}
    </>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const parallaxAmount = service.parallax ?? 12;
  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallaxAmount, -parallaxAmount]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
  };

  const cardStyle = {
    "--service-opacity": service.opacity,
    "--service-blur": `${service.blur}px`,
    "--service-brightness": service.brightness,
    "--service-saturation": service.saturation ?? 1,
    "--service-scale": service.scale ?? 1.04,
    "--service-hover-scale": service.hoverScale ?? 1.06,
    "--service-position": service.position ?? "center center",
    "--service-overlay": service.overlay,
  } as CSSProperties;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1.2,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      className={`service-card service-card--${service.variant} group relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] p-5`}
      style={cardStyle}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[28px]" aria-hidden>
        <motion.div
          className="absolute inset-[-8%]"
          style={shouldReduceMotion ? undefined : { y: parallaxY }}
        >
          <div
            className="service-card__bg absolute inset-0"
            style={{ backgroundImage: `url(${service.image})` }}
          />
        </motion.div>
        <div className="service-card__overlay absolute inset-0" />
        <ServiceAmbient variant={service.variant} />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="service-card__icon grid h-11 w-11 place-items-center rounded-full">
            <service.Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="text-[0.62rem] tracking-[0.2em] text-[color:var(--gold)]/72">{service.num}</span>
        </div>

        <h3 className="mt-3 font-display text-xl leading-tight text-foreground">
          {service.title} <span className="italic text-gold-gradient">{service.italic}</span>
        </h3>
        <p className="mt-1.5 max-w-[32ch] text-[0.78rem] leading-relaxed text-muted-foreground">
          {service.blurb}
        </p>

        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-1.5 text-[0.72rem] text-foreground/88">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-[color:var(--gold)]" strokeWidth={2.6} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <span className="service-card__badge mt-4 inline-flex w-fit items-center rounded-full px-3 py-1.5 text-[0.64rem] font-medium tracking-[0.14em] uppercase">
          Custom Wellness Programs Available
        </span>

        <Link
          to={service.to}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)] transition-all duration-300 group-hover:gap-2.5"
        >
          {service.cta} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}

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
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.num} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
