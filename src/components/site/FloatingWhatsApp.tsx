import { MessageCircle } from "lucide-react";
import { SOCIAL } from "@/lib/social";

export function FloatingWhatsApp() {
  return (
    <a
      href={SOCIAL.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-floating-cta
      data-cta-location="floating_whatsapp"
      aria-label="Chat with the Yog Jivan team on WhatsApp — book a free trial or ask a question"
      className="fixed left-4 z-40 grid h-14 w-14 place-items-center rounded-full border border-white/15 text-[color:var(--foreground)] shadow-[0_22px_60px_-18px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 sm:left-5 bottom-[88px] md:bottom-5"
      style={{
        background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 38%, #20cc68), #16a85a)",
      }}
    >
      <span className="absolute inset-0 rounded-full border border-white/20" />
      <span className="absolute inset-0 rounded-full" style={{ animation: "pulse-ring 2.2s ease-out infinite", background: "rgba(34,197,94,0.22)" }} />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}
