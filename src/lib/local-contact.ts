// Route-aware messaging channel.
//
// Vietnamese routes (/vi, /vi/*) lead with Zalo — WhatsApp must not be
// visibly promoted there. English routes keep the existing WhatsApp behavior.
// Both URLs come from the central CONTACT fact; never hard-code them again.

import { useRouterState } from "@tanstack/react-router";
import { CONTACT } from "@/lib/facts/contact";
import { isViPath } from "@/lib/locale-routes";

export const VI_LABELS = {
  chat: "Nhắn Zalo",
  chatLong: "Tư vấn qua Zalo",
  scheduleOnZalo: "Nhận lịch tuần mới trên Zalo",
  call: "Gọi ngay",
  viewSchedule: "Xem lịch lớp",
  viewPricing: "Xem học phí",
  consult: "Đăng ký tư vấn",
  haiDuongClasses: "Xem lớp Hải Dương",
} as const;

export const VI_NAV_ITEMS = [
  { href: "/vi", label: "Trang chủ" },
  { href: "/vi/yoga-hai-duong", label: "Yoga tại Hải Dương" },
  { href: "/vi/lop-yoga-online", label: "Lớp Yoga Online" },
  { href: "/vi/yoga-1-kem-1-online", label: "Yoga 1 Kèm 1 Online" },
] as const;

export type ChatChannel = {
  isVi: boolean;
  href: string;
  /** Short button label, already localized. */
  label: string;
  /** Accessible description of what the action does. */
  ariaLabel: string;
  channel: "zalo" | "whatsapp";
};

export function chatChannelFor(pathname: string): ChatChannel {
  if (isViPath(pathname)) {
    return {
      isVi: true,
      href: CONTACT.zalo,
      label: VI_LABELS.chat,
      ariaLabel: "Nhắn tin cho đội ngũ Yog Jivan qua Zalo",
      channel: "zalo",
    };
  }
  return {
    isVi: false,
    href: CONTACT.whatsapp,
    label: "WhatsApp",
    ariaLabel: "Chat with the Yog Jivan team on WhatsApp — book a free trial or ask a question",
    channel: "whatsapp",
  };
}

export function useChatChannel(): ChatChannel {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return chatChannelFor(pathname);
}

export function useIsViRoute(): boolean {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return isViPath(pathname);
}
