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
  { id: "full", label: "Full Calendar", desc: "Weekly + monthly + quarterly cadence + checklists", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Cadence summary only", icon: AlignJustify },
];

function CalendarContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);
  const monthlyRef = useRef<HTMLDivElement>(null);
  const quarterlyRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OPERATING RHYTHM CALENDAR</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Weekly / Monthly / Quarterly</td></tr>
    </tbody></table>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>YOUR RHYTHM AT A GLANCE</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>An operating rhythm is simply your repeating schedule for reviewing goals, metrics, and progress. Think of it like brushing your teeth &mdash; same time, same routine, every time.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Cadence</th>
          <th style={S.thPrimary}>What You Do</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Who Attends</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Key Output</th>
        </tr></thead>
        <tbody>
          {[
            { cad: "Weekly", what: "Review priorities, metrics, blockers, and decisions", time: "15\u201330 min", who: "Team + Lead", output: "Updated priorities + actions", color: "#059669" },
            { cad: "Monthly", what: "Deeper performance review + course correction", time: "60 min", who: "Dept Heads + Lead", output: "MBR notes + adjusted plans", color: "#D97706" },
            { cad: "Quarterly", what: "Score OKRs, set new goals, decide start/stop/continue", time: "2\u20134 hours", who: "Leadership Team", output: "New OKRs + commitments", color: "#7C3AED" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 800, fontSize: "11px", color: r.color, textAlign: "center" as const }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.output}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWeekly = () => (
    <div ref={weeklyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>WEEKLY RHYTHM CHECKLIST (Every Monday)</td></tr></tbody></table>
      <CopyButton targetRef={weeklyRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>This is the heartbeat of your system. 15 minutes every Monday keeps everything on track. Block it on your calendar right now.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Order</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Page To Use</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { action: "Open the Dashboard \u2014 scan current OKR scores and health", page: "Dashboard" },
            { action: "Review this week\u2019s key metrics (what went up, what went down?)", page: "Weekly Metrics Snapshot" },
            { action: "Turn metric insights into specific actions with owners", page: "KPI Review \u2192 Actions" },
            { action: "Set or update your Top 3 priorities for THIS week", page: "Weekly Priorities Cockpit" },
            { action: "Capture any blockers or help requests", page: "Blockers & Help Requests" },
            { action: "Log any decisions that were made or need to be made", page: "Decision Log" },
            { action: "Celebrate any wins from last week!", page: "Weekly Wins & Learnings" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#059669" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.page}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMonthlyAndQuarterly = () => (
    <div ref={monthlyRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={monthlyRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>📅 MONTHLY CHECKLIST</td></tr></thead>
            <tbody>
              {[
                { action: "Score each KR \u2014 where are we vs. target?", page: "KR Scoreboard" },
                { action: "Review initiative health (RAG status)", page: "Portfolio Roll-Up" },
                { action: "Identify top risks, update mitigation", page: "Risk Radar" },
                { action: "Hold MBR meeting", page: "MBR Agenda" },
                { action: "Capture decisions & follow-up actions", page: "MBR Notes" },
                { action: "Adjust priorities / reallocate resources", page: "Commitments" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      <span style={{ fontWeight: 800, fontSize: "13px", color: "#D97706" }}>{i + 1}</span> {r.action}<br />
                      <span style={{ fontSize: "9px", color: accent, fontWeight: 600 }}>{r.page}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>📆 QUARTERLY CHECKLIST</td></tr></thead>
            <tbody>
              {[
                { action: "Final-score all KRs for the quarter", page: "KR Scoreboard" },
                { action: "Prepare QBR One-Pager", page: "QBR One-Pager" },
                { action: "Hold QBR meeting with leadership", page: "QBR Agenda" },
                { action: "Capture QBR decisions & commitments", page: "QBR Notes" },
                { action: "Draft new OKRs for next quarter", page: "OKR Builder" },
                { action: "Run OKR Quality Checklist on new goals", page: "Quality Checklist" },
                { action: "Decide what to STOP doing", page: "Stop Doing List" },
                { action: "Publish Quarterly Kickoff One-Pager", page: "Kickoff" },
                { action: "Communicate new goals to team", page: "Rollout Comm" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      <span style={{ fontWeight: 800, fontSize: "13px", color: "#7C3AED" }}>{i + 1}</span> {r.action}<br />
                      <span style={{ fontSize: "9px", color: accent, fontWeight: 600 }}>{r.page}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Calendar size={11} />Rhythm</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Calendar size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Operating Rhythm Calendar</h2><p className="text-xs font-medium text-sky-600">Weekly / Monthly / Quarterly Cadence</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your cadence map with checklists per meeting type. Consistency is the secret weapon of great teams.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderSummary()}{renderWeekly()}{renderMonthlyAndQuarterly()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSummary()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function OperatingRhythmCalendarPage() { return <ThemeProvider><CalendarContent /></ThemeProvider>; }
