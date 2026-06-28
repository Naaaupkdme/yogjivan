import { Sparkles, MessageCircle } from "lucide-react";

const WHATSAPP = "https://wa.me/84782046066?text=Hello%20Yog%20Jivan%2C%20I%27d%20like%20to%20book%20a%20free%20trial.";

export function MobileStickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom,0px)" }}
      aria-label="Quick booking"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2 rounded-2xl border border-[color:var(--gold)]/30 bg-black/55 p-2 backdrop-blur-xl shadow-[0_18px_50px_-12px_rgba(0,0,0,0.6),0_0_24px_-8px_color-mix(in_oklab,var(--gold)_55%,transparent)]">
        <a
          href="#consultation"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-3 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black"
        >
          <Sparkles className="h-3.5 w-3.5" /> Book Free Trial
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
