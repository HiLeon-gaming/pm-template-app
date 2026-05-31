"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Clock } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Planner", desc: "Touchpoint plan + monthly review + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Touchpoint table only", icon: AlignJustify },
];

function TouchpointContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER TOUCHPOINT PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Monthly Planning</td></tr>
    </tbody></table>
  );

  const renderPlan = () => (
    <div ref={planRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MONTH: [MONTH / YEAR] &mdash; WHO NEEDS A CHECK-IN</td></tr></tbody></table>
      <CopyButton targetRef={planRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>At the start of each month, review this list. Who needs attention? Who are you neglecting? Schedule touchpoints proactively. Red and Amber stakeholders get priority &mdash; but don&apos;t forget your Green relationships either.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={S.thPrimary}>Why They Need a Touchpoint</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Type</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Week</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", name: "Maria Lopez", health: "Green", why: "Quarterly review prep; need alignment on Q2 goals before SteerCo.", type: "1:1 meeting", week: "Week 1", done: "\u2610" },
            { n: "2", name: "David Park", health: "Amber", why: "Haven\u2019t connected in 3 weeks; budget discussion pending. Drifting.", type: "Call", week: "Week 1", done: "\u2610" },
            { n: "3", name: "Sarah Chen", health: "Green", why: "Share wins from last sprint; equip her with talking points as champion.", type: "Quick update", week: "Week 2", done: "\u2610" },
            { n: "4", name: "James Wu", health: "Red", why: "Unresolved dependency; relationship needs repair. This is urgent.", type: "1:1 meeting", week: "Week 2", done: "\u2610" },
            { n: "5", name: "Engineering Lead", health: "Green", why: "Align on Phase 2 technical approach before sprint planning.", type: "Working session", week: "Week 3", done: "\u2610" },
            { n: "6", name: "[Enter name]", health: "[RAG]", why: "[Reason]", type: "[Type]", week: "[Week]", done: "\u2610" },
            { n: "7", name: "[Enter name]", health: "[RAG]", why: "[Reason]", type: "[Type]", week: "[Week]", done: "\u2610" },
            { n: "8", name: "[Enter name]", health: "[RAG]", why: "[Reason]", type: "[Type]", week: "[Week]", done: "\u2610" },
            { n: "9", name: "[Enter name]", health: "[RAG]", why: "[Reason]", type: "[Type]", week: "[Week]", done: "\u2610" },
            { n: "10", name: "[Enter name]", health: "[RAG]", why: "[Reason]", type: "[Type]", week: "[Week]", done: "\u2610" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const hColor = r.health === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.health === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.health === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(hColor.bg, hColor.fg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const }}>{r.week}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>END-OF-MONTH REVIEW</td></tr></tbody></table>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>At month-end, review your touchpoint completion. Did you reach everyone who needed attention? What patterns do you see?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "30%" }}>Review Question</th>
          <th style={S.thPrimary}>Your Answer</th>
        </tr></thead>
        <tbody>
          {[
            { q: "How many planned touchpoints did you complete?", a: "[X of Y completed. What blocked the others?]" },
            { q: "Which stakeholders did you neglect this month?", a: "[Names. Why? What\u2019s the plan for next month?]" },
            { q: "Any relationship health changes (better or worse)?", a: "[Who moved from Green to Amber? Amber to Red? Or improved?]" },
            { q: "What worked well this month?", a: "[Which touchpoint type was most effective? What feedback did you get?]" },
            { q: "What will you do differently next month?", a: "[Adjustments to frequency, format, or approach.]" },
            { q: "Who should be ADDED to next month\u2019s plan?", a: "[New stakeholders or previously low-priority ones who need attention.]" },
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
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>TOUCHPOINT PLANNING PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Red stakeholders get touchpoints first.", detail: "Damaged relationships need immediate attention. Don\u2019t let them fester another month." },
                { color: "#059669", tip: "Don\u2019t neglect Green relationships.", detail: "Green relationships stay green because you maintain them. Neglect turns Green to Amber fast." },
                { color: "#8B5CF6", tip: "Vary the touchpoint type.", detail: "Not everything needs to be a formal meeting. Slack messages, quick calls, and coffee chats count." },
                { color: "#D97706", tip: "Schedule at the start of the month.", detail: "If it\u2019s not on the calendar, it won\u2019t happen. Block time for relationship management." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>TOUCHPOINT ANTI-PATTERNS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Only reaching out when you need something.", detail: "Relationships are bank accounts. Make deposits before you need withdrawals." },
                { color: "#EA580C", tip: "Treating touchpoints as status updates.", detail: "The goal is relationship building, not reporting. Ask questions. Listen. Show interest." },
                { color: "#D97706", tip: "Planning but not executing.", detail: "A touchpoint planner that\u2019s never followed is worse than no plan at all." },
                { color: "#6366F1", tip: "Ignoring the \u201CI should reach out but...\u201D feeling.", detail: "If you think you should reach out, you\u2019re already overdue. Trust that instinct." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Clock size={11} />Monthly</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Touchpoint Planner</h2><p className="text-xs font-medium text-sky-600">Monthly &bull; Proactive Relationship Management</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your monthly discipline for proactive relationship management. At the start of each month, decide who needs a touchpoint, why, and when. At month-end, review what you completed and what you missed. Consistency is the secret weapon of great stakeholder managers.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderPlan()}{renderReview()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPlan()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderTouchpointPlannerPage() { return <ThemeProvider><TouchpointContent /></ThemeProvider>; }
