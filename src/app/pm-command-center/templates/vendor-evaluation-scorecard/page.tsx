"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Award, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Scorecard", desc: "Scoring + comparison + recommendation", icon: LayoutDashboard },
  { id: "compact", label: "Quick Compare", desc: "Scoring matrix only", icon: AlignJustify },
];

function VendorEvaluationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const criteriaRef = useRef<HTMLDivElement>(null);
  const scoringRef = useRef<HTMLDivElement>(null);
  const prosConsRef = useRef<HTMLDivElement>(null);
  const recommendRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x1F3C6; VENDOR EVALUATION SCORECARD</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Vendor Evaluation Scorecard provides an objective, weighted comparison of vendor proposals against predefined selection criteria.</strong> Each evaluator scores independently, then scores are consolidated to produce a defensible vendor recommendation.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>vendor selection</strong> after receiving proposals. Aligns with PMBOK Procurement Management &#x2014; Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>RFP / Bid #</td><td style={{ ...S.td0, width: "32%" }}>[RFP-YYYY-###]</td></tr>
          <tr><td style={S.tdLabelAlt}>Evaluator</td><td style={S.tdAlt}>[Name, Title]</td><td style={S.tdLabelAlt}>Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabel}>Scoring Scale</td><td colSpan={3} style={S.td0}>1 = Does Not Meet &nbsp;|&nbsp; 2 = Partially Meets &nbsp;|&nbsp; 3 = Meets &nbsp;|&nbsp; 4 = Exceeds &nbsp;|&nbsp; 5 = Significantly Exceeds</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const criteria = [
    { name: "Technical Capability", weight: 30 },
    { name: "Cost / Value Proposition", weight: 25 },
    { name: "Experience &amp; References", weight: 15 },
    { name: "Support &amp; SLA Terms", weight: 15 },
    { name: "Cultural Fit &amp; Communication", weight: 10 },
    { name: "Financial Stability", weight: 5 },
  ];

  const vendors = [
    { name: "Vendor A", scores: [5, 3, 4, 4, 5, 4] },
    { name: "Vendor B", scores: [4, 5, 3, 3, 4, 5] },
    { name: "Vendor C", scores: [3, 4, 5, 5, 3, 3] },
    { name: "[Vendor D]", scores: [0, 0, 0, 0, 0, 0] },
  ];

  const renderCriteria = () => (
    <div ref={criteriaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x2696;&#xFE0F; EVALUATION CRITERIA</div>
      <CopyButton targetRef={criteriaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "28%" }}>Criterion</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Weight</th>
          <th style={S.thPrimary}>What to Evaluate</th>
        </tr></thead>
        <tbody>
          {criteria.map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const guides = [
              "[Proven technology expertise, demo quality, architecture approach, integration capability]",
              "[Total cost of ownership, pricing model transparency, hidden costs, payment flexibility]",
              "[Similar project references, industry experience, team qualifications, case studies]",
              "[Response times, availability, escalation paths, SLA penalties, maintenance approach]",
              "[Communication style, timezone compatibility, collaboration tools, team chemistry]",
              "[Company size, years in business, revenue stability, client retention rate]",
            ];
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{c.weight}%</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{guides[i]}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderScoring = () => {
    const weighted = vendors.map(v => {
      let total = 0;
      v.scores.forEach((s, i) => { total += s * (criteria[i].weight / 100); });
      return { ...v, total: Math.round(total * 100) / 100 };
    });
    const maxScore = Math.max(...weighted.map(w => w.total));

    return (
      <div ref={scoringRef} style={{ marginBottom: "12px" }}>
        <div style={S.sectionBanner(C.secondary)}>&#x1F4CA; WEIGHTED SCORING MATRIX</div>
        <CopyButton targetRef={scoringRef} label="Copy Section" />
        <table style={S.tbl}>
          <thead><tr>
            <th style={{ ...S.thSecondary, width: "22%" }}>Criterion (Weight)</th>
            {weighted.map((v, i) => (<th key={i} style={{ ...S.thSecondary, textAlign: "center" as const }}>{v.name}</th>))}
          </tr></thead>
          <tbody>
            {criteria.map((c, ci) => {
              const bg = ci % 2 === 1 ? C.rowAlt : C.white;
              return (<tr key={ci}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.name} ({c.weight}%)</td>
                {vendors.map((v, vi) => {
                  const raw = v.scores[ci];
                  const ws = Math.round(raw * (c.weight / 100) * 100) / 100;
                  return (<td key={vi} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>
                    {raw > 0 ? <>{raw} <span style={{ color: C.textMuted, fontSize: "10px" }}>({ws})</span></> : <span style={{ color: C.textMuted }}>&#x2014;</span>}
                  </td>);
                })}
              </tr>);
            })}
            <tr>
              <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>WEIGHTED TOTAL</td>
              {weighted.map((v, i) => (
                <td key={i} style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, backgroundColor: v.total === maxScore && v.total > 0 ? C.accent : C.primary, color: C.white, fontSize: "14px" }}>
                  {v.total > 0 ? v.total.toFixed(2) : "&#x2014;"}
                  {v.total === maxScore && v.total > 0 && " &#x2B50;"}
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ ...S.td0, fontWeight: 700, backgroundColor: C.secondary, color: C.white }}>RANK</td>
              {weighted.map((v, i) => {
                const sorted = [...weighted].filter(w => w.total > 0).sort((a, b) => b.total - a.total);
                const rank = sorted.findIndex(w => w.name === v.name) + 1;
                return (<td key={i} style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, backgroundColor: C.secondary, color: C.white, fontSize: "13px" }}>
                  {v.total > 0 ? `#${rank}` : "&#x2014;"}
                </td>);
              })}
            </tr>
          </tbody>
        </table>
        <p style={S.subNote}>Score format: Raw Score (Weighted Score). Weighted = Raw &#xD7; Weight%. Highest weighted total = recommended vendor.</p>
      </div>
    );
  };

  const renderProsCons = () => (
    <div ref={prosConsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4DD; VENDOR STRENGTHS &amp; CONCERNS</div>
      <CopyButton targetRef={prosConsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "16%" }}>Vendor</th>
          <th style={{ ...S.thSecondary, width: "42%", color: "#059669" }}>&#x2705; Strengths</th>
          <th style={{ ...S.thSecondary, width: "42%", color: "#DC2626" }}>&#x26A0;&#xFE0F; Concerns</th>
        </tr></thead>
        <tbody>
          {[
            { vendor: "Vendor A", pros: "[Best technical demo; strong cultural fit; dedicated PM assigned]", cons: "[Highest cost; less experienced with our ERP system]" },
            { vendor: "Vendor B", pros: "[Best price; financially strongest; extensive reference list]", cons: "[Weaker demo; timezone challenges; less responsive during eval]" },
            { vendor: "Vendor C", pros: "[Best references; strongest SLA terms; most experienced team]", cons: "[Mid-range cost; smaller company; communication style formal]" },
          ].map((v, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{v.vendor}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{v.pros}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{v.cons}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRecommend = () => (
    <div ref={recommendRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F3C6; RECOMMENDATION &amp; DECISION</div>
      <CopyButton targetRef={recommendRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Recommended Vendor</td><td style={{ ...S.td0, fontWeight: 700 }}>[Vendor A &#x2014; highest weighted score of X.XX]</td></tr>
          <tr><td style={S.tdLabelAlt}>Rationale</td><td style={S.tdAlt}>[Summarize why this vendor is the best choice, addressing both strengths and mitigations for concerns.]</td></tr>
          <tr><td style={S.tdLabel}>Proposed Contract Type</td><td style={S.td0}>[e.g., Time &amp; Materials with not-to-exceed cap of $XX,XXX]</td></tr>
          <tr><td style={S.tdLabelAlt}>Negotiation Points</td><td style={S.tdAlt}>[e.g., Negotiate 10% discount for multi-year commitment; stronger SLA penalties; IP ownership clause]</td></tr>
          <tr><td style={S.tdLabel}>Alternative Vendor</td><td style={S.td0}>[Vendor C as backup if negotiations fail with Vendor A]</td></tr>
          <tr><td style={S.tdLabelAlt}>Decision Required By</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Approver</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Decision</th>
          <th style={S.thSecondary}>Comments</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Project Sponsor]", dec: "Approve", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { name: "[Procurement Manager]", dec: "Pending", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
            { name: "[Legal]", dec: "Pending", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{a.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.dBg, a.dFg)}>{a.dec}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>&nbsp;</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
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
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderProsCons()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderRecommend()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderScoring()}{renderRecommend()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Award size={11} /> Vendor Eval</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Award size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Vendor Evaluation Scorecard</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Procurement Management &#x2022; Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Weighted scoring comparison of vendor proposals with strengths/concerns analysis and recommendation. Full Scorecard includes all sections; Quick Compare shows the scoring matrix and recommendation.</p>
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

export default function VendorEvaluationScorecardPage() {
  return (<ThemeProvider><VendorEvaluationContent /></ThemeProvider>);
}
