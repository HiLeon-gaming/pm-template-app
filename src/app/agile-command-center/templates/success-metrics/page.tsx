"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TrendingUp, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "North Star + details", icon: LayoutDashboard },
  { id: "compact", label: "Metrics Only", desc: "Quick reference", icon: AlignJustify },
];

function SuccessMetricsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const northRef = useRef<HTMLDivElement>(null);
  const leadingRef = useRef<HTMLDivElement>(null);
  const laggingRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📈 SUCCESS METRICS + NORTH STAR TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Product Strategy &amp; Value</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Period</td><td style={{ ...S.td0, width: "32%" }}>[Q1 2026 / Sprint 7–12]</td></tr>
        <tr><td style={S.tdLabelAlt}>Owner</td><td style={S.tdAlt}>[Product Owner]</td><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderNorthStar = () => (
    <div ref={northRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⭐ NORTH STAR METRIC</td></tr></tbody></table>
      <CopyButton targetRef={northRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>North Star Metric</td><td style={{ ...S.td0, fontWeight: 700, fontSize: "14px" }}>[e.g., Weekly Active Transactions]</td></tr>
        <tr><td style={S.tdLabelAlt}>Why this metric?</td><td style={S.tdAlt}>[It captures the core value exchange — users completing purchases means the product is delivering]</td></tr>
        <tr><td style={S.tdLabel}>Current Value</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>[2,400 / week]</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Target</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>[4,000 / week by end of Q1]</span></td></tr>
        <tr><td style={{ ...S.tdLabel, fontWeight: 700, color: accent }}>Trend</td><td style={S.td0}>
          <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>↑ +12% vs last month</span>
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderLeading = () => (
    <div ref={leadingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🟢 LEADING INDICATORS (Predict Future Success)</td></tr></tbody></table>
      <CopyButton targetRef={leadingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "24%" }}>Metric</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thPrimary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { m: "Sprint velocity", curr: "[32 pts]", tgt: "[35 pts]", trend: "↑", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, notes: "[Improving as team stabilizes]" },
            { m: "Stories passing DoD first time", curr: "[78%]", tgt: "[90%]", trend: "↑", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, notes: "[Better refinement helping]" },
            { m: "Blocker resolution time", curr: "[18 hrs]", tgt: "[< 8 hrs]", trend: "→", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, notes: "[Vendor delays still an issue]" },
            { m: "Backlog items refined", curr: "[2 sprints]", tgt: "[2+ sprints]", trend: "✓", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, notes: "[On track]" },
            { m: "[Add metric]", curr: "", tgt: "", trend: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.m}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px", fontWeight: 600 }}>{r.curr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>{r.tgt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.trend}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderLagging = () => (
    <div ref={laggingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔵 LAGGING INDICATORS (Confirm Past Success)</td></tr></tbody></table>
      <CopyButton targetRef={laggingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "24%" }}>Metric</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { m: "Customer satisfaction (NPS)", curr: "[42]", tgt: "[50+]", trend: "↑", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, notes: "[Up from 38 last quarter]" },
            { m: "Revenue per transaction", curr: "[$47]", tgt: "[$55]", trend: "→", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, notes: "[Flat — need upsell features]" },
            { m: "Support tickets / week", curr: "[120]", tgt: "[< 80]", trend: "↓", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, notes: "[Down from 145 — good progress]" },
            { m: "Time to market (avg feature)", curr: "[3.2 sprints]", tgt: "[2 sprints]", trend: "→", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, notes: "[Dependencies slowing delivery]" },
            { m: "[Add metric]", curr: "", tgt: "", trend: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.m}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px", fontWeight: 600 }}>{r.curr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>{r.tgt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.trend}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDashboard = () => (
    <div ref={dashRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 METRIC HEALTH DASHBOARD</td></tr></tbody></table>
      <CopyButton targetRef={dashRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "North Star", value: "[2,400]", target: "4,000", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Velocity", value: "[32 pts]", target: "35 pts", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "DoD Pass Rate", value: "[78%]", target: "90%", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "NPS", value: "[42]", target: "50+", color: C.badgeAmberBg, fg: C.badgeAmberFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", padding: "10px 8px", color: C.primary }}>{m.value}<br /><span style={{ fontSize: "10px", fontWeight: 500, color: C.textMuted }}>Target: {m.target}</span></td></tr>
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

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderNorthStar()}{renderDashboard()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderLeading()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderLagging()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderNorthStar()}{renderDashboard()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><TrendingUp size={11} />Metrics</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><TrendingUp size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Success Metrics + North Star Tracker</h2><p className="text-xs font-medium text-violet-600">Leading &amp; Lagging Indicators — Stop Busy Work, Focus the Team</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">North Star metric, leading and lagging indicators with targets and trends, and a quick health dashboard. Stops &ldquo;busy work&rdquo; and focuses the team on what matters.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function SuccessMetricsPage() { return <ThemeProvider><SuccessMetricsContent /></ThemeProvider>; }
