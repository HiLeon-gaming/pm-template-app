"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, HeartPulse, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Check", desc: "All dimensions + trends + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Ratings only", icon: AlignJustify },
];

function TeamHealthCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ratingsRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>💚 TEAM HEALTH CHECK</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Team Meetings &nbsp;|&nbsp; Monthly / Quarterly</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Team Size</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[# members]</td></tr>
        <tr><td style={S.tdLabel}>Last Check</td><td style={S.td0}>[MM/DD/YYYY]</td><td style={S.tdLabel}>Method</td><td style={S.td0}>[Anonymous survey / Open discussion / Both]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRatings = () => (
    <div ref={ratingsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 HEALTH DIMENSIONS (Rate 1-5)</div>
      <CopyButton targetRef={ratingsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>1 = Critical &bull; 2 = Struggling &bull; 3 = Neutral &bull; 4 = Good &bull; 5 = Excellent</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Dimension</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Rating</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thPrimary}>Evidence / Comments</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Action Needed?</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Team morale & energy", rating: "[/5]", trend: "[↑↓→]", evidence: "[How are people feeling? Engaged, tired, frustrated?]", action: "" },
            { dim: "Psychological safety", rating: "[/5]", trend: "[↑↓→]", evidence: "[Can people speak up, disagree, admit mistakes?]", action: "" },
            { dim: "Communication quality", rating: "[/5]", trend: "[↑↓→]", evidence: "[Are people informed? Clear? Over/under-communicating?]", action: "" },
            { dim: "Workload balance", rating: "[/5]", trend: "[↑↓→]", evidence: "[Fair distribution? Anyone overloaded or underutilized?]", action: "" },
            { dim: "Collaboration", rating: "[/5]", trend: "[↑↓→]", evidence: "[Working well together? Silos? Conflict?]", action: "" },
            { dim: "Role clarity", rating: "[/5]", trend: "[↑↓→]", evidence: "[Does everyone know their responsibilities?]", action: "" },
            { dim: "Growth & development", rating: "[/5]", trend: "[↑↓→]", evidence: "[Learning opportunities? Career conversations happening?]", action: "" },
            { dim: "Manager support", rating: "[/5]", trend: "[↑↓→]", evidence: "[Do people feel supported by leadership?]", action: "" },
            { dim: "Process & tools", rating: "[/5]", trend: "[↑↓→]", evidence: "[Are processes helping or hindering? Right tools?]", action: "" },
            { dim: "Fun & connection", rating: "[/5]", trend: "[↑↓→]", evidence: "[Team bonding? Do people enjoy working together?]", action: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "10px" }}>{r.dim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: accent }}>{r.rating}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.evidence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Overall Score</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Sum / 50 = __% — compare to last check]</td></tr>
      </tbody></table>
    </div>
  );

  const renderTrends = () => (
    <div ref={trendsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📈 TREND HISTORY</div>
      <CopyButton targetRef={trendsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Date</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Score</th>
          <th style={S.thSecondary}>Lowest Dimension</th>
          <th style={S.thSecondary}>Highest Dimension</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Key Action Taken</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/2026]", score: "[38/50]", low: "[Workload balance — 2/5]", high: "[Collaboration — 5/5]", action: "[Redistributed 3 tasks]" },
            { date: "[12/2025]", score: "[35/50]", low: "[Communication — 2/5]", high: "[Team morale — 4/5]", action: "[Added weekly async update]" },
            { date: "[09/2025]", score: "[32/50]", low: "[Psych safety — 2/5]", high: "[Process — 4/5]", action: "[Started anonymous feedback]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px" }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#DC2626" }}>{r.low}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#059669" }}>{r.high}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ IMPROVEMENT PLAN</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Top Priority</td><td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>[Lowest-scoring dimension — what will you do about it?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Action 1</td><td style={S.tdAlt}>[Specific action — owner — by when]</td></tr>
        <tr><td style={S.tdLabel}>Action 2</td><td style={S.td0}>[Specific action — owner — by when]</td></tr>
        <tr><td style={S.tdLabelAlt}>Share Results?</td><td style={S.tdAlt}>[Will you share results with the team? Transparency builds trust.]</td></tr>
        <tr><td style={S.tdLabel}>Next Health Check</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><HeartPulse size={11} />Health</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><HeartPulse size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Team Health Check</h2><p className="text-xs font-medium text-emerald-600">Monthly / Quarterly &mdash; 10 Dimensions + Trends</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Measure team health across 10 dimensions with ratings, trends, evidence, and improvement actions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderRatings()}{renderTrends()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderRatings()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TeamHealthCheckPage() { return <ThemeProvider><TeamHealthCheckContent /></ThemeProvider>; }
