"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Cog, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Spec", desc: "By feature area + acceptance", icon: LayoutDashboard },
  { id: "compact", label: "Flat List", desc: "All requirements in table", icon: AlignJustify },
];

function FRSContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const feat1Ref = useRef<HTMLDivElement>(null);
  const feat2Ref = useRef<HTMLDivElement>(null);
  const flatRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>⚙️ FUNCTIONAL REQUIREMENTS SPECIFICATION</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template organizes detailed functional requirements by business process or feature area.</strong> Each requirement includes a unique ID, description, acceptance criteria, priority (MoSCoW), source, and status. It bridges the gap between the high-level BRD and the technical design specification.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>detailed requirements documentation, developer handoff,</strong> or <strong style={{ fontStyle: "italic" }}>acceptance criteria definition</strong>. Aligns with BABOK Knowledge Area: Requirements Analysis and Design Definition.
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
            <td style={{ ...S.td0, width: "34%" }}>[FRS-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Business Analyst</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Version / Date</td>
            <td style={S.tdAlt}>[1.0] — [MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Related BRD</td>
            <td style={S.td0}>[BRD-001 — link or reference]</td>
            <td style={S.tdLabel}>Status</td>
            <td style={S.td0}>☐ Draft ☐ In Review ☐ Approved ☐ Baselined</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const FEATURE1 = [
    { id: "FR-001", req: "The system shall allow authenticated users to create a new order by entering customer, product, and shipping details.", ac: "Given a logged-in user, when they submit a valid order form, then the order is created with status 'Pending' and an order ID is generated.", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", src: "[Workshop #1]", stat: "Approved", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "FR-002", req: "The system shall validate all required fields before submission and display inline error messages for invalid inputs.", ac: "Given missing/invalid fields, when user submits, then form does not submit and errors appear next to each invalid field.", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", src: "[UX Review]", stat: "Approved", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "FR-003", req: "The system shall support saving a draft order that can be resumed later.", ac: "Given a partially completed form, when user clicks 'Save Draft', then the order is saved with status 'Draft' and appears in 'My Drafts'.", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", src: "[Interview #3]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
    { id: "FR-004", req: "[Add requirement]", ac: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", src: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
  ];

  const FEATURE2 = [
    { id: "FR-010", req: "The system shall display order status in real-time with visual indicators (color-coded badges).", ac: "Given an order exists, when user views order detail, then current status is displayed with corresponding color badge and timestamp.", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", src: "[Workshop #2]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
    { id: "FR-011", req: "The system shall send email and in-app notifications when an order status changes.", ac: "Given a status change, then an email is sent within 60 seconds and an in-app notification appears on next page load.", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", src: "[Survey]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
    { id: "FR-012", req: "[Add requirement]", ac: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", src: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
  ];

  const renderFeatureGroup = (label: string, color: string, bg: string, reqs: typeof FEATURE1, ref: React.RefObject<HTMLDivElement | null>) => (
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr><td colSpan={6} style={{ backgroundColor: bg, color: color, padding: "10px 14px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${color}` }}>{label}</td></tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Req ID</th>
            <th style={{ ...S.thSecondary, width: "28%" }}>Requirement</th>
            <th style={S.thSecondary}>Acceptance Criteria</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thSecondary, width: "9%" }}>Source</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reqs.map((row, i) => {
            const rbg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: rbg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: rbg, fontSize: "11px" }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: rbg, fontSize: "11px" }}>{row.ac}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: rbg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: rbg, fontSize: "10px" }}>{row.src}</td>
                <td style={{ ...S.td0, backgroundColor: rbg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={ref} label="Copy Section" />
    </div>
  );

  const renderFlatList = () => (
    <div ref={flatRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 ALL FUNCTIONAL REQUIREMENTS</div>
      <CopyButton targetRef={flatRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Req ID</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Feature Area</th>
            <th style={S.thPrimary}>Requirement</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[...FEATURE1.map(r => ({ ...r, area: "Order Creation" })), ...FEATURE2.map(r => ({ ...r, area: "Order Tracking" }))].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.area}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGlossary = () => (
    <div ref={glossRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📖 GLOSSARY &amp; PRIORITY KEY</div>
      <CopyButton targetRef={glossRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "14%" }}>Term</th><th style={S.thSecondary}>Definition</th></tr></thead>
        <tbody>
          {[
            { term: "Must Have", def: "Critical for go-live. System cannot function without it. (MoSCoW: M)" },
            { term: "Should Have", def: "Important but not critical. Workaround exists. Include if possible. (MoSCoW: S)" },
            { term: "Could Have", def: "Nice to have. Included only if time/budget allows. (MoSCoW: C)" },
            { term: "Won't Have", def: "Explicitly excluded from this release. May be in future scope. (MoSCoW: W)" },
            { term: "Approved", def: "Requirement has been reviewed and formally approved by stakeholders." },
            { term: "Draft", def: "Requirement is written but not yet reviewed or approved." },
            { term: "Deferred", def: "Requirement is valid but moved to a future phase or release." },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{row.term}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.def}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Cog size={11} /> FRS</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Cog size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Functional Requirements Specification</h2>
              <p className="text-xs font-medium text-indigo-600">Feature Areas &bull; Acceptance Criteria &bull; MoSCoW Priority</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Detailed functional requirements organized by feature area with acceptance criteria, MoSCoW priority, source, and status. Full Spec groups by feature; Flat List shows all requirements in one table.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderFeatureGroup("FEATURE AREA 1: ORDER CREATION", "#2563EB", "#DBEAFE", FEATURE1, feat1Ref)}{renderFeatureGroup("FEATURE AREA 2: ORDER TRACKING & NOTIFICATIONS", "#059669", "#D1FAE5", FEATURE2, feat2Ref)}{renderGlossary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderFlatList()}{renderGlossary()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FunctionalRequirementsSpecPage() {
  return (<ThemeProvider><FRSContent /></ThemeProvider>);
}
