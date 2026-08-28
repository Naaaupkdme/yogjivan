import { Link } from "@tanstack/react-router";
import { ArrowRight, User, Users, MapPin } from "lucide-react";
import { ONLINE_CLASS } from "@/lib/facts/online-class";
import { STUDIO_HOURS } from "@/lib/facts/locations";

/**
 * Three primary decision paths, directly under the hero.
 * Private 1-on-1 is the flagship and is visually first / strongest.
 * Verified facts only — no pricing, no invented availability.
 */
export function PrimaryPaths() {
  return (
    <section className="section-tight" aria-labelledby="primary-paths-heading">
      <div className="container-luxe">
        <p className="eyebrow"><span className="h-px w-10 bg-[color:var(--gold)]" />Choose your path</p>
        <h2
          id="primary-paths-heading"
          className="mt-4 font-display leading-[1.12]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}
        >
          Three ways to practise with <span className="italic text-gold-gradient">Yog Jivan</span>
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {/* FLAGSHIP */}
          <Link
            to="/private-online-yoga"
            data-cta-location="home_path_private"
            className="glass-luxe group relative flex min-h-[44px] flex-col rounded-[1.75rem] border border-[color:var(--gold)]/40 bg-[color-mix(in_oklab,var(--gold)_8%,var(--onyx))] p-6 transition-transform hover:-translate-y-1 md:p-8 lg:row-span-1"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
              <User className="h-3.5 w-3.5" /> Flagship
            </span>
            <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">Private 1-on-1 Yoga</h3>
            <p className="mt-1 text-sm italic text-[color:var(--gold)]">A practice built around you</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              A live {ONLINE_CLASS.durationMinutes}-minute one-to-one session with a matched Yog Jivan
              teacher — your level, your goals, your schedule. Sessions are generally kept with the
              same matched teacher. Pricing and scheduling by enquiry.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
              Enquire about private 1-on-1 <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/online-yoga-classes"
            data-cta-location="home_path_online_group"
            className="glass-soft group flex flex-col rounded-[1.75rem] border border-white/10 p-6 transition-transform hover:-translate-y-1"
          >
            <Users className="h-5 w-5 text-[color:var(--gold)]" />
            <h3 className="mt-4 font-display text-xl leading-tight">Live Online Group Classes</h3>
            <p className="mt-1 text-sm italic text-foreground/70">
              Master Anil-led · max {ONLINE_CLASS.maxGroupSize} · {ONLINE_CLASS.durationMinutes} min
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              Small live classes on video in English, Vietnamese and Hindi — practise from anywhere
              in the world with a real teacher watching.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
              See online classes <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/programs"
            data-cta-location="home_path_studio"
            className="glass-soft group flex flex-col rounded-[1.75rem] border border-white/10 p-6 transition-transform hover:-translate-y-1"
          >
            <MapPin className="h-5 w-5 text-[color:var(--gold)]" />
            <h3 className="mt-4 font-display text-xl leading-tight">Hai Duong Studio Classes</h3>
            <p className="mt-1 text-sm italic text-foreground/70">In-person practice · {STUDIO_HOURS.label}</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              Two studios serving the Hai Duong urban area, taught in person by the Yog Jivan
              teaching team with live verbal guidance and modifications.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">
              View studio programs <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
