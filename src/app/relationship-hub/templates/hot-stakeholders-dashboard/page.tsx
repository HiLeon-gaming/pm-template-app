"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Flame } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "Hot list + context + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Hot list only", icon: AlignJustify },
];

function HotContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const hotRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&quot;HOT STAKEHOLDERS&quot; DASHBOARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderHotList = () => (
    <div ref={hotRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>TOP 10 STAKEHOLDERS NEEDING ATTENTION THIS WEEK</div>
      <CopyButton targetRef={hotRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your weekly priority list. These are the stakeholders who need your attention RIGHT NOW &mdash; because of a risk, an opportunity, a commitment, or relationship drift. Review every Monday morning. Update throughout the week.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Heat</th>
          <th style={S.thPrimary}>Why They&apos;re Hot</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Action This Week</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>By When</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", name: "James Wu", heat: "🔴", why: "API timeline overdue. Trust eroding. Needs direct intervention before sprint planning.", action: "Working session Wed. Address his concerns directly.", when: "Wed" },
            { n: "2", name: "David Park", heat: "🔴", why: "Budget deliverable 3 days overdue. Risk of losing credibility.", action: "Send today with apology + extra Q2 detail.", when: "Mon" },
            { n: "3", name: "Sarah Chen", heat: "🟡", why: "Disengaged in last SteerCo. Haven\u2019t connected in 3 weeks. Drift risk.", action: "Schedule 1:1. Understand what\u2019s happening.", when: "Tue" },
            { n: "4", name: "Maria Lopez", heat: "🟡", why: "SteerCo next week. Needs briefing on Q2 risks before she\u2019s blindsided.", action: "Send pre-read brief. 15-min prep call.", when: "Thu" },
            { n: "5", name: "Legal Lead", heat: "🟡", why: "Contract review pending. 10 days and counting. Procurement blocked.", action: "Ask sponsor to flag as priority.", when: "Wed" },
            { n: "6", name: "HR VP", heat: "🔴", why: "Headcount approval 13 days overdue. Team under-resourced.", action: "Escalate through director with impact data.", when: "Mon" },
            { n: "7", name: "[Stakeholder]", heat: "[🔴🟡🟢]", why: "[Why they need attention]", action: "[What you\u2019ll do]", when: "[Day]" },
            { n: "8", name: "[Stakeholder]", heat: "[🔴🟡🟢]", why: "[Why they need attention]", action: "[What you\u2019ll do]", when: "[Day]" },
            { n: "9", name: "[Stakeholder]", heat: "[🔴🟡🟢]", why: "[Why they need attention]", action: "[What you\u2019ll do]", when: "[Day]" },
            { n: "10", name: "[Stakeholder]", heat: "[🔴🟡🟢]", why: "[Why they need attention]", action: "[What you\u2019ll do]", when: "[Day]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.heat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 700 }}>{r.when}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>WEEKLY CONTEXT &amp; NOTES</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "30%" }}>Question</th>
          <th style={S.thPrimary}>Your Notes</th>
        </tr></thead>
        <tbody>
          {[
            { q: "What\u2019s the biggest relationship risk this week?", a: "[Which stakeholder situation could blow up if ignored?]" },
            { q: "What\u2019s the biggest relationship opportunity?", a: "[Who can you impress, thank, or advance a relationship with?]" },
            { q: "Any upcoming meetings with hot stakeholders?", a: "[List meetings + prep needed]" },
            { q: "What commitments are due this week?", a: "[From your Commitments Log \u2014 anything due to a hot stakeholder?]" },
            { q: "What did you learn about these stakeholders last week?", a: "[New intel, concerns, priorities, or changes]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>HOW TO USE THIS DASHBOARD</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Update every Monday morning.", detail: "Start your week by asking: \u201CWho needs my attention most?\u201D" },
                { color: "#EA580C", tip: "Limit to 10 stakeholders.", detail: "If everything is a priority, nothing is. Force yourself to rank." },
                { color: "#059669", tip: "Red items get addressed first.", detail: "Don\u2019t do the easy amber items while red items sit untouched." },
                { color: "#D97706", tip: "Carry forward unresolved items.", detail: "If a stakeholder was hot last week and you didn\u2019t address it, they\u2019re probably still hot." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHAT MAKES A STAKEHOLDER &quot;HOT&quot;</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "You owe them something overdue.", detail: "Broken commitments = hot. Fix it today." },
                { color: "#EA580C", tip: "They\u2019re blocking something critical.", detail: "Dependencies, approvals, or decisions that are stuck." },
                { color: "#D97706", tip: "The relationship is drifting or degrading.", detail: "You haven\u2019t connected recently and signals are concerning." },
                { color: "#6366F1", tip: "A big meeting or decision is coming.", detail: "You need them prepared, aligned, or supportive before a key moment." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
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
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Flame size={11} />Weekly</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Handshake size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">&quot;Hot Stakeholders&quot; Dashboard</h2><p className="text-xs font-medium text-orange-600">Weekly &bull; Top 10 Stakeholders Needing Your Attention</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your weekly focus list. These are the 10 stakeholders who need your attention most this week &mdash; because of risks, opportunities, commitments, or relationship drift. Update every Monday, execute throughout the week, and review on Friday.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHotList()}{renderContext()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHotList()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function HotStakeholdersDashboardPage() { return <ThemeProvider><HotContent /></ThemeProvider>; }
