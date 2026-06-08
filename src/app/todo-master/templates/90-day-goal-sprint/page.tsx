"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Zap,
  LayoutDashboard,
  AlignJustify,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "weekly";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Sprint", desc: "Goals + 12-week grid", icon: LayoutDashboard },
  { id: "weekly", label: "Weekly Tracker", desc: "Milestone focus", icon: AlignJustify },
];

function NinetyDayContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const retroRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const SPRINT_GOALS = [
    { num: 1, goal: "[e.g., Launch SaaS product to first 100 paying customers]", metric: "[100 paying users]", color: C.badgeRedBg, colorFg: C.badgeRedFg },
    { num: 2, goal: "[e.g., Complete professional certification (PMP/AWS/etc)]", metric: "[Pass exam]", color: C.badgeBlueBg, colorFg: C.badgeBlueFg },
    { num: 3, goal: "[e.g., Build and ship personal brand — 1000 newsletter subs]", metric: "[1000 subs]", color: C.badgeGreenBg, colorFg: C.badgeGreenFg },
  ];

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
            ⚡ 90-DAY GOAL SPRINT
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; 12 Weeks. 3 Goals. Total Focus.
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
            <td style={{ ...S.tdLabel, width: "12%" }}>Sprint Start</td>
            <td style={{ ...S.td0, width: "18%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Sprint End</td>
            <td style={{ ...S.td0, width: "18%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Sprint Name</td>
            <td style={{ ...S.td0, width: "26%" }}>[e.g., "Operation Launch" / "The Big Push"]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>90-Day Vision</td>
            <td colSpan={5} style={S.tdAlt}>[In 90 days, my life/work looks like _____. Paint the picture of success vividly.]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🎯 SPRINT GOALS (MAX 3)</td></tr></tbody></table>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>
        The 12-Week Year principle: fewer goals = more focus = better results. Pick 3 that matter most.
      </p>
      {SPRINT_GOALS.map((g) => (
        <table key={g.num} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr>
              <td colSpan={4} style={{
                backgroundColor: g.color, color: g.colorFg,
                padding: "10px 14px", fontFamily: S.font, fontSize: "14px",
                fontWeight: 800, borderBottom: `3px solid ${g.colorFg}`,
                border: `1.5px solid ${C.border}`,
              }}>
                GOAL #{g.num}: {g.goal}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...S.tdLabel, width: "16%" }}>Success Metric</td>
              <td style={{ ...S.td0, width: "34%" }}>{g.metric}</td>
              <td style={{ ...S.tdLabel, width: "16%" }}>Current State</td>
              <td style={S.td0}>[Where am I now?]</td>
            </tr>
            <tr>
              <td style={S.tdLabelAlt}>Why This Goal?</td>
              <td colSpan={3} style={S.tdAlt}>[What changes if I achieve this? What&apos;s the cost of NOT doing it?]</td>
            </tr>
            <tr>
              <td style={S.tdLabel}>Month 1 Milestone</td>
              <td style={S.td0}>[Specific by Week 4]</td>
              <td style={S.tdLabel}>Month 2 Milestone</td>
              <td style={S.td0}>[Specific by Week 8]</td>
            </tr>
            <tr>
              <td style={S.tdLabelAlt}>Month 3 Milestone</td>
              <td style={S.tdAlt}>[Specific by Week 12]</td>
              <td style={S.tdLabelAlt}>Accountability</td>
              <td style={S.tdAlt}>[Who checks on me? When?]</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderWeeklyGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📅 12-WEEK PROGRESS GRID</td></tr></tbody></table>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Week</th>
            <th style={S.thSecondary}>Key Actions / Milestones</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>G1</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>G2</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>G3</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isMonthEnd = i === 3 || i === 7 || i === 11;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: isMonthEnd ? C.accent : C.primary }}>
                  {i + 1}{isMonthEnd ? " ★" : ""}
                </td>
                <td style={{ ...S.td0, backgroundColor: bg }}>
                  {i === 0 ? "[e.g., Set up project repos, onboarding flow wireframes]" : ""}&nbsp;
                </td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>/10</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>/10</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>/10</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "12px" }}>/10</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>AVG</td>
            <td style={S.td0}></td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderAccountability = () => (
    <div ref={accountRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🤝 ACCOUNTABILITY &amp; SCORING</td></tr></tbody></table>
      <CopyButton targetRef={accountRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Check-in</th>
            <th style={S.thPrimary}>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={S.tdLabel}>Weekly scoring day</td>
            <td style={S.td0}>[e.g., Every Sunday evening]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Accountability partner</td>
            <td style={S.tdAlt}>[Name + how you check in: call, text, meeting]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Month-end check-in dates</td>
            <td style={S.td0}>M1: [___] &nbsp;&nbsp; M2: [___] &nbsp;&nbsp; M3: [___]</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, fontWeight: 700, color: C.accent }}>Target weekly execution score</td>
            <td style={S.tdAlt}>≥ 8.5 / 10 &nbsp;&nbsp; (The 12-Week Year benchmark: 85%+ execution rate)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderRetro = () => (
    <div ref={retroRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🏁 90-DAY SPRINT RETROSPECTIVE</td></tr></tbody></table>
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
            { q: "Goals achieved vs. planned", a: "[___] / 3" },
            { q: "Average weekly execution score", a: "[___] / 10" },
            { q: "Proudest moment this sprint", a: "" },
            { q: "Biggest obstacle I overcame", a: "" },
            { q: "What I'd do differently next sprint", a: "" },
            { q: "Who helped me most and how?", a: "" },
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
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Next sprint&apos;s #1 goal</td>
            <td style={S.td0}>[What&apos;s the single most important thing for the next 90 days?]</td>
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

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}{renderGoals()}{renderWeeklyGrid()}
      <table style={LT}>
        <tbody><tr>
          <td style={{ ...LC, width: "50%", paddingRight: "10px" }}>{renderAccountability()}</td>
          <td style={{ ...LC, width: "50%", paddingLeft: "10px" }}>{renderRetro()}</td>
        </tr></tbody>
      </table>
      {renderFooter()}
    </>
  );

  const renderWeeklyLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderWeeklyGrid()}{renderAccountability()}{renderRetro()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">
            <Zap size={11} /> 90-Day Sprint
          </span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors">
            <ArrowLeft size={14} /> Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Zap size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">90-Day Goal Sprint</h2>
              <p className="text-xs font-medium text-amber-600">12 Weeks. 3 Goals. Total Focus. &mdash; Based on &quot;The 12-Week Year&quot;</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Break big goals into 12-week sprints with weekly scoring, monthly milestones,
            and accountability check-ins. Full Sprint shows goal cards + progress grid;
            Weekly Tracker focuses on the 12-week execution grid.
          </p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sprint View</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                  <Icon size={15} /> <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "weekly" && renderWeeklyLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function NinetyDayGoalSprintPage() {
  return (<ThemeProvider><NinetyDayContent /></ThemeProvider>);
}
