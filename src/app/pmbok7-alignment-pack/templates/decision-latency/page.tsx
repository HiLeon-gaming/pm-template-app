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
  { id: "full", label: "Full Tracker", desc: "Decisions + analysis + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decision table only", icon: AlignJustify },
];

function DecisionLatencyContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706"; const accentDark = "#B45309";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #DC2626", textAlign: "center" as const }}>⏱️ DECISION LATENCY TRACKER</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Uncertainty &amp; Complexity</td></tr>
      <tr><td style={descStyle}>Slow decisions kill projects silently. This tracker makes decision delays visible by measuring the time between when a decision is needed and when it’s made. It also tracks the cost of delay and identifies systemic bottlenecks.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Review Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Tracked By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Avg Decision Time</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>4.2 days (target: ≤ 3 days)</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 DECISION LATENCY LOG</div>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Decision Needed</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "9%" }}>Raised</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "9%" }}>Decided</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "7%" }}>Latency</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Decision Maker</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Cost of Delay</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "7%" }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { d: "Approve vendor selection for data migration tool", raised: "01/15", decided: "01/17", lat: "2 days", dm: "[Sponsor]", cod: "Low", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Decided" },
            { d: "Go/no-go on SSO integration vs basic auth", raised: "01/20", decided: "01/28", lat: "8 days", dm: "[IT Director]", cod: "High — blocked Sprint 4", s: "🔴", sBg: C.badgeRedBg, sFg: C.badgeRedFg, st: "Decided" },
            { d: "Approve additional QA resource for Sprint 5-6", raised: "02/01", decided: "02/04", lat: "3 days", dm: "[Sponsor]", cod: "Medium", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, st: "Decided" },
            { d: "Choose between phased vs big-bang rollout for EMEA", raised: "02/05", decided: "02/10", lat: "5 days", dm: "[VP Sales]", cod: "Medium — planning delayed", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "Decided" },
            { d: "Approve scope reduction for Sprint 6 to protect timeline", raised: "02/12", decided: "—", lat: "5+ days", dm: "[Sponsor]", cod: "High — blocking Sprint 6 planning", s: "🔴", sBg: C.badgeRedBg, sFg: C.badgeRedFg, st: "Pending" },
            { d: "Finalize data retention policy for migrated records", raised: "02/14", decided: "—", lat: "3+ days", dm: "[Legal + IT]", cod: "Medium", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, st: "Pending" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.d}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.raised}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.decided}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, textAlign: "center" as const }}>{r.lat}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.dm}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.cod}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.st}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 LATENCY ANALYSIS</div>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Average Latency</td><td style={S.td0}>[4.2 days across 6 decisions; target is ≤ 3 days; trending above target]</td></tr>
        <tr><td style={S.tdLabelAlt}>Worst Case</td><td style={S.tdAlt}>[Decision #2 (SSO): 8 days — blocked an entire sprint; root cause: IT Director travel + unclear escalation path]</td></tr>
        <tr><td style={S.tdLabel}>Bottleneck Pattern</td><td style={S.td0}>[Decisions requiring IT Director or cross-functional sign-off take 2-3x longer than sponsor decisions]</td></tr>
        <tr><td style={S.tdLabelAlt}>Total Cost of Delay</td><td style={S.tdAlt}>[Estimated 1.5 sprints of productivity lost to decision delays; ~$25K in team idle time and rework]</td></tr>
        <tr><td style={S.tdLabel}>Improvement Opportunity</td><td style={S.td0}>[Pre-brief decision makers; set decision deadlines with escalation; delegate lower-impact decisions to PM]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚡ ACTIONS TO REDUCE LATENCY</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Escalate pending decision #5 (scope reduction) to sponsor — provide options paper with recommendation]", owner: "[PM]", target: "[Today]" },
            { act: "[Establish decision SLA: 3 business days max; auto-escalation if breached]", owner: "[PM + Sponsor]", target: "[Week 8]" },
            { act: "[Pre-brief IT Director on upcoming decisions to reduce latency for cross-functional items]", owner: "[PM]", target: "[Weekly]" },
            { act: "[Delegate decisions under $5K impact to PM level — get sponsor agreement on delegation threshold]", owner: "[PM + Sponsor]", target: "[Next 1:1]" },
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

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderDecisions()}{renderAnalysis()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderDecisions()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><AlertTriangle size={11} /> Decision Latency</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><AlertTriangle size={20} className="text-amber-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Decision Latency Tracker</h2><p className="text-xs font-medium text-amber-600">Section F: Uncertainty &amp; Complexity</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Make decision delays visible, measure their cost, and eliminate systemic bottlenecks.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionLatencyPage() {
  return (<ThemeProvider><DecisionLatencyContent /></ThemeProvider>);
}
