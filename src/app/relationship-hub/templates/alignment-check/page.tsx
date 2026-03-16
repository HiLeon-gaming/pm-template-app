"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, GitCompare } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Check", desc: "Gap analysis + action plan + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Gap analysis only", icon: AlignJustify },
];

function AlignmentContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ALIGNMENT CHECK PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Reality vs Perception</td></tr>
    </tbody></table>
  );

  const renderGap = () => (
    <div ref={gapRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ALIGNMENT GAP ANALYSIS</div>
      <CopyButton targetRef={gapRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Misalignment is the silent killer of projects. What your stakeholder THINKS is happening vs what IS happening &mdash; that gap is where surprises, frustration, and trust erosion live. Use this page before any important meeting to check alignment and address gaps proactively.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Topic / Area</th>
          <th style={S.thPrimary}>What They Think</th>
          <th style={S.thPrimary}>What\u2019s Actually Happening</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Gap?</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>How to Close It</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "Timeline", think: "On track for June 15 launch as originally planned.", actual: "Tracking for June 28 due to API dependency delay. 13 business days behind.", gap: "Yes", close: "Brief sponsor this week. Present revised timeline with options." },
            { topic: "Budget", think: "Under budget. Everything is fine.", actual: "On budget but Q2 forecast shows potential 8% overrun if scope holds.", gap: "Yes", close: "Proactive budget update. Show forecast before it\u2019s a surprise." },
            { topic: "Scope", think: "All 12 features in Phase 1 as discussed.", actual: "10 features confirmed. 2 deferred to Phase 2 (decided in sprint planning).", gap: "Yes", close: "Communicate scope change formally. Show what\u2019s in Phase 2." },
            { topic: "Team Health", think: "Team is fine. No issues.", actual: "Two senior engineers overloaded. Risk of burnout if pace continues.", gap: "Yes", close: "Raise with sponsor. Request temp support or scope reduction." },
            { topic: "Quality", think: "Everything looks good.", actual: "Technical debt accumulating. Test coverage dropped to 62%.", gap: "Maybe", close: "Add tech debt sprint. Show quality metrics in next update." },
            { topic: "Stakeholders", think: "Everyone is aligned and supportive.", actual: "James (Eng.) disengaged. Sarah (Marketing) feels sidelined.", gap: "Yes", close: "Schedule 1:1s with both. Re-engage before it escalates." },
            { topic: "[Topic]", think: "[What they believe]", actual: "[What\u2019s really happening]", gap: "[Y/N]", close: "[Your plan to close the gap]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const gc = r.gap === "Yes" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.gap === "Maybe" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.gap === "No" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.think}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(gc.bg, gc.fg)}>{r.gap}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.close}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAction = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>REALIGNMENT ACTION PLAN</div>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>For each gap identified above, plan how you&apos;ll close it. Priority order: biggest gaps first, highest-impact stakeholders first.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={S.thPrimary}>Realignment Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>When</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Channel</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", pri: "Critical", who: "Sponsor", action: "Brief on timeline delay. Present revised plan with 3 options. Get decision on path forward.", when: "This week", channel: "1:1 meeting" },
            { n: "2", pri: "High", who: "Finance", action: "Proactive budget forecast update. Show potential overrun and mitigation plan.", when: "This week", channel: "Email + meeting" },
            { n: "3", pri: "High", who: "James Wu", action: "Schedule 1:1. Acknowledge disengagement. Discuss API dependency and clear next steps.", when: "Tomorrow", channel: "1:1 meeting" },
            { n: "4", pri: "Medium", who: "Sarah Chen", action: "Re-include in planning discussions. Send update on what\u2019s been decided.", when: "This week", channel: "Meeting + email" },
            { n: "5", pri: "[Priority]", who: "[Stakeholder]", action: "[What you\u2019ll do to close the alignment gap]", when: "[Deadline]", channel: "[How]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const pc = r.pri === "Critical" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.pri === "High" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.pri === "Medium" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(pc.bg, pc.fg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626", fontWeight: 600 }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.channel}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>ALIGNMENT PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Misalignment grows silently.", detail: "It doesn\u2019t announce itself. You have to actively check for it. That\u2019s what this page is for." },
                { color: "#059669", tip: "The gap between perception and reality IS the risk.", detail: "When stakeholders are surprised, trust erodes. Close gaps before they become surprises." },
                { color: "#0EA5E9", tip: "Check alignment before every major update.", detail: "Before SteerCo, before sponsor 1:1, before any high-stakes meeting. 10 minutes of prep saves hours of damage control." },
                { color: "#D97706", tip: "It\u2019s easier to maintain alignment than rebuild it.", detail: "Regular, honest communication prevents gaps. Recovery is 10x harder than prevention." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>HOW TO HAVE THE CONVERSATION</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "\"I want to make sure we\u2019re aligned on...\"", detail: "Non-threatening opener. Signals collaboration, not confrontation." },
                { color: "#DC2626", tip: "\"Here\u2019s what\u2019s changed since we last spoke.\"", detail: "Acknowledges evolution. Sets context for why they might be out of date." },
                { color: "#EA580C", tip: "\"I want to get ahead of a potential surprise.\"", detail: "Proactive framing. Shows you\u2019re managing, not reacting." },
                { color: "#059669", tip: "\"What\u2019s your understanding of where we are?\"", detail: "Ask THEM first. Listen. Then fill gaps. Don\u2019t assume you know what they think." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><GitCompare size={11} />Alignment</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Alignment Check Page</h2><p className="text-xs font-medium text-violet-600">Reality vs Perception &bull; Close Gaps Before They Become Surprises</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Misalignment is the silent killer of projects. What your stakeholder THINKS is happening vs what IS actually happening &mdash; that gap is where surprises, frustration, and trust erosion live. Use this before any important meeting to check alignment and address gaps proactively.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderGap()}{renderAction()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderGap()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function AlignmentCheckPage() { return <ThemeProvider><AlignmentContent /></ThemeProvider>; }
