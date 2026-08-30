import { CalendarDays, Clock, MapPin } from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { CONTACT } from "@/lib/facts/contact";
import { STUDIO_LIST, STUDIO_HOURS } from "@/lib/facts/locations";
import {
  BATCH_SLOTS,
  DAY_KEYS,
  DAY_LABELS_VI,
  SCHEDULE_NOTE_VI,
  SCHEDULE_ZALO_CTA_VI,
  WEEKLY_TIMETABLE,
  isWeeklyTimetableCurrent,
  closedDaysThisWeek,
  type StudioScheduleId,
} from "@/lib/facts/local-class-schedule";

/**
 * Local group-class schedule for the two Hai Duong studios.
 *
 * Always renders the evergreen recurring batch times. The dated weekly
 * class-theme matrix is only rendered while it is still the current week —
 * after `validThrough` it disappears and the Zalo CTA becomes the way to get
 * the new week, so a stale poster can never look like the live timetable.
 */
export function ViScheduleSection() {
  const showWeek = isWeeklyTimetableCurrent();
  const closedDays = closedDaysThisWeek();

  return (
    <section id="lich-lop" className="section-tight">
      <div className="container-luxe max-w-5xl">
        <h2 className="font-display leading-tight" style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)" }}>
          Lịch lớp Yoga Hải Dương tuần này
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-foreground/85">
          Yog Jivan có các khung giờ lớp nhóm từ sáng sớm đến buổi tối tại cả hai cơ sở yoga Hải Dương. Chủ đề lớp và
          giáo viên có thể thay đổi theo từng tuần; hãy nhắn Zalo để nhận lịch lớp yoga Hải Dương mới nhất.
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-foreground/85">
          <Clock className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
          Thứ Hai – Thứ Bảy · {STUDIO_HOURS.opens} – {STUDIO_HOURS.closes} · Chủ Nhật nghỉ
        </p>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {STUDIO_LIST.map((studio, i) => {
            const id = (i === 0 ? "studio1" : "studio2") as StudioScheduleId;
            return (
              <div key={studio.id} className="glass-soft rounded-2xl border border-white/10 p-5 sm:p-6">
                <h3 className="font-display text-lg leading-tight">
                  Cơ sở {i + 1} — {studio.name}
                </h3>
                <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-foreground/75">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
                  <span>{studio.full}</span>
                </p>
                <div className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--gold)]">
                  Giờ học yoga cố định hằng tuần
                </div>
                <ul className="mt-3 grid gap-2">
                  {BATCH_SLOTS[id].map((slot) => (
                    <li
                      key={slot}
                      className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-foreground/90"
                    >
                      <Clock className="h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
                      <span className="tabular-nums">{slot}</span>
                    </li>
                  ))}
                </ul>
                {studio.aerialYoga && (
                  <p className="mt-3 text-xs text-foreground/70">Lớp Aerial Yoga chỉ có tại cơ sở này.</p>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-foreground/65">{SCHEDULE_NOTE_VI}</p>

        {showWeek ? (
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[color:var(--gold)]" />
              <h3 className="font-display text-lg leading-tight">
                Lịch lớp tuần này ({WEEKLY_TIMETABLE.weekLabelVi})
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-foreground/65">
              Đây là lịch của riêng tuần {WEEKLY_TIMETABLE.weekLabelVi}. Tuần sau chủ đề lớp và giáo viên có thể khác.
            </p>
            {closedDays.length > 0 && (
              <p className="mt-3 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-4 py-3 text-sm leading-relaxed text-foreground/90">
                Tuần này nghỉ:{" "}
                {closedDays
                  .map((d) => `${DAY_LABELS_VI[d.day]} ${d.status.date} — ${d.status.noteVi ?? "Nghỉ"}`)
                  .join(" · ")}
                . Các ngày còn lại vẫn học bình thường.
              </p>
            )}

            <div className="mt-4 grid gap-5">
              {(["studio1", "studio2"] as StudioScheduleId[]).map((id, i) => (
                <WeekTable key={id} id={id} title={`Cơ sở ${i + 1} — ${STUDIO_LIST[i]!.name}`} />
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm leading-relaxed text-foreground/85">
            Lịch chi tiết theo từng buổi (chủ đề lớp và giáo viên) được cập nhật theo tuần. Hãy nhắn Zalo để nhận lịch
            tuần hiện tại.
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={CONTACT.zalo}
            target="_blank"
            rel="noreferrer"
            data-cta-location="vi_schedule_zalo"
            aria-label="Nhắn Zalo để nhận lịch lớp yoga Hải Dương tuần mới"
            className="btn-gold min-h-[44px] inline-flex items-center gap-2"
          >
            <ZaloIcon className="h-4 w-4" />
            {SCHEDULE_ZALO_CTA_VI}
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            data-cta-location="vi_schedule_call"
            className="btn-ghost-gold min-h-[44px]"
          >
            Gọi {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Horizontally scrollable on small screens; never a cramped 6-column grid. */
function WeekTable({ id, title }: { id: StudioScheduleId; title: string }) {
  const rows = WEEKLY_TIMETABLE.rows[id];
  const teachers = WEEKLY_TIMETABLE.teacherByDay[id];
  return (
    <div className="glass-soft rounded-2xl border border-white/10 p-4 sm:p-5">
      <h4 className="font-display text-base leading-tight">{title}</h4>
      <p className="mt-1 text-[0.7rem] text-foreground/60 sm:hidden">Vuốt ngang để xem đủ các ngày →</p>
      <div className="mt-3 -mx-1 overflow-x-auto overscroll-x-contain px-1">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="text-[0.62rem] uppercase tracking-[0.16em] text-[color:var(--gold)]">
              <th scope="col" className="py-2 pr-3 font-medium">
                Giờ
              </th>
              {DAY_KEYS.map((d) => {
                const status = WEEKLY_TIMETABLE.dayStatus[d];
                return (
                  <th key={d} scope="col" className="py-2 pr-3 font-medium">
                    <span className="block">
                      {DAY_LABELS_VI[d]} <span className="text-foreground/45">{status.date}</span>
                    </span>
                    <span className="block text-[0.58rem] normal-case tracking-normal text-foreground/55">
                      {status.state === "active" ? teachers[d] : (status.noteVi ?? "Nghỉ")}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slot} className="border-t border-white/10 align-top">
                <th scope="row" className="whitespace-nowrap py-2.5 pr-3 font-medium tabular-nums text-foreground/90">
                  {row.slot}
                </th>
                {DAY_KEYS.map((d) => {
                  const status = WEEKLY_TIMETABLE.dayStatus[d];
                  const cls = row.classes[d];
                  if (status.state !== "active" || !cls) {
                    return (
                      <td key={d} className="py-2.5 pr-3 text-foreground/45">
                        <span className="block">{status.noteVi ?? "Nghỉ"}</span>
                      </td>
                    );
                  }
                  return (
                    <td key={d} className="py-2.5 pr-3 text-foreground/80">
                      <span className="block">{cls.vi}</span>
                      <span className="block text-[0.62rem] text-foreground/50">{cls.en}</span>
                    </td>
                  );
                })}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
