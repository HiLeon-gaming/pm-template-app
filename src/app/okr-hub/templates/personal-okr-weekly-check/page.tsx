"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, User, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Check", desc: "Personal OKRs + weekly plan + reflection + growth", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Score + this week only", icon: AlignJustify },
];

function PersonalOKRContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const weekRef = useRef<HTMLDivElement>(null);
  const reflectRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>PERSONAL OKR WEEKLY CHECK</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Individual Contributor Focus &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderScore = () => (
    <div ref={scoreRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>MY OKR SCORES THIS WEEK</div>
      <CopyButton targetRef={scoreRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Update your personal Key Results every week. Track your own progress — don&apos;t wait for someone else to tell you how you&apos;re doing.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>My Objective</th>
          <th style={S.thPrimary}>My Key Result</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Health</th>
        </tr></thead>
        <tbody>
          {[
            { obj: "[e.g., Become a go-to expert on enterprise sales]", kr: "Close 2 enterprise deals (>$100K) this quarter", target: "2", current: "0", score: "0.00", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg },
            { obj: "", kr: "Build enterprise playbook with 4 case studies by Week 6", target: "4", current: "1", score: "0.25", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { obj: "[e.g., Improve my presentation skills]", kr: "Deliver 3 stakeholder presentations this quarter", target: "3", current: "1", score: "0.33", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { obj: "", kr: "Get presentation feedback score > 4.0 (from peers)", target: "4.0", current: "3.8", score: "0.50", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: r.obj ? 700 : 400, color: r.obj ? accent : C.textBody }}>{r.obj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800, color: accent }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.h}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWeek = () => (
    <div ref={weekRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>MY PLAN FOR THIS WEEK</div>
      <CopyButton targetRef={weekRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "3%", textAlign: "center" as const }}>&#9744;</th>
          <th style={S.thPrimary}>What I Will Do This Week</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Moves KR</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Day</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { task: "Ask 3 existing customers for warm enterprise intros", kr: "KR 1", day: "Mon–Tue", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { task: "Draft case study #2 from Acme Corp implementation", kr: "KR 2", day: "Tue–Wed", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { task: "Prepare stakeholder presentation for Thursday demo", kr: "KR 3", day: "Wed", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
            { task: "Deliver presentation and collect feedback forms", kr: "KR 4", day: "Thu", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
            { task: "Review and update personal OKR scores", kr: "All", day: "Fri", pri: "Low", priBg: C.badgeGreenBg, priFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.priBg, r.priFg)}>{r.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReflectAndGrow = () => (
    <div ref={reflectRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={reflectRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>📝 FRIDAY REFLECTION</td></tr></thead>
            <tbody>
              <tr><td style={S.tdLabel}><strong>What went well this week?</strong></td></tr>
              <tr><td style={S.td0}>[Your wins and progress]</td></tr>
              <tr><td style={S.tdLabelAlt}><strong>What didn&apos;t go as planned?</strong></td></tr>
              <tr><td style={S.tdAlt}>[What missed or surprised you?]</td></tr>
              <tr><td style={S.tdLabel}><strong>What will I do differently next week?</strong></td></tr>
              <tr><td style={S.td0}>[One specific improvement]</td></tr>
              <tr><td style={S.tdLabelAlt}><strong>Do I need help with anything?</strong></td></tr>
              <tr><td style={S.tdAlt}>[Blocker, resource, guidance needed?]</td></tr>
              <tr><td style={S.tdLabel}><strong>Am I on track for end-of-quarter?</strong></td></tr>
              <tr><td style={S.td0}>[Yes / At Risk / No \u2014 and why]</td></tr>
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🌱 GROWTH NOTES</td></tr></thead>
            <tbody>
              <tr><td style={S.tdLabel}><strong>Skill I&apos;m developing</strong></td></tr>
              <tr><td style={S.td0}>[e.g., Enterprise negotiation, public speaking, data analysis]</td></tr>
              <tr><td style={S.tdLabelAlt}><strong>How I practiced it this week</strong></td></tr>
              <tr><td style={S.tdAlt}>[e.g., Led a demo call, drafted a proposal, analyzed campaign data]</td></tr>
              <tr><td style={S.tdLabel}><strong>Feedback I want</strong></td></tr>
              <tr><td style={S.td0}>[e.g., How did my presentation land? Was my proposal clear enough?]</td></tr>
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><User size={11} />Personal</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><User size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Personal OKR Weekly Check</h2><p className="text-xs font-medium text-emerald-600">Individual Contributor &mdash; Track Your Own Goals</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">For high performers managing their own OKRs. Score, plan, reflect, and grow — every week.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderScore()}{renderWeek()}{renderReflectAndGrow()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderScore()}{renderWeek()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function PersonalOKRWeeklyCheckPage() { return <ThemeProvider><PersonalOKRContent /></ThemeProvider>; }
