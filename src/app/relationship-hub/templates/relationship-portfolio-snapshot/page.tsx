"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, PieChart } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Snapshot", desc: "RAG portfolio + trends + actions + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Snapshot", desc: "RAG portfolio only", icon: AlignJustify },
];

function PortfolioContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const ragRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RELATIONSHIP PORTFOLIO SNAPSHOT (RAG)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; [MONTH / YEAR]</td></tr>
    </tbody></table>
  );

  const renderRAG = () => (
    <div ref={ragRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STAKEHOLDER HEALTH PORTFOLIO</div>
      <CopyButton targetRef={ragRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your at-a-glance view of every key stakeholder relationship. Red/Amber/Green status with trend direction. This is the page you pull up when someone asks &ldquo;How are your stakeholder relationships?&rdquo; Review monthly. Update when things change.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Role</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thPrimary}>Key Notes</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Priority Action</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Last Touch</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", role: "Exec Sponsor", health: "Green", trend: "\u2192", notes: "Aligned. Active champion. Monthly 1:1s running smoothly.", action: "Maintain cadence", touch: "Mar 12" },
            { name: "David Park", role: "Finance VP", health: "Amber", trend: "\u2191", notes: "Was concerned about budget. Improved since proactive updates started.", action: "Continue monthly updates", touch: "Mar 10" },
            { name: "James Wu", role: "Eng. Lead", health: "Red", trend: "\u2193", notes: "Disengaged. API dependency overdue. Feels deprioritized.", action: "Urgent 1:1 this week", touch: "Feb 28" },
            { name: "Sarah Chen", role: "Marketing", health: "Amber", trend: "\u2193", notes: "Feels sidelined. Not included in recent planning.", action: "Re-engage. Schedule 1:1", touch: "Mar 5" },
            { name: "SteerCo", role: "Governance", health: "Green", trend: "\u2192", notes: "Monthly updates on track. No issues.", action: "Prep Q2 deep dive", touch: "Mar 8" },
            { name: "Legal Team", role: "Contract review", health: "Amber", trend: "\u2192", notes: "Contract in review queue. Standard timeline but tight for us.", action: "Sponsor to expedite", touch: "Mar 11" },
            { name: "[Stakeholder]", role: "[Role]", health: "[RAG]", trend: "[\u2191\u2192\u2193]", notes: "[Current state]", action: "[Next step]", touch: "[Date]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const hc = r.health === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.health === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.health === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            const tc = r.trend === "\u2191" ? "#059669" : r.trend === "\u2193" ? "#DC2626" : "#D97706";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(hc.bg, hc.fg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px", color: tc, fontWeight: 800 }}>{r.trend}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.touch}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTrend = () => (
    <div ref={trendRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#6366F1")}>PORTFOLIO SUMMARY &amp; TREND</div>
      <CopyButton targetRef={trendRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Count</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Last Month</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Change</th>
          <th style={S.thPrimary}>Commentary</th>
        </tr></thead>
        <tbody>
          {[
            { status: "Green", count: "3", last: "4", change: "-1", comment: "One relationship moved from Green to Amber (Sarah). Need to re-engage." },
            { status: "Amber", count: "3", last: "2", change: "+1", comment: "David improving (was Amber, trending up). Sarah and Legal added to Amber." },
            { status: "Red", count: "1", last: "0", change: "+1", comment: "James moved to Red. API dependency issue. Escalation planned this week." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = r.status === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.status === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : { bg: C.badgeRedBg, fg: C.badgeRedFg };
            const cc = r.change.startsWith("+") ? "#DC2626" : r.change.startsWith("-") && r.status === "Red" ? "#059669" : r.change === "0" ? C.textMuted : "#DC2626";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc.bg, sc.fg)}>{r.status}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px", fontWeight: 800 }}>{r.count}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: C.textMuted }}>{r.last}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 800, color: cc }}>{r.change}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.comment}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>RAG RATING CRITERIA</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "\ud83d\udfe2 Green: Strong, aligned, no issues.", detail: "Regular contact. Trust is high. They support your work actively." },
                { color: "#D97706", tip: "\ud83d\udfe1 Amber: Needs attention.", detail: "Some friction, declining engagement, or unresolved concern. Act within 1\u20132 weeks." },
                { color: "#DC2626", tip: "\ud83d\udd34 Red: At risk.", detail: "Active conflict, disengagement, or blocking behavior. Act this week." },
                { color: "#6366F1", tip: "Trend matters more than status.", detail: "A Green trending down is more urgent than an Amber trending up." },
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>PORTFOLIO MANAGEMENT RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Review monthly, no exceptions.", detail: "Block 30 minutes. Go through every name. Update status and actions." },
                { color: "#0EA5E9", tip: "Zero Reds is the goal.", detail: "If you have a Red, it\u2019s your #1 priority until it\u2019s Amber or Green." },
                { color: "#D97706", tip: "Track trend over time.", detail: "3 months of data shows patterns. Is someone slowly deteriorating? Catch it." },
                { color: "#DC2626", tip: "Share with your sponsor.", detail: "This page IS your stakeholder management story. Show them you\u2019re on top of it." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><PieChart size={11} />Portfolio</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Relationship Portfolio Snapshot (RAG)</h2><p className="text-xs font-medium text-amber-600">Monthly Review &bull; Red / Amber / Green Health Summary</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your at-a-glance view of every key stakeholder relationship. Red/Amber/Green health status with trend direction, key notes, and priority actions. This is the page you pull up when someone asks &ldquo;How are your stakeholder relationships?&rdquo;</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderRAG()}{renderTrend()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRAG()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RelationshipPortfolioSnapshotPage() { return <ThemeProvider><PortfolioContent /></ThemeProvider>; }
