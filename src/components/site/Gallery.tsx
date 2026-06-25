import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { X } from "lucide-react";

import g1 from "@/assets/file_00000000c9fc71fb801dd14554d92fa7.png.asset.json";
import g2 from "@/assets/file_00000000704c71fb99f50d9c4f4b74ce.png.asset.json";
import g3 from "@/assets/file_00000000cca471fbb8967be0b0dfeda8.png.asset.json";
import g4 from "@/assets/img_20260624_wa0037.jpg.asset.json";
import g5 from "@/assets/img_0275.jpg.asset.json";
import g6 from "@/assets/8c8a04a521fc965966fa27bd93b84031.jpg.asset.json";
import g7 from "@/assets/img_0264.jpg.asset.json";
import g8 from "@/assets/mg_1753.cr2.jpg.asset.json";
import g9 from "@/assets/fb_img_1685724561436.jpg.asset.json";

type Cat = "All" | "Master Anil" | "Studio" | "Outdoor" | "Students";
const ITEMS: { src: string; cat: Exclude<Cat, "All">; alt: string; span?: string }[] = [
  { src: g1.url, cat: "Studio", alt: "Candlelit studio asana", span: "row-span-2" },
  { src: g2.url, cat: "Studio", alt: "Bow pose with strap" },
  { src: g3.url, cat: "Studio", alt: "Chair-supported backbend" },
  { src: g4.url, cat: "Studio", alt: "Standing backbend on blocks" },
  { src: g5.url, cat: "Master Anil", alt: "Master Anil inversion", span: "row-span-2" },
  { src: g6.url, cat: "Master Anil", alt: "Master Anil scorpion variation" },
  { src: g7.url, cat: "Outdoor", alt: "Outdoor arm balance" },
  { src: g8.url, cat: "Outdoor", alt: "Sunrise class outdoors" },
  { src: g9.url, cat: "Master Anil", alt: "Forward fold seated" },
];
const CATS: Cat[] = ["All", "Master Anil", "Studio", "Outdoor", "Students"];

export function Gallery({ compact = false }: { compact?: boolean }) {
  const [cat, setCat] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = useMemo(() => cat === "All" ? ITEMS : ITEMS.filter(i => i.cat === cat), [cat]);

  return (
    <section className="relative section-pad">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">The Sanctuary</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
              Moments from the <span className="italic text-gold-gradient">practice</span>.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] transition-all ${
                  cat === c
                    ? "border-[color:var(--gold)] bg-[color:var(--gold)]/10 text-[color:var(--gold)]"
                    : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className={`mt-12 grid auto-rows-[14rem] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${compact ? "" : ""}`}>
          {filtered.map((it, i) => (
            <motion.button
              key={it.src + i}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              onClick={() => setLightbox(it.src)}
              className={`group relative overflow-hidden rounded-2xl border border-white/8 ${it.span ?? ""}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--onyx)]/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-x-4 bottom-4 translate-y-2 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[color:var(--gold)]">{it.cat}</p>
                <p className="mt-1 font-display text-base text-foreground">{it.alt}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[color:var(--onyx)]/95 p-6 backdrop-blur-xl"
          onClick={() => setLightbox(null)}
        >
          <button aria-label="Close" className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-white/15 text-foreground">
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox} alt="" className="max-h-[88vh] max-w-[92vw] rounded-2xl border border-white/10 shadow-[var(--shadow-luxe)]" />
        </div>
      )}
    </section>
  );
}
