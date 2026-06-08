"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Zap, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Impact", desc: "All dimensions + mitigation", icon: LayoutDashboard },
  { id: "compact", label: "Quick Impact", desc: "Impact matrix only", icon: AlignJustify },
];

function ImpactAnalysisContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const mitigRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>⚡ IMPACT ANALYSIS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template assesses the impact of a proposed change across multiple dimensions: stakeholders, processes, systems, data, training, and risk.</strong> Each impacted area is rated for severity and likelihood, with mitigation strategies and responsible owners assigned. Use it before implementing any change to ensure all downstream effects are identified and managed.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>change request evaluation, release planning,</strong> or <strong style={{ fontStyle: "italic" }}>assessing ripple effects of requirements changes on existing systems and processes</strong>. Aligns with BABOK Technique: Impact Analysis.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "16%" }}>Change / Initiative</td>
            <td style={{ ...S.td0, width: "34%" }}>[Brief description of the change being assessed]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Related CR / Req</td>
            <td style={{ ...S.td0, width: "34%" }}>[CR-001 / FR-015 / etc.]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Analyst</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Date</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const IMPACTS = [
    { id: "IMP-001", area: "Stakeholders", aBg: "#EDE9FE", aFg: "#7C3AED", desc: "[e.g., Warehouse team workflow changes — new pick list format and scanning process]", sev: "High", sevBg: "#FEE2E2", sevFg: "#DC2626", like: "Certain", lBg: "#FEE2E2", lFg: "#DC2626", affected: "[Warehouse Mgr, 12 pickers]" },
    { id: "IMP-002", area: "Process", aBg: "#DBEAFE", aFg: "#2563EB", desc: "[e.g., Order fulfillment process steps 5-8 need redesign for new inventory check]", sev: "High", sevBg: "#FEE2E2", sevFg: "#DC2626", like: "Certain", lBg: "#FEE2E2", lFg: "#DC2626", affected: "[BP-001 Steps 5-8]" },
    { id: "IMP-003", area: "System", aBg: "#D1FAE5", aFg: "#059669", desc: "[e.g., Inventory API needs new endpoint for real-time stock check; Payment module unaffected]", sev: "Med", sevBg: "#FEF3C7", sevFg: "#D97706", like: "Certain", lBg: "#FEE2E2", lFg: "#DC2626", affected: "[Inventory API, Order Mgmt]" },
    { id: "IMP-004", area: "Data", aBg: "#FEF3C7", aFg: "#D97706", desc: "[e.g., New fields added to order table; existing reports need updating; data migration for historical orders]", sev: "Med", sevBg: "#FEF3C7", sevFg: "#D97706", like: "Likely", lBg: "#FEF3C7", lFg: "#D97706", affected: "[Order DB, Reports, BI]" },
    { id: "IMP-005", area: "Training", aBg: "#FCE7F3", aFg: "#BE185D", desc: "[e.g., 12 warehouse staff need training on new scanning process; 3 CS reps need updated order status training]", sev: "Low", sevBg: "#D1FAE5", sevFg: "#059669", like: "Certain", lBg: "#FEE2E2", lFg: "#DC2626", affected: "[15 staff total]" },
    { id: "IMP-006", area: "Risk", aBg: "#CFFAFE", aFg: "#0891B2", desc: "[e.g., Dual-running old and new process during transition could cause order duplication]", sev: "High", sevBg: "#FEE2E2", sevFg: "#DC2626", like: "Possible", lBg: "#DBEAFE", lFg: "#2563EB", affected: "[All order processing]" },
    { id: "[Add]", area: "—", aBg: "#F3F4F6", aFg: "#6B7280", desc: "", sev: "—", sevBg: "#F3F4F6", sevFg: "#6B7280", like: "—", lBg: "#F3F4F6", lFg: "#6B7280", affected: "" },
  ];

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 IMPACT MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Area</th>
            <th style={S.thPrimary}>Impact Description</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Severity</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Likelihood</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Affected</th>
          </tr>
        </thead>
        <tbody>
          {IMPACTS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.aBg, row.aFg)}>{row.area}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sevBg, row.sevFg)}>{row.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.lBg, row.lFg)}>{row.like}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.affected}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔍 DETAILED IMPACT BY DIMENSION</td></tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Stakeholder Impact", a: "[Which stakeholders are affected? How does their workflow change? Do they need to learn new skills or tools? What is their likely reaction?]" },
            { q: "Process Impact", a: "[Which business processes change? Which steps are added, removed, or modified? Are there new handoffs? Does cycle time change?]" },
            { q: "System / Technology Impact", a: "[Which systems need modification? Any new integrations? Database changes? Infrastructure changes? Downtime required?]" },
            { q: "Data Impact", a: "[Any new data fields? Data migration needed? Impact on reporting? Data quality considerations? Archive/retention changes?]" },
            { q: "Training & Communication", a: "[Who needs training? What type (classroom, self-paced, on-the-job)? How much lead time? What communications are needed?]" },
            { q: "Regulatory / Compliance", a: "[Does this change affect compliance? Audit trail changes? Privacy implications? Any regulatory notifications needed?]" },
            { q: "Downstream Dependencies", a: "[What other projects, releases, or systems depend on or are affected by this change?]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "24%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMitigation = () => (
    <div ref={mitigRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🛡️ MITIGATION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={mitigRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Impact</th>
            <th style={S.thPrimary}>Mitigation Action</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { imp: "IMP-001", action: "[Create training program for warehouse team; schedule 2 training sessions before go-live]", owner: "[BA + Ops Mgr]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { imp: "IMP-002", action: "[Update process documentation; conduct walkthrough with process owners; update SOP]", owner: "[BA]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { imp: "IMP-003", action: "[Design and test new API endpoint; backward-compatible to avoid breaking existing integrations]", owner: "[Tech Lead]", due: "[Date]", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB" },
            { imp: "IMP-004", action: "[Create data migration script; test with production data copy; plan rollback procedure]", owner: "[Data Team]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { imp: "IMP-006", action: "[Define clear cutover plan; disable old process at go-live; implement duplicate detection check]", owner: "[PM + Dev]", due: "[Date]", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
            { imp: "", action: "[Add mitigation]", owner: "", due: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.imp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📊 IMPACT SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Overall impact rating", a: "☐ Low ☐ Medium ☐ High ☐ Critical" },
            { q: "Total areas impacted", a: "[___] areas across [___] stakeholders, [___] processes, [___] systems" },
            { q: "High-severity impacts", a: "[___] — [List IMP IDs]" },
            { q: "Recommendation", a: "☐ Proceed as planned ☐ Proceed with mitigations ☐ Defer until [condition] ☐ Do not proceed" },
            { q: "Key message for stakeholders", a: "[Brief summary of what stakeholders need to know about this change's impact]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "24%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "30px" }}>{row.a}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Zap size={11} /> Impact</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Zap size={20} className="text-orange-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Impact Analysis</h2>
              <p className="text-xs font-medium text-orange-600">Stakeholders &bull; Processes &bull; Systems &bull; Data &bull; Training &bull; Risk</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Assess the impact of a proposed change across all dimensions with severity/likelihood ratings, detailed dimension analysis, and mitigation plan. Full Impact is comprehensive; Quick Impact shows the impact matrix only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderMatrix()}{renderDetail()}{renderMitigation()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderMatrix()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ImpactAnalysisPage() {
  return (<ThemeProvider><ImpactAnalysisContent /></ThemeProvider>);
}
