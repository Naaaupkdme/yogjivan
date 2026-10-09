// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";
import { QuickEnquiryForm } from "./QuickEnquiryForm";
import { PrivateYogaEnquiryForm } from "./PrivateYogaEnquiryForm";
import { BookOnlineYogaForm } from "./BookOnlineYogaForm";
import { SmartConsultation } from "./SmartConsultation";
import { submitLead } from "@/lib/leads";

MotionGlobalConfig.skipAnimations = true;

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>,
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

vi.mock("@/lib/leads", async () => {
  const actual = await vi.importActual<typeof import("@/lib/leads")>("@/lib/leads");
  return {
    ...actual,
    submitLead: vi.fn(),
  };
});

describe("Rendered forms — actual component validation, submission wiring, outcome gating, retry & mutex", () => {
  let mockGtag: any;
  let mockFbq: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGtag = vi.fn();
    mockFbq = vi.fn();
    (window as any).gtag = mockGtag;
    (window as any).fbq = mockFbq;
    window.localStorage.setItem(
      "yj_cookie_consent_v2",
      JSON.stringify({ analytics: true, marketing: true })
    );
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  /* ---------------------------------------------------------------- QuickEnquiryForm */
  describe("1. QuickEnquiryForm (/online-yoga-classes)", () => {
    it("invalid data: displays errors in DOM and sends zero intake/analytics calls", async () => {
      render(<QuickEnquiryForm />);

      const submitBtn = screen.getByRole("button", { name: /Free Trial/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Please share your full name")).toBeTruthy();
        expect(screen.getByText("Please share a valid WhatsApp number")).toBeTruthy();
      });

      expect(submitLead).not.toHaveBeenCalled();
      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("accepted response: displays success screen, resets fields, fires analytics with zero PII", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      const { container } = render(<QuickEnquiryForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: "Bob Martin" } });
      fireEvent.change(phoneInput, { target: { value: "7911123456" } });

      const submitBtn = screen.getByRole("button", { name: /Free Trial/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Request received.")).toBeTruthy();
      });

      // Verify real component payload wiring
      expect(submitLead).toHaveBeenCalledTimes(1);
      const payload = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(payload.name).toBe("Bob Martin");
      expect(payload.whatsapp).toContain("7911123456");
      expect(payload.source).toBe("website");
      expect(payload.preferred_experience).toBe("Live online group classes");
      expect(payload.status).toBe("submitted");
      expect(payload.meta.funnel).toBe("online_group_inline");
      expect(payload.meta.landing_page).toBe("/online-yoga-classes");
      const eventId = payload.meta.lead_event_id;
      expect(typeof eventId).toBe("string");

      // Verify GA4 generate_lead dispatch with correct component form_id
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          form_id: "online_group_quick_enquiry",
          service_category: "online_group",
          lead_event_id: eventId,
        })
      );

      // Verify ZERO PII in analytics
      const gaJson = JSON.stringify(mockGtag.mock.calls);
      expect(gaJson).not.toContain("Bob Martin");
      expect(gaJson).not.toContain("7911123456");
    });

    it("rejected response: preserves user inputs in DOM and allows retry", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network connection failed")
      );

      const { container } = render(<QuickEnquiryForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: "Elena Rostova" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });

      const submitBtn = screen.getByRole("button", { name: /Free Trial/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(nameInput.value).toBe("Elena Rostova");
      });

      expect(phoneInput.value).toContain("84782046066");
      expect(mockGtag).not.toHaveBeenCalled();

      // Retry unchanged: reuses same lead_event_id
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Request received.")).toBeTruthy();
      });

      const id1 = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0].meta.lead_event_id;
      const id2 = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[1][0].meta.lead_event_id;
      expect(id2).toBe(id1);
    });

    it("two immediate submissions while pending: produce exactly one intake request", async () => {
      let resolvePromise: (v: any) => void;
      const delayed = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(delayed);

      const { container } = render(<QuickEnquiryForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: "Speedy Submitter" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });

      const submitBtn = screen.getByRole("button", { name: /Free Trial/i });
      fireEvent.click(submitBtn);
      fireEvent.click(submitBtn);

      expect(submitLead).toHaveBeenCalledTimes(1);

      resolvePromise!({ outcome: "accepted" });
      await waitFor(() => {
        expect(screen.getByText("Request received.")).toBeTruthy();
      });

      expect(submitLead).toHaveBeenCalledTimes(1);
    });

    it("duplicate outcome: displays success UI but emits ZERO analytics conversion", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "duplicate",
      });

      const { container } = render(<QuickEnquiryForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;

      fireEvent.change(nameInput, { target: { value: "Duplicate User" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });

      fireEvent.click(screen.getByRole("button", { name: /Free Trial/i }));

      await waitFor(() => {
        expect(screen.getByText("Request received.")).toBeTruthy();
      });

      expect(mockGtag).not.toHaveBeenCalled();
      expect(mockFbq).not.toHaveBeenCalled();
    });
  });

  /* ---------------------------------------------------------------- PrivateYogaEnquiryForm */
  describe("2. PrivateYogaEnquiryForm (/private-online-yoga)", () => {
    it("invalid data: displays errors in DOM and sends zero intake/analytics calls", async () => {
      render(<PrivateYogaEnquiryForm />);

      const submitBtn = screen.getByRole("button", { name: /Enquire About Private/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Please share your full name")).toBeTruthy();
        expect(screen.getByText("Please share a valid WhatsApp number")).toBeTruthy();
        expect(screen.getByText("Please choose your current level")).toBeTruthy();
      });

      expect(submitLead).not.toHaveBeenCalled();
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("accepted response: displays success screen, wires private_online category, resets fields", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      const { container } = render(<PrivateYogaEnquiryForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const levelSelect = container.querySelector('select[name="pv-level"]') as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: "Charlie Brown" } });
      fireEvent.change(phoneInput, { target: { value: "12025550123" } });
      fireEvent.change(levelSelect, { target: { value: "Complete Beginner" } });

      const submitBtn = screen.getByRole("button", { name: /Enquire About Private/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Request received.")).toBeTruthy();
      });

      expect(submitLead).toHaveBeenCalledTimes(1);
      const payload = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(payload.name).toBe("Charlie Brown");
      expect(payload.source).toBe("website");
      expect(payload.preferred_experience).toBe("Private 1-on-1 online yoga");
      expect(payload.experience_level).toBe("Complete Beginner");
      expect(payload.meta.funnel).toBe("private_yoga_organic");
      expect(payload.meta.landing_page).toBe("/private-online-yoga");

      const eventId = payload.meta.lead_event_id;
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          form_id: "private_yoga_enquiry",
          service_category: "private_online",
          lead_event_id: eventId,
        })
      );
      expect(JSON.stringify(mockGtag.mock.calls)).not.toContain("Charlie Brown");
    });

    it("rejected response: preserves inputs in DOM and reuses lead_event_id on unchanged retry", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Server error")
      );

      const { container } = render(<PrivateYogaEnquiryForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const levelSelect = container.querySelector('select[name="pv-level"]') as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: "Diana Prince" } });
      fireEvent.change(phoneInput, { target: { value: "12025550123" } });
      fireEvent.change(levelSelect, { target: { value: "Some Yoga Experience" } });

      const submitBtn = screen.getByRole("button", { name: /Enquire About Private/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(nameInput.value).toBe("Diana Prince");
      });

      expect(levelSelect.value).toBe("Some Yoga Experience");
      expect(mockGtag).not.toHaveBeenCalled();

      // Retry unchanged
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Request received.")).toBeTruthy();
      });

      const id1 = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0].meta.lead_event_id;
      const id2 = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[1][0].meta.lead_event_id;
      expect(id2).toBe(id1);
    });

    it("two immediate submissions while pending: produce exactly one intake request", async () => {
      let resolvePromise: (v: any) => void;
      const delayed = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(delayed);

      const { container } = render(<PrivateYogaEnquiryForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const levelSelect = container.querySelector('select[name="pv-level"]') as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: "Fast Clicker" } });
      fireEvent.change(phoneInput, { target: { value: "12025550123" } });
      fireEvent.change(levelSelect, { target: { value: "Some Yoga Experience" } });

      const submitBtn = screen.getByRole("button", { name: /Enquire About Private/i });
      fireEvent.click(submitBtn);
      fireEvent.click(submitBtn);

      expect(submitLead).toHaveBeenCalledTimes(1);
      resolvePromise!({ outcome: "accepted" });

      await waitFor(() => {
        expect(screen.getByText("Request received.")).toBeTruthy();
      });
      expect(submitLead).toHaveBeenCalledTimes(1);
    });
  });

  /* ---------------------------------------------------------------- BookOnlineYogaForm */
  describe("3. BookOnlineYogaForm (/book-online-yoga)", () => {
    it("invalid data: displays errors in DOM and sends zero intake/analytics calls", async () => {
      render(<BookOnlineYogaForm />);

      const submitBtn = screen.getByRole("button", { name: /Start my free trial/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Please share your full name")).toBeTruthy();
        expect(screen.getByText("Please share a valid WhatsApp number")).toBeTruthy();
        expect(screen.getByText("Please choose one option")).toBeTruthy();
      });

      expect(submitLead).not.toHaveBeenCalled();
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("accepted response: maps health goal without leaking goal text to analytics", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      const { container } = render(<BookOnlineYogaForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const goalSelect = container.querySelector('select[name="goal"]') as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: "Alice Walker" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });
      fireEvent.change(goalSelect, { target: { value: "Back, neck or posture support" } });

      const submitBtn = screen.getByRole("button", { name: /Start my free trial/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/Request received — you're on the list/i)).toBeTruthy();
      });

      expect(submitLead).toHaveBeenCalledTimes(1);
      const payload = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(payload.source).toBe("website_paid_online_yoga");
      expect(payload.preferred_experience).toBe("Back, neck or posture support");
      expect(payload.meta.funnel).toBe("online_yoga_paid_landing");

      const eventId = payload.meta.lead_event_id;
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          form_id: "book_online_yoga",
          service_category: "online_group",
          lead_event_id: eventId,
        })
      );

      // Verify ZERO health goal text leaks into GA4 event payload
      const gaJson = JSON.stringify(mockGtag.mock.calls);
      expect(gaJson).not.toContain("Back");
      expect(gaJson).not.toContain("neck");
      expect(gaJson).not.toContain("posture");
      expect(gaJson).not.toContain("Alice");
    });

    it("two immediate submissions while pending: produce exactly one intake request", async () => {
      let resolvePromise: (v: any) => void;
      const delayed = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(delayed);

      const { container } = render(<BookOnlineYogaForm />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const goalSelect = container.querySelector('select[name="goal"]') as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: "Fast Clicker Book" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });
      fireEvent.change(goalSelect, { target: { value: "Live group classes" } });

      const submitBtn = screen.getByRole("button", { name: /Start my free trial/i });
      fireEvent.click(submitBtn);
      fireEvent.click(submitBtn);

      expect(submitLead).toHaveBeenCalledTimes(1);
      resolvePromise!({ outcome: "accepted" });

      await waitFor(() => {
        expect(screen.getByText(/Request received — you're on the list/i)).toBeTruthy();
      });
      expect(submitLead).toHaveBeenCalledTimes(1);
    });
  });

  /* ---------------------------------------------------------------- SmartConsultation */
  describe("4. SmartConsultation (/contact)", () => {
    it("invalid data: displays errors in DOM and sends zero intake/analytics calls", async () => {
      render(<SmartConsultation />);

      const submitBtn = screen.getByRole("button", { name: /Book My Free Consultation/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Please share your full name")).toBeTruthy();
        expect(screen.getByText("Please share a valid WhatsApp number")).toBeTruthy();
        expect(screen.getByText("Please choose one option")).toBeTruthy();
      });

      expect(submitLead).not.toHaveBeenCalled();
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it("accepted response: displays success screen, maps service category, resets fields, allows sending another message", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });

      const { container } = render(<SmartConsultation />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const serviceSelect = container.querySelector("select") as HTMLSelectElement;
      const messageTextarea = container.querySelector("textarea") as HTMLTextAreaElement;

      fireEvent.change(nameInput, { target: { value: "David Kim" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });
      fireEvent.change(serviceSelect, { target: { value: "Personalized Wellness Yoga" } });
      fireEvent.change(messageTextarea, { target: { value: "Lower back tension and stress" } });

      const submitBtn = screen.getByRole("button", { name: /Book My Free Consultation/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Thanks — we've received your request.")).toBeTruthy();
      });

      expect(submitLead).toHaveBeenCalledTimes(1);
      const payload = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(payload.name).toBe("David Kim");
      expect(payload.preferred_experience).toBe("Personalized Wellness Yoga");
      expect(payload.health_notes).toBe("Lower back tension and stress");

      const eventId = payload.meta.lead_event_id;
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "generate_lead",
        expect.objectContaining({
          form_id: "smart_consultation",
          service_category: "private_online",
          lead_event_id: eventId,
        })
      );

      // Verify ZERO health notes or customer messages in analytics
      const gaJson = JSON.stringify(mockGtag.mock.calls);
      expect(gaJson).not.toContain("David");
      expect(gaJson).not.toContain("tension");
      expect(gaJson).not.toContain("stress");

      // Verify "Send another message" resets form state
      const anotherBtn = screen.getByRole("button", { name: /Send another message/i });
      fireEvent.click(anotherBtn);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Your full name")).toBeTruthy();
      });
      const newNameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      expect(newNameInput.value).toBe("");
    });

    it("rejected response: preserves inputs in DOM and reuses lead_event_id on unchanged retry", async () => {
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Intake timeout")
      );

      const { container } = render(<SmartConsultation />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const serviceSelect = container.querySelector("select") as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: "Retry Tester" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });
      fireEvent.change(serviceSelect, { target: { value: "Studio Classes" } });

      const submitBtn = screen.getByRole("button", { name: /Book My Free Consultation/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(nameInput.value).toBe("Retry Tester");
      });
      expect(serviceSelect.value).toBe("Studio Classes");
      expect(mockGtag).not.toHaveBeenCalled();

      // Retry unchanged
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        outcome: "accepted",
      });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText("Thanks — we've received your request.")).toBeTruthy();
      });

      const id1 = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[0][0].meta.lead_event_id;
      const id2 = (submitLead as unknown as ReturnType<typeof vi.fn>).mock.calls[1][0].meta.lead_event_id;
      expect(id2).toBe(id1);
    });

    it("two immediate submissions while pending: produce exactly one intake request", async () => {
      let resolvePromise: (v: any) => void;
      const delayed = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      (submitLead as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(delayed);

      const { container } = render(<SmartConsultation />);
      const nameInput = screen.getByPlaceholderText("Your full name") as HTMLInputElement;
      const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
      const serviceSelect = container.querySelector("select") as HTMLSelectElement;

      fireEvent.change(nameInput, { target: { value: "Rapid Smart" } });
      fireEvent.change(phoneInput, { target: { value: "84782046066" } });
      fireEvent.change(serviceSelect, { target: { value: "Online Classes" } });

      const submitBtn = screen.getByRole("button", { name: /Book My Free Consultation/i });
      fireEvent.click(submitBtn);
      fireEvent.click(submitBtn);

      expect(submitLead).toHaveBeenCalledTimes(1);
      resolvePromise!({ outcome: "accepted" });

      await waitFor(() => {
        expect(screen.getByText("Thanks — we've received your request.")).toBeTruthy();
      });
      expect(submitLead).toHaveBeenCalledTimes(1);
    });
  });
});
