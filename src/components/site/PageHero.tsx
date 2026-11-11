import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  image,
  image768,
  image1400,
  imageWidth = 1400,
  imageHeight = 788,
  imageAspectRatio = "16/9",
  imagePosition = "object-center",
  imageAlt = "",
  imageCaption,
  children,
  contrastVeil,
  stackImageOnMobile = true,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  image?: string;
  image768?: string;
  image1400?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAspectRatio?: "16/9" | "4/3" | string;
  imagePosition?: string;
  imageAlt?: string;
  imageCaption?: string;
  children?: ReactNode;
  contrastVeil?: boolean;
  stackImageOnMobile?: boolean;
}) {
  const hasImage = Boolean(image || image768 || image1400);
  const fallbackSrc = image || image1400 || image768 || "";
  const aspectClass = imageAspectRatio === "4/3" ? "aspect-[4/3]" : "aspect-[16/9]";

  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--hdr-h,64px)+3.5rem)] pb-16 md:pt-[calc(var(--hdr-h,80px)+4.5rem)] md:pb-24">
      {contrastVeil && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_18%_45%,color-mix(in_oklab,var(--onyx)_78%,transparent),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_33%,color-mix(in_oklab,var(--onyx)_72%,transparent))]"
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 ambient-grid opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-14 -z-10 mx-auto h-64 w-[56rem] max-w-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_72%)] blur-3xl" />

      {/* Desktop-only dark overlay so text stays readable over backdrop */}
      {hasImage && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 hidden md:block bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_45%,transparent),color-mix(in_oklab,var(--onyx)_70%,transparent))]"
        />
      )}

      <div className="container-luxe">
        <p className="eyebrow">
          <span className="h-px w-10 bg-primary" />{eyebrow}
        </p>
        <h1
          className="mt-5 max-w-5xl fluid-title"
          style={contrastVeil ? { textShadow: "0 2px 24px color-mix(in oklab, var(--onyx) 85%, transparent)" } : undefined}
        >
          {title} {accent && <span className="italic text-gold-gradient">{accent}</span>}
        </h1>
        {sub && (
          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${contrastVeil ? "text-foreground/85" : "text-muted-foreground"}`}
          >
            {sub}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}

        {hasImage && (
          <div className={stackImageOnMobile ? "relative mt-8 md:mt-0" : "contents"}>
            <picture
              className={
                stackImageOnMobile
                  ? `relative block w-full max-w-2xl overflow-hidden rounded-2xl border border-[color:var(--gold)]/25 shadow-xl ${aspectClass} md:aspect-auto md:max-w-none md:rounded-none md:border-0 md:shadow-none md:absolute md:inset-0 md:-z-10 md:h-full`
                  : "absolute inset-0 -z-10 block h-full w-full overflow-hidden"
              }
            >
              {image768 && (
                <source
                  media="(max-width: 768px)"
                  srcSet={image768}
                  type="image/webp"
                  width={imageAspectRatio === "4/3" ? 768 : 768}
                  height={imageAspectRatio === "4/3" ? 576 : 432}
                />
              )}
              {image1400 && (
                <source
                  media="(min-width: 769px)"
                  srcSet={image1400}
                  type="image/webp"
                  width={imageAspectRatio === "4/3" ? 1400 : 1400}
                  height={imageAspectRatio === "4/3" ? 1050 : 788}
                />
              )}
              <img
                src={fallbackSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                role={imageAlt ? undefined : "presentation"}
                aria-hidden={imageAlt ? undefined : "true"}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className={`h-full w-full object-cover ${imagePosition} opacity-95 md:opacity-45 md:sm:opacity-55`}
              />
            </picture>
            {imageCaption && stackImageOnMobile && (
              <p className="mt-2 text-xs text-muted-foreground/80 md:hidden">
                {imageCaption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function CTABanner({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="section-tight">
      <div className="container-luxe">
        <div className="glass-luxe relative overflow-hidden rounded-[2rem] p-8 text-center md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_70%)]" />
          <p className="eyebrow justify-center">Begin Today</p>
          <h2 className="mt-4 text-[clamp(1.9rem,3.8vw,3rem)] leading-tight">{title}</h2>
          {sub && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{sub}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" hash="consultation" className="btn-gold">Book Free Consultation</Link>
            <Link to="/programs" className="btn-ghost-gold">View Programs</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
