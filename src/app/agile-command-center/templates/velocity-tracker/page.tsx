"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TrendingUp, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Velocity + analysis", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Velocity table only", icon: AlignJustify },
];

function VelocityTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📈 ESTIMATION &amp; VELOCITY TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Sprint Length</td><td style={{ ...S.td0, width: "32%" }}>[2 weeks]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Avg Velocity (Last 3)</td><td style={S.tdAlt}>[## pts/sprint]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderVelocity = () => (
    <div ref={velocityRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 SPRINT VELOCITY LOG</td></tr></tbody></table>
      <CopyButton targetRef={velocityRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track committed vs. completed points each sprint. Use the 3-sprint average for capacity planning.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Sprint</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Committed</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Completed</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Carry-Over</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Accuracy</th>
          <th style={S.thPrimary}>Notes (Why Variance?)</th>
        </tr></thead>
        <tbody>
          {[
            { sp: "Sprint 4", com: "30", done: "28", carry: "2", acc: "93%", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg, notes: "[Stable sprint; one story slightly underestimated]" },
            { sp: "Sprint 5", com: "32", done: "26", carry: "6", acc: "81%", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg, notes: "[1 dev on training for 3 days; payment API delayed]" },
            { sp: "Sprint 6", com: "28", done: "30", carry: "0", acc: "107%", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg, notes: "[Pulled in 2 extra stories; team was focused and no blockers]" },
            { sp: "Sprint 7", com: "30", done: "27", carry: "3", acc: "90%", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg, notes: "[Vendor sandbox delayed 1 day; otherwise healthy sprint]" },
            { sp: "Sprint 8", com: "30", done: "—", carry: "—", acc: "—", aBg: C.badgeGrayBg, aFg: C.badgeGrayFg, notes: "[Current sprint — in progress]" },
            { sp: "[Add]", com: "", done: "", carry: "", acc: "—", aBg: C.badgeGrayBg, aFg: C.badgeGrayFg, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.sp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "13px" }}>{r.com}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "13px" }}>{r.done}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "13px" }}>{r.carry}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.aBg, r.aFg)}>{r.acc}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🔍 VELOCITY ANALYSIS</td></tr></tbody></table>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "3-Sprint Avg", value: "[28 pts]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Best Sprint", value: "[30 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Worst Sprint", value: "[26 pts]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Avg Accuracy", value: "[93%]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Avg Carry-Over", value: "[2.75 pts]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "8px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Trend Observation</td><td style={{ ...S.td0, height: "36px" }}>[e.g., Velocity stable at 27-30 pts; accuracy improving since Sprint 5 adjustments]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Top Variance Causes</td><td style={{ ...S.tdAlt, height: "36px" }}>[e.g., External dependencies (vendor APIs), team availability (training/PTO)]</td></tr>
        <tr><td style={S.tdLabel}>Improvement Actions</td><td style={S.td0}>[e.g., Add 10% buffer for vendor dependencies; track PTO in capacity planner]</td></tr>
      </tbody></table>
    </div>
  );

  const renderForecast = () => (
    <div ref={forecastRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔮 CAPACITY FORECAST</td></tr></tbody></table>
      <CopyButton targetRef={forecastRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Use the 3-sprint average to forecast how much work you can realistically complete.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Question</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Answer</th>
        </tr></thead>
        <tbody>
          {[
            { q: "How many points can we commit to next sprint?", a: "[28 pts (3-sprint avg) minus known capacity gaps]" },
            { q: "If we have [X] pts remaining in the release backlog, how many sprints to complete?", a: "[X / 28 = ## sprints]" },
            { q: "Are there any upcoming capacity changes (PTO, holidays, training)?", a: "[List any changes and adjust commitment accordingly]" },
            { q: "Should we adjust our commitment based on recent trends?", a: "[Yes/No — explain reasoning]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.a}</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><TrendingUp size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Estimation &amp; Velocity Tracker</h2><p className="text-xs font-medium text-red-600">⭐ All-Star &mdash; Plan Capacity Realistically</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track velocity over time, analyze trends, and forecast capacity. Helps you plan realistically and avoid overcommitment.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderVelocity()}{renderAnalysis()}{renderForecast()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderVelocity()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function VelocityTrackerPage() { return <ThemeProvider><VelocityTrackerContent /></ThemeProvider>; }
