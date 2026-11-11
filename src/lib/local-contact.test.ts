import { describe, expect, it } from "vitest";
import { chatChannelFor, VI_LABELS } from "./local-contact";
import { CONTACT } from "./facts/contact";

describe("chatChannelFor route awareness and intent routing", () => {
  it("routes private yoga routes to WhatsApp with a specific private enquiry ariaLabel", () => {
    const paths = [
      "/private-online-yoga",
      "/private-online-yoga/",
      "/online-private-yoga",
      "/personal-training",
      "/1-on-1-yoga",
    ];

    for (const p of paths) {
      const channel = chatChannelFor(p);
      expect(channel.isVi).toBe(false);
      expect(channel.channel).toBe("whatsapp");
      expect(channel.href).toBe("/go/whatsapp?i=private");
      expect(channel.ariaLabel).toBe(
        "Chat with the Yog Jivan team on WhatsApp — enquire about private 1-on-1 yoga sessions",
      );
    }
  });

  it("preserves standard trial / question ariaLabel on non-private English routes", () => {
    const paths = ["/", "/online-yoga-classes", "/programs", "/contact", "/about"];

    for (const p of paths) {
      const channel = chatChannelFor(p);
      expect(channel.isVi).toBe(false);
      expect(channel.channel).toBe("whatsapp");
      expect(channel.ariaLabel).toBe(
        "Chat with the Yog Jivan team on WhatsApp — book a free trial or ask a question",
      );
    }
  });

  it("preserves localized Zalo routing and Vietnamese labels on VI routes", () => {
    const paths = [
      "/vi",
      "/vi/",
      "/vi/yoga-hai-duong",
      "/vi/lop-yoga-online",
      "/vi/yoga-1-kem-1-online",
    ];

    for (const p of paths) {
      const channel = chatChannelFor(p);
      expect(channel.isVi).toBe(true);
      expect(channel.channel).toBe("zalo");
      expect(channel.href).toBe(CONTACT.zalo);
      expect(channel.label).toBe(VI_LABELS.chat);
      expect(channel.ariaLabel).toBe("Nhắn tin cho đội ngũ Yog Jivan qua Zalo");
    }
  });
});
