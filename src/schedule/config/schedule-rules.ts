import type { StudioId } from "./studios";

export const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type WeekdayKey = (typeof WEEKDAYS)[number];

export const WEEKDAY_LABELS_EN: Record<WeekdayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

export const WEEKDAY_LABELS_VI: Record<WeekdayKey, string> = {
  mon: "Thứ 2",
  tue: "Thứ 3",
  wed: "Thứ 4",
  thu: "Thứ 5",
  fri: "Thứ 6",
  sat: "Thứ 7",
};

export interface RowEnergyRule {
  rowNumber: number; // 1 to 5
  name: string;
  propsRequired: number; // strictly 2
  allowedCategories: readonly string[];
  description: string;
}

export const ROW_ENERGY_RULES: Record<number, RowEnergyRule> = {
  1: {
    rowNumber: 1,
    name: "Early Morning First Batch",
    propsRequired: 2,
    allowedCategories: ["gentle", "mobility", "classical", "mindfulness", "flow", "props"],
    description: "Gentle activation, mobility, Hatha, breath, accessible practice.",
  },
  2: {
    rowNumber: 2,
    name: "Second Morning Batch",
    propsRequired: 2,
    allowedCategories: ["classical", "strength", "flow", "mobility", "props"],
    description: "Classical yoga, strength, balance, Vinyasa, functional work.",
  },
  3: {
    rowNumber: 3,
    name: "Afternoon Batch",
    propsRequired: 2,
    allowedCategories: ["mobility", "recovery", "props"],
    description: "Mobility, body-care, stretching, back, hip, shoulder, functional work.",
  },
  4: {
    rowNumber: 4,
    name: "Early Evening Batch",
    propsRequired: 2,
    allowedCategories: ["flow", "strength", "mobility", "classical", "props"],
    description: "Active: Vinyasa, Power, Mix, Strength, Balance, Mobility, skill work.",
  },
  5: {
    rowNumber: 5,
    name: "Last Evening Batch",
    propsRequired: 2,
    allowedCategories: ["gentle", "recovery", "mindfulness", "flow", "classical", "props"],
    description: "Calmer restorative mix: Hatha, Mix, Gentle Flow, Yin, Breath, Stretch, Restore.",
  },
};

export const SCHEDULE_TIMEZONE = "Asia/Ho_Chi_Minh";
export const SCHEDULE_CRON = "0 8 * * 0"; // Every Sunday at 08:00 AM Vietnam time
export const PROPS_PER_ROW = 2; // EXACTLY TWO PROP-BASED CLASSES PER ROW
export const WEEKS_COOLDOWN_HISTORY = 2; // Cooldown for same studio/day/time
