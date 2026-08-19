import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * Shared smooth-scroll helpers for the private-yoga enquiry form.
 *
 * The address bar must stay clean: these helpers never touch
 * location.hash or window.history, they only scroll and move focus.
 */

export const PRIVATE_ROUTE = "/private-online-yoga";
export const ENQUIRY_ID = "private-enquiry";

export function scrollToEnquiry() {
  if (typeof document === "undefined") return;
  const el = document.getElementById(ENQUIRY_ID);
  if (!el) return;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Accessibility: move focus into the section so keyboard users follow the jump.
  const target = el.querySelector<HTMLElement>("input, select, textarea, button") ?? el;
  window.setTimeout(() => target.focus({ preventScroll: true }), reduce ? 0 : 420);
}

/** Button that scrolls to the inline enquiry form without changing the URL. */
export function EnquiryButton({
  children,
  className = "btn-gold",
  ctaLocation,
}: {
  children: ReactNode;
  className?: string;
  ctaLocation?: string;
}) {
  return (
    <button
      type="button"
      onClick={scrollToEnquiry}
      data-cta-location={ctaLocation}
      className={className}
    >
      {children}
    </button>
  );
}

/** True while the inline enquiry form is on screen (used to hide sticky CTAs). */
export function useEnquiryInView() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById(ENQUIRY_ID);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return inView;
}
