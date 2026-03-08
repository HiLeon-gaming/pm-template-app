"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Brain,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "dashboard" | "log-only";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Full Dashboard", desc: "Metrics + session log", icon: LayoutDashboard },
  { id: "log-only", label: "Session Log", desc: "Compact tracker", icon: AlignJustify },
];

function FocusSessionContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("dashboard");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const sessionsRef = useRef<HTMLDivElement>(null);
  const distractionsRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  /* ── Layout table styles ── */
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

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
            🧠 FOCUS SESSION TRACKER
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Deep Work, Tracked
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "22%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Session Length</td>
            <td style={{ ...S.td0, width: "12%" }}>☐ 25 min &nbsp;☐ 50 min</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Break Length</td>
            <td style={{ ...S.td0, width: "22%" }}>☐ 5 min &nbsp;☐ 10 min &nbsp;☐ 15 min</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Focus Goal</td>
            <td colSpan={5} style={S.tdAlt}>[What is your primary deep-work objective today? Be specific.]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Daily Metrics Dashboard ── */
  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 DAILY FOCUS DASHBOARD</div>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "40%" }}>Metric</th>
            <th style={{ ...S.thPrimary, width: "20%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thPrimary, width: "20%", textAlign: "center" as const }}>Actual</th>
            <th style={{ ...S.thPrimary, width: "20%", textAlign: "center" as const }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {[
            { metric: "🎯 Focus sessions completed", target: "[6–8]", actual: "[___]", score: "[___] / 10" },
            { metric: "⏱️ Total deep work time", target: "[3–4 hrs]", actual: "[___] hrs", score: "" },
            { metric: "🚫 Distractions logged", target: "[< 5]", actual: "[___]", score: "" },
            { metric: "✅ Focus tasks completed", target: "[___]", actual: "[___]", score: "" },
            { metric: "💪 Longest unbroken session", target: "[50 min]", actual: "[___] min", score: "" },
            { metric: "📈 Overall focus quality", target: "", actual: "", score: "[___] / 10" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isLast = i === 5;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: isLast ? 800 : 600, color: isLast ? C.accent : C.primary }}>{row.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: row.score ? 700 : 400 }}>{row.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Session Log ── */
  const renderSessions = () => (
    <div ref={sessionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>⏱️ SESSION LOG</div>
      <CopyButton targetRef={sessionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>
        Log each focus session. Rate quality 1–10 after each one. Take a break between sessions!
      </p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Start</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>End</th>
            <th style={S.thSecondary}>Task / Focus Area</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Dist.</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Quality</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Done?</th>
          </tr>
        </thead>
        <tbody>
          {[
            { n: 1, start: "8:00", end: "8:25", task: "[e.g., Write API documentation — Section 2]", dist: "1", quality: "8/10", done: "☑" },
            { n: 2, start: "8:30", end: "8:55", task: "[e.g., Review PR #142 — auth module]", dist: "0", quality: "9/10", done: "☑" },
            { n: 3, start: "9:05", end: "9:30", task: "[e.g., Draft Q3 budget proposal — revenue section]", dist: "2", quality: "6/10", done: "☐" },
            ...Array.from({ length: 7 }).map((_, j) => ({
              n: j + 4, start: "", end: "", task: "", dist: "", quality: "/10", done: "☐",
            })),
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isExample = i < 3;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary }}>{row.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>{row.start}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>{row.end}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.task}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: isExample && row.dist !== "0" ? C.badgeAmberFg : C.textBody }}>{row.dist}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{row.quality}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>{row.done}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Distraction Log ── */
  const renderDistractions = () => (
    <div ref={distractionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🚫 DISTRACTION LOG</div>
      <CopyButton targetRef={distractionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>
        Every time you get distracted, log it. Patterns reveal what to fix.
      </p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Time</th>
            <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Type</th>
            <th style={S.thSecondary}>What Happened</th>
            <th style={{ ...S.thSecondary, width: "22%" }}>Prevention Strategy</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: "8:12", type: "Internal", what: "[e.g., Started thinking about lunch plans]", fix: "[Write it down, refocus]" },
            { time: "9:15", type: "External", what: "[e.g., Slack notification from #general]", fix: "[Mute channel during focus]" },
            { time: "9:22", type: "External", what: "[e.g., Coworker stopped by desk]", fix: "[Use 'focus' sign on desk]" },
            ...Array.from({ length: 5 }).map(() => ({ time: "", type: "", what: "", fix: "" })),
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isExample = i < 3;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  {isExample ? (
                    <span style={S.badge(row.type === "Internal" ? C.badgeAmberBg : C.badgeRedBg, row.type === "Internal" ? C.badgeAmberFg : C.badgeRedFg)}>
                      {row.type}
                    </span>
                  ) : (
                    <span style={{ fontSize: "10px", color: C.textMuted }}>☐ Int &nbsp;☐ Ext</span>
                  )}
                </td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.what}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{row.fix}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Streak & Weekly Trend ── */
  const renderStreak = () => (
    <div ref={streakRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔥 FOCUS STREAK &amp; WEEKLY TREND</div>
      <CopyButton targetRef={streakRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Mon</th>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Tue</th>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Wed</th>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Thu</th>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Fri</th>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Sat</th>
            <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Sun</th>
            <th style={{ ...S.thPrimary, textAlign: "center" as const, backgroundColor: C.accent }}>Avg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={8} style={{ ...S.td0, fontWeight: 700, color: C.primary, fontSize: "11px" }}>Sessions Completed</td>
          </tr>
          <tr>
            {Array.from({ length: 7 }).map((_, i) => (
              <td key={i} style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "18px", fontWeight: 700 }}>&nbsp;</td>
            ))}
            <td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]</td>
          </tr>
          <tr>
            <td colSpan={8} style={{ ...S.td0, fontWeight: 700, color: C.primary, fontSize: "11px" }}>Focus Quality (1-10)</td>
          </tr>
          <tr>
            {Array.from({ length: 7 }).map((_, i) => (
              <td key={i} style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "14px" }}>/10</td>
            ))}
            <td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]</td>
          </tr>
          <tr>
            <td colSpan={8} style={{ ...S.td0, fontWeight: 700, color: C.primary, fontSize: "11px" }}>Total Deep Work (hrs)</td>
          </tr>
          <tr>
            {Array.from({ length: 7 }).map((_, i) => (
              <td key={i} style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "14px" }}>&nbsp;</td>
            ))}
            <td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── End-of-Day Review ── */
  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🌅 FOCUS REVIEW &amp; OPTIMIZATION</div>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "40%" }}>Reflection</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>When was my peak focus today?</td>
            <td style={{ ...S.td0, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Biggest distraction pattern</td>
            <td style={{ ...S.tdAlt, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>What environment helped most?</td>
            <td style={{ ...S.td0, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>One thing to change tomorrow</td>
            <td style={{ ...S.tdAlt, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Focus streak (consecutive good days)</td>
            <td style={{ ...S.td0, fontWeight: 700 }}>[___] days &nbsp;&nbsp; Personal best: [___] days</td>
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

  const renderDashboard = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Metrics | Streak */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "10px" }}>{renderMetrics()}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "10px" }}>{renderStreak()}</td>
          </tr>
        </tbody>
      </table>
      {renderSessions()}
      {/* 2-col: Distractions | Review */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "52%", paddingRight: "10px" }}>{renderDistractions()}</td>
            <td style={{ ...LC, width: "48%", paddingLeft: "10px" }}>{renderReview()}</td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  const renderLogOnly = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderMetrics()}
      {renderSessions()}
      {renderDistractions()}
      {renderReview()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
            <Brain size={11} />
            Deep Work
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Brain size={20} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Focus Session Tracker</h2>
              <p className="text-xs font-medium text-purple-600">Deep Work, Tracked &mdash; Pomodoro-Style Session Management</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Track every focus session with precision. Log distractions to find patterns,
            score your focus quality, and build a streak of productive days. Full Dashboard
            mode includes weekly trends; Session Log mode is a compact daily tracker.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tracker Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "dashboard" && renderDashboard()}
          {layout === "log-only" && renderLogOnly()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function FocusSessionTrackerPage() {
  return (
    <ThemeProvider>
      <FocusSessionContent />
    </ThemeProvider>
  );
}
