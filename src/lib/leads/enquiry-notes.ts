import { z } from "zod";

// HTML maxlength and Zod both count UTF-16 code units. Preserve valid input
// verbatim (including whitespace and Vietnamese combining marks).
export const SHARED_NOTES_MAX = 300;
export const ORGANIZER_NOTES_MAX = 400;
export const sharedNotesSchema = z.string().max(SHARED_NOTES_MAX).optional();
export const organizerNotesSchema = z.string().max(ORGANIZER_NOTES_MAX).optional();