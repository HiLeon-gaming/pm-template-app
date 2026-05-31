"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Wrench, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full View", desc: "Debt log + scoring + plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Debt items only", icon: AlignJustify },
];

function TechDebtContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const debtRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔧 TECH DEBT / IMPROVEMENT BACKLOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Quality &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Tech Lead</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Debt Budget</td><td style={S.tdAlt}>[20% of sprint capacity / ## pts per sprint]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderDebt = () => (
    <div ref={debtRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 TECH DEBT ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={debtRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Score: Impact (1-5) x Urgency (1-5) = Priority Score. Higher = fix sooner.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Debt Item</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Category</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Urgency</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Est (pts)</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[Payment service has no retry logic — fails silently on timeout]", cat: "Reliability", cBg: C.badgeRedBg, cFg: C.badgeRedFg, imp: "5", urg: "5", score: "25", est: "5", s: "Sprint 9", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { item: "[No error logging in checkout flow — debugging is guesswork]", cat: "Observability", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, imp: "4", urg: "4", score: "16", est: "3", s: "Backlog", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { item: "[Hardcoded config values in 3 services — should use env vars]", cat: "Maintainability", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, imp: "3", urg: "3", score: "9", est: "2", s: "Backlog", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { item: "[Unit test coverage below 60% for user module]", cat: "Quality", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, imp: "4", urg: "2", score: "8", est: "3", s: "Backlog", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { item: "[Legacy jQuery on settings page — should migrate to React]", cat: "Modernization", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, imp: "2", urg: "1", score: "2", est: "8", s: "Someday", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { item: "[Add item]", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, imp: "", urg: "", score: "", est: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.cBg, r.cFg)}>{r.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.imp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.urg}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "13px", color: parseInt(r.score) >= 16 ? "#DC2626" : parseInt(r.score) >= 9 ? "#F59E0B" : accent }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.est}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={strategyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📐 DEBT MANAGEMENT STRATEGY</td></tr></tbody></table>
      <CopyButton targetRef={strategyRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Total Debt", value: "[21 pts]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Budget/Sprint", value: "[5 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Sprints to Clear", value: "[~4]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Critical Items", value: "[1]", color: C.badgeRedBg, fg: C.badgeRedFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "20px", padding: "10px 8px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Budget Rule</td><td style={S.td0}>[Allocate 20% of each sprint (5 pts) to tech debt — non-negotiable]</td></tr>
        <tr><td style={S.tdLabelAlt}>Prioritization</td><td style={S.tdAlt}>[Fix highest-score items first; critical reliability issues take precedence]</td></tr>
        <tr><td style={S.tdLabel}>Review Cadence</td><td style={S.td0}>[Review debt backlog every 3 sprints; add new items as they emerge]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Wrench size={11} />Tech Debt</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Wrench size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Tech Debt / Improvement Backlog</h2><p className="text-xs font-medium text-violet-600">Impact x Urgency Scoring + Budget Strategy</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track tech debt with impact/urgency scoring, budget allocation, and management strategy. Keeps debt visible and planned.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderDebt()}{renderStrategy()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderDebt()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TechDebtPage() { return <ThemeProvider><TechDebtContent /></ThemeProvider>; }
