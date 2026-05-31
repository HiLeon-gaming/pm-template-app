"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Gauge,
  LayoutDashboard,
  AlignJustify,
  Zap,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "dashboard" | "compact";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Mission Control", desc: "2-column dashboard", icon: LayoutDashboard },
  { id: "compact", label: "Compact View", desc: "Single column", icon: AlignJustify },
];

function CommandDashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("dashboard");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sprintRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const blockersRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#0EA5E9";
  const accentDark = "#0369A1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "16px 20px",
            fontSize: "22px", fontWeight: 800, fontFamily: S.font,
            letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`,
            textAlign: "center" as const,
          }}>
            🎯 AGILE / SCRUM COMMAND DASHBOARD
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; One Page to Rule Them All
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Product / Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Product Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Sprint #</td>
            <td style={{ ...S.td0, width: "36%" }}>[Sprint ##] — [Start Date] to [End Date]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Scrum Master</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Product Owner</td>
            <td style={S.tdAlt}>[Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Sprint Day</td>
            <td style={S.td0}>[Day X of Y]</td>
            <td style={S.tdLabel}>Last Updated</td>
            <td style={S.td0}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Sprint Goal & Commitment ── */
  const renderSprint = () => (
    <div ref={sprintRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🏁 SPRINT GOAL &amp; COMMITMENT</td></tr></tbody></table>
      <CopyButton targetRef={sprintRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Sprint Goal</td>
            <td style={{ ...S.td0, fontWeight: 700, height: "40px" }}>[e.g., Complete checkout flow v2 and deliver API integration for payment gateway]</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Success = Done When</td>
            <td style={{ ...S.tdAlt, height: "40px" }}>[e.g., All 5 checkout stories accepted by PO; payment API passes integration tests; demo-ready Friday]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Stories Committed</td>
            <td style={S.td0}>
              <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[8 stories]</span> &nbsp;
              <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>[34 pts]</span> &nbsp;
              <span style={{ fontSize: "11px" }}>Capacity: [38 pts available]</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Top Priorities ── */
  const renderPriorities = () => (
    <div ref={prioritiesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ TOP PRIORITIES RIGHT NOW</td></tr></tbody></table>
      <CopyButton targetRef={prioritiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Priority / Story</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { pri: "[Complete payment API integration — blocking checkout flow]", owner: "[Dev Lead]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { pri: "[Fix cart total calculation bug — found in QA]", owner: "[Dev A]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { pri: "[Finish UX polish on checkout confirmation page]", owner: "[Designer]", status: "Ready", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { pri: "[Write acceptance tests for 3 remaining stories]", owner: "[QA]", status: "Queued", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { pri: "[Add priority]", owner: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.pri}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(r.sBg, r.sFg)}>{r.status}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Active Blockers ── */
  const renderBlockers = () => (
    <div ref={blockersRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>🚨 ACTIVE BLOCKERS &amp; IMPEDIMENTS</td></tr></tbody></table>
      <CopyButton targetRef={blockersRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Blocker</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Severity</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Age</th>
            <th style={{ ...S.thSecondary, width: "22%" }}>Next Step</th>
          </tr>
        </thead>
        <tbody>
          {[
            { b: "[Payment gateway sandbox credentials not yet provided by vendor]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, age: "2 days", next: "[Escalated to vendor PM — ETA tomorrow]" },
            { b: "[Staging environment disk space at 95%]", sev: "Med", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, age: "1 day", next: "[Infra team expanding — ticket #4521]" },
            { b: "[No active blockers beyond above]", sev: "—", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg, age: "—", next: "[Continue monitoring daily]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.b}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.age}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.next}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Sprint Metrics Snapshot ── */
  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 SPRINT METRICS SNAPSHOT</td></tr></tbody></table>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={LT}>
        <tbody>
          <tr>
            {/* Metric cards — 4 across */}
            {[
              { label: "Stories Done", value: "[4/8]", pct: "50%", color: C.badgeGreenBg, fg: C.badgeGreenFg },
              { label: "Points Done", value: "[18/34]", pct: "53%", color: C.badgeBlueBg, fg: C.badgeBlueFg },
              { label: "Blockers Active", value: "[2]", pct: "", color: C.badgeRedBg, fg: C.badgeRedFg },
              { label: "Sprint Day", value: "[6/10]", pct: "60%", color: C.badgeAmberBg, fg: C.badgeAmberFg },
            ].map((m, i) => (
              <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
                <table style={S.tbl}>
                  <tbody>
                    <tr>
                      <td style={{
                        backgroundColor: m.color, color: m.fg, padding: "6px 10px",
                        fontFamily: S.font, fontSize: "10px", fontWeight: 700,
                        border: `1.5px solid ${C.border}`, textAlign: "center" as const,
                        letterSpacing: "0.04em", textTransform: "uppercase" as const,
                      }}>
                        {m.label}
                      </td>
                    </tr>
                    <tr>
                      <td style={{
                        ...S.td0, textAlign: "center" as const, fontWeight: 800,
                        fontSize: "18px", padding: "10px 8px", color: C.primary,
                      }}>
                        {m.value}
                        {m.pct && <span style={{ fontSize: "11px", fontWeight: 500, marginLeft: "6px", color: C.textMuted }}>{m.pct}</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Key Events This Sprint ── */
  const renderEvents = () => (
    <div ref={eventsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📅 KEY EVENTS THIS SPRINT</td></tr></tbody></table>
      <CopyButton targetRef={eventsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Day</th>
            <th style={S.thSecondary}>Event</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Time</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {[
            { day: "Mon", event: "Sprint Planning", time: "9:00 AM", done: false },
            { day: "Daily", event: "Daily Scrum / Standup", time: "9:15 AM", done: false },
            { day: "Wed", event: "Backlog Refinement", time: "2:00 PM", done: false },
            { day: "Thu", event: "Stakeholder Check-in", time: "3:00 PM", done: false },
            { day: "Fri", event: "Sprint Review / Demo", time: "10:00 AM", done: false },
            { day: "Fri", event: "Sprint Retrospective", time: "11:00 AM", done: false },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.primary, fontSize: "12px" }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{r.event}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Sprint Health RAG ── */
  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🩺 SPRINT HEALTH (RAG)</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "30%" }}>Signal</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
            <th style={S.thPrimary}>Evidence / Notes</th>
          </tr>
        </thead>
        <tbody>
          {[
            { signal: "Scope stability", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[No scope changes this sprint — commitment is holding]" },
            { signal: "Capacity & availability", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[1 dev out Wed–Thu for training; covered by pair]" },
            { signal: "Blocker severity", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Vendor API credentials pending — workaround in place]" },
            { signal: "Quality signals", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[0 defects escaped to staging; code review 100%]" },
            { signal: "Team morale", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Team engaged; retro actions from last sprint implemented]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px" }}>{r.signal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = On Track &nbsp;|&nbsp; 🟡 = Watch &nbsp;|&nbsp; 🔴 = At Risk</p>
    </div>
  );

  /* ── Quick Notes ── */
  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📝 QUICK NOTES &amp; DECISIONS</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, height: "24px", fontSize: "11px" }}>
                  {i === 0 ? "[e.g., PO confirmed checkout copy changes can wait until Sprint 8]" : ""}&nbsp;
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
            ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ═══════ LAYOUTS ═══════ */

  const renderDashboardLayout = () => (
    <>
      {renderTitleBanner()}
      {renderHeader()}
      {renderSprint()}
      {renderMetrics()}
      {/* 2-col: Priorities | Blockers */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderPriorities()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderBlockers()}</td>
          </tr>
        </tbody>
      </table>
      {/* 2-col: Health | Events */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderHealth()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderEvents()}</td>
          </tr>
        </tbody>
      </table>
      {renderNotes()}
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>
      {renderTitleBanner()}
      {renderHeader()}
      {renderSprint()}
      {renderMetrics()}
      {renderPriorities()}
      {renderBlockers()}
      {renderHealth()}
      {renderEvents()}
      {renderNotes()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">
            <Zap size={11} />
            ⭐ All-Star
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors">
            <ArrowLeft size={14} />
            Back to Agile Command Center
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <Gauge size={20} className="text-sky-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Agile / Scrum Command Dashboard</h2>
              <p className="text-xs font-medium text-sky-600">⭐ All-Star &mdash; One Page to Rule Them All</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Your sprint mission control: goal, priorities, blockers, metrics, health signals, and key events — all on one page.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dashboard View</p>
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
          {layout === "dashboard" && renderDashboardLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function CommandDashboardPage() {
  return (
    <ThemeProvider>
      <CommandDashboardContent />
    </ThemeProvider>
  );
}
