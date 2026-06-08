"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  CheckSquare,
  LayoutDashboard,
  AlignJustify,
  Columns,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "command-center" | "focus" | "balanced";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "command-center", label: "Command Center", desc: "2-column dashboard", icon: LayoutDashboard },
  { id: "focus", label: "Focus Flow", desc: "Single column", icon: AlignJustify },
  { id: "balanced", label: "Balanced", desc: "Hybrid mix", icon: Columns },
];

function DailyTaskPlannerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("command-center");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const callsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  /* ── Layout table styles (invisible borders for 2-col structure) ── */
  const LT: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse" as const,
    border: "none",
    fontFamily: S.font,
  };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const LL: React.CSSProperties = { ...LC, width: "48%", paddingRight: "10px" };
  const LR: React.CSSProperties = { ...LC, width: "52%", paddingLeft: "10px" };
  const LHalf: React.CSSProperties = { ...LC, width: "50%", paddingRight: "5px" };
  const RHalf: React.CSSProperties = { ...LC, width: "50%", paddingLeft: "5px" };

  /* ═══════════════════════════════════════════════
     SECTION RENDERERS
     ═══════════════════════════════════════════════ */

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary,
            color: C.white,
            padding: "16px 20px",
            fontSize: "22px",
            fontWeight: 800,
            fontFamily: S.font,
            letterSpacing: "0.04em",
            borderBottom: `4px solid ${C.accent}`,
            textAlign: "center" as const,
          }}>
            ✦ DAILY TASK PLANNER
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary,
            color: C.white,
            padding: "6px 20px",
            fontSize: "11px",
            fontWeight: 600,
            fontFamily: S.font,
            textAlign: "center" as const,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Plan &bull; Execute &bull; Reflect
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ── Date & Info Header ── */
  const renderDateHeader = () => (
    <div ref={dateRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Day</td>
            <td style={{ ...S.td0, width: "36%" }}>[Monday]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Week #</td>
            <td style={S.tdAlt}>[##] of [##]</td>
            <td style={S.tdLabelAlt}>Daily Intention</td>
            <td style={S.tdAlt}>[What is your focus theme for today?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={dateRef} label="Copy Section" />
    </div>
  );

  /* ── Top 3 Priorities ── */
  const renderPriorities = () => (
    <div ref={prioritiesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>★ TODAY&apos;S TOP 3 PRIORITIES</td></tr></tbody></table>
      <CopyButton targetRef={prioritiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>★</th>
            <th style={S.thPrimary}>Priority</th>
            <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            "[#1 — Your most important task today. What MUST get done?]",
            "[#2 — Second critical deliverable or commitment]",
            "[#3 — Third key action to move the needle forward]",
          ].map((text, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px", color: C.accent }}>★</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{text}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(C.badgeGrayBg, C.badgeGrayFg)}>☐ Pending</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Master Task List ── */
  const taskData = [
    { task: "[e.g., Review Q2 budget proposal and send feedback]", proj: "[Project Alpha]", due: "10:00 AM", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
    { task: "[e.g., Prepare slide deck for steering committee]", proj: "[Project Beta]", due: "12:00 PM", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
    { task: "[e.g., Send weekly status report to stakeholders]", proj: "[PMO]", due: "2:00 PM", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
    { task: "[e.g., Complete vendor evaluation scorecard]", proj: "[Procurement]", due: "3:00 PM", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
    { task: "[e.g., Update risk register with new findings]", proj: "[Project Alpha]", due: "4:30 PM", pri: "Low", priBg: C.badgeBlueBg, priFg: C.badgeBlueFg },
    { task: "[Add task]", proj: "[Category]", due: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
    { task: "[Add task]", proj: "[Category]", due: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
    { task: "[Add task]", proj: "[Category]", due: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
    { task: "[Add task]", proj: "[Category]", due: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
    { task: "[Add task]", proj: "[Category]", due: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
  ];

  const renderTaskList = () => (
    <div ref={tasksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>✅ MASTER TASK LIST</td></tr></tbody></table>
      <CopyButton targetRef={tasksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thSecondary}>Task</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Project / Category</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.proj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Time-Blocked Schedule ── */
  const timeSlots = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
    "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
  ];

  const renderSchedule = () => (
    <div ref={scheduleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🕐 TIME-BLOCKED SCHEDULE</td></tr></tbody></table>
      <CopyButton targetRef={scheduleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "22%", textAlign: "center" as const }}>Time</th>
            <th style={S.thSecondary}>Plan / Activity</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={time}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: C.primary }}>{time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, minHeight: "22px" }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Calls / Emails / Follow-ups ── */
  const callData = [
    { person: "[e.g., Vendor PM — contract clarification]", type: "Call" },
    { person: "[e.g., Sponsor — budget approval follow-up]", type: "Email" },
    { person: "[e.g., Dev Lead — sprint blocker]", type: "Call" },
    { person: "[Add contact]", type: "—" },
    { person: "[Add contact]", type: "—" },
    { person: "[Add contact]", type: "—" },
  ];

  const renderCalls = () => (
    <div ref={callsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📞 CALLS / EMAILS / FOLLOW-UPS</td></tr></tbody></table>
      <CopyButton targetRef={callsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thSecondary}>Person / Subject</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thSecondary, width: "30%" }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {callData.map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.person}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Quick Notes / Brain Dump ── */
  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🧠 QUICK NOTES / BRAIN DUMP</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Capture ideas, thoughts &amp; reminders here — process later</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, height: "26px" }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── End-of-Day Reflection ── */
  const renderReflection = () => (
    <div ref={reflectionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🌅 END-OF-DAY REFLECTION</td></tr></tbody></table>
      <CopyButton targetRef={reflectionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Reflection</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const, fontWeight: 700 }}>Biggest win today</td>
            <td style={{ ...S.td0, height: "48px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const, fontWeight: 700 }}>What I&apos;d do differently</td>
            <td style={{ ...S.tdAlt, height: "48px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const, fontWeight: 700 }}>One thing I&apos;m grateful for</td>
            <td style={{ ...S.td0, height: "48px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, fontWeight: 700 }}>Energy tracker</td>
            <td style={S.tdAlt}>Morning: ☐ High ☐ Med ☐ Low &nbsp;&nbsp;|&nbsp;&nbsp; Afternoon: ☐ High ☐ Med ☐ Low &nbsp;&nbsp;|&nbsp;&nbsp; Evening: ☐ High ☐ Med ☐ Low</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700 }}>Overall day score</td>
            <td style={S.td0}>[___] / 10 &nbsp;&nbsp;&nbsp; ☐ Crushed it &nbsp; ☐ Solid day &nbsp; ☐ Off day &nbsp; ☐ Need to reset</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, fontWeight: 700, color: C.accent }}>Tomorrow&apos;s #1 priority</td>
            <td style={{ ...S.tdAlt, fontWeight: 600 }}>[What must get done tomorrow? Write it now so you wake up with clarity.]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Footer Strip ── */
  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary,
            color: C.footerText,
            padding: "8px 20px",
            fontSize: "10px",
            fontFamily: S.font,
            textAlign: "center" as const,
            letterSpacing: "0.06em",
          }}>
            ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ═══════════════════════════════════════════════
     LAYOUT RENDERERS
     ═══════════════════════════════════════════════ */

  /* ── Command Center: 2-column dashboard (left stack + right schedule) ── */
  const renderCommandCenter = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Left (Priorities + Tasks + Calls) | Right (Schedule) */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={LL}>
              {renderPriorities()}
              {renderTaskList()}
              {renderCalls()}
            </td>
            <td style={LR}>
              {renderSchedule()}
            </td>
          </tr>
        </tbody>
      </table>
      {/* 2-col: Notes | Reflection */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={LHalf}>
              {renderNotes()}
            </td>
            <td style={RHalf}>
              {renderReflection()}
            </td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  /* ── Focus Flow: single column, clean stack ── */
  const renderFocus = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderPriorities()}
      {renderTaskList()}
      {renderSchedule()}
      {renderCalls()}
      {renderNotes()}
      {renderReflection()}
      {renderFooter()}
    </>
  );

  /* ── Balanced: hybrid (some 2-col, some full-width) ── */
  const renderBalanced = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Priorities | Calls */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={LHalf}>
              {renderPriorities()}
            </td>
            <td style={RHalf}>
              {renderCalls()}
            </td>
          </tr>
        </tbody>
      </table>
      {/* Full-width: Task List */}
      {renderTaskList()}
      {/* 2-col: Schedule | Notes + Reflection */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "42%", paddingRight: "10px" }}>
              {renderSchedule()}
            </td>
            <td style={{ ...LC, width: "58%", paddingLeft: "10px" }}>
              {renderNotes()}
              {renderReflection()}
            </td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  /* ═══════════════════════════════════════════════
     PAGE CHROME
     ═══════════════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* App Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
            <Star size={11} />
            Productivity Pro
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb + Copy All */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/todo-master"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        {/* Template title area */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckSquare size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Daily Task Planner</h2>
              <p className="text-xs font-medium text-emerald-600">
                Plan &bull; Execute &bull; Reflect &mdash; Structure Every Day for Peak Performance
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            A comprehensive daily planner with priorities, time-blocked scheduling,
            task tracking, and end-of-day reflection. Choose a layout below, pick a
            theme, then copy the entire template into OneNote or Word.
          </p>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Layout Switcher */}
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Page Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>
                    {l.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================== TEMPLATE CONTENT ===================== */}
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "command-center" && renderCommandCenter()}
          {layout === "focus" && renderFocus()}
          {layout === "balanced" && renderBalanced()}
        </div>
        {/* ===================== TEMPLATE CONTENT END ===================== */}

        {/* Bottom copy */}
        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function DailyTaskPlannerPage() {
  return (
    <ThemeProvider>
      <DailyTaskPlannerContent />
    </ThemeProvider>
  );
}
