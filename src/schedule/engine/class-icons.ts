/**
 * SVG icons matching the approved Yog Jivan visual timetable icons.
 */
export const CLASS_ICONS: Record<string, string> = {
  sunrise: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>`,
  lotus: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#10B981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 4c1.5 3 4 5 7 5-2 3-5 5-7 9-2-4-5-6-7-9 3 0 5.5-2 7-5Z"/><path d="M12 18c-3-2-6-1-8 2 3 1 6 0 8-2Z"/><path d="M12 18c3-2 6-1 8 2-3 1-6 0-8-2Z"/>
  </svg>`,
  strap: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 4a3 3 0 0 1 6 0v16a3 3 0 0 1-6 0V4Z"/><path d="M11 7h4a3 3 0 0 1 0 6h-4"/>
  </svg>`,
  stick: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round">
    <line x1="4" y1="20" x2="20" y2="4"/><circle cx="5" cy="19" r="1.5" fill="#EA580C"/><circle cx="19" cy="5" r="1.5" fill="#EA580C"/>
  </svg>`,
  block: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5">
    <polygon points="12 3 21 8 12 13 3 8 12 3"/><polygon points="21 8 21 16 12 21 12 13 21 8" fill="#DC2626"/><polygon points="3 8 3 16 12 21 12 13 3 8" fill="#B91C1C"/>
  </svg>`,
  ball: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#F97316">
    <circle cx="12" cy="12" r="9" stroke="#C2410C" stroke-width="1.5"/><ellipse cx="10" cy="9" rx="3" ry="2" fill="#FFEDD5" opacity="0.6"/>
  </svg>`,
  wheel: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#F97316" stroke-width="2.2">
    <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5" stroke-width="1.5"/>
  </svg>`,
  aerial: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round">
    <path d="M8 2 L12 9 L16 2"/><path d="M10 9 Q12 18 12 22 Q12 18 14 9"/><ellipse cx="12" cy="14" rx="4" ry="7" stroke-width="1.5"/>
  </svg>`,
  partner: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#EA580C" stroke-width="1.8" stroke-linecap="round">
    <circle cx="8" cy="6" r="2.5"/><path d="M4 18v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/><circle cx="16" cy="6" r="2.5"/><path d="M14 18v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
  </svg>`,
  seated: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="5" r="2.5"/><path d="M12 8v6"/><path d="M6 18l3-3 3 1 3-1 3 3"/><path d="M8 12l4 1 4-1"/>
  </svg>`,
  warrior: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#DC2626" stroke-width="1.8" stroke-linecap="round">
    <circle cx="12" cy="4" r="2"/><path d="M12 6v6l4 2 2 6"/><path d="M12 12l-4 2-2 6"/><path d="M5 8l7-1 7 1"/>
  </svg>`,
  balance: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round">
    <circle cx="12" cy="4" r="2"/><path d="M12 6v9"/><path d="M12 15l-3 6"/><path d="M12 11l-4-2"/><path d="M12 11l4 2 3-1"/>
  </svg>`,
  stretch: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round">
    <circle cx="7" cy="7" r="2"/><path d="M7 9v4l8 6 4-2"/><path d="M7 13l-4 3"/>
  </svg>`,
  spine: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#059669" stroke-width="1.8" stroke-linecap="round">
    <path d="M12 3c-1 2 1 3 0 5s-1 3 0 5 1 3 0 5-1 3 0 3"/><circle cx="12" cy="3" r="1.2" fill="#059669"/><circle cx="12" cy="8" r="1.2" fill="#059669"/><circle cx="12" cy="13" r="1.2" fill="#059669"/><circle cx="12" cy="18" r="1.2" fill="#059669"/>
  </svg>`,
  infinity: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7C3AED" stroke-width="2.2" stroke-linecap="round">
    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.267-8-12.362-8-5.096 0-5.096 8 0 8 5.095 0 7.267-8 12.362-8Z"/>
  </svg>`,
};

/**
 * Returns matching SVG icon string for a given class ID or category.
 */
export function getIconForClass(classId: string, propType?: string): string {
  if (propType) {
    if (propType === "strap") return CLASS_ICONS.strap!;
    if (propType === "stick") return CLASS_ICONS.stick!;
    if (propType === "block") return CLASS_ICONS.block!;
    if (propType === "ball") return CLASS_ICONS.ball!;
    if (propType === "wheel") return CLASS_ICONS.wheel!;
    if (propType === "aerial") return CLASS_ICONS.aerial!;
    if (propType === "partner") return CLASS_ICONS.partner!;
  }

  if (classId.includes("sunrise") || classId.includes("morning")) return CLASS_ICONS.sunrise!;
  if (classId.includes("spine")) return CLASS_ICONS.spine!;
  if (classId.includes("power") || classId.includes("strength")) return CLASS_ICONS.warrior!;
  if (classId.includes("balance") || classId.includes("stability")) return CLASS_ICONS.balance!;
  if (classId.includes("stretch") || classId.includes("flexibility")) return CLASS_ICONS.stretch!;
  if (classId.includes("mix")) return CLASS_ICONS.infinity!;
  if (classId.includes("yin") || classId.includes("restore") || classId.includes("breath")) return CLASS_ICONS.lotus!;

  return CLASS_ICONS.seated!;
}
