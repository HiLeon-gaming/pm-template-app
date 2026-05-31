"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, GitMerge, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Company → Team → Personal alignment + gap analysis + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Map", desc: "Alignment table only", icon: AlignJustify },
];

function AlignmentMapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const personalRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ALIGNMENT MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Company → Team → Personal</td></tr>
    </tbody></table>
  );

  const renderMap = () => (
    <div ref={mapRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>COMPANY → TEAM ALIGNMENT</td></tr></tbody></table>
      <CopyButton targetRef={mapRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every team OKR should clearly support a company OKR. If a team goal doesn&apos;t connect upward, ask: &ldquo;Why are we doing this?&rdquo; This table shows how they link.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Company Objective</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Company Key Result</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Team</th>
          <th style={S.thPrimary}>Team OKR (How This Team Contributes)</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Aligned?</th>
        </tr></thead>
        <tbody>
          {[
            { cObj: "Improve customer experience", cKR: "Reduce support wait → 6 hrs", team: "Support", tOKR: "Hire 3 agents + launch new ticketing system", aligned: true },
            { cObj: "", cKR: "CSAT 4.1 → 4.5", team: "Product", tOKR: "Redesign onboarding flow to reduce time-to-value by 40%", aligned: true },
            { cObj: "", cKR: "NPS 35 → 55", team: "CX", tOKR: "Launch detractor recovery program + monthly NPS surveys", aligned: true },
            { cObj: "Grow revenue pipeline", cKR: "Qualified leads 200 → 400/mo", team: "Marketing", tOKR: "Launch paid campaign + double content output", aligned: true },
            { cObj: "", cKR: "Close 3 enterprise deals", team: "Sales", tOKR: "Build enterprise playbook + close 3 deals >$100K", aligned: true },
            { cObj: "Build world-class team", cKR: "Fill 5 critical roles", team: "HR", tOKR: "Run recruiter sprint + fill VP Eng + 4 ICs by Week 8", aligned: true },
            { cObj: "", cKR: "Engagement > 85%", team: "People Ops", tOKR: "Launch monthly pulse survey + act on top 3 issues", aligned: true },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: r.cObj ? 700 : 400, color: r.cObj ? accent : C.textBody }}>{r.cObj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.cKR}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#0EA5E9" }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.tOKR}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.aligned ? C.badgeGreenBg : C.badgeRedBg, r.aligned ? C.badgeGreenFg : C.badgeRedFg)}>{r.aligned ? "Yes" : "No"}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPersonal = () => (
    <div ref={personalRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>TEAM → PERSONAL ALIGNMENT (Individual OKRs)</td></tr></tbody></table>
      <CopyButton targetRef={personalRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Personal OKRs connect what YOU do every week to team and company goals. This is how individuals see their impact. Not every company uses personal OKRs, but they&apos;re powerful for high performers.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Team OKR</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Person</th>
          <th style={S.thPrimary}>Personal Key Result</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Current</th>
        </tr></thead>
        <tbody>
          {[
            { team: "Hire 3 agents", person: "[Recruiter A]", pkr: "[Source 30 qualified candidates and schedule 15 interviews]", target: "15", current: "11" },
            { team: "Hire 3 agents", person: "[Support Mgr]", pkr: "[Create onboarding plan + train new hires within 2 weeks of start]", target: "2 wks", current: "On track" },
            { team: "Launch paid campaign", person: "[Marketing Mgr]", pkr: "[Achieve $50 cost-per-lead on LinkedIn by end of Month 2]", target: "$50", current: "$72" },
            { team: "Close 3 enterprise deals", person: "[AE #1]", pkr: "[Move Client A from proposal to close by Week 6]", target: "Closed", current: "Proposal" },
            { team: "Close 3 enterprise deals", person: "[AE #2]", pkr: "[Generate 5 enterprise discovery calls per week]", target: "5/wk", current: "3/wk" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: "#059669" }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.person}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.pkr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.current}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGapAndTips = () => (
    <div ref={gapRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={gapRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>⚠️ GAP ANALYSIS</td></tr></thead>
            <tbody>
              {[
                { type: "Orphan", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, desc: "Blog redesign doesn’t link to any OKR", action: "Pause or link it" },
                { type: "Unsupported", tBg: C.badgeRedBg, tFg: C.badgeRedFg, desc: "Engagement KR has only 1 struggling initiative", action: "Add initiatives or adjust target" },
                { type: "Overlap", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, desc: "Product + CX both running customer surveys", action: "Consolidate to one owner" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={S.badge(r.tBg, r.tFg)}>{r.type}</span> <span style={{ fontWeight: 700 }}>{r.desc}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>Action: {r.action}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>💡 ALIGNMENT TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Every team OKR must plug into a company OKR.", detail: "If it doesn’t connect upward, question why you’re doing it." },
                { color: "#059669", tip: "Personal OKRs are optional but powerful.", detail: "Best for senior ICs and managers who want clarity on impact." },
                { color: "#DC2626", tip: "Look for orphaned work every quarter.", detail: "Unlinked projects are candidates for the Stop Doing list." },
                { color: "#D97706", tip: "Alignment \u2260 micromanagement.", detail: "Freedom in HOW. Alignment is about WHAT matters." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><GitMerge size={11} />Alignment</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><GitMerge size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Alignment Map</h2><p className="text-xs font-medium text-violet-600">Company → Team → Personal</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Shows how lower-level goals align upward. Reduces random work and makes sure every team is pulling in the same direction.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderMap()}{renderPersonal()}{renderGapAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMap()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function AlignmentMapPage() { return <ThemeProvider><AlignmentMapContent /></ThemeProvider>; }
