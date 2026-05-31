"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RefreshCcw, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Retro", desc: "Discussion + actions + health", icon: LayoutDashboard },
  { id: "compact", label: "Quick Retro", desc: "Start/Stop/Continue only", icon: AlignJustify },
];

function SprintRetroContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sscRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔄 SPRINT RETROSPECTIVE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Review, Retro, Improvement</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[SM Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[60 min]</td></tr>
        <tr><td style={S.tdLabel}>Sprint Goal Met?</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Yes</span> / <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>No</span> / <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Partial</span></td><td style={S.tdLabel}>Velocity</td><td style={S.td0}>[20 pts completed / 23 committed]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSSC = () => (
    <div ref={sscRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💬 START / STOP / CONTINUE</td></tr></tbody></table>
      <CopyButton targetRef={sscRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "33.33%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>🟢 START DOING</td></tr></thead>
            <tbody>
              {["[Pair programming on complex stories]", "[Daily 5-min QA sync before standup]", "[Write ACs before sprint planning]", "[Celebrate wins at end of each sprint]", "[Add item]"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 10px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "33.33%", padding: "0 2px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>🔴 STOP DOING</td></tr></thead>
            <tbody>
              {["[Accepting stories that don\u2019t meet DoR]", "[Mid-sprint scope additions without trade-offs]", "[Skipping code review when rushed]", "[Working on items not in the sprint backlog]", "[Add item]"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 10px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "33.33%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#0891B2", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>🔵 CONTINUE DOING</td></tr></thead>
            <tbody>
              {["[Daily scrums are focused and under 15 min]", "[Great collaboration between dev and QA]", "[Sprint planning is well-prepared by PO]", "[Team is transparent about blockers early]", "[Add item]"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 10px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🎯 IMPROVEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Pick 1-3 actions max. More than 3 = nothing gets done. Assign an owner and review next retro.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[PO will write acceptance criteria for all stories BEFORE sprint planning]", own: "[PO]", due: "[Sprint 9 Planning]", s: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[SM to enforce scope change rules — nothing added without equal removal]", own: "[SM]", due: "[Sprint 9 — ongoing]", s: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Team to try pair programming on next 5-point story as experiment]", own: "[Tech Lead]", due: "[Sprint 9 — first 5pt story]", s: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Add action]", own: "", due: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><thead><tr><td colSpan={4} style={{ backgroundColor: accent, color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>📜 PREVIOUS RETRO ACTIONS — STATUS CHECK</td></tr>
        <tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Action from Sprint {`[#-1]`}</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Result</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Improve DoR checklist — add technical feasibility check]", own: "[Tech Lead]", res: "Done", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { action: "[Reduce standup to 10 min — use parking lot for side discussions]", own: "[SM]", res: "Done", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { action: "[Set up automated test coverage reports]", own: "[Dev 3]", res: "In Progress", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.res}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>❤️ TEAM HEALTH CHECK</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Dimension</th>
          <th style={{ ...S.thSecondary, width: "15%", textAlign: "center" as const }}>Rating (1-5)</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Trend</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Comment</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Sprint Goal Clarity", rate: "4", trend: "↑", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, note: "[Much better since PO started writing clearer goals]" },
            { dim: "Teamwork / Collaboration", rate: "5", trend: "→", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, note: "[Strong — pairing helps]" },
            { dim: "Process / Ceremonies", rate: "4", trend: "↑", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, note: "[Standups improved; refinement still needs work]" },
            { dim: "Technical Practices", rate: "3", trend: "→", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, note: "[Code review good; test coverage still low]" },
            { dim: "Fun / Morale", rate: "4", trend: "↑", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, note: "[Team enjoyed shipping Apple Pay this sprint]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.dim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{r.rate}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.trend}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.note}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><RefreshCcw size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Retrospective</h2><p className="text-xs font-medium text-amber-600">⭐ All-Star &mdash; Start/Stop/Continue + Actions + Health Check</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Three-column retro format with improvement actions, previous action review, and team health check.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderSSC()}{renderActions()}{renderHealth()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderSSC()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintRetroPage() { return <ThemeProvider><SprintRetroContent /></ThemeProvider>; }
