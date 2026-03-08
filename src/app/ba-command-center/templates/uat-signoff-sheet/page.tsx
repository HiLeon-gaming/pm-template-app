"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ShieldCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Sign-off", desc: "Results + criteria + approvals", icon: LayoutDashboard },
  { id: "compact", label: "Quick Sign-off", desc: "Approval table only", icon: AlignJustify },
];

function UATSignoffContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const condRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>✅ UAT SIGN-OFF SHEET</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template formalizes the completion of User Acceptance Testing and captures stakeholder approval for production deployment.</strong> It summarizes test execution results, validates exit criteria, documents any outstanding conditions, and collects formal sign-off from each approver with comments and conditions.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>go-live approval gates, release management governance,</strong> or <strong style={{ fontStyle: "italic" }}>providing auditable evidence that business users have accepted the solution</strong>. Aligns with BABOK Knowledge Area: Solution Evaluation.
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
            <td style={{ ...S.td0, width: "34%" }}>[UAT-SO-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Prepared by (BA)</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Date</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>UAT Window</td>
            <td style={S.td0}>[Start Date] — [End Date]</td>
            <td style={S.tdLabel}>Planned Go-Live</td>
            <td style={S.td0}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderResults = () => (
    <div ref={resultsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 UAT EXECUTION SUMMARY</div>
      <CopyButton targetRef={resultsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#2563EB", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #2563EB" }}>TEST EXECUTION</td></tr></thead>
            <tbody>
              {[
                { label: "Total test cases", value: "[___]" },
                { label: "Executed", value: "[___] ([___]%)" },
                { label: "Passed", value: "[___] ([___]%)", color: "#059669" },
                { label: "Failed", value: "[___] ([___]%)", color: "#DC2626" },
                { label: "Blocked", value: "[___]", color: "#D97706" },
                { label: "Not Executed", value: "[___]" },
                { label: "Pass Rate", value: "[___]% — Target: ≥ 95%" },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontWeight: 600, width: "45%" }}>{r.label}</td>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontWeight: 700, color: r.color || "inherit" }}>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>DEFECT SUMMARY</td></tr></thead>
            <tbody>
              {[
                { label: "Total defects found", value: "[___]" },
                { label: "Critical — open", value: "[___]", color: "#DC2626" },
                { label: "High — open", value: "[___]", color: "#D97706" },
                { label: "Medium — open", value: "[___]" },
                { label: "Low — open", value: "[___]" },
                { label: "Fixed & Verified", value: "[___]", color: "#059669" },
                { label: "Deferred (accepted)", value: "[___]" },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontWeight: 600, width: "45%" }}>{r.label}</td>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontWeight: 700, color: r.color || "inherit" }}>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderExit = () => (
    <div ref={exitRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🏁 EXIT CRITERIA VALIDATION</div>
      <CopyButton targetRef={exitRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Exit Criterion</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Actual</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Met?</th>
          </tr>
        </thead>
        <tbody>
          {[
            { crit: "100% of Must-Have test cases executed", target: "100%", actual: "[___]%", met: "☐" },
            { crit: "Overall test case pass rate", target: "≥ 95%", actual: "[___]%", met: "☐" },
            { crit: "Zero critical defects open", target: "0", actual: "[___]", met: "☐" },
            { crit: "High-severity defects open (with workarounds)", target: "≤ 3", actual: "[___]", met: "☐" },
            { crit: "All business-critical workflows validated E2E", target: "All", actual: "[___/___]", met: "☐" },
            { crit: "UAT summary report completed", target: "Yes", actual: "☐", met: "☐" },
            { crit: "[Add criterion]", target: "", actual: "", met: "☐" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.crit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{row.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{row.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{row.met}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConditions = () => (
    <div ref={condRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ OUTSTANDING CONDITIONS</div>
      <CopyButton targetRef={condRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Items that must be resolved before or immediately after go-live. Deployment is conditional on these being addressed.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Condition / Outstanding Item</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "[e.g., DEF-004 — Cancel button visibility issue; workaround: hide button server-side after 2hrs — fix in Sprint 14]", owner: "[Dev Team]", due: "[Date]", stat: "Accepted", sBg: "#FEF3C7", sFg: "#D97706" },
            { item: "[e.g., DEF-005 — Tax rounding issue; deferred — edge case affecting <0.1% of orders]", owner: "[Dev Team]", due: "[v2.1]", stat: "Deferred", sBg: "#EDE9FE", sFg: "#7C3AED" },
            { item: "[e.g., Training for warehouse team must complete before go-live]", owner: "[BA + Ops]", due: "[Date]", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB" },
            { item: "[Add condition]", owner: "", due: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.item}</td>
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

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>✍️ FORMAL SIGN-OFF</div>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>By signing below, I confirm that User Acceptance Testing has been completed to my satisfaction and I approve the solution for production deployment.</p>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "22%" }}>Overall UAT Decision</td>
            <td style={S.td0}>☐ Approved — Go-Live ☐ Approved with Conditions ☐ Rejected — Retest Required</td>
          </tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "18%" }}>Approver</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Role</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Decision</th>
            <th style={S.thSecondary}>Comments / Conditions</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Date</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Signature</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[UAT Lead]", role: "Test Lead", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Business Sponsor]", role: "Business Owner", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[PM]", role: "Project Manager", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[IT Lead]", role: "Technical Approval", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Add approver]", role: "", dec: "—", dBg: "#F3F4F6", dFg: "#6B7280" },
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
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold"><ShieldCheck size={11} /> UAT Sign-off</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-green-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center"><ShieldCheck size={20} className="text-green-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">UAT Sign-off Sheet</h2>
              <p className="text-xs font-medium text-green-600">Results &bull; Exit Criteria &bull; Conditions &bull; Formal Approval</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Formal UAT completion document with test execution summary, exit criteria validation, outstanding conditions, and stakeholder sign-off. Full Sign-off includes all sections; Quick Sign-off shows the approval table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-200" : "bg-white text-slate-600 border-slate-200 hover:border-green-300 hover:text-green-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-green-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderResults()}{renderExit()}{renderConditions()}{renderApproval()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderApproval()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function UATSignoffPage() {
  return (<ThemeProvider><UATSignoffContent /></ThemeProvider>);
}
