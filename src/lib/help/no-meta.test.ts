import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// Help panel and feedback must never send analytics/Meta events (e.g. Lead).
describe("help panel analytics isolation", () => {
  for (const f of ["src/components/site/HelpPanel.tsx", "src/components/site/HelpLauncher.tsx", "src/routes/api/public/help/feedback.ts", "src/lib/help/notify.server.ts"]) {
    it(`${f} has no analytics or Meta calls`, () => {
      const src = readFileSync(f, "utf8");
      expect(src).not.toMatch(/@\/lib\/analytics|fbq\(|metaEvent\(|trackGenerateLead\(|gtag\(/);
    });
  }
});
