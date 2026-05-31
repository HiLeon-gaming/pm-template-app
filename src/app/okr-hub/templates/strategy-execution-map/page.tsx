"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, GitBranch, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Visual flow + examples + how it connects", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Flow diagram only", icon: AlignJustify },
];

function StrategyMapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>THE STRATEGY-TO-EXECUTION MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; How Everything Connects</td></tr>
    </tbody></table>
  );

  const renderFlow = () => (
    <div ref={flowRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>HOW STRATEGY BECOMES WEEKLY ACTION</td></tr></tbody></table>
      <CopyButton targetRef={flowRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>This is the big picture. Strategy doesn&apos;t work if it stays in a slide deck. Here&apos;s how goals become real results through a simple chain.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { level: "MISSION / VISION", color: "#1E293B", desc: "Why we exist and where we're going (stays the same for years)", arrow: true },
            { level: "ANNUAL DIRECTION", color: "#7C3AED", desc: "This year's big themes and focus areas (set once per year)", arrow: true },
            { level: "OBJECTIVES (OKRs)", color: "#0EA5E9", desc: "What we want to achieve THIS QUARTER (2\u20133 clear goals)", arrow: true },
            { level: "KEY RESULTS", color: "#059669", desc: "How we measure if we hit the objective (specific numbers)", arrow: true },
            { level: "INITIATIVES", color: "#D97706", desc: "The projects and work that will MOVE the key results", arrow: true },
            { level: "WEEKLY PRIORITIES", color: "#DC2626", desc: "The Top 3 things that must happen THIS WEEK", arrow: true },
            { level: "DAILY ACTIONS", color: "#E11D48", desc: "What I'm working on TODAY to deliver the weekly priorities", arrow: false },
          ].map((r, i) => (
            <React.Fragment key={i}>
              <tr>
                <td style={{ backgroundColor: r.color, color: C.white, padding: "12px 18px", fontSize: "13px", fontWeight: 800, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.04em" }}>{r.level}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: C.white, padding: "6px 18px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, color: C.textBody }}>{r.desc}</td>
              </tr>
              {r.arrow && (
                <tr>
                  <td style={{ backgroundColor: C.white, padding: "2px 0", fontSize: "18px", fontFamily: S.font, textAlign: "center" as const, color: r.color, fontWeight: 800 }}>&darr;</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderExample = () => (
    <div ref={exampleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>REAL-WORLD EXAMPLE (Follow the Chain)</td></tr></tbody></table>
      <CopyButton targetRef={exampleRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Here&apos;s what it looks like when strategy flows all the way down to this week&apos;s work. Notice how every level connects upward.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Level</th>
          <th style={S.thPrimary}>Example</th>
        </tr></thead>
        <tbody>
          {[
            { level: "Mission", ex: "\"Make every small business owner feel like they have a Fortune 500 support team.\"", color: "#1E293B" },
            { level: "Annual Direction", ex: "\"2026 is the year we dominate customer experience and grow enterprise revenue.\"", color: "#7C3AED" },
            { level: "Q1 Objective", ex: "\"Improve customer experience so our users become our best salespeople.\"", color: "#0EA5E9" },
            { level: "Key Result #1", ex: "\"Reduce average support wait time from 18 hours to 6 hours.\"", color: "#059669" },
            { level: "Initiative", ex: "\"Hire 3 support agents and launch the new ticketing system.\"", color: "#D97706" },
            { level: "This Week's Priority", ex: "\"Post job listings for 3 support agents and interview 2 candidates.\"", color: "#DC2626" },
            { level: "Today's Action", ex: "\"Write the job description and send it to HR by noon.\"", color: "#E11D48" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: r.color }}>{r.level}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConnect = () => (
    <div ref={connectRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>WHICH PAGES TO USE AT EACH LEVEL</td></tr></tbody></table>
      <CopyButton targetRef={connectRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Level</th>
          <th style={S.thPrimary}>Use This Page</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>How Often</th>
        </tr></thead>
        <tbody>
          {[
            { level: "Annual Direction", page: "Annual Direction Snapshot + Strategy on a Page", freq: "Yearly" },
            { level: "Objectives", page: "OKR Builder (Objectives and Key Results)", freq: "Quarterly" },
            { level: "Key Results", page: "Key Result Scoreboard + Metric Definition Sheets", freq: "Quarterly" },
            { level: "Initiatives", page: "Initiative Brainstorm + Portfolio Roll-Up (RAG)", freq: "Quarterly" },
            { level: "Weekly Priorities", page: "Weekly Priorities Cockpit (Top 3 Outcomes)", freq: "Weekly" },
            { level: "Metrics Check", page: "Weekly Metrics Snapshot + KPI Review \u2192 Actions", freq: "Weekly" },
            { level: "Reviews", page: "Monthly Business Review + Quarterly Business Review", freq: "Monthly / Quarterly" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.level}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.page}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.freq}</td>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><GitBranch size={11} />Strategy Map</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><GitBranch size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">The Strategy-to-Execution Map</h2><p className="text-xs font-medium text-sky-600">How Goals Become Weekly Action</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A simple diagram showing how goals connect to metrics, initiatives, and weekly priorities. Print this and keep it visible!</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderFlow()}{renderExample()}{renderConnect()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderFlow()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StrategyExecutionMapPage() { return <ThemeProvider><StrategyMapContent /></ThemeProvider>; }
