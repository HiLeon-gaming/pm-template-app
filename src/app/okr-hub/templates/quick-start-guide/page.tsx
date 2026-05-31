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
  { id: "full", label: "Full Guide", desc: "Complete setup + weekly routine + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Checklist", desc: "Setup steps only", icon: AlignJustify },
];

function QuickStartContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const routineRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);
  const commonRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUICK START GUIDE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Setup in 30 Minutes</td></tr>
    </tbody></table>
  );

  const renderSetup = () => (
    <div ref={setupRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>SETUP CHECKLIST (Do These First)</td></tr></tbody></table>
      <CopyButton targetRef={setupRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Follow these steps in order. You can set up your entire system in about 30 minutes. Don&apos;t overthink it — you can always adjust later!</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Step</th>
          <th style={S.thPrimary}>What To Do</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Which Page To Use</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", task: "Write down 2\u20133 goals (Objectives) for this quarter", time: "5 min", page: "OKR Builder", done: false },
            { step: "2", task: "For each goal, write 2\u20133 ways you\u2019ll measure success (Key Results)", time: "10 min", page: "OKR Builder", done: false },
            { step: "3", task: "List the key numbers you\u2019ll track each week (KPIs)", time: "5 min", page: "Weekly Metrics Snapshot", done: false },
            { step: "4", task: "Decide who owns each goal and metric", time: "3 min", page: "Roles & Responsibilities", done: false },
            { step: "5", task: "Set your weekly review day and time (every week, same slot)", time: "2 min", page: "Operating Rhythm Calendar", done: false },
            { step: "6", task: "Pick your Top 3 priorities for THIS week", time: "3 min", page: "Weekly Priorities Cockpit", done: false },
            { step: "7", task: "Open the Dashboard page \u2014 this is now your \u201Chome base\u201D", time: "2 min", page: "Operating Rhythm Dashboard", done: false },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: "#059669", fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.page}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRoutine = () => (
    <div ref={routineRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>YOUR WEEKLY ROUTINE (15 Minutes Every Monday)</td></tr></tbody></table>
      <CopyButton targetRef={routineRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>This is the habit that makes everything work. Every Monday (or whatever day you choose), spend 15 minutes on these 5 steps. That&apos;s it.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Order</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>What You&apos;re Looking For</th>
        </tr></thead>
        <tbody>
          {[
            { order: "1", action: "Open the Dashboard \u2014 scan goals + metrics", time: "2 min", look: "Are we on track? Any red flags?" },
            { order: "2", action: "Review this week\u2019s metrics (KPI snapshot)", time: "3 min", look: "What went up? What went down? Why?" },
            { order: "3", action: "Use KPI Review \u2192 Actions to assign next steps", time: "4 min", look: "Turn every insight into an action with an owner" },
            { order: "4", action: "Update the Weekly Priorities Cockpit (Top 3)", time: "3 min", look: "What MUST happen this week to move goals forward?" },
            { order: "5", action: "Capture any decisions needed in the Decision Log", time: "3 min", look: "What\u2019s blocking us that needs a decision?" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#059669" }}>{r.order}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontStyle: "italic" }}>{r.look}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>TIPS FOR SUCCESS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.2", padding: "14px 18px" }}>
          <strong style={{ color: "#059669" }}>Start small.</strong> Don&apos;t try to use every page on Day 1. Begin with the Dashboard + Weekly Priorities + OKR Builder. Add more pages as you get comfortable.<br />
          <strong style={{ color: accent }}>Fewer goals = better results.</strong> Pick 2\u20133 objectives max per quarter. If you have 10 goals, you have zero goals.<br />
          <strong style={{ color: "#7C3AED" }}>Make it a habit.</strong> The weekly review is the most important thing. Even if you skip everything else, do the 15-minute Monday routine.<br />
          <strong style={{ color: "#DC2626" }}>Don&apos;t chase perfection.</strong> A \u201Cgood enough\u201D OKR that everyone understands is better than a perfect one nobody uses.<br />
          <strong style={{ color: "#D97706" }}>Celebrate wins!</strong> When a key result hits green, acknowledge it. Progress fuels motivation.
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderCommon = () => (
    <div ref={commonRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>COMMON MISTAKES TO AVOID</td></tr></tbody></table>
      <CopyButton targetRef={commonRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Mistake</th>
          <th style={{ ...S.thPrimary, width: "50%" }}>What To Do Instead</th>
        </tr></thead>
        <tbody>
          {[
            { mistake: "Setting too many goals (5+ objectives)", fix: "Pick 2\u20133 objectives. Focus beats volume every time." },
            { mistake: "Writing vague key results (\u201Cimprove customer experience\u201D)", fix: "Make it a number: \u201CReduce support wait time from 18 hrs to 6 hrs.\u201D" },
            { mistake: "Skipping the weekly review", fix: "Block 15 minutes every Monday. Treat it like a non-negotiable meeting." },
            { mistake: "Only tracking metrics without taking action", fix: "Use the KPI Review \u2192 Actions page. Every insight needs a next step." },
            { mistake: "Never updating the Dashboard", fix: "Update scores weekly. Stale data = stale decisions." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#DC2626" }}>{r.mistake}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fix}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Rocket size={11} />Quick Start</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Rocket size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quick Start Guide</h2><p className="text-xs font-medium text-sky-600">Setup in 30 Minutes &mdash; Then Run Weekly</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Step-by-step: define goals, metrics, cadence, then run weekly. You&apos;ll be up and running in one sitting.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderSetup()}{renderRoutine()}{renderTips()}{renderCommon()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSetup()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QuickStartGuidePage() { return <ThemeProvider><QuickStartContent /></ThemeProvider>; }
