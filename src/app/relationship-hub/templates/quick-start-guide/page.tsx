"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, BookOpen } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Setup checklist + rhythms + common mistakes + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Setup", desc: "Setup checklist only", icon: AlignJustify },
];

function QuickStartContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUICK START GUIDE &mdash; SETUP IN 20 MINUTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Get Started Fast</td></tr>
    </tbody></table>
  );

  const renderSetup = () => (
    <div ref={setupRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>SETUP CHECKLIST &mdash; DO THESE FIRST</td></tr></tbody></table>
      <CopyButton targetRef={setupRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Complete these steps in order. You&apos;ll be up and running in about 20 minutes. Don&apos;t skip any steps &mdash; each one builds on the previous.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>Step</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Why This Matters</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", action: "Open the Relationship Command Dashboard and bookmark it as your daily home base.", why: "This is your single source of truth every morning", time: "1 min", done: "[ ]" },
            { step: "2", action: "Read the Terminology Guide so you understand Stakeholder, Sponsor, Champion, CRM, RAG, and other key terms.", why: "Shared vocabulary prevents confusion", time: "3 min", done: "[ ]" },
            { step: "3", action: "Review the Stakeholder Types Cheat Sheet to understand the different types of people you manage.", why: "Different types need different strategies", time: "2 min", done: "[ ]" },
            { step: "4", action: "Open the Stakeholder Directory Index and list your top 5–10 stakeholders by name, role, and importance.", why: "You can’t manage what you haven’t identified", time: "5 min", done: "[ ]" },
            { step: "5", action: "Duplicate the Stakeholder Profile Template for each person. Fill in what you know now; add more over time.", why: "Profiles compound in value over weeks and months", time: "5 min", done: "[ ]" },
            { step: "6", action: "Open the Relationship Cadence Planner and set a check-in frequency for each stakeholder.", why: "Prevents the #1 mistake: only talking to people when you need something", time: "3 min", done: "[ ]" },
            { step: "7", action: "Open the Follow-Up Queue and enter any follow-ups or commitments you already owe someone.", why: "Clearing existing debts builds immediate trust", time: "3 min", done: "[ ]" },
            { step: "8", action: "Set a recurring 15-min weekly block on your calendar: “Relationship Review.” Use the Dashboard during this time.", why: "Without a habit, the system won’t stick", time: "1 min", done: "[ ]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.done}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRhythm = () => (
    <div ref={rhythmRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>YOUR RELATIONSHIP MANAGEMENT RHYTHM</td></tr></tbody></table>
      <CopyButton targetRef={rhythmRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Relationship management is a rhythm, not a one-time setup. Follow this cadence and your stakeholder relationships will steadily improve week over week.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>What to Do</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Pages to Use</th>
        </tr></thead>
        <tbody>
          {[
            { cadence: "Daily", time: "5 min", what: "After every meeting or call: capture notes, follow-ups, and commitments. Update stakeholder profiles with new context.", pages: "Stakeholder Profile + Follow-Up Queue + Conversation Capture", color: "#059669" },
            { cadence: "Weekly", time: "15 min", what: "Monday morning ritual: Who needs attention? What promises are due? What risks are building? Update the Dashboard.", pages: "Command Dashboard + Commitments Log + Hot Stakeholders", color: "#0EA5E9" },
            { cadence: "Before Meetings", time: "5–10 min", what: "Review their profile. Prep your goal, risks, talking points, and what decisions you need from this meeting.", pages: "Stakeholder Profile + Meeting Prep Brief", color: "#8B5CF6" },
            { cadence: "After Meetings", time: "5 min", what: "Immediately record: decisions made, commitments given (by you AND them), and next steps with owners.", pages: "Meeting Notes + Follow-Up Email Builder", color: "#D97706" },
            { cadence: "Monthly", time: "20 min", what: "Review relationship health across your portfolio. What improved? What degraded? Plan next month’s proactive touchpoints.", pages: "Relationship Review Notes + Touchpoint Planner + Health Scorecard", color: "#EA580C" },
            { cadence: "Quarterly", time: "30 min", what: "Full portfolio review. Update profiles. Refresh engagement strategies. Archive closed-out stakeholders.", pages: "Quarterly Review + Portfolio Snapshot + Engagement Strategy", color: "#DC2626" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 800, color: r.color }}>{r.cadence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.pages}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTipsAndMistakes = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>TIPS FOR SUCCESS</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Start with just 5–10 people.", detail: "Don’t try to profile everyone. Start with the stakeholders who can make or break your work." },
                { color: "#0EA5E9", tip: "Update after every interaction.", detail: "30 seconds of notes now saves 10 minutes of guessing later. Your future self will thank you." },
                { color: "#8B5CF6", tip: "Use the Follow-Up Queue daily.", detail: "This single page prevents more dropped balls than any other page in the entire pack." },
                { color: "#D97706", tip: "Never skip the weekly review.", detail: "15 minutes of reflection prevents hours of reactive firefighting later in the week." },
                { color: accent, tip: "Customize freely.", detail: "Add columns, remove rows, change colors. These templates are starting points, not rigid rules." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>COMMON MISTAKES TO AVOID</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Setting up everything but using nothing.", detail: "Better to use 3 pages consistently than set up 30 and abandon them." },
                { color: "#EA580C", tip: "Only updating when there’s a crisis.", detail: "Reactive management = always behind. The rhythm IS the system." },
                { color: "#D97706", tip: "Keeping it in your head.", detail: "If it’s not written down, you WILL forget it. Especially commitments." },
                { color: "#6366F1", tip: "Treating this like a CRM.", detail: "This is a relationship management system, not a contact database. Focus on context, not just data." },
                { color: "#059669", tip: "Not sharing wins.", detail: "Track wins and recognize people. It’s the highest-ROI relationship investment you can make." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><BookOpen size={11} />Start Here</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Handshake size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quick Start Guide</h2><p className="text-xs font-medium text-rose-600">Setup in 20 Minutes &mdash; Your Onboarding Checklist</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Follow these steps to set up your Relationship Hub in about 20 minutes. This guide walks you through the essential setup, establishes your management rhythm, and helps you avoid the most common mistakes new users make.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderSetup()}{renderRhythm()}{renderTipsAndMistakes()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSetup()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QuickStartGuidePage() { return <ThemeProvider><QuickStartContent /></ThemeProvider>; }
