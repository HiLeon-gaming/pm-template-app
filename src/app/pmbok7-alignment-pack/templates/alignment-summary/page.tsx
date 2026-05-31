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
  { id: "full", label: "Full Summary", desc: "All sections + evidence", icon: LayoutDashboard },
  { id: "compact", label: "Executive View", desc: "Scorecard only", icon: AlignJustify },
];

function AlignmentSummaryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const evidenceRef = useRef<HTMLDivElement>(null);
  const verdictRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📊 PMBOK® 7 ALIGNMENT SUMMARY</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Improvement &amp; Proof &nbsp;|&nbsp; ⭐ All-Star</td></tr>
      <tr><td style={descStyle}>The single-page executive summary of your project’s alignment to PMBOK 7. Combines Principle scores, Domain health scores, and overall alignment into one view for sponsors, steering committees, and PMO audits.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Summary Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Overall Alignment</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>🟢 82% — Strong Alignment</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderPrinciples = () => (
    <div ref={principlesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 12 PRINCIPLES ALIGNMENT</td></tr></tbody></table>
      <CopyButton targetRef={principlesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "18%" }}>Principle</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Key Evidence</th>
        </tr></thead>
        <tbody>
          {[
            { n: 1, p: "Stewardship", sc: "4/5", e: "[Budget transparency; ethical decision-making; resource accountability]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 2, p: "Team", sc: "5/5", e: "[Working agreements; psychological safety; retro improvements implemented]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 3, p: "Stakeholders", sc: "4/5", e: "[Engagement plan active; pulse surveys; resistance management improving]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 4, p: "Value", sc: "4/5", e: "[Early value delivered Sprint 3; value metrics defined; realization tracking started]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 5, p: "Systems Thinking", sc: "3/5", e: "[Strategic alignment confirmed; dependency management needs improvement]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { n: 6, p: "Leadership", sc: "4/5", e: "[Servant leadership practiced; influence without authority demonstrated]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 7, p: "Tailoring", sc: "5/5", e: "[8 documented decisions with rationale; outcomes reviewed; team understands why]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 8, p: "Quality", sc: "4/5", e: "[DoD enforced; test automation at 82%; defect escape rate declining]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 9, p: "Complexity", sc: "3/5", e: "[Drivers identified; proportional responses need work; iterative approach helping]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { n: 10, p: "Risk", sc: "4/5", e: "[14 active risks; weekly reviews; contingency triggers defined; opportunities need focus]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 11, p: "Adaptability", sc: "4/5", e: "[Mock API workaround; pair programming coverage; cross-training started]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: 12, p: "Change", sc: "3/5", e: "[Change plan exists; champion network expanding; adoption tracking improving]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{r.n}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.p}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.sc}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.e}</td></tr>);
          })}
          <tr><td colSpan={2} style={{ ...S.tdLabel, fontWeight: 800 }}>PRINCIPLES AVERAGE</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px" }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>3.9/5</span></td><td style={{ ...S.td0, fontSize: "10px", fontStyle: "italic" }}>Strong: 10 of 12 principles at 4+ | Focus areas: Systems Thinking, Complexity, Change</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderDomains = () => (
    <div ref={domainsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🏥 8 DOMAIN HEALTH SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={domainsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "22%" }}>Domain</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Trend</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Summary</th>
        </tr></thead>
        <tbody>
          {[
            { d: "Stakeholder", h: "🟢", tr: "↑", s: "[Engagement active; satisfaction 4.3/5; resistance management improving]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Team", h: "🟢", tr: "↑", s: "[High-performing; psychological safety strong; velocity improving]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Dev Approach", h: "🟢", tr: "→", s: "[Hybrid approach effective; sprint cadence stable; integration planning improving]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Planning", h: "🟢", tr: "↑", s: "[Rolling wave working; backlog well-groomed; estimates improving]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Project Work", h: "🟢", tr: "→", s: "[Processes smooth; blockers resolved quickly; knowledge management needs work]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Delivery", h: "🟢", tr: "↑", s: "[On-time; quality gates enforced; deployment automation in progress]", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { d: "Measurement", h: "🟡", tr: "↑", s: "[Dashboard active; leading indicators tracked; value realization needs formalization]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { d: "Uncertainty", h: "🟡", tr: "→", s: "[Risk register active; contingency triggers defined; assumption testing needs regularity]", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.d}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.h}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "14px", textAlign: "center" as const }}>{r.tr}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.s}</td></tr>);
          })}
          <tr><td style={{ ...S.tdLabel, fontWeight: 800 }}>DOMAINS HEALTH</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800 }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>6/8 Green</span></td><td colSpan={2} style={{ ...S.td0, fontSize: "10px", fontStyle: "italic" }}>6 domains healthy; 2 domains (Measurement, Uncertainty) improving but need continued focus</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderEvidence = () => (
    <div ref={evidenceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 ALIGNMENT EVIDENCE SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={evidenceRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Artifacts Produced</td><td style={S.td0}>[41 PMBOK 7 alignment artifacts completed; all sections A-G documented]</td></tr>
        <tr><td style={S.tdLabelAlt}>Tailoring Documented</td><td style={S.tdAlt}>[8 tailoring decisions with rationale; Tailoring Strategy and Log maintained]</td></tr>
        <tr><td style={S.tdLabel}>Principles in Practice</td><td style={S.td0}>[12 principle practice pages completed with evidence; 10 of 12 scored 4+]</td></tr>
        <tr><td style={S.tdLabelAlt}>Domain Health Tracked</td><td style={S.tdAlt}>[8 domain health checks completed; reviewed at sprint and phase gate cadence]</td></tr>
        <tr><td style={S.tdLabel}>Continuous Improvement</td><td style={S.td0}>[Domain Retro completed; Principle Lessons captured; 15 improvement actions tracked]</td></tr>
      </tbody></table>
    </div>
  );

  const renderVerdict = () => (
    <div ref={verdictRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>✅ ALIGNMENT VERDICT</td></tr></tbody></table>
      <CopyButton targetRef={verdictRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Overall Alignment</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>🟢 82% — Strong Alignment to PMBOK® 7</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Strengths</td><td style={S.tdAlt}>[Team culture, Tailoring rigor, Value focus, Quality mindset, Stakeholder engagement]</td></tr>
        <tr><td style={S.tdLabel}>Growth Areas</td><td style={S.td0}>[Systems thinking maturity, Complexity navigation, Change management depth, Value realization measurement]</td></tr>
        <tr><td style={S.tdLabelAlt}>PMO Readiness</td><td style={S.tdAlt}>[Audit-ready: All artifacts documented; tailoring rationale captured; improvement actions tracked with owners and dates]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#ECFDF5", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section G: Improvement &amp; Proof • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderPrinciples()}{renderDomains()}{renderEvidence()}{renderVerdict()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderPrinciples()}{renderDomains()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><RefreshCw size={11} /> Alignment</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><RefreshCw size={20} className="text-emerald-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">PMBOK 7 Alignment Summary</h2><p className="text-xs font-medium text-emerald-600">Section G: Improvement &amp; Proof • ⭐ All-Star</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Single-page executive summary of project alignment to PMBOK 7 Principles and Performance Domains.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AlignmentSummaryPage() {
  return (<ThemeProvider><AlignmentSummaryContent /></ThemeProvider>);
}
