"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListOrdered, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full View", desc: "MoSCoW + WSJF", icon: LayoutDashboard },
  { id: "compact", label: "MoSCoW Only", desc: "Quick priority", icon: AlignJustify },
];

function BacklogPrioritizationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const moscowRef = useRef<HTMLDivElement>(null);
  const wsjfRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🎯 BACKLOG PRIORITIZATION (MoSCoW + WSJF-LITE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Sprint / Release</td><td style={{ ...S.td0, width: "32%" }}>[Sprint 8 / Q1 Release]</td></tr>
        <tr><td style={S.tdLabelAlt}>Prioritized By</td><td style={S.tdAlt}>[PO + Team]</td><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const moscowCard = (label: string, emoji: string, color: string, desc: string, items: string[]) => (
    <table style={S.tbl}>
      <thead><tr><td style={{ backgroundColor: color, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{emoji} {label}<br /><span style={{ fontSize: "9px", fontWeight: 500, opacity: 0.9 }}>{desc}</span></td></tr></thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>☐ {item}</td></tr>
        ))}
      </tbody>
    </table>
  );

  const renderMoscow = () => (
    <div ref={moscowRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🏷️ MoSCoW PRIORITIZATION</td></tr></tbody></table>
      <CopyButton targetRef={moscowRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Must = non-negotiable for release &nbsp;|&nbsp; Should = important but not critical &nbsp;|&nbsp; Could = nice to have &nbsp;|&nbsp; Won&apos;t = explicitly out</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "25%", paddingRight: "3px" }}>
          {moscowCard("MUST HAVE", "🔴", accentDark, "Release fails without these", [
            "[2-step checkout flow]",
            "[Payment error handling]",
            "[Order confirmation email]",
            "[Mobile responsive checkout]",
            "[Add item]",
          ])}
        </td>
        <td style={{ ...LC, width: "25%", paddingLeft: "3px", paddingRight: "3px" }}>
          {moscowCard("SHOULD HAVE", "🟡", "#F59E0B", "High value, but workaround exists", [
            "[Save address for returning users]",
            "[Apple Pay integration]",
            "[Analytics event tracking]",
            "[Add item]",
            "[Add item]",
          ])}
        </td>
        <td style={{ ...LC, width: "25%", paddingLeft: "3px", paddingRight: "3px" }}>
          {moscowCard("COULD HAVE", "🔵", "#0891B2", "Nice-to-have if time allows", [
            "[Google Pay integration]",
            "[Saved payment methods]",
            "[Order status SMS notifications]",
            "[Add item]",
            "[Add item]",
          ])}
        </td>
        <td style={{ ...LC, width: "25%", paddingLeft: "3px" }}>
          {moscowCard("WON'T HAVE", "⚪", "#6B7280", "Explicitly out of this release", [
            "[International payments]",
            "[Native mobile app]",
            "[Loyalty program]",
            "[Add item]",
            "[Add item]",
          ])}
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderWSJF = () => (
    <div ref={wsjfRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 WSJF-LITE SCORING</td></tr></tbody></table>
      <CopyButton targetRef={wsjfRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>WSJF = (Business Value + Time Criticality + Risk Reduction) / Job Size. Score 1–5 each. Higher WSJF = do first.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Story / Feature</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Biz Value</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Time Crit</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Risk Red</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Job Size</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>WSJF</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Rank</th>
        </tr></thead>
        <tbody>
          {[
            { story: "[2-step checkout]", bv: "5", tc: "5", rr: "3", js: "3", wsjf: "4.3", rank: "1" },
            { story: "[Payment error handling]", bv: "4", tc: "4", rr: "5", js: "2", wsjf: "6.5", rank: "1" },
            { story: "[Apple Pay]", bv: "4", tc: "3", rr: "2", js: "3", wsjf: "3.0", rank: "2" },
            { story: "[Save address]", bv: "3", tc: "2", rr: "1", js: "2", wsjf: "3.0", rank: "3" },
            { story: "[Google Pay]", bv: "3", tc: "2", rr: "1", js: "3", wsjf: "2.0", rank: "4" },
            { story: "[SMS notifications]", bv: "2", tc: "1", rr: "1", js: "3", wsjf: "1.3", rank: "5" },
            { story: "[Add story]", bv: "", tc: "", rr: "", js: "", wsjf: "", rank: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const wsjfNum = parseFloat(r.wsjf);
            const wBg = wsjfNum >= 4 ? C.badgeGreenBg : wsjfNum >= 2.5 ? C.badgeAmberBg : wsjfNum > 0 ? C.badgeRedBg : C.badgeGrayBg;
            const wFg = wsjfNum >= 4 ? C.badgeGreenFg : wsjfNum >= 2.5 ? C.badgeAmberFg : wsjfNum > 0 ? C.badgeRedFg : C.badgeGrayFg;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.bv}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.tc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.rr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.js}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(wBg, wFg), fontWeight: 800 }}>{r.wsjf || "—"}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{r.rank}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 PRIORITY SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Must Have", value: "[5]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Should Have", value: "[3]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Could Have", value: "[3]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Won't Have", value: "[3]", color: C.badgeGrayBg, fg: C.badgeGrayFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "20px", padding: "10px 8px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMoscow()}{renderWSJF()}{renderSummary()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMoscow()}{renderSummary()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><ListOrdered size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Backlog Prioritization</h2><p className="text-xs font-medium text-red-600">⭐ All-Star &mdash; MoSCoW + WSJF-Lite — Removes Opinion Battles</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Two proven prioritization methods: MoSCoW for scope clarity and WSJF-Lite for value-based ranking. Reduces opinion fights.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BacklogPrioritizationPage() { return <ThemeProvider><BacklogPrioritizationContent /></ThemeProvider>; }
