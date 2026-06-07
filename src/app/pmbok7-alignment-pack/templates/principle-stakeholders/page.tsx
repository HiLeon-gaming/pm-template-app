"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Practice Page", desc: "Behaviors + evidence + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Checklist only", icon: AlignJustify },
];

function PrincipleStakeholdersContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const evidenceRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED"; const accentDark = "#5B21B6";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🤝 PRINCIPLE 3: STAKEHOLDERS</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Principle Practice Page</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>“Effectively engage with stakeholders.”</strong> Stakeholder engagement is proactive, not reactive. Understand their needs, manage expectations, build trust, and address resistance before it becomes opposition.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Assessment Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Assessed By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Current Score</td><td style={S.tdAlt}><span style={S.badge("#DDD6FE", accentDark)}>[4/5 — Strong]</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderCheck = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ STAKEHOLDER BEHAVIOR CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thPrimary, backgroundColor: accent, width: "5%", textAlign: "center" as const }}>✔</th><th style={{ ...S.thPrimary, backgroundColor: accent }}>Behavior / Practice</th><th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th></tr></thead>
        <tbody>
          {[
            { b: "Stakeholder register is maintained and current", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Power/interest mapping is reviewed regularly", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Engagement strategies are tailored to each key stakeholder", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Stakeholder sentiment is tracked and acted upon", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Communications match stakeholder preferences and needs", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Resistance is identified early and addressed proactively", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "Improve" },
            { b: "Stakeholders are involved in key decisions and reviews", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Expectations are managed through transparent, honest communication", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.b}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.st}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEvidence = () => (
    <div ref={evidenceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 EVIDENCE & EXAMPLES</td></tr></tbody></table>
      <CopyButton targetRef={evidenceRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Engagement Evidence</td><td style={S.td0}>[Bi-weekly sponsor 1:1s; sprint demos with stakeholders; pulse surveys active]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sentiment Tracking</td><td style={S.tdAlt}>[4.3/5 avg satisfaction; VP Ops disengagement detected early via domain health check]</td></tr>
        <tr><td style={S.tdLabel}>Expectation Management</td><td style={S.td0}>[Schedule risk communicated 3 weeks before impact; no surprises at last steering meeting]</td></tr>
        <tr><td style={S.tdLabelAlt}>Resistance Management</td><td style={S.tdAlt}>[Sales Ops resistance identified; champion activation in progress; needs more proactive early detection]</td></tr>
        <tr><td style={S.tdLabel}>Areas for Improvement</td><td style={S.td0}>[Build earlier resistance detection mechanisms; formalize stakeholder feedback loops]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ IMPROVEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Implement monthly stakeholder pulse survey for early resistance detection]", owner: "[PM]", target: "[Next month]" },
            { act: "[Create stakeholder feedback loop process — collect, analyze, respond cycle]", owner: "[PM + BA]", target: "[Week 9]" },
            { act: "[Build champion activation playbook for future resistance scenarios]", owner: "[Change Lead]", target: "[Week 10]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F5F3FF", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Principle 3 of 12 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderEvidence()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Compass size={11} /> Principle 3/12</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Compass size={20} className="text-violet-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Principle: Stakeholders</h2><p className="text-xs font-medium text-violet-600">Principle 3/12</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Effectively engage with stakeholders — proactive engagement, expectation management, and resistance handling.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PrincipleStakeholdersPage() {
  return (<ThemeProvider><PrincipleStakeholdersContent /></ThemeProvider>);
}
