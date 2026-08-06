import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function FloatingConsultationCTA() {
  return (
    <Link
      to="/contact"
      hash="consultation"
      data-floating-cta
      aria-label="Open personal consultation form"
      className="fixed right-4 z-40 hidden md:inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_22px_60px_-18px_color-mix(in_oklab,var(--gold)_70%,transparent)] transition-transform hover:scale-[1.04] sm:right-5"
      style={{ bottom: "calc(env(safe-area-inset-bottom,0px) + 20px)" }}
    >
      <Sparkles className="h-3.5 w-3.5" />
      Personal Consultation
    </Link>
  );
}
