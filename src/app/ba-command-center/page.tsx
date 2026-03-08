"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layout,
  Sparkles,
  Search,
  FileText,
  Users,
  GitBranch,
  CheckSquare,
  MessageSquare,
  Database,
  Workflow,
  Target,
  BarChart3,
  Lock,
  Settings,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

interface Template {
  title: string;
  description: string;
  href: string | null;
  badge?: string;
}

interface Category {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  templates: Template[];
}

const categories: Category[] = [
  {
    title: "Stakeholder & Elicitation",
    subtitle: "Identify stakeholders, plan & conduct elicitation",
    icon: Users,
    color: "#7C3AED",
    templates: [
      {
        title: "Stakeholder Analysis & Map",
        description:
          "Identifies all stakeholders with power/interest grid, communication preferences, influence level & engagement approach.",
        href: "/ba-command-center/templates/stakeholder-analysis-map",
        badge: "✅ Built",
      },
      {
        title: "Elicitation Plan",
        description:
          "Plans elicitation techniques (interviews, workshops, surveys, observation) with schedule, participants & preparation notes.",
        href: "/ba-command-center/templates/elicitation-plan",
        badge: "✅ Built",
      },
      {
        title: "Interview Guide Template",
        description:
          "Structured interview template with open/closed questions, probing follow-ups, and space for notes & key findings.",
        href: "/ba-command-center/templates/interview-guide",
        badge: "✅ Built",
      },
      {
        title: "Workshop Facilitation Plan",
        description:
          "Agenda, ground rules, activities, participant roles & expected outputs for requirements workshops.",
        href: "/ba-command-center/templates/workshop-facilitation-plan",
        badge: "✅ Built",
      },
      {
        title: "Survey / Questionnaire Template",
        description:
          "Structured survey with Likert scales, ranking, open-ended questions & response analysis framework.",
        href: "/ba-command-center/templates/survey-questionnaire",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Requirements Documentation",
    subtitle: "Capture, organize & formalize requirements",
    icon: FileText,
    color: "#4F46E5",
    templates: [
      {
        title: "Business Requirements Document (BRD)",
        description:
          "Comprehensive BRD covering business need, scope, stakeholders, requirements (functional & non-functional), assumptions & constraints.",
        href: "/ba-command-center/templates/business-requirements-document",
        badge: "✅ Built",
      },
      {
        title: "Functional Requirements Specification",
        description:
          "Detailed functional requirements organized by business process or feature area with acceptance criteria.",
        href: "/ba-command-center/templates/functional-requirements-spec",
        badge: "✅ Built",
      },
      {
        title: "Non-Functional Requirements",
        description:
          "Performance, security, scalability, usability, compliance & availability requirements with measurable targets.",
        href: "/ba-command-center/templates/non-functional-requirements",
        badge: "✅ Built",
      },
      {
        title: "User Story Template",
        description:
          "As a [user], I want [goal] so that [benefit]. Includes acceptance criteria, priority, story points & dependencies.",
        href: "/ba-command-center/templates/user-story-template",
        badge: "✅ Built",
      },
      {
        title: "Use Case Template",
        description:
          "Actor, preconditions, main flow, alternate flows, exceptions, postconditions & business rules for each use case.",
        href: "/ba-command-center/templates/use-case-template",
        badge: "✅ Built",
      },
      {
        title: "Acceptance Criteria Template",
        description:
          "Given/When/Then format for each requirement. Includes test scenarios, expected results & sign-off fields.",
        href: "/ba-command-center/templates/acceptance-criteria-template",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Requirements Management",
    subtitle: "Trace, prioritize & manage changes",
    icon: GitBranch,
    color: "#2563EB",
    templates: [
      {
        title: "Requirements Traceability Matrix (RTM)",
        description:
          "Links each requirement to its source, design element, test case & delivery status. Full lifecycle traceability.",
        href: "/ba-command-center/templates/requirements-traceability-matrix",
        badge: "✅ Built",
      },
      {
        title: "Requirements Prioritization Matrix",
        description:
          "MoSCoW, weighted scoring, or Kano model prioritization with stakeholder consensus tracking.",
        href: "/ba-command-center/templates/requirements-prioritization-matrix",
        badge: "✅ Built",
      },
      {
        title: "Change Request Template",
        description:
          "Formal change request with impact analysis (scope, schedule, cost, risk), approval workflow & implementation plan.",
        href: "/ba-command-center/templates/change-request-template",
        badge: "✅ Built",
      },
      {
        title: "Requirements Sign-off Sheet",
        description:
          "Formal approval document for baselined requirements. Includes reviewer comments, conditions & signatures.",
        href: "/ba-command-center/templates/requirements-signoff-sheet",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Analysis & Discovery",
    subtitle: "Analyze current state, model processes, identify gaps",
    icon: Search,
    color: "#0891B2",
    templates: [
      {
        title: "Current State / Future State Analysis",
        description:
          "Side-by-side comparison of current (as-is) and future (to-be) processes, systems, capabilities & pain points.",
        href: "/ba-command-center/templates/current-state-future-state",
        badge: "✅ Built",
      },
      {
        title: "Gap Analysis",
        description:
          "Identifies gaps between current and desired state. Maps each gap to requirements, priority & recommended solution.",
        href: "/ba-command-center/templates/gap-analysis",
        badge: "✅ Built",
      },
      {
        title: "SWOT Analysis",
        description:
          "Strengths, Weaknesses, Opportunities & Threats framework for strategic business analysis.",
        href: "/ba-command-center/templates/swot-analysis",
        badge: "✅ Built",
      },
      {
        title: "Root Cause Analysis (5 Whys / Fishbone)",
        description:
          "Structured root cause investigation using 5-Whys drill-down and Ishikawa fishbone diagram framework.",
        href: "/ba-command-center/templates/root-cause-analysis",
        badge: "✅ Built",
      },
      {
        title: "Business Process Model",
        description:
          "Process flow documentation template with swim lanes, decision points, inputs/outputs & process metrics.",
        href: "/ba-command-center/templates/business-process-model",
        badge: "✅ Built",
      },
      {
        title: "Business Rules Catalog",
        description:
          "Central register of all business rules with rule ID, description, source, enforcement method & validation.",
        href: "/ba-command-center/templates/business-rules-catalog",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Solution Design & Evaluation",
    subtitle: "Evaluate options, design solutions, assess impact",
    icon: Lightbulb,
    color: "#D97706",
    templates: [
      {
        title: "Solution Options Analysis",
        description:
          "Compares 2-4 solution alternatives with weighted criteria scoring, pros/cons, cost estimates & recommendation.",
        href: "/ba-command-center/templates/solution-options-analysis",
        badge: "✅ Built",
      },
      {
        title: "Feasibility Study Template",
        description:
          "Technical, operational, economic & schedule feasibility assessment with go/no-go recommendation.",
        href: "/ba-command-center/templates/feasibility-study",
        badge: "✅ Built",
      },
      {
        title: "Impact Analysis",
        description:
          "Assesses impact of proposed changes on people, processes, systems & organization. Includes readiness assessment.",
        href: "/ba-command-center/templates/impact-analysis",
        badge: "✅ Built",
      },
      {
        title: "Data Dictionary",
        description:
          "Defines all data elements with name, type, format, valid values, business rules, source system & owner.",
        href: "/ba-command-center/templates/data-dictionary",
        badge: "✅ Built",
      },
      {
        title: "Interface Specification",
        description:
          "Documents system interfaces: endpoints, data formats, protocols, frequency, error handling & SLAs.",
        href: "/ba-command-center/templates/interface-specification",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Testing & Validation",
    subtitle: "Plan UAT, track defects, obtain sign-off",
    icon: CheckSquare,
    color: "#16A34A",
    templates: [
      {
        title: "UAT Plan",
        description:
          "User Acceptance Testing plan with scope, test strategy, entry/exit criteria, schedule, roles & environment setup.",
        href: "/ba-command-center/templates/uat-plan",
        badge: "✅ Built",
      },
      {
        title: "Test Case Template",
        description:
          "Test case ID, description, preconditions, test steps, expected results, actual results & pass/fail status.",
        href: "/ba-command-center/templates/test-case-template",
        badge: "✅ Built",
      },
      {
        title: "Defect Log",
        description:
          "Defect tracking with severity, priority, status, assigned to, steps to reproduce & resolution notes.",
        href: "/ba-command-center/templates/defect-log",
        badge: "✅ Built",
      },
      {
        title: "UAT Sign-off Sheet",
        description:
          "Formal UAT completion document with test summary, outstanding defects, conditions & stakeholder signatures.",
        href: "/ba-command-center/templates/uat-signoff-sheet",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Communication & Governance",
    subtitle: "Report status, document decisions, manage meetings",
    icon: MessageSquare,
    color: "#BE185D",
    templates: [
      {
        title: "BA Status Report",
        description:
          "BA-focused status update: requirements progress, elicitation activities, risks, issues & upcoming milestones.",
        href: "/ba-command-center/templates/ba-status-report",
        badge: "✅ Built",
      },
      {
        title: "Meeting Notes Template",
        description:
          "Structured meeting notes with agenda, attendees, discussion points, decisions made & action items.",
        href: "/ba-command-center/templates/meeting-notes-template",
        badge: "✅ Built",
      },
      {
        title: "Decision Log",
        description:
          "Records analysis decisions with context, alternatives evaluated, decision rationale, maker & date.",
        href: "/ba-command-center/templates/decision-log",
        badge: "✅ Built",
      },
      {
        title: "Stakeholder Presentation Template",
        description:
          "Structured findings presentation: executive summary, analysis results, recommendations & next steps.",
        href: "/ba-command-center/templates/stakeholder-presentation-template",
        badge: "✅ Built",
      },
    ],
  },
];

const totalTemplates = categories.reduce(
  (sum, c) => sum + c.templates.length,
  0
);
const builtCount = categories.reduce(
  (sum, c) => sum + c.templates.filter((t) => t.href !== null).length,
  0
);

export default function BACommandCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                ExecNoteShop
              </h1>
              <p className="text-xs text-slate-500 -mt-0.5">
                Professional Template Studio
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold">
            <Sparkles size={11} />
            BABOK-Aligned
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
              <Search size={28} className="text-violet-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Business Analyst Command Center
              </h2>
              <p className="text-sm font-medium text-violet-600 mt-0.5">
                BABOK Guide &bull; CBAP / CCBA Aligned &bull; Full BA Lifecycle
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            The essential OneNote template notebook for Business Analysts.{" "}
            <strong>{totalTemplates} templates</strong> covering the full BA
            lifecycle — from stakeholder elicitation through UAT sign-off. Built
            on BABOK best practices with guided sample content.
          </p>
          <div className="flex items-center gap-4 mt-4">
            {builtCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 size={12} />
                {builtCount} Templates Ready
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Settings size={12} />
              {totalTemplates - builtCount} Coming Soon
            </span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="space-y-8">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.title}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: cat.color + "18" }}
                  >
                    <CatIcon size={18} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {cat.subtitle}
                    </p>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-slate-400">
                    {cat.templates.length} template{cat.templates.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.templates.map((tmpl) => {
                    const isBuilt = tmpl.href !== null;
                    const inner = (
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm font-bold ${
                                isBuilt
                                  ? "text-slate-900 group-hover:text-violet-700"
                                  : "text-slate-500"
                              } transition-colors`}
                            >
                              {tmpl.title}
                            </h4>
                            {tmpl.badge && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                                {tmpl.badge}
                              </span>
                            )}
                            {!isBuilt && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 flex items-center gap-1">
                                <Lock size={8} />
                                Coming Soon
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs mt-1 leading-relaxed ${
                              isBuilt ? "text-slate-600" : "text-slate-400"
                            }`}
                          >
                            {tmpl.description}
                          </p>
                        </div>
                        {isBuilt && (
                          <ArrowRight
                            size={14}
                            className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        )}
                      </div>
                    );

                    if (isBuilt) {
                      return (
                        <Link
                          key={tmpl.title}
                          href={tmpl.href!}
                          className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-white border-slate-200 hover:border-violet-300 hover:shadow-md hover:shadow-violet-50 cursor-pointer"
                        >
                          {inner}
                        </Link>
                      );
                    }
                    return (
                      <div
                        key={tmpl.title}
                        className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-slate-50/50 border-slate-200/60 cursor-default"
                      >
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-400">
          <p>&copy; 2026 ExecNoteShop. All rights reserved.</p>
          <p>Built for CBAP / CCBA professionals &amp; BA practitioners.</p>
        </div>
      </footer>
    </div>
  );
}
