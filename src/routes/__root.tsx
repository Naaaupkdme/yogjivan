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
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthAndBeautyBusiness",
          name: "Yog Jivan",
          description: "Luxury yoga and wellness sanctuary offering private training, therapeutic yoga, online programs and corporate wellness.",
          priceRange: "$$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hai Duong",
            addressCountry: "VN",
          },
          founder: { "@type": "Person", name: "Master Anil Choudhary" },
        }),
      },
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
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
