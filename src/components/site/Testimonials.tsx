import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Quote, Star, BadgeCheck, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Linh Pham",
    initial: "L",
    country: "Vietnam",
    flag: "🇻🇳",
    category: "Studio Student",
    quote: "I came for flexibility, but what changed my life was the emotional calm. Yog Jivan feels premium, peaceful, and deeply authentic.",
  },
  {
    name: "Sophie Laurent",
    initial: "S",
    country: "France",
    flag: "🇫🇷",
    category: "Online Client",
    quote: "Even from Europe, the online experience feels intimate and refined. The guidance is personal, elegant, and deeply grounding.",
  },
  {
    name: "Arjun Mehta",
    initial: "A",
    country: "India",
    flag: "🇮🇳",
    category: "Therapeutic Program",
    quote: "This is the rare place where Indian yoga lineage meets world-class presentation and true therapeutic intelligence.",
  },
  {
    name: "Emily Tran",
    initial: "E",
    country: "Canada",
    flag: "🇨🇦",
    category: "Therapeutic Program",
    quote: "My chronic back pain eased within weeks. The therapeutic precision and warmth here are unlike any studio I've tried.",
  },
];

const TRUST = [
  { value: "4.9★", label: "Google Rating" },
  { value: "1000+", label: "Lives Transformed" },
  { value: "12+", label: "Years Experience" },
  { value: "2", label: "Premium Studios" },
  { value: "Global", label: "Online Community" },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((c) => (c + 1) % testimonials.length), 8000);
    return () => clearInterval(id);
  }, [paused]);

  const item = testimonials[index];

  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />Testimonials<span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-4 font-display leading-[1.1]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
            Voices from those who <span className="italic text-gold-gradient">transformed.</span>
          </h2>
        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
          {TRUST.map((t) => (
            <div key={t.label} className="glass-soft rounded-[0.9rem] px-3 py-2.5 text-center">
              <div className="font-display text-base leading-none text-gold-gradient sm:text-lg">{t.value}</div>
              <div className="mt-1 text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">{t.label}</div>
            </div>
          ))}
        </div>

        <div
          ref={ref}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mx-auto mt-8 max-w-4xl"
        >
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="glass-luxe relative rounded-[1.75rem] p-6 sm:p-9"
          >
            <Quote className="absolute right-6 top-6 h-9 w-9 text-primary/30" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.55rem] uppercase tracking-[0.22em] text-primary">
                <BadgeCheck className="h-3 w-3" /> Verified Google Review
              </div>
            </div>
            <p className="mt-5 text-[clamp(1.05rem,1.8vw,1.5rem)] leading-relaxed">"{item.quote}"</p>
            <div className="mt-7 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-primary/30 bg-card/40 font-display text-lg text-gold-gradient">
                {item.initial}
              </div>
              <div className="flex-1">
                <div className="font-display text-lg leading-tight">{item.name}</div>
                <div className="mt-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="mr-1">{item.flag}</span>{item.country} · {item.category}
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "w-10 bg-primary" : "w-4 bg-border"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <a
                href="https://www.youtube.com/@yogjivan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.22em] text-primary hover:text-foreground transition-colors"
              >
                Watch Student Stories <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
