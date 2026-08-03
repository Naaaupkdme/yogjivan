// SOURCE OF TRUTH — Contact channels.
// Confirmed 2026-08-04.

const PHONE_E164 = "84782046066";

export const CONTACT = {
  phoneDisplay: "+84 782 046 066",
  phoneE164: `+${PHONE_E164}`,
  phoneTel: `+${PHONE_E164}`,
  whatsappE164: PHONE_E164,
  whatsapp: `https://wa.me/${PHONE_E164}`,
  zalo: `https://zalo.me/${PHONE_E164}`,
  email: "hello@yogjivan.com",
  responseTime: "Usually within a few hours",
  social: {
    facebook: "https://www.facebook.com/share/18ixNUN1J1/",
    instagram: "https://www.instagram.com/anil_yog_jivan",
    youtube: "https://youtube.com/@yogjivanvietnam",
  },
} as const;
