"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Timer, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Timebox + overflow rules + actual", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Timebox grid only", icon: AlignJustify },
];

function TimeboxPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timeboxRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⏱️ TIMEBOX PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; For Long Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%" }}>[Title]</td><td style={{ ...S.tdLabel, width: "18%" }}>Total Duration</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[e.g., 90 minutes]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date / Time</td><td style={S.tdAlt}>[MM/DD/YYYY HH:MM]</td><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name]</td></tr>
        <tr><td style={S.tdLabel}>Timekeeper</td><td style={S.td0}>[Name]</td><td style={S.tdLabel}>Buffer Built In?</td><td style={{ ...S.td0, fontWeight: 600 }}>[Yes — 5 min at end]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderTimebox = () => (
    <div ref={timeboxRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 TIMEBOX GRID</td></tr></tbody></table>
      <CopyButton targetRef={timeboxRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Start</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Planned</th>
          <th style={S.thPrimary}>Agenda Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Lead</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Over?</th>
        </tr></thead>
        <tbody>
          {[
            { start: "1:00", planned: "5 min", item: "[Opening + wins + context setting]", lead: "[Facilitator]", type: "Update", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, actual: "", over: "" },
            { start: "1:05", planned: "15 min", item: "[Q2 priorities review — status + blockers]", lead: "[PM]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, actual: "", over: "" },
            { start: "1:20", planned: "15 min", item: "[Budget decision — contractor vs FTE]", lead: "[Finance]", type: "Decision", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, actual: "", over: "" },
            { start: "1:35", planned: "15 min", item: "[Cross-team dependency: API integration]", lead: "[Tech Lead]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, actual: "", over: "" },
            { start: "1:50", planned: "10 min", item: "[Customer feedback review + next steps]", lead: "[Product]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, actual: "", over: "" },
            { start: "2:00", planned: "10 min", item: "[Team restructure proposal — first pass]", lead: "[You]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, actual: "", over: "" },
            { start: "2:10", planned: "10 min", item: "[Risk review + escalation needs]", lead: "[PM]", type: "Review", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, actual: "", over: "" },
            { start: "2:20", planned: "5 min", item: "[Closeout: decisions, actions, parking lot, next mtg]", lead: "[Facilitator]", type: "Closeout", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, actual: "", over: "" },
            { start: "2:25", planned: "5 min", item: "[Buffer — overflow or early release]", lead: "[—]", type: "Buffer", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, actual: "", over: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accentDark }}>{r.start}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.planned}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.lead}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.over}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🚨 IF WE RUN OVER RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>2-minute warning</td><td style={S.td0}>Timekeeper signals facilitator at 2 minutes remaining for each item</td></tr>
        <tr><td style={S.tdLabelAlt}>Hard stop option</td><td style={S.tdAlt}>Facilitator can park the topic and move on if timebox is exceeded</td></tr>
        <tr><td style={S.tdLabel}>Steal from buffer</td><td style={S.td0}>Use buffer time for overflow on critical items only (max 1 item)</td></tr>
        <tr><td style={S.tdLabelAlt}>Schedule follow-up</td><td style={S.tdAlt}>If topic needs more than 5 extra minutes, schedule a separate meeting</td></tr>
        <tr><td style={S.tdLabel}>Never skip closeout</td><td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>Always do the closeout — decisions + actions must be captured</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><Timer size={11} />Time Mgmt</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Timer size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Timebox Plan</h2><p className="text-xs font-medium text-blue-600">For Long Meetings &mdash; Prevents 90-Minute Drift</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Agenda items with timeboxes, overflow rules, and actual vs. planned tracking. Keeps long meetings sharp.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderTimebox()}{renderRules()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderTimebox()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TimeboxPlanPage() { return <ThemeProvider><TimeboxPlanContent /></ThemeProvider>; }
