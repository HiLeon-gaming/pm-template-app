"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layout,
  Sparkles,
  Zap,
  CheckCircle2,
  Settings,
  Lock,
  Star,
  BookOpen,
  Target,
  Map,
  Layers,
  CalendarClock,
  Activity,
  Shield,
  RefreshCcw,
  BarChart3,
} from "lucide-react";

interface Template {
  title: string;
  description: string;
  href: string | null;
  badge?: string;
  allStar?: boolean;
  whyAllStar?: string;
}

interface Category {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  templates: Template[];
}

const BASE = "/agile-command-center/templates";

const categories: Category[] = [
  {
    title: "Start Here",
    subtitle: "Setup, orientation & team agreements",
    icon: BookOpen,
    color: "#0EA5E9",
    templates: [
      {
        title: "READ THIS FIRST — How This Pack Works",
        description:
          "Complete setup guide: what the pack is, how to use it standalone or with Jira/Asana, sprint rhythms, and a quick-reference index.",
        href: `${BASE}/read-this-first`,
        badge: "✅ Built",
      },
      {
        title: "Agile/Scrum Command Dashboard",
        description:
          "One-page mission control: sprint goal, top priorities, blockers, metrics, next key events.",
        href: `${BASE}/command-dashboard`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Stops the \u201Cwhere do we stand?\u201D chaos.",
      },
      {
        title: "Quick Start + Setup Checklist",
        description:
          "Step-by-step setup + weekly/sprint rhythm so new buyers get value immediately.",
        href: `${BASE}/quick-start`,
        badge: "✅ Built",
      },
      {
        title: "Roles & Responsibilities Map",
        description:
          "Who does what; who decides what; who to ask for help — Scrum Team + Stakeholders.",
        href: `${BASE}/roles-responsibilities`,
        badge: "✅ Built",
      },
      {
        title: "Working Agreements + Team Norms",
        description:
          "Team rules: communication, meeting expectations, response times, conflict handling.",
        href: `${BASE}/working-agreements`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Product Strategy & Value",
    subtitle: "Vision, outcomes, users & success metrics",
    icon: Target,
    color: "#8B5CF6",
    templates: [
      {
        title: "Product Vision + Outcome Statement",
        description:
          "What we\u2019re building, for who, and how we\u2019ll measure success. OKR-friendly format.",
        href: `${BASE}/product-vision`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Keeps the backlog aligned to value.",
      },
      {
        title: "Problem Statement + Target Users/Personas",
        description:
          "Who we\u2019re helping + what pain we\u2019re solving. Improves prioritization and story clarity.",
        href: `${BASE}/problem-statement`,
        badge: "✅ Built",
      },
      {
        title: "Value Hypotheses + Assumptions Log",
        description:
          "What we believe is true + what must be tested. Makes uncertainty visible early.",
        href: `${BASE}/value-hypotheses`,
        badge: "✅ Built",
      },
      {
        title: "Success Metrics + North Star Tracker",
        description:
          "Leading and lagging indicators + targets. Stops \u201Cbusy work\u201D and focuses the team.",
        href: `${BASE}/success-metrics`,
        badge: "✅ Built",
      },
      {
        title: "Stakeholder Map + Communication Plan",
        description:
          "Who needs what updates, how often, and what format. Agile-friendly.",
        href: `${BASE}/stakeholder-map`,
        badge: "✅ Built",
      },
      {
        title: "Product Glossary / Definitions",
        description:
          "Common terms, acronyms, and definitions of key concepts. Saves time and prevents misunderstandings.",
        href: `${BASE}/product-glossary`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Roadmap & Release Planning",
    subtitle: "Direction, dependencies & decisions",
    icon: Map,
    color: "#F59E0B",
    templates: [
      {
        title: "Product Roadmap (Now / Next / Later)",
        description:
          "Simple roadmap that doesn\u2019t pretend you know everything. Exec-friendly, flexible, and realistic.",
        href: `${BASE}/product-roadmap`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Exec-friendly, flexible, and realistic.",
      },
      {
        title: "Release / Increment Plan",
        description:
          "Major releases, themes, and target outcomes. Keeps delivery cohesive.",
        href: `${BASE}/release-plan`,
        badge: "✅ Built",
      },
      {
        title: "Dependency Map (Teams / Systems / Vendors)",
        description:
          "Track dependencies and risks they create. Most delays come from dependencies.",
        href: `${BASE}/dependency-map`,
        badge: "✅ Built",
      },
      {
        title: "Agile RAID-Lite",
        description:
          "Lightweight log for Risks, Assumptions, Issues & Decisions. Prevents hidden project killers.",
        href: `${BASE}/raid-lite`,
        badge: "✅ Built",
      },
      {
        title: "Decision Log",
        description:
          "Record decisions, context, owner, and date. Saves you later when someone asks \u201Cwhy did we\u2026?\u201D",
        href: `${BASE}/decision-log`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Backlog System",
    subtitle: "Epics, stories, prioritization & refinement",
    icon: Layers,
    color: "#EF4444",
    templates: [
      {
        title: "Backlog Master (Epics / Features / Stories)",
        description:
          "Your single source of truth for what exists and what\u2019s next. Eliminates scattered notes.",
        href: `${BASE}/backlog-master`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Your single source of truth.",
      },
      {
        title: "Backlog Prioritization (MoSCoW + WSJF-Lite)",
        description:
          "Simple scoring to rank work by value vs effort vs urgency. Reduces opinion fights.",
        href: `${BASE}/backlog-prioritization`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Removes opinion battles; increases clarity.",
      },
      {
        title: "Story Mapping (User Journey Map)",
        description:
          "Visual flow of the user experience + gaps. Prevents building \u201Crandom features.\u201D",
        href: `${BASE}/story-mapping`,
        badge: "✅ Built",
      },
      {
        title: "User Story + Acceptance Criteria Builder",
        description:
          "Prompts for story format, acceptance criteria, edge cases, and dependencies.",
        href: `${BASE}/user-story-builder`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Cleaner stories = faster delivery, fewer bugs.",
      },
      {
        title: "Definition of Ready (DoR)",
        description:
          "Checklist: what must be true before a story enters a sprint. Prevents sprint chaos.",
        href: `${BASE}/definition-of-ready`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Prevents sprint chaos.",
      },
      {
        title: "Backlog Refinement Agenda + Notes",
        description:
          "Repeatable refinement meeting template. Makes refinement consistent and efficient.",
        href: `${BASE}/backlog-refinement`,
        badge: "✅ Built",
      },
      {
        title: "Estimation Guide + Reference Stories",
        description:
          "Reference points for story sizing. Makes estimates more consistent.",
        href: `${BASE}/estimation-guide`,
        badge: "✅ Built",
      },
      {
        title: "Estimation & Velocity Tracker",
        description:
          "Velocity over time + notes on why it changed. Helps you plan capacity realistically.",
        href: `${BASE}/velocity-tracker`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Helps you plan capacity realistically.",
      },
    ],
  },
  {
    title: "Sprint Planning & Commitments",
    subtitle: "Capacity, goals, scope & kickoff",
    icon: CalendarClock,
    color: "#059669",
    templates: [
      {
        title: "Sprint Planning Worksheet",
        description:
          "Capacity, goal, selected stories, risks, and constraints. Best \u201Canti-overcommit\u201D page.",
        href: `${BASE}/sprint-planning`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Best anti-overcommit page.",
      },
      {
        title: "Sprint Goal + Sprint Backlog",
        description:
          "Clear sprint goal + what\u2019s in/out + success definition. Keeps sprint focused.",
        href: `${BASE}/sprint-goal`,
        badge: "✅ Built",
      },
      {
        title: "Capacity Planner (Availability + Focus Factor)",
        description:
          "Who\u2019s available, how much time, and realistic capacity. Protects the team.",
        href: `${BASE}/capacity-planner`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Protects the team from overcommitment.",
      },
      {
        title: "Sprint Calendar + Key Events",
        description:
          "Ceremonies, demos, release dates, stakeholder check-ins. Prevents scheduling surprises.",
        href: `${BASE}/sprint-calendar`,
        badge: "✅ Built",
      },
      {
        title: "Sprint Kickoff Checklist",
        description:
          "\"Ready to start?\" checklist. Stops sprint day-1 confusion.",
        href: `${BASE}/sprint-kickoff`,
        badge: "✅ Built",
      },
      {
        title: "Sprint Scope Change Log",
        description:
          "If something is added, what leaves (or why capacity changes). Stops scope creep.",
        href: `${BASE}/sprint-scope-change`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Daily Execution",
    subtitle: "Standups, blockers, flow & collaboration",
    icon: Activity,
    color: "#0891B2",
    templates: [
      {
        title: "Daily Scrum Notes + Impediment Log",
        description:
          "Yesterday / today / blockers + decisions needed. Simplest daily momentum system.",
        href: `${BASE}/daily-scrum`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Simplest daily momentum system.",
      },
      {
        title: "Impediment Log (Detailed)",
        description:
          "Blocker, owner, escalation, next step, due date. Prevents blockers from aging.",
        href: `${BASE}/impediment-log`,
        badge: "✅ Built",
      },
      {
        title: "Task Breakdown / To-Do (Optional)",
        description:
          "Simple story \u2192 tasks breakdown. Helps teams who need extra structure.",
        href: `${BASE}/task-breakdown`,
        badge: "✅ Built",
      },
      {
        title: "Blocker Escalation / Help Request",
        description:
          "A structured \u201Cask\u201D page for leadership/vendor help. Makes escalations fast and clear.",
        href: `${BASE}/blocker-escalation`,
        badge: "✅ Built",
      },
      {
        title: "Sprint Progress Tracker",
        description:
          "Story status, text-based burndown, and sprint health dashboard. Tracks daily progress.",
        href: `${BASE}/sprint-progress`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Visual daily progress for the whole team.",
      },
      {
        title: "Definition of Done (DoD)",
        description:
          "Quality checklist, done vs not-done examples, and DoD health check. Prevents fake completion.",
        href: `${BASE}/definition-of-done`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Quality & Delivery",
    subtitle: "DoD, testing, defects & release readiness",
    icon: Shield,
    color: "#DC2626",
    templates: [
      {
        title: "Bug / Defect Tracker",
        description:
          "Bug log with severity, priority, status, triage rules, and summary dashboard. Keeps quality visible.",
        href: `${BASE}/bug-tracker`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Makes defects impossible to ignore.",
      },
      {
        title: "QA / Test Summary",
        description:
          "Per-story test results, quality metrics, and QA risks. Fewer defects + smoother demos.",
        href: `${BASE}/qa-test-summary`,
        badge: "✅ Built",
      },
      {
        title: "Release Readiness Checklist",
        description:
          "Pre-release checklist: code, testing, deployment, communication + go/no-go signoff.",
        href: `${BASE}/release-readiness`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Prevents painful launches.",
      },
      {
        title: "Tech Debt / Improvement Backlog",
        description:
          "Impact x urgency scoring, budget allocation, and debt management strategy.",
        href: `${BASE}/tech-debt`,
        badge: "✅ Built",
      },
      {
        title: "Deployment / Release Notes",
        description:
          "What shipped, deployment details, monitoring plan, and rollback triggers.",
        href: `${BASE}/release-notes`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Review, Retro & Improvement",
    subtitle: "Demos, feedback, retros & action tracking",
    icon: RefreshCcw,
    color: "#D946EF",
    templates: [
      {
        title: "Sprint Review / Demo Prep",
        description:
          "Structured review agenda, demo script with setup notes, stakeholder feedback capture, and sprint outcome.",
        href: `${BASE}/sprint-review`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Makes every demo polished and professional.",
      },
      {
        title: "Sprint Retrospective",
        description:
          "Start/Stop/Continue three-column format, improvement actions, previous action review, and team health check.",
        href: `${BASE}/sprint-retrospective`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Turns retros into real improvement.",
      },
      {
        title: "Improvement Action Tracker",
        description:
          "Track retro actions across sprints. Completed history, recurring patterns, and systemic fixes.",
        href: `${BASE}/improvement-tracker`,
        badge: "✅ Built",
      },
      {
        title: "Sprint Wrapup / Carryover Log",
        description:
          "Final sprint outcome, carryover details with reasons, and sprint-to-sprint handoff notes.",
        href: `${BASE}/sprint-wrapup`,
        badge: "✅ Built",
      },
      {
        title: "Team Health Radar",
        description:
          "10-dimension team health survey with multi-sprint trends and improvement actions.",
        href: `${BASE}/team-health-radar`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Metrics & Reporting",
    subtitle: "Burndown, health signals & stakeholder updates",
    icon: BarChart3,
    color: "#EA580C",
    templates: [
      {
        title: "Velocity & Sprint Metrics",
        description:
          "6-sprint velocity history, key metrics dashboard, and planning recommendations.",
        href: `${BASE}/velocity-metrics`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Data-driven view of team performance.",
      },
      {
        title: "Cumulative Flow / WIP Report",
        description:
          "Daily flow counts, WIP analysis, bottleneck detection, and flow recommendations.",
        href: `${BASE}/cumulative-flow`,
        badge: "✅ Built",
      },
      {
        title: "Stakeholder / Executive Status Report",
        description:
          "Executive summary, release progress by epic, risks for leadership, and next sprint preview.",
        href: `${BASE}/executive-status`,
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

export default function AgileCommandCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
            <Zap size={11} />
            Agile / Scrum
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">
              <Zap size={28} className="text-sky-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Agile / Scrum Delivery Command Center
              </h2>
              <p className="text-sm font-medium text-sky-600 mt-0.5">
                Sprint Planning &bull; Daily Execution &bull; Backlog Mastery &bull; Retros &amp; Improvement
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            Your Jira/Asana/Trello board is where tasks move. This OneNote Command Center
            is where you <strong>run the project like a pro</strong>: vision + outcomes, backlog clarity,
            sprint planning decisions, daily notes + blockers, demos + stakeholder feedback,
            retros + improvement actions, metrics + simple reporting.
          </p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 size={12} />
              {builtCount} Templates Ready
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Settings size={12} />
              {totalTemplates - builtCount} Coming Soon
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
              <Star size={12} />
              14 All-Star Pages
            </span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="space-y-8">
          {categories.map((cat) => {
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
                    {cat.templates.length} template
                    {cat.templates.length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Template list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.templates.map((tmpl) => {
                    const isBuilt = tmpl.href !== null;
                    const inner = (
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4
                              className={`text-sm font-bold ${
                                isBuilt
                                  ? "text-slate-900 group-hover:text-sky-700"
                                  : "text-slate-500"
                              } transition-colors`}
                            >
                              {tmpl.title}
                            </h4>
                            {tmpl.allStar && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 flex items-center gap-0.5">
                                <Star size={8} />
                                All-Star
                              </span>
                            )}
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
                          {tmpl.allStar && tmpl.whyAllStar && (
                            <p className="text-[10px] mt-1 text-amber-600 font-medium italic">
                              Why All-Star: {tmpl.whyAllStar}
                            </p>
                          )}
                        </div>
                        {isBuilt && (
                          <ArrowRight
                            size={14}
                            className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        )}
                      </div>
                    );

                    if (isBuilt) {
                      return (
                        <Link
                          key={tmpl.title}
                          href={tmpl.href!}
                          className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-white border-slate-200 hover:border-sky-300 hover:shadow-md hover:shadow-sky-50 cursor-pointer"
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
          <p>
            Built for Agile leaders &amp; Scrum Masters who run on structure.
          </p>
        </div>
      </footer>
    </div>
  );
}
