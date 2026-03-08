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

function StakeholderDomainHealthCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const frictionRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⭐ STAKEHOLDER DOMAIN HEALTH CHECK</td></tr>
      <tr><td style={{ backgroundColor: "#991B1B", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Performance Domain 1 of 8</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Power/interest snapshot, sentiment, alignment risks, engagement actions, and top friction points.</strong> Use weekly to prevent stakeholder surprises and ensure engagement stays proactive.<br /><br /><strong style={{ fontStyle: "italic" }}>⭐ ALL-STAR PAGE:</strong> Prevents “surprise stakeholder blowups.”</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Check Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Week #</td><td style={S.tdAlt}>[Week X of Y]</td><td style={S.tdLabelAlt}>Overall Domain Health</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>🟢 Healthy</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>📊 HEALTH INDICATORS</div>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#DC2626" }}>Indicator</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#DC2626", width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#DC2626" }}>Evidence / Signal</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#DC2626", width: "8%", textAlign: "center" as const }}>Trend</th>
        </tr></thead>
        <tbody>
          {[
            { ind: "Sponsor engagement level", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Sponsor attended last 3 steering meetings; actively championing project]", trend: "→" },
            { ind: "Key stakeholder alignment", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[CFO has concerns about ROI timeline; VP Ops hasn’t responded to last 2 updates]", trend: "↘" },
            { ind: "Stakeholder satisfaction", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[4.3/5 avg satisfaction from last pulse survey]", trend: "↗" },
            { ind: "Communication effectiveness", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Status reports read by 85% of recipients; questions decreasing]", trend: "→" },
            { ind: "Expectation management", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[No surprises in last steering; demo feedback aligned with delivery plan]", trend: "→" },
            { ind: "Resistance / opposition", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[Sales Ops team expressing concern about process changes; need champion activation]", trend: "↗" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.ind}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ev}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = Healthy &nbsp;|&nbsp; 🟡 = Watch &nbsp;|&nbsp; 🔴 = Needs Intervention &nbsp;|&nbsp; Trend: ↗ Improving → Stable ↘ Declining</p>
    </div>
  );

  const renderMap = () => (
    <div ref={mapRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#991B1B")}>👥 POWER / INTEREST SNAPSHOT</div>
      <CopyButton targetRef={mapRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Stakeholder</th>
          <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Power</th>
          <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Interest</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Sentiment</th>
          <th style={S.thSecondary}>Current Strategy</th>
        </tr></thead>
        <tbody>
          {[
            { s: "[VP Sales — Sponsor]", power: "High", interest: "High", sent: "🟢 Positive", seBg: C.badgeGreenBg, seFg: C.badgeGreenFg, strat: "[Manage closely — bi-weekly 1:1; demo invites; decision escalation path]" },
            { s: "[CFO]", power: "High", interest: "Med", sent: "🟡 Neutral", seBg: C.badgeAmberBg, seFg: C.badgeAmberFg, strat: "[Keep satisfied — ROI update monthly; cost dashboard access; no surprises on budget]" },
            { s: "[VP Operations]", power: "High", interest: "Low", sent: "🟡 Disengaged", seBg: C.badgeAmberBg, seFg: C.badgeAmberFg, strat: "[Re-engage — schedule 1:1 to understand concerns; show operational benefits]" },
            { s: "[Sales Ops Director]", power: "Med", interest: "High", sent: "🟡 Cautious", seBg: C.badgeAmberBg, seFg: C.badgeAmberFg, strat: "[Consult — involve in sprint demos; address process change fears directly]" },
            { s: "[IT Security Lead]", power: "Med", interest: "Med", sent: "🟢 Supportive", seBg: C.badgeGreenBg, seFg: C.badgeGreenFg, strat: "[Keep informed — security review invites; compliance checklist shared]" },
            { s: "[Sales Team Champions]", power: "Low", interest: "High", sent: "🟢 Enthusiastic", seBg: C.badgeGreenBg, seFg: C.badgeGreenFg, strat: "[Empower — early access; feedback channel; public recognition for adoption help]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.s}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.power}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.interest}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.seBg, r.seFg)}>{r.sent}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.strat}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFriction = () => (
    <div ref={frictionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>⚠️ TOP FRICTION POINTS</div>
      <CopyButton targetRef={frictionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Friction Point</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Risk</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Mitigation Action</th>
        </tr></thead>
        <tbody>
          {[
            { fp: "[VP Ops disengagement — hasn’t responded to last 2 updates; may surface opposition late]", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, mit: "[PM to schedule direct 1:1 this week; prepare operational benefits summary]" },
            { fp: "[Sales Ops team anxiety about process changes — resistance building in informal conversations]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, mit: "[Activate Sales team champions; include Sales Ops in next sprint demo; address concerns in Q&A session]" },
            { fp: "[CFO wants ROI evidence earlier than planned — may reduce support if not satisfied]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, mit: "[Prepare interim ROI dashboard with leading indicators; schedule CFO briefing]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#DC2626" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mit}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#991B1B")}>⚡ STAKEHOLDER ACTIONS THIS WEEK</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "8%" }}>Due</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { act: "[Schedule 1:1 with VP Ops to understand concerns and re-engage]", owner: "[PM]", due: "[Thu]", done: "⬜" },
            { act: "[Prepare interim ROI dashboard for CFO briefing]", owner: "[PM + BA]", due: "[Fri]", done: "⬜" },
            { act: "[Activate champion network for Sales Ops team concerns]", owner: "[Change Lead]", due: "[Wed]", done: "⬜" },
            { act: "[Send bi-weekly status update to all stakeholders]", owner: "[PM]", due: "[Fri]", done: "⬜" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#DC2626" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.due}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: "#DC2626", color: "#FEF2F2", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Domain Health Check 1/8 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderMap()}{renderFriction()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderActions()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">⭐ All-Star</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Compass size={20} className="text-red-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Domain Health Check</h2><p className="text-xs font-medium text-red-600">Performance Domain 1/8 • ⭐ All-Star</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Power/interest snapshot, sentiment, alignment risks, engagement actions, and top friction points.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderDomainHealthCheckPage() {
  return (<ThemeProvider><StakeholderDomainHealthCheckContent /></ThemeProvider>);
}
