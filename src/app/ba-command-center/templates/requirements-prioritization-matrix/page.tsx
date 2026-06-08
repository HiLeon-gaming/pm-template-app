"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListOrdered, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "moscow" | "weighted";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "moscow", label: "MoSCoW", desc: "Must/Should/Could/Won't", icon: LayoutDashboard },
  { id: "weighted", label: "Weighted Scoring", desc: "Criteria-based scoring", icon: AlignJustify },
];

function PrioritizationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("moscow");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const moscowRef = useRef<HTMLDivElement>(null);
  const weightedRef = useRef<HTMLDivElement>(null);
  const consensusRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📊 REQUIREMENTS PRIORITIZATION MATRIX</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides two proven frameworks for prioritizing requirements: MoSCoW and Weighted Scoring.</strong> MoSCoW sorts requirements into Must/Should/Could/Won&apos;t categories for fast consensus. Weighted Scoring uses objective criteria (business value, risk, cost, effort) with stakeholder-agreed weights for data-driven prioritization.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>backlog refinement, scope negotiation,</strong> or <strong style={{ fontStyle: "italic" }}>resolving stakeholder conflicts about what to build first</strong>. Aligns with BABOK Technique: Prioritization.
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
            <td style={S.tdLabelAlt}>Facilitated by</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Participants</td>
            <td style={S.tdAlt}>[List key stakeholders involved in prioritization]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Total Requirements</td>
            <td style={S.td0}>[___] requirements to prioritize</td>
            <td style={S.tdLabel}>Method Used</td>
            <td style={S.td0}>☐ MoSCoW ☐ Weighted Scoring ☐ Both</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const MOSCOW_CATS = [
    { label: "MUST HAVE", sub: "Critical — system cannot function without these", color: "#DC2626", bg: "#FEE2E2", icon: "🔴", items: [
      { id: "FR-001", desc: "[e.g., Create new order via web portal]", rationale: "[Cannot process orders without this — core business function]" },
      { id: "FR-002", desc: "[e.g., Form validation with inline errors]", rationale: "[Data integrity requirement — prevents bad data entry]" },
      { id: "NFR-010", desc: "[e.g., RBAC for all modules]", rationale: "[Security compliance — non-negotiable]" },
      { id: "[Add]", desc: "", rationale: "" },
    ]},
    { label: "SHOULD HAVE", sub: "Important but not critical — workaround exists", color: "#D97706", bg: "#FEF3C7", icon: "🟡", items: [
      { id: "FR-003", desc: "[e.g., Save draft orders]", rationale: "[Users can start over if needed — inconvenient but not blocking]" },
      { id: "FR-011", desc: "[e.g., Email notifications on status change]", rationale: "[Users can check status manually; notification is convenience]" },
      { id: "[Add]", desc: "", rationale: "" },
    ]},
    { label: "COULD HAVE", sub: "Nice to have — included only if time/budget allows", color: "#2563EB", bg: "#DBEAFE", icon: "🔵", items: [
      { id: "FR-020", desc: "[e.g., Customer favorites / saved orders]", rationale: "[Improves UX for repeat customers — not essential for launch]" },
      { id: "[Add]", desc: "", rationale: "" },
    ]},
    { label: "WON'T HAVE (this release)", sub: "Explicitly excluded — documented for future phases", color: "#6B7280", bg: "#F3F4F6", icon: "⚫", items: [
      { id: "FR-030", desc: "[e.g., Mobile app for order management]", rationale: "[Separate initiative — web-first approach for Phase 1]" },
      { id: "[Add]", desc: "", rationale: "" },
    ]},
  ];

  const renderMoSCoW = () => (
    <div ref={moscowRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🏷️ MoSCoW PRIORITIZATION</td></tr></tbody></table>
      <CopyButton targetRef={moscowRef} label="Copy Section" />
      {MOSCOW_CATS.map((cat, ci) => (
        <table key={ci} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr><td colSpan={3} style={{ backgroundColor: cat.bg, color: cat.color, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${cat.color}` }}>
              {cat.icon} {cat.label}<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "2px", opacity: 0.7 }}>{cat.sub}</div>
            </td></tr>
            <tr>
              <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Req ID</th>
              <th style={S.thSecondary}>Requirement</th>
              <th style={{ ...S.thSecondary, width: "30%" }}>Rationale</th>
            </tr>
          </thead>
          <tbody>
            {cat.items.map((item, i) => {
              const bg = i % 2 === 1 ? C.rowAlt : C.white;
              return (
                <tr key={i}>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{item.id}</td>
                  <td style={{ ...S.td0, backgroundColor: bg }}>{item.desc}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{item.rationale}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );

  const CRITERIA = [
    { name: "Business Value", weight: 35, desc: "Revenue impact, strategic alignment" },
    { name: "Risk if Excluded", weight: 25, desc: "Compliance, security, operational risk" },
    { name: "Implementation Cost", weight: 20, desc: "Dev effort, infrastructure, licenses (lower = better)" },
    { name: "Stakeholder Demand", weight: 20, desc: "Frequency of stakeholder requests" },
  ];

  const SCORED = [
    { id: "FR-001", desc: "Create new order", scores: [9, 10, 7, 9], total: 0 },
    { id: "FR-002", desc: "Form validation", scores: [8, 9, 9, 7], total: 0 },
    { id: "FR-003", desc: "Save draft orders", scores: [6, 4, 8, 6], total: 0 },
    { id: "FR-010", desc: "Real-time status badges", scores: [7, 6, 6, 8], total: 0 },
    { id: "FR-011", desc: "Email notifications", scores: [5, 3, 7, 7], total: 0 },
    { id: "NFR-010", desc: "RBAC security", scores: [8, 10, 5, 4], total: 0 },
    { id: "[Add]", desc: "", scores: [0, 0, 0, 0], total: 0 },
  ].map(r => ({ ...r, total: CRITERIA.reduce((sum, c, i) => sum + (r.scores[i] * c.weight / 100), 0) }))
   .sort((a, b) => b.total - a.total);

  const renderWeighted = () => (
    <div ref={weightedRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>⚖️ WEIGHTED SCORING MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={weightedRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Score each requirement 1-10 against each criterion. Weighted total = Σ(score × weight). Higher score = higher priority.</p>
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead><tr><td colSpan={3} style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>CRITERIA &amp; WEIGHTS</td></tr></thead>
        <tbody>
          {CRITERIA.map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, width: "20%" }}>{c.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, width: "10%", fontWeight: 700, color: C.accent }}>{c.weight}%</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Req ID</th>
            <th style={{ ...S.thPrimary, width: "18%" }}>Requirement</th>
            {CRITERIA.map((c, i) => (
              <th key={i} style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>{c.name.split(" ")[0]}<br /><span style={{ fontSize: "8px", fontWeight: 500 }}>({c.weight}%)</span></th>
            ))}
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const, backgroundColor: C.accent, color: C.white }}>TOTAL</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Rank</th>
          </tr>
        </thead>
        <tbody>
          {SCORED.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                {row.scores.map((s, si) => (
                  <td key={si} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{s || ""}</td>
                ))}
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent, fontSize: "14px" }}>{row.total ? row.total.toFixed(1) : ""}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800 }}>{row.total ? `#${i + 1}` : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConsensus = () => (
    <div ref={consensusRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🤝 STAKEHOLDER CONSENSUS</td></tr></tbody></table>
      <CopyButton targetRef={consensusRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Agreement level", a: "☐ Full consensus ☐ Majority agreement ☐ Escalation needed" },
            { q: "Disagreements / Conflicts", a: "[e.g., Marketing wants FR-020 as Must; Engineering says Could due to complexity — escalated to sponsor]" },
            { q: "Resolution approach", a: "[e.g., Sponsor decided FR-020 is Should for Phase 1; revisit at Sprint 6 review]" },
            { q: "Items requiring re-prioritization", a: "[List any items that need to be revisited after more information is available]" },
            { q: "Next prioritization review", a: "[Date] — [Trigger: end of Sprint X / new requirements added / scope change]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "26%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "34px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📊 PRIORITIZATION SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Must Have", count: "[___]", pct: "[___]%", color: "#DC2626", bg: "#FEE2E2" },
          { label: "Should Have", count: "[___]", pct: "[___]%", color: "#D97706", bg: "#FEF3C7" },
          { label: "Could Have", count: "[___]", pct: "[___]%", color: "#2563EB", bg: "#DBEAFE" },
          { label: "Won't Have", count: "[___]", pct: "[___]%", color: "#6B7280", bg: "#F3F4F6" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}>
              <tbody>
                <tr><td style={{ backgroundColor: item.bg, color: item.color, padding: "12px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, textAlign: "center" as const, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${item.color}` }}>{item.label}</td></tr>
                <tr><td style={{ ...S.td0, textAlign: "center" as const, padding: "10px", fontSize: "20px", fontWeight: 800, color: item.color }}>{item.count}<div style={{ fontSize: "10px", fontWeight: 500, color: "#6B7280" }}>{item.pct} of total</div></td></tr>
              </tbody>
            </table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><ListOrdered size={11} /> Priority</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><ListOrdered size={20} className="text-orange-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Requirements Prioritization Matrix</h2>
              <p className="text-xs font-medium text-orange-600">MoSCoW &bull; Weighted Scoring &bull; Stakeholder Consensus</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Prioritize requirements using MoSCoW categorization or weighted scoring with objective criteria. Both layouts include stakeholder consensus tracking and prioritization summary.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "moscow" && <>{renderTitleBanner()}{renderDateHeader()}{renderMoSCoW()}{renderConsensus()}{renderSummary()}{renderFooter()}</>}
          {layout === "weighted" && <>{renderTitleBanner()}{renderDateHeader()}{renderWeighted()}{renderConsensus()}{renderSummary()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RequirementsPrioritizationPage() {
  return (<ThemeProvider><PrioritizationContent /></ThemeProvider>);
}
