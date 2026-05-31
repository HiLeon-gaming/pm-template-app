"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Selector", desc: "Scoring + comparison + decision", icon: LayoutDashboard },
  { id: "compact", label: "Quick Selector", desc: "Scoring framework only", icon: AlignJustify },
];

function DeliveryApproachSelectorContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scoringRef = useRef<HTMLDivElement>(null);
  const compRef = useRef<HTMLDivElement>(null);
  const tradeoffRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⭐ DELIVERY APPROACH SELECTOR</td></tr>
      <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Decision framework to choose Predictive vs Hybrid vs Agile.</strong> Score your project against key factors, compare approaches, understand tradeoffs, and document your decision with confidence.<br /><br /><strong style={{ fontStyle: "italic" }}>⭐ ALL-STAR PAGE:</strong> Helps you pick a model confidently and explain it to stakeholders.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Assessed By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Reviewed By</td><td style={S.tdAlt}>[PMO Director / Sponsor]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderScoring = () => (
    <div ref={scoringRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 APPROACH SCORING FRAMEWORK</div>
      <CopyButton targetRef={scoringRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Factor</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "6%", textAlign: "center" as const }}>Wt</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "22%", textAlign: "center" as const }}>← Favors Predictive (1–3)</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "22%", textAlign: "center" as const }}>Favors Agile (7–10) →</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "6%", textAlign: "center" as const }}>Score</th>
        </tr></thead>
        <tbody>
          {[
            { factor: "Requirements Stability", pred: "Well-defined, unlikely to change", agile: "Evolving, expect significant change", score: "[6]" },
            { factor: "Stakeholder Availability", pred: "Limited availability; formal reviews", agile: "Highly available; continuous collaboration", score: "[7]" },
            { factor: "Team Experience with Approach", pred: "Experienced with waterfall/sequential", agile: "Experienced with agile/iterative", score: "[7]" },
            { factor: "Organizational Culture", pred: "Hierarchical; formal approval culture", agile: "Collaborative; empowered teams", score: "[5]" },
            { factor: "Regulatory / Compliance", pred: "Heavy compliance; audit trail required", agile: "Minimal compliance; flexibility OK", score: "[3]" },
            { factor: "Project Size / Duration", pred: "Large, long-duration (&gt;12 months)", agile: "Small-medium, shorter cycles", score: "[6]" },
            { factor: "Uncertainty / Complexity", pred: "Low uncertainty; known solution", agile: "High uncertainty; emergent solution", score: "[7]" },
            { factor: "Need for Early Delivery", pred: "Single delivery at end is acceptable", agile: "Incremental value delivery critical", score: "[8]" },
            { factor: "Technology Maturity", pred: "Mature, stable technology", agile: "New or rapidly evolving technology", score: "[6]" },
            { factor: "Vendor / External Dependencies", pred: "Many fixed-scope vendor contracts", agile: "Few dependencies; internal team", score: "[4]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.factor}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>1</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#64748B" }}>{r.pred}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#64748B" }}>{r.agile}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.score}</td>
            </tr>);
          })}
          <tr>
            <td colSpan={4} style={{ ...S.td0, fontWeight: 800, backgroundColor: "#0D9488", color: C.white, textAlign: "right" as const, padding: "8px 14px" }}>TOTAL SCORE (out of 100)</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: "#0D9488", color: C.white, textAlign: "center" as const, fontSize: "14px" }}>[59]</td>
          </tr>
        </tbody>
      </table>
      <p style={S.subNote}>1–30 = Predictive recommended &nbsp;|&nbsp; 31–50 = Hybrid (predictive-leaning) &nbsp;|&nbsp; 51–70 = Hybrid (agile-leaning) &nbsp;|&nbsp; 71–100 = Agile recommended</p>
    </div>
  );

  const renderComp = () => (
    <div ref={compRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>🔄 APPROACH COMPARISON</td></tr></tbody></table>
      <CopyButton targetRef={compRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Dimension</th>
          <th style={{ ...S.thSecondary, width: "28%" }}>Predictive</th>
          <th style={{ ...S.thSecondary, width: "28%", backgroundColor: "#0D9488", color: C.white }}>⭐ Hybrid (Selected)</th>
          <th style={{ ...S.thSecondary, width: "28%" }}>Agile</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Planning", pred: "Upfront, detailed", hybrid: "Phased + sprint-level", agile: "Just-in-time, rolling wave" },
            { dim: "Scope Management", pred: "Fixed scope baseline", hybrid: "Fixed phases, flexible features", agile: "Evolving product backlog" },
            { dim: "Change Handling", pred: "Formal CCB for all changes", hybrid: "CCB for major; PM for minor", agile: "Backlog reprioritization" },
            { dim: "Delivery", pred: "Single delivery at end", hybrid: "Increments within phases", agile: "Continuous / per sprint" },
            { dim: "Reporting", pred: "EVM, milestone-based", hybrid: "EVM + velocity + burndown", agile: "Burndown, velocity, demos" },
            { dim: "Risk Management", pred: "Upfront identification + periodic review", hybrid: "Continuous + sprint retrospectives", agile: "Continuous, embedded in ceremonies" },
            { dim: "Team Structure", pred: "Functional, PM-directed", hybrid: "Cross-functional, PM-coached", agile: "Self-organizing, servant leadership" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.dim}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.pred}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#0D9488" }}>{r.hybrid}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.agile}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTradeoff = () => (
    <div ref={tradeoffRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ TRADEOFFS &amp; RISKS OF CHOSEN APPROACH</div>
      <CopyButton targetRef={tradeoffRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={S.thSecondary}>Tradeoff / Risk</th><th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Impact</th><th style={S.thSecondary}>Mitigation</th></tr></thead>
        <tbody>
          {[
            { t: "[Team may struggle with dual planning modes (phase + sprint)]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, m: "[Conduct hybrid methodology workshop in Week 1; assign Scrum Master]" },
            { t: "[Stakeholders accustomed to waterfall may resist incremental delivery]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, m: "[Educate sponsors on incremental value; show early wins in Sprint 1-2]" },
            { t: "[Compliance requirements may slow sprint delivery for financial modules]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, m: "[Separate compliance track with formal gates; agile for non-regulated features]" },
            { t: "[Vendor contracts may not align with sprint cadence]", impact: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg, m: "[Negotiate milestone-based payments aligned to sprint deliverables]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.t}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.m}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecision = () => (
    <div ref={decisionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>✅ DELIVERY APPROACH DECISION</td></tr></tbody></table>
      <CopyButton targetRef={decisionRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Selected Approach</td><td style={S.td0}><span style={{ ...S.badge("#CCFBF1", "#0D9488"), fontSize: "12px", fontWeight: 800 }}>HYBRID (Agile-Leaning)</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Decision Rationale</td><td style={S.tdAlt}>[Score of 59/100 indicates hybrid approach. Requirements are moderately stable but need for early value delivery and evolving technology favor agile practices. Regulatory constraints require predictive controls for financial modules.]</td></tr>
        <tr><td style={S.tdLabel}>What This Means in Practice</td><td style={S.td0}>[Predictive phase gates for milestones + 2-week agile sprints for development. Formal change control for &gt;$5K impacts. Sprint demos for stakeholder feedback. EVM at phase level, velocity at sprint level.]</td></tr>
        <tr><td style={S.tdLabelAlt}>When to Reassess</td><td style={S.tdAlt}>[If requirements volatility exceeds 30% per phase, or if team velocity drops below 60% of baseline for 3 consecutive sprints.]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <thead><tr><th style={S.thSecondary}>Approver</th><th style={S.thSecondary}>Name</th><th style={{ ...S.thSecondary, width: "20%" }}>Signature</th><th style={{ ...S.thSecondary, width: "10%" }}>Date</th></tr></thead>
        <tbody>
          {["Project Sponsor", "PMO Director"].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{r}</td><td style={{ ...S.td0, backgroundColor: bg }}>[Name]</td><td style={{ ...S.td0, backgroundColor: bg }}>__________________</td><td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD]</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderScoring()}{renderComp()}{renderTradeoff()}{renderDecision()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderScoring()}{renderDecision()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Delivery Approach Selector</h2><p className="text-xs font-medium text-teal-600">Predictive vs Hybrid vs Agile • ⭐ All-Star</p></div></div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured decision framework to choose and defend your delivery approach. Score, compare, and document with stakeholder approval.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DeliveryApproachSelectorPage() {
  return (<ThemeProvider><DeliveryApproachSelectorContent /></ThemeProvider>);
}
