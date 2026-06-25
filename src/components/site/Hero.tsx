import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ArrowRight, Play, Star } from "lucide-react";
import heroVideo from "@/assets/hero-meditation.mp4.asset.json";
import heroPoster from "@/assets/img_20260620_125938.jpg.asset.json";
import logo from "@/assets/yog_jivan_logo_gold.png.asset.json";
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
      gsap.fromTo(
        ".hero-reveal",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, stagger: 0.12, ease: "power3.out", delay: 0.18 },
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "var(--hdr-h,64px)" }}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_28%,transparent),color-mix(in_oklab,var(--onyx)_72%,transparent)_54%,color-mix(in_oklab,var(--onyx)_90%,transparent))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_30%),radial-gradient(circle_at_80%_18%,color-mix(in_oklab,var(--gold-soft)_14%,transparent),transparent_32%),radial-gradient(circle_at_50%_75%,color-mix(in_oklab,var(--gold)_9%,transparent),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-20" />
      <div className="pointer-events-none absolute left-[-10%] top-[18%] h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 20%, transparent), transparent 70%)", animation: "breathe 14s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute right-[-6%] top-[10%] h-[34rem] w-[34rem] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold-soft) 14%, transparent), transparent 68%)", animation: "breathe 18s ease-in-out infinite reverse" }} />
      <div className="pointer-events-none absolute inset-0 opacity-65"><AmbientCanvas /></div>

      <div className="container-luxe relative z-10 flex min-h-[calc(100svh-var(--hdr-h,64px))] items-center py-10 sm:py-14">
        <div ref={contentRef} className="grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <div className="min-w-0 max-w-4xl">
            <div className="hero-reveal eyebrow">
              <span className="h-px w-10 bg-primary" />
              {t.hero.eyebrow}
            </div>
            <h1 className="mt-5 max-w-[13ch] fluid-display">
              <span className="hero-reveal block">{t.hero.title[0]}</span>
              <span className="hero-reveal block italic text-gold-gradient">{t.hero.title[1]}</span>
              <span className="hero-reveal block">{t.hero.title[2]}</span>
            </h1>
            <p className="hero-reveal mt-6 max-w-2xl text-[clamp(1rem,1.6vw,1.18rem)] leading-relaxed text-muted-foreground">
              {t.hero.sub}
            </p>

            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-gold">
                {t.hero.primary} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/programs" className="btn-ghost-gold">
                <Play className="h-3.5 w-3.5" /> {t.hero.secondary}
              </Link>
            </div>

            <div className="hero-reveal mt-8 flex flex-wrap gap-3">
              {t.hero.trust.map((item) => (
                <div key={item} className="glass-soft rounded-full px-4 py-2 text-[0.66rem] uppercase tracking-[0.22em] text-foreground/88">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-reveal min-w-0 lg:justify-self-end">
            <div className="glass-luxe relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_45%)]" />
              <div className="relative flex items-center gap-4">
                <img src={logo.url} alt="Yog Jivan mark" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="text-[0.64rem] uppercase tracking-[0.26em] text-primary">Circle of Unity</p>
                  <p className="mt-1 font-display text-2xl">Yog Jivan</p>
                </div>
              </div>
              <div className="relative mt-5 overflow-hidden rounded-[1.5rem] border border-border/70">
                <img src={heroPoster.url} alt="Master Anil meditating at sunrise" className="aspect-[4/5] w-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--onyx)_72%,transparent))]" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.26em] text-primary">Founder presence</p>
                    <p className="mt-1 text-sm text-foreground/88">Meditation, breathwork, therapeutic precision, luxury calm.</p>
                  </div>
                  <div className="glass-soft rounded-full px-3 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-primary">Live video</div>
                </div>
              </div>
              <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { value: "4.9", label: "Google" },
                  { value: "20+", label: "Countries" },
                  { value: "1000+", label: "Students" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border/70 bg-card/40 p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-primary"><Star className="h-3.5 w-3.5 fill-current" /> <span className="font-display text-2xl">{item.value}</span></div>
                    <div className="mt-1 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
