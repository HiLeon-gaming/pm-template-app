"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/todo-master/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Daily Planning & Execution",
    color: "#059669",
    templates: [
      { name: "Daily Task Planner", href: `${BASE}/daily-task-planner` },
      { name: "Time-Blocked Daily Schedule", href: `${BASE}/time-blocked-daily-schedule` },
      { name: "Eisenhower Priority Matrix", href: `${BASE}/eisenhower-priority-matrix` },
      { name: "Daily Standup Notes", href: `${BASE}/daily-standup-notes` },
      { name: "Focus Session Tracker", href: `${BASE}/focus-session-tracker` },
    ],
    explanation: "These five templates help you win each day. The Daily Task Planner is your go-to page for listing everything you need to accomplish today, organized by priority. The Time-Blocked Daily Schedule takes it a step further by assigning specific time slots to your tasks so you protect your focus and avoid distractions. The Eisenhower Priority Matrix uses a simple 2\u00d72 grid to sort tasks into four categories: urgent and important (do first), important but not urgent (schedule), urgent but not important (delegate), and neither (eliminate). The Daily Standup Notes template is designed for team environments where each person shares what they did yesterday, what they will do today, and any blockers. The Focus Session Tracker uses the Pomodoro technique (working in focused 25-minute blocks with short breaks) to help you track deep-work sessions and identify what interrupts your concentration.",
  },
  {
    title: "Weekly Planning & Review",
    color: "#0EA5E9",
    templates: [
      { name: "Weekly Planner", href: `${BASE}/weekly-planner` },
      { name: "Weekly Review & Reflection", href: `${BASE}/weekly-review-reflection` },
      { name: "Weekly Goals Tracker", href: `${BASE}/weekly-goals-tracker` },
      { name: "Week-at-a-Glance Dashboard", href: `${BASE}/week-at-a-glance-dashboard` },
    ],
    explanation: "Winning weeks lead to winning months. The Weekly Planner gives you a seven-day overview with space for appointments, deadlines, and top priorities for each day. The Weekly Review & Reflection is a Friday ritual template that helps you look back at what went well, what did not, and what you want to start, stop, or continue doing. The Weekly Goals Tracker lets you set up to five goals for the week with daily check-in boxes so you can see progress building throughout the week. The Week-at-a-Glance Dashboard is a high-level snapshot showing your capacity, key performance indicators (KPIs), delegated items, and overall weekly health in one quick view.",
  },
  {
    title: "Monthly & Quarterly Planning",
    color: "#8B5CF6",
    templates: [
      { name: "Monthly Planner & Review", href: `${BASE}/monthly-planner-review` },
      { name: "Quarterly OKR Tracker", href: `${BASE}/quarterly-okr-tracker` },
      { name: "90-Day Goal Sprint", href: `${BASE}/90-day-goal-sprint` },
    ],
    explanation: "Zooming out from daily and weekly views, these templates help you plan and track progress over longer periods. The Monthly Planner & Review gives you a full-month view with key dates, monthly goals, and a reflection section at the end. The Quarterly OKR Tracker uses the OKR framework (Objectives and Key Results) to set ambitious goals for the quarter and measure progress with specific, measurable key results. OKR is a goal-setting method used by companies like Google and Intel. The 90-Day Goal Sprint breaks a big goal into weekly milestones across 12 weeks, helping you stay on track with a clear roadmap and weekly check-ins.",
  },
  {
    title: "Project & Goal Tracking",
    color: "#EA580C",
    templates: [
      { name: "Project Task Tracker", href: `${BASE}/project-task-tracker` },
      { name: "SMART Goal Setting Worksheet", href: `${BASE}/smart-goal-setting-worksheet` },
      { name: "Milestone Tracker", href: `${BASE}/milestone-tracker` },
      { name: "Kanban Board", href: `${BASE}/kanban-board` },
      { name: "Project Retrospective", href: `${BASE}/project-retrospective` },
    ],
    explanation: "When you have a multi-step project or a major goal, these templates keep everything organized. The Project Task Tracker breaks a project into phases with tasks, owners, due dates, and status so nothing slips through the cracks. The SMART Goal Setting Worksheet guides you through writing goals that are Specific, Measurable, Achievable, Relevant, and Time-bound \u2014 the five qualities that make a goal actionable instead of vague. The Milestone Tracker plots key checkpoints along a timeline so you can see at a glance whether a project is on schedule. The Kanban Board uses a visual column layout (To Do, In Progress, Done) with optional WIP (Work In Progress) limits to manage flow and prevent overload. The Project Retrospective is a post-project review that captures what went well, what did not, and specific improvement actions for next time.",
  },
  {
    title: "Meetings & Collaboration",
    color: "#0891B2",
    templates: [
      { name: "Meeting Agenda", href: `${BASE}/meeting-agenda` },
      { name: "Meeting Minutes & Action Items", href: `${BASE}/meeting-minutes-action-items` },
      { name: "One-on-One Meeting", href: `${BASE}/one-on-one-meeting` },
      { name: "Team Standup Log", href: `${BASE}/team-standup-log` },
    ],
    explanation: "Meetings are only useful if they produce clear outcomes. The Meeting Agenda template gives you a timed structure so meetings stay focused and end on time. The Meeting Minutes & Action Items template captures decisions (highlighted in a clear format) and action items with owners and due dates so nothing is forgotten. The One-on-One Meeting template is designed for recurring 1:1 conversations between a manager and team member, covering agenda items, feedback exchange, career development, and follow-ups. The Team Standup Log provides a weekly grid where each team member\u2019s daily updates are captured in a Monday-through-Friday layout, making it easy to spot patterns and blockers across the team.",
  },
  {
    title: "Habits & Personal Development",
    color: "#D946EF",
    templates: [
      { name: "Habit Tracker (30-Day)", href: `${BASE}/habit-tracker-30-day` },
      { name: "Reading & Learning Log", href: `${BASE}/reading-learning-log` },
      { name: "Personal Development Plan", href: `${BASE}/personal-development-plan` },
      { name: "Gratitude & Wins Journal", href: `${BASE}/gratitude-wins-journal` },
    ],
    explanation: "Productivity is not just about tasks \u2014 it is about building the habits and skills that make you more effective over time. The Habit Tracker (30-Day) gives you a grid to track up to 10 habits across 30 days with streaks and completion rates, turning consistency into a visible game. The Reading & Learning Log helps you track books, courses, articles, and podcasts with key takeaways and action items so learning translates into growth. The Personal Development Plan is a structured self-assessment where you rate your skills on a 1\u20135 scale, identify gaps, set development goals, and plan specific actions. The Gratitude & Wins Journal provides a daily reflection space for recording three things you are grateful for and your biggest win each day \u2014 research shows this simple practice significantly improves motivation and well-being.",
  },
  {
    title: "Decision Making & Thinking",
    color: "#6366F1",
    templates: [
      { name: "Decision Matrix", href: `${BASE}/decision-matrix` },
      { name: "Brain Dump / Inbox Capture", href: `${BASE}/brain-dump-inbox-capture` },
      { name: "Pros & Cons Analysis", href: `${BASE}/pros-cons-analysis` },
      { name: "After-Action Review", href: `${BASE}/after-action-review` },
    ],
    explanation: "Clear thinking leads to better outcomes. The Decision Matrix uses weighted criteria to compare options objectively \u2014 you list your options as rows, your criteria as columns, assign weights to each criterion, and the math tells you which option scores highest. The Brain Dump / Inbox Capture is inspired by GTD (Getting Things Done), a productivity method created by David Allen. It gives you a place to dump every thought, idea, and task out of your head, then sort them into action buckets: do it now, schedule it, delegate it, or archive it. The Pros & Cons Analysis provides a structured format for weighing the advantages and disadvantages of a decision, with optional impact scoring to go beyond a simple list. The After-Action Review (AAR) is a post-event reflection used by the military and top organizations that compares what you intended to happen with what actually happened, identifies the gap, and captures specific lessons and next steps.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#059669";
  const accentDark = "#064E3B";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
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
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">To-Do Master Template Package &mdash; Command Center</h2>
              <p className="text-xs font-medium text-emerald-600">Your One-Page Guide to the Entire Package</p>
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
                  TO-DO MASTER TEMPLATE PACKAGE
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 29 Templates &nbsp;|&nbsp; 7 Sections &nbsp;|&nbsp; Personal &amp; Team Productivity
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
                  The To-Do Master Template Package is your personal and team productivity system, all in one place. It includes 29 professionally formatted templates organized into 7 sections that cover everything from daily task planning and weekly reviews to habit tracking, goal setting, and structured decision making.
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
                    What Is the To-Do Master Template Package?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package is a complete personal and team productivity system. It is built for anyone who wants to get more done with less stress &mdash; whether you are a busy professional managing your own workload, a team lead running daily standups, or someone who wants to build better habits and make smarter decisions. Every template is based on proven productivity methods like GTD (Getting Things Done), the Eisenhower Matrix, OKRs (Objectives and Key Results), Kanban boards, and the Pomodoro technique.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    The templates are organized from small to big: daily planning, weekly reviews, monthly and quarterly goals, project tracking, meetings, habits, and decision-making tools. Start with the Daily Task Planner and the Weekly Planner to build your core rhythm, then add other templates as your needs grow.
                  </p>
                  <p style={{ margin: "0" }}>
                    Every template is designed to copy and paste cleanly into Microsoft OneNote or Word. Just copy the section you need, paste it into your notebook, and fill in the brackets with your own details.
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
                  ExecNoteShop &nbsp;&bull;&nbsp; To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function TodoMasterCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
