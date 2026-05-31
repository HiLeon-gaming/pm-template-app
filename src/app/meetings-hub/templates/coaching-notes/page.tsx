"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Target, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full GROW", desc: "All 4 stages + action plan + history", icon: LayoutDashboard },
  { id: "compact", label: "Quick GROW", desc: "4 stages only", icon: AlignJustify },
];

function CoachingNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🎯 COACHING NOTES (GROW Model)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Coachee</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Coach / Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Coaching Topic</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[e.g., Leadership presence in meetings]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGrow = () => (
    <div ref={growRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={growRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { letter: "G", title: "Goal", q: "What do you want to achieve?", prompts: ["What does success look like?", "How will you know you’ve achieved it?", "What’s the timeframe?", "Why does this matter to you?"], color: "#059669", notes: "[Their stated goal in their own words]" },
          { letter: "R", title: "Reality", q: "Where are you now?", prompts: ["What’s the current situation?", "What have you tried so far?", "What’s working? What isn’t?", "What’s getting in the way?"], color: "#3B82F6", notes: "[Current state — be honest and specific]" },
        ].map((s, i) => (
          <td key={i} style={{ ...LC, width: "50%", padding: i === 0 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: s.color, color: "#FFFFFF", padding: "10px", fontFamily: S.font, fontSize: "16px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{s.letter} &mdash; {s.title}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "11px", fontWeight: 700, padding: "8px 10px", fontStyle: "italic" }}>{s.q}</td></tr>
              {s.prompts.map((p, j) => (
                <tr key={j}><td style={{ ...(j % 2 === 0 ? S.tdAlt : S.td0), fontSize: "10px", padding: "4px 10px" }}>&bull; {p}</td></tr>
              ))}
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "8px 10px", borderTop: `2px solid ${s.color}20` }}><strong>Notes:</strong> {s.notes}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>

      <table style={{ ...LT, marginTop: "6px" }}><tbody><tr>
        {[
          { letter: "O", title: "Options", q: "What could you do?", prompts: ["What are all the possible approaches?", "What would you do if there were no constraints?", "Who could help you?", "What’s the easiest first step?"], color: "#EA580C", notes: "[Brainstorm at least 3 options]" },
          { letter: "W", title: "Way Forward", q: "What will you do?", prompts: ["Which option feels right?", "What’s your specific next step?", "When will you do it?", "How will you stay accountable?"], color: accentDark, notes: "[Specific commitment with timeline]" },
        ].map((s, i) => (
          <td key={i} style={{ ...LC, width: "50%", padding: i === 0 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: s.color, color: "#FFFFFF", padding: "10px", fontFamily: S.font, fontSize: "16px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{s.letter} &mdash; {s.title}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "11px", fontWeight: 700, padding: "8px 10px", fontStyle: "italic" }}>{s.q}</td></tr>
              {s.prompts.map((p, j) => (
                <tr key={j}><td style={{ ...(j % 2 === 0 ? S.tdAlt : S.td0), fontSize: "10px", padding: "4px 10px" }}>&bull; {p}</td></tr>
              ))}
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "8px 10px", borderTop: `2px solid ${s.color}20` }}><strong>Notes:</strong> {s.notes}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderAction = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ COACHING ACTION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Action / Commitment</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>By When</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>How to Measure</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Practice opening remarks before next team meeting]", owner: "[Sarah]", by: "[03/10]", measure: "[Self-rating + your feedback]" },
            { action: "[Observe a senior leader’s meeting style — take notes]", owner: "[Sarah]", by: "[03/14]", measure: "[Share observations in next 1:1]" },
            { action: "[Provide real-time coaching during next staff meeting]", owner: "[You]", by: "[03/12]", measure: "[Post-meeting debrief]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.measure}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHistory = () => (
    <div ref={historyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📅 COACHING HISTORY</td></tr></tbody></table>
      <CopyButton targetRef={historyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Topic</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Outcome / Progress</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/05]", topic: "[Leadership presence in meetings]", outcome: "[Set 3 actions — review next week]" },
            { date: "[02/19]", topic: "[Delegation skills]", outcome: "[Delegated 2 tasks successfully — confidence growing]" },
            { date: "[02/05]", topic: "[Conflict resolution with peer]", outcome: "[Had productive conversation — resolved]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-fuchsia-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><Target size={11} />GROW Model</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><Target size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Coaching Notes (GROW Model)</h2><p className="text-xs font-medium text-fuchsia-600">Goal &bull; Reality &bull; Options &bull; Way Forward</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Turns 1:1s into development conversations. The GROW framework helps you coach, not just manage.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-fuchsia-500 text-white border-fuchsia-500 shadow-md shadow-fuchsia-200" : "bg-white text-slate-600 border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-fuchsia-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderGrow()}{renderAction()}{renderHistory()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderGrow()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CoachingNotesPage() { return <ThemeProvider><CoachingNotesContent /></ThemeProvider>; }
