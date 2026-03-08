"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Rocket, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All categories + notes", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Checklist only", icon: AlignJustify },
];

function SprintKickoffContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚀 SPRINT KICKOFF CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Sprint Planning &amp; Commitments</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint # — Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Start Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>SM</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Sprint Goal</td><td style={S.tdAlt}>[One-line sprint goal]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const checkCategory = (title: string, emoji: string, color: string, items: { check: string; notes: string }[]) => (
    <table style={S.tbl}>
      <thead><tr><td colSpan={3} style={{ backgroundColor: color, color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{emoji} {title}</td></tr>
      <tr>
        <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
        <th style={S.thSecondary}>Check Item</th>
        <th style={{ ...S.thSecondary, width: "30%" }}>Notes / Status</th>
      </tr></thead>
      <tbody>
        {items.map((item, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{item.check}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: C.textMuted }}>{item.notes}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderChecklist = () => (
    <div ref={checklistRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ KICKOFF READINESS CHECKLIST</div>
      <CopyButton targetRef={checklistRef} label="Copy Section" />

      <div style={{ marginBottom: "6px" }}>
        {checkCategory("PLANNING COMPLETE", "📋", accentDark, [
          { check: "Sprint goal is clear and agreed by the team", notes: "" },
          { check: "Sprint backlog is selected and committed", notes: "[## pts committed]" },
          { check: "All selected stories meet Definition of Ready", notes: "" },
          { check: "Capacity planner completed — team availability confirmed", notes: "[## effective days]" },
          { check: "Sprint risks and constraints identified", notes: "" },
        ])}
      </div>
      <div style={{ marginBottom: "6px" }}>
        {checkCategory("ENVIRONMENT & TOOLS", "🔧", "#0891B2", [
          { check: "Dev/staging environment is working and accessible", notes: "" },
          { check: "Test data / accounts are set up", notes: "" },
          { check: "Board (Jira/Asana/physical) is updated with sprint stories", notes: "" },
          { check: "CI/CD pipeline is green / no blocking failures", notes: "" },
          { check: "Feature flags / configs set up if needed", notes: "" },
        ])}
      </div>
      <div style={{ marginBottom: "6px" }}>
        {checkCategory("TEAM & COMMUNICATION", "👥", "#8B5CF6", [
          { check: "All team members know the sprint goal", notes: "" },
          { check: "Story assignments are clear (or pairing plan agreed)", notes: "" },
          { check: "Calendar events for all ceremonies are sent", notes: "" },
          { check: "Stakeholders notified of sprint scope and demo date", notes: "" },
          { check: "Any PTO / availability changes communicated", notes: "" },
        ])}
      </div>
      <div>
        {checkCategory("DEPENDENCIES & BLOCKERS", "⚠️", "#DC2626", [
          { check: "All external dependencies are unblocked or have a mitigation plan", notes: "" },
          { check: "Vendor / third-party access confirmed", notes: "" },
          { check: "Carry-over items from last sprint are re-estimated", notes: "" },
          { check: "No open blockers — or escalation in progress", notes: "" },
        ])}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div ref={teamRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🎬 KICKOFF CONFIRMATION</div>
      <CopyButton targetRef={teamRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Ready to Start?</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>☐ YES — Let&apos;s go!</span> &nbsp; <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>☐ NO — Blockers exist</span></td></tr>
        <tr><td style={S.tdLabelAlt}>If NO, What&apos;s Blocking?</td><td style={{ ...S.tdAlt, height: "36px" }}>[Describe blocker and expected resolution]</td></tr>
        <tr><td style={S.tdLabel}>Team Confidence (1–5)</td><td style={S.td0}>[☐ 1 &nbsp; ☐ 2 &nbsp; ☐ 3 &nbsp; ☐ 4 &nbsp; ☐ 5] &nbsp; [Average: __]</td></tr>
        <tr><td style={S.tdLabelAlt}>First Day Focus</td><td style={S.tdAlt}>[What should the team prioritize on Day 1?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📝 KICKOFF NOTES</div>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, height: "60px", verticalAlign: "top" as const }}>[Any additional notes, reminders, or context for the sprint]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Rocket size={11} />Kickoff</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Rocket size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Kickoff Checklist</h2><p className="text-xs font-medium text-emerald-600">Ready to Start? — Stops Sprint Day-1 Confusion</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Pre-flight checklist covering planning, environment, team communication, and dependencies. Ensures a clean sprint start.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderTeam()}{renderNotes()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintKickoffPage() { return <ThemeProvider><SprintKickoffContent /></ThemeProvider>; }
