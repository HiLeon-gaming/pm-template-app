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
  { id: "full", label: "Full Planner", desc: "Blocks + rules + weekly review", icon: LayoutDashboard },
  { id: "compact", label: "Quick Blocks", desc: "This week's focus blocks", icon: AlignJustify },
];

function FocusTimePlannerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&#127919; FOCUS TIME PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderBlocks = () => (
    <div ref={blocksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>&#128338; THIS WEEK&apos;S PROTECTED FOCUS BLOCKS</div>
      <CopyButton targetRef={blocksRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Deep work blocks for the exec. These are sacred &mdash; defend them like meetings with the board.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Day</th>
          <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Time Block</th>
          <th style={S.thPrimary}>Focus Work / Purpose</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Duration</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Protected?</th>
        </tr></thead>
        <tbody>
          {[
            { day: "Monday", time: "8:00-10:00", work: "[Strategic planning / deep thinking]", dur: "2 hrs", prot: true },
            { day: "Tuesday", time: "7:30-9:00", work: "[Email triage + inbox zero push]", dur: "1.5 hrs", prot: true },
            { day: "Wednesday", time: "12:00-1:30", work: "[Lunch + personal time]", dur: "1.5 hrs", prot: true },
            { day: "Thursday", time: "8:00-10:00", work: "[Board prep / document review]", dur: "2 hrs", prot: true },
            { day: "Friday", time: "2:00-5:00", work: "[Week wrap-up + next-week planning]", dur: "3 hrs", prot: true },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.work}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>{r.prot ? "Yes" : "Flex"}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>Total Focus Hours This Week</td><td style={{ ...S.td0, fontWeight: 800, fontSize: "14px", color: accent }}>[10 hrs] of [40 hrs] = [25%]</td></tr>
        <tr><td style={S.tdLabelAlt}>Target Ratio</td><td style={{ ...S.tdAlt, fontWeight: 600 }}>Aim for 20-30% of the exec&apos;s week as protected focus time</td></tr>
      </tbody></table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>&#128721; FOCUS BLOCK DEFENSE RULES</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          { rule: "Never double-book a focus block without exec approval", icon: "1" },
          { rule: "If someone asks for that time, offer 2 alternatives first", icon: "2" },
          { rule: "If the block must be moved, reschedule within the same week", icon: "3" },
          { rule: "Mark focus blocks as \"Busy\" (not \"Tentative\") in the calendar", icon: "4" },
          { rule: "Track how many focus blocks were defended vs. lost each week", icon: "5" },
        ].map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", padding: "8px 14px" }}><strong style={{ color: "#DC2626", marginRight: "8px" }}>Rule {r.icon}:</strong> {r.rule}</td></tr>
          );
        })}
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>Blocks Defended This Week</td><td style={S.td0}>[4 of 5] &mdash; <strong style={{ color: "#059669" }}>80% success rate</strong></td></tr>
        <tr><td style={S.tdLabelAlt}>What Was Lost?</td><td style={{ ...S.tdAlt, color: "#DC2626" }}>[Thursday AM block &mdash; emergency board call override]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; 2026 All Rights Reserved
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Target size={11} />Focus</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Target size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Focus Time Planner</h2><p className="text-xs font-medium text-sky-600">Protected Deep Work Blocks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Protected focus blocks with defense rules. Deep work is sacred &mdash; defend it like a board meeting.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderBlocks()}{renderRules()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderBlocks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FocusTimePlannerPage() { return <ThemeProvider><FocusTimePlannerContent /></ThemeProvider>; }
