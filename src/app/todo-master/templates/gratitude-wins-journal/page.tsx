"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Heart, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "daily" | "weekly";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "daily", label: "Daily Journal", desc: "7-day gratitude + wins", icon: LayoutDashboard },
  { id: "weekly", label: "Weekly Summary", desc: "Highlights + reflection", icon: AlignJustify },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function GratitudeContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("daily");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dailyRef = useRef<HTMLDivElement>(null);
  const winsRef = useRef<HTMLDivElement>(null);
  const reflectRef = useRef<HTMLDivElement>(null);
  const monthlyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>💛 GRATITUDE &amp; WINS JOURNAL</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; What You Focus On Grows</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Week Of</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Week #</td>
            <td style={{ ...S.td0, width: "36%" }}>[___] of 52</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Weekly Intention</td>
            <td colSpan={3} style={S.tdAlt}>[e.g., &quot;I will notice and appreciate the small things this week.&quot;]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const dayColors = ["#DC2626", "#D97706", "#059669", "#2563EB", "#7C3AED", "#BE185D", "#0891B2"];
  const dayBgs = ["#FEE2E2", "#FEF3C7", "#D1FAE5", "#DBEAFE", "#EDE9FE", "#FCE7F3", "#CFFAFE"];

  const renderDailyJournal = () => (
    <div ref={dailyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🌅 DAILY GRATITUDE &amp; WINS</div>
      <CopyButton targetRef={dailyRef} label="Copy Section" />
      {DAYS.map((day, di) => (
        <table key={di} style={{ ...S.tbl, marginBottom: "6px" }}>
          <thead>
            <tr>
              <td colSpan={2} style={{
                backgroundColor: dayBgs[di], color: dayColors[di],
                padding: "8px 14px", fontFamily: S.font, fontSize: "13px",
                fontWeight: 800, border: `1.5px solid ${C.border}`,
                borderBottom: `3px solid ${dayColors[di]}`,
              }}>
                {day}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...S.tdLabel, width: "25%", verticalAlign: "top" as const }}>🙏 3 Things I&apos;m Grateful For</td>
              <td style={{ ...S.td0, height: "52px" }}>
                {di === 0 ? "1. [e.g., My health and energy to tackle the day]\n2. [e.g., A supportive team that has my back]\n3. [e.g., Coffee ☕]" : "1.\n2.\n3."}&nbsp;
              </td>
            </tr>
            <tr>
              <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>🏆 Today&apos;s Win</td>
              <td style={{ ...S.tdAlt, height: "32px" }}>
                {di === 0 ? "[e.g., Delivered the sprint demo and got great feedback from stakeholders]" : ""}&nbsp;
              </td>
            </tr>
            <tr>
              <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>✨ One Positive Moment</td>
              <td style={{ ...S.td0, height: "28px" }}>
                {di === 0 ? "[e.g., A colleague thanked me for the mentoring session — felt meaningful]" : ""}&nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderWeeklyWins = () => (
    <div ref={winsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🏆 WEEKLY WINS LOG</td></tr></tbody></table>
      <CopyButton targetRef={winsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "12%" }}>Day</th>
            <th style={S.thSecondary}>Win / Accomplishment</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Category</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Impact</th>
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, color: dayColors[i], fontSize: "12px" }}>{day}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{i === 0 ? "[e.g., Shipped feature ahead of schedule]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>
                  <span style={{ color: C.textMuted }}>☐Work ☐Personal ☐Health ☐Growth</span>
                </td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>☐Big ☐Med ☐Small</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReflection = () => (
    <div ref={reflectRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🌟 WEEKLY REFLECTION</div>
      <CopyButton targetRef={reflectRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "What was my biggest win this week?", a: "" },
            { q: "Who made a positive impact on my week?", a: "" },
            { q: "What surprised me in a good way?", a: "" },
            { q: "What challenge am I grateful for?", a: "" },
            { q: "How did I grow this week?", a: "" },
            { q: "What am I most looking forward to next week?", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "38%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Week mood / energy (1-10)</td>
            <td style={S.td0}>Mood: [___]/10 &nbsp;&nbsp; Energy: [___]/10 &nbsp;&nbsp; Gratitude: [___]/10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderMonthlySummary = () => (
    <div ref={monthlyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📊 MONTHLY ACCOMPLISHMENT SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={monthlyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Week</th>
            <th style={S.thSecondary}>Top Win</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Mood Avg</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Gratitude Days</th>
          </tr>
        </thead>
        <tbody>
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((w, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{w}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]/10</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]/7</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>MONTH</td>
            <td style={S.td0}>[Overall biggest accomplishment]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]/10</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>[___]/28</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderDailyLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderDailyJournal()}{renderReflection()}{renderFooter()}</>
  );

  const renderWeeklyLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderWeeklyWins()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderReflection()}</td>
      </tr></tbody></table>
      {renderMonthlySummary()}{renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><Heart size={11} /> Gratitude</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Heart size={20} className="text-rose-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Gratitude &amp; Wins Journal</h2>
              <p className="text-xs font-medium text-rose-600">What You Focus On Grows &mdash; Science-Backed Positivity</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Daily gratitude prompts with color-coded days, weekly wins log, and monthly accomplishment summary. Daily Journal has per-day cards; Weekly Summary shows wins table + reflection side by side.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Journal Style</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "daily" && renderDailyLayout()}
          {layout === "weekly" && renderWeeklyLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function GratitudeWinsJournalPage() {
  return (<ThemeProvider><GratitudeContent /></ThemeProvider>);
}
