"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Shield, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Spec", desc: "By category + targets", icon: LayoutDashboard },
  { id: "compact", label: "Flat List", desc: "All NFRs in one table", icon: AlignJustify },
];

function NFRContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const perfRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const usabRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);
  const flatRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔒 NON-FUNCTIONAL REQUIREMENTS (NFR)</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template documents non-functional requirements — the quality attributes that define how the system should perform, not what it should do.</strong> Each NFR is categorized (Performance, Security, Scalability, Usability, Availability, Compliance) with measurable acceptance targets and validation methods.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>architecture reviews, SLA negotiations,</strong> or <strong style={{ fontStyle: "italic" }}>ensuring solution quality attributes are captured alongside functional requirements</strong>. Aligns with BABOK: Solution Evaluation.
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
            <td style={{ ...S.tdLabel, width: "16%" }}>Document ID</td>
            <td style={{ ...S.td0, width: "34%" }}>[NFR-001]</td>
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
            <td style={S.tdLabel}>Status</td>
            <td style={S.td0}>☐ Draft ☐ In Review ☐ Approved</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const PERF = [
    { id: "NFR-001", req: "Page load time for all primary screens", target: "< 2 seconds at 95th percentile", method: "Load testing (JMeter / k6)", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-002", req: "API response time for all endpoints", target: "< 500ms average, < 1s at 99th percentile", method: "APM monitoring (Datadog)", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-003", req: "Batch report generation (daily summary)", target: "< 5 minutes for full dataset", method: "Scheduled job monitoring", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706" },
    { id: "NFR-004", req: "[Add performance requirement]", target: "", method: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280" },
  ];

  const SEC = [
    { id: "NFR-010", req: "Role-based access control (RBAC) for all modules", target: "Minimum 4 roles: Admin, Manager, User, Viewer", method: "Security audit + penetration test", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-011", req: "Data encryption at rest and in transit", target: "AES-256 at rest, TLS 1.3 in transit", method: "Security compliance review", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-012", req: "Session timeout for inactive users", target: "Auto-logout after 30 minutes of inactivity", method: "QA testing", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-013", req: "Audit trail for all data modifications", target: "Log user, timestamp, before/after values", method: "Log review + compliance audit", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706" },
    { id: "NFR-014", req: "[Add security requirement]", target: "", method: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280" },
  ];

  const USAB = [
    { id: "NFR-020", req: "New users can complete primary workflow without training", target: "System Usability Scale (SUS) score ≥ 75", method: "Usability testing with 5+ users", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706" },
    { id: "NFR-021", req: "Responsive design for tablet and desktop", target: "Functional on 768px+ viewport width", method: "Cross-device QA testing", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-022", req: "Accessibility compliance", target: "WCAG 2.1 Level AA", method: "Accessibility audit (axe / Lighthouse)", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706" },
    { id: "NFR-023", req: "[Add usability requirement]", target: "", method: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280" },
  ];

  const OTHER = [
    { id: "NFR-030", cat: "Availability", catBg: "#D1FAE5", catFg: "#059669", req: "System uptime during business hours", target: "99.9% uptime M-F 6am-10pm EST", method: "Uptime monitoring (PagerDuty)", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-031", cat: "Scalability", catBg: "#EDE9FE", catFg: "#7C3AED", req: "Concurrent user support", target: "500 concurrent users without degradation", method: "Load testing", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-032", cat: "Scalability", catBg: "#EDE9FE", catFg: "#7C3AED", req: "Data volume growth", target: "Support 10M records with < 10% performance impact", method: "Volume testing", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706" },
    { id: "NFR-033", cat: "Compliance", catBg: "#FCE7F3", catFg: "#BE185D", req: "Regulatory compliance", target: "SOC 2 Type II compliant", method: "Compliance audit", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-034", cat: "Compliance", catBg: "#FCE7F3", catFg: "#BE185D", req: "Data retention policy", target: "7-year retention for financial data, 3-year for operational", method: "Policy review + DB config", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626" },
    { id: "NFR-035", cat: "Disaster Recovery", catBg: "#CFFAFE", catFg: "#0891B2", req: "Recovery Time Objective (RTO)", target: "< 4 hours", method: "DR drill", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706" },
    { id: "NFR-036", cat: "Disaster Recovery", catBg: "#CFFAFE", catFg: "#0891B2", req: "Recovery Point Objective (RPO)", target: "< 1 hour (max data loss)", method: "Backup verification", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706" },
  ];

  const renderCategoryTable = (label: string, color: string, bg: string, icon: string, items: typeof PERF, ref: React.RefObject<HTMLDivElement | null>) => (
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr><td colSpan={5} style={{ backgroundColor: bg, color: color, padding: "10px 14px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${color}` }}>{icon} {label}</td></tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>ID</th>
            <th style={S.thSecondary}>Requirement</th>
            <th style={{ ...S.thSecondary, width: "22%" }}>Measurable Target</th>
            <th style={{ ...S.thSecondary, width: "18%" }}>Validation Method</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => {
            const rbg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: rbg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: rbg }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: rbg, fontSize: "11px", fontWeight: 600 }}>{row.target}</td>
                <td style={{ ...S.td0, backgroundColor: rbg, fontSize: "11px" }}>{row.method}</td>
                <td style={{ ...S.td0, backgroundColor: rbg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={ref} label="Copy Section" />
    </div>
  );

  const renderOtherCategories = () => (
    <div ref={otherRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 AVAILABILITY, SCALABILITY, COMPLIANCE &amp; DR</td></tr></tbody></table>
      <CopyButton targetRef={otherRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>ID</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Category</th>
            <th style={S.thPrimary}>Requirement</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Measurable Target</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Validation Method</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {OTHER.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.catBg, row.catFg)}>{row.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.method}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFlatList = () => {
    const all = [
      ...PERF.map(r => ({ ...r, cat: "Performance", catBg: "#DBEAFE", catFg: "#2563EB" })),
      ...SEC.map(r => ({ ...r, cat: "Security", catBg: "#FEE2E2", catFg: "#DC2626" })),
      ...USAB.map(r => ({ ...r, cat: "Usability", catBg: "#FEF3C7", catFg: "#D97706" })),
      ...OTHER,
    ];
    return (
      <div ref={flatRef} style={{ marginBottom: "12px" }}>
        <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 ALL NON-FUNCTIONAL REQUIREMENTS</td></tr></tbody></table>
        <CopyButton targetRef={flatRef} label="Copy Section" />
        <table style={S.tbl}>
          <thead>
            <tr>
              <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>ID</th>
              <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Category</th>
              <th style={S.thPrimary}>Requirement</th>
              <th style={{ ...S.thPrimary, width: "20%" }}>Target</th>
              <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {all.map((row, i) => {
              const bg = i % 2 === 1 ? C.rowAlt : C.white;
              return (
                <tr key={i}>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.catBg, row.catFg)}>{row.cat}</span></td>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.req}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.target}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Shield size={11} /> NFR</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Shield size={20} className="text-red-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Non-Functional Requirements</h2>
              <p className="text-xs font-medium text-red-600">Performance &bull; Security &bull; Usability &bull; Scalability &bull; Compliance</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Comprehensive NFR specification with measurable targets and validation methods across performance, security, usability, availability, scalability, compliance, and disaster recovery. Full Spec groups by category; Flat List shows all NFRs in one table.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderCategoryTable("PERFORMANCE", "#2563EB", "#DBEAFE", "⚡", PERF, perfRef)}{renderCategoryTable("SECURITY", "#DC2626", "#FEE2E2", "🛡️", SEC, secRef)}{renderCategoryTable("USABILITY", "#D97706", "#FEF3C7", "👤", USAB, usabRef)}{renderOtherCategories()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderFlatList()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function NonFunctionalRequirementsPage() {
  return (<ThemeProvider><NFRContent /></ThemeProvider>);
}
