// Pre-filled WhatsApp chat links.
//
// A blank WhatsApp thread is a conversion killer: most visitors open it, do
// not know what to type, and close it. Every WhatsApp entry point therefore
// carries a short, ready-to-send opening line matched to the page the visitor
// is on, so the only remaining action is "Send".
//
// Vietnamese routes keep Zalo (see local-contact.ts); zalo.me does not support
// a pre-filled message, so this module is WhatsApp-only.

import { useRouterState } from "@tanstack/react-router";
import { CONTACT } from "@/lib/facts/contact";

export const WA_MESSAGES = {
  general: "Hi Yog Jivan team, I have a question about your yoga classes.",
  group:
    "Hi Yog Jivan team, I'd like to join your live online yoga classes and start with the introductory session.",
  private:
    "Hi Yog Jivan team, I'd like to enquire about private 1-on-1 online yoga sessions.",
  studio:
    "Hi Yog Jivan team, I'd like to ask about classes at your studios in the Hai Duong area.",
  beginner:
    "Hi Yog Jivan team, I'm a complete beginner and I'd like to know which class would suit me.",
  corporate:
    "Hi Yog Jivan team, I'd like to enquire about corporate yoga sessions for our team.",
  wellbeing:
    "Hi Yog Jivan team, I'd like guidance on a yoga practice suited to my current situation.",
} as const;

export type WaIntent = keyof typeof WA_MESSAGES;

/**
 * Public WhatsApp CTA link. Goes through the first-party /go/whatsapp route,
 * which records an anonymous click (on a real click, via POST) and redirects
 * to the business number with the opening message pre-typed.
 */
export function waHref(intent: WaIntent = "general"): string {
  return `/go/whatsapp?i=${intent}`;
}

/** Direct wa.me link (no tracking) — only for server-side / non-CTA uses. */
export function waDirectHref(intent: WaIntent = "general"): string {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(WA_MESSAGES[intent])}`;
}

/** Best-guess intent from the current route, so generic CTAs stay contextual. */
export function waIntentForPath(pathname: string): WaIntent {
  const p = (pathname.replace(/\/+$/, "") || "/").toLowerCase();
  if (p.includes("private") || p.includes("personal-training") || p.includes("1-on-1")) return "private";
  if (p.includes("online-yoga") || p.includes("book-online-yoga") || p === "/online") return "group";
  if (p.includes("corporate")) return "corporate";
  if (p.includes("beginner")) return "beginner";
  if (p.includes("hai-duong") || p.includes("gallery") || p.includes("programs")) return "studio";
  if (p.startsWith("/yoga-for-") || p.includes("period-safe")) return "wellbeing";
  return "general";
}

/** Route-aware pre-filled WhatsApp link; pass an intent to override. */
export function useWaHref(intent?: WaIntent): string {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return waHref(intent ?? waIntentForPath(pathname));
}
