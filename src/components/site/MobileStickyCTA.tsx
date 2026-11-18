import { Sparkles, MessageCircle, ArrowDown, Clock, Phone, CalendarDays } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/social";
import { CONTACT } from "@/lib/facts/contact";
import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { VI_LABELS } from "@/lib/local-contact";
import { isViPath } from "@/lib/locale-routes";
import { PRIVATE_ROUTE, scrollToEnquiry, useEnquiryInView } from "@/components/site/EnquiryScroll";
import { waHref, waIntentForPath } from "@/lib/wa";

const BTN =
  "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-3 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black";
const BTN_GHOST =
  "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground";

const SHELL =
  "mx-3 mb-3 grid grid-cols-2 gap-2 rounded-2xl border border-[color:var(--gold)]/30 bg-black/55 p-2 backdrop-blur-xl shadow-[0_18px_50px_-12px_rgba(0,0,0,0.6),0_0_24px_-8px_color-mix(in_oklab,var(--gold)_55%,transparent)]";

/** Vietnamese secondary action, contextual to the current VI route. */
function viSecondary(clean: string) {
  if (clean === "/vi/yoga-hai-duong")
    return { href: "#lich-lop", label: VI_LABELS.viewSchedule, Icon: CalendarDays, loc: "mobile_sticky_vi_schedule" };
  if (clean === "/vi/lop-yoga-online")
    return { href: "#hoc-phi", label: VI_LABELS.viewPricing, Icon: Clock, loc: "mobile_sticky_vi_pricing" };
  if (clean === "/vi/yoga-1-kem-1-online")
    return { href: "#tu-van", label: VI_LABELS.consult, Icon: ArrowDown, loc: "mobile_sticky_vi_consult" };
  if (clean === "/vi/yoga-doanh-nghiep")
    return { href: "#corporate-enquiry-form", label: "Đăng ký demo", Icon: ArrowDown, loc: "mobile_sticky_vi_corporate" };
  if (clean === "/vi/yoga-hoc-duong")
    return { href: "#school-yoga-enquiry-form", label: "Đăng ký học thử", Icon: ArrowDown, loc: "mobile_sticky_vi_school" };
  return {
    href: "/vi/yoga-hai-duong",
    label: VI_LABELS.haiDuongClasses,
    Icon: CalendarDays,
    loc: "mobile_sticky_vi_local",
  };
}

const PAGE_PRIMARY_CTA: Record<string, { targetId: string; label: string }> = {
  "/private-online-yoga": { targetId: "private-enquiry", label: "Enquire Now" },
  "/online-couples-yoga": { targetId: "shared-enquiry-form", label: "Enquire for Two" },
  "/online-family-yoga": { targetId: "plan-session", label: "Plan Family Session" },
  "/corporate": { targetId: "corporate-enquiry-form", label: "Request Demo" },
  "/school-yoga": { targetId: "school-yoga-enquiry-form", label: "Request Demo" },
};

export function MobileStickyCTA() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const clean = pathname.replace(/\/+$/, "") || "/";
  const isPrivate = clean === PRIVATE_ROUTE;
  const isVi = isViPath(clean);
  const enquiryInView = useEnquiryInView();

  // On the private yoga page the sticky bar steps aside once the enquiry form
  // is on screen, so it never covers the fields being filled in.
  if (isPrivate && enquiryInView) return null;

  if (isVi) {
    const sec = viSecondary(clean);
    return (
      <div
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom,0px)" }}
        data-floating-cta
        aria-label="Liên hệ nhanh"
      >
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-black/70 to-transparent" />
        <div className={SHELL}>
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="mobile_sticky_zalo"
            aria-label="Nhắn tin cho đội ngũ Yog Jivan qua Zalo"
            className={BTN}
          >
            <ZaloIcon className="h-3.5 w-3.5" /> {VI_LABELS.chat}
          </a>
          <a href={sec.href} data-cta-location={sec.loc} className={BTN_GHOST}>
            <sec.Icon className="h-3.5 w-3.5 text-[color:var(--gold)]" /> {sec.label}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom,0px)" }}
      data-floating-cta
      aria-label="Quick booking"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-black/70 to-transparent" />
      <div className={SHELL}>
        {PAGE_PRIMARY_CTA[clean] ? (
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(PAGE_PRIMARY_CTA[clean].targetId);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                const target = el.querySelector<HTMLElement>("input, select, textarea, button") ?? el;
                window.setTimeout(() => target.focus({ preventScroll: true }), 350);
              }
            }}
            data-cta-location="mobile_page_enquiry"
            aria-label={`Go to ${PAGE_PRIMARY_CTA[clean].label} section`}
            className={BTN}
          >
            <ArrowDown className="h-3.5 w-3.5" /> {PAGE_PRIMARY_CTA[clean].label}
          </button>
        ) : (
          // Route to the consultation form on /contact — a bare "#consultation"
          // hash is a dead link on pages that do not host that section.
          <Link
            to="/contact"
            hash="consultation"
            data-cta-location="mobile_consultation"
            aria-label="Book a free trial yoga session"
            className={BTN}
          >
            <Sparkles className="h-3.5 w-3.5" /> Book Free Trial
          </Link>
        )}
        <a
          href={waHref(waIntentForPath(clean))}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-location="mobile_sticky_whatsapp"
          aria-label="Open WhatsApp chat with Yog Jivan"
          className={BTN_GHOST}
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
