"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/meetings-hub/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Start Here",
    color: "#F59E0B",
    templates: [
      { name: "Meetings Command Dashboard", href: `${BASE}/command-dashboard` },
      { name: "Quick Start Guide", href: `${BASE}/quick-start` },
      { name: "Meeting Types Cheat Sheet", href: `${BASE}/meeting-types` },
      { name: "Meeting Rules / Standards", href: `${BASE}/meeting-rules` },
      { name: "Attendance & Roles Guide", href: `${BASE}/attendance-roles` },
      { name: "Universal Agenda Builder", href: `${BASE}/agenda-builder` },
    ],
    explanation: "Start here before anything else. The Meetings Command Dashboard is your home base \u2014 a single page that shows upcoming meetings, open action items, and key decisions at a glance. The Quick Start Guide walks you through the recommended setup: which templates to use first, how to build your weekly meeting rhythm, and where to store your notes. The Meeting Types Cheat Sheet is a quick reference that explains common meeting formats (standup, 1:1, retrospective, steering committee, etc.) and when to use each one. Meeting Rules / Standards sets the ground rules your team agrees to follow \u2014 things like starting on time, having an agenda, and ending with clear action items. The Attendance & Roles Guide clarifies who should attend each meeting type and what role they play (facilitator, note-taker, timekeeper, decision-maker). The Universal Agenda Builder is a flexible template you can use for any meeting type to create a timed, structured agenda.",
  },
  {
    title: "Meeting Prep & Execution",
    color: "#3B82F6",
    templates: [
      { name: "Universal Minutes + Actions", href: `${BASE}/minutes-actions` },
      { name: "Meeting Notes Quick Capture", href: `${BASE}/quick-capture` },
      { name: "Parking Lot", href: `${BASE}/parking-lot` },
      { name: "Issues / Blockers Capture", href: `${BASE}/issues-blockers` },
      { name: "Decision Needed Page", href: `${BASE}/decision-needed` },
      { name: "Pre-Read / Attachments Index", href: `${BASE}/pre-read` },
      { name: "Talking Points Builder", href: `${BASE}/talking-points` },
      { name: "Timebox Plan", href: `${BASE}/timebox-plan` },
      { name: "Meeting Closeout Checklist", href: `${BASE}/meeting-closeout` },
      { name: "Follow-Up Checklist", href: `${BASE}/followup-checklist` },
    ],
    explanation: "These templates cover the full lifecycle of any meeting \u2014 before, during, and after. Universal Minutes + Actions is the workhorse template for capturing notes, decisions, and action items in a clean, consistent format. The Quick Capture page is a lightweight alternative when you just need to jot things down fast. The Parking Lot captures off-topic items so they are not lost but do not derail the conversation. Issues / Blockers Capture provides a structured way to log problems raised during meetings with severity, owner, and next steps. The Decision Needed Page frames a decision clearly: what is the problem, what are the options, what is recommended, and who decides by when. The Pre-Read / Attachments Index organizes all documents participants should review before the meeting. The Talking Points Builder helps you prepare key messages and responses. The Timebox Plan assigns specific time limits to each agenda item to prevent meetings from running over. The Meeting Closeout Checklist ensures every meeting ends with decisions recorded, actions assigned, and a recap planned. The Follow-Up Checklist tracks post-meeting tasks to completion.",
  },
  {
    title: "1:1 Meetings",
    color: "#D946EF",
    templates: [
      { name: "1:1 Meeting Dashboard", href: `${BASE}/one-on-one-dashboard` },
      { name: "1:1 Agenda Template", href: `${BASE}/one-on-one-agenda` },
      { name: "1:1 Notes + Actions", href: `${BASE}/one-on-one-notes` },
      { name: "Coaching Notes (GROW)", href: `${BASE}/coaching-notes` },
      { name: "Performance Check-In", href: `${BASE}/performance-checkin` },
      { name: "Career Growth Planner", href: `${BASE}/career-growth` },
      { name: "Skip-Level 1:1", href: `${BASE}/skip-level` },
      { name: "Difficult Conversation Prep", href: `${BASE}/difficult-conversation` },
    ],
    explanation: "One-on-one meetings are the most important meetings a manager has. The 1:1 Dashboard gives you a running view of all your direct reports with last meeting date, open action items, and next scheduled 1:1. The 1:1 Agenda Template provides a balanced structure covering status updates, priorities, blockers, feedback, and development topics. The 1:1 Notes + Actions page captures what was discussed and what was agreed. Coaching Notes uses the GROW model (Goal, Reality, Options, Will) \u2014 a proven coaching framework that helps you guide team members through problem-solving instead of just giving answers. The Performance Check-In is a structured mid-cycle or quarterly review covering accomplishments, areas for improvement, and goals. The Career Growth Planner helps team members map out their career aspirations with specific skills to develop and actions to take. The Skip-Level 1:1 template is designed for meetings where a senior leader meets with someone two or more levels below them to get unfiltered perspective. The Difficult Conversation Prep helps you plan sensitive discussions with a clear structure: facts, feelings, impact, and desired outcome.",
  },
  {
    title: "Team Meetings",
    color: "#059669",
    templates: [
      { name: "Weekly Staff Meeting", href: `${BASE}/weekly-staff` },
      { name: "Team Standup / Huddle", href: `${BASE}/team-standup` },
      { name: "Brainstorm / Workshop", href: `${BASE}/brainstorm-workshop` },
      { name: "Retrospective / Team Retro", href: `${BASE}/team-retro` },
      { name: "Team Offsite / Planning Day", href: `${BASE}/team-offsite` },
      { name: "All-Hands / Town Hall", href: `${BASE}/all-hands` },
      { name: "Cross-Team Sync", href: `${BASE}/cross-team-sync` },
      { name: "Team Health Check", href: `${BASE}/team-health-check` },
    ],
    explanation: "These templates cover every type of team meeting you will encounter. The Weekly Staff Meeting template provides a consistent agenda for your regular team meeting with updates, priorities, blockers, and decisions. The Team Standup / Huddle is a quick daily sync (usually 15 minutes or less) focused on what each person is working on and what is blocking them. The Brainstorm / Workshop template structures creative sessions with clear objectives, ground rules, idea generation, and prioritization steps. The Retrospective / Team Retro uses the Start / Stop / Continue format to help teams reflect on what is working and what needs to change. The Team Offsite / Planning Day template helps you design a productive full-day or half-day session with goals, agenda blocks, and follow-up actions. The All-Hands / Town Hall template structures company-wide or department-wide meetings with leadership updates, Q&A, and recognition. The Cross-Team Sync keeps dependencies visible when multiple teams need to coordinate. The Team Health Check uses a survey-style assessment to measure team morale, collaboration, and effectiveness over time.",
  },
  {
    title: "Project & Delivery Meetings",
    color: "#EA580C",
    templates: [
      { name: "Project Kickoff", href: `${BASE}/project-kickoff` },
      { name: "Sprint / Iteration Status", href: `${BASE}/sprint-status` },
      { name: "Stakeholder Review / Demo", href: `${BASE}/stakeholder-review` },
      { name: "Risk Review / RAID", href: `${BASE}/risk-review` },
      { name: "Change Review / Scope Change", href: `${BASE}/change-review` },
      { name: "Go-Live / Launch Readiness", href: `${BASE}/go-live-readiness` },
      { name: "Lessons Learned / Post-Mortem", href: `${BASE}/lessons-learned` },
    ],
    explanation: "Projects have their own meeting rhythm, and these templates make each one productive. The Project Kickoff template structures the first meeting where the team aligns on objectives, scope, roles, timeline, and risks. Sprint / Iteration Status is designed for Agile teams who review progress every one to four weeks in a time-boxed cycle called a sprint. The Stakeholder Review / Demo template helps you prepare and run a meeting where you show completed work to stakeholders and capture their feedback. The Risk Review / RAID template structures a meeting focused on Risks, Assumptions, Issues, and Dependencies (RAID) \u2014 four categories that cover most things that can derail a project. The Change Review / Scope Change template helps evaluate proposed changes to the project scope with impact analysis before approving them. The Go-Live / Launch Readiness template is a pre-launch checkpoint that ensures everything is ready: testing complete, communications sent, support in place, and rollback plan defined. The Lessons Learned / Post-Mortem template captures what worked and what did not after a project or incident so future teams can benefit.",
  },
  {
    title: "Executive & Leadership Meetings",
    color: "#7C3AED",
    templates: [
      { name: "Executive Status Update", href: `${BASE}/executive-status` },
      { name: "Board / Leadership Meeting", href: `${BASE}/board-leadership` },
      { name: "Strategic Planning Session", href: `${BASE}/strategic-planning` },
      { name: "Budget / Financial Review", href: `${BASE}/budget-review` },
      { name: "Governance / Steering Committee", href: `${BASE}/steering-committee` },
      { name: "Quarterly Business Review (QBR)", href: `${BASE}/quarterly-business-review` },
    ],
    explanation: "Leadership meetings have higher stakes and need tighter preparation. The Executive Status Update gives senior leaders a concise RAG (Red/Amber/Green) summary of project health, key risks, decisions needed, and next steps \u2014 designed to communicate in under five minutes. The Board / Leadership Meeting template structures formal leadership sessions with strategic updates, financial summaries, and governance items. The Strategic Planning Session guides longer-format meetings where leaders set direction, prioritize initiatives, and allocate resources. The Budget / Financial Review template organizes financial data with variance analysis (planned vs. actual spending) and forecasts. The Governance / Steering Committee template is for formal project oversight meetings where go/no-go decisions are made. The QBR (Quarterly Business Review) template structures a quarterly checkpoint covering results, lessons, and next-quarter focus areas \u2014 a standard practice in many organizations.",
  },
  {
    title: "Logs, Follow-Up & Emails",
    color: "#0D9488",
    templates: [
      { name: "Meeting Log / Tracker", href: `${BASE}/meeting-log` },
      { name: "Action Item Tracker", href: `${BASE}/action-tracker` },
      { name: "Decision Log", href: `${BASE}/decision-log` },
      { name: "Follow-Up Email Template", href: `${BASE}/follow-up-email` },
      { name: "Meeting Recap", href: `${BASE}/meeting-recap` },
      { name: "Stakeholder Update Email", href: `${BASE}/stakeholder-update` },
      { name: "Meeting Effectiveness Score", href: `${BASE}/meeting-effectiveness` },
    ],
    explanation: "The real value of meetings happens after they end \u2014 in the follow-through. The Meeting Log / Tracker is a master list of all meetings you have attended or facilitated, with dates, topics, and links to notes. The Action Item Tracker consolidates every action item from every meeting into one central list with owners, due dates, and status so nothing falls through the cracks. The Decision Log records every important decision made in any meeting: what was decided, who made the call, when, and why. The Follow-Up Email Template gives you a copy-paste-ready format for sending meeting recaps to attendees with decisions and action items clearly listed. The Meeting Recap is a slightly more detailed version for internal records. The Stakeholder Update Email helps you send concise project or initiative updates to stakeholders who were not in the meeting. The Meeting Effectiveness Score is a simple survey you can use periodically to measure whether your meetings are productive, well-run, and worth the time invested.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#F59E0B";
  const accentDark = "#92400E";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center">
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
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors">
            <ArrowLeft size={14} />
            Back to Meetings Hub
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Meetings Hub Pro &mdash; Command Center</h2>
              <p className="text-xs font-medium text-amber-600">Your One-Page Guide to the Entire Package</p>
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
                  MEETINGS HUB PRO
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 52 Templates &nbsp;|&nbsp; 7 Sections &nbsp;|&nbsp; Every Meeting Type Covered
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
                  The Meetings Hub Pro is your complete system for running productive meetings and making sure nothing falls through the cracks afterward. It includes 52 professionally formatted templates organized into 7 sections that cover every meeting type &mdash; from daily standups and 1:1s to executive reviews and quarterly business reviews (QBRs).
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
                    What Is the Meetings Hub Pro?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package is designed to solve one of the biggest productivity problems in any organization: meetings that waste time and produce no clear outcomes. Whether you are a manager running weekly team meetings, an individual contributor attending project syncs, or an executive leading strategic planning sessions, this package gives you a template for every situation.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    The templates are organized by meeting context: getting started (setup and standards), general meeting prep and execution, 1:1 meetings, team meetings, project and delivery meetings, executive and leadership meetings, and post-meeting follow-up tools. Start with the Quick Start Guide and Meeting Rules templates to set your foundation, then use specific templates as needed for each meeting type.
                  </p>
                  <p style={{ margin: "0" }}>
                    Every template is designed to copy and paste cleanly into Microsoft OneNote or Word. Just copy the section you need, paste it into your notebook, and fill in the brackets with your meeting&apos;s details. The formatting, colors, and structure will transfer automatically.
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
                  ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function MeetingsHubCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
