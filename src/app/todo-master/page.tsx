"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layout,
  Sparkles,
  CheckSquare,
  Calendar,
  Target,
  Users,
  Brain,
  TrendingUp,
  Clock,
  ListChecks,
  BarChart3,
  Lock,
  Settings,
  CheckCircle2,
  Repeat,
  Star,
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
    title: "Daily Planning & Execution",
    subtitle: "Structure every day for maximum output",
    icon: Clock,
    color: "#059669",
    templates: [
      {
        title: "Daily Task Planner",
        description:
          "Top 3 priorities, task list with time estimates, energy level tracking, end-of-day reflection & tomorrow's prep.",
        href: "/todo-master/templates/daily-task-planner",
        badge: "✅ Built",
      },
      {
        title: "Time-Blocked Daily Schedule",
        description:
          "Hour-by-hour schedule with color-coded blocks for deep work, meetings, admin & breaks. Includes daily intentions.",
        href: "/todo-master/templates/time-blocked-daily-schedule",
        badge: "✅ Built",
      },
      {
        title: "Eisenhower Priority Matrix",
        description:
          "4-quadrant urgent/important matrix. Sort tasks into Do, Schedule, Delegate & Eliminate with action dates.",
        href: "/todo-master/templates/eisenhower-priority-matrix",
        badge: "✅ Built",
      },
      {
        title: "Daily Standup Notes",
        description:
          "What I did yesterday, what I'm doing today, blockers & help needed. Perfect for agile teams.",
        href: "/todo-master/templates/daily-standup-notes",
        badge: "✅ Built",
      },
      {
        title: "Focus Session Tracker",
        description:
          "Pomodoro-style deep work tracker. Log focus sessions, breaks, distractions & daily focus score.",
        href: "/todo-master/templates/focus-session-tracker",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Weekly Planning & Review",
    subtitle: "Plan the week ahead, review what worked",
    icon: Calendar,
    color: "#2563EB",
    templates: [
      {
        title: "Weekly Planner",
        description:
          "Week-at-a-glance with goals, key tasks per day, appointments, deadlines & weekly theme/intention.",
        href: "/todo-master/templates/weekly-planner",
        badge: "✅ Built",
      },
      {
        title: "Weekly Review & Reflection",
        description:
          "Wins, lessons learned, what to start/stop/continue, energy audit & goal progress check-in.",
        href: "/todo-master/templates/weekly-review-reflection",
        badge: "✅ Built",
      },
      {
        title: "Weekly Goals Tracker",
        description:
          "3-5 weekly goals with measurable targets, daily progress checkboxes & end-of-week assessment.",
        href: "/todo-master/templates/weekly-goals-tracker",
        badge: "✅ Built",
      },
      {
        title: "Week-at-a-Glance Dashboard",
        description:
          "Visual weekly overview with meetings, deadlines, priorities by day & capacity meter.",
        href: "/todo-master/templates/week-at-a-glance-dashboard",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Monthly & Quarterly Planning",
    subtitle: "Zoom out for strategic clarity",
    icon: BarChart3,
    color: "#7C3AED",
    templates: [
      {
        title: "Monthly Planner & Review",
        description:
          "Monthly goals, key milestones, habit tracking summary, budget check-in & month-end retrospective.",
        href: "/todo-master/templates/monthly-planner-review",
        badge: "✅ Built",
      },
      {
        title: "Quarterly OKR Tracker",
        description:
          "Objectives & Key Results framework. Set 3-5 objectives with measurable key results, confidence scores & weekly check-ins.",
        href: "/todo-master/templates/quarterly-okr-tracker",
        badge: "✅ Built",
      },
      {
        title: "90-Day Goal Sprint",
        description:
          "Break big goals into 12-week sprints. Weekly milestones, accountability check-ins & progress scoring.",
        href: "/todo-master/templates/90-day-goal-sprint",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Project & Goal Tracking",
    subtitle: "Track multi-step projects & long-term goals",
    icon: Target,
    color: "#D97706",
    templates: [
      {
        title: "Project Task Tracker",
        description:
          "Full project task list with phases, owners, due dates, dependencies, status & completion percentage.",
        href: "/todo-master/templates/project-task-tracker",
        badge: "✅ Built",
      },
      {
        title: "SMART Goal Setting Worksheet",
        description:
          "Define goals that are Specific, Measurable, Achievable, Relevant & Time-bound. Includes action plan & milestones.",
        href: "/todo-master/templates/smart-goal-setting-worksheet",
        badge: "✅ Built",
      },
      {
        title: "Milestone Tracker",
        description:
          "Key milestones with target dates, actual dates, variance, status & next steps. Works for any multi-phase effort.",
        href: "/todo-master/templates/milestone-tracker",
        badge: "✅ Built",
      },
      {
        title: "Kanban Board",
        description:
          "Visual workflow: To Do → In Progress → Review → Done. Includes WIP limits, priority flags & blockers.",
        href: "/todo-master/templates/kanban-board",
        badge: "✅ Built",
      },
      {
        title: "Project Retrospective",
        description:
          "What went well, what didn't, action items for improvement. Great for closing out any project or initiative.",
        href: "/todo-master/templates/project-retrospective",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Meetings & Collaboration",
    subtitle: "Run better meetings, capture better notes",
    icon: Users,
    color: "#0891B2",
    templates: [
      {
        title: "Meeting Agenda Template",
        description:
          "Purpose, attendees, timed agenda items, pre-read materials, desired outcomes & parking lot.",
        href: "/todo-master/templates/meeting-agenda",
        badge: "✅ Built",
      },
      {
        title: "Meeting Minutes & Action Items",
        description:
          "Structured notes: decisions made, action items with owners & deadlines, follow-up meeting date.",
        href: "/todo-master/templates/meeting-minutes-action-items",
        badge: "✅ Built",
      },
      {
        title: "1-on-1 Meeting Template",
        description:
          "Manager/direct report 1:1 framework: wins, challenges, career development, feedback exchange & action items.",
        href: "/todo-master/templates/one-on-one-meeting",
        badge: "✅ Built",
      },
      {
        title: "Team Standup Log",
        description:
          "Daily/weekly team standup tracker. Each member's updates, blockers & cross-team dependencies.",
        href: "/todo-master/templates/team-standup-log",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Habits & Personal Development",
    subtitle: "Build consistency & track growth",
    icon: Repeat,
    color: "#BE185D",
    templates: [
      {
        title: "Habit Tracker (30-Day)",
        description:
          "Track up to 10 daily habits with streak counting, completion rate & monthly consistency score.",
        href: "/todo-master/templates/habit-tracker-30-day",
        badge: "✅ Built",
      },
      {
        title: "Reading & Learning Log",
        description:
          "Books, courses & articles tracker. Key takeaways, action items, ratings & reading goal progress.",
        href: "/todo-master/templates/reading-learning-log",
        badge: "✅ Built",
      },
      {
        title: "Personal Development Plan",
        description:
          "Skills assessment, development goals, learning activities, timeline & progress milestones.",
        href: "/todo-master/templates/personal-development-plan",
        badge: "✅ Built",
      },
      {
        title: "Gratitude & Wins Journal",
        description:
          "Daily gratitude prompts, weekly wins log & monthly accomplishment summary. Science-backed positivity.",
        href: "/todo-master/templates/gratitude-wins-journal",
        badge: "✅ Built",
      },
    ],
  },
  {
    title: "Decision Making & Thinking",
    subtitle: "Structure your thinking for better decisions",
    icon: Brain,
    color: "#4F46E5",
    templates: [
      {
        title: "Decision Matrix (Weighted Scoring)",
        description:
          "Compare options against weighted criteria. Objective scoring to eliminate analysis paralysis.",
        href: "/todo-master/templates/decision-matrix",
        badge: "✅ Built",
      },
      {
        title: "Brain Dump / Inbox Capture",
        description:
          "Rapid capture template for thoughts, ideas, tasks & commitments. Process into your system weekly.",
        href: "/todo-master/templates/brain-dump-inbox-capture",
        badge: "✅ Built",
      },
      {
        title: "Pros & Cons Analysis",
        description:
          "Structured pros/cons with impact weighting for any decision. Includes gut-check & final recommendation.",
        href: "/todo-master/templates/pros-cons-analysis",
        badge: "✅ Built",
      },
      {
        title: "After Action Review (AAR)",
        description:
          "What was supposed to happen, what actually happened, why, and what to do differently next time.",
        href: "/todo-master/templates/after-action-review",
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

export default function TodoMasterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
            <Star size={11} />
            Productivity Pro
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <CheckSquare size={28} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                The To-Do Master Template Package
              </h2>
              <p className="text-sm font-medium text-emerald-600 mt-0.5">
                Daily Planning &bull; Weekly Reviews &bull; Goal Tracking &bull;
                Meeting Frameworks
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            The ultimate productivity system for professionals who run on
            structure. <strong>{totalTemplates} templates</strong> covering
            daily planning, weekly reviews, OKR tracking, meeting management &
            personal development — all designed to copy-paste into OneNote or
            Word.
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
                                  ? "text-slate-900 group-hover:text-emerald-700"
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
                            className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        )}
                      </div>
                    );

                    if (isBuilt) {
                      return (
                        <Link
                          key={tmpl.title}
                          href={tmpl.href!}
                          className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-50 cursor-pointer"
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
          <p>Built for executives, managers &amp; high-performance professionals.</p>
        </div>
      </footer>
    </div>
  );
}
