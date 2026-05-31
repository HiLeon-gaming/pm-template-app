"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Crosshair, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Planner", desc: "Baselines + targets + gap analysis + stretch guide", icon: LayoutDashboard },
  { id: "compact", label: "Quick Planner", desc: "Baseline/target table only", icon: AlignJustify },
];

function BaselineTargetContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  const stretchRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>BASELINE &amp; TARGET PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Where We Are → Where We&apos;re Going</td></tr>
    </tbody></table>
  );

  const renderTable = () => (
    <div ref={tableRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>BASELINE &amp; TARGET TABLE — Q[X] [YEAR]</td></tr></tbody></table>
      <CopyButton targetRef={tableRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A baseline is where you are TODAY. A target is where you want to be by end of quarter. Without a clear baseline, you can&apos;t measure progress. Without a clear target, you can&apos;t know if you succeeded.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Baseline (Now)</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target (Goal)</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Gap</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Stretch?</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Data Source</th>
          <th style={S.thPrimary}>How We&apos;ll Close the Gap</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "Support wait → 6 hrs", base: "18 hrs", target: "6 hrs", gap: "12 hrs", stretch: "Yes", source: "Intercom", how: "Hire 3 agents + launch new ticketing system" },
            { kr: "CSAT → 4.5", base: "4.1", target: "4.5", gap: "0.4 pts", stretch: "No", source: "Intercom", how: "Redesign onboarding + proactive check-ins" },
            { kr: "NPS → 55", base: "35", target: "55", gap: "20 pts", stretch: "Yes", source: "Delighted", how: "Detractor recovery program + feature improvements" },
            { kr: "Leads → 400/mo", base: "200", target: "400", gap: "200", stretch: "Yes", source: "HubSpot", how: "Paid ads + content marketing + events" },
            { kr: "3 enterprise deals", base: "0", target: "3", gap: "3 deals", stretch: "Yes", source: "Salesforce", how: "Enterprise playbook + case studies + dedicated AE" },
            { kr: "Sales cycle → 60 days", base: "90 days", target: "60 days", gap: "30 days", stretch: "No", source: "Salesforce", how: "Streamline legal review + pre-built proposals" },
            { kr: "Fill 5 roles", base: "0", target: "5", gap: "5 hires", stretch: "No", source: "Greenhouse", how: "Recruiter sprint + referral bonus + agency backup" },
            { kr: "Engagement > 85%", base: "72%", target: "85%", gap: "13 pts", stretch: "Yes", source: "Culture Amp", how: "Monthly pulse + act on top issues + manager training" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.base}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.stretch === "Yes" ? C.badgeAmberBg : C.badgeGreenBg, r.stretch === "Yes" ? C.badgeAmberFg : C.badgeGreenFg)}>{r.stretch}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#7C3AED" }}>{r.source}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.how}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGapAndStretch = () => (
    <div ref={gapRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={gapRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>⚠️ GAP RISKS</td></tr></thead>
            <tbody>
              {[
                { kr: "NPS → 55 (gap: 20 pts)", risk: "Huge jump. Detractor issues may be structural.", mit: "Interim target 45 by mid-Q. Adjust to 50 if off pace by Wk 6." },
                { kr: "3 enterprise deals", risk: "Long sales cycles. Legal review 3+ weeks.", mit: "Front-load pipeline. 10+ opps to close 3. Pre-clear legal." },
                { kr: "Engagement > 85%", risk: "Dropped to 68%. 17pt gap. Morale may be deeper.", mit: "1:1 listening Wk 1. Top 3 issues acted on within 2 wks." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <strong style={{ color: "#DC2626" }}>{r.kr}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.risk}</span><br />
                      <span style={{ fontSize: "9px", color: accent, fontWeight: 600 }}>Mitigation: {r.mit}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>🎯 TARGET LEVEL GUIDE</td></tr></thead>
            <tbody>
              {[
                { type: "Committed", conf: "90%+", confColor: "#059669", use: "Must-hit. Failure has serious consequences.", ex: "'Churn ≤ 5%' — non-negotiable" },
                { type: "Target", conf: "60–70%", confColor: accent, use: "Ambitious but achievable. Sweet spot for most OKRs.", ex: "'Leads 200 → 400/mo' — stretch but doable" },
                { type: "Stretch", conf: "30–50%", confColor: "#DC2626", use: "Aspirational moonshots. Expect 0.5–0.7 scores.", ex: "'NPS 55' — huge jump, might land at 45–50" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong>{r.type}</strong> <span style={{ color: r.confColor, fontWeight: 800 }}>{r.conf}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.use}</span><br />
                      <span style={{ fontSize: "9px", fontStyle: "italic", color: C.textMuted }}>{r.ex}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Crosshair size={11} />Targets</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Crosshair size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Baseline &amp; Target Planner</h2><p className="text-xs font-medium text-amber-600">Where We Are → Where We&apos;re Going</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Sets starting points and end-of-quarter targets with gap analysis. No more guessing.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderTable()}{renderGapAndStretch()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTable()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function BaselineTargetPlannerPage() { return <ThemeProvider><BaselineTargetContent /></ThemeProvider>; }
