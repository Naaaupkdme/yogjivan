import type { StudioId } from "./config/studios";
import type { WeekdayKey } from "./config/schedule-rules";
import type { PropType } from "./config/class-catalog";

export interface ScheduleSession {
  date: string; // YYYY-MM-DD
  dateDisplayVi: string; // DD/MM
  weekday: WeekdayKey;
  weekdayLabelVi: string;
  slot: string; // e.g. "05:15–06:15"
  start: string; // "05:15"
  end: string; // "06:15"
  classId: string;
  englishName: string;
  vietnameseName: string;
  teacher: string;
  isProp: boolean;
  propType?: PropType;
  status: "active" | "holiday" | "closed" | "replaced";
  noteVi?: string;
}

export interface DayOverview {
  date: string; // YYYY-MM-DD
  dateDisplayVi: string; // DD/MM
  state: "active" | "holiday" | "closed";
  teacher: string;
  noteVi?: string;
}

export interface StudioWeeklySchedule {
  studioId: StudioId;
  studioName: string;
  address: string;
  teacherPattern: Record<WeekdayKey, string>;
  timeSlots: readonly string[];
  days: Record<WeekdayKey, DayOverview>;
  sessions: ScheduleSession[];
  rows: {
    slot: string;
    classes: Record<
      WeekdayKey,
      {
        classId: string;
        en: string;
        vi: string;
        isProp: boolean;
        propType?: PropType;
        teacher: string;
        status: "active" | "holiday" | "closed" | "replaced";
        noteVi?: string;
      }
    >;
  }[];
}

export interface SpecialEvent {
  id: string;
  titleEn: string;
  titleVi: string;
  date: string;
  time: string;
  studioId?: StudioId;
  locationVi: string;
  teacherOrHost: string;
  descriptionVi?: string;
  badgeVi?: string;
}

export interface WeeklySchedulePack {
  weekStart: string; // YYYY-MM-DD (Monday)
  weekEnd: string; // YYYY-MM-DD (Saturday)
  weekLabelVi: string; // e.g. "19/10/2026 – 24/10/2026"
  validThrough: string; // ISO string with +07:00
  timezone: string;
  generatedAt: string;
  overridesApplied: string[];
  specialEvents: SpecialEvent[];
  studios: Record<StudioId, StudioWeeklySchedule>;
}

export interface WeeklyOverrides {
  weekStart?: string;
  closures?: {
    date: string;
    studioId?: StudioId;
    reasonVi: string;
  }[];
  holidays?: {
    date: string;
    nameVi: string;
  }[];
  teacherReplacements?: {
    date: string;
    studioId: StudioId;
    substituteTeacher: string;
    reasonVi?: string;
  }[];
  classReplacements?: {
    date: string;
    slot: string;
    studioId: StudioId;
    newClassId: string;
    reasonVi?: string;
  }[];
  specialEvents?: SpecialEvent[];
  customMarketingMessageVi?: string;
}
