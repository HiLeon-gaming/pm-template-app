"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, FileBarChart } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Brief", desc: "Summary + detail + asks + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Brief", desc: "Summary + asks only", icon: AlignJustify },
];

function BriefContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const asksRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER BRIEF BUILDER (INTERNAL)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; One-Page Leadership Brief</td></tr>
    </tbody></table>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>EXECUTIVE SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>One page. That&apos;s your limit. This brief tells leadership: who are the key stakeholders, where do things stand, what are the risks, what do you need. If they read nothing else, they should understand the stakeholder landscape from this page alone.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "Brief Title", value: "[Project/Initiative Name] — Stakeholder Brief — [Date]" },
            { label: "Prepared By", value: "[Your Name, Role]" },
            { label: "Audience", value: "[Who is this brief for? Sponsor? SteerCo? New leader?]" },
            { label: "Purpose", value: "[Why does the reader need this? Onboarding? Decision support? Risk awareness?]" },
            { label: "Overall Stakeholder Health", value: "[\ud83d\udfe2 Healthy / \ud83d\udfe1 Mixed / \ud83d\udd34 At Risk] — [One sentence explaining the overall state]" },
            { label: "The One Thing to Know", value: "[If the reader remembers one thing, what should it be?]" },
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

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>KEY STAKEHOLDER STATUS</td></tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Role / Why Key</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={S.thPrimary}>Current Status &amp; Notes</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Action Needed</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", role: "Exec Sponsor", health: "Green", status: "Aligned on strategy. Active champion. Briefed on Q2 risks.", action: "Maintain cadence. Pre-brief before SteerCo." },
            { name: "David Park", role: "Finance VP", health: "Amber", status: "Concerned about Q2 budget overrun. Needs proactive forecast.", action: "Send monthly budget update this week." },
            { name: "James Wu", role: "Eng. Lead", health: "Red", status: "Disengaged. API dependency 13 days overdue. Feels deprioritized.", action: "Urgent 1:1. Escalate through Eng. Director." },
            { name: "Sarah Chen", role: "Marketing", health: "Amber", status: "Feels sidelined from recent decisions. Drifting.", action: "Re-include in planning. Schedule 1:1." },
            { name: "SteerCo", role: "Governance", health: "Green", status: "Monthly updates on track. No outstanding decisions.", action: "Prepare Q2 deep dive for next session." },
            { name: "[Stakeholder]", role: "[Role]", health: "[RAG]", status: "[Current state]", action: "[What needs to happen]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const hc = r.health === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.health === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.health === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(hc.bg, hc.fg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.status}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAsks = () => (
    <div ref={asksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>KEY RISKS &amp; ASKS</td></tr></tbody></table>
      <CopyButton targetRef={asksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Your Recommendation</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Needed By</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Risk", desc: "Eng. relationship deteriorating. API dependency at risk. Could delay Phase 1 by 2+ weeks.", rec: "Escalate through Eng. Director this week.", when: "This week" },
            { type: "Risk", desc: "Marketing disengagement may result in weak go-to-market for Phase 2.", rec: "Re-engage Sarah in planning.", when: "Next sprint" },
            { type: "Ask", desc: "Need sponsor to flag Legal review as priority. Contract in queue for 3 weeks.", rec: "Sponsor contacts Legal VP directly.", when: "This week" },
            { type: "FYI", desc: "Finance audit of Q2 budget requested. No issues expected but will require prep time.", rec: "No action. Monitoring.", when: "Update Apr 1" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const tc = r.type === "Risk" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.type === "Ask" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : { bg: "#DBEAFE", fg: "#1D4ED8" };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(tc.bg, tc.fg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.rec}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>BRIEF WRITING RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "One page maximum.", detail: "If it doesn’t fit on one page, you haven’t distilled it enough." },
                { color: "#059669", tip: "Bottom line up front.", detail: "Overall health + the one thing they need to know. First 3 lines." },
                { color: "#0EA5E9", tip: "RAG status for every stakeholder.", detail: "Instant visual. No ambiguity. Green/Amber/Red tells the story." },
                { color: "#6366F1", tip: "Every risk needs a recommendation.", detail: "Never present a problem without a proposed solution or next step." },
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>WHEN TO USE THIS BRIEF</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "New sponsor or leader onboarding.", detail: "Hand them this page. They’ll understand the landscape in 2 minutes." },
                { color: "#0EA5E9", tip: "Before SteerCo or board meetings.", detail: "Pre-read material. Gives context before you present." },
                { color: "#D97706", tip: "Monthly stakeholder health check.", detail: "Force yourself to assess every key relationship. Don’t skip it." },
                { color: "#DC2626", tip: "When you sense things going sideways.", detail: "Writing it down forces clarity. You’ll see patterns you missed." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><FileBarChart size={11} />Exec Brief</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Brief Builder (Internal)</h2><p className="text-xs font-medium text-amber-600">Leadership-Ready &bull; One-Page Stakeholder Landscape</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A one-page internal brief that tells leadership everything they need to know about your stakeholder landscape: who matters, where things stand, what&apos;s at risk, and what you need. Perfect for sponsor onboarding, SteerCo pre-reads, and monthly health checks.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderSummary()}{renderDetail()}{renderAsks()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSummary()}{renderAsks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderBriefBuilderPage() { return <ThemeProvider><BriefContent /></ThemeProvider>; }
