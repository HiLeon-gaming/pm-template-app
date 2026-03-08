"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, PieChart, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "KPIs + portfolio + forecast", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "KPIs + health only", icon: AlignJustify },
];

function ExecutiveDashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const evmRef = useRef<HTMLDivElement>(null);
  const milestoneRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📊 EXECUTIVE DASHBOARD</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Executive Dashboard provides a one-page, at-a-glance view of project status designed for senior leadership and steering committee members.</strong> It consolidates KPIs, health indicators, EVM metrics, and key decisions into a concise executive format.<br /><br />
          Present this dashboard at <strong style={{ fontStyle: "italic" }}>steering committee meetings and monthly executive reviews</strong>. Aligns with PMBOK Communications Management — Monitoring & Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Report Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Phase</td><td style={S.tdAlt}>[Executing — Sprint 3]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderKPI = () => (
    <div ref={kpiRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 KEY PERFORMANCE INDICATORS</div>
      <CopyButton targetRef={kpiRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>KPI</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={S.thPrimary}>Commentary</th>
        </tr></thead>
        <tbody>
          {[
            { kpi: "Schedule (SPI)", target: "≥0.95", actual: "[0.96]", status: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, comment: "[Slightly behind — M3 delayed 3 days, recovery plan active]" },
            { kpi: "Budget (CPI)", target: "≥0.95", actual: "[1.13]", status: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Under budget by 13%; vendor line fully committed]" },
            { kpi: "Scope (CRs Approved)", target: "≤2/month", actual: "[3]", status: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, comment: "[Above threshold — change control enforcement tightened]" },
            { kpi: "Quality (Defect Rate)", target: "≤2/KLOC", actual: "[1.5]", status: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Within target; code coverage at 78% (target 80%)]" },
            { kpi: "Risk (Open Critical)", target: "[0]", actual: "[1]", status: "🔴", sBg: C.badgeRedBg, sFg: C.badgeRedFg, comment: "[R2 scope creep elevated to Critical — active management required]" },
            { kpi: "% Complete", target: "[45%]", actual: "[42%]", status: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, comment: "[3% behind plan; expected to recover by end of Sprint 4]" },
          ].map((k, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{k.kpi}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{k.target}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800 }}>{k.actual}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(k.sBg, k.sFg)}>{k.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{k.comment}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}> PROJECT HEALTH SUMMARY</div>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "22%" }}>Overall Status</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}> AMBER</span> — On track for budget; schedule recovery plan in progress</td></tr>
          <tr><td style={S.tdLabelAlt}>Executive Summary</td><td style={S.tdAlt}>[Project is 42% complete. Budget performance is strong (CPI 1.13). Schedule slightly behind due to M3 delay but recovery plan is active. Scope creep risk elevated to Critical — change control enforcement tightened. Quality metrics within targets. User awareness campaign launched successfully.]</td></tr>
          <tr><td style={S.tdLabel}>Key Wins This Period</td><td style={S.td0}>[Design approved; Sprint 3 delivered at 86% velocity; CR-003 approved; user champions recruited]</td></tr>
          <tr><td style={S.tdLabelAlt}>Key Concerns</td><td style={S.tdAlt}>[Scope creep (3 CRs this week); M3 milestone 3 days late; Dev Lead at 110% utilization]</td></tr>
          <tr><td style={S.tdLabel}>Decisions Needed</td><td style={S.td0}>[1) Approve additional QA resource for Sprint 4; 2) Confirm go-live date hold despite M3 delay]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderEVM = () => (
    <div ref={evmRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> EARNED VALUE METRICS</div>
      <CopyButton targetRef={evmRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Metric</th>
          <th style={{ ...S.thSecondary, width: "15%", textAlign: "right" as const }}>Value</th>
          <th style={S.thSecondary}>Interpretation</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "BAC (Budget at Completion)", val: "$[690,525]", interp: "Total approved budget including contingency" },
            { metric: "PV (Planned Value)", val: "$[330,000]", interp: "Budgeted cost of work scheduled to date" },
            { metric: "EV (Earned Value)", val: "$[316,800]", interp: "Budgeted cost of work actually completed" },
            { metric: "AC (Actual Cost)", val: "$[292,000]", interp: "Actual expenditure to date" },
            { metric: "CPI (Cost Performance)", val: "[1.13]", interp: "🟢 Under budget — getting $1.13 of work per $1 spent" },
            { metric: "SPI (Schedule Performance)", val: "[0.96]", interp: "🟡 Slightly behind — completing 96% of planned work" },
            { metric: "EAC (Estimate at Completion)", val: "$[611,084]", interp: "Projected total cost — $79K under budget" },
            { metric: "VAC (Variance at Completion)", val: "$[+79,441]", interp: "Expected to finish under budget" },
            { metric: "TCPI (To Complete PI)", val: "[0.94]", interp: "Remaining work efficiency needed — favorable" },
          ].map((e, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{e.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700 }}>{e.val}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{e.interp}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMilestone = () => (
    <div ref={milestoneRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🏁 MILESTONE STATUS</div>
      <CopyButton targetRef={milestoneRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Milestone</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Planned</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Forecast</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "M1", name: "[Project Kickoff]", planned: "[MM/DD]", forecast: "[MM/DD]", status: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "M2", name: "[Design Approved]", planned: "[MM/DD]", forecast: "[MM/DD]", status: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "M3", name: "[Requirements Baselined]", planned: "[MM/DD]", forecast: "[MM/DD+3]", status: "⚠️", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { id: "M4", name: "[Development Complete]", planned: "[MM/DD]", forecast: "[MM/DD]", status: "⬜", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { id: "M5", name: "[UAT Complete]", planned: "[MM/DD]", forecast: "[MM/DD]", status: "⬜", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "M6", name: "[Go-Live]", planned: "[MM/DD]", forecast: "[MM/DD]", status: "⬜", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{m.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{m.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.planned}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{m.forecast}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(m.sBg, m.sFg)}>{m.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisk = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ TOP RISKS REQUIRING EXECUTIVE ATTENTION</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Risk</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Rating</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Mitigation</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Action?</th>
        </tr></thead>
        <tbody>
          {[
            { id: "R2", risk: "[Scope creep — 3 CRs this week]", rating: "Critical", rBg: C.badgeRedBg, rFg: C.badgeRedFg, mit: "[Tightened change control; CCB enforcement]", action: "Monitor", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg },
            { id: "R1", risk: "[Key developer burnout risk]", rating: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, mit: "[Cross-training; workload redistribution]", action: "Decide", aBg: C.badgeRedBg, aFg: C.badgeRedFg },
            { id: "R4", risk: "[Vendor delivery delay]", rating: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, mit: "[Penalty clauses; weekly progress reports]", action: "Monitor", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{r.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.risk}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.rating}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.mit}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.aBg, r.aFg)}>{r.action}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecision = () => (
    <div ref={decisionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>✅ DECISIONS NEEDED FROM LEADERSHIP</div>
      <CopyButton targetRef={decisionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Decision Required</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Needed By</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "[Approve additional QA resource ($12K) for Sprint 4 testing ramp-up]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, by: "[MM/DD]" },
            { dec: "[Confirm go-live date hold despite M3 3-day delay — or approve 1-week extension]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, by: "[MM/DD]" },
            { dec: "[Authorize Dev Lead workload redistribution — may impact Sprint 4 velocity by 10%]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, by: "[MM/DD]" },
          ].map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.dec}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(d.pBg, d.pFg)}>{d.pri}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.by}</td>
            </tr>);
          })}
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
    <>{renderTitleBanner()}{renderHeader()}{renderKPI()}{renderHealth()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderEVM()}{renderRisk()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderMilestone()}{renderDecision()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderKPI()}{renderHealth()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><PieChart size={11} /> Executive</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><PieChart size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Executive Dashboard</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Communications Management • Monitoring & Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">One-page executive view with KPIs, health summary, EVM metrics, milestones, and decisions needed. Full Dashboard includes all sections; Quick Summary shows KPIs and health only.</p>
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

export default function ExecutiveDashboardPage() {
  return (<ThemeProvider><ExecutiveDashboardContent /></ThemeProvider>);
}
