import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MessageCircle, Sparkles } from "lucide-react";

const STORAGE_KEY = "yj_consult_dismissed_at";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const WHATSAPP = "https://wa.me/84782046066?text=Hello%20Master%20Anil%2C%20I%27d%20like%20a%20personal%20consultation.";

export function FloatingConsultationCTA() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && Date.now() - Number(raw) < SEVEN_DAYS) return;
    } catch {}

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
    const onScroll = () => {
      const pct = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (pct > 0.5) show();
    };
    const timer = window.setTimeout(show, 30000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Personal consultation invitation"
          className="fixed z-40 max-w-[22rem]"
          style={{
            bottom: "calc(env(safe-area-inset-bottom,0px) + 96px)",
            right: 16,
          }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-black/65 p-5 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_40px_-10px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
              <Sparkles className="h-3 w-3" /> Personal Guidance
            </div>
            <h3 className="mt-2 font-display text-xl leading-tight">Need personal guidance?</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Speak directly with Master Anil — tailored to your body, goals & lineage.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#consultation" onClick={dismiss} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-3.5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-black">
                <Calendar className="h-3 w-3" /> Book Consultation
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground">
                <MessageCircle className="h-3 w-3 text-[#25D366]" /> WhatsApp
              </a>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
