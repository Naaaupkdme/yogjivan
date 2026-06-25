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
    <section className="relative isolate overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--onyx)]/80 via-[color:var(--onyx)]/70 to-[color:var(--onyx)]" />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 mx-auto h-72 w-[60rem] max-w-full bg-[radial-gradient(ellipse,oklch(0.755_0.105_80/0.12),transparent_70%)] blur-3xl" />

      <div className="container-luxe">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="eyebrow">
          <span className="h-px w-10 bg-[color:var(--gold)]" />{eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-5 max-w-4xl text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.04]"
        >
          {title} {accent && <span className="italic text-gold-gradient">{accent}</span>}
        </motion.h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
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
    <section className="section-pad">
      <div className="container-luxe">
        <div className="glass-luxe relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.755_0.105_80/0.10),transparent_60%)]" />
          <p className="eyebrow justify-center">Begin Today</p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight">{title}</h2>
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
