// Branded short links for social bios / video descriptions: yogjivan.com/go/<slug>
// -> real page with UTM tags. Edit destinations here only.
export const SHORT_LINKS: Record<string, { path: string; source: string; medium: string }> = {
  yt: { path: "/private-online-yoga", source: "youtube", medium: "social" },
  insta: { path: "/", source: "instagram", medium: "social" },
  fb: { path: "/", source: "facebook", medium: "social" },
  tiktok: { path: "/", source: "tiktok", medium: "social" },
  private: { path: "/private-online-yoga", source: "share", medium: "social" },
  zalo: { path: "/vi/yoga-1-kem-1-online", source: "zalo", medium: "social" },
  qr: { path: "/vi/yoga-hai-duong", source: "qr", medium: "offline" },
};

export function shortLinkTarget(slug: string): string {
  const l = SHORT_LINKS[slug.toLowerCase()];
  if (!l) return "/";
  return `${l.path}?utm_source=${l.source}&utm_medium=${l.medium}&utm_campaign=shortlink`;
}
