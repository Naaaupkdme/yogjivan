import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";
import { FloatingConsultationCTA } from "@/components/site/FloatingConsultationCTA";
import { ExitIntentModal } from "@/components/site/ExitIntentModal";
import { CookieConsent } from "@/components/site/CookieConsent";
import { initAnalytics, trackPageView, trackCta, metaEvent, CONSENT_EVENT } from "@/lib/analytics";
import { LanguageProvider } from "@/lib/language";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-4 text-5xl">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This path drifted beyond the sanctuary. Return home.</p>
        <div className="mt-8">
          <Link to="/" className="btn-gold">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl">Something paused mid-breath</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try refreshing or return home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold">Try again</button>
          <a href="/" className="btn-ghost-gold">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Yog Jivan — Ultra Luxury Wellness Sanctuary" },
      { name: "description", content: "World-class luxury yoga, therapeutic healing, immersive wellness, and transformational programs with Yog Jivan in Hai Duong, Vietnam." },
      { name: "author", content: "Yog Jivan" },
      { property: "og:site_name", content: "Yog Jivan" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#151210" },
      { property: "og:title", content: "Yog Jivan — Ultra Luxury Wellness Sanctuary" },
      { name: "twitter:title", content: "Yog Jivan — Ultra Luxury Wellness Sanctuary" },
      { property: "og:description", content: "World-class luxury yoga, therapeutic healing, immersive wellness, and transformational programs with Yog Jivan in Hai Duong, Vietnam." },
      { name: "twitter:description", content: "World-class luxury yoga, therapeutic healing, immersive wellness, and transformational programs with Yog Jivan in Hai Duong, Vietnam." },
      { property: "og:image", content: "https://yogjivan.com/og-yog-jivan.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://yogjivan.com/og-yog-jivan.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "preconnect", href: "https://connect.facebook.net" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Yog Jivan",
          url: "https://yogjivan.com",
          logo: "https://yogjivan.com/favicon.ico",
          description: "Luxury yoga and wellness sanctuary in Hai Duong, Vietnam — private, studio, online, therapeutic and corporate programs led by Master Anil Choudhary.",
          founder: { "@type": "Person", name: "Master Anil Choudhary" },
          telephone: "+84782046066",
          email: "hello@yogjivan.com",
          sameAs: [
            "https://www.facebook.com/share/18ixNUN1J1/",
            "https://www.instagram.com/anil_yog_jivan",
            "https://youtube.com/@yogjivanvietnam",
            "https://zalo.me/84782046066",
          ],
          location: [
            {
              "@type": "LocalBusiness",
              "@id": "https://yogjivan.com/#studio-sanctuary",
              name: "Yog Jivan Sanctuary",
              image: "https://yogjivan.com/og-studio-1.jpg",
              url: "https://yogjivan.com",
              telephone: "+84782046066",
              priceRange: "$$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nha Thi Dau 1, Bui Thi Xuan, P. Le Thanh Nghi",
                addressLocality: "Hai Duong City",
                addressRegion: "Hai Duong Province",
                postalCode: "170000",
                addressCountry: "VN",
              },
              geo: { "@type": "GeoCoordinates", latitude: 20.9373, longitude: 106.3316 },
              openingHoursSpecification: [{
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "05:30", closes: "20:00",
              }],
              sameAs: [
                "https://www.facebook.com/share/18ixNUN1J1/",
                "https://www.instagram.com/anil_yog_jivan",
                "https://youtube.com/@yogjivanvietnam",
                "https://zalo.me/84782046066",
                "https://maps.app.goo.gl/RL7HqgnGmT2fT2AF6",
              ],
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "50" },
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://yogjivan.com/#studio-wellness",
              name: "Yog Jivan Wellness & Healing Center",
              image: "https://yogjivan.com/og-studio-2.jpg",
              url: "https://yogjivan.com",
              telephone: "+84782046066",
              priceRange: "$$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "W8R8+42R, 5 Ngo Quyen, Thanh Dong",
                addressLocality: "Hai Duong",
                addressRegion: "Hai Duong Province",
                postalCode: "170000",
                addressCountry: "VN",
              },
              geo: { "@type": "GeoCoordinates", latitude: 20.9410, longitude: 106.3260 },
              openingHoursSpecification: [{
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "05:30", closes: "20:00",
              }],
              sameAs: [
                "https://www.facebook.com/share/18ixNUN1J1/",
                "https://www.instagram.com/anil_yog_jivan",
                "https://youtube.com/@yogjivanvietnam",
                "https://zalo.me/84782046066",
                "https://maps.app.goo.gl/m51ySwjc94vUhn9r6",
              ],
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "50" },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://yogjivan.com/#master-anil-choudhary",
          name: "Master Anil Choudhary",
          jobTitle: "Certified Indian Yoga Master & Founder",
          worksFor: { "@type": "Organization", name: "Yog Jivan", url: "https://yogjivan.com" },
          description: "Certified Indian Yoga Master with 12+ years of teaching in classical Hatha, Ashtanga and Yoga Therapy. Founder of Yog Jivan Sanctuary in Hai Duong, Vietnam.",
          image: "https://yogjivan.com/og-master-anil.jpg",
          url: "https://yogjivan.com/about",
          nationality: "Indian",
          hasCredential: [
            { "@type": "EducationalOccupationalCredential", credentialCategory: "Diploma", name: "Diploma in Yoga (India)" },
            { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "Master's Degree in Yoga (India)" },
            { "@type": "EducationalOccupationalCredential", credentialCategory: "certification", name: "Classical Indian Yoga Lineage — Hatha, Ashtanga & Yoga Therapy" },
          ],
          knowsAbout: [
            "Therapeutic Yoga",
            "Back Pain Recovery",
            "PCOD Management",
            "Anxiety Relief",
            "Pranayama",
            "Meditation",
            "Corporate Wellness Yoga",
          ],
          knowsLanguage: ["English", "Hindi", "Vietnamese"],
          sameAs: [
            "https://www.facebook.com/share/18ixNUN1J1/",
            "https://www.instagram.com/anil_yog_jivan",
            "https://youtube.com/@yogjivanvietnam",
          ],
        }),
      },
      // NOTE: Google tag loads client-side in RootComponent with Advanced
      // Consent Mode v2 (denied defaults); Meta Pixel loads only after
      // marketing consent. Do not add either script tag here.
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  // Google Advanced Consent Mode v2: denied defaults are set before gtag.js
  // loads (cookieless measurement), Meta Pixel stays blocked until marketing
  // consent. See src/lib/analytics.ts.
  useEffect(() => {
    initAnalytics();
    let lastKey = "";
    const sendPageView = () => {
      const key = window.location.pathname + window.location.search;
      if (key === lastKey) return; // ignore hash-only / repeat resolutions
      lastKey = key;
      trackPageView();
      // Meta ViewContent on key service pages (consent-gated inside metaEvent).
      const path = window.location.pathname.replace(/\/+$/, "") || "/";
      const VIEW_CONTENT_MAP: Record<string, { content_name: string; content_category: string }> = {
        "/": { content_name: "Home — Yog Jivan Sanctuary", content_category: "Home" },
        "/online-yoga-classes": { content_name: "Online Yoga Classes", content_category: "Online Classes" },
        "/personal-training": { content_name: "Personal Training", content_category: "Private Sessions" },
        "/yoga-for-back-pain": { content_name: "Back Pain Yoga", content_category: "Therapeutic Yoga" },
        "/yoga-for-stress": { content_name: "Stress Relief Yoga", content_category: "Therapeutic Yoga" },
        "/yoga-for-weight-loss": { content_name: "Weight Loss Yoga", content_category: "Therapeutic Yoga" },
        "/contact": { content_name: "Contact Yog Jivan", content_category: "Contact" },
      };
      const match = VIEW_CONTENT_MAP[path];
      if (match) {
        metaEvent("ViewContent", {
          content_name: match.content_name,
          content_category: match.content_category,
          content_type: "product",
        });
      }
    };
    // Initial load (gtag config runs with send_page_view:false).
    sendPageView();
    const unsub = router.subscribe("onResolved", sendPageView);
    // A consent grant mid-session should still record the current page once.
    const onConsent = () => { lastKey = ""; sendPageView(); };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => { unsub(); window.removeEventListener(CONSENT_EVENT, onConsent); };
  }, [router]);


  // Global hash-scroll: after any navigation or on initial load, if the URL has
  // a #hash, smoothly scroll that element into view once it exists in the DOM.
  // Accounts for the fixed header height and any async section rendering.
  useEffect(() => {
    const HEADER_OFFSET = 96;
    const scrollToHash = (hash: string) => {
      if (!hash) return;
      const id = hash.replace(/^#/, "");
      if (!id) return;
      const start = Date.now();
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
          window.scrollTo({ top: y, behavior: "smooth" });
          return true;
        }
        return false;
      };
      // Retry for up to ~2.5s while lazy sections mount.
      const tick = () => {
        if (tryScroll()) return;
        if (Date.now() - start > 2500) return;
        requestAnimationFrame(() => setTimeout(tick, 80));
      };
      tick();
    };

    // Initial load
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 60);
    }
    // Subsequent client-side navigations
    const unsub = router.subscribe("onResolved", () => {
      if (window.location.hash) {
        setTimeout(() => scrollToHash(window.location.hash), 60);
      }
    });
    // In-page hash changes (same route)
    const onHash = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => { unsub(); window.removeEventListener("hashchange", onHash); };
  }, [router]);

  // Unified CTA tracking (GA4 + Meta Contact). No PII: only page path,
  // CTA location and destination type are sent. Meta "Lead" is NOT fired here —
  // it only fires after a confirmed lead insert (see SmartConsultation).
  useEffect(() => {
    const WHATSAPP_RE = /wa\.me|api\.whatsapp\.com|whatsapp\.com\/send/i;
    const TRIAL_RE = /(book\s+(a\s+)?free\s+trial|free\s+trial|book\s+trial|personal\s+consultation|personalize\s+my\s+recommendation)/i;
    let lastKey = "";
    let lastAt = 0;
    const deduped = (key: string) => {
      const now = Date.now();
      if (key === lastKey && now - lastAt < 800) return true;
      lastKey = key; lastAt = now;
      return false;
    };
    const locationOf = (el: HTMLElement): string => {
      const explicit = el.closest("[data-cta-location]")?.getAttribute("data-cta-location");
      if (explicit) return explicit;
      const section = el.closest("section[id],div[id]");
      const id = section?.getAttribute("id");
      if (id) return id;
      if (el.closest("header")) return "header";
      if (el.closest("footer")) return "footer";
      return "body";
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const el = target.closest("a,button") as HTMLElement | null;
      if (!el) return;
      const href = (el as HTMLAnchorElement).href || el.getAttribute("href") || "";
      const aria = el.getAttribute("aria-label") || "";
      const label = `${aria} ${el.textContent || ""}`.trim();
      const where = locationOf(el);

      if (WHATSAPP_RE.test(href) || /whatsapp/i.test(aria)) {
        if (deduped(`wa:${href}`)) return;
        trackCta("whatsapp_click", where);
        metaEvent("Contact");
        return;
      }
      if (/zalo\.me|zalo/i.test(href)) {
        if (deduped(`zalo:${href}`)) return;
        trackCta("zalo_click", where);
        metaEvent("Contact");
        return;
      }
      if (href.startsWith("tel:")) {
        if (deduped(`tel:${href}`)) return;
        trackCta("phone_click", where);
        metaEvent("Contact");
        return;
      }
      if (href.startsWith("mailto:")) {
        if (deduped(`mail:${href}`)) return;
        trackCta("email_click", where);
        metaEvent("Contact");
        return;
      }
      if (TRIAL_RE.test(label) || /#consultation$/.test(href)) {
        if (deduped(`trial:${label || href}`)) return;
        trackCta("book_trial_click", where, {
          destination_type: /#consultation$/.test(href) ? "form_anchor" : href ? "internal_link" : "in_page",
        });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
          <SiteHeader />
          <main>
            <Outlet />
          </main>
          <SiteFooter />
          <FloatingWhatsApp />
          <FloatingConsultationCTA />
          <ExitIntentModal />
          <MobileStickyCTA />
          <CookieConsent />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
