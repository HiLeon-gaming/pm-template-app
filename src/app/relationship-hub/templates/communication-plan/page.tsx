"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Megaphone } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Matrix + calendar + escalation + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Matrix only", icon: AlignJustify },
];

function CommPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>COMMUNICATION PLAN (PER STAKEHOLDER GROUP)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Who Gets What, When, How</td></tr>
    </tbody></table>
  );

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER COMMUNICATION MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Define WHO gets WHAT information, HOW often, through WHICH channel, and WHO owns the communication. Different stakeholders need different levels of detail at different frequencies. One size does NOT fit all.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder / Group</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>What They Need</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Frequency</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Channel</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Format</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
          <th style={S.thPrimary}>Key Messages / Framing</th>
        </tr></thead>
        <tbody>
          {[
            { who: "Executive Sponsor", what: "Overall status, risks, decisions needed", freq: "Bi-weekly", channel: "1:1 meeting", format: "Exec Update", owner: "You", msg: "Bottom line up front. RAG status. What do you need from me?" },
            { who: "SteerCo", what: "Milestone progress, budget, risks, asks", freq: "Monthly", channel: "SteerCo deck", format: "Formal presentation", owner: "You", msg: "On track / At risk with clear actions. Data-driven." },
            { who: "Project Team", what: "Sprint updates, blockers, priorities", freq: "Weekly", channel: "Team standup", format: "Verbal + Slack", owner: "You", msg: "What\u2019s next, what\u2019s blocked, who needs help." },
            { who: "Engineering", what: "Technical dependencies, timeline impacts", freq: "As needed", channel: "Slack / Working session", format: "Technical brief", owner: "Tech Lead", msg: "Specific, technical, solution-oriented." },
            { who: "Finance", what: "Budget updates, variance, forecasts", freq: "Monthly", channel: "Email + dashboard", format: "Short Update", owner: "You", msg: "Numbers first. Explain variances. No surprises." },
            { who: "End Users", what: "What\u2019s changing, when, impact on them", freq: "Per milestone", channel: "Email / Town hall", format: "Announcement", owner: "Comms lead", msg: "What\u2019s changing, why it matters, what to do." },
            { who: "[Group]", what: "[What they need]", freq: "[How often]", channel: "[How]", format: "[Template]", owner: "[Who]", msg: "[How to frame it for this audience]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: accent }}>{r.freq}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.channel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.format}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.msg}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCalendar = () => (
    <div ref={calendarRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>COMMUNICATION CALENDAR &mdash; THIS MONTH</td></tr></tbody></table>
      <CopyButton targetRef={calendarRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Plot your communications on the calendar so nothing falls through the cracks. Block time in your calendar for writing updates and prep.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Week</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Audience</th>
          <th style={S.thPrimary}>Communication</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Channel</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Prep Time</th>
        </tr></thead>
        <tbody>
          {[
            { week: "Week 1", who: "Sponsor", comm: "Bi-weekly 1:1. Q2 risk briefing + vendor decision follow-up.", channel: "Meeting", owner: "You", prep: "30 min" },
            { week: "Week 1", who: "Team", comm: "Sprint kickoff. Priorities and blockers for the sprint.", channel: "Standup", owner: "You", prep: "15 min" },
            { week: "Week 2", who: "Engineering", comm: "API dependency working session.", channel: "Working session", owner: "Tech Lead", prep: "1 hour" },
            { week: "Week 3", who: "Finance", comm: "Monthly budget update. Q2 projections.", channel: "Email", owner: "You", prep: "30 min" },
            { week: "Week 4", who: "SteerCo", comm: "Monthly SteerCo presentation.", channel: "Formal meeting", owner: "You", prep: "2 hours" },
            { week: "[Week]", who: "[Audience]", comm: "[What you\u2019re communicating]", channel: "[How]", owner: "[Who]", prep: "[Time needed]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700, color: "#6366F1" }}>{r.week}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.comm}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.channel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.prep}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>COMMUNICATION PLANNING RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Different audiences need different messages.", detail: "What your sponsor needs is not what your team needs. Tailor the content and depth." },
                { color: "#0EA5E9", tip: "Proactive > Reactive.", detail: "If stakeholders have to ask for updates, you\u2019ve already failed. Stay ahead." },
                { color: "#8B5CF6", tip: "Consistency builds trust.", detail: "Same cadence, same format, same quality. Predictability = confidence." },
                { color: "#D97706", tip: "Bad news early, good news often.", detail: "Surprise people with good news, never with bad news." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>ESCALATION COMMUNICATION</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Critical issues: communicate within 1 hour.", detail: "Major risks, failures, or blockers need immediate escalation. Don\u2019t wait for the weekly update." },
                { color: "#EA580C", tip: "Use the right channel for the urgency.", detail: "Low urgency = email. Medium = Slack. High = phone call or walk to their desk." },
                { color: "#D97706", tip: "Always include: what happened, impact, what you\u2019re doing about it.", detail: "Context + impact + action = professional escalation." },
                { color: "#6366F1", tip: "Follow up after escalation.", detail: "Close the loop. Update them when the issue is resolved or the situation changes." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Megaphone size={11} />Strategic</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Handshake size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Communication Plan</h2><p className="text-xs font-medium text-emerald-600">Strategic &bull; Who Gets What, When, How</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Define your communication strategy for every stakeholder group. Who gets what information, how often, through which channel, and who owns it. Different stakeholders need different levels of detail at different frequencies. This plan ensures nobody is surprised.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderMatrix()}{renderCalendar()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMatrix()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function CommunicationPlanPage() { return <ThemeProvider><CommPlanContent /></ThemeProvider>; }
