"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, UserCog, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Roles + acquisition + development", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Team roster + roles only", icon: AlignJustify },
];

function ResourceManagementPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);
  const acquisitionRef = useRef<HTMLDivElement>(null);
  const developmentRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>👥 RESOURCE MANAGEMENT PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Resource Management Plan describes how project resources (human and physical) are identified, acquired, managed, and released.</strong> It defines roles, responsibilities, team structure, acquisition strategies, and development activities.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>resource planning</strong> to ensure adequate staffing and skill coverage. Aligns with PMBOK Resource Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRoles = () => (
    <div ref={rolesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>ROLES & RESPONSIBILITIES</td></tr></tbody></table>
      <CopyButton targetRef={rolesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "16%" }}>Role</th>
          <th style={S.thPrimary}>Key Responsibilities</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Authority</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Reports To</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>FTE %</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Project Sponsor", resp: "[Executive oversight, funding decisions, organizational impediment removal, final approval authority]", auth: "High", reports: "[CIO / COO]", fte: "10%" },
            { role: "Project Manager", resp: "[Day-to-day management, schedule/budget/scope control, stakeholder communication, risk management]", auth: "High", reports: "[Sponsor]", fte: "100%" },
            { role: "Business Analyst", resp: "[Requirements elicitation, documentation, stakeholder facilitation, UAT coordination]", auth: "Med", reports: "[PM]", fte: "100%" },
            { role: "Solution Architect", resp: "[Technical design, architecture decisions, integration strategy, technical risk assessment]", auth: "Med", reports: "[PM]", fte: "50%" },
            { role: "Development Lead", resp: "[Code development, technical implementation, unit testing, code reviews]", auth: "Med", reports: "[PM]", fte: "100%" },
            { role: "QA Lead", resp: "[Test strategy, test case creation, defect management, UAT support]", auth: "Med", reports: "[PM]", fte: "75%" },
            { role: "Change Manager", resp: "[Training, communications, adoption strategy, resistance management]", auth: "Low", reports: "[PM]", fte: "50%" },
            { role: "[Add Role]", resp: "[Responsibilities]", auth: "—", reports: "[Manager]", fte: "[X]%" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.resp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.auth === "High" ? C.badgeRedBg : r.auth === "Med" ? C.badgeAmberBg : C.badgeGreenBg, r.auth === "High" ? C.badgeRedFg : r.auth === "Med" ? C.badgeAmberFg : C.badgeGreenFg)}>{r.auth}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.reports}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{r.fte}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRoster = () => (
    <div ref={rosterRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📇 TEAM ROSTER</td></tr></tbody></table>
      <CopyButton targetRef={rosterRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "16%" }}>Name</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Department</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Allocation</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Start</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>End</th>
          <th style={S.thSecondary}>Skills / Certifications</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[e.g., Sarah Chen]", role: "PM", dept: "[PMO]", alloc: "100%", start: "[MM/DD]", end: "[MM/DD]", skills: "[PMP, Agile, SAP]" },
            { name: "[e.g., James Liu]", role: "BA", dept: "[IT]", alloc: "100%", start: "[MM/DD]", end: "[MM/DD]", skills: "[CBAP, SQL, Visio]" },
            { name: "[e.g., Maria Gomez]", role: "Dev Lead", dept: "[Engineering]", alloc: "100%", start: "[MM/DD]", end: "[MM/DD]", skills: "[Java, AWS, CI/CD]" },
            { name: "[e.g., David Park]", role: "QA Lead", dept: "[Quality]", alloc: "75%", start: "[MM/DD]", end: "[MM/DD]", skills: "[ISTQB, Selenium, Jira]" },
            { name: "[e.g., Lisa Wong]", role: "Architect", dept: "[IT]", alloc: "50%", start: "[MM/DD]", end: "[MM/DD]", skills: "[TOGAF, Cloud, API]" },
            { name: "[Add team member]", role: "", dept: "", alloc: "", start: "", end: "", skills: "" },
          ].map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{t.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.dept}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{t.alloc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.start}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.end}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.skills}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAcquisition = () => (
    <div ref={acquisitionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🔍 RESOURCE ACQUISITION STRATEGY</td></tr></tbody></table>
      <CopyButton targetRef={acquisitionRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Internal Resources</td><td style={S.td0}>[Describe how internal staff will be acquired. Example: “Resource requests submitted to functional managers by [date]; allocation confirmed within 5 business days.”]</td></tr>
          <tr><td style={S.tdLabelAlt}>External / Contract Resources</td><td style={S.tdAlt}>[Describe contractor or vendor staffing. Example: “SOW issued to preferred vendor list; 2 contractors needed for development from [date] to [date].”]</td></tr>
          <tr><td style={S.tdLabel}>Resource Conflicts</td><td style={S.td0}>[How will conflicts be resolved? Example: “Escalate to PMO for prioritization; sponsor has final authority.”]</td></tr>
          <tr><td style={S.tdLabelAlt}>Resource Release</td><td style={S.tdAlt}>[When and how are resources released? Example: “Released at phase completion; 2-week notice to functional managers.”]</td></tr>
          <tr><td style={S.tdLabel}>Backup / Contingency</td><td style={S.td0}>[Backup plan if key resources leave. Example: “Cross-training plan for critical roles; vendor bench available within 2 weeks.”]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderDevelopment = () => (
    <div ref={developmentRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📚 TEAM DEVELOPMENT & PERFORMANCE</td></tr></tbody></table>
      <CopyButton targetRef={developmentRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Activity</th>
          <th style={S.thSecondary}>Description</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Frequency</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { act: "Team Building", desc: "[Kickoff meeting, team charter, working agreements, team social events]", freq: "Monthly", owner: "[PM]" },
            { act: "Training Plan", desc: "[Required certifications, tool training (Jira, Confluence), methodology training]", freq: "As Needed", owner: "[PM / HR]" },
            { act: "Performance Reviews", desc: "[Individual check-ins, project contribution assessments, feedback sessions]", freq: "Monthly", owner: "[PM]" },
            { act: "Knowledge Transfer", desc: "[Documentation standards, pair programming, shadowing, brown bag sessions]", freq: "Bi-weekly", owner: "[Tech Lead]" },
            { act: "Conflict Resolution", desc: "[Escalation path: team → PM → sponsor. Use collaborative problem-solving first.]", freq: "As Needed", owner: "[PM]" },
            { act: "Recognition", desc: "[Acknowledge contributions in status reports, team awards, sponsor recognition]", freq: "Ongoing", owner: "[PM]" },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{a.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{a.freq}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRoles()}{renderRoster()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderAcquisition()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderDevelopment()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRoster()}{renderRoles()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><UserCog size={11} /> Resources</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><UserCog size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Resource Management Plan</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Resource Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines roles, team roster, acquisition strategy, and development activities. Full Plan covers all sections; Quick Plan focuses on team roster and role definitions.</p>
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

export default function ResourceManagementPlanPage() {
  return (<ThemeProvider><ResourceManagementPlanContent /></ThemeProvider>);
}
