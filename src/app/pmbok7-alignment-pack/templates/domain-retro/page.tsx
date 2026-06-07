"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RefreshCw, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Retro", desc: "All domains + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Scorecard only", icon: AlignJustify },
];

function DomainRetroContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scorecardRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🔄 DOMAIN RETROSPECTIVE</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Improvement & Proof</td></tr>
      <tr><td style={descStyle}>Review performance across all 8 PMBOK 7 Performance Domains. Identify what’s working, what needs improvement, and create targeted actions. Use at phase gates, quarterly reviews, or project closure.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Review Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitated By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Review Period</td><td style={S.tdAlt}>[Phase 1 / Sprint 1-6]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderScorecard = () => (
    <div ref={scorecardRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 DOMAIN HEALTH SCORECARD</td></tr></tbody></table>
      <CopyButton targetRef={scorecardRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "20%" }}>Domain</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Trend</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>What’s Working</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>What Needs Improvement</th>
        </tr></thead>
        <tbody>
          {[
            { d: "Stakeholder", sc: "4/5", tr: "↑", w: "[Bi-weekly sponsor 1:1s; pulse surveys active]", n: "[Earlier resistance detection needed]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Team", sc: "5/5", tr: "↑", w: "[Working agreements; psychological safety strong; retro actions implemented]", n: "[Cross-training for remote members]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Dev Approach & Life Cycle", sc: "4/5", tr: "→", w: "[Hybrid approach well-suited; sprint cadence stable]", n: "[Better integration planning needed]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Planning", sc: "4/5", tr: "↑", w: "[Rolling wave planning effective; backlog well-groomed]", n: "[Long-term roadmap needs refinement]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Project Work", sc: "4/5", tr: "→", w: "[Processes running smoothly; blockers resolved quickly]", n: "[Knowledge management could improve]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Delivery", sc: "4/5", tr: "↑", w: "[On-time delivery; quality gates enforced]", n: "[Deployment automation incomplete]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Measurement", sc: "3/5", tr: "↑", w: "[Dashboard active; leading indicators tracked]", n: "[Value realization metrics need formalization]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { d: "Uncertainty", sc: "3/5", tr: "→", w: "[Risk register active; contingency triggers defined]", n: "[Assumption stress testing needs regularity]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.d}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}><span style={S.badge(r.sBg, r.sFg)}>{r.sc}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "14px", textAlign: "center" as const }}>{r.tr}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.w}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.n}</td></tr>);
          })}
          <tr><td style={{ ...S.tdLabel, fontWeight: 800 }}>AVERAGE</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px" }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>3.9/5</span></td><td colSpan={3} style={{ ...S.td0, fontSize: "10px", fontStyle: "italic" }}>Overall: Strong performance with targeted improvement areas in Measurement and Uncertainty domains</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderReflection = () => (
    <div ref={reflectionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>💡 REFLECTION & INSIGHTS</td></tr></tbody></table>
      <CopyButton targetRef={reflectionRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Biggest Win</td><td style={S.td0}>[Team domain at 5/5 — working agreements and psychological safety are driving velocity and quality improvements]</td></tr>
        <tr><td style={S.tdLabelAlt}>Biggest Gap</td><td style={S.tdAlt}>[Measurement and Uncertainty both at 3/5 — need to formalize value realization tracking and assumption stress testing]</td></tr>
        <tr><td style={S.tdLabel}>Cross-Domain Pattern</td><td style={S.td0}>[Strong operational domains (Team, Delivery, Planning); weaker strategic domains (Measurement, Uncertainty) — need more forward-looking focus]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Learning</td><td style={S.tdAlt}>[Investing in team culture early paid dividends across all domains; same approach needed for measurement maturity]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ IMPROVEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Domain</th><th style={{ ...S.thSecondary, width: "10%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Formalize value realization measurement plan with post-delivery tracking]", dom: "Measurement", owner: "[PM + BA]", target: "[Week 9]" },
            { act: "[Implement monthly assumption stress test process]", dom: "Uncertainty", owner: "[PM]", target: "[Monthly]" },
            { act: "[Complete deployment automation for CI/CD pipeline]", dom: "Delivery", owner: "[Tech Lead]", target: "[Sprint 6]" },
            { act: "[Create knowledge management wiki for project decisions and lessons]", dom: "Project Work", owner: "[BA]", target: "[Week 10]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.dom}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#ECFDF5", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section G: Improvement & Proof • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderScorecard()}{renderReflection()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderScorecard()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><RefreshCw size={11} /> Domain Retro</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><RefreshCw size={20} className="text-emerald-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Domain Retrospective</h2><p className="text-xs font-medium text-emerald-600">Section G: Improvement & Proof</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Review performance across all 8 PMBOK 7 Performance Domains and drive targeted improvements.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DomainRetroPage() {
  return (<ThemeProvider><DomainRetroContent /></ThemeProvider>);
}
