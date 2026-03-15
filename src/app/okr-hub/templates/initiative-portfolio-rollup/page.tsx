"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Layers, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Roll-Up", desc: "RAG status + milestones + blockers + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "RAG table only", icon: AlignJustify },
];

function InitiativePortfolioContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const ragRef = useRef<HTMLDivElement>(null);
  const mileRef = useRef<HTMLDivElement>(null);
  const summRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>INITIATIVE PORTFOLIO ROLL-UP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Q[X] [YEAR] RAG Status</td></tr>
    </tbody></table>
  );

  const renderRag = () => (
    <div ref={ragRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ALL INITIATIVES — RAG STATUS</div>
      <CopyButton targetRef={ragRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every initiative this quarter with Red/Amber/Green health. Leadership can see at a glance: what&apos;s on track, what needs help, and what&apos;s blocked.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Initiative</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Links to</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>RAG</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>% Done</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Key Blocker / Risk</th>
        </tr></thead>
        <tbody>
          {[
            { init: "Hire 3 support agents + onboard by Week 4", kr: "KR 1.1", owner: "[Tom R.]", rag: "Green", ragBg: C.badgeGreenBg, ragFg: C.badgeGreenFg, pct: "80%", blocker: "None. 2 accepted, 1 interviewing." },
            { init: "Redesign customer onboarding flow", kr: "KR 1.2", owner: "[Lisa P.]", rag: "Amber", ragBg: C.badgeAmberBg, ragFg: C.badgeAmberFg, pct: "40%", blocker: "Designer on PTO until next week." },
            { init: "Launch detractor recovery program", kr: "KR 1.3", owner: "[CX Lead]", rag: "Red", ragBg: C.badgeRedBg, ragFg: C.badgeRedFg, pct: "15%", blocker: "NPS data access still pending IT." },
            { init: "LinkedIn paid ad campaign", kr: "KR 2.1", owner: "[Amy K.]", rag: "Green", ragBg: C.badgeGreenBg, ragFg: C.badgeGreenFg, pct: "70%", blocker: "None. Running. Optimizing best ad." },
            { init: "Enterprise sales playbook + 4 case studies", kr: "KR 2.2", owner: "[Mike D.]", rag: "Amber", ragBg: C.badgeAmberBg, ragFg: C.badgeAmberFg, pct: "25%", blocker: "Outline done. Need customer refs for case studies." },
            { init: "Recruiter sprint for 5 critical roles", kr: "KR 3.1", owner: "[HR Dir.]", rag: "Green", ragBg: C.badgeGreenBg, ragFg: C.badgeGreenFg, pct: "60%", blocker: "VP Eng still in pipeline. Others progressing." },
            { init: "Monthly engagement pulse survey", kr: "KR 3.2", owner: "[PeopleOps]", rag: "Amber", ragBg: C.badgeAmberBg, ragFg: C.badgeAmberFg, pct: "30%", blocker: "First survey going out this week." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.init}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.ragBg, r.ragFg)}>{r.rag}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.pct}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.blocker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMileAndSumm = () => (
    <div ref={mileRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={mileRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>📅 UPCOMING MILESTONES</td></tr></thead>
            <tbody>
              {[
                { week: "Wk 4", mile: "2 new support agents start onboarding", init: "Support Hiring", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
                { week: "Wk 4", mile: "First pulse survey results available", init: "Engagement", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
                { week: "Wk 4", mile: "Enterprise playbook draft for review", init: "Sales Playbook", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
                { week: "Wk 5", mile: "Onboarding flow v2 design complete", init: "Onboarding", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
                { week: "Wk 5", mile: "Detractor recovery launched (if unblocked)", init: "NPS Recovery", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ fontWeight: 700, color: "#D97706" }}>{r.week}</span> <strong>{r.mile}</strong> <span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.init}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>📊 PORTFOLIO SUMMARY</td></tr></thead>
            <tbody>
              {[
                { label: "Total Initiatives", value: "7", color: undefined as string | undefined },
                { label: "Green (On Track)", value: "3 (43%)", color: "#059669" },
                { label: "Amber (At Risk)", value: "3 (43%)", color: "#D97706" },
                { label: "Red (Blocked)", value: "1 (14%)", color: "#DC2626" },
                { label: "Overall Health", value: "Amber \u2014 Majority progressing, detractor stalled", color: "#D97706" },
                { label: "#1 Action", value: "Unblock NPS data access immediately", color: accent },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong>{r.label}</strong><br />
                      <span style={{ fontSize: "10px", fontWeight: 700, color: r.color }}>{r.value}</span>
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Layers size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Initiative Portfolio Roll-Up</h2><p className="text-xs font-medium text-rose-600">&#11088; All-Star &mdash; RAG Status for All Initiatives</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">All initiatives with Red/Amber/Green health, owners, milestones, and blockers. Leadership visibility in one view.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderRag()}{renderMileAndSumm()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRag()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function InitiativePortfolioRollupPage() { return <ThemeProvider><InitiativePortfolioContent /></ThemeProvider>; }
