"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "weighted" | "simple";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "weighted", label: "Weighted Matrix", desc: "Criteria × weights × scores", icon: LayoutDashboard },
  { id: "simple", label: "Simple Comparison", desc: "Side-by-side pros/cons", icon: AlignJustify },
];

const OPTIONS = ["Option A: [e.g., Build in-house]", "Option B: [e.g., Buy SaaS tool]", "Option C: [e.g., Partner/white-label]"];
const CRITERIA = [
  { name: "Cost (total 3-year)", weight: "25%", wNum: 25 },
  { name: "Time to implement", weight: "20%", wNum: 20 },
  { name: "Scalability", weight: "15%", wNum: 15 },
  { name: "Team capability / fit", weight: "15%", wNum: 15 },
  { name: "Risk level", weight: "10%", wNum: 10 },
  { name: "Strategic alignment", weight: "10%", wNum: 10 },
  { name: "Vendor reliability", weight: "5%", wNum: 5 },
];

function DecisionMatrixContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("weighted");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>⚖️ DECISION MATRIX (WEIGHTED SCORING)</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Eliminate Analysis Paralysis</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Decision</td>
            <td style={{ ...S.td0, width: "52%" }}>[What decision are we making? Be specific.]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Date</td>
            <td style={{ ...S.td0, width: "22%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Decision Maker</td>
            <td style={S.tdAlt}>[Who has final authority?]</td>
            <td style={S.tdLabelAlt}>Deadline</td>
            <td style={S.tdAlt}>[When must this be decided?]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Context</td>
            <td colSpan={3} style={S.td0}>[Why is this decision needed now? What triggered it? What happens if we don&apos;t decide?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const optColors = [
    { color: "#DC2626", bg: "#FEE2E2" },
    { color: "#2563EB", bg: "#DBEAFE" },
    { color: "#059669", bg: "#D1FAE5" },
  ];

  const renderWeightedMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 WEIGHTED SCORING MATRIX</div>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Score each option 1-10 per criterion. Weighted Score = Score × Weight%. Highest total wins.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary} rowSpan={2}>Criteria</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }} rowSpan={2}>Weight</th>
            {OPTIONS.map((opt, i) => (
              <th key={i} colSpan={2} style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: optColors[i].bg, color: optColors[i].color, fontSize: "10px", fontWeight: 800 }}>
                {opt.split(":")[0]}
              </th>
            ))}
          </tr>
          <tr>
            {OPTIONS.map((_, i) => (
              <React.Fragment key={i}>
                <th style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "9px", width: "6%" }}>Score</th>
                <th style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "9px", width: "7%", backgroundColor: optColors[i].bg, color: optColors[i].color }}>Wtd</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {CRITERIA.map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{c.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{c.weight}</td>
                {OPTIONS.map((_, oi) => (
                  <React.Fragment key={oi}>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>/10</td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, color: optColors[oi].color }}>[___]</td>
                  </React.Fragment>
                ))}
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 800 }}>TOTAL WEIGHTED SCORE</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>100%</td>
            {OPTIONS.map((_, oi) => (
              <React.Fragment key={oi}>
                <td style={{ ...S.td0, textAlign: "center" as const }}></td>
                <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: optColors[oi].color }}>[___]</td>
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSimpleComparison = () => (
    <div ref={compRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 SIDE-BY-SIDE COMPARISON</td></tr></tbody></table>
      <CopyButton targetRef={compRef} label="Copy Section" />
      <table style={LT}>
        <tbody>
          <tr>
            {OPTIONS.map((opt, i) => (
              <td key={i} style={{ ...LC, width: `${100 / OPTIONS.length}%`, paddingLeft: i > 0 ? "5px" : "0", paddingRight: i < OPTIONS.length - 1 ? "5px" : "0" }}>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <td colSpan={2} style={{
                        backgroundColor: optColors[i].bg, color: optColors[i].color,
                        padding: "10px 10px", fontFamily: S.font, fontSize: "12px",
                        fontWeight: 800, border: `1.5px solid ${C.border}`,
                        borderBottom: `3px solid ${optColors[i].color}`,
                      }}>
                        {opt}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} style={{ ...S.td0, backgroundColor: "#D1FAE5", color: "#059669", fontWeight: 700, fontSize: "11px", textAlign: "center" as const }}>✅ PROS</td>
                    </tr>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <tr key={`pro-${j}`}>
                        <td style={{ ...S.td0, backgroundColor: j % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px" }}>
                          {i === 0 && j === 0 ? "[e.g., Full control over features]" : "+"}&nbsp;
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2} style={{ ...S.td0, backgroundColor: "#FEE2E2", color: "#DC2626", fontWeight: 700, fontSize: "11px", textAlign: "center" as const }}>❌ CONS</td>
                    </tr>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <tr key={`con-${j}`}>
                        <td style={{ ...S.td0, backgroundColor: j % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px" }}>
                          {i === 0 && j === 0 ? "[e.g., 6+ months dev time, hiring needed]" : "−"}&nbsp;
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderRecommendation = () => (
    <div ref={recRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 RECOMMENDATION &amp; DECISION</div>
      <CopyButton targetRef={recRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Highest scoring option", a: "[Option ___] with score [___]" },
            { q: "Gut-check alignment", a: "☐ Matches my intuition ☐ Surprises me — need to investigate" },
            { q: "Key risks of chosen option", a: "" },
            { q: "Mitigation for top risk", a: "" },
            { q: "Reversibility", a: "☐ Easily reversible ☐ Partially reversible ☐ One-way door" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "30%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 800, color: C.accent, fontSize: "13px" }}>FINAL DECISION</td>
            <td style={{ ...S.td0, height: "44px", fontSize: "13px", fontWeight: 700 }}>[State the decision clearly. Include rationale in 1-2 sentences.]</td>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Scale size={11} /> Decision Matrix</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Scale size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Decision Matrix (Weighted Scoring)</h2>
              <p className="text-xs font-medium text-indigo-600">Eliminate Analysis Paralysis &mdash; Objective, Structured, Decisive</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Compare options against weighted criteria with objective scoring. Weighted Matrix uses scores × weights for rigorous analysis; Simple Comparison shows side-by-side pros/cons for quick decisions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Analysis Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderDateHeader()}
          {layout === "weighted" ? renderWeightedMatrix() : renderSimpleComparison()}
          {renderRecommendation()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionMatrixPage() {
  return (<ThemeProvider><DecisionMatrixContent /></ThemeProvider>);
}
