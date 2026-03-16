"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, TrendingUp } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Sentiment log + trend + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Tracker", desc: "Sentiment log only", icon: AlignJustify },
];

function SentimentContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER SENTIMENT TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Reading the Room</td></tr>
    </tbody></table>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>SENTIMENT LOG &mdash; [MONTH / YEAR]</div>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track how each stakeholder FEELS about your project and their relationship with you. Sentiment is a leading indicator &mdash; it changes before behavior does. If you catch a sentiment shift early, you can address it before it becomes a real problem.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Sentiment</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thPrimary}>Why This Rating</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Evidence</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Action If Negative</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", sent: "Positive", trend: "\u2192", why: "Aligned on strategy. Pleased with Q1 results. Active champion in leadership meetings.", evidence: "SteerCo feedback", action: "Maintain cadence. Keep her well-briefed." },
            { name: "David Park", sent: "Neutral", trend: "\u2191", why: "Was frustrated about budget opacity. Improved after monthly updates started.", evidence: "Email tone shift", action: "Continue monthly updates. Don\u2019t revert." },
            { name: "James Wu", sent: "Negative", trend: "\u2193", why: "Feels ignored on API dependency. Two follow-ups unanswered by us (his perspective).", evidence: "Short replies, skipped meeting", action: "Urgent 1:1. Acknowledge the gap. Show progress." },
            { name: "Sarah Chen", sent: "Neutral", trend: "\u2193", why: "Drifting. Hasn\u2019t been included in recent decisions. May feel sidelined.", evidence: "Disengaged in SteerCo", action: "Schedule 1:1. Re-include in relevant discussions." },
            { name: "[Stakeholder]", sent: "[+/0/-]", trend: "[\u2191\u2192\u2193]", why: "[What gives you this impression?]", evidence: "[Observable signals]", action: "[What you\u2019ll do about it]" },
            { name: "[Stakeholder]", sent: "[+/0/-]", trend: "[\u2191\u2192\u2193]", why: "[What gives you this impression?]", evidence: "[Observable signals]", action: "[What you\u2019ll do about it]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = r.sent === "Positive" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.sent === "Negative" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.sent === "Neutral" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            const tc = r.trend === "\u2191" ? "#059669" : r.trend === "\u2193" ? "#DC2626" : "#D97706";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc.bg, sc.fg)}>{r.sent}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px", color: tc, fontWeight: 800 }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.evidence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTrend = () => (
    <div ref={trendRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>SENTIMENT SIGNALS &mdash; WHAT TO WATCH FOR</div>
      <CopyButton targetRef={trendRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Signal Type</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Positive Signals</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Negative Signals</th>
          <th style={S.thPrimary}>What to Do</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Email/Slack", pos: "Quick replies, friendly tone, forwards your updates", neg: "Delayed replies, short/curt tone, CC\u2019s their manager", action: "If negative: pick up the phone. Written comms can\u2019t fix tone issues." },
            { type: "Meetings", pos: "Engaged, asks questions, volunteers help", neg: "Distracted, silent, skips meetings, sends delegate", action: "If negative: schedule 1:1 to understand what\u2019s behind it." },
            { type: "Decisions", pos: "Approves quickly, trusts your judgment", neg: "Questions everything, delays decisions, escalates around you", action: "If negative: they don\u2019t trust you. Rebuild through transparency and delivery." },
            { type: "Informal", pos: "Includes you in hallway chats, mentions you positively", neg: "Avoids you, talks to your peers instead, goes silent", action: "If negative: address directly. \u201CI sense something has shifted. Can we talk?\u201D" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent, textAlign: "center" as const }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#059669" }}>{r.pos}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626" }}>{r.neg}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.action}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>READING SENTIMENT</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Sentiment is a LEADING indicator.", detail: "It changes before behavior does. Catch it early and you can prevent problems." },
                { color: "#059669", tip: "Trust your gut, then verify.", detail: "If something feels off, it probably is. But confirm with observable evidence." },
                { color: "#0EA5E9", tip: "Ask trusted colleagues for calibration.", detail: "\u201CHow do you think my relationship with X is going?\u201D Fresh perspective helps." },
                { color: "#D97706", tip: "Track over time, not just once.", detail: "A single data point is noise. A trend over 3 months is signal." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>RECOVERING FROM NEGATIVE SENTIMENT</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Address it directly.", detail: "Don\u2019t pretend everything is fine. Say: \u201CI want to check in on how we\u2019re working together.\u201D" },
                { color: "#EA580C", tip: "Listen more than you talk.", detail: "Understanding their frustration is more important than defending yourself." },
                { color: "#D97706", tip: "Follow words with action.", detail: "After the conversation, DO something different. Changed behavior rebuilds trust." },
                { color: "#059669", tip: "Give it time.", detail: "Sentiment doesn\u2019t flip overnight. Consistent positive actions over weeks will shift it." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><TrendingUp size={11} />Sentiment</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Handshake size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Sentiment Tracker</h2><p className="text-xs font-medium text-violet-600">Reading the Room &bull; Leading Indicator of Relationship Health</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track how each stakeholder FEELS about your project and their working relationship with you. Sentiment is a leading indicator &mdash; it shifts before behavior does. Catch negative trends early and you can address them before they become real problems.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderLog()}{renderTrend()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderSentimentTrackerPage() { return <ThemeProvider><SentimentContent /></ThemeProvider>; }
