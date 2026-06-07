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

function PrincipleRiskContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const evidenceRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const accent = "#7C3AED"; const accentDark = "#5B21B6";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const behaviors = [
    { b: "Risk register is actively maintained with owners, responses, and triggers", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
    { b: "Risks are identified proactively, not just reactively when they materialize", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
    { b: "Both threats and opportunities are managed", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "Improve" },
    { b: "Risk responses are proportional to probability and impact", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
    { b: "Contingency reserves (schedule and budget) are adequate and monitored", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
    { b: "The team contributes to risk identification, not just the PM", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
    { b: "Assumptions are tracked and stress-tested regularly", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "Improve" },
    { b: "Risk appetite and tolerance are understood and communicated", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
  ];

  const renderAll = () => {
    const titleBanner = (<table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⚠️ PRINCIPLE 10: RISK</td></tr><tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Principle Practice Page</td></tr><tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>“Optimize risk responses.”</strong> Risk management is about maximizing positive outcomes while minimizing threats. It’s proactive, team-wide, and proportional — not a checkbox exercise.</td></tr></tbody></table>);
    const header = (<div ref={headerRef} style={{ marginBottom: "12px" }}><table style={S.tbl}><tbody><tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Assessment Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr><tr><td style={S.tdLabelAlt}>Assessed By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Current Score</td><td style={S.tdAlt}><span style={S.badge("#DDD6FE", accentDark)}>[4/5 — Strong]</span></td></tr></tbody></table><CopyButton targetRef={headerRef} label="Copy Section" /></div>);
    const check = (<div ref={checkRef} style={{ marginBottom: "12px" }}><table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ RISK BEHAVIOR CHECKLIST</td></tr></tbody></table><CopyButton targetRef={checkRef} label="Copy Section" /><table style={S.tbl}><thead><tr><th style={{ ...S.thPrimary, backgroundColor: accent, width: "5%", textAlign: "center" as const }}>✔</th><th style={{ ...S.thPrimary, backgroundColor: accent }}>Behavior / Practice</th><th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th></tr></thead><tbody>{behaviors.map((r, i) => { const bg = i % 2 === 1 ? C.rowAlt : C.white; return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.b}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.st}</span></td></tr>); })}</tbody></table></div>);
    const evidence = (<div ref={evidenceRef} style={{ marginBottom: "12px" }}><table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 EVIDENCE & EXAMPLES</td></tr></tbody></table><CopyButton targetRef={evidenceRef} label="Copy Section" /><table style={S.tbl}><tbody><tr><td style={{ ...S.tdLabel, width: "28%" }}>Proactive Identification</td><td style={S.td0}>[14 active risks; team raises risks in standups; weekly risk reviews attended by full team]</td></tr><tr><td style={S.tdLabelAlt}>Response Effectiveness</td><td style={S.tdAlt}>[2 risk responses triggered this sprint; both contained within tolerance; mock API workaround successful]</td></tr><tr><td style={S.tdLabel}>Opportunity Management</td><td style={S.td0}>[Focus has been on threats; need to actively identify and exploit positive risks / opportunities]</td></tr><tr><td style={S.tdLabelAlt}>Assumption Testing</td><td style={S.tdAlt}>[2 of 8 assumptions at risk; need formal stress-testing process; currently informal]</td></tr></tbody></table></div>);
    const actions = (<div ref={actionsRef} style={{ marginBottom: "12px" }}><table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ IMPROVEMENT ACTIONS</td></tr></tbody></table><CopyButton targetRef={actionsRef} label="Copy Section" /><table style={S.tbl}><thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead><tbody>{[{ act: "[Add “opportunities” section to risk register and actively identify positive risks]", owner: "[PM]", target: "[Week 8]" }, { act: "[Implement formal assumption stress-testing process (monthly)]", owner: "[PM]", target: "[Week 9]" }, { act: "[Review risk appetite with sponsor and document agreed tolerance levels]", owner: "[PM]", target: "[Next 1:1]" }].map((r, i) => { const bg = i % 2 === 1 ? C.rowAlt : C.white; return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>); })}</tbody></table></div>);
    const footer = (<table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F5F3FF", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Principle 10 of 12 • © 2026</td></tr></tbody></table>);
    if (layout === "compact") return <>{titleBanner}{header}{check}{footer}</>;
    return <>{titleBanner}{header}{check}{evidence}{actions}{footer}</>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Compass size={11} /> Principle 10/12</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Compass size={20} className="text-violet-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Principle: Risk</h2><p className="text-xs font-medium text-violet-600">Principle 10/12</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Optimize risk responses — proactive, team-wide, and proportional risk management.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{renderAll()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PrincipleRiskPage() {
  return (<ThemeProvider><PrincipleRiskContent /></ThemeProvider>);
}
