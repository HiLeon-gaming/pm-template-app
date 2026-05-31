"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, MapPin, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Schedule + sessions + outcomes + logistics", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Schedule + outcomes only", icon: AlignJustify },
];

function TeamOffsiteContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const logisticsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📍 TEAM OFFSITE / PLANNING DAY</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Team Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Event</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Q2 Planning Day / Team Offsite]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date(s)</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Location</td><td style={S.tdAlt}>[Office / Off-site venue / Virtual]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[Full day / Half day / 2 days]</td></tr>
        <tr><td style={S.tdLabel}>Organizer</td><td style={S.td0}>[Your Name]</td><td style={S.tdLabel}>Participants</td><td style={S.td0}>[Team + guests]</td></tr>
        <tr><td style={S.tdLabelAlt}>Theme / Goal</td><td colSpan={3} style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[e.g., "Align on Q2 priorities and build team connection"]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSchedule = () => (
    <div ref={scheduleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 DAY SCHEDULE</td></tr></tbody></table>
      <CopyButton targetRef={scheduleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Mins</th>
          <th style={S.thPrimary}>Session / Activity</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Lead</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Notes / Prep</th>
        </tr></thead>
        <tbody>
          {[
            { time: "9:00", mins: "15", session: "[Arrival, coffee, informal catch-up]", type: "Social", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lead: "[—]", notes: "[Set up room, materials ready]" },
            { time: "9:15", mins: "15", session: "[Welcome + objectives + ground rules for the day]", type: "Opening", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, lead: "[You]", notes: "[Set expectations, energy]" },
            { time: "9:30", mins: "30", session: "[State of the team — wins, challenges, metrics review]", type: "Review", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, lead: "[You]", notes: "[Prepare dashboard/slides]" },
            { time: "10:00", mins: "45", session: "[Q2 priorities workshop — what matters most?]", type: "Workshop", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lead: "[PM]", notes: "[Breakout groups → report back]" },
            { time: "10:45", mins: "15", session: "[Break ☕]", type: "Break", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, lead: "[—]", notes: "" },
            { time: "11:00", mins: "45", session: "[Team retrospective — Start/Stop/Continue]", type: "Retro", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lead: "[Facilitator]", notes: "[Use team retro template]" },
            { time: "11:45", mins: "30", session: "[Team health check + discussion]", type: "Health", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lead: "[You]", notes: "[Anonymous survey results]" },
            { time: "12:15", mins: "60", session: "[Lunch + team bonding activity]", type: "Social", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lead: "[—]", notes: "[Catering ordered?]" },
            { time: "1:15", mins: "45", session: "[Action planning — commitments for Q2]", type: "Planning", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, lead: "[PM]", notes: "[Each person: top 3 commitments]" },
            { time: "2:00", mins: "30", session: "[Closeout — decisions, actions, next steps, feedback]", type: "Closing", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, lead: "[You]", notes: "[Capture everything]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accentDark }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.mins}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.session}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.lead}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOutcomes = () => (
    <div ref={outcomesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>✅ OUTCOMES &amp; COMMITMENTS</td></tr></tbody></table>
      <CopyButton targetRef={outcomesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decisions Made</td><td style={S.td0}>[List all decisions from the day]</td></tr>
        <tr><td style={S.tdLabelAlt}>Team Commitments</td><td style={S.tdAlt}>[What did the team agree to do differently?]</td></tr>
        <tr><td style={S.tdLabel}>Action Items</td><td style={S.td0}>[Specific actions with owners and deadlines]</td></tr>
        <tr><td style={S.tdLabelAlt}>Improvement Actions</td><td style={S.tdAlt}>[From the retro — what starts, stops, continues?]</td></tr>
        <tr><td style={S.tdLabel}>Follow-Up Plan</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Who sends the recap? By when? How will we track progress?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderLogistics = () => (
    <div ref={logisticsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📦 LOGISTICS CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={logisticsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Venue booked?</td><td style={S.td0}>[ ] Yes &mdash; [Venue details, address, room name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Catering?</td><td style={S.tdAlt}>[ ] Yes &mdash; [Coffee, lunch, snacks — dietary restrictions?]</td></tr>
        <tr><td style={S.tdLabel}>Materials?</td><td style={S.td0}>[ ] Whiteboard / flip chart / sticky notes / markers / printed agendas</td></tr>
        <tr><td style={S.tdLabelAlt}>Tech setup?</td><td style={S.tdAlt}>[ ] Projector / screen / video call for remote participants</td></tr>
        <tr><td style={S.tdLabel}>Pre-work sent?</td><td style={S.td0}>[ ] Agenda + pre-read materials sent at least 3 days before</td></tr>
        <tr><td style={S.tdLabelAlt}>Budget approved?</td><td style={S.tdAlt}>[ ] Yes &mdash; [Total budget: $___]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><MapPin size={11} />Offsite</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><MapPin size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Team Offsite / Planning Day</h2><p className="text-xs font-medium text-emerald-600">Full-Day Agenda &bull; Outcomes &bull; Logistics</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Full-day planning template with schedule, session types, outcomes, commitments, and logistics checklist.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderSchedule()}{renderOutcomes()}{renderLogistics()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderSchedule()}{renderOutcomes()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TeamOffsitePage() { return <ThemeProvider><TeamOffsiteContent /></ThemeProvider>; }
