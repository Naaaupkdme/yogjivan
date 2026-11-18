import { lazy, Suspense, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const HelpPanel = lazy(() => import("./HelpPanel"));

export function HelpLauncher({ isVi }: { isVi: boolean }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <button ref={btn} type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className="underline-offset-4 hover:text-foreground hover:underline">
        {isVi ? "Trợ giúp & góp ý" : "Help & feedback"}
      </button>
      {open && (
        <Suspense fallback={null}>
          <HelpPanel pathname={pathname} onClose={() => { setOpen(false); btn.current?.focus(); }} />
        </Suspense>
      )}
    </>
  );
}
