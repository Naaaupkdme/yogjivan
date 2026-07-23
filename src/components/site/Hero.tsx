import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroVideo from "@/assets/hero-meditation.mp4.asset.json";
import { useLang } from "@/lib/language";
import { SOCIAL } from "@/lib/social";

// AmbientCanvas (three.js) is the largest non-critical chunk; only load it on
// desktop, after first paint. Mobile users never download or execute it.
const AmbientCanvas = lazy(() =>
  import("@/components/site/AmbientCanvas").then((m) => ({ default: m.AmbientCanvas })),
);

const WHATSAPP_URL = SOCIAL.whatsapp;

const QUOTES = [
  { q: "Yoga is the journey of the self, through the self, to the self.", a: "Bhagavad Gita" },
  { q: "Yoga does not just change the way we see things. It transforms the person who sees.", a: "B.K.S. Iyengar" },
  { q: "Stillness is where creativity and solutions are found.", a: "Patanjali" },
  { q: "When you inhale, you are taking the strength from God. When you exhale, it represents the service you give.", a: "B.K.S. Iyengar" },
];

function useIsDesktop() {
  const [isDesktop, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => set(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return isDesktop;
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLang();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [qIdx, setQIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-reveal", { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, stagger: 0.12, ease: "power3.out", delay: 0.18 });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  // Defer hero video load by ~2s so it never competes with LCP. Skip entirely
  // for data-saver / reduced-motion users.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error - non-standard but widely available
    const saveData = navigator.connection?.saveData;
    if (reduced || saveData) return;

    const id = window.setTimeout(() => setVideoSrc(heroVideo.url), 100);
    return () => window.clearTimeout(id);
  }, []);

  // Rotate quotes — desktop only (mobile saves the timer + re-renders).
  useEffect(() => {
    if (!isDesktop) return;
    const id = window.setInterval(() => setQIdx((i) => (i + 1) % QUOTES.length), 8000);
    return () => window.clearInterval(id);
  }, [isDesktop]);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setScrolled(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seamless loop once the video element has its src.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;
    v.loop = true;
    v.muted = true;
    v.playsInline = true;
    v.playbackRate = 0.95;
    const onEnded = () => { try { v.currentTime = 0; v.play().catch(() => {}); } catch {} };
    v.addEventListener("ended", onEnded);
    v.play().catch(() => {});
    return () => v.removeEventListener("ended", onEnded);
  }, [videoSrc]);

  return (
    <section ref={rootRef} className="relative overflow-hidden" style={{ minHeight: "100svh", paddingTop: "var(--hdr-h,72px)" }}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {/* Luxury dark canvas — visible for the first 2s while the video defers */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 55%), radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--gold-soft) 10%, transparent), transparent 60%), linear-gradient(180deg, color-mix(in oklab, var(--onyx) 96%, black), color-mix(in oklab, var(--onyx) 100%, black))",
          }}
        />
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
            style={{ opacity: videoReady ? 1 : 0 }}
            onCanPlay={() => setVideoReady(true)}
          />
        )}
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_42%,transparent),color-mix(in_oklab,var(--onyx)_72%,transparent)_55%,color-mix(in_oklab,var(--onyx)_94%,transparent))]" />
      <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,transparent,transparent_40%,color-mix(in_oklab,var(--onyx)_72%,transparent)_75%,color-mix(in_oklab,var(--onyx)_88%,transparent))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,color-mix(in_oklab,var(--gold)_12%,transparent),transparent_38%),radial-gradient(circle_at_85%_75%,color-mix(in_oklab,var(--gold-soft)_10%,transparent),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-[0.06]" />

      {/* Sacred geometry — desktop only (heavy on mobile paint) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:grid place-items-center opacity-[0.07]">
        <svg viewBox="0 0 600 600" className="h-[80vmin] w-[80vmin] animate-[spin_120s_linear_infinite]" aria-hidden>
          <g fill="none" stroke="currentColor" strokeWidth="0.6" className="text-primary">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx="300" cy="300" r={60 + i * 20} />
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={i} x1="300" y1="300" x2={300 + 280 * Math.cos((i * Math.PI) / 12)} y2={300 + 280 * Math.sin((i * Math.PI) / 12)} />
            ))}
          </g>
        </svg>
      </div>

      {/* Ambient three.js layer — desktop only, lazy-loaded after first paint */}
      {isDesktop && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <Suspense fallback={null}><AmbientCanvas /></Suspense>
        </div>
      )}

      <div className="container-luxe relative z-10 grid min-h-[calc(100svh-var(--hdr-h,72px))] lg:grid-cols-[65fr_35fr] items-end lg:items-center py-8 sm:py-12">
        <div className="hidden lg:block" aria-hidden />
        <div ref={contentRef} className="w-full text-center lg:text-left lg:pl-6 xl:pl-10">
          <div className="hero-reveal eyebrow justify-center lg:justify-start">
            <span className="h-px w-10 bg-primary" />
            {t.hero.eyebrow}
          </div>
          <h1 className="mt-5 lg:mx-0" style={{ fontFamily: "var(--font-display, serif)", textShadow: "0 2px 30px color-mix(in oklab, var(--gold) 25%, transparent)", maxWidth: "min(100%, 650px)", marginInline: "auto", lineHeight: 1.05 }}>
            <span className="hero-reveal block" style={{ fontSize: "clamp(1.85rem, 3.4vw, 3.4rem)", lineHeight: 1.05 }}>{t.hero.title[0]}</span>
            <span className="hero-reveal block italic text-gold-gradient mt-1" style={{ fontSize: "clamp(1.85rem, 3.4vw, 3.4rem)", lineHeight: 1.05 }}>{t.hero.title[1]}</span>
            {t.hero.title[2] && <span className="hero-reveal block mt-1" style={{ fontSize: "clamp(1.85rem, 3.4vw, 3.4rem)", lineHeight: 1.05 }}>{t.hero.title[2]}</span>}
          </h1>
          <p className="hero-reveal mt-6 lg:mx-0 leading-relaxed text-muted-foreground" style={{ maxWidth: "min(100%, 560px)", marginInline: "auto", fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)" }}>
            {t.hero.sub}
          </p>

          <div className="hero-reveal mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link to="/contact" hash="consultation" className="btn-gold">
              {t.hero.primary} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-ghost-gold">
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> {t.hero.secondary}
            </a>
          </div>

          <div className="hero-reveal mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
            {t.hero.trust.map((item) => (
              <div key={item} className="glass-soft rounded-full px-3 py-1.5 text-[0.55rem] uppercase tracking-[0.24em] text-foreground/88">
                {item}
              </div>
            ))}
          </div>

          {isDesktop && (
            <div className="hero-reveal mt-7 hidden lg:block min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote key={qIdx}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="text-[0.72rem] italic text-muted-foreground/85 max-w-sm">
                  "{QUOTES[qIdx].q}"
                  <footer className="not-italic mt-1 text-[0.5rem] uppercase tracking-[0.28em] text-primary/80">— {QUOTES[qIdx].a}</footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-[0.5rem] uppercase tracking-[0.32em]">Scroll</span>
            <motion.div
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-10 w-px origin-top bg-gradient-to-b from-primary/90 via-primary/40 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
