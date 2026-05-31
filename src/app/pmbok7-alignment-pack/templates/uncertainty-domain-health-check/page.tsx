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
  { id: "full", label: "Full Health Check", desc: "All assessments + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Health indicators only", icon: AlignJustify },
];

function UncertaintyDomainHealthCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const ambiguityRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#DC2626"; const accentDark = "#991B1B";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🌪️ UNCERTAINTY DOMAIN HEALTH CHECK</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Performance Domain 8 of 8</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Risk register health, ambiguity level, assumption validity, emerging threats, and response readiness.</strong> Uncertainty is inevitable — what matters is how well you detect, assess, and respond to it. This check ensures your risk management is proactive, not reactive.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Check Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Week #</td><td style={S.tdAlt}>[Week X of Y]</td><td style={S.tdLabelAlt}>Overall Domain Health</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>🟡 Watch</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 HEALTH INDICATORS</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Indicator</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Evidence / Signal</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Trend</th>
        </tr></thead>
        <tbody>
          {[
            { ind: "Risk register currency", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Updated weekly; 14 active risks; 3 closed this sprint; owners assigned]", trend: "→" },
            { ind: "Risk response effectiveness", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[2 risks triggered responses this sprint; both contained within tolerance]", trend: "→" },
            { ind: "Assumption validity", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[2 of 8 assumptions under stress; vendor timeline assumption at risk]", trend: "↘" },
            { ind: "Ambiguity / unknowns level", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[Phase 2 requirements still have 20% ambiguity; needs discovery sessions]", trend: "→" },
            { ind: "Contingency reserves adequate", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Schedule reserve: 2 weeks remaining; Budget reserve: $18K of $25K remaining]", trend: "→" },
            { ind: "Emerging threats identified", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[New threat: regulatory change may affect data handling; monitoring closely]", trend: "↘" },
            { ind: "Team risk awareness", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Weekly risk review attended by full team; risks raised proactively in standups]", trend: "↗" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.ind}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ev}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td></tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = Healthy &nbsp;|&nbsp; 🟡 = Watch &nbsp;|&nbsp; 🔴 = Needs Intervention &nbsp;|&nbsp; Trend: ↗ Improving → Stable ↘ Declining</p>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🚨 TOP RISKS THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Risk</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>P × I</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Response</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[Vendor API delivery delayed beyond Sprint 5 — critical path impact]", pi: "H × H", s: "Active", sBg: C.badgeRedBg, sFg: C.badgeRedFg, resp: "[Mitigate: mock API in place; escalated to vendor PM; contingency plan for 2-week delay]" },
            { risk: "[Regulatory change may require additional data encryption — scope increase]", pi: "M × H", s: "New", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, resp: "[Monitor: tracking regulatory timeline; impact assessment scheduled for this week]" },
            { risk: "[QA bottleneck may delay Sprint 5 acceptance testing]", pi: "M × M", s: "Active", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, resp: "[Mitigate: QA augmentation requested; developers increasing unit test coverage]" },
            { risk: "[Key stakeholder disengagement may lead to late-stage resistance]", pi: "M × M", s: "Active", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, resp: "[Mitigate: PM scheduling direct 1:1; champion activation for Sales Ops team]" },
            { risk: "[Data migration complexity underestimated — may need additional sprint]", pi: "L × H", s: "Watch", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, resp: "[Accept: staging tests 80% complete; will reassess after full dry run in Week 10]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.pi}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.resp}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAmbiguity = () => (
    <div ref={ambiguityRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>❓ AMBIGUITY &amp; UNKNOWNS</td></tr></tbody></table>
      <CopyButton targetRef={ambiguityRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Requirements Ambiguity</td><td style={S.td0}>[20% of Phase 2 requirements still ambiguous] — <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Needs Discovery</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Technical Unknowns</td><td style={S.tdAlt}>[SSO integration approach TBD; waiting on IT Security guidance]</td></tr>
        <tr><td style={S.tdLabel}>Organizational Unknowns</td><td style={S.td0}>[Potential org restructure in Q3 may affect project sponsorship]</td></tr>
        <tr><td style={S.tdLabelAlt}>External Unknowns</td><td style={S.tdAlt}>[Regulatory change timeline unclear; may or may not affect this project]</td></tr>
        <tr><td style={S.tdLabel}>Resolution Approach</td><td style={S.td0}>[Schedule Phase 2 discovery sessions; prototype SSO integration; maintain sponsor relationship with backup contacts]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ UNCERTAINTY ACTIONS THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "8%" }}>Due</th><th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Done?</th></tr></thead>
        <tbody>
          {[
            { act: "[Complete regulatory change impact assessment — determine if project is affected]", owner: "[BA + Legal]", due: "[Thu]", done: "⬜" },
            { act: "[Run assumption stress test on top 3 at-risk assumptions]", owner: "[PM]", due: "[Fri]", done: "⬜" },
            { act: "[Schedule Phase 2 discovery sessions to reduce requirements ambiguity]", owner: "[BA]", due: "[Wed]", done: "⬜" },
            { act: "[Update contingency trigger thresholds based on Sprint 4 actuals]", owner: "[PM]", due: "[Fri]", done: "⬜" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.due}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FEF2F2", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Domain Health Check 8/8 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderRisks()}{renderAmbiguity()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderActions()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Compass size={11} /> Domain 8/8</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Compass size={20} className="text-red-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Uncertainty Domain Health Check</h2><p className="text-xs font-medium text-red-600">Performance Domain 8/8</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Risk register health, ambiguity level, assumption validity, emerging threats, and response readiness.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function UncertaintyDomainHealthCheckPage() {
  return (<ThemeProvider><UncertaintyDomainHealthCheckContent /></ThemeProvider>);
}
