import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { breadcrumbSchema } from "@/lib/schema";
import { hreflangLinks, PAIR_HELP } from "@/lib/locale-routes";
import { searchHelpFAQs, HELP_FAQS, type HelpFAQ } from "@/lib/support/help-faq";
import { SupportIntakeForm } from "@/components/support/SupportIntakeForm";
import { GoogleReviewCards } from "@/components/support/GoogleReviewCards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, HelpCircle, Send, Star, ExternalLink, ArrowRight } from "lucide-react";
import { waHref } from "@/lib/wa";
import { CONTACT } from "@/lib/facts/contact";
import { ZaloIcon } from "@/components/icons/ZaloIcon";

const TITLE = "Help & Support — Frequently Asked Questions | Yog Jivan";
const DESCRIPTION =
  "Find verified answers to common questions about private online yoga, corporate and school demos, pricing, camera setup and studio locations in Hai Phong.";
const CANONICAL = "https://www.yogjivan.com/help";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: CANONICAL },
      ...hreflangLinks(PAIR_HELP),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema("Help & Support", "/help")),
      },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const [query, setQuery] = useState("");
  const [activeFormMode, setActiveFormMode] = useState<"ask" | "feedback">("ask");

  const faqs = searchHelpFAQs(query, "en");

  const questionChips = [
    { label: "Solo $25 Rate", q: "private session price" },
    { label: "Corporate Demo", q: "corporate demo" },
    { label: "School Yoga", q: "school yoga" },
    { label: "Couples & Friends", q: "couples yoga" },
    { label: "Family Rates", q: "family yoga" },
    { label: "Camera Setup", q: "camera setup" },
    { label: "Rescheduling", q: "reschedule" },
    { label: "Studio Hours", q: "studio hours" },
  ];

  return (
    <>
      {/* 1 — HERO & SEARCH */}
      <PageHero
        eyebrow="Help & Support"
        title="How can we help?"
        sub="Find verified answers to common questions about private yoga, corporate & school demos, camera setup, and studio locations — or message our team directly."
      >
        <div className="mx-auto mt-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search common questions (pricing, demo, camera, reschedule)..."
              className="w-full rounded-2xl border border-[color:var(--gold)]/30 bg-black/60 pl-12 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[color:var(--gold)] focus:outline-none shadow-lg backdrop-blur-md"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick chips */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {questionChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setQuery(chip.q)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  query.toLowerCase().includes(chip.q.toLowerCase())
                    ? "border-[color:var(--gold)] bg-[color:var(--gold)]/20 text-[color:var(--gold)] font-medium"
                    : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/30 hover:text-foreground"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Direct WhatsApp / Zalo Handoff */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>Prefer to chat directly?</span>
            <a
              href={waHref("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/10 px-3.5 py-1.5 font-medium text-green-400 hover:bg-green-500/20"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 px-3.5 py-1.5 font-medium text-blue-400 hover:bg-blue-500/20"
            >
              <ZaloIcon className="h-3.5 w-3.5" />
              <span>Zalo Us</span>
            </a>
          </div>
        </div>
      </PageHero>

      {/* 2 — FREQUENTLY ASKED QUESTIONS */}
      <section className="section-pad border-b border-border/40">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {query ? `Search Results (${faqs.length})` : "Common Questions & Answers"}
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {query
                ? `Showing verified answers matching "${query}"`
                : "Explore verified answers about pricing, practice formats, room setup, and policies."}
            </p>

            <div className="mt-8">
              {faqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={faq.id} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:text-[color:var(--gold)]">
                        {faq.qEn}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        <p>{faq.aEn}</p>
                        {faq.link && (
                          <div className="mt-3">
                            <a
                              href={
                                faq.link.hash
                                  ? `${faq.link.to}#${faq.link.hash}`
                                  : faq.link.to
                              }
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--gold)] hover:underline"
                            >
                              <span>{faq.link.labelEn}</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    We couldn’t find an answer matching your query. Send your question to our team below.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("support-form-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-4 btn-gold text-xs py-2 px-5 inline-flex items-center gap-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Ask the team</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — GOOGLE REVIEWS SECTION */}
      <section className="section-pad-sm border-b border-border/40 bg-card/20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Verified Google Reviews
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Direct, un-gated review links for our physical studio locations in Vietnam.
            </p>

            <div className="mt-8">
              <GoogleReviewCards
                currentRoute="/help"
                isVi={false}
                onOpenFeedback={() => {
                  setActiveFormMode("feedback");
                  const el = document.getElementById("support-form-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — SUPPORT & PRIVATE FEEDBACK FORM */}
      <section id="support-form-section" className="section-pad bg-muted/10">
        <div className="container-luxe">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <p className="eyebrow justify-center"><span className="h-px w-10 bg-[color:var(--gold)]" />Direct Support<span className="h-px w-10 bg-[color:var(--gold)]" /></p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {activeFormMode === "ask" ? "Ask the Yog Jivan Team" : "Send Private Feedback"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {activeFormMode === "ask"
                  ? "Have a question about scheduling, pricing, or practice requirements? Send us a message and receive a ticket reference."
                  : "Share private, confidential feedback with our management team. Submissions can be completely anonymous."}
              </p>

              {/* Mode switch pills */}
              <div className="mt-4 inline-flex rounded-xl border border-white/10 bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => setActiveFormMode("ask")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    activeFormMode === "ask"
                      ? "bg-[color:var(--gold)] text-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Ask a Question
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormMode("feedback")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                    activeFormMode === "feedback"
                      ? "bg-[color:var(--gold)] text-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Send Private Feedback
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8 shadow-xl">
              <SupportIntakeForm
                key={activeFormMode}
                mode={activeFormMode}
                lang="EN"
                initialCategory={activeFormMode === "feedback" ? "class_feedback" : "booking_lesson"}
                initialMessage={query}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
