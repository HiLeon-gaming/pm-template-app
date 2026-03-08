"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Flag, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "timeline" | "table";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "timeline", label: "Timeline View", desc: "Visual milestone map", icon: LayoutDashboard },
  { id: "table", label: "Table View", desc: "Detailed tracking", icon: AlignJustify },
];

const MILESTONES = [
  { num: 1, name: "[e.g., Project Kickoff & Charter Approved]", target: "[MM/DD]", actual: "[MM/DD]", var: "0 days", owner: "[PM]", stat: "Complete", sBg: "#D1FAE5", sFg: "#059669", next: "[Finalize scope document]" },
  { num: 2, name: "[e.g., Requirements Signed Off]", target: "[MM/DD]", actual: "[MM/DD]", var: "+2 days", owner: "[BA]", stat: "Complete", sBg: "#D1FAE5", sFg: "#059669", next: "[Begin design phase]" },
  { num: 3, name: "[e.g., Design Review & Approval]", target: "[MM/DD]", actual: "—", var: "—", owner: "[UX Lead]", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB", next: "[Schedule design review meeting]" },
  { num: 4, name: "[e.g., Development Sprint 1 Complete]", target: "[MM/DD]", actual: "—", var: "—", owner: "[Dev Lead]", stat: "At Risk", sBg: "#FEF3C7", sFg: "#D97706", next: "[Resolve API dependency blocker]" },
  { num: 5, name: "[e.g., UAT Sign-off]", target: "[MM/DD]", actual: "—", var: "—", owner: "[QA Lead]", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280", next: "[Prep test scripts]" },
  { num: 6, name: "[e.g., Go-Live / Launch]", target: "[MM/DD]", actual: "—", var: "—", owner: "[PM]", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280", next: "[Finalize deployment plan]" },
  { num: 7, name: "[e.g., Post-Launch Review & Handoff]", target: "[MM/DD]", actual: "—", var: "—", owner: "[PM]", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280", next: "[Schedule retrospective]" },
  { num: 8, name: "[Add milestone]", target: "", actual: "", var: "", owner: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280", next: "" },
];

function MilestoneContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("timeline");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🏁 MILESTONE TRACKER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Key Milestones, On Time, Every Time</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project / Initiative</td>
            <td style={{ ...S.td0, width: "36%" }}>[Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project Lead</td>
            <td style={{ ...S.td0, width: "36%" }}>[Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Start Date</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
            <td style={S.tdLabelAlt}>Target End</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderTimelineView = () => (
    <div ref={milestonesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🗺️ MILESTONE TIMELINE</div>
      <CopyButton targetRef={milestonesRef} label="Copy Section" />
      {MILESTONES.map((m, i) => (
        <table key={i} style={{ ...S.tbl, marginBottom: "6px" }}>
          <tbody>
            <tr>
              <td style={{ width: "6%", backgroundColor: m.sBg, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", color: m.sFg, border: `1.5px solid ${C.border}`, verticalAlign: "middle" as const }} rowSpan={2}>
                {m.num}
              </td>
              <td style={{ ...S.td0, fontWeight: 700, fontSize: "13px", color: C.primary, width: "40%" }}>
                {m.name}
              </td>
              <td style={{ ...S.td0, width: "12%", textAlign: "center" as const, fontSize: "11px" }}>
                <span style={{ fontWeight: 600, color: C.textMuted }}>Target:</span> {m.target}
              </td>
              <td style={{ ...S.td0, width: "12%", textAlign: "center" as const, fontSize: "11px" }}>
                <span style={{ fontWeight: 600, color: C.textMuted }}>Actual:</span> {m.actual}
              </td>
              <td style={{ ...S.td0, width: "10%", textAlign: "center" as const, fontSize: "11px" }}>
                <span style={{ fontWeight: 600, color: C.textMuted }}>Var:</span> {m.var}
              </td>
              <td style={{ ...S.td0, width: "12%", textAlign: "center" as const }}>
                <span style={S.badge(m.sBg, m.sFg)}>{m.stat}</span>
              </td>
            </tr>
            <tr>
              <td colSpan={5} style={{ ...S.tdAlt, fontSize: "11px" }}>
                <span style={{ fontWeight: 600, color: C.accent }}>Owner:</span> {m.owner} &nbsp;&nbsp;|&nbsp;&nbsp;
                <span style={{ fontWeight: 600, color: C.accent }}>Next Step:</span> {m.next}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div ref={milestonesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 MILESTONE TABLE</div>
      <CopyButton targetRef={milestonesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Milestone</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Actual</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Var</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
            <th style={{ ...S.thPrimary, width: "18%" }}>Next Step</th>
          </tr>
        </thead>
        <tbody>
          {MILESTONES.map((m, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>{m.num}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{m.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{m.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{m.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{m.var}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{m.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(m.sBg, m.sFg)}>{m.stat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.next}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📊 MILESTONE SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "25%" }}>Total Milestones</td>
            <td style={{ ...S.td0, width: "25%" }}>[___]</td>
            <td style={{ ...S.tdLabel, width: "25%" }}>Completed</td>
            <td style={S.td0}>[___]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>On Track</td>
            <td style={S.tdAlt}>[___]</td>
            <td style={S.tdLabelAlt}>At Risk / Delayed</td>
            <td style={S.tdAlt}>[___]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Average Variance</td>
            <td style={S.td0}>[___] days</td>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Overall Health</td>
            <td style={S.td0}>☐ Green ☐ Yellow ☐ Red</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-lime-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime-50 border border-lime-200 text-lime-700 text-xs font-semibold"><Flag size={11} /> Milestones</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-lime-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center"><Flag size={20} className="text-lime-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Milestone Tracker</h2>
              <p className="text-xs font-medium text-lime-600">Key Milestones, On Time, Every Time</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track key milestones with target/actual dates, variance, ownership, and next steps. Timeline View shows each milestone as a visual card; Table View is a compact data grid.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-lime-600 text-white border-lime-600 shadow-md shadow-lime-200" : "bg-white text-slate-600 border-slate-200 hover:border-lime-300 hover:text-lime-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-lime-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderDateHeader()}
          {layout === "timeline" ? renderTimelineView() : renderTableView()}
          {renderSummary()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MilestoneTrackerPage() {
  return (<ThemeProvider><MilestoneContent /></ThemeProvider>);
}
