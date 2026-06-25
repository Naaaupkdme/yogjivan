import { MessageCircle } from "lucide-react";

const WHATSAPP = "https://wa.me/84000000000?text=Hello%20Yog%20Jivan%2C%20I%27d%20like%20to%20book%20a%20free%20trial.";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-40 grid h-14 w-14 place-items-center rounded-full border border-white/15 text-[color:var(--foreground)] shadow-[0_22px_60px_-18px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 sm:bottom-5 sm:right-5"
      style={{
        background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 38%, #20cc68), #16a85a)",
        marginBottom: "env(safe-area-inset-bottom,0px)",
      }}
    >
      <span className="absolute inset-0 rounded-full border border-white/20" />
      <span className="absolute inset-0 rounded-full" style={{ animation: "pulse-ring 2.2s ease-out infinite", background: "rgba(34,197,94,0.22)" }} />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}
