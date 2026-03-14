"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Briefcase, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Portfolio", desc: "All initiatives + risks + milestones", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Status table only", icon: AlignJustify },
];

function InitiativePortfolioContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>INITIATIVE PORTFOLIO SNAPSHOT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Initiatives &amp; Alignment</td></tr>
    </tbody></table>
  );

  const renderPortfolio = () => (
    <div ref={portfolioRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ACTIVE INITIATIVES</div>
      <CopyButton targetRef={portfolioRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What&apos;s in flight, health, owner, next milestone, risks. Exec-level view across the portfolio.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Initiative</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Phase</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Next Milestone</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Top Risk</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Digital Transformation Program]", owner: "[CTO]", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, phase: "Execution", mile: "[Launch Phase 2 — 04/01]", risk: "[Integration delays]" },
            { name: "[Q2 Revenue Push]", owner: "[VP Sales]", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, phase: "Execution", mile: "[Pipeline review — 03/20]", risk: "[Deal slippage]" },
            { name: "[Office Consolidation]", owner: "[COO]", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, phase: "Planning", mile: "[Lease decision — 03/25]", risk: "[Budget overrun]" },
            { name: "[Leadership Development]", owner: "[CHRO]", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, phase: "Design", mile: "[Program launch — 05/01]", risk: "[Low participation]" },
            { name: "[Partnership Expansion]", owner: "[CEO]", health: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, phase: "Negotiation", mile: "[Term sheet by 03/18]", risk: "[Partner losing interest]" },
            { name: "[Cost Optimization]", owner: "[CFO]", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, phase: "Analysis", mile: "[Recommendations — 04/10]", risk: "[Headcount sensitivity]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.phase}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mile}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626" }}>{r.risk}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Active Initiatives</td><td style={{ ...S.td0, fontWeight: 800, color: accent }}>[6]</td></tr>
        <tr><td style={S.tdLabelAlt}>Green / Amber / Red</td><td style={S.tdAlt}><span style={{ color: "#059669", fontWeight: 700 }}>3 Green</span> &nbsp;/&nbsp; <span style={{ color: "#D97706", fontWeight: 700 }}>2 Amber</span> &nbsp;/&nbsp; <span style={{ color: "#DC2626", fontWeight: 700 }}>1 Red</span></td></tr>
      </tbody></table>
    </div>
  );

  const renderMilestones = () => (
    <div ref={milestonesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>UPCOMING MILESTONES (NEXT 30 DAYS)</div>
      <CopyButton targetRef={milestonesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Initiative</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Milestone</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>On Track?</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/18", init: "[Partnership Expansion]", mile: "[Term sheet finalized]", owner: "[CEO]", track: "At Risk" },
            { date: "03/20", init: "[Q2 Revenue Push]", mile: "[Pipeline review complete]", owner: "[VP Sales]", track: "On Track" },
            { date: "03/25", init: "[Office Consolidation]", mile: "[Lease decision made]", owner: "[COO]", track: "On Track" },
            { date: "04/01", init: "[Digital Transformation]", mile: "[Phase 2 launch]", owner: "[CTO]", track: "On Track" },
            { date: "04/10", init: "[Cost Optimization]", mile: "[Recommendations presented]", owner: "[CFO]", track: "On Track" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const tBg = r.track === "On Track" ? C.badgeGreenBg : C.badgeAmberBg;
            const tFg = r.track === "On Track" ? C.badgeGreenFg : C.badgeAmberFg;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#D97706" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.init}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mile}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(tBg, tFg)}>{r.track}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Briefcase size={11} />Portfolio</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Briefcase size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Initiative Portfolio Snapshot</h2><p className="text-xs font-medium text-emerald-600">Exec-Level View Across the Portfolio</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What&apos;s in flight, health, owner, next milestone, risks. One-page executive portfolio view.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderPortfolio()}{renderMilestones()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPortfolio()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function InitiativePortfolioPage() { return <ThemeProvider><InitiativePortfolioContent /></ThemeProvider>; }
