"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Metrics + trends + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Snapshot", desc: "Scorecard only", icon: AlignJustify },
];

function MetricsReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scorecardRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🔍 METRICS REVIEW</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Measurement &amp; Outcomes</td></tr>
      <tr><td style={descStyle}>A periodic review of project metrics to identify trends, diagnose issues, and drive data-informed decisions. Use this at sprint reviews, steering committee meetings, or phase gates to ensure the project stays on track.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Review Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Reviewed By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Review Period</td><td style={S.tdAlt}>[Sprint 4 / Week 7-8]</td></tr>
        <tr><td style={S.tdLabel}>Overall Health</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>🟢 On Track</span></td><td style={S.tdLabel}>Next Review</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderScorecard = () => (
    <div ref={scorecardRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 METRICS SCORECARD</td></tr></tbody></table>
      <CopyButton targetRef={scorecardRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "22%" }}>Metric</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "12%" }}>Target</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Previous</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "10%" }}>Current</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Trend</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%" }}>Status</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Commentary</th>
        </tr></thead>
        <tbody>
          {[
            { m: "Sprint Velocity", tgt: "≥ 28", prev: "29", cur: "31", trend: "↑", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, c: "Consistent improvement; team gel is showing" },
            { m: "SPI", tgt: "≥ 0.95", prev: "0.95", cur: "0.97", trend: "↑", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, c: "Ahead of baseline; buffer building" },
            { m: "CPI", tgt: "≥ 0.95", prev: "1.04", cur: "1.02", trend: "↓", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, c: "Still healthy; contractor costs slightly up" },
            { m: "Defect Escape Rate", tgt: "≤ 5%", prev: "4%", cur: "3%", trend: "↑", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, c: "Improved; additional test automation helping" },
            { m: "Stakeholder Satisfaction", tgt: "≥ 4.0", prev: "4.1", cur: "4.3", trend: "↑", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, c: "Pulse survey trending positive" },
            { m: "Risk Exposure", tgt: "≤ Med", prev: "Med", cur: "Med", trend: "→", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, c: "Vendor API risk still open; mitigation active" },
            { m: "Scope Coverage", tgt: "100%", prev: "58%", cur: "72%", trend: "↑", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, c: "On track for 100% by Sprint 7" },
            { m: "Team Burnout Index", tgt: "≤ Low", prev: "Low", cur: "Low", trend: "→", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, c: "Focus blocks and no-meeting Fridays working well" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.m}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.tgt}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const }}>{r.prev}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 700, textAlign: "center" as const }}>{r.cur}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "14px", textAlign: "center" as const }}>{r.trend}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.c}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTrends = () => (
    <div ref={trendsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📈 TREND ANALYSIS</td></tr></tbody></table>
      <CopyButton targetRef={trendsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Positive Trends</td><td style={S.td0}>[Velocity steadily increasing; defect rate declining; stakeholder satisfaction rising; team morale stable]</td></tr>
        <tr><td style={S.tdLabelAlt}>Concerning Trends</td><td style={S.tdAlt}>[CPI slight downward trend (still green); vendor risk exposure flat — not improving; contractor costs creeping]</td></tr>
        <tr><td style={S.tdLabel}>Leading vs Lagging</td><td style={S.td0}>[Leading indicators (velocity, satisfaction) positive → lagging indicators should follow; watch CPI closely]</td></tr>
        <tr><td style={S.tdLabelAlt}>Forecast Confidence</td><td style={S.tdAlt}>[High confidence in Sprint 7 scope completion; medium confidence in budget target if contractor costs continue rising]</td></tr>
      </tbody></table>
    </div>
  );

  const renderInsights = () => (
    <div ref={insightsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💡 KEY INSIGHTS &amp; DECISIONS</td></tr></tbody></table>
      <CopyButton targetRef={insightsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={{ ...S.thSecondary, width: "15%" }}>Insight Type</th><th style={S.thSecondary}>Insight / Decision</th></tr></thead>
        <tbody>
          {[
            { t: "💡 Insight", d: "[Team velocity improvement correlates with working agreement changes made in Sprint 3 retro]" },
            { t: "⚠️ Warning", d: "[CPI trend needs monitoring — if it drops below 0.98, need to review contractor usage strategy]" },
            { t: "✅ Decision", d: "[Approved: Continue focus blocks and no-meeting Fridays through end of project based on positive burnout metrics]" },
            { t: "💡 Insight", d: "[Defect escape rate improvement linked to test automation investment in Sprint 2 — validates the decision]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.t}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.d}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ ACTIONS FROM REVIEW</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Review contractor cost trend and prepare options paper for sponsor if CPI drops below 0.98]", owner: "[PM]", target: "[Week 9]" },
            { act: "[Escalate vendor API risk if no resolution confirmation received by end of Sprint 5]", owner: "[PM]", target: "[Sprint 5]" },
            { act: "[Add trend visualization to steering committee dashboard for better pattern recognition]", owner: "[PM]", target: "[Next steering]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section E: Measurement &amp; Outcomes • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderScorecard()}{renderTrends()}{renderInsights()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderScorecard()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><BarChart3 size={11} /> Metrics Review</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><BarChart3 size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Metrics Review</h2><p className="text-xs font-medium text-teal-600">Section E: Measurement &amp; Outcomes</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Periodic review of project metrics to identify trends, diagnose issues, and drive data-informed decisions.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MetricsReviewPage() {
  return (<ThemeProvider><MetricsReviewContent /></ThemeProvider>);
}
