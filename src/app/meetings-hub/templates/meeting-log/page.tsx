"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Running log + stats + patterns", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Running log only", icon: AlignJustify },
];

function MeetingLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📋 MEETING LOG / TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Logs, Follow-Up &amp; Emails</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Owner</td><td style={{ ...S.td0, width: "32%" }}>[Your Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Period</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Week of 03/03 / March 2026]</td></tr>
        <tr><td style={S.tdLabelAlt}>Purpose</td><td colSpan={3} style={S.tdAlt}>Track all meetings attended — time spent, outcomes, effectiveness</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 RUNNING MEETING LOG</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Meeting</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Mins</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>With</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Useful?</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Actions</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Key Outcome</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/03]", meeting: "[Weekly staff meeting]", type: "Team", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, mins: "45", with: "[Team]", useful: "4/5", actions: "3", outcome: "[Aligned on Q2 priorities]" },
            { date: "[03/03]", meeting: "[1:1 with Sarah — career growth]", type: "1:1", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, mins: "30", with: "[Sarah]", useful: "5/5", actions: "2", outcome: "[Agreed on training plan]" },
            { date: "[03/04]", meeting: "[Sprint planning]", type: "Project", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, mins: "60", with: "[Dev team]", useful: "4/5", actions: "5", outcome: "[Sprint 12 committed — 27 pts]" },
            { date: "[03/04]", meeting: "[Vendor call — API contract]", type: "External", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, mins: "30", with: "[Vendor PM]", useful: "3/5", actions: "1", outcome: "[Waiting on revised pricing]" },
            { date: "[03/05]", meeting: "[Exec status update]", type: "Exec", tBg: C.badgeRedBg, tFg: C.badgeRedFg, mins: "30", with: "[VP, CTO]", useful: "5/5", actions: "2", outcome: "[Budget approved, risk flagged]" },
            { date: "[03/05]", meeting: "[Daily standup]", type: "Team", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, mins: "15", with: "[Team]", useful: "4/5", actions: "0", outcome: "[No blockers, on track]" },
            { date: "[03/05]", meeting: "[Brainstorm — new feature]", type: "Workshop", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, mins: "60", with: "[Cross-team]", useful: "5/5", actions: "4", outcome: "[Top 3 ideas selected]" },
            { date: "[ ]", meeting: "[ ]", type: " ", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, mins: "[ ]", with: "[ ]", useful: "[/5]", actions: "[ ]", outcome: "[ ]" },
            { date: "[ ]", meeting: "[ ]", type: " ", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, mins: "[ ]", with: "[ ]", useful: "[/5]", actions: "[ ]", outcome: "[ ]" },
            { date: "[ ]", meeting: "[ ]", type: " ", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, mins: "[ ]", with: "[ ]", useful: "[/5]", actions: "[ ]", outcome: "[ ]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accentDark }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.type.trim() ? <span style={S.badge(r.tBg, r.tFg)}>{r.type}</span> : ""}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.mins}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.with}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.useful}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.actions}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStats = () => (
    <div ref={statsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 WEEKLY MEETING STATS</td></tr></tbody></table>
      <CopyButton targetRef={statsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Meetings</td><td style={{ ...S.td0, width: "28%", fontWeight: 700 }}>[7 meetings]</td><td style={{ ...S.tdLabel, width: "22%" }}>Total Time</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[4.5 hours]</td></tr>
        <tr><td style={S.tdLabelAlt}>Avg Usefulness</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>[4.3 / 5]</td><td style={S.tdLabelAlt}>Total Actions</td><td style={S.tdAlt}>[17 actions generated]</td></tr>
        <tr><td style={S.tdLabel}>Most Common Type</td><td style={S.td0}>[Team meetings — 3]</td><td style={S.tdLabel}>Could Be Async?</td><td style={{ ...S.td0, color: "#DC2626", fontWeight: 600 }}>[1 meeting — vendor call could be email]</td></tr>
        <tr><td style={S.tdLabelAlt}>Meetings to Cancel</td><td style={S.tdAlt}>[Any recurring meetings that no longer add value?]</td><td style={S.tdLabelAlt}>Meetings to Add</td><td style={S.tdAlt}>[Any gaps — do you need a meeting you don’t have?]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><ClipboardList size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Log / Tracker</h2><p className="text-xs font-medium text-teal-600">⭐ All-Star &mdash; Running Log &bull; Stats &bull; Patterns</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track every meeting: time, type, usefulness, actions generated. Identify patterns and optimize your meeting load.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderStats()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingLogPage() { return <ThemeProvider><MeetingLogContent /></ThemeProvider>; }
