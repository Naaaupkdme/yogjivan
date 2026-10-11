// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, act, cleanup } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";
import { Hero } from "./Hero";

MotionGlobalConfig.skipAnimations = true;

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => {
          return ({ children, style, ...props }: any) => {
            const Tag = prop as any;
            return <Tag style={style} {...props}>{children}</Tag>;
          };
        },
      },
    ),
  };
});

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
}));

vi.mock("gsap", () => ({
  default: {
    context: vi.fn((fn) => {
      fn();
      return { revert: vi.fn() };
    }),
    fromTo: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock("@/components/site/AmbientCanvas", () => ({
  AmbientCanvas: () => <div data-testid="ambient-canvas" />,
}));

describe("Hero component — media loading policy, authentic static poster, and lifecycle cleanup", () => {
  let matchMediaListeners: Record<string, ((e: any) => void)[]> = {};

  beforeEach(() => {
    matchMediaListeners = {};
    // Default: mobile (<1024px), no reduced motion
    window.matchMedia = vi.fn().mockImplementation((query: string) => {
      matchMediaListeners[query] = matchMediaListeners[query] || [];
      return {
        matches: query.includes("min-width: 1024px") ? false : false,
        media: query,
        onchange: null,
        addEventListener: (event: string, cb: any) => {
          if (event === "change") matchMediaListeners[query].push(cb);
        },
        removeEventListener: (event: string, cb: any) => {
          if (event === "change") {
            matchMediaListeners[query] = matchMediaListeners[query].filter((l) => l !== cb);
          }
        },
        dispatchEvent: vi.fn(),
      };
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("1. Always renders the authentic static poster with responsive WebP sources and fallback img", () => {
    render(<Hero />);

    const img = document.querySelector("picture img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toBe("/assets/hero/hero-meditation-poster-1280.jpg");
    expect(img?.getAttribute("width")).toBe("1280");
    expect(img?.getAttribute("height")).toBe("720");
    expect(img?.getAttribute("loading")).toBe("eager");

    const sources = document.querySelectorAll("picture source");
    expect(sources.length).toBe(2);
    expect(sources[0].getAttribute("srcSet")).toBe("/assets/hero/hero-meditation-poster-720.webp");
    expect(sources[0].getAttribute("media")).toBe("(max-width: 768px)");
    expect(sources[1].getAttribute("srcSet")).toBe("/assets/hero/hero-meditation-poster-1280.webp");
  });

  it("2. Mobile viewports (<1024px): video element is completely skipped, poster-only is retained", async () => {
    render(<Hero />);

    // Fast-forward any timers / loads
    await act(async () => {
      window.dispatchEvent(new Event("load"));
      await new Promise((r) => setTimeout(r, 50));
    });

    const video = document.querySelector("video");
    expect(video).toBeNull();
  });

  it("3. Reduced motion on desktop: video element is skipped even on wide screens", async () => {
    // Desktop width, but reduced-motion requested
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 1024px") ? true : query.includes("prefers-reduced-motion: reduce") ? true : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(<Hero />);

    await act(async () => {
      window.dispatchEvent(new Event("load"));
      await new Promise((r) => setTimeout(r, 50));
    });

    const video = document.querySelector("video");
    expect(video).toBeNull();
  });

  it("4. Constrained connection on desktop: video is skipped on slow-2g, 2g, 3g, or saveData", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 1024px") ? true : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    // Mock navigator.connection with effectiveType: "3g"
    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "3g", saveData: false, addEventListener: vi.fn(), removeEventListener: vi.fn() },
      configurable: true,
      writable: true,
    });

    render(<Hero />);

    await act(async () => {
      window.dispatchEvent(new Event("load"));
      await new Promise((r) => setTimeout(r, 50));
    });

    const video = document.querySelector("video");
    expect(video).toBeNull();
  });

  it("5. Desktop eligible user: video mounts after load with authentic poster prop and video attributes", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 1024px") ? true : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "4g", saveData: false, addEventListener: vi.fn(), removeEventListener: vi.fn() },
      configurable: true,
      writable: true,
    });

    // Mock requestIdleCallback
    // @ts-expect-error - requestIdleCallback
    window.requestIdleCallback = vi.fn((cb) => {
      cb({ didTimeout: false, timeRemaining: () => 50 });
      return 1;
    });

    render(<Hero />);

    await act(async () => {
      window.dispatchEvent(new Event("load"));
    });

    const video = document.querySelector("video");
    expect(video).not.toBeNull();
    expect(video?.getAttribute("poster")).toBe("/assets/hero/hero-meditation-poster-1280.webp");
    expect(video?.hasAttribute("playsinline")).toBe(true);
    expect(video?.hasAttribute("muted")).toBe(true);
  });

  it("6. Desktop-to-mobile resize lifecycle: unmounts video and halts playback", async () => {
    let isDesktopQuery = true;
    let desktopChangeCb: ((e: any) => void) | null = null;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      get matches() {
        if (query.includes("min-width: 1024px")) return isDesktopQuery;
        return false;
      },
      media: query,
      addEventListener: (event: string, cb: any) => {
        if (query.includes("min-width: 1024px")) desktopChangeCb = cb;
      },
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "4g", saveData: false, addEventListener: vi.fn(), removeEventListener: vi.fn() },
      configurable: true,
      writable: true,
    });

    // @ts-expect-error - requestIdleCallback
    window.requestIdleCallback = vi.fn((cb) => { cb(); return 1; });

    render(<Hero />);

    await act(async () => {
      window.dispatchEvent(new Event("load"));
    });

    expect(document.querySelector("video")).not.toBeNull();

    // User resizes window to mobile (<1024px)
    await act(async () => {
      isDesktopQuery = false;
      desktopChangeCb?.({ matches: false });
    });

    // Video must be unmounted from DOM
    expect(document.querySelector("video")).toBeNull();
  });

  it("7. Queued idle callback does NOT mount video if connection degrades to constrained before execution", async () => {
    let queuedCallback: (() => void) | null = null;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 1024px") ? true : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    let connChangeCb: (() => void) | null = null;
    const connObj = {
      effectiveType: "4g",
      saveData: false,
      addEventListener: vi.fn((event: string, cb: any) => {
        if (event === "change") connChangeCb = cb;
      }),
      removeEventListener: vi.fn(),
    };
    Object.defineProperty(navigator, "connection", {
      value: connObj,
      configurable: true,
      writable: true,
    });

    // Mock requestIdleCallback to manually capture the callback without executing it immediately
    // @ts-expect-error - requestIdleCallback
    window.requestIdleCallback = vi.fn((cb) => {
      queuedCallback = cb;
      return 101;
    });

    render(<Hero />);

    // Trigger load so attachVideo schedules requestIdleCallback
    await act(async () => {
      window.dispatchEvent(new Event("load"));
    });

    expect(queuedCallback).not.toBeNull();
    // Video should not be mounted yet since callback hasn't run
    expect(document.querySelector("video")).toBeNull();

    // Now connection degrades to 3g BEFORE callback executes
    await act(async () => {
      connObj.effectiveType = "3g";
      connChangeCb?.();
    });

    // Now the queued callback attempts to execute
    await act(async () => {
      queuedCallback?.();
    });

    // Under the buggy code, the queued callback sets videoSrc unconditionally and video mounts!
    // With the fix, video MUST NOT mount!
    expect(document.querySelector("video")).toBeNull();
  });

  it.each([
    { mode: "slow-2g", conn: { effectiveType: "slow-2g", saveData: false } },
    { mode: "2g", conn: { effectiveType: "2g", saveData: false } },
    { mode: "3g", conn: { effectiveType: "3g", saveData: false } },
    { mode: "saveData", conn: { effectiveType: "4g", saveData: true } },
  ])("8. Parameterized constraint test ($mode): video is strictly blocked from mounting", async ({ conn }) => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 1024px") ? true : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(navigator, "connection", {
      value: { ...conn, addEventListener: vi.fn(), removeEventListener: vi.fn() },
      configurable: true,
      writable: true,
    });

    // @ts-expect-error - requestIdleCallback
    window.requestIdleCallback = vi.fn((cb) => { cb(); return 1; });

    render(<Hero />);

    await act(async () => {
      window.dispatchEvent(new Event("load"));
      await new Promise((r) => setTimeout(r, 20));
    });

    expect(document.querySelector("video")).toBeNull();
    // Poster is always retained
    expect(document.querySelector("picture img")).not.toBeNull();
  });

  it("9. Queued idle callback does NOT mount video if user enables reduced-motion before callback executes", async () => {
    let queuedCallback: (() => void) | null = null;
    let prefersReducedMotion = false;
    let motionChangeCb: ((e: any) => void) | null = null;

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      get matches() {
        if (query.includes("min-width: 1024px")) return true;
        if (query.includes("prefers-reduced-motion: reduce")) return prefersReducedMotion;
        return false;
      },
      media: query,
      addEventListener: (event: string, cb: any) => {
        if (query.includes("prefers-reduced-motion: reduce")) motionChangeCb = cb;
      },
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "4g", saveData: false, addEventListener: vi.fn(), removeEventListener: vi.fn() },
      configurable: true,
      writable: true,
    });

    // @ts-expect-error - requestIdleCallback
    window.requestIdleCallback = vi.fn((cb) => {
      queuedCallback = cb;
      return 102;
    });

    render(<Hero />);

    await act(async () => {
      window.dispatchEvent(new Event("load"));
    });

    expect(queuedCallback).not.toBeNull();
    expect(document.querySelector("video")).toBeNull();

    // User enables prefers-reduced-motion
    await act(async () => {
      prefersReducedMotion = true;
      motionChangeCb?.({ matches: true });
    });

    // Now queued callback fires
    await act(async () => {
      queuedCallback?.();
    });

    // Video MUST NOT mount
    expect(document.querySelector("video")).toBeNull();
  });

  it("10. Video playback failure (onError): unmounts video and retains authentic poster", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("min-width: 1024px") ? true : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "4g", saveData: false, addEventListener: vi.fn(), removeEventListener: vi.fn() },
      configurable: true,
      writable: true,
    });

    // @ts-expect-error - requestIdleCallback
    window.requestIdleCallback = vi.fn((cb) => { cb(); return 1; });

    render(<Hero />);

    await act(async () => {
      window.dispatchEvent(new Event("load"));
    });

    const video = document.querySelector("video");
    expect(video).not.toBeNull();

    // Trigger video error (e.g. network disconnect or unplayable format)
    await act(async () => {
      video?.dispatchEvent(new Event("error"));
    });

    // Video must be unmounted and authentic poster must remain intact
    expect(document.querySelector("video")).toBeNull();
    expect(document.querySelector("picture img")).not.toBeNull();
  });
});
