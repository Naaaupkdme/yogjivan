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
  imageWidth = 1440,
  imageHeight = 960,
  imageAspectRatio = "3/2",
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
  imageAspectRatio?: "3/2" | "16/9" | "4/3" | string;
  imagePosition?: string;
  imageAlt?: string;
  imageCaption?: string;
  children?: ReactNode;
  contrastVeil?: boolean;
  stackImageOnMobile?: boolean;
}) {
  const hasImage = Boolean(image || image768 || image1400);
  const fallbackSrc = image || image1400 || image768 || "";

  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--hdr-h,64px)+3rem)] pb-14 md:pt-[calc(var(--hdr-h,80px)+4rem)] md:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 ambient-grid opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-14 -z-10 mx-auto h-64 w-[56rem] max-w-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_72%)] blur-3xl" />

      <div className="container-luxe">
        {hasImage ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Copy column */}
            <div className="lg:col-span-7">
              <p className="eyebrow">
                <span className="h-px w-10 bg-primary" />{eyebrow}
              </p>
              <h1 className="mt-5 fluid-title leading-[1.08]">
                {title} {accent && <span className="italic text-gold-gradient">{accent}</span>}
              </h1>
              {sub && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
                  {sub}
                </p>
              )}
              {children && <div className="mt-8">{children}</div>}
            </div>

            {/* Photo column: 3:2 framing, sharp rendering, subtle warm border & shadow */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-gradient-to-br from-card/90 via-card/50 to-muted/20 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none">
                  <picture className="block w-full overflow-hidden rounded-xl aspect-[3/2] bg-muted/20">
                    {image768 && (
                      <source
                        media="(max-width: 768px)"
                        srcSet={image768}
                        type="image/webp"
                        width={768}
                        height={512}
                      />
                    )}
                    {image1400 && (
                      <source
                        media="(min-width: 769px)"
                        srcSet={image1400}
                        type="image/webp"
                        width={1440}
                        height={960}
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
                      className={`h-full w-full object-cover ${imagePosition}`}
                    />
                  </picture>
                </div>
                {imageCaption && (
                  <p className="mt-2 text-center text-xs text-muted-foreground/75">
                    {imageCaption}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl">
            <p className="eyebrow">
              <span className="h-px w-10 bg-primary" />{eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl fluid-title">
              {title} {accent && <span className="italic text-gold-gradient">{accent}</span>}
            </h1>
            {sub && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {sub}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
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
