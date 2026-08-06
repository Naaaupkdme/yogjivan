import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Renders children into document.body so viewport-level overlays are never
 * clipped by an ancestor that creates a containing block (the site header uses
 * backdrop-filter, which makes `position: fixed` resolve against the header box).
 * SSR-safe: renders nothing until mounted on the client.
 */
export function BodyPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
