import { lazy, Suspense, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

const HelpPanel = lazy(() => import("./HelpPanel"));

export function HelpLauncher({ isVi }: { isVi: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="underline-offset-4 hover:text-foreground hover:underline">
        {isVi ? "Trợ giúp & góp ý" : "Help & feedback"}
      </button>
      {open && (
        <Suspense fallback={null}>
          <HelpPanel pathname={pathname} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
