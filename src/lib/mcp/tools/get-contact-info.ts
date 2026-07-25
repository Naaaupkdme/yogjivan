import { defineTool } from "@lovable.dev/mcp-js";
import { SOCIAL, STUDIO_ADDRESSES } from "@/lib/social";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description:
    "Return Yog Jivan Sanctuary's public contact details: phone, WhatsApp, email, and social links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      phone: SOCIAL.phone,
      whatsapp: `https://wa.me/${SOCIAL.whatsappE164}`,
      zalo: SOCIAL.zalo,
      email: SOCIAL.email,
      website: "https://yogjivan.com",
      social: {
        facebook: SOCIAL.facebook,
        instagram: SOCIAL.instagram,
        youtube: SOCIAL.youtube,
      },
      studios: [STUDIO_ADDRESSES.studio1, STUDIO_ADDRESSES.studio2],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
