"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "Velocity + metrics + insights", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Velocity table only", icon: AlignJustify },
];

function VelocityMetricsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📊 VELOCITY &amp; SPRINT METRICS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Metrics &amp; Reporting</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint Length</td><td style={S.tdAlt}>[2 weeks]</td><td style={S.tdLabelAlt}>Avg Velocity</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[28 pts (last 6 sprints)]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderVelocity = () => (
    <div ref={velocityRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📈 VELOCITY HISTORY</div>
      <CopyButton targetRef={velocityRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Sprint</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Committed</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Completed</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Accuracy</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Stories</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Carry</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Goal Met</th>
          <th style={S.thPrimary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { sp: "Sprint 8", comm: "23", comp: "20", acc: "87%", stories: "6/8", carry: "2", goal: "Yes", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg, notes: "[Apple Pay shipped; analytics blocked]" },
            { sp: "Sprint 7", comm: "25", comp: "22", acc: "88%", stories: "7/8", carry: "1", goal: "Yes", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg, notes: "[Strong sprint; 1 story deferred by PO]" },
            { sp: "Sprint 6", comm: "30", comp: "24", acc: "80%", stories: "5/9", carry: "4", goal: "Partial", gBg: C.badgeAmberBg, gFg: C.badgeAmberFg, notes: "[Over-committed; vendor delay on 2 stories]" },
            { sp: "Sprint 5", comm: "26", comp: "26", acc: "100%", stories: "8/8", carry: "0", goal: "Yes", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg, notes: "[Clean sprint — all delivered]" },
            { sp: "Sprint 4", comm: "28", comp: "25", acc: "89%", stories: "7/9", carry: "2", goal: "Yes", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg, notes: "[2 low-priority stories carried]" },
            { sp: "Sprint 3", comm: "35", comp: "22", acc: "63%", stories: "5/10", carry: "5", goal: "No", gBg: C.badgeRedBg, gFg: C.badgeRedFg, notes: "[Major over-commit; team was new]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const accNum = parseInt(r.acc);
            const accColor = accNum >= 85 ? "#059669" : accNum >= 70 ? "#F59E0B" : "#DC2626";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.sp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.comm}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.comp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accColor }}>{r.acc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.stories}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", color: r.carry !== "0" ? "#DC2626" : "#059669", fontWeight: 600 }}>{r.carry}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.gBg, r.gFg)}>{r.goal}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🎯 KEY METRICS DASHBOARD</div>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Avg Velocity", value: "[28 pts]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Velocity Range", value: "[22-26]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Avg Accuracy", value: "[85%]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Goal Hit Rate", value: "[83%]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Avg Carryover", value: "[2.3 stories]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr>
          <th style={S.thSecondary}>Metric</th>
          <th style={{ ...S.thSecondary, width: "15%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thSecondary, width: "15%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Commitment Accuracy", curr: "85%", target: "greater than 80%", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Improved since Sprint 3 over-commit]" },
            { metric: "Avg Cycle Time (story)", curr: "3.2 days", target: "under 4 days", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Smaller stories help]" },
            { metric: "Sprint Goal Hit Rate", curr: "83%", target: "greater than 80%", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Missed Sprint 3 and 6]" },
            { metric: "Bug Escape Rate", curr: "2/sprint", target: "under 2/sprint", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Need better test coverage]" },
            { metric: "Carryover Stories", curr: "2.3/sprint", target: "under 2/sprint", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Trending down but not at target]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: accent }}>{r.curr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderInsights = () => (
    <div ref={insightsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>💡 INSIGHTS &amp; RECOMMENDATIONS</div>
      <CopyButton targetRef={insightsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Velocity Trend</td><td style={S.td0}>[Stabilizing around 22-26 pts after early over-commit. Team is right-sizing commitments.]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Planning Recommendation</td><td style={S.tdAlt}>[Use 22-26 pt range for Sprint 9 planning. Do not exceed 28 pts without capacity increase.]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Biggest Improvement</td><td style={S.td0}>[Commitment accuracy improved from 63% to 87% over 6 sprints — better estimation skills.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Area to Watch</td><td style={S.tdAlt}>[Bug escape rate and carryover are at risk. Consider allocating more time for testing and smaller story sizes.]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><BarChart3 size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Velocity &amp; Sprint Metrics</h2><p className="text-xs font-medium text-teal-600">⭐ All-Star &mdash; Multi-Sprint Velocity + Key Metrics Dashboard</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">6-sprint velocity history, key metrics dashboard, and planning recommendations. The data-driven view of team performance.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderVelocity()}{renderMetrics()}{renderInsights()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderVelocity()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function VelocityMetricsPage() { return <ThemeProvider><VelocityMetricsContent /></ThemeProvider>; }
