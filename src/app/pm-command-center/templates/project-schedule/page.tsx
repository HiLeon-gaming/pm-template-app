"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Calendar, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Schedule", desc: "Milestones + tasks + dependencies", icon: LayoutDashboard },
  { id: "compact", label: "Milestone View", desc: "Key milestones only", icon: AlignJustify },
];

function ProjectScheduleContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);
  const depsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x1F4C5; PROJECT SCHEDULE / MILESTONE PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Schedule defines the timeline for all project activities, milestones, and dependencies.</strong> It establishes the schedule baseline against which progress is measured using Earned Value Management (EVM) metrics.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>schedule planning</strong> and update throughout execution. Aligns with PMBOK Schedule Management &#x2014; Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Project ID</td><td style={{ ...S.td0, width: "32%" }}>[PRJ-YYYY-###]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Baseline Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabel}>Start Date</td><td style={S.td0}>[MM/DD/YYYY]</td><td style={S.tdLabel}>Target End Date</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderMilestones = () => (
    <div ref={milestonesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F3C1; KEY MILESTONES</div>
      <CopyButton targetRef={milestonesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Milestone</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Phase</th>
          <th style={{ ...S.thPrimary, width: "11%" }}>Baseline Date</th>
          <th style={{ ...S.thPrimary, width: "11%" }}>Forecast Date</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Variance</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { id: "M1", name: "Project Kickoff", phase: "Initiation", base: "[MM/DD]", fore: "[MM/DD]", var: "0d", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[PM]" },
            { id: "M2", name: "Charter Approved", phase: "Initiation", base: "[MM/DD]", fore: "[MM/DD]", var: "0d", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[PM]" },
            { id: "M3", name: "Requirements Baselined", phase: "Planning", base: "[MM/DD]", fore: "[MM/DD]", var: "+3d", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, owner: "[BA]" },
            { id: "M4", name: "Design Complete", phase: "Planning", base: "[MM/DD]", fore: "[MM/DD]", var: "0d", status: "On Track", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, owner: "[Arch]" },
            { id: "M5", name: "Development Complete", phase: "Execution", base: "[MM/DD]", fore: "[MM/DD]", var: "0d", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, owner: "[Dev Lead]" },
            { id: "M6", name: "UAT Complete", phase: "Execution", base: "[MM/DD]", fore: "[MM/DD]", var: "0d", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, owner: "[QA Lead]" },
            { id: "M7", name: "Go-Live", phase: "Deploy", base: "[MM/DD]", fore: "[MM/DD]", var: "0d", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, owner: "[PM]" },
            { id: "M8", name: "Project Closure", phase: "Closing", base: "[MM/DD]", fore: "[MM/DD]", var: "0d", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, owner: "[PM]" },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={m.id}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{m.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{m.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{m.phase}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.base}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.fore}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600, color: m.var.includes("+") ? "#DC2626" : C.textDark }}>{m.var}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(m.sBg, m.sFg)}>{m.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTasks = () => (
    <div ref={tasksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4CB; TASK SCHEDULE (SAMPLE)</div>
      <CopyButton targetRef={tasksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>WBS</th>
          <th style={S.thSecondary}>Task Name</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Duration</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Start</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Finish</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>% Done</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Resource</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Critical?</th>
        </tr></thead>
        <tbody>
          {[
            { wbs: "1.1.1", task: "Develop Project Charter", dur: "5d", start: "[MM/DD]", fin: "[MM/DD]", pct: "100%", res: "[PM]", crit: "Yes" },
            { wbs: "1.2.1", task: "Gather Requirements", dur: "15d", start: "[MM/DD]", fin: "[MM/DD]", pct: "80%", res: "[BA]", crit: "Yes" },
            { wbs: "1.2.2", task: "Create WBS", dur: "5d", start: "[MM/DD]", fin: "[MM/DD]", pct: "50%", res: "[PM]", crit: "Yes" },
            { wbs: "1.3.1", task: "System Design", dur: "10d", start: "[MM/DD]", fin: "[MM/DD]", pct: "0%", res: "[Arch]", crit: "Yes" },
            { wbs: "1.3.2", task: "Development Sprint 1", dur: "10d", start: "[MM/DD]", fin: "[MM/DD]", pct: "0%", res: "[Dev Team]", crit: "Yes" },
            { wbs: "1.3.3", task: "Development Sprint 2", dur: "10d", start: "[MM/DD]", fin: "[MM/DD]", pct: "0%", res: "[Dev Team]", crit: "Yes" },
            { wbs: "1.3.4", task: "Integration Testing", dur: "8d", start: "[MM/DD]", fin: "[MM/DD]", pct: "0%", res: "[QA]", crit: "No" },
            { wbs: "1.4.1", task: "UAT Execution", dur: "10d", start: "[MM/DD]", fin: "[MM/DD]", pct: "0%", res: "[Users]", crit: "Yes" },
            { wbs: "1.4.2", task: "Production Deploy", dur: "3d", start: "[MM/DD]", fin: "[MM/DD]", pct: "0%", res: "[DevOps]", crit: "Yes" },
            { wbs: "[X.X.X]", task: "[Add task]", dur: "[Xd]", start: "[MM/DD]", fin: "[MM/DD]", pct: "0%", res: "[Resource]", crit: "" },
          ].map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{t.wbs}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.task}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{t.dur}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.start}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.fin}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "11px" }}>{t.pct}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.res}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{t.crit === "Yes" ? <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>CP</span> : t.crit ? <span style={S.badge(C.badgeGrayBg, C.badgeGrayFg)}>No</span> : ""}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>CP = Critical Path. Tasks on the critical path have zero float and directly impact the project end date.</p>
    </div>
  );

  const renderDeps = () => (
    <div ref={depsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F517; KEY DEPENDENCIES</div>
      <CopyButton targetRef={depsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%" }}>Predecessor</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Successor</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Lag</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { pred: "1.2.1", succ: "1.2.2", type: "FS", lag: "0d", note: "[Requirements must finish before WBS starts]" },
            { pred: "1.2.2", succ: "1.3.1", type: "FS", lag: "2d", note: "[2-day review buffer between WBS and design]" },
            { pred: "1.3.1", succ: "1.3.2", type: "FS", lag: "0d", note: "[Design must complete before development]" },
            { pred: "1.3.3", succ: "1.4.1", type: "FS", lag: "3d", note: "[3-day environment setup before UAT]" },
            { pred: "1.4.1", succ: "1.4.2", type: "FS", lag: "0d", note: "[UAT sign-off required before production deploy]" },
            { pred: "[X.X.X]", succ: "[X.X.X]", type: "[FS/SS/FF/SF]", lag: "[Xd]", note: "[Add dependency]" },
          ].map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, color: C.secondary, fontSize: "11px", textAlign: "center" as const }}>{d.pred}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, color: C.secondary, fontSize: "11px", textAlign: "center" as const }}>{d.succ}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>{d.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{d.lag}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.note}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Dependency types: <strong>FS</strong> (Finish-to-Start) &#x2022; <strong>SS</strong> (Start-to-Start) &#x2022; <strong>FF</strong> (Finish-to-Finish) &#x2022; <strong>SF</strong> (Start-to-Finish)</p>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4CA; SCHEDULE HEALTH</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Duration</td><td style={S.td0}>[XX] working days ([X] months)</td></tr>
          <tr><td style={S.tdLabelAlt}>Critical Path Length</td><td style={S.tdAlt}>[XX] working days</td></tr>
          <tr><td style={S.tdLabel}>Total Float (non-CP tasks)</td><td style={S.td0}>[XX] days</td></tr>
          <tr><td style={S.tdLabelAlt}>Schedule Variance (SV)</td><td style={S.tdAlt}>[SV = EV - PV = $XXX] <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Favorable</span></td></tr>
          <tr><td style={S.tdLabel}>Schedule Performance Index (SPI)</td><td style={S.td0}>[SPI = EV/PV = X.XX] <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>&gt;1.0</span></td></tr>
          <tr><td style={S.tdLabelAlt}>Milestones On Track</td><td style={S.tdAlt}>[X of Y] &#x2014; [X]% on schedule</td></tr>
          <tr><td style={S.tdLabel}>Next Key Milestone</td><td style={S.td0}>[Milestone Name] &#x2014; [Date]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMilestones()}{renderTasks()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderDeps()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderSummary()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMilestones()}{renderSummary()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Calendar size={11} /> Schedule</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Calendar size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Schedule / Milestone Plan</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Schedule Management &#x2022; Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines milestones, task schedule, dependencies, and schedule health metrics. Full Schedule includes detailed tasks and dependencies; Milestone View shows key milestones and health summary.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProjectSchedulePage() {
  return (<ThemeProvider><ProjectScheduleContent /></ThemeProvider>);
}
