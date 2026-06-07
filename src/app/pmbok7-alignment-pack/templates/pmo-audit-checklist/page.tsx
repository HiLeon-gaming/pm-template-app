"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RefreshCw, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All sections + evidence", icon: LayoutDashboard },
  { id: "compact", label: "Quick Audit", desc: "Checklist only", icon: AlignJustify },
];

function PmoAuditChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const evidenceRef = useRef<HTMLDivElement>(null);
  const findingsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📋 PMO / AUDIT CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Improvement & Proof &nbsp;|&nbsp; ⭐ All-Star</td></tr>
      <tr><td style={descStyle}>The definitive audit checklist for PMO reviews, governance audits, and compliance checks. Validates that your project demonstrates PMBOK 7 alignment through documented evidence, not just claims. Use for phase gates, project audits, or closure reviews.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Audit Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Auditor / Reviewer</td><td style={S.tdAlt}>[Name, PMP / PMO Lead]</td><td style={S.tdLabelAlt}>Audit Type</td><td style={S.tdAlt}>[Phase Gate / Quarterly Review / Closure Audit]</td></tr>
        <tr><td style={S.tdLabel}>Overall Compliance</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>🟢 38/42 items compliant (90%)</span></td><td style={S.tdLabel}>Rating</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Strong Alignment</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderChecklist = () => (
    <div ref={checklistRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ PMBOK 7 COMPLIANCE CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={checklistRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "12%" }}>Category</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Audit Item</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "20%" }}>Evidence Location</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Governance", item: "Project charter or equivalent authorization document exists", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Alignment Dashboard]" },
            { cat: "Governance", item: "Delivery approach selected and documented with rationale", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Delivery Approach Selector]" },
            { cat: "Governance", item: "Governance map defines decision authority and escalation paths", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Governance Map]" },
            { cat: "Tailoring", item: "Tailoring strategy is documented and reviewed", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Tailoring Strategy]" },
            { cat: "Tailoring", item: "Tailoring decisions logged with rationale and outcomes", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Tailoring Decisions Log]" },
            { cat: "Tailoring", item: "Project context assessment completed", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Project Context]" },
            { cat: "Domains", item: "All 8 domain health checks completed", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Pages #10-17]" },
            { cat: "Domains", item: "Domain health reviews conducted at defined cadence", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Domain Retro]" },
            { cat: "Principles", item: "All 12 principle practice pages completed with evidence", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Pages #19-30]" },
            { cat: "Principles", item: "12 Principles Master Checklist scored and reviewed", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Master Checklist]" },
            { cat: "Measurement", item: "Measurement strategy defined with leading and lagging indicators", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Measurement Strategy]" },
            { cat: "Measurement", item: "Outcomes and benefits tracked with realization plan", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[Outcome & Benefits — realization plan in progress]" },
            { cat: "Measurement", item: "Metrics review conducted at defined cadence", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Metrics Review]" },
            { cat: "Uncertainty", item: "Uncertainty and complexity assessment completed", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Assessment Playbook]" },
            { cat: "Uncertainty", item: "Assumptions identified, tracked, and stress-tested", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Assumption Stress Test]" },
            { cat: "Uncertainty", item: "Contingency triggers defined with pre-approved responses", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Contingency Triggers]" },
            { cat: "Uncertainty", item: "Decision latency tracked and managed", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[Decision Latency — avg above target]" },
            { cat: "Improvement", item: "Domain retrospective completed", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Domain Retro]" },
            { cat: "Improvement", item: "Principle lessons learned captured and shared", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Principle Lessons]" },
            { cat: "Improvement", item: "Alignment summary produced for executive review", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Alignment Summary]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent, fontSize: "10px" }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.cat}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.item}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.ev}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEvidence = () => (
    <div ref={evidenceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📂 EVIDENCE PACKAGE SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={evidenceRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Artifacts</td><td style={S.td0}>[41 PMBOK 7 alignment artifacts + 1 Read This First instruction page = 42 total pages]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sections Complete</td><td style={S.tdAlt}>[A: Start Here (3) | B: Tailoring (6) | C: Domains (8) | D: Principles (13) | E: Measurement (3) | F: Uncertainty (4) | G: Improvement (4)]</td></tr>
        <tr><td style={S.tdLabel}>Review Cadence Met</td><td style={S.td0}>[Sprint reviews: 100% | Bi-weekly sponsor: 100% | Monthly steering: 100% | Phase gate: completed]</td></tr>
        <tr><td style={S.tdLabelAlt}>Knowledge Transfer</td><td style={S.tdAlt}>[Lessons submitted to PMO knowledge base; CoP presentation scheduled; reusable playbooks created]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFindings = () => (
    <div ref={findingsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔎 AUDIT FINDINGS</td></tr></tbody></table>
      <CopyButton targetRef={findingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "8%" }}>Severity</th><th style={S.thSecondary}>Finding</th><th style={{ ...S.thSecondary, width: "25%" }}>Recommendation</th></tr></thead>
        <tbody>
          {[
            { sev: "Minor", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, f: "[Benefits realization plan not yet formalized — tracking is informal]", r: "[Formalize plan with measurement cadence before Phase 2 go-live]" },
            { sev: "Minor", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, f: "[Decision latency averaging 4.2 days vs 3-day target — cross-functional decisions slow]", r: "[Implement decision SLA with auto-escalation; pre-brief cross-functional decision makers]" },
            { sev: "Observation", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg, f: "[Opportunity management (positive risks) is emerging but not yet mature]", r: "[Continue developing opportunity identification practice; good trajectory]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.f}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.r}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ CORRECTIVE ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th><th style={{ ...S.thSecondary, width: "10%" }}>Follow-up</th></tr></thead>
        <tbody>
          {[
            { act: "[Formalize benefits realization plan with post-delivery measurement cadence]", owner: "[PM + BA]", target: "[Week 9]", fu: "[Next audit]" },
            { act: "[Implement 3-day decision SLA with auto-escalation protocol]", owner: "[PM + Sponsor]", target: "[Week 8]", fu: "[Next audit]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fu}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#ECFDF5", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section G: Improvement & Proof • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderEvidence()}{renderFindings()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><RefreshCw size={11} /> PMO Audit</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><RefreshCw size={20} className="text-emerald-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">PMO / Audit Checklist</h2><p className="text-xs font-medium text-emerald-600">Section G: Improvement & Proof • ⭐ All-Star</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">The definitive audit checklist for PMO reviews, governance audits, and PMBOK 7 compliance verification.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PmoAuditChecklistPage() {
  return (<ThemeProvider><PmoAuditChecklistContent /></ThemeProvider>);
}
