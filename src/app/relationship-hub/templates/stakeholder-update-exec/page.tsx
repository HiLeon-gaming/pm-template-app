"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Crown } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Brief", desc: "Exec summary + detail + asks + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Brief", desc: "Exec summary + asks only", icon: AlignJustify },
];

function ExecContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const asksRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER UPDATE (EXEC / LEADERSHIP)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Leadership-Ready Brief</td></tr>
    </tbody></table>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>EXECUTIVE SUMMARY (30-SECOND READ)</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Executives read the first 3 lines and decide if they need to read more. Lead with the headline, then RAG status, then the single most important thing they need to know. If they stop reading here, they should still understand the situation.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "Project / Initiative", value: "[Name]" },
            { label: "Reporting Period", value: "[Date range]" },
            { label: "Overall Status", value: "[🟢 On Track / 🟡 At Risk / 🔴 Off Track] — [One sentence explaining why]" },
            { label: "The Headline", value: "[One sentence: What’s the single most important thing leadership needs to know RIGHT NOW?]" },
            { label: "Bottom Line", value: "[Are we going to hit our targets? Yes / Yes with help / At risk / No. Be direct.]" },
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
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#0EA5E9")}>DETAILED STATUS</td></tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Area</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>RAG</th>
          <th style={S.thPrimary}>Status &amp; Commentary</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Key Metric / Evidence</th>
        </tr></thead>
        <tbody>
          {[
            { area: "Schedule", rag: "Green", status: "[On track for [milestone] by [date]. No slippage.]", metric: "[X of Y deliverables complete]" },
            { area: "Budget", rag: "Green", status: "[Spending within 5% of plan. No overruns expected.]", metric: "[$X of $Y spent (Z%)]" },
            { area: "Scope", rag: "Amber", status: "[One scope change request pending. Impact: 2-week extension if approved.]", metric: "[X change requests YTD]" },
            { area: "Resources", rag: "Red", status: "[Headcount approval 13 days overdue. Team under-resourced for Q2 workload.]", metric: "[X of Y roles filled]" },
            { area: "Risks", rag: "Amber", status: "[2 active risks. API dependency and Legal timeline. Mitigations in progress.]", metric: "[X open risks, Y mitigated]" },
            { area: "Stakeholders", rag: "Green", status: "[Sponsor aligned. One relationship needs attention (Engineering).]", metric: "[Health scores: see scorecard]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const rc = r.rag === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.rag === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.rag === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.area}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(rc.bg, rc.fg)}>{r.rag}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.status}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.metric}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAsks = () => (
    <div ref={asksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>DECISIONS &amp; ASKS FROM LEADERSHIP</td></tr></tbody></table>
      <CopyButton targetRef={asksRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Be explicit about what you need from leadership. Come with options and a recommendation. Never present a problem without a proposed solution.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Ask / Decision Needed</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Your Recommendation</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Needed By</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", type: "Decision", ask: "Approve 2-week scope extension for vendor integration. Impact: delays Phase 2 start by 10 business days.", rec: "Approve — better to do it right", when: "Mar 20" },
            { n: "2", type: "Escalation", ask: "HR headcount approval stalled 13 days. Need executive intervention to unblock.", rec: "Director to contact HR VP", when: "This week" },
            { n: "3", type: "FYI", ask: "Legal contract review may take 3 weeks. Exploring expedited path through sponsor.", rec: "No action yet — monitoring", when: "Update Mar 22" },
            { n: "4", type: "[Type]", ask: "[What you need from leadership]", rec: "[Your recommendation]", when: "[Date]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const tc = r.type === "Decision" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.type === "Escalation" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.type === "FYI" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(tc.bg, tc.fg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.ask}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>EXEC COMMUNICATION RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Bottom line up front (BLUF).", detail: "Executives decide in the first 10 seconds whether to keep reading. Lead with the answer." },
                { color: "#0EA5E9", tip: "One page maximum.", detail: "If it doesn’t fit on one page, you haven’t thought about it hard enough." },
                { color: "#8B5CF6", tip: "RAG status is not optional.", detail: "Green/Amber/Red gives instant context. Never skip it." },
                { color: "#D97706", tip: "Never present a problem without a recommendation.", detail: "Executives want options and your recommendation, not just problems to solve." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHAT EXECS ACTUALLY WANT</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Are we on track? Yes or no.", detail: "Don’t bury the answer in details. Say it clearly, then provide supporting evidence." },
                { color: "#DC2626", tip: "What do you need from me?", detail: "Every exec update should answer this. If nothing, say “No action needed — FYI only.”" },
                { color: "#EA580C", tip: "What’s the risk I should know about?", detail: "They want early warning, not post-mortems. Surface risks before they become crises." },
                { color: "#6366F1", tip: "Are you in control?", detail: "Confidence comes from structured reporting. This template signals that you’re on top of it." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Crown size={11} />Exec Brief</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Update (Exec / Leadership)</h2><p className="text-xs font-medium text-emerald-600">Leadership-Ready &bull; Bottom Line Up Front</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A leadership-grade status update. Designed for exec audiences who read the first 3 lines and decide if they need more. Covers overall status, detailed RAG breakdown, and explicit asks with recommendations. One page, maximum impact.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderSummary()}{renderDetail()}{renderAsks()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSummary()}{renderAsks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderUpdateExecPage() { return <ThemeProvider><ExecContent /></ThemeProvider>; }
