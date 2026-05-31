"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Calendar, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "Timed agenda + prep checklist + facilitation guide", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Agenda table only", icon: AlignJustify },
];

function MBRAgendaContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>MONTHLY BUSINESS REVIEW (MBR) AGENDA</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Month [X] of Q[X] [YEAR]</td></tr>
    </tbody></table>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MBR AGENDA (60 Minutes)</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>The MBR is a deeper look than the weekly check-in. Focus on trends, capacity, risks, and decisions that need leadership attention.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Min</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Topic</th>
          <th style={S.thPrimary}>Details</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Led By</th>
        </tr></thead>
        <tbody>
          {[
            { time: "0:00", min: "5", topic: "Month in Review", details: "High-level: what happened this month? Key events, milestones hit, surprises.", led: "[CEO / COO]" },
            { time: "0:05", min: "10", topic: "OKR Score Deep Dive", details: "Current KR scores. Month-over-month trends. Which KRs improved? Which are stuck? Why?", led: "[Ops Lead]" },
            { time: "0:15", min: "10", topic: "Initiative Portfolio RAG", details: "Walk through all initiatives: Green, Amber, Red. Focus discussion on Amber and Red only.", led: "[Each owner]" },
            { time: "0:25", min: "5", topic: "Metrics & KPI Review", details: "Key metrics trends. Any metric integrity issues? Watch list items.", led: "[Data / Ops]" },
            { time: "0:30", min: "5", topic: "Capacity & Resources", details: "Are teams overloaded? Do we need to adjust? Any hiring/budget changes needed?", led: "[HR / Finance]" },
            { time: "0:35", min: "5", topic: "Risks & Blockers", details: "Top risks this month. What was escalated? What got resolved? What's still stuck?", led: "[Risk owner]" },
            { time: "0:40", min: "5", topic: "Stop Doing List Review", details: "Did anything we stopped creep back in? Any new items to add to the Stop Doing list?", led: "[Facilitator]" },
            { time: "0:45", min: "10", topic: "Decisions Needed", details: "Decisions that require leadership input. Present options, make decisions, assign owners.", led: "[Various]" },
            { time: "0:55", min: "5", topic: "Next Month Focus & Close", details: "Top 3 priorities for next month. Action items. Next MBR date.", led: "[Facilitator]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px" }}>{r.min}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.details}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.led}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPrepAndTips = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>✅ PRE-MBR CHECKLIST</td></tr></thead>
            <tbody>
              {[
                "Update all KR scores with end-of-month data.",
                "Update Initiative Portfolio Roll-Up with current RAG statuses.",
                "Review Stop Doing list — flag anything that crept back in.",
                "Prepare decisions needing leadership input (with options).",
                "Send pre-read to attendees 24 hrs before.",
                "Block 15 min after MBR for notes & actions.",
              ].map((item, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ fontSize: "14px" }}>&#9744;</span> {item}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>💡 FACILITATION TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "MBR is for DECISIONS, not status.", detail: "Status should be read in advance. Meeting = discussion + action." },
                { color: "#059669", tip: "Skip Green items.", detail: "Spend 80% on Amber and Red. Green = working." },
                { color: "#D97706", tip: "Every decision needs owner + deadline.", detail: "No owner on follow-through = it didn't really happen." },
                { color: "#7C3AED", tip: "Rotate the facilitator.", detail: "Builds team ownership. Not everything needs CEO." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><Calendar size={11} />MBR</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Calendar size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Monthly Business Review (MBR) Agenda</h2><p className="text-xs font-medium text-rose-600">Results &bull; Risks &bull; Decisions &bull; Next Month Focus</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Standard 60-minute monthly review agenda. Deeper than the weekly check-in — focuses on trends, capacity, and decisions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderAgenda()}{renderPrepAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderAgenda()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function MonthlyBusinessReviewAgendaPage() { return <ThemeProvider><MBRAgendaContent /></ThemeProvider>; }
