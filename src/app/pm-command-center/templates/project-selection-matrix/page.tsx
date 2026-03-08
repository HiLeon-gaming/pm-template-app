"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Target, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Matrix", desc: "Weighted scoring + details", icon: LayoutDashboard },
  { id: "compact", label: "Quick Compare", desc: "Scoring matrix only", icon: AlignJustify },
];

function ProjectSelectionMatrixContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const criteriaRef = useRef<HTMLDivElement>(null);
  const scoringRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const recommendRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x1F3AF; PROJECT SELECTION MATRIX</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Selection Matrix uses a weighted scoring model to objectively evaluate and prioritize competing project proposals against strategic criteria.</strong> Each project is scored on predefined criteria, weighted by organizational importance, to produce a composite ranking.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>portfolio planning, budget allocation,</strong> or <strong style={{ fontStyle: "italic" }}>investment committee reviews</strong>. Aligns with PMBOK Integration Management &#x2014; Initiating Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Portfolio / Program</td><td style={{ ...S.td0, width: "32%" }}>[Portfolio Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[Name, Title]</td><td style={S.tdLabelAlt}>Fiscal Year</td><td style={S.tdAlt}>[FY20XX]</td></tr>
          <tr><td style={S.tdLabel}>Scoring Scale</td><td colSpan={3} style={S.td0}>1 = Low &nbsp;|&nbsp; 2 = Below Average &nbsp;|&nbsp; 3 = Average &nbsp;|&nbsp; 4 = Above Average &nbsp;|&nbsp; 5 = High</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const criteria = [
    { name: "Strategic Alignment", weight: 25, desc: "How well does it support organizational strategy?" },
    { name: "Financial Return (ROI/NPV)", weight: 20, desc: "Expected financial benefits vs. investment" },
    { name: "Risk Level (inverse)", weight: 15, desc: "Lower risk = higher score" },
    { name: "Resource Availability", weight: 15, desc: "Can we staff it with existing resources?" },
    { name: "Urgency / Time Sensitivity", weight: 10, desc: "Regulatory, competitive, or market deadline" },
    { name: "Technical Feasibility", weight: 10, desc: "Complexity and technology readiness" },
    { name: "Stakeholder Support", weight: 5, desc: "Level of executive and user buy-in" },
  ];

  const projects = [
    { name: "Project Alpha", scores: [5, 4, 3, 4, 5, 4, 5] },
    { name: "Project Beta", scores: [4, 5, 4, 3, 3, 3, 4] },
    { name: "Project Gamma", scores: [3, 3, 5, 5, 2, 4, 3] },
    { name: "[Project D]", scores: [0, 0, 0, 0, 0, 0, 0] },
  ];

  const renderCriteria = () => (
    <div ref={criteriaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x2696;&#xFE0F; SELECTION CRITERIA &amp; WEIGHTS</div>
      <CopyButton targetRef={criteriaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "24%" }}>Criterion</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Weight %</th>
          <th style={S.thPrimary}>Description / Guidance</th>
        </tr></thead>
        <tbody>
          {criteria.map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{c.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{c.weight}%</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.desc}</td>
            </tr>);
          })}
          <tr>
            <td colSpan={2} style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>TOTAL</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>100%</td>
            <td style={{ ...S.td0, backgroundColor: C.primary, color: C.white, fontSize: "11px" }}>Weights must sum to 100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderScoring = () => {
    const weighted = projects.map(p => {
      let total = 0;
      p.scores.forEach((s, i) => { total += s * (criteria[i].weight / 100); });
      return { ...p, total: Math.round(total * 100) / 100 };
    });
    const maxScore = Math.max(...weighted.map(w => w.total));

    return (
      <div ref={scoringRef} style={{ marginBottom: "12px" }}>
        <div style={S.sectionBanner(C.secondary)}>&#x1F4CA; WEIGHTED SCORING MATRIX</div>
        <CopyButton targetRef={scoringRef} label="Copy Section" />
        <table style={S.tbl}>
          <thead><tr>
            <th style={{ ...S.thSecondary, width: "20%" }}>Criterion (Weight)</th>
            {weighted.map((p, i) => (<th key={i} style={{ ...S.thSecondary, textAlign: "center" as const }}>{p.name}</th>))}
          </tr></thead>
          <tbody>
            {criteria.map((c, ci) => {
              const bg = ci % 2 === 1 ? C.rowAlt : C.white;
              return (<tr key={ci}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.name} ({c.weight}%)</td>
                {projects.map((p, pi) => {
                  const raw = p.scores[ci];
                  const ws = Math.round(raw * (c.weight / 100) * 100) / 100;
                  return (<td key={pi} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>
                    {raw > 0 ? <>{raw} <span style={{ color: C.textMuted, fontSize: "10px" }}>({ws})</span></> : "&#x2014;"}
                  </td>);
                })}
              </tr>);
            })}
            <tr>
              <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>WEIGHTED TOTAL</td>
              {weighted.map((p, i) => (
                <td key={i} style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, backgroundColor: p.total === maxScore && p.total > 0 ? C.accent : C.primary, color: C.white, fontSize: "14px" }}>
                  {p.total > 0 ? p.total.toFixed(2) : "&#x2014;"}
                  {p.total === maxScore && p.total > 0 && " &#x2B50;"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p style={S.subNote}>Score format: Raw Score (Weighted Score). Weighted Score = Raw &#xD7; Weight%. Highest total = recommended project.</p>
      </div>
    );
  };

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4DD; PROJECT SUMMARIES</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "16%" }}>Project</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "right" as const }}>Est. Cost</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Duration</th>
          <th style={S.thSecondary}>Key Benefits</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Risk</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Project Alpha", cost: "$[amount]", dur: "[X months]", benefits: "[e.g., 30% efficiency gain, regulatory compliance]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { name: "Project Beta", cost: "$[amount]", dur: "[X months]", benefits: "[e.g., $500K revenue increase, market expansion]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { name: "Project Gamma", cost: "$[amount]", dur: "[X months]", benefits: "[e.g., Technical debt reduction, platform modernization]", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { name: "[Project D]", cost: "$[amount]", dur: "[X months]", benefits: "[Key benefits]", risk: "&#x2014;", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg },
          ].map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700 }}>{p.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{p.cost}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{p.dur}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.benefits}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(p.rBg, p.rFg)}>{p.risk}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRecommendation = () => (
    <div ref={recommendRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F3C6; RECOMMENDATION &amp; DECISION</div>
      <CopyButton targetRef={recommendRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Recommended Project</td><td style={{ ...S.td0, fontWeight: 700 }}>[Project Alpha &#x2014; highest weighted score]</td></tr>
          <tr><td style={S.tdLabelAlt}>Rationale</td><td style={S.tdAlt}>[Summarize why this project ranks highest and best serves organizational strategy.]</td></tr>
          <tr><td style={S.tdLabel}>Alternate Selection</td><td style={S.td0}>[If constraints prevent #1, recommend Project Beta as second choice.]</td></tr>
          <tr><td style={S.tdLabelAlt}>Decision Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabel}>Decision Maker(s)</td><td style={S.td0}>[Name(s), Title(s)]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderCriteria()}{renderScoring()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderSummary()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderRecommendation()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderScoring()}{renderRecommendation()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Target size={11} /> Selection</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Target size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Selection Matrix</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management &#x2022; Initiating Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Weighted scoring model to evaluate and rank competing project proposals. Full Matrix includes criteria definitions and project summaries; Quick Compare shows the scoring matrix and recommendation only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function ProjectSelectionMatrixPage() {
  return (<ThemeProvider><ProjectSelectionMatrixContent /></ThemeProvider>);
}
