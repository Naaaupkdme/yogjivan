export type StudioId = "studio1" | "studio2";

export interface StudioConfig {
  id: StudioId;
  name: string;
  vietnameseName: string;
  address: string;
  city: string;
  timeSlots: readonly string[];
  teacherPattern: Record<string, string>; // day: mon, tue, wed, thu, fri, sat
  supportsAerial: boolean;
  minAerialPerWeek: number;
  maxAerialPerWeek: number;
  supportedProps: readonly string[];
}

export const STUDIOS: Record<StudioId, StudioConfig> = {
  studio1: {
    id: "studio1",
    name: "Studio 1 — Yog Jivan Sanctuary",
    vietnameseName: "Cơ sở 1 — Nhà Thi Đấu",
    address: "Tầng 1 Nhà Thi Đấu Số 1, Bùi Thị Xuân, TP. Hải Dương",
    city: "Hải Phòng / Hải Dương",
    timeSlots: [
      "05:15–06:15",
      "06:30–07:30",
      "15:00–16:00",
      "17:15–18:15",
      "20:00–21:00",
    ],
    teacherPattern: {
      mon: "Master Anil",
      tue: "Master Ravi",
      wed: "Master Anil",
      thu: "Master Ravi",
      fri: "Master Anil",
      sat: "Master Ravi",
    },
    supportsAerial: true,
    minAerialPerWeek: 1,
    maxAerialPerWeek: 2,
    supportedProps: [
      "aerial",
      "wheel",
      "ball",
      "block",
      "stick",
      "strap",
      "partner",
    ],
  },
  studio2: {
    id: "studio2",
    name: "Studio 2 — Yog Jivan Yoga Studio",
    vietnameseName: "Cơ sở 2 — Nhà Văn Hóa Lao Động",
    address: "Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền, TP. Hải Dương",
    city: "Hải Phòng / Hải Dương",
    timeSlots: [
      "05:00–06:00",
      "07:00–08:00",
      "15:30–16:30",
      "17:30–18:30",
      "19:45–20:45",
    ],
    teacherPattern: {
      mon: "Master Ravi",
      tue: "Master Anil",
      wed: "Master Ravi",
      thu: "Master Anil",
      fri: "Master Ravi",
      sat: "Master Anil",
    },
    supportsAerial: false,
    minAerialPerWeek: 0,
    maxAerialPerWeek: 0,
    supportedProps: [
      "wheel",
      "ball",
      "block",
      "stick",
      "strap",
      "partner",
    ],
  },
};
