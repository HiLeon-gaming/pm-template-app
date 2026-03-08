"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, PackageCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Wrapup", desc: "Outcome + carryover + handoff", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Outcome + carryover only", icon: AlignJustify },
];

function SprintWrapupContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const carryoverRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📦 SPRINT WRAPUP / CARRYOVER LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Review, Retro, Improvement</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>End Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint Goal</td><td colSpan={3} style={S.tdAlt}>[One-line sprint goal]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderOutcome = () => (
    <div ref={outcomeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 SPRINT OUTCOME</div>
      <CopyButton targetRef={outcomeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Committed", value: "[23 pts / 8 stories]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Completed", value: "[20 pts / 6 stories]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Carried Over", value: "[3 pts / 2 stories]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Goal Met?", value: "[Yes]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>Story</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Final Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-002", desc: "[Save address for returning users]", pts: "3", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "S-003", desc: "[Order confirmation email + in-app]", pts: "2", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "S-010", desc: "[Apple Pay integration]", pts: "5", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "S-012a", desc: "[Payment error display]", pts: "2", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "S-012b", desc: "[Payment retry logic]", pts: "3", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "Spike", desc: "[Shipping API investigation]", pts: "2", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "S-014", desc: "[Analytics event tracking]", pts: "3", s: "Carry Over", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { id: "Bug", desc: "[Bug fixes from Sprint 7 — 1 remaining]", pts: "1", s: "Carry Over", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCarryover = () => (
    <div ref={carryoverRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>↪️ CARRYOVER DETAILS</div>
      <CopyButton targetRef={carryoverRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>Story</th>
          <th style={S.thPrimary}>What Remains</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Re-est</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Why Not Completed</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Next Sprint Action</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-014", remain: "[Analytics event tracking — not started due to missing API key]", reest: "3", why: "[Blocked: DevOps didn\u2019t provide analytics API key until Day 8; not enough time to complete]", next: "[API key received — can start Day 1 of Sprint 9]" },
            { id: "Bug", remain: "[1 remaining bug: duplicate flash on slow connection retry]", reest: "1", why: "[Low priority; dev focused on Apple Pay which was on critical path]", next: "[Quick fix — estimate 2-3 hours]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.remain}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.reest}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.next}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHandoff = () => (
    <div ref={handoffRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🤝 SPRINT-TO-SPRINT HANDOFF</div>
      <CopyButton targetRef={handoffRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Key Learnings</td><td style={S.td0}>[e.g., Vendor dependencies need earlier follow-up; Apple Pay integration was smoother than expected]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Risks for Next Sprint</td><td style={S.tdAlt}>[e.g., Google Pay may have similar vendor dependency; plan early outreach]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Team Morale</td><td style={S.td0}>[Good — team proud of shipping Apple Pay; slight frustration about analytics blocker]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Capacity Changes</td><td style={S.tdAlt}>[Sprint 9: Full team available; no PTO planned]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>SM Notes</td><td style={{ ...S.td0, height: "36px" }}>[Any additional context for next sprint planning]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><PackageCheck size={11} />Wrapup</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><PackageCheck size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Wrapup / Carryover Log</h2><p className="text-xs font-medium text-amber-600">What Shipped, What Carried Over &amp; Why</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Final sprint outcome, carryover details with reasons, and sprint-to-sprint handoff notes. Clean closure for every sprint.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderOutcome()}{renderCarryover()}{renderHandoff()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderOutcome()}{renderCarryover()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintWrapupPage() { return <ThemeProvider><SprintWrapupContent /></ThemeProvider>; }
