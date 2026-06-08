"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Standards + metrics + QA/QC activities", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Standards + metrics only", icon: AlignJustify },
];

function QualityManagementPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const standardsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const qcRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> Quality Management Plan</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop  |  PM Command Center  |  PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Quality Management Plan defines quality standards, metrics, and the quality assurance (QA) and quality control (QC) activities that ensure project deliverables meet stakeholder expectations.</strong> It distinguishes between process quality (QA) and product quality (QC).<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>quality planning</strong> to establish quality expectations. Aligns with PMBOK Quality Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Quality Lead</td><td style={S.tdAlt}>[Name, Title]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderStandards = () => (
    <div ref={standardsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> QUALITY STANDARDS & POLICIES</td></tr></tbody></table>
      <CopyButton targetRef={standardsRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Quality Objective</td><td style={S.td0}>[Deliver a solution that meets all functional requirements with &lt;2% defect rate in production and 95%+ user satisfaction]</td></tr>
          <tr><td style={S.tdLabelAlt}>Quality Philosophy</td><td style={S.tdAlt}>[Prevention over inspection. Build quality into the process rather than finding defects after the fact.]</td></tr>
          <tr><td style={S.tdLabel}>Applicable Standards</td><td style={S.td0}>[ISO 9001:2015 | IEEE 730 | OWASP Top 10 | Organization coding standards v3.2 | WCAG 2.1 AA]</td></tr>
          <tr><td style={S.tdLabelAlt}>Regulatory Requirements</td><td style={S.tdAlt}>[SOX compliance for financial data | GDPR for personal data handling | Section 508 accessibility]</td></tr>
          <tr><td style={S.tdLabel}>Definition of Done</td><td style={S.td0}>[Code reviewed, unit tested (80% coverage), integration tested, documented, deployed to staging, PO accepted]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> QUALITY METRICS</td></tr></tbody></table>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Metric</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={S.thPrimary}>Measurement Method</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Defect Density", target: "[<2 per KLOC]", current: "[1.5/KLOC]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, method: "[Static analysis + testing defects / lines of code]" },
            { metric: "Code Coverage", target: "[80%]", current: "[78%]", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, method: "[Automated unit test coverage via SonarQube]" },
            { metric: "UAT Pass Rate", target: "[95%]", current: "[N/A]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, method: "[Test cases passed / total test cases executed]" },
            { metric: "P1 Defects at Go-Live", target: "[0]", current: "[0]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, method: "[Critical/blocker defects open at release date]" },
            { metric: "User Satisfaction", target: "[4.0/5.0]", current: "[N/A]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, method: "[Post-deployment survey within 2 weeks of go-live]" },
            { metric: "Requirement Coverage", target: "[100%]", current: "[93%]", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, method: "[Requirements traced to test cases in RTM]" },
            { metric: "Defect Closure Rate", target: "[90% per sprint]", current: "[92%]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, method: "[Defects resolved / defects opened per sprint]" },
            { metric: "Performance SLA", target: "[<2s page load]", current: "[1.8s]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, method: "[Automated performance testing via JMeter/Lighthouse]" },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{m.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{m.target}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{m.current}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(m.sBg, m.sFg)}>{m.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.method}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderQA = () => (
    <div ref={qaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> QUALITY ASSURANCE (QA) ACTIVITIES</td></tr></tbody></table>
      <CopyButton targetRef={qaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>QA Activity</th>
          <th style={S.thSecondary}>Description</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Frequency</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { act: "Process Audits", desc: "[Verify adherence to SDLC process, coding standards, and documentation requirements]", freq: "Monthly", owner: "[QA Lead]" },
            { act: "Code Reviews", desc: "[Peer review all code before merge; enforce style guide, security patterns, and best practices]", freq: "Per PR", owner: "[Dev Lead]" },
            { act: "Sprint Retrospectives", desc: "[Identify quality improvement opportunities; track improvement actions to completion]", freq: "Per Sprint", owner: "[Scrum Master]" },
            { act: "Metrics Review", desc: "[Review quality metrics dashboard; identify trends; escalate deviations from targets]", freq: "Weekly", owner: "[QA Lead]" },
            { act: "Requirements Walkthrough", desc: "[Structured review of requirements for completeness, testability, and consistency]", freq: "Per Phase", owner: "[BA Lead]" },
            { act: "Design Review", desc: "[Architecture and design review against standards, patterns, and non-functional requirements]", freq: "Per Phase", owner: "[Architect]" },
          ].map((q, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{q.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{q.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{q.freq}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{q.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>QA = Process-focused. Ensures the right processes are being followed to prevent defects from being introduced.</p>
    </div>
  );

  const renderQC = () => (
    <div ref={qcRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> QUALITY CONTROL (QC) ACTIVITIES</td></tr></tbody></table>
      <CopyButton targetRef={qcRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "20%" }}>QC Activity</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Phase</th>
          <th style={S.thSecondary}>Description & Exit Criteria</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { act: "Unit Testing", phase: "Dev", desc: "[Developer-written tests for individual components; exit: 80% code coverage, all tests pass]", owner: "[Dev Team]" },
            { act: "Integration Testing", phase: "Dev", desc: "[Test interactions between modules and external systems; exit: all integration points verified]", owner: "[QA Team]" },
            { act: "System Testing", phase: "Test", desc: "[End-to-end testing of complete system against requirements; exit: all P1/P2 test cases pass]", owner: "[QA Lead]" },
            { act: "Performance Testing", phase: "Test", desc: "[Load, stress, and endurance testing; exit: SLA targets met under expected load]", owner: "[QA Team]" },
            { act: "Security Testing", phase: "Test", desc: "[Vulnerability scan, penetration test, OWASP verification; exit: no critical/high findings]", owner: "[Security]" },
            { act: "UAT", phase: "UAT", desc: "[Business users validate against acceptance criteria; exit: 95%+ pass rate, PO sign-off]", owner: "[Business]" },
            { act: "Regression Testing", phase: "All", desc: "[Automated regression suite run after each change; exit: no regression defects introduced]", owner: "[QA Team]" },
          ].map((q, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{q.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>{q.phase}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{q.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{q.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>QC = Product-focused. Inspects deliverables to identify and correct defects before delivery to stakeholders.</p>
    </div>
  );

  const renderRoles = () => (
    <div ref={rolesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> QUALITY ROLES & RESPONSIBILITIES</td></tr></tbody></table>
      <CopyButton targetRef={rolesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "18%" }}>Role</th>
          <th style={S.thSecondary}>Quality Responsibilities</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Project Manager", resp: "[Overall quality accountability; ensure quality plan is followed; escalate quality issues; report quality metrics]" },
            { role: "QA Lead", resp: "[Define test strategy; manage QA/QC activities; track quality metrics; report defect trends; conduct process audits]" },
            { role: "Development Lead", resp: "[Enforce coding standards; conduct code reviews; ensure unit test coverage; fix defects per SLA]" },
            { role: "Business Analyst", resp: "[Ensure requirements are testable; support UAT; validate acceptance criteria; maintain RTM]" },
            { role: "All Team Members", resp: "[Follow quality processes; report defects promptly; participate in reviews; continuous improvement mindset]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.resp}</td>
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
    <>{renderTitleBanner()}{renderHeader()}{renderStandards()}{renderMetrics()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderQA()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderQC()}</td>
      </tr></tbody></table>
      {renderRoles()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderStandards()}{renderMetrics()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><CheckCircle size={11} /> Quality</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><CheckCircle size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Quality Management Plan</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Quality Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines quality standards, metrics, QA and QC activities, and quality roles. Full Plan includes all sections; Quick Plan focuses on standards and metrics.</p>
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

export default function QualityManagementPlanPage() {
  return (<ThemeProvider><QualityManagementPlanContent /></ThemeProvider>);
}
