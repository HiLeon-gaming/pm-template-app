"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, CalendarCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Changes + improvements + risks + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Review", desc: "Summary + actions only", icon: AlignJustify },
];

function ReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const changesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUARTERLY RELATIONSHIP REVIEW</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; [QUARTER] [YEAR]</td></tr>
    </tbody></table>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>QUARTER OVERVIEW</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Step back from the daily grind and assess how your stakeholder relationships evolved over the past quarter. What changed? What improved? What&apos;s at risk? This review forces strategic thinking about relationships, not just tactical management.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "Quarter / Period", value: "[Q1 2026 / Jan\u2013Mar 2026]" },
            { label: "Overall Health Trend", value: "[\ud83d\udfe2 Improving / \ud83d\udfe1 Stable / \ud83d\udd34 Declining] \u2014 [One sentence summary]" },
            { label: "Biggest Win This Quarter", value: "[Which relationship improved most? What did you do right?]" },
            { label: "Biggest Concern", value: "[Which relationship deteriorated or needs urgent attention?]" },
            { label: "Key Lesson Learned", value: "[What did you learn about stakeholder management this quarter?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent, width: "20%" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderChanges = () => (
    <div ref={changesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>RELATIONSHIP CHANGES THIS QUARTER</td></tr></tbody></table>
      <CopyButton targetRef={changesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Start</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>End</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thPrimary}>What Changed &amp; Why</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Next Quarter Focus</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", start: "Green", end: "Green", trend: "\u2192", why: "Remained aligned throughout. Active champion. No issues.", next: "Maintain. Pre-brief on Q2 strategy shift." },
            { name: "David Park", start: "Red", end: "Amber", trend: "\u2191", why: "Started frustrated about budget transparency. Monthly updates rebuilt trust.", next: "Continue monthly updates. Target Green by Q2." },
            { name: "James Wu", start: "Green", end: "Red", trend: "\u2193", why: "API dependency created friction. Two follow-ups missed. Feels deprioritized.", next: "Urgent repair. Escalate through Eng. Director." },
            { name: "Sarah Chen", start: "Amber", end: "Amber", trend: "\u2193", why: "Not re-engaged despite plan. Drifting further. Missed 2 touchpoints.", next: "Priority 1:1 first week of Q2. Re-include in planning." },
            { name: "[Stakeholder]", start: "[RAG]", end: "[RAG]", trend: "[\u2191\u2192\u2193]", why: "[What changed this quarter]", next: "[Focus for next quarter]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = (v: string) => v === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : v === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : v === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            const tc = r.trend === "\u2191" ? "#059669" : r.trend === "\u2193" ? "#DC2626" : "#D97706";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc(r.start).bg, sc(r.start).fg)}>{r.start}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc(r.end).bg, sc(r.end).fg)}>{r.end}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px", color: tc, fontWeight: 800 }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.next}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>NEXT QUARTER PRIORITIES</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          <th style={S.thPrimary}>Action / Focus Area</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Target Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Success Measure</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Deadline</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", pri: "Critical", action: "Repair relationship with James Wu. Resolve API dependency. Rebuild trust.", who: "James Wu", measure: "API delivered. Health back to Amber.", when: "End of Apr" },
            { n: "2", pri: "High", action: "Re-engage Sarah Chen. Include in Phase 2 planning. Schedule regular touchpoints.", who: "Sarah Chen", measure: "Monthly 1:1s running. Health to Green.", when: "Mid Apr" },
            { n: "3", pri: "High", action: "Move David Park from Amber to Green. Continue monthly updates. Build stronger rapport.", who: "David Park", measure: "Green status by end of Q2.", when: "End of Q2" },
            { n: "4", pri: "Medium", action: "Prepare for potential sponsor transition (Maria mentioned possible role change).", who: "Maria Lopez", measure: "Deputy relationship built. Commitments documented.", when: "End of Q2" },
            { n: "5", pri: "[Priority]", action: "[What you\u2019ll focus on next quarter]", who: "[Stakeholder]", measure: "[How you\u2019ll know it worked]", when: "[Target date]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const pc = r.pri === "Critical" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.pri === "High" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.pri === "Medium" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(pc.bg, pc.fg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.measure}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626", fontWeight: 600 }}>{r.when}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>QUARTERLY REVIEW QUESTIONS</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Which relationships got better? Why?", detail: "Identify what you did right so you can replicate it." },
                { color: "#059669", tip: "Which relationships got worse? Why?", detail: "Identify what you missed so you can fix it." },
                { color: "#0EA5E9", tip: "Are there new stakeholders I should know about?", detail: "Re-orgs, new hires, promotions create new landscape dynamics." },
                { color: "#DC2626", tip: "Am I spending time on the right people?", detail: "Check your actual time investment vs the stakeholder map. Are you aligned?" },
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>REVIEW BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Block 1 hour quarterly. Non-negotiable.", detail: "This review is strategic. It\u2019s the most valuable hour you\u2019ll spend on stakeholder management." },
                { color: "#0EA5E9", tip: "Share findings with your sponsor.", detail: "Shows strategic thinking. Gets you alignment and support for your next-quarter plan." },
                { color: "#6366F1", tip: "Set measurable goals for next quarter.", detail: "\u201CMove James from Red to Amber\u201D is better than \u201CImprove James relationship.\u201D" },
                { color: "#D97706", tip: "Compare to last quarter\u2019s review.", detail: "Did you follow through on last quarter\u2019s priorities? What fell through the cracks?" },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><CalendarCheck size={11} />Quarterly</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Handshake size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quarterly Relationship Review</h2><p className="text-xs font-medium text-amber-600">Strategic &bull; What Changed, What Improved, What&apos;s at Risk</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Step back from the daily grind and assess how your stakeholder relationships evolved over the past quarter. What changed? What improved? What&apos;s at risk? Set measurable goals for next quarter. This is the most valuable hour you&apos;ll spend on stakeholder management.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderSummary()}{renderChanges()}{renderActions()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSummary()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QuarterlyRelationshipReviewPage() { return <ThemeProvider><ReviewContent /></ThemeProvider>; }
