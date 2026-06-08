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
  { id: "full", label: "Full SWOT", desc: "Grid + strategies + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick SWOT", desc: "Grid only", icon: AlignJustify },
];

function SWOTContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stratRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🎯 SWOT ANALYSIS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides the classic Strengths, Weaknesses, Opportunities, and Threats framework for strategic analysis.</strong> The 2×2 grid captures internal (S/W) and external (O/T) factors, while the TOWS strategy matrix converts insights into actionable strategies. Use it to evaluate a project, product, organization, or solution option.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>project feasibility assessment, solution evaluation,</strong> or <strong style={{ fontStyle: "italic" }}>strategic planning workshops</strong>. Aligns with BABOK Technique: SWOT Analysis.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Subject</td>
            <td style={{ ...S.td0, width: "36%" }}>[What is being analyzed — project, product, org, solution option]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Prepared by</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Participants</td>
            <td style={S.tdAlt}>[List stakeholders involved]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const quadrants = [
    { title: "STRENGTHS", sub: "Internal — Positive", icon: "💪", color: "#059669", bg: "#D1FAE5", items: [
      "[e.g., Strong domain expertise in the team]",
      "[e.g., Existing customer base of 10K+ users]",
      "[e.g., Modern tech stack already in place]",
      "[e.g., Executive sponsorship and budget approved]",
      "[Add strength]",
    ]},
    { title: "WEAKNESSES", sub: "Internal — Negative", icon: "⚡", color: "#DC2626", bg: "#FEE2E2", items: [
      "[e.g., Legacy data quality issues — 15% error rate]",
      "[e.g., No dedicated UX resource on team]",
      "[e.g., Limited experience with cloud migration]",
      "[e.g., Key SME leaving in 3 months]",
      "[Add weakness]",
    ]},
    { title: "OPPORTUNITIES", sub: "External — Positive", icon: "🚀", color: "#2563EB", bg: "#DBEAFE", items: [
      "[e.g., Market demand for self-service portals growing 30% YoY]",
      "[e.g., New API from vendor enables real-time integration]",
      "[e.g., Competitor's product has major UX complaints]",
      "[e.g., Regulatory change creates urgency for compliance features]",
      "[Add opportunity]",
    ]},
    { title: "THREATS", sub: "External — Negative", icon: "⚠️", color: "#D97706", bg: "#FEF3C7", items: [
      "[e.g., Competitor launching similar product in Q4]",
      "[e.g., Budget cuts possible due to economic conditions]",
      "[e.g., Vendor may deprecate key API in 12 months]",
      "[e.g., New data privacy regulations may add scope]",
      "[Add threat]",
    ]},
  ];

  const renderGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📊 SWOT GRID</td></tr></tbody></table>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <table style={LT}><tbody>
        <tr>
          <td style={{ ...LC, width: "50%", paddingRight: "4px", paddingBottom: "4px" }}>
            {renderQuadrant(quadrants[0])}
          </td>
          <td style={{ ...LC, width: "50%", paddingLeft: "4px", paddingBottom: "4px" }}>
            {renderQuadrant(quadrants[1])}
          </td>
        </tr>
        <tr>
          <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
            {renderQuadrant(quadrants[2])}
          </td>
          <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
            {renderQuadrant(quadrants[3])}
          </td>
        </tr>
      </tbody></table>
    </div>
  );

  const renderQuadrant = (q: typeof quadrants[0]) => (
    <table style={S.tbl}>
      <thead>
        <tr><td style={{ backgroundColor: q.bg, color: q.color, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${q.color}` }}>
          {q.icon} {q.title}<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "2px", opacity: 0.7 }}>{q.sub}</div>
        </td></tr>
      </thead>
      <tbody>
        {q.items.map((item, i) => (
          <tr key={i}>
            <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, paddingLeft: "12px" }}>
              <span style={{ fontWeight: 700, color: q.color, marginRight: "6px" }}>{i + 1}.</span> {item}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderStrategies = () => (
    <div ref={stratRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🧠 TOWS STRATEGY MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={stratRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Combine SWOT factors to generate strategies. Each quadrant pairs internal factors with external factors.</p>
      <table style={LT}><tbody>
        <tr>
          <td style={{ ...LC, width: "50%", paddingRight: "4px", paddingBottom: "4px" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>SO — Strengths × Opportunities<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px" }}>Use strengths to capitalize on opportunities</div></td></tr></thead>
              <tbody>
                {["[e.g., Leverage domain expertise + market demand to build premium self-service features]", "[e.g., Use modern tech stack to rapidly integrate new vendor APIs]", "[Add SO strategy]"].map((s, i) => (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "28px" }}>{s}</td></tr>
                ))}
              </tbody>
            </table>
          </td>
          <td style={{ ...LC, width: "50%", paddingLeft: "4px", paddingBottom: "4px" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WO — Weaknesses × Opportunities<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px" }}>Address weaknesses to capture opportunities</div></td></tr></thead>
              <tbody>
                {["[e.g., Hire UX contractor to capitalize on competitor's poor UX]", "[e.g., Use regulatory urgency to justify data quality cleanup project]", "[Add WO strategy]"].map((s, i) => (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "28px" }}>{s}</td></tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#2563EB", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #2563EB" }}>ST — Strengths × Threats<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px" }}>Use strengths to mitigate threats</div></td></tr></thead>
              <tbody>
                {["[e.g., Use executive sponsorship to protect budget during potential cuts]", "[e.g., Leverage existing customer base loyalty to counter competitor launch]", "[Add ST strategy]"].map((s, i) => (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "28px" }}>{s}</td></tr>
                ))}
              </tbody>
            </table>
          </td>
          <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>WT — Weaknesses × Threats<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px" }}>Minimize weaknesses to avoid threats</div></td></tr></thead>
              <tbody>
                {["[e.g., Prioritize cloud migration training before vendor deprecates API]", "[e.g., Document SME knowledge before departure to reduce single-point-of-failure risk]", "[Add WT strategy]"].map((s, i) => (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "28px" }}>{s}</td></tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 PRIORITY ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Action</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Source</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Timeline</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "[e.g., Document SME knowledge before departure]", src: "WT", sBg: "#FEE2E2", sFg: "#DC2626", owner: "[BA]", time: "[Next 2 wks]", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626" },
            { action: "[e.g., Hire UX contractor for portal design]", src: "WO", sBg: "#FEF3C7", sFg: "#D97706", owner: "[PM]", time: "[This sprint]", pri: "P1", priBg: "#FEE2E2", priFg: "#DC2626" },
            { action: "[e.g., Begin competitive analysis of competitor's Q4 launch]", src: "ST", sBg: "#DBEAFE", sFg: "#2563EB", owner: "[Product]", time: "[Next month]", pri: "P2", priBg: "#FEF3C7", priFg: "#D97706" },
            { action: "[Add action]", src: "—", sBg: "#F3F4F6", sFg: "#6B7280", owner: "", time: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.src}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Target size={11} /> SWOT</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Target size={20} className="text-amber-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">SWOT Analysis</h2>
              <p className="text-xs font-medium text-amber-600">Strengths &bull; Weaknesses &bull; Opportunities &bull; Threats &bull; TOWS</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Classic SWOT grid with color-coded quadrants plus TOWS strategy matrix for converting insights into actionable strategies. Full SWOT includes TOWS and priority actions; Quick SWOT is the grid only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderGrid()}{renderStrategies()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderGrid()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SWOTAnalysisPage() {
  return (<ThemeProvider><SWOTContent /></ThemeProvider>);
}
