"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertTriangle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Stress Test", desc: "All assumptions + analysis", icon: LayoutDashboard },
  { id: "compact", label: "Quick Register", desc: "Assumption table only", icon: AlignJustify },
];

function AssumptionStressTestContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706"; const accentDark = "#B45309";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #DC2626", textAlign: "center" as const }}>🧪 ASSUMPTION STRESS TEST</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Uncertainty &amp; Complexity</td></tr>
      <tr><td style={descStyle}>Assumptions are silent risks. This template helps you identify, categorize, validate, and stress-test every assumption your project depends on. When an assumption fails, you want to know about it before it causes damage.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Test Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Tested By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Total Assumptions</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>8 tracked | 2 at risk</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 ASSUMPTION REGISTER &amp; STRESS TEST</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Assumption</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Category</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Confidence</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Impact if Wrong</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { a: "Vendor API will be delivered by end of Sprint 5", cat: "External", conf: "Medium", imp: "High", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "At Risk" },
            { a: "Sales team will have capacity for UAT during Sprint 6", cat: "Resource", conf: "Medium", imp: "Medium", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "At Risk" },
            { a: "Existing CRM data quality is sufficient for migration", cat: "Technical", conf: "High", imp: "High", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Validated" },
            { a: "SSO can be configured within 2 weeks of request", cat: "External", conf: "Medium", imp: "Medium", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Tracking" },
            { a: "Budget approval for Phase 2 will proceed as planned", cat: "Business", conf: "High", imp: "High", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Validated" },
            { a: "Team velocity will remain stable through end of project", cat: "Team", conf: "High", imp: "Medium", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Tracking" },
            { a: "No major regulatory changes will affect data handling", cat: "External", conf: "High", imp: "High", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Validated" },
            { a: "Regional sales managers will support change adoption", cat: "Business", conf: "Medium", imp: "High", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Tracking" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.a}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.cat}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const }}>{r.conf}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const }}>{r.imp}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.st}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🔍 STRESS TEST ANALYSIS</div>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>At-Risk Assumptions</td><td style={S.td0}>[#1: Vendor API — 3 weeks behind; #2: Sales UAT capacity — Q2 targets may compete for attention]</td></tr>
        <tr><td style={S.tdLabelAlt}>What If #1 Fails?</td><td style={S.tdAlt}>[Phase 2 delayed 2-3 sprints; workaround: phased rollout with mock integrations; cost impact: ~$15K additional]</td></tr>
        <tr><td style={S.tdLabel}>What If #2 Fails?</td><td style={S.td0}>[UAT delayed 1 sprint; workaround: proxy testers from BA team; risk: lower test coverage quality]</td></tr>
        <tr><td style={S.tdLabelAlt}>Trigger Points</td><td style={S.tdAlt}>[#1: If no vendor confirmation by Sprint 5 Day 5 → activate contingency | #2: If sales capacity &lt; 50% by Sprint 5 → activate proxy testers]</td></tr>
        <tr><td style={S.tdLabel}>Next Review</td><td style={S.td0}>[Weekly check on at-risk assumptions; full stress test monthly or at phase gates]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚡ ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Escalate vendor API timeline to vendor account manager — request written commitment]", owner: "[PM]", target: "[This week]" },
            { act: "[Confirm sales team UAT capacity with regional managers for Sprint 6]", owner: "[BA]", target: "[Week 8]" },
            { act: "[Prepare contingency plan document for top 2 at-risk assumptions]", owner: "[PM]", target: "[Week 8]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FFFBEB", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section F: Uncertainty &amp; Complexity • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderAnalysis()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><AlertTriangle size={11} /> Stress Test</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><AlertTriangle size={20} className="text-amber-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Assumption Stress Test</h2><p className="text-xs font-medium text-amber-600">Section F: Uncertainty &amp; Complexity</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Identify, validate, and stress-test every assumption your project depends on.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AssumptionStressTestPage() {
  return (<ThemeProvider><AssumptionStressTestContent /></ThemeProvider>);
}
