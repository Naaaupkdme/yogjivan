import { Link } from "@tanstack/react-router";
import { MapPin, Globe2 } from "lucide-react";
import { STUDIO_LIST, TEACHER, ONLINE_CLASS } from "@/lib/facts";

/**
 * Concise, answer-style introduction directly under the hero.
 * Purpose: make local (Hai Duong urban area) intent unmistakable to both
 * readers and search engines, with the live-online pathway as a clear second.
 * Plain visible text + contextual internal links — no hidden or duplicated copy.
 */
export function LocalIntro() {
  return (
    <section className="section-tight" aria-labelledby="local-intro-heading">
      <div className="container-luxe">
        <div className="glass-luxe mx-auto max-w-4xl rounded-[2rem] border border-[color:var(--gold)]/25 p-6 md:p-9">
          <h2
            id="local-intro-heading"
            className="font-display leading-[1.15]"
            style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.9rem)" }}
          >
            Yoga classes in the Hai Duong urban area — and live online worldwide
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/90">
            Yog Jivan runs two yoga studios serving the Hai Duong urban area of Hai Phong,
            Vietnam, teaching authentic Indian yoga to beginners, students looking for
            supportive movement, relaxation or a more comfortable practice, and people who
            want focused one-to-one guidance. Every class is
            taught personally by {TEACHER.name}, {TEACHER.title}, with real-time verbal
            correction in small groups. If you cannot come to the studio, the same teaching
            is available in live online classes ({ONLINE_CLASS.durationMinutes} minutes, a
            maximum of {ONLINE_CLASS.maxGroupSize} students) in English, Vietnamese and Hindi.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {STUDIO_LIST.map((s) => (
              <li key={s.id} className="glass-soft flex items-start gap-3 rounded-2xl p-4">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                <div>
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.full}</p>
                  <a
                    href={s.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-[color:var(--gold)] hover:underline"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm leading-relaxed text-foreground/85">
            <Globe2 className="h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
            <span>
              New to yoga? Start with{" "}
              <Link to="/yoga-for-beginners" className="text-[color:var(--gold)] hover:underline">
                yoga for beginners
              </Link>
              . Prefer to practise from home or another country? See{" "}
              <Link to="/online-yoga-classes" className="text-[color:var(--gold)] hover:underline">
                live online yoga classes
              </Link>
              . You can also browse{" "}
              <Link to="/programs" className="text-[color:var(--gold)] hover:underline">
                all yoga programs
              </Link>
              , arrange{" "}
              <Link to="/private-online-yoga" className="text-[color:var(--gold)] hover:underline">
                1-on-1 personal training
              </Link>
              , or{" "}
              <Link to="/contact" hash="consultation" className="text-[color:var(--gold)] hover:underline">
                enquire about studio classes
              </Link>
              .
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
