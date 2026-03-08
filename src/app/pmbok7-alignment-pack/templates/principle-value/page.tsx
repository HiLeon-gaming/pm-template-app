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

function PrincipleValueContent() {
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
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>💰 PRINCIPLE 4: VALUE</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Principle Practice Page</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>“Focus on value.”</strong> Projects exist to deliver value — not just outputs. Continuously evaluate whether the project is delivering outcomes that matter to the organization and its stakeholders.</td></tr>
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
      <div style={S.sectionBanner(accent)}>✅ VALUE BEHAVIOR CHECKLIST</div>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thPrimary, backgroundColor: accent, width: "5%", textAlign: "center" as const }}>✔</th><th style={{ ...S.thPrimary, backgroundColor: accent }}>Behavior / Practice</th><th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th></tr></thead>
        <tbody>
          {[
            { b: "Business case / value proposition is clear and current", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Value metrics (leading and lagging) are defined and tracked", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Deliverables are prioritized by value, not just effort or sequence", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Early value delivery is built into the delivery approach", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Value realization is tracked post-delivery, not just at closure", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "Improve" },
            { b: "Low-value work is identified and eliminated or deprioritized", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "Stakeholders agree on what “value” means for this project", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Doing" },
            { b: "The project can be stopped if it no longer delivers sufficient value", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "Improve" },
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
      <div style={S.sectionBanner(accentDark)}>📋 EVIDENCE &amp; EXAMPLES</div>
      <CopyButton targetRef={evidenceRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Early Value Delivered</td><td style={S.td0}>[Pipeline dashboard live in Sprint 3; sales team using daily; 85% adoption rate]</td></tr>
        <tr><td style={S.tdLabelAlt}>Value Prioritization</td><td style={S.tdAlt}>[Backlog ordered by business value score; highest-value features delivered first]</td></tr>
        <tr><td style={S.tdLabel}>Value Metrics</td><td style={S.td0}>[ROI tracking initiated; leading indicators: user adoption, time savings; lagging: revenue impact]</td></tr>
        <tr><td style={S.tdLabelAlt}>Post-Delivery Tracking</td><td style={S.tdAlt}>[Need to formalize post-delivery value realization tracking; currently informal]</td></tr>
        <tr><td style={S.tdLabel}>Areas for Improvement</td><td style={S.td0}>[Formalize value realization plan; establish kill criteria for the project]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚡ IMPROVEMENT ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Create formal value realization plan with post-delivery measurement cadence]", owner: "[PM + BA]", target: "[Week 9]" },
            { act: "[Define project kill criteria with sponsor — when should we stop?]", owner: "[PM + Sponsor]", target: "[Week 8]" },
            { act: "[Add value realization metrics to steering committee dashboard]", owner: "[PM]", target: "[Next mtg]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F5F3FF", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Principle 4 of 12 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderEvidence()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Compass size={11} /> Principle 4/12</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Compass size={20} className="text-violet-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Principle: Value</h2><p className="text-xs font-medium text-violet-600">Principle 4/12</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Focus on value — deliver outcomes that matter, not just outputs.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PrincipleValuePage() {
  return (<ThemeProvider><PrincipleValueContent /></ThemeProvider>);
}
