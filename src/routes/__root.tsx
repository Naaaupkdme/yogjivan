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
import { CookieConsent, getConsent, CONSENT_EVENT } from "@/components/site/CookieConsent";
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
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/051ca238-9da9-46e7-aca7-fac4010c0aa0/id-preview-8ef1d5a4--fb15e133-c4b9-4ec2-944e-9a89ea90823d.lovable.app-1782674709515.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/051ca238-9da9-46e7-aca7-fac4010c0aa0/id-preview-8ef1d5a4--fb15e133-c4b9-4ec2-944e-9a89ea90823d.lovable.app-1782674709515.png" },
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
          url: "https://www.yogjivan.com",
          logo: "https://www.yogjivan.com/favicon.ico",
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
              "@id": "https://www.yogjivan.com/#studio-sanctuary",
              name: "Yog Jivan Sanctuary",
              image: "https://www.yogjivan.com/og-studio-1.jpg",
              url: "https://www.yogjivan.com",
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
              "@id": "https://www.yogjivan.com/#studio-wellness",
              name: "Yog Jivan Wellness & Healing Center",
              image: "https://www.yogjivan.com/og-studio-2.jpg",
              url: "https://www.yogjivan.com",
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
          "@id": "https://www.yogjivan.com/#master-anil-choudhary",
          name: "Master Anil Choudhary",
          jobTitle: "Certified Indian Yoga Master & Founder",
          worksFor: { "@type": "Organization", name: "Yog Jivan", url: "https://www.yogjivan.com" },
          description: "Certified Indian Yoga Master with 12+ years of teaching in classical Hatha, Ashtanga and Yoga Therapy. Founder of Yog Jivan Sanctuary in Hai Duong, Vietnam.",
          image: "https://www.yogjivan.com/og-master-anil.jpg",
          url: "https://www.yogjivan.com/about",
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
      // NOTE: Google Analytics (gtag) and Meta Pixel are loaded conditionally
      // in RootComponent AFTER the user grants cookie consent — do not add
      // those scripts here or they will load on every visit before consent.
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

  // Conditionally load Google Analytics + Meta Pixel only AFTER cookie consent.
  useEffect(() => {
    let loaded = false;
    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;
      // Google Analytics (GA4)
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-LFV05NVEJZ";
      document.head.appendChild(gtagScript);
      const gtagInit = document.createElement("script");
      gtagInit.text =
        "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','G-LFV05NVEJZ',{send_page_view:true});";
      document.head.appendChild(gtagInit);
      // Meta Pixel
      const fbInit = document.createElement("script");
      fbInit.text =
        "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1752860699056785');fbq('track','PageView');";
      document.head.appendChild(fbInit);
    };
    if (getConsent() === "accepted") loadAnalytics();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") loadAnalytics();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    const unsub = router.subscribe("onResolved", () => {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };
      if (typeof w.gtag === "function") {
        w.gtag("event", "page_view", {
          page_path: window.location.pathname + window.location.search,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
      if (typeof w.fbq === "function") {
        w.fbq("track", "PageView");
        // Fire Meta standard ViewContent on key service pages (deduped per navigation).
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
          w.fbq("track", "ViewContent", {
            content_name: match.content_name,
            content_category: match.content_category,
            content_type: "product",
            page_location: window.location.href,
          });
        }
      }
    });
    return () => unsub();
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

  // Meta Pixel conversion tracking: Contact (WhatsApp) & Lead (Book Free Trial CTAs)
  useEffect(() => {
    const WHATSAPP_RE = /wa\.me|api\.whatsapp\.com|whatsapp\.com\/send/i;
    const LEAD_TEXT_RE = /(book\s+(a\s+)?free\s+trial|free\s+trial|book\s+trial|personal\s+consultation|personalize\s+my\s+recommendation)/i;
    let lastKey = "";
    let lastAt = 0;
    const fire = (event: "Contact" | "Lead", key: string) => {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq !== "function") return;
      const now = Date.now();
      if (key === lastKey && now - lastAt < 800) return; // dedupe rapid double-fires
      lastKey = key; lastAt = now;
      w.fbq("track", event);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const el = (target.closest("a,button") as HTMLElement | null);
      if (!el) return;
      const href = (el as HTMLAnchorElement).href || el.getAttribute("href") || "";
      const label = `${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`.trim();
      if (WHATSAPP_RE.test(href) || /whatsapp/i.test(el.getAttribute("aria-label") || "")) {
        fire("Contact", `contact:${href || label}`);
        return;
      }
      if (LEAD_TEXT_RE.test(label) || /#consultation$/.test(href)) {
        fire("Lead", `lead:${label || href}`);
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
