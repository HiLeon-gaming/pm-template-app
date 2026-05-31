"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Ruler, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Definition", desc: "Definitions + data source + cadence + examples", icon: LayoutDashboard },
  { id: "compact", label: "Quick Defs", desc: "Definition table only", icon: AlignJustify },
];

function MetricDefContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const defRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);
  const exRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>KEY RESULT METRIC DEFINITIONS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; How Each KR Is Measured</td></tr>
    </tbody></table>
  );

  const renderDef = () => (
    <div ref={defRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>METRIC DEFINITION TABLE</td></tr></tbody></table>
      <CopyButton targetRef={defRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>For each Key Result, define EXACTLY how it&apos;s measured. This prevents arguments about &ldquo;what counts&rdquo; and ensures everyone calculates progress the same way.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Exact Definition / Formula</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Data Source</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Update</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Who Updates</th>
          <th style={S.thPrimary}>Notes / Exclusions</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "Support wait → 6 hrs", def: "Median time from ticket creation to first human response (auto-replies don't count)", source: "Intercom dashboard", update: "Daily", who: "[Support Mgr]", notes: "Excludes weekends and holidays. Only counts L1+L2 tickets." },
            { kr: "CSAT → 4.5", def: "Average rating from post-interaction survey (1–5 scale). Minimum 50 responses/month.", source: "Intercom CSAT report", update: "Weekly", who: "[CX Analyst]", notes: "Only counts surveys completed within 24 hrs of interaction." },
            { kr: "NPS → 55", def: "Net Promoter Score = %Promoters(9–10) minus %Detractors(0–6). Quarterly survey.", source: "Delighted / SurveyMonkey", update: "Monthly", who: "[CX Team]", notes: "Survey sent to all active customers with 30+ day tenure." },
            { kr: "Leads → 400/mo", def: "Marketing Qualified Leads (MQLs): contacts who fill out a form AND match ICP criteria.", source: "HubSpot", update: "Weekly", who: "[Marketing Ops]", notes: "Excludes spam, competitors, and existing customers." },
            { kr: "3 enterprise deals", def: "Closed-won deals with ACV ≥ $100K. Contract fully signed.", source: "Salesforce", update: "Weekly", who: "[Sales Ops]", notes: "Verbal agreements don't count. Must be signed." },
            { kr: "Sales cycle → 60 days", def: "Average days from first discovery call to closed-won. Enterprise deals only.", source: "Salesforce report", update: "Monthly", who: "[Sales Ops]", notes: "Excludes deals that were re-opened from previous quarters." },
            { kr: "Fill 5 roles", def: "Candidate accepted offer AND started work. Open role marked 'Filled' in ATS.", source: "Greenhouse ATS", update: "Weekly", who: "[Recruiter]", notes: "Only counts the 5 roles on the critical hiring list." },
            { kr: "Engagement > 85%", def: "Average favorable score across all engagement survey questions. Min 80% response rate.", source: "Culture Amp", update: "Monthly", who: "[People Ops]", notes: "Monthly pulse survey. Full survey at end of quarter." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#7C3AED", fontWeight: 600 }}>{r.source}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.update}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "8px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTipsAndEx = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>WHY DEFINITIONS MATTER</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Without definitions, people measure differently.", detail: "Marketing says 400 leads but includes spam. Sales says only 200." },
                { color: accent, tip: "Be precise.", detail: "'Customer satisfaction' is vague. CSAT ≥ 4.5 with min 50 responses is measurable." },
                { color: "#7C3AED", tip: "Document exclusions.", detail: "What DOESN'T count is as important as what does." },
                { color: "#059669", tip: "Agree on data sources.", detail: "Everyone pulls from the same system. No spreadsheet wars." },
                { color: "#0EA5E9", tip: "Set update cadence.", detail: "Can't update weekly? You won't catch problems until too late." },
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
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>COMMON MISTAKES</td></tr></thead>
            <tbody>
              {[
                { mistake: "'Increase revenue' — no baseline", better: "'MRR $500K → $700K in Stripe on last day of month.'" },
                { mistake: "'Improve satisfaction' — how?", better: "'CSAT ≥ 4.5, min 50 responses/mo in Intercom.'" },
                { mistake: "Different data sources for same metric", better: "Pick ONE source of truth. Everyone uses it." },
                { mistake: "Metric only measurable quarterly", better: "Find a weekly leading indicator instead." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: "#DC2626" }}>{r.mistake}</strong><br />
                      <span style={{ fontSize: "9px", color: "#059669", fontWeight: 600 }}>{r.better}</span>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Ruler size={11} />Metrics</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Ruler size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Key Result Metric Definitions</h2><p className="text-xs font-medium text-amber-600">Exactly How Each KR Is Measured</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Source, formula, cadence, owner. Prevents &ldquo;we measure it differently&rdquo; arguments.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDef()}{renderTipsAndEx()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDef()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function KeyResultMetricDefinitionPage() { return <ThemeProvider><MetricDefContent /></ThemeProvider>; }
