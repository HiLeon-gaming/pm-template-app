"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All phases + deliverable QC", icon: LayoutDashboard },
  { id: "compact", label: "Quick Checklist", desc: "Go-live readiness only", icon: AlignJustify },
];

function QualityChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const planningRef = useRef<HTMLDivElement>(null);
  const executionRef = useRef<HTMLDivElement>(null);
  const testingRef = useRef<HTMLDivElement>(null);
  const goLiveRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> Pass QUALITY CHECKLIST</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop | PM Command Center | PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Quality Checklist is an operational tool used to verify that required quality steps have been completed for each deliverable and phase.</strong> It provides a structured pass/fail verification against defined quality criteria.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>quality control inspections and phase gate reviews</strong>. Aligns with PMBOK Quality Management — Monitoring & Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Inspection Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Inspector</td><td style={S.tdAlt}>[Name, Role]</td><td style={S.tdLabelAlt}>Deliverable / Phase</td><td style={S.tdAlt}>[Name]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  type CheckItem = { item: string; criteria: string; pass: string; pBg: string; pFg: string; notes: string };

  const renderCheckSection = (title: string, color: string, ref: React.RefObject<HTMLDivElement | null>, items: CheckItem[]) => (
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(color)}>{title}</td></tr></tbody></table>
      <CopyButton targetRef={ref} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Check Item</th>
          <th style={S.thSecondary}>Acceptance Criteria</th>
          <th style={{ ...S.thSecondary, width: "9%", textAlign: "center" as const }}>Result</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Notes / Evidence</th>
        </tr></thead>
        <tbody>
          {items.map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.item}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.criteria}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(c.pBg, c.pFg)}>{c.pass}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.notes}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const planningItems: CheckItem[] = [
    { item: "Charter Approved", criteria: "[Signed by sponsor with all required sections complete]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[Signed MM/DD]" },
    { item: "Scope Statement Baselined", criteria: "[Approved scope with deliverables, exclusions, and acceptance criteria]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[v1.0 approved]" },
    { item: "WBS Complete", criteria: "[Decomposed to work package level; dictionary entries for all WPs]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[25 WPs defined]" },
    { item: "Schedule Baselined", criteria: "[Critical path identified; milestones defined; resources assigned]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[MS Project v1.0]" },
    { item: "Budget Approved", criteria: "[Bottom-up estimate reviewed; contingency calculated; sponsor approved]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[$721K approved]" },
    { item: "Risk Register Populated", criteria: "[≥5 risks identified with P×I scores and response plans]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[7 risks logged]" },
    { item: "Quality Plan Defined", criteria: "[Quality metrics, QA/QC activities, and roles documented]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[v1.0 complete]" },
    { item: "Requirements Baselined", criteria: "[BRD signed off; RTM established; all reqs traced]", pass: " Partial", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, notes: "[93% traced]" },
  ];

  const executionItems: CheckItem[] = [
    { item: "Design Review Complete", criteria: "[Architecture reviewed against NFRs; all stakeholders approved]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[Review completed]" },
    { item: "Code Review Standards Met", criteria: "[100% of PRs reviewed; no critical findings unresolved]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[All PRs reviewed]" },
    { item: "Unit Test Coverage", criteria: "[≥80% code coverage; all unit tests passing]", pass: " Partial", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, notes: "[78% — 2% gap]" },
    { item: "Integration Points Verified", criteria: "[All API integrations tested end-to-end; error handling confirmed]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "[In progress]" },
    { item: "Security Scan Clean", criteria: "[No critical/high vulnerabilities; OWASP Top 10 addressed]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "[Scheduled Wk 4]" },
    { item: "Performance Targets Met", criteria: "[<2s page load; 99.5% uptime under load test conditions]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "[Scheduled Wk 5]" },
  ];

  const testingItems: CheckItem[] = [
    { item: "Test Plan Approved", criteria: "[Test strategy, scope, approach, and resources documented and approved]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[Approved]" },
    { item: "Test Cases Written", criteria: "[All requirements have corresponding test cases in RTM]", pass: " Partial", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, notes: "[87% coverage]" },
    { item: "Test Environment Ready", criteria: "[Environment mirrors production; test data loaded; access granted]", pass: " Pass", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[Env validated]" },
    { item: "UAT Test Cases Executed", criteria: "[≥95% of test cases executed; results documented]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "[UAT not started]" },
    { item: "P1/P2 Defects Resolved", criteria: "[Zero open P1 defects; all P2 defects resolved or have approved workaround]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "[Testing phase]" },
    { item: "UAT Sign-off Obtained", criteria: "[Business owner formally accepts test results and approves for go-live]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "[After UAT]" },
  ];

  const goLiveItems: CheckItem[] = [
    { item: "Deployment Runbook Ready", criteria: "[Step-by-step deployment procedure documented and reviewed]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
    { item: "Rollback Plan Tested", criteria: "[Rollback procedure documented and successfully tested in staging]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
    { item: "Training Complete", criteria: "[All end users and admins trained; materials distributed]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
    { item: "Support Team Briefed", criteria: "[L1/L2 support team trained; escalation procedures documented]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
    { item: "Monitoring Dashboards Active", criteria: "[Application, infrastructure, and business metrics dashboards live]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
    { item: "Smoke Tests Pass in Prod", criteria: "[Critical path smoke tests pass within 30 min of deployment]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
    { item: "Stakeholder Communication Sent", criteria: "[Go-live announcement sent to all stakeholders per comms plan]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
    { item: "Go/No-Go Decision Documented", criteria: "[Formal go/no-go decision recorded with all required approvals]", pass: " Pending", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, notes: "" },
  ];

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> CHECKLIST SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Phase</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Total</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}> Pass</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}> Partial</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}> Pending</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}> Fail</th>
          <th style={S.thSecondary}>Overall</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, fontWeight: 700 }}>Planning Gate</td><td style={{ ...S.td0, textAlign: "center" as const }}>8</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, color: "#059669" }}>7</td><td style={{ ...S.td0, textAlign: "center" as const, color: "#D97706" }}>1</td><td style={{ ...S.td0, textAlign: "center" as const }}>0</td><td style={{ ...S.td0, textAlign: "center" as const }}>0</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Approved w/ Action</span></td></tr>
          <tr><td style={{ ...S.tdAlt, fontWeight: 700 }}>Execution Gate</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>6</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700, color: "#059669" }}>2</td><td style={{ ...S.tdAlt, textAlign: "center" as const, color: "#D97706" }}>1</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>3</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>0</td><td style={S.tdAlt}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>In Progress</span></td></tr>
          <tr><td style={{ ...S.td0, fontWeight: 700 }}>Testing Gate</td><td style={{ ...S.td0, textAlign: "center" as const }}>6</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, color: "#059669" }}>2</td><td style={{ ...S.td0, textAlign: "center" as const, color: "#D97706" }}>1</td><td style={{ ...S.td0, textAlign: "center" as const }}>3</td><td style={{ ...S.td0, textAlign: "center" as const }}>0</td><td style={S.td0}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>In Progress</span></td></tr>
          <tr><td style={{ ...S.tdAlt, fontWeight: 700 }}>Go-Live Gate</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>8</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700, color: "#059669" }}>0</td><td style={{ ...S.tdAlt, textAlign: "center" as const, color: "#D97706" }}>0</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>8</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>0</td><td style={S.tdAlt}><span style={S.badge(C.badgeGrayBg, C.badgeGrayFg)}>Not Started</span></td></tr>
          <tr>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>TOTAL</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>28</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>11</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>3</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>14</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>0</td>
            <td style={{ ...S.td0, backgroundColor: C.primary, color: C.white }}></td>
          </tr>
        </tbody>
      </table>
      <p style={S.subNote}>All "Partial" items require documented action plans with target dates. "Fail" items must be resolved before phase gate approval.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}
      {renderCheckSection("\u{1F4CB} PLANNING PHASE QUALITY GATE", C.primary, planningRef, planningItems)}
      {renderCheckSection("\u{2699}\uFE0F EXECUTION PHASE QUALITY GATE", C.secondary, executionRef, executionItems)}
      {renderCheckSection("\u{1F9EA} TESTING PHASE QUALITY GATE", C.primary, testingRef, testingItems)}
      {renderCheckSection("\u{1F680} GO-LIVE READINESS CHECKLIST", C.secondary, goLiveRef, goLiveItems)}
      {renderSummary()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}
      {renderCheckSection("\u{1F680} GO-LIVE READINESS CHECKLIST", C.secondary, goLiveRef, goLiveItems)}
      {renderSummary()}{renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><ClipboardCheck size={11} /> Checklist</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><ClipboardCheck size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Quality Checklist</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Quality Management • Monitoring & Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Phase gate quality verification with pass/fail checks for planning, execution, testing, and go-live. Full Checklist covers all phases; Quick Checklist focuses on go-live readiness.</p>
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

export default function QualityChecklistPage() {
  return (<ThemeProvider><QualityChecklistContent /></ThemeProvider>);
}
