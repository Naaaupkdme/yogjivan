import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/faqs";

export function FAQ() {
  return (
    <section id="faq" className="section-y relative overflow-hidden">
      <div className="container-luxe relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-10 bg-primary" /> Questions
            <span className="h-px w-10 bg-primary" />
          </p>
          <h2 className="mt-5 fluid-title">Frequently asked.</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            Everything you need to begin — answered clearly.
          </p>
        </div>

        <div className="mx-auto max-w-3xl glass-luxe p-3 sm:p-6" style={{ borderRadius: 28 }}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left font-display text-lg leading-snug hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
