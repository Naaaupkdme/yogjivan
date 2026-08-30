// SOURCE OF TRUTH — Hai Duong studio group-class schedule.
//
// Two distinct kinds of data live here:
//
//  1. RECURRING BATCH SLOTS (evergreen). The daily time windows each studio
//     runs Monday–Saturday. These are stable website facts.
//  2. A DATED weekly timetable (class themes + teacher on duty + day state).
//     Class themes, teacher assignment and holiday closures rotate every week,
//     so this block carries an explicit `validThrough`. After that date the UI
//     MUST fall back to the evergreen batch slots and ask the visitor to get
//     the new week on Zalo. Never present rotating themes as permanent.
//
// Aerial Yoga is Studio 1 only — never add it to Studio 2.

export type StudioScheduleId = "studio1" | "studio2";

export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type DayKey = (typeof DAY_KEYS)[number];

export const DAY_LABELS_VI: Record<DayKey, string> = {
  mon: "Thứ 2",
  tue: "Thứ 3",
  wed: "Thứ 4",
  thu: "Thứ 5",
  fri: "Thứ 6",
  sat: "Thứ 7",
};

/** Evergreen recurring batch times (Mon–Sat, Sunday closed). */
export const BATCH_SLOTS: Record<StudioScheduleId, readonly string[]> = {
  studio1: ["05:15–06:15", "06:30–07:30", "15:00–16:00", "17:15–18:15", "20:00–21:00"],
  studio2: ["05:00–06:00", "07:00–08:00", "15:30–16:30", "17:30–18:30", "19:45–20:45"],
};

export type ClassName = { en: string; vi: string };
/** A day either runs classes, is a holiday, or is closed for another reason. */
export type DayState = "active" | "holiday" | "closed";
export type DayStatus = { state: DayState; date: string; noteVi?: string };
/** A cell is absent when the day is not active. */
export type SlotRow = { slot: string; classes: Partial<Record<DayKey, ClassName>> };

const c = (en: string, vi: string): ClassName => ({ en, vi });

/** Dated weekly timetable — owner posters for 31/08/2026 – 05/09/2026. */
export const WEEKLY_TIMETABLE = {
  weekStart: "2026-08-31",
  weekEnd: "2026-09-05",
  /** Last day this rotating data may be shown as "this week". */
  validThrough: "2026-09-05T23:59:59+07:00",
  weekLabelVi: "31/08/2026 – 05/09/2026",
  dayStatus: {
    mon: { state: "active", date: "31/08" },
    tue: { state: "holiday", date: "01/09", noteVi: "Nghỉ lễ" },
    wed: { state: "holiday", date: "02/09", noteVi: "Nghỉ Lễ Quốc Khánh 2/9" },
    thu: { state: "active", date: "03/09" },
    fri: { state: "active", date: "04/09" },
    sat: { state: "active", date: "05/09" },
  } as Record<DayKey, DayStatus>,
  teacherByDay: {
    studio1: {
      mon: "Master Anil",
      thu: "Master Rakesh",
      fri: "Master Anil",
      sat: "Master Rakesh",
    },
    studio2: {
      mon: "Master Rakesh",
      thu: "Master Anil",
      fri: "Master Rakesh",
      sat: "Master Anil",
    },
  } as Record<StudioScheduleId, Partial<Record<DayKey, string>>>,
  rows: {
    studio1: [
      {
        slot: "05:15–06:15",
        classes: {
          mon: c("Hatha Yoga", "YOGA CƠ BẢN"),
          thu: c("Breath Flow", "DÒNG CHẢY HƠI THỞ"),
          fri: c("Mix Yoga", "YOGA TỔNG HỢP"),
          sat: c("Ashtanga Yoga", "ASHTANGA YOGA"),
        },
      },
      {
        slot: "06:30–07:30",
        classes: {
          mon: c("Mix Yoga", "YOGA TỔNG HỢP"),
          thu: c("Functional Warm-up", "KHỞI ĐỘNG CHỨC NĂNG"),
          fri: c("Dynamic Stretch Flow", "DÒNG CHẢY GIÃN CƠ ĐỘNG"),
          sat: c("Full Body Activation", "KÍCH HOẠT TOÀN THÂN"),
        },
      },
      {
        slot: "15:00–16:00",
        classes: {
          mon: c("Lower Body Mobility", "LINH HOẠT PHẦN DƯỚI"),
          thu: c("Back Mobility", "LINH HOẠT LƯNG TRÊN & DƯỚI"),
          fri: c("Hamstring Mobility", "LINH HOẠT GÂN KHEO"),
          sat: c("Rotation Mobility", "LINH HOẠT XOAY & VẶN"),
        },
      },
      {
        slot: "17:15–18:15",
        classes: {
          mon: c("Mix Yoga", "YOGA TỔNG HỢP"),
          thu: c("Ball Yoga", "YOGA BÓNG"),
          fri: c("Aerial Yoga", "YOGA VÕNG"),
          sat: c("Stick Yoga", "YOGA GẬY"),
        },
      },
      {
        slot: "20:00–21:00",
        classes: {
          mon: c("Core Strength", "SỨC MẠNH CỐT LÕI"),
          thu: c("Back Strength", "SỨC MẠNH LƯNG"),
          fri: c("Athletic Flow", "DÒNG CHẢY THỂ THAO"),
          sat: c("Functional Yoga", "YOGA CHỨC NĂNG"),
        },
      },
    ],
    studio2: [
      {
        slot: "05:00–06:00",
        classes: {
          mon: c("Power Yoga", "YOGA SỨC MẠNH TOÀN THÂN"),
          thu: c("Hatha Yoga", "HATHA YOGA CƠ BẢN"),
          fri: c("Vinyasa Flow", "DÒNG CHẢY UYỂN CHUYỂN"),
          sat: c("Flexibility Flow", "DẺO DAI TOÀN THÂN"),
        },
      },
      {
        slot: "07:00–08:00",
        classes: {
          mon: c("Cardio Yoga Flow", "CHUỖI YOGA CARDIO ĐỐT MỠ TOÀN THÂN"),
          thu: c("Strength Activation", "KÍCH HOẠT SỨC MẠNH"),
          fri: c("Energy Booster Yoga", "NĂNG LƯỢNG BỨT PHÁ"),
          sat: c("Full Body Activation", "KÍCH HOẠT TOÀN THÂN"),
        },
      },
      {
        slot: "15:30–16:30",
        classes: {
          mon: c("Upper Body Strength", "SỨC MẠNH THÂN TRÊN"),
          thu: c("Full Body Mobility", "LINH HOẠT TOÀN THÂN"),
          fri: c("Spine Mobility", "LINH HOẠT CỘT SỐNG"),
          sat: c("Rotation Mobility", "LINH HOẠT XOAY & VẶN"),
        },
      },
      {
        slot: "17:30–18:30",
        classes: {
          mon: c("Alignment Practice", "THỰC HÀNH CĂN CHỈNH"),
          thu: c("Wheel Yoga", "YOGA BÁNH XE LINH HOẠT"),
          fri: c("Stick Yoga", "YOGA GẬY"),
          sat: c("Block Yoga", "YOGA GẠCH"),
        },
      },
      {
        slot: "19:45–20:45",
        classes: {
          mon: c("Core Strength", "SỨC MẠNH CỐT LÕI"),
          thu: c("Athletic Flow", "DÒNG CHẢY THỂ THAO"),
          fri: c("Power Yoga", "YOGA SỨC MẠNH BÙNG NỔ"),
          sat: c("Balance Yoga", "CÂN BẰNG THÂN TÂM"),
        },
      },
    ],
  } as Record<StudioScheduleId, readonly SlotRow[]>,
} as const;

/**
 * True only while the dated weekly timetable is still the current week.
 * Once it expires the UI must show evergreen batch slots instead.
 */
export function isWeeklyTimetableCurrent(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(WEEKLY_TIMETABLE.validThrough).getTime();
}

/** Days in the current dated week that are closed, for a visible notice. */
export function closedDaysThisWeek(): { day: DayKey; status: DayStatus }[] {
  return DAY_KEYS.map((day) => ({ day, status: WEEKLY_TIMETABLE.dayStatus[day] })).filter(
    (d) => d.status.state !== "active",
  );
}

export const SCHEDULE_NOTE_VI =
  "Chủ đề lớp và giáo viên phụ trách có thể thay đổi theo từng tuần. Khung giờ lớp bên dưới là các ca cố định hằng tuần.";

export const SCHEDULE_ZALO_CTA_VI = "Nhận lịch tuần mới trên Zalo";
