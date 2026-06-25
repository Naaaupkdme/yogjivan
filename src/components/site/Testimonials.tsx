import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  { name: "Linh Pham", role: "Hanoi, Vietnam", quote: "Six months with Master Anil rebuilt my spine and quieted a decade of anxiety. The studio feels like another world." },
  { name: "Arjun Mehta", role: "Indian expat, Hai Duong", quote: "Authentic Indian yoga, taught with depth I haven't found outside Rishikesh. The therapeutic work is extraordinary." },
  { name: "Sophie Laurent", role: "Online program, Paris", quote: "I joined the online program from Europe. Every session feels personal — like he's in the room with you." },
  { name: "Tran Minh", role: "Corporate client", quote: "Our team's stress markers dropped measurably after three months of weekly sessions. A genuine investment in our people." },
  { name: "Priya Iyer", role: "Personal training", quote: "He doesn't sell poses. He teaches you who you are underneath them. Worth every dong, every breath." },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[idx];

  return (
    <section className="relative section-pad overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[40rem] w-[60rem] max-w-full bg-[radial-gradient(ellipse,oklch(0.755_0.105_80/0.10),transparent_70%)] blur-3xl" />
      <div className="container-luxe relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">In Their Words</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
            Stories of <span className="italic text-gold-gradient">transformation</span>.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-luxe relative rounded-[2rem] p-10 md:p-14"
          >
            <Quote className="absolute -left-3 -top-3 h-12 w-12 rotate-180 text-[color:var(--gold)]/30" />
            <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
              "{t.quote}"
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)]/40 font-display text-[color:var(--gold)]">
                {t.name.slice(0, 1)}
              </span>
              <div>
                <div className="font-display text-lg">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Story ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-[color:var(--gold)]" : "w-4 bg-white/15 hover:bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
