"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Heart, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Radar", desc: "Scores + trends + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Scores only", icon: AlignJustify },
];

function TeamHealthRadarContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>❤️ TEAM HEALTH RADAR</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Review, Retro, Improvement</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[SM Name]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const ratingColor = (r: number) => r >= 4 ? "#059669" : r >= 3 ? "#F59E0B" : "#DC2626";
  const trendBadge = (t: string) => {
    const bg = t === "↑" ? C.badgeGreenBg : t === "↓" ? C.badgeRedBg : C.badgeBlueBg;
    const fg = t === "↑" ? C.badgeGreenFg : t === "↓" ? C.badgeRedFg : C.badgeBlueFg;
    return S.badge(bg, fg);
  };

  const renderRadar = () => (
    <div ref={radarRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 HEALTH DIMENSIONS (1-5 Scale)</td></tr></tbody></table>
      <CopyButton targetRef={radarRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Each team member votes anonymously. Average is recorded. Trend compares to previous sprint.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Dimension</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>What It Means</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Prev</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Trend</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Sprint Goal Clarity", what: "Do we understand WHAT we\u2019re building and WHY?", score: 4, prev: 3, trend: "↑" },
            { dim: "Teamwork & Collaboration", what: "Do we help each other? Is pairing easy?", score: 5, prev: 5, trend: "→" },
            { dim: "Autonomy & Empowerment", what: "Can we make decisions without waiting for approvals?", score: 3, prev: 3, trend: "→" },
            { dim: "Process & Ceremonies", what: "Are our ceremonies useful and well-run?", score: 4, prev: 3, trend: "↑" },
            { dim: "Technical Practices", what: "Code quality, testing, CI/CD — are we proud of our code?", score: 3, prev: 3, trend: "→" },
            { dim: "Stakeholder Relationship", what: "Do stakeholders trust us? Is communication smooth?", score: 4, prev: 4, trend: "→" },
            { dim: "Work-Life Balance", what: "Are we working sustainable hours? Any burnout risk?", score: 4, prev: 3, trend: "↑" },
            { dim: "Learning & Growth", what: "Are we getting better? Are we learning new things?", score: 3, prev: 2, trend: "↑" },
            { dim: "Fun & Morale", what: "Do we enjoy working together? Is the energy positive?", score: 4, prev: 4, trend: "→" },
            { dim: "Delivery Confidence", what: "Do we believe we can deliver what we commit to?", score: 4, prev: 3, trend: "↑" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.dim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", color: ratingColor(r.score) }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px", color: C.textMuted }}>{r.prev}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={trendBadge(r.trend)}>{r.trend}</span></td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={3} style={{ ...S.tdLabel, textAlign: "right" as const, fontWeight: 800 }}>TEAM AVERAGE</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", color: accent }}>3.8</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontSize: "12px", color: C.textMuted }}>3.3</td>
            <td style={{ ...S.td0, textAlign: "center" as const }}><span style={trendBadge("↑")}>↑</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderTrends = () => (
    <div ref={trendsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📈 MULTI-SPRINT TREND</td></tr></tbody></table>
      <CopyButton targetRef={trendsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Dimension</th>
          {["Sprint 5", "Sprint 6", "Sprint 7", "Sprint 8"].map((s, i) => (
            <th key={i} style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>{s}</th>
          ))}
        </tr></thead>
        <tbody>
          {[
            { dim: "Sprint Goal Clarity", scores: [2, 3, 3, 4] },
            { dim: "Teamwork", scores: [4, 4, 5, 5] },
            { dim: "Technical Practices", scores: [2, 2, 3, 3] },
            { dim: "Fun & Morale", scores: [3, 3, 4, 4] },
            { dim: "Delivery Confidence", scores: [2, 3, 3, 4] },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.dim}</td>
                {r.scores.map((s, j) => (
                  <td key={j} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "14px", color: ratingColor(s) }}>{s}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 HEALTH IMPROVEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Lowest Dimension</td><td style={S.td0}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Autonomy (3.0)</span> &amp; <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Technical Practices (3.0)</span></td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Root Cause Discussion</td><td style={S.tdAlt}>[e.g., Autonomy: too many decisions require PO approval; Tech: test coverage low, no automated quality gates]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Action #1</td><td style={S.td0}>[PO to delegate UX decisions under 2-point stories to dev team — experiment for 2 sprints]</td></tr>
        <tr><td style={S.tdLabelAlt}>Action #2</td><td style={S.tdAlt}>[Tech Lead to set up automated test coverage report + minimum 70% gate — Sprint 9]</td></tr>
        <tr><td style={S.tdLabel}>Biggest Win</td><td style={{ ...S.td0, fontWeight: 600, color: "#059669" }}>[Sprint Goal Clarity improved from 2 to 4 over 4 sprints — PO prep work is paying off!]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Heart size={11} />Health</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Heart size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Team Health Radar</h2><p className="text-xs font-medium text-amber-600">10 Dimensions, Trends &amp; Improvement Actions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Anonymous team health survey across 10 dimensions with multi-sprint trends. Surfaces patterns invisible in retros alone.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderRadar()}{renderTrends()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderRadar()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TeamHealthRadarPage() { return <ThemeProvider><TeamHealthRadarContent /></ThemeProvider>; }
