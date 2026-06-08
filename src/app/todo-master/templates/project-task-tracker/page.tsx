"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListChecks, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "phased" | "flat";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "phased", label: "Phased View", desc: "Tasks grouped by phase", icon: LayoutDashboard },
  { id: "flat", label: "Flat List", desc: "All tasks in one table", icon: AlignJustify },
];

const PHASES = [
  { name: "Phase 1: Initiation", color: "#2563EB", bg: "#DBEAFE", tasks: [
    { task: "[e.g., Define project scope & objectives]", owner: "[PM]", due: "[Date]", dep: "—", pct: "100%", stat: "Done", sBg: "#D1FAE5", sFg: "#059669" },
    { task: "[e.g., Identify stakeholders & RACI]", owner: "[PM]", due: "[Date]", dep: "1.1", pct: "80%", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB" },
    { task: "[e.g., Secure budget approval]", owner: "[Sponsor]", due: "[Date]", dep: "1.2", pct: "0%", stat: "Blocked", sBg: "#FEE2E2", sFg: "#DC2626" },
  ]},
  { name: "Phase 2: Planning", color: "#059669", bg: "#D1FAE5", tasks: [
    { task: "[e.g., Create WBS & task dependencies]", owner: "[PM]", due: "[Date]", dep: "1.1", pct: "50%", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB" },
    { task: "[e.g., Resource allocation & schedule]", owner: "[PM]", due: "[Date]", dep: "2.1", pct: "0%", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
    { task: "[e.g., Risk assessment & mitigation plan]", owner: "[Lead]", due: "[Date]", dep: "2.1", pct: "0%", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
  ]},
  { name: "Phase 3: Execution", color: "#D97706", bg: "#FEF3C7", tasks: [
    { task: "[e.g., Sprint 1 — Core feature development]", owner: "[Dev Lead]", due: "[Date]", dep: "2.2", pct: "0%", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
    { task: "[e.g., Sprint 2 — Integration & testing]", owner: "[QA Lead]", due: "[Date]", dep: "3.1", pct: "0%", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
    { task: "[e.g., User acceptance testing]", owner: "[BA]", due: "[Date]", dep: "3.2", pct: "0%", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
  ]},
  { name: "Phase 4: Closeout", color: "#7C3AED", bg: "#EDE9FE", tasks: [
    { task: "[e.g., Go-live deployment & cutover]", owner: "[DevOps]", due: "[Date]", dep: "3.3", pct: "0%", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
    { task: "[e.g., Post-launch review & lessons learned]", owner: "[PM]", due: "[Date]", dep: "4.1", pct: "0%", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
  ]},
];

function ProjectTaskContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("phased");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📋 PROJECT TASK TRACKER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Every Task, Every Phase, Every Owner</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project Name</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project Manager</td>
            <td style={{ ...S.td0, width: "36%" }}>[Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Start Date</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
            <td style={S.tdLabelAlt}>Target End</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Overall Status</td>
            <td style={S.td0}>☐ Green ☐ Yellow ☐ Red</td>
            <td style={S.tdLabel}>Completion</td>
            <td style={S.td0}>[___]% &nbsp;&nbsp; ([___] of [___] tasks done)</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderPhasedTasks = () => (
    <div ref={tasksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📂 TASKS BY PHASE</td></tr></tbody></table>
      <CopyButton targetRef={tasksRef} label="Copy Section" />
      {PHASES.map((phase, pi) => (
        <table key={pi} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr>
              <td colSpan={7} style={{ backgroundColor: phase.bg, color: phase.color, padding: "8px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${phase.color}` }}>
                {phase.name}
              </td>
            </tr>
            <tr>
              <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>ID</th>
              <th style={S.thSecondary}>Task</th>
              <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Owner</th>
              <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Due</th>
              <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Dep.</th>
              <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>%</th>
              <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {phase.tasks.map((t, ti) => {
              const isAlt = ti % 2 === 1;
              const bg = isAlt ? C.rowAlt : C.white;
              return (
                <tr key={ti}>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: phase.color, fontSize: "11px" }}>{pi + 1}.{ti + 1}</td>
                  <td style={{ ...S.td0, backgroundColor: bg }}>{t.task}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{t.owner}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{t.due}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{t.dep}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "11px" }}>{t.pct}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(t.sBg, t.sFg)}>{t.stat}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderFlatTasks = () => (
    <div ref={tasksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 ALL TASKS</td></tr></tbody></table>
      <CopyButton targetRef={tasksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>ID</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Phase</th>
            <th style={S.thSecondary}>Task</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "9%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>%</th>
            <th style={{ ...S.thSecondary, width: "11%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {PHASES.flatMap((phase, pi) =>
            phase.tasks.map((t, ti) => {
              const idx = PHASES.slice(0, pi).reduce((s, p) => s + p.tasks.length, 0) + ti;
              const isAlt = idx % 2 === 1;
              const bg = isAlt ? C.rowAlt : C.white;
              return (
                <tr key={`${pi}-${ti}`}>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: phase.color, fontSize: "11px" }}>{pi + 1}.{ti + 1}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: phase.color, fontWeight: 600 }}>{phase.name.split(":")[0]}</td>
                  <td style={{ ...S.td0, backgroundColor: bg }}>{t.task}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{t.owner}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{t.due}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "11px" }}>{t.pct}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(t.sBg, t.sFg)}>{t.stat}</span></td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📊 PROJECT SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary}>Phase</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Tasks</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Done</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>In Progress</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Blocked</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Completion</th>
          </tr>
        </thead>
        <tbody>
          {PHASES.map((p, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, color: p.color }}>{p.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{p.tasks.length}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>[___]%</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>TOTAL</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>{PHASES.reduce((s, p) => s + p.tasks.length, 0)}</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[___]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[___]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[___]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"><ListChecks size={11} /> Task Tracker</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><ListChecks size={20} className="text-cyan-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Task Tracker</h2>
              <p className="text-xs font-medium text-cyan-600">Every Task, Every Phase, Every Owner</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Full project task list with phases, owners, due dates, dependencies, status & completion percentage. Phased View groups tasks by project phase; Flat List shows everything in one table.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderDateHeader()}
          {layout === "phased" ? renderPhasedTasks() : renderFlatTasks()}
          {renderSummary()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProjectTaskTrackerPage() {
  return (<ThemeProvider><ProjectTaskContent /></ThemeProvider>);
}
