"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Trophy,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "detailed" | "compact";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "detailed", label: "Detailed", desc: "Full goal cards", icon: LayoutDashboard },
  { id: "compact", label: "Compact Grid", desc: "Checkbox matrix", icon: AlignJustify },
];

const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyGoalsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("detailed");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const habitsRef = useRef<HTMLDivElement>(null);
  const assessRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  /* ── Goal definitions ── */
  const GOALS = [
    { num: 1, goal: "[e.g., Complete Q3 budget proposal]", metric: "[Approved by Friday]", why: "[Unblocks team hiring for next quarter]", color: C.badgeRedBg, colorFg: C.badgeRedFg, tasks: ["Draft revenue section", "Review with finance", "Incorporate feedback", "Submit for approval", "Follow up on status"] },
    { num: 2, goal: "[e.g., Ship v2.1 to staging]", metric: "[All tests green]", why: "[Sprint commitment — demo on Friday]", color: C.badgeBlueBg, colorFg: C.badgeBlueFg, tasks: ["Merge feature branch", "Write integration tests", "Fix CI failures", "Deploy to staging", "Run smoke tests"] },
    { num: 3, goal: "[e.g., Close 3 vendor contracts]", metric: "[3/3 signed]", why: "[Procurement deadline end of month]", color: C.badgeGreenBg, colorFg: C.badgeGreenFg, tasks: ["Finalize terms with Vendor A", "Send DocuSign to Vendor B", "Negotiate Vendor C pricing", "Get legal sign-off", "File completed contracts"] },
    { num: 4, goal: "[Add goal]", metric: "[Measurable target]", why: "[Why this matters]", color: C.badgeAmberBg, colorFg: C.badgeAmberFg, tasks: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"] },
    { num: 5, goal: "[Add goal]", metric: "[Measurable target]", why: "[Why this matters]", color: C.badgeGrayBg, colorFg: C.badgeGrayFg, tasks: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"] },
  ];

  /* ═══════ SECTIONS ═══════ */

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "16px 20px",
            fontSize: "22px", fontWeight: 800, fontFamily: S.font,
            letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`,
            textAlign: "center" as const,
          }}>
            🏆 WEEKLY GOALS TRACKER
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Set Goals &bull; Track Daily &bull; Win the Week
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Week Of</td>
            <td style={{ ...S.td0, width: "22%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "10%" }}>Week #</td>
            <td style={{ ...S.td0, width: "10%" }}>[##]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Focus Theme</td>
            <td style={{ ...S.td0, width: "28%" }}>[e.g., Execution Mode / Deep Work / Relationship Building]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Weekly Power Statement</td>
            <td colSpan={5} style={S.tdAlt}>[I will _____ by _____ because _____. Write it with conviction.]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Detailed Goal Cards (each goal gets its own mini-table with daily checkboxes) ── */
  const renderGoalCard = (g: typeof GOALS[0]) => (
    <div style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        {/* Goal header banner */}
        <thead>
          <tr>
            <td colSpan={8} style={{
              backgroundColor: g.color, color: g.colorFg,
              padding: "10px 14px", fontFamily: S.font, fontSize: "14px",
              fontWeight: 800, letterSpacing: "0.02em",
              borderBottom: `3px solid ${g.colorFg}`,
              border: `1.5px solid ${C.border}`,
            }}>
              GOAL #{g.num}: {g.goal}
            </td>
          </tr>
        </thead>
        <tbody>
          {/* Meta row */}
          <tr>
            <td style={{ ...S.tdLabel, fontSize: "11px", width: "12%" }}>Metric</td>
            <td colSpan={3} style={{ ...S.td0, fontSize: "12px" }}>{g.metric}</td>
            <td style={{ ...S.tdLabel, fontSize: "11px", width: "12%" }}>Why</td>
            <td colSpan={3} style={{ ...S.td0, fontSize: "12px" }}>{g.why}</td>
          </tr>
          {/* Daily progress header */}
          <tr>
            <th style={{ ...S.thSecondary, fontSize: "10px" }}>Task / Action Step</th>
            {DAYS_SHORT.map((d) => (
              <th key={d} style={{ ...S.thSecondary, width: "9%", textAlign: "center" as const, fontSize: "10px" }}>{d}</th>
            ))}
          </tr>
          {/* Task rows with daily checkboxes */}
          {g.tasks.map((task, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{task}</td>
                {DAYS_SHORT.map((d) => (
                  <td key={d} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                ))}
              </tr>
            );
          })}
          {/* Status row */}
          <tr>
            <td style={{ ...S.tdLabelAlt, fontSize: "11px", fontWeight: 700 }}>End-of-Week Status</td>
            <td colSpan={7} style={{ ...S.tdAlt, textAlign: "center" as const }}>
              <span style={{ ...S.badge(C.badgeGreenBg, C.badgeGreenFg), marginRight: "8px" }}>☐ Hit</span>
              <span style={{ ...S.badge(C.badgeAmberBg, C.badgeAmberFg), marginRight: "8px" }}>☐ Partial</span>
              <span style={{ ...S.badge(C.badgeRedBg, C.badgeRedFg), marginRight: "8px" }}>☐ Missed</span>
              <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>☐ Carried Over</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderDetailedGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 GOALS &amp; DAILY PROGRESS</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      {/* Goals 1-2 side by side */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderGoalCard(GOALS[0])}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderGoalCard(GOALS[1])}</td>
          </tr>
        </tbody>
      </table>
      {/* Goal 3 full width */}
      {renderGoalCard(GOALS[2])}
      {/* Goals 4-5 side by side */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderGoalCard(GOALS[3])}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderGoalCard(GOALS[4])}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Compact checkbox matrix ── */
  const renderCompactGrid = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 WEEKLY GOALS — DAILY CHECKBOX MATRIX</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Goal</th>
            <th style={{ ...S.thPrimary, width: "16%", textAlign: "center" as const }}>Target</th>
            {DAYS_SHORT.map((d) => (
              <th key={d} style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const, fontSize: "10px" }}>{d}</th>
            ))}
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const, backgroundColor: C.accent }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {GOALS.map((g, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: g.colorFg }}>{g.num}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{g.goal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{g.metric}</td>
                {DAYS_SHORT.map((d) => (
                  <td key={d} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                ))}
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(g.color, g.colorFg)}>—</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Sub-tasks compact list */}
      <p style={{ ...S.subNote, marginTop: "8px", marginBottom: "4px" }}>Expand each goal into action steps below:</p>
      {GOALS.map((g) => (
        <table key={g.num} style={{ ...S.tbl, marginBottom: "6px" }}>
          <thead>
            <tr>
              <td colSpan={2} style={{
                backgroundColor: g.color, color: g.colorFg,
                padding: "6px 12px", fontFamily: S.font, fontSize: "12px",
                fontWeight: 700, border: `1px solid ${C.border}`,
              }}>
                Goal #{g.num} — Action Steps
              </td>
            </tr>
          </thead>
          <tbody>
            {g.tasks.map((task, i) => (
              <tr key={i}>
                <td style={{ ...S.td0, width: "5%", textAlign: "center" as const, fontSize: "14px", backgroundColor: i % 2 === 1 ? C.rowAlt : C.white }}>☐</td>
                <td style={{ ...S.td0, fontSize: "12px", backgroundColor: i % 2 === 1 ? C.rowAlt : C.white }}>{task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );

  /* ── Habits & Streaks ── */
  const renderHabits = () => (
    <div ref={habitsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔥 SUPPORTING HABITS &amp; STREAKS</td></tr></tbody></table>
      <CopyButton targetRef={habitsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thSecondary}>Habit</th>
            {DAYS_SHORT.map((d) => (
              <th key={d} style={{ ...S.thSecondary, width: "9%", textAlign: "center" as const, fontSize: "10px" }}>{d}</th>
            ))}
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const, backgroundColor: C.accent }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {[
            "☀️ Morning planning ritual (10 min)",
            "🧠 Deep work block (2+ hrs)",
            "📧 Inbox zero before lunch",
            "🏃 Exercise / movement break",
            "📝 End-of-day review (5 min)",
            "[Add habit]",
          ].map((habit, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px", fontWeight: 600 }}>{habit}</td>
                {DAYS_SHORT.map((d) => (
                  <td key={d} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                ))}
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>/7</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── End-of-Week Assessment ── */
  const renderAssessment = () => (
    <div ref={assessRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 END-OF-WEEK ASSESSMENT</div>
      <CopyButton targetRef={assessRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Assessment Area</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Goals hit vs. planned</td>
            <td style={S.td0}>[___] out of [___] &nbsp;&nbsp; Hit Rate: [___]%</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Biggest win this week</td>
            <td style={{ ...S.tdAlt, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>What blocked progress?</td>
            <td style={{ ...S.td0, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Habit streak status</td>
            <td style={S.tdAlt}>Best habit: [___] &nbsp;&nbsp; Weakest: [___] &nbsp;&nbsp; Overall: [___]/7 days</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Overall week score</td>
            <td style={S.td0}>[___] / 10 &nbsp;&nbsp; ☐ Crushed it &nbsp; ☐ Solid &nbsp; ☐ Mixed &nbsp; ☐ Tough</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Next Week Goals Preview ── */
  const renderNextWeek = () => (
    <div ref={nextRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🚀 NEXT WEEK&apos;S GOALS PREVIEW</td></tr></tbody></table>
      <CopyButton targetRef={nextRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Tentative Goal</th>
            <th style={{ ...S.thSecondary, width: "22%", textAlign: "center" as const }}>Why Now?</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Carry-over?</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐ Y &nbsp;☐ N</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.footerText, padding: "8px 20px",
            fontSize: "10px", fontFamily: S.font, textAlign: "center" as const,
            letterSpacing: "0.06em",
          }}>
            ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ═══════ LAYOUTS ═══════ */

  const renderDetailed = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderDetailedGoals()}
      {renderHabits()}
      {/* 2-col: Assessment | Next Week */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderAssessment()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderNextWeek()}</td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  const renderCompact = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderCompactGrid()}
      {renderHabits()}
      {renderAssessment()}
      {renderNextWeek()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold">
            <Trophy size={11} />
            Goal Crusher
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Trophy size={20} className="text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Weekly Goals Tracker</h2>
              <p className="text-xs font-medium text-orange-600">Set Goals &bull; Track Daily &bull; Win the Week</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Track 3–5 weekly goals with daily action-step checkboxes, supporting habit streaks,
            and end-of-week scoring. Detailed mode shows full goal cards with task breakdowns;
            Compact Grid mode is a checkbox matrix for quick daily tracking.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tracker View</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "detailed" && renderDetailed()}
          {layout === "compact" && renderCompact()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function WeeklyGoalsTrackerPage() {
  return (
    <ThemeProvider>
      <WeeklyGoalsContent />
    </ThemeProvider>
  );
}
