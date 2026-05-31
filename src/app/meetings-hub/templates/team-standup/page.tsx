"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Zap, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Standup", desc: "Updates + blockers + focus areas", icon: LayoutDashboard },
  { id: "compact", label: "Quick Standup", desc: "Grid only", icon: AlignJustify },
];

function TeamStandupContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⚡ TEAM STANDUP / HUDDLE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Team Meetings &nbsp;|&nbsp; 15 min max</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name / Rotating]</td><td style={S.tdLabelAlt}>Duration</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[15 minutes — hard stop]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔄 STANDUP GRID</td></tr></tbody></table>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Person</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Yesterday / Since Last</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Today / Next</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Blockers</th>
        </tr></thead>
        <tbody>
          {["[Name 1]", "[Name 2]", "[Name 3]", "[Name 4]", "[Name 5]", "[Name 6]"].map((name, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Completed / worked on]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Focus for today]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Blocker or “None”]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFocus = () => (
    <div ref={focusRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🎯 TEAM FOCUS &amp; ESCALATIONS</td></tr></tbody></table>
      <CopyButton targetRef={focusRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Team Priority Today</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[What’s the #1 thing we need to get done today?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Blockers to Resolve</td><td style={S.tdAlt}>[List blockers that need immediate action — who will own each?]</td></tr>
        <tr><td style={S.tdLabel}>Offline Discussions</td><td style={S.td0}>[Topics that need separate meetings — don’t discuss now, schedule later]</td></tr>
        <tr><td style={S.tdLabelAlt}>Escalations</td><td style={{ ...S.tdAlt, color: "#DC2626", fontWeight: 600 }}>[Anything that needs to go up to leadership?]</td></tr>
        <tr><td style={S.tdLabel}>Wins / Shout-Outs</td><td style={S.td0}>[Quick recognition — keep it brief]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Zap size={11} />15 min</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Zap size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Team Standup / Huddle</h2><p className="text-xs font-medium text-emerald-600">15-Minute Daily or Bi-Weekly Check-In</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Quick standup grid: yesterday, today, blockers. Plus team focus and escalations. Hard stop at 15 minutes.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderGrid()}{renderFocus()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderGrid()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TeamStandupPage() { return <ThemeProvider><TeamStandupContent /></ThemeProvider>; }
