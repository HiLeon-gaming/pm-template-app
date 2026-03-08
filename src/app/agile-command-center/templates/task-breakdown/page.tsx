"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListTodo, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full View", desc: "Stories + tasks + notes", icon: LayoutDashboard },
  { id: "compact", label: "Task List", desc: "Tasks only", icon: AlignJustify },
];

function TaskBreakdownContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const breakdownRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0891B2"; const accentDark = "#0E7490";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📝 TASK BREAKDOWN / TO-DO</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Daily Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Owner</td><td style={S.tdAlt}>[Dev Name]</td><td style={S.tdLabelAlt}>Sprint Day</td><td style={S.tdAlt}>[Day # of 10]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const storyTasks = (storyId: string, storyTitle: string, pts: string, color: string, tasks: { task: string; est: string; owner: string; done: boolean }[]) => (
    <table style={{ ...S.tbl, marginBottom: "8px" }}>
      <thead>
        <tr><td colSpan={5} style={{ backgroundColor: color, color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{storyId}: {storyTitle} &nbsp;<span style={{ fontSize: "10px", fontWeight: 600, opacity: 0.85 }}>({pts} pts)</span></td></tr>
        <tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={S.thSecondary}>Task</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Est (hrs)</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>{t.done ? "✅" : "☐"}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.task}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{t.est}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{t.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(t.done ? C.badgeGreenBg : C.badgeGrayBg, t.done ? C.badgeGreenFg : C.badgeGrayFg)}>{t.done ? "Done" : "To Do"}</span></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderBreakdown = () => (
    <div ref={breakdownRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🔨 STORY → TASK BREAKDOWN</div>
      <CopyButton targetRef={breakdownRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Break each story into small tasks (2–8 hours each). Helps teams who need extra structure beyond the story level.</p>

      {storyTasks("S-010", "[Apple Pay Integration]", "5", accentDark, [
        { task: "[Set up Apple Pay SDK and merchant account config]", est: "3", owner: "[Sarah]", done: true },
        { task: "[Build Apple Pay button component with loading state]", est: "4", owner: "[Sarah]", done: false },
        { task: "[Implement payment processing logic + error handling]", est: "6", owner: "[Sarah]", done: false },
        { task: "[Write unit tests for payment flow]", est: "3", owner: "[Sarah]", done: false },
        { task: "[QA: test on iOS Safari + Chrome]", est: "2", owner: "[Alex]", done: false },
      ])}

      {storyTasks("S-012a", "[Payment Error Display]", "2", "#0891B2", [
        { task: "[Build error message component with retry button]", est: "3", owner: "[Priya]", done: true },
        { task: "[Style error states for all payment methods]", est: "2", owner: "[Priya]", done: false },
        { task: "[QA: test error scenarios]", est: "1", owner: "[Alex]", done: false },
      ])}

      {storyTasks("[S-###]", "[Add Story]", "", "#6B7280", [
        { task: "[Add task]", est: "", owner: "", done: false },
        { task: "[Add task]", est: "", owner: "", done: false },
      ])}
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>💡 TASK BREAKDOWN TIPS</div>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {["Keep tasks between 2–8 hours. Anything bigger should be split further.",
          "Include testing tasks — they\u2019re real work and need to be visible.",
          "Include code review time in your estimates.",
          "If a task takes longer than estimated, update the estimate — don\u2019t hide it.",
          "Tasks are optional — some teams prefer to track at the story level only."].map((t, i) => (
          <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 14px" }}>• {t}</td></tr>
        ))}
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"><ListTodo size={11} />Tasks</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><ListTodo size={20} className="text-cyan-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Task Breakdown / To-Do</h2><p className="text-xs font-medium text-cyan-600">Story → Tasks Breakdown for Extra Structure</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Simple story → tasks breakdown with estimates, owners, and status. Helps teams who need extra structure.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderBreakdown()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderBreakdown()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TaskBreakdownPage() { return <ThemeProvider><TaskBreakdownContent /></ThemeProvider>; }
