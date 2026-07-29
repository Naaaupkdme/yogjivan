import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  overlay?: boolean;
  shimmer?: boolean;
  radius?: number;
  aspect?: string;
  /** Disable zoom on hover (mobile-safe default). */
  zoom?: boolean;
  /** Optional eager loading for above-the-fold imagery. */
  eager?: boolean;
};

/**
 * LuxuryImage — premium image primitive.
 * - Native lazy loading, async decoding
 * - Soft fade-in on load with skeleton fallback
 * - Optional dark overlay + gold shimmer
 * - Desktop-only hover zoom (md+)
 * - Graceful fallback if image fails
 */
export function LuxuryImage({
  src,
  alt,
  overlay = false,
  shimmer = false,
  radius = 28,
  aspect,
  zoom = true,
  eager = false,
  className = "",
  style,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[color:var(--surface)]/40 ${className}`}
      style={{ borderRadius: radius, aspectRatio: aspect, ...style }}
    >
      {/* Skeleton */}
      {!loaded && !failed && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(110deg, color-mix(in oklab, var(--surface) 70%, transparent) 8%, color-mix(in oklab, var(--surface-2) 60%, transparent) 18%, color-mix(in oklab, var(--surface) 70%, transparent) 33%)",
          }}
        />
      )}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-xs text-muted-foreground/70">
          {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            loaded ? "opacity-100" : "opacity-0"
          } ${zoom ? "md:hover:scale-[1.05]" : ""}`}
          {...rest}
        />
      )}
      {overlay && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.42) 100%)",
          }}
        />
      )}
      {shimmer && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.06) 45%, rgba(243,228,200,0.08) 50%, rgba(212,175,55,0.06) 55%, transparent 100%)",
            mixBlendMode: "screen",
            animation: "trust-shimmer 14s linear infinite",
          }}
        />
      )}
      {/* Subtle gold edge glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow:
            "inset 0 0 0 1px color-mix(in oklab, var(--gold) 18%, transparent)",
        }}
      />
    </div>
  );
}
