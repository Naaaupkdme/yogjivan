import { describe, it, expect } from "vitest";
import { generateWeeklySchedule } from "./engine/generator";
import { validateWeeklySchedule } from "./engine/validator";
import { renderStudioPosterSvg } from "./engine/poster-renderer";
import { syncScheduleToWebsite } from "./engine/sync-website";
import { CLASS_CATALOG } from "./config/class-catalog";
import { STUDIOS } from "./config/studios";
import { WEEKDAYS, PROPS_PER_ROW } from "./config/schedule-rules";
import * as fs from "fs";
import * as path from "path";

describe("Yog Jivan Weekly Schedule Engine & Validator", () => {
  const pack = generateWeeklySchedule({
    targetWeekMonday: "2026-10-19",
  });

  it("1. Generates 6-day Monday to Saturday schedule", () => {
    expect(pack.weekStart).toBe("2026-10-19");
    expect(pack.weekEnd).toBe("2026-10-24");
    expect(pack.studios.studio1).toBeDefined();
    expect(pack.studios.studio2).toBeDefined();
  });

  it("2. Strictly enforces EXACTLY 2 prop classes per row in both studios", () => {
    for (const sId of ["studio1", "studio2"] as const) {
      const studio = pack.studios[sId];
      expect(studio.rows).toHaveLength(5);

      studio.rows.forEach((row, rowIdx) => {
        let propCount = 0;
        WEEKDAYS.forEach((day) => {
          const cell = row.classes[day];
          if (cell && cell.status === "active" && cell.isProp) {
            propCount++;
          }
        });
        expect(
          propCount,
          `${sId} row ${rowIdx + 1} (${row.slot}) must have strictly 2 props`,
        ).toBe(PROPS_PER_ROW);
      });
    }
  });

  it("3. Studio 2 strictly forbids Aerial Yoga", () => {
    const s2 = pack.studios.studio2;
    s2.rows.forEach((row) => {
      WEEKDAYS.forEach((day) => {
        const cell = row.classes[day];
        expect(cell.classId).not.toBe("aerial_yoga");
        expect(cell.propType).not.toBe("aerial");
        expect(cell.en.toLowerCase()).not.toContain("aerial");
        expect(cell.vi.toLowerCase()).not.toContain("võng");
      });
    });
  });

  it("4. Studio 1 schedules 1–2 Aerial Yoga sessions per week", () => {
    const s1 = pack.studios.studio1;
    let aerialCount = 0;
    s1.rows.forEach((row) => {
      WEEKDAYS.forEach((day) => {
        const cell = row.classes[day];
        if (cell.classId === "aerial_yoga" || cell.propType === "aerial") {
          aerialCount++;
        }
      });
    });
    expect(aerialCount).toBeGreaterThanOrEqual(1);
    expect(aerialCount).toBeLessThanOrEqual(2);
  });

  it("5. Alternates Master Anil and Master Ravi as required", () => {
    const s1 = pack.studios.studio1;
    const s2 = pack.studios.studio2;

    expect(s1.teacherPattern.mon).toBe("Master Anil");
    expect(s1.teacherPattern.tue).toBe("Master Ravi");
    expect(s1.teacherPattern.wed).toBe("Master Anil");
    expect(s1.teacherPattern.thu).toBe("Master Ravi");
    expect(s1.teacherPattern.fri).toBe("Master Anil");
    expect(s1.teacherPattern.sat).toBe("Master Ravi");

    expect(s2.teacherPattern.mon).toBe("Master Ravi");
    expect(s2.teacherPattern.tue).toBe("Master Anil");
    expect(s2.teacherPattern.wed).toBe("Master Ravi");
    expect(s2.teacherPattern.thu).toBe("Master Anil");
    expect(s2.teacherPattern.fri).toBe("Master Ravi");
    expect(s2.teacherPattern.sat).toBe("Master Anil");
  });

  it("6. Every session has non-empty bilingual English and Vietnamese names", () => {
    for (const sId of ["studio1", "studio2"] as const) {
      const studio = pack.studios[sId];
      studio.sessions.forEach((sess) => {
        expect(sess.englishName.trim().length).toBeGreaterThan(0);
        expect(sess.vietnameseName.trim().length).toBeGreaterThan(0);
      });
    }
  });

  it("7. Validator passes clean schedule and catches illegal modifications", () => {
    const validation = validateWeeklySchedule(pack);
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);

    // Create mutated invalid pack with Studio 2 Aerial
    const brokenPack = JSON.parse(JSON.stringify(pack));
    brokenPack.studios.studio2.rows[0].classes.mon = {
      classId: "aerial_yoga",
      en: "Aerial Yoga",
      vi: "Yoga Võng",
      isProp: true,
      propType: "aerial",
      status: "active",
      teacher: "Master Ravi",
    };

    const brokenValidation = validateWeeklySchedule(brokenPack);
    expect(brokenValidation.valid).toBe(false);
    expect(
      brokenValidation.errors.some((e) => e.includes("Studio 2")),
    ).toBe(true);
  });

  it("8. Deterministic poster renderer outputs valid SVG with embedded QR", async () => {
    const s1Svg = await renderStudioPosterSvg(pack, "studio1");
    expect(s1Svg).toContain("<svg");
    expect(s1Svg).toContain("YOG JIVAN");
    expect(s1Svg).toContain("CƠ SỞ 1");
    expect(s1Svg).toContain("QUÉT MÃ ZALO");

    const s2Svg = await renderStudioPosterSvg(pack, "studio2");
    expect(s2Svg).toContain("<svg");
    expect(s2Svg).toContain("CƠ SỞ 2");
    expect(s2Svg).not.toContain("Võng Aerial");
  });
});
