import { defineMcp } from "@lovable.dev/mcp-js";
import getContactInfo from "./tools/get-contact-info";
import listFaqs from "./tools/list-faqs";
import listStudios from "./tools/list-studios";
import submitConsultationRequest from "./tools/submit-consultation-request";

export default defineMcp({
  name: "yog-jivan-mcp",
  title: "Yog Jivan Sanctuary",
  version: "0.1.0",
  instructions:
    "Public tools for Yog Jivan Sanctuary — a premium yoga studio in Hai Duong, Vietnam offering in-studio, online, private, therapeutic, and corporate yoga. Use `get_contact_info`, `list_studios`, and `list_faqs` to answer questions about the school. Use `submit_consultation_request` to book a free consultation on behalf of a prospective student; the team replies on WhatsApp within a few minutes.",
  tools: [getContactInfo, listStudios, listFaqs, submitConsultationRequest],
});
