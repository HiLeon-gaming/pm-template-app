"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Presentation, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Presentation", desc: "All slides + speaker notes", icon: LayoutDashboard },
  { id: "compact", label: "Quick Deck", desc: "Key slides only", icon: AlignJustify },
];

function StakeholderPresentationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const execRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const slideNum = (n: number, title: string) => (
    <div style={{ backgroundColor: C.primary, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, borderBottom: `3px solid ${C.accent}`, marginBottom: "0px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{title}</span><span style={{ fontSize: "10px", opacity: 0.7 }}>SLIDE {n}</span>
    </div>
  );

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🎤 STAKEHOLDER PRESENTATION TEMPLATE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides a structured outline for stakeholder presentations including executive summary, scope, progress, key decisions, risks, timeline, and asks.</strong> Each &ldquo;slide&rdquo; includes content guidance and speaker notes. Copy the content into your preferred presentation tool or use the table format directly for executive briefings.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>steering committee updates, project kickoffs,</strong> or <strong style={{ fontStyle: "italic" }}>any formal stakeholder briefing that requires a professional, structured narrative</strong>. Aligns with BABOK Knowledge Area: BA Planning &amp; Monitoring.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Presentation</td>
            <td style={{ ...S.td0, width: "36%" }}>[e.g., Order Management Project — Steering Committee Update]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Presenter</td>
            <td style={S.tdAlt}>[BA Name / PM Name]</td>
            <td style={S.tdLabelAlt}>Audience</td>
            <td style={S.tdAlt}>[e.g., Steering Committee, Executive Sponsors]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Duration</td>
            <td style={S.td0}>[e.g., 30 minutes (20 min presentation + 10 min Q&amp;A)]</td>
            <td style={S.tdLabel}>Objective</td>
            <td style={S.td0}>[e.g., Provide status update and obtain approval for UAT timeline]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderExecSummary = () => (
    <div ref={execRef} style={{ marginBottom: "12px" }}>
      {slideNum(1, "📌 EXECUTIVE SUMMARY")}
      <CopyButton targetRef={execRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Project Status", a: "☐ 🟢 On Track ☐ 🟡 At Risk ☐ 🔴 Off Track" },
            { q: "Key Message (1 sentence)", a: "[e.g., Requirements are 90% baselined; on track for UAT in Sprint 11 with one open risk on vendor API availability]" },
            { q: "Progress vs Plan", a: "[e.g., Sprint 8 of 13 complete; 2 weeks ahead on requirements; 1 week behind on integration spec]" },
            { q: "Budget Status", a: "[e.g., $180K of $200K budget committed; $20K contingency intact]" },
            { q: "Top 3 Highlights", a: "[1. BRD v1.0 approved 2. All stakeholder interviews complete 3. Solution architecture finalized]" },
            { q: "Top 3 Concerns", a: "[1. Vendor API docs incomplete 2. Finance tester only 50% available 3. Data migration complexity]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ ...S.subNote, marginTop: "3px" }}>🎙️ Speaker Note: Open with the overall status, then the single key message. Keep this slide to 2 minutes — set context for the rest of the presentation.</p>
    </div>
  );

  const renderScope = () => (
    <div ref={scopeRef} style={{ marginBottom: "12px" }}>
      {slideNum(2, "📋 SCOPE & REQUIREMENTS")}
      <CopyButton targetRef={scopeRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "22%" }}>Category</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Total</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Baselined</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>In Review</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Draft</th>
            <th style={S.thPrimary}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {[
            { cat: "Functional Reqs", total: "[20]", base: "[18]", rev: "[2]", draft: "[0]", notes: "[FR-019, FR-020 in review with Tech Lead]" },
            { cat: "Non-Functional Reqs", total: "[5]", base: "[5]", rev: "[0]", draft: "[0]", notes: "[All baselined — performance targets validated]" },
            { cat: "Business Rules", total: "[8]", base: "[7]", rev: "[1]", draft: "[0]", notes: "[BR-006 credit limit rule pending Finance confirmation]" },
            { cat: "Interfaces", total: "[5]", base: "[2]", rev: "[1]", draft: "[2]", notes: "[IF-003, IF-004 blocked by vendor API docs]" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{row.total}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#059669" }}>{row.base}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#D97706" }}>{row.rev}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#6B7280" }}>{row.draft}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ ...S.subNote, marginTop: "3px" }}>🎙️ Speaker Note: Emphasize what&rsquo;s baselined (approved); highlight any blockers or dependencies. Don&rsquo;t read the numbers — tell the story.</p>
    </div>
  );

  const renderProgress = () => (
    <div ref={progressRef} style={{ marginBottom: "12px" }}>
      {slideNum(3, "📈 PROGRESS & MILESTONES")}
      <CopyButton targetRef={progressRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Milestone</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Planned</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Actual</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { ms: "Requirements baseline (BRD v1.0)", plan: "[01/20]", actual: "[01/18]", stat: "Done", sBg: "#D1FAE5", sFg: "#059669" },
            { ms: "Solution architecture approved", plan: "[02/01]", actual: "[02/01]", stat: "Done", sBg: "#D1FAE5", sFg: "#059669" },
            { ms: "FRS v1.0 approved", plan: "[02/15]", actual: "—", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB" },
            { ms: "Development complete", plan: "[04/15]", actual: "—", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { ms: "UAT complete + sign-off", plan: "[05/16]", actual: "—", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { ms: "Go-live", plan: "[05/23]", actual: "—", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.ms}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.plan}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderKeyDecisions = () => (
    <div ref={keyRef} style={{ marginBottom: "12px" }}>
      {slideNum(4, "⚖️ KEY DECISIONS")}
      <CopyButton targetRef={keyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>ID</th>
            <th style={S.thPrimary}>Decision</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Decided By</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Impact</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "DEC-001", dec: "[e.g., Selected Vendor X COTS platform]", by: "[Sponsor + CTO]", impact: "[Accelerates delivery by 3 months vs custom build]" },
            { id: "DEC-002", dec: "[e.g., Deferred reporting to Phase 2]", by: "[Sponsor]", impact: "[Reduces scope by 4 requirements; saves 3 sprints]" },
            { id: "DEC-003", dec: "[e.g., Payment retry: 3 attempts with backoff]", by: "[Tech Lead]", impact: "[FR-004 updated; aligns with vendor SLA]" },
            { id: "[Pending]", dec: "[e.g., Data migration approach — needs steering committee input]", by: "[TBD — this mtg]", impact: "[Affects UAT data strategy and timeline]" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.impact}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ ...S.subNote, marginTop: "3px" }}>🎙️ Speaker Note: Highlight decisions already made (don&rsquo;t re-debate). Focus audience attention on the pending decision that needs their input.</p>
    </div>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      {slideNum(5, "⚠️ RISKS & ISSUES")}
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Type</th>
            <th style={S.thSecondary}>Description</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thSecondary, width: "22%" }}>Mitigation / Action</th>
            <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          </tr>
        </thead>
        <tbody>
          {[
            { type: "Risk", tBg: "#FEF3C7", tFg: "#D97706", desc: "[e.g., Vendor API docs incomplete — may delay 2 interface specs]", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", mit: "[Escalated to vendor; fallback: mock API for dev]", owner: "[Tech Lead]" },
            { type: "Issue", tBg: "#FEE2E2", tFg: "#DC2626", desc: "[e.g., Finance tester only 50% available for UAT]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", mit: "[Requested backup tester from Finance director]", owner: "[PM]" },
            { type: "Risk", tBg: "#FEF3C7", tFg: "#D97706", desc: "[e.g., Data migration complexity higher than estimated]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", mit: "[Requesting data team spike in Sprint 9]", owner: "[BA]" },
            { type: "—", tBg: "#F3F4F6", tFg: "#6B7280", desc: "[Add item]", impact: "—", iBg: "#F3F4F6", iFg: "#6B7280", mit: "", owner: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.tBg, row.tFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.iBg, row.iFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTimeline = () => (
    <div ref={timeRef} style={{ marginBottom: "12px" }}>
      {slideNum(6, "📅 TIMELINE & NEXT STEPS")}
      <CopyButton targetRef={timeRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Current sprint", a: "[Sprint 8 of 13]" },
            { q: "Next major milestone", a: "[FRS v1.0 approval — target: [MM/DD]]" },
            { q: "Upcoming activities (next 2 weeks)", a: "[1. Complete FRS review 2. Finalize interface specs 3. Begin UAT test case writing]" },
            { q: "Critical path items", a: "[Vendor API docs → Interface specs → Integration testing → UAT]" },
            { q: "Go-live target", a: "[[MM/DD/YYYY] — no change from baseline]" },
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

  const renderAsks = () => (
    <div ref={askRef} style={{ marginBottom: "12px" }}>
      {slideNum(7, "🎯 ASKS & DECISIONS NEEDED")}
      <CopyButton targetRef={askRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>What do you need from this audience? Be specific and actionable.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Ask / Decision Needed</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>From</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>By When</th>
          </tr>
        </thead>
        <tbody>
          {[
            { ask: "[e.g., Approve UAT timeline: Sprint 11-12 (May 5-16)]", from: "[Sponsor]", by: "[Today]" },
            { ask: "[e.g., Decision on data migration approach: anonymized prod copy vs synthetic]", from: "[CTO + DPO]", by: "[This week]" },
            { ask: "[e.g., Escalate vendor API documentation request through executive channels]", from: "[Sponsor]", by: "[This week]" },
            { ask: "[e.g., Confirm backup UAT tester from Finance team]", from: "[Finance Dir]", by: "[Next week]" },
            { ask: "[Add ask]", from: "", by: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.ask}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.by}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ ...S.subNote, marginTop: "3px" }}>🎙️ Speaker Note: End strong — clearly state what you need and from whom. Don&rsquo;t leave the room without answers or committed dates.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Presentation size={11} /> Presentation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Presentation size={20} className="text-amber-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Presentation Template</h2>
              <p className="text-xs font-medium text-amber-600">Exec Summary &bull; Scope &bull; Progress &bull; Risks &bull; Asks</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured presentation outline with 7 slides, speaker notes, and executive-friendly formatting. Full Presentation includes all slides; Quick Deck shows executive summary, risks, and asks only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderExecSummary()}{renderScope()}{renderProgress()}{renderKeyDecisions()}{renderRisks()}{renderTimeline()}{renderAsks()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderExecSummary()}{renderRisks()}{renderAsks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderPresentationPage() {
  return (<ThemeProvider><StakeholderPresentationContent /></ThemeProvider>);
}
