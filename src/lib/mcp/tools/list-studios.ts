import { defineTool } from "@lovable.dev/mcp-js";
import { SOCIAL, STUDIO_ADDRESSES } from "@/lib/social";

export default defineTool({
  name: "list_studios",
  title: "List studios",
  description:
    "Return Yog Jivan Sanctuary's studio locations in Hai Duong, Vietnam, with addresses, coordinates, and Google Maps links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const studios = [
      { ...STUDIO_ADDRESSES.studio1, google_maps: SOCIAL.googleMapsStudio1 },
      { ...STUDIO_ADDRESSES.studio2, google_maps: SOCIAL.googleMapsStudio2 },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(studios, null, 2) }],
      structuredContent: { studios },
    };
  },
});
