// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { TrustSection } from "./TrustSection";
import { getRouter } from "@/router";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
    useRouterState: ({ select }: any = {}) => {
      const state = { location: { pathname: "/" } };
      return select ? select(state) : state;
    },
    useRouter: () => ({
      navigate: vi.fn(),
      state: { location: { pathname: "/" } },
    }),
  };
});

vi.mock("@/lib/language", () => ({
  useLang: () => ({
    lang: "en",
    isVi: false,
    t: {
      trust: {
        eyebrow: "Proven Practice",
        title: "Rooted in tradition. Verified in practice.",
      },
      footer: {},
    },
  }),
  isViPath: () => false,
  saveLangPreference: vi.fn(),
}));

describe("File 44 Fixes & Regressions Verification", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("1. Header & Footer Logo Quality and Non-Clipping", () => {
    it("SiteHeader logo does not clip emblem with rounded-full or apply artificial ring-1", () => {
      const { container } = render(<SiteHeader />);
      const logoImg = container.querySelector('header img[alt="Yog Jivan Sanctuary logo"]');
      expect(logoImg).not.toBeNull();

      const className = logoImg?.getAttribute("class") || "";
      // Ensure rounded-full and ring-1 are absent so 'THE CIRCLE OF UNITY' and leaves are not clipped
      expect(className).not.toContain("rounded-full");
      expect(className).not.toContain("ring-1");
      // Ensure object-contain is used to preserve true aspect ratio
      expect(className).toContain("object-contain");

      // Verify picture source excludes blurry 56w and provides crisp 112w & 224w
      const source = container.querySelector("header picture source");
      const srcSet = source?.getAttribute("srcSet") || "";
      expect(srcSet).not.toContain("56.webp");
      expect(srcSet).toContain("112.webp");
      expect(srcSet).toContain("224.webp");
    });

    it("SiteFooter logo uses object-contain and does not clip with rounded-full", () => {
      const { container } = render(<SiteFooter />);
      const logoImg = container.querySelector('footer img[alt="Yog Jivan Sanctuary logo"]');
      expect(logoImg).not.toBeNull();

      const className = logoImg?.getAttribute("class") || "";
      expect(className).not.toContain("rounded-full");
      expect(className).toContain("object-contain");

      const source = container.querySelector("footer picture source");
      const srcSet = source?.getAttribute("srcSet") || "";
      expect(srcSet).not.toContain("56.webp");
      expect(srcSet).toContain("112.webp");
      expect(srcSet).toContain("224.webp");
    });

    it("SiteFooter community thumbnails include 320w responsive candidate for intermediate viewports", () => {
      const { container } = render(<SiteFooter />);
      const thumbImages = container.querySelectorAll('footer div.grid-cols-4 img');
      expect(thumbImages.length).toBe(4);

      thumbImages.forEach((img) => {
        const srcSet = img.getAttribute("srcSet") || "";
        expect(srcSet).toContain("160.webp");
        expect(srcSet).toContain("320.webp");
      });
    });
  });

  describe("2. Mobile Floating CTA Layout & Non-Obstruction", () => {
    it("FloatingWhatsApp is hidden on mobile (hidden md:grid) to avoid duplicating MobileStickyCTA", () => {
      const { container } = render(<FloatingWhatsApp />);
      const waAnchor = container.querySelector('a[data-floating-cta]');
      expect(waAnchor).not.toBeNull();
      const className = waAnchor?.getAttribute("class") || "";
      expect(className).toContain("hidden md:grid");
    });
  });

  describe("3. Trust Section Facts Stability", () => {
    it("renders metrics labels and container correctly without crashing", () => {
      const { container } = render(<TrustSection />);
      expect(container.querySelector(".trust-section-title")).not.toBeNull();
      const cards = container.querySelectorAll("article.trust-card");
      expect(cards.length).toBe(6);
    });
  });

  describe("4. Scroll Restoration Hydration Protection", () => {
    it("preserves early scroll position during initial hydration by returning false on initial render", () => {
      const router = getRouter();
      const scrollRestorationFn = router.options.scrollRestoration;
      expect(typeof scrollRestorationFn).toBe("function");

      if (typeof scrollRestorationFn === "function") {
        const initialScroll = scrollRestorationFn({ location: { href: "/" } as any });
        expect(initialScroll).toBe(false);

        const subsequentScroll = scrollRestorationFn({ location: { href: "/contact" } as any });
        expect(subsequentScroll).toBe(true);
      }
    });
  });
});
