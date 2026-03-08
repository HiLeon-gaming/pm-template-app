"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layout,
  Sparkles,
  ClipboardList,
  FileText,
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Shield,
  Target,
  Layers,
  Settings,
  TrendingUp,
  FolderOpen,
  Lock,
} from "lucide-react";

interface Template {
  title: string;
  description: string;
  href: string | null; // null = not yet built
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
    title: "Initiating Process Group",
    subtitle: "Formally authorize & define the project",
    icon: Target,
    color: "#4F46E5",
    templates: [
      {
        title: "Project Charter",
        description:
          "Formally authorizes the project. Includes purpose, objectives, scope, stakeholders, milestones, budget, risks & approval signatures.",
        href: "/pm-command-center/templates/project-charter",
        badge: "✅ Built",
      },
      {
        title: "Business Case",
        description:
          "Cost-benefit analysis justifying the project investment. Includes financial analysis, alternatives considered & recommendation.",
        href: "/pm-command-center/templates/business-case",
        badge: "✅ Built",
      },
      {
        title: "Stakeholder Register",
        description:
          "Identifies all stakeholders with their interest, influence, engagement strategy, and communication preferences.",
        href: "/pm-command-center/templates/stakeholder-register",
        badge: "✅ Built",
      },
      {
        title: "Project Selection Matrix",
        description:
          "Weighted scoring model to evaluate and prioritize competing project proposals against strategic criteria.",
        href: "/pm-command-center/templates/project-selection-matrix",
        badge: "✅ Built",
      },
      {
        title: "Assumptions & Constraints Log",
        description:
          "Living document tracking all project assumptions, constraints, and dependencies with validation status.",
        href: "/pm-command-center/templates/assumptions-constraints-log",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Planning — Scope & Requirements",
    subtitle: "Define what's in (and out) of scope",
    icon: Layers,
    color: "#7C3AED",
    templates: [
      {
        title: "Project Management Plan",
        description:
          "Master planning document integrating all subsidiary plans. Defines how the project will be executed, monitored & controlled.",
        href: "/pm-command-center/templates/project-management-plan",
        badge: "✅ Built",
      },
      {
        title: "Scope Statement",
        description:
          "Detailed description of project scope including deliverables, acceptance criteria, exclusions & constraints.",
        href: "/pm-command-center/templates/scope-statement",
        badge: "✅ Built",
      },
      {
        title: "Work Breakdown Structure (WBS)",
        description:
          "Hierarchical decomposition of total project scope into manageable work packages with WBS dictionary.",
        href: "/pm-command-center/templates/wbs",
        badge: "✅ Built",
      },
      {
        title: "Requirements Traceability Matrix",
        description:
          "Links requirements to their origin, tracks status through design, build, test & delivery phases.",
        href: "/pm-command-center/templates/requirements-traceability-matrix",
        badge: "✅ Built",
      },
      {
        title: "Change Request Log",
        description:
          "Formal change control register. Tracks request, impact analysis, approval status & implementation.",
        href: "/pm-command-center/templates/change-request-log",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Planning — Schedule & Resources",
    subtitle: "Plan time, people & capacity",
    icon: Calendar,
    color: "#2563EB",
    templates: [
      {
        title: "Project Schedule / Milestone Plan",
        description:
          "High-level schedule with phases, milestones, dependencies & critical path summary. Gantt-ready format.",
        href: "/pm-command-center/templates/project-schedule",
        badge: "✅ Built",
      },
      {
        title: "Resource Management Plan",
        description:
          "Team roles, responsibilities (RACI), resource allocation, capacity planning & skill requirements.",
        href: "/pm-command-center/templates/resource-management-plan",
        badge: "✅ Built",
      },
      {
        title: "RACI Matrix",
        description:
          "Responsible / Accountable / Consulted / Informed matrix for all project deliverables and decisions.",
        href: "/pm-command-center/templates/raci-matrix",
        badge: "✅ Built",
      },
      {
        title: "Resource Allocation Tracker",
        description:
          "Track team member assignments, utilization percentages & availability across project phases.",
        href: "/pm-command-center/templates/resource-allocation-tracker",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Planning — Budget & Procurement",
    subtitle: "Manage money & vendor relationships",
    icon: DollarSign,
    color: "#059669",
    templates: [
      {
        title: "Cost Estimate Worksheet",
        description:
          "Bottom-up cost estimation by work package. Includes labor, materials, contingency & management reserves.",
        href: "/pm-command-center/templates/cost-estimate-worksheet",
        badge: "✅ Built",
      },
      {
        title: "Budget Tracker",
        description:
          "Ongoing budget vs. actuals tracking with EVM metrics (PV, EV, AC, CPI, SPI, EAC, VAC).",
        href: "/pm-command-center/templates/budget-tracker",
        badge: "✅ Built",
      },
      {
        title: "Procurement Plan",
        description:
          "Defines make-or-buy decisions, vendor selection criteria, contract types & procurement schedule.",
        href: "/pm-command-center/templates/procurement-plan",
        badge: "✅ Built",
      },
      {
        title: "Vendor Evaluation Scorecard",
        description:
          "Weighted scoring matrix to objectively evaluate and compare vendor proposals.",
        href: "/pm-command-center/templates/vendor-evaluation-scorecard",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Planning — Risk & Quality",
    subtitle: "Anticipate threats & ensure standards",
    icon: AlertTriangle,
    color: "#D97706",
    templates: [
      {
        title: "Risk Register",
        description:
          "Comprehensive risk log with probability, impact, risk score, response strategy, owner & trigger indicators.",
        href: "/pm-command-center/templates/risk-register",
        badge: "✅ Built",
      },
      {
        title: "Risk Assessment Matrix (Heat Map)",
        description:
          "Visual probability × impact matrix for plotting and prioritizing project risks. Includes risk appetite thresholds.",
        href: "/pm-command-center/templates/risk-assessment-matrix",
        badge: "✅ Built",
      },
      {
        title: "Quality Management Plan",
        description:
          "Quality standards, metrics, QA/QC activities, quality roles & acceptance criteria definitions.",
        href: "/pm-command-center/templates/quality-management-plan",
        badge: "✅ Built",
      },
      {
        title: "Quality Checklist",
        description:
          "Reusable verification checklist for deliverable reviews, phase gates & process audits.",
        href: "/pm-command-center/templates/quality-checklist",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Planning — Communications & Stakeholders",
    subtitle: "Keep everyone informed & engaged",
    icon: MessageSquare,
    color: "#0891B2",
    templates: [
      {
        title: "Communications Plan",
        description:
          "Who gets what information, when, how & by whom. Includes meeting cadence, report distribution & escalation paths.",
        href: "/pm-command-center/templates/communications-plan",
        badge: "✅ Built",
      },
      {
        title: "Stakeholder Engagement Plan",
        description:
          "Strategies for each stakeholder group based on power/interest grid. Tracks current vs desired engagement level.",
        href: "/pm-command-center/templates/stakeholder-engagement-plan",
        badge: "✅ Built",
      },
      {
        title: "Meeting Agenda & Minutes",
        description:
          "Standard meeting template with agenda, attendees, discussion notes, decisions made & action items.",
        href: "/pm-command-center/templates/meeting-agenda-minutes",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Executing & Monitoring",
    subtitle: "Track progress, report status, manage changes",
    icon: BarChart3,
    color: "#16A34A",
    templates: [
      {
        title: "Weekly Status Report",
        description:
          "RAG dashboard with accomplishments, planned activities, risks, issues, action items & EVM burn-down.",
        href: "/pm-command-center/templates/weekly-status-report",
        badge: "✅ Built",
      },
      {
        title: "Executive Dashboard",
        description:
          "One-page executive summary: overall health, top 3 risks, budget snapshot, milestone timeline & key decisions.",
        href: "/pm-command-center/templates/executive-dashboard",
        badge: "✅ Built",
      },
      {
        title: "Issue Log",
        description:
          "Active issue tracker with severity, impact, resolution plan, owner, target date & escalation status.",
        href: "/pm-command-center/templates/issue-log",
        badge: "✅ Built",
      },
      {
        title: "Action Item Tracker",
        description:
          "Centralized action item register across all meetings. Tracks owner, due date, status & source.",
        href: "/pm-command-center/templates/action-item-tracker",
        badge: "✅ Built",
      },
      {
        title: "Decision Log",
        description:
          "Records all project decisions with context, alternatives considered, decision maker, date & impact.",
        href: "/pm-command-center/templates/decision-log",
        badge: "✅ Built",
      },
      {
        title: "Change Control Log",
        description:
          "Tracks all change requests through impact analysis, approval, implementation & verification.",
        href: "/pm-command-center/templates/change-control-log",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Closing Process Group",
    subtitle: "Close contracts, capture lessons, hand off deliverables",
    icon: CheckCircle2,
    color: "#6D28D9",
    templates: [
      {
        title: "Project Closure Report",
        description:
          "Formal project close-out: final status, objectives achieved, budget summary, schedule performance & open items.",
        href: "/pm-command-center/templates/project-closure-report",
        badge: "✅ Built",
      },
      {
        title: "Lessons Learned Register",
        description:
          "Captures what went well, what didn't, and recommendations. Organized by knowledge area for the PMO library.",
        href: "/pm-command-center/templates/lessons-learned-register",
        badge: "✅ Built",
      },
      {
        title: "Project Handoff Checklist",
        description:
          "Operations handover with system access, documentation, support contacts, SLAs & warranty periods.",
        href: "/pm-command-center/templates/project-handoff-checklist",
        badge: "✅ Built",
      },
      {
        title: "Benefits Realization Tracker",
        description:
          "Post-project benefit tracking against the business case. Measures actual vs projected ROI over time.",
        href: "/pm-command-center/templates/benefits-realization-tracker",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Governance & Portfolio",
    subtitle: "PMO standards & portfolio-level views",
    icon: Shield,
    color: "#BE185D",
    templates: [
      {
        title: "Project Portfolio Summary",
        description:
          "Multi-project portfolio view with RAG status, resource allocation, budget roll-up & strategic alignment.",
        href: "/pm-command-center/templates/project-portfolio-summary",
        badge: "✅ Built",
      },
      {
        title: "Phase Gate Review Checklist",
        description:
          "Go/No-Go criteria for each project phase. Ensures governance standards are met before proceeding.",
        href: "/pm-command-center/templates/phase-gate-review-checklist",
        badge: "✅ Built",
      },
      {
        title: "Lessons Learned Library Index",
        description:
          "Cross-project lessons learned index organized by knowledge area, enabling organizational learning.",
        href: "/pm-command-center/templates/lessons-learned-library-index",
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

export default function PMCommandCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Sparkles size={11} />
            PMP-Aligned
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <ClipboardList size={28} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Project Management Command Center
              </h2>
              <p className="text-sm font-medium text-indigo-600 mt-0.5">
                PMBOK 7th Edition &bull; All 5 Process Groups &bull; 10
                Knowledge Areas
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            The definitive OneNote template notebook for Project Managers.{" "}
            <strong>{totalTemplates} templates</strong> organized by PMBOK
            process group — each with professionally formatted tables, guided
            sample content, and copy-paste fidelity for OneNote &amp; Word.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 size={12} />
              {builtCount} Templates Ready
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Settings size={12} />
              {totalTemplates - builtCount} Coming Soon
            </span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="space-y-8">
          {categories.map((cat, catIdx) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.title}>
                {/* Category header */}
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

                {/* Template list */}
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
                                  ? "text-slate-900 group-hover:text-indigo-700"
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
                            className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        )}
                      </div>
                    );

                    if (isBuilt) {
                      return (
                        <Link
                          key={tmpl.title}
                          href={tmpl.href!}
                          className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-50 cursor-pointer"
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
          <p>Built for PMP-certified leaders &amp; aspiring project managers.</p>
        </div>
      </footer>
    </div>
  );
}
