"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Gauge,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "dashboard" | "timeline";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", desc: "Dense 2-column overview", icon: LayoutDashboard },
  { id: "timeline", label: "Timeline", desc: "Day-by-day flow", icon: AlignJustify },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeekDashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("dashboard");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const capacityRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const deadlinesRef = useRef<HTMLDivElement>(null);
  const delegatedRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);

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
            📊 WEEK-AT-A-GLANCE DASHBOARD
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; See the Whole Week at Once
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
            <td style={{ ...S.tdLabel, width: "16%" }}>Week Type</td>
            <td style={{ ...S.td0, width: "28%" }}>☐ Sprint ☐ Normal ☐ Light ☐ Crunch</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Capacity Meter ── */
  const renderCapacity = () => (
    <div ref={capacityRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚡ CAPACITY METER</div>
      <CopyButton targetRef={capacityRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "28%" }}>Resource</th>
            <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Available</th>
            <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Committed</th>
            <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Remaining</th>
            <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Load</th>
          </tr>
        </thead>
        <tbody>
          {[
            { resource: "⏰ Total Work Hours", avail: "40 hrs", committed: "[___] hrs", remaining: "[___] hrs" },
            { resource: "🧠 Deep Work Blocks", avail: "10–15 hrs", committed: "[___] hrs", remaining: "[___] hrs" },
            { resource: "📅 Meeting Hours", avail: "[___] hrs", committed: "[___] hrs", remaining: "[___] hrs" },
            { resource: "📧 Admin / Email", avail: "5–8 hrs", committed: "[___] hrs", remaining: "[___] hrs" },
            { resource: "🏠 Personal / Buffer", avail: "[___] hrs", committed: "[___] hrs", remaining: "[___] hrs" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, color: C.primary, fontSize: "12px" }}>{row.resource}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.avail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.committed}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.remaining}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={{ fontSize: "10px", color: C.textMuted }}>☐ Under ☐ Right ☐ Over</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Overall capacity bar */}
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "28%", fontWeight: 700, color: C.accent }}>Overall Week Capacity</td>
            <td style={S.td0}>
              ☐ Under-loaded (room for more) &nbsp;&nbsp; ☐ Balanced &nbsp;&nbsp; ☐ Heavy &nbsp;&nbsp; ☐ Overloaded (must cut/delegate)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Daily Priorities Matrix (5-day compact grid) ── */
  const renderPriorities = () => (
    <div ref={prioritiesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🎯 DAILY PRIORITIES AT A GLANCE</td></tr></tbody></table>
      <CopyButton targetRef={prioritiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Day</th>
            <th style={S.thSecondary}>#1 Must-Do</th>
            <th style={{ ...S.thSecondary, width: "30%" }}>#2 Should-Do</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Energy</th>
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={day}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary, fontSize: "12px" }}>{day}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{i === 0 ? "[e.g., Finalize budget proposal]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{i === 0 ? "[e.g., Send status update]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>
                  {i === 0 ? "🔋 High" : i === 4 ? "🪫 Low" : ""}&nbsp;
                </td>
              </tr>
            );
          })}
          {/* Weekend mini-row */}
          <tr>
            <td style={{ ...S.td0, backgroundColor: C.labelBg, textAlign: "center" as const, fontWeight: 600, color: C.textMuted, fontSize: "11px" }}>Sat/Sun</td>
            <td colSpan={2} style={{ ...S.td0, backgroundColor: C.labelBg, fontSize: "12px", fontStyle: "italic" as const }}>[Rest / Personal / Light prep for next week]</td>
            <td style={{ ...S.td0, backgroundColor: C.labelBg, textAlign: "center" as const, fontSize: "11px" }}>🔋 Recharge</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Meeting & Calendar Overview ── */
  const renderCalendar = () => (
    <div ref={calendarRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📅 MEETING &amp; CALENDAR OVERVIEW</td></tr></tbody></table>
      <CopyButton targetRef={calendarRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Day</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Time</th>
            <th style={S.thSecondary}>Meeting / Event</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Duration</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {[
            { day: "Mon", time: "9:00", event: "[e.g., Team standup]", dur: "15 min", type: "Recurring" },
            { day: "Mon", time: "10:00", event: "[e.g., Sprint planning]", dur: "1 hr", type: "Workshop" },
            { day: "Tue", time: "2:00", event: "[e.g., Stakeholder update]", dur: "30 min", type: "Reporting" },
            { day: "Wed", time: "11:00", event: "[e.g., Design review]", dur: "45 min", type: "Review" },
            { day: "Thu", time: "1:00", event: "[e.g., 1:1 with Manager]", dur: "30 min", type: "1:1" },
            { day: "Fri", time: "3:00", event: "[e.g., Sprint demo]", dur: "1 hr", type: "Demo" },
            { day: "", time: "", event: "[Add meeting]", dur: "", type: "" },
            { day: "", time: "", event: "[Add meeting]", dur: "", type: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isExample = i < 6;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary, fontSize: "11px" }}>{row.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.event}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  {isExample && row.type ? <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>{row.type}</span> : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Meeting load summary */}
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "20%", fontSize: "11px" }}>Total Meetings</td>
            <td style={{ ...S.td0, width: "13%", textAlign: "center" as const }}>[___]</td>
            <td style={{ ...S.tdLabel, width: "20%", fontSize: "11px" }}>Total Meeting Hours</td>
            <td style={{ ...S.td0, width: "13%", textAlign: "center" as const }}>[___] hrs</td>
            <td style={{ ...S.tdLabel, width: "20%", fontSize: "11px" }}>Meeting-Free Blocks</td>
            <td style={{ ...S.td0, textAlign: "center" as const }}>[___]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Key Deadlines & Deliverables ── */
  const renderDeadlines = () => (
    <div ref={deadlinesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⏰ KEY DEADLINES &amp; DELIVERABLES</div>
      <CopyButton targetRef={deadlinesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due</th>
            <th style={S.thPrimary}>Deliverable</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { due: "Mon", item: "[e.g., Expense reports due]", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg, stat: "Not Started", statBg: C.badgeGrayBg, statFg: C.badgeGrayFg },
            { due: "Wed", item: "[e.g., Project proposal final draft]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg, stat: "In Progress", statBg: C.badgeBlueBg, statFg: C.badgeBlueFg },
            { due: "Thu", item: "[e.g., Vendor evaluation scorecard]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg, stat: "Not Started", statBg: C.badgeGrayBg, statFg: C.badgeGrayFg },
            { due: "Fri", item: "[e.g., Sprint demo ready]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg, stat: "In Progress", statBg: C.badgeBlueBg, statFg: C.badgeBlueFg },
            { due: "", item: "[Add deadline]", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg, stat: "—", statBg: C.badgeGrayBg, statFg: C.badgeGrayFg },
            { due: "", item: "[Add deadline]", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg, stat: "—", statBg: C.badgeGrayBg, statFg: C.badgeGrayFg },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary, fontSize: "12px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span>
                </td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(row.statBg, row.statFg)}>{row.stat}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Delegated / Waiting On ── */
  const renderDelegated = () => (
    <div ref={delegatedRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>👋 DELEGATED &amp; WAITING ON</td></tr></tbody></table>
      <CopyButton targetRef={delegatedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thSecondary}>Item</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Delegated To</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Follow-up</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "[e.g., Risk assessment — need input from security team]", to: "[Security Lead]", due: "Wed", follow: "Tue check-in" },
            { item: "[e.g., Design mockups for Feature Y]", to: "[UX Designer]", due: "Thu", follow: "Wed review" },
            { item: "[Add item]", to: "", due: "", follow: "" },
            { item: "[Add item]", to: "", due: "", follow: "" },
            { item: "[Add item]", to: "", due: "", follow: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{row.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.follow}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Weekly KPIs / Metrics ── */
  const renderKPIs = () => (
    <div ref={kpiRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📈 WEEKLY KPIs &amp; METRICS</div>
      <CopyButton targetRef={kpiRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary}>KPI / Metric</th>
            <th style={{ ...S.thPrimary, width: "16%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thPrimary, width: "16%", textAlign: "center" as const }}>Actual</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Trend</th>
          </tr>
        </thead>
        <tbody>
          {[
            { kpi: "[e.g., Tasks completed]", target: "[15]", actual: "[___]" },
            { kpi: "[e.g., Deep work hours]", target: "[12 hrs]", actual: "[___]" },
            { kpi: "[e.g., Meetings attended]", target: "[< 10]", actual: "[___]" },
            { kpi: "[e.g., Response time (emails)]", target: "[< 4 hrs]", actual: "[___]" },
            { kpi: "[Add KPI]", target: "", actual: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.kpi}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={{ fontSize: "10px", color: C.textMuted }}>☐ ↑ ☐ → ☐ ↓</span>
                </td>
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

  const renderDashboardLayout = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Capacity | Priorities */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "52%", paddingRight: "10px" }}>{renderCapacity()}</td>
            <td style={{ ...LC, width: "48%", paddingLeft: "10px" }}>{renderPriorities()}</td>
          </tr>
        </tbody>
      </table>
      {/* 2-col: Calendar | Deadlines */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderCalendar()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderDeadlines()}</td>
          </tr>
        </tbody>
      </table>
      {/* 2-col: Delegated | KPIs */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderDelegated()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderKPIs()}</td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  const renderTimelineLayout = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderCapacity()}
      {renderPriorities()}
      {renderCalendar()}
      {renderDeadlines()}
      {renderDelegated()}
      {renderKPIs()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/20">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
            <Gauge size={11} />
            Command View
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
              <Gauge size={20} className="text-rose-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Week-at-a-Glance Dashboard</h2>
              <p className="text-xs font-medium text-rose-600">See the Whole Week at Once &mdash; Capacity, Meetings, Deadlines, KPIs</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            A dense executive dashboard showing your entire week: capacity meter,
            daily priorities, meeting calendar, deadlines, delegated items, and KPI tracking.
            Dashboard mode uses 2-column pairs; Timeline mode stacks everything for quick scanning.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "dashboard" && renderDashboardLayout()}
          {layout === "timeline" && renderTimelineLayout()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function WeekAtAGlanceDashboardPage() {
  return (
    <ThemeProvider>
      <WeekDashboardContent />
    </ThemeProvider>
  );
}
