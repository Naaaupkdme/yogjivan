import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { generateIndex } from "../../search-index-plugin";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { buildRouteIndex } from "@/lib/search/route-meta";
import { buildSitemapEntries } from "@/lib/sitemap-entries";

// Frozen from the live sitemap on 2026-11-19 (54 canonical URLs).
const LIVE_54 = [
  "/",
  "/about",
  "/blog",
  "/blog/beginners-guide-to-20-minutes-of-stillness",
  "/blog/building-a-home-practice-you-will-keep",
  "/blog/can-an-online-yoga-teacher-correct-your-posture",
  "/blog/checklist-to-chuc-buoi-yoga-tai-van-phong",
  "/blog/chuan-bi-buoi-yoga-hoc-duong-dau-tien",
  "/blog/desk-worker-yoga-back-neck-shoulders",
  "/blog/first-live-online-yoga-class",
  "/blog/how-much-do-online-yoga-classes-cost",
  "/blog/how-to-choose-a-private-online-yoga-teacher",
  "/blog/how-yog-jivan-matches-your-private-yoga-teacher",
  "/blog/live-online-yoga-vs-youtube",
  "/blog/online-yoga-camera-setup",
  "/blog/online-yoga-for-desk-stiffness-and-back-tension",
  "/blog/online-yoga-for-two-camera-setup",
  "/blog/online-yoga-with-posture-correction",
  "/blog/private-online-yoga-for-beginners",
  "/blog/private-online-yoga-vs-group-classes",
  "/blog/private-yoga-for-intermediate-and-advanced-students",
  "/blog/the-breath-you-didnt-know-you-were-holding",
  "/blog/therapeutic-yoga-benefits",
  "/blog/what-happens-in-a-private-online-yoga-session",
  "/blog/why-traditional-hatha-still-matters",
  "/blog/yoga-classes-hai-duong-beginners-guide",
  "/blog/yoga-for-spine-longevity-12-minutes",
  "/blog/yoga-for-sustainable-fat-loss",
  "/contact",
  "/corporate",
  "/gallery",
  "/online-couples-yoga",
  "/online-family-yoga",
  "/online-yoga-classes",
  "/period-safe-yoga",
  "/privacy",
  "/private-online-yoga",
  "/programs",
  "/research/yoga-participation-statistics",
  "/school-yoga",
  "/testimonials",
  "/vi",
  "/vi/lop-yoga-online",
  "/vi/yoga-1-kem-1-online",
  "/vi/yoga-doanh-nghiep",
  "/vi/yoga-hai-duong",
  "/vi/yoga-hoc-duong",
  "/yoga-for-back-pain",
  "/yoga-for-beginners",
  "/yoga-for-expats-in-vietnam",
  "/yoga-for-pcod",
  "/yoga-for-stress",
  "/yoga-for-thyroid",
  "/yoga-for-weight-loss",
];

// Batch A candidate: 54 live baseline + 2 release-ready booking guides = 56 URLs.
const CANDIDATE_56 = [
  ...LIVE_54,
  "/blog/choose-family-yoga-booking",
  "/blog/planning-online-yoga-together",
];

describe("automatic sitemap", () => {
  it("matches the 56 canonical URLs (54 live baseline + 2 release-ready booking guides)", () => {
    const paths = buildSitemapEntries(generateIndex(join(__dirname, "../routes")), BLOG_POSTS).map((e) => e.path);
    expect([...paths].sort()).toEqual([...CANDIDATE_56].sort());
    expect(paths.length).toBe(56);
    expect(paths[0]).toBe("/");
  });
  it("excludes noindex, redirect and /go routes", () => {
    const src = (id: string, extra = "") => `createFileRoute("${id}")({ head: () => ({ meta: [{ title: "T" }${extra}] }) })`;
    const idx = buildRouteIndex([
      { source: src("/new-public-page") },
      { source: src("/hidden", `, { name: "robots", content: "noindex" }`) },
      { source: `createFileRoute("/old")({ beforeLoad: () => { throw redirect({ to: "/" }) } })` },
      { source: src("/go/yt") },
    ]);
    expect(buildSitemapEntries(idx, []).map((e) => e.path)).toEqual(["/new-public-page"]);
  });
});
