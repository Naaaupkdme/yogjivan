import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, ArrowDown } from "lucide-react";
import { PRIVATE_ROUTE, scrollToEnquiry, useEnquiryInView } from "@/components/site/EnquiryScroll";
import { isViPath } from "@/lib/locale-routes";

/** Routes that run their own isolated funnel and must not show a competing CTA. */
const HIDDEN_ON = ["/book-online-yoga", "/contact"];

export function FloatingConsultationCTA() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const clean = pathname.replace(/\/+$/, "") || "/";
  const isPrivate = clean === PRIVATE_ROUTE;
  const enquiryInView = useEnquiryInView();

  if (HIDDEN_ON.includes(clean)) return null;
  // Vietnamese routes lead with the Zalo floating chat plus in-page VI CTAs —
  // an English consultation button pointing at /contact would compete and
  // send a Vietnamese visitor into the English funnel.
  if (isViPath(clean)) return null;

  const cls =
    "fixed right-4 z-40 hidden md:inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_22px_60px_-18px_color-mix(in_oklab,var(--gold)_70%,transparent)] transition-transform hover:scale-[1.04] sm:right-5";
  const style = { bottom: "calc(env(safe-area-inset-bottom,0px) + 20px)" } as const;

  // On the private yoga page the CTA scrolls to the inline enquiry form (no URL
  // change) and steps aside while that form is already on screen.
  if (isPrivate) {
    if (enquiryInView) return null;
    return (
      <button
        type="button"
        onClick={scrollToEnquiry}
        data-floating-cta
        data-cta-location="floating_private_enquiry"
        aria-label="Go to the private 1-on-1 yoga enquiry form"
        className={cls}
        style={style}
      >
        <ArrowDown className="h-3.5 w-3.5" />
        Enquire About Private Yoga
      </button>
    );
  }

  return (
    <Link
      to="/contact"
      hash="consultation"
      data-floating-cta
      data-cta-location="floating_consultation"
      aria-label="Open personal consultation form"
      className={cls}
      style={style}
    >
      <Sparkles className="h-3.5 w-3.5" />
      Personal Consultation
    </Link>
  );
}
