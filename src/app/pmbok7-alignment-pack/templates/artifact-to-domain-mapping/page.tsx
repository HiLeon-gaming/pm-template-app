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
  { id: "full", label: "Full Matrix", desc: "Artifacts + domains + principles", icon: LayoutDashboard },
  { id: "compact", label: "Quick Matrix", desc: "Artifact-to-domain map only", icon: AlignJustify },
];

function ArtifactToDomainMappingContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const principleRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⭐ ARTIFACT-TO-DOMAIN MAPPING MATRIX</td></tr>
        <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>Map your existing project artifacts to PMBOK 7’s 8 Performance Domains + 12 Principles.</strong> This matrix lets you instantly prove alignment and identify coverage gaps. Fill in your actual artifacts and check which domains/principles they support.<br /><br />
          <strong style={{ fontStyle: "italic" }}>⭐ ALL-STAR PAGE:</strong> De-risks the “are we really PMBOK 7 aligned?” question instantly.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Prepared By</td><td style={{ ...S.td0, width: "32%" }}>[Name, PMP]</td></tr>
          <tr><td style={S.tdLabelAlt}>Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const dAbbr = ["STK", "TM", "DA", "PLN", "PW", "DLV", "MSR", "UNC"];
  const dFull = ["Stakeholder", "Team", "Dev Approach", "Planning", "Project Work", "Delivery", "Measurement", "Uncertainty"];

  const artifacts = [
    { artifact: "Project Charter", source: "Command Center", domains: [1, 0, 1, 1, 0, 0, 0, 0] },
    { artifact: "Stakeholder Register", source: "Command Center", domains: [1, 0, 0, 0, 0, 0, 0, 0] },
    { artifact: "Project Management Plan", source: "Command Center", domains: [0, 0, 1, 1, 1, 0, 0, 0] },
    { artifact: "WBS / Scope Statement", source: "Command Center", domains: [0, 0, 0, 1, 1, 1, 0, 0] },
    { artifact: "Schedule / Milestones", source: "Command Center", domains: [0, 0, 0, 1, 1, 1, 1, 0] },
    { artifact: "Budget / Cost Baseline", source: "Command Center", domains: [0, 0, 0, 1, 0, 0, 1, 0] },
    { artifact: "Risk Register", source: "Command Center", domains: [0, 0, 0, 0, 0, 0, 0, 1] },
    { artifact: "RACI Matrix", source: "Command Center", domains: [0, 1, 0, 1, 1, 0, 0, 0] },
    { artifact: "Status Report", source: "Command Center", domains: [1, 0, 0, 0, 1, 1, 1, 0] },
    { artifact: "Change Control Log", source: "Command Center", domains: [0, 0, 0, 0, 1, 0, 0, 0] },
    { artifact: "Alignment Dashboard", source: "This Pack", domains: [1, 1, 1, 1, 1, 1, 1, 1] },
    { artifact: "Tailoring Strategy", source: "This Pack", domains: [0, 0, 1, 1, 1, 0, 0, 0] },
    { artifact: "Domain Health Checks", source: "This Pack", domains: [1, 1, 1, 1, 1, 1, 1, 1] },
    { artifact: "Measurement Blueprint", source: "This Pack", domains: [0, 0, 0, 0, 0, 1, 1, 0] },
    { artifact: "Uncertainty Playbook", source: "This Pack", domains: [0, 0, 0, 0, 0, 0, 0, 1] },
    { artifact: "[Your Artifact]", source: "[Source]", domains: [0, 0, 0, 0, 0, 0, 0, 0] },
  ];

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🗺️ ARTIFACT → PERFORMANCE DOMAIN MAPPING</div>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Artifact</th>
            <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "8%", fontSize: "9px" }}>Source</th>
            {dAbbr.map((d, i) => (
              <th key={i} style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "5%", textAlign: "center" as const, fontSize: "8px", padding: "6px 2px" }}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {artifacts.map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{a.artifact}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: a.source === "This Pack" ? "#0D9488" : "#64748B" }}>{a.source}</td>
              {a.domains.map((d, j) => (
                <td key={j} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>{d ? "✅" : ""}</td>
              ))}
            </tr>);
          })}
          <tr>
            <td colSpan={2} style={{ ...S.td0, fontWeight: 800, backgroundColor: "#0D9488", color: C.white }}>DOMAIN COVERAGE COUNT</td>
            {dAbbr.map((_, j) => {
              const count = artifacts.reduce((sum, a) => sum + a.domains[j], 0);
              return <td key={j} style={{ ...S.td0, fontWeight: 800, backgroundColor: "#0D9488", color: C.white, textAlign: "center" as const }}>{count}</td>;
            })}
          </tr>
        </tbody>
      </table>
      <p style={S.subNote}>Legend: STK = Stakeholder • TM = Team • DA = Dev Approach • PLN = Planning • PW = Project Work • DLV = Delivery • MSR = Measurement • UNC = Uncertainty</p>
    </div>
  );

  const principles = [
    { principle: "Stewardship", artifacts: "[Charter, Governance Map, Ethics decisions]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Team", artifacts: "[RACI, Working Agreements, Team Health Check]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Stakeholders", artifacts: "[Stakeholder Register, Engagement Plan, Stakeholder Health Check]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Value", artifacts: "[Business Case, Benefits Tracker, Value Practice Page]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Systems Thinking", artifacts: "[Context Snapshot, Systems Thinking Practice Page]", coverage: "🟡", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg },
    { principle: "Leadership", artifacts: "[Governance Map, Decision Rights, Leadership Practice Page]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Tailoring", artifacts: "[Tailoring Strategy, Tailoring Log, Tailoring Practice Page]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Quality", artifacts: "[Quality Plan, Quality Checklist, Quality Practice Page]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Complexity", artifacts: "[Uncertainty Playbook, Complexity Practice Page]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Risk", artifacts: "[Risk Register, Risk Assessment Matrix, Risk Practice Page]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
    { principle: "Adaptability & Resiliency", artifacts: "[Contingency Triggers, Adaptability Practice Page]", coverage: "🟡", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg },
    { principle: "Change", artifacts: "[Change Control Log, Change Practice Page]", coverage: "🟢", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
  ];

  const renderPrinciple = () => (
    <div ref={principleRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#115E59")}>⚖️ ARTIFACT → PRINCIPLE COVERAGE</div>
      <CopyButton targetRef={principleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Principle</th>
          <th style={S.thSecondary}>Supporting Artifacts</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Coverage</th>
        </tr></thead>
        <tbody>
          {principles.map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{p.principle}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{p.artifacts}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(p.cBg, p.cFg)}>{p.coverage}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = Well covered • 🟡 = Partially covered (add evidence) • 🔴 = Gap (create artifact or document decision to accept)</p>
    </div>
  );

  const renderGap = () => (
    <div ref={gapRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ GAP ANALYSIS & ACTION PLAN</div>
      <CopyButton targetRef={gapRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "15%" }}>Domain / Principle</th>
          <th style={S.thSecondary}>Gap Description</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Action to Close Gap</th>
          <th style={{ ...S.thSecondary, width: "8%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "8%" }}>Due</th>
        </tr></thead>
        <tbody>
          {[
            { dp: "[Systems Thinking]", gap: "[No formal system map or upstream/downstream impact analysis]", action: "[Complete Systems Thinking Practice Page]", owner: "[PM]", due: "[MM/DD]" },
            { dp: "[Adaptability]", gap: "[Contingency triggers documented but not reviewed regularly]", action: "[Add contingency review to monthly cadence]", owner: "[PM]", due: "[MM/DD]" },
            { dp: "[Add domain/principle]", gap: "[Describe the gap]", action: "[Planned action]", owner: "[Name]", due: "[MM/DD]" },
          ].map((g, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{g.dp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{g.gap}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{g.action}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{g.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{g.due}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}{renderPrinciple()}{renderGap()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Artifact-to-Domain Mapping Matrix</h2>
              <p className="text-xs font-medium text-teal-600">8 Domains + 12 Principles • ⭐ All-Star</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Map existing artifacts to PMBOK 7 domains and principles. Instantly prove alignment and identify coverage gaps.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function ArtifactToDomainMappingPage() {
  return (<ThemeProvider><ArtifactToDomainMappingContent /></ThemeProvider>);
}
