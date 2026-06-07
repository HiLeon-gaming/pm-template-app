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

function ProjectWorkDomainHealthCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const blockersRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#DC2626"; const accentDark = "#991B1B";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⚙️ PROJECT WORK DOMAIN HEALTH CHECK</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Performance Domain 5 of 8</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Execution velocity, blocker resolution, process efficiency, knowledge management, and team productivity.</strong> This check assesses whether day-to-day project work is running smoothly and efficiently.</td></tr>
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
            { ind: "Work execution velocity", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[34 story points delivered Sprint 4; consistent with 3-sprint average of 33]", trend: "→" },
            { ind: "Blocker resolution speed", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[2 blockers resolved within 24 hours this week; 0 blockers >48 hours old]", trend: "↗" },
            { ind: "Work-in-progress limits", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[WIP within limits; no individual has >2 active stories simultaneously]", trend: "→" },
            { ind: "Process efficiency", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Lead time improving; avg 4.2 days from start to done vs 5.1 days last sprint]", trend: "↗" },
            { ind: "Quality of deliverables", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Defect rate: 0.8 per story vs 1.2 industry avg; code review coverage 100%]", trend: "↗" },
            { ind: "Knowledge management", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[Wiki documentation lagging behind development by ~1 sprint; catching up]", trend: "→" },
            { ind: "Change management", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[3 CRs processed this sprint; all within SLA; impact assessed accurately]", trend: "→" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.ind}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ev}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td></tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = Healthy &nbsp;|&nbsp; 🟡 = Watch &nbsp;|&nbsp; 🔴 = Needs Intervention &nbsp;|&nbsp; Trend: ↗ Improving → Stable ↘ Declining</p>
    </div>
  );

  const renderBlockers = () => (
    <div ref={blockersRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🚧 ACTIVE BLOCKERS & IMPEDIMENTS</td></tr></tbody></table>
      <CopyButton targetRef={blockersRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Blocker</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thSecondary, width: "8%" }}>Age</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Resolution Plan</th>
        </tr></thead>
        <tbody>
          {[
            { blocker: "[API endpoint documentation incomplete from vendor; blocking integration testing]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, age: "3 days", plan: "[Escalated to vendor PM; workaround with mock API in progress]" },
            { blocker: "[Staging environment disk space at 95%; deployments failing intermittently]", sev: "Med", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, age: "1 day", plan: "[Infra team cleaning up; expansion request submitted]" },
            { blocker: "[No active blockers beyond above]", sev: "—", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg, age: "—", plan: "[Continue monitoring daily]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.blocker}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.age}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.plan}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderProcess = () => (
    <div ref={processRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 PROCESS METRICS</td></tr></tbody></table>
      <CopyButton targetRef={processRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Sprint Velocity (Current)</td><td style={S.td0}>[34 pts] — 3-sprint avg: [33 pts] — <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Stable</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Lead Time (Avg)</td><td style={S.tdAlt}>[4.2 days] — improving from [5.1 days] last sprint</td></tr>
        <tr><td style={S.tdLabel}>Cycle Time (Avg)</td><td style={S.td0}>[2.8 days] — stable across last 3 sprints</td></tr>
        <tr><td style={S.tdLabelAlt}>Defect Escape Rate</td><td style={S.tdAlt}>[0 defects escaped to production in Sprint 4] — <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Excellent</span></td></tr>
        <tr><td style={S.tdLabel}>Rework Rate</td><td style={S.td0}>[8% of sprint capacity spent on rework] — below [15%] threshold</td></tr>
        <tr><td style={S.tdLabelAlt}>Stories Completed vs Committed</td><td style={S.tdAlt}>[11 of 12 stories completed = 92%] — 1 story rolled to Sprint 5</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ PROJECT WORK ACTIONS THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "8%" }}>Due</th><th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Done?</th></tr></thead>
        <tbody>
          {[
            { act: "[Resolve vendor API documentation blocker — get complete docs or finalize mock API]", owner: "[Tech Lead]", due: "[Wed]", done: "⬜" },
            { act: "[Close staging environment disk space issue with infra team]", owner: "[DevOps]", due: "[Tue]", done: "⬜" },
            { act: "[Schedule wiki documentation catch-up session for Sprint 4 features]", owner: "[BA]", due: "[Fri]", done: "⬜" },
            { act: "[Review Sprint 5 readiness; confirm all stories meet Definition of Ready]", owner: "[PM + BA]", due: "[Fri]", done: "⬜" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.due}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FEF2F2", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Domain Health Check 5/8 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderBlockers()}{renderProcess()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderActions()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Compass size={11} /> Domain 5/8</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Compass size={20} className="text-red-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Project Work Domain Health Check</h2><p className="text-xs font-medium text-red-600">Performance Domain 5/8</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Execution velocity, blocker resolution, process efficiency, and knowledge management.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProjectWorkDomainHealthCheckPage() {
  return (<ThemeProvider><ProjectWorkDomainHealthCheckContent /></ThemeProvider>);
}
