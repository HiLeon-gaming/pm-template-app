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

function TeamDomainHealthCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const capacityRef = useRef<HTMLDivElement>(null);
  const gapsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };
  const accent = "#DC2626"; const accentDark = "#991B1B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⭐ TEAM DOMAIN HEALTH CHECK</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Performance Domain 2 of 8</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Capacity, morale, conflict, skill gaps, ownership clarity, and action plan.</strong> Team health is the strongest predictor of delivery success. Use weekly to spot issues before they impact output.<br /><br /><strong style={{ fontStyle: "italic" }}>⭐ ALL-STAR PAGE:</strong> High correlation to delivery success—great weekly signal.</td></tr>
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
            { ind: "Team morale / energy", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Retro sentiment positive; team volunteering for stretch goals]", trend: "→" },
            { ind: "Capacity utilization", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ev: "[QA resource at 110%; risk of burnout; others at 75-85%]", trend: "↘" },
            { ind: "Skill coverage", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[All critical skills covered; cross-training in progress for API integration]", trend: "↗" },
            { ind: "Role / ownership clarity", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[RACI reviewed and current; no ownership confusion reported]", trend: "→" },
            { ind: "Conflict level", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Healthy debate in planning; no unresolved interpersonal conflicts]", trend: "→" },
            { ind: "Psychological safety", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Team members raising concerns in retro; junior devs asking questions openly]", trend: "↗" },
            { ind: "Working agreement compliance", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Agreements honored; meetings on time; focus blocks respected]", trend: "→" },
            { ind: "Velocity / throughput", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Velocity stable at 34 pts/sprint; no significant variance]", trend: "→" },
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

  const renderCapacity = () => (
    <div ref={capacityRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 CAPACITY &amp; UTILIZATION</td></tr></tbody></table>
      <CopyButton targetRef={capacityRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Team Member</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Alloc %</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Actual %</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { m: "[Developer 1]", role: "Full-Stack", alloc: "100%", actual: "85%", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, n: "[On track; completing Sprint 4 stories]" },
            { m: "[Developer 2]", role: "Backend", alloc: "100%", actual: "80%", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, n: "[API integration ahead of schedule]" },
            { m: "[QA Lead]", role: "Testing", alloc: "100%", actual: "110%", s: "🔴", sBg: C.badgeRedBg, sFg: C.badgeRedFg, n: "[Overloaded — testing backlog growing; need augmentation]" },
            { m: "[BA]", role: "Analysis", alloc: "75%", actual: "75%", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, n: "[Requirements stable; available for Sprint 5 prep]" },
            { m: "[UX Designer]", role: "Design", alloc: "50%", actual: "45%", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, n: "[Design complete for next 2 sprints; shifting to usability testing]" },
            { m: "[Tech Lead]", role: "Architecture", alloc: "100%", actual: "90%", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, n: "[Splitting time between coding and architecture decisions]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.m}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.alloc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.actual}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.n}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGaps = () => (
    <div ref={gapsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚠️ SKILL GAPS &amp; RISKS</td></tr></tbody></table>
      <CopyButton targetRef={gapsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Gap / Risk</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={S.thSecondary}>Mitigation</th>
        </tr></thead>
        <tbody>
          {[
            { gap: "[Single point of failure: only 1 person knows the data migration scripts]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, mit: "[Cross-training session scheduled Week 8; documentation in progress]" },
            { gap: "[QA resource overloaded — testing backlog may delay Sprint 5 acceptance]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, mit: "[Request shared pool QA resource for 2 sprints; developers pick up unit test coverage]" },
            { gap: "[No backup for Scrum Master role if PM is unavailable]", sev: "Med", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, mit: "[Tech Lead to shadow SM responsibilities; ready to cover if needed]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.gap}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mit}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ TEAM ACTIONS THIS WEEK</td></tr></tbody></table>
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
            { act: "[Request QA augmentation from shared resource pool]", owner: "[PM]", due: "[Wed]", done: "⬜" },
            { act: "[Schedule data migration cross-training session]", owner: "[Tech Lead]", due: "[Fri]", done: "⬜" },
            { act: "[Have Tech Lead shadow Scrum Master responsibilities this sprint]", owner: "[PM]", due: "[Mon]", done: "⬜" },
            { act: "[Run team retrospective focused on Sprint 4 learnings]", owner: "[PM]", due: "[Fri]", done: "⬜" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td>
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
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FEF2F2", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Domain Health Check 2/8 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderCapacity()}{renderGaps()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderActions()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">⭐ All-Star</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Compass size={20} className="text-red-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Team Domain Health Check</h2><p className="text-xs font-medium text-red-600">Performance Domain 2/8 • ⭐ All-Star</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Capacity, morale, conflict, skill gaps, ownership clarity, and action plan.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TeamDomainHealthCheckPage() {
  return (<ThemeProvider><TeamDomainHealthCheckContent /></ThemeProvider>);
}
