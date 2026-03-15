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
  { id: "full", label: "Full Scoreboard", desc: "Scores + rules + history + weekly tracker", icon: LayoutDashboard },
  { id: "compact", label: "Quick Scores", desc: "Score table only", icon: AlignJustify },
];

function ScoreboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>KEY RESULT SCOREBOARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Scoring Rules + Progress</td></tr>
    </tbody></table>
  );

  const renderScore = () => (
    <div ref={scoreRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>CURRENT QUARTER SCORES — Q[X] [YEAR]</div>
      <CopyButton targetRef={scoreRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Update these weekly. The score tells you exactly how much progress you&apos;ve made toward each Key Result. Formula: (Current - Baseline) / (Target - Baseline).</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Objective</th>
          <th style={S.thPrimary}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Base</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { obj: "Improve CX", kr: "Support wait → 6 hrs", base: "18", target: "6", current: "10", score: "0.67", h: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, owner: "[Tom]" },
            { obj: "", kr: "CSAT → 4.5", base: "4.1", target: "4.5", current: "4.3", score: "0.50", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[Lisa]" },
            { obj: "", kr: "NPS → 55", base: "35", target: "55", current: "42", score: "0.35", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[CX]" },
            { obj: "Grow Revenue", kr: "Leads → 400/mo", base: "200", target: "400", current: "280", score: "0.40", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[Amy]" },
            { obj: "", kr: "3 enterprise deals", base: "0", target: "3", current: "1", score: "0.33", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, owner: "[Mike]" },
            { obj: "", kr: "Sales cycle → 60 days", base: "90", target: "60", current: "75", score: "0.50", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[Sales]" },
            { obj: "World-class Team", kr: "Fill 5 roles", base: "0", target: "5", current: "4", score: "0.80", h: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, owner: "[HR]" },
            { obj: "", kr: "Engagement > 85%", base: "72", target: "85", current: "68", score: "0.00", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, owner: "[PeopleOps]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: r.obj ? 700 : 400, color: r.obj ? accent : C.textBody }}>{r.obj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.base}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.h}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRulesAndSummary = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>📊 SCORING RULES</td></tr></thead>
            <tbody>
              {[
                { score: "0.7 – 1.0", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, means: "On track or ahead! Delivering.", action: "Celebrate. Share the win. Stretch further." },
                { score: "0.4 – 0.6", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, means: "Progress but behind target. Recoverable.", action: "Review blockers. Increase focus or resources." },
                { score: "0.0 – 0.3", health: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, means: "Significantly off track. At risk.", action: "Escalate. Pivot, add resources, or adjust." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 800 }}>{r.score}</span> <span style={S.badge(r.hBg, r.hFg)}>{r.health}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.means} &rarr; {r.action}</span>
                    </td>
                  </tr>
                );
              })}
              <tr><td style={{ ...S.td0, fontSize: "9px", padding: "6px 10px", lineHeight: "1.6" }}>
                <strong style={{ color: "#7C3AED" }}>Formula:</strong> (Current - Baseline) / (Target - Baseline)<br />
                <strong>Update:</strong> Weekly &nbsp;&bull;&nbsp; <strong>Final:</strong> End of quarter
              </td></tr>
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🏁 QUARTER SUMMARY</td></tr></thead>
            <tbody>
              <tr><td style={{ ...S.tdLabel, width: "40%" }}>Overall Score (avg)</td><td style={S.td0}>[e.g., 0.47 — Amber]</td></tr>
              <tr><td style={S.tdLabelAlt}>Top Win</td><td style={S.tdAlt}>[What went best?]</td></tr>
              <tr><td style={S.tdLabel}>Biggest Miss</td><td style={S.td0}>[What fell short? Why?]</td></tr>
              <tr><td style={S.tdLabelAlt}>Key Lesson</td><td style={S.tdAlt}>[What would you do differently?]</td></tr>
              <tr><td style={S.tdLabel}>Carry-Over?</td><td style={S.td0}>[KRs that should continue?]</td></tr>
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderWeekly = () => (
    <div ref={weeklyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>WEEKLY SCORE TRACKER (Progress Over Time)</div>
      <CopyButton targetRef={weeklyRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Update the &ldquo;Current&rdquo; value for each KR every week. This lets you see trends and catch problems early.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 1</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 2</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 3</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 4</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 5</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 6</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 7</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Wk 8</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "Support wait → 6 hrs", vals: ["16", "14", "12", "11", "10", "", "", ""] },
            { kr: "CSAT → 4.5", vals: ["4.1", "4.1", "4.2", "4.2", "4.3", "", "", ""] },
            { kr: "NPS → 55", vals: ["36", "37", "38", "40", "42", "", "", ""] },
            { kr: "Leads → 400/mo", vals: ["210", "230", "245", "260", "280", "", "", ""] },
            { kr: "3 enterprise deals", vals: ["0", "0", "0", "1", "1", "", "", ""] },
            { kr: "Fill 5 roles", vals: ["1", "2", "3", "3", "4", "", "", ""] },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.kr}</td>
                {r.vals.map((v, vi) => (
                  <td key={vi} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: v ? 700 : 400, color: v ? accent : C.textMuted }}>{v || "—"}</td>
                ))}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Trophy size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Key Result Scoreboard</h2><p className="text-xs font-medium text-amber-600">&#11088; All-Star &mdash; Scoring Rules + Weekly Progress</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">How you score progress (0.0–1.0), cadence, confidence. Removes vibes-based scoring and replaces it with math.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderScore()}{renderRulesAndSummary()}{renderWeekly()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderScore()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function KeyResultScoreboardPage() { return <ThemeProvider><ScoreboardContent /></ThemeProvider>; }
