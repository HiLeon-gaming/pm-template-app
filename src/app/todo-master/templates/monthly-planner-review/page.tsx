"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Calendar,
  LayoutDashboard,
  AlignJustify,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Month", desc: "All sections", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Goals + calendar", icon: AlignJustify },
];

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5 (if applicable)"];

function MonthlyPlannerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const habitsRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);
  const retroRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

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
            📆 MONTHLY PLANNER &amp; REVIEW
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Plan Big, Review Bigger
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
            <td style={{ ...S.tdLabel, width: "12%" }}>Month</td>
            <td style={{ ...S.td0, width: "22%" }}>[Month / Year]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Quarter</td>
            <td style={{ ...S.td0, width: "10%" }}>Q[#]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Monthly Theme</td>
            <td style={{ ...S.td0, width: "26%" }}>[e.g., Execution / Growth / Consolidation]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Monthly Vision</td>
            <td colSpan={5} style={S.tdAlt}>[By the end of this month, I will have accomplished _____. What does success look like?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 MONTHLY GOALS &amp; MILESTONES</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Goal</th>
            <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Success Metric</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Target Week</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { goal: "[e.g., Launch new client onboarding flow]", metric: "[Live + 10 users]", week: "Week 2", stat: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { goal: "[e.g., Complete annual budget draft]", metric: "[Submitted to CFO]", week: "Week 3", stat: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { goal: "[e.g., Hire 2 engineers for Platform team]", metric: "[Offers accepted]", week: "Week 4", stat: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { goal: "[Add goal]", metric: "", week: "", stat: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { goal: "[Add goal]", metric: "", week: "", stat: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.goal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.week}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWeeklyCalendar = () => (
    <div ref={calendarRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📅 WEEKLY BREAKDOWN</div>
      <CopyButton targetRef={calendarRef} label="Copy Section" />
      {WEEKS.map((week, wi) => (
        <table key={wi} style={{ ...S.tbl, marginBottom: "6px" }}>
          <thead>
            <tr>
              <td colSpan={4} style={{
                backgroundColor: wi % 2 === 0 ? C.secondary : C.accent,
                color: C.white, padding: "7px 14px", fontFamily: S.font,
                fontSize: "13px", fontWeight: 700, border: `1.5px solid ${C.border}`,
              }}>
                {week}
              </td>
            </tr>
            <tr>
              <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
              <th style={S.thSecondary}>Key Deliverable / Focus</th>
              <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Owner</th>
              <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, i) => {
              const isAlt = i % 2 === 1;
              const bg = isAlt ? C.rowAlt : C.white;
              return (
                <tr key={i}>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                  <td style={{ ...S.td0, backgroundColor: bg }}>{wi === 0 && i === 0 ? "[e.g., Kickoff meeting for onboarding project]" : ""}&nbsp;</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>&nbsp;</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>&nbsp;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderHabits = () => (
    <div ref={habitsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔥 MONTHLY HABIT SUMMARY</div>
      <CopyButton targetRef={habitsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary}>Habit</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Wk 1</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Wk 2</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Wk 3</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Wk 4</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const, backgroundColor: C.accent }}>Monthly</th>
          </tr>
        </thead>
        <tbody>
          {[
            "☀️ Morning routine completed",
            "🧠 2+ hrs deep work daily",
            "🏃 Exercise / movement",
            "📝 Weekly review done",
            "📧 Inbox zero (weekly)",
            "[Add habit]",
          ].map((h, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px" }}>{h}</td>
                {Array.from({ length: 4 }).map((_, j) => (
                  <td key={j} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>/7</td>
                ))}
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>/28</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBudget = () => (
    <div ref={budgetRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>💰 MONTHLY BUDGET CHECK-IN</div>
      <CopyButton targetRef={budgetRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thSecondary}>Category</th>
            <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Budgeted</th>
            <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Actual</th>
            <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Variance</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { cat: "[e.g., Tools & Software]", bud: "$[___]", act: "$[___]" },
            { cat: "[e.g., Training & Development]", bud: "$[___]", act: "$[___]" },
            { cat: "[e.g., Travel & Events]", bud: "$[___]", act: "$[___]" },
            { cat: "[e.g., Contractor Spend]", bud: "$[___]", act: "$[___]" },
            { cat: "[Add category]", bud: "", act: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.bud}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={{ fontSize: "10px", color: C.textMuted }}>☐ Under ☐ On ☐ Over</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRetro = () => (
    <div ref={retroRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🌅 MONTH-END RETROSPECTIVE</div>
      <CopyButton targetRef={retroRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Reflection</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          {[
            { q: "Goals hit vs. planned", a: "[___] / [___] — Hit rate: [___]%" },
            { q: "Biggest accomplishment", a: "" },
            { q: "Biggest surprise or lesson", a: "" },
            { q: "What I'd do differently", a: "" },
            { q: "Key relationships nurtured", a: "" },
            { q: "How did I grow this month?", a: "" },
            { q: "Next month's #1 priority", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Overall month rating</td>
            <td style={S.td0}>[___] / 10 &nbsp;&nbsp; ☐ Exceptional ☐ Strong ☐ Average ☐ Below</td>
          </tr>
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
            fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em",
          }}>
            ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderFull = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderGoals()}
      {renderWeeklyCalendar()}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderHabits()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderBudget()}</td>
          </tr>
        </tbody>
      </table>
      {renderRetro()}
      {renderFooter()}
    </>
  );

  const renderCompact = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderGoals()}
      {renderWeeklyCalendar()}
      {renderRetro()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold">
            <Calendar size={11} />
            Monthly Planning
          </span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors">
            <ArrowLeft size={14} /> Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <Calendar size={20} className="text-violet-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Monthly Planner &amp; Review</h2>
              <p className="text-xs font-medium text-violet-600">Plan Big, Review Bigger &mdash; 30-Day Strategic Cycle</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Set monthly goals, break them into weekly deliverables, track habits
            and budget, then close with a structured retrospective. Full Month
            includes habit tracking and budget; Quick Plan is goals + calendar only.
          </p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Planner Depth</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                  <Icon size={15} /> <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFull()}
          {layout === "compact" && renderCompact()}
        </div>
        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function MonthlyPlannerReviewPage() {
  return (<ThemeProvider><MonthlyPlannerContent /></ThemeProvider>);
}
