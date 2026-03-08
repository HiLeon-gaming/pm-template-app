"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TrendingUp, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Actions + history + patterns", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Actions only", icon: AlignJustify },
];

function ImprovementTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const patternsRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📈 IMPROVEMENT ACTION TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Review, Retro, Improvement</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>SM</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Open Actions</td><td style={S.tdAlt}>[##]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 ACTIVE IMPROVEMENT ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>From</th>
          <th style={S.thPrimary}>Improvement Action</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Category</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { from: "Sprint 8", action: "[PO writes ACs before sprint planning]", cat: "Process", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, own: "[PO]", due: "[Sprint 9]", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { from: "Sprint 8", action: "[Enforce scope change rules — nothing added without trade-off]", cat: "Process", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, own: "[SM]", due: "[Sprint 9]", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { from: "Sprint 8", action: "[Try pair programming on next 5-point story]", cat: "Practices", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, own: "[Tech Lead]", due: "[Sprint 9]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { from: "Sprint 7", action: "[Set up automated test coverage reports]", cat: "Tooling", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, own: "[Dev 3]", due: "[Sprint 8]", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { from: "[Add]", action: "", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, own: "", due: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: accent }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.cBg, r.cFg)}>{r.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHistory = () => (
    <div ref={historyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📜 COMPLETED IMPROVEMENTS</div>
      <CopyButton targetRef={historyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Sprint</th>
          <th style={S.thSecondary}>Action Completed</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Outcome / Impact</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Result</th>
        </tr></thead>
        <tbody>
          {[
            { sp: "Sprint 7", action: "[Improved DoR checklist — added technical feasibility check]", outcome: "[Stories are better prepared; less mid-sprint rework]", res: "✅ Kept", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { sp: "Sprint 7", action: "[Reduced standup to 10 min with parking lot]", outcome: "[Standups faster; side discussions handled separately]", res: "✅ Kept", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { sp: "Sprint 6", action: "[Added daily QA check-in at 9:05]", outcome: "[Tested but didn\u2019t help — QA prefers async updates]", res: "❌ Dropped", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { sp: "Sprint 5", action: "[Refinement moved from Thursday to Wednesday]", outcome: "[Better prep time; stories are clearer by planning]", res: "✅ Kept", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.sp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.outcome}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.res}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPatterns = () => (
    <div ref={patternsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🔍 RECURRING PATTERNS</div>
      <CopyButton targetRef={patternsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Repeat Issues</td><td style={S.td0}>[e.g., Scope creep appears in 3 of last 5 retros — indicates systemic issue with stakeholder expectations]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Positive Trends</td><td style={S.tdAlt}>[e.g., Sprint goal clarity improving each sprint; velocity stabilizing around 28-30 pts]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Biggest Win This Quarter</td><td style={S.td0}>[e.g., DoR checklist reduced mid-sprint rework by ~40% — team estimates are more accurate]</td></tr>
        <tr><td style={S.tdLabelAlt}>Systemic Action Needed</td><td style={{ ...S.tdAlt, height: "36px" }}>[e.g., Raise scope creep pattern with Product Director; need organizational-level fix]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><TrendingUp size={11} />Improvement</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><TrendingUp size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Improvement Action Tracker</h2><p className="text-xs font-medium text-amber-600">Retro Actions Don&apos;t Die — They Get Tracked</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track improvement actions across sprints. Prevents retro actions from being forgotten and surfaces recurring patterns.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderActions()}{renderHistory()}{renderPatterns()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ImprovementTrackerPage() { return <ThemeProvider><ImprovementTrackerContent /></ThemeProvider>; }
