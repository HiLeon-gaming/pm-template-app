"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layout,
  Sparkles,
  Compass,
  CheckCircle2,
  Settings,
  Lock,
  Star,
  BookOpen,
  Wrench,
  HeartPulse,
  Scale,
  BarChart3,
  HelpCircle,
  RefreshCcw,
} from "lucide-react";

interface Template {
  title: string;
  description: string;
  href: string | null;
  badge?: string;
  allStar?: boolean;
  whyAllStar?: string;
  number?: number;
}

interface Category {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  templates: Template[];
}

const BASE = "/pmbok7-alignment-pack/templates";

const categories: Category[] = [
  {
    title: "Start Here",
    subtitle: "Your home base & orientation",
    icon: BookOpen,
    color: "#0D9488",
    templates: [
      {
        number: 0,
        title: "READ THIS FIRST \u2014 How This Pack Works",
        description:
          "Complete setup guide: what the pack is, how to use it standalone or with the PM Command Center, weekly/monthly routines, and a quick-reference index.",
        href: `${BASE}/read-this-first`,
        badge: "✅ Built",
      },
      {
        number: 1,
        title: "PMBOK 7 Alignment Dashboard",
        description:
          "Your \u201Chome base.\u201D At-a-glance domain health, principle focus, current delivery approach, top outcomes, and next actions.",
        href: `${BASE}/alignment-dashboard`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Becomes the front page you review with leadership.",
      },
      {
        number: 2,
        title: "PMBOK 7 \u201CHow This Pack Works\u201D Quick Start",
        description:
          "Simple setup steps + recommended weekly/monthly cadence for using the pages.",
        href: `${BASE}/quick-start`,
        badge: "✅ Built",
      },
      {
        number: 3,
        title: "Artifact-to-Domain Mapping Matrix",
        description:
          "Map your existing artifacts (charter, plan, RAID, reports, etc.) to the 8 domains + principles so you can prove alignment fast.",
        href: `${BASE}/artifact-to-domain-mapping`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "De-risks the \u201Care we really PMBOK 7 aligned?\u201D question instantly.",
      },
    ],
  },
  {
    title: "Tailoring & Delivery Approach",
    subtitle: "Pick & defend your project approach",
    icon: Wrench,
    color: "#7C3AED",
    templates: [
      {
        number: 4,
        title: "Tailoring Strategy Worksheet",
        description:
          "Defines what you will tailor (governance, planning depth, reporting, controls) and why\u2014based on context.",
        href: `${BASE}/tailoring-strategy-worksheet`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "Tailoring is central to PMBOK 7 and this turns it into a concrete, defensible plan.",
      },
      {
        number: 5,
        title: "Delivery Approach Selector",
        description:
          "Decision framework to choose Predictive vs Hybrid vs Agile with tradeoffs, risks, and \u201Cwhat changes if we pick X.\u201D",
        href: `${BASE}/delivery-approach-selector`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "Helps you pick a model confidently and explain it to stakeholders.",
      },
      {
        number: 6,
        title: "Project Context Snapshot",
        description:
          "One-page capture: objectives, constraints, complexity drivers, critical stakeholders, delivery constraints, risk posture.",
        href: `${BASE}/project-context-snapshot`,
        badge: "✅ Built",
      },
      {
        number: 7,
        title: "Governance & Decision Rights Map",
        description:
          "Who decides what, escalation paths, cadence, and \u201Cwhat requires formal approval.\u201D",
        href: `${BASE}/governance-decision-rights-map`,
        badge: "✅ Built",
      },
      {
        number: 8,
        title: "Tailoring Decisions Log",
        description:
          "A living record of what you tailored, when, and the outcome (great for audit + lessons learned).",
        href: `${BASE}/tailoring-decisions-log`,
        badge: "✅ Built",
      },
      {
        number: 9,
        title: "Working Agreements & Team Norms",
        description:
          "How the team operates: collaboration rules, comms norms, conflict resolution, meeting etiquette.",
        href: `${BASE}/working-agreements-team-norms`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "8 Performance Domain Health Checks",
    subtitle:
      "Stakeholder \u2022 Team \u2022 Dev Approach \u2022 Planning \u2022 Project Work \u2022 Delivery \u2022 Measurement \u2022 Uncertainty",
    icon: HeartPulse,
    color: "#DC2626",
    templates: [
      {
        number: 10,
        title: "Stakeholder Domain Health Check",
        description:
          "Power/interest snapshot, sentiment, alignment risks, engagement actions, and \u201Ctop friction points.\u201D",
        href: `${BASE}/stakeholder-domain-health-check`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Prevents \u201Csurprise stakeholder blowups.\u201D",
      },
      {
        number: 11,
        title: "Team Domain Health Check",
        description:
          "Capacity, morale, conflict, skill gaps, ownership clarity, and action plan.",
        href: `${BASE}/team-domain-health-check`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "High correlation to delivery success\u2014great weekly signal.",
      },
      {
        number: 12,
        title: "Development Approach & Life Cycle Health Check",
        description:
          "Is the chosen approach still right? Are controls proportional? What should be adapted?",
        href: `${BASE}/dev-approach-lifecycle-health-check`,
        badge: "✅ Built",
      },
      {
        number: 13,
        title: "Planning Domain Health Check",
        description:
          "Plan quality, readiness, dependency clarity, critical path assumptions, planning risks.",
        href: `${BASE}/planning-domain-health-check`,
        badge: "✅ Built",
      },
      {
        number: 14,
        title: "Project Work Health Check",
        description:
          "Execution reality: blockers, flow, decision latency, cross-team friction, operational load.",
        href: `${BASE}/project-work-domain-health-check`,
        badge: "✅ Built",
      },
      {
        number: 15,
        title: "Delivery Domain Health Check",
        description:
          "Increment delivery, acceptance health, quality trends, readiness signals, \u201Cwhat could fail at release.\u201D",
        href: `${BASE}/delivery-domain-health-check`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Keeps you outcome-focused, not task-focused.",
      },
      {
        number: 16,
        title: "Measurement Domain Health Check",
        description:
          "Are we measuring the right things? Are metrics driving decisions? Any metric gaming?",
        href: `${BASE}/measurement-domain-health-check`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "Exec-friendly and forces objective project truth.",
      },
      {
        number: 17,
        title: "Uncertainty Domain Health Check",
        description:
          "Uncertainty triggers, volatility, unknown-unknown signals, contingency posture.",
        href: `${BASE}/uncertainty-domain-health-check`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "Where projects \u201Cflip red\u201D without warning\u2014this page catches it early.",
      },
    ],
  },
  {
    title: "12 Principles \u2014 Practice Pages",
    subtitle:
      "Stewardship \u2022 Team \u2022 Stakeholders \u2022 Value \u2022 Systems Thinking \u2022 Leadership \u2022 Tailoring \u2022 Quality \u2022 Complexity \u2022 Risk \u2022 Adaptability \u2022 Change",
    icon: Scale,
    color: "#2563EB",
    templates: [
      {
        number: 18,
        title: "Principles-to-Practice Master Checklist",
        description:
          "One page that shows: principle, what \u201Cgood\u201D looks like, evidence/artifacts, and current status.",
        href: `${BASE}/principles-master-checklist`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Great for self-audit and PMO reviews.",
      },
      {
        number: 19,
        title: "Stewardship Practice Page",
        description:
          "Ethics, transparency, accountability signals + \u201Cstewardship decisions\u201D log.",
        href: `${BASE}/principle-stewardship`,
        badge: "✅ Built",
      },
      {
        number: 20,
        title: "Team Practice Page",
        description:
          "Collaboration behaviors, psychological safety checks, conflict patterns, and team improvement actions.",
        href: `${BASE}/principle-team`,
        badge: "✅ Built",
      },
      {
        number: 21,
        title: "Stakeholders Practice Page",
        description:
          "Engagement strategies by stakeholder type + \u201Calignment risks\u201D tracker.",
        href: `${BASE}/principle-stakeholders`,
        badge: "✅ Built",
      },
      {
        number: 22,
        title: "Value Practice Page",
        description:
          "Defines intended value, success measures, value threats, and value checkpoints.",
        href: `${BASE}/principle-value`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "Sharpens outcomes and makes your reporting more powerful.",
      },
      {
        number: 23,
        title: "Systems Thinking Practice Page",
        description:
          "System map prompts: upstream/downstream impacts, constraints, feedback loops.",
        href: `${BASE}/principle-systems-thinking`,
        badge: "✅ Built",
      },
      {
        number: 24,
        title: "Leadership Practice Page",
        description:
          "Decision clarity, empowerment, and \u201Cleadership behaviors to model\u201D tracker.",
        href: `${BASE}/principle-leadership`,
        badge: "✅ Built",
      },
      {
        number: 25,
        title: "Tailoring Practice Page",
        description:
          "Tailoring quality check + \u201Ctailoring experiments\u201D and results.",
        href: `${BASE}/principle-tailoring`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar: "Reinforces the core PMBOK 7 differentiator.",
      },
      {
        number: 26,
        title: "Quality Practice Page",
        description:
          "Quality strategy prompts + acceptance integrity check + defect trend cues.",
        href: `${BASE}/principle-quality`,
        badge: "✅ Built",
      },
      {
        number: 27,
        title: "Complexity Practice Page",
        description:
          "Complexity drivers checklist + simplification plan.",
        href: `${BASE}/principle-complexity`,
        badge: "✅ Built",
      },
      {
        number: 28,
        title: "Risk Practice Page",
        description:
          "Risk posture, top risks by category, and risk response integrity check.",
        href: `${BASE}/principle-risk`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "The principle most PMOs care about and most teams under-document.",
      },
      {
        number: 29,
        title: "Adaptability & Resiliency Practice Page",
        description:
          "Adaptation triggers, pivot readiness, resilience plan.",
        href: `${BASE}/principle-adaptability`,
        badge: "✅ Built",
      },
      {
        number: 30,
        title: "Change Practice Page",
        description:
          "Change impact prompts + change adoption friction tracker.",
        href: `${BASE}/principle-change`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Measurement & Outcomes",
    subtitle: "Define, measure & prove real success",
    icon: BarChart3,
    color: "#059669",
    templates: [
      {
        number: 31,
        title: "Measurement Strategy Blueprint",
        description:
          "Define KPIs/OKRs, leading vs lagging indicators, targets, data sources, owners, cadence, and decision rules.",
        href: `${BASE}/measurement-strategy`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "Turns \u201Cmeasurement domain\u201D into a real operating system.",
      },
      {
        number: 32,
        title: "Outcome & Benefits Evidence Planner",
        description:
          "Links outcomes to measurable evidence (before/after, adoption signals, financial/operational proof).",
        href: `${BASE}/outcome-benefits`,
        badge: "✅ Built",
      },
      {
        number: 33,
        title: "Metrics Review Notes + Actions",
        description:
          "Recurring notes page that turns metrics into decisions and assignments (prevents \u201Creporting theater\u201D).",
        href: `${BASE}/metrics-review`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Uncertainty & Complexity Toolkit",
    subtitle: "Manage the unknown with structure",
    icon: HelpCircle,
    color: "#D97706",
    templates: [
      {
        number: 34,
        title: "Uncertainty / Complexity Assessment + Response Playbook",
        description:
          "Score uncertainty + complexity, identify drivers, choose response strategies, and set triggers.",
        href: `${BASE}/assessment-playbook`,
        badge: "✅ Built",
        allStar: true,
        whyAllStar:
          "Gives you a structured way to manage the unknown\u2014not just \u201Cadd buffer.\u201D",
      },
      {
        number: 35,
        title: "Assumption Stress Test Worksheet",
        description:
          "List assumptions, likelihood of being wrong, validation plan, and consequence if invalid.",
        href: `${BASE}/assumption-stress-test`,
        badge: "✅ Built",
      },
      {
        number: 36,
        title: "Contingency Triggers & Pivot Plan",
        description:
          "If X happens, we do Y. Includes thresholds and who approves pivots.",
        href: `${BASE}/contingency-triggers`,
        badge: "✅ Built",
      },
      {
        number: 37,
        title: "Decision Latency Tracker",
        description:
          "Track slow decisions, their cost, escalation, and resolution\u2014massive hidden project risk.",
        href: `${BASE}/decision-latency`,
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Continuous Improvement & Alignment Proof",
    subtitle: "Retros, lessons & PMO-ready evidence",
    icon: RefreshCcw,
    color: "#BE185D",
    templates: [
      {
        number: 38,
        title: "Domain Retrospective (Monthly)",
        description:
          "What improved across domains, what degraded, and what actions will fix it.",
        href: `${BASE}/domain-retro`,
        badge: "✅ Built",
      },
      {
        number: 39,
        title: "Principle-Based Lessons Learned Capture",
        description:
          "Lessons learned framed by principles so it\u2019s reusable across projects.",
        href: `${BASE}/principle-lessons`,
        badge: "✅ Built",
      },
      {
        number: 40,
        title: "PMBOK 7 Alignment Summary",
        description:
          "A pre-formatted summary you can paste into status reports, charters, or steering updates.",
        href: `${BASE}/alignment-summary`,
        badge: "✅ Built",
      },
      {
        number: 41,
        title: "PMO / Audit Readiness Checklist",
        description:
          "Quick compliance scan: evidence, decisions, tailoring proof, measurement integrity, uncertainty posture.",
        href: `${BASE}/pmo-audit-checklist`,
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

export default function PMBOK7AlignmentPackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold">
            <Sparkles size={11} />
            PMBOK&reg; 7 Aligned
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center">
              <Compass size={28} className="text-teal-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                PMBOK&reg; 7 Alignment Pack
              </h2>
              <p className="text-sm font-medium text-teal-600 mt-0.5">
                8 Performance Domains &bull; 12 Principles &bull; Tailoring +
                Measurement + Uncertainty Toolkit
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            PMBOK&reg; 7 is powerful&mdash;but it&apos;s more &ldquo;principles +
            domains&rdquo; than &ldquo;fill-in-the-blank documents.&rdquo; This
            package turns PMBOK 7&apos;s 8 Performance Domains + 12 Principles
            into <strong>{totalTemplates} practical, reusable pages</strong> you
            can actually run a project with&mdash;without rebuilding your whole
            toolkit from scratch.
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
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
                            {tmpl.number !== undefined && (
                              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100 rounded px-1.5 py-0.5">
                                #{tmpl.number}
                              </span>
                            )}
                            <h4
                              className={`text-sm font-bold ${
                                isBuilt
                                  ? "text-slate-900 group-hover:text-teal-700"
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
                            className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        )}
                      </div>
                    );

                    if (isBuilt) {
                      return (
                        <Link
                          key={tmpl.title}
                          href={tmpl.href!}
                          className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-white border-slate-200 hover:border-teal-300 hover:shadow-md hover:shadow-teal-50 cursor-pointer"
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
            Built for PMP-certified leaders &amp; modern project managers.
          </p>
        </div>
      </footer>
    </div>
  );
}
