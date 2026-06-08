"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Target,
  LayoutDashboard,
  AlignJustify,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "scorecard" | "weekly";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "scorecard", label: "OKR Scorecard", desc: "Full objectives view", icon: LayoutDashboard },
  { id: "weekly", label: "Weekly Check-in", desc: "Progress updates", icon: AlignJustify },
];

const OKRS = [
  {
    num: 1, objective: "[e.g., Accelerate product-market fit for Platform v2]",
    color: "#DC2626", colorBg: "#FEE2E2",
    krs: [
      { kr: "Achieve 500 active beta users by end of Q", baseline: "120", target: "500", conf: "0.6" },
      { kr: "Reduce onboarding drop-off from 40% to 15%", baseline: "40%", target: "15%", conf: "0.5" },
      { kr: "Net Promoter Score ≥ 50 from beta cohort", baseline: "32", target: "50", conf: "0.7" },
    ],
  },
  {
    num: 2, objective: "[e.g., Build a world-class engineering team]",
    color: "#2563EB", colorBg: "#DBEAFE",
    krs: [
      { kr: "Hire 4 senior engineers (2 backend, 2 frontend)", baseline: "0", target: "4", conf: "0.5" },
      { kr: "Reduce average time-to-hire from 45 to 25 days", baseline: "45d", target: "25d", conf: "0.4" },
      { kr: "Achieve 90%+ team engagement score", baseline: "78%", target: "90%", conf: "0.7" },
    ],
  },
  {
    num: 3, objective: "[e.g., Establish repeatable revenue engine]",
    color: "#059669", colorBg: "#D1FAE5",
    krs: [
      { kr: "Close $500K in new ARR", baseline: "$180K", target: "$500K", conf: "0.4" },
      { kr: "Reduce sales cycle from 60 to 35 days", baseline: "60d", target: "35d", conf: "0.5" },
      { kr: "Launch 3 case studies with logo customers", baseline: "0", target: "3", conf: "0.6" },
    ],
  },
];

function QuarterlyOKRContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("scorecard");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const okrRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);
  const retroRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "16px 20px",
            fontSize: "22px", fontWeight: 800, fontFamily: S.font,
            letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`,
            textAlign: "center" as const,
          }}>
            🎯 QUARTERLY OKR TRACKER
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Objectives &amp; Key Results
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "12%" }}>Quarter</td>
            <td style={{ ...S.td0, width: "16%" }}>Q[#] [Year]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Date Range</td>
            <td style={{ ...S.td0, width: "20%" }}>[Start] — [End]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Quarterly Theme</td>
            <td style={{ ...S.td0, width: "26%" }}>[e.g., Scale & Optimize / Build Foundation]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Company Mission Tie</td>
            <td colSpan={5} style={S.tdAlt}>[How do these OKRs connect to the company&apos;s top-level strategy this quarter?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderOKRCard = (okr: typeof OKRS[0]) => (
    <div style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={6} style={{
              backgroundColor: okr.colorBg, color: okr.color,
              padding: "10px 14px", fontFamily: S.font, fontSize: "14px",
              fontWeight: 800, letterSpacing: "0.02em",
              borderBottom: `3px solid ${okr.color}`,
              border: `1.5px solid ${C.border}`,
            }}>
              OBJECTIVE {okr.num}: {okr.objective}
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>KR</th>
            <th style={S.thSecondary}>Key Result</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Baseline</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Current</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {okr.krs.map((kr, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: okr.color }}>{okr.num}.{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{kr.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{kr.baseline}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 700 }}>{kr.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[___]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{kr.conf}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={2} style={{ ...S.tdLabelAlt, fontWeight: 700, fontSize: "11px" }}>Objective Score</td>
            <td colSpan={4} style={{ ...S.tdAlt, textAlign: "center" as const }}>
              <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>☐ 0.7–1.0</span>&nbsp;
              <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>☐ 0.4–0.6</span>&nbsp;
              <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>☐ 0.0–0.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderScorecard = () => (
    <div ref={okrRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📊 OKR SCORECARD</td></tr></tbody></table>
      <CopyButton targetRef={okrRef} label="Copy Section" />
      {OKRS.map((okr) => renderOKRCard(okr))}
    </div>
  );

  const renderWeeklyCheckins = () => (
    <div ref={weeklyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📅 WEEKLY CONFIDENCE CHECK-INS</td></tr></tbody></table>
      <CopyButton targetRef={weeklyRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>
        Update confidence scores weekly. Score 0.0–1.0 where 0.7+ = on track, 0.4–0.6 = at risk, below 0.4 = off track.
      </p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "20%" }}>Key Result</th>
            {Array.from({ length: 12 }).map((_, i) => (
              <th key={i} style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "9px", width: "6%" }}>Wk {i + 1}</th>
            ))}
            <th style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: C.accent, width: "7%" }}>Final</th>
          </tr>
        </thead>
        <tbody>
          {OKRS.flatMap((okr) =>
            okr.krs.map((kr, ki) => {
              const isAlt = (okr.num + ki) % 2 === 1;
              const bg = isAlt ? C.rowAlt : C.white;
              return (
                <tr key={`${okr.num}-${ki}`}>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>
                    <span style={{ color: okr.color, fontWeight: 800 }}>{okr.num}.{ki + 1}</span> {kr.kr.substring(0, 40)}...
                  </td>
                  {Array.from({ length: 12 }).map((_, w) => (
                    <td key={w} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>
                      {w === 0 ? kr.conf : ""}
                    </td>
                  ))}
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>[___]</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  const renderRetro = () => (
    <div ref={retroRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🌅 QUARTER-END RETROSPECTIVE</td></tr></tbody></table>
      <CopyButton targetRef={retroRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Reflection</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          {[
            { q: "Overall OKR grade (avg of all objectives)", a: "[___] / 1.0" },
            { q: "Objectives fully achieved", a: "[___] out of [___]" },
            { q: "What drove the biggest wins?", a: "" },
            { q: "What blocked or surprised us?", a: "" },
            { q: "What will we double-down on next quarter?", a: "" },
            { q: "What should we stop or deprioritize?", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.footerText, padding: "8px 20px",
            fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em",
          }}>
            ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderScorecardLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderScorecard()}{renderRetro()}{renderFooter()}</>
  );

  const renderWeeklyLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderScorecard()}{renderWeeklyCheckins()}{renderRetro()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Target size={11} /> OKRs
          </span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={14} /> Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Target size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Quarterly OKR Tracker</h2>
              <p className="text-xs font-medium text-indigo-600">Objectives &amp; Key Results &mdash; 12-Week Strategic Execution</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Set 3–5 objectives with measurable key results, track confidence scores weekly,
            and close with a quarter-end retrospective. OKR Scorecard focuses on the objectives;
            Weekly Check-in adds a 12-week confidence tracking grid.
          </p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                  <Icon size={15} /> <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "scorecard" && renderScorecardLayout()}
          {layout === "weekly" && renderWeeklyLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function QuarterlyOKRTrackerPage() {
  return (<ThemeProvider><QuarterlyOKRContent /></ThemeProvider>);
}
