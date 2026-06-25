import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Linh Pham", role: "Vietnam", flag: "🇻🇳", quote: "I came for flexibility, but what changed my life was the emotional calm. Yog Jivan feels premium, peaceful, and deeply authentic." },
  { name: "Arjun Mehta", role: "India in Hai Duong", flag: "🇮🇳", quote: "This is the rare place where Indian yoga lineage meets world-class presentation and true therapeutic intelligence." },
  { name: "Sophie Laurent", role: "France · Online", flag: "🇫🇷", quote: "Even from Europe, the online experience feels intimate and refined. The guidance is personal, elegant, and deeply grounding." },
  { name: "Tran Minh", role: "Corporate client", flag: "🇻🇳", quote: "Our team adopted the sessions because they felt premium, thoughtful, and genuinely effective — not like a corporate checkbox." },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 5500);
    return () => clearInterval(id);
  }, []);

  const item = testimonials[index];

  return (
    <section className="section-tight relative overflow-hidden">
      <div className="container-luxe">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow"><span className="h-px w-10 bg-primary" />Testimonials & reviews</p>
            <h2 className="mt-5 fluid-title max-w-[12ch]">Emotional proof from people who felt the shift.</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Google reviews",
                "Video testimonials",
                "Real transformation stories",
              ].map((pill) => (
                <div key={pill} className="glass-soft rounded-full px-4 py-2 text-[0.64rem] uppercase tracking-[0.22em] text-foreground/90">{pill}</div>
              ))}
            </div>
          </div>

          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="glass-luxe relative rounded-[2rem] p-6 sm:p-8 md:p-10"
          >
            <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/30" />
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-6 text-[clamp(1.2rem,2.2vw,2rem)] leading-relaxed">“{item.quote}”</p>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-13 w-13 place-items-center rounded-full border border-primary/30 bg-card/40 text-lg">{item.flag}</div>
              <div>
                <div className="font-display text-xl">{item.name}</div>
                <div className="text-[0.66rem] uppercase tracking-[0.22em] text-muted-foreground">{item.role}</div>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === index ? "w-10 bg-primary" : "w-4 bg-border"}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
