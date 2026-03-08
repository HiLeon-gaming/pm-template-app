"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Progress + burndown + health", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Story status only", icon: AlignJustify },
];

function SprintProgressContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const burndownRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0891B2"; const accentDark = "#0E7490";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📊 SPRINT PROGRESS TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Daily Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Sprint Day</td><td style={{ ...S.td0, width: "32%" }}>[Day # of 10]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint Goal</td><td colSpan={3} style={S.tdAlt}>[One-line sprint goal]</td></tr>
        <tr><td style={S.tdLabel}>Committed</td><td style={S.td0}>[23 pts / 8 stories]</td><td style={S.tdLabel}>Completed So Far</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[12 pts / 3 stories]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderStories = () => (
    <div ref={storiesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 STORY STATUS</div>
      <CopyButton targetRef={storiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>ID</th>
          <th style={S.thPrimary}>Story</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>% Done</th>
          <th style={{ ...S.thPrimary, width: "16%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-002", story: "[Save address for returning users]", pts: "3", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, own: "[Dev 1]", pct: "100%", notes: "[Deployed to staging]" },
            { id: "S-003", story: "[Order confirmation email + in-app]", pts: "2", s: "In QA", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, own: "[Dev 2]", pct: "80%", notes: "[2 minor bugs found, fixing]" },
            { id: "S-010", story: "[Apple Pay integration]", pts: "5", s: "In Dev", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, own: "[Dev 1]", pct: "40%", notes: "[SDK done; UI in progress]" },
            { id: "S-012a", story: "[Payment error display]", pts: "2", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, own: "[Dev 3]", pct: "100%", notes: "[QA passed]" },
            { id: "S-012b", story: "[Payment retry logic]", pts: "3", s: "In Dev", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, own: "[Dev 3]", pct: "30%", notes: "[Started today]" },
            { id: "S-014", story: "[Analytics event tracking]", pts: "3", s: "Blocked", sBg: C.badgeRedBg, sFg: C.badgeRedFg, own: "[Dev 2]", pct: "0%", notes: "[Waiting on API key]" },
            { id: "Spike", story: "[Shipping API investigation]", pts: "2", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, own: "[Dev 1]", pct: "100%", notes: "[Findings documented]" },
            { id: "Bug", story: "[Bug fixes from Sprint 7]", pts: "3", s: "In Dev", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, own: "[Team]", pct: "60%", notes: "[2/3 bugs fixed]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pct}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBurndown = () => (
    <div ref={burndownRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📉 BURNDOWN (TEXT-BASED)</div>
      <CopyButton targetRef={burndownRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track remaining points each day. Use this as a lightweight alternative to chart-based burndowns.</p>
      <table style={S.tbl}>
        <thead><tr>
          {["Day", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((d, i) => (
            <th key={i} style={{ ...S.thPrimary, textAlign: "center" as const, width: i === 0 ? "12%" : "8.8%", fontSize: "10px" }}>{d}</th>
          ))}
        </tr></thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, fontSize: "10px" }}>Ideal</td>
            {["23", "20.7", "18.4", "16.1", "13.8", "11.5", "9.2", "6.9", "4.6", "2.3"].map((v, i) => (
              <td key={i} style={{ ...S.td0, textAlign: "center" as const, fontSize: "10px", color: C.textMuted }}>{v}</td>
            ))}
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, fontSize: "10px" }}>Actual</td>
            {["23", "21", "18", "16", "11", "—", "—", "—", "—", "—"].map((v, i) => (
              <td key={i} style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "11px", fontWeight: 700, color: v === "—" ? C.textMuted : accent }}>{v}</td>
            ))}
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, fontSize: "10px" }}>Variance</td>
            {["0", "+0.3", "-0.4", "-0.1", "-2.8", "—", "—", "—", "—", "—"].map((v, i) => {
              const isNeg = v.startsWith("-");
              const isPos = v.startsWith("+");
              return (
                <td key={i} style={{ ...S.td0, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: v === "—" ? C.textMuted : isNeg ? "#059669" : isPos ? "#DC2626" : C.textMuted }}>{v}</td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🏥 SPRINT HEALTH</div>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "On Track", value: "[12 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "At Risk", value: "[3 pts]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Blocked", value: "[3 pts]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Done", value: "[12 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Goal Status", value: "[On Track]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "15px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>SM Assessment</td><td style={{ ...S.td0, height: "36px" }}>[e.g., Sprint is on track. Apple Pay is the critical path — if SDK integration finishes by Day 6, we hit the goal. Analytics blocked but lower priority.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Action Needed</td><td style={S.tdAlt}>[e.g., Escalate analytics API key issue; monitor Apple Pay daily]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><BarChart3 size={20} className="text-cyan-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Progress Tracker</h2><p className="text-xs font-medium text-cyan-600">⭐ All-Star &mdash; Daily Pulse on Sprint Health</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Story status, text-based burndown, and sprint health dashboard. Shows whether you&apos;ll hit the sprint goal.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderStories()}{renderBurndown()}{renderHealth()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderStories()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintProgressPage() { return <ThemeProvider><SprintProgressContent /></ThemeProvider>; }
