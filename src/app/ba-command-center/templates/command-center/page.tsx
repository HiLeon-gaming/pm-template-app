"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/ba-command-center/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Stakeholder & Elicitation",
    color: "#7C3AED",
    templates: [
      { name: "Stakeholder Analysis Map", href: `${BASE}/stakeholder-analysis-map` },
      { name: "Elicitation Plan", href: `${BASE}/elicitation-plan` },
      { name: "Interview Guide", href: `${BASE}/interview-guide` },
      { name: "Workshop Facilitation Plan", href: `${BASE}/workshop-facilitation-plan` },
      { name: "Survey / Questionnaire Builder", href: `${BASE}/survey-questionnaire` },
    ],
    explanation: "Before you can document requirements, you need to understand the people and gather information. The Stakeholder Analysis Map helps you identify every person or group who has a stake in the project and assess their level of power, interest, and influence. The Elicitation Plan is your game plan for how you will collect information \u2014 which techniques you will use, when, and with whom. Elicitation simply means \"drawing out\" information from people. The Interview Guide gives you a structured set of questions and tips for running one-on-one or small-group interviews with subject matter experts (SMEs). The Workshop Facilitation Plan helps you design and run collaborative working sessions where multiple stakeholders come together to define requirements. The Survey / Questionnaire Builder provides a framework for gathering input from a larger audience when interviews are not practical.",
  },
  {
    title: "Requirements Documentation",
    color: "#2563EB",
    templates: [
      { name: "Business Requirements Document (BRD)", href: `${BASE}/business-requirements-document` },
      { name: "Functional Requirements Spec", href: `${BASE}/functional-requirements-spec` },
      { name: "Non-Functional Requirements", href: `${BASE}/non-functional-requirements` },
      { name: "User Story Template", href: `${BASE}/user-story-template` },
      { name: "Use Case Template", href: `${BASE}/use-case-template` },
      { name: "Acceptance Criteria Template", href: `${BASE}/acceptance-criteria-template` },
    ],
    explanation: "This is the heart of business analysis \u2014 writing down what the solution must do. The Business Requirements Document (BRD) captures the high-level business needs: what problem are we solving, who benefits, and what does success look like. The Functional Requirements Spec gets more detailed, listing specific features and behaviors the system must have (for example, \"the system shall allow users to reset their password via email\"). Non-Functional Requirements (NFRs) cover qualities like performance, security, scalability, and usability \u2014 things the system must be, not what it must do. The User Story Template follows the Agile format: \"As a [type of user], I want [something] so that [benefit].\" The Use Case Template describes step-by-step interactions between a user and the system. The Acceptance Criteria Template defines the specific conditions that must be true for a requirement or story to be considered complete.",
  },
  {
    title: "Requirements Management",
    color: "#059669",
    templates: [
      { name: "Requirements Traceability Matrix", href: `${BASE}/requirements-traceability-matrix` },
      { name: "Requirements Prioritization Matrix", href: `${BASE}/requirements-prioritization-matrix` },
      { name: "Change Request Template", href: `${BASE}/change-request-template` },
      { name: "Requirements Sign-Off Sheet", href: `${BASE}/requirements-signoff-sheet` },
    ],
    explanation: "Once requirements are documented, they need to be tracked, prioritized, and formally approved. The Requirements Traceability Matrix (RTM) links every requirement back to its source (who asked for it and why) and forward to its design, test case, and delivery status. This makes sure nothing falls through the cracks. The Requirements Prioritization Matrix uses methods like MoSCoW (Must have, Should have, Could have, Won\u2019t have) or weighted scoring to help the team and stakeholders agree on what to build first. The Change Request Template captures any proposed changes to approved requirements with a clear impact analysis so decision-makers have the information they need. The Requirements Sign-Off Sheet is a formal approval record where stakeholders confirm that the documented requirements are complete and accurate before the team begins building.",
  },
  {
    title: "Analysis & Discovery",
    color: "#D97706",
    templates: [
      { name: "Current State / Future State Analysis", href: `${BASE}/current-state-future-state` },
      { name: "Gap Analysis", href: `${BASE}/gap-analysis` },
      { name: "SWOT Analysis", href: `${BASE}/swot-analysis` },
      { name: "Root Cause Analysis", href: `${BASE}/root-cause-analysis` },
      { name: "Business Process Model", href: `${BASE}/business-process-model` },
      { name: "Business Rules Catalog", href: `${BASE}/business-rules-catalog` },
    ],
    explanation: "These templates help you understand where things stand today and where they need to go. The Current State / Future State Analysis documents how things work now and how they should work after the project is complete. The Gap Analysis identifies the specific differences (gaps) between the current state and the desired future state, which then become the requirements or actions needed. The SWOT Analysis examines Strengths, Weaknesses, Opportunities, and Threats to provide a well-rounded view of the situation. Root Cause Analysis (RCA) helps you dig beneath surface-level symptoms to find the true underlying cause of a problem \u2014 often using techniques like the \"5 Whys\" or fishbone diagrams. The Business Process Model maps out workflows step by step so everyone can see how work actually flows through the organization. The Business Rules Catalog lists the policies, regulations, and logic that the solution must enforce (for example, \"orders over $5,000 require VP approval\").",
  },
  {
    title: "Solution Design & Evaluation",
    color: "#DC2626",
    templates: [
      { name: "Solution Options Analysis", href: `${BASE}/solution-options-analysis` },
      { name: "Feasibility Study", href: `${BASE}/feasibility-study` },
      { name: "Impact Analysis", href: `${BASE}/impact-analysis` },
      { name: "Data Dictionary", href: `${BASE}/data-dictionary` },
      { name: "Interface Specification", href: `${BASE}/interface-specification` },
    ],
    explanation: "Before building anything, you need to evaluate your options and design the right solution. The Solution Options Analysis compares multiple approaches (buy vs. build, vendor A vs. vendor B, etc.) using weighted criteria so the decision is objective, not opinion-based. The Feasibility Study assesses whether a proposed solution is technically possible, financially justified, and operationally practical. The Impact Analysis examines what will change if a particular solution is implemented \u2014 which teams, processes, systems, and data will be affected. The Data Dictionary defines every data element the solution will use: field names, data types, valid values, and where the data comes from. The Interface Specification documents how the solution will communicate with other systems through APIs (Application Programming Interfaces), file transfers, or other integration methods.",
  },
  {
    title: "Testing & Validation",
    color: "#0891B2",
    templates: [
      { name: "UAT Plan", href: `${BASE}/uat-plan` },
      { name: "Test Case Template", href: `${BASE}/test-case-template` },
      { name: "Defect Log", href: `${BASE}/defect-log` },
      { name: "UAT Sign-Off Sheet", href: `${BASE}/uat-signoff-sheet` },
    ],
    explanation: "Testing proves that the solution actually does what the requirements said it should. The UAT Plan (User Acceptance Testing Plan) defines the scope, approach, schedule, participants, and entry/exit criteria for the final round of testing done by business users. UAT is the last checkpoint before go-live \u2014 it answers the question: \"Does this solution meet the business needs?\" The Test Case Template provides a structured format for writing individual tests with steps, expected results, and pass/fail criteria. The Defect Log tracks every bug or issue found during testing, with severity, priority, status, and the person responsible for fixing it. The UAT Sign-Off Sheet is the formal document where business stakeholders confirm that testing is complete and the solution is approved for release.",
  },
  {
    title: "Communication & Governance",
    color: "#BE185D",
    templates: [
      { name: "BA Status Report", href: `${BASE}/ba-status-report` },
      { name: "Meeting Notes Template", href: `${BASE}/meeting-notes-template` },
      { name: "Decision Log", href: `${BASE}/decision-log` },
      { name: "Stakeholder Presentation Template", href: `${BASE}/stakeholder-presentation-template` },
    ],
    explanation: "Good analysis is wasted if it is not communicated clearly. The BA Status Report gives stakeholders a regular update on analysis progress, open items, risks, and upcoming milestones \u2014 using the familiar RAG (Red/Amber/Green) format. The Meeting Notes Template captures discussion points, decisions, and action items from any BA-related meeting so nothing is lost. The Decision Log records every significant decision made during analysis \u2014 what was decided, who decided it, when, and why \u2014 so the team has a clear audit trail. The Stakeholder Presentation Template helps you structure findings, recommendations, and next steps into a clean, professional format that is ready for leadership or steering committee reviews.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#7C3AED";
  const accentDark = "#4C1D95";

  const linkStyle: React.CSSProperties = {
    color: C.secondary, textDecoration: "underline",
    fontSize: "12px", fontWeight: 600, fontFamily: S.font,
  };

  const renderSectionBox = (section: Section) => (
    <table style={{ ...S.tbl, marginBottom: "8px" }}>
      <thead>
        <tr>
          <th style={{
            ...S.thSecondary, backgroundColor: section.color,
            fontSize: "11px", padding: "8px 10px", letterSpacing: "0.04em",
          }}>
            {section.title} ({section.templates.length})
          </th>
        </tr>
      </thead>
      <tbody>
        {section.templates.map((t, i) => (
          <tr key={i}>
            <td style={{
              ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt,
              padding: "5px 10px", fontSize: "12px",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center">
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
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors">
            <ArrowLeft size={14} />
            Back to BA Command Center
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-violet-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">BA Command Center &mdash; Command Center</h2>
              <p className="text-xs font-medium text-violet-600">Your One-Page Guide to the Entire Package</p>
            </div>
          </div>
        </div>

        <ThemeSwitcher />

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          <table style={{ ...S.tbl, marginBottom: "4px" }}>
            <tbody>
              <tr>
                <td style={{
                  backgroundColor: C.primary, color: C.white, padding: "16px 20px",
                  fontSize: "22px", fontWeight: 800, fontFamily: S.font,
                  letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`,
                  textAlign: "center" as const,
                }}>
                  BUSINESS ANALYST COMMAND CENTER
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 34 Templates &nbsp;|&nbsp; 7 Sections &nbsp;|&nbsp; Full BA Lifecycle
                </td>
              </tr>
            </tbody>
          </table>

          <table style={{ ...S.tbl, marginBottom: "12px" }}>
            <tbody>
              <tr>
                <td style={{
                  ...S.td0, padding: "14px 16px", fontSize: "13px",
                  lineHeight: "1.6", color: C.textBody,
                }}>
                  The Business Analyst Command Center is your complete toolkit for requirements gathering, analysis, and stakeholder management. It includes 34 professionally formatted templates organized into 7 sections that cover the full BA (Business Analyst) lifecycle &mdash; from stakeholder interviews and elicitation all the way through UAT (User Acceptance Testing) sign-off and governance.
                </td>
              </tr>
            </tbody>
          </table>

          <div style={S.sectionBanner(accent)}>TEMPLATE INDEX &mdash; QUICK NAVIGATION</div>

          {gridRows.map((row, ri) => (
            <table key={ri} style={{ ...LT, marginTop: "8px", marginBottom: ri < gridRows.length - 1 ? "0" : "12px" }}>
              <tbody>
                <tr>
                  {row.map((section, ci) => (
                    <td key={ci} style={{
                      ...LC, width: `${Math.floor(100 / 3)}%`,
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

          <div style={S.sectionBanner(accentDark)}>HOW TO USE THIS PACKAGE</div>

          <table style={{ ...S.tbl, marginBottom: "4px" }}>
            <tbody>
              <tr>
                <td style={{
                  ...S.td0, padding: "14px 16px", fontSize: "13px",
                  lineHeight: "1.7", color: C.textBody,
                }}>
                  <p style={{ margin: "0 0 10px 0", fontWeight: 700, fontSize: "14px", color: C.primary }}>
                    What Is the Business Analyst Command Center?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package gives you every template a Business Analyst (BA) needs to do their job well. A BA is the person who bridges the gap between business stakeholders (the people who need something built or improved) and the technical team (the people who build it). The BA&apos;s main job is to understand what the business needs, document those needs clearly as requirements, and make sure the final solution actually solves the right problem.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    The templates are organized in the natural order of BA work: first you identify and engage stakeholders, then you gather and document requirements, manage changes to those requirements, analyze the current situation, evaluate solutions, test the result, and communicate throughout. You do not need to use every template on every project &mdash; pick the ones that fit your project&apos;s size and complexity.
                  </p>
                  <p style={{ margin: "0" }}>
                    Every template is designed to copy and paste cleanly into Microsoft OneNote or Word. Just copy the section you need, paste it into your notebook, and fill in the brackets with your project&apos;s details.
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

          <table style={{ ...S.tbl, marginTop: "12px" }}>
            <tbody>
              <tr>
                <td style={{
                  backgroundColor: C.primary, color: C.footerText, padding: "8px 20px",
                  fontSize: "10px", fontFamily: S.font, textAlign: "center" as const,
                  letterSpacing: "0.06em",
                }}>
                  ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function BACommandCenterCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
