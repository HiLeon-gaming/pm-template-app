"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Gauge, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Planner", desc: "Team capacity + constraints + trade-offs + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Capacity table only", icon: AlignJustify },
];

function CapacityContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const constRef = useRef<HTMLDivElement>(null);
  const tradeRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>CAPACITY &amp; CONSTRAINTS PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Do We Have Enough to Execute?</td></tr>
    </tbody></table>
  );

  const renderCap = () => (
    <div ref={capRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>TEAM CAPACITY ASSESSMENT</div>
      <CopyButton targetRef={capRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Before committing to initiatives, check: do we have the people, time, and budget to actually do this? Overpromising + underdelivering destroys trust.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Team / Person</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Headcount</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Available Hrs/Wk</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Committed Hrs/Wk</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Remaining</th>
          <th style={S.thPrimary}>Key Initiatives Assigned</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { team: "[Support]", hc: "5 (+3 new)", avail: "200", commit: "180", remain: "20", inits: "Hire agents, launch Intercom, detractor recovery", s: "Tight", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { team: "[Product]", hc: "4", avail: "160", commit: "140", remain: "20", inits: "Onboarding redesign, in-app walkthrough", s: "OK", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { team: "[Marketing]", hc: "3", avail: "120", commit: "110", remain: "10", inits: "LinkedIn ads, case studies, content", s: "Tight", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { team: "[Sales]", hc: "4", avail: "160", commit: "150", remain: "10", inits: "Enterprise playbook, 3 deal closings", s: "Tight", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { team: "[HR]", hc: "2", avail: "80", commit: "70", remain: "10", inits: "Recruiter sprint, pulse survey, manager training", s: "OK", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { team: "[Engineering]", hc: "8", avail: "320", commit: "300", remain: "20", inits: "Product features, Intercom migration support", s: "At Risk", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.hc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.avail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.commit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 800, color: parseInt(r.remain) < 15 ? "#DC2626" : "#059669" }}>{r.remain}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.inits}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConst = () => (
    <div ref={constRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>CONSTRAINTS &amp; BLOCKERS</div>
      <CopyButton targetRef={constRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Constraint Type</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Impact on OKRs</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Budget", desc: "[Total Q budget: $150K. Already allocated: $120K. Remaining: $30K.]", impact: "LinkedIn ads capped at $10K/mo. Can't afford agency recruiter AND paid ads." },
            { type: "Headcount", desc: "[3 new hires won't start until Week 3–4. Eng team already at 95% capacity.]", impact: "First 3 weeks = current team only. Can't start Intercom migration until Week 5." },
            { type: "Dependencies", desc: "[Legal team needs 2 weeks for enterprise contract template review.]", impact: "Enterprise deals can't close until legal terms are pre-approved." },
            { type: "Calendar", desc: "[Company offsite Week 6. Holiday week 11. Q-end = Week 13.]", impact: "Effectively 10 working weeks, not 13. Plan accordingly." },
            { type: "Tech Debt", desc: "[Current ticketing system migration is a prerequisite for KR 1.1 improvements.]", impact: "Support KRs depend on IT completing migration first." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.impact}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTradeAndTips = () => (
    <div ref={tradeRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tradeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>⚖️ TRADE-OFF DECISIONS</td></tr></thead>
            <tbody>
              {[
                { tradeoff: "Intercom migration vs in-app walkthrough", decision: "Defer walkthrough to Q3. Migration has higher KR impact.", by: "[VP Product]" },
                { tradeoff: "LinkedIn ads vs conference sponsorship", decision: "LinkedIn ads — faster feedback, measurable in 2 weeks.", by: "[CMO]" },
                { tradeoff: "New features vs tech debt", decision: "70/30 split. Friday PM protected for tech debt.", by: "[VP Eng]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <strong>{r.tradeoff}</strong><br />
                      <span style={{ fontSize: "9px", color: "#7C3AED", fontWeight: 600 }}>{r.decision}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.by}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💡 CAPACITY TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Plan for 80%, not 100%.", detail: "Leave 20% buffer for unexpected work, sick days, emergencies." },
                { color: "#DC2626", tip: "Every team 'Tight'? Too many initiatives.", detail: "Go back to Prioritization Matrix and cut." },
                { color: "#059669", tip: "Review capacity monthly.", detail: "New hires, departures, scope changes. Update at every MBR." },
                { color: "#7C3AED", tip: "Don't forget BAU work.", detail: "Teams have 'keep the lights on' tasks. Factor in before adding OKR work." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Gauge size={11} />Capacity</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Gauge size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Capacity &amp; Constraints Planner</h2><p className="text-xs font-medium text-amber-600">Do We Have Enough to Execute?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Team capacity, budget, dependencies, and trade-off decisions. Prevents over-committing.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCap()}{renderConst()}{renderTradeAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCap()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function CapacityConstraintsPlannerPage() { return <ThemeProvider><CapacityContent /></ThemeProvider>; }
