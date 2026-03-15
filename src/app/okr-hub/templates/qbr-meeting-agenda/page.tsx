"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "Timed agenda + prep checklist + facilitation tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Agenda table only", icon: AlignJustify },
];

function QBRAgendaContent() {
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
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUARTERLY BUSINESS REVIEW (QBR) MEETING AGENDA</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Q[X] [YEAR] &nbsp;|&nbsp; Standard 90-Min Governance Review</td></tr>
    </tbody></table>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>QBR AGENDA (90 Minutes)</div>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>The QBR is the most important governance meeting of the quarter. Look back, score, learn, and set direction for the next quarter.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Min</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Topic</th>
          <th style={S.thPrimary}>Details</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Led By</th>
        </tr></thead>
        <tbody>
          {[
            { time: "0:00", min: "5", topic: "Welcome & Quarter Context", details: "Set the stage. What was the quarter about? What were the big bets?", led: "[CEO / COO]" },
            { time: "0:05", min: "15", topic: "OKR Final Scores", details: "Walk through every Objective and Key Result. Final score, actual vs target, grade (Green/Amber/Red).", led: "[Ops Lead]" },
            { time: "0:20", min: "10", topic: "Initiative Portfolio Final", details: "Final RAG for all initiatives. What shipped? What didn't? What got descoped?", led: "[Each owner]" },
            { time: "0:30", min: "10", topic: "Wins & Celebrations", details: "Top 5 wins this quarter. Recognize individuals and teams. Build momentum.", led: "[Facilitator]" },
            { time: "0:40", min: "10", topic: "Lessons Learned", details: "What worked? What didn't? What surprised us? Process improvements for next quarter.", led: "[Each team]" },
            { time: "0:50", min: "10", topic: "Next Quarter Preview", details: "Proposed objectives, themes, carry-forwards, new focus areas, constraints.", led: "[CEO / COO]" },
            { time: "1:00", min: "15", topic: "Decisions & Resource Allocation", details: "Budget changes, hiring plans, priority shifts. Make decisions now, not later.", led: "[Leadership]" },
            { time: "1:15", min: "10", topic: "Open Discussion", details: "What else needs to be said? Concerns, ideas, strategic questions.", led: "[Anyone]" },
            { time: "1:25", min: "5", topic: "Actions, Next Steps & Close", details: "Confirm all action items. Set next QBR date. Thank the team.", led: "[Facilitator]" },
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
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>\u2705 PRE-QBR CHECKLIST</td></tr></thead>
            <tbody>
              {[
                "Finalize all KR scores with end-of-quarter actual data.",
                "Complete the QBR One-Pager with scores, lessons, next quarter preview.",
                "Update Initiative Portfolio Roll-Up with final statuses.",
                "Collect lessons learned from each team lead (ask in advance).",
                "Prepare decisions needing leadership input \u2014 options, pros/cons, recs.",
                "Send QBR One-Pager as pre-read 3 days before.",
                "Book 90 min + 15 min buffer. No other meetings that day.",
                "Assign a dedicated note-taker (not the facilitator).",
              ].map((item, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      \u2610 {item}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>\ud83d\udca1 FACILITATION TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "QBR is about learning, not grading.", detail: "A 0.68 score isn\u2019t failure \u2014 it\u2019s data." },
                { color: "#059669", tip: "Celebrate wins before misses.", detail: "Teams that only hear criticism disengage." },
                { color: "#D97706", tip: "Make decisions in the room.", detail: "Can\u2019t decide? Schedule 30-min session within 48 hrs." },
                { color: "#7C3AED", tip: "Send notes within 24 hours.", detail: "Momentum dies when notes arrive a week later." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><ClipboardList size={11} />QBR Agenda</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><ClipboardList size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">QBR Meeting Agenda</h2><p className="text-xs font-medium text-rose-600">Standard 90-Minute Quarterly Governance Review</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Consistent quarterly agenda. Score, learn, decide, and set direction for the next quarter.</p>
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

export default function QBRMeetingAgendaPage() { return <ThemeProvider><QBRAgendaContent /></ThemeProvider>; }
