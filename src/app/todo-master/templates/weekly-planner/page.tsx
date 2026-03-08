"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  CalendarDays,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "grid" | "list";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "grid", label: "Grid View", desc: "7-day spread", icon: LayoutDashboard },
  { id: "list", label: "List View", desc: "Day-by-day stack", icon: AlignJustify },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyPlannerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("grid");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const apptRef = useRef<HTMLDivElement>(null);
  const deadlinesRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);

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
            📅 WEEKLY PLANNER
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Plan the Week, Own the Week
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
            <td style={{ ...S.tdLabel, width: "16%" }}>Weekly Theme</td>
            <td style={{ ...S.td0, width: "28%" }}>[e.g., Launch Sprint / Deep Work / Recovery]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Weekly Intention</td>
            <td colSpan={5} style={S.tdAlt}>[What does a successful week look like? Write one sentence that guides every decision this week.]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Weekly Goals (top 5) ── */
  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 WEEKLY GOALS</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Goal</th>
            <th style={{ ...S.thPrimary, width: "20%", textAlign: "center" as const }}>Key Result / Metric</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { goal: "[e.g., Complete Q3 budget proposal and get sponsor approval]", kr: "[Approved by Friday]" },
            { goal: "[e.g., Ship v2.1 feature branch to staging]", kr: "[All tests passing]" },
            { goal: "[e.g., Close 3 vendor contracts for procurement]", kr: "[3/3 signed]" },
            { goal: "[Add goal]", kr: "" },
            { goal: "[Add goal]", kr: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isExample = i < 3;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: isExample ? 600 : 400 }}>{row.goal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.kr}</td>
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

  /* ── 7-Day Grid (compact, each day gets a mini-table) ── */
  const renderDayMiniTable = (day: string, dayShort: string, isWeekend: boolean) => (
    <table style={S.tbl}>
      <thead>
        <tr>
          <td colSpan={2} style={{
            backgroundColor: isWeekend ? C.labelBgAlt : C.secondary,
            color: isWeekend ? C.primary : C.white,
            padding: "8px 10px", fontFamily: S.font, fontSize: "13px",
            fontWeight: 800, letterSpacing: "0.03em",
            border: `1.5px solid ${C.border}`,
          }}>
            {day}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ ...S.tdLabel, width: "30%", fontSize: "10px", padding: "5px 8px" }}>Top Priority</td>
          <td style={{ ...S.td0, fontSize: "11px", padding: "5px 8px" }}>&nbsp;</td>
        </tr>
        {Array.from({ length: 4 }).map((_, i) => {
          const bg = i % 2 === 0 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td colSpan={2} style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", padding: "4px 8px", height: "20px" }}>
                {i === 0 ? "☐ " : "☐ "}&nbsp;
              </td>
            </tr>
          );
        })}
        <tr>
          <td style={{ ...S.tdLabelAlt, fontSize: "10px", padding: "5px 8px" }}>Notes</td>
          <td style={{ ...S.tdAlt, fontSize: "11px", padding: "5px 8px", height: "24px" }}>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  );

  const renderGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📋 DAILY TASK GRID</div>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      {/* Row 1: Mon–Thu (2×2 grid) */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "25%", paddingRight: "5px", paddingBottom: "8px" }}>{renderDayMiniTable("Monday", "Mon", false)}</td>
            <td style={{ ...LC, width: "25%", paddingLeft: "3px", paddingRight: "3px", paddingBottom: "8px" }}>{renderDayMiniTable("Tuesday", "Tue", false)}</td>
            <td style={{ ...LC, width: "25%", paddingLeft: "3px", paddingRight: "3px", paddingBottom: "8px" }}>{renderDayMiniTable("Wednesday", "Wed", false)}</td>
            <td style={{ ...LC, width: "25%", paddingLeft: "5px", paddingBottom: "8px" }}>{renderDayMiniTable("Thursday", "Thu", false)}</td>
          </tr>
        </tbody>
      </table>
      {/* Row 2: Fri + Sat/Sun */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "25%", paddingRight: "5px" }}>{renderDayMiniTable("Friday", "Fri", false)}</td>
            <td style={{ ...LC, width: "25%", paddingLeft: "3px", paddingRight: "3px" }}>{renderDayMiniTable("Saturday", "Sat", true)}</td>
            <td style={{ ...LC, width: "25%", paddingLeft: "3px", paddingRight: "3px" }}>{renderDayMiniTable("Sunday", "Sun", true)}</td>
            <td style={{ ...LC, width: "25%", paddingLeft: "5px" }}>
              {/* Weekly wins mini-box */}
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: C.accent, color: C.white,
                      padding: "8px 10px", fontFamily: S.font, fontSize: "13px",
                      fontWeight: 800, border: `1.5px solid ${C.border}`,
                    }}>
                      🏆 Weekly Wins
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const bg = i % 2 === 0 ? C.white : C.rowAlt;
                    return (
                      <tr key={i}>
                        <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", padding: "4px 8px", height: "20px" }}>
                          {i === 0 ? "★ " : "★ "}&nbsp;
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Day-by-day list layout (alternative) ── */
  const renderDayListItem = (day: string, isWeekend: boolean) => (
    <div style={{ marginBottom: "8px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: isWeekend ? C.labelBgAlt : C.secondary,
              color: isWeekend ? C.primary : C.white,
              padding: "8px 14px", fontFamily: S.font, fontSize: "14px",
              fontWeight: 800, letterSpacing: "0.03em",
              border: `1.5px solid ${C.border}`,
            }}>
              {day}
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thSecondary}>Task</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  {i === 0 ? <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>High</span> : ""}
                </td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDayList = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📋 DAILY TASK LIST</div>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      {/* Weekdays in 2-col pairs */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderDayListItem("Monday", false)}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderDayListItem("Tuesday", false)}</td>
          </tr>
        </tbody>
      </table>
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderDayListItem("Wednesday", false)}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderDayListItem("Thursday", false)}</td>
          </tr>
        </tbody>
      </table>
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderDayListItem("Friday", false)}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>
              {renderDayListItem("Saturday", true)}
              {renderDayListItem("Sunday", true)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Appointments & Meetings ── */
  const renderAppointments = () => (
    <div ref={apptRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📆 APPOINTMENTS &amp; MEETINGS</div>
      <CopyButton targetRef={apptRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Day</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Time</th>
            <th style={S.thSecondary}>Meeting / Event</th>
            <th style={{ ...S.thSecondary, width: "20%" }}>Prep Needed</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {[
            { day: "Mon", time: "9:00 AM", event: "[e.g., Sprint Planning — Project Alpha]", prep: "[Review backlog]" },
            { day: "Tue", time: "2:00 PM", event: "[e.g., Stakeholder Update — Steering Committee]", prep: "[Update slides]" },
            { day: "Wed", time: "10:00 AM", event: "[e.g., 1:1 with Manager]", prep: "[Prep talking points]" },
            { day: "Thu", time: "3:00 PM", event: "[e.g., Vendor Demo — Platform Eval]", prep: "[List questions]" },
            { day: "", time: "", event: "[Add meeting]", prep: "" },
            { day: "", time: "", event: "[Add meeting]", prep: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary, fontSize: "12px" }}>{row.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.event}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.prep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Key Deadlines ── */
  const renderDeadlines = () => (
    <div ref={deadlinesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⏰ KEY DEADLINES THIS WEEK</div>
      <CopyButton targetRef={deadlinesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Due Date</th>
            <th style={S.thPrimary}>Deliverable</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {[
            { due: "Mon", item: "[e.g., Submit expense reports for Q2]", owner: "[You]", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
            { due: "Wed", item: "[e.g., Final draft of project proposal]", owner: "[You]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { due: "Fri", item: "[e.g., Sprint demo — v2.1 features]", owner: "[Team]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { due: "", item: "[Add deadline]", owner: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
            { due: "", item: "[Add deadline]", owner: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary, fontSize: "12px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span>
                </td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Next Week Prep ── */
  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔮 NEXT WEEK PREP</div>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "40%" }}>Question</th>
            <th style={S.thPrimary}>Answer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>What must get done next week?</td>
            <td style={{ ...S.td0, height: "42px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Any upcoming deadlines to prep for?</td>
            <td style={{ ...S.tdAlt, height: "42px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Meetings to schedule or cancel?</td>
            <td style={{ ...S.td0, height: "42px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, fontWeight: 700, color: C.accent }}>Next week&apos;s theme / intention</td>
            <td style={{ ...S.tdAlt, fontWeight: 600 }}>[One word or phrase that will guide your focus next week]</td>
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

  const renderGridLayout = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderGoals()}
      {renderGrid()}
      {/* 2-col: Appointments | Deadlines */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderAppointments()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderDeadlines()}</td>
          </tr>
        </tbody>
      </table>
      {renderPrep()}
      {renderFooter()}
    </>
  );

  const renderListLayout = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Goals | Deadlines */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderGoals()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderDeadlines()}</td>
          </tr>
        </tbody>
      </table>
      {renderDayList()}
      {renderAppointments()}
      {renderPrep()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
            <CalendarDays size={11} />
            Weekly Planner
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <CalendarDays size={20} className="text-sky-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Weekly Planner</h2>
              <p className="text-xs font-medium text-sky-600">Plan the Week, Own the Week &mdash; 7-Day Strategic Planning</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Week-at-a-glance planning with goals, daily task grids, appointments, deadlines,
            and next-week prep. Grid View shows all 7 days as compact mini-tables;
            List View pairs days side-by-side with fuller task rows.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Planner View</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "grid" && renderGridLayout()}
          {layout === "list" && renderListLayout()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function WeeklyPlannerPage() {
  return (
    <ThemeProvider>
      <WeeklyPlannerContent />
    </ThemeProvider>
  );
}
