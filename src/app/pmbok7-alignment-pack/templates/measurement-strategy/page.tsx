"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Strategy", desc: "All sections + guidance", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Metrics table only", icon: AlignJustify },
];

function MeasurementStrategyContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const cadenceRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📊 MEASUREMENT STRATEGY</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Measurement &amp; Outcomes</td></tr>
      <tr><td style={descStyle}>Define what you will measure, why it matters, how you will collect data, and when you will review it. A strong measurement strategy ensures the project delivers on its promise and provides early warning signals when things drift.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date Created</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Last Reviewed</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Measurement Objective</td><td colSpan={3} style={S.td0}>[Provide early warning of delivery risks, track value realization, support data-driven decisions]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderApproach = () => (
    <div ref={approachRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 MEASUREMENT APPROACH</td></tr></tbody></table>
      <CopyButton targetRef={approachRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Leading Indicators</td><td style={S.td0}>[Sprint velocity trend, burn-up trajectory, risk exposure index, stakeholder satisfaction pulse]</td></tr>
        <tr><td style={S.tdLabelAlt}>Lagging Indicators</td><td style={S.tdAlt}>[Defect escape rate, schedule variance, cost variance, requirements coverage, ROI]</td></tr>
        <tr><td style={S.tdLabel}>Data Sources</td><td style={S.td0}>[Jira, project dashboard, steering committee feedback, pulse surveys, financial tracking system]</td></tr>
        <tr><td style={S.tdLabelAlt}>Reporting Audience</td><td style={S.tdAlt}>[Team: sprint metrics | PM: weekly dashboard | Sponsor: bi-weekly report | Steering: monthly executive summary]</td></tr>
        <tr><td style={S.tdLabel}>Thresholds &amp; Triggers</td><td style={S.td0}>[Velocity ≤ 80% avg → investigate | SPI/CPI ≤ 0.90 → escalate | Satisfaction ≤ 3.0 → action plan]</td></tr>
      </tbody></table>
    </div>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📏 KEY METRICS REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "20%" }}>Metric</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Type</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Target</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Current</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Frequency</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { m: "Sprint Velocity", t: "Leading", tgt: "≥ 28 pts/sprint avg", cur: "31", freq: "Per sprint", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Schedule Performance (SPI)", t: "Lagging", tgt: "≥ 0.95", cur: "0.97", freq: "Bi-weekly", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Cost Performance (CPI)", t: "Lagging", tgt: "≥ 0.95", cur: "1.02", freq: "Monthly", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Defect Escape Rate", t: "Lagging", tgt: "≤ 5%", cur: "3%", freq: "Per sprint", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Stakeholder Satisfaction", t: "Leading", tgt: "≥ 4.0/5.0", cur: "4.3", freq: "Monthly", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Risk Exposure Index", t: "Leading", tgt: "≤ Medium", cur: "Medium", freq: "Weekly", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { m: "User Adoption Rate", t: "Lagging", tgt: "≥ 80%", cur: "85%", freq: "Post-release", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Requirements Coverage", t: "Lagging", tgt: "100%", cur: "72%", freq: "Per sprint", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.m}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.t}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.tgt}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 700, textAlign: "center" as const }}>{r.cur}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.freq}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCadence = () => (
    <div ref={cadenceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📅 REVIEW CADENCE</td></tr></tbody></table>
      <CopyButton targetRef={cadenceRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "15%" }}>Cadence</th><th style={S.thSecondary}>What Gets Reviewed</th><th style={{ ...S.thSecondary, width: "15%" }}>Audience</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th></tr></thead>
        <tbody>
          {[
            { c: "Daily", w: "Blockers, task progress, sprint burndown", a: "Team", o: "[SM]" },
            { c: "Per Sprint", w: "Velocity, defect rate, DoD compliance, burn-up", a: "Team + PM", o: "[PM]" },
            { c: "Bi-weekly", w: "SPI, CPI, risk exposure, stakeholder pulse", a: "PM + Sponsor", o: "[PM]" },
            { c: "Monthly", w: "Full dashboard review, trend analysis, forecasting", a: "Steering Comm.", o: "[PM]" },
            { c: "Phase Gate", w: "Cumulative metrics, go/no-go assessment", a: "Governance", o: "[PM + PMO]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.c}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.w}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.a}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.o}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ MEASUREMENT IMPROVEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Automate dashboard refresh from Jira data — eliminate manual updates]", owner: "[PM]", target: "[Week 8]" },
            { act: "[Add trend lines to velocity and defect charts for forecasting]", owner: "[PM]", target: "[Sprint 5]" },
            { act: "[Define value realization metrics for post-implementation tracking]", owner: "[PM + BA]", target: "[Week 10]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section E: Measurement &amp; Outcomes • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderApproach()}{renderMetrics()}{renderCadence()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderMetrics()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><BarChart3 size={11} /> Measurement</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><BarChart3 size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Measurement Strategy</h2><p className="text-xs font-medium text-teal-600">Section E: Measurement &amp; Outcomes</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Define what you measure, why it matters, and how you use data to drive decisions.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeasurementStrategyPage() {
  return (<ThemeProvider><MeasurementStrategyContent /></ThemeProvider>);
}
