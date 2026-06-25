import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-meditation.mp4.asset.json";
import heroPoster from "@/assets/file_00000000c9fc71fb801dd14554d92fa7.png.asset.json";
import { useLang } from "@/lib/language";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const { lang } = useLang();

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "var(--hdr-h, 64px)" }}
    >
      {/* Video background with parallax */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
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

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--onyx)]/80 via-[color:var(--onyx)]/55 to-[color:var(--onyx)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,oklch(0.10_0.005_60/0.7)_80%)]" />

      {/* Cinematic light rays */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[120vh] w-[40vw] -rotate-12 bg-[linear-gradient(180deg,oklch(0.755_0.105_80/0.18),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -top-32 right-10 h-[110vh] w-[30vw] rotate-12 bg-[linear-gradient(180deg,oklch(0.92_0.06_85/0.10),transparent)] blur-3xl" />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,oklch(0.755_0.105_80/0.18),transparent_70%)] blur-3xl" style={{ animation: "breathe 12s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,oklch(0.755_0.105_80/0.12),transparent_70%)] blur-3xl" style={{ animation: "breathe 16s ease-in-out infinite reverse" }} />

      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-[color:var(--gold)]/40"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 47) % 100}%`,
            animation: `float-y ${8 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 flex min-h-[calc(100svh-var(--hdr-h,64px))] items-center" >
        <div className="container-luxe w-full py-12 sm:py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="eyebrow"
          >
            <span className="h-px w-8 bg-[color:var(--gold)]" />
            {lang === "VI" ? "Yoga · Sức khỏe · Chuyển hóa" : "Yoga · Wellness · Transformation"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-5 max-w-[18ch] fluid-display font-display"
          >
            {lang === "VI" ? (
              <>Chuyển hóa cơ thể.<br /><span className="italic text-gold-gradient">Nâng tầm</span> tâm trí.<br />Sống trọn vẹn.</>
            ) : (
              <>Transform your body.<br /><span className="italic text-gold-gradient">Elevate</span> your mind.<br />Experience true wellness.</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 max-w-xl text-[clamp(0.95rem,1.6vw,1.125rem)] leading-relaxed text-muted-foreground"
          >
            {lang === "VI"
              ? "Yoga cao cấp, trị liệu và sức khỏe toàn diện cùng Master Anil Choudhary — 12 năm thực hành chân chính, kết tinh tại Hải Dương, Việt Nam."
              : "Premium yoga, therapeutic healing and holistic wellness with Master Anil Choudhary — twelve years of authentic practice, distilled into a sanctuary in Hai Duong, Vietnam."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/contact" className="btn-gold">{lang === "VI" ? "Học thử miễn phí" : "Book Free Trial"}</Link>
            <Link to="/programs" className="btn-ghost-gold">{lang === "VI" ? "Khám phá khóa học" : "Explore Programs"}</Link>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[0.55rem] uppercase tracking-[0.32em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[color:var(--gold)]" />
        </div>
      </motion.div>
    </section>
  );
}
