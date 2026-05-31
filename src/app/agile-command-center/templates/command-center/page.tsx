"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/agile-command-center/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Start Here",
    color: "#0EA5E9",
    templates: [
      { name: "READ THIS FIRST — How This Pack Works", href: `${BASE}/read-this-first` },
      { name: "Agile/Scrum Command Dashboard", href: `${BASE}/command-dashboard` },
      { name: "Quick Start + Setup Checklist", href: `${BASE}/quick-start` },
      { name: "Roles & Responsibilities Map", href: `${BASE}/roles-responsibilities` },
      { name: "Working Agreements + Team Norms", href: `${BASE}/working-agreements` },
    ],
    explanation: "Start here to get oriented and set up your team’s operating system. The READ THIS FIRST page explains what this pack is, how to use it alongside tools like Jira or Asana, and how to build your sprint rhythm. The Agile/Scrum Command Dashboard is your one-page mission control — sprint goal, top priorities, blockers, metrics, and next events all in one view. The Quick Start + Setup Checklist walks you through initial configuration step by step so you get value on day one. The Roles & Responsibilities Map clarifies who does what on the Scrum team: Product Owner (PO), Scrum Master (SM), developers, and stakeholders. Working Agreements + Team Norms document the rules your team agrees to follow — communication expectations, meeting behavior, response times, and how conflicts get resolved.",
  },
  {
    title: "Product Strategy & Value",
    color: "#8B5CF6",
    templates: [
      { name: "Product Vision + Outcome Statement", href: `${BASE}/product-vision` },
      { name: "Problem Statement + Target Users/Personas", href: `${BASE}/problem-statement` },
      { name: "Value Hypotheses + Assumptions Log", href: `${BASE}/value-hypotheses` },
      { name: "Success Metrics + North Star Tracker", href: `${BASE}/success-metrics` },
      { name: "Stakeholder Map + Communication Plan", href: `${BASE}/stakeholder-map` },
      { name: "Product Glossary / Definitions", href: `${BASE}/product-glossary` },
    ],
    explanation: "Before writing any user stories, your team needs to understand why the product exists and who it serves. The Product Vision + Outcome Statement captures what you are building, for whom, and how you will measure success — in an OKR-friendly format (OKR stands for Objectives and Key Results). The Problem Statement + Target Users/Personas document defines who you are helping and what pain you are solving, which makes prioritization and story-writing much clearer. Value Hypotheses + Assumptions Log captures what you believe to be true and what must be tested — making uncertainty visible early instead of discovering it late. The Success Metrics + North Star Tracker defines leading and lagging indicators with targets so the team stays focused on outcomes, not just output. The Stakeholder Map + Communication Plan identifies who needs what updates, how often, and in what format. The Product Glossary defines common terms and acronyms so the whole team speaks the same language.",
  },
  {
    title: "Roadmap & Release Planning",
    color: "#F59E0B",
    templates: [
      { name: "Product Roadmap (Now / Next / Later)", href: `${BASE}/product-roadmap` },
      { name: "Release / Increment Plan", href: `${BASE}/release-plan` },
      { name: "Dependency Map", href: `${BASE}/dependency-map` },
      { name: "Agile RAID-Lite", href: `${BASE}/raid-lite` },
      { name: "Decision Log", href: `${BASE}/decision-log` },
    ],
    explanation: "These templates give your team direction without pretending you know everything upfront. The Product Roadmap uses a Now / Next / Later format that is honest about certainty — what is committed now, what is likely next, and what is on the horizon later. This format is executive-friendly and flexible. The Release / Increment Plan groups work into major releases with themes and target outcomes. The Dependency Map tracks dependencies on other teams, systems, or vendors — most project delays come from dependencies, so making them visible is critical. Agile RAID-Lite is a lightweight log for Risks, Assumptions, Issues, and Dependencies (RAID) that prevents hidden project killers from going unnoticed. The Decision Log records decisions with context, options considered, and the owner so no one has to ask “why did we do that?” later.",
  },
  {
    title: "Backlog System",
    color: "#EF4444",
    templates: [
      { name: "Backlog Master (Epics / Features / Stories)", href: `${BASE}/backlog-master` },
      { name: "Backlog Prioritization (MoSCoW + WSJF-Lite)", href: `${BASE}/backlog-prioritization` },
      { name: "Story Mapping (User Journey Map)", href: `${BASE}/story-mapping` },
      { name: "User Story + Acceptance Criteria Builder", href: `${BASE}/user-story-builder` },
      { name: "Definition of Ready (DoR)", href: `${BASE}/definition-of-ready` },
      { name: "Backlog Refinement Agenda + Notes", href: `${BASE}/backlog-refinement` },
      { name: "Estimation Guide + Reference Stories", href: `${BASE}/estimation-guide` },
      { name: "Estimation & Velocity Tracker", href: `${BASE}/velocity-tracker` },
    ],
    explanation: "The backlog is the single source of truth for what the team will build. The Backlog Master organizes work into a hierarchy: Epics (large efforts), Features (mid-size chunks), and User Stories (small, deliverable pieces). Backlog Prioritization uses MoSCoW (Must have, Should have, Could have, Won’t have) and WSJF-Lite (Weighted Shortest Job First — a method that ranks items by value divided by effort) to remove opinion battles. Story Mapping visualizes the user journey so you do not build random features. The User Story + Acceptance Criteria Builder prompts you to write stories in the standard format: “As a [user], I want [something] so that [benefit]” with clear acceptance criteria. The Definition of Ready (DoR) is a checklist of what must be true before a story enters a sprint — preventing half-baked work from causing sprint chaos. The Backlog Refinement Agenda structures your regular grooming sessions. The Estimation Guide provides reference stories for consistent sizing. The Estimation & Velocity Tracker records velocity (points completed per sprint) over time to help plan capacity realistically.",
  },
  {
    title: "Sprint Planning & Commitments",
    color: "#059669",
    templates: [
      { name: "Sprint Planning Worksheet", href: `${BASE}/sprint-planning` },
      { name: "Sprint Goal + Sprint Backlog", href: `${BASE}/sprint-goal` },
      { name: "Capacity Planner", href: `${BASE}/capacity-planner` },
      { name: "Sprint Calendar + Key Events", href: `${BASE}/sprint-calendar` },
      { name: "Sprint Kickoff Checklist", href: `${BASE}/sprint-kickoff` },
      { name: "Sprint Scope Change Log", href: `${BASE}/sprint-scope-change` },
    ],
    explanation: "Sprint planning is where strategy becomes action for the next one to four weeks. The Sprint Planning Worksheet captures capacity, the sprint goal, selected stories, risks, and constraints — it is the best “anti-overcommit” page in this pack. The Sprint Goal + Sprint Backlog defines what the team is trying to achieve this sprint and exactly what work is in scope (and what is explicitly out). The Capacity Planner calculates who is available, how many hours they have, and what the realistic capacity is after accounting for meetings, time off, and a focus factor. The Sprint Calendar + Key Events lays out ceremonies, demos, release dates, and stakeholder check-ins to prevent scheduling surprises. The Sprint Kickoff Checklist is a “ready to start?” verification before day one. The Sprint Scope Change Log tracks anything added mid-sprint and what was removed to make room — stopping scope creep before it derails the commitment.",
  },
  {
    title: "Daily Execution",
    color: "#0891B2",
    templates: [
      { name: "Daily Scrum Notes + Impediment Log", href: `${BASE}/daily-scrum` },
      { name: "Impediment Log (Detailed)", href: `${BASE}/impediment-log` },
      { name: "Task Breakdown / To-Do", href: `${BASE}/task-breakdown` },
      { name: "Blocker Escalation / Help Request", href: `${BASE}/blocker-escalation` },
      { name: "Sprint Progress Tracker", href: `${BASE}/sprint-progress` },
      { name: "Definition of Done (DoD)", href: `${BASE}/definition-of-done` },
    ],
    explanation: "Day-to-day execution is where sprints are won or lost. The Daily Scrum Notes + Impediment Log is the simplest daily momentum system: what did you do yesterday, what will you do today, and what is blocking you. The Impediment Log (Detailed) provides a deeper tracking format for blockers with owner, escalation path, next step, and due date to prevent blockers from aging. The Task Breakdown / To-Do helps teams that need extra structure by splitting stories into smaller tasks. The Blocker Escalation / Help Request is a structured “ask” page for when you need leadership or vendor help — it makes escalations fast and clear. The Sprint Progress Tracker shows story status, a text-based burndown, and a sprint health dashboard so the whole team sees daily progress. The Definition of Done (DoD) is a quality checklist that defines what “complete” really means, with examples and a health check to prevent fake completion.",
  },
  {
    title: "Quality & Delivery",
    color: "#DC2626",
    templates: [
      { name: "Bug / Defect Tracker", href: `${BASE}/bug-tracker` },
      { name: "QA / Test Summary", href: `${BASE}/qa-test-summary` },
      { name: "Release Readiness Checklist", href: `${BASE}/release-readiness` },
      { name: "Tech Debt / Improvement Backlog", href: `${BASE}/tech-debt` },
      { name: "Deployment / Release Notes", href: `${BASE}/release-notes` },
    ],
    explanation: "Quality and delivery go hand in hand. The Bug / Defect Tracker logs every bug with severity, priority, status, triage rules, and a summary dashboard — making defects impossible to ignore. QA (Quality Assurance) / Test Summary records per-story test results, quality metrics, and QA risks so fewer defects make it to production. The Release Readiness Checklist is a pre-release checkpoint covering code, testing, deployment steps, communication, and a go/no-go sign-off to prevent painful launches. The Tech Debt / Improvement Backlog uses impact-times-urgency scoring to manage technical shortcuts the team took and plan when to pay them down. Deployment / Release Notes document what shipped, deployment details, monitoring plans, and rollback triggers in case something goes wrong.",
  },
  {
    title: "Review, Retro & Improvement",
    color: "#D946EF",
    templates: [
      { name: "Sprint Review / Demo Prep", href: `${BASE}/sprint-review` },
      { name: "Sprint Retrospective", href: `${BASE}/sprint-retrospective` },
      { name: "Improvement Action Tracker", href: `${BASE}/improvement-tracker` },
      { name: "Sprint Wrapup / Carryover Log", href: `${BASE}/sprint-wrapup` },
      { name: "Team Health Radar", href: `${BASE}/team-health-radar` },
    ],
    explanation: "Continuous improvement is what separates good Agile teams from great ones. The Sprint Review / Demo Prep structures a polished demo with a review agenda, demo script, setup notes, stakeholder feedback capture, and sprint outcome summary. The Sprint Retrospective uses the Start / Stop / Continue format with improvement actions, previous action review, and a team health check to turn retros into real improvement instead of just venting sessions. The Improvement Action Tracker follows retro actions across sprints so improvements actually get done — tracking completed history, recurring patterns, and systemic fixes. The Sprint Wrapup / Carryover Log captures the final sprint outcome and details on any work that carries over to the next sprint, including reasons. The Team Health Radar measures 10 dimensions of team health with multi-sprint trends and improvement actions.",
  },
  {
    title: "Metrics & Reporting",
    color: "#EA580C",
    templates: [
      { name: "Velocity & Sprint Metrics", href: `${BASE}/velocity-metrics` },
      { name: "Cumulative Flow / WIP Report", href: `${BASE}/cumulative-flow` },
      { name: "Stakeholder / Executive Status Report", href: `${BASE}/executive-status` },
    ],
    explanation: "Data helps your team improve and gives leadership confidence. Velocity & Sprint Metrics shows a six-sprint velocity history, key metrics dashboard, and planning recommendations — giving a data-driven view of team performance over time. The Cumulative Flow / WIP (Work In Progress) Report tracks daily flow counts across workflow stages, analyzes where bottlenecks form, and provides flow recommendations. WIP limits help teams avoid taking on too much work at once, which is one of the most common causes of slow delivery. The Stakeholder / Executive Status Report translates sprint data into an executive-friendly summary with release progress by epic, risks for leadership attention, and a preview of the next sprint.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#0EA5E9";
  const accentDark = "#0C4A6E";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center">
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
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors">
            <ArrowLeft size={14} />
            Back to Agile Command Center
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-sky-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Agile / Scrum Delivery Command Center &mdash; Command Center</h2>
              <p className="text-xs font-medium text-sky-600">Your One-Page Guide to the Entire Package</p>
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
                  AGILE / SCRUM DELIVERY COMMAND CENTER
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 49 Templates &nbsp;|&nbsp; 9 Sections &nbsp;|&nbsp; Full Scrum Lifecycle
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
                  The Agile / Scrum Delivery Command Center is your complete operating system for running Agile projects using the Scrum framework. It includes 49 professionally formatted templates organized into 9 sections that cover the full sprint lifecycle &mdash; from product vision and backlog management through daily execution, demos, retrospectives, and metrics reporting.
                </td>
              </tr>
            </tbody>
          </table>

          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>TEMPLATE INDEX &mdash; QUICK NAVIGATION</td></tr></tbody></table>

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

          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>HOW TO USE THIS PACKAGE</td></tr></tbody></table>

          <table style={{ ...S.tbl, marginBottom: "4px" }}>
            <tbody>
              <tr>
                <td style={{
                  ...S.td0, padding: "14px 16px", fontSize: "13px",
                  lineHeight: "1.7", color: C.textBody,
                }}>
                  <p style={{ margin: "0 0 10px 0", fontWeight: 700, fontSize: "14px", color: C.primary }}>
                    What Is the Agile / Scrum Delivery Command Center?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package is designed for Scrum Masters, Product Owners, Agile coaches, and team leads who run projects using the Scrum framework. Scrum is an Agile methodology where work is delivered in short, repeatable cycles called sprints (usually one to four weeks long). Each sprint has a clear goal, a set of user stories to complete, and a rhythm of ceremonies: planning, daily standups, reviews, and retrospectives.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    Your Jira, Asana, or Trello board is where tasks move. This OneNote Command Center is where you run the project like a pro: setting the product vision, managing the backlog, making sprint planning decisions, capturing daily notes and blockers, running polished demos, holding effective retros, and reporting metrics to stakeholders.
                  </p>
                  <p style={{ margin: "0" }}>
                    Every template is designed to copy and paste cleanly into Microsoft OneNote or Word. Start with the READ THIS FIRST page and the Quick Start checklist to get set up, then use the Command Dashboard as your daily home base.
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
                    Section {String.fromCharCode(65 + i)}: {section.title} ({section.templates.length} templates)
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
                  ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function AgileCommandCenterCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
