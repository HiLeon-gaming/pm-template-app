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
  { id: "full", label: "Full Trigger Map", desc: "Triggers + responses + escalation", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Trigger table only", icon: AlignJustify },
];

function ContingencyTriggersContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<HTMLDivElement>(null);
  const escalationRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706"; const accentDark = "#B45309";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #DC2626", textAlign: "center" as const }}>🚨 CONTINGENCY TRIGGERS MAP</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Uncertainty & Complexity</td></tr>
      <tr><td style={descStyle}>Define the specific conditions that activate contingency plans. When trigger conditions are met, the pre-defined response kicks in automatically — no debate, no delay. This eliminates decision paralysis during crises.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date Created</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Last Reviewed</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Active Triggers</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>6 defined | 1 watching | 0 activated</span></td><td style={S.tdLabel}>Next Review</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderTriggers = () => (
    <div ref={triggersRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 CONTINGENCY TRIGGER REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={triggersRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "15%" }}>Risk / Event</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "20%" }}>Trigger Condition</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Pre-Defined Response</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Owner</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { r: "Vendor API Delay", tc: "No delivery confirmation by Sprint 5 Day 5", resp: "Activate phased rollout with mock integrations; escalate to vendor CTO; notify sponsor", own: "[PM]", s: "Watching", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { r: "Key Person Loss", tc: "Any core team member unavailable for > 5 days", resp: "Activate cross-trained backup; re-prioritize sprint backlog; inform sponsor within 24h", own: "[PM]", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { r: "Budget Overrun", tc: "CPI drops below 0.90 for 2 consecutive periods", resp: "Freeze non-critical scope; review contractor usage; present options paper to sponsor", own: "[PM]", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { r: "Schedule Slip", tc: "SPI drops below 0.85 or critical path delayed > 1 week", resp: "Activate fast-tracking options; request additional resources; update steering committee", own: "[PM]", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { r: "Adoption Failure", tc: "User adoption < 50% at 30 days post-launch", resp: "Intensify training; deploy change champions; conduct stakeholder listening sessions", own: "[Change Lead]", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { r: "Data Quality Issue", tc: "Migration validation error rate > 5%", resp: "Pause migration; root cause analysis; data cleansing sprint; re-validate before proceeding", own: "[Tech Lead]", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.r}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.tc}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.resp}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escalationRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📢 ESCALATION PROTOCOL</td></tr></tbody></table>
      <CopyButton targetRef={escalationRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Level 1: PM Action</td><td style={S.td0}>[PM activates pre-defined response within 4 hours of trigger; notifies team; documents in risk log]</td></tr>
        <tr><td style={S.tdLabelAlt}>Level 2: Sponsor Alert</td><td style={S.tdAlt}>[If response insufficient within 48 hours, escalate to sponsor with impact assessment and options]</td></tr>
        <tr><td style={S.tdLabel}>Level 3: Steering Committee</td><td style={S.td0}>[If budget/schedule impact &gt; 15% or scope reduction required, escalate to steering for decision]</td></tr>
        <tr><td style={S.tdLabelAlt}>Communication Protocol</td><td style={S.tdAlt}>[Trigger activation → email to sponsor + team lead within 4h | Status updates every 24h until resolved]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Monitor vendor API trigger daily — watch for Sprint 5 Day 5 deadline]", owner: "[PM]", target: "[Daily]" },
            { act: "[Validate all contingency responses are still viable and resources available]", owner: "[PM]", target: "[Monthly]" },
            { act: "[Conduct trigger drill with team — simulate trigger #2 (key person loss) to test response readiness]", owner: "[PM]", target: "[Week 10]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FFFBEB", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section F: Uncertainty & Complexity • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderTriggers()}{renderEscalation()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderTriggers()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><AlertTriangle size={11} /> Contingency</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><AlertTriangle size={20} className="text-amber-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Contingency Triggers Map</h2><p className="text-xs font-medium text-amber-600">Section F: Uncertainty & Complexity</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Pre-define trigger conditions and automatic responses to eliminate decision paralysis during crises.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ContingencyTriggersPage() {
  return (<ThemeProvider><ContingencyTriggersContent /></ThemeProvider>);
}
