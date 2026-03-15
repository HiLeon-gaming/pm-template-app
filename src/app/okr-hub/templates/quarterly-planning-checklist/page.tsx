"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "Pre-work + meeting flow + outputs + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Checklist", desc: "Steps only", icon: AlignJustify },
];

function QPChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLDivElement>(null);
  const meetRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUARTERLY PLANNING CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Repeatable Quarterly Planning</td></tr>
    </tbody></table>
  );

  const renderPre = () => (
    <div ref={preRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>PRE-WORK (Before the Planning Session)</div>
      <CopyButton targetRef={preRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Do this 1&ndash;2 weeks before your quarterly planning session. Show up prepared, not scrambling.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Pre-Work Task</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { task: "Score all current-quarter Key Results (final scores)", owner: "[KR Owners]", due: "Week -2" },
            { task: "Each department head drafts proposed OKRs for next quarter", owner: "[Dept Heads]", due: "Week -1" },
            { task: "Review Annual Direction Snapshot — are themes still valid?", owner: "[CEO / COO]", due: "Week -1" },
            { task: "Gather key metrics and trend data (KPI dashboard)", owner: "[Ops / Analytics]", due: "Week -1" },
            { task: "Identify top risks, assumptions, and dependencies", owner: "[All Leads]", due: "Week -1" },
            { task: "Prepare the \"Stop Doing\" list — what should we pause?", owner: "[All Teams]", due: "Week -1" },
            { task: "Review capacity & constraints (budget, headcount, major events)", owner: "[Finance / HR]", due: "Week -1" },
            { task: "Send pre-read materials to all planning session attendees", owner: "[CoS / Ops]", due: "3 days before" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMeet = () => (
    <div ref={meetRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>PLANNING SESSION AGENDA (2&ndash;4 Hours)</div>
      <CopyButton targetRef={meetRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>This is your quarterly planning meeting flow. Follow this agenda to stay focused and leave with clear commitments.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>Agenda Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Lead</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Expected Output</th>
        </tr></thead>
        <tbody>
          {[
            { time: "15 min", item: "Review last quarter: OKR scores + key lessons", lead: "[CEO]", output: "Shared understanding of what worked and what didn't" },
            { time: "15 min", item: "Review Annual Direction — are themes still right?", lead: "[CEO]", output: "Confirmation or adjustment of strategic themes" },
            { time: "20 min", item: "Review key metrics and trends (KPI dashboard)", lead: "[Ops Lead]", output: "Data-driven context for goal setting" },
            { time: "30 min", item: "Each team presents proposed OKRs (2 min each)", lead: "[Dept Heads]", output: "All proposed objectives and key results on the table" },
            { time: "15 min", item: "Break", lead: "", output: "" },
            { time: "30 min", item: "Alignment discussion: does every team OKR connect to company goals?", lead: "[Facilitator]", output: "Aligned OKR set — no orphans" },
            { time: "20 min", item: "Prioritization: cut or defer weak OKRs to maintain focus", lead: "[CEO]", output: "Final OKR set (2–3 objectives, 6–9 KRs total)" },
            { time: "20 min", item: "Initiative brainstorm + assignment", lead: "[All]", output: "Key initiatives with owners and rough timelines" },
            { time: "15 min", item: "Stop Doing list — what are we removing to make room?", lead: "[All]", output: "Clear list of paused/stopped work" },
            { time: "10 min", item: "Run OKR Quality Checklist on final OKRs", lead: "[Facilitator]", output: "Validated, high-quality OKRs" },
            { time: "10 min", item: "Wrap-up: confirm owners, cadence, communication plan", lead: "[CEO]", output: "Quarterly commitments documented" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#7C3AED" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: r.item === "Break" ? 400 : 600, fontStyle: r.item === "Break" ? "italic" : "normal" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.lead}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.output}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOutputAndTips = () => (
    <div ref={outputRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={outputRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>\u2705 REQUIRED OUTPUTS</td></tr></thead>
            <tbody>
              {[
                { output: "Final OKRs with baselines, targets, and owners", page: "OKR Builder", owner: "[Facilitator]" },
                { output: "Key initiatives with owners and timelines", page: "Initiative Brainstorm", owner: "[Dept Heads]" },
                { output: "Stop Doing list for the quarter", page: "Stop Doing List", owner: "[All]" },
                { output: "Quarterly Kickoff One-Pager", page: "Kickoff One-Pager", owner: "[CoS / Ops]" },
                { output: "Updated Dashboard with new OKRs", page: "Rhythm Dashboard", owner: "[Ops Lead]" },
                { output: "Communication plan for rollout", page: "Rollout Comm", owner: "[CoS / CEO]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      \u2610 {r.output}<br />
                      <span style={{ fontSize: "9px", color: accent, fontWeight: 600 }}>{r.page}</span> <span style={{ fontSize: "9px", color: C.textMuted }}>{r.owner}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>\ud83d\udca1 PLANNING TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Time-box everything.", detail: "Park overrun topics. Schedule follow-ups." },
                { color: "#7C3AED", tip: "Pre-work is non-negotiable.", detail: "No scored OKRs or proposals? Session wasted." },
                { color: "#059669", tip: "Cut ruthlessly.", detail: "2\u20133 objectives. Period. Say no to good ideas." },
                { color: "#DC2626", tip: "Don\u2019t skip Stop Doing list.", detail: "New goals without removing old work = burnout." },
                { color: "#0EA5E9", tip: "Document decisions immediately.", detail: "Update OKR Builder + Dashboard within 24 hrs." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><ClipboardCheck size={11} />Quarterly</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><ClipboardCheck size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quarterly Planning Checklist</h2><p className="text-xs font-medium text-amber-600">Pre-Work + Meeting Flow + Required Outputs</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your repeatable quarterly planning process. Pre-work, meeting flow, and outputs required. Never wing it again.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderPre()}{renderMeet()}{renderOutputAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPre()}{renderOutputAndTips()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QuarterlyPlanningChecklistPage() { return <ThemeProvider><QPChecklistContent /></ThemeProvider>; }
