import { MessageCircle } from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { useChatChannel } from "@/lib/local-contact";

/**
 * Floating chat circle. Route-aware: Zalo on Vietnamese routes, WhatsApp
 * everywhere else. File name kept for a minimal diff.
 */
export function FloatingWhatsApp() {
  const chat = useChatChannel();

  return (
    <a
      href={chat.href}
      target="_blank"
      rel="noopener noreferrer"
      data-floating-cta
      data-cta-location={chat.isVi ? "floating_zalo" : "floating_whatsapp"}
      aria-label={chat.ariaLabel}
      className="fixed left-4 z-40 grid h-14 w-14 place-items-center rounded-full border border-white/15 text-[color:var(--foreground)] shadow-[0_22px_60px_-18px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 sm:left-5 bottom-[88px] md:bottom-5"
      style={{
        background: chat.isVi
          ? "linear-gradient(135deg, color-mix(in oklab, var(--gold) 30%, #2a7cf7), #0068ff)"
          : "linear-gradient(135deg, color-mix(in oklab, var(--gold) 38%, #20cc68), #16a85a)",
      }}
    >
      <span className="absolute inset-0 rounded-full border border-white/20" />
      <span
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulse-ring 2.2s ease-out infinite",
          background: chat.isVi ? "rgba(59,130,246,0.24)" : "rgba(34,197,94,0.22)",
        }}
      />
      {chat.isVi ? <ZaloIcon className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
    </a>
  );
}
