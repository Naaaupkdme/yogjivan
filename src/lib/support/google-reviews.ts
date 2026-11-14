// Google Business Profile reviews helper for Yog Jivan studios.
// Neutral, un-gated links directly to Google Maps reviews.

import { LOCATIONS } from "@/lib/facts/locations";

export const GOOGLE_STUDIO_REVIEWS = [
  {
    studioId: "sanctuary",
    nameEn: "Yog Jivan Sanctuary (Studio 1)",
    nameVi: "Cơ sở 1 · Yog Jivan Sanctuary",
    addressEn: "Tầng 1 Nhà Thi Đấu Số 1, Bùi Thị Xuân, Phường Lê Thanh Nghị, Hai Phong",
    addressVi: "Tầng 1 Nhà Thi Đấu Số 1, Bùi Thị Xuân, Phường Lê Thanh Nghị, Hải Phòng",
    reviewUrl: LOCATIONS.studio1.googleMaps,
    featuresEn: "Classical Hatha, Aerial Yoga, Meditation",
    featuresVi: "Hatha truyền thống, Yoga võng/bay, Thiền định",
  },
  {
    studioId: "wellness",
    nameEn: "Yog Jivan Yoga Studio (Studio 2)",
    nameVi: "Cơ sở 2 · Yog Jivan Yoga Studio",
    addressEn: "Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền, Phường Thành Đông, Hai Phong",
    addressVi: "Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền, Phường Thành Đông, Hải Phòng",
    reviewUrl: LOCATIONS.studio2.googleMaps,
    featuresEn: "Community classes, Posture therapy, Mat practice",
    featuresVi: "Lớp cộng đồng, Trị liệu cột sống, Tập trên thảm",
  },
] as const;

/** Check if current route is online-only */
export function isOnlineOnlyRoute(path?: string): boolean {
  if (!path) return false;
  const p = path.toLowerCase();
  return (
    p.includes("online") ||
    p.includes("private") ||
    p.includes("couples") ||
    p.includes("family")
  );
}
