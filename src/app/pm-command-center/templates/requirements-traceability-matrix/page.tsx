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
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x1F517; REQUIREMENTS TRACEABILITY MATRIX</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The RTM links each requirement to its business objective, design element, test case, and delivery status.</strong> It ensures every requirement is accounted for throughout the project lifecycle and nothing falls through the cracks.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>scope planning and throughout execution</strong> to maintain traceability. Aligns with PMBOK Scope Management &#x2014; Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const reqs = [
    { id: "REQ-001", desc: "[e.g., System shall auto-generate invoices from PO data]", pri: "Must Have", pBg: C.badgeRedBg, pFg: C.badgeRedFg, biz: "OBJ-1", wbs: "1.3.3", design: "DS-004", test: "TC-012", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "REQ-002", desc: "[e.g., Dashboard shall display real-time payment status]", pri: "Must Have", pBg: C.badgeRedBg, pFg: C.badgeRedFg, biz: "OBJ-1", wbs: "1.3.3", design: "DS-007", test: "TC-015", status: "In Dev", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
    { id: "REQ-003", desc: "[e.g., Support multi-currency conversion for international vendors]", pri: "Should Have", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, biz: "OBJ-2", wbs: "1.3.3", design: "DS-009", test: "TC-018", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "REQ-004", desc: "[e.g., System shall integrate with SAP ERP via REST API]", pri: "Must Have", pBg: C.badgeRedBg, pFg: C.badgeRedFg, biz: "OBJ-1", wbs: "1.3.2", design: "DS-002", test: "TC-008", status: "In Dev", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
    { id: "REQ-005", desc: "[e.g., Email notification on invoice approval/rejection]", pri: "Could Have", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, biz: "OBJ-3", wbs: "1.3.4", design: "DS-011", test: "TC-022", status: "Deferred", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
    { id: "REQ-006", desc: "[e.g., Role-based access control for finance users]", pri: "Must Have", pBg: C.badgeRedBg, pFg: C.badgeRedFg, biz: "OBJ-1", wbs: "1.3.3", design: "DS-003", test: "TC-010", status: "Testing", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
    { id: "REQ-007", desc: "[e.g., Audit trail for all invoice changes]", pri: "Must Have", pBg: C.badgeRedBg, pFg: C.badgeRedFg, biz: "OBJ-1", wbs: "1.3.3", design: "DS-005", test: "TC-014", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "[REQ-###]", desc: "[Add requirement]", pri: "&#x2014;", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, biz: "", wbs: "", design: "", test: "", status: "&#x2014;", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
  ];

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CB; TRACEABILITY MATRIX</div>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Req ID</th>
          <th style={S.thPrimary}>Requirement Description</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Biz Obj</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>WBS</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Design</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Test</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {reqs.map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{r.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.biz}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.wbs}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.design}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.test}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Priority uses MoSCoW: <strong>Must Have</strong> (critical) &#x2022; <strong>Should Have</strong> (important) &#x2022; <strong>Could Have</strong> (nice-to-have) &#x2022; <strong>Won&#x2019;t Have</strong> (deferred)</p>
    </div>
  );

  const renderCoverage = () => (
    <div ref={coverageRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4CA; COVERAGE ANALYSIS</div>
      <CopyButton targetRef={coverageRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Metric</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Count</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>%</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Total Requirements", count: "[30]", pct: "100%", note: "[Total approved requirements in baseline]" },
            { metric: "Traced to Business Objective", count: "[30]", pct: "100%", note: "[All requirements linked to at least one objective]" },
            { metric: "Traced to Design", count: "[28]", pct: "93%", note: "[2 requirements pending design mapping]" },
            { metric: "Traced to Test Case", count: "[26]", pct: "87%", note: "[4 requirements pending test case creation]" },
            { metric: "Tested &amp; Verified", count: "[18]", pct: "60%", note: "[12 remaining in current sprint]" },
            { metric: "Deferred / Out of Scope", count: "[2]", pct: "7%", note: "[Moved to Phase 2 backlog]" },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{m.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{m.count}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary }}>{m.pct}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.note}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4DD; STATUS SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "20%" }}>Status</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Count</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>%</th>
          <th style={S.thSecondary}>Action Required</th>
        </tr></thead>
        <tbody>
          {[
            { status: "Approved", count: "[12]", pct: "[40%]", action: "[Ready for development]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { status: "In Development", count: "[8]", pct: "[27%]", action: "[Monitor sprint progress]", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { status: "In Testing", count: "[6]", pct: "[20%]", action: "[Track defect resolution]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { status: "Verified / Complete", count: "[2]", pct: "[7%]", action: "[No action &#x2014; closed]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { status: "Deferred", count: "[2]", pct: "[7%]", action: "[Moved to Phase 2 backlog]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg }}><span style={S.badge(s.sBg, s.sFg)}>{s.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{s.count}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{s.pct}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.action}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderCoverage()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderSummary()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Link2 size={11} /> RTM</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Link2 size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Requirements Traceability Matrix</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Scope Management &#x2022; Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Links every requirement to business objectives, design elements, test cases, and delivery status. Full RTM includes coverage analysis and status summary; Quick Matrix shows the traceability table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RequirementsTraceabilityMatrixPage() {
  return (<ThemeProvider><RTMContent /></ThemeProvider>);
}
