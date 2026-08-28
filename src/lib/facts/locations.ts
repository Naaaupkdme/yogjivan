// SOURCE OF TRUTH — Studio locations.
//
// ADMINISTRATIVE NOTE (confirmed 2026-08-04):
// The former Hai Duong province merged into Hai Phong effective 2025-07-01.
// Formal address / schema fields MUST use the current city "Thành phố Hải Phòng" / "Hai Phong".
// Keep the words "Hai Duong" only as a NATURAL local-search descriptor
// ("Hai Duong urban area") — never as "Hai Duong Province".

export const LOCATIONS = {
  studio1: {
    id: "sanctuary",
    name: "Yog Jivan Sanctuary",
    street: "Tầng 1 Nhà Thi Đấu Số 1, Bùi Thị Xuân",
    ward: "Phường Lê Thanh Nghị",
    city: "Thành phố Hải Phòng",
    cityEn: "Hai Phong",
    postal: "170000",
    country: "VN",
    countryName: "Vietnam",
    full: "Tầng 1 Nhà Thi Đấu Số 1, Bùi Thị Xuân, Phường Lê Thanh Nghị, Thành phố Hải Phòng 170000, Vietnam",
    /** Natural wording customers still search by. Not an administrative unit. */
    localDescriptor: "Hai Duong urban area",
    aerialYoga: true,
    googleMaps: "https://maps.app.goo.gl/9GymWfE5M164VfDE8?g_st=ac",
    googleMapsEmbed: "https://www.google.com/maps?cid=13987151036375826076&output=embed",
    lat: 20.9373,
    lng: 106.3316,
  },
  studio2: {
    id: "wellness",
    name: "Yog Jivan Yoga Studio",
    street: "Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền",
    ward: "Phường Thành Đông",
    city: "Thành phố Hải Phòng",
    cityEn: "Hai Phong",
    postal: "170000",
    country: "VN",
    countryName: "Vietnam",
    full: "Tầng 3, Nhà Văn Hóa Lao Động, Ngô Quyền, Phường Thành Đông, Thành phố Hải Phòng 170000, Vietnam",
    localDescriptor: "Hai Duong urban area",
    aerialYoga: false,
    googleMaps: "https://maps.app.goo.gl/dRBFCrbmcX4yhEt9A",
    googleMapsEmbed: "https://www.google.com/maps?cid=15652925256648780054&output=embed",
    lat: 20.9410,
    lng: 106.3260,
  },
} as const;

export const STUDIO_LIST = [LOCATIONS.studio1, LOCATIONS.studio2] as const;

export const STUDIO_HOURS = {
  label: "Daily · 5:00 AM – 9:00 PM",
  opens: "05:00",
  closes: "21:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
} as const;

/** Safe, human phrasing for "where are you" copy. */
export const AREA_PHRASE = "the Hai Duong urban area of Hai Phong, Vietnam";
