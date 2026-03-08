"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Flame, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "grid" | "weekly";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "grid", label: "30-Day Grid", desc: "Full month view", icon: LayoutDashboard },
  { id: "weekly", label: "Weekly Breakdown", desc: "Week-by-week tracking", icon: AlignJustify },
];

const HABITS = [
  { emoji: "☀️", habit: "Morning routine (before 7am)", cat: "Mindset", catBg: "#FEF3C7", catFg: "#D97706" },
  { emoji: "🧘", habit: "Meditation / mindfulness (10+ min)", cat: "Mindset", catBg: "#FEF3C7", catFg: "#D97706" },
  { emoji: "🏃", habit: "Exercise / movement (30+ min)", cat: "Health", catBg: "#D1FAE5", catFg: "#059669" },
  { emoji: "💧", habit: "Drink 8+ glasses of water", cat: "Health", catBg: "#D1FAE5", catFg: "#059669" },
  { emoji: "📖", habit: "Read 20+ pages", cat: "Growth", catBg: "#DBEAFE", catFg: "#2563EB" },
  { emoji: "🧠", habit: "2+ hours deep work (no distractions)", cat: "Productivity", catBg: "#EDE9FE", catFg: "#7C3AED" },
  { emoji: "📝", habit: "Journal / reflection (5 min)", cat: "Mindset", catBg: "#FEF3C7", catFg: "#D97706" },
  { emoji: "😴", habit: "In bed by [time] / 7+ hrs sleep", cat: "Health", catBg: "#D1FAE5", catFg: "#059669" },
  { emoji: "📵", habit: "No phone first/last 30 min of day", cat: "Productivity", catBg: "#EDE9FE", catFg: "#7C3AED" },
  { emoji: "🎯", habit: "[Add custom habit]", cat: "Custom", catBg: "#F3F4F6", catFg: "#6B7280" },
];

function HabitTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("grid");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔥 30-DAY HABIT TRACKER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Build Consistency, Build Character</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Month</td>
            <td style={{ ...S.td0, width: "20%" }}>[Month / Year]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Start Date</td>
            <td style={{ ...S.td0, width: "16%" }}>[MM/DD]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>End Date</td>
            <td style={{ ...S.td0, width: "22%" }}>[MM/DD]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Monthly Intention</td>
            <td colSpan={5} style={S.tdAlt}>[What identity am I building? e.g., &quot;I am someone who shows up every day, no matter what.&quot;]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderFullGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📅 30-DAY TRACKING GRID</div>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Mark each day: ✓ = done, ✗ = missed, — = rest day. Aim for streaks!</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "18%" }}>Habit</th>
            {Array.from({ length: 30 }).map((_, d) => (
              <th key={d} style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "8px", padding: "4px 1px", width: "2.2%" }}>{d + 1}</th>
            ))}
            <th style={{ ...S.thPrimary, textAlign: "center" as const, width: "5%", backgroundColor: C.accent }}>Tot</th>
          </tr>
        </thead>
        <tbody>
          {HABITS.map((h, hi) => {
            const bg = hi % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={hi}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, padding: "4px 6px", whiteSpace: "nowrap" as const }}>
                  {h.emoji} {h.habit.length > 25 ? h.habit.substring(0, 25) + "…" : h.habit}
                </td>
                {Array.from({ length: 30 }).map((_, d) => (
                  <td key={d} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", padding: "3px 0" }}>&nbsp;</td>
                ))}
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent, fontSize: "11px" }}>/30</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWeeklyBreakdown = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📅 WEEKLY HABIT TRACKING</div>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      {["Week 1 (Days 1–7)", "Week 2 (Days 8–14)", "Week 3 (Days 15–21)", "Week 4 (Days 22–28)", "Week 5 (Days 29–30)"].map((week, wi) => {
        const daysInWeek = wi === 4 ? 2 : 7;
        return (
          <table key={wi} style={{ ...S.tbl, marginBottom: "8px" }}>
            <thead>
              <tr>
                <td colSpan={daysInWeek + 2} style={{
                  backgroundColor: wi % 2 === 0 ? C.secondary : C.accent,
                  color: C.white, padding: "6px 14px", fontFamily: S.font,
                  fontSize: "12px", fontWeight: 700, border: `1.5px solid ${C.border}`,
                }}>
                  {week}
                </td>
              </tr>
              <tr>
                <th style={{ ...S.thSecondary, width: "22%" }}>Habit</th>
                {Array.from({ length: daysInWeek }).map((_, d) => (
                  <th key={d} style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "10px" }}>D{wi * 7 + d + 1}</th>
                ))}
                <th style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "10px", backgroundColor: C.accent, color: C.white }}>/{daysInWeek}</th>
              </tr>
            </thead>
            <tbody>
              {HABITS.map((h, hi) => {
                const bg = hi % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={hi}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{h.emoji} {h.habit.substring(0, 30)}</td>
                    {Array.from({ length: daysInWeek }).map((_, d) => (
                      <td key={d} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>☐</td>
                    ))}
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>/{daysInWeek}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📊 MONTHLY CONSISTENCY SCORECARD</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thSecondary}>Habit</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Category</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Days Hit</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Rate</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Best Streak</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Current Streak</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {HABITS.map((h, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{h.emoji} {h.habit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(h.catBg, h.catFg)}>{h.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]/30</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>[___]%</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___] days</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___] days</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={{ fontSize: "10px", color: C.textMuted }}>☐A ☐B ☐C ☐F</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReflection = () => (
    <div ref={reflectionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🌅 MONTH-END REFLECTION</div>
      <CopyButton targetRef={reflectionRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Overall consistency score (avg across all habits)", a: "[___]% &nbsp;&nbsp; Target: 80%+" },
            { q: "Strongest habit this month", a: "" },
            { q: "Habit I struggled with most", a: "" },
            { q: "What helped me stay consistent?", a: "" },
            { q: "What caused me to break streaks?", a: "" },
            { q: "Habits to keep next month", a: "" },
            { q: "Habits to add/replace next month", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Flame size={11} /> Habits</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Flame size={20} className="text-orange-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Habit Tracker (30-Day)</h2>
              <p className="text-xs font-medium text-orange-600">Build Consistency, Build Character &mdash; 10 Habits &times; 30 Days</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track up to 10 daily habits with streak counting, completion rate, and monthly consistency score. 30-Day Grid is a compact full-month view; Weekly Breakdown separates tracking into weekly chunks.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tracking View</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderDateHeader()}
          {layout === "grid" ? renderFullGrid() : renderWeeklyBreakdown()}
          {renderSummary()}{renderReflection()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function HabitTracker30DayPage() {
  return (<ThemeProvider><HabitTrackerContent /></ThemeProvider>);
}
