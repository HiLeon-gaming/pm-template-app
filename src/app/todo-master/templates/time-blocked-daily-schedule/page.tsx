"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Clock,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full-day" | "work-hours";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full-day", label: "Full Day", desc: "5 AM – 10 PM", icon: LayoutDashboard },
  { id: "work-hours", label: "Work Hours", desc: "7 AM – 7 PM", icon: AlignJustify },
];

/* ── Activity category definitions ── */
const CATEGORIES = [
  { label: "Deep Work", symbol: "◆", colorKey: "primary" as const },
  { label: "Meetings", symbol: "●", colorKey: "secondary" as const },
  { label: "Admin / Email", symbol: "■", colorKey: "accent" as const },
  { label: "Break / Recharge", symbol: "▲", colorKey: "badgeGreenFg" as const },
  { label: "Personal / Commute", symbol: "◇", colorKey: "badgeGrayFg" as const },
];

function TimeBlockedContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full-day");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const energyRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  /* ── Layout table styles ── */
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const fullDaySlots = [
    "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",
    "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM",
  ];
  const workSlots = [
    "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
  ];

  const slots = layout === "full-day" ? fullDaySlots : workSlots;

  /* ═══════ SECTIONS ═══════ */

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "16px 20px",
            fontSize: "22px", fontWeight: 800, fontFamily: S.font,
            letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`,
            textAlign: "center" as const,
          }}>
            🕐 TIME-BLOCKED DAILY SCHEDULE
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Own Your Hours
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Day</td>
            <td style={{ ...S.td0, width: "36%" }}>[Monday]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Today&apos;s Theme</td>
            <td style={S.tdAlt}>[e.g., Deep Work Sprint / Meeting Marathon / Admin Catch-up]</td>
            <td style={S.tdLabelAlt}>Top Goal</td>
            <td style={S.tdAlt}>[What does a successful day look like?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Color-coded legend ── */
  const renderLegend = () => (
    <div ref={legendRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📊 ACTIVITY CATEGORY LEGEND</td></tr></tbody></table>
      <CopyButton targetRef={legendRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            {CATEGORIES.map((cat) => (
              <th key={cat.label} style={{ ...S.thSecondary, textAlign: "center" as const, width: "20%" }}>{cat.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {CATEGORIES.map((cat) => (
              <td key={cat.label} style={{
                ...S.td0, textAlign: "center" as const, fontSize: "20px",
                color: C[cat.colorKey], fontWeight: 700,
              }}>
                {cat.symbol}
              </td>
            ))}
          </tr>
          <tr>
            {CATEGORIES.map((cat) => (
              <td key={cat.label} style={{
                ...S.tdAlt, textAlign: "center" as const, fontSize: "10px",
                fontStyle: "italic" as const, color: C.textMuted,
              }}>
                Use {cat.symbol} in the Category column
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Main schedule grid ── */
  const renderSchedule = () => (
    <div ref={scheduleRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📅 SCHEDULE</div>
      <CopyButton targetRef={scheduleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Time</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Cat.</th>
            <th style={S.thPrimary}>Activity / Task</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Duration</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((time, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isHalfHour = time.includes(":30");
            return (
              <tr key={time}>
                <td style={{
                  ...S.td0, backgroundColor: bg, textAlign: "center" as const,
                  fontWeight: isHalfHour ? 400 : 700,
                  fontSize: isHalfHour ? "11px" : "12px",
                  color: isHalfHour ? C.textMuted : C.primary,
                }}>{time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px" }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", color: C.textMuted }}>{isHalfHour ? "30 min" : "1 hr"}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Energy & Time Audit ── */
  const renderEnergy = () => (
    <div ref={energyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚡ ENERGY &amp; TIME AUDIT</div>
      <CopyButton targetRef={energyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "30%" }}>Metric</th>
            <th style={{ ...S.thPrimary, width: "20%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thPrimary, width: "20%", textAlign: "center" as const }}>Actual</th>
            <th style={S.thPrimary}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {[
            { metric: "◆ Deep Work hours", target: "[3–4 hrs]", actual: "[___] hrs" },
            { metric: "● Meeting hours", target: "[2–3 hrs]", actual: "[___] hrs" },
            { metric: "■ Admin / Email hours", target: "[1–2 hrs]", actual: "[___] hrs" },
            { metric: "▲ Breaks taken", target: "[3–4]", actual: "[___]" },
            { metric: "Tasks completed (from schedule)", target: "[___]", actual: "[___]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, color: C.primary }}>{row.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Energy curve */}
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "25%" }}>Time of Day</th>
            <th style={{ ...S.thSecondary, textAlign: "center" as const }}>Energy Level</th>
            <th style={{ ...S.thSecondary, width: "35%" }}>Best Activity Type</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: "🌅 Early Morning (5–8 AM)", energy: "☐ Peak ☐ Good ☐ Low", best: "[Deep Work / Exercise / Planning]" },
            { time: "☀️ Late Morning (8–12 PM)", energy: "☐ Peak ☐ Good ☐ Low", best: "[Meetings / Creative Work]" },
            { time: "🌤️ Early Afternoon (12–3 PM)", energy: "☐ Peak ☐ Good ☐ Low", best: "[Admin / Light Tasks / Break]" },
            { time: "🌇 Late Afternoon (3–6 PM)", energy: "☐ Peak ☐ Good ☐ Low", best: "[Wrap-up / Email / Planning]" },
            { time: "🌙 Evening (6–10 PM)", energy: "☐ Peak ☐ Good ☐ Low", best: "[Personal / Reading / Prep]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.energy}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{row.best}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Notes & Tomorrow Prep ── */
  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📝 SCHEDULE NOTES &amp; TOMORROW PREP</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "50%" }}>What worked today with my schedule?</th>
            <th style={S.thSecondary}>What should I adjust tomorrow?</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, height: "26px" }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "26px" }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.footerText, padding: "8px 20px",
            fontSize: "10px", fontFamily: S.font, textAlign: "center" as const,
            letterSpacing: "0.06em",
          }}>
            ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ═══════ LAYOUTS ═══════ */

  const renderFullDay = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderLegend()}
      {renderSchedule()}
      {/* 2-col: Energy | Notes */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderEnergy()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderNotes()}</td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  const renderWorkHours = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Legend | Energy Curve */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "10px" }}>{renderLegend()}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "10px" }}>{renderEnergy()}</td>
          </tr>
        </tbody>
      </table>
      {renderSchedule()}
      {renderNotes()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
            <Clock size={11} />
            Time Mastery
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Time-Blocked Daily Schedule</h2>
              <p className="text-xs font-medium text-blue-600">Own Your Hours &mdash; Every Minute Intentional</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Color-coded time blocking with activity categories, energy tracking, and schedule
            audit. Choose Full Day (5 AM–10 PM) or Work Hours (7 AM–7 PM with 30-min slots).
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Schedule Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full-day" && renderFullDay()}
          {layout === "work-hours" && renderWorkHours()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function TimeBlockedDailySchedulePage() {
  return (
    <ThemeProvider>
      <TimeBlockedContent />
    </ThemeProvider>
  );
}
