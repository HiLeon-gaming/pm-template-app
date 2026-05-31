"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layout,
  Users,
  CheckCircle2,
  Settings,
  Lock,
  Star,
  BookOpen,
  Briefcase,
  UserCheck,
  UsersRound,
  FolderKanban,
  Crown,
  Mail,
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

const BASE = "/meetings-hub/templates";

const categories: Category[] = [
  {
    title: "Start Here",
    subtitle: "Setup, orientation & meeting standards",
    icon: BookOpen,
    color: "#F59E0B",
    templates: [
      {
        title: "Meetings Command Dashboard",
        description:
          "One-page mission control: today’s meetings, top prep items, open actions, pending decisions, follow-ups due.",
        href: `${BASE}/command-dashboard`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Stops the chaos and gives instant clarity.",
      },
      {
        title: "Quick Start Guide (How to use this hub)",
        description:
          "Simple setup + recommended weekly rhythm.",
        href: `${BASE}/quick-start`,
        badge: "\u2705 Built",
      },
      {
        title: "Meeting Types Cheat Sheet",
        description:
          "A simple map: 1:1, staff meeting, project meeting, exec review, etc. Eliminates decision fatigue.",
        href: `${BASE}/meeting-types`,
        badge: "\u2705 Built",
      },
      {
        title: "Meeting Rules / Standards (Team-wide)",
        description:
          "Start/end on time, agenda required, action owner required, decision capture required.",
        href: `${BASE}/meeting-rules`,
        badge: "\u2705 Built",
      },
      {
        title: "Attendance & Roles Guide",
        description:
          "Defines Facilitator, Timekeeper, Scribe roles so meetings run smoothly.",
        href: `${BASE}/attendance-roles`,
        badge: "\u2705 Built",
      },
      {
        title: "Universal Agenda Builder",
        description:
          "Purpose, desired outcomes, timeboxes, prep required, attendees, discussion prompts.",
        href: `${BASE}/agenda-builder`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Best “meeting upgrade” page.",
      },
    ],
  },
  {
    title: "Meeting Prep & Execution",
    subtitle: "Core templates for every meeting type",
    icon: Briefcase,
    color: "#3B82F6",
    templates: [
      {
        title: "Universal Minutes + Actions Template",
        description:
          "Notes + decisions + action items in a clean layout. Captures the outputs of the meeting.",
        href: `${BASE}/minutes-actions`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Captures the outputs of every meeting.",
      },
      {
        title: "Meeting Notes Quick Capture",
        description:
          "Ultra-fast page for ad-hoc calls. 30-second setup.",
        href: `${BASE}/quick-capture`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Buyers use this constantly.",
      },
      {
        title: "Parking Lot (Out-of-scope topics)",
        description:
          "Capture distractions without derailing the meeting.",
        href: `${BASE}/parking-lot`,
        badge: "\u2705 Built",
      },
      {
        title: "Issues / Blockers Capture",
        description:
          "What’s stuck, impact, who owns removing it, next update date.",
        href: `${BASE}/issues-blockers`,
        badge: "\u2705 Built",
      },
      {
        title: "Decision Needed Page",
        description:
          "Problem, options, recommendation, decision maker, deadline, risks.",
        href: `${BASE}/decision-needed`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Turns discussion into decisions.",
      },
      {
        title: "Pre-Read / Attachments Index",
        description:
          "Links to docs, decks, reports, and context. Saves time and creates history.",
        href: `${BASE}/pre-read`,
        badge: "\u2705 Built",
      },
      {
        title: "Talking Points Builder (for leads)",
        description:
          "What to say, key messages, concerns, and desired outcomes.",
        href: `${BASE}/talking-points`,
        badge: "\u2705 Built",
      },
      {
        title: "Timebox Plan (for long meetings)",
        description:
          "Agenda items with timeboxes + “if we run over” rules.",
        href: `${BASE}/timebox-plan`,
        badge: "\u2705 Built",
      },
      {
        title: "Meeting Closeout Checklist",
        description:
          "Decisions captured, actions assigned, next meeting scheduled, follow-up owner.",
        href: `${BASE}/meeting-closeout`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Prevents loose ends.",
      },
      {
        title: "Follow-Up Checklist (24-hour rule)",
        description:
          "Send recap, update trackers, share notes, confirm owners.",
        href: `${BASE}/followup-checklist`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "1:1 Meetings",
    subtitle: "Managers + direct reports",
    icon: UserCheck,
    color: "#D946EF",
    templates: [
      {
        title: "1:1 Meeting Dashboard (Per person)",
        description:
          "Running topics, goals, commitments, last discussion summary, next agenda.",
        href: `${BASE}/one-on-one-dashboard`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Makes 1:1s feel organized and caring.",
      },
      {
        title: "1:1 Agenda Template",
        description:
          "Wins, challenges, priorities, feedback, growth, support needed.",
        href: `${BASE}/one-on-one-agenda`,
        badge: "\u2705 Built",
      },
      {
        title: "1:1 Notes + Actions Template",
        description:
          "Notes, decisions, commitments, follow-ups.",
        href: `${BASE}/one-on-one-notes`,
        badge: "\u2705 Built",
      },
      {
        title: "Coaching Notes (GROW model)",
        description:
          "Goal, reality, options, way forward. Turns 1:1s into development.",
        href: `${BASE}/coaching-notes`,
        badge: "\u2705 Built",
      },
      {
        title: "Performance Check-In",
        description:
          "Goal progress, strengths, growth areas, development plan.",
        href: `${BASE}/performance-checkin`,
        badge: "\u2705 Built",
      },
      {
        title: "Career Growth Planner",
        description:
          "Career vision, skills gap assessment, development actions.",
        href: `${BASE}/career-growth`,
        badge: "\u2705 Built",
      },
      {
        title: "Skip-Level 1:1",
        description:
          "Conversation guide, session notes, follow-up actions for skip-level meetings.",
        href: `${BASE}/skip-level`,
        badge: "\u2705 Built",
      },
      {
        title: "Difficult Conversation Prep",
        description:
          "SBI framework, opening script, post-conversation debrief.",
        href: `${BASE}/difficult-conversation`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Team Meetings",
    subtitle: "Staff, weekly syncs & ops",
    icon: UsersRound,
    color: "#059669",
    templates: [
      {
        title: "Weekly Staff Meeting",
        description:
          "Roundtable updates, discussion topics, decisions & actions.",
        href: `${BASE}/weekly-staff`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Your weekly operating rhythm.",
      },
      {
        title: "Team Standup / Huddle",
        description:
          "Quick standup grid, team focus, escalations.",
        href: `${BASE}/team-standup`,
        badge: "\u2705 Built",
      },
      {
        title: "Brainstorm / Workshop",
        description:
          "Ideas capture, voting, top ideas, action plan.",
        href: `${BASE}/brainstorm-workshop`,
        badge: "\u2705 Built",
      },
      {
        title: "Retrospective / Team Retro",
        description:
          "Start/Stop/Continue, improvement actions, team health pulse.",
        href: `${BASE}/team-retro`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Makes meetings improve over time.",
      },
      {
        title: "Team Offsite / Planning Day",
        description:
          "Day schedule, outcomes & commitments, logistics checklist.",
        href: `${BASE}/team-offsite`,
        badge: "\u2705 Built",
      },
      {
        title: "All-Hands / Town Hall",
        description:
          "Key messages, Q&A capture, post-event follow-up.",
        href: `${BASE}/all-hands`,
        badge: "\u2705 Built",
      },
      {
        title: "Cross-Team Sync",
        description:
          "Team updates, dependencies & risks, actions & escalations.",
        href: `${BASE}/cross-team-sync`,
        badge: "\u2705 Built",
      },
      {
        title: "Team Health Check",
        description:
          "Health dimensions ratings, trend history, improvement plan.",
        href: `${BASE}/team-health-check`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Project & Delivery Meetings",
    subtitle: "For PMs, IT & dev teams",
    icon: FolderKanban,
    color: "#EA580C",
    templates: [
      {
        title: "Project Kickoff",
        description:
          "Project overview, team & roles, key milestones, known risks, immediate next steps.",
        href: `${BASE}/project-kickoff`,
        badge: "\u2705 Built",
      },
      {
        title: "Sprint / Iteration Status",
        description:
          "Delivery progress, blockers & risks, actions & decisions.",
        href: `${BASE}/sprint-status`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Review / Demo",
        description:
          "Demo agenda, stakeholder feedback, decisions & next steps.",
        href: `${BASE}/stakeholder-review`,
        badge: "\u2705 Built",
      },
      {
        title: "Risk Review / RAID",
        description:
          "Risks, assumptions, issues, dependencies tracker.",
        href: `${BASE}/risk-review`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Prevents silent scope creep.",
      },
      {
        title: "Change Review / Scope Change",
        description:
          "Change request, impact analysis, decision, change log.",
        href: `${BASE}/change-review`,
        badge: "\u2705 Built",
      },
      {
        title: "Go-Live / Launch Readiness",
        description:
          "Go/no-go checklist, open risks, rollback plan, communication plan.",
        href: `${BASE}/go-live-readiness`,
        badge: "\u2705 Built",
      },
      {
        title: "Lessons Learned / Post-Mortem",
        description:
          "Timeline recap, what went well, what didn’t, key lessons, future actions.",
        href: `${BASE}/lessons-learned`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Huge IT value and broad appeal.",
      },
    ],
  },
  {
    title: "Executive & Leadership Meetings",
    subtitle: "Concise, decision-focused templates",
    icon: Crown,
    color: "#6366F1",
    templates: [
      {
        title: "Executive Status Update",
        description:
          "Executive summary, key metrics/KPIs, risks & escalations, decisions & asks.",
        href: `${BASE}/executive-status`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Leadership-ready.",
      },
      {
        title: "Board / Leadership Meeting",
        description:
          "Formal agenda, discussion notes, decisions & action items.",
        href: `${BASE}/board-leadership`,
        badge: "\u2705 Built",
      },
      {
        title: "Strategic Planning Session",
        description:
          "Vision & current state, SWOT analysis, strategic priorities, next steps.",
        href: `${BASE}/strategic-planning`,
        badge: "\u2705 Built",
      },
      {
        title: "Budget / Financial Review",
        description:
          "Budget vs actual, forecast & burn rate, variance analysis, decisions.",
        href: `${BASE}/budget-review`,
        badge: "\u2705 Built",
      },
      {
        title: "Governance / Steering Committee",
        description:
          "Project/program status, decisions required, escalations & actions.",
        href: `${BASE}/steering-committee`,
        badge: "\u2705 Built",
      },
      {
        title: "Quarterly Business Review (QBR)",
        description:
          "Quarterly scorecard, initiative status, risks, next quarter plan.",
        href: `${BASE}/quarterly-business-review`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Buyers love quick reporting.",
      },
    ],
  },
  {
    title: "Logs, Follow-Up & Emails",
    subtitle: "Where meetings become outcomes",
    icon: Mail,
    color: "#0D9488",
    templates: [
      {
        title: "Meeting Log / Tracker",
        description:
          "Running log of all meetings: time, type, usefulness, actions generated, patterns.",
        href: `${BASE}/meeting-log`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Track and optimize your meeting load.",
      },
      {
        title: "Action Item Tracker",
        description:
          "Central tracker: source meeting, owner, priority, status, overdue items.",
        href: `${BASE}/action-tracker`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Single source of truth for accountability.",
      },
      {
        title: "Decision Log",
        description:
          "Decision, date, context, rationale, owner, impact. Stops repeating debates.",
        href: `${BASE}/decision-log`,
        badge: "\u2705 Built",
      },
      {
        title: "Follow-Up Email Template",
        description:
          "Ready-to-send recap email with discussion summary, actions table, next meeting.",
        href: `${BASE}/follow-up-email`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Turns notes into action effortlessly.",
      },
      {
        title: "Meeting Recap",
        description:
          "Universal recap: discussion notes, decisions, actions, parking lot.",
        href: `${BASE}/meeting-recap`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Update Email",
        description:
          "Status, highlights, metrics, risks, and clear asks for leadership.",
        href: `${BASE}/stakeholder-update`,
        badge: "\u2705 Built",
      },
      {
        title: "Meeting Effectiveness Score",
        description:
          "Rate meetings across 10 dimensions, track trends, identify improvements.",
        href: `${BASE}/meeting-effectiveness`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Improves meeting culture.",
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

export default function MeetingsHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
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
            <Users size={11} />
            Meetings Hub Pro
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
              <Users size={28} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Meetings Hub Pro
              </h2>
              <p className="text-sm font-medium text-amber-600 mt-0.5">
                Agendas &bull; Minutes &bull; Decisions &bull; Actions &bull; Follow-Up
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            A complete OneNote meeting system for leaders and teams who are tired of
            meetings with no clear purpose, no decisions made, and action items forgotten.
            Plan the meeting, run it well, follow up, and build a history.
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Star size={12} />
              17 All-Star Pages
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
                                  ? "text-slate-900 group-hover:text-amber-700"
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
                            className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        )}
                      </div>
                    );

                    if (isBuilt) {
                      return (
                        <Link
                          key={tmpl.title}
                          href={tmpl.href!}
                          className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-white border-slate-200 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 cursor-pointer"
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
            Built for leaders &amp; teams who run on meetings that actually work.
          </p>
        </div>
      </footer>
    </div>
  );
}
