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
  { id: "full", label: "Full Review", desc: "Metric → insight → decision → action + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Action table only", icon: AlignJustify },
];

function KPIReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>KPI REVIEW → ACTIONS TEMPLATE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Metric → Insight → Decision → Action</td></tr>
    </tbody></table>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>METRIC → INSIGHT → DECISION → ACTION</td></tr></tbody></table>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>The point of reviewing metrics is to DECIDE and ACT. A metric without an action is just a number. Fill in each column to turn data into decisions.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "14%" }}>Metric</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Value</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Insight (What Does This Tell Us?)</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Decision</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Action</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Due</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Support Wait Time", val: "10 hrs", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, insight: "Improved 1 hr. New triage helping but not enough yet. Need agents.", decision: "Stay course. Agents start next week.", action: "Onboard 2 agents by Week 5. Track daily.", owner: "[Tom R.]", due: "Wk 5" },
            { metric: "CSAT", val: "4.3", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, insight: "Slow climb. Onboarding changes haven't shipped yet.", decision: "Accelerate onboarding redesign.", action: "Ship v1 of new onboarding by Wed.", owner: "[Lisa P.]", due: "Wed" },
            { metric: "NPS", val: "42", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, insight: "Up 2 pts. Still blocked on detractor recovery program.", decision: "Unblock NPS data access TODAY.", action: "IT to grant access by EOD Tue.", owner: "[IT Admin]", due: "Tue" },
            { metric: "MQLs", val: "280", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, insight: "LinkedIn ads driving 20+/wk. On track if trend holds.", decision: "Increase budget for top ad.", action: "Shift $2K to best-performing ad.", owner: "[Amy K.]", due: "Mon" },
            { metric: "Enterprise Deals", val: "1", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, insight: "Pipeline too thin. Cold outreach alone isn't enough.", decision: "Pivot to warm intros + referrals.", action: "Ask 5 customers for intros this week.", owner: "[Mike D.]", due: "Fri" },
            { metric: "Engagement", val: "68%", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, insight: "Flat for 2 weeks. No pulse data yet to diagnose.", decision: "Launch pulse survey immediately.", action: "Send pulse survey by Wed. Results by Fri.", owner: "[PeopleOps]", due: "Fri" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.val}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.h}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.insight}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: "#7C3AED" }}>{r.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFlowAndTips = () => (
    <div ref={flowRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={flowRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>📊 REVIEW FLOW</td></tr></thead>
            <tbody>
              {[
                { step: "1", col: "Metric + Value", what: "Pull latest number from data source. Use real data." },
                { step: "2", col: "Health", what: "Green (on track), Amber (behind), or Red (at risk)?" },
                { step: "3", col: "Insight", what: "What does this number MEAN? Why up/down/flat?" },
                { step: "4", col: "Decision", what: "Stay course? Pivot? Add resources?" },
                { step: "5", col: "Action", what: "WHO does WHAT by WHEN." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ fontWeight: 800, fontSize: "14px", color: "#7C3AED" }}>{r.step}</span> <strong>{r.col}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.what}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>💡 REVIEW TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Every Red metric needs an action this week.", detail: "Red + no action = the review failed." },
                { color: "#DC2626", tip: "Don't just report numbers \u2014 explain WHY.", detail: "'NPS is 42' is useless. 'NPS 42 because detractor program hasn't launched' is useful." },
                { color: "#D97706", tip: "Time-box to 30 minutes.", detail: "Discuss Red and Amber only. Green gets a quick nod." },
                { color: "#7C3AED", tip: "Actions carry forward.", detail: "Undone action from last week shows up again until resolved." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><TrendingUp size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">KPI Review → Actions Template</h2><p className="text-xs font-medium text-emerald-600">&#11088; All-Star &mdash; Metric → Insight → Decision → Action</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Turns metric reporting into decision-making. Every number gets an insight, decision, and action.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderReview()}{renderFlowAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderReview()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function KPIReviewActionsPage() { return <ThemeProvider><KPIReviewContent /></ThemeProvider>; }
