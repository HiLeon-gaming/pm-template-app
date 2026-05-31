"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "Weekly + monthly + quarterly checks + compliance", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Checklist tables only", icon: AlignJustify },
];

function GovernanceChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const weekRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const qtrRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>GOVERNANCE CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Weekly / Monthly / Quarterly Required Checks</td></tr>
    </tbody></table>
  );

  const makeChecklist = (items: { task: string; owner: string; done: boolean }[]) => (
    <table style={S.tbl}>
      <thead><tr>
        <th style={{ ...S.thPrimary, width: "3%", textAlign: "center" as const }}>&#9744;</th>
        <th style={S.thPrimary}>Task</th>
        <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
      </tr></thead>
      <tbody>
        {items.map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done ? "\u2611" : "\u2610"}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.task}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderWeek = () => (
    <div ref={weekRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>WEEKLY GOVERNANCE CHECKS</td></tr></tbody></table>
      <CopyButton targetRef={weekRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Complete every week before the Monday check-in. Takes 15 minutes if everyone does their part.</p>
      {makeChecklist([
        { task: "All KR scores updated with current data.", owner: "[Each KR owner]", done: false },
        { task: "Commitments from last week marked Done / Partial / Missed.", owner: "[Each owner]", done: false },
        { task: "This week’s top 3 priorities written in Priorities Cockpit.", owner: "[Each owner]", done: false },
        { task: "Blockers page updated with any new blockers or help requests.", owner: "[Anyone stuck]", done: false },
        { task: "Decision log updated with any decisions made this week.", owner: "[Facilitator]", done: false },
        { task: "Risk radar reviewed — any risks changed?", owner: "[Risk owner]", done: false },
        { task: "Weekly check-in agenda sent to all attendees.", owner: "[Facilitator]", done: false },
      ])}
    </div>
  );

  const renderMonth = () => (
    <div ref={monthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>MONTHLY GOVERNANCE CHECKS (Before MBR)</td></tr></tbody></table>
      <CopyButton targetRef={monthRef} label="Copy Section" />
      {makeChecklist([
        { task: "All KR scores updated with end-of-month actuals.", owner: "[Ops Lead]", done: false },
        { task: "Initiative Portfolio Roll-Up updated with current RAG statuses.", owner: "[Each owner]", done: false },
        { task: "Metrics Snapshot reviewed — watch list items flagged.", owner: "[Data / Ops]", done: false },
        { task: "Stop Doing list reviewed — anything crept back in?", owner: "[Facilitator]", done: false },
        { task: "Assumptions log reviewed — any validated or invalidated?", owner: "[Ops Lead]", done: false },
        { task: "Pending decisions list reviewed — any overdue?", owner: "[Facilitator]", done: false },
        { task: "MBR pre-read sent to attendees 24 hours before meeting.", owner: "[Facilitator]", done: false },
        { task: "Budget vs actual reviewed — any overruns?", owner: "[Finance]", done: false },
      ])}
    </div>
  );

  const renderQtrAndComp = () => (
    <div ref={qtrRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={qtrRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#E0E7FF", color: accent, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${accent}` }}>📅 QUARTERLY CHECKS (Before QBR)</td></tr></thead>
            <tbody>
              {[
                { task: "All KR scores finalized with end-of-quarter actuals.", owner: "[Ops Lead]" },
                { task: "QBR One-Pager completed with scores, lessons, next quarter preview.", owner: "[COO / Ops]" },
                { task: "Lessons learned collected from each team lead.", owner: "[Each lead]" },
                { task: "KPI Library reviewed — remove unused, add new.", owner: "[Data / Ops]" },
                { task: "Metric Integrity Checklist run on all KPIs.", owner: "[Data / Ops]" },
                { task: "Decision log reviewed — close or carry forward.", owner: "[Facilitator]" },
                { task: "Risk radar archived. New radar for next Q.", owner: "[Risk owner]" },
                { task: "QBR pre-read sent 3 days before meeting.", owner: "[Facilitator]" },
                { task: "Next quarter OKR draft circulated for feedback.", owner: "[CEO / COO]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      \u2610 {r.task} <span style={{ fontSize: "9px", color: C.textMuted }}>({r.owner})</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🏥 GOVERNANCE HEALTH CHECK</td></tr></thead>
            <tbody>
              {[
                { label: "Weekly Check-In Compliance", value: "[e.g., 10/12 weeks = 83%. Target: 100%]" },
                { label: "MBR Compliance", value: "[e.g., 3/3 months = 100%]" },
                { label: "Data Freshness", value: "[KR scores updated within 24h = Yes/No]" },
                { label: "Decision Log Up-to-Date", value: "[0 pending overdue = Yes/No]" },
                { label: "Overall Governance Grade", value: "[e.g., B+ — consistent rhythm, MBR data sometimes late]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: i === 4 ? accent : undefined }}>{r.label}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.value}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><ClipboardCheck size={11} />Governance</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><ClipboardCheck size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Governance Checklist</h2><p className="text-xs font-medium text-indigo-600">Weekly / Monthly / Quarterly Required Checks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Required checks at every cadence. Ensures the OKR system stays healthy and nobody skips governance.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderWeek()}{renderMonth()}{renderQtrAndComp()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderWeek()}{renderMonth()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function GovernanceChecklistPage() { return <ThemeProvider><GovernanceChecklistContent /></ThemeProvider>; }
