"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListPlus, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "weighted" | "simple";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "weighted", label: "Weighted Analysis", desc: "Impact scoring", icon: LayoutDashboard },
  { id: "simple", label: "Simple List", desc: "Classic pros/cons", icon: AlignJustify },
];

function ProsConsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("weighted");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prosRef = useRef<HTMLDivElement>(null);
  const consRef = useRef<HTMLDivElement>(null);
  const gutRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>⚖️ PROS &amp; CONS ANALYSIS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; See Both Sides, Decide with Clarity</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Decision</td>
            <td style={{ ...S.td0, width: "52%" }}>[What decision are you weighing? State it as a clear question.]</td>
            <td style={{ ...S.tdLabel, width: "10%" }}>Date</td>
            <td style={{ ...S.td0, width: "24%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Options</td>
            <td colSpan={3} style={S.tdAlt}>[e.g., Option A: Accept the new role &nbsp;&nbsp; vs. &nbsp;&nbsp; Option B: Stay in current position]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Stakes</td>
            <td style={S.td0}>☐ High (life-changing) ☐ Medium (significant) ☐ Low (minor)</td>
            <td style={S.tdLabel}>Deadline</td>
            <td style={S.td0}>[When must I decide?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const PROS = [
    { item: "[e.g., 40% salary increase + equity package]", impact: "High", impBg: "#FEE2E2", impFg: "#DC2626", weight: "9" },
    { item: "[e.g., Opportunity to lead a team of 12 — accelerates leadership growth]", impact: "High", impBg: "#FEE2E2", impFg: "#DC2626", weight: "8" },
    { item: "[e.g., More strategic role — closer to C-suite exposure]", impact: "Med", impBg: "#FEF3C7", impFg: "#D97706", weight: "7" },
    { item: "[e.g., New industry experience (FinTech) — diversifies resume]", impact: "Med", impBg: "#FEF3C7", impFg: "#D97706", weight: "6" },
    { item: "[e.g., Remote-friendly culture — better work-life balance]", impact: "Low", impBg: "#F3F4F6", impFg: "#6B7280", weight: "5" },
    { item: "[Add pro]", impact: "—", impBg: "#F3F4F6", impFg: "#6B7280", weight: "" },
    { item: "[Add pro]", impact: "—", impBg: "#F3F4F6", impFg: "#6B7280", weight: "" },
  ];

  const CONS = [
    { item: "[e.g., Leaving a team I've built and care about]", impact: "High", impBg: "#FEE2E2", impFg: "#DC2626", weight: "8" },
    { item: "[e.g., Startup risk — company is Series B, not yet profitable]", impact: "High", impBg: "#FEE2E2", impFg: "#DC2626", weight: "8" },
    { item: "[e.g., 6-month ramp-up in a new industry — short-term productivity dip]", impact: "Med", impBg: "#FEF3C7", impFg: "#D97706", weight: "6" },
    { item: "[e.g., Commute increases by 30 min each way]", impact: "Low", impBg: "#F3F4F6", impFg: "#6B7280", weight: "3" },
    { item: "[e.g., Loss of current vesting schedule (18 months remaining)]", impact: "Med", impBg: "#FEF3C7", impFg: "#D97706", weight: "7" },
    { item: "[Add con]", impact: "—", impBg: "#F3F4F6", impFg: "#6B7280", weight: "" },
    { item: "[Add con]", impact: "—", impBg: "#F3F4F6", impFg: "#6B7280", weight: "" },
  ];

  const renderWeightedPros = () => (
    <div ref={prosRef}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: "#D1FAE5", color: "#059669",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #059669",
              border: `1.5px solid ${C.border}`,
            }}>
              ✅ PROS (Arguments FOR)
            </td>
          </tr>
          <tr>
            <th style={S.thSecondary}>Pro</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Weight (1-10)</th>
          </tr>
        </thead>
        <tbody>
          {PROS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.impBg, row.impFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#059669" }}>{row.weight}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={2} style={{ ...S.tdLabel, fontWeight: 700, color: "#059669" }}>TOTAL PRO WEIGHT</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#059669" }}>[___]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={prosRef} label="Copy Section" />
    </div>
  );

  const renderWeightedCons = () => (
    <div ref={consRef}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: "#FEE2E2", color: "#DC2626",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #DC2626",
              border: `1.5px solid ${C.border}`,
            }}>
              ❌ CONS (Arguments AGAINST)
            </td>
          </tr>
          <tr>
            <th style={S.thSecondary}>Con</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Weight (1-10)</th>
          </tr>
        </thead>
        <tbody>
          {CONS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.impBg, row.impFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#DC2626" }}>{row.weight}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={2} style={{ ...S.tdLabel, fontWeight: 700, color: "#DC2626" }}>TOTAL CON WEIGHT</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#DC2626" }}>[___]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={consRef} label="Copy Section" />
    </div>
  );

  const renderSimplePros = () => (
    <div ref={prosRef}>
      <table style={S.tbl}>
        <thead>
          <tr><td colSpan={2} style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "10px 14px", fontFamily: S.font, fontSize: "15px", fontWeight: 800, borderBottom: "3px solid #059669", border: `1.5px solid ${C.border}` }}>✅ PROS</td></tr>
        </thead>
        <tbody>
          {PROS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, width: "4%", textAlign: "center" as const, color: "#059669", fontWeight: 700 }}>+</td><td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td></tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={prosRef} label="Copy Section" />
    </div>
  );

  const renderSimpleCons = () => (
    <div ref={consRef}>
      <table style={S.tbl}>
        <thead>
          <tr><td colSpan={2} style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "10px 14px", fontFamily: S.font, fontSize: "15px", fontWeight: 800, borderBottom: "3px solid #DC2626", border: `1.5px solid ${C.border}` }}>❌ CONS</td></tr>
        </thead>
        <tbody>
          {CONS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, width: "4%", textAlign: "center" as const, color: "#DC2626", fontWeight: 700 }}>−</td><td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td></tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={consRef} label="Copy Section" />
    </div>
  );

  const renderGutCheck = () => (
    <div ref={gutRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🧠 GUT-CHECK &amp; INTUITION</div>
      <CopyButton targetRef={gutRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "If I HAD to decide right now, I would...", a: "" },
            { q: "What does my gut say?", a: "☐ Go for it ☐ Hold back ☐ Conflicted" },
            { q: "What would I advise a friend in this situation?", a: "" },
            { q: "What will I regret NOT doing in 5 years?", a: "" },
            { q: "What am I most afraid of?", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "38%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "34px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRecommendation = () => (
    <div ref={recRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 FINAL RECOMMENDATION</div>
      <CopyButton targetRef={recRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "28%" }}>Pro weight total</td>
            <td style={{ ...S.td0, width: "22%", fontWeight: 700, color: "#059669" }}>[___]</td>
            <td style={{ ...S.tdLabel, width: "28%" }}>Con weight total</td>
            <td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>[___]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Net score (Pros − Cons)</td>
            <td style={{ ...S.tdAlt, fontWeight: 800, color: C.accent }}>[___]</td>
            <td style={S.tdLabelAlt}>Gut alignment</td>
            <td style={S.tdAlt}>☐ Matches data ☐ Contradicts data</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 800, color: C.accent, fontSize: "13px" }}>DECISION</td>
            <td colSpan={3} style={{ ...S.td0, height: "44px", fontSize: "13px", fontWeight: 700 }}>[State your decision clearly. Why this choice?]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Next action</td>
            <td colSpan={3} style={S.tdAlt}>[What is the very next step to execute this decision?]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderWeightedLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderWeightedPros()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderWeightedCons()}</td>
      </tr></tbody></table>
      <div style={{ height: "10px" }} />
      {renderGutCheck()}{renderRecommendation()}{renderFooter()}
    </>
  );

  const renderSimpleLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderSimplePros()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderSimpleCons()}</td>
      </tr></tbody></table>
      <div style={{ height: "10px" }} />
      {renderGutCheck()}{renderRecommendation()}{renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><ListPlus size={11} /> Pros &amp; Cons</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><ListPlus size={20} className="text-amber-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Pros &amp; Cons Analysis</h2>
              <p className="text-xs font-medium text-amber-600">See Both Sides, Decide with Clarity</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured pros/cons with impact weighting, gut-check prompts, and a final recommendation. Weighted Analysis scores each item 1-10; Simple List is the classic +/− format.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Analysis Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "weighted" && renderWeightedLayout()}
          {layout === "simple" && renderSimpleLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProsConsPage() {
  return (<ThemeProvider><ProsConsContent /></ThemeProvider>);
}
