import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getContactInfo from "./tools/get-contact-info";
import listFaqs from "./tools/list-faqs";
import listStudios from "./tools/list-studios";
import submitConsultationRequest from "./tools/submit-consultation-request";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "yog-jivan-mcp",
  title: "Yog Jivan Sanctuary",
  version: "0.1.0",
  instructions:
    "Tools for Yog Jivan Sanctuary — a premium yoga studio in Hai Duong, Vietnam offering in-studio, online, private, therapeutic, and corporate yoga. Use `get_contact_info`, `list_studios`, and `list_faqs` to answer questions about the school. Use `submit_consultation_request` to book a free consultation on behalf of a prospective student; the Yog Jivan team follows up on WhatsApp.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getContactInfo, listStudios, listFaqs, submitConsultationRequest],
});

