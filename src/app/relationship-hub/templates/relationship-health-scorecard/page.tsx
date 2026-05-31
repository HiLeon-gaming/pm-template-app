"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, HeartPulse } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Scorecard", desc: "Scores + trend analysis + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Scores", desc: "Scorecard only", icon: AlignJustify },
];

function ScorecardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RELATIONSHIP HEALTH SCORECARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Early Warning System</td></tr>
    </tbody></table>
  );

  const renderScorecard = () => (
    <div ref={scoreRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER HEALTH SCORES &mdash; [MONTH / YEAR]</td></tr></tbody></table>
      <CopyButton targetRef={scoreRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Score each stakeholder on 5 dimensions (1=Poor, 5=Excellent). Total score gives you an overall health indicator. Track monthly to spot trends before they become crises. Any dimension scoring 1-2 needs immediate attention.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "14%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Trust</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Responsive</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Alignment</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Friction</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Risk</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Total</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Action Needed</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", trust: "5", resp: "5", align: "4", fric: "5", risk: "5", total: "24", health: "Green", action: "Maintain cadence. She’s your strongest ally." },
            { name: "David Park", trust: "4", resp: "3", align: "4", fric: "3", risk: "3", total: "17", health: "Amber", action: "Improve responsiveness. Monthly budget updates." },
            { name: "James Wu", trust: "2", resp: "2", align: "3", fric: "2", risk: "2", total: "11", health: "Red", action: "Urgent: repair trust. Working session this week." },
            { name: "Sarah Chen", trust: "4", resp: "4", align: "3", fric: "4", risk: "3", total: "18", health: "Amber", action: "Re-align on goals. She’s drifting." },
            { name: "[Stakeholder]", trust: "[1-5]", resp: "[1-5]", align: "[1-5]", fric: "[1-5]", risk: "[1-5]", total: "[/25]", health: "[RAG]", action: "[What you’ll do]" },
            { name: "[Stakeholder]", trust: "[1-5]", resp: "[1-5]", align: "[1-5]", fric: "[1-5]", risk: "[1-5]", total: "[/25]", health: "[RAG]", action: "[What you’ll do]" },
            { name: "[Stakeholder]", trust: "[1-5]", resp: "[1-5]", align: "[1-5]", fric: "[1-5]", risk: "[1-5]", total: "[/25]", health: "[RAG]", action: "[What you’ll do]" },
            { name: "[Stakeholder]", trust: "[1-5]", resp: "[1-5]", align: "[1-5]", fric: "[1-5]", risk: "[1-5]", total: "[/25]", health: "[RAG]", action: "[What you’ll do]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const hc = r.health === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.health === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.health === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.trust}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.resp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.align}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.fric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", textAlign: "center" as const, fontWeight: 800, color: accent }}>{r.total}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(hc.bg, hc.fg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ ...S.subNote, marginTop: "4px", fontSize: "9px" }}>Scoring: 21-25 = Green (Healthy) &nbsp;|&nbsp; 15-20 = Amber (Needs attention) &nbsp;|&nbsp; &lt;15 = Red (At risk). Friction &amp; Risk are INVERTED: 5 = low friction/risk, 1 = high friction/risk.</p>
    </div>
  );

  const renderTrend = () => (
    <div ref={trendRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>TREND ANALYSIS &mdash; MONTH-OVER-MONTH</td></tr></tbody></table>
      <CopyButton targetRef={trendRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Compare scores over time. Which relationships are improving? Which are degrading? Patterns over 3+ months reveal systemic issues.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>3 Mo Ago</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>2 Mo Ago</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Last Mo</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>This Mo</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thPrimary}>Interpretation</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", m3: "23", m2: "24", m1: "24", m0: "24", trend: "\u2192", interp: "Stable and strong. Maintain current approach." },
            { name: "David Park", m3: "13", m2: "14", m1: "15", m0: "17", trend: "\u2191", interp: "Improving! Budget transparency is working. Keep investing." },
            { name: "James Wu", m3: "18", m2: "16", m1: "13", m0: "11", trend: "\u2193", interp: "Declining fast. API issue is eroding trust. Needs urgent intervention." },
            { name: "[Stakeholder]", m3: "[X]", m2: "[X]", m1: "[X]", m0: "[X]", trend: "[\u2191\u2192\u2193]", interp: "[What the trend tells you]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const tc = r.trend === "\u2191" ? "#059669" : r.trend === "\u2193" ? "#DC2626" : "#D97706";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const }}>{r.m3}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const }}>{r.m2}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const }}>{r.m1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.m0}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "16px", textAlign: "center" as const, color: tc, fontWeight: 800 }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.interp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FFF7ED", color: "#EA580C", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #EA580C" }}>SCORING GUIDE</td></tr></thead>
            <tbody>
              {[
                { color: "#EA580C", tip: "Trust (1-5): Do they believe what you say?", detail: "5=Complete trust. 1=They fact-check everything and assume the worst." },
                { color: "#059669", tip: "Responsiveness (1-5): How quickly do they engage?", detail: "5=Responds same day. 1=Ignores messages or takes a week+." },
                { color: "#0EA5E9", tip: "Alignment (1-5): Are you working toward the same goals?", detail: "5=Fully aligned. 1=Actively working against your objectives." },
                { color: "#D97706", tip: "Friction/Risk (1-5, inverted): How much trouble exists?", detail: "5=Smooth sailing. 1=Constant friction, high risk of relationship failure." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHEN TO WORRY</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Any single dimension drops below 2.", detail: "One bad score can poison the whole relationship. Address it immediately." },
                { color: "#EA580C", tip: "Total score drops 3+ points in one month.", detail: "Something happened. Investigate and address the root cause, not just the symptom." },
                { color: "#D97706", tip: "Downward trend for 2+ consecutive months.", detail: "This isn’t a blip — it’s a pattern. Change your approach before it’s too late." },
                { color: "#6366F1", tip: "Multiple stakeholders trending down simultaneously.", detail: "If several relationships are degrading at once, the problem might be YOU, not them." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><HeartPulse size={11} />Early Warning</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Handshake size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Relationship Health Scorecard</h2><p className="text-xs font-medium text-orange-600">Early Warning System &bull; Score &bull; Track &bull; Act</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A simple 5-dimension scoring system for every key stakeholder. Score trust, responsiveness, alignment, friction, and risk each month. Total scores give you an instant health indicator, and month-over-month trends reveal problems before they become crises.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderScorecard()}{renderTrend()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderScorecard()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RelationshipHealthScorecardPage() { return <ThemeProvider><ScorecardContent /></ThemeProvider>; }
