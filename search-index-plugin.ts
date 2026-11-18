// Generates `virtual:yj-search-index` from src/routes/**/*.tsx head() metadata.
// New public pages appear in site search automatically; redirect/noindex/utility
// routes are excluded by the extractor in src/lib/search/route-meta.ts.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { buildRouteIndex } from "./src/lib/search/route-meta";

const VIRTUAL = "virtual:yj-search-index";
const RESOLVED = "\0" + VIRTUAL;

export function listRouteFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...listRouteFiles(full));
    else if (/\.tsx?$/.test(name) && !name.endsWith(".test.tsx") && !name.endsWith(".test.ts")) out.push(full);
  }
  return out;
}

export function generateIndex(routesDir: string) {
  return buildRouteIndex(listRouteFiles(routesDir).map((f) => ({ source: readFileSync(f, "utf8") })));
}

export function searchIndexPlugin(): Plugin {
  let routesDir = "src/routes";
  return {
    name: "yj-search-index",
    configResolved(c) { routesDir = join(c.root, "src/routes"); },
    resolveId(id) { return id === VIRTUAL ? RESOLVED : null; },
    load(id) {
      if (id !== RESOLVED) return null;
      for (const f of listRouteFiles(routesDir)) this.addWatchFile(f);
      return `export default ${JSON.stringify(generateIndex(routesDir))};`;
    },
    handleHotUpdate({ file, server }) {
      if (file.includes(`${"src"}/routes/`)) {
        const mod = server.moduleGraph.getModuleById(RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
      }
    },
  };
}
