// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { AmbientCanvas } from "./AmbientCanvas";

describe("AmbientCanvas — WebGL availability, ErrorBoundary, and context lifecycle", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("1. Returns null when WebGL is unavailable in browser environment", () => {
    const origWebGL = window.WebGLRenderingContext;
    // @ts-expect-error - simulating browser without WebGL
    delete window.WebGLRenderingContext;

    const { container } = render(<AmbientCanvas inView={true} />);
    expect(container.firstChild).toBeNull();

    window.WebGLRenderingContext = origWebGL;
  });

  it("2. Returns null when getContext returns null or throws (disabled GPU)", () => {
    const origGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation(() => {
      throw new Error("GPU process crashed");
    });

    const { container } = render(<AmbientCanvas inView={true} />);
    expect(container.firstChild).toBeNull();

    HTMLCanvasElement.prototype.getContext = origGetContext;
  });
});
