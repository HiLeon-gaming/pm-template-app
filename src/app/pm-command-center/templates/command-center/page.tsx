"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

/* ── Section & Template Data ── */
const BASE = "/pm-command-center/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Initiating Process Group",
    color: "#4F46E5",
    templates: [
      { name: "Project Charter", href: `${BASE}/project-charter` },
      { name: "Business Case", href: `${BASE}/business-case` },
      { name: "Stakeholder Register", href: `${BASE}/stakeholder-register` },
      { name: "Project Selection Matrix", href: `${BASE}/project-selection-matrix` },
      { name: "Assumptions & Constraints Log", href: `${BASE}/assumptions-constraints-log` },
    ],
    explanation: "This is where every project begins. The Project Charter is the formal document that says \"this project is approved and here is what it will accomplish.\" The Business Case explains why the project is worth doing by comparing costs to expected benefits. The Stakeholder Register lists every person or group affected by the project so you know who to keep informed. The Project Selection Matrix helps leadership choose which projects to invest in when there are several options. The Assumptions & Constraints Log tracks things you believe to be true (assumptions) and limits you must work within (constraints) so nothing catches you off guard later.",
  },
  {
    title: "Planning — Scope & Requirements",
    color: "#7C3AED",
    templates: [
      { name: "Project Management Plan", href: `${BASE}/project-management-plan` },
      { name: "Scope Statement", href: `${BASE}/scope-statement` },
      { name: "Work Breakdown Structure (WBS)", href: `${BASE}/wbs` },
      { name: "Requirements Traceability Matrix", href: `${BASE}/requirements-traceability-matrix` },
      { name: "Change Request Log", href: `${BASE}/change-request-log` },
    ],
    explanation: "These templates help you define exactly what the project will deliver — and what it will not. The Project Management Plan is your master document that describes how the project will be run from start to finish. The Scope Statement spells out every deliverable and its acceptance criteria so everyone agrees on what \"done\" looks like. The Work Breakdown Structure (WBS) breaks the project into smaller, manageable pieces of work called work packages. The Requirements Traceability Matrix (often called an RTM) connects each requirement to its source and tracks whether it has been designed, built, and tested. The Change Request Log captures any proposed changes to scope, schedule, or budget so nothing changes without proper review.",
  },
  {
    title: "Planning — Schedule & Resources",
    color: "#2563EB",
    templates: [
      { name: "Project Schedule / Milestone Plan", href: `${BASE}/project-schedule` },
      { name: "Resource Management Plan", href: `${BASE}/resource-management-plan` },
      { name: "RACI Matrix", href: `${BASE}/raci-matrix` },
      { name: "Resource Allocation Tracker", href: `${BASE}/resource-allocation-tracker` },
    ],
    explanation: "This section focuses on when things happen and who does them. The Project Schedule lays out phases, milestones, and key dates so the team knows the timeline. The Resource Management Plan describes what skills the team needs, how many people are required, and when they are available. The RACI Matrix is a simple chart that clarifies who is Responsible (does the work), Accountable (makes the final decision), Consulted (gives input), and Informed (needs to know) for every major deliverable. The Resource Allocation Tracker shows how much of each person’s time is committed so you can avoid overloading anyone.",
  },
  {
    title: "Planning — Budget & Procurement",
    color: "#059669",
    templates: [
      { name: "Cost Estimate Worksheet", href: `${BASE}/cost-estimate-worksheet` },
      { name: "Budget Tracker", href: `${BASE}/budget-tracker` },
      { name: "Procurement Plan", href: `${BASE}/procurement-plan` },
      { name: "Vendor Evaluation Scorecard", href: `${BASE}/vendor-evaluation-scorecard` },
    ],
    explanation: "Money matters, and these templates keep spending visible and controlled. The Cost Estimate Worksheet builds your budget from the bottom up by estimating costs for each work package, including labor, materials, and a reserve for unexpected expenses (called contingency). The Budget Tracker compares what you planned to spend against what you actually spent, using Earned Value Management (EVM) metrics like Cost Performance Index (CPI) and Schedule Performance Index (SPI) to tell you if you are on track. The Procurement Plan documents what you will buy or outsource, what type of contract you will use, and how you will select vendors. The Vendor Evaluation Scorecard gives you a fair, weighted scoring system to compare vendor proposals side by side.",
  },
  {
    title: "Planning — Risk & Quality",
    color: "#D97706",
    templates: [
      { name: "Risk Register", href: `${BASE}/risk-register` },
      { name: "Risk Assessment Matrix (Heat Map)", href: `${BASE}/risk-assessment-matrix` },
      { name: "Quality Management Plan", href: `${BASE}/quality-management-plan` },
      { name: "Quality Checklist", href: `${BASE}/quality-checklist` },
    ],
    explanation: "Every project has risks (things that might go wrong) and quality standards (rules for what \"good enough\" looks like). The Risk Register is your living list of all identified risks, including how likely each one is, how bad it would be if it happened, and what you plan to do about it. The Risk Assessment Matrix (sometimes called a heat map) is a visual chart that plots risks by probability and impact so you can quickly see which ones need the most attention. The Quality Management Plan defines your quality standards, who is responsible for quality checks (often called QA, which stands for Quality Assurance), and how you will verify deliverables meet those standards. The Quality Checklist is a reusable verification list you can use at phase gates or deliverable reviews to confirm nothing was missed.",
  },
  {
    title: "Planning — Communications & Stakeholders",
    color: "#0891B2",
    templates: [
      { name: "Communications Plan", href: `${BASE}/communications-plan` },
      { name: "Stakeholder Engagement Plan", href: `${BASE}/stakeholder-engagement-plan` },
      { name: "Meeting Agenda & Minutes", href: `${BASE}/meeting-agenda-minutes` },
    ],
    explanation: "Communication is one of the biggest reasons projects succeed or fail. The Communications Plan maps out who receives what information, how often, and through what channel (email, meeting, report, etc.). The Stakeholder Engagement Plan goes deeper by defining strategies for each stakeholder group based on their level of power and interest — it tracks where each stakeholder currently stands (supportive, neutral, or resistant) and where you need them to be. The Meeting Agenda & Minutes template gives you a repeatable format for running productive meetings: a clear agenda, recorded discussion points, decisions made, and action items with owners and due dates.",
  },
  {
    title: "Executing & Monitoring",
    color: "#16A34A",
    templates: [
      { name: "Weekly Status Report", href: `${BASE}/weekly-status-report` },
      { name: "Executive Dashboard", href: `${BASE}/executive-dashboard` },
      { name: "Issue Log", href: `${BASE}/issue-log` },
      { name: "Action Item Tracker", href: `${BASE}/action-item-tracker` },
      { name: "Decision Log", href: `${BASE}/decision-log` },
      { name: "Change Control Log", href: `${BASE}/change-control-log` },
    ],
    explanation: "Once the project is underway, these templates help you track progress, report status, and manage changes. The Weekly Status Report uses a RAG format (Red, Amber, Green — where Red means at risk, Amber means watch closely, and Green means on track) to give stakeholders a quick snapshot each week. The Executive Dashboard is a one-page summary built for senior leaders who need the big picture fast. The Issue Log tracks problems that have already happened (unlike risks, which have not happened yet) with severity, impact, and resolution plans. The Action Item Tracker is a central list of every to-do that comes out of any meeting, with clear owners and due dates. The Decision Log records every important project decision so no one has to ask \"why did we do that?\" months later. The Change Control Log tracks all change requests through analysis, approval, and implementation.",
  },
  {
    title: "Closing Process Group",
    color: "#6D28D9",
    templates: [
      { name: "Project Closure Report", href: `${BASE}/project-closure-report` },
      { name: "Lessons Learned Register", href: `${BASE}/lessons-learned-register` },
      { name: "Project Handoff Checklist", href: `${BASE}/project-handoff-checklist` },
      { name: "Benefits Realization Tracker", href: `${BASE}/benefits-realization-tracker` },
    ],
    explanation: "Closing a project well is just as important as starting it well. The Project Closure Report is the formal document that summarizes what was delivered, whether the project met its objectives, final budget numbers, and any items still open. The Lessons Learned Register captures what went well, what did not go well, and what the team would do differently next time — organized so future project teams can learn from your experience. The Project Handoff Checklist ensures a smooth transition from the project team to operations, covering system access, documentation, support contacts, and service-level agreements (SLAs). The Benefits Realization Tracker follows up after the project is done to measure whether the promised business benefits (from the original Business Case) are actually being achieved.",
  },
  {
    title: "Governance & Portfolio",
    color: "#BE185D",
    templates: [
      { name: "Project Portfolio Summary", href: `${BASE}/project-portfolio-summary` },
      { name: "Phase Gate Review Checklist", href: `${BASE}/phase-gate-review-checklist` },
      { name: "Lessons Learned Library Index", href: `${BASE}/lessons-learned-library-index` },
    ],
    explanation: "These templates serve the PMO (Project Management Office) and senior leadership by providing visibility across multiple projects. The Project Portfolio Summary is a multi-project view showing RAG (Red/Amber/Green) health status, resource allocation, budget roll-ups, and how each project aligns to the organization’s strategic goals. The Phase Gate Review Checklist provides go/no-go criteria at the end of each project phase, making sure governance standards are met before the team moves forward. The Lessons Learned Library Index creates a searchable, cross-project knowledge base of lessons organized by topic area, enabling the entire organization to learn and improve over time.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#4F46E5";
  const accentDark = "#312E81";

  const linkStyle: React.CSSProperties = {
    color: C.secondary,
    textDecoration: "underline",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: S.font,
  };

  const renderSectionBox = (section: Section) => (
    <table style={{ ...S.tbl, marginBottom: "8px" }}>
      <thead>
        <tr>
          <th style={{
            ...S.thSecondary,
            backgroundColor: section.color,
            fontSize: "11px",
            padding: "8px 10px",
            letterSpacing: "0.04em",
          }}>
            {section.title} ({section.templates.length})
          </th>
        </tr>
      </thead>
      <tbody>
        {section.templates.map((t, i) => (
          <tr key={i}>
            <td style={{
              ...S.td0,
              backgroundColor: i % 2 === 0 ? C.white : C.rowAlt,
              padding: "5px 10px",
              fontSize: "12px",
            }}>
              <a href={t.href} style={linkStyle}>{t.name}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const gridRows: Section[][] = [];
  for (let i = 0; i < sections.length; i += 3) {
    gridRows.push(sections.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={14} />
            Back to PM Command Center
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">PM Command Center — Command Center</h2>
              <p className="text-xs font-medium text-indigo-600">Your One-Page Guide to the Entire Package</p>
            </div>
          </div>
        </div>

        <ThemeSwitcher />

        {/* ═══ COPYABLE AREA ═══ */}
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {/* Title Banner */}
          <table style={{ ...S.tbl, marginBottom: "4px" }}>
            <tbody>
              <tr>
                <td style={{
                  backgroundColor: C.primary, color: C.white, padding: "16px 20px",
                  fontSize: "22px", fontWeight: 800, fontFamily: S.font,
                  letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`,
                  textAlign: "center" as const,
                }}>
                  PROJECT MANAGEMENT COMMAND CENTER
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 38 Templates &nbsp;|&nbsp; 9 Sections &nbsp;|&nbsp; PMBOK-Aligned
                </td>
              </tr>
            </tbody>
          </table>

          {/* Intro Blurb */}
          <table style={{ ...S.tbl, marginBottom: "12px" }}>
            <tbody>
              <tr>
                <td style={{
                  ...S.td0, padding: "14px 16px", fontSize: "13px",
                  lineHeight: "1.6", color: C.textBody,
                }}>
                  The Project Management Command Center is your complete toolkit for running projects from idea to completion. It includes 38 professionally formatted templates organized into 9 sections that follow the PMBOK (Project Management Body of Knowledge) framework &mdash; the global standard used by project managers everywhere.
                </td>
              </tr>
            </tbody>
          </table>

          {/* ── TEMPLATE INDEX GRID ── */}
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>TEMPLATE INDEX &mdash; QUICK NAVIGATION</td></tr></tbody></table>

          {gridRows.map((row, ri) => (
            <table key={ri} style={{ ...LT, marginTop: "8px", marginBottom: ri < gridRows.length - 1 ? "0" : "12px" }}>
              <tbody>
                <tr>
                  {row.map((section, ci) => (
                    <td key={ci} style={{
                      ...LC,
                      width: `${Math.floor(100 / 3)}%`,
                      paddingRight: ci < 2 ? "6px" : "0",
                      paddingLeft: ci > 0 ? "6px" : "0",
                    }}>
                      {renderSectionBox(section)}
                    </td>
                  ))}
                  {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => (
                    <td key={`empty-${i}`} style={{ ...LC, width: `${Math.floor(100 / 3)}%` }}>&nbsp;</td>
                  ))}
                </tr>
              </tbody>
            </table>
          ))}

          {/* ── HOW TO USE THIS PACKAGE ── */}
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>HOW TO USE THIS PACKAGE</td></tr></tbody></table>

          <table style={{ ...S.tbl, marginBottom: "4px" }}>
            <tbody>
              <tr>
                <td style={{
                  ...S.td0, padding: "14px 16px", fontSize: "13px",
                  lineHeight: "1.7", color: C.textBody,
                }}>
                  <p style={{ margin: "0 0 10px 0", fontWeight: 700, fontSize: "14px", color: C.primary }}>
                    What Is the Project Management Command Center?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package gives you every template you need to manage a project professionally. It follows the PMBOK (Project Management Body of Knowledge) framework &mdash; the worldwide standard developed by PMI (Project Management Institute). Whether you are a certified PMP (Project Management Professional) or simply someone who has been asked to lead a project, these templates give you a clear, repeatable structure.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    The templates are organized in the same order that a real project flows: you start a project (Initiating), plan it in detail (Planning), do the work while tracking progress (Executing &amp; Monitoring), close it out properly (Closing), and &mdash; if you manage multiple projects &mdash; oversee them at the portfolio level (Governance).
                  </p>
                  <p style={{ margin: "0" }}>
                    Every template is designed to copy and paste cleanly into Microsoft OneNote or Word. Just copy the section you need, paste it into your notebook, and fill in the brackets with your project&apos;s details. The formatting, colors, and structure will transfer automatically.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          {sections.map((section, i) => (
            <table key={i} style={{ ...S.tbl, marginBottom: "2px" }}>
              <tbody>
                <tr>
                  <td style={{
                    backgroundColor: section.color, color: C.white,
                    padding: "8px 16px", fontFamily: S.font,
                    fontSize: "13px", fontWeight: 800,
                    letterSpacing: "0.02em", border: `1px solid ${C.border}`,
                  }}>
                    Section {i + 1}: {section.title} ({section.templates.length} templates)
                  </td>
                </tr>
                <tr>
                  <td style={{
                    ...S.td0, padding: "12px 16px", fontSize: "12.5px",
                    lineHeight: "1.65", color: C.textBody,
                  }}>
                    {section.explanation}
                  </td>
                </tr>
              </tbody>
            </table>
          ))}

          {/* Footer */}
          <table style={{ ...S.tbl, marginTop: "12px" }}>
            <tbody>
              <tr>
                <td style={{
                  backgroundColor: C.primary, color: C.footerText, padding: "8px 20px",
                  fontSize: "10px", fontFamily: S.font, textAlign: "center" as const,
                  letterSpacing: "0.06em",
                }}>
                  ExecNoteShop &nbsp;&bull;&nbsp; Project Management Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function PMCommandCenterCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
