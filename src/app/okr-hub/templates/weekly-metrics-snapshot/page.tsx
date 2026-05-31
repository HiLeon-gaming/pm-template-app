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
  { id: "full", label: "Full Snapshot", desc: "Metrics + trends + commentary + watch list", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Metrics table only", icon: AlignJustify },
];

function WeeklyMetricsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY METRICS SNAPSHOT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>KEY METRICS THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Top metrics at a glance. Update every Monday. Trend shows direction compared to last week.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Metric</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Last Wk</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>This Wk</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Trend</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Support Avg Wait Time", target: "6 hrs", last: "11 hrs", curr: "10 hrs", trend: "&#9650;", tColor: accent, h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[Tom R.]" },
            { metric: "CSAT Score", target: "4.5", last: "4.2", curr: "4.3", trend: "&#9650;", tColor: accent, h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[Lisa P.]" },
            { metric: "NPS", target: "55", last: "40", curr: "42", trend: "&#9650;", tColor: accent, h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[CX Lead]" },
            { metric: "MQLs (Monthly)", target: "400", last: "260", curr: "280", trend: "&#9650;", tColor: accent, h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[Amy K.]" },
            { metric: "Enterprise Pipeline Deals", target: "3 closed", last: "1", curr: "1", trend: "&#9654;", tColor: "#D97706", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, owner: "[Mike D.]" },
            { metric: "Avg Sales Cycle (days)", target: "60", last: "78", curr: "75", trend: "&#9650;", tColor: accent, h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, owner: "[Sales Ops]" },
            { metric: "Open Roles Filled", target: "5", last: "3", curr: "4", trend: "&#9650;", tColor: accent, h: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, owner: "[HR]" },
            { metric: "Employee Engagement", target: "85%", last: "68%", curr: "68%", trend: "&#9654;", tColor: "#D97706", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, owner: "[PeopleOps]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: "#7C3AED", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.last}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.curr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px", color: r.tColor }} dangerouslySetInnerHTML={{ __html: r.trend }} />
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.h}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderComment = () => (
    <div ref={commentRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>COMMENTARY — WHAT CHANGED &amp; WHY</td></tr></tbody></table>
      <CopyButton targetRef={commentRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          { metric: "Support Wait Time", note: "Improved 1 hr due to new ticket triage process. New agents start next week — expect bigger drop." },
          { metric: "MQLs", note: "LinkedIn campaign driving 20+ new MQLs this week. Testing 3 ad variations — best performer gets more budget." },
          { metric: "Enterprise Pipeline", note: "Flat — still at 1 deal in pipeline. Need warm intros urgently. Cold outreach alone isn't working." },
          { metric: "Engagement", note: "Flat at 68%. Pulse survey going out next week. Manager training scheduled for Week 6." },
        ].map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, width: "18%", fontWeight: 700, fontSize: "10px", color: "#D97706" }}>{r.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.note}</td>
            </tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderWatch = () => (
    <div ref={watchRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>WATCH LIST (Metrics Trending Wrong Direction)</td></tr></tbody></table>
      <CopyButton targetRef={watchRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Metric</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Weeks Flat/Down</th>
          <th style={S.thPrimary}>Concern</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Action if No Change by [Date]</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Enterprise Pipeline", weeks: "3", concern: "Only 1 deal in pipeline. Need 10+ opps to close 3.", action: "If no new opps by Week 6, bring in outsourced SDR team." },
            { metric: "Employee Engagement", weeks: "2", concern: "Score dropped from 72% to 68% and hasn't recovered.", action: "If pulse survey confirms, schedule CEO listening sessions Week 7." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.weeks}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.concern}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.action}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><BarChart3 size={11} />Metrics</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><BarChart3 size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Metrics Snapshot</h2><p className="text-xs font-medium text-emerald-600">Top KPIs &bull; Trend &bull; What Changed</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">All key metrics in one view. Updated every Monday. Keeps metrics visible and drives action.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderMetrics()}{renderComment()}{renderWatch()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMetrics()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyMetricsSnapshotPage() { return <ThemeProvider><WeeklyMetricsContent /></ThemeProvider>; }
