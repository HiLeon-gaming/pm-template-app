"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TrendingUp, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full QBR", desc: "Performance + initiatives + risks + next Q", icon: LayoutDashboard },
  { id: "compact", label: "Quick QBR", desc: "Scorecard + next Q priorities", icon: AlignJustify },
];

function QBRContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scorecardRef = useRef<HTMLDivElement>(null);
  const initiativesRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const nextQRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📈 QUARTERLY BUSINESS REVIEW (QBR)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Executive &amp; Leadership</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Quarter</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Q1 2026]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Presenter</td><td style={S.tdAlt}>[VP / Director / Department Head]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[90 minutes]</td></tr>
        <tr><td style={S.tdLabel}>Audience</td><td colSpan={3} style={S.td0}>[CEO, CFO, CTO, Board Members]</td></tr>
        <tr><td style={S.tdLabelAlt}>Quarter Summary</td><td colSpan={3} style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[One sentence: How did Q1 go? Met / Exceeded / Missed targets.]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderScorecard = () => (
    <div ref={scorecardRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 QUARTERLY SCORECARD</td></tr></tbody></table>
      <CopyButton targetRef={scorecardRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>KPI / Metric</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Q Target</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Q Actual</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>%</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Trend</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Commentary</th>
        </tr></thead>
        <tbody>
          {[
            { kpi: "Revenue", target: "$2.5M", actual: "$2.3M", pct: "92%", s: "🟡", trend: "↑", comment: "[Missed by $200K — pipeline strong for Q2]" },
            { kpi: "New Customers", target: "50", actual: "58", pct: "116%", s: "🟢", trend: "↑", comment: "[Exceeded — new marketing channel working]" },
            { kpi: "Customer Retention", target: "95%", actual: "93%", pct: "98%", s: "🟡", trend: "↓", comment: "[Slightly below — churn in mid-market segment]" },
            { kpi: "NPS Score", target: "45", actual: "52", pct: "116%", s: "🟢", trend: "↑", comment: "[Strong — driven by new feature launch]" },
            { kpi: "Sprint Velocity", target: "40 pts", actual: "38 pts", pct: "95%", s: "🟢", trend: "→", comment: "[Within normal variance]" },
            { kpi: "Employee Satisfaction", target: "4.0", actual: "3.8", pct: "95%", s: "🟡", trend: "↓", comment: "[Slight dip — workload concerns flagged]" },
            { kpi: "Budget Utilization", target: "100%", actual: "94%", pct: "94%", s: "🟢", trend: "→", comment: "[Under budget — hiring delays]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.kpi}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.pct}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.s}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderInitiatives = () => (
    <div ref={initiativesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🏆 KEY INITIATIVES STATUS</td></tr></tbody></table>
      <CopyButton targetRef={initiativesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Initiative</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Progress</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Q1 Result</th>
        </tr></thead>
        <tbody>
          {[
            { init: "[Platform rebuild — Phase 1]", s: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, progress: "100%", owner: "[CTO]", result: "[Phase 1 launched on time, Phase 2 starting Q2]" },
            { init: "[New market segment entry]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, progress: "60%", owner: "[CRO]", result: "[Pilot customers signed, scaling in Q2]" },
            { init: "[AI feature development]", s: "Delayed", sBg: C.badgeRedBg, sFg: C.badgeRedFg, progress: "30%", owner: "[CPO]", result: "[2 weeks behind — data pipeline issues]" },
            { init: "[SOC 2 certification]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, progress: "75%", owner: "[CISO]", result: "[Audit scheduled for Q2, controls in place]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.init}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.progress}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>⚠️ RISKS &amp; CHALLENGES</td></tr></tbody></table>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Top Risk #1</td><td style={S.td0}>[Description — impact — mitigation plan]</td></tr>
        <tr><td style={S.tdLabelAlt}>Top Risk #2</td><td style={S.tdAlt}>[Description — impact — mitigation plan]</td></tr>
        <tr><td style={S.tdLabel}>Top Risk #3</td><td style={S.td0}>[Description — impact — mitigation plan]</td></tr>
        <tr><td style={S.tdLabelAlt}>Lessons from Q1</td><td style={S.tdAlt}>[What did we learn this quarter that changes our approach?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderNextQ = () => (
    <div ref={nextQRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔮 NEXT QUARTER PLAN (Q2)</td></tr></tbody></table>
      <CopyButton targetRef={nextQRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Q2 Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Target / Key Result</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Resources Needed</th>
        </tr></thead>
        <tbody>
          {[
            { priority: "[Close revenue gap — accelerate pipeline conversion]", owner: "[CRO]", target: "[$3.0M Q2 revenue]", resources: "[2 additional SDRs]" },
            { priority: "[Launch AI feature — recover 2-week delay]", owner: "[CPO]", target: "[Beta by 04/30, GA by 05/31]", resources: "[1 ML engineer]" },
            { priority: "[Reduce mid-market churn — retention playbook]", owner: "[CS Lead]", target: "[95% retention by Q2 end]", resources: "[Customer success tooling]" },
            { priority: "[Complete SOC 2 audit]", owner: "[CISO]", target: "[Certification by 06/30]", resources: "[Audit firm engaged]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.priority}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.resources}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Asks from Leadership</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[What do you need from execs to succeed in Q2?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next QBR</td><td style={S.tdAlt}>[Date — end of Q2]</td></tr>
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
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><TrendingUp size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quarterly Business Review (QBR)</h2><p className="text-xs font-medium text-violet-600">⭐ All-Star &mdash; Scorecard &bull; Initiatives &bull; Risks &bull; Next Q</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Complete QBR template: quarterly scorecard, initiative status, risks, lessons learned, and next quarter priorities.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderScorecard()}{renderInitiatives()}{renderRisks()}{renderNextQ()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderScorecard()}{renderNextQ()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function QBRPage() { return <ThemeProvider><QBRContent /></ThemeProvider>; }
