"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "All terms + examples + common confusion", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Term definitions only", icon: AlignJustify },
];

function TerminologyContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const confusionRef = useRef<HTMLDivElement>(null);
  const cheatRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>TERMINOLOGY GUIDE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Every Acronym Spelled Out</td></tr>
    </tbody></table>
  );

  const renderTerms = () => (
    <div ref={termsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>KEY TERMS IN PLAIN ENGLISH</td></tr></tbody></table>
      <CopyButton targetRef={termsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>No jargon. Every term explained like you&apos;re explaining it to a smart friend who&apos;s never heard of it before.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Term / Acronym</th>
          <th style={S.thPrimary}>What It Means (Plain English)</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Example</th>
        </tr></thead>
        <tbody>
          {[
            { term: "OKR", full: "Objectives and Key Results", def: "A simple way to set goals. The Objective is WHAT you want. The Key Results are HOW you'll know you got it.", ex: "Objective: \"Improve customer experience.\" Key Result: \"Reduce support wait time from 18 hrs to 6 hrs.\"" },
            { term: "Objective", full: "", def: "The goal you want to achieve. It should be clear, motivating, and something your team can rally behind.", ex: "\"Become the #1 rated app in our category.\"" },
            { term: "Key Result", full: "", def: "A specific, measurable outcome that proves you're achieving the objective. Always has a number.", ex: "\"Increase App Store rating from 4.1 to 4.7 by end of Q2.\"" },
            { term: "KPI", full: "Key Performance Indicator", def: "An important number you track regularly to see if your business is healthy. Think of it like a vital sign.", ex: "\"Monthly recurring revenue\" or \"customer satisfaction score\"" },
            { term: "QBR", full: "Quarterly Business Review", def: "A meeting (usually 60–90 min) held every 3 months to review results, score goals, and plan the next quarter.", ex: "\"In our Q1 QBR, we scored our OKRs and decided to pivot our marketing strategy.\"" },
            { term: "RAG", full: "Red / Amber / Green", def: "A simple color system to show health. Green = on track. Amber = at risk. Red = off track or blocked.", ex: "\"The CRM migration is Amber — it’s behind schedule by 1 week but recoverable.\"" },
            { term: "Initiative", full: "", def: "A project or piece of work that is designed to move a Key Result forward. It’s the \"how\" behind the goal.", ex: "\"Launch new onboarding email sequence\" (to improve customer retention KR)." },
            { term: "Operating Rhythm", full: "", def: "Your repeatable schedule for staying aligned: weekly reviews, monthly deep-dives, quarterly resets.", ex: "\"We review metrics every Monday, do a monthly business review on the 1st, and reset OKRs every quarter.\"" },
            { term: "North Star Metric", full: "", def: "The ONE metric that best represents the value your company delivers. Everything else supports it.", ex: "\"For Spotify, it might be 'monthly active listeners.' For us, it’s '[your metric].'\"" },
            { term: "Baseline", full: "", def: "Where you are today BEFORE you start working toward a target. The starting point.", ex: "\"Our current support wait time is 18 hours. That’s our baseline.\"" },
            { term: "Target", full: "", def: "Where you want to be by the end of the quarter. The finish line.", ex: "\"We want to get support wait time down to 6 hours. That’s our target.\"" },
            { term: "Confidence Level", full: "", def: "How likely you think it is that you’ll hit the Key Result. Usually rated on a scale of 1–10.", ex: "\"I’m at a 6/10 confidence. We need to hire 2 more people to hit it.\"" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 800, color: accent }}>{r.term}{r.full ? <span style={{ fontWeight: 400, color: C.textMuted, display: "block", fontSize: "8px" }}>({r.full})</span> : null}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontStyle: "italic", color: C.textMuted }}>{r.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConfusion = () => (
    <div ref={confusionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>COMMON CONFUSION (What People Mix Up)</td></tr></tbody></table>
      <CopyButton targetRef={confusionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>People Often Confuse...</th>
          <th style={S.thPrimary}>The Difference</th>
        </tr></thead>
        <tbody>
          {[
            { q: "OKR vs. KPI", a: "OKRs are GOALS you set for a quarter (stretch targets). KPIs are HEALTH METRICS you track all the time. OKRs change; KPIs usually don’t." },
            { q: "Objective vs. Key Result", a: "Objective = qualitative (\"what we want\"). Key Result = quantitative (\"how we measure it\"). The objective inspires; the key result proves." },
            { q: "Key Result vs. Initiative", a: "Key Result = the OUTCOME (\"reduce wait time to 6 hrs\"). Initiative = the WORK (\"hire 3 agents and launch ticketing system\"). Don’t confuse doing work with achieving results." },
            { q: "RAG status vs. OKR score", a: "RAG (Red/Amber/Green) is a quick health check. OKR score (0.0–1.0) is a precise measurement of how far you got. RAG is fast; OKR scoring is detailed." },
            { q: "Monthly vs. Quarterly review", a: "Monthly = check progress and course-correct. Quarterly = score, learn, and set NEW goals for the next 90 days." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCheat = () => (
    <div ref={cheatRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>QUICK CHEAT SHEET</td></tr></tbody></table>
      <CopyButton targetRef={cheatRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: accent }}>OKR</strong> = Objectives and Key Results (goal-setting system)<br />
          <strong style={{ color: "#059669" }}>KPI</strong> = Key Performance Indicator (health metrics you always track)<br />
          <strong style={{ color: "#D97706" }}>QBR</strong> = Quarterly Business Review (90-day check-in meeting)<br />
          <strong style={{ color: "#DC2626" }}>RAG</strong> = Red / Amber / Green (simple color health check)<br />
          <strong style={{ color: "#7C3AED" }}>MBR</strong> = Monthly Business Review (monthly check-in)<br />
          <strong style={{ color: "#E11D48" }}>SOaP</strong> = Strategy on a Page (one-page strategy summary)<br />
          <strong style={{ color: "#0D9488" }}>RACI</strong> = Responsible, Accountable, Consulted, Informed (who does what)
        </td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><BookOpen size={11} />Terminology</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><BookOpen size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Terminology Guide</h2><p className="text-xs font-medium text-sky-600">Every Acronym Spelled Out in Plain English</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">OKR, KPI, QBR, RAG — all spelled out with simple definitions and real examples. Share this with your team so everyone speaks the same language.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderTerms()}{renderConfusion()}{renderCheat()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTerms()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function TerminologyGuidePage() { return <ThemeProvider><TerminologyContent /></ThemeProvider>; }
