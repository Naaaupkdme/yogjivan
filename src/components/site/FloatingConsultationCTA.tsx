import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SmartConsultation } from "./SmartConsultation";

export function FloatingConsultationCTA() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open personal consultation"
          className="fixed right-4 z-40 hidden md:inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-gradient-to-r from-[color:var(--gold)] to-amber-300 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_22px_60px_-18px_color-mix(in_oklab,var(--gold)_70%,transparent)] transition-transform hover:scale-[1.04] sm:right-5"
          style={{ bottom: "calc(env(safe-area-inset-bottom,0px) + 20px)" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Personal Consultation
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto bg-[color:var(--onyx)]/95 backdrop-blur-xl border-l border-[color:var(--gold)]/20 p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="font-display text-2xl">Personal Consultation</SheetTitle>
        </SheetHeader>
        <div className="p-4 sm:p-6">
          <SmartConsultation />
        </div>
      </SheetContent>
    </Sheet>
  );
}
