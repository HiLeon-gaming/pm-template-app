"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Map, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Roadmap", desc: "3-horizon + details", icon: LayoutDashboard },
  { id: "compact", label: "Horizon Only", desc: "Now/Next/Later cards", icon: AlignJustify },
];

function ProductRoadmapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#B45309";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🗺️ PRODUCT ROADMAP (NOW / NEXT / LATER)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Roadmap &amp; Release Planning</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Product Owner</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Time Horizon</td><td style={S.tdAlt}>[This Quarter / This Half / This Year]</td><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const horizonCard = (title: string, emoji: string, color: string, confidence: string, confBg: string, confFg: string, items: { theme: string; outcome: string; status: string; sBg: string; sFg: string }[]) => (
    <table style={S.tbl}>
      <thead>
        <tr><td colSpan={3} style={{ backgroundColor: color, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, letterSpacing: "0.02em" }}>{emoji} {title} <span style={{ fontSize: "10px", fontWeight: 500, marginLeft: "8px", opacity: 0.9 }}>Confidence: <span style={{ fontWeight: 700 }}>{confidence}</span></span></td></tr>
        <tr>
          <th style={{ ...S.thSecondary, width: "35%" }}>Theme / Initiative</th>
          <th style={S.thSecondary}>Target Outcome</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.theme}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.outcome}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.status}</span></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderHorizons = () => (
    <div ref={horizonRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 THREE-HORIZON ROADMAP</td></tr></tbody></table>
      <CopyButton targetRef={horizonRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>NOW = committed this sprint/release &nbsp;|&nbsp; NEXT = planned for next 1–2 releases &nbsp;|&nbsp; LATER = exploring / validating</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "33.3%", paddingRight: "4px" }}>
          {horizonCard("NOW (Committed)", "🟢", "#059669", "High", C.badgeGreenBg, C.badgeGreenFg, [
            { theme: "[Checkout flow v2]", outcome: "[15% conversion lift]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { theme: "[Payment gateway integration]", outcome: "[3 new payment methods]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { theme: "[Mobile performance]", outcome: "[<2s page load]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { theme: "[Add initiative]", outcome: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ])}
        </td>
        <td style={{ ...LC, width: "33.3%", paddingLeft: "4px", paddingRight: "4px" }}>
          {horizonCard("NEXT (Planned)", "🟡", "#F59E0B", "Medium", C.badgeAmberBg, C.badgeAmberFg, [
            { theme: "[User preferences & saved carts]", outcome: "[+20% return visits]", status: "Refined", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { theme: "[Real-time order tracking]", outcome: "[−30% support tickets]", status: "In Refinement", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { theme: "[Admin bulk import]", outcome: "[Save 10 hrs/week ops]", status: "Backlog", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { theme: "[Add initiative]", outcome: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ])}
        </td>
        <td style={{ ...LC, width: "33.3%", paddingLeft: "4px" }}>
          {horizonCard("LATER (Exploring)", "🔵", "#0891B2", "Low", C.badgeBlueBg, C.badgeBlueFg, [
            { theme: "[International expansion]", outcome: "[3 new markets]", status: "Research", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { theme: "[Native mobile app]", outcome: "[Mobile-first experience]", status: "Idea", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { theme: "[AI recommendations]", outcome: "[+15% basket size]", status: "Idea", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { theme: "[Add initiative]", outcome: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ])}
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 INITIATIVE DETAIL (NOW HORIZON)</td></tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Initiative</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Epics</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Stories</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Target Sprint</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Dependencies</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Risk</th>
        </tr></thead>
        <tbody>
          {[
            { init: "[Checkout flow v2]", epics: "3", stories: "18", sprint: "Sprint 7–8", deps: "[Payment API]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { init: "[Payment gateway]", epics: "2", stories: "12", sprint: "Sprint 7–9", deps: "[Vendor sandbox]", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { init: "[Mobile performance]", epics: "1", stories: "6", sprint: "Sprint 7", deps: "[None]", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { init: "[Add initiative]", epics: "", stories: "", sprint: "", deps: "", risk: "—", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.init}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.epics}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.stories}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.sprint}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.deps}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMilestones = () => (
    <div ref={milestonesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🏁 KEY MILESTONES &amp; DATES</td></tr></tbody></table>
      <CopyButton targetRef={milestonesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Milestone</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[MM/DD]", ms: "[Checkout v2 feature-complete — all stories accepted by PO]", owner: "[Tech Lead]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[MM/DD]", ms: "[Payment gateway sandbox testing complete]", owner: "[Dev Lead]", s: "At Risk", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "[MM/DD]", ms: "[Sprint 8 demo to stakeholders]", owner: "[PO]", s: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "[MM/DD]", ms: "[Release candidate deployed to staging]", owner: "[DevOps]", s: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "[MM/DD]", ms: "[Production release — go-live]", owner: "[SM]", s: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "[Add]", ms: "", owner: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.ms}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderHorizons()}{renderDetail()}{renderMilestones()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderHorizons()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Map size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Product Roadmap (Now / Next / Later)</h2><p className="text-xs font-medium text-amber-600">⭐ All-Star &mdash; Exec-Friendly, Flexible, and Realistic</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Three-horizon roadmap that doesn&apos;t pretend you know everything. Includes initiative details, dependencies, and key milestones.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProductRoadmapPage() { return <ThemeProvider><ProductRoadmapContent /></ThemeProvider>; }
