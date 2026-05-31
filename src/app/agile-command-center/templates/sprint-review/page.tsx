"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Presentation, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Agenda + demo + feedback", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Demo script only", icon: AlignJustify },
];

function SprintReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🎬 SPRINT REVIEW / DEMO PREP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Review, Retro, Improvement</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date / Time</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY — 2:00 PM]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint Goal</td><td colSpan={3} style={S.tdAlt}>[One-line sprint goal]</td></tr>
        <tr><td style={S.tdLabel}>Facilitator</td><td style={S.td0}>[PO Name]</td><td style={S.tdLabel}>Duration</td><td style={S.td0}>[60 min]</td></tr>
        <tr><td style={S.tdLabelAlt}>Attendees</td><td colSpan={3} style={S.tdAlt}>[Scrum Team + Stakeholders: VP Sales, Marketing Lead, Support Manager]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 REVIEW AGENDA</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Duration</th>
          <th style={S.thPrimary}>Topic</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Presenter</th>
        </tr></thead>
        <tbody>
          {[
            { time: "2:00", dur: "5 min", topic: "Welcome + Sprint Goal recap", who: "[PO]" },
            { time: "2:05", dur: "5 min", topic: "Sprint metrics: committed vs. completed, velocity", who: "[SM]" },
            { time: "2:10", dur: "30 min", topic: "Live demo of completed stories (see demo script below)", who: "[Dev Team]" },
            { time: "2:40", dur: "10 min", topic: "Stakeholder feedback + questions", who: "[All]" },
            { time: "2:50", dur: "5 min", topic: "Upcoming sprint preview + backlog changes", who: "[PO]" },
            { time: "2:55", dur: "5 min", topic: "Action items + close", who: "[PO]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.who}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDemo = () => (
    <div ref={demoRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🖥️ DEMO SCRIPT</td></tr></tbody></table>
      <CopyButton targetRef={demoRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Demo working software, not slides. Show real user flows. Keep each demo under 5 minutes.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Story</th>
          <th style={S.thPrimary}>What to Demo</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Presenter</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Setup Notes</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-002", demo: "[Show returning user flow: login → checkout → address auto-fills → confirm]", who: "[Sarah]", time: "5 min", notes: "[Use test account: demo@test.com]" },
            { id: "S-003", demo: "[Complete an order → show confirmation email + in-app notification]", who: "[Mike]", time: "4 min", notes: "[Check email inbox before demo]" },
            { id: "S-010", demo: "[Apple Pay checkout: select item → Apple Pay → success → receipt]", who: "[Sarah]", time: "5 min", notes: "[Need iPhone or Safari; test card loaded]" },
            { id: "S-012a", demo: "[Trigger payment error → show error message → click retry → success]", who: "[Priya]", time: "3 min", notes: "[Use test card that triggers decline]" },
            { id: "Spike", demo: "[Share shipping API findings — 2-minute summary of options + recommendation]", who: "[Sarah]", time: "2 min", notes: "[Share screen: spike document]" },
            { id: "[Add]", demo: "", who: "", time: "", notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.demo}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFeedback = () => (
    <div ref={feedbackRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💬 STAKEHOLDER FEEDBACK</td></tr></tbody></table>
      <CopyButton targetRef={feedbackRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "15%" }}>Stakeholder</th>
          <th style={S.thSecondary}>Feedback / Comment</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Action Needed</th>
        </tr></thead>
        <tbody>
          {[
            { who: "[VP Sales]", fb: "[Loves Apple Pay — can we add Google Pay by next release?]", type: "Request", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, action: "[PO to add Google Pay to backlog]" },
            { who: "[Marketing]", fb: "[Confirmation email looks great — can we add a promo banner?]", type: "Request", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, action: "[PO to evaluate for future sprint]" },
            { who: "[Support Mgr]", fb: "[Error messages are much clearer — support tickets should decrease]", type: "Positive", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, action: "[None — monitor support volume]" },
            { who: "[Add]", fb: "", type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, action: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fb}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 SPRINT OUTCOME</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Committed", value: "[23 pts]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Completed", value: "[20 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Carry Over", value: "[3 pts]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Goal Met?", value: "[Yes]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "20px", padding: "10px 8px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Presentation size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Review / Demo Prep</h2><p className="text-xs font-medium text-amber-600">⭐ All-Star &mdash; Agenda, Demo Script &amp; Stakeholder Feedback</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured review agenda, demo script with setup notes, stakeholder feedback capture, and sprint outcome metrics.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderDemo()}{renderFeedback()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderDemo()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintReviewPage() { return <ThemeProvider><SprintReviewContent /></ThemeProvider>; }
