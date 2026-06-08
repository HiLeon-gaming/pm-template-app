"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ArrowRightLeft, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Analysis", desc: "Current + future + transition", icon: LayoutDashboard },
  { id: "compact", label: "Side-by-Side", desc: "Current vs future only", icon: AlignJustify },
];

function CurrentFutureContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const transRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔄 CURRENT STATE / FUTURE STATE ANALYSIS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template documents the current state (&ldquo;as-is&rdquo;) and future state (&ldquo;to-be&rdquo;) of a business process, system, or capability.</strong> It identifies pain points in the current state, defines the vision for the future state, and maps the transition plan to get from here to there. Each dimension (process, technology, people, data) is analyzed separately.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>business transformation initiatives, process improvement projects,</strong> or <strong style={{ fontStyle: "italic" }}>system replacement planning</strong>. Aligns with BABOK Knowledge Area: Strategy Analysis.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Business Analyst</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Scope / Area</td>
            <td style={S.tdAlt}>[e.g., Order Management Process]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const DIMENSIONS = [
    { dim: "Process", icon: "⚙️", current: "[Describe current workflows, manual steps, handoffs, cycle times]", future: "[Describe optimized workflows, automation, reduced cycle time]", bg: "#DBEAFE", fg: "#2563EB" },
    { dim: "Technology", icon: "💻", current: "[Current systems, tools, integrations, technical debt]", future: "[New/upgraded systems, modern architecture, new integrations]", bg: "#EDE9FE", fg: "#7C3AED" },
    { dim: "People", icon: "👥", current: "[Current roles, skills, team structure, pain points]", future: "[New roles, upskilling needed, org changes, improved collaboration]", bg: "#D1FAE5", fg: "#059669" },
    { dim: "Data", icon: "📊", current: "[Data sources, quality issues, silos, manual reporting]", future: "[Single source of truth, automated reporting, real-time data]", bg: "#FEF3C7", fg: "#D97706" },
  ];

  const renderCurrentState = () => (
    <div ref={currentRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead><tr><td colSpan={2} style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "10px 14px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>📍 CURRENT STATE (&ldquo;As-Is&rdquo;)</td></tr></thead>
        <tbody>
          {DIMENSIONS.map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, width: "16%", verticalAlign: "top" as const }}><span style={S.badge(d.bg, d.fg)}>{d.icon} {d.dim}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "40px" }}>{d.current}</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Key Pain Points</td>
            <td style={{ ...S.td0, height: "50px" }}>[1. ___  2. ___  3. ___]</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Current Metrics</td>
            <td style={S.tdAlt}>[e.g., Processing time: 4 hours | Error rate: 8% | Customer satisfaction: 65%]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={currentRef} label="Copy Section" />
    </div>
  );

  const renderFutureState = () => (
    <div ref={futureRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead><tr><td colSpan={2} style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "10px 14px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>🎯 FUTURE STATE (&ldquo;To-Be&rdquo;)</td></tr></thead>
        <tbody>
          {DIMENSIONS.map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, width: "16%", verticalAlign: "top" as const }}><span style={S.badge(d.bg, d.fg)}>{d.icon} {d.dim}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "40px" }}>{d.future}</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Key Benefits</td>
            <td style={{ ...S.td0, height: "50px" }}>[1. ___  2. ___  3. ___]</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Target Metrics</td>
            <td style={S.tdAlt}>[e.g., Processing time: 30 min | Error rate: &lt;1% | Customer satisfaction: 90%]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={futureRef} label="Copy Section" />
    </div>
  );

  const renderComparison = () => (
    <div ref={compRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>⚖️ SIDE-BY-SIDE COMPARISON</td></tr></tbody></table>
      <CopyButton targetRef={compRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "14%" }}>Dimension</th>
            <th style={{ ...S.thPrimary, backgroundColor: "#FEE2E2", color: "#DC2626" }}>Current State</th>
            <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>→</th>
            <th style={{ ...S.thPrimary, backgroundColor: "#D1FAE5", color: "#059669" }}>Future State</th>
            <th style={{ ...S.thPrimary, width: "18%" }}>Gap / Change</th>
          </tr>
        </thead>
        <tbody>
          {DIMENSIONS.map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg }}><span style={S.badge(d.bg, d.fg)}>{d.icon} {d.dim}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px", color: C.accent }}>→</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.future}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>[Describe the change required]</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel }}>Metrics</td>
            <td style={S.td0}>[Current KPIs]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, color: C.accent }}>→</td>
            <td style={S.td0}>[Target KPIs]</td>
            <td style={S.td0}>[% improvement]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderTransition = () => (
    <div ref={transRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🗺️ TRANSITION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={transRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Phase</th>
            <th style={S.thSecondary}>Activities / Deliverables</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Timeline</th>
            <th style={{ ...S.thSecondary, width: "10%" }}>Dependencies</th>
          </tr>
        </thead>
        <tbody>
          {[
            { phase: "Analyze", pBg: "#DBEAFE", pFg: "#2563EB", act: "[e.g., Complete current state assessment, document pain points, validate with stakeholders]", owner: "[BA]", time: "[Sprint 1-2]", dep: "—" },
            { phase: "Design", pBg: "#EDE9FE", pFg: "#7C3AED", act: "[e.g., Define future state, create process maps, design solution architecture]", owner: "[BA + Tech Lead]", time: "[Sprint 3-4]", dep: "Analysis complete" },
            { phase: "Plan", pBg: "#FEF3C7", pFg: "#D97706", act: "[e.g., Create detailed implementation plan, identify training needs, plan data migration]", owner: "[PM + BA]", time: "[Sprint 5]", dep: "Design approved" },
            { phase: "Build", pBg: "#D1FAE5", pFg: "#059669", act: "[e.g., Develop solution, configure systems, build integrations]", owner: "[Dev Team]", time: "[Sprint 6-10]", dep: "Plan approved" },
            { phase: "Test", pBg: "#FCE7F3", pFg: "#BE185D", act: "[e.g., Execute UAT, validate against future state requirements, regression testing]", owner: "[QA + Users]", time: "[Sprint 11-12]", dep: "Build complete" },
            { phase: "Deploy", pBg: "#CFFAFE", pFg: "#0891B2", act: "[e.g., Go-live, training, cutover, hypercare support]", owner: "[PM + Ops]", time: "[Sprint 13]", dep: "UAT signed off" },
            { phase: "", pBg: "#F3F4F6", pFg: "#6B7280", act: "[Add phase]", owner: "", time: "", dep: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.pBg, row.pFg)}>{row.phase}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.dep}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "20%" }}>Risks</td><td style={S.td0}>[Key transition risks — e.g., data migration errors, user adoption resistance, vendor delays]</td></tr>
          <tr><td style={S.tdLabelAlt}>Mitigation</td><td style={S.tdAlt}>[Mitigation strategies for each risk]</td></tr>
          <tr><td style={S.tdLabel}>Success Criteria</td><td style={S.td0}>[How will we know the transition was successful? Measurable criteria.]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><ArrowRightLeft size={11} /> As-Is / To-Be</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><ArrowRightLeft size={20} className="text-emerald-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Current State / Future State Analysis</h2>
              <p className="text-xs font-medium text-emerald-600">As-Is &bull; To-Be &bull; Comparison &bull; Transition Plan</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document current and future states across process, technology, people, and data dimensions. Full Analysis includes transition plan; Side-by-Side focuses on the comparison.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}<table style={LT}><tbody><tr><td style={{ ...LC, width: "50%", paddingRight: "5px" }}>{renderCurrentState()}</td><td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>{renderFutureState()}</td></tr></tbody></table>{renderComparison()}{renderTransition()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderComparison()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CurrentFutureStatePage() {
  return (<ThemeProvider><CurrentFutureContent /></ThemeProvider>);
}
