"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, HelpCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Assumptions + validation plan + status + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Assumptions table only", icon: AlignJustify },
];

function AssumptionsLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const valRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ASSUMPTIONS LOG + VALIDATION PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; What Must Be True + How We&apos;ll Validate</td></tr>
    </tbody></table>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>ASSUMPTIONS</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every OKR and initiative is built on assumptions — things we believe to be true but haven&apos;t proven yet. List them here, validate them early, and adjust before it&apos;s too late.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Assumption (What Must Be True)</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Relates To</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Risk If Wrong</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>How We&apos;ll Validate</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Validate By</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { assume: "We can hire 3 quality support agents within 4 weeks.", rel: "KR 1.1", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, how: "Track applicant pipeline weekly. If < 10 applicants by Week 2, expand sourcing.", by: "Week 2", s: "Validated", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { assume: "LinkedIn ads will deliver MQLs at < $30 CPC.", rel: "KR 2.1", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, how: "Run 3 ad variations for 2 weeks. Measure CPC and conversion rate.", by: "Week 4", s: "Validated", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { assume: "Enterprise prospects will respond to cold outreach.", rel: "KR 2.2", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, how: "Send 50 cold emails + 20 LinkedIn messages. Measure response rate.", by: "Week 3", s: "Invalidated", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { assume: "Manager training will improve engagement scores.", rel: "KR 3.2", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, how: "Run pulse survey before and after training. Compare scores.", by: "Week 10", s: "Testing", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { assume: "NPS detractor recovery calls will convert 30% of detractors to passives.", rel: "KR 1.3", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, how: "Call 20 detractors. Track conversion rate after 30 days.", by: "Week 8", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { assume: "[Your assumption]", rel: "", risk: "", rBg: "transparent", rFg: C.textMuted, how: "", by: "", s: "", sBg: "transparent", sFg: C.textMuted },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.assume}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.rel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.risk && <span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.s && <span style={S.badge(r.sBg, r.sFg)}>{r.s}</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderValAndTips = () => (
    <div ref={valRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={valRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>❌ INVALIDATED — WHAT CHANGED</td></tr></thead>
            <tbody>
              {[
                { assume: "Enterprise prospects respond to cold outreach", learned: "<2% response rate. Decision-makers don't respond to cold.", action: "Pivoted to warm intros + referral program. Hired SDR agency." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <strong style={{ color: "#DC2626" }}>{r.assume}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>Learned: {r.learned}</span><br />
                      <span style={{ fontSize: "9px", color: accent, fontWeight: 600 }}>Action: {r.action}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💡 MANAGEMENT TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "List assumptions at quarter START.", detail: "Ask: 'What must be true for this OKR to work?'" },
                { color: "#DC2626", tip: "Validate riskiest assumptions FIRST.", detail: "Don't wait until Week 8 to learn something critical is wrong." },
                { color: "#D97706", tip: "Invalidated assumptions are gold.", detail: "Not failures — learning. Update your plan immediately." },
                { color: "#059669", tip: "Review at MBR.", detail: "5 min: any assumptions validated or invalidated this month?" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><HelpCircle size={11} />Assumptions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><HelpCircle size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Assumptions Log + Validation Plan</h2><p className="text-xs font-medium text-indigo-600">What Must Be True &bull; How We&apos;ll Validate</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Surface hidden assumptions, validate them early, and adjust before it&apos;s too late.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderLog()}{renderValAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function AssumptionsLogPage() { return <ThemeProvider><AssumptionsLogContent /></ThemeProvider>; }
