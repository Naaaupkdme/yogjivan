import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { HelpSheet } from "./HelpSheet";
import { useChatChannel } from "@/lib/local-contact";
import { isViPath } from "@/lib/locale-routes";
import { MessageCircle, HelpCircle } from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";

/**
 * Unified Help and Chat launcher in the fixed contact region on desktop.
 * Keeps direct WhatsApp/Zalo chat available in 1 click while also offering
 * 1-click access to the Help & FAQs panel.
 * Coordinated with MobileStickyCTA on mobile to avoid overlapping bubbles.
 */
export function HelpLauncher() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const isVi = isViPath(location.pathname);
  const chat = useChatChannel();

  // Hide on standalone landing page /book-online-yoga
  if (location.pathname.replace(/\/+$/, "") === "/book-online-yoga") {
    return null;
  }

  return (
    <>
      {/* Desktop unified floating launcher (bottom-left) */}
      <div
        className="fixed left-4 bottom-5 z-40 hidden md:flex items-center gap-2"
        data-floating-cta
        aria-label="Yog Jivan Help & Direct Chat"
      >
        {/* 1. Direct WhatsApp / Zalo Quick Chat Button */}
        <a
          href={chat.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-location={chat.isVi ? "floating_zalo" : "floating_whatsapp"}
          aria-label={chat.ariaLabel}
          title={chat.isVi ? "Nhắn tin qua Zalo" : "Chat on WhatsApp"}
          className="relative grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
          style={{
            background: chat.isVi
              ? "linear-gradient(135deg, color-mix(in oklab, var(--gold) 30%, #2a7cf7), #0068ff)"
              : "linear-gradient(135deg, color-mix(in oklab, var(--gold) 38%, #20cc68), #16a85a)",
          }}
        >
          {chat.isVi ? (
            <ZaloIcon className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </a>

        {/* 2. Help & Common Questions Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cta-location="floating_help_launcher"
          aria-label={isVi ? "Mở trung tâm trợ giúp và câu hỏi" : "Open Help & FAQs"}
          title={isVi ? "Trợ giúp & Câu hỏi" : "Help & Questions"}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-black/75 px-4 text-xs font-semibold text-foreground backdrop-blur-md shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
        >
          <HelpCircle className="h-4 w-4 text-[color:var(--gold)]" />
          <span>{isVi ? "Trợ giúp" : "Help"}</span>
        </button>
      </div>

      {/* The Accessible Dialog / Sheet */}
      <HelpSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
