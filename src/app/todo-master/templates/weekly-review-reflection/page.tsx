"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  RotateCcw,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Deep retrospective", icon: LayoutDashboard },
  { id: "quick", label: "Quick Recap", desc: "5-minute version", icon: AlignJustify },
];

function WeeklyReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const winsRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);
  const sscRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const energyRef = useRef<HTMLDivElement>(null);
  const gratitudeRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

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
            🔄 WEEKLY REVIEW &amp; REFLECTION
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Reflect &bull; Learn &bull; Improve
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
            <td style={{ ...S.tdLabel, width: "16%" }}>Overall Rating</td>
            <td style={{ ...S.td0, width: "28%" }}>[___] / 10 &nbsp;&nbsp; ☐ Great ☐ Solid ☐ Mixed ☐ Tough</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Week&apos;s Theme Was</td>
            <td colSpan={2} style={S.tdAlt}>[What was the intention?]</td>
            <td style={S.tdLabelAlt}>Did I Honor It?</td>
            <td colSpan={2} style={S.tdAlt}>☐ Fully &nbsp;☐ Mostly &nbsp;☐ Somewhat &nbsp;☐ Not Really</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Wins (green) ── */
  const renderWins = () => (
    <div ref={winsRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={2} style={{
              backgroundColor: C.badgeGreenBg, color: C.badgeGreenFg,
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, letterSpacing: "0.02em",
              borderBottom: `3px solid ${C.badgeGreenFg}`,
              border: `1.5px solid ${C.border}`,
            }}>
              🏆 WINS &amp; ACCOMPLISHMENTS
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>★</th>
            <th style={S.thSecondary}>What went well this week?</th>
          </tr>
        </thead>
        <tbody>
          {[
            "[e.g., Delivered sprint demo ahead of schedule — team was energized]",
            "[e.g., Closed 2 vendor contracts saving $15K annually]",
            "[e.g., Had 4 consecutive deep work mornings — new personal best]",
            "[Add win]",
            "[Add win]",
            "[Add win]",
          ].map((text, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px", color: C.badgeGreenFg }}>★</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={winsRef} label="Copy Section" />
    </div>
  );

  /* ── Lessons & Challenges (amber) ── */
  const renderLessons = () => (
    <div ref={lessonsRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: C.badgeAmberBg, color: C.badgeAmberFg,
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, letterSpacing: "0.02em",
              borderBottom: `3px solid ${C.badgeAmberFg}`,
              border: `1.5px solid ${C.border}`,
            }}>
              💡 LESSONS &amp; CHALLENGES
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>What didn&apos;t go as planned?</th>
            <th style={{ ...S.thSecondary, width: "35%" }}>What I learned / would do differently</th>
          </tr>
        </thead>
        <tbody>
          {[
            { challenge: "[e.g., Wednesday meeting ran 45 min over — derailed afternoon]", lesson: "[Block buffer time after meetings]" },
            { challenge: "[e.g., Underestimated effort for budget proposal — worked late]", lesson: "[Add 30% padding to estimates]" },
            { challenge: "[e.g., Got pulled into 3 unplanned calls]", lesson: "[Set 'focus hours' on calendar]" },
            { challenge: "[Add challenge]", lesson: "" },
            { challenge: "[Add challenge]", lesson: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.badgeAmberFg }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.challenge}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px", fontStyle: "italic" as const }}>{row.lesson}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={lessonsRef} label="Copy Section" />
    </div>
  );

  /* ── Start / Stop / Continue ── */
  const renderSSC = () => (
    <div ref={sscRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔀 START / STOP / CONTINUE</div>
      <CopyButton targetRef={sscRef} label="Copy Section" />
      <table style={LT}>
        <tbody>
          <tr>
            {/* START column */}
            <td style={{ ...LC, width: "33.33%", paddingRight: "5px" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: C.badgeGreenBg, color: C.badgeGreenFg,
                      padding: "8px 12px", fontFamily: S.font, fontSize: "13px",
                      fontWeight: 800, border: `1.5px solid ${C.border}`,
                      textAlign: "center" as const,
                    }}>
                      🟢 START Doing
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {["[e.g., Morning planning ritual — 10 min]", "[e.g., Weekly 1:1 with mentor]", "[Add item]", "[Add item]"].map((t, i) => (
                    <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, height: "28px", fontSize: "12px" }}>{t}</td></tr>
                  ))}
                </tbody>
              </table>
            </td>
            {/* STOP column */}
            <td style={{ ...LC, width: "33.33%", paddingLeft: "3px", paddingRight: "3px" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: C.badgeRedBg, color: C.badgeRedFg,
                      padding: "8px 12px", fontFamily: S.font, fontSize: "13px",
                      fontWeight: 800, border: `1.5px solid ${C.border}`,
                      textAlign: "center" as const,
                    }}>
                      🔴 STOP Doing
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {["[e.g., Checking email first thing in AM]", "[e.g., Saying yes to non-essential meetings]", "[Add item]", "[Add item]"].map((t, i) => (
                    <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, height: "28px", fontSize: "12px" }}>{t}</td></tr>
                  ))}
                </tbody>
              </table>
            </td>
            {/* CONTINUE column */}
            <td style={{ ...LC, width: "33.33%", paddingLeft: "5px" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: C.badgeBlueBg, color: C.badgeBlueFg,
                      padding: "8px 12px", fontFamily: S.font, fontSize: "13px",
                      fontWeight: 800, border: `1.5px solid ${C.border}`,
                      textAlign: "center" as const,
                    }}>
                      🔵 CONTINUE Doing
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {["[e.g., Deep work blocks 8–11 AM daily]", "[e.g., Friday afternoon planning for next week]", "[Add item]", "[Add item]"].map((t, i) => (
                    <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, height: "28px", fontSize: "12px" }}>{t}</td></tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Goal Progress Check-in ── */
  const renderGoalProgress = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📊 GOAL PROGRESS CHECK-IN</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Weekly Goal</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Result</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { goal: "[Goal 1 from your Weekly Planner]", target: "[Metric]", result: "[Actual]", status: "Hit", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { goal: "[Goal 2]", target: "[Metric]", result: "[Actual]", status: "Partial", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { goal: "[Goal 3]", target: "[Metric]", result: "[Actual]", status: "Missed", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { goal: "[Goal 4]", target: "", result: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { goal: "[Goal 5]", target: "", result: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.goal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.result}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(row.sBg, row.sFg)}>{row.status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Energy & Wellbeing Audit ── */
  const renderEnergy = () => (
    <div ref={energyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>⚡ ENERGY &amp; WELLBEING AUDIT</div>
      <CopyButton targetRef={energyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "30%" }}>Dimension</th>
            <th style={{ ...S.thSecondary, textAlign: "center" as const }}>Mon</th>
            <th style={{ ...S.thSecondary, textAlign: "center" as const }}>Tue</th>
            <th style={{ ...S.thSecondary, textAlign: "center" as const }}>Wed</th>
            <th style={{ ...S.thSecondary, textAlign: "center" as const }}>Thu</th>
            <th style={{ ...S.thSecondary, textAlign: "center" as const }}>Fri</th>
            <th style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: C.accent }}>Avg</th>
          </tr>
        </thead>
        <tbody>
          {[
            "💪 Physical Energy",
            "🧠 Mental Clarity",
            "😊 Mood / Motivation",
            "😴 Sleep Quality",
            "⏱️ Work-Life Balance",
          ].map((dim, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px" }}>{dim}</td>
                {Array.from({ length: 5 }).map((_, j) => (
                  <td key={j} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>/10</td>
                ))}
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>[___]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Gratitude & Acknowledgment ── */
  const renderGratitude = () => (
    <div ref={gratitudeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🙏 GRATITUDE &amp; ACKNOWLEDGMENT</div>
      <CopyButton targetRef={gratitudeRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "50%" }}>I&apos;m grateful for...</th>
            <th style={S.thPrimary}>Person I want to thank / acknowledge</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, height: "32px" }}>{i === 0 ? "[e.g., My team stepped up during crunch time]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "32px" }}>{i === 0 ? "[e.g., Sarah — send a thank-you note]" : ""}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Next Week Setup ── */
  const renderNextWeek = () => (
    <div ref={nextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🚀 NEXT WEEK SETUP</div>
      <CopyButton targetRef={nextRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "40%" }}>Planning Item</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Top 3 priorities for next week</td>
            <td style={{ ...S.td0, height: "52px" }}>1.{"\n"}2.{"\n"}3.</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Carry-over tasks (unfinished)</td>
            <td style={{ ...S.tdAlt, height: "42px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Key meetings / deadlines</td>
            <td style={{ ...S.td0, height: "42px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, fontWeight: 700, color: C.accent }}>Next week&apos;s theme / intention</td>
            <td style={{ ...S.tdAlt, fontWeight: 600 }}>[One word or phrase to guide your week]</td>
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

  const renderFull = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Wins | Lessons */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "48%", paddingRight: "8px" }}>{renderWins()}</td>
            <td style={{ ...LC, width: "52%", paddingLeft: "8px" }}>{renderLessons()}</td>
          </tr>
        </tbody>
      </table>
      {renderSSC()}
      {renderGoalProgress()}
      {/* 2-col: Energy | Gratitude */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "58%", paddingRight: "10px" }}>{renderEnergy()}</td>
            <td style={{ ...LC, width: "42%", paddingLeft: "10px" }}>{renderGratitude()}</td>
          </tr>
        </tbody>
      </table>
      {renderNextWeek()}
      {renderFooter()}
    </>
  );

  const renderQuick = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderWins()}
      {renderLessons()}
      {renderSSC()}
      {renderNextWeek()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold">
            <RotateCcw size={11} />
            Retrospective
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <RotateCcw size={20} className="text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Weekly Review &amp; Reflection</h2>
              <p className="text-xs font-medium text-teal-600">Reflect &bull; Learn &bull; Improve &mdash; The Habit That Compounds</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            A structured weekly retrospective with wins, lessons, Start/Stop/Continue
            framework, goal progress scoring, energy tracking, and next-week setup.
            Full Review is comprehensive; Quick Recap is a 5-minute version.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Review Depth</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFull()}
          {layout === "quick" && renderQuick()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function WeeklyReviewReflectionPage() {
  return (
    <ThemeProvider>
      <WeeklyReviewContent />
    </ThemeProvider>
  );
}
