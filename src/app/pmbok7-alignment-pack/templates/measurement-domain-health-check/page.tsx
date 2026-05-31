"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Health Check", desc: "All assessments + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Health indicators only", icon: AlignJustify },
];

function MeasurementDomainHealthCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#DC2626"; const accentDark = "#991B1B";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📏 MEASUREMENT DOMAIN HEALTH CHECK</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Performance Domain 7 of 8</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>KPIs tracked, data quality, dashboards working, metrics driving decisions, and measurement gaps.</strong> Without effective measurement, you’re managing by hope. This check ensures your metrics are useful and actionable.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Check Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Week #</td><td style={S.tdAlt}>[Week X of Y]</td><td style={S.tdLabelAlt}>Overall Domain Health</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>🟡 Watch</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 HEALTH INDICATORS</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Indicator</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Evidence / Signal</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Trend</th>
        </tr></thead>
        <tbody>
          {[
            { ind: "KPIs defined and tracked", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[8 KPIs defined; all actively tracked; dashboard updated weekly]", trend: "→" },
            { ind: "Data quality / reliability", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Automated data collection for 6/8 KPIs; manual entry for 2]", trend: "→" },
            { ind: "Dashboards accessible", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Executive dashboard live; team dashboard updated daily]", trend: "→" },
            { ind: "Metrics driving decisions", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[Some decisions still made on gut feel; need to improve metric-to-decision link]", trend: "→" },
            { ind: "Leading indicators in use", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[Mostly lagging indicators; need more early-warning metrics]", trend: "→" },
            { ind: "Stakeholder confidence in data", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Sponsor trusts dashboard; no questions about data accuracy in last 3 reviews]", trend: "↗" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.ind}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ev}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td></tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = Healthy &nbsp;|&nbsp; 🟡 = Watch &nbsp;|&nbsp; 🔴 = Needs Intervention &nbsp;|&nbsp; Trend: ↗ Improving → Stable ↘ Declining</p>
    </div>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 KEY METRICS SNAPSHOT</td></tr></tbody></table>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Metric</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { m: "Schedule Performance Index (SPI)", type: "Lagging", target: "≥ 0.95", actual: "0.98", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Cost Performance Index (CPI)", type: "Lagging", target: "≥ 0.95", actual: "1.02", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Sprint Velocity", type: "Leading", target: "30-36 pts", actual: "34 pts", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Defect Escape Rate", type: "Lagging", target: "≤ 2/sprint", actual: "0", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Stakeholder Satisfaction", type: "Lagging", target: "≥ 4.0/5", actual: "4.5/5", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Risk Exposure Trend", type: "Leading", target: "Declining", actual: "Stable", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { m: "Team Morale Index", type: "Leading", target: "≥ 7/10", actual: "8/10", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { m: "Requirements Volatility", type: "Leading", target: "≤ 15%", actual: "15%", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.m}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.type}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.target}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.actual}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ MEASUREMENT ACTIONS THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "8%" }}>Due</th><th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Done?</th></tr></thead>
        <tbody>
          {[
            { act: "[Add 2 leading indicators to dashboard: blocker age and dependency confirmation rate]", owner: "[PM]", due: "[Fri]", done: "⬜" },
            { act: "[Create decision-log entry linking latest scope decision to metric evidence]", owner: "[PM]", due: "[Wed]", done: "⬜" },
            { act: "[Automate requirements volatility tracking from Jira backlog changes]", owner: "[BA]", due: "[Fri]", done: "⬜" },
            { act: "[Present measurement strategy improvements at next steering committee]", owner: "[PM]", due: "[Next mtg]", done: "⬜" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.due}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FEF2F2", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Domain Health Check 7/8 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderMetrics()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderActions()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Compass size={11} /> Domain 7/8</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Compass size={20} className="text-red-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Measurement Domain Health Check</h2><p className="text-xs font-medium text-red-600">Performance Domain 7/8</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">KPIs tracked, data quality, dashboards working, metrics driving decisions, and measurement gaps.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeasurementDomainHealthCheckPage() {
  return (<ThemeProvider><MeasurementDomainHealthCheckContent /></ThemeProvider>);
}
