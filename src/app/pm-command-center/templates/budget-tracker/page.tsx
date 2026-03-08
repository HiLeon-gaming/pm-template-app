"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TrendingUp, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Budget + EVM + forecast", icon: LayoutDashboard },
  { id: "compact", label: "Quick Dashboard", desc: "Summary + EVM only", icon: AlignJustify },
];

function BudgetTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);
  const evmRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>💵 BUDGET TRACKER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Budget Tracker monitors actual spending against the cost baseline using Earned Value Management (EVM) metrics.</strong> It provides early warning of budget variances and forecasts the estimate at completion (EAC).<br /><br />
          Update this template <strong style={{ fontStyle: "italic" }}>weekly or at each reporting period</strong> to maintain financial control. Aligns with PMBOK Cost Management — Monitoring & Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Reporting Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Total Budget (BAC)</td><td style={{ ...S.tdAlt, fontWeight: 700, color: C.primary }}>$[721,913]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderBudget = () => (
    <div ref={budgetRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>≤ BUDGET BY CATEGORY</div>
      <CopyButton targetRef={budgetRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Cost Category</th>
          <th style={{ ...S.thPrimary, width: "13%", textAlign: "right" as const }}>Budget</th>
          <th style={{ ...S.thPrimary, width: "13%", textAlign: "right" as const }}>Actual (TD)</th>
          <th style={{ ...S.thPrimary, width: "13%", textAlign: "right" as const }}>Committed</th>
          <th style={{ ...S.thPrimary, width: "13%", textAlign: "right" as const }}>Remaining</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>% Used</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Labor — Internal", budget: "$[400,000]", actual: "$[180,000]", commit: "$[120,000]", remain: "$[100,000]", pct: "75%", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { cat: "Labor — Contractors", budget: "$[119,250]", actual: "$[45,000]", commit: "$[35,000]", remain: "$[39,250]", pct: "67%", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { cat: "Software & Licenses", budget: "$[10,000]", actual: "$[10,000]", commit: "$[0]", remain: "$[0]", pct: "100%", status: "Spent", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { cat: "Cloud Infrastructure", budget: "$[36,000]", actual: "$[18,000]", commit: "$[18,000]", remain: "$[0]", pct: "100%", status: "Committed", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { cat: "Hardware", budget: "$[7,500]", actual: "$[7,500]", commit: "$[0]", remain: "$[0]", pct: "100%", status: "Spent", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { cat: "Training", budget: "$[15,000]", actual: "$[0]", commit: "$[0]", remain: "$[15,000]", pct: "0%", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { cat: "Vendor / Consulting", budget: "$[35,000]", actual: "$[21,000]", commit: "$[14,000]", remain: "$[0]", pct: "100%", status: "At Risk", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { cat: "Travel & Expenses", budget: "$[5,000]", actual: "$[2,500]", commit: "$[0]", remain: "$[2,500]", pct: "50%", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { cat: "Contingency Reserve", budget: "$[62,775]", actual: "$[8,000]", commit: "$[0]", remain: "$[54,775]", pct: "13%", status: "Available", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((b, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{b.cat}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const }}>{b.budget}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{b.actual}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const }}>{b.commit}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const }}>{b.remain}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{b.pct}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(b.sBg, b.sFg)}>{b.status}</span></td>
            </tr>);
          })}
          <tr>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>TOTAL</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "right" as const }}>$[690,525]</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "right" as const }}>$[292,000]</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "right" as const }}>$[187,000]</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "right" as const }}>$[211,525]</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>69%</td>
            <td style={{ ...S.td0, backgroundColor: C.primary, color: C.white }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderEVM = () => (
    <div ref={evmRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>≥ EARNED VALUE METRICS</div>
      <CopyButton targetRef={evmRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>EVM Metric</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Formula</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "right" as const }}>Value</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Interpretation</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Budget at Completion (BAC)", formula: "—", val: "$[690,525]", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, interp: "[Total approved budget excluding management reserve]" },
            { metric: "Planned Value (PV)", formula: "—", val: "$[345,263]", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, interp: "[Value of work planned to date (50% of BAC)]" },
            { metric: "Earned Value (EV)", formula: "—", val: "$[330,000]", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, interp: "[Value of work actually completed to date]" },
            { metric: "Actual Cost (AC)", formula: "—", val: "$[292,000]", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, interp: "[Total cost incurred to date]" },
            { metric: "Cost Variance (CV)", formula: "EV - AC", val: "+$[38,000]", status: "Favorable", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, interp: "[Under budget — spending less than value earned]" },
            { metric: "Schedule Variance (SV)", formula: "EV - PV", val: "-$[15,263]", status: "Behind", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, interp: "[Slightly behind schedule — less value earned than planned]" },
            { metric: "Cost Performance Index (CPI)", formula: "EV / AC", val: "[1.13]", status: "Favorable", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, interp: "[>1.0 = under budget. Getting $1.13 of value per $1 spent]" },
            { metric: "Schedule Performance Index (SPI)", formula: "EV / PV", val: "[0.96]", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, interp: "[<1.0 = behind schedule. Completing 96% of planned work]" },
          ].map((e, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{e.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontFamily: "monospace" }}>{e.formula}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700, color: C.primary }}>{e.val}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(e.sBg, e.sFg)}>{e.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{e.interp}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderForecast = () => (
    <div ref={forecastRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>≥ FORECAST & ESTIMATE AT COMPLETION</div>
      <CopyButton targetRef={forecastRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "28%" }}>Forecast Method</th>
          <th style={{ ...S.thSecondary, width: "16%" }}>Formula</th>
          <th style={{ ...S.thSecondary, width: "16%", textAlign: "right" as const }}>EAC</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "right" as const }}>VAC</th>
          <th style={S.thSecondary}>Interpretation</th>
        </tr></thead>
        <tbody>
          {[
            { method: "EAC (CPI-based)", formula: "BAC / CPI", eac: "$[611,084]", vac: "+$[79,441]", interp: "[If current cost efficiency continues]" },
            { method: "EAC (SPI × CPI)", formula: "AC + (BAC-EV)/(CPI×SPI)", eac: "$[624,200]", vac: "+$[66,325]", interp: "[Factoring both cost and schedule performance]" },
            { method: "EAC (Bottom-up)", formula: "AC + ETC", eac: "$[650,000]", vac: "+$[40,525]", interp: "[Re-estimated remaining work packages]" },
            { method: "EAC (Original plan)", formula: "AC + (BAC-EV)", eac: "$[652,525]", vac: "+$[38,000]", interp: "[If remaining work costs as originally planned]" },
          ].map((f, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{f.method}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontFamily: "monospace" }}>{f.formula}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700 }}>{f.eac}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600, color: "#059669" }}>{f.vac}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{f.interp}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>VAC = Variance at Completion (BAC - EAC). Positive = under budget forecast. ETC = Estimate to Complete (remaining work cost).</p>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🎯 BUDGET HEALTH SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "30%" }}>Overall Budget Status</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Under Budget</span> — CPI = 1.13</td></tr>
          <tr><td style={S.tdLabelAlt}>Overall Schedule Status</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Slightly Behind</span> — SPI = 0.96</td></tr>
          <tr><td style={S.tdLabel}>Contingency Used</td><td style={S.td0}>$[8,000] of $[62,775] — [13%] consumed</td></tr>
          <tr><td style={S.tdLabelAlt}>Mgmt Reserve Status</td><td style={S.tdAlt}>$[0] of $[31,388] — [0%] consumed — <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Untouched</span></td></tr>
          <tr><td style={S.tdLabel}>Key Concern</td><td style={S.td0}>[Vendor consulting budget fully committed — any additional work requires CR approval]</td></tr>
          <tr><td style={S.tdLabelAlt}>Recommended Action</td><td style={S.tdAlt}>[Monitor SPI; accelerate critical path tasks; submit CR for vendor budget if integration scope expands]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderBudget()}{renderEVM()}{renderForecast()}{renderSummary()}{renderFooter()}</>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderEVM()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><TrendingUp size={11} /> Budget</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><TrendingUp size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Budget Tracker</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Cost Management • Monitoring & Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Monitors spending against the cost baseline with EVM metrics and forecast. Full Tracker shows all budget detail, EVM, and forecasting; Quick Dashboard shows health summary and EVM metrics.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BudgetTrackerPage() {
  return (<ThemeProvider><BudgetTrackerContent /></ThemeProvider>);
}
