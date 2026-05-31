"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Sun, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Day Plan", desc: "Top 3 + meetings + end-of-day", icon: LayoutDashboard },
  { id: "compact", label: "Quick Focus", desc: "Top 3 only", icon: AlignJustify },
];

function TodayPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const meetingsRef = useRef<HTMLDivElement>(null);
  const eodRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9"; const accentDark = "#0284C7";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>☀️ TODAY PLAN (TOP 3 + MUST-DO MEETINGS)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderTop = () => (
    <div ref={topRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 TODAY&apos;S TOP 3 &mdash; If These Get Done, Today Is a Win</td></tr></tbody></table>
      <CopyButton targetRef={topRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "15%" }}>Date</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Day, MM/DD/YYYY]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Priority</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Time Needed</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>By When</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { pri: "[Finalize board deck and send for CEO review]", time: "2 hrs", by: "12pm", color: "#DC2626" },
            { pri: "[Send follow-up emails from yesterday's meetings]", time: "30 min", by: "10am", color: "#F59E0B" },
            { pri: "[Confirm travel arrangements for next week's trip]", time: "20 min", by: "3pm", color: "#059669" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", color: r.color }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.pri}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "15%" }}>What Does Success Look Like Today?</td><td style={{ ...S.td0, fontSize: "10px" }}>[Board deck sent, all follow-ups done, travel confirmed. Exec feels prepared for the week.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderMeetings = () => (
    <div ref={meetingsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📅 MUST-DO MEETINGS TODAY</td></tr></tbody></table>
      <CopyButton targetRef={meetingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Time</th>
          <th style={S.thSecondary}>Meeting</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Prep?</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Key Note / Decision Needed</th>
        </tr></thead>
        <tbody>
          {[
            { time: "9:00 AM", meeting: "[Leadership Team Sync]", prep: "✅", note: "[Budget decision needed]" },
            { time: "11:00 AM", meeting: "[1:1 with CFO]", prep: "⚠️", note: "[Review Q2 forecast — bring data]" },
            { time: "2:00 PM", meeting: "[Board Prep Working Session]", prep: "✅", note: "[Final walkthrough]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>{r.prep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEod = () => (
    <div ref={eodRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>🌙 END-OF-DAY CHECK</td></tr></tbody></table>
      <CopyButton targetRef={eodRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          "All 3 priorities completed (or rescheduled with reason)?",
          "Follow-up emails sent from today's meetings?",
          "Tomorrow's prep started (see Tomorrow Prep Page)?",
          "Inbox / request tracker updated?",
          "Any new risks or escalations flagged?",
        ].map((item, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", padding: "8px 14px" }}>☐ {item}</td></tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Sun size={11} />Today</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Sun size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Today Plan</h2><p className="text-xs font-medium text-sky-600">Top 3 + Must-Do Meetings + End-of-Day Check</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Today&apos;s focus + what success looks like. Clarity for busy days.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderTop()}{renderMeetings()}{renderEod()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTop()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TodayPlanPage() { return <ThemeProvider><TodayPlanContent /></ThemeProvider>; }
