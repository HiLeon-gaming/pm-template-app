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
  { id: "full", label: "Full Tracker", desc: "Allocation + utilization + forecast", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Allocation table only", icon: AlignJustify },
];

function ResourceAllocationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const allocRef = useRef<HTMLDivElement>(null);
  const utilRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x1F4CA; RESOURCE ALLOCATION TRACKER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Resource Allocation Tracker monitors how team members are assigned across project tasks and time periods.</strong> It identifies over-allocation, under-utilization, and capacity gaps to enable proactive resource management decisions.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>execution and monitoring</strong> to balance workloads. Aligns with PMBOK Resource Management &#x2014; Monitoring &amp; Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Reporting Period</td><td style={{ ...S.td0, width: "32%" }}>[Week/Month of MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"];
  const team = [
    { name: "[Sarah Chen]", role: "PM", allocs: [100, 100, 100, 100, 100, 80] },
    { name: "[James Liu]", role: "BA", allocs: [100, 100, 80, 60, 40, 20] },
    { name: "[Maria Gomez]", role: "Dev Lead", allocs: [20, 60, 100, 100, 100, 100] },
    { name: "[David Park]", role: "QA Lead", allocs: [0, 20, 40, 80, 100, 100] },
    { name: "[Lisa Wong]", role: "Architect", allocs: [50, 50, 30, 20, 10, 0] },
    { name: "[Tom Brown]", role: "Dev 2", allocs: [0, 40, 100, 100, 100, 80] },
    { name: "[Add resource]", role: "", allocs: [0, 0, 0, 0, 0, 0] },
  ];

  const getAllocBadge = (pct: number) => {
    if (pct === 0) return { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
    if (pct <= 50) return { bg: C.badgeGreenBg, fg: C.badgeGreenFg };
    if (pct <= 80) return { bg: C.badgeBlueBg, fg: C.badgeBlueFg };
    if (pct <= 100) return { bg: C.badgeAmberBg, fg: C.badgeAmberFg };
    return { bg: C.badgeRedBg, fg: C.badgeRedFg };
  };

  const renderAlloc = () => (
    <div ref={allocRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CB; WEEKLY ALLOCATION (% OF TIME)</div>
      <CopyButton targetRef={allocRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "14%" }}>Resource</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Role</th>
          {weeks.map((w, i) => (<th key={i} style={{ ...S.thPrimary, textAlign: "center" as const, fontSize: "10px" }}>{w}</th>))}
          <th style={{ ...S.thPrimary, textAlign: "center" as const, fontSize: "10px" }}>Avg %</th>
        </tr></thead>
        <tbody>
          {team.map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const avg = Math.round(t.allocs.reduce((a, b) => a + b, 0) / t.allocs.length);
            const avgBadge = getAllocBadge(avg);
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{t.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{t.role}</td>
              {t.allocs.map((a, j) => {
                const ab = getAllocBadge(a);
                return (<td key={j} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  {a > 0 ? <span style={S.badge(ab.bg, ab.fg)}>{a}%</span> : <span style={{ color: C.textMuted, fontSize: "10px" }}>&#x2014;</span>}
                </td>);
              })}
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(avgBadge.bg, avgBadge.fg), fontWeight: 800 }}>{avg > 0 ? `${avg}%` : "&#x2014;"}</span></td>
            </tr>);
          })}
          <tr>
            <td colSpan={2} style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>TEAM TOTAL</td>
            {weeks.map((_, wi) => {
              const total = team.reduce((sum, t) => sum + t.allocs[wi], 0);
              const avg = Math.round(total / team.length);
              return (<td key={wi} style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, backgroundColor: C.primary, color: C.white, fontSize: "11px" }}>{avg}%</td>);
            })}
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, backgroundColor: C.accent, color: C.white }}>{Math.round(team.reduce((s, t) => s + t.allocs.reduce((a, b) => a + b, 0), 0) / (team.length * weeks.length))}%</td>
          </tr>
        </tbody>
      </table>
      <p style={S.subNote}>Color key: <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>&#x2264;50%</span> <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>51-80%</span> <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>81-100%</span> <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>&gt;100%</span></p>
    </div>
  );

  const renderUtil = () => (
    <div ref={utilRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4C8; UTILIZATION ANALYSIS</div>
      <CopyButton targetRef={utilRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "16%" }}>Resource</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Planned Hrs</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Actual Hrs</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Utilization</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Sarah Chen]", planned: "[40]", actual: "[42]", util: "105%", status: "Over", sBg: C.badgeRedBg, sFg: C.badgeRedFg, note: "[Working overtime on risk mitigation]" },
            { name: "[James Liu]", planned: "[40]", actual: "[36]", util: "90%", status: "On Target", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, note: "[Requirements phase winding down]" },
            { name: "[Maria Gomez]", planned: "[40]", actual: "[44]", util: "110%", status: "Over", sBg: C.badgeRedBg, sFg: C.badgeRedFg, note: "[Sprint crunch &#x2014; monitor burnout risk]" },
            { name: "[David Park]", planned: "[30]", actual: "[28]", util: "93%", status: "On Target", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, note: "[Ramping up for testing phase]" },
            { name: "[Lisa Wong]", planned: "[20]", actual: "[12]", util: "60%", status: "Under", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, note: "[Available capacity &#x2014; can support other projects]" },
            { name: "[Add resource]", planned: "", actual: "", util: "", status: "&#x2014;", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, note: "" },
          ].map((u, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{u.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{u.planned}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{u.actual}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{u.util}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(u.sBg, u.sFg)}>{u.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{u.note}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderForecast = () => (
    <div ref={forecastRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F52E; RESOURCE FORECAST</div>
      <CopyButton targetRef={forecastRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "16%" }}>Role / Skill</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Needed</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Gap</th>
          <th style={S.thSecondary}>Action Plan</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Senior Developer", cur: "[2]", need: "[3]", gap: "-1", gBg: C.badgeRedBg, gFg: C.badgeRedFg, action: "[Request contractor from vendor; needed by [date]]" },
            { role: "QA Engineer", cur: "[1]", need: "[2]", gap: "-1", gBg: C.badgeRedBg, gFg: C.badgeRedFg, action: "[Internal transfer request submitted to QA dept]" },
            { role: "Business Analyst", cur: "[1]", need: "[1]", gap: "0", gBg: C.badgeGreenBg, gFg: C.badgeGreenFg, action: "[Adequate &#x2014; will release 40% in Wk 5]" },
            { role: "DBA", cur: "[0]", need: "[1]", gap: "-1", gBg: C.badgeAmberBg, gFg: C.badgeAmberFg, action: "[Part-time support from shared DBA pool; 20% allocation]" },
            { role: "[Add role]", cur: "", need: "", gap: "&#x2014;", gBg: C.badgeGrayBg, gFg: C.badgeGrayFg, action: "" },
          ].map((f, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{f.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{f.cur}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{f.need}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(f.gBg, f.gFg)}>{f.gap}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{f.action}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4CA; CAPACITY SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "30%" }}>Total Team Members</td><td style={S.td0}>[6] active resources</td></tr>
          <tr><td style={S.tdLabelAlt}>Avg Team Utilization</td><td style={S.tdAlt}>[87]% &#x2014; <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Near Capacity</span></td></tr>
          <tr><td style={S.tdLabel}>Over-Allocated Resources</td><td style={S.td0}>[2] &#x2014; [Sarah Chen, Maria Gomez] &#x2014; <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Action Needed</span></td></tr>
          <tr><td style={S.tdLabelAlt}>Under-Utilized Resources</td><td style={S.tdAlt}>[1] &#x2014; [Lisa Wong at 60%] &#x2014; available for reallocation</td></tr>
          <tr><td style={S.tdLabel}>Open Resource Gaps</td><td style={S.td0}>[3] positions &#x2014; Sr Dev, QA Engineer, DBA (part-time)</td></tr>
          <tr><td style={S.tdLabelAlt}>Key Risk</td><td style={S.tdAlt}>[Dev Lead burnout risk if sprint pace continues; need additional developer by Wk 3]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAlloc()}{renderUtil()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderForecast()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderSummary()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAlloc()}{renderSummary()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><BarChart3 size={11} /> Allocation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><BarChart3 size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Resource Allocation Tracker</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Resource Management &#x2022; Monitoring &amp; Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Monitors team allocation across time periods with utilization analysis and capacity forecasting. Full Tracker includes all sections; Quick View shows weekly allocation and capacity summary.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ResourceAllocationTrackerPage() {
  return (<ThemeProvider><ResourceAllocationContent /></ThemeProvider>);
}
