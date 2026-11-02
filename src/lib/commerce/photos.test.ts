import { describe, expect, it } from "vitest";
import { SHOP_SAMPLES } from "./catalogue";
import { samplePhotoFor, MANGALDEEP_PACKAGE_PHOTO } from "./photos";

describe("owner photo matching", () => {
  it("matches all six samples to the inspected front/package photographs", () => {
    expect(SHOP_SAMPLES.map((sample) => samplePhotoFor(sample.slug)?.sourceFile)).toEqual(["IMG_8164.jpg", "IMG_8166.jpg", "IMG_8169.jpg", "IMG_8161.jpg", "IMG_8174.jpg", "IMG_8215.jpg"]);
  });
  it("keeps package detail secondary and excludes the immunity/healing card back", () => {
    expect(MANGALDEEP_PACKAGE_PHOTO.sourceFile).toBe("IMG_8171.jpg");
    expect(SHOP_SAMPLES.map((sample) => samplePhotoFor(sample.slug)?.sourceFile)).not.toContain("IMG_8165.jpg");
  });
  it("uses durable local asset endpoints, never signed sources", () => {
    for (const photo of [...SHOP_SAMPLES.map((sample) => samplePhotoFor(sample.slug)), MANGALDEEP_PACKAGE_PHOTO]) {
      expect(photo?.small).toMatch(/^\/__l5e\/assets-v1\//);
      expect(photo?.large).toMatch(/^\/__l5e\/assets-v1\//);
      expect(photo?.width).toBeGreaterThan(640);
    }
    expect(samplePhotoFor("constructor")).toBeUndefined();
  });
});