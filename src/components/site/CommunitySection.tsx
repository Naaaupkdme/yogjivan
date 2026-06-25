import { motion } from "framer-motion";
import groupOutdoor from "@/assets/dji_0014.jpg.asset.json";
import groupFestival from "@/assets/img_5066.jpg.asset.json";
import studioWarrior from "@/assets/4253.jpg.asset.json";
import outdoorWide from "@/assets/fb_img_1685723528749.jpg.asset.json";
import eventA from "@/assets/img_20260621_105308.jpg.asset.json";
import eventB from "@/assets/img_20260622_114016.jpg.asset.json";
import { useLang } from "@/lib/language";

const tiles = [
  { src: groupOutdoor.url, alt: "Sunrise outdoor group practice", tag: "Sunrise", h: "h-[220px] sm:h-[280px] md:h-[420px]" },
  { src: studioWarrior.url, alt: "Warrior pose in the Yog Jivan studio", tag: "Studio", h: "h-[220px] sm:h-[280px] md:h-[520px]" },
  { src: groupFestival.url, alt: "Festival celebration with Master Anil", tag: "Festival", h: "h-[220px] sm:h-[280px] md:h-[360px]" },
  { src: eventA.url, alt: "Community event moment", tag: "Events", h: "h-[220px] sm:h-[280px] md:h-[460px]" },
  { src: outdoorWide.url, alt: "Wide outdoor sunrise session", tag: "Retreats", h: "h-[220px] sm:h-[280px] md:h-[380px]" },
  { src: eventB.url, alt: "Students celebrating together", tag: "Belonging", h: "h-[220px] sm:h-[280px] md:h-[440px]" },
];

export function CommunitySection() {
  const { t } = useLang();
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_8%,transparent),transparent_70%)] blur-3xl" />
      <div className="container-luxe">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow justify-center"><span className="h-px w-10 bg-primary" />{t.community.eyebrow}<span className="h-px w-10 bg-primary" /></p>
          <h2 className="mt-5 fluid-title mx-auto max-w-[14ch]">{t.community.title}</h2>
          <p className="mt-5 mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{t.community.sub}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {tiles.map((tile, idx) => (
            <motion.figure
              key={tile.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (idx % 3) * 0.06 }}
              className="group relative overflow-hidden rounded-[1.25rem] border border-border/60"
            >
              <img src={tile.src} alt={tile.alt} loading="lazy"
                className={`w-full ${tile.h} object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_oklab,var(--onyx)_85%,transparent))]" />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <span className="text-[0.55rem] uppercase tracking-[0.28em] text-primary">{tile.tag}</span>
                <span className="hidden sm:block h-px w-8 bg-primary/40" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
