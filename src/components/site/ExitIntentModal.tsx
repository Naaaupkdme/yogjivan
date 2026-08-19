import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

const STORAGE_KEY = "yj_exit_intent_dismissed";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { if (localStorage.getItem(STORAGE_KEY) === "1") return; } catch {}

    let shown = false;
    const trigger = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const isTouch = window.matchMedia("(hover: none)").matches;
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };
    const onScroll = () => {
      const pct = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (pct > 0.75) trigger();
    };

    if (isTouch) window.addEventListener("scroll", onScroll, { passive: true });
    else document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  const close = (persist = true) => {
    if (persist) { try { localStorage.setItem(STORAGE_KEY, "1"); } catch {} }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => close(true)}
          role="dialog"
          aria-modal="true"
          aria-label="Experience your first class free"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[color:var(--gold)]/35 bg-gradient-to-b from-[#1a1612] to-[#0e0c0a] p-7 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8),0_0_60px_-12px_color-mix(in_oklab,var(--gold)_60%,transparent)]"
          >
            <button
              onClick={() => close(true)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[color:var(--gold)]/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 text-[0.6rem] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                <Sparkles className="h-3 w-3" /> Complimentary Invitation
              </div>
              <h2 className="mt-3 text-center font-display text-3xl leading-[1.1] sm:text-4xl">
                Experience your <span className="italic text-gold-gradient">first class free.</span>
              </h2>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                Discover personalized yoga designed for your body, your rhythm, and your goals.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <Link
                  to="/contact"
                  hash="consultation"
                  onClick={() => close(true)}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black"
                >
                  Book Free Trial
                </Link>
                <button
                  onClick={() => close(true)}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-white/10"
                >
                  Continue Exploring
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
