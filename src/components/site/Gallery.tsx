import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import imgA from "@/assets/yog_jivan_acro_arch.png.asset.json";
import imgB from "@/assets/yog_jivan_acro_stack.png.asset.json";
import imgC from "@/assets/yog_jivan_acro_twins.png.asset.json";
import imgD from "@/assets/yog_jivan_acro_flying.png.asset.json";
import imgE from "@/assets/img_20260621_105308.jpg.asset.json";
import imgF from "@/assets/img_20260622_114016.jpg.asset.json";

const items = [
  { src: imgA.url, alt: "Acro yoga arch pose at Yog Jivan", tag: "Mastery", span: "md:row-span-2" },
  { src: imgB.url, alt: "Advanced stacked yoga pose at Yog Jivan", tag: "Precision" },
  { src: imgC.url, alt: "Twin mirrored backbend performance at Yog Jivan", tag: "Balance", span: "md:row-span-2" },
  { src: imgD.url, alt: "Flying yoga performance at Yog Jivan", tag: "Strength" },
  { src: imgE.url, alt: "Yog Jivan community event photo", tag: "Community" },
  { src: imgF.url, alt: "Yog Jivan celebration moment", tag: "Festival" },
];

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-luxe">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />Immersive gallery</p>
            <h2 className="mt-5 fluid-title max-w-[12ch]">A visual sanctuary with depth, lift, and human warmth.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Every image is placed to preserve the full body line, posture integrity, and emotional tone of the practice.</p>
        </div>

        <div className="mt-10 grid auto-rows-[16rem] gap-4 md:grid-cols-3 xl:grid-cols-4">
          {items.map((item, idx) => (
            <motion.button
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              onClick={() => setActive(item.src)}
              className={`group glass-soft hover-lift relative overflow-hidden rounded-[1.5rem] text-left ${item.span ?? ""}`}
            >
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--onyx)_75%,transparent))]" />
              <div className="absolute inset-x-4 bottom-4">
                <div className="text-[0.62rem] uppercase tracking-[0.24em] text-primary">{item.tag}</div>
                <div className="mt-1 font-display text-xl leading-tight">{item.alt}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/92 p-4 backdrop-blur-xl" onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/40" aria-label="Close gallery lightbox">
            <X className="h-5 w-5" />
          </button>
          <img src={active} alt="Selected Yog Jivan gallery image" className="max-h-[88vh] max-w-[94vw] rounded-[1.5rem] border border-border shadow-[var(--shadow-luxe)]" />
        </div>
      )}
    </section>
  );
}
