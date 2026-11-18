import { describe, expect, it } from "vitest";
import { isNotFoundShell } from "./not-found-robots";

describe("isNotFoundShell", () => {
  it("treats an unmatched URL (root match only) as the 404 shell", () => {
    expect(isNotFoundShell({ status: "success" }, [{ status: "success" }])).toBe(true);
  });
  it("treats a leaf notFound() as the 404 shell", () => {
    expect(isNotFoundShell({}, [{ status: "success" }, { status: "notFound" }])).toBe(true);
  });
  it("keeps valid pages indexable", () => {
    expect(isNotFoundShell({ status: "success" }, [{ status: "success" }, { status: "success" }])).toBe(false);
  });
});
