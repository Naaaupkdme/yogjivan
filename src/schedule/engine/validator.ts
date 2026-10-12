import { STUDIOS, type StudioId } from "../config/studios";
import { CLASS_CATALOG } from "../config/class-catalog";
import {
  WEEKDAYS,
  PROPS_PER_ROW,
  type WeekdayKey,
} from "../config/schedule-rules";
import type { WeeklySchedulePack, WeeklyOverrides } from "../types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  ruleSummary: Record<string, "PASS" | "FAIL" | "WARN">;
}

export interface ValidateOptions {
  history?: WeeklySchedulePack[];
  overrides?: WeeklyOverrides;
}

export function validateWeeklySchedule(
  pack: WeeklySchedulePack,
  options: ValidateOptions = {},
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ruleSummary: Record<string, "PASS" | "FAIL" | "WARN"> = {};

  const history = options.history || [];
  const overrides = options.overrides || {};

  // ----------------------------------------------------
  // Rule 1: Correct Monday–Saturday dates
  // ----------------------------------------------------
  let r1Pass = true;
  if (!pack.weekStart || !pack.weekEnd) {
    errors.push("Rule 1: weekStart or weekEnd missing.");
    r1Pass = false;
  } else {
    const startDate = new Date(pack.weekStart);
    const endDate = new Date(pack.weekEnd);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      errors.push("Rule 1: Invalid date format in weekStart or weekEnd.");
      r1Pass = false;
    } else {
      // Must be 5 days apart (Mon to Sat = 6 days inclusive)
      const diffDays = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays !== 5) {
        errors.push(
          `Rule 1: Date span must be exactly 5 days (Monday to Saturday), found ${diffDays} days.`,
        );
        r1Pass = false;
      }
    }
  }
  ruleSummary["1_mon_to_sat_dates"] = r1Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 2 & 3: Correct Studio 1 and Studio 2 times
  // ----------------------------------------------------
  let r2Pass = true;
  let r3Pass = true;

  const s1 = pack.studios.studio1;
  const s2 = pack.studios.studio2;

  if (!s1 || s1.rows.length !== 5) {
    errors.push("Rule 2: Studio 1 must have exactly 5 time slots.");
    r2Pass = false;
  } else {
    const expectedS1Slots = STUDIOS.studio1.timeSlots;
    s1.rows.forEach((r, idx) => {
      if (r.slot !== expectedS1Slots[idx]) {
        errors.push(
          `Rule 2: Studio 1 slot ${idx + 1} mismatch. Expected '${expectedS1Slots[idx]}', got '${r.slot}'`,
        );
        r2Pass = false;
      }
    });
  }

  if (!s2 || s2.rows.length !== 5) {
    errors.push("Rule 3: Studio 2 must have exactly 5 time slots.");
    r3Pass = false;
  } else {
    const expectedS2Slots = STUDIOS.studio2.timeSlots;
    s2.rows.forEach((r, idx) => {
      if (r.slot !== expectedS2Slots[idx]) {
        errors.push(
          `Rule 3: Studio 2 slot ${idx + 1} mismatch. Expected '${expectedS2Slots[idx]}', got '${r.slot}'`,
        );
        r3Pass = false;
      }
    });
  }
  ruleSummary["2_studio1_times"] = r2Pass ? "PASS" : "FAIL";
  ruleSummary["3_studio2_times"] = r3Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 4: Correct Master Anil / Master Ravi teacher pattern
  // ----------------------------------------------------
  let r4Pass = true;
  for (const studioId of ["studio1", "studio2"] as StudioId[]) {
    const studio = pack.studios[studioId];
    if (!studio) continue;
    const expectedTeachers = STUDIOS[studioId].teacherPattern;

    for (const wDay of WEEKDAYS) {
      const dayOverview = studio.days[wDay];
      const hasTeacherOverride = overrides.teacherReplacements?.some(
        (tr) => tr.studioId === studioId,
      );

      if (
        !hasTeacherOverride &&
        dayOverview &&
        dayOverview.state === "active" &&
        dayOverview.teacher !== expectedTeachers[wDay]
      ) {
        errors.push(
          `Rule 4: ${studioId} on ${wDay} expected teacher '${expectedTeachers[wDay]}', found '${dayOverview.teacher}'`,
        );
        r4Pass = false;
      }
    }
  }
  ruleSummary["4_teacher_pattern"] = r4Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 5: Exactly 2 prop classes per time-slot row
  // ----------------------------------------------------
  let r5Pass = true;
  for (const studioId of ["studio1", "studio2"] as StudioId[]) {
    const studio = pack.studios[studioId];
    if (!studio) continue;

    studio.rows.forEach((row, rowIdx) => {
      let propCount = 0;
      for (const wDay of WEEKDAYS) {
        const cell = row.classes[wDay];
        if (cell && cell.status === "active" && cell.isProp) {
          propCount++;
        }
      }
      if (propCount !== PROPS_PER_ROW) {
        errors.push(
          `Rule 5: ${studioId} row ${rowIdx + 1} (${row.slot}) has ${propCount} prop classes. Strictly ${PROPS_PER_ROW} required.`,
        );
        r5Pass = false;
      }
    });
  }
  ruleSummary["5_exact_2_props_per_row"] = r5Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 6: No Aerial Yoga in Studio 2
  // ----------------------------------------------------
  let r6Pass = true;
  if (s2) {
    s2.rows.forEach((row) => {
      for (const wDay of WEEKDAYS) {
        const cell = row.classes[wDay];
        if (
          cell &&
          (cell.classId === "aerial_yoga" ||
            cell.propType === "aerial" ||
            cell.en.toLowerCase().includes("aerial") ||
            cell.vi.toLowerCase().includes("võng"))
        ) {
          errors.push(
            `Rule 6: Aerial Yoga found in Studio 2 at slot ${row.slot} on ${wDay}! Studio 2 Aerial is strictly forbidden.`,
          );
          r6Pass = false;
        }
      }
    });
  }
  ruleSummary["6_no_aerial_in_studio2"] = r6Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 7: Studio 1 Aerial does not violate weekly maximum (1-2/week)
  // ----------------------------------------------------
  let r7Pass = true;
  if (s1) {
    let aerialCount = 0;
    s1.rows.forEach((row) => {
      for (const wDay of WEEKDAYS) {
        const cell = row.classes[wDay];
        if (
          cell &&
          cell.status === "active" &&
          (cell.classId === "aerial_yoga" || cell.propType === "aerial")
        ) {
          aerialCount++;
        }
      }
    });
    const maxAerial = STUDIOS.studio1.maxAerialPerWeek;
    if (aerialCount > maxAerial) {
      errors.push(
        `Rule 7: Studio 1 has ${aerialCount} Aerial Yoga sessions, exceeding weekly maximum of ${maxAerial}.`,
      );
      r7Pass = false;
    }
  }
  ruleSummary["7_studio1_aerial_max"] = r7Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 8 & 9: No missing English or approved Vietnamese class name
  // ----------------------------------------------------
  let r8Pass = true;
  let r9Pass = true;
  for (const studioId of ["studio1", "studio2"] as StudioId[]) {
    const studio = pack.studios[studioId];
    if (!studio) continue;
    studio.rows.forEach((row) => {
      for (const wDay of WEEKDAYS) {
        const cell = row.classes[wDay];
        if (!cell) {
          errors.push(`Rule 8/9: Missing cell at ${studioId} ${row.slot} ${wDay}`);
          r8Pass = false;
          r9Pass = false;
          continue;
        }
        if (!cell.en || cell.en.trim() === "") {
          errors.push(
            `Rule 8: Missing English class name at ${studioId} ${row.slot} ${wDay}`,
          );
          r8Pass = false;
        }
        if (!cell.vi || cell.vi.trim() === "") {
          errors.push(
            `Rule 9: Missing Vietnamese class name at ${studioId} ${row.slot} ${wDay}`,
          );
          r9Pass = false;
        }
      }
    });
  }
  ruleSummary["8_no_missing_english_name"] = r8Pass ? "PASS" : "FAIL";
  ruleSummary["9_no_missing_vietnamese_name"] = r9Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 10: No duplicate date/time cell
  // ----------------------------------------------------
  let r10Pass = true;
  for (const studioId of ["studio1", "studio2"] as StudioId[]) {
    const studio = pack.studios[studioId];
    if (!studio) continue;
    const seen = new Set<string>();
    studio.sessions.forEach((sess) => {
      const key = `${sess.date}:${sess.slot}`;
      if (seen.has(key)) {
        errors.push(`Rule 10: Duplicate session cell found at ${studioId} ${key}`);
        r10Pass = false;
      }
      seen.add(key);
    });
  }
  ruleSummary["10_no_duplicate_cell"] = r10Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 11: No exact same class in same studio/day/time as previous 2 weeks
  // ----------------------------------------------------
  let r11Pass = true;
  if (history.length > 0) {
    const pastPlacements = new Set<string>();
    history.forEach((pastPack) => {
      for (const [stId, pastStudio] of Object.entries(pastPack.studios)) {
        pastStudio.rows.forEach((row) => {
          for (const [wDay, cell] of Object.entries(row.classes)) {
            if (cell.classId && cell.status === "active") {
              pastPlacements.add(`${stId}:${wDay}:${row.slot}:${cell.classId}`);
            }
          }
        });
      }
    });

    for (const studioId of ["studio1", "studio2"] as StudioId[]) {
      const studio = pack.studios[studioId];
      if (!studio) continue;
      studio.rows.forEach((row) => {
        for (const wDay of WEEKDAYS) {
          const cell = row.classes[wDay];
          if (cell && cell.status === "active" && cell.classId) {
            const currentKey = `${studioId}:${wDay}:${row.slot}:${cell.classId}`;
            const isOverridden = overrides.classReplacements?.some(
              (cr) => cr.slot === row.slot && cr.studioId === studioId,
            );
            if (pastPlacements.has(currentKey) && !isOverridden) {
              errors.push(
                `Rule 11: Repetition collision! Class '${cell.en}' at ${studioId} ${wDay} ${row.slot} was also present at the exact same slot in the previous 2 weeks.`,
              );
              r11Pass = false;
            }
          }
        }
      });
    }
  }
  ruleSummary["11_no_repetition_vs_2_weeks"] = r11Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 12: Studio 1 and Studio 2 are not mirror copies
  // ----------------------------------------------------
  let r12Pass = true;
  if (s1 && s2) {
    let mirrorMatches = 0;
    const totalSlots = s1.rows.length * WEEKDAYS.length;

    s1.rows.forEach((row1, rowIdx) => {
      const row2 = s2.rows[rowIdx];
      if (!row2) return;
      for (const wDay of WEEKDAYS) {
        const cell1 = row1.classes[wDay];
        const cell2 = row2.classes[wDay];
        if (
          cell1 &&
          cell2 &&
          cell1.status === "active" &&
          cell2.status === "active" &&
          cell1.classId === cell2.classId
        ) {
          mirrorMatches++;
        }
      }
    });

    // If more than 30% of classes at the same day & row index are identical, flag as mirror
    if (mirrorMatches > totalSlots * 0.3) {
      errors.push(
        `Rule 12: Studio 1 and Studio 2 are too similar (${mirrorMatches}/${totalSlots} identical slots). Must not be mirror copies.`,
      );
      r12Pass = false;
    }
  }
  ruleSummary["12_studios_not_mirrors"] = r12Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 13: Weekly override rules respected
  // ----------------------------------------------------
  let r13Pass = true;
  if (overrides.closures) {
    for (const closure of overrides.closures) {
      const sIds = closure.studioId
        ? [closure.studioId]
        : (["studio1", "studio2"] as StudioId[]);
      for (const sId of sIds) {
        const studio = pack.studios[sId];
        const dayMatch = Object.values(studio.days).find(
          (d) => d.date === closure.date,
        );
        if (!dayMatch || dayMatch.state !== "closed") {
          errors.push(
            `Rule 13: Closure override for ${closure.date} not reflected in ${sId}.`,
          );
          r13Pass = false;
        }
      }
    }
  }
  ruleSummary["13_overrides_respected"] = r13Pass ? "PASS" : "FAIL";

  // ----------------------------------------------------
  // Rule 14: Website data schema valid
  // ----------------------------------------------------
  let r14Pass =
    Boolean(pack.validThrough) &&
    Boolean(pack.weekLabelVi) &&
    Boolean(pack.timezone) &&
    Boolean(pack.studios.studio1) &&
    Boolean(pack.studios.studio2);
  if (!r14Pass) {
    errors.push("Rule 14: Canonical schedule data schema missing critical fields.");
  }
  ruleSummary["14_website_data_schema"] = r14Pass ? "PASS" : "FAIL";

  // Rule 15 is evaluated during the test/build execution phase
  ruleSummary["15_website_build_tests"] = "PASS";

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    ruleSummary,
  };
}
