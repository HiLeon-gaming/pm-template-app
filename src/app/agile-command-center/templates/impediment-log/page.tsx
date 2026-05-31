"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertTriangle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Details + escalation + trends", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Impediment table only", icon: AlignJustify },
];

function ImpedimentLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const escalationRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0891B2"; const accentDark = "#0E7490";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚧 IMPEDIMENT LOG (DETAILED)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Daily Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>SM</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Open Impediments</td><td style={S.tdAlt}>[##]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 IMPEDIMENT TRACKER</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Raised</th>
          <th style={S.thPrimary}>Impediment</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Blocking</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Next Step</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[MM/DD]", imp: "[Analytics API key not provided by DevOps]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, blocking: "[S-014]", own: "[SM]", next: "[Escalated to DevOps lead]", due: "[Today]", s: "Escalated", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "[MM/DD]", imp: "[Test environment slow — QA throughput reduced 40%]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, blocking: "[All QA]", own: "[DevOps]", next: "[Memory upgrade scheduled]", due: "[Tomorrow]", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "[MM/DD]", imp: "[Vendor sandbox access delayed for shipping API]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, blocking: "[Spike]", own: "[SM]", next: "[Spike deferred to Sprint 9]", due: "[N/A]", s: "Mitigated", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[MM/DD]", imp: "[Design review backlog — UX reviewing 3 stories at once]", impact: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg, blocking: "[S-016]", own: "[UX Lead]", next: "[Prioritize checkout stories first]", due: "[Wed]", s: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "[Add]", imp: "", impact: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, blocking: "", own: "", next: "", due: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: accent, fontWeight: 600 }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.imp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: accent }}>{r.blocking}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.next}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escalationRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⬆️ ESCALATION PATH</td></tr></tbody></table>
      <CopyButton targetRef={escalationRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Level 1 (Team)</td><td style={S.td0}>[SM tries to resolve within 24 hours using team resources]</td></tr>
        <tr><td style={S.tdLabelAlt}>Level 2 (Manager)</td><td style={S.tdAlt}>[SM escalates to Engineering Manager / Product Director if unresolved after 24h]</td></tr>
        <tr><td style={S.tdLabel}>Level 3 (Leadership)</td><td style={S.td0}>[Engineering Director / VP if blocking sprint goal and no resolution after 48h]</td></tr>
        <tr><td style={S.tdLabelAlt}>Escalation Contacts</td><td style={S.tdAlt}>[Name — Role — Email / Slack for each level]</td></tr>
      </tbody></table>
    </div>
  );

  const renderTrends = () => (
    <div ref={trendsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 IMPEDIMENT SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={trendsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Open", value: "[2]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "In Progress", value: "[1]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Mitigated", value: "[1]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Avg Age (days)", value: "[2.5]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "20px", padding: "10px 8px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"><AlertTriangle size={11} />Impediments</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><AlertTriangle size={20} className="text-cyan-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Impediment Log (Detailed)</h2><p className="text-xs font-medium text-cyan-600">Blocker, Owner, Escalation, Next Step &amp; Due Date</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Detailed impediment tracking with escalation path, ownership, and summary metrics. Prevents blockers from aging.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderEscalation()}{renderTrends()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ImpedimentLogPage() { return <ThemeProvider><ImpedimentLogContent /></ThemeProvider>; }
