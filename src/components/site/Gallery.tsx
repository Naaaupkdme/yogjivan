import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import acroArch from "@/assets/yog_jivan_acro_arch.png.asset.json";
import acroStack from "@/assets/yog_jivan_acro_stack.png.asset.json";
import acroTwins from "@/assets/yog_jivan_acro_twins.png.asset.json";
import acroFlying from "@/assets/yog_jivan_acro_flying.png.asset.json";
import master1 from "@/assets/img_20260620_125938.jpg.asset.json";
import masterGroup from "@/assets/img_5066.jpg.asset.json";
import studio from "@/assets/4253.jpg.asset.json";
import outdoor from "@/assets/dji_0014.jpg.asset.json";
import outdoorWide from "@/assets/fb_img_1685723528749.jpg.asset.json";
import transform1 from "@/assets/img_3777.jpg.asset.json";
import transform2 from "@/assets/img_5569.jpg.asset.json";
import transform3 from "@/assets/img_5570.jpg.asset.json";
import transform4 from "@/assets/img_7569.jpg.asset.json";
import eventA from "@/assets/img_20260621_105308.jpg.asset.json";
import eventB from "@/assets/img_20260622_114016.jpg.asset.json";
import retreatA from "@/assets/fb_img_1690971312359.jpg.asset.json";
import retreatB from "@/assets/fb_img_1691544924455.jpg.asset.json";

type Item = { src: string; alt: string; cat: string };

const ALL: Item[] = [
  { src: master1.url, alt: "Master Anil in meditation", cat: "Master Anil" },
  { src: masterGroup.url, alt: "Master Anil with students", cat: "Master Anil" },
  { src: acroArch.url, alt: "Acro yoga arch pose", cat: "Master Anil" },
  { src: acroStack.url, alt: "Stacked yoga pose", cat: "Master Anil" },
  { src: acroTwins.url, alt: "Twin backbend performance", cat: "Master Anil" },
  { src: acroFlying.url, alt: "Flying yoga performance", cat: "Master Anil" },
  { src: studio.url, alt: "Warrior pose in studio", cat: "Community" },
  { src: eventA.url, alt: "Community event", cat: "Community" },
  { src: eventB.url, alt: "Celebration moment", cat: "Community" },
  { src: transform1.url, alt: "Advanced inversion practice", cat: "Transformations" },
  { src: transform2.url, alt: "Camel pose by the window", cat: "Transformations" },
  { src: transform3.url, alt: "Refined backbend posture", cat: "Transformations" },
  { src: transform4.url, alt: "Mature yoga expression", cat: "Transformations" },
  { src: retreatA.url, alt: "Outdoor retreat moment", cat: "Retreats" },
  { src: retreatB.url, alt: "Master Anil outdoor backbend", cat: "Retreats" },
  { src: outdoor.url, alt: "Sunrise group outdoor session", cat: "Events" },
  { src: outdoorWide.url, alt: "Wide outdoor sunrise practice", cat: "Events" },
];

const CATS = ["All", "Master Anil", "Community", "Transformations", "Events", "Retreats"] as const;

export function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(() => cat === "All" ? ALL : ALL.filter((i) => i.cat === cat), [cat]);
  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setActive((i) => (i === null ? null : (i + 1) % items.length)), [items.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  // swipe
  useEffect(() => {
    if (active === null) return;
    let sx = 0;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [active, prev, next]);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />Immersive gallery<span className="h-px w-10 bg-primary" /></p>
          <h2 className="mt-5 fluid-title mx-auto max-w-[14ch]">A visual sanctuary of practice and presence.</h2>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-[0.6rem] uppercase tracking-[0.22em] transition-all ${cat === c ? "border-primary/60 bg-primary/15 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.button
              key={item.src + idx}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: (idx % 8) * 0.04 }}
              onClick={() => setActive(idx)}
              className="group relative overflow-hidden rounded-[1.25rem] border border-border/60 text-left"
            >
              <img src={item.src} alt={item.alt} loading="lazy"
                className="h-[220px] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07] sm:h-[260px] md:h-[300px]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,color-mix(in_oklab,var(--onyx)_82%,transparent))]" />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <span className="text-[0.55rem] uppercase tracking-[0.26em] text-primary">{item.cat}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl" onClick={close}>
          <button onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/40 text-foreground">
            <X className="h-5 w-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" className="absolute left-3 sm:left-6 grid h-12 w-12 place-items-center rounded-full border border-border bg-card/40 text-foreground">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" className="absolute right-3 sm:right-6 grid h-12 w-12 place-items-center rounded-full border border-border bg-card/40 text-foreground">
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="relative max-h-[88vh] max-w-[94vw]" onClick={(e) => e.stopPropagation()}>
            <img src={items[active].src} alt={items[active].alt}
              className="max-h-[88vh] max-w-[94vw] rounded-[1.5rem] border border-border shadow-[var(--shadow-luxe)] object-contain" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
              {active + 1} / {items.length} · {items[active].cat}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
