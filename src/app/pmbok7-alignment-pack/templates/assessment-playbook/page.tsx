"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertTriangle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Playbook", desc: "Assessment + responses + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Assessment", desc: "Matrix only", icon: AlignJustify },
];

function AssessmentPlaybookContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const driversRef = useRef<HTMLDivElement>(null);
  const responsesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706"; const accentDark = "#B45309";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #DC2626", textAlign: "center" as const }}>📖 UNCERTAINTY & COMPLEXITY ASSESSMENT PLAYBOOK</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Uncertainty & Complexity</td></tr>
      <tr><td style={descStyle}>Assess the level of uncertainty and complexity in your project across multiple dimensions. Use the results to inform your delivery approach, tailoring decisions, and risk management strategy. This is an “All-Star” page.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Assessment Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Assessed By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Overall Rating</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>🟡 Medium-High</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 UNCERTAINTY & COMPLEXITY MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "22%" }}>Dimension</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Level</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Evidence / Rationale</th>
        </tr></thead>
        <tbody>
          {[
            { d: "Requirements Clarity", sc: "3", lv: "Medium", e: "[Core requirements defined; integration requirements still emerging from vendor discovery]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { d: "Technology Maturity", sc: "2", lv: "Low", e: "[Proven tech stack (React, Node.js, Salesforce); team has prior experience]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Organizational Change", sc: "4", lv: "High", e: "[Significant process changes for sales team; cross-regional standardization required]", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { d: "External Dependencies", sc: "4", lv: "High", e: "[Vendor API timeline uncertain; SSO configuration requires IT involvement]", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { d: "Team Experience", sc: "2", lv: "Low", e: "[Experienced team; prior CRM projects; strong domain knowledge]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Stakeholder Alignment", sc: "3", lv: "Medium", e: "[Sponsor aligned; some regional resistance emerging; VP Ops engagement improving]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { d: "Regulatory / Compliance", sc: "2", lv: "Low", e: "[Standard data privacy requirements; no novel regulatory challenges]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Scale & Integration", sc: "3", lv: "Medium", e: "[Multi-system integration (CRM, ERP, BI); 3 regions; moderate data migration complexity]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.d}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}><span style={S.badge(r.sBg, r.sFg)}>{r.sc}/5</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}><span style={S.badge(r.sBg, r.sFg)}>{r.lv}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.e}</td></tr>);
          })}
          <tr><td style={{ ...S.tdLabel, fontWeight: 800 }}>OVERALL SCORE</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px" }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>23/40</span></td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Medium-High</span></td><td style={{ ...S.td0, fontSize: "10px", fontStyle: "italic" }}>Scale: 8-16 Low | 17-24 Medium | 25-32 High | 33-40 Very High</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderDrivers = () => (
    <div ref={driversRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🔍 TOP UNCERTAINTY DRIVERS</td></tr></tbody></table>
      <CopyButton targetRef={driversRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={{ ...S.thSecondary, width: "22%" }}>Driver</th><th style={S.thSecondary}>Impact</th><th style={{ ...S.thSecondary, width: "25%" }}>Mitigation Strategy</th></tr></thead>
        <tbody>
          {[
            { d: "Vendor API Timeline", imp: "[Delays could block Phase 2 integration; currently 3 weeks behind vendor commitment]", mit: "[Mock API in place; escalation path to vendor CTO; contingency: phased rollout without full integration]" },
            { d: "Regional Resistance", imp: "[EMEA sales team skeptical; could slow adoption and undermine benefits realization]", mit: "[Champion activation; regional demos; success stories from AMER pilot; executive sponsorship visible]" },
            { d: "SSO Configuration", imp: "[Depends on corporate IT; timeline uncertain; could delay user onboarding]", mit: "[Early engagement with IT; fallback: temporary auth bypass for pilot; weekly status check with IT]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.d}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.imp}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mit}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderResponses = () => (
    <div ref={responsesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 RECOMMENDED RESPONSES</td></tr></tbody></table>
      <CopyButton targetRef={responsesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Delivery Approach</td><td style={S.td0}>[Hybrid iterative: 2-week sprints for core delivery; waterfall-style milestones for vendor-dependent integration]</td></tr>
        <tr><td style={S.tdLabelAlt}>Tailoring Implications</td><td style={S.tdAlt}>[More frequent checkpoint reviews; enhanced change control for vendor-dependent scope; lighter governance for proven components]</td></tr>
        <tr><td style={S.tdLabel}>Risk Response Level</td><td style={S.td0}>[Active risk management with weekly reviews; contingency reserves at 15% for schedule and 10% for budget]</td></tr>
        <tr><td style={S.tdLabelAlt}>Stakeholder Strategy</td><td style={S.tdAlt}>[Proactive engagement with resistant stakeholders; increased communication frequency; champion activation in each region]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Re-assess complexity matrix at each phase gate to track movement]", owner: "[PM]", target: "[Phase gates]" },
            { act: "[Create visual complexity heatmap for steering committee presentation]", owner: "[PM]", target: "[Next steering]" },
            { act: "[Share assessment results with team to build shared understanding of project challenges]", owner: "[PM]", target: "[Sprint 5 planning]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FFFBEB", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section F: Uncertainty & Complexity • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderMatrix()}{renderDrivers()}{renderResponses()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderMatrix()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><AlertTriangle size={11} /> Uncertainty</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><AlertTriangle size={20} className="text-amber-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Assessment Playbook</h2><p className="text-xs font-medium text-amber-600">Section F: Uncertainty & Complexity • ⭐ All-Star</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Assess uncertainty and complexity across dimensions to inform delivery, tailoring, and risk strategy.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AssessmentPlaybookPage() {
  return (<ThemeProvider><AssessmentPlaybookContent /></ThemeProvider>);
}
