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

function PrincipleTeamContent() {
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
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>👥 PRINCIPLE 2: TEAM</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Principle Practice Page</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>“Create a collaborative project team environment.”</strong> High-performing teams are built on trust, collaboration, empowerment, and psychological safety. This practice page helps you assess and cultivate team-oriented behaviors.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Assessment Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Assessed By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Current Score</td><td style={S.tdAlt}><span style={S.badge("#DDD6FE", accentDark)}>[5/5 — Exemplary]</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderCheck = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ TEAM BEHAVIOR CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "5%", textAlign: "center" as const }}>✔</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Behavior / Practice</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { b: "Team has explicit working agreements that are reviewed regularly", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { b: "Psychological safety is present — team members speak up without fear", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { b: "Team members are empowered to make decisions within their scope", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { b: "Collaboration is active — pair work, knowledge sharing, cross-training happening", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { b: "Conflicts are addressed constructively and promptly", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { b: "Team retrospectives lead to actual process improvements", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { b: "Individual strengths are recognized and leveraged", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { b: "Team celebrates wins and acknowledges contributions", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.b}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>Doing</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEvidence = () => (
    <div ref={evidenceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 EVIDENCE &amp; EXAMPLES</td></tr></tbody></table>
      <CopyButton targetRef={evidenceRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Collaboration Evidence</td><td style={S.td0}>[Pair programming sessions happening 2x/week; cross-training on data migration started]</td></tr>
        <tr><td style={S.tdLabelAlt}>Psychological Safety</td><td style={S.tdAlt}>[Junior devs asking questions openly in standups; team members challenging assumptions respectfully]</td></tr>
        <tr><td style={S.tdLabel}>Working Agreements</td><td style={S.td0}>[Reviewed at every retro; 2 agreements modified based on team feedback this sprint]</td></tr>
        <tr><td style={S.tdLabelAlt}>Retro Improvements</td><td style={S.tdAlt}>[3 of 4 retro action items from last sprint completed; focus blocks implemented successfully]</td></tr>
        <tr><td style={S.tdLabel}>Areas for Improvement</td><td style={S.td0}>[Continue building cross-functional skills; ensure remote team members feel equally included]</td></tr>
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
            { act: "[Ensure remote team members have equal voice in meetings; rotate facilitator role]", owner: "[PM]", target: "[Next sprint]" },
            { act: "[Schedule team-building activity focused on cross-functional collaboration]", owner: "[PM]", target: "[Week 9]" },
            { act: "[Create skills matrix to identify and plan cross-training opportunities]", owner: "[Tech Lead]", target: "[Week 8]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F5F3FF", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Principle 2 of 12 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderEvidence()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Compass size={11} /> Principle 2/12</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Compass size={20} className="text-violet-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Principle: Team</h2><p className="text-xs font-medium text-violet-600">Principle 2/12</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Create a collaborative project team environment built on trust, empowerment, and psychological safety.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PrincipleTeamPage() {
  return (<ThemeProvider><PrincipleTeamContent /></ThemeProvider>);
}
