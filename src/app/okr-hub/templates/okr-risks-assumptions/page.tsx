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
  { id: "full", label: "Full Page", desc: "Assumptions + risks + validation plan + examples", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Assumptions + risks tables only", icon: AlignJustify },
];

function RisksAssumptionsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const assumeRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const validRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OKR RISKS &amp; ASSUMPTIONS PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; What Must Be True + What Could Go Wrong</td></tr>
    </tbody></table>
  );

  const renderAssume = () => (
    <div ref={assumeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ASSUMPTIONS (What Must Be True for OKRs to Succeed)</div>
      <CopyButton targetRef={assumeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>An assumption is something you BELIEVE to be true but haven&apos;t fully proven yet. If an assumption turns out to be wrong, it can derail your entire OKR. List them so you can validate them early.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Links To</th>
          <th style={S.thPrimary}>Assumption (What We Believe Is True)</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Confidence</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>What Happens If It&apos;s Wrong</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Validated?</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "KR 1.1", assume: "[We can hire 3 qualified support agents within 4 weeks]", conf: "7/10", wrong: "Support wait time stays high. Must use contract staff or automate.", valid: "Partly", vBg: C.badgeAmberBg, vFg: C.badgeAmberFg },
            { kr: "KR 1.2", assume: "[Redesigning onboarding will improve CSAT by 0.4+ points]", conf: "5/10", wrong: "CSAT stays flat. Need to identify other drivers of dissatisfaction.", valid: "No", vBg: C.badgeRedBg, vFg: C.badgeRedFg },
            { kr: "KR 2.1", assume: "[LinkedIn paid ads will generate leads at <$75 CPL]", conf: "4/10", wrong: "Marketing budget burns fast with low return. Must pivot to organic/events.", valid: "Testing", vBg: C.badgeAmberBg, vFg: C.badgeAmberFg },
            { kr: "KR 2.2", assume: "[Enterprise prospects in pipeline will close within 60 days]", conf: "3/10", wrong: "Revenue target at risk. Need more pipeline or longer timeline.", valid: "No", vBg: C.badgeRedBg, vFg: C.badgeRedFg },
            { kr: "KR 3.1", assume: "[VP Engineering candidates will accept our comp package]", conf: "6/10", wrong: "Critical role stays open. Must increase budget or adjust role scope.", valid: "Partly", vBg: C.badgeAmberBg, vFg: C.badgeAmberFg },
            { kr: "KR 3.2", assume: "[Monthly pulse surveys will surface actionable engagement insights]", conf: "5/10", wrong: "Engagement data is vague. Need better questions or 1:1 interviews.", valid: "No", vBg: C.badgeRedBg, vFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: accent }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.assume}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: parseInt(r.conf) >= 6 ? "#059669" : "#DC2626" }}>{r.conf}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.wrong}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.vBg, r.vFg)}>{r.valid}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisk = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>TOP RISKS (What Could Derail Us)</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A risk is something that MIGHT happen and would hurt your ability to hit OKRs. Naming risks early lets you prepare for them instead of being surprised.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Risk Description</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Likelihood</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Affects Which OKR</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Mitigation Plan</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[Key sales rep resigns mid-quarter — pipeline disruption]", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, okr: "OBJ 2 (Revenue)", owner: "[VP Sales]", mit: "Retention convo ASAP. Pipeline distributed across 2+ reps." },
            { risk: "[Legal review delays enterprise deal by 3+ weeks]", like: "High", lBg: C.badgeRedBg, lFg: C.badgeRedFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, okr: "KR 2.2 (Deals)", owner: "[Legal]", mit: "Pre-clear legal terms. Escalate to GC if >5 day delay." },
            { risk: "[Engineering team burnout — attrition risk]", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, okr: "OBJ 3 (Team)", owner: "[VP Eng]", mit: "Cancel non-essential meetings. Implement no-meeting Fridays." },
            { risk: "[Competitor launches similar product feature]", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, okr: "OBJ 1 (CX)", owner: "[Product]", mit: "Accelerate differentiating features. Focus on service, not just product." },
            { risk: "[Budget cut mid-quarter due to market conditions]", like: "Low", lBg: C.badgeGreenBg, lFg: C.badgeGreenFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, okr: "All OKRs", owner: "[CFO]", mit: "Identify which initiatives can be paused. Protect top 2 OKRs." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.lBg, r.lFg)}>{r.like}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: accent }}>{r.okr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.mit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderValidAndTips = () => (
    <div ref={validRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={validRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>🧪 VALIDATION PLAN</td></tr></thead>
            <tbody>
              {[
                { assume: "LinkedIn ads < $75 CPL", test: "$2K test campaign, 2 weeks. Measure CPL.", by: "Week 3", owner: "[Marketing]", planB: "Shift to content + events" },
                { assume: "Hire 3 agents in 4 weeks", test: "Check pipeline Week 1. <10 applicants = adjust.", by: "Week 1", owner: "[Recruiter]", planB: "Contract staffing agency" },
                { assume: "Enterprise deals close 60 days", test: "Track stages weekly. Stuck >2 wks = escalate.", by: "Week 4", owner: "[Sales]", planB: "More pipeline or adjust target" },
                { assume: "Onboarding redesign improves CSAT", test: "A/B test new vs old for 500 users.", by: "Week 5", owner: "[Product]", planB: "Survey detractors for root cause" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 700 }}>{r.assume}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>Test: {r.test} &nbsp;|&nbsp; By: <span style={{ fontWeight: 700, color: "#059669" }}>{r.by}</span> &nbsp;|&nbsp; {r.owner}</span><br />
                      <span style={{ fontSize: "9px", color: "#DC2626" }}>Plan B: {r.planB}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>💡 RISK &amp; ASSUMPTION TIPS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Review risks weekly.", detail: "Check top 3 risks every Monday during weekly review." },
                { color: accent, tip: "Validate assumptions early.", detail: "Biggest waste = plan built on false assumption. Test in first 2 weeks." },
                { color: "#059669", tip: "Every risk needs a Plan B.", detail: "'Hope it doesn\u2019t happen' is not a plan." },
                { color: "#D97706", tip: "Risks \u2260 Issues.", detail: "Risk = might happen. Issue = IS happening. Issues go to Blockers page." },
                { color: "#0EA5E9", tip: "Be honest.", detail: "Listing risks isn\u2019t negative \u2014 it\u2019s smart leadership." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><AlertTriangle size={11} />Risks</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><AlertTriangle size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">OKR Risks &amp; Assumptions</h2><p className="text-xs font-medium text-violet-600">What Must Be True + What Could Derail Success</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Lists what must be true for your OKRs to work and what could go wrong. Builds realism and helps you prepare instead of being surprised.</p>
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
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderAssume()}{renderRisk()}{renderValidAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderAssume()}{renderRisk()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function OKRRisksAssumptionsPage() { return <ThemeProvider><RisksAssumptionsContent /></ThemeProvider>; }
