import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import {
  generateWeeklySchedule,
  getUpcomingMonday,
  loadScheduleHistory,
} from "./engine/generator";
import { validateWeeklySchedule } from "./engine/validator";
import { generateWeeklyPosters } from "./engine/poster-renderer";
import { renderPostersWithChrome } from "./engine/html-poster-renderer";
import { syncScheduleToWebsite } from "./engine/sync-website";
import type { WeeklyOverrides, WeeklySchedulePack } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../..");

const HISTORY_DIR = path.resolve(__dirname, "data/history");
const OVERRIDES_FILE = path.resolve(__dirname, "data/weekly-overrides.json");
const GENERATED_DIR = path.resolve(__dirname, "generated");
const CURRENT_SCHEDULE_FILE = path.resolve(__dirname, "data/current-schedule.json");

function loadOverrides(): WeeklyOverrides {
  if (fs.existsSync(OVERRIDES_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(OVERRIDES_FILE, "utf-8"));
    } catch {
      // fallback
    }
  }
  return {};
}

export function archiveWeeklyPosters(pack: WeeklySchedulePack, generatedDir: string) {
  const archiveDir = path.join(generatedDir, "archive", pack.weekStart);
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  const s1PngName = `studio1-${pack.weekStart}-to-${pack.weekEnd}.png`;
  const s2PngName = `studio2-${pack.weekStart}-to-${pack.weekEnd}.png`;
  const s1SvgName = `studio1-${pack.weekStart}-to-${pack.weekEnd}.svg`;
  const s2SvgName = `studio2-${pack.weekStart}-to-${pack.weekEnd}.svg`;

  const s1PngTarget = path.join(archiveDir, s1PngName);
  const s2PngTarget = path.join(archiveDir, s2PngName);
  const s1SvgTarget = path.join(archiveDir, s1SvgName);
  const s2SvgTarget = path.join(archiveDir, s2SvgName);

  // Copy without overwriting if already archived
  const s1PngSrc = path.join(generatedDir, "poster-studio1-latest.png");
  const s2PngSrc = path.join(generatedDir, "poster-studio2-latest.png");
  const s1SvgSrc = path.join(generatedDir, "poster-studio1-latest.svg");
  const s2SvgSrc = path.join(generatedDir, "poster-studio2-latest.svg");

  if (!fs.existsSync(s1PngTarget) && fs.existsSync(s1PngSrc)) fs.copyFileSync(s1PngSrc, s1PngTarget);
  if (!fs.existsSync(s2PngTarget) && fs.existsSync(s2PngSrc)) fs.copyFileSync(s2PngSrc, s2PngTarget);
  if (!fs.existsSync(s1SvgTarget) && fs.existsSync(s1SvgSrc)) fs.copyFileSync(s1SvgSrc, s1SvgTarget);
  if (!fs.existsSync(s2SvgTarget) && fs.existsSync(s2SvgSrc)) fs.copyFileSync(s2SvgSrc, s2SvgTarget);

  return { archiveDir, s1PngTarget, s2PngTarget, s1SvgTarget, s2SvgTarget };
}

export async function runCli(args: string[] = process.argv.slice(2)) {
  const command = args[0] || "generate";
  const targetDate = args[1] || getUpcomingMonday();

  const overrides = loadOverrides();
  const history = loadScheduleHistory(HISTORY_DIR);

  switch (command) {
    case "generate": {
      console.log(`[SCHEDULE-ENGINE] Generating schedule for week of ${targetDate}...`);
      const pack = generateWeeklySchedule({
        targetWeekMonday: targetDate,
        historyDir: HISTORY_DIR,
        overrides,
      });

      console.log(`[SCHEDULE-ENGINE] Candidate generated: ${pack.weekLabelVi}`);
      const validation = validateWeeklySchedule(pack, { history, overrides });

      console.log(`[VALIDATOR] Valid: ${validation.valid}`);
      Object.entries(validation.ruleSummary).forEach(([rule, status]) => {
        console.log(`  - ${rule}: ${status}`);
      });

      if (!validation.valid) {
        console.error("[VALIDATOR] Errors detected:");
        validation.errors.forEach((err) => console.error(`  x ${err}`));
        process.exit(1);
      }

      console.log("[SCHEDULE-ENGINE] Schedule valid. Candidate JSON:");
      console.log(JSON.stringify(pack, null, 2));
      break;
    }

    case "validate": {
      let pack: WeeklySchedulePack;
      if (fs.existsSync(CURRENT_SCHEDULE_FILE)) {
        pack = JSON.parse(fs.readFileSync(CURRENT_SCHEDULE_FILE, "utf-8"));
      } else {
        pack = generateWeeklySchedule({
          targetWeekMonday: targetDate,
          historyDir: HISTORY_DIR,
          overrides,
        });
      }

      const validation = validateWeeklySchedule(pack, { history, overrides });
      console.log(`[VALIDATOR] Validation Result: ${validation.valid ? "PASSED" : "FAILED"}`);
      Object.entries(validation.ruleSummary).forEach(([rule, status]) => {
        console.log(`  - ${rule}: ${status}`);
      });

      if (!validation.valid) {
        validation.errors.forEach((err) => console.error(`  x ${err}`));
        process.exit(1);
      }
      break;
    }

    case "posters": {
      let pack: WeeklySchedulePack;
      if (fs.existsSync(CURRENT_SCHEDULE_FILE)) {
        pack = JSON.parse(fs.readFileSync(CURRENT_SCHEDULE_FILE, "utf-8"));
      } else {
        pack = generateWeeklySchedule({
          targetWeekMonday: targetDate,
          historyDir: HISTORY_DIR,
          overrides,
        });
      }

      console.log(`[POSTER-ENGINE] Rendering deterministic posters for ${pack.weekLabelVi}...`);
      const posters = await generateWeeklyPosters(pack, GENERATED_DIR);
      console.log(`[POSTER-ENGINE] Studio 1 SVG: ${posters.studio1Svg}`);
      console.log(`[POSTER-ENGINE] Studio 2 SVG: ${posters.studio2Svg}`);

      const assetsDir = path.resolve(__dirname, "assets");
      const pngPosters = await renderPostersWithChrome(pack, assetsDir, GENERATED_DIR);
      console.log(`[POSTER-ENGINE] Studio 1 PNG: ${pngPosters.studio1Png}`);
      console.log(`[POSTER-ENGINE] Studio 2 PNG: ${pngPosters.studio2Png}`);

      const archiveResult = archiveWeeklyPosters(pack, GENERATED_DIR);
      console.log(`[POSTER-ENGINE] Archived weekly copies to: ${archiveResult.archiveDir}`);

      console.log("\nStudio 1 PNG:");
      console.log(pngPosters.studio1Png);
      console.log("\nStudio 2 PNG:");
      console.log(pngPosters.studio2Png);
      console.log("\nPreview:");
      console.log(path.join(GENERATED_DIR, "preview.html"));
      break;
    }

    case "publish": {
      console.log(`=== YOG JIVAN WEEKLY SCHEDULE PUBLISHING PIPELINE ===`);
      console.log(`Step 1: Calculate target Monday (${targetDate}) and load history/overrides`);
      const pack = generateWeeklySchedule({
        targetWeekMonday: targetDate,
        historyDir: HISTORY_DIR,
        overrides,
      });

      console.log(`Step 2: Run all 15 schedule validators...`);
      const validation = validateWeeklySchedule(pack, { history, overrides });
      if (!validation.valid) {
        console.error(`[CRITICAL] Validation failed! REFUSING TO PUBLISH.`);
        validation.errors.forEach((err) => console.error(`  x ${err}`));
        process.exit(1);
      }
      console.log(`[VALIDATION] All 15 scheduling rules PASSED.`);

      console.log(`Step 3: Synchronizing schedule to website facts...`);
      const syncResult = syncScheduleToWebsite(pack, PROJECT_ROOT);
      console.log(`[WEBSITE] Updated: ${syncResult.targetFile}`);

      console.log(`Step 4: Rendering deterministic vector and high-res posters...`);
      const posterResult = await generateWeeklyPosters(pack, GENERATED_DIR);
      console.log(`[POSTERS] Rendered SVG: ${posterResult.studio1Svg} & ${posterResult.studio2Svg}`);

      const assetsDir = path.resolve(__dirname, "assets");
      const pngPosters = await renderPostersWithChrome(pack, assetsDir, GENERATED_DIR);
      console.log(`[POSTERS] Rendered PNG: ${pngPosters.studio1Png} & ${pngPosters.studio2Png}`);

      console.log(`Step 5: Archiving week in schedule history and poster archive...`);
      const historyArchiveFile = path.join(HISTORY_DIR, `week-${pack.weekStart}.json`);
      fs.writeFileSync(historyArchiveFile, JSON.stringify(pack, null, 2), "utf-8");
      console.log(`[HISTORY] Archived JSON: ${historyArchiveFile}`);

      const archiveResult = archiveWeeklyPosters(pack, GENERATED_DIR);
      console.log(`[POSTERS] Archived versioned copies to: ${archiveResult.archiveDir}`);

      console.log(`=== PUBLISHING PIPELINE COMPLETED SUCCESSFULLY ===`);
      console.log("\nStudio 1 PNG:");
      console.log(pngPosters.studio1Png);
      console.log("\nStudio 2 PNG:");
      console.log(pngPosters.studio2Png);
      console.log("\nPreview:");
      console.log(path.join(GENERATED_DIR, "preview.html"));
      break;
    }

    case "rollback": {
      console.log(`[ROLLBACK] Rolling back to last valid schedule from history...`);
      const historyFiles = fs
        .readdirSync(HISTORY_DIR)
        .filter((f) => f.endsWith(".json"))
        .sort()
        .reverse();

      if (historyFiles.length === 0) {
        console.error("[ROLLBACK] No archived history found to rollback to.");
        process.exit(1);
      }

      const latestHistoryFile = path.join(HISTORY_DIR, historyFiles[0]!);
      const pack: WeeklySchedulePack = JSON.parse(
        fs.readFileSync(latestHistoryFile, "utf-8"),
      );

      syncScheduleToWebsite(pack, PROJECT_ROOT);
      await generateWeeklyPosters(pack, GENERATED_DIR);
      console.log(`[ROLLBACK] Restored schedule from: ${historyFiles[0]}`);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}

// Only execute when called directly from CLI
const entry = process.argv[1];
if (entry && entry.endsWith("cli.ts")) {
  runCli().catch((err) => {
    console.error("[FATAL ERROR]", err);
    process.exit(1);
  });
}
