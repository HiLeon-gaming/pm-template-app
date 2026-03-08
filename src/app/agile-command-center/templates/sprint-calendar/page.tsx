"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Calendar, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Calendar", desc: "Events + ceremonies + notes", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Events only", icon: AlignJustify },
];

function SprintCalendarContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const ceremoniesRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📅 SPRINT CALENDAR + KEY EVENTS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Sprint Planning &amp; Commitments</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint # — Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Dates</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD – MM/DD]</td></tr>
        <tr><td style={S.tdLabelAlt}>Team</td><td style={S.tdAlt}>[Team Name]</td><td style={S.tdLabelAlt}>Working Days</td><td style={S.tdAlt}>[10 days]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const dayColumn = (day: string, date: string, color: string, events: { time: string; event: string; type: string; tBg: string; tFg: string }[]) => (
    <table style={S.tbl}>
      <thead><tr><td style={{ backgroundColor: color, color: C.white, padding: "6px 8px", fontFamily: S.font, fontSize: "10px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{day}<br /><span style={{ fontSize: "9px", fontWeight: 600, opacity: 0.85 }}>{date}</span></td></tr></thead>
      <tbody>
        {events.map((e, i) => (
          <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "9px", padding: "4px 6px" }}>
            <span style={{ fontWeight: 700, color: accent }}>{e.time}</span> {e.event}
            {e.type && <><br /><span style={S.badge(e.tBg, e.tFg)}>{e.type}</span></>}
          </td></tr>
        ))}
      </tbody>
    </table>
  );

  const renderCalendar = () => (
    <div ref={calendarRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📅 WEEK 1</div>
      <CopyButton targetRef={calendarRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { day: "MON", date: "[MM/DD]", color: accentDark, events: [
            { time: "9:00", event: "Sprint Planning", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "10:30", event: "Dev work begins", type: "", tBg: "", tFg: "" },
          ]},
          { day: "TUE", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "All day", event: "Dev + QA work", type: "", tBg: "", tFg: "" },
          ]},
          { day: "WED", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "2:00", event: "Refinement", type: "Ceremony", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg },
          ]},
          { day: "THU", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "All day", event: "Dev + QA work", type: "", tBg: "", tFg: "" },
          ]},
          { day: "FRI", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "3:00", event: "Stakeholder sync", type: "Meeting", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg },
          ]},
        ].map((d, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 2px 0 0" : "0" }}>
            {dayColumn(d.day, d.date, d.color, d.events)}
          </td>
        ))}
      </tr></tbody></table>

      <div style={{ ...S.sectionBanner(accentDark), marginTop: "8px" }}>📅 WEEK 2</div>
      <table style={LT}><tbody><tr>
        {[
          { day: "MON", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "All day", event: "Dev + QA work", type: "", tBg: "", tFg: "" },
          ]},
          { day: "TUE", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "2:00", event: "Refinement", type: "Ceremony", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg },
          ]},
          { day: "WED", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "All day", event: "Feature freeze / QA", type: "Milestone", tBg: C.badgeRedBg, tFg: C.badgeRedFg },
          ]},
          { day: "THU", date: "[MM/DD]", color: accent, events: [
            { time: "9:15", event: "Daily Scrum", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "2:00", event: "Sprint Review / Demo", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
          ]},
          { day: "FRI", date: "[MM/DD]", color: accentDark, events: [
            { time: "9:30", event: "Retrospective", type: "Ceremony", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { time: "11:00", event: "Cleanup + prep", type: "", tBg: "", tFg: "" },
          ]},
        ].map((d, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 2px 0 0" : "0" }}>
            {dayColumn(d.day, d.date, d.color, d.events)}
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderCeremonies = () => (
    <div ref={ceremoniesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🔄 CEREMONY SCHEDULE</div>
      <CopyButton targetRef={ceremoniesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Ceremony</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>When</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Duration</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Facilitator</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Attendees</th>
        </tr></thead>
        <tbody>
          {[
            { cer: "Sprint Planning", when: "Day 1, 9:00 AM", dur: "90 min", fac: "[SM]", att: "[Full Scrum Team]" },
            { cer: "Daily Scrum", when: "Daily, 9:15 AM", dur: "15 min", fac: "[Team]", att: "[Dev Team + SM]" },
            { cer: "Backlog Refinement", when: "Wed, 2:00 PM", dur: "45 min", fac: "[PO]", att: "[Full Scrum Team]" },
            { cer: "Sprint Review / Demo", when: "Day 9, 2:00 PM", dur: "60 min", fac: "[PO]", att: "[Team + Stakeholders]" },
            { cer: "Sprint Retrospective", when: "Day 10, 9:30 AM", dur: "60 min", fac: "[SM]", att: "[Scrum Team only]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.cer}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: accent }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.fac}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.att}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📝 KEY DATES &amp; NOTES</div>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Feature Freeze</td><td style={S.td0}>[Wed Week 2 — no new code after this; QA only]</td></tr>
        <tr><td style={S.tdLabelAlt}>Release Date</td><td style={S.tdAlt}>[If applicable — MM/DD]</td></tr>
        <tr><td style={S.tdLabel}>Team PTO</td><td style={S.td0}>[Dev 2 out Mon-Tue Week 1; QA out Mon Week 2]</td></tr>
        <tr><td style={S.tdLabelAlt}>External Milestones</td><td style={S.tdAlt}>[e.g., Vendor sandbox available by Wed Week 1]</td></tr>
        <tr><td style={S.tdLabel}>Notes</td><td style={{ ...S.td0, height: "36px" }}>[Any other important dates, holidays, or scheduling notes]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Calendar size={11} />Calendar</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Calendar size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Calendar + Key Events</h2><p className="text-xs font-medium text-emerald-600">Ceremonies, Demos, Release Dates &amp; Stakeholder Check-ins</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Two-week calendar view with all ceremonies, milestones, and key dates. Prevents scheduling surprises.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderCalendar()}{renderCeremonies()}{renderNotes()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderCalendar()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintCalendarPage() { return <ThemeProvider><SprintCalendarContent /></ThemeProvider>; }
