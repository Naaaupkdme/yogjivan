import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { masterImages, masterAlts } from "@/lib/images";

import acroArch from "@/assets/yog_jivan_acro_arch.png.asset.json";
import acroFlying from "@/assets/yog_jivan_acro_flying.png.asset.json";
import acroStack from "@/assets/yog_jivan_acro_stack.png.asset.json";
import acroTwins from "@/assets/yog_jivan_acro_twins.png.asset.json";
import brandAcro from "@/assets/brand-acro.png.asset.json";
import master1 from "@/assets/img_20260620_125938.jpg.asset.json";
import masterGroup from "@/assets/img_5066.jpg.asset.json";
import masterAlt from "@/assets/img_20260624_wa0037.jpg.asset.json";
import masterB from "@/assets/img_20260618_065832.png.asset.json";
import studio from "@/assets/4253.jpg.asset.json";
import outdoor from "@/assets/dji_0014.jpg.asset.json";
import outdoorWide from "@/assets/fb_img_1685723528749.jpg.asset.json";
import outdoorAlt from "@/assets/fb_img_1685724561436.jpg.asset.json";
import transform1 from "@/assets/img_3777.jpg.asset.json";
import transform2 from "@/assets/img_5569.jpg.asset.json";
import transform3 from "@/assets/img_5570.jpg.asset.json";
import transform4 from "@/assets/img_7569.jpg.asset.json";
import transform5 from "@/assets/img_0264.jpg.asset.json";
import transform6 from "@/assets/img_0275.jpg.asset.json";
import eventA from "@/assets/img_20260621_105308.jpg.asset.json";
import eventB from "@/assets/img_20260622_114016.jpg.asset.json";
import eventC from "@/assets/corporate-event.jpg.asset.json";
import eventD from "@/assets/mg_1753.cr2.jpg.asset.json";
import retreatA from "@/assets/fb_img_1690971312359.jpg.asset.json";
import retreatB from "@/assets/fb_img_1691544924455.jpg.asset.json";
import retreatC from "@/assets/8c8a04a521fc965966fa27bd93b84031.jpg.asset.json";
import paidTeachingAdjustment from "@/assets/paid/teaching-adjustment.webp.asset.json";
import paidLiveGuidance from "@/assets/paid/live-guidance-floor.webp.asset.json";
import paidSmallGroup from "@/assets/paid/small-group-class.webp.asset.json";
import paidMasterOutdoor from "@/assets/paid/master-anil-outdoor.webp.asset.json";


type Category = {
  key: string;
  label: string;
  countLabel: string;
  cover: string;
  cta: string;
  images: { src: string; alt: string }[];
};

const CATEGORIES: Category[] = [
  {
    key: "master",
    label: "Master Anil",
    countLabel: "Photos",
    cta: "Explore Gallery",
    cover: masterImages.founderPortrait,
    images: [
      { src: masterImages.founderPortrait, alt: masterAlts.founderPortrait },
      { src: masterImages.studioBackbend, alt: masterAlts.studioBackbend },
      { src: masterImages.rabbitPose, alt: masterAlts.rabbitPose },
      { src: masterImages.studioSplit, alt: masterAlts.studioSplit },
      { src: masterImages.advancedHeadstand, alt: masterAlts.advancedHeadstand },
      { src: masterImages.armBalance, alt: masterAlts.armBalance },
      { src: masterImages.ploughPose, alt: masterAlts.ploughPose },
      { src: masterImages.outdoorBridge, alt: masterAlts.outdoorBridge },
      { src: master1.url, alt: "Master Anil in meditation" },
      { src: paidMasterOutdoor.url, alt: "Master Anil practising a deep kneeling backbend outdoors" },
      { src: paidTeachingAdjustment.url, alt: "Master Anil guiding a student through a supported backbend at the studio" },
      { src: masterGroup.url, alt: "Master Anil with students" },

      { src: masterAlt.url, alt: "Master Anil teaching" },
      { src: masterB.url, alt: "Master Anil portrait" },
      { src: acroArch.url, alt: "Master Anil acro arch" },
      { src: acroFlying.url, alt: "Flying yoga performance" },
      { src: acroStack.url, alt: "Acro stacked formation" },
      { src: acroTwins.url, alt: "Acro twin pose" },
      { src: brandAcro.url, alt: "Acro signature pose" },
    ],
  },
  {
    key: "community",
    label: "Community",
    countLabel: "Moments",
    cta: "Explore Gallery",
    cover: masterImages.studioAdjustment,
    images: [
      { src: masterImages.studioAdjustment, alt: masterAlts.studioAdjustment },
      { src: masterImages.kidsYoga, alt: masterAlts.kidsYoga },
      { src: studio.url, alt: "Studio practice" },
      { src: masterGroup.url, alt: "Group practice" },
      { src: eventA.url, alt: "Community gathering" },
      { src: outdoor.url, alt: "Outdoor community session" },
      { src: outdoorWide.url, alt: "Wide community gathering" },
      { src: outdoorAlt.url, alt: "Community in nature" },
    ],
  },
  {
    key: "transformations",
    label: "Transformations",
    countLabel: "Stories",
    cta: "Explore Gallery",
    cover: masterImages.advancedHeadstand,
    images: [
      { src: masterImages.advancedHeadstand, alt: masterAlts.advancedHeadstand },
      { src: masterImages.armBalance, alt: masterAlts.armBalance },
      { src: masterImages.studioBackbend, alt: masterAlts.studioBackbend },
      { src: masterImages.outdoorBridge, alt: masterAlts.outdoorBridge },
      { src: transform1.url, alt: "Advanced inversion" },
      { src: transform2.url, alt: "Camel pose transformation" },
      { src: transform3.url, alt: "Backbend expression" },
      { src: transform4.url, alt: "Mature yoga expression" },
      { src: transform5.url, alt: "Strength & balance" },
      { src: transform6.url, alt: "Open chest practice" },
    ],
  },
  {
    key: "events",
    label: "Events",
    countLabel: "Celebrations",
    cta: "Explore Gallery",
    cover: eventB.url,
    images: [
      { src: eventB.url, alt: "Celebration moment" },
      { src: eventA.url, alt: "Event opening" },
      { src: eventC.url, alt: "Corporate wellness event" },
      { src: eventD.url, alt: "Stage moment" },
      { src: outdoor.url, alt: "Sunrise event" },
    ],
  },
  {
    key: "retreats",
    label: "Retreats",
    countLabel: "Experiences",
    cta: "Explore Gallery",
    cover: retreatA.url,
    images: [
      { src: retreatA.url, alt: "Outdoor retreat moment" },
      { src: retreatB.url, alt: "Master Anil outdoor backbend" },
      { src: retreatC.url, alt: "Retreat scenery" },
      { src: outdoorWide.url, alt: "Group retreat in nature" },
      { src: outdoorAlt.url, alt: "Retreat sunrise circle" },
    ],
  },
];

export function Gallery() {
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [idx, setIdx] = useState(0);

  const open = useCallback((c: Category) => { setActiveCat(c); setIdx(0); }, []);
  const close = useCallback(() => setActiveCat(null), []);
  const prev = useCallback(() => {
    if (!activeCat) return;
    setIdx((i) => (i - 1 + activeCat.images.length) % activeCat.images.length);
  }, [activeCat]);
  const next = useCallback(() => {
    if (!activeCat) return;
    setIdx((i) => (i + 1) % activeCat.images.length);
  }, [activeCat]);

  useEffect(() => {
    if (!activeCat) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeCat, close, prev, next]);

  useEffect(() => {
    if (!activeCat) return;
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [activeCat, prev, next]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="mx-auto px-5 sm:px-8" style={{ maxWidth: "1500px" }}>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" />Immersive gallery<span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-4 font-display leading-[1.1]" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.7rem)" }}>
            Moments of Practice.
            <br />
            <span className="italic text-gold-gradient">Stories of Transformation.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Explore the journeys, people and sacred moments that shape Yog Jivan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.key} category={c} index={i} onOpen={() => open(c)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCat && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/96 p-3 backdrop-blur-2xl sm:p-6"
            onClick={close}
          >
            <button
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-foreground hover:border-primary/60"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 text-[0.55rem] uppercase tracking-[0.3em] text-primary">
              {activeCat.label} · {idx + 1} / {activeCat.images.length}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-3 z-20 grid h-12 w-12 place-items-center rounded-full border border-border bg-card/60 text-foreground hover:border-primary/60 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-3 z-20 grid h-12 w-12 place-items-center rounded-full border border-border bg-card/60 text-foreground hover:border-primary/60 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={activeCat.key + idx}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[88vh] max-w-[94vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeCat.images[idx].src}
                alt={activeCat.images[idx].alt}
                className="max-h-[88vh] max-w-[94vw] rounded-[1.5rem] border border-border object-contain shadow-[var(--shadow-luxe)]"
              />
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                {activeCat.images[idx].alt}
              </div>
            </motion.div>

            {/* thumbnail strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-3 mx-auto hidden max-w-[820px] gap-2 overflow-x-auto px-4 sm:flex"
            >
              {activeCat.images.map((im, i) => (
                <button
                  key={im.src + i}
                  onClick={() => setIdx(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all ${i === idx ? "border-[color:var(--gold)] ring-1 ring-[color:var(--gold)]/40" : "border-border/60 opacity-60 hover:opacity-100"}`}
                >
                  <img src={im.src} alt={im.alt || `${activeCat.label} thumbnail`} className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CategoryCard({ category, index, onOpen }: { category: Category; index: number; onOpen: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: "easeOut" }}
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-border/60 text-left transition-all duration-700 hover:border-[color:var(--gold)]/60 hover:shadow-[0_40px_100px_-30px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={category.cover}
          alt={category.label}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,color-mix(in_oklab,var(--onyx)_60%,transparent)_70%,color-mix(in_oklab,var(--onyx)_94%,transparent))]" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_75%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)]" />

        <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
          <div className="text-[0.55rem] uppercase tracking-[0.32em] text-primary">
            {String(index + 1).padStart(2, "0")} · {category.images.length} {category.countLabel}
          </div>
          <h3 className="mt-2 font-display text-2xl leading-tight tracking-wide sm:text-3xl">
            {category.label.toUpperCase()}
          </h3>
          <div className="mt-3 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-foreground/85 transition-all duration-500 group-hover:gap-3 group-hover:text-[color:var(--gold)]">
            {category.cta} <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="absolute left-5 top-5 h-px w-12 bg-[color:var(--gold)]/70 transition-all duration-700 group-hover:w-20" />
      </div>
    </motion.button>
  );
}
