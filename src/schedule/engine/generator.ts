import { STUDIOS, type StudioId } from "../config/studios";
import {
  CLASS_CATALOG,
  type ClassDefinition,
  type PropType,
} from "../config/class-catalog";
import {
  WEEKDAYS,
  WEEKDAY_LABELS_VI,
  ROW_ENERGY_RULES,
  PROPS_PER_ROW,
  SCHEDULE_TIMEZONE,
  type WeekdayKey,
} from "../config/schedule-rules";
import type {
  WeeklySchedulePack,
  StudioWeeklySchedule,
  ScheduleSession,
  WeeklyOverrides,
} from "../types";
import * as fs from "fs";
import * as path from "path";

export interface GenerateOptions {
  targetWeekMonday?: string; // YYYY-MM-DD
  historyDir?: string;
  overrides?: WeeklyOverrides;
  seed?: number;
}

/**
 * Calculates upcoming Monday date string (YYYY-MM-DD) from a given reference date.
 * If reference date is already Monday, returns that Monday if upcoming is false,
 * otherwise for Sunday morning runs, returns the next day (Monday).
 */
export function getUpcomingMonday(refDate: Date = new Date()): string {
  const d = new Date(refDate);
  const day = d.getDay(); // 0 is Sunday, 1 is Monday
  const daysUntilMonday = day === 0 ? 1 : (8 - day) % 7;
  d.setDate(d.getDate() + (daysUntilMonday === 0 && day === 1 ? 0 : daysUntilMonday));
  return d.toISOString().split("T")[0]!;
}

/**
 * Generates array of 6 ISO date strings (Monday to Saturday).
 */
export function getMondayToSaturdayDates(mondayIso: string): {
  weekday: WeekdayKey;
  date: string;
  dateDisplayVi: string;
}[] {
  const parts = mondayIso.split("-").map(Number);
  const startDate = new Date(parts[0]!, parts[1]! - 1, parts[2]!);

  return WEEKDAYS.map((weekday, index) => {
    const cur = new Date(startDate);
    cur.setDate(startDate.getDate() + index);
    const y = cur.getFullYear();
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    const d = String(cur.getDate()).padStart(2, "0");
    return {
      weekday,
      date: `${y}-${m}-${d}`,
      dateDisplayVi: `${d}/${m}`,
    };
  });
}

/**
 * Loads up to 2 most recent weeks of schedule history from history directory.
 */
export function loadScheduleHistory(historyDir: string): WeeklySchedulePack[] {
  if (!fs.existsSync(historyDir)) {
    return [];
  }
  const files = fs
    .readdirSync(historyDir)
    .filter((f) => f.endsWith(".json") && f.startsWith("week-"))
    .sort()
    .reverse();

  const history: WeeklySchedulePack[] = [];
  for (const file of files.slice(0, 2)) {
    try {
      const raw = fs.readFileSync(path.join(historyDir, file), "utf-8");
      history.push(JSON.parse(raw));
    } catch {
      // ignore unparseable history file
    }
  }
  return history;
}

/**
 * Core rotation and schedule generation engine.
 */
export function generateWeeklySchedule(
  options: GenerateOptions = {},
): WeeklySchedulePack {
  const targetMonday = options.targetWeekMonday || getUpcomingMonday();
  const dateList = getMondayToSaturdayDates(targetMonday);
  const saturdayDate = dateList[5]!.date;

  const mStartParts = targetMonday.split("-");
  const mEndParts = saturdayDate.split("-");
  const weekLabelVi = `${mStartParts[2]}/${mStartParts[1]}/${mStartParts[0]} – ${mEndParts[2]}/${mEndParts[1]}/${mEndParts[0]}`;
  const validThrough = `${saturdayDate}T23:59:59+07:00`;

  const history = options.historyDir
    ? loadScheduleHistory(options.historyDir)
    : [];

  const overrides = options.overrides || {};
  const overridesApplied: string[] = [];

  // Track recent class placements: Set of "studioId:weekday:slot:classId"
  const recentPlacements = new Set<string>();
  for (const pastWeek of history) {
    for (const [sId, studioSched] of Object.entries(pastWeek.studios)) {
      for (const row of studioSched.rows) {
        for (const [wDay, cell] of Object.entries(row.classes)) {
          if (cell.classId && cell.status === "active") {
            recentPlacements.add(`${sId}:${wDay}:${row.slot}:${cell.classId}`);
          }
        }
      }
    }
  }

  // Pre-planned staggered prop day pairs for adjacent rows (Row 1..5)
  // Ensures adjacent rows have different prop days and staggered rhythm
  const propDayStaggerPattern: Record<StudioId, WeekdayKey[][]> = {
    studio1: [
      ["tue", "fri"], // Row 1
      ["wed", "sat"], // Row 2
      ["mon", "thu"], // Row 3
      ["tue", "sat"], // Row 4
      ["wed", "fri"], // Row 5
    ],
    studio2: [
      ["mon", "thu"], // Row 1
      ["tue", "fri"], // Row 2
      ["wed", "sat"], // Row 3
      ["mon", "fri"], // Row 4
      ["tue", "sat"], // Row 5
    ],
  };

  const propPoolByStudio: Record<StudioId, ClassDefinition[]> = {
    studio1: Object.values(CLASS_CATALOG).filter(
      (c) => c.isProp && c.id !== "aerial_yoga",
    ),
    studio2: Object.values(CLASS_CATALOG).filter(
      (c) => c.isProp && !c.studio1Only && c.propType !== "aerial",
    ),
  };

  const generatedStudios: Record<StudioId, StudioWeeklySchedule> = {} as any;

  // Track classes picked for current week to avoid mirror copies across studios
  const classesByWeekdayAndRowStudio1: Record<string, string> = {};

  for (const studioId of ["studio1", "studio2"] as StudioId[]) {
    const studioConfig = STUDIOS[studioId];
    const timeSlots = studioConfig.timeSlots;
    const teacherPattern = studioConfig.teacherPattern as Record<WeekdayKey, string>;

    const daysOverview: Record<WeekdayKey, any> = {} as any;
    for (const d of dateList) {
      const isHoliday = overrides.holidays?.find((h) => h.date === d.date);
      const isClosed = overrides.closures?.find(
        (c) => c.date === d.date && (!c.studioId || c.studioId === studioId),
      );
      const teacherOverride = overrides.teacherReplacements?.find(
        (t) => t.date === d.date && t.studioId === studioId,
      );

      let state: "active" | "holiday" | "closed" = "active";
      let noteVi: string | undefined = undefined;

      if (isClosed) {
        state = "closed";
        noteVi = isClosed.reasonVi;
        overridesApplied.push(`Closure ${d.date} (${studioId}): ${isClosed.reasonVi}`);
      } else if (isHoliday) {
        state = "holiday";
        noteVi = isHoliday.nameVi;
        overridesApplied.push(`Holiday ${d.date}: ${isHoliday.nameVi}`);
      }

      daysOverview[d.weekday] = {
        date: d.date,
        dateDisplayVi: d.dateDisplayVi,
        state,
        teacher: teacherOverride?.substituteTeacher || teacherPattern[d.weekday],
        noteVi,
      };
    }

    const rows: StudioWeeklySchedule["rows"] = [];
    const sessions: ScheduleSession[] = [];

    let studio1AerialScheduled = 0;
    const usedClassIdsInStudio = new Set<string>();

    for (let rowIdx = 0; rowIdx < timeSlots.length; rowIdx++) {
      const rowNumber = rowIdx + 1;
      const slot = timeSlots[rowIdx]!;
      const [startTime, endTime] = slot.split("–");

      const propDays = propDayStaggerPattern[studioId][rowIdx]!;
      const rowClasses: StudioWeeklySchedule["rows"][0]["classes"] = {} as any;

      // Select props for the 2 designated prop days in this row, avoiding past 2 weeks repetition
      const selectedProps: ClassDefinition[] = [];

      for (let pIdx = 0; pIdx < propDays.length; pIdx++) {
        const pDay = propDays[pIdx]!;
        let chosenProp: ClassDefinition | null = null;

        // Check if Aerial should be scheduled in Studio 1 (e.g. Row 2 or Row 4, max 2)
        if (
          studioId === "studio1" &&
          studio1AerialScheduled < studioConfig.maxAerialPerWeek &&
          (rowNumber === 2 || rowNumber === 4) &&
          !selectedProps.some((p) => p.propType === "aerial")
        ) {
          const aerialCandidate = CLASS_CATALOG.aerial_yoga!;
          const placementKey = `${studioId}:${pDay}:${slot}:${aerialCandidate.id}`;
          if (!recentPlacements.has(placementKey)) {
            chosenProp = aerialCandidate;
            studio1AerialScheduled++;
          }
        }

        if (!chosenProp) {
          // Iterate over available props for this studio
          const pool = propPoolByStudio[studioId];
          let offset = (rowIdx * 3 + pIdx * 4 + (studioId === "studio2" ? 5 : 0)) % pool.length;
          let attempts = 0;

          while (attempts < pool.length) {
            const candidate = pool[offset % pool.length]!;
            offset++;
            attempts++;

            const placementKey = `${studioId}:${pDay}:${slot}:${candidate.id}`;
            const sameTypeAlreadyInRow = selectedProps.some(
              (p) => p.propType === candidate.propType,
            );

            if (!sameTypeAlreadyInRow && !recentPlacements.has(placementKey)) {
              chosenProp = candidate;
              break;
            }
          }

          if (!chosenProp) {
            // Fallback to first available with different propType
            chosenProp = pool.find(
              (p) => !selectedProps.some((sp) => sp.propType === p.propType),
            ) || pool[0]!;
          }
        }

        selectedProps.push(chosenProp);
      }

      // Candidate non-prop pool for this row
      const candidateNonProps = Object.values(CLASS_CATALOG).filter(
        (c) =>
          !c.isProp &&
          c.suitableRows.includes(rowNumber) &&
          !c.studio1Only,
      );

      let nonPropIdx = (rowIdx * 5 + (studioId === "studio2" ? 7 : 0)) % candidateNonProps.length;

      for (let dayIdx = 0; dayIdx < dateList.length; dayIdx++) {
        const { weekday, date, dateDisplayVi } = dateList[dayIdx]!;
        const dayState = daysOverview[weekday].state;
        const teacher = daysOverview[weekday].teacher;

        // Check explicit class replacement override
        const classOverride = overrides.classReplacements?.find(
          (cr) => cr.date === date && cr.slot === slot && cr.studioId === studioId,
        );

        let chosenClass: ClassDefinition;

        if (classOverride && CLASS_CATALOG[classOverride.newClassId]) {
          chosenClass = CLASS_CATALOG[classOverride.newClassId]!;
          overridesApplied.push(
            `Override ${date} ${slot} (${studioId}): ${chosenClass.english}`,
          );
        } else if (propDays.includes(weekday)) {
          const pIndex = propDays.indexOf(weekday);
          chosenClass = selectedProps[pIndex] || selectedProps[0]!;
        } else {
          // Find suitable non-prop avoiding recent 2-week history and studio-1 duplication
          let attempts = 0;
          let found: ClassDefinition | null = null;
          while (attempts < candidateNonProps.length) {
            const candidate = candidateNonProps[nonPropIdx % candidateNonProps.length]!;
            nonPropIdx++;
            attempts++;

            const placementKey = `${studioId}:${weekday}:${slot}:${candidate.id}`;
            const mirrorKey = `${weekday}:${rowIdx}`;
            const isStudio1Mirror =
              studioId === "studio2" &&
              classesByWeekdayAndRowStudio1[mirrorKey] === candidate.id;

            if (
              !recentPlacements.has(placementKey) &&
              !isStudio1Mirror &&
              !usedClassIdsInStudio.has(`${candidate.id}:${weekday}`)
            ) {
              found = candidate;
              break;
            }
          }
          chosenClass = found || candidateNonProps[nonPropIdx % candidateNonProps.length]!;
          nonPropIdx++;
        }

        if (studioId === "studio1") {
          classesByWeekdayAndRowStudio1[`${weekday}:${rowIdx}`] = chosenClass.id;
        }
        usedClassIdsInStudio.add(`${chosenClass.id}:${weekday}`);

        const sessionStatus = dayState === "active" ? "active" : dayState;
        const noteVi = daysOverview[weekday].noteVi;

        rowClasses[weekday] = {
          classId: chosenClass.id,
          en: chosenClass.english,
          vi: chosenClass.vietnamese,
          isProp: chosenClass.isProp,
          propType: chosenClass.propType,
          teacher,
          status: sessionStatus,
          noteVi,
        };

        sessions.push({
          date,
          dateDisplayVi,
          weekday,
          weekdayLabelVi: WEEKDAY_LABELS_VI[weekday],
          slot,
          start: startTime?.trim() || "",
          end: endTime?.trim() || "",
          classId: chosenClass.id,
          englishName: chosenClass.english,
          vietnameseName: chosenClass.vietnamese,
          teacher,
          isProp: chosenClass.isProp,
          propType: chosenClass.propType,
          status: sessionStatus,
          noteVi,
        });
      }

      rows.push({
        slot,
        classes: rowClasses,
      });
    }

    generatedStudios[studioId] = {
      studioId,
      studioName: studioConfig.name,
      address: studioConfig.address,
      teacherPattern,
      timeSlots,
      days: daysOverview,
      sessions,
      rows,
    };
  }

  return {
    weekStart: targetMonday,
    weekEnd: saturdayDate,
    weekLabelVi,
    validThrough,
    timezone: SCHEDULE_TIMEZONE,
    generatedAt: new Date().toISOString(),
    overridesApplied: Array.from(new Set(overridesApplied)),
    specialEvents: overrides.specialEvents || [],
    studios: generatedStudios,
  };
}
