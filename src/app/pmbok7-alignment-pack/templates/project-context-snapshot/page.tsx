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
  { id: "full", label: "Full Snapshot", desc: "All context dimensions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Snapshot", desc: "Key factors only", icon: AlignJustify },
];

function ProjectContextSnapshotContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const objectivesRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const complexityRef = useRef<HTMLDivElement>(null);
  const stakeholderRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📋 PROJECT CONTEXT SNAPSHOT</td></tr>
      <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>One-page capture of everything that shapes how this project should be run.</strong> Objectives, constraints, complexity drivers, critical stakeholders, delivery constraints, and risk posture — all in one place to inform tailoring and approach decisions.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Project Phase</td><td style={S.tdAlt}>[Initiating / Planning]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderObjectives = () => (
    <div ref={objectivesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 PROJECT OBJECTIVES &amp; SUCCESS CRITERIA</div>
      <CopyButton targetRef={objectivesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "5%", textAlign: "center" as const }}>#</th><th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Objective</th><th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "30%" }}>Success Measure</th><th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "10%", textAlign: "center" as const }}>Priority</th></tr></thead>
        <tbody>
          {[
            { obj: "[Implement new CRM platform to improve sales pipeline visibility]", measure: "[95% pipeline data captured in CRM within 90 days of go-live]", pri: "Critical", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { obj: "[Reduce manual reporting effort by 50%]", measure: "[Automated dashboards replace 8 of 16 manual weekly reports]", pri: "High", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { obj: "[Achieve 80%+ user adoption within first quarter]", measure: "[Daily active users ≥ 80% of licensed users by Month 3]", pri: "High", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { obj: "[Add objective]", measure: "[Add success measure]", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.obj}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.measure}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConstraints = () => (
    <div ref={constraintsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#115E59")}>🔒 CONSTRAINTS &amp; BOUNDARIES</div>
      <CopyButton targetRef={constraintsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Budget Constraint</td><td style={S.td0}>[$690,750 total including 10% contingency — no additional funding available]</td></tr>
        <tr><td style={S.tdLabelAlt}>Timeline Constraint</td><td style={S.tdAlt}>[Must go-live by Q3 end — aligned to fiscal year reporting cycle]</td></tr>
        <tr><td style={S.tdLabel}>Resource Constraint</td><td style={S.td0}>[8 FTE max; no new hires approved; must use existing vendor pool]</td></tr>
        <tr><td style={S.tdLabelAlt}>Technology Constraint</td><td style={S.tdAlt}>[Must integrate with existing SAP ERP and Salesforce platforms]</td></tr>
        <tr><td style={S.tdLabel}>Regulatory / Compliance</td><td style={S.td0}>[SOX compliance for financial data; GDPR for EU customer records]</td></tr>
        <tr><td style={S.tdLabelAlt}>Organizational</td><td style={S.tdAlt}>[PMO governance framework v3.2 applies; monthly portfolio reporting required]</td></tr>
      </tbody></table>
    </div>
  );

  const renderComplexity = () => (
    <div ref={complexityRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🧩 COMPLEXITY DRIVERS</div>
      <CopyButton targetRef={complexityRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={S.thSecondary}>Driver</th><th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Level</th><th style={S.thSecondary}>Details</th></tr></thead>
        <tbody>
          {[
            { driver: "Technical Complexity", level: "Med-High", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, details: "[New technology stack + 3 system integrations + data migration]" },
            { driver: "Organizational Change", level: "High", lBg: C.badgeRedBg, lFg: C.badgeRedFg, details: "[Process changes across 4 departments; new workflows required]" },
            { driver: "Stakeholder Complexity", level: "Medium", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, details: "[18 stakeholders across 3 business units; competing priorities]" },
            { driver: "Dependency Complexity", level: "Medium", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, details: "[2 vendor dependencies; 1 parallel project dependency]" },
            { driver: "Ambiguity / Uncertainty", level: "Medium", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, details: "[Requirements 70% defined; remaining emerge during sprints]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.driver}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.lBg, r.lFg)}>{r.level}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.details}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStakeholder = () => (
    <div ref={stakeholderRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#115E59")}>👥 CRITICAL STAKEHOLDERS (Top 5)</div>
      <CopyButton targetRef={stakeholderRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={S.thSecondary}>Stakeholder</th><th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Power</th><th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Interest</th><th style={S.thSecondary}>Key Concern</th></tr></thead>
        <tbody>
          {[
            { s: "[VP Sales — Executive Sponsor]", power: "High", interest: "High", concern: "[Needs pipeline visibility ASAP; wants early value delivery]" },
            { s: "[CFO — Budget Authority]", power: "High", interest: "Med", concern: "[ROI justification; SOX compliance; no budget overrun]" },
            { s: "[Sales Operations Director]", power: "Med", interest: "High", concern: "[Process disruption; team training capacity; data quality]" },
            { s: "[IT Security Lead]", power: "Med", interest: "Med", concern: "[Data security; GDPR compliance; integration security]" },
            { s: "[Sales Team Champions (5)]", power: "Low", interest: "High", concern: "[Ease of use; not adding admin burden; mobile access]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.s}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{r.power}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{r.interest}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.concern}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisk = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ INITIAL RISK POSTURE</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Overall Risk Posture</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Medium-High</span> — [Manageable with proactive risk management and weekly monitoring]</td></tr>
        <tr><td style={S.tdLabelAlt}>Top Risk Categories</td><td style={S.tdAlt}>[Vendor dependency (timeline) • Technology (new stack) • Change management (adoption) • Schedule (tight Q3 deadline)]</td></tr>
        <tr><td style={S.tdLabel}>Risk Appetite</td><td style={S.td0}>[Moderate — willing to accept calculated risks for innovation; zero tolerance for compliance/security risks]</td></tr>
        <tr><td style={S.tdLabelAlt}>Contingency Budget</td><td style={S.td0}>[$62,750 (10% of baseline) — requires sponsor approval to access]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderObjectives()}{renderConstraints()}{renderComplexity()}{renderStakeholder()}{renderRisk()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderObjectives()}{renderConstraints()}{renderComplexity()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Compass size={11} /> Context</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Project Context Snapshot</h2><p className="text-xs font-medium text-teal-600">Project Context &amp; Boundaries</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">One-page capture of objectives, constraints, complexity, stakeholders, and risk posture that shapes your project approach.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProjectContextSnapshotPage() {
  return (<ThemeProvider><ProjectContextSnapshotContent /></ThemeProvider>);
}
