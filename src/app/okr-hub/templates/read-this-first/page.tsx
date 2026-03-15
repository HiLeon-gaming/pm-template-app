"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Complete setup", icon: LayoutDashboard },
  { id: "quick", label: "Quick Reference", desc: "Cheat sheet", icon: AlignJustify },
];

function ReadThisFirstContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const allStarRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "18px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>READ THIS FIRST — OKR &amp; Operating Rhythm Hub</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Your Complete Setup Guide</td></tr>
    </tbody></table>
  );

  const renderIntro = () => (
    <div ref={introRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>WHAT THIS PACK IS (PLAIN ENGLISH)</div>
      <CopyButton targetRef={introRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          This is a <strong>complete OKR and operating rhythm system</strong> — 54 ready-to-use templates that give you everything you need to set goals, track progress, run reviews, manage risks, and communicate results.<br /><br />
          <strong style={{ color: accent }}>It&apos;s NOT just a collection of pages.</strong> It&apos;s a connected system. Each template feeds into the next. Your weekly priorities connect to your quarterly OKRs. Your check-in notes feed into your monthly review. Your monthly review feeds into your quarterly business review.<br /><br />
          <strong style={{ color: "#DC2626" }}>The problem this solves:</strong> Most teams set OKRs and then forget about them. By Week 4, nobody remembers what the goals were. This pack creates a <strong>weekly → monthly → quarterly rhythm</strong> that keeps goals alive and makes execution visible.<br /><br />
          <strong style={{ color: "#7C3AED" }}>Who this is for:</strong> CEOs, COOs, VPs, Directors, Team Leads, and anyone responsible for setting and achieving goals. Works for teams of 5 to 500. Works with any tool (Notion, OneNote, Google Docs, Word — just copy and paste).
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderRhythm = () => (
    <div ref={rhythmRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>THE OPERATING RHYTHM (How It All Connects)</div>
      <CopyButton targetRef={rhythmRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>This is the heartbeat of your organization. Every cadence has a purpose.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Meeting</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Duration</th>
          <th style={S.thPrimary}>Purpose</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Key Templates</th>
        </tr></thead>
        <tbody>
          {[
            { cad: "Weekly", meet: "Weekly Check-In", dur: "30 min", purp: "Are we on track this week? Any blockers? What are next week's priorities?", temps: "Priorities Cockpit, Commitments Tracker, Check-In Agenda" },
            { cad: "Monthly", meet: "Monthly Business Review (MBR)", dur: "60 min", purp: "How did the month go? Trends, risks, decisions needed.", temps: "MBR Agenda, MBR Notes, Initiative Roll-Up, Metrics Snapshot" },
            { cad: "Quarterly", meet: "Quarterly Business Review (QBR)", dur: "90 min", purp: "Score the quarter. Learn. Set direction for next quarter.", temps: "QBR One-Pager, QBR Agenda, QBR Notes, OKR Scorecard" },
            { cad: "Quarter Start", meet: "Quarterly Planning", dur: "Half day", purp: "Set OKRs, plan initiatives, assign owners, define the operating rhythm.", temps: "OKR Worksheet, Initiative Planner, Kickoff One-Pager" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#7C3AED" }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.meet}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.purp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: accent }}>{r.temps}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSections = () => (
    <div ref={sectionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>WHAT&apos;S IN EACH SECTION (54 Templates)</div>
      <CopyButton targetRef={sectionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Section</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pages</th>
          <th style={S.thPrimary}>What It Covers</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>When to Use</th>
        </tr></thead>
        <tbody>
          {[
            { sec: "A — Start Here", secColor: "#F59E0B", pages: "8", covers: "Command Dashboard, Quick Start, OKR Crash Course, Maturity Assessment, Role Guide, Glossary, System Setup, Anti-Patterns.", when: "Day 1" },
            { sec: "B — Strategy Foundation", secColor: "#8B5CF6", pages: "8", covers: "Vision Alignment, Annual Priorities, OKR Worksheet, OKR Scorecard, Initiative Planner, Capacity Calculator, Stop Doing List, Kickoff One-Pager.", when: "Quarter Start" },
            { sec: "C — Quarterly Planning", secColor: "#D97706", pages: "10", covers: "90-Day Roadmap, Resource Allocation, RACI, Team OKR Cascade, Owner Assignments, Risk Pre-Mortem, Dependencies, Communication Plan, Change Log, Kickoff One-Pager.", when: "Quarter Start" },
            { sec: "D — Weekly Execution", secColor: "#059669", pages: "12", covers: "Priorities Cockpit, Time Block, Commitments, Wins & Learnings, Blockers, Metrics Snapshot, KPI Review, Check-In Agenda & Notes, Personal OKR Check, Delegation Tracker, Change Log.", when: "Every Week" },
            { sec: "E — Metrics & Performance", secColor: "#E11D48", pages: "8", covers: "KPI Library, Metric Integrity, Initiative Roll-Up, MBR Agenda & Notes, QBR One-Pager, QBR Agenda & Notes.", when: "Monthly / Quarterly" },
            { sec: "F — Decisions & Governance", secColor: "#6366F1", pages: "6", covers: "Decision Log, Risk Radar, Assumptions Log, Dependency Tracker, Governance Checklist, Escalation Prep.", when: "Ongoing" },
            { sec: "G — Communication", secColor: "#0D9488", pages: "2", covers: "OKR Rollout Communication Plan, Stakeholder Update Builder.", when: "Quarter Start + Weekly" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: r.secColor }}>{r.sec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.pages}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.covers}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.when}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSetup = () => (
    <div ref={setupRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>5-MINUTE SETUP (Do This First)</div>
      <CopyButton targetRef={setupRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          { n: "1", task: "Open the Command Dashboard — it's your home base. Bookmark it.", time: "30 sec" },
          { n: "2", task: "Take the OKR Maturity Assessment — know your starting point.", time: "3 min" },
          { n: "3", task: "Fill in the OKR Worksheet with your 2–3 company objectives and key results.", time: "15 min" },
          { n: "4", task: "Set up your weekly check-in: book 30 minutes, same time each week.", time: "2 min" },
          { n: "5", task: "Copy the Weekly Priorities Cockpit — use it from Day 1.", time: "1 min" },
          { n: "6", task: "Send the OKR Rollout Communication Plan to your team.", time: "5 min" },
        ].map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, width: "30px", textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#DC2626" }}>{r.n}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.task}</td>
              <td style={{ ...S.td0, backgroundColor: bg, width: "60px", textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.time}</td>
            </tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderAllStar = () => (
    <div ref={allStarRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#F59E0B")}>&#11088; ALL-STAR TEMPLATES (Start Here If Short on Time)</div>
      <CopyButton targetRef={allStarRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>If you only use 10 templates, use these. They&apos;re the highest-value pages in the pack.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Template</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Section</th>
          <th style={{ ...S.thPrimary, width: "35%" }}>Why It&apos;s All-Star</th>
        </tr></thead>
        <tbody>
          {[
            { name: "OKR Command Dashboard", sec: "A", why: "Your home base. Everything in one view." },
            { name: "OKR Worksheet + Scorecard", sec: "B", why: "The core OKR template. Set, score, and grade." },
            { name: "Initiative Planner", sec: "B", why: "Turns OKRs into action. Maps initiatives to KRs." },
            { name: "Weekly Priorities Cockpit", sec: "D", why: "The #1 weekly execution tool. Top 3 outcomes + blockers." },
            { name: "KPI Review → Actions", sec: "D", why: "Connects metrics to decisions. Prevents data-without-action." },
            { name: "Initiative Portfolio Roll-Up", sec: "E", why: "RAG status for all initiatives. Leadership visibility." },
            { name: "QBR One-Pager", sec: "E", why: "Quarter results on one page. Extremely exec-ready." },
            { name: "Decision Log Master", sec: "F", why: "Stops repeated debates. Creates accountability." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: accent }}>{r.sec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>HOW TO GET THE MOST OUT OF THIS PACK</div>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: accent }}>Copy → Paste → Customize.</strong> Every template is designed to be copied into your tool of choice (Notion, OneNote, Google Docs, Word). Use the Copy buttons — they preserve formatting.<br />
          <strong style={{ color: "#DC2626" }}>Don&apos;t use all 54 templates at once.</strong> Start with the All-Star templates. Add more as your rhythm matures.<br />
          <strong style={{ color: "#7C3AED" }}>The rhythm matters more than the templates.</strong> The best template in the world is useless if you don&apos;t open it every week. Build the habit first, optimize the templates later.<br />
          <strong style={{ color: "#D97706" }}>Switch themes to match your brand.</strong> Use the theme switcher on any template to change colors. Copy after switching — it preserves the new theme.<br />
          <strong style={{ color: "#0D9488" }}>Two views on every template.</strong> Full view = maximum detail and guidance. Compact view = just the essentials for experienced users.
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><BookOpen size={11} />Guide</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><BookOpen size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Read This First</h2><p className="text-xs font-medium text-emerald-600">Your Complete Setup Guide for the OKR Hub</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Everything you need to know to get started. 5-minute setup, section overview, and tips for success.</p>
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
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderIntro()}{renderRhythm()}{renderSections()}{renderSetup()}{renderAllStar()}{renderTips()}{renderFooter()}</>}
          {layout === "quick" && <>{renderTitleBanner()}{renderSetup()}{renderAllStar()}{renderTips()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ReadThisFirstPage() { return <ThemeProvider><ReadThisFirstContent /></ThemeProvider>; }
