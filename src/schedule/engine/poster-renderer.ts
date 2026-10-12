import type { WeeklySchedulePack, StudioWeeklySchedule } from "../types";
import type { StudioId } from "../config/studios";
import { STUDIOS } from "../config/studios";
import { WEEKDAYS, WEEKDAY_LABELS_VI } from "../config/schedule-rules";
import * as QRCode from "qrcode";
import * as fs from "fs";
import * as path from "path";

export interface RenderPosterOptions {
  width?: number; // default 1600 (4:3 landscape)
  height?: number; // default 1200
  qrUrl?: string; // default https://zalo.me/84782046066
}

/**
 * Deterministic vector SVG poster renderer for Yog Jivan weekly timetables.
 * Consumes the CANONICAL schedule pack JSON.
 */
export async function renderStudioPosterSvg(
  pack: WeeklySchedulePack,
  studioId: StudioId,
  options: RenderPosterOptions = {},
): Promise<string> {
  const width = options.width || 1600;
  const height = options.height || 1200;
  const qrUrl = options.qrUrl || "https://zalo.me/84782046066";

  const studio = pack.studios[studioId];
  const studioConfig = STUDIOS[studioId];

  // Generate QR code SVG snippet
  const rawQrSvg = await QRCode.toString(qrUrl, {
    type: "svg",
    margin: 1,
    color: {
      dark: "#0F281E",
      light: "#FFFFFF",
    },
  });

  // Extract inner paths from QR SVG
  const qrInnerMatch = rawQrSvg.match(/<path[^>]*\/>/g);
  const qrPaths = qrInnerMatch ? qrInnerMatch.join("\n") : "";
  // Extract viewBox or default to 0 0 33 33
  const qrViewBoxMatch = rawQrSvg.match(/viewBox="([^"]+)"/);
  const qrViewBox = qrViewBoxMatch ? qrViewBoxMatch[1] : "0 0 33 33";

  // Grid layout geometry
  const gridX = 70;
  const gridY = 240;
  const gridW = 1460;
  const gridH = 750;

  const colCount = 7; // Time column + 6 days
  const rowCount = 6; // Header row + 5 slots
  const colW = gridW / colCount;
  const rowH = gridH / rowCount;

  // Header day cells
  let dayHeadersSvg = "";
  WEEKDAYS.forEach((wDay, idx) => {
    const x = gridX + colW * (idx + 1);
    const dayOverview = studio.days[wDay];
    const isHoliday = dayOverview.state !== "active";
    const teacherText = isHoliday
      ? dayOverview.noteVi || "Nghỉ"
      : dayOverview.teacher;

    dayHeadersSvg += `
      <g transform="translate(${x}, ${gridY})">
        <rect width="${colW - 6}" height="${rowH - 6}" rx="10" fill="#1B4232" stroke="#D4AF37" stroke-width="1.2" opacity="0.95"/>
        <text x="${(colW - 6) / 2}" y="32" font-family="'Cinzel', 'Playfair Display', serif, sans-serif" font-size="19" font-weight="700" fill="#D4AF37" text-anchor="middle" letter-spacing="1">
          ${WEEKDAY_LABELS_VI[wDay]}
        </text>
        <text x="${(colW - 6) / 2}" y="56" font-family="'Inter', 'Montserrat', sans-serif" font-size="14" font-weight="500" fill="#FAF6F0" text-anchor="middle" opacity="0.85">
          ${dayOverview.dateDisplayVi}
        </text>
        <rect x="${(colW - 6) / 2 - 40}" y="67" width="80" height="20" rx="4" fill="${isHoliday ? "#8B0000" : "#D4AF37"}" opacity="${isHoliday ? "0.9" : "0.2"}"/>
        <text x="${(colW - 6) / 2}" y="81" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="${isHoliday ? "#FFFFFF" : "#FAF6F0"}" text-anchor="middle">
          ${teacherText}
        </text>
      </g>
    `;
  });

  // Table rows and class cells
  let rowsSvg = "";
  studio.rows.forEach((row, rowIdx) => {
    const y = gridY + rowH * (rowIdx + 1);

    // Time column cell
    rowsSvg += `
      <g transform="translate(${gridX}, ${y})">
        <rect width="${colW - 6}" height="${rowH - 6}" rx="8" fill="#143729" stroke="#D4AF37" stroke-width="1" opacity="0.8"/>
        <text x="${(colW - 6) / 2}" y="${(rowH - 6) / 2 + 6}" font-family="'Inter', 'Roboto Mono', monospace" font-size="16" font-weight="700" fill="#FAF6F0" text-anchor="middle" letter-spacing="0.5">
          ${row.slot}
        </text>
      </g>
    `;

    // 6 day cells
    WEEKDAYS.forEach((wDay, colIdx) => {
      const x = gridX + colW * (colIdx + 1);
      const cell = row.classes[wDay];
      const isInactive = cell.status !== "active";

      const bgFill = isInactive
        ? "#2A1810"
        : cell.isProp
        ? "#1B3B2B"
        : "#FAF6F0";
      const bgStroke = cell.isProp ? "#D4AF37" : "#E2D8CC";
      const strokeWidth = cell.isProp ? "1.6" : "0.8";

      const titleEnColor = isInactive ? "#FAF6F0" : cell.isProp ? "#FAF6F0" : "#0F281E";
      const titleViColor = isInactive ? "#FFA07A" : "#C53030"; // Bold Red Vietnamese name

      rowsSvg += `
        <g transform="translate(${x}, ${y})">
          <rect width="${colW - 6}" height="${rowH - 6}" rx="8" fill="${bgFill}" stroke="${bgStroke}" stroke-width="${strokeWidth}" opacity="${isInactive ? "0.7" : "0.98"}"/>
          
          ${cell.isProp ? `
            <circle cx="${colW - 18}" cy="18" r="4.5" fill="#D4AF37"/>
          ` : ""}

          ${isInactive ? `
            <text x="${(colW - 6) / 2}" y="${(rowH - 6) / 2 - 2}" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#FFA07A" text-anchor="middle">
              ${cell.noteVi || "Nghỉ"}
            </text>
          ` : `
            <text x="${(colW - 6) / 2}" y="36" font-family="'Inter', 'Montserrat', sans-serif" font-size="14" font-weight="700" fill="${titleEnColor}" text-anchor="middle">
              ${escapeXml(cell.en)}
            </text>
            <text x="${(colW - 6) / 2}" y="58" font-family="'Inter', sans-serif" font-size="12" font-weight="800" fill="${titleViColor}" text-anchor="middle" letter-spacing="0.2">
              ${escapeXml(cell.vi)}
            </text>
            ${cell.isProp && cell.propType ? `
              <rect x="${(colW - 6) / 2 - 28}" y="70" width="56" height="15" rx="3" fill="#D4AF37" opacity="0.3"/>
              <text x="${(colW - 6) / 2}" y="81" font-family="'Inter', sans-serif" font-size="9.5" font-weight="700" fill="#D4AF37" text-anchor="middle" letter-spacing="0.5">
                ${cell.propType.toUpperCase()}
              </text>
            ` : ""}
          `}
        </g>
      `;
    });
  });

  const propsLegendText =
    studioId === "studio1"
      ? "• Đạo cụ tuần này: Dây · Gậy · Gạch · Bóng · Bánh xe · Võng Aerial (Cơ sở 1) · Cặp đôi"
      : "• Đạo cụ tuần này: Dây · Gậy · Gạch · Bóng · Bánh xe · Cặp đôi (Không có Aerial)";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Background Gradient: Mountain sunrise/sunset atmosphere -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091811"/>
      <stop offset="40%" stop-color="#0F281E"/>
      <stop offset="85%" stop-color="#193B2B"/>
      <stop offset="100%" stop-color="#244836"/>
    </linearGradient>

    <!-- Header Gold Banner Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C5A059"/>
      <stop offset="50%" stop-color="#F3E5AB"/>
      <stop offset="100%" stop-color="#C5A059"/>
    </linearGradient>

    <!-- Misty Mountain Silhouette -->
    <linearGradient id="mountainGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#07120D" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#102B20" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>

  <!-- Mountain Landscape Silhouettes in Background -->
  <path d="M 0,980 Q 250,780 500,850 T 1100,790 T 1600,920 L 1600,1200 L 0,1200 Z" fill="url(#mountainGrad)"/>
  <path d="M 0,1050 Q 380,890 800,960 T 1600,990 L 1600,1200 L 0,1200 Z" fill="#06100B" opacity="0.8"/>

  <!-- Elegant Botanical Leaves on Border Corners -->
  <g fill="#D4AF37" opacity="0.18">
    <!-- Top-Right Botanical Foliage -->
    <path d="M 1520,30 Q 1550,80 1590,90 Q 1570,50 1520,30 Z"/>
    <path d="M 1480,50 Q 1520,110 1570,130 Q 1540,80 1480,50 Z"/>
    <path d="M 1540,90 Q 1580,140 1600,190 Q 1580,130 1540,90 Z"/>
    <!-- Top-Left Foliage -->
    <path d="M 40,30 Q 70,80 120,90 Q 70,60 40,30 Z"/>
    <path d="M 20,70 Q 60,110 110,140 Q 60,100 20,70 Z"/>
  </g>

  <!-- Seated Yoga Silhouette on Background Right Side -->
  <g transform="translate(1360, 600) scale(0.7)" fill="#D4AF37" opacity="0.12">
    <!-- Seated Lotus Figure -->
    <circle cx="150" cy="90" r="32"/>
    <path d="M 150,130 C 120,130 90,170 80,240 C 70,300 50,380 40,430 C 90,445 150,448 150,448 C 150,448 210,445 260,430 C 250,380 230,300 220,240 C 210,170 180,130 150,130 Z"/>
    <path d="M 50,420 C 20,430 0,460 30,480 C 80,490 220,490 270,480 C 300,460 280,430 250,420 C 220,450 80,450 50,420 Z"/>
  </g>

  <!-- TOP HEADER / BRAND BAR -->
  <!-- Authentic Yog Jivan Logo Placeholder (Vector emblem) -->
  <g transform="translate(70, 48)">
    <!-- Golden Lotus & Sun Emblem -->
    <circle cx="36" cy="36" r="34" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>
    <path d="M 36,14 C 42,24 48,34 36,54 C 24,34 30,24 36,14 Z" fill="url(#goldGrad)"/>
    <path d="M 36,24 C 48,28 56,38 48,54 C 40,42 36,36 36,24 Z" fill="url(#goldGrad)" opacity="0.85"/>
    <path d="M 36,24 C 24,28 16,38 24,54 C 32,42 36,36 36,24 Z" fill="url(#goldGrad)" opacity="0.85"/>
  </g>

  <!-- Brand Typography -->
  <text x="160" y="70" font-family="'Cinzel', 'Playfair Display', serif" font-size="34" font-weight="700" fill="url(#goldGrad)" letter-spacing="3">
    YOG JIVAN
  </text>
  <text x="162" y="96" font-family="'Montserrat', 'Inter', sans-serif" font-size="13" font-weight="600" fill="#FAF6F0" letter-spacing="4" opacity="0.9">
    HẢI DƯƠNG · SANCTUARY &amp; WELLNESS
  </text>

  <!-- Poster Title & Studio Name -->
  <g transform="translate(680, 50)">
    <rect x="-10" y="0" width="560" height="78" rx="12" fill="#143729" stroke="#D4AF37" stroke-width="1.4" opacity="0.9"/>
    <text x="270" y="32" font-family="'Cinzel', 'Playfair Display', serif" font-size="20" font-weight="700" fill="#FAF6F0" text-anchor="middle" letter-spacing="2">
      LỊCH LỚP HỌC TUẦN NÀY
    </text>
    <text x="270" y="60" font-family="'Inter', sans-serif" font-size="15" font-weight="800" fill="#D4AF37" text-anchor="middle" letter-spacing="1">
      ${escapeXml(studioConfig.vietnameseName.toUpperCase())}
    </text>
  </g>

  <!-- Dates & Address Sub-bar -->
  <g transform="translate(70, 160)">
    <!-- Week Range Badge -->
    <rect x="0" y="0" width="340" height="42" rx="8" fill="#1C4434" stroke="#D4AF37" stroke-width="1.2"/>
    <text x="170" y="27" font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#FAF6F0" text-anchor="middle">
      Tuần: ${pack.weekLabelVi}
    </text>

    <!-- Address & Hotline Banner -->
    <text x="370" y="26" font-family="'Inter', sans-serif" font-size="13.5" font-weight="500" fill="#FAF6F0" opacity="0.95">
      Địa chỉ: ${escapeXml(studio.address)} · Hotline: 0782.046.066
    </text>
  </g>

  <!-- TIMETABLE GRID -->
  <!-- Headers -->
  <g transform="translate(${gridX}, ${gridY})">
    <rect width="${colW - 6}" height="${rowH - 6}" rx="10" fill="#143729" stroke="#D4AF37" stroke-width="1.2"/>
    <text x="${(colW - 6) / 2}" y="${(rowH - 6) / 2 + 7}" font-family="'Cinzel', serif" font-size="18" font-weight="700" fill="#D4AF37" text-anchor="middle" letter-spacing="1">
      GIỜ HỌC
    </text>
  </g>
  ${dayHeadersSvg}

  <!-- Data Rows -->
  ${rowsSvg}

  <!-- FOOTER SECTION (Rules, Props Legend, Contacts, QR) -->
  <g transform="translate(70, 1025)">
    <!-- Footer container -->
    <rect x="0" y="0" width="1460" height="135" rx="14" fill="#0D2018" stroke="#D4AF37" stroke-width="1.2" opacity="0.95"/>

    <!-- Left Block: Student Rules & Props Legend -->
    <text x="30" y="32" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#D4AF37" letter-spacing="0.5">
      QUY ĐỊNH LỚP HỌC YOG JIVAN:
    </text>
    <text x="30" y="55" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#FAF6F0" opacity="0.9">
      • Học viên vui lòng đến trước giờ học 5-10 phút · Trang phục gọn gàng, thấm hút mồ hôi · Thông báo trước với giáo viên nếu có chấn thương
    </text>
    <text x="30" y="80" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#D4AF37" opacity="0.95">
      ${propsLegendText}
    </text>
    <text x="30" y="105" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#FAF6F0" opacity="0.85">
      Facebook: Yog Jivan Hải Dương  ·  TikTok: @yogjivan  ·  Website: www.yogjivan.com
    </text>

    <!-- Center Contact Info -->
    <line x1="970" y1="18" x2="970" y2="117" stroke="#D4AF37" stroke-width="0.8" opacity="0.4"/>
    <g transform="translate(995, 25)">
      <text x="0" y="18" font-family="'Cinzel', serif" font-size="13" font-weight="700" fill="#D4AF37" letter-spacing="1">
        LIÊN HỆ &amp; TƯ VẤN:
      </text>
      <text x="0" y="44" font-family="'Inter', sans-serif" font-size="13.5" font-weight="700" fill="#FAF6F0">
        Master Anil: 0782.046.066
      </text>
      <text x="0" y="68" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#FAF6F0" opacity="0.9">
        Ms Chung: 0396.310.178
      </text>
    </g>

    <!-- Right Block: Real Zalo QR Code -->
    <line x1="1260" y1="18" x2="1260" y2="117" stroke="#D4AF37" stroke-width="0.8" opacity="0.4"/>
    <g transform="translate(1280, 15)">
      <!-- White card for crisp QR scanning -->
      <rect x="0" y="0" width="105" height="105" rx="8" fill="#FFFFFF"/>
      <svg x="5" y="5" width="95" height="95" viewBox="${qrViewBox}">
        ${qrPaths}
      </svg>
      <text x="52.5" y="117" font-family="'Inter', sans-serif" font-size="10.5" font-weight="700" fill="#D4AF37" text-anchor="middle">
        QUÉT MÃ ZALO
      </text>
    </g>
  </g>
</svg>
  `;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generates both Studio 1 and Studio 2 posters as standalone SVG and HTML preview files.
 */
export async function generateWeeklyPosters(
  pack: WeeklySchedulePack,
  outputDir: string,
): Promise<{ studio1Svg: string; studio2Svg: string }> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const s1Svg = await renderStudioPosterSvg(pack, "studio1");
  const s2Svg = await renderStudioPosterSvg(pack, "studio2");

  const s1Path = path.join(outputDir, `poster-studio1-${pack.weekStart}.svg`);
  const s2Path = path.join(outputDir, `poster-studio2-${pack.weekStart}.svg`);

  // Also write canonical latest copies
  const s1LatestPath = path.join(outputDir, "poster-studio1-latest.svg");
  const s2LatestPath = path.join(outputDir, "poster-studio2-latest.svg");

  fs.writeFileSync(s1Path, s1Svg, "utf-8");
  fs.writeFileSync(s2Path, s2Svg, "utf-8");
  fs.writeFileSync(s1LatestPath, s1Svg, "utf-8");
  fs.writeFileSync(s2LatestPath, s2Svg, "utf-8");

  // Create HTML wrapper for instant browser viewing
  const htmlViewer = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Yog Jivan Weekly Schedule Posters — ${pack.weekLabelVi}</title>
  <style>
    body { margin: 0; background: #0A110D; color: #FFF; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding: 20px; }
    h1 { font-size: 24px; color: #D4AF37; margin-bottom: 20px; }
    .poster-box { margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border-radius: 8px; overflow: hidden; max-width: 1200px; width: 100%; }
    .poster-box svg { width: 100%; height: auto; display: block; }
  </style>
</head>
<body>
  <h1>Yog Jivan Weekly Schedule Posters — ${pack.weekLabelVi}</h1>
  <div class="poster-box">
    ${s1Svg}
  </div>
  <div class="poster-box">
    ${s2Svg}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, "preview.html"), htmlViewer, "utf-8");

  return { studio1Svg: s1LatestPath, studio2Svg: s2LatestPath };
}
