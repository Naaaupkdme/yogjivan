// Compatibility layer over the content source of truth in "@/lib/facts".
// NOTE: do not add new values here — add them to src/lib/facts/* instead.

import { CONTACT } from "@/lib/facts/contact";
import { LOCATIONS } from "@/lib/facts/locations";

export const SOCIAL = {
  facebook: CONTACT.social.facebook,
  instagram: CONTACT.social.instagram,
  youtube: CONTACT.social.youtube,
  whatsapp: CONTACT.whatsapp,
  whatsappE164: CONTACT.whatsappE164,
  zalo: CONTACT.zalo,
  // Primary Google Maps link (Studio 1 — Yog Jivan Sanctuary)
  googleMaps: LOCATIONS.studio1.googleMaps,
  googleMapsStudio1: LOCATIONS.studio1.googleMaps,
  googleMapsStudio2: LOCATIONS.studio2.googleMaps,
  googleMapsEmbed: LOCATIONS.studio1.googleMapsEmbed,
  googleMapsEmbedStudio1: LOCATIONS.studio1.googleMapsEmbed,
  googleMapsEmbedStudio2: LOCATIONS.studio2.googleMapsEmbed,
  phone: CONTACT.phoneDisplay,
  phoneTel: CONTACT.phoneTel,
  email: CONTACT.email,
} as const;

export const STUDIO_ADDRESSES = {
  studio1: {
    name: LOCATIONS.studio1.name,
    street: LOCATIONS.studio1.street,
    locality: LOCATIONS.studio1.ward,
    region: LOCATIONS.studio1.cityEn,
    postal: LOCATIONS.studio1.postal,
    country: LOCATIONS.studio1.country,
    full: LOCATIONS.studio1.full,
    lat: LOCATIONS.studio1.lat,
    lng: LOCATIONS.studio1.lng,
  },
  studio2: {
    name: LOCATIONS.studio2.name,
    street: LOCATIONS.studio2.street,
    locality: LOCATIONS.studio2.ward,
    region: LOCATIONS.studio2.cityEn,
    postal: LOCATIONS.studio2.postal,
    country: LOCATIONS.studio2.country,
    full: LOCATIONS.studio2.full,
    lat: LOCATIONS.studio2.lat,
    lng: LOCATIONS.studio2.lng,
  },
} as const;
