import { SITE_ORIGIN } from "@/lib/locale-routes";

export function shopHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "vi_VN" },
      { property: "og:url", content: `${SITE_ORIGIN}${path}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}${path}` }],
  };
}