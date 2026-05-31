"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CalendarClock, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Worksheet", desc: "Capacity + goal + stories", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Goal + stories only", icon: AlignJustify },
];

function SprintPlanningContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const capacityRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📋 SPRINT PLANNING WORKSHEET</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Sprint Planning &amp; Commitments</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint # — Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Dates</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD – MM/DD]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint Length</td><td style={S.tdAlt}>[2 weeks]</td><td style={S.tdLabelAlt}>Planning Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Facilitator</td><td style={S.td0}>[SM Name]</td><td style={S.tdLabel}>Attendees</td><td style={S.td0}>[Full Scrum Team]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderCapacity = () => (
    <div ref={capacityRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>👥 TEAM CAPACITY</td></tr></tbody></table>
      <CopyButton targetRef={capacityRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Team Member</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Role</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Days Off</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Available Days</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Focus Factor</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Effective Days</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Dev 1]", role: "Dev", off: "0", avail: "10", focus: "80%", eff: "8.0" },
            { name: "[Dev 2]", role: "Dev", off: "2", avail: "8", focus: "80%", eff: "6.4" },
            { name: "[Dev 3]", role: "Dev", off: "0", avail: "10", focus: "80%", eff: "8.0" },
            { name: "[QA 1]", role: "QA", off: "1", avail: "9", focus: "75%", eff: "6.8" },
            { name: "[Add member]", role: "", off: "", avail: "", focus: "", eff: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: r.off === "0" ? C.textMuted : "#DC2626" }}>{r.off}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.avail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.focus}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "13px", color: accent }}>{r.eff}</td>
              </tr>
            );
          })}
          <tr><td colSpan={5} style={{ ...S.tdLabel, textAlign: "right" as const, fontWeight: 800 }}>TOTAL EFFECTIVE DAYS</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>[29.2]</td></tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Avg Velocity (Last 3)</td><td style={{ ...S.td0, width: "28%", fontWeight: 700 }}>[28 pts/sprint]</td><td style={{ ...S.tdLabel, width: "22%" }}>Recommended Commit</td><td style={{ ...S.td0, width: "28%", fontWeight: 700, color: accent }}>[26–28 pts]</td></tr>
      </tbody></table>
    </div>
  );

  const renderGoal = () => (
    <div ref={goalRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🎯 SPRINT GOAL</td></tr></tbody></table>
      <CopyButton targetRef={goalRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ backgroundColor: accent + "15", padding: "14px 16px", fontFamily: S.font, fontSize: "13px", fontWeight: 700, border: `1.5px solid ${accent}40`, color: C.primary, textAlign: "center" as const }}>
          [e.g., Complete checkout v2 core flow with Apple Pay and error handling — ready for internal QA]
        </td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Success Looks Like</td><td style={S.td0}>[e.g., PO can demo full checkout flow end-to-end with Apple Pay in staging]</td></tr>
        <tr><td style={S.tdLabelAlt}>What We Won&apos;t Do</td><td style={S.tdAlt}>[e.g., Google Pay, saved payment methods, international support]</td></tr>
      </tbody></table>
    </div>
  );

  const renderStories = () => (
    <div ref={storiesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 SELECTED STORIES</td></tr></tbody></table>
      <CopyButton targetRef={storiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>ID</th>
          <th style={S.thPrimary}>Story</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Assigned</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>DoR?</th>
        </tr></thead>
        <tbody>
          {[
            { id: "[S-002]", story: "[Save address for returning users]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, who: "[Dev 1]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[S-003]", story: "[Order confirmation email + in-app]", pts: "2", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, who: "[Dev 2]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[S-010]", story: "[Apple Pay integration]", pts: "5", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, who: "[Dev 1]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[S-012a]", story: "[Payment error display]", pts: "2", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, who: "[Dev 3]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[S-012b]", story: "[Payment retry logic]", pts: "3", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, who: "[Dev 3]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[S-014]", story: "[Analytics event tracking for checkout]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, who: "[Dev 2]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[Spike]", story: "[Shipping API investigation]", pts: "2", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, who: "[Dev 1]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[Buf]", story: "[Bug fixes from Sprint 7]", pts: "3", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, who: "[Team]", dor: "✅", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { id: "[Add]", story: "", pts: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, who: "", dor: "—", dBg: C.badgeGrayBg, dFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.dBg, r.dFg)}>{r.dor}</span></td>
              </tr>
            );
          })}
          <tr><td colSpan={2} style={{ ...S.tdLabel, textAlign: "right" as const, fontWeight: 800 }}>TOTAL COMMITTED</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>[23 pts]</td><td colSpan={3} style={{ ...S.td0, fontSize: "10px", color: C.textMuted }}>[Under velocity avg — buffer for unknowns]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚠️ SPRINT RISKS &amp; CONSTRAINTS</td></tr></tbody></table>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Risk / Constraint</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thSecondary, width: "28%" }}>Mitigation</th>
        </tr></thead>
        <tbody>
          {[
            { r: "[Dev 2 out for 2 days — reduced capacity]", imp: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, m: "[Adjusted commitment; Dev 1 covering critical path]" },
            { r: "[Payment vendor sandbox still pending]", imp: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, m: "[SM escalating daily; mock API available as fallback]" },
            { r: "[Sprint demo on Thursday — short sprint Friday]", imp: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg, m: "[Planned for — Friday is cleanup/retro only]" },
            { r: "[Add risk]", imp: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, m: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.r}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.imp}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.m}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><CalendarClock size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Planning Worksheet</h2><p className="text-xs font-medium text-emerald-600">⭐ All-Star &mdash; Best Anti-Overcommit Page</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capacity, sprint goal, selected stories, risks, and constraints. Prevents overcommitment and keeps the sprint focused.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderCapacity()}{renderGoal()}{renderStories()}{renderRisks()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderGoal()}{renderStories()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintPlanningPage() { return <ThemeProvider><SprintPlanningContent /></ThemeProvider>; }
