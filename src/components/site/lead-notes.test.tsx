// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SharedYogaEnquiryForm } from "./SharedYogaEnquiryForm";
import { CorporateEnquiryForm } from "./CorporateEnquiryForm";
import { SchoolYogaEnquiryForm } from "./SchoolYogaEnquiryForm";
import { finalLeadSchema } from "@/lib/leads/intake";
import { buildLeadPayload } from "@/lib/leads/payload";
import { formatTelegramAlert } from "@/lib/leads/telegram-format";
import { formOwnedValues } from "@/lib/leads/sheet-plan";

vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock("@/lib/lead-guard-client", async (importOriginal) => ({ ...await importOriginal<typeof import("@/lib/lead-guard-client")>(), readHoneypot: () => "", takeTurnstileToken: () => null }));

const vi81 = "Lịch tối thứ Ba, phòng có điều hòa, giáo viên phụ trách có mặt; cần xác nhận lịch.";
const viCombining = "Phòng tập".normalize("NFD");
let bodies: any[] = [];

function fillPhone(container: HTMLElement, value = "84782046066") {
  const input = container.querySelector('input[type="tel"]');
  if (!input) throw new Error("Phone input missing");
  fireEvent.change(input, { target: { value } });
}

beforeEach(() => {
  bodies = [];
  vi.stubGlobal("fetch", vi.fn(async (_url: string, init: RequestInit) => {
    bodies.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ ok: true, outcome: "accepted" }), { status: 200 });
  }));
  (window as any).gtag = vi.fn();
  (window as any).fbq = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); localStorage.clear(); });

describe("lead logistics notes", () => {
  it.each([
    ["optional", undefined, true], ["blank", "", true], ["null", null, true], ["80", "x".repeat(80), true], ["81", "x".repeat(81), true], ["Vietnamese", vi81, true],
    ["300", "x".repeat(300), true], ["301", "x".repeat(301), false],
  ])("server accepts shared notes by UTF-16 length: %s", (_name, notes, ok) => {
    const meta = notes === undefined ? {} : { shared_notes: notes };
    expect(finalLeadSchema.safeParse({ name: "A", whatsapp: "+84782046066", source: "website", meta }).success).toBe(ok);
  });

  it("keeps 80-character limits on unrelated goals and 300 on generic metadata", () => {
    const base = { name: "A", whatsapp: "+84782046066", source: "website" as const };
    expect(vi81.length).toBe(82);
    expect(finalLeadSchema.safeParse({ ...base, goals: [vi81] }).success).toBe(false);
    expect(finalLeadSchema.safeParse({ ...base, meta: { site: "x".repeat(301) } }).success).toBe(false);
  });

  it("submits an exact 300-character shared note in metadata, not goals", async () => {
    const note = `${viCombining} ${"x".repeat(300 - viCombining.length - 1)}`;
    const { container } = render(<SharedYogaEnquiryForm initialFormat="couples" />);
    fireEvent.change(screen.getByLabelText(/Adult Booking Contact Name/i), { target: { value: "Maya Sharma" } });
    fillPhone(container);
    fireEvent.change(screen.getByLabelText(/Logistics Notes/i), { target: { value: note } });
    fireEvent.click(screen.getByRole("button", { name: /Enquire About Couples/i }));
    await waitFor(() => expect(bodies).toHaveLength(1));
    expect(bodies[0].meta.shared_notes).toBe(note);
    expect(bodies[0].goals).toEqual([]);
    expect(finalLeadSchema.safeParse(bodies[0]).success).toBe(true);
  });

  it("blocks a 301-character note in the browser", async () => {
    const { container } = render(<SharedYogaEnquiryForm initialFormat="family" />);
    fireEvent.change(screen.getByLabelText(/Adult Booking Contact Name/i), { target: { value: "Maya Sharma" } });
    fillPhone(container);
    fireEvent.change(screen.getByLabelText(/Logistics Notes/i), { target: { value: "x".repeat(301) } });
    fireEvent.click(screen.getByRole("button", { name: /Enquire About Family/i }));
    await screen.findByText(/at most 300/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    ["Corporate EN", <CorporateEnquiryForm />, /Organization/i, /Organizer Name/i, /Workplace location/i, /Logistics Notes/i, /Request Office Pilot/i, "/corporate"],
    ["Corporate VI", <CorporateEnquiryForm lang="VI" />, /Tên doanh nghiệp/i, /Người đại diện/i, /Địa điểm tổ chức/i, /Ghi chú điều phối/i, /Gửi yêu cầu/i, "/vi/yoga-doanh-nghiep"],
    ["School EN", <SchoolYogaEnquiryForm />, /School or Institution/i, /Coordinator Name/i, /School Site/i, /Logistics Notes/i, /Ask About School Pilot/i, "/school-yoga"],
    ["School VI", <SchoolYogaEnquiryForm lang="VI" />, /Tên trường/i, /Người đại diện trường/i, /Địa điểm trường/i, /Ghi chú điều phối/i, /Gửi yêu cầu học thử/i, "/vi/yoga-hoc-duong"],
  ])("%s persists organizer notes in metadata and keeps them out of analytics", async (_name, ui, org, person, site, notes, button, landing) => {
    const note = "Phòng đa năng; lịch 12:00; người lớn điều phối.";
    const { container } = render(ui);
    fireEvent.change(screen.getByLabelText(org), { target: { value: "Test Organisation" } });
    fireEvent.change(screen.getByLabelText(person), { target: { value: "Test Organizer" } });
    fireEvent.change(screen.getByLabelText(site), { target: { value: "Hai Duong" } });
    fillPhone(container);
    fireEvent.change(screen.getByLabelText(notes), { target: { value: note } });
    fireEvent.click(screen.getByRole("button", { name: button }));
    await waitFor(() => expect(bodies).toHaveLength(1));
    expect(bodies[0]).toMatchObject({ source: "website", meta: { organizer_notes: note, landing_page: landing } });
    expect(bodies[0]).not.toHaveProperty("notes");
    expect(finalLeadSchema.safeParse(bodies[0]).success).toBe(true);
    expect(JSON.stringify([(window as any).gtag.mock.calls, (window as any).fbq.mock.calls])).not.toContain(note);
  });

  it("keeps stored notes out of Telegram and Sheet mirrors", () => {
    const secret = "PRIVATE ORGANIZER NOTE";
    const { payload, reply } = buildLeadPayload({ id: "1", crm_lead_id: "YJ-1", name: "A", whatsapp: "+84782046066", email: null, goals: [], preferred_experience: null, preferred_time: null, experience_level: null, status: "submitted", source: "website", session_id: null, meta: { organizer_notes: secret, shared_notes: secret }, created_at: "", updated_at: "", health_present: false });
    expect(JSON.stringify([payload, formatTelegramAlert(payload, reply, null), formOwnedValues(payload)])).not.toContain(secret);
  });
});