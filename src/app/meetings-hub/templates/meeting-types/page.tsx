"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Map, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Cheat Sheet", desc: "All types + templates + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Type map only", icon: AlignJustify },
];

function MeetingTypesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🗺️ MEETING TYPES CHEAT SHEET</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderMap = () => (
    <div ref={mapRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 WHICH TEMPLATE TO USE?</td></tr></tbody></table>
      <CopyButton targetRef={mapRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Find your meeting type below, then use the recommended templates from the hub.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Meeting Type</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Section</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Use These Templates</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Duration</th>
        </tr></thead>
        <tbody>
          {[
            { type: "1:1 (Manager + Report)", section: "C", sBg: "#D946EF", cadence: "Weekly", templates: "1:1 Dashboard, 1:1 Agenda, 1:1 Notes", dur: "30 min" },
            { type: "Staff Meeting / Team Sync", section: "D", sBg: "#059669", cadence: "Weekly", templates: "Staff Agenda, Staff Minutes, Metrics Review", dur: "45-60 min" },
            { type: "Project Sync / Status", section: "E", sBg: "#EA580C", cadence: "Weekly", templates: "Project Sync Agenda, RAID + Actions", dur: "30-45 min" },
            { type: "Cross-Team Sync", section: "D", sBg: "#059669", cadence: "Weekly", templates: "Cross-Team Agenda, Cross-Team Notes", dur: "30 min" },
            { type: "Executive Review", section: "F", sBg: "#6366F1", cadence: "Monthly", templates: "Exec Review Agenda, Exec Notes, One-Pager", dur: "60 min" },
            { type: "Steering Committee", section: "F", sBg: "#6366F1", cadence: "Monthly", templates: "Steering Agenda, Steering Minutes", dur: "60-90 min" },
            { type: "Design / Technical Review", section: "E", sBg: "#EA580C", cadence: "As needed", templates: "Tech Design Review Agenda", dur: "60 min" },
            { type: "Go/No-Go Decision", section: "E", sBg: "#EA580C", cadence: "Milestone", templates: "Go/No-Go Agenda, Go/No-Go Notes", dur: "30-45 min" },
            { type: "Incident / War Room", section: "E", sBg: "#EA580C", cadence: "Emergency", templates: "Incident Meeting Template", dur: "Varies" },
            { type: "Ad-hoc / Quick Call", section: "B", sBg: "#3B82F6", cadence: "As needed", templates: "Quick Capture, Parking Lot", dur: "15 min" },
            { type: "Feedback / Coaching", section: "C", sBg: "#D946EF", cadence: "As needed", templates: "Feedback (SBI), Coaching (GROW)", dur: "20-30 min" },
            { type: "Meeting Retrospective", section: "D", sBg: "#059669", cadence: "Monthly", templates: "Team Retro (Meeting Effectiveness)", dur: "30 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(r.sBg + "22", r.sBg), fontWeight: 700 }}>{r.section}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.cadence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.templates}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: accent }}>{r.dur}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>💡 WHEN IN DOUBT</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Any meeting, any time</td><td style={S.td0}>Use the <strong>Universal Agenda Builder</strong> + <strong>Universal Minutes + Actions</strong> from Section B</td></tr>
        <tr><td style={S.tdLabelAlt}>Quick / unplanned call</td><td style={S.tdAlt}>Use <strong>Meeting Notes Quick Capture</strong> &mdash; 30-second setup, captures everything</td></tr>
        <tr><td style={S.tdLabel}>Need a decision</td><td style={S.td0}>Use <strong>Decision Needed Page</strong> &mdash; frames the problem, options, and who decides</td></tr>
        <tr><td style={S.tdLabelAlt}>After every meeting</td><td style={S.tdAlt}>Update the <strong>Action Items Master Tracker</strong> and <strong>Decision Log Master</strong></td></tr>
        <tr><td style={S.tdLabel}>Need to follow up</td><td style={S.td0}>Use the <strong>Follow-Up Email Builder</strong> &mdash; copy/paste professional recap in 2 minutes</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Map size={11} />Cheat Sheet</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Map size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Types Cheat Sheet</h2><p className="text-xs font-medium text-amber-600">Which Template to Use for Every Meeting</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A simple map: find your meeting type, get the right template. Eliminates decision fatigue.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderMap()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMap()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingTypesPage() { return <ThemeProvider><MeetingTypesContent /></ThemeProvider>; }
