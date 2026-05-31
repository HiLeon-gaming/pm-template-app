"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, RefreshCw } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Health check + actions + retrospective + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Review", desc: "Health check + actions only", icon: AlignJustify },
];

function ReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const retroRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RELATIONSHIP REVIEW NOTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Monthly Review &nbsp;|&nbsp; [MONTH / YEAR]</td></tr>
    </tbody></table>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>RELATIONSHIP HEALTH SNAPSHOT</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Review every key stakeholder relationship once a month. How are things going? What changed? Where do you need to invest more? This 15-minute exercise prevents small problems from becoming big ones.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Last Month</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>This Month</th>
          <th style={S.thPrimary}>What Changed &amp; Why</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Action Needed</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez (Sponsor)", last: "Green", now: "Green", change: "Stable. Regular 1:1s keeping alignment strong. She championed our Q1 results.", action: "Continue cadence. Brief her on Q2 risks." },
            { name: "David Park (Finance)", last: "Amber", now: "Green", change: "Improved! Budget conversation went well. He feels heard now.", action: "Send thank-you. Keep him updated monthly." },
            { name: "James Wu (Engineering)", last: "Red", now: "Amber", change: "Slight improvement after direct conversation. Still wary but more responsive.", action: "Schedule working session. Show progress on his concern." },
            { name: "Sarah Chen (Marketing)", last: "Green", now: "Amber", change: "Drifting. Haven\u2019t connected in 3 weeks. She seemed disengaged in last SteerCo.", action: "Urgent: schedule 1:1 this week." },
            { name: "[Stakeholder]", last: "[RAG]", now: "[RAG]", change: "[What shifted and why]", action: "[What you\u2019ll do about it]" },
            { name: "[Stakeholder]", last: "[RAG]", now: "[RAG]", change: "[What shifted and why]", action: "[What you\u2019ll do about it]" },
            { name: "[Stakeholder]", last: "[RAG]", now: "[RAG]", change: "[What shifted and why]", action: "[What you\u2019ll do about it]" },
            { name: "[Stakeholder]", last: "[RAG]", now: "[RAG]", change: "[What shifted and why]", action: "[What you\u2019ll do about it]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const ragColor = (v: string) => v === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : v === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : v === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(ragColor(r.last).bg, ragColor(r.last).fg)}>{r.last}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(ragColor(r.now).bg, ragColor(r.now).fg)}>{r.now}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.change}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>NEXT MONTH&apos;S PRIORITY ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Based on your health snapshot, what are the top 5 relationship actions for next month? Be specific &mdash; who, what, and by when.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>By When</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", who: "Sarah Chen", action: "Schedule 1:1, understand what\u2019s causing disengagement, re-align on shared goals.", when: "This week", pri: "High" },
            { n: "2", who: "James Wu", action: "Hold working session on API dependency. Show progress on his concern.", when: "Week 2", pri: "High" },
            { n: "3", who: "Maria Lopez", action: "Brief on Q2 risks before SteerCo. Keep her ahead of bad news.", when: "Week 1", pri: "Medium" },
            { n: "4", who: "David Park", action: "Monthly budget update. Send before he has to ask.", when: "Week 3", pri: "Medium" },
            { n: "5", who: "[Stakeholder]", action: "[What you\u2019ll do]", when: "[When]", pri: "[H/M/L]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const pColor = r.pri === "High" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.pri === "Medium" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(pColor.bg, pColor.fg)}>{r.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRetro = () => (
    <div ref={retroRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>MONTHLY RETROSPECTIVE</td></tr></tbody></table>
      <CopyButton targetRef={retroRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Reflect on your relationship management this month. What patterns do you see? What&apos;s working? What needs to change?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "30%" }}>Reflection Question</th>
          <th style={S.thPrimary}>Your Answer</th>
        </tr></thead>
        <tbody>
          {[
            { q: "Which relationships improved this month?", a: "[Names and why. What did you do that worked?]" },
            { q: "Which relationships degraded?", a: "[Names and why. What did you miss or neglect?]" },
            { q: "Did you follow through on last month\u2019s actions?", a: "[How many of your 5 priority actions did you complete? What blocked the rest?]" },
            { q: "Any surprises (positive or negative)?", a: "[Unexpected wins, sudden resistance, new stakeholders, political shifts]" },
            { q: "What\u2019s your biggest relationship risk right now?", a: "[Which relationship, if it fails, would hurt your work most?]" },
            { q: "What will you do differently next month?", a: "[One specific change to your approach]" },
            { q: "Overall confidence in your stakeholder landscape?", a: "[High / Medium / Low. Why?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.a}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>MONTHLY REVIEW BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Block 30 minutes on the last Friday of every month.", detail: "If it\u2019s not on your calendar, it won\u2019t happen. Make this a recurring ritual." },
                { color: "#059669", tip: "Be brutally honest with yourself.", detail: "This is your private assessment. Don\u2019t sugarcoat. If a relationship is degrading, face it." },
                { color: "#8B5CF6", tip: "Look for patterns across months.", detail: "Over 3\u20136 months, you\u2019ll see trends. Are you consistently neglecting the same people?" },
                { color: "#D97706", tip: "Share highlights (not the full review) with your manager.", detail: "Your manager should know about relationship risks. Share the signal, not the noise." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON REVIEW MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Skipping the review when things are \u201Cfine.\u201D", detail: "Things feel fine until they suddenly aren\u2019t. The review catches drift before it becomes a crisis." },
                { color: "#EA580C", tip: "Only tracking negative changes.", detail: "Celebrate improvements too. Positive reinforcement helps you repeat what\u2019s working." },
                { color: "#D97706", tip: "Setting actions without follow-through.", detail: "5 actions you don\u2019t complete are worse than 2 you do. Be realistic." },
                { color: "#6366F1", tip: "Reviewing alone without ever getting input.", detail: "Occasionally ask a trusted colleague: \u201CHow do you think my relationship with X is going?\u201D" },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><RefreshCw size={11} />Monthly</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Handshake size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Relationship Review Notes</h2><p className="text-xs font-medium text-sky-600">Monthly &bull; Continuous Improvement</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your monthly relationship health check. Review how every key stakeholder relationship is trending, identify what improved and what degraded, set priority actions for next month, and reflect on your overall approach. This is the habit that separates reactive PMs from strategic ones.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHealth()}{renderActions()}{renderRetro()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHealth()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RelationshipReviewNotesPage() { return <ThemeProvider><ReviewContent /></ThemeProvider>; }
