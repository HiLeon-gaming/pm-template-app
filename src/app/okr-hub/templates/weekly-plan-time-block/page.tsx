"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Clock, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Time blocks + focus zones + protection rules", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Time block table only", icon: AlignJustify },
];

function WeeklyPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY PLAN (TIME BLOCK GUIDE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderBlock = () => (
    <div ref={blockRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>TIME BLOCK SCHEDULE</td></tr></tbody></table>
      <CopyButton targetRef={blockRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Block your calendar for OKR work FIRST. If it&apos;s not on the calendar, it won&apos;t happen. Protect focus time like a meeting you can&apos;t cancel.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>Monday</th>
          <th style={S.thPrimary}>Tuesday</th>
          <th style={S.thPrimary}>Wednesday</th>
          <th style={S.thPrimary}>Thursday</th>
          <th style={S.thPrimary}>Friday</th>
        </tr></thead>
        <tbody>
          {[
            { time: "8–9 AM", mon: "Weekly OKR check-in", tue: "Deep work: KR 1.2", wed: "Deep work: KR 2.1", thu: "1:1s", fri: "Weekly review + planning" },
            { time: "9–10 AM", mon: "Team standup", tue: "Deep work: KR 1.2", wed: "Deep work: KR 2.1", thu: "1:1s", fri: "KR score update" },
            { time: "10–12 PM", mon: "Focus: Top Priority #1", tue: "Focus: Top Priority #2", wed: "Focus: Top Priority #3", thu: "Meetings / collaboration", fri: "Admin + email catch-up" },
            { time: "12–1 PM", mon: "Lunch", tue: "Lunch", wed: "Lunch", thu: "Lunch", fri: "Lunch" },
            { time: "1–3 PM", mon: "Meetings / stakeholders", tue: "Focus: initiative work", wed: "Meetings / collaboration", thu: "Focus: initiative work", fri: "Next week planning" },
            { time: "3–5 PM", mon: "Email + admin", tue: "Email + follow-ups", wed: "Email + delegation", thu: "Email + follow-ups", fri: "Buffer / overflow" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const isLunch = r.mon === "Lunch";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "9px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: isLunch ? "#F3F4F6" : bg, fontSize: "9px", color: isLunch ? C.textMuted : C.textBody }}>{r.mon}</td>
                <td style={{ ...S.td0, backgroundColor: isLunch ? "#F3F4F6" : bg, fontSize: "9px", color: isLunch ? C.textMuted : C.textBody }}>{r.tue}</td>
                <td style={{ ...S.td0, backgroundColor: isLunch ? "#F3F4F6" : bg, fontSize: "9px", color: isLunch ? C.textMuted : C.textBody }}>{r.wed}</td>
                <td style={{ ...S.td0, backgroundColor: isLunch ? "#F3F4F6" : bg, fontSize: "9px", color: isLunch ? C.textMuted : C.textBody }}>{r.thu}</td>
                <td style={{ ...S.td0, backgroundColor: isLunch ? "#F3F4F6" : bg, fontSize: "9px", color: isLunch ? C.textMuted : C.textBody }}>{r.fri}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFocus = () => (
    <div ref={focusRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>FOCUS ZONES — WHAT GETS TIME THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={focusRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Zone</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Hrs Blocked</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>% of Week</th>
        </tr></thead>
        <tbody>
          {[
            { zone: "OKR Work", desc: "Deep work directly moving Key Results (initiatives, tasks)", hrs: "12 hrs", pct: "30%", color: accent },
            { zone: "Meetings", desc: "Check-ins, 1:1s, stakeholder meetings, standups", hrs: "8 hrs", pct: "20%", color: "#7C3AED" },
            { zone: "Admin", desc: "Email, Slack, approvals, scheduling, misc", hrs: "6 hrs", pct: "15%", color: "#D97706" },
            { zone: "Planning", desc: "Weekly review, next week planning, score updates", hrs: "4 hrs", pct: "10%", color: "#0EA5E9" },
            { zone: "Buffer", desc: "Overflow, unexpected requests, breaks", hrs: "6 hrs", pct: "15%", color: "#DC2626" },
            { zone: "1:1s / Coaching", desc: "Direct report 1:1s, mentoring, feedback", hrs: "4 hrs", pct: "10%", color: "#E11D48" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: r.color }}>{r.zone}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px" }}>{r.hrs}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: r.color }}>{r.pct}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>TIME PROTECTION RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: accent }}>Block OKR work time before accepting meetings.</strong> If your calendar fills up with meetings first, OKR work won&apos;t happen.<br />
          <strong style={{ color: "#DC2626" }}>No meetings before 10 AM on Tue/Wed.</strong> Protect morning focus time — your brain is sharpest then.<br />
          <strong style={{ color: "#D97706" }}>Batch email to 2 windows/day.</strong> Don&apos;t check email continuously. 11 AM and 3 PM is enough.<br />
          <strong style={{ color: "#7C3AED" }}>Friday PM = next week planning.</strong> Never enter Monday without a plan. Friday planning prevents Monday chaos.
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Clock size={11} />Time Block</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Clock size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Plan (Time Block Guide)</h2><p className="text-xs font-medium text-emerald-600">What Gets Time This Week and When</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Block your calendar for OKR work, meetings, and admin. Protects focus and prevents drift.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderBlock()}{renderFocus()}{renderRules()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderBlock()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyPlanTimeBlockPage() { return <ThemeProvider><WeeklyPlanContent /></ThemeProvider>; }
