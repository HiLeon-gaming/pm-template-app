"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Sign-off", desc: "Summary + reviewers + conditions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Sign-off", desc: "Approval table only", icon: AlignJustify },
];

function SignoffContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);
  const conditionsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>✍️ REQUIREMENTS SIGN-OFF SHEET</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template formalizes stakeholder approval of baselined requirements.</strong> It documents the requirements package being approved, a summary of what reviewers are signing off on, individual approval decisions with comments and conditions, and a version history for audit trail purposes.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>requirements baseline approval, phase gate reviews,</strong> or <strong style={{ fontStyle: "italic" }}>governance checkpoints requiring documented stakeholder consent</strong>. Aligns with BABOK Knowledge Area: Requirements Lifecycle Management.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "16%" }}>Project</td>
            <td style={{ ...S.td0, width: "34%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Sign-off ID</td>
            <td style={{ ...S.td0, width: "34%" }}>[SO-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Prepared by (BA)</td>
            <td style={S.tdAlt}>[Your Name]</td>
            <td style={S.tdLabelAlt}>Date Issued</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Document(s) for Approval</td>
            <td colSpan={3} style={S.td0}>[BRD-001 v1.0, FRS-001 v1.0, NFR-001 v1.0 — list all documents being baselined]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Baseline Version</td>
            <td style={S.tdAlt}>[1.0 — Initial Baseline]</td>
            <td style={S.tdLabelAlt}>Review Deadline</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 REQUIREMENTS SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Total requirements in package", a: "[___] functional + [___] non-functional = [___] total" },
            { q: "Requirements by priority", a: "Must: [___] | Should: [___] | Could: [___] | Won't: [___]" },
            { q: "Scope summary", a: "[Brief 2-3 sentence description of what is covered in this requirements package]" },
            { q: "Key changes since last version", a: "[List any changes since previous baseline — N/A if first baseline]" },
            { q: "Open items / known gaps", a: "[List any known gaps or items that will be addressed in future iterations]" },
            { q: "Review materials provided", a: "☐ BRD ☐ FRS ☐ NFR ☐ RTM ☐ Wireframes ☐ Process Maps ☐ Data Dictionary ☐ Other: [___]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "26%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "34px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>✅ APPROVAL SIGNATURES</td></tr></tbody></table>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>By signing below, I confirm that I have reviewed the requirements documents listed above and approve them as the baselined requirements for this project.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "18%" }}>Reviewer Name</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Role / Title</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Decision</th>
            <th style={S.thSecondary}>Comments</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Date</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Signature</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[Sponsor Name]", role: "Project Sponsor", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[PM Name]", role: "Project Manager", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Tech Lead]", role: "Technical Lead", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[User Rep]", role: "End User Representative", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[QA Lead]", role: "QA / Testing Lead", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Add Reviewer]", role: "", dec: "—", dBg: "#F3F4F6", dFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.dBg, row.dFg)}>{row.dec}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>[MM/DD]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>___________</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "20%" }}>Overall Decision</td>
            <td style={S.td0}>☐ Approved ☐ Approved with Conditions ☐ Rejected — Revisions Required</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderConditions = () => (
    <div ref={conditionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>⚠️ CONDITIONS &amp; OUTSTANDING ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={conditionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Condition / Outstanding Item</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Raised By</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due Date</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "[e.g., NFR performance targets need validation with infrastructure team before Sprint 4]", by: "[Tech Lead]", owner: "[BA]", due: "[Date]", stat: "Open", sBg: "#FEF3C7", sFg: "#D97706" },
            { item: "[e.g., Accessibility requirements (NFR-022) need legal confirmation of WCAG level required]", by: "[User Rep]", owner: "[BA]", due: "[Date]", stat: "Open", sBg: "#FEF3C7", sFg: "#D97706" },
            { item: "[e.g., Integration requirements (FR-004) pending vendor API documentation — estimated 2 weeks]", by: "[PM]", owner: "[Tech Lead]", due: "[Date]", stat: "Blocked", sBg: "#FEE2E2", sFg: "#DC2626" },
            { item: "[Add condition]", by: "", owner: "", due: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.by}</td>
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

  const renderHistory = () => (
    <div ref={historyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📜 VERSION HISTORY</td></tr></tbody></table>
      <CopyButton targetRef={historyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Version</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Author</th>
            <th style={S.thSecondary}>Change Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            { ver: "1.0", date: "[MM/DD/YYYY]", author: "[BA Name]", desc: "Initial requirements baseline — [___] requirements across BRD, FRS, and NFR documents" },
            { ver: "", date: "", author: "", desc: "[Add version entry when requirements are re-baselined]" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{row.ver}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.author}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><ClipboardCheck size={11} /> Sign-off</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><ClipboardCheck size={20} className="text-violet-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Requirements Sign-off Sheet</h2>
              <p className="text-xs font-medium text-violet-600">Summary &bull; Approval Signatures &bull; Conditions &bull; Version History</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Formal approval document for baselined requirements with reviewer comments, conditions, and signatures. Full Sign-off includes all sections; Quick Sign-off focuses on the approval table.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderSummary()}{renderApproval()}{renderConditions()}{renderHistory()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderApproval()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RequirementsSignoffPage() {
  return (<ThemeProvider><SignoffContent /></ThemeProvider>);
}
