import React from "react";
import Link from "next/link";
import {
  Layout,
  ArrowLeft,
  Target,
  Sparkles,
  Zap,
  BookOpen,
  Compass,
  CalendarCheck,
  BarChart3,
  ShieldCheck,
  Megaphone,
  Star,
} from "lucide-react";

const BASE = "/okr-hub/templates";

interface Template {
  title: string;
  description: string;
  href: string | null;
  badge: string;
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

const categories: Category[] = [
  {
    title: "Start Here",
    subtitle: "Setup, orientation, and your operating rhythm foundation",
    icon: BookOpen,
    color: "#0EA5E9",
    templates: [
      {
        title: "Operating Rhythm Dashboard (Home Base)",
        description:
          "One page: current quarter goals, this week\u2019s priorities, key metrics, open decisions, risks, and next reviews.",
        href: `${BASE}/operating-rhythm-dashboard`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Instant \u2018what matters now?\u2019",
      },
      {
        title: "Quick Start Guide (Setup in 30 Minutes)",
        description:
          "Step-by-step: define goals, metrics, cadence, then run weekly. Immediate success.",
        href: `${BASE}/quick-start-guide`,
        badge: "\u2705 Built",
      },
      {
        title: "The Strategy-to-Execution Map",
        description:
          "Simple diagram page showing how goals \u2192 metrics \u2192 initiatives \u2192 weekly priorities connect.",
        href: `${BASE}/strategy-execution-map`,
        badge: "\u2705 Built",
      },
      {
        title: "Terminology Guide",
        description:
          "OKR, KPI, QBR, RAG \u2014 all spelled out in plain English with examples.",
        href: `${BASE}/terminology-guide`,
        badge: "\u2705 Built",
      },
      {
        title: "Roles & Responsibilities",
        description:
          "Defines who owns goals, metrics, and reviews. Owner, Approver, Contributor.",
        href: `${BASE}/roles-responsibilities`,
        badge: "\u2705 Built",
      },
      {
        title: "Operating Rhythm Calendar",
        description:
          "Your cadence map with checklists per meeting type \u2014 weekly, monthly, quarterly.",
        href: `${BASE}/operating-rhythm-calendar`,
        badge: "\u2705 Built",
      },
      {
        title: "Decision Rules Page",
        description:
          "Defines thresholds that trigger leadership decisions. Prevents churn.",
        href: `${BASE}/decision-rules`,
        badge: "\u2705 Built",
      },
      {
        title: "\u201CStop Doing\u201D Rules (Capacity Protection)",
        description:
          "When we add something, what must be removed? Creates focus discipline.",
        href: `${BASE}/stop-doing-rules`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Strategy Foundation",
    subtitle: "OKRs fail when strategy is fuzzy or too crowded",
    icon: Compass,
    color: "#7C3AED",
    templates: [
      {
        title: "Annual Direction Snapshot (1-Page)",
        description:
          "Mission, themes, focus areas, constraints. Sets context for the year.",
        href: `${BASE}/annual-direction-snapshot`,
        badge: "\u2705 Built",
      },
      {
        title: "Strategy on a Page (SOaP) Builder",
        description:
          "Simple strategy summary: goals, audiences, value, differentiation.",
        href: `${BASE}/strategy-on-a-page`,
        badge: "\u2705 Built",
      },
      {
        title: "North Star Metric Definition",
        description:
          "Your single \u201Cmost important\u201D outcome metric + why it matters.",
        href: `${BASE}/north-star-metric`,
        badge: "\u2705 Built",
      },
      {
        title: "OKR Builder (Objectives and Key Results)",
        description:
          "Objective, key results, baseline, target, owner, confidence, and initiatives.",
        href: `${BASE}/okr-builder`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Your core goal-creation page.",
      },
      {
        title: "OKR Quality Checklist",
        description:
          "Tests whether objectives are clear and key results are measurable.",
        href: `${BASE}/okr-quality-checklist`,
        badge: "\u2705 Built",
      },
      {
        title: "Alignment Map (Company \u2192 Team \u2192 Personal)",
        description:
          "Shows how lower-level goals align upward. Reduces random work.",
        href: `${BASE}/alignment-map`,
        badge: "\u2705 Built",
      },
      {
        title: "OKR Ownership & Stakeholder Map",
        description:
          "Who owns what + who must be consulted. Speeds decisions.",
        href: `${BASE}/okr-ownership-stakeholder`,
        badge: "\u2705 Built",
      },
      {
        title: "OKR Risks & Assumptions Page",
        description:
          "What must be true; what could derail success. Builds realism.",
        href: `${BASE}/okr-risks-assumptions`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Quarterly Planning (OKR Cycle)",
    subtitle: "Choose what matters for the next 90 days",
    icon: CalendarCheck,
    color: "#D97706",
    templates: [
      {
        title: "Quarterly Planning Checklist",
        description:
          "Pre-work, meeting flow, outputs required. Repeatable planning.",
        href: `${BASE}/quarterly-planning-checklist`,
        badge: "\u2705 Built",
      },
      {
        title: "Key Result Scoreboard + Scoring Rules",
        description:
          "How you score progress (0.0\u20131.0 or %), cadence, confidence. Removes vibes scoring.",
        href: `${BASE}/key-result-scoreboard`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Removes ambiguity in scoring.",
      },
      {
        title: "Key Result Metric Definition Sheets",
        description:
          "For each key result: metric definition, data source, owner, update cadence.",
        href: `${BASE}/key-result-metric-definition`,
        badge: "\u2705 Built",
      },
      {
        title: "Baseline & Target Planner",
        description:
          "Baseline, target, and what \u201Cgood progress\u201D looks like by week.",
        href: `${BASE}/baseline-target-planner`,
        badge: "\u2705 Built",
      },
      {
        title: "Initiative Brainstorm & Filtering Page",
        description:
          "Potential initiatives + value, effort, risk. Choose wisely.",
        href: `${BASE}/initiative-brainstorm`,
        badge: "\u2705 Built",
      },
      {
        title: "Prioritization Matrix (Value vs Effort)",
        description:
          "Simple ranking tool to pick the initiatives that move key results.",
        href: `${BASE}/prioritization-matrix`,
        badge: "\u2705 Built",
      },
      {
        title: "Capacity & Constraints Planner",
        description:
          "Team capacity, key dependencies, planned time off, major events.",
        href: `${BASE}/capacity-constraints-planner`,
        badge: "\u2705 Built",
      },
      {
        title: "Quarterly Commitments Page",
        description:
          "What we commit to deliver, plus what we explicitly won\u2019t do.",
        href: `${BASE}/quarterly-commitments`,
        badge: "\u2705 Built",
      },
      {
        title: "\u201CStop Doing\u201D List (Quarterly)",
        description:
          "What will we pause/stop to protect focus? One of the most valuable pages.",
        href: `${BASE}/stop-doing-list-quarterly`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Protects focus \u2014 huge value.",
      },
      {
        title: "Quarterly Kickoff One-Pager",
        description:
          "Goals, key results, initiatives, owners, cadence, and risks. Alignment + communication.",
        href: `${BASE}/quarterly-kickoff-one-pager`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Alignment and communication tool.",
      },
    ],
  },
  {
    title: "Weekly Execution",
    subtitle: "Strategy only works if it becomes weekly behavior",
    icon: Zap,
    color: "#059669",
    templates: [
      {
        title: "Weekly Priorities Cockpit (Top 3 Outcomes)",
        description:
          "Top outcomes, key tasks, blockers, and \u201Cwhat must be true by Friday.\u201D",
        href: `${BASE}/weekly-priorities-cockpit`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Makes execution real.",
      },
      {
        title: "Weekly Plan (Time Block Guide)",
        description:
          "What gets time this week and when. Protects focus.",
        href: `${BASE}/weekly-plan-time-block`,
        badge: "\u2705 Built",
      },
      {
        title: "Weekly Commitments Tracker",
        description:
          "What you promised to deliver this week and status. Accountability.",
        href: `${BASE}/weekly-commitments-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Weekly Wins & Learnings Capture",
        description:
          "Wins, lessons, and improvements. Builds momentum.",
        href: `${BASE}/weekly-wins-learnings`,
        badge: "\u2705 Built",
      },
      {
        title: "Blockers & Help Requests Page",
        description:
          "What\u2019s stuck, impact, who can unblock, next step.",
        href: `${BASE}/blockers-help-requests`,
        badge: "\u2705 Built",
      },
      {
        title: "Weekly Metrics Snapshot (KPI)",
        description:
          "Top metrics, trend, and what changed. Keep metrics visible.",
        href: `${BASE}/weekly-metrics-snapshot`,
        badge: "\u2705 Built",
      },
      {
        title: "KPI Review \u2192 Actions Template",
        description:
          "Metric \u2192 insight \u2192 decision \u2192 owner \u2192 due date. Turns reporting into action.",
        href: `${BASE}/kpi-review-actions`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Makes metrics useful.",
      },
      {
        title: "Weekly Check-In Agenda",
        description:
          "Standard agenda for weekly execution review. Repeatable meetings.",
        href: `${BASE}/weekly-check-in-agenda`,
        badge: "\u2705 Built",
      },
      {
        title: "Weekly Check-In Notes + Decisions",
        description:
          "Capture outcomes, decisions, and next steps. Creates a history.",
        href: `${BASE}/weekly-check-in-notes`,
        badge: "\u2705 Built",
      },
      {
        title: "Personal OKR Weekly Check (Individual)",
        description:
          "For high performers managing their own OKRs. Expands audience.",
        href: `${BASE}/personal-okr-weekly-check`,
        badge: "\u2705 Built",
      },
      {
        title: "Delegation & Follow-Ups Tracker",
        description:
          "What was delegated; when to follow up. Leader-friendly.",
        href: `${BASE}/delegation-followups-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "\u201CWhat Changed This Week?\u201D Change Log",
        description:
          "Scope shifts, priority changes, and why. Reduces confusion.",
        href: `${BASE}/weekly-change-log`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Metrics & Performance Reviews",
    subtitle: "Monthly and quarterly reviews that don\u2019t feel like bureaucracy",
    icon: BarChart3,
    color: "#E11D48",
    templates: [
      {
        title: "KPI Library (Key Performance Indicator Catalog)",
        description:
          "List metrics with owners, cadence, and purpose. Avoids random metrics.",
        href: `${BASE}/kpi-library`,
        badge: "\u2705 Built",
      },
      {
        title: "Metric Integrity Checklist",
        description:
          "Is the metric reliable? Is it being gamed? Is it actionable?",
        href: `${BASE}/metric-integrity-checklist`,
        badge: "\u2705 Built",
      },
      {
        title: "Initiative Portfolio Roll-Up (RAG Status)",
        description:
          "Initiatives with Red/Amber/Green health, owners, milestones, blockers.",
        href: `${BASE}/initiative-portfolio-rollup`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Leadership visibility.",
      },
      {
        title: "Monthly Business Review (MBR) Agenda",
        description:
          "Monthly review agenda: results, risks, decisions, next month focus.",
        href: `${BASE}/monthly-business-review-agenda`,
        badge: "\u2705 Built",
      },
      {
        title: "Monthly Business Review Notes + Actions",
        description:
          "Capture decisions and actions from the monthly review.",
        href: `${BASE}/monthly-business-review-notes`,
        badge: "\u2705 Built",
      },
      {
        title: "Quarterly Business Review (QBR) One-Pager",
        description:
          "Quarter results, score, lessons, next quarter focus, decisions needed.",
        href: `${BASE}/qbr-one-pager`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Extremely exec-ready.",
      },
      {
        title: "QBR Meeting Agenda",
        description:
          "Standard quarterly agenda. Consistent governance.",
        href: `${BASE}/qbr-meeting-agenda`,
        badge: "\u2705 Built",
      },
      {
        title: "QBR Notes + Decision Capture",
        description:
          "Record decisions and next steps for the next quarter.",
        href: `${BASE}/qbr-notes-decision-capture`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Decisions, Risks, and Governance",
    subtitle: "Strategy fails when decisions are slow and risks are invisible",
    icon: ShieldCheck,
    color: "#6366F1",
    templates: [
      {
        title: "Decision Log Master",
        description:
          "Decision, context, options, owner, date, impact. Stops repeated debates.",
        href: `${BASE}/decision-log-master`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Stops rework and repeat debates.",
      },
      {
        title: "Risk Radar (Top Risks This Quarter)",
        description:
          "Risk, likelihood, impact, mitigation, owner. Proactive leadership.",
        href: `${BASE}/risk-radar`,
        badge: "\u2705 Built",
      },
      {
        title: "Assumptions Log + Validation Plan",
        description:
          "What must be true + how you\u2019ll validate it.",
        href: `${BASE}/assumptions-log`,
        badge: "\u2705 Built",
      },
      {
        title: "Dependency Tracker",
        description:
          "Cross-team/vendor dependencies + dates + risks.",
        href: `${BASE}/dependency-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Governance Checklist",
        description:
          "Weekly/monthly/quarterly required checks. Consistency.",
        href: `${BASE}/governance-checklist`,
        badge: "\u2705 Built",
      },
      {
        title: "Escalation Prep Page",
        description:
          "Context, options, recommendation, decision needed, deadline.",
        href: `${BASE}/escalation-prep`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Communication & Alignment",
    subtitle: "Goals only work if people understand them",
    icon: Megaphone,
    color: "#0D9488",
    templates: [
      {
        title: "OKR Rollout Communication Plan",
        description:
          "Who needs to hear what, when, and how. Drives adoption.",
        href: `${BASE}/okr-rollout-communication`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Update Builder (Copy/Paste)",
        description:
          "A simple update template tied to OKRs: progress, risks, asks.",
        href: `${BASE}/stakeholder-update-builder`,
        badge: "\u2705 Built",
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

export default function OKRHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">
            <Target size={11} />
            OKR &amp; Operating Rhythm
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Target size={28} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                OKR &amp; Operating Rhythm Hub
              </h2>
              <p className="text-sm font-medium text-amber-600 mt-0.5">
                Strategy-to-Execution System &bull; OKR &bull; KPI &bull; QBR &bull; RAG
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            Turn strategy into execution with a simple, repeatable system. Set goals (OKRs),
            pick the right work (initiatives), run a weekly rhythm, and review
            monthly/quarterly. No confusion, no wasted effort.
          </p>

          {/* Stats bar */}
          <div className="mt-5 flex flex-wrap gap-5">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Sparkles size={14} className="text-amber-600" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">
                  {totalTemplates} Templates
                </p>
                <p className="text-xs text-slate-500">
                  {builtCount} built &amp; ready
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Star size={14} className="text-amber-600" />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">9 All-Stars</p>
                <p className="text-xs text-slate-500">
                  Start with these for maximum impact
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Read This First */}
        <div className="mb-10">
          <Link
            href={`${BASE}/read-this-first`}
            className="group block bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 hover:border-amber-400 p-5 transition-all hover:shadow-lg hover:shadow-amber-100/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Read This First &mdash; How This Pack Works
                </h3>
                <p className="text-sm text-amber-700 mt-0.5">
                  What OKR, KPI, QBR, and RAG mean in plain English. Setup guide, weekly routine, and which pages to start with.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Sections */}
        {categories.map((cat, ci) => {
          const Icon = cat.icon;
          return (
            <div key={ci} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: cat.color + "18" }}
                >
                  <Icon size={20} style={{ color: cat.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Section {String.fromCharCode(65 + ci)} &mdash; {cat.title}
                    </h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.templates.length} pages
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{cat.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.templates.map((t, ti) => (
                  <Link
                    key={ti}
                    href={t.href || "#"}
                    className={`group flex items-start gap-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 p-4 transition-all hover:shadow-md ${
                      t.allStar ? "ring-2 ring-amber-200 bg-amber-50/30" : ""
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      {ci * 10 + ti + 1 > 9
                        ? ci * 10 + ti + 1
                        : `0${ci * 10 + ti + 1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-700">
                          {t.title}
                        </h4>
                        {t.allStar && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                            <Star size={8} />
                            All-Star
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {t.description}
                      </p>
                      {t.whyAllStar && (
                        <p className="text-[10px] text-amber-600 font-medium mt-1 italic">
                          Why All-Star: {t.whyAllStar}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-400">
          <p>&copy; 2026 ExecNoteShop. All rights reserved.</p>
          <p>OKR &amp; Operating Rhythm Hub &bull; Strategy-to-Execution System</p>
        </div>
      </footer>
    </div>
  );
}
