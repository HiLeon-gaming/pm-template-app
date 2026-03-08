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
  { id: "full", label: "Full Worksheet", desc: "All dimensions + rationale", icon: LayoutDashboard },
  { id: "compact", label: "Quick Worksheet", desc: "Tailoring decisions only", icon: AlignJustify },
];

function TailoringStrategyWorksheetContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const rationaleRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⭐ TAILORING STRATEGY WORKSHEET</td></tr>
      <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Defines what you will tailor (governance, planning depth, reporting, controls) and why—based on project context.</strong> Tailoring is central to PMBOK 7 and this turns it into a concrete, defensible plan.<br /><br /><strong style={{ fontStyle: "italic" }}>⭐ ALL-STAR PAGE:</strong> Makes your approach defendable to PMO, sponsors, and auditors.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Approved By</td><td style={S.tdAlt}>[PMO Director / Sponsor]</td></tr>
        <tr><td style={S.tdLabel}>Delivery Approach</td><td style={S.td0}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[Hybrid / Predictive / Agile]</span></td><td style={S.tdLabel}>Project Complexity</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>[Medium-High]</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔍 TAILORING CONTEXT (Why We’re Tailoring)</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          { factor: "Project Size", assessment: "[Medium — $690K budget, 8-month duration, 8 team members]", implication: "[Standard governance appropriate; no need for heavy enterprise controls]" },
          { factor: "Organizational Maturity", assessment: "[PMO maturity level 3 — defined processes exist but flexibility allowed]", implication: "[Can simplify where PMO standards exceed project needs]" },
          { factor: "Stakeholder Expectations", assessment: "[Exec sponsor wants bi-weekly updates; PMO wants monthly portfolio roll-up]", implication: "[Bi-weekly status cadence; monthly dashboard to PMO]" },
          { factor: "Regulatory / Compliance", assessment: "[SOX compliance required for financial data; no other regulatory constraints]", implication: "[Formal change control for financial-impacting changes only]" },
          { factor: "Risk Profile", assessment: "[Medium-high — vendor dependency + new technology + tight timeline]", implication: "[Enhanced risk management; weekly risk reviews vs monthly]" },
          { factor: "Team Experience", assessment: "[Experienced team; 80% have worked together before]", implication: "[Can reduce detailed task tracking; team self-organizes well]" },
        ].map((r, i) => {
          const isAlt = i % 2 === 1;
          return (<tr key={i}>
            <td style={isAlt ? S.tdLabelAlt : { ...S.tdLabel, width: "15%" }}>{r.factor}</td>
            <td style={isAlt ? { ...S.tdAlt, width: "42%" } : { ...S.td0, width: "42%" }}>{r.assessment}</td>
            <td style={isAlt ? S.tdAlt : S.td0}>{r.implication}</td>
          </tr>);
        })}
      </tbody></table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#115E59")}>⚙️ TAILORING DECISIONS BY DIMENSION</div>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Dimension</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "12%", textAlign: "center" as const }}>Standard</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "12%", textAlign: "center" as const }}>Tailored To</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Rationale</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Governance Cadence", std: "Monthly", tailored: "Bi-weekly", rat: "[Sponsor preference + higher risk profile justifies more frequent oversight]" },
            { dim: "Planning Depth", std: "Full WBS (5 levels)", tailored: "WBS (3 levels) + sprint backlogs", rat: "[Hybrid approach; detailed planning done at sprint level, not upfront]" },
            { dim: "Change Control", std: "All changes through CCB", tailored: "CCB for &gt;$5K impact; PM authority for minor changes", rat: "[Reduces bottleneck while maintaining control for significant changes]" },
            { dim: "Status Reporting", std: "Weekly + monthly", tailored: "Bi-weekly to steering; weekly to team only", rat: "[Aligned with governance cadence; reduces reporting overhead]" },
            { dim: "Risk Management", std: "Monthly risk review", tailored: "Weekly risk check (15 min)", rat: "[Higher risk profile requires more frequent monitoring]" },
            { dim: "Quality Assurance", std: "Phase-end QA gates", tailored: "Sprint demo + UAT per increment", rat: "[Continuous quality validation aligns with hybrid delivery]" },
            { dim: "Stakeholder Engagement", std: "Quarterly engagement review", tailored: "Monthly engagement pulse check", rat: "[Complex stakeholder landscape requires proactive monitoring]" },
            { dim: "Documentation", std: "Full PMBOK document set", tailored: "Core documents + living wiki", rat: "[Experienced team; wiki reduces duplication and improves accessibility]" },
            { dim: "[Add Dimension]", std: "[Standard]", tailored: "[Your Decision]", rat: "[Your Rationale]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.dim}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.std}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#0D9488" }}>{r.tailored}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.rat}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRationale = () => (
    <div ref={rationaleRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📝 TAILORING RATIONALE SUMMARY</div>
      <CopyButton targetRef={rationaleRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Overall Tailoring Philosophy</td><td style={S.td0}>[Right-sized governance: enough process to manage risk and satisfy compliance, without unnecessary overhead that slows a capable team.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Trade-offs Accepted</td><td style={S.tdAlt}>[Less upfront planning detail in exchange for sprint-level flexibility. PM authority for minor changes in exchange for faster decision-making.]</td></tr>
        <tr><td style={S.tdLabel}>What We Will NOT Tailor</td><td style={S.td0}>[Risk management rigor (non-negotiable). SOX-related change controls (regulatory). Formal deliverable acceptance (contractual).]</td></tr>
        <tr><td style={S.tdLabelAlt}>Review Trigger</td><td style={S.tdAlt}>[Re-evaluate tailoring if: (1) project moves to Red status, (2) regulatory scope changes, (3) team composition changes &gt;30%.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#115E59")}>✍️ TAILORING APPROVAL</div>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={S.thSecondary}>Role</th><th style={S.thSecondary}>Name</th><th style={{ ...S.thSecondary, width: "20%" }}>Signature</th><th style={{ ...S.thSecondary, width: "10%" }}>Date</th></tr></thead>
        <tbody>
          {["Project Manager", "PMO Director", "Project Sponsor"].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{r}</td><td style={{ ...S.td0, backgroundColor: bg }}>[Name]</td><td style={{ ...S.td0, backgroundColor: bg }}>__________________</td><td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD]</td></tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Tailoring decisions should be reviewed monthly and updated in the Tailoring Decisions Log.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderContext()}{renderDecisions()}{renderRationale()}{renderReview()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderDecisions()}{renderReview()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Tailoring Strategy Worksheet</h2><p className="text-xs font-medium text-teal-600">PMBOK 7 Tailoring • ⭐ All-Star</p></div></div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Define what you will tailor and why. Makes your project approach concrete, defensible, and audit-ready.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TailoringStrategyWorksheetPage() {
  return (<ThemeProvider><TailoringStrategyWorksheetContent /></ThemeProvider>);
}
