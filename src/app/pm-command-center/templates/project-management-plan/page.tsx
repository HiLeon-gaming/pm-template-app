"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full PMP", desc: "All knowledge areas", icon: LayoutDashboard },
  { id: "compact", label: "Quick PMP", desc: "Summary + baselines", icon: AlignJustify },
];

function ProjectManagementPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const baselinesRef = useRef<HTMLDivElement>(null);
  const knowledgeRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> PROJECT MANAGEMENT PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop | PM Command Center | PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Management Plan is the master document that defines how the project is executed, monitored, controlled, and closed.</strong> It integrates and consolidates all subsidiary management plans and baselines across the ten PMBOK knowledge areas.<br /><br />
          Use this template to <strong style={{ fontStyle: "italic" }}>consolidate all planning outputs</strong> into a single reference. Aligns with PMBOK Integration Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Project ID</td><td style={{ ...S.td0, width: "32%" }}>[PRJ-YYYY-###]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Sponsor</td><td style={S.tdAlt}>[Sponsor Name]</td></tr>
          <tr><td style={S.tdLabel}>Version</td><td style={S.td0}>[1.0]</td><td style={S.tdLabel}>Last Updated</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderOverview = () => (
    <div ref={overviewRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>1 — PROJECT OVERVIEW</div>
      <CopyButton targetRef={overviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Project Purpose</td><td style={S.td0}>[Summarize why this project exists and what business need it addresses]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Objectives</td><td style={S.tdAlt}>[List SMART objectives from the Project Charter]</td></tr>
          <tr><td style={S.tdLabel}>Success Criteria</td><td style={S.td0}>[Measurable criteria for project success]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Approach</td><td style={S.tdAlt}>[e.g., Waterfall, Agile, Hybrid — describe the methodology and rationale]</td></tr>
          <tr><td style={S.tdLabel}>Life Cycle Description</td><td style={S.td0}>[e.g., Initiation → Planning → Execution → Monitoring & Control → Closing]</td></tr>
          <tr><td style={S.tdLabelAlt}>Key Assumptions</td><td style={S.tdAlt}>[Reference Assumptions & Constraints Log]</td></tr>
          <tr><td style={S.tdLabel}>Key Constraints</td><td style={S.td0}>[Reference Assumptions & Constraints Log]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderBaselines = () => (
    <div ref={baselinesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>2 — PROJECT BASELINES</div>
      <CopyButton targetRef={baselinesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Baseline</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Version</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Approved Date</th>
          <th style={S.thPrimary}>Summary</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Scope Baseline", ver: "[1.0]", date: "[MM/DD]", sum: "[Scope statement + WBS + WBS dictionary]", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "Schedule Baseline", ver: "[1.0]", date: "[MM/DD]", sum: "[Milestone schedule with critical path identified]", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "Cost Baseline", ver: "[1.0]", date: "[MM/DD]", sum: "[Time-phased budget allocation by work package]", status: "Pending", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { name: "Performance Measurement Baseline", ver: "[1.0]", date: "[MM/DD]", sum: "[Integrated scope, schedule, and cost for EVM]", status: "Pending", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((b, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700 }}>{b.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{b.ver}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{b.date}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{b.sum}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(b.sBg, b.sFg)}>{b.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderKnowledge = () => (
    <div ref={knowledgeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>3 — SUBSIDIARY MANAGEMENT PLANS</div>
      <CopyButton targetRef={knowledgeRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Management Plan</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Knowledge Area</th>
          <th style={S.thSecondary}>Key Approach / Summary</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { num: "3.1", plan: "Scope Management Plan", ka: "Scope Management", sum: "[How scope is defined, validated, and controlled; change process for scope]", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { num: "3.2", plan: "Requirements Management Plan", ka: "Scope Management", sum: "[How requirements are analyzed, documented, tracked, and managed]", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { num: "3.3", plan: "Schedule Management Plan", ka: "Schedule Management", sum: "[Scheduling methodology, tools, reporting frequency, change thresholds]", status: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { num: "3.4", plan: "Cost Management Plan", ka: "Cost Management", sum: "[Estimating approach, budget management, EVM thresholds, reporting]", status: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { num: "3.5", plan: "Quality Management Plan", ka: "Quality Management", sum: "[Quality standards, QA/QC activities, metrics, audits]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { num: "3.6", plan: "Resource Management Plan", ka: "Resource Management", sum: "[Team structure, roles, acquisition, training, team development]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { num: "3.7", plan: "Communications Management Plan", ka: "Communications", sum: "[Stakeholder communications, channels, frequency, escalation paths]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { num: "3.8", plan: "Risk Management Plan", ka: "Risk Management", sum: "[Risk identification, analysis, response planning, monitoring approach]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { num: "3.9", plan: "Procurement Management Plan", ka: "Procurement", sum: "[Make-or-buy decisions, contract types, vendor selection criteria]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { num: "3.10", plan: "Stakeholder Engagement Plan", ka: "Stakeholder Management", sum: "[Engagement strategies, assessment, monitoring activities]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "11px" }}>{p.num}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{p.plan}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.ka}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.sum}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(p.sBg, p.sFg)}>{p.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderProcess = () => (
    <div ref={processRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>4 — PROJECT GOVERNANCE & PROCESSES</div>
      <CopyButton targetRef={processRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "28%" }}>Process Area</th>
          <th style={S.thSecondary}>Description</th>
        </tr></thead>
        <tbody>
          <tr><td style={S.tdLabel}>Change Control Process</td><td style={S.td0}>[Change requests submitted via CR form → Impact analysis → CCB review → Approve/Reject → Update baselines]</td></tr>
          <tr><td style={S.tdLabelAlt}>Configuration Management</td><td style={S.tdAlt}>[Document naming conventions, version control, storage location, access controls]</td></tr>
          <tr><td style={S.tdLabel}>Issue Escalation Path</td><td style={S.td0}>[Team Lead → PM → Sponsor → Steering Committee. Escalation within 24hrs if unresolved.]</td></tr>
          <tr><td style={S.tdLabelAlt}>Decision Authority</td><td style={S.tdAlt}>[PM: decisions &lt;$10K / &lt;1 week impact. Sponsor: $10K-$50K. Steering Committee: &gt;$50K or &gt;2 weeks impact.]</td></tr>
          <tr><td style={S.tdLabel}>Reporting Cadence</td><td style={S.td0}>[Weekly status reports (Mon), Bi-weekly steering committee (1st & 3rd Thu), Monthly executive dashboard]</td></tr>
          <tr><td style={S.tdLabelAlt}>Lessons Learned Process</td><td style={S.tdAlt}>[Captured at each phase gate and sprint retrospective; logged in Lessons Learned Register]</td></tr>
          <tr><td style={S.tdLabel}>Phase Gate Criteria</td><td style={S.td0}>[Define Go/No-Go criteria for each phase transition. Reference Phase Gate Review Checklist.]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>5 — PMP APPROVAL</div>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Name</th>
          <th style={S.thSecondary}>Signature</th>
          <th style={{ ...S.thSecondary, width: "16%" }}>Date</th>
        </tr></thead>
        <tbody>
          {["Project Sponsor", "Project Manager", "Functional Manager", "[Additional Approver]"].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{r}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[Name]</td>
              <td style={{ ...S.td0, backgroundColor: bg, borderBottom: `2px solid ${C.primary}` }}>&nbsp;</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderOverview()}{renderBaselines()}{renderKnowledge()}{renderProcess()}{renderApproval()}{renderFooter()}</>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderOverview()}{renderBaselines()}{renderApproval()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><BookOpen size={11} /> PMP</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><BookOpen size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Management Plan</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Master planning document integrating all subsidiary plans and baselines. Full PMP covers all knowledge areas and governance; Quick PMP focuses on overview, baselines, and approval.</p>
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

export default function ProjectManagementPlanPage() {
  return (<ThemeProvider><ProjectManagementPlanContent /></ThemeProvider>);
}
