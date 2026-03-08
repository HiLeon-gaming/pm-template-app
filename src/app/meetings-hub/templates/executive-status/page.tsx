"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Crown, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Update", desc: "Summary + KPIs + risks + asks", icon: LayoutDashboard },
  { id: "compact", label: "Quick Update", desc: "Summary + asks only", icon: AlignJustify },
];

function ExecutiveStatusContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const kpisRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const asksRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#7C3AED"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👑 EXECUTIVE STATUS UPDATE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Executive &amp; Leadership</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Weekly Exec Update / Board Prep]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Presenter</td><td style={S.tdAlt}>[Your Name / Title]</td><td style={S.tdLabelAlt}>Audience</td><td style={S.tdAlt}>[CEO, CFO, CTO, VP Product]</td></tr>
        <tr><td style={S.tdLabel}>Period</td><td style={S.td0}>[Week of 03/03 / Month of March / Q1]</td><td style={S.tdLabel}>Overall Status</td><td style={{ ...S.td0, fontWeight: 800, color: accent }}>[🟢 On Track / 🟡 At Risk / 🔴 Off Track]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 EXECUTIVE SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Headline</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[One sentence: What do execs need to know right now?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Top 3 Wins</td><td style={S.tdAlt}>[1) Win one. 2) Win two. 3) Win three.]</td></tr>
        <tr><td style={S.tdLabel}>Top 3 Concerns</td><td style={{ ...S.td0, color: "#DC2626" }}>[1) Concern one. 2) Concern two. 3) Concern three.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Progress</td><td style={S.tdAlt}>[What moved forward since last update?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderKPIs = () => (
    <div ref={kpisRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 KEY METRICS / KPIs</div>
      <CopyButton targetRef={kpisRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Metric</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Trend</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Commentary</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "[Revenue — Q1 target]", target: "[$2.5M]", actual: "[$2.3M]", trend: "↑", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, comment: "[Behind by $200K — pipeline strong]" },
            { metric: "[Customer NPS]", target: "[45]", actual: "[52]", trend: "↑", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Above target — driven by new feature launch]" },
            { metric: "[Sprint velocity]", target: "[40 pts]", actual: "[38 pts]", trend: "→", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Consistent — within normal range]" },
            { metric: "[Headcount — open roles]", target: "[0]", actual: "[3]", trend: "↓", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, comment: "[3 roles open > 60 days — escalating]" },
            { metric: "[Budget burn rate]", target: "[85%]", actual: "[92%]", trend: "↑", s: "Off Track", sBg: C.badgeRedBg, sFg: C.badgeRedFg, comment: "[Over budget — contractor costs higher]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚠️ RISKS &amp; ESCALATIONS</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Risk / Escalation</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Impact if Unresolved</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Ask / Recommendation</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[Budget overrun — contractor costs 15% over plan]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, impact: "[Q2 budget will be exceeded by $50K]", ask: "[Approve additional $50K or reduce scope]" },
            { risk: "[3 senior roles unfilled > 60 days]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, impact: "[Delivery velocity will drop 20% in Q2]", ask: "[Approve recruiter agency or adjust Q2 targets]" },
            { risk: "[Competitor launched similar feature]", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, impact: "[Market differentiation reduced]", ask: "[Accelerate Feature X launch by 2 weeks]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.ask}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAsks = () => (
    <div ref={asksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🙋 DECISIONS &amp; ASKS</div>
      <CopyButton targetRef={asksRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decision Needed</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[What specific decision do you need from leadership?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Budget Ask</td><td style={S.tdAlt}>[Any budget requests? Be specific on amount and justification.]</td></tr>
        <tr><td style={S.tdLabel}>Resource Ask</td><td style={S.td0}>[Any headcount or resource requests?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Blocker Removal</td><td style={S.tdAlt}>[Any blockers only leadership can remove?]</td></tr>
        <tr><td style={S.tdLabel}>FYI / Awareness</td><td style={S.td0}>[Things leadership should know but no action needed]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Update</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Date / Time]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Crown size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Executive Status Update</h2><p className="text-xs font-medium text-violet-600">⭐ All-Star &mdash; Summary &bull; KPIs &bull; Risks &bull; Asks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Concise executive update: headline summary, key metrics, risks with impact, and clear decisions/asks for leadership.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderKPIs()}{renderRisks()}{renderAsks()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderAsks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ExecutiveStatusPage() { return <ThemeProvider><ExecutiveStatusContent /></ThemeProvider>; }
