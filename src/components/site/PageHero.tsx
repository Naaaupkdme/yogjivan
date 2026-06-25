import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, accent, sub, image, children }: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--hdr-h,64px)+3.5rem)] pb-16 md:pt-[calc(var(--hdr-h,80px)+4.5rem)] md:pb-24">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-28" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--onyx)_45%,transparent),color-mix(in_oklab,var(--onyx)_68%,transparent))]" />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 ambient-grid opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-14 -z-10 mx-auto h-64 w-[56rem] max-w-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_72%)] blur-3xl" />

      <div className="container-luxe">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="eyebrow">
          <span className="h-px w-10 bg-primary" />{eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="mt-5 max-w-5xl fluid-title">
          {title} {accent && <span className="italic text-gold-gradient">{accent}</span>}
        </motion.h1>
        {sub && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25 }} className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {sub}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
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
            <Link to="/contact" className="btn-gold">Book Free Consultation</Link>
            <Link to="/programs" className="btn-ghost-gold">View Programs</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
