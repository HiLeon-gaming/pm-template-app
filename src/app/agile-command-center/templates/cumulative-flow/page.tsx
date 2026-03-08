"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Layers, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Report", desc: "Flow + WIP + analysis", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Flow table only", icon: AlignJustify },
];

function CumulativeFlowContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const wipRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📊 CUMULATIVE FLOW / WIP REPORT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Metrics &amp; Reporting</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Total Stories</td><td style={S.tdAlt}>[8 stories / 23 pts]</td><td style={S.tdLabelAlt}>WIP Limit</td><td style={S.tdAlt}>[3 stories in Dev, 2 in QA]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderFlow = () => (
    <div ref={flowRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📈 CUMULATIVE FLOW (TEXT-BASED)</div>
      <CopyButton targetRef={flowRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track how many stories are in each state each day. Widening bands = bottleneck. Parallel bands = healthy flow.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Day</th>
          <th style={{ ...S.thPrimary, textAlign: "center" as const }}>To Do</th>
          <th style={{ ...S.thPrimary, textAlign: "center" as const }}>In Dev</th>
          <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Code Review</th>
          <th style={{ ...S.thPrimary, textAlign: "center" as const }}>In QA</th>
          <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Done</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Total WIP</th>
        </tr></thead>
        <tbody>
          {[
            { day: "Day 1", todo: "8", dev: "0", cr: "0", qa: "0", done: "0", wip: "0" },
            { day: "Day 2", todo: "5", dev: "3", cr: "0", qa: "0", done: "0", wip: "3" },
            { day: "Day 3", todo: "4", dev: "2", cr: "1", qa: "1", done: "0", wip: "4" },
            { day: "Day 4", todo: "3", dev: "2", cr: "1", qa: "1", done: "1", wip: "4" },
            { day: "Day 5", todo: "2", dev: "3", cr: "0", qa: "1", done: "2", wip: "4" },
            { day: "Day 6", todo: "1", dev: "2", cr: "1", qa: "1", done: "3", wip: "4" },
            { day: "Day 7", todo: "1", dev: "1", cr: "1", qa: "2", done: "3", wip: "4" },
            { day: "Day 8", todo: "1", dev: "1", cr: "0", qa: "2", done: "4", wip: "3" },
            { day: "Day 9", todo: "0", dev: "1", cr: "0", qa: "1", done: "6", wip: "2" },
            { day: "Day 10", todo: "0", dev: "0", cr: "0", qa: "2", done: "6", wip: "2" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const wipNum = parseInt(r.wip);
            const wipColor = wipNum > 4 ? "#DC2626" : wipNum >= 3 ? "#F59E0B" : accent;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "12px" }}>{r.todo}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "12px" }}>{r.dev}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "12px" }}>{r.cr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "12px" }}>{r.qa}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: "#059669" }}>{r.done}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "13px", color: wipColor }}>{r.wip}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWip = () => (
    <div ref={wipRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🚦 WIP ANALYSIS</div>
      <CopyButton targetRef={wipRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Avg WIP", value: "[3.2]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Max WIP", value: "[4]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "WIP Limit", value: "[5]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Limit Breaches", value: "[0]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Bottleneck", value: "[QA Day 10]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>💡 FLOW ANALYSIS</div>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Bottleneck Detected</td><td style={S.td0}>[QA had 2 items on Day 10 while Dev was empty — QA capacity was the constraint at sprint end]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Flow Pattern</td><td style={S.tdAlt}>[Generally healthy — items moved through stages steadily. No major blockages until last 2 days.]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Recommendation</td><td style={S.td0}>[Start QA earlier in sprint; devs should help with QA on Day 9-10 if QA is backlogged.]</td></tr>
        <tr><td style={S.tdLabelAlt}>WIP Observation</td><td style={S.tdAlt}>[WIP stayed within limits (max 4 vs limit 5). Good discipline. Consider tightening to 4.]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Layers size={11} />Flow</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Layers size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Cumulative Flow / WIP Report</h2><p className="text-xs font-medium text-teal-600">Daily Flow Counts + WIP Analysis + Bottleneck Detection</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track story flow through states each day. Surfaces bottlenecks, WIP limit breaches, and flow patterns.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderFlow()}{renderWip()}{renderAnalysis()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderFlow()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CumulativeFlowPage() { return <ThemeProvider><CumulativeFlowContent /></ThemeProvider>; }
