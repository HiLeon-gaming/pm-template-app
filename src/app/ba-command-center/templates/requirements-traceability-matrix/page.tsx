"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Link2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full RTM", desc: "Matrix + coverage + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Matrix", desc: "Traceability table only", icon: AlignJustify },
];

function RTMContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const coverageRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔗 REQUIREMENTS TRACEABILITY MATRIX (RTM)</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides full lifecycle traceability from business need through delivery.</strong> Each requirement is linked to its source (stakeholder, BRD section), design element, test case, and delivery status. The RTM ensures nothing falls through the cracks and provides an audit trail for compliance and governance reviews.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>requirements baseline management, audit preparation,</strong> or <strong style={{ fontStyle: "italic" }}>ensuring complete test coverage across all requirements</strong>. Aligns with BABOK Knowledge Area: Requirements Lifecycle Management.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Document ID</td>
            <td style={{ ...S.td0, width: "36%" }}>[RTM-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Business Analyst</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Version / Date</td>
            <td style={S.tdAlt}>[1.0] — [MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Related BRD</td>
            <td style={S.td0}>[BRD-001]</td>
            <td style={S.tdLabel}>Total Requirements</td>
            <td style={S.td0}>[___] functional + [___] non-functional</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const ROWS = [
    { req: "FR-001", desc: "Create new order via web portal", src: "BRD §3.1, Workshop #1", srcType: "Workshop", stBg: "#EDE9FE", stFg: "#7C3AED", design: "DD-010, WF-001", tc: "TC-001, TC-002", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Developed", sBg: "#DBEAFE", sFg: "#2563EB", delivery: "Sprint 3" },
    { req: "FR-002", desc: "Validate required fields with inline errors", src: "BRD §3.1, UX Review", srcType: "Review", stBg: "#DBEAFE", stFg: "#2563EB", design: "DD-011", tc: "TC-003", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Tested", sBg: "#D1FAE5", sFg: "#059669", delivery: "Sprint 3" },
    { req: "FR-003", desc: "Save draft orders for later completion", src: "Interview #3", srcType: "Interview", stBg: "#D1FAE5", stFg: "#059669", design: "DD-012", tc: "TC-004, TC-005", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", stat: "In Dev", sBg: "#FEF3C7", sFg: "#D97706", delivery: "Sprint 4" },
    { req: "FR-010", desc: "Real-time order status with visual badges", src: "BRD §3.2, Workshop #2", srcType: "Workshop", stBg: "#EDE9FE", stFg: "#7C3AED", design: "DD-020", tc: "TC-010, TC-011", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Designed", sBg: "#DBEAFE", sFg: "#2563EB", delivery: "Sprint 5" },
    { req: "FR-011", desc: "Email + in-app notifications on status change", src: "Survey, BRD §3.2", srcType: "Survey", stBg: "#FCE7F3", stFg: "#BE185D", design: "DD-021", tc: "TC-012", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", stat: "Planned", sBg: "#F3F4F6", sFg: "#6B7280", delivery: "Sprint 5" },
    { req: "NFR-001", desc: "Page load < 2s at 95th percentile", src: "BRD §4, Arch Review", srcType: "Review", stBg: "#DBEAFE", stFg: "#2563EB", design: "ARCH-001", tc: "PT-001", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280", delivery: "Sprint 6" },
    { req: "NFR-010", desc: "RBAC with 4 roles", src: "BRD §4, Security Audit", srcType: "Audit", stBg: "#CFFAFE", stFg: "#0891B2", design: "SEC-001", tc: "ST-001, ST-002", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Designed", sBg: "#DBEAFE", sFg: "#2563EB", delivery: "Sprint 4" },
    { req: "[Add]", desc: "", src: "", srcType: "—", stBg: "#F3F4F6", stFg: "#6B7280", design: "", tc: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280", delivery: "" },
  ];

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 TRACEABILITY MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Req ID</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Description</th>
            <th style={{ ...S.thPrimary, width: "12%" }}>Source</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Design Ref</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Test Case(s)</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
            <th style={{ ...S.thPrimary, width: "8%" }}>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.src}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.stBg, row.stFg)}>{row.srcType}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{row.design}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{row.tc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.delivery}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCoverage = () => (
    <div ref={coverageRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📊 COVERAGE ANALYSIS</td></tr></tbody></table>
      <CopyButton targetRef={coverageRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "30%" }}>Metric</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Count</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Percentage</th>
            <th style={S.thSecondary}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {[
            { metric: "Total requirements tracked", count: "[___]", pct: "100%", notes: "Functional + Non-Functional" },
            { metric: "Requirements with design reference", count: "[___]", pct: "[___]%", notes: "Gap = requirements not yet designed" },
            { metric: "Requirements with test cases", count: "[___]", pct: "[___]%", notes: "Gap = requirements without test coverage" },
            { metric: "Requirements tested (pass)", count: "[___]", pct: "[___]%", notes: "Tested and verified" },
            { metric: "Requirements tested (fail)", count: "[___]", pct: "[___]%", notes: "Tested but with defects" },
            { metric: "Requirements not started", count: "[___]", pct: "[___]%", notes: "Not yet in development" },
            { metric: "Requirements deferred / removed", count: "[___]", pct: "[___]%", notes: "Moved to future phase or descoped" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{row.count}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{row.pct}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📝 RTM STATUS SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Last updated", a: "[MM/DD/YYYY] by [BA Name]" },
            { q: "Requirements without design", a: "[List Req IDs that need design attention]" },
            { q: "Requirements without test cases", a: "[List Req IDs missing test coverage]" },
            { q: "Failed requirements", a: "[List Req IDs with open defects]" },
            { q: "Risks / Concerns", a: "[e.g., NFR testing depends on load test environment not yet available]" },
            { q: "Next review date", a: "[MM/DD/YYYY]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "28%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><Link2 size={11} /> RTM</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Link2 size={20} className="text-blue-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Requirements Traceability Matrix (RTM)</h2>
              <p className="text-xs font-medium text-blue-600">Source &bull; Design &bull; Test Cases &bull; Coverage Analysis</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Full lifecycle traceability linking each requirement to its source, design element, test case, and delivery status. Full RTM includes coverage analysis and status summary; Quick Matrix shows the traceability table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderMatrix()}{renderCoverage()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderMatrix()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RTMPage() {
  return (<ThemeProvider><RTMContent /></ThemeProvider>);
}
