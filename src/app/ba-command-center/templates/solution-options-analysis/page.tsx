"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Analysis", desc: "Options + scoring + recommendation", icon: LayoutDashboard },
  { id: "compact", label: "Quick Compare", desc: "Comparison table only", icon: AlignJustify },
];

function SolutionOptionsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const scoringRef = useRef<HTMLDivElement>(null);
  const prosConsRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>⚖️ SOLUTION OPTIONS ANALYSIS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template evaluates multiple solution options against weighted criteria to support data-driven decision-making.</strong> Each option is described with its approach, cost, timeline, and risk profile, then scored against business-agreed evaluation criteria. A pros/cons summary and formal recommendation round out the analysis.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>build-vs-buy decisions, vendor selection,</strong> or <strong style={{ fontStyle: "italic" }}>choosing between competing technical or process solutions</strong>. Aligns with BABOK Knowledge Area: Solution Evaluation.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Prepared by</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Decision Needed By</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Problem / Opportunity</td>
            <td colSpan={3} style={S.td0}>[What business problem or opportunity are we solving? Brief statement.]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const OPTIONS = [
    { id: "A", name: "Build Custom Solution", color: "#2563EB", bg: "#DBEAFE", approach: "Build a custom web application in-house using React + Node.js with cloud deployment", cost: "$150K–$200K development + $3K/mo hosting", timeline: "6–8 months", risk: "Med", rBg: "#FEF3C7", rFg: "#D97706" },
    { id: "B", name: "Buy COTS Product (Vendor X)", color: "#7C3AED", bg: "#EDE9FE", approach: "License Vendor X's order management platform; configure to meet requirements; integrate via APIs", cost: "$80K license + $40K config + $5K/mo SaaS", timeline: "3–4 months", risk: "Low", rBg: "#D1FAE5", rFg: "#059669" },
    { id: "C", name: "Hybrid (Buy + Customize)", color: "#059669", bg: "#D1FAE5", approach: "License Vendor X for core functionality; build custom modules for unique requirements (bulk import, reporting)", cost: "$80K license + $60K custom dev + $5K/mo", timeline: "4–5 months", risk: "Med", rBg: "#FEF3C7", rFg: "#D97706" },
  ];

  const renderOptions = () => (
    <div ref={optionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 SOLUTION OPTIONS</div>
      <CopyButton targetRef={optionsRef} label="Copy Section" />
      {OPTIONS.map((opt, oi) => (
        <table key={oi} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr><td colSpan={2} style={{ backgroundColor: opt.bg, color: opt.color, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${opt.color}` }}>
              Option {opt.id}: {opt.name}
            </td></tr>
          </thead>
          <tbody>
            {[
              { q: "Approach", a: opt.approach },
              { q: "Estimated Cost", a: opt.cost },
              { q: "Timeline", a: opt.timeline },
            ].map((row, i) => {
              const isAlt = i % 2 === 1;
              return (
                <tr key={i}>
                  <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "18%" }}>{row.q}</td>
                  <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
                </tr>
              );
            })}
            <tr>
              <td style={S.tdLabel}>Risk Level</td>
              <td style={S.td0}><span style={S.badge(opt.rBg, opt.rFg)}>{opt.risk}</span></td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const CRITERIA = [
    { name: "Requirements Coverage", weight: 25, desc: "How many requirements does it fulfill?" },
    { name: "Total Cost of Ownership (5yr)", weight: 20, desc: "Upfront + ongoing costs over 5 years" },
    { name: "Time to Deliver", weight: 20, desc: "How quickly can we go live?" },
    { name: "Scalability & Flexibility", weight: 15, desc: "Can it grow with our needs?" },
    { name: "Risk Profile", weight: 10, desc: "Implementation and operational risk" },
    { name: "Vendor / Support", weight: 10, desc: "Quality of vendor support / internal capability" },
  ];
  const SCORES_RAW = [
    [9, 6, 8, 9, 6, 7],
    [7, 8, 9, 6, 9, 8],
    [8, 7, 8, 7, 7, 7],
  ];
  const totals = SCORES_RAW.map(scores => CRITERIA.reduce((sum, c, i) => sum + (scores[i] * c.weight / 100), 0));

  const renderScoring = () => (
    <div ref={scoringRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📊 WEIGHTED SCORING</td></tr></tbody></table>
      <CopyButton targetRef={scoringRef} label="Copy Section" />
      <table style={{ ...S.tbl, marginBottom: "6px" }}>
        <thead><tr><td colSpan={3} style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>EVALUATION CRITERIA &amp; WEIGHTS</td></tr></thead>
        <tbody>
          {CRITERIA.map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, width: "24%" }}>{c.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, width: "8%", fontWeight: 700, color: C.accent }}>{c.weight}%</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "20%" }}>Criterion</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Wt</th>
            {OPTIONS.map((o, i) => (
              <th key={i} style={{ ...S.thPrimary, textAlign: "center" as const, backgroundColor: o.bg, color: o.color }}>Opt {o.id}<br /><span style={{ fontSize: "8px" }}>{o.name}</span></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CRITERIA.map((c, ci) => {
            const bg = ci % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={ci}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{c.weight}%</td>
                {SCORES_RAW.map((scores, oi) => (
                  <td key={oi} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{scores[ci]}</td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 800 }} colSpan={2}>WEIGHTED TOTAL</td>
            {totals.map((t, i) => (
              <td key={i} style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", color: OPTIONS[i].color, backgroundColor: OPTIONS[i].bg }}>{t.toFixed(1)}</td>
            ))}
          </tr>
          <tr>
            <td style={S.tdLabelAlt} colSpan={2}>RANK</td>
            {totals.map((t, i) => {
              const sorted = [...totals].sort((a, b) => b - a);
              const rank = sorted.indexOf(t) + 1;
              return (
                <td key={i} style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 800, fontSize: "14px" }}>#{rank}{rank === 1 ? " ⭐" : ""}</td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderProsCons = () => (
    <div ref={prosConsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>👍👎 PROS &amp; CONS SUMMARY</div>
      <CopyButton targetRef={prosConsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {OPTIONS.map((opt, oi) => (
          <td key={oi} style={{ ...LC, width: "33.33%", padding: oi < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: opt.bg, color: opt.color, padding: "8px 10px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${opt.color}` }}>Option {opt.id}: {opt.name}</td></tr></thead>
              <tbody>
                <tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1px solid ${C.border}` }}>✅ PROS</td></tr>
                {["[Pro 1]", "[Pro 2]", "[Pro 3]"].map((p, i) => (
                  <tr key={`p${i}`}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "24px" }}>{p}</td></tr>
                ))}
                <tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1px solid ${C.border}` }}>❌ CONS</td></tr>
                {["[Con 1]", "[Con 2]"].map((c, i) => (
                  <tr key={`c${i}`}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "24px" }}>{c}</td></tr>
                ))}
              </tbody>
            </table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderRecommendation = () => (
    <div ref={recRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🏆 RECOMMENDATION</td></tr></tbody></table>
      <CopyButton targetRef={recRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Recommended Option", a: "[Option B / C / A — state the recommended option]" },
            { q: "Rationale", a: "[Summarize why this option is recommended based on scoring, risk, alignment with business objectives, and stakeholder input]" },
            { q: "Key trade-offs", a: "[What are we giving up vs. other options? e.g., Less customization flexibility with Option B but faster time to market]" },
            { q: "Conditions / Assumptions", a: "[e.g., Vendor contract negotiation successful; API covers 80%+ of integration needs; team capacity available in Q3]" },
            { q: "Risks with this option", a: "[Top 2-3 risks and mitigations]" },
            { q: "Next steps", a: "[e.g., Present to steering committee on [date]; begin vendor negotiations; create detailed implementation plan]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "20%" }}>Approver</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Role</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Decision</th>
            <th style={S.thPrimary}>Comments</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[Sponsor]", role: "Final Decision", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Tech Lead]", role: "Technical Feasibility", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Finance]", role: "Budget Approval", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.dBg, row.dFg)}>{row.dec}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>[MM/DD]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"><Scale size={11} /> Solution</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><Scale size={20} className="text-cyan-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Solution Options Analysis</h2>
              <p className="text-xs font-medium text-cyan-600">Options &bull; Weighted Scoring &bull; Pros/Cons &bull; Recommendation</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Evaluate competing solution options with weighted scoring, pros/cons summary, and formal recommendation with approval workflow. Full Analysis includes all sections; Quick Compare shows the scoring table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderOptions()}{renderScoring()}{renderProsCons()}{renderRecommendation()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderScoring()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SolutionOptionsPage() {
  return (<ThemeProvider><SolutionOptionsContent /></ThemeProvider>);
}
