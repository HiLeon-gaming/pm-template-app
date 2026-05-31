"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Gavel, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Decisions + detail + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decision table only", icon: AlignJustify },
];

function DecisionLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>⚖️ DECISION LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template maintains a formal record of all project decisions with context, rationale, alternatives considered, and impact on requirements.</strong> Each decision is assigned an ID, linked to requirements and meetings, and tracked for status. The log provides an audit trail and prevents decisions from being revisited without proper governance.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>project governance, audit trail documentation,</strong> or <strong style={{ fontStyle: "italic" }}>preventing scope creep by maintaining a clear record of what was agreed and why</strong>. Aligns with BABOK Knowledge Area: BA Planning &amp; Monitoring.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Maintained by</td>
            <td style={{ ...S.td0, width: "36%" }}>[BA Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Last Updated</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
            <td style={S.tdLabelAlt}>Total Decisions</td>
            <td style={S.tdAlt}>[___]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const DECISIONS = [
    { id: "DEC-001", date: "[01/10]", title: "Use Vendor X COTS platform for order management", cat: "Solution", cBg: "#DBEAFE", cFg: "#2563EB", decidedBy: "[Sponsor + CTO]", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", stat: "Final", sBg: "#D1FAE5", sFg: "#059669", reqs: "All FRs" },
    { id: "DEC-002", date: "[01/15]", title: "Defer reporting module to Phase 2", cat: "Scope", cBg: "#FEF3C7", cFg: "#D97706", decidedBy: "[Sponsor]", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", stat: "Final", sBg: "#D1FAE5", sFg: "#059669", reqs: "FR-030–FR-034" },
    { id: "DEC-003", date: "[01/22]", title: "Payment retry: 3 attempts with exponential backoff", cat: "Technical", cBg: "#EDE9FE", cFg: "#7C3AED", decidedBy: "[Tech Lead]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", stat: "Final", sBg: "#D1FAE5", sFg: "#059669", reqs: "FR-004" },
    { id: "DEC-004", date: "[01/22]", title: "Order cancellation after picking requires manager email approval", cat: "Business", cBg: "#D1FAE5", cFg: "#059669", decidedBy: "[Sponsor]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", stat: "Final", sBg: "#D1FAE5", sFg: "#059669", reqs: "BR-005" },
    { id: "DEC-005", date: "[02/01]", title: "UAT window: Sprint 11-12 (May 5-16)", cat: "Schedule", cBg: "#FCE7F3", cFg: "#BE185D", decidedBy: "[PM + Sponsor]", impact: "Low", iBg: "#D1FAE5", iFg: "#059669", stat: "Final", sBg: "#D1FAE5", sFg: "#059669", reqs: "UAT Plan" },
    { id: "DEC-006", date: "[02/05]", title: "Data migration: anonymized production copy for UAT; synthetic for unit tests", cat: "Technical", cBg: "#EDE9FE", cFg: "#7C3AED", decidedBy: "[Tech Lead + DPO]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", stat: "Provisional", sBg: "#FEF3C7", sFg: "#D97706", reqs: "NFR-011" },
    { id: "DEC-007", date: "[02/10]", title: "Minimum order value: $25 (not $50 as originally proposed)", cat: "Business", cBg: "#D1FAE5", cFg: "#059669", decidedBy: "[Sponsor + Finance]", impact: "Low", iBg: "#D1FAE5", iFg: "#059669", stat: "Final", sBg: "#D1FAE5", sFg: "#059669", reqs: "BR-001" },
    { id: "[Add]", date: "", title: "", cat: "—", cBg: "#F3F4F6", cFg: "#6B7280", decidedBy: "", impact: "—", iBg: "#F3F4F6", iFg: "#6B7280", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280", reqs: "" },
  ];

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 DECISION LOG</div>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Date</th>
            <th style={S.thPrimary}>Decision</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Category</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Decided By</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Status</th>
            <th style={{ ...S.thPrimary, width: "8%" }}>Linked Reqs</th>
          </tr>
        </thead>
        <tbody>
          {DECISIONS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{row.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.title}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.cBg, row.cFg)}>{row.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.decidedBy}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.iBg, row.iFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{row.reqs}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔍 DECISION DETAIL (Template)</td></tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Use this format to document decisions that need additional context. Copy and fill for each significant decision.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Decision ID", a: "[DEC-XXX]" },
            { q: "Decision Statement", a: "[Clear, unambiguous statement of what was decided]" },
            { q: "Context / Background", a: "[Why was this decision needed? What triggered it?]" },
            { q: "Options Considered", a: "[Option A: ___ | Option B: ___ | Option C: ___]" },
            { q: "Rationale", a: "[Why was this option chosen over alternatives? Key factors that drove the decision.]" },
            { q: "Decided By", a: "[Name(s) and role(s) of decision maker(s)]" },
            { q: "Decision Forum", a: "[Where was it decided? e.g., Steering Committee meeting on [date], Meeting Notes ref: MN-015]" },
            { q: "Impact on Requirements", a: "[Which requirements are created, changed, or removed as a result? e.g., FR-004 AC updated; CR-003 raised]" },
            { q: "Impact on Timeline / Cost", a: "[Does this decision affect the schedule or budget? e.g., No schedule impact; saves $20K by deferring Phase 2]" },
            { q: "Conditions / Constraints", a: "[Any conditions attached? e.g., Must be re-evaluated if vendor pricing changes by >10%]" },
            { q: "Expiry / Review Date", a: "[When should this decision be revisited? e.g., Review at Phase 2 kickoff, or N/A if permanent]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "28px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 DECISION SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Total decisions logged", a: "[___]" },
            { q: "Final decisions", a: "[___]" },
            { q: "Provisional (pending confirmation)", a: "[___] — [List IDs]" },
            { q: "High-impact decisions", a: "[___] — [List IDs]" },
            { q: "Decisions pending review", a: "[List any decisions approaching their review date]" },
            { q: "Governance note", a: "[Changes to finalized decisions require a Change Request (CR) and steering committee approval]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "26%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Gavel size={11} /> Decisions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Gavel size={20} className="text-violet-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Decision Log</h2>
              <p className="text-xs font-medium text-violet-600">Decisions &bull; Rationale &bull; Impact &bull; Audit Trail</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Formal decision register with categories, rationale, impact assessment, linked requirements, and governance. Full Log includes detail template and summary; Quick Log shows the decision table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderLog()}{renderDetail()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionLogPage() {
  return (<ThemeProvider><DecisionLogContent /></ThemeProvider>);
}
