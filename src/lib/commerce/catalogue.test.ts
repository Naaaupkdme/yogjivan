import { describe, expect, it } from "vitest";
import { SHOP_SAMPLES, findShopSample, filterShopSamples } from "./catalogue";
import { shopHead } from "./head";
import { VI_ROUTES, isViPath } from "@/lib/locale-routes";

describe("review-only shop business rules", () => {
  it("contains exactly six distinct samples", () => {
    expect(SHOP_SAMPLES).toHaveLength(6);
    expect(new Set(SHOP_SAMPLES.map((p) => p.id)).size).toBe(6);
    expect(new Set(SHOP_SAMPLES.map((p) => p.slug)).size).toBe(6);
  });
  it("keeps all prices pending and availability enquiry-only", () => {
    for (const sample of SHOP_SAMPLES) {
      expect(sample.pricing).toBe("pending");
      expect(sample.availability).toBe("contact-to-check-sample");
      expect(sample).not.toHaveProperty("price");
      expect(sample).not.toHaveProperty("stock");
    }
  });
  it("preserves only the known Mangaldeep gift contents", () => {
    expect(findShopSample("mangaldeep-scent-luxe-gift-set")?.giftPack).toEqual({ boxes: 4, sticksPerBox: 25, fragrances: ["Cool Splash", "Radiant Burst", "Velvet Rush", "Black Ooud"], stand: true });
  });
  it("does not invent Sawariya pack count", () => {
    expect(findShopSample("sawariya-flora-agarbatti")?.giftPack).toBeUndefined();
    expect(findShopSample("sawariya-flora-agarbatti")?.contents).toHaveLength(1);
  });
  it("limits supplier certificate facts to the specified samples", () => {
    expect(findShopSample("vong-tay-rudraksha-5-mukhi")?.certificate.testedPieces).toBe(1);
    expect(findShopSample("chuoi-mala-rudraksha-5-mat")?.certificate).toMatchObject({ status: "supplier-card-pending", specimen: "JA-65556", reportedWeightGrams: 36.53, testedPieces: 1 });
    expect(findShopSample("vong-tay-hat-den-bay-chakra")?.certificate.status).toBe("not-visible");
    expect(SHOP_SAMPLES.filter((p) => p.certificate.status === "supplier-card-pending")).toHaveLength(2);
  });
  it("filters four bead samples and two incense samples", () => {
    expect(filterShopSamples("all")).toHaveLength(6);
    expect(filterShopSamples("beads")).toHaveLength(4);
    expect(filterShopSamples("incense")).toHaveLength(2);
  });
  it("rejects unknown slugs and unlisted medicinal brands", () => {
    for (const slug of ["unknown", "indulekha", "moov", "rumalaya", "constructor", "../contact"]) expect(findShopSample(slug)).toBeUndefined();
  });
  it("keeps draft routes Vietnamese, noindex and outside the indexable sitemap list", () => {
    const paths = ["/vi/cua-hang", "/vi/doi-tac-san-pham", ...SHOP_SAMPLES.map((p) => `/vi/cua-hang/${p.slug}`)];
    for (const path of paths) {
      expect(isViPath(path)).toBe(true);
      expect([...VI_ROUTES]).not.toContain(path);
      expect(shopHead("Sample", "Description", path).meta).toContainEqual({ name: "robots", content: "noindex, follow" });
      expect(shopHead("Sample", "Description", path).links).toEqual([{ rel: "canonical", href: `https://www.yogjivan.com${path}` }]);
    }
  });
});