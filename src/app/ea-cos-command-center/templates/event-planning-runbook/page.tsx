"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CalendarDays, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Runbook", desc: "Timeline + vendors + agenda + logistics", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Event details + agenda only", icon: AlignJustify },
];

function EventPlanningContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>EVENT PLANNING RUNBOOK</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Travel, Events &amp; Logistics</td></tr>
    </tbody></table>
  );

  const renderDetails = () => (
    <div ref={detailsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>EVENT OVERVIEW</td></tr></tbody></table>
      <CopyButton targetRef={detailsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Event Name</td><td style={{ ...S.td0, fontWeight: 700, fontSize: "13px" }}>[Event Title]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date &amp; Time</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[MM/DD/YYYY — Start: HH:MM — End: HH:MM]</td></tr>
        <tr><td style={S.tdLabel}>Venue</td><td style={S.td0}>[Venue name, address, room/suite]</td></tr>
        <tr><td style={S.tdLabelAlt}>Event Type</td><td style={S.tdAlt}>[Offsite / Town Hall / Client Dinner / Board Meeting / Conference]</td></tr>
        <tr><td style={S.tdLabel}>Expected Attendees</td><td style={S.td0}>[Number] — [Key VIPs listed]</td></tr>
        <tr><td style={S.tdLabelAlt}>Budget</td><td style={S.tdAlt}>[Total budget / Cost center]</td></tr>
        <tr><td style={S.tdLabel}>Event Lead</td><td style={S.td0}>[Name / Role]</td></tr>
      </tbody></table>
    </div>
  );

  const renderTimeline = () => (
    <div ref={timelineRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>PLANNING TIMELINE &amp; VENDORS</td></tr></tbody></table>
      <CopyButton targetRef={timelineRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due Date</th>
          <th style={S.thPrimary}>Task</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Vendor / Contact</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { date: "T-30 days", task: "[Book venue + confirm capacity]", owner: "[EA]", vendor: "[Venue manager]", done: true },
            { date: "T-21 days", task: "[Send invitations + RSVP tracking]", owner: "[EA]", vendor: "[Evite / email]", done: true },
            { date: "T-14 days", task: "[Confirm catering menu + dietary needs]", owner: "[EA]", vendor: "[Caterer name]", done: false },
            { date: "T-10 days", task: "[Confirm AV setup + presentation tech]", owner: "[IT / EA]", vendor: "[AV vendor]", done: false },
            { date: "T-7 days", task: "[Finalize seating chart + name badges]", owner: "[EA]", vendor: "[Print vendor]", done: false },
            { date: "T-3 days", task: "[Final headcount to caterer + venue]", owner: "[EA]", vendor: "[Caterer + venue]", done: false },
            { date: "T-1 day", task: "[Walk-through at venue + test AV]", owner: "[EA + IT]", vendor: "[On-site]", done: false },
            { date: "Day of", task: "[Arrive early — set up signage, materials, gifts]", owner: "[EA]", vendor: "[N/A]", done: false },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#7C3AED" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.vendor}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.done ? C.badgeGreenBg : C.badgeAmberBg, r.done ? C.badgeGreenFg : C.badgeAmberFg)}>{r.done ? "Done" : "Pending"}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>EVENT DAY AGENDA</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>Activity</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Speaker / Lead</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { time: "8:00 AM", act: "[Registration + coffee]", speaker: "[EA team]", notes: "[Name badges at door]" },
            { time: "8:30 AM", act: "[Welcome + opening remarks]", speaker: "[CEO]", notes: "[5 min max]" },
            { time: "8:45 AM", act: "[Keynote / main presentation]", speaker: "[CEO / Guest]", notes: "[Slides loaded on laptop #1]" },
            { time: "10:00 AM", act: "[Break — refreshments]", speaker: "[Catering]", notes: "[15 min]" },
            { time: "10:15 AM", act: "[Breakout sessions / workshops]", speaker: "[Various]", notes: "[3 rooms — see room assignments]" },
            { time: "12:00 PM", act: "[Lunch]", speaker: "[Catering]", notes: "[Seated / buffet — dietary labels]" },
            { time: "1:00 PM", act: "[Afternoon session / panel]", speaker: "[Panelists]", notes: "[Q&A included]" },
            { time: "3:00 PM", act: "[Closing remarks + next steps]", speaker: "[CEO]", notes: "[Thank attendees]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.speaker}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><CalendarDays size={11} />Events</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><CalendarDays size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Event Planning Runbook</h2><p className="text-xs font-medium text-orange-600">Timeline, Vendors, Agenda, Logistics</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Timeline, vendors, attendee list, agenda, logistics. Repeatable and professional.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDetails()}{renderTimeline()}{renderAgenda()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDetails()}{renderAgenda()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function EventPlanningRunbookPage() { return <ThemeProvider><EventPlanningContent /></ThemeProvider>; }
