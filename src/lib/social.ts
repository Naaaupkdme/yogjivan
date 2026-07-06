// Centralized social, contact and map URLs for Yog Jivan.
// Update once here — every CTA, icon and map link picks it up.

export const SOCIAL = {
  facebook: "https://www.facebook.com/share/18ixNUN1J1/",
  instagram: "https://www.instagram.com/anil_yog_jivan?igsh=MWR4eW50djRmb2J3cg==",
  youtube: "https://youtube.com/@yogjivanvietnam?si=MClExD8wRgaoWbvR",
  whatsapp: "https://wa.me/message/KZ43ESQDHVGWF1",
  whatsappE164: "84782046066",
  zalo: "https://zalo.me/84782046066",
  // Primary Google Maps link (Studio 1 — Yog Jivan Sanctuary)
  googleMaps: "https://maps.app.goo.gl/RL7HqgnGmT2fT2AF6",
  googleMapsStudio1: "https://maps.app.goo.gl/RL7HqgnGmT2fT2AF6",
  googleMapsStudio2: "https://maps.app.goo.gl/m51ySwjc94vUhn9r6?g_st=ac",
  // Place-specific embeds resolved from the verified GBP CIDs.
  googleMapsEmbed: "https://www.google.com/maps?cid=13987151036375826076&output=embed",
  googleMapsEmbedStudio1: "https://www.google.com/maps?cid=13987151036375826076&output=embed",
  googleMapsEmbedStudio2: "https://www.google.com/maps?cid=15652925256648780054&output=embed",
  phone: "+84 782 046 066",
  phoneTel: "+84782046066",
  email: "hello@yogjivan.com",
} as const;

export const STUDIO_ADDRESSES = {
  studio1: {
    name: "Yog Jivan Sanctuary",
    street: "Nha Thi Dau 1, Bui Thi Xuan",
    locality: "P. Le Thanh Nghi, Hai Duong City",
    region: "Hai Duong Province",
    postal: "170000",
    country: "VN",
    full: "Nha Thi Dau 1, Bui Thi Xuan, P. Le Thanh Nghi, Hai Duong City, Hai Duong Province, 170000, Vietnam",
    lat: 20.9373,
    lng: 106.3316,
  },
  studio2: {
    name: "Yog Jivan Wellness & Healing Center",
    street: "W8R8+42R, 5 Ngo Quyen, Thanh Dong",
    locality: "Hai Duong",
    region: "Hai Duong Province",
    postal: "170000",
    country: "VN",
    full: "W8R8+42R, 5 Ngo Quyen, Thanh Dong, Hai Duong, Hai Duong Province, Hai Phong 170000, Vietnam",
    lat: 20.9410,
    lng: 106.3260,
  },
} as const;
