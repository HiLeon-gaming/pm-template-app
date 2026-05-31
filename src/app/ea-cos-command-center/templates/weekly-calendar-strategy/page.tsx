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
  { id: "full", label: "Full Strategy", desc: "Themes + protection rules + review", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Weekly themes only", icon: AlignJustify },
];

function WeeklyCalendarStrategyContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const themesRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9"; const accentDark = "#0284C7";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📅 WEEKLY CALENDAR STRATEGY</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderThemes = () => (
    <div ref={themesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 THIS WEEK&apos;S FOCUS THEMES</td></tr></tbody></table>
      <CopyButton targetRef={themesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Week Of</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Theme / Priority</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>[e.g., Board prep week / Q2 planning / Hiring push]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "14%" }}>Day</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Focus Theme</th>
          <th style={S.thPrimary}>Key Meetings / Commitments</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Must Protect</th>
        </tr></thead>
        <tbody>
          {[
            { day: "Monday", theme: "Strategy & Planning", meetings: "[Leadership sync, 1:1 with CFO]", protect: "[Morning deep work block]" },
            { day: "Tuesday", theme: "External / Stakeholders", meetings: "[Investor call, partner meeting]", protect: "[Prep time before each call]" },
            { day: "Wednesday", theme: "Team & Operations", meetings: "[All-hands, team 1:1s]", protect: "[No meetings before 10am]" },
            { day: "Thursday", theme: "Board / Governance", meetings: "[Board prep session, steering committee]", protect: "[2-hour board prep block]" },
            { day: "Friday", theme: "Review & Wrap-Up", meetings: "[Weekly exec brief, close-out]", protect: "[Friday PM — no new meetings]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.theme}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.meetings}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic", color: "#DC2626" }}>{r.protect}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🛡️ CALENDAR PROTECTION RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#059669", color: "#FFFFFF", padding: "9px 12px", fontWeight: 700, fontSize: "12px", textAlign: "center" as const, border: `1.5px solid ${C.borderDark}` }}>🟢 ALWAYS PROTECT</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9" }}>
              &bull; [Morning deep work: 8-10am Mon/Wed/Fri]<br />
              &bull; [Lunch break: 12-1pm daily]<br />
              &bull; [Friday PM: no new meetings after 2pm]<br />
              &bull; [15-min buffer between back-to-back meetings]<br />
              &bull; [24-hr prep time before external meetings]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#DC2626", color: "#FFFFFF", padding: "9px 12px", fontWeight: 700, fontSize: "12px", textAlign: "center" as const, border: `1.5px solid ${C.borderDark}` }}>🔴 DECLINE / PUSH BACK</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9" }}>
              &bull; [Meetings with no agenda or purpose]<br />
              &bull; [&ldquo;Quick sync&rdquo; that could be an email]<br />
              &bull; [Back-to-back externals with no buffer]<br />
              &bull; [Recurring meetings that have lost purpose]<br />
              &bull; [Last-minute adds to a packed day]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Calendar size={11} />Calendar</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Calendar size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Calendar Strategy</h2><p className="text-xs font-medium text-sky-600">Focus Themes &amp; Protection Rules</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What matters this week and what must be protected. Keeps time aligned to strategy.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderThemes()}{renderRules()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderThemes()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyCalendarStrategyPage() { return <ThemeProvider><WeeklyCalendarStrategyContent /></ThemeProvider>; }
