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
  { id: "full", label: "Full Report", desc: "Dashboard + activities + risks", icon: LayoutDashboard },
  { id: "compact", label: "Quick Update", desc: "Summary + next steps only", icon: AlignJustify },
];

function BAStatusContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📊 BA STATUS REPORT</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides a structured weekly/bi-weekly status report for BA activities.</strong> It includes an at-a-glance health dashboard (requirements, elicitation, analysis, testing), completed and upcoming activities, risks/issues/decisions, and stakeholder action items. Designed to keep project leadership informed of BA progress.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>steering committee updates, weekly PM syncs,</strong> or <strong style={{ fontStyle: "italic" }}>maintaining a consistent communication cadence with stakeholders</strong>. Aligns with BABOK Knowledge Area: BA Planning &amp; Monitoring.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Reporting Period</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD] — [MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Business Analyst</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Report #</td>
            <td style={S.tdAlt}>[Week ##]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Overall BA Status</td>
            <td colSpan={3} style={S.td0}>☐ 🟢 On Track ☐ 🟡 At Risk ☐ 🔴 Off Track</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderDashboard = () => (
    <div ref={dashRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🏥 HEALTH DASHBOARD</td></tr></tbody></table>
      <CopyButton targetRef={dashRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "18%" }}>Area</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Status</th>
            <th style={S.thPrimary}>Summary</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Key Metric</th>
          </tr>
        </thead>
        <tbody>
          {[
            { area: "📋 Requirements", stat: "🟢", summary: "[e.g., 18/20 functional requirements baselined; 2 pending stakeholder review]", metric: "90% baselined" },
            { area: "🎤 Elicitation", stat: "🟢", summary: "[e.g., All planned interviews complete; 1 workshop remaining for reporting module]", metric: "12/13 sessions done" },
            { area: "🔍 Analysis", stat: "🟡", summary: "[e.g., Gap analysis complete; process models 80% done — warehouse flow pending]", metric: "80% artifacts done" },
            { area: "🧪 Testing", stat: "⚪", summary: "[e.g., UAT plan drafted; test cases 50% written — execution starts Sprint 11]", metric: "Not started" },
            { area: "📝 Documentation", stat: "🟢", summary: "[e.g., BRD v1.0 approved; FRS in review; Data Dictionary 90% complete]", metric: "3/5 docs approved" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.area}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px" }}>{row.stat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.summary}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.metric}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActivities = () => (
    <div ref={actRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>✅ COMPLETED THIS PERIOD</td></tr></thead>
            <tbody>
              {[
                "[e.g., Completed stakeholder interviews with Finance and Ops teams (4 sessions)]",
                "[e.g., Baselined BRD v1.0 — signed off by Sponsor and PM]",
                "[e.g., Finalized current state process maps for order management]",
                "[e.g., Delivered requirements walkthrough to development team]",
                "[e.g., Drafted UAT Plan and test case outlines for Cycle 1]",
                "[Add completed item]",
              ].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px" }}>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#2563EB", padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #2563EB" }}>📅 PLANNED NEXT PERIOD</td></tr></thead>
            <tbody>
              {[
                "[e.g., Complete remaining workshop for reporting module requirements]",
                "[e.g., Finalize FRS v1.0 and submit for review]",
                "[e.g., Complete future state process maps]",
                "[e.g., Begin writing UAT test cases (target: 40 test cases)]",
                "[e.g., Conduct requirements review with QA team]",
                "[Add planned item]",
              ].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px" }}>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={actRef} label="Copy Section" />
    </div>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>⚠️ RISKS, ISSUES &amp; DECISIONS</td></tr></tbody></table>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Type</th>
            <th style={S.thSecondary}>Description</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { type: "Risk", tBg: "#FEF3C7", tFg: "#D97706", desc: "[e.g., Key SME going on leave in 2 weeks — may delay warehouse process validation]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", owner: "[BA / PM]", stat: "Monitoring", sBg: "#FEF3C7", sFg: "#D97706" },
            { type: "Issue", tBg: "#FEE2E2", tFg: "#DC2626", desc: "[e.g., Vendor API documentation incomplete — blocking interface specification for IF-003]", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", owner: "[Tech Lead]", stat: "Open", sBg: "#FEE2E2", sFg: "#DC2626" },
            { type: "Decision", tBg: "#D1FAE5", tFg: "#059669", desc: "[e.g., Agreed to defer reporting module to Phase 2 — reduces scope by 4 requirements]", impact: "—", iBg: "#F3F4F6", iFg: "#6B7280", owner: "[Sponsor]", stat: "Decided", sBg: "#D1FAE5", sFg: "#059669" },
            { type: "—", tBg: "#F3F4F6", tFg: "#6B7280", desc: "[Add item]", impact: "—", iBg: "#F3F4F6", iFg: "#6B7280", owner: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.tBg, row.tFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.iBg, row.iFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNext = () => (
    <div ref={nextRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🎯 STAKEHOLDER ACTION ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={nextRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Action Required</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>From</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "[e.g., Review and approve FRS v1.0 — comments due by Friday]", from: "[Tech Lead]", due: "[MM/DD]", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "[e.g., Confirm UAT tester availability for Cycle 1 window]", from: "[Ops Manager]", due: "[MM/DD]", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "[e.g., Provide vendor API contact for integration spec completion]", from: "[PM]", due: "[MM/DD]", stat: "Overdue", sBg: "#FEE2E2", sFg: "#DC2626" },
            { action: "[Add action]", from: "", due: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><BarChart3 size={11} /> Status</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><BarChart3 size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">BA Status Report</h2>
              <p className="text-xs font-medium text-indigo-600">Dashboard &bull; Activities &bull; Risks &bull; Action Items</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Weekly/bi-weekly BA status report with health dashboard, completed/planned activities, risks and issues, and stakeholder action items. Full Report is comprehensive; Quick Update shows summary and next steps.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderDashboard()}{renderActivities()}{renderRisks()}{renderNext()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderDashboard()}{renderNext()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BAStatusReportPage() {
  return (<ThemeProvider><BAStatusContent /></ThemeProvider>);
}
