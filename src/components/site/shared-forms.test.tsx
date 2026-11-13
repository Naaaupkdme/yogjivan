// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { SharedYogaEnquiryForm } from "@/components/site/SharedYogaEnquiryForm";
import * as leadsModule from "@/lib/leads";

vi.mock("@/lib/leads", async () => {
  const actual = await vi.importActual<typeof import("@/lib/leads")>("@/lib/leads");
  return {
    ...actual,
    submitLead: vi.fn(),
  };
});

describe("SharedYogaEnquiryForm — Couples, Family & Parent-Child", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders couples format with 2 participants by default", () => {
    render(<SharedYogaEnquiryForm initialFormat="couples" />);

    const formatSelect = screen.getByLabelText(/session format/i) as HTMLSelectElement;
    expect(formatSelect.value).toBe("couples");

    // Participant select should NOT be displayed for couples (fixed at 2)
    expect(screen.queryByLabelText(/total participants in household/i)).toBeNull();

    // Verify minor safety notice is clearly visible
    expect(screen.getByText(/privacy & minor safety standard/i)).toBeDefined();
  });

  it("renders family format with selectable participant count (3 or 4) and no duo option", () => {
    render(<SharedYogaEnquiryForm initialFormat="family" />);

    const formatSelect = screen.getByLabelText(/session format/i) as HTMLSelectElement;
    expect(formatSelect.value).toBe("family");

    // Participant select should be present and default to recommended tier (3)
    const paxSelect = screen.getByLabelText(/total participants in household/i) as HTMLSelectElement;
    expect(paxSelect).toBeDefined();
    expect(paxSelect.value).toBe("3");

    // Family Duo (2 participants) should NOT exist in family options
    expect(paxSelect.querySelector('option[value="2"]')).toBeNull();

    fireEvent.change(paxSelect, { target: { value: "4" } });
    expect(paxSelect.value).toBe("4");
  });

  it("supports initialParticipants and controlled participants prop", () => {
    const { rerender } = render(
      <SharedYogaEnquiryForm format="family" participants={4} />
    );
    const paxSelect = screen.getByLabelText(/total participants in household/i) as HTMLSelectElement;
    expect(paxSelect.value).toBe("4");

    rerender(<SharedYogaEnquiryForm format="family" participants={3} />);
    expect(paxSelect.value).toBe("3");
  });

  it("switches format dynamically and adjusts participant count", () => {
    render(<SharedYogaEnquiryForm initialFormat="couples" />);

    const formatSelect = screen.getByLabelText(/session format/i) as HTMLSelectElement;
    fireEvent.change(formatSelect, { target: { value: "family" } });

    expect(screen.getByLabelText(/total participants in household/i)).toBeDefined();

    fireEvent.change(formatSelect, { target: { value: "parent_child" } });
    expect(screen.queryByLabelText(/total participants in household/i)).toBeNull();
  });

  it("validates adult contact name and whatsapp before submission", async () => {
    render(<SharedYogaEnquiryForm initialFormat="couples" />);

    const submitBtn = screen.getByRole("button", { name: /enquire about couples yoga/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/please share the adult booking contact name/i)).toBeDefined();
    });

    expect(leadsModule.submitLead).not.toHaveBeenCalled();
  });

  it("submits couples enquiry successfully with correct lead contract and metadata", async () => {
    vi.mocked(leadsModule.submitLead).mockResolvedValueOnce({ outcome: "accepted" });

    const { container } = render(<SharedYogaEnquiryForm initialFormat="couples" />);

    fireEvent.change(screen.getByLabelText(/adult booking contact name/i), {
      target: { value: "Vikram Mehta" },
    });

    const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: "84912345678" } });

    const submitBtn = screen.getByRole("button", { name: /enquire about couples yoga/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(leadsModule.submitLead).toHaveBeenCalledTimes(1);
    });

    const callPayload = vi.mocked(leadsModule.submitLead).mock.calls[0][0];
    expect(callPayload.name).toBe("Vikram Mehta");
    expect(callPayload.preferred_experience).toContain("Private couples online yoga (2 participants)");
    expect(callPayload.source).toBe("website");
    expect(callPayload.status).toBe("submitted");
    expect(callPayload.meta?.funnel).toBe("couples_yoga_enquiry");
    expect(callPayload.meta?.landing_page).toBe("/online-couples-yoga");
    expect(callPayload.meta?.shared_format).toBe("couples");
    expect(callPayload.meta?.participant_count).toBe(2);
    expect(typeof callPayload.meta?.lead_event_id).toBe("string");

    // Success view
    await waitFor(() => {
      expect(screen.getByText(/thank you, vikram mehta/i)).toBeDefined();
    });
  });

  it("submits family enquiry with participant count in payload", async () => {
    vi.mocked(leadsModule.submitLead).mockResolvedValueOnce({ outcome: "accepted" });

    const { container } = render(<SharedYogaEnquiryForm initialFormat="family" />);

    fireEvent.change(screen.getByLabelText(/adult booking contact name/i), {
      target: { value: "Ananya Roy" },
    });

    const paxSelect = screen.getByLabelText(/total participants in household/i);
    fireEvent.change(paxSelect, { target: { value: "3" } });

    const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: "84987654321" } });

    const submitBtn = screen.getByRole("button", { name: /enquire about family yoga/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(leadsModule.submitLead).toHaveBeenCalledTimes(1);
    });

    const callPayload = vi.mocked(leadsModule.submitLead).mock.calls[0][0];
    expect(callPayload.name).toBe("Ananya Roy");
    expect(callPayload.preferred_experience).toContain("Private family online yoga (3 participants)");
    expect(callPayload.meta?.funnel).toBe("family_yoga_enquiry");
    expect(callPayload.meta?.landing_page).toBe("/online-family-yoga");
    expect(callPayload.meta?.shared_format).toBe("family");
    expect(callPayload.meta?.participant_count).toBe(3);
  });

  it("accepts controlled format prop and syncs state reliably across rerenders", () => {
    const onFormatChange = vi.fn();
    const { rerender } = render(
      <SharedYogaEnquiryForm format="family" onFormatChange={onFormatChange} />
    );

    const formatSelect = screen.getByLabelText(/session format/i) as HTMLSelectElement;
    expect(formatSelect.value).toBe("family");
    expect(screen.getByLabelText(/total participants in household/i)).toBeDefined();

    // Rerender with parent_child format
    rerender(<SharedYogaEnquiryForm format="parent_child" onFormatChange={onFormatChange} />);
    expect(formatSelect.value).toBe("parent_child");
    expect(screen.queryByLabelText(/total participants in household/i)).toBeNull();
    expect(screen.getByText(/fixed: 2 participants/i)).toBeDefined();

    // User change calls callback
    fireEvent.change(formatSelect, { target: { value: "couples" } });
    expect(onFormatChange).toHaveBeenCalledWith("couples");
  });

  it("submits parent_child enquiry with 2 participants and adult caregiver metadata", async () => {
    vi.mocked(leadsModule.submitLead).mockResolvedValueOnce({ outcome: "accepted" });

    const { container } = render(<SharedYogaEnquiryForm format="parent_child" />);

    fireEvent.change(screen.getByLabelText(/adult booking contact name/i), {
      target: { value: "Rohan & Aarav" },
    });

    const phoneInput = container.querySelector('input[type="tel"]') as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: "84933334444" } });

    const submitBtn = screen.getByRole("button", { name: /enquire about parent & child yoga/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(leadsModule.submitLead).toHaveBeenCalledTimes(1);
    });

    const callPayload = vi.mocked(leadsModule.submitLead).mock.calls[0][0];
    expect(callPayload.name).toBe("Rohan & Aarav");
    expect(callPayload.preferred_experience).toContain("Private parent & child online yoga");
    expect(callPayload.meta?.funnel).toBe("parent_child_yoga_enquiry");
    expect(callPayload.meta?.landing_page).toBe("/online-family-yoga");
    expect(callPayload.meta?.shared_format).toBe("parent_child");
    expect(callPayload.meta?.participant_count).toBe(2);
  });
});
