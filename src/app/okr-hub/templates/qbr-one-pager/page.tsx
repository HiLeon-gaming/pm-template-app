"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Trophy, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full QBR", desc: "Scores + lessons + next quarter + decisions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Scores + next quarter only", icon: AlignJustify },
];

function QBROnePagerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const decRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUARTERLY BUSINESS REVIEW (QBR) ONE-PAGER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Q[X] [YEAR] Final Results</td></tr>
    </tbody></table>
  );

  const renderScore = () => (
    <div ref={scoreRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>FINAL OKR SCORES — Q[X] [YEAR]</td></tr></tbody></table>
      <CopyButton targetRef={scoreRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Objective</th>
          <th style={S.thPrimary}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Grade</th>
        </tr></thead>
        <tbody>
          {[
            { obj: "OBJ 1: Improve Customer Experience", kr: "KR 1.1: Reduce support wait time", target: "6 hrs", actual: "7 hrs", score: "0.65", g: "Amber", gBg: C.badgeAmberBg, gFg: C.badgeAmberFg },
            { obj: "", kr: "KR 1.2: Increase CSAT from 4.1 → 4.5", target: "4.5", actual: "4.4", score: "0.75", g: "Green", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg },
            { obj: "", kr: "KR 1.3: Increase NPS from 35 → 50", target: "50", actual: "47", score: "0.80", g: "Green", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg },
            { obj: "OBJ 2: Grow Revenue Pipeline", kr: "KR 2.1: Increase MQLs from 200 → 400/mo", target: "400", actual: "380", score: "0.90", g: "Green", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg },
            { obj: "", kr: "KR 2.2: Close 3 enterprise deals (>$100K)", target: "3", actual: "1", score: "0.33", g: "Red", gBg: C.badgeRedBg, gFg: C.badgeRedFg },
            { obj: "OBJ 3: Build World-Class Team", kr: "KR 3.1: Fill 5 critical roles", target: "5", actual: "4", score: "0.80", g: "Green", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg },
            { obj: "", kr: "KR 3.2: Employee engagement > 85%", target: "85%", actual: "76%", score: "0.55", g: "Amber", gBg: C.badgeAmberBg, gFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: r.obj ? 700 : 400, color: r.obj ? "#7C3AED" : C.textBody }}>{r.obj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800, color: accent }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.gBg, r.gFg)}>{r.g}</span></td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={4} style={{ ...S.td0, fontWeight: 800, fontSize: "11px", textAlign: "right" as const, backgroundColor: C.rowAlt }}>QUARTER AVERAGE SCORE:</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent, backgroundColor: C.rowAlt }}>0.68</td>
            <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: C.rowAlt }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Amber</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderLessons = () => (
    <div ref={lessonsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>LESSONS LEARNED</td></tr></tbody></table>
      <CopyButton targetRef={lessonsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Lesson</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Action for Next Quarter</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "LinkedIn ads massively outperformed expectations. Low CPC, high volume.", action: "Double the budget next quarter. Test additional channels." },
            { type: "Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "Hiring sprint worked — 4 of 5 roles filled ahead of schedule.", action: "Repeat sprint model for Q2 hires." },
            { type: "Miss", tBg: C.badgeRedBg, tFg: C.badgeRedFg, lesson: "Enterprise deals take longer than expected. Cold outreach didn't work.", action: "Invest in referral program and SDR team from Day 1 of Q2." },
            { type: "Miss", tBg: C.badgeRedBg, tFg: C.badgeRedFg, lesson: "Engagement survey launched too late. Only 1 data point instead of 3.", action: "Set up automated monthly pulse from Week 1 of Q2." },
            { type: "Process", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, lesson: "Stop Doing list was effective. Freed ~36 hrs/week. Keep the practice.", action: "Create Stop Doing list in Week 1 of Q2 planning." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.lesson}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNextAndDecisions = () => (
    <div ref={nextRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={nextRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>🚀 NEXT QUARTER PREVIEW</td></tr></thead>
            <tbody>
              <tr><td style={{ ...S.tdLabel, width: "30%" }}>Next Quarter</td><td style={S.td0}>[Q2 YEAR] &nbsp;|&nbsp; [Start] — [End]</td></tr>
              <tr><td style={S.tdLabelAlt}>Proposed Theme</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#059669" }}>[e.g., &ldquo;Close the Revenue Gap&rdquo;]</td></tr>
              <tr><td style={S.tdLabel}>Carry-Forward OKRs</td><td style={S.td0}>[KR 2.2 + KR 3.2 — both unfinished]</td></tr>
              <tr><td style={S.tdLabelAlt}>New Focus Areas</td><td style={S.tdAlt}>[Product-led growth, expansion, scaling]</td></tr>
              <tr><td style={S.tdLabel}>Key Constraints</td><td style={S.td0}>[Budget flat. 2 hires start Wk 2.]</td></tr>
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>📌 DECISIONS NEEDED</td></tr></thead>
            <tbody>
              {[
                { dec: "Keep outsourced SDR team for Q2?", opts: "A: Keep ($15K/mo) B: Internal hire C: Cut", by: "QBR" },
                { dec: "Carry forward NPS target or adjust?", opts: "A: Keep 50 B: Raise to 55 C: Remove", by: "QBR" },
                { dec: "Shift $20K from events to digital?", opts: "A: Full shift B: 50/50 C: Keep", by: "Wk 1 Q2" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 800, color: "#7C3AED", fontSize: "12px" }}>{i + 1}.</span> <span style={{ fontWeight: 600 }}>{r.dec}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.opts} &nbsp;|&nbsp; By: <span style={{ fontWeight: 700 }}>{r.by}</span></span>
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Trophy size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quarterly Business Review (QBR) One-Pager</h2><p className="text-xs font-medium text-rose-600">&#11088; All-Star &mdash; Quarter Results, Lessons, Next Quarter</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Final scores, lessons learned, next quarter preview, and decisions needed. Extremely exec-ready.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderScore()}{renderLessons()}{renderNextAndDecisions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderScore()}{renderNextAndDecisions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QBROnePagerPage() { return <ThemeProvider><QBROnePagerContent /></ThemeProvider>; }
