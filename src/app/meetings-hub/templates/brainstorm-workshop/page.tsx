"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Lightbulb, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Workshop", desc: "Setup + ideas + voting + action plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Ideas + voting only", icon: AlignJustify },
];

function BrainstormWorkshopContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ideasRef = useRef<HTMLDivElement>(null);
  const votingRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>💡 BRAINSTORM / WORKSHOP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Team Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Session Topic</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[What are we brainstorming?]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[60 minutes]</td></tr>
        <tr><td style={S.tdLabel}>Participants</td><td colSpan={3} style={S.td0}>[Name 1, Name 2, Name 3, Name 4, Name 5]</td></tr>
        <tr><td style={S.tdLabelAlt}>Problem Statement</td><td colSpan={3} style={S.tdAlt}>[What problem are we trying to solve? Be specific.]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderIdeas = () => (
    <div ref={ideasRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🧠 IDEAS CAPTURE</td></tr></tbody></table>
      <CopyButton targetRef={ideasRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Rules: No criticism during brainstorm. Quantity over quality. Build on others&apos; ideas. Wild ideas welcome.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Idea</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Suggested By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Category</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Votes</th>
        </tr></thead>
        <tbody>
          {Array.from({ length: 10 }, (_, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Idea]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Name]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>[Quick Win / Big Bet / Moonshot]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderVoting = () => (
    <div ref={votingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🏆 TOP IDEAS (After Voting)</td></tr></tbody></table>
      <CopyButton targetRef={votingRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { rank: "🥇 #1", color: "#F59E0B" },
          { rank: "🥈 #2", color: "#94A3B8" },
          { rank: "🥉 #3", color: "#EA580C" },
        ].map((r, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: r.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{r.rank}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "11px", padding: "8px 10px", fontWeight: 700 }}>[Winning idea title]</td></tr>
              <tr><td style={{ ...S.tdAlt, fontSize: "10px", padding: "6px 10px" }}>[Why this idea won — key reasons]</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "6px 10px" }}><strong>Next Step:</strong> [Specific action]</td></tr>
              <tr><td style={{ ...S.tdAlt, fontSize: "10px", padding: "6px 10px" }}><strong>Owner:</strong> [Name] &mdash; <strong>By:</strong> [Date]</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderAction = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ ACTION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Immediate Actions</td><td style={S.td0}>[What happens this week as a result of this session?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Ideas to Park</td><td style={S.tdAlt}>[Good ideas not actioned now — add to backlog or revisit later]</td></tr>
        <tr><td style={S.tdLabel}>Follow-Up Meeting?</td><td style={S.td0}>[Is a follow-up session needed? When?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Share Results With</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Who needs to see the output? Stakeholders? Leadership?]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Lightbulb size={11} />Workshop</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Lightbulb size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Brainstorm / Workshop</h2><p className="text-xs font-medium text-emerald-600">Capture Ideas &bull; Vote &bull; Action Plan</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured brainstorming with idea capture, dot voting, top 3 ranking, and action plan. Turns creativity into commitments.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderIdeas()}{renderVoting()}{renderAction()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderIdeas()}{renderVoting()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BrainstormWorkshopPage() { return <ThemeProvider><BrainstormWorkshopContent /></ThemeProvider>; }
