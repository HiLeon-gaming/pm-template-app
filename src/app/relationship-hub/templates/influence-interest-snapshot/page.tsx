"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Crosshair } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Snapshot", desc: "Grid + priority list + strategy tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Grid", desc: "Grid + priority list only", icon: AlignJustify },
];

function InfluenceContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>INFLUENCE &amp; INTEREST SNAPSHOT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Prioritize Your Attention</td></tr>
    </tbody></table>
  );

  const renderGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>INFLUENCE vs INTEREST GRID</td></tr></tbody></table>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Place each stakeholder in the right quadrant. <strong>Influence</strong> = how much power they have over your work (budget, approvals, escalation). <strong>Interest</strong> = how much they care about your work (engagement, questions, requests). Update this quarterly or whenever roles change.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: "#fff", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626", textAlign: "center" as const }}>HIGH INFLUENCE + HIGH INTEREST</td></tr>
            <tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "4px 12px", fontSize: "10px", fontWeight: 700, fontFamily: S.font, textAlign: "center" as const, border: `1px solid ${C.border}` }}>Manage Closely &mdash; Your Top Priority</td></tr></thead>
            <tbody>
              {[
                { name: "Maria Lopez — Sponsor, SVP Operations", note: "Weekly 1:1. No surprises. Share bad news early." },
                { name: "David Park — CFO, budget authority", note: "Data-driven updates. Always lead with ROI." },
                { name: "[Enter name + role]", note: "" },
                { name: "[Enter name + role]", note: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#DC2626" }}>{r.name}</strong>
                    {r.note && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.note}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D97706", color: "#fff", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706", textAlign: "center" as const }}>HIGH INFLUENCE + LOW INTEREST</td></tr>
            <tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "4px 12px", fontSize: "10px", fontWeight: 700, fontFamily: S.font, textAlign: "center" as const, border: `1px solid ${C.border}` }}>Keep Satisfied &mdash; Don&apos;t Surprise Them</td></tr></thead>
            <tbody>
              {[
                { name: "CEO — rarely involved but can override anything", note: "Quarterly executive summary. Escalate only critical issues." },
                { name: "Legal — only cares if compliance is at risk", note: "Proactive updates on regulatory items. Keep docs clean." },
                { name: "[Enter name + role]", note: "" },
                { name: "[Enter name + role]", note: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#D97706" }}>{r.name}</strong>
                    {r.note && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.note}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px", paddingTop: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: "#fff", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669", textAlign: "center" as const }}>LOW INFLUENCE + HIGH INTEREST</td></tr>
            <tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "4px 12px", fontSize: "10px", fontWeight: 700, fontFamily: S.font, textAlign: "center" as const, border: `1px solid ${C.border}` }}>Keep Informed &mdash; Great Champions &amp; Advocates</td></tr></thead>
            <tbody>
              {[
                { name: "Sarah Chen — VP Product, strong advocate", note: "Equip with talking points. She sells your work for you." },
                { name: "QA Team Lead — cares deeply about quality", note: "Include in testing updates. Valuable early feedback source." },
                { name: "[Enter name + role]", note: "" },
                { name: "[Enter name + role]", note: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#059669" }}>{r.name}</strong>
                    {r.note && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.note}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px", paddingTop: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#6366F1", color: "#fff", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1", textAlign: "center" as const }}>LOW INFLUENCE + LOW INTEREST</td></tr>
            <tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "4px 12px", fontSize: "10px", fontWeight: 700, fontFamily: S.font, textAlign: "center" as const, border: `1px solid ${C.border}` }}>Monitor &mdash; Light Touch Only</td></tr></thead>
            <tbody>
              {[
                { name: "IT Support — only involved for access requests", note: "Engage only when needed. Don’t over-communicate." },
                { name: "Facilities — occasional coordination", note: "Monthly batch requests. Low maintenance." },
                { name: "[Enter name + role]", note: "" },
                { name: "[Enter name + role]", note: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#6366F1" }}>{r.name}</strong>
                    {r.note && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.note}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderList = () => (
    <div ref={listRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>STAKEHOLDER PRIORITY LIST</td></tr></tbody></table>
      <CopyButton targetRef={listRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Ranked summary of every stakeholder with their quadrant placement and your engagement strategy. Sort by quadrant priority: Manage Closely first, Monitor last.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "16%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Influence</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Interest</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Quadrant</th>
          <th style={S.thPrimary}>Engagement Strategy</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Cadence</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", name: "Maria Lopez", inf: "High", int: "High", quad: "Manage Closely", strat: "Weekly 1:1. Proactive updates, no surprises. Share bad news early.", cad: "Weekly", qColor: "#DC2626" },
            { n: "2", name: "David Park", inf: "High", int: "High", quad: "Manage Closely", strat: "Data-driven updates. Lead with ROI and financials.", cad: "Biweekly", qColor: "#DC2626" },
            { n: "3", name: "CEO", inf: "High", int: "Low", quad: "Keep Satisfied", strat: "Quarterly exec summary. Escalate critical issues only.", cad: "Quarterly", qColor: "#D97706" },
            { n: "4", name: "Sarah Chen", inf: "Low", int: "High", quad: "Keep Informed", strat: "Equip as champion. Share talking points and wins.", cad: "Biweekly", qColor: "#059669" },
            { n: "5", name: "IT Support", inf: "Low", int: "Low", quad: "Monitor", strat: "Engage only when needed. Batch requests monthly.", cad: "As needed", qColor: "#6366F1" },
            { n: "6", name: "[Enter name]", inf: "[H/L]", int: "[H/L]", quad: "[Quadrant]", strat: "[Your approach]", cad: "[Freq]", qColor: C.textMuted },
            { n: "7", name: "[Enter name]", inf: "[H/L]", int: "[H/L]", quad: "[Quadrant]", strat: "[Your approach]", cad: "[Freq]", qColor: C.textMuted },
            { n: "8", name: "[Enter name]", inf: "[H/L]", int: "[H/L]", quad: "[Quadrant]", strat: "[Your approach]", cad: "[Freq]", qColor: C.textMuted },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.inf}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.int}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: r.qColor }}>{r.quad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.strat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.cad}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>QUADRANT STRATEGY GUIDE</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Manage Closely (HI/HI):", detail: "These are your most important people. Never miss a cadence. Share bad news before they hear it elsewhere. Invest 60% of your relationship time here." },
                { color: "#D97706", tip: "Keep Satisfied (HI/LO):", detail: "They have power but don’t use it often. The risk is they wake up surprised and use their power against you. Proactive, brief updates prevent this." },
                { color: "#059669", tip: "Keep Informed (LO/HI):", detail: "They care but lack formal power. These are your champions and advocates. Equip them with information and talking points to sell your work for you." },
                { color: "#6366F1", tip: "Monitor (LO/LO):", detail: "Light touch. Don’t waste time here. Check in only when their role or interest changes." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON MAPPING MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Confusing title with influence.", detail: "A VP with no budget authority has less influence than a director who controls spend. Map actual power, not org chart." },
                { color: "#EA580C", tip: "Ignoring “Keep Satisfied” stakeholders.", detail: "They seem safe because they’re quiet. But one surprise and they become blockers overnight." },
                { color: "#D97706", tip: "Over-investing in “Monitor” people.", detail: "If someone has low influence and low interest, spending weekly time on them is wasted effort." },
                { color: "#6366F1", tip: "Never re-mapping.", detail: "Influence and interest shift with org changes, project phases, and political events. Re-map quarterly." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Crosshair size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Influence &amp; Interest Snapshot</h2><p className="text-xs font-medium text-violet-600">Power vs Interest Grid &bull; Prioritize Your Attention</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The classic 2&times;2 grid that tells you where to spend your time. High-influence, high-interest stakeholders get the most attention. Low-influence, low-interest get the least. The biggest mistake PMs make is treating everyone equally &mdash; this grid prevents that.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderGrid()}{renderList()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderGrid()}{renderList()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function InfluenceInterestSnapshotPage() { return <ThemeProvider><InfluenceContent /></ThemeProvider>; }
