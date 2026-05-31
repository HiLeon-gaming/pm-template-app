"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Outcomes + benefits + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Benefits register only", icon: AlignJustify },
];

function OutcomeBenefitsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const trackingRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🏆 OUTCOME &amp; BENEFITS TRACKER</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Measurement &amp; Outcomes</td></tr>
      <tr><td style={descStyle}>Track the intended outcomes and benefits of the project from definition through realization. PMBOK 7 emphasizes outcomes over outputs — this template ensures you measure what matters and prove the project delivered real value.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date Created</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Last Reviewed</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Business Objective</td><td colSpan={3} style={S.td0}>[Increase sales pipeline visibility by 40% and reduce manual reporting effort by 60%]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderOutcomes = () => (
    <div ref={outcomesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 INTENDED OUTCOMES</td></tr></tbody></table>
      <CopyButton targetRef={outcomesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Outcome</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "20%" }}>Success Measure</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Target Date</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { o: "Sales team has real-time pipeline visibility across all regions", m: "Dashboard active usage ≥ 80%", d: "[Q2 2026]", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { o: "Manual reporting effort eliminated for weekly pipeline reports", m: "≥ 60% time reduction", d: "[Q2 2026]", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { o: "Sales leadership can forecast revenue with higher accuracy", m: "Forecast accuracy ≥ 85%", d: "[Q3 2026]", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { o: "Standardized sales process adopted across all 3 regions", m: "Process compliance ≥ 90%", d: "[Q3 2026]", s: "⚪", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.o}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.m}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.d}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBenefits = () => (
    <div ref={benefitsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>💰 BENEFITS REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={benefitsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Benefit</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Type</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "15%" }}>Baseline</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "15%" }}>Target</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "15%" }}>Actual</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { b: "Reduced reporting time", t: "Tangible", base: "8 hrs/week", tgt: "3 hrs/week", act: "[TBD]", own: "[Sales Ops]" },
            { b: "Improved forecast accuracy", t: "Tangible", base: "68%", tgt: "85%", act: "[TBD]", own: "[Sales VP]" },
            { b: "Increased pipeline visibility", t: "Tangible", base: "Regional only", tgt: "All regions real-time", act: "Live", own: "[CRO]" },
            { b: "Better decision-making speed", t: "Intangible", base: "1-2 weeks lag", tgt: "Same-day", act: "[TBD]", own: "[Sales VP]" },
            { b: "Improved sales team morale", t: "Intangible", base: "3.2/5 survey", tgt: "≥ 4.0/5", act: "[TBD]", own: "[HR + Sales]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.b}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}><span style={S.badge(r.t === "Tangible" ? C.badgeGreenBg : C.badgeBlueBg, r.t === "Tangible" ? C.badgeGreenFg : C.badgeBlueFg)}>{r.t}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.base}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.tgt}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTracking = () => (
    <div ref={trackingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📅 REALIZATION TRACKING</td></tr></tbody></table>
      <CopyButton targetRef={trackingRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Measurement Start</td><td style={S.td0}>[Post Phase 1 go-live — target: Sprint 8 completion]</td></tr>
        <tr><td style={S.tdLabelAlt}>Measurement Cadence</td><td style={S.tdAlt}>[Monthly for 3 months post-launch; quarterly thereafter for 12 months]</td></tr>
        <tr><td style={S.tdLabel}>Realization Owner</td><td style={S.td0}>[Business Sponsor — VP Sales; PM supports data collection through Q3]</td></tr>
        <tr><td style={S.tdLabelAlt}>Handoff Plan</td><td style={S.tdAlt}>[Benefits tracking handed to Sales Ops after 90-day post-launch period with established measurement process]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Finalize benefit baselines with Sales Ops before Phase 1 go-live]", owner: "[PM + BA]", target: "[Week 9]" },
            { act: "[Create automated benefits tracking dashboard for post-launch measurement]", owner: "[PM]", target: "[Week 11]" },
            { act: "[Schedule 90-day post-launch review with sponsor to assess benefit realization]", owner: "[PM]", target: "[Post-launch]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section E: Measurement &amp; Outcomes • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderOutcomes()}{renderBenefits()}{renderTracking()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderBenefits()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><BarChart3 size={11} /> Outcomes</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><BarChart3 size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Outcome &amp; Benefits Tracker</h2><p className="text-xs font-medium text-teal-600">Section E: Measurement &amp; Outcomes</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Track intended outcomes and benefits from definition through realization.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function OutcomeBenefitsPage() {
  return (<ThemeProvider><OutcomeBenefitsContent /></ThemeProvider>);
}
