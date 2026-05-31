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

function WeeklyCheckInAgendaContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY CHECK-IN AGENDA</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Standard 30-Min Weekly Review</td></tr>
    </tbody></table>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MEETING AGENDA (30 Minutes)</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Same agenda every week. No surprises. Everyone knows what to prepare and what to expect.</p>
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
            { time: "0:00", min: "2", topic: "Quick Pulse", details: "How's the team feeling? 1-word check-in. Sets the tone.", led: "[Facilitator]" },
            { time: "0:02", min: "5", topic: "KR Score Update", details: "Review current scores for each Key Result. Green/Amber/Red. No deep dives — just the numbers.", led: "[Ops / Owner]" },
            { time: "0:07", min: "5", topic: "Last Week's Commitments", details: "Did we deliver what we promised? Go through each commitment: Done / Partial / Missed.", led: "[Each owner]" },
            { time: "0:12", min: "5", topic: "This Week's Priorities", details: "Top 3 outcomes for this week. What must be true by Friday?", led: "[Each owner]" },
            { time: "0:17", min: "5", topic: "Blockers & Help Requests", details: "What's stuck? Who can unblock? Name the person, name the action, name the deadline.", led: "[Anyone stuck]" },
            { time: "0:22", min: "3", topic: "Decisions Needed", details: "Any decisions the group needs to make this week? Decide now or schedule a separate session.", led: "[Facilitator]" },
            { time: "0:25", min: "3", topic: "Wins & Shoutouts", details: "What went well? Who deserves recognition? End on a positive note.", led: "[Anyone]" },
            { time: "0:28", min: "2", topic: "Next Steps & Close", details: "Confirm action items. Confirm next meeting. Thank the team.", led: "[Facilitator]" },
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

  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>PRE-MEETING CHECKLIST (Before Monday&apos;s Meeting)</td></tr></tbody></table>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          "Update your KR scores in the Scoreboard page (current values from data source).",
          "Mark last week's commitments as Done / Partial / Missed in the Commitments Tracker.",
          "Write your Top 3 outcomes for this week in the Priorities Cockpit.",
          "Add any blockers or help requests to the Blockers page.",
          "Prepare any decisions that need group input.",
        ].map((item, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, width: "30px", textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{item}</td>
            </tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>FACILITATION TIPS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: accent }}>Stick to 30 minutes.</strong> If a topic needs more time, park it and schedule a separate session.<br />
          <strong style={{ color: "#DC2626" }}>Focus on Red and Amber only.</strong> Green metrics get a quick thumbs-up. Don&apos;t spend time on things going well.<br />
          <strong style={{ color: "#D97706" }}>Everyone updates BEFORE the meeting.</strong> The meeting is for discussion, not data entry.<br />
          <strong style={{ color: "#7C3AED" }}>End with wins.</strong> People remember the end. Close on a positive note to build momentum.
        </td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><ClipboardList size={11} />Agenda</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><ClipboardList size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Check-In Agenda</h2><p className="text-xs font-medium text-emerald-600">Standard 30-Minute Execution Review</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A repeatable agenda for the weekly OKR check-in. Same structure every week. No surprises.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderAgenda()}{renderPrep()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderAgenda()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyCheckInAgendaPage() { return <ThemeProvider><WeeklyCheckInAgendaContent /></ThemeProvider>; }
