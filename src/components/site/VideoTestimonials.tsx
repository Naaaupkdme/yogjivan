import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

type VideoTestimonial = {
  id: string;
  name: string;
  role: string;
  youtubeId: string;
};

/**
 * Real student testimonial videos only.
 * Intentionally empty until Yog Jivan supplies genuine, permissioned footage.
 * Never add placeholder or stock YouTube IDs here — the section self-hides
 * while the list is empty.
 */
const TESTIMONIALS: VideoTestimonial[] = [];

export function VideoTestimonials() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = TESTIMONIALS[idx];

  if (!current) return null;

  const go = (dir: 1 | -1) => {
    setPlaying(false);
    setIdx((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-luxe relative">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" /> Student voices
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-5 fluid-title">In their words.</h2>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-luxe overflow-hidden"
            style={{ borderRadius: 28 }}
          >
            <div className="relative aspect-video w-full bg-black">
              {playing ? (
                <iframe
                  key={current.youtubeId}
                  src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                  title={`${current.name} testimonial`}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 grid place-items-center bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${current.youtubeId}/maxresdefault.jpg)`,
                  }}
                  aria-label={`Play testimonial from ${current.name}`}
                >
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/25" />
                  <div className="relative grid h-20 w-20 place-items-center rounded-full border border-[color:var(--gold)]/60 bg-black/60 backdrop-blur transition-transform group-hover:scale-105">
                    <Play className="h-8 w-8 fill-[color:var(--gold)] text-[color:var(--gold)]" />
                  </div>
                </button>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
              <div>
                <p className="font-display text-xl">{current.name}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{current.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-foreground transition-colors hover:border-[color:var(--gold)]/60"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-foreground transition-colors hover:border-[color:var(--gold)]/60"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="mt-5 flex justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setPlaying(false); setIdx(i); }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-[color:var(--gold)]" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
