"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Calendar, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Rhythm", desc: "Daily + weekly + monthly + quarterly", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Weekly rhythm only", icon: AlignJustify },
];

function OperatingRhythmContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const dailyRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);
  const monthlyRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OPERATING RHYTHM PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Initiatives &amp; Alignment</td></tr>
    </tbody></table>
  );

  const renderDaily = () => (
    <div ref={dailyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>DAILY RHYTHM</div>
      <CopyButton targetRef={dailyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>Activity</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Duration</th>
        </tr></thead>
        <tbody>
          {[
            { time: "7:30 AM", act: "[Morning briefing prep — review calendar, priorities, overnight flags]", owner: "[EA/CoS]", dur: "15 min" },
            { time: "8:00 AM", act: "[Exec morning sync — top 3 priorities, key meetings, risk flags]", owner: "[Exec + CoS]", dur: "15 min" },
            { time: "12:00 PM", act: "[Midday check — inbox triage, follow-up nudges, calendar adjustments]", owner: "[EA/CoS]", dur: "15 min" },
            { time: "5:00 PM", act: "[End-of-day wrap — action items logged, tomorrow prep started]", owner: "[EA/CoS]", dur: "15 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#0EA5E9" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.dur}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWeekly = () => (
    <div ref={weeklyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>WEEKLY RHYTHM</div>
      <CopyButton targetRef={weeklyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Day</th>
          <th style={S.thPrimary}>Key Activity</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Duration</th>
        </tr></thead>
        <tbody>
          {[
            { day: "Monday", act: "[Week planning: review priorities, set weekly goals, prep for key meetings]", owner: "[Exec + CoS]", dur: "30 min" },
            { day: "Tuesday", act: "[Leadership team sync: status updates, decisions, escalations]", owner: "[Exec + LT]", dur: "60 min" },
            { day: "Wednesday", act: "[Deep work / focus time: strategic thinking, 1:1s]", owner: "[Exec]", dur: "2-3 hrs" },
            { day: "Thursday", act: "[External meetings: stakeholders, board members, partners]", owner: "[Exec + EA]", dur: "Varies" },
            { day: "Friday", act: "[Week closeout: review actions, prep next week, send recaps]", owner: "[CoS + EA]", dur: "45 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.dur}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMonthly = () => (
    <div ref={monthlyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>MONTHLY &amp; QUARTERLY RHYTHM</div>
      <CopyButton targetRef={monthlyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Cadence</th>
          <th style={S.thPrimary}>Activity</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Typical Timing</th>
        </tr></thead>
        <tbody>
          {[
            { cadence: "Monthly", act: "[Board chair pre-brief call]", owner: "[Exec + CoS]", timing: "Last week of month" },
            { cadence: "Monthly", act: "[All-hands / town hall prep + delivery]", owner: "[Exec + Comms]", timing: "First week of month" },
            { cadence: "Monthly", act: "[Stakeholder relationship audit — who needs attention?]", owner: "[CoS]", timing: "Mid-month" },
            { cadence: "Quarterly", act: "[OKR review + goal alignment check]", owner: "[Exec + LT]", timing: "First 2 weeks of quarter" },
            { cadence: "Quarterly", act: "[Board meeting + prep cycle]", owner: "[Exec + CoS + CFO]", timing: "Per board schedule" },
            { cadence: "Quarterly", act: "[Recurring meeting audit — stop/start/continue]", owner: "[CoS + EA]", timing: "End of quarter" },
            { cadence: "Annual", act: "[Strategic planning offsite]", owner: "[Exec + LT]", timing: "Q4 or early Q1" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: "#7C3AED" }}>{r.cadence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.timing}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Calendar size={11} />Rhythm</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Calendar size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Operating Rhythm Planner</h2><p className="text-xs font-medium text-emerald-600">Daily + Weekly + Monthly + Quarterly Cadence</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The full operating rhythm for exec support. Daily, weekly, monthly, quarterly cadences in one view.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDaily()}{renderWeekly()}{renderMonthly()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderWeekly()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function OperatingRhythmPlannerPage() { return <ThemeProvider><OperatingRhythmContent /></ThemeProvider>; }
