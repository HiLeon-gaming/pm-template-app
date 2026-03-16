"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Hourglass } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Waiting list + aging analysis + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Waiting list only", icon: AlignJustify },
];

function WaitingContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const agingRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WAITING ON TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Pending Requests</td></tr>
    </tbody></table>
  );

  const renderList = () => (
    <div ref={listRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ITEMS WAITING ON OTHERS</div>
      <CopyButton targetRef={listRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Everything you&apos;re blocked on or waiting for from someone else. Review daily. Follow up proactively &mdash; don&apos;t wait for things to arrive. If it&apos;s been &gt;3 days with no update, ping them.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Waiting On</th>
          <th style={S.thPrimary}>What You Need</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Requested</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Expected By</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Days</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Next Ping</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Impact If Late</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", who: "James Wu", what: "API dependency timeline from engineering team.", req: "Mar 5", exp: "Mar 12", days: "5", ping: "TODAY", impact: "Blocks sprint planning" },
            { n: "2", who: "Maria Lopez", what: "Board meeting slot confirmation for vendor presentation.", req: "Mar 12", exp: "Mar 15", days: "1", ping: "Mar 14", impact: "Delays vendor decision" },
            { n: "3", who: "Legal Team", what: "Contract review for new vendor agreement.", req: "Mar 8", exp: "Mar 18", days: "5", ping: "Mar 16", impact: "Delays procurement" },
            { n: "4", who: "Sarah Chen", what: "Marketing requirements doc for Phase 2.", req: "Mar 1", exp: "Mar 18", days: "12", ping: "Mar 16", impact: "Scope incomplete" },
            { n: "5", who: "HR", what: "Headcount approval for additional PM.", req: "Feb 20", exp: "Mar 10", days: "23", ping: "TODAY", impact: "Team under-resourced" },
            { n: "6", who: "[Person]", what: "[What you need from them]", req: "[Date]", exp: "[Date]", days: "[X]", ping: "[Date]", impact: "[What breaks]" },
            { n: "7", who: "[Person]", what: "[What you need from them]", req: "[Date]", exp: "[Date]", days: "[X]", ping: "[Date]", impact: "[What breaks]" },
            { n: "8", who: "[Person]", what: "[What you need from them]", req: "[Date]", exp: "[Date]", days: "[X]", ping: "[Date]", impact: "[What breaks]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const daysNum = parseInt(r.days);
            const dc = daysNum > 10 ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : daysNum > 5 ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : !isNaN(daysNum) ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.exp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(dc.bg, dc.fg)}>{r.days}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: r.ping === "TODAY" ? "#DC2626" : C.textMuted, fontWeight: r.ping === "TODAY" ? 800 : 400 }}>{r.ping}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.impact}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAging = () => (
    <div ref={agingRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>AGING ANALYSIS &mdash; ITEMS OVERDUE OR AT RISK</div>
      <CopyButton targetRef={agingRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Items that are past their expected date or at high risk of being late. These need escalation or a different approach.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Person</th>
          <th style={S.thPrimary}>Item</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Days Overdue</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Escalation / Recovery Plan</th>
        </tr></thead>
        <tbody>
          {[
            { who: "HR", item: "Headcount approval for additional PM.", over: "13 days", plan: "Escalate through your manager. Ask them to ping HR VP directly. Include impact statement." },
            { who: "James Wu", item: "API dependency timeline.", over: "1 day", plan: "Direct Slack message today. If no response by Wed, loop in his manager." },
            { who: "[Person]", item: "[What\u2019s overdue]", over: "[X days]", plan: "[Your recovery plan]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626", textAlign: "center" as const }}>{r.over}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.plan}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FFF7ED", color: "#EA580C", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #EA580C" }}>FOLLOW-UP PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#EA580C", tip: "Follow up BEFORE the deadline.", detail: "A friendly check-in 2 days before shows professionalism, not nagging." },
                { color: "#059669", tip: "Make your request crystal clear.", detail: "\u201CI need the API timeline by Thursday for sprint planning\u201D beats \u201CCan you send me that thing?\u201D" },
                { color: "#0EA5E9", tip: "Include the impact of delay.", detail: "\u201CIf I don\u2019t have this by Friday, we\u2019ll miss the sprint planning window.\u201D Context motivates action." },
                { color: "#D97706", tip: "Keep a paper trail.", detail: "Follow up in writing (email/Slack). Verbal promises without documentation are risky." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>ESCALATION TRIGGERS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: ">5 business days overdue = escalate.", detail: "If direct follow-up hasn\u2019t worked after a week, involve their manager or your manager." },
                { color: "#EA580C", tip: "Two ignored follow-ups = change approach.", detail: "If they haven\u2019t responded twice, call them, walk to their desk, or find an intermediary." },
                { color: "#D97706", tip: "High-impact items get shorter fuses.", detail: "If delay blocks your whole team, escalate at 3 days, not 5." },
                { color: "#6366F1", tip: "Document the escalation professionally.", detail: "\u201CI\u2019ve followed up twice. This is blocking X. I\u2019m raising this because I need help.\u201D" },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Hourglass size={11} />Pending</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Waiting On Tracker</h2><p className="text-xs font-medium text-orange-600">Pending Requests &bull; Don&apos;t Assume It&apos;s Coming</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track everything you&apos;re waiting for from others. Don&apos;t assume deliverables will arrive on time &mdash; follow up proactively, track aging, and escalate when items go overdue. Your project depends on what others deliver to you.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderList()}{renderAging()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderList()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WaitingOnTrackerPage() { return <ThemeProvider><WaitingContent /></ThemeProvider>; }
