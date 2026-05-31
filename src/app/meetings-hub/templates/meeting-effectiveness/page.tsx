"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Gauge, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Scorecard", desc: "Ratings + trends + improvement plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Score", desc: "Ratings only", icon: AlignJustify },
];

function MeetingEffectivenessContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ratingsRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);
  const improvementRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📊 MEETING EFFECTIVENESS SCORE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Logs &amp; Follow-Up</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Meeting Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Rated By</td><td style={S.tdAlt}>[Your Name / Facilitator]</td><td style={S.tdLabelAlt}>Meeting Type</td><td style={S.tdAlt}>[1:1 / Team / Project / Exec]</td></tr>
        <tr><td style={S.tdLabel}>Duration</td><td style={S.td0}>[Planned: 60 min / Actual: 45 min]</td><td style={S.tdLabel}>Attendees</td><td style={S.td0}>[X present / Y invited]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRatings = () => (
    <div ref={ratingsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⭐ EFFECTIVENESS RATINGS (1-5)</td></tr></tbody></table>
      <CopyButton targetRef={ratingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Dimension</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Rating</th>
          <th style={S.thPrimary}>Evidence / Notes</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Clear purpose & agenda shared in advance", score: "[4]", rating: "Good", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "[Agenda sent 24hr before — clear outcomes listed]" },
            { dim: "Right people in the room (no more, no less)", score: "[5]", rating: "Excellent", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "[All decision-makers present, no unnecessary attendees]" },
            { dim: "Started and ended on time", score: "[3]", rating: "Okay", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, notes: "[Started 5 min late — ended on time]" },
            { dim: "Discussion stayed on topic", score: "[4]", rating: "Good", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "[One tangent captured in parking lot]" },
            { dim: "All voices heard (not dominated by 1-2 people)", score: "[3]", rating: "Okay", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, notes: "[2 people did 70% of talking — need to draw others out]" },
            { dim: "Decisions were made (not deferred)", score: "[4]", rating: "Good", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "[2 of 3 decisions made — 1 deferred with clear reason]" },
            { dim: "Clear actions with owners and due dates", score: "[5]", rating: "Excellent", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "[4 actions, all with owners + dates]" },
            { dim: "Could this have been an email/async?", score: "[5]", rating: "No — needed", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "[Required real-time discussion and decision-making]" },
            { dim: "Follow-up sent within 2 hours", score: "[4]", rating: "Good", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "[Recap sent within 90 minutes]" },
            { dim: "Energy & engagement level", score: "[3]", rating: "Okay", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, notes: "[Engagement dipped in last 15 min — meeting too long?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.dim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.rating}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 800 }}>OVERALL SCORE</td>
            <td style={{ ...S.tdLabel, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", color: accent }}>4.0</td>
            <td style={{ ...S.tdLabel, textAlign: "center" as const }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Good</span></td>
            <td style={{ ...S.tdLabel, fontSize: "10px", fontWeight: 600 }}>[40 / 50 = 80% — above 70% is a good meeting]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderTrends = () => (
    <div ref={trendsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📈 TREND OVER TIME</td></tr></tbody></table>
      <CopyButton targetRef={trendsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Meeting</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Trend</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Key Issue / Win</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/05]", meeting: "[Weekly staff]", score: "4.0", trend: "↑", note: "[Best score yet — agenda improved]" },
            { date: "[02/26]", meeting: "[Weekly staff]", score: "3.6", trend: "↑", note: "[Better time management]" },
            { date: "[02/19]", meeting: "[Weekly staff]", score: "3.2", trend: "→", note: "[Ran over by 15 min]" },
            { date: "[02/12]", meeting: "[Weekly staff]", score: "3.0", trend: "↓", note: "[No agenda sent — disorganized]" },
            { date: "[02/05]", meeting: "[Weekly staff]", score: "3.4", trend: "—", note: "[Baseline score]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accentDark }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderImprovement = () => (
    <div ref={improvementRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 IMPROVEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={improvementRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Biggest Win</td><td style={{ ...S.td0, color: "#059669", fontWeight: 600 }}>[What worked best? Do more of this.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Biggest Gap</td><td style={{ ...S.tdAlt, color: "#DC2626", fontWeight: 600 }}>[What scored lowest? What will you change?]</td></tr>
        <tr><td style={S.tdLabel}>Action #1</td><td style={S.td0}>[Specific improvement — e.g., "Draw out quiet voices by directly asking for input"]</td></tr>
        <tr><td style={S.tdLabelAlt}>Action #2</td><td style={S.tdAlt}>[Specific improvement — e.g., "End meetings 5 min early for wrap-up"]</td></tr>
        <tr><td style={S.tdLabel}>Target Score</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[4.5 / 5 by end of month]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Gauge size={11} />Score</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Gauge size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Effectiveness Score</h2><p className="text-xs font-medium text-teal-600">10-Dimension Rating &bull; Trends &bull; Improvement Plan</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Rate meeting effectiveness across 10 dimensions. Track trends over time and identify specific improvements.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderRatings()}{renderTrends()}{renderImprovement()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderRatings()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingEffectivenessPage() { return <ThemeProvider><MeetingEffectivenessContent /></ThemeProvider>; }
