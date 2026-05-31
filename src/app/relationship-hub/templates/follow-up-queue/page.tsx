"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ListChecks } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Queue", desc: "Priority queue + completed + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Queue", desc: "Priority queue only", icon: AlignJustify },
];

function FollowUpContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>FOLLOW-UP QUEUE (NEXT 7 DAYS)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderQueue = () => (
    <div ref={queueRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>THIS WEEK&apos;S FOLLOW-UPS &mdash; PRIORITY ORDER</td></tr></tbody></table>
      <CopyButton targetRef={queueRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your daily execution list. Review every morning. Check off as you go. Anything not done by Friday gets carried to next week with an explanation. Red items first, always.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={S.thPrimary}>Follow-Up Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Context</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>By When</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", pri: "Urgent", who: "David Park", action: "Send overdue budget breakdown. Include apology and extra Q2 detail.", ctx: "3 days late", when: "Mon", done: "\u2610" },
            { n: "2", pri: "Urgent", who: "James Wu", action: "Follow up on API timeline. He\u2019s 2 days overdue. Be direct but professional.", ctx: "Dependency", when: "Mon", done: "\u2610" },
            { n: "3", pri: "High", who: "Maria Lopez", action: "Brief her on Q2 risks before SteerCo. Send pre-read by Tue.", ctx: "Sponsor prep", when: "Tue", done: "\u2610" },
            { n: "4", pri: "High", who: "Sarah Chen", action: "Schedule 1:1. Understand disengagement. Re-align on shared goals.", ctx: "Relationship drift", when: "Wed", done: "\u2610" },
            { n: "5", pri: "Medium", who: "Maria Lopez", action: "Confirm she received vendor comparison. Ask for feedback.", ctx: "Delivered Fri", when: "Wed", done: "\u2610" },
            { n: "6", pri: "Medium", who: "Eng. Lead", action: "Send Phase 2 technical approach doc for review before sprint planning.", ctx: "Alignment", when: "Thu", done: "\u2610" },
            { n: "7", pri: "Low", who: "David Park", action: "Monthly check-in \u2014 proactive, not reactive. Share positive project news.", ctx: "Maintenance", when: "Fri", done: "\u2610" },
            { n: "8", pri: "[P]", who: "[Name]", action: "[What you need to follow up on]", ctx: "[Why]", when: "[Day]", done: "\u2610" },
            { n: "9", pri: "[P]", who: "[Name]", action: "[What you need to follow up on]", ctx: "[Why]", when: "[Day]", done: "\u2610" },
            { n: "10", pri: "[P]", who: "[Name]", action: "[What you need to follow up on]", ctx: "[Why]", when: "[Day]", done: "\u2610" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const pc = r.pri === "Urgent" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.pri === "High" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.pri === "Medium" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : r.pri === "Low" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(pc.bg, pc.fg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.ctx}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDone = () => (
    <div ref={doneRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>COMPLETED THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={doneRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Move items here as you complete them. At week-end, review what you accomplished and what carried over.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={S.thPrimary}>What You Did</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Completed</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Outcome / Next Step</th>
        </tr></thead>
        <tbody>
          {[
            { who: "[Stakeholder]", what: "[Follow-up action completed]", when: "[Day]", outcome: "[What happened? Any follow-up needed?]" },
            { who: "[Stakeholder]", what: "[Follow-up action completed]", when: "[Day]", outcome: "[What happened? Any follow-up needed?]" },
            { who: "[Stakeholder]", what: "[Follow-up action completed]", when: "[Day]", outcome: "[What happened? Any follow-up needed?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#059669", fontWeight: 600 }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.outcome}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FFF7ED", color: "#EA580C", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #EA580C" }}>FOLLOW-UP EXECUTION RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#EA580C", tip: "Check this list every morning at 9 AM.", detail: "Make it a ritual. 2 minutes to scan the queue and plan your day." },
                { color: "#DC2626", tip: "Urgent items before 11 AM.", detail: "Don\u2019t let urgent follow-ups wait until end-of-day. Do them first." },
                { color: "#059669", tip: "If it takes <5 minutes, do it now.", detail: "Quick follow-ups shouldn\u2019t sit in a queue. Send the email, make the call." },
                { color: "#0EA5E9", tip: "Batch similar follow-ups together.", detail: "If you have 3 emails to send, write them all at once. Context-switching is expensive." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WEEKLY REVIEW QUESTIONS</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "How many follow-ups did I complete?", detail: "Track your completion rate. Aim for 90%+ weekly." },
                { color: "#DC2626", tip: "What carried over and why?", detail: "If the same items keep carrying over, there\u2019s a systemic problem to address." },
                { color: "#EA580C", tip: "Did any follow-up create new commitments?", detail: "Add them to your Commitments Log immediately." },
                { color: "#6366F1", tip: "What\u2019s next week\u2019s queue looking like?", detail: "Start next week\u2019s queue on Friday afternoon so Monday morning is ready." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><ListChecks size={11} />Weekly</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Handshake size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Follow-Up Queue (Next 7 Days)</h2><p className="text-xs font-medium text-orange-600">Weekly &bull; Daily Execution List</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your prioritized list of follow-ups for the week. Review every morning, execute in priority order, and check off as you go. This is where relationship management becomes daily habit &mdash; not something you do when you remember. Urgent items first, always.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderQueue()}{renderDone()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderQueue()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function FollowUpQueuePage() { return <ThemeProvider><FollowUpContent /></ThemeProvider>; }
