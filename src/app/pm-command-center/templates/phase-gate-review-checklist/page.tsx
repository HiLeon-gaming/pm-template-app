"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ShieldCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All gates + criteria + signoff", icon: LayoutDashboard },
  { id: "compact", label: "Quick Checklist", desc: "Current gate only", icon: AlignJustify },
];

function PhaseGateReviewChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gate1Ref = useRef<HTMLDivElement>(null);
  const gate2Ref = useRef<HTMLDivElement>(null);
  const gate3Ref = useRef<HTMLDivElement>(null);
  const gate4Ref = useRef<HTMLDivElement>(null);
  const gate5Ref = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const signoffRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> Phase Gate Review Checklist</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop  |  PM Command Center  |  PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Phase Gate Review Checklist provides standardized criteria for evaluating project readiness to proceed from one phase to the next.</strong> Each gate has mandatory and recommended criteria that must be satisfied before the project can advance.<br /><br />
          Conduct gate reviews at <strong style={{ fontStyle: "italic" }}>each phase transition point</strong>. Aligns with PMBOK Integration Management — Governance Framework.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Review Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Gate Reviewer</td><td style={S.tdAlt}>[PMO Director / Sponsor]</td></tr>
          <tr><td style={S.tdLabel}>Current Gate</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Gate 2 — Planning Complete</span></td><td style={S.tdLabel}>Decision</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}> GO</span> / <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}> Conditional</span> / <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}> No-Go</span></td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const gateSection = (ref: React.RefObject<HTMLDivElement | null>, title: string, color: string | undefined, items: { criteria: string; type: string; tBg: string; tFg: string; status: string; sBg: string; sFg: string; evidence: string }[]) => (
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(color)}>{title}</div>
      <CopyButton targetRef={ref} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Criteria</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Evidence / Notes</th>
        </tr></thead>
        <tbody>
          {items.map((it, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{it.criteria}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(it.tBg, it.tFg), fontSize: "9px" }}>{it.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(it.sBg, it.sFg)}>{it.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{it.evidence}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const g1Items = [
    { criteria: "[Project charter approved and signed]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[Charter v1.0 signed MM/DD]" },
    { criteria: "[Business case validated with financial analysis]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[ROI 329% over 3 years; NPV positive]" },
    { criteria: "[Stakeholder register created]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[18 stakeholders identified and categorized]" },
    { criteria: "[Project manager assigned with authority defined]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[PM assignment letter on file]" },
    { criteria: "[High-level scope and constraints documented]", type: "Recommended", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[Included in charter Section 3]" },
  ];
  const g2Items = [
    { criteria: "[Project management plan approved]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[PMP v1.0 approved MM/DD]" },
    { criteria: "[Scope baseline established (WBS + scope statement)]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[WBS 4 levels; 54 user stories baselined]" },
    { criteria: "[Schedule baseline with milestones]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[30.5 weeks; 6 milestones; critical path defined]" },
    { criteria: "[Budget baseline with EVM setup]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[$690,750 total including contingency]" },
    { criteria: "[Risk register with initial assessment]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[12 risks identified; 3 High, 5 Med, 4 Low]" },
    { criteria: "[Resource allocation confirmed]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Conditional", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, evidence: "[7/8 confirmed; QA resource pending HR approval]" },
    { criteria: "[Communications plan distributed]", type: "Recommended", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[Sent to all stakeholders MM/DD]" },
    { criteria: "[Change control process established]", type: "Recommended", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, status: " GO", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, evidence: "[CCB charter signed; CR form distributed]" },
  ];
  const g3Items = [
    { criteria: "[All scope deliverables produced]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "[Pending — execution in progress]" },
    { criteria: "[Quality metrics within thresholds]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[All high risks mitigated or accepted]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[UAT plan approved and resources confirmed]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Training materials developed]", type: "Recommended", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
  ];
  const g4Items = [
    { criteria: "[UAT complete with sign-off]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Go-live readiness confirmed (infra, data, security)]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Rollback plan documented and tested]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[End-user training completed]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Support team trained and ready]", type: "Recommended", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
  ];
  const g5Items = [
    { criteria: "[All deliverables formally accepted]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Lessons learned session completed]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Project handoff to operations complete]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Final project financials closed]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Benefits realization plan activated]", type: "Recommended", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
    { criteria: "[Project closure report signed]", type: "Mandatory", tBg: C.badgeRedBg, tFg: C.badgeRedFg, status: " Pending", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, evidence: "" },
  ];

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 GATE STATUS SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Gate</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Mandatory</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Passed</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Pending</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Decision</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { gate: "Gate 1 — Initiation Complete", mand: "4", pass: "4", pend: "0", dec: " GO", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg, date: "[MM/DD]" },
            { gate: "Gate 2 — Planning Complete", mand: "6", pass: "5", pend: "1", dec: " Conditional", dBg: C.badgeAmberBg, dFg: C.badgeAmberFg, date: "[MM/DD]" },
            { gate: "Gate 3 — Execution Complete", mand: "4", pass: "0", pend: "4", dec: " Pending", dBg: C.badgeGrayBg, dFg: C.badgeGrayFg, date: "" },
            { gate: "Gate 4 — Go-Live Ready", mand: "4", pass: "0", pend: "4", dec: " Pending", dBg: C.badgeGrayBg, dFg: C.badgeGrayFg, date: "" },
            { gate: "Gate 5 — Closure Complete", mand: "5", pass: "0", pend: "5", dec: " Pending", dBg: C.badgeGrayBg, dFg: C.badgeGrayFg, date: "" },
          ].map((g, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{g.gate}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{g.mand}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{g.pass}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{g.pend}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(g.dBg, g.dFg)}>{g.dec}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{g.date}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSignoff = () => (
    <div ref={signoffRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>✍️ GATE REVIEW SIGNOFF</div>
      <CopyButton targetRef={signoffRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Reviewer</th>
          <th style={S.thSecondary}>Name</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Decision</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Signature</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Date</th>
        </tr></thead>
        <tbody>
          {["Project Sponsor", "PMO Director", "Business Owner", "Technical Authority"].map((role, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{role}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[Name]</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>[GO / Conditional / No-Go]</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>__________________</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD]</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Conditional GO requires all conditions to be resolved within [5] business days. No-Go requires a remediation plan before re-review.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>
          {gateSection(gate1Ref, " Gate 1 — Initiation Complete", undefined, g1Items)}
          {gateSection(gate3Ref, " Gate 3 — Execution Complete", undefined, g3Items)}
          {gateSection(gate5Ref, " Gate 5 — Closure Complete", undefined, g5Items)}
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>
          {gateSection(gate2Ref, " Gate 2 — Planning Complete", C.secondary, g2Items)}
          {gateSection(gate4Ref, " Gate 4 — Go-Live Ready", C.secondary, g4Items)}
        </td>
      </tr></tbody></table>
      {renderSummary()}{renderSignoff()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{gateSection(gate2Ref, " Gate 2 — Planning Complete (CURRENT)", undefined, g2Items)}{renderSignoff()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><ShieldCheck size={11} /> Governance</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><ShieldCheck size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Phase Gate Review Checklist</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Governance Framework</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Standardized criteria for all 5 phase gates with mandatory/recommended items and signoff. Full Checklist shows all gates; Quick Checklist shows current gate only.</p>
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

export default function PhaseGateReviewChecklistPage() {
  return (<ThemeProvider><PhaseGateReviewChecklistContent /></ThemeProvider>);
}
