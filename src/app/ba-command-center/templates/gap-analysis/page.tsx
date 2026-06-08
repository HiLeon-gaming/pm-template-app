"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Search, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Analysis", desc: "Gaps + action plan + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Gaps", desc: "Gap table only", icon: AlignJustify },
];

function GapAnalysisContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gapsRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔍 GAP ANALYSIS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template systematically identifies gaps between the current state and desired future state.</strong> Each gap is categorized by dimension (process, technology, people, data), assessed for impact and effort, and linked to a remediation action. The analysis helps prioritize which gaps to address first based on business impact.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>transformation planning, system selection,</strong> or <strong style={{ fontStyle: "italic" }}>determining the scope of work needed to achieve business objectives</strong>. Aligns with BABOK Knowledge Area: Strategy Analysis.
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
            <td style={S.tdAlt}>[e.g., Order Management — Current vs Future State]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const GAPS = [
    { id: "GAP-001", dim: "Process", dBg: "#DBEAFE", dFg: "#2563EB", current: "Manual order entry from email/fax — 4 hrs/day", future: "Automated web portal with validation", gap: "No self-service portal exists; all orders are manual", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", effort: "High", eBg: "#FEE2E2", eFg: "#DC2626" },
    { id: "GAP-002", dim: "Technology", dBg: "#EDE9FE", dFg: "#7C3AED", current: "Legacy on-prem database, no API layer", future: "Cloud-hosted with REST APIs", gap: "No API infrastructure; cannot integrate with modern systems", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", effort: "High", eBg: "#FEE2E2", eFg: "#DC2626" },
    { id: "GAP-003", dim: "People", dBg: "#D1FAE5", dFg: "#059669", current: "Staff trained only on legacy system", future: "Staff proficient on new platform", gap: "No training program; no change management plan", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", effort: "Med", eBg: "#FEF3C7", eFg: "#D97706" },
    { id: "GAP-004", dim: "Data", dBg: "#FEF3C7", dFg: "#D97706", current: "Data in Excel + legacy DB; no single source of truth", future: "Centralized data warehouse with real-time feeds", gap: "Data scattered across 5+ systems; no master data governance", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", effort: "Med", eBg: "#FEF3C7", eFg: "#D97706" },
    { id: "GAP-005", dim: "Process", dBg: "#DBEAFE", dFg: "#2563EB", current: "Reporting is manual (Excel exports weekly)", future: "Automated dashboards with real-time data", gap: "No BI tooling; reports require manual compilation", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", effort: "Low", eBg: "#D1FAE5", eFg: "#059669" },
    { id: "GAP-006", dim: "Technology", dBg: "#EDE9FE", dFg: "#7C3AED", current: "No RBAC — everyone has full access", future: "Role-based access with 4 permission levels", gap: "Security model does not exist; compliance risk", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", effort: "Low", eBg: "#D1FAE5", eFg: "#059669" },
    { id: "[Add]", dim: "—", dBg: "#F3F4F6", dFg: "#6B7280", current: "", future: "", gap: "", impact: "—", iBg: "#F3F4F6", iFg: "#6B7280", effort: "—", eBg: "#F3F4F6", eFg: "#6B7280" },
  ];

  const renderGaps = () => (
    <div ref={gapsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 GAP IDENTIFICATION</td></tr></tbody></table>
      <CopyButton targetRef={gapsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>ID</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Dimension</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Current State</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Future State</th>
            <th style={S.thPrimary}>Gap Description</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Effort</th>
          </tr>
        </thead>
        <tbody>
          {GAPS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.dBg, row.dFg)}>{row.dim}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.future}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.iBg, row.iFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.eBg, row.eFg)}>{row.effort}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAction = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔨 REMEDIATION ACTION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Gap ID</th>
            <th style={S.thSecondary}>Remediation Action</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Target Date</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { gap: "GAP-006", action: "Implement RBAC security model — design roles, configure in platform", owner: "[Tech Lead]", date: "[Date]", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { gap: "GAP-001", action: "Build customer self-service order portal with form validation", owner: "[Dev Team]", date: "[Date]", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { gap: "GAP-002", action: "Migrate to cloud infrastructure; build REST API layer", owner: "[Infra + Dev]", date: "[Date]", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { gap: "GAP-004", action: "Design data model; build ETL pipelines to centralize data", owner: "[Data Team]", date: "[Date]", pri: "P2", priBg: "#FEF3C7", priFg: "#D97706", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { gap: "GAP-003", action: "Develop training program and change management plan", owner: "[BA + HR]", date: "[Date]", pri: "P2", priBg: "#FEF3C7", priFg: "#D97706", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
            { gap: "GAP-005", action: "Deploy BI tool; create automated dashboard templates", owner: "[BI Team]", date: "[Date]", pri: "P3", priBg: "#DBEAFE", priFg: "#2563EB", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
            { gap: "", action: "[Add action]", owner: "", date: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
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
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📊 GAP SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Total gaps identified", a: "[___]" },
            { q: "High impact gaps", a: "[___] — [List IDs]" },
            { q: "Quick wins (High impact, Low effort)", a: "[List GAP IDs — e.g., GAP-006, GAP-005]" },
            { q: "Major projects (High impact, High effort)", a: "[List GAP IDs — e.g., GAP-001, GAP-002]" },
            { q: "Estimated total effort", a: "[___] person-days / [___] sprints" },
            { q: "Key risks", a: "[e.g., Data migration complexity underestimated; vendor API not ready]" },
            { q: "Recommendations", a: "[Prioritize quick wins first; phase major projects across Q3-Q4]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "30%", verticalAlign: "top" as const }}>{row.q}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Search size={11} /> Gap Analysis</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Search size={20} className="text-sky-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Gap Analysis</h2>
              <p className="text-xs font-medium text-sky-600">Gap Identification &bull; Impact &bull; Effort &bull; Remediation</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Identify and assess gaps between current and future states with impact/effort ratings, remediation actions, and priority-ranked action plan. Full Analysis includes action plan and summary; Quick Gaps shows the gap table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderGaps()}{renderAction()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderGaps()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function GapAnalysisPage() {
  return (<ThemeProvider><GapAnalysisContent /></ThemeProvider>);
}
