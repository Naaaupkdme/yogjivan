import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import heroVideo from "@/assets/hero-meditation.mp4.asset.json";
import heroPoster from "@/assets/img_20260620_125938.jpg.asset.json";
import { AmbientCanvas } from "@/components/site/AmbientCanvas";
import { useLang } from "@/lib/language";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-reveal", { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, stagger: 0.12, ease: "power3.out", delay: 0.18 });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden" style={{ minHeight: "100svh", paddingTop: "var(--hdr-h,64px)" }}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video src={heroVideo.url} poster={heroPoster.url} autoPlay muted loop playsInline preload="metadata"
          className="h-full w-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_46%,transparent),color-mix(in_oklab,var(--onyx)_72%,transparent)_50%,color-mix(in_oklab,var(--onyx)_92%,transparent))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_38%),radial-gradient(circle_at_85%_75%,color-mix(in_oklab,var(--gold-soft)_10%,transparent),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-[0.08]" />
      <div className="pointer-events-none absolute left-[-10%] top-[18%] h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)", animation: "breathe 14s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute right-[-6%] bottom-[10%] h-[34rem] w-[34rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold-soft) 16%, transparent), transparent 68%)", animation: "breathe 18s ease-in-out infinite reverse" }} />
      <div className="pointer-events-none absolute inset-0 opacity-60"><AmbientCanvas /></div>

      <div className="container-luxe relative z-10 flex min-h-[calc(100svh-var(--hdr-h,64px))] items-center py-10 sm:py-14">
        <div ref={contentRef} className="mx-auto w-full max-w-4xl text-center">
          <div className="hero-reveal eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />
            {t.hero.eyebrow}
            <span className="h-px w-10 bg-primary" />
          </div>
          <h1 className="mt-6 fluid-display mx-auto max-w-[16ch]">
            <span className="hero-reveal block">{t.hero.title[0]}</span>
            <span className="hero-reveal block italic text-gold-gradient">{t.hero.title[1]}</span>
            <span className="hero-reveal block">{t.hero.title[2]}</span>
          </h1>
          <p className="hero-reveal mt-6 mx-auto max-w-xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-muted-foreground">
            {t.hero.sub}
          </p>

          <div className="hero-reveal mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="btn-gold">
              {t.hero.primary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/programs" className="btn-ghost-gold">
              <Play className="h-3.5 w-3.5" /> {t.hero.secondary}
            </Link>
          </div>

          <div className="hero-reveal mt-10 flex flex-wrap justify-center gap-2.5">
            {t.hero.trust.map((item) => (
              <div key={item} className="glass-soft rounded-full px-4 py-2 text-[0.62rem] uppercase tracking-[0.24em] text-foreground/88">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[0.55rem] uppercase tracking-[0.32em]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-primary/70 to-transparent" />
      </div>
    </section>
  );
}
