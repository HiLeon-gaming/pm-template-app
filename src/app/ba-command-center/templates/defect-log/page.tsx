"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Bug, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Defect Log", desc: "Detailed + summary dashboard", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Defect table only", icon: AlignJustify },
];

function DefectLogContent() {
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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🐛 DEFECT LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template tracks all defects discovered during testing with severity, priority, status, and resolution details.</strong> Each defect includes reproduction steps, linked test cases and requirements, and assignment information. The summary dashboard provides at-a-glance metrics for defect triage meetings and go/no-go decisions.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>UAT defect tracking, daily triage meetings,</strong> or <strong style={{ fontStyle: "italic" }}>providing objective data for release readiness decisions</strong>. Aligns with BABOK Knowledge Area: Solution Evaluation.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Test Cycle</td>
            <td style={{ ...S.td0, width: "36%" }}>[e.g., UAT Cycle 1]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Maintained by</td>
            <td style={S.tdAlt}>[BA / QA Lead Name]</td>
            <td style={S.tdLabelAlt}>Last Updated</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const DEFECTS = [
    { id: "DEF-001", title: "Promo code accepted on second use for same customer", sev: "Critical", sevBg: "#FEE2E2", sevFg: "#DC2626", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Open", stBg: "#FEE2E2", stFg: "#DC2626", tc: "TC-004", req: "BR-003", assignee: "[Dev Name]", found: "[MM/DD]", module: "Promo Engine" },
    { id: "DEF-002", title: "Free shipping not applied when subtotal is exactly $100.00", sev: "High", sevBg: "#FEF3C7", sevFg: "#D97706", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626", stat: "In Fix", stBg: "#DBEAFE", stFg: "#2563EB", tc: "TC-003", req: "BR-002", assignee: "[Dev Name]", found: "[MM/DD]", module: "Cart / Pricing" },
    { id: "DEF-003", title: "Order confirmation email shows wrong order total (pre-discount amount)", sev: "High", sevBg: "#FEF3C7", sevFg: "#D97706", pri: "P2", priBg: "#FEF3C7", priFg: "#D97706", stat: "Fixed", stBg: "#D1FAE5", stFg: "#059669", tc: "TC-008", req: "FR-006", assignee: "[Dev Name]", found: "[MM/DD]", module: "Notifications" },
    { id: "DEF-004", title: "Cancel button visible after 2-hour window but shows error on click", sev: "Medium", sevBg: "#DBEAFE", sevFg: "#2563EB", pri: "P2", priBg: "#FEF3C7", priFg: "#D97706", stat: "Open", stBg: "#FEE2E2", stFg: "#DC2626", tc: "TC-006", req: "BR-005", assignee: "[Dev Name]", found: "[MM/DD]", module: "Order Mgmt" },
    { id: "DEF-005", title: "Tax calculation rounds incorrectly for orders with odd quantities", sev: "Medium", sevBg: "#DBEAFE", sevFg: "#2563EB", pri: "P3", priBg: "#DBEAFE", priFg: "#2563EB", stat: "Deferred", stBg: "#EDE9FE", stFg: "#7C3AED", tc: "TC-001", req: "BR-004", assignee: "—", found: "[MM/DD]", module: "Cart / Pricing" },
    { id: "DEF-006", title: "Inventory count not decremented on order creation in edge case (concurrent orders)", sev: "Critical", sevBg: "#FEE2E2", sevFg: "#DC2626", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Verified", stBg: "#D1FAE5", stFg: "#059669", tc: "TC-001", req: "FR-003", assignee: "[Dev Name]", found: "[MM/DD]", module: "Inventory" },
    { id: "[Add]", title: "", sev: "—", sevBg: "#F3F4F6", sevFg: "#6B7280", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", stat: "—", stBg: "#F3F4F6", stFg: "#6B7280", tc: "", req: "", assignee: "", found: "", module: "" },
  ];

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 DEFECT LOG</div>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
            <th style={S.thPrimary}>Defect Title</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Severity</th>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>Pri</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Status</th>
            <th style={{ ...S.thPrimary, width: "6%" }}>TC</th>
            <th style={{ ...S.thPrimary, width: "6%" }}>Req</th>
            <th style={{ ...S.thPrimary, width: "8%" }}>Assignee</th>
            <th style={{ ...S.thPrimary, width: "8%" }}>Module</th>
          </tr>
        </thead>
        <tbody>
          {DEFECTS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.title}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sevBg, row.sevFg)}>{row.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.stBg, row.stFg)}>{row.stat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{row.tc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.assignee}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.module}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🔍 DEFECT DETAIL (Template)</div>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Use this format to document each defect in detail. Copy and fill for each new defect.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Defect ID", a: "[DEF-XXX]" },
            { q: "Title", a: "[Short descriptive title]" },
            { q: "Severity / Priority", a: "[Critical/High/Medium/Low] / [P1/P2/P3/P4]" },
            { q: "Found by", a: "[Tester Name] on [MM/DD/YYYY]" },
            { q: "Test Case", a: "[TC-XXX]" },
            { q: "Requirement", a: "[FR-XXX / BR-XXX / NFR-XXX]" },
            { q: "Environment", a: "[e.g., UAT — Chrome 120, Windows 11]" },
            { q: "Steps to Reproduce", a: "[1. Navigate to... 2. Click... 3. Enter... 4. Observe...]" },
            { q: "Expected Result", a: "[What should happen]" },
            { q: "Actual Result", a: "[What actually happened — include error messages, screenshots]" },
            { q: "Assigned to", a: "[Developer Name]" },
            { q: "Resolution", a: "[Description of fix — or 'Deferred to [version]' or 'Won't Fix — [reason]']" },
            { q: "Verified by", a: "[Tester Name] on [MM/DD/YYYY] — ☐ Verified Fixed ☐ Re-opened" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "18%", verticalAlign: "top" as const }}>{row.q}</td>
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
      <div style={S.sectionBanner()}>📊 DEFECT SUMMARY DASHBOARD</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={{ width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font }}>
        <tbody><tr>
          <td style={{ verticalAlign: "top" as const, padding: "0", border: "none", width: "50%", paddingRight: "5px" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>BY SEVERITY</td></tr></thead>
              <tbody>
                {[
                  { label: "Critical", count: "[___]", open: "[___]", bg: "#FEE2E2", fg: "#DC2626" },
                  { label: "High", count: "[___]", open: "[___]", bg: "#FEF3C7", fg: "#D97706" },
                  { label: "Medium", count: "[___]", open: "[___]", bg: "#DBEAFE", fg: "#2563EB" },
                  { label: "Low", count: "[___]", open: "[___]", bg: "#D1FAE5", fg: "#059669" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, width: "30%" }}><span style={S.badge(r.bg, r.fg)}>{r.label}</span></td>
                    <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, textAlign: "center" as const, fontWeight: 700 }}>Total: {r.count}</td>
                    <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, textAlign: "center" as const, fontWeight: 700, color: "#DC2626" }}>Open: {r.open}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td style={{ verticalAlign: "top" as const, padding: "0", border: "none", width: "50%", paddingLeft: "5px" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#2563EB", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #2563EB" }}>BY STATUS</td></tr></thead>
              <tbody>
                {[
                  { label: "Open", count: "[___]", bg: "#FEE2E2", fg: "#DC2626" },
                  { label: "In Fix", count: "[___]", bg: "#DBEAFE", fg: "#2563EB" },
                  { label: "Fixed", count: "[___]", bg: "#D1FAE5", fg: "#059669" },
                  { label: "Verified", count: "[___]", bg: "#D1FAE5", fg: "#059669" },
                  { label: "Deferred", count: "[___]", bg: "#EDE9FE", fg: "#7C3AED" },
                  { label: "Closed", count: "[___]", bg: "#F3F4F6", fg: "#6B7280" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, width: "40%" }}><span style={S.badge(r.bg, r.fg)}>{r.label}</span></td>
                    <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, textAlign: "center" as const, fontWeight: 700 }}>{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr></tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Defects</td><td style={S.td0}>[___]</td></tr>
          <tr><td style={S.tdLabelAlt}>Open Critical/High</td><td style={{ ...S.tdAlt, color: "#DC2626", fontWeight: 700 }}>[___] — these must be resolved before sign-off</td></tr>
          <tr><td style={S.tdLabel}>Fix Rate</td><td style={S.td0}>[___]% of defects resolved</td></tr>
          <tr><td style={S.tdLabelAlt}>Release Readiness</td><td style={S.tdAlt}>☐ Ready (0 critical/high open) ☐ Conditional ☐ Not Ready</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Bug size={11} /> Defects</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Bug size={20} className="text-red-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Defect Log</h2>
              <p className="text-xs font-medium text-red-600">Defects &bull; Severity &bull; Status &bull; Detail Template &bull; Dashboard</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track all defects with severity, priority, status, linked test cases and requirements, plus a summary dashboard for triage meetings. Full Defect Log includes detail template and dashboard; Quick Log shows the defect table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function DefectLogPage() {
  return (<ThemeProvider><DefectLogContent /></ThemeProvider>);
}
