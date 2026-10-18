import type { WeeklySchedulePack } from "../types";
import type { StudioId } from "../config/studios";
import { STUDIOS } from "../config/studios";
import { WEEKDAYS, WEEKDAY_LABELS_VI, WEEKDAY_LABELS_EN } from "../config/schedule-rules";
import { getIconForClass } from "./class-icons";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

export interface RenderHtmlPosterOptions {
  outputDir: string;
  width?: number; // default 1024
  height?: number; // default 768
}

function base64DataUri(filePath: string, mimeType: string): string {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath).toString("base64");
    return `data:${mimeType};base64,${data}`;
  }
  return "";
}

/**
 * Generates an exact 4:3 HTML template reproducing the approved Yog Jivan poster.
 */
export function generatePosterHtml(
  pack: WeeklySchedulePack,
  studioId: StudioId,
  assetsDir: string,
): string {
  const studio = pack.studios[studioId];
  const studioConfig = STUDIOS[studioId];

  const logoUri = base64DataUri(path.join(assetsDir, "official-logo.png"), "image/png");
  const qrUri = base64DataUri(path.join(assetsDir, "qr-zalo.jpg"), "image/jpeg");
  const bgUri = base64DataUri(
    path.join(assetsDir, studioId === "studio1" ? "reference-studio1.jpg" : "reference-studio2.jpg"),
    "image/jpeg",
  );

  const addressText =
    studioId === "studio1"
      ? "Nhà Thi Đấu, Số 1 Bùi Thị Xuân<br>TP. Hải Dương"
      : "STUDIO 2 (CƠ SỞ 2)<br>Tầng 3, Nhà Văn Hóa Lao Động<br>Ngô Quyền, TP. Hải Dương";

  // Category pill color map
  const getCategoryClass = (category?: string, isProp?: boolean) => {
    if (isProp) return "badge-props";
    switch (category) {
      case "flow": return "badge-flow";
      case "classical": return "badge-classical";
      case "strength": return "badge-strength";
      case "mobility": return "badge-mobility";
      case "recovery":
      case "therapeutic": return "badge-therapeutic";
      case "balance": return "badge-balance";
      case "mindfulness":
      case "restore": return "badge-restore";
      default: return "badge-flow";
    }
  };

  const getCategoryLabel = (category?: string, isProp?: boolean) => {
    if (isProp) return "PROPS";
    switch (category) {
      case "flow": return "FLOW";
      case "classical": return "CLASSICAL";
      case "strength": return "STRENGTH";
      case "mobility": return "MOBILITY";
      case "recovery": return "THERAPEUTIC";
      case "balance": return "BALANCE";
      case "mindfulness": return "RESTORE";
      default: return "FLOW";
    }
  };

  // Build grid header cells
  const headerCells = WEEKDAYS.map((wDay) => {
    const dayOverview = studio.days[wDay];
    const teacher = dayOverview.state === "active" ? dayOverview.teacher : (dayOverview.noteVi || "Nghỉ");
    return `
      <th class="day-col">
        <div class="day-vi">${WEEKDAY_LABELS_VI[wDay].toUpperCase()}</div>
        <div class="day-en">${WEEKDAY_LABELS_EN[wDay].toUpperCase()}</div>
        <div class="day-date">${dayOverview.dateDisplayVi}</div>
        <div class="day-teacher">(${teacher})</div>
      </th>
    `;
  }).join("\n");

  // Build grid rows
  const tableRows = studio.rows.map((row) => {
    const [start, end] = row.slot.split("–");
    const cells = WEEKDAYS.map((wDay) => {
      const cell = row.classes[wDay];
      const isInactive = cell.status !== "active";

      if (isInactive) {
        return `
          <td class="class-cell inactive-cell">
            <div class="inactive-note">${cell.noteVi || "Nghỉ"}</div>
          </td>
        `;
      }

      const iconSvg = getIconForClass(cell.classId, cell.propType);
      const catClass = getCategoryClass(undefined, cell.isProp);
      const catLabel = getCategoryLabel(undefined, cell.isProp);

      return `
        <td class="class-cell ${cell.isProp ? "prop-cell" : ""}">
          <div class="cell-content">
            <div class="class-icon">${iconSvg}</div>
            <div class="class-info">
              <div class="class-en">${cell.en}</div>
              <div class="class-vi">${cell.vi}</div>
              <div class="class-teacher">(${cell.teacher})</div>
              <div class="class-badge ${catClass}">${catLabel}</div>
            </div>
          </div>
        </td>
      `;
    }).join("\n");

    return `
      <tr>
        <td class="time-col">
          <div class="time-start">${start?.trim()}</div>
          <div class="time-sep">|</div>
          <div class="time-end">${end?.trim()}</div>
        </td>
        ${cells}
      </tr>
    `;
  }).join("\n");

  // Props legend items
  const propsLegendItems = studioId === "studio1" ? `
    <div class="prop-item"><span class="icon-block"></span>Yoga Block (Gạch)</div>
    <div class="prop-item"><span class="icon-wheel"></span>Yoga Wheel (Bánh xe)</div>
    <div class="prop-item"><span class="icon-ball"></span>Yoga Ball (Bóng)</div>
    <div class="prop-item"><span class="icon-stick"></span>Stick (Gậy)</div>
    <div class="prop-item"><span class="icon-strap"></span>Strap (Dây)</div>
    <div class="prop-item"><span class="icon-aerial"></span>Aerial Yoga (Võng)</div>
    <div class="prop-item"><span class="icon-partner"></span>Partner Yoga (Cặp đôi)</div>
  ` : `
    <div class="prop-item"><span class="icon-block"></span>Yoga Block (Gạch)</div>
    <div class="prop-item"><span class="icon-wheel"></span>Yoga Wheel (Bánh xe)</div>
    <div class="prop-item"><span class="icon-ball"></span>Yoga Ball (Bóng)</div>
    <div class="prop-item"><span class="icon-stick"></span>Stick (Gậy)</div>
    <div class="prop-item"><span class="icon-strap"></span>Strap (Dây)</div>
    <div class="prop-item"><span class="icon-partner"></span>Partner Yoga (Cặp đôi)</div>
  `;

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Yog Jivan Weekly Schedule — ${studioConfig.name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1024px;
    height: 768px;
    position: relative;
    overflow: hidden;
    background-color: #0F281E;
    background-image: url('${bgUri}');
    background-size: 1024px 768px;
    background-repeat: no-repeat;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1E293B;
  }

  /* TOP BAR */
  .logo-box {
    position: absolute;
    top: 26px;
    left: 45px;
    width: 130px;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .logo-img {
    width: 110px;
    height: 110px;
    object-fit: contain;
  }
  .logo-sub {
    font-size: 7.5px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #1F2937;
    margin-top: 3px;
    text-align: center;
  }

  /* HEADER CENTER */
  .header-center {
    position: absolute;
    top: 22px;
    left: 210px;
    width: 480px;
    text-align: center;
  }
  .brand-title {
    font-family: "Georgia", "Times New Roman", serif;
    font-size: 30px;
    font-weight: 900;
    letter-spacing: 1.5px;
    color: #0A1C14;
    text-shadow: 0 1px 2px rgba(255,255,255,0.8);
  }
  .studio-title {
    font-family: "Georgia", "Times New Roman", serif;
    font-size: 32px;
    font-weight: 900;
    color: #C07D2B;
    letter-spacing: 2px;
    margin-top: -2px;
    text-shadow: 0 1px 2px rgba(255,255,255,0.9);
  }
  .tagline {
    font-size: 10px;
    font-weight: 700;
    color: #0A1C14;
    font-style: italic;
    margin-top: 2px;
  }

  /* DATE PILL */
  .date-pill {
    margin: 8px auto 0 auto;
    display: inline-block;
    background: #083822;
    border: 1.5px solid #D4AF37;
    border-radius: 20px;
    padding: 4px 18px;
    color: #FAF6F0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.25);
  }
  .date-pill-title {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.2px;
    color: #FFFFFF;
  }
  .date-pill-dates {
    font-size: 12px;
    font-weight: 800;
    color: #FDE047;
    letter-spacing: 1px;
    margin-top: 1px;
  }

  /* TOP RIGHT ADDRESS & HOTLINE */
  .contact-card {
    position: absolute;
    top: 55px;
    left: 690px;
    width: 175px;
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid #105634;
    border-radius: 8px;
    padding: 6px 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
  .address-badge {
    background: #083822;
    color: #FFFFFF;
    font-size: 8.5px;
    font-weight: 700;
    border-radius: 4px;
    padding: 3px 5px;
    text-align: center;
    line-height: 1.25;
    margin-bottom: 5px;
  }
  .hotline-row {
    font-size: 9px;
    font-weight: 700;
    color: #0F172A;
    line-height: 1.4;
    display: flex;
    justify-content: space-between;
  }
  .hotline-num {
    color: #DC2626;
  }

  /* TOP RIGHT FOLLOW US / QR */
  .qr-card {
    position: absolute;
    top: 48px;
    left: 885px;
    width: 105px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #105634;
    border-radius: 8px;
    padding: 6px 5px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
  .qr-header {
    background: #083822;
    color: #FFFFFF;
    font-size: 8px;
    font-weight: 800;
    border-radius: 4px;
    padding: 2px 0;
    margin-bottom: 4px;
  }
  .qr-handle {
    font-size: 7.5px;
    font-weight: 600;
    color: #94A3B8;
  }
  .qr-image {
    width: 72px;
    height: 72px;
    object-fit: contain;
    margin: 2px auto;
    display: block;
    border: 1px solid #E2E8F0;
    border-radius: 4px;
  }
  .qr-footer {
    font-size: 7.5px;
    font-weight: 800;
    color: #0284C7;
    margin-top: 2px;
    line-height: 1.2;
  }

  /* TIMETABLE GRID */
  .grid-container {
    position: absolute;
    top: 205px;
    left: 18px;
    width: 818px;
    height: 425px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.25);
    border: 1.5px solid #083822;
  }
  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  thead {
    background: #083822;
    color: #FFFFFF;
  }
  th {
    padding: 3px 2px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.5px solid #D4AF37;
  }
  .time-th {
    width: 82px;
    font-size: 9.5px;
    font-weight: 800;
    color: #FDE047;
    line-height: 1.2;
  }
  .day-col {
    width: 122px;
    line-height: 1.15;
  }
  .day-vi { font-size: 9.5px; font-weight: 800; color: #FDE047; }
  .day-en { font-size: 8px; font-weight: 700; color: #FFFFFF; }
  .day-date { font-size: 9px; font-weight: 800; color: #FFFFFF; }
  .day-teacher { font-size: 7.5px; font-weight: 600; color: #E2E8F0; }

  /* TABLE ROWS */
  tr {
    border-bottom: 1px solid #CBD5E1;
  }
  tr:nth-child(even) {
    background: #F8FAFC;
  }
  tr:nth-child(odd) {
    background: #FFFFFF;
  }
  .time-col {
    text-align: center;
    background: #F1F5F9;
    font-weight: 800;
    color: #0F172A;
    font-size: 10px;
    border-right: 1.5px solid #083822;
    line-height: 1.1;
  }
  .time-sep { font-size: 8px; color: #64748B; margin: 1px 0; }

  /* CLASS CELL */
  .class-cell {
    padding: 2px 3px;
    border-right: 1px solid #E2E8F0;
    vertical-align: middle;
  }
  .prop-cell {
    background: #FFFBEB !important;
  }
  .cell-content {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
  }
  .class-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
  }
  .class-info {
    flex-grow: 1;
    overflow: hidden;
    line-height: 1.15;
  }
  .class-en {
    font-size: 9px;
    font-weight: 800;
    color: #0F172A;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .class-vi {
    font-size: 8px;
    font-weight: 800;
    color: #DC2626;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .class-teacher {
    font-size: 7px;
    font-weight: 600;
    color: #64748B;
  }
  .class-badge {
    display: inline-block;
    font-size: 6.5px;
    font-weight: 800;
    border-radius: 2px;
    padding: 0.5px 3px;
    margin-top: 1px;
    letter-spacing: 0.3px;
  }
  .badge-flow { background: #E0F2FE; color: #0369A1; }
  .badge-props { background: #FEF3C7; color: #B45309; }
  .badge-classical { background: #EDE9FE; color: #6D28D9; }
  .badge-strength { background: #FEE2E2; color: #B91C1C; }
  .badge-mobility { background: #E0F2FE; color: #0284C7; }
  .badge-therapeutic { background: #D1FAE5; color: #047857; }
  .badge-balance { background: #CCFBF1; color: #0F766E; }
  .badge-restore { background: #F3E8FF; color: #7E22CE; }

  /* FOOTER */
  .footer-container {
    position: absolute;
    top: 638px;
    left: 18px;
    width: 988px;
    height: 115px;
    display: flex;
    gap: 8px;
  }
  .footer-card {
    background: rgba(255, 255, 255, 0.94);
    border: 1px solid #105634;
    border-radius: 8px;
    padding: 5px 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
  .footer-header {
    background: #083822;
    color: #FFFFFF;
    font-size: 8px;
    font-weight: 800;
    border-radius: 4px;
    padding: 2.5px 6px;
    margin-bottom: 5px;
    display: inline-block;
  }

  /* PROPS BOX */
  .props-box { width: 330px; }
  .props-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px 6px;
  }
  .prop-item {
    font-size: 7.5px;
    font-weight: 700;
    color: #1E293B;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  /* RULES BOX */
  .rules-box { width: 230px; }
  .rules-list {
    font-size: 7px;
    line-height: 1.35;
    color: #0F172A;
    list-style: none;
  }
  .rules-list li { margin-bottom: 2px; }

  /* SOCIAL / TAGLINE BOX */
  .social-box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .social-quote {
    font-size: 8.5px;
    font-weight: 800;
    color: #083822;
    line-height: 1.25;
    text-align: center;
  }
  .social-row {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #E2E8F0;
    padding-top: 4px;
    font-size: 8px;
    font-weight: 700;
    color: #1E293B;
  }
  .social-item { text-align: center; }
  .social-label { font-size: 7px; color: #64748B; font-weight: 600; }
</style>
</head>
<body>

  <!-- TOP-LEFT LOGO -->
  <div class="logo-box">
    <img src="${logoUri}" class="logo-img" alt="Yog Jivan Logo">
    <div class="logo-sub">YOGA • WELLNESS • HIGHER LIVING</div>
  </div>

  <!-- HEADER CENTER -->
  <div class="header-center">
    <div class="brand-title">YOG JIVAN HẢI DƯƠNG</div>
    <div class="studio-title">${studioId === "studio1" ? "STUDIO 1" : "STUDIO 2"}</div>
    <div class="tagline">🌿 Stronger Bodies • Calmer Minds • Happier Lives 🌿</div>
    <div class="date-pill">
      <div class="date-pill-title">📅 WEEKLY CLASS SCHEDULE</div>
      <div class="date-pill-dates">${pack.weekLabelVi}</div>
    </div>
  </div>

  <!-- TOP RIGHT ADDRESS CARD -->
  <div class="contact-card">
    <div class="address-badge">${addressText}</div>
    <div class="hotline-row"><span>Master Anil:</span> <span class="hotline-num">0782.046.066</span></div>
    <div class="hotline-row"><span>Ms Chung:</span> <span class="hotline-num">0396.310.178</span></div>
  </div>

  <!-- TOP RIGHT FOLLOW US / REAL QR -->
  <div class="qr-card">
    <div class="qr-header">FOLLOW US<br><span class="qr-handle">@yogjivan</span></div>
    <img src="${qrUri}" class="qr-image" alt="Zalo QR">
    <div class="qr-footer">QUÉT MÃ ZALO<br><span style="font-size:6.5px;color:#475569;">để tư vấn &amp; đăng ký</span></div>
  </div>

  <!-- TIMETABLE GRID -->
  <div class="grid-container">
    <table>
      <thead>
        <tr>
          <th class="time-th">THỜI GIAN<br>(TIME)</th>
          ${headerCells}
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  </div>

  <!-- FOOTER SECTION -->
  <div class="footer-container">
    <!-- PROPS BOX -->
    <div class="footer-card props-box">
      <div class="footer-header">KÝ HIỆU DỤNG CỤ (PROPS)</div>
      <div class="props-grid">
        ${propsLegendItems}
      </div>
    </div>

    <!-- RULES BOX -->
    <div class="footer-card rules-box">
      <div class="footer-header">QUY ĐỊNH HỌC VIÊN LƯU Ý:</div>
      <ul class="rules-list">
        <li>➊ Đến trước giờ tập 5-10 phút để ổn định vị trí.</li>
        <li>➋ Giữ điện thoại ở chế độ im lặng trong giờ tập.</li>
        <li>➌ Mặc trang phục thoải mái, mang khăn &amp; bình nước.</li>
        <li>➍ Báo trước với giáo viên nếu có chấn thương.</li>
        <li>➎ Tôn trọng không gian chung, giữ vệ sinh sạch sẽ.</li>
      </ul>
    </div>

    <!-- SOCIAL / TAGLINE BOX -->
    <div class="footer-card social-box">
      <div class="social-quote">
        CÙNG NHAU HÍT THỞ • CÙNG NHAU PHÁT TRIỂN • CÙNG NHAU TỎA SÁNG<br>
        <span style="font-size:7.5px;color:#C07D2B;font-style:italic;">Hành trình sức khỏe bắt đầu từ hôm nay!</span>
      </div>
      <div class="social-row">
        <div class="social-item">
          <div>Facebook</div>
          <div class="social-label">@Yog Jivan Hải Dương</div>
        </div>
        <div class="social-item">
          <div>TikTok</div>
          <div class="social-label">@yogjivan</div>
        </div>
        <div class="social-item">
          <div>Zalo</div>
          <div class="social-label">0782.046.066 | 0396.310.178</div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Deterministically renders high-resolution PNG posters using Chrome headless.
 */
export async function renderPostersWithChrome(
  pack: WeeklySchedulePack,
  assetsDir: string,
  outputDir: string,
): Promise<{ studio1Png: string; studio2Png: string }> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const s1Html = generatePosterHtml(pack, "studio1", assetsDir);
  const s2Html = generatePosterHtml(pack, "studio2", assetsDir);

  const s1HtmlPath = path.join(outputDir, `poster-studio1-${pack.weekStart}.html`);
  const s2HtmlPath = path.join(outputDir, `poster-studio2-${pack.weekStart}.html`);

  fs.writeFileSync(s1HtmlPath, s1Html, "utf-8");
  fs.writeFileSync(s2HtmlPath, s2Html, "utf-8");

  const s1PngPath = path.join(outputDir, `poster-studio1-${pack.weekStart}.png`);
  const s2PngPath = path.join(outputDir, `poster-studio2-${pack.weekStart}.png`);

  const s1LatestPng = path.join(outputDir, `poster-studio1-latest.png`);
  const s2LatestPng = path.join(outputDir, `poster-studio2-latest.png`);

  const chromePath = process.env.CHROME_BIN || (process.platform === "darwin"
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : "/usr/bin/google-chrome");

  if (!fs.existsSync(chromePath)) {
    throw new Error(`Chrome not found at ${chromePath}; poster PNGs were NOT generated`);
  }
  {
    execSync(
      `"${chromePath}" --headless --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=1500 --screenshot="${s1PngPath}" --window-size=1024,768 "${s1HtmlPath}"`,
      { stdio: "ignore" },
    );
    execSync(
      `"${chromePath}" --headless --no-sandbox --disable-gpu --disable-dev-shm-usage --hide-scrollbars --virtual-time-budget=1500 --screenshot="${s2PngPath}" --window-size=1024,768 "${s2HtmlPath}"`,
      { stdio: "ignore" },
    );

    fs.copyFileSync(s1PngPath, s1LatestPng);
    fs.copyFileSync(s2PngPath, s2LatestPng);
  }

  if (!fs.existsSync(s1LatestPng) || !fs.existsSync(s2LatestPng)) {
    throw new Error("Poster PNG rendering incomplete");
  }
  return {
    studio1Png: s1LatestPng,
    studio2Png: s2LatestPng,
  };
}
