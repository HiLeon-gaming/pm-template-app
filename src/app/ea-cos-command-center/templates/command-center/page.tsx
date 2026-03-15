"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/ea-cos-command-center/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Start Here",
    color: "#8B5CF6",
    templates: [
      { name: "Executive OS Dashboard (Home Base)", href: `${BASE}/exec-os-dashboard` },
      { name: "Quick Start Guide", href: `${BASE}/quick-start` },
      { name: "Role Definition: EA vs Chief of Staff", href: `${BASE}/role-definition` },
      { name: "Confidentiality & Sensitive Notes Guidelines", href: `${BASE}/confidentiality-guidelines` },
      { name: "Executive Preferences & Operating Style", href: `${BASE}/exec-preferences` },
      { name: "Exec Inbox / Request Intake (Triage Console)", href: `${BASE}/exec-inbox-triage` },
    ],
    explanation: "Start here to set up your executive support operating system. The Executive OS Dashboard is your daily home base \u2014 it shows today\u2019s priorities, upcoming key meetings, open requests, items you are waiting on, and risks, giving you instant clarity every morning. The Quick Start Guide walks you through the daily and weekly rhythm and where to capture different types of information so you get value on day one. The Role Definition page explains the difference between an Executive Assistant (EA) and a Chief of Staff (CoS) and which sections matter most depending on your role \u2014 making this broad pack relevant to both. The Confidentiality & Sensitive Notes Guidelines establish how to store sensitive information safely and consistently, which is critical because executive support often touches confidential topics like personnel changes, compensation, and strategy. The Executive Preferences & Operating Style page captures how your executive likes to work: meeting preferences, communication style, priorities, pet peeves, and how they like decisions presented. The Exec Inbox / Request Intake (Triage Console) is likely your single most-used page \u2014 it captures every request with priority, owner, due date, and status so nothing gets dropped.",
  },
  {
    title: "Requests, Follow-Ups & Accountability",
    color: "#EC4899",
    templates: [
      { name: "Request Intake Form (Quick Capture)", href: `${BASE}/request-intake-form` },
      { name: "Delegation Tracker", href: `${BASE}/delegation-tracker` },
      { name: "Approvals Queue", href: `${BASE}/approvals-queue` },
      { name: "\"Waiting On\" Tracker", href: `${BASE}/waiting-on-tracker` },
      { name: "Follow-Up Queue (Next 7 Days)", href: `${BASE}/follow-up-queue` },
      { name: "Waiting On / Follow-Up Master Tracker", href: `${BASE}/follow-up-master-tracker` },
      { name: "Escalations & Stuck Items Log", href: `${BASE}/escalations-stuck-items` },
      { name: "Commitments Log (External Promises)", href: `${BASE}/commitments-log` },
      { name: "\"What Could Blow Up This Week?\" Risk Radar", href: `${BASE}/risk-radar` },
      { name: "Closeout Checklist (Request Complete)", href: `${BASE}/closeout-checklist` },
    ],
    explanation: "This is the execution engine of an EA or CoS. The Request Intake Form is a one-page quick capture for calls, Slack messages, and hallway asks \u2014 reducing dropped balls. The Delegation Tracker records what the executive delegated, to whom, and when to follow up so delegation actually sticks. The Approvals Queue lists items waiting for executive approval with deadlines and what is needed, preventing last-minute fire drills. The \u201CWaiting On\u201D Tracker tracks responses and deliverables from other people so you can follow up without nagging. The Follow-Up Queue (Next 7 Days) is a prioritized list with the next touchpoint date for each item, stopping silent stalls. The Waiting On / Follow-Up Master Tracker is your single source of truth for everything you are chasing \u2014 likely your second-most used page. The Escalations & Stuck Items Log captures what is stuck, the impact, options, and the recommended escalation path so the executive can unblock fast. The Commitments Log tracks promises made to external parties with deadlines and owners, protecting trust and reputation. The Risk Radar is a quick weekly scan of what could blow up this week with mitigation actions. The Closeout Checklist confirms completion, notifies stakeholders, and archives notes to keep the system clean.",
  },
  {
    title: "Calendar, Time & Priorities",
    color: "#0EA5E9",
    templates: [
      { name: "Weekly Calendar Strategy (Focus Themes)", href: `${BASE}/weekly-calendar-strategy` },
      { name: "Today Plan (Top 3 + Must-Do Meetings)", href: `${BASE}/today-plan` },
      { name: "Tomorrow Prep Page", href: `${BASE}/tomorrow-prep` },
      { name: "Meeting Brief Builder (Prep Page)", href: `${BASE}/meeting-brief-builder` },
      { name: "Pre-Reads & Links Index", href: `${BASE}/pre-reads-links-index` },
      { name: "Calendar Tradeoff Page", href: `${BASE}/calendar-tradeoff` },
      { name: "Focus Time / Deep Work Planner", href: `${BASE}/focus-time-planner` },
      { name: "Time Audit Snapshot", href: `${BASE}/time-audit-snapshot` },
      { name: "Travel / Meeting Buffer Rules", href: `${BASE}/buffer-rules` },
      { name: "Recurring Meeting Cadence Map", href: `${BASE}/recurring-cadence-map` },
    ],
    explanation: "The executive\u2019s calendar is the battlefield, and these templates help you manage it strategically. The Weekly Calendar Strategy sets focus themes for the week and identifies what time must be protected. The Today Plan captures the top three priorities and must-attend meetings for clarity on busy days. The Tomorrow Prep Page lets you tee up pre-reads, reminders, key messages, and document links the evening before, reducing morning chaos. The Meeting Brief Builder is one of the most valuable templates \u2014 it prepares the executive for every meeting with purpose, attendees, agenda, risks, decisions needed, talking points, and links so the executive always looks prepared. The Pre-Reads & Links Index organizes all documents in one clean table, eliminating \u201Cwhere\u2019s the deck?\u201D moments. The Calendar Tradeoff Page establishes decision rules for protecting focus time: \u201Cif we say yes to this, what moves?\u201D The Focus Time / Deep Work Planner protects blocks for strategic thinking with rules for handling interruptions. The Time Audit Snapshot tracks where time actually goes by category for continuous improvement. Buffer Rules set realistic transition time between meetings and travel. The Recurring Meeting Cadence Map lists all recurring meetings with their purpose and whether they are still needed, helping reduce meeting overload.",
  },
  {
    title: "Meetings Engine (Executive Support Edition)",
    color: "#F59E0B",
    templates: [
      { name: "Universal Meeting Notes + Actions", href: `${BASE}/meeting-notes-actions` },
      { name: "Decision Needed Page", href: `${BASE}/decision-needed` },
      { name: "Parking Lot", href: `${BASE}/parking-lot` },
      { name: "Meeting Closeout Checklist", href: `${BASE}/meeting-closeout` },
      { name: "Stakeholder Profile Template (CRM-lite)", href: `${BASE}/stakeholder-profile` },
      { name: "VIP Meeting Prep Page", href: `${BASE}/vip-meeting-prep` },
      { name: "Exec Talking Points Builder", href: `${BASE}/talking-points-builder` },
      { name: "Follow-Up Email Builder (Recap Template)", href: `${BASE}/follow-up-email-builder` },
      { name: "Meeting History Index", href: `${BASE}/meeting-history-index` },
    ],
    explanation: "Decisions happen in meetings, and these templates make sure those meetings are clean and productive. The Universal Meeting Notes + Actions captures notes, decisions, action items, owners, and due dates in a clean, repeatable format. The Decision Needed Page frames decisions clearly: problem, options, recommendation, owner, deadline, and impact \u2014 turning talk into decisions. The Parking Lot captures off-topic items without losing them and without derailing the conversation. The Meeting Closeout Checklist ensures decisions are captured, actions are assigned, and recaps are sent. The Stakeholder Profile Template acts as a CRM-lite (Customer Relationship Management) system: who the person is, their goals, concerns, preferences, last touchpoint, and next step \u2014 an executive memory system. The VIP Meeting Prep Page structures high-stakes meetings with objectives, risks, negotiation points, and desired outcome. The Exec Talking Points Builder prepares key messages, phrasing options, anticipated objections, and responses for fast executive communication prep. The Follow-Up Email Builder provides a copy/paste recap email template with decisions, actions, and next steps \u2014 a daily time saver. The Meeting History Index links to prior meeting notes by stakeholder or topic, solving the \u201Cwhat did we decide last time?\u201D problem.",
  },
  {
    title: "Stakeholders & Relationships (CRM-lite)",
    color: "#EF4444",
    templates: [
      { name: "Stakeholder Directory (Quick List)", href: `${BASE}/stakeholder-directory` },
      { name: "Relationship Plan (Key Stakeholders)", href: `${BASE}/relationship-plan` },
      { name: "Touchpoint / Outreach Planner", href: `${BASE}/touchpoint-planner` },
      { name: "Stakeholder Issues & Sensitivities Log", href: `${BASE}/stakeholder-sensitivities` },
      { name: "\"Who Owes Who What?\" Commitments Map", href: `${BASE}/commitments-map` },
      { name: "External Partners / Vendors Tracker", href: `${BASE}/vendors-tracker` },
      { name: "Recognition & Wins Log", href: `${BASE}/recognition-wins-log` },
      { name: "Executive Networking Notes", href: `${BASE}/networking-notes` },
    ],
    explanation: "EAs and Chiefs of Staff manage relationships as much as tasks. The Stakeholder Directory is a quick-reference list with name, role, organization, importance, preferences, and communication cadence. The Relationship Plan goes deeper for key stakeholders: what they care about, how to support them, and what to avoid. The Touchpoint / Outreach Planner identifies who needs a check-in this week or month, preventing neglected relationships. The Stakeholder Issues & Sensitivities Log documents landmines, history, context, and navigation tips to protect the executive from surprises. The \u201CWho Owes Who What?\u201D Commitments Map tracks cross-team commitments and dependencies, preventing dropped handoffs. The External Partners / Vendors Tracker monitors key vendors, renewal dates, owners, and current status. The Recognition & Wins Log records who did great work and what should be acknowledged \u2014 helping leaders be great leaders. Executive Networking Notes capture contacts, introductions, and follow-ups from conferences and events, expanding the value of the EA/CoS role beyond daily operations.",
  },
  {
    title: "Initiatives, Projects & Alignment",
    color: "#059669",
    templates: [
      { name: "Initiative Portfolio Snapshot", href: `${BASE}/initiative-portfolio` },
      { name: "Status Update Collector (From Teams)", href: `${BASE}/status-update-collector` },
      { name: "Decision Log Master", href: `${BASE}/decision-log-master` },
      { name: "Action Items Master Tracker (Cross-Meeting)", href: `${BASE}/action-items-master` },
      { name: "Escalation Prep Page (For the Exec)", href: `${BASE}/escalation-prep` },
      { name: "OKR / Priority Alignment Check", href: `${BASE}/okr-alignment-check` },
      { name: "\"Stop Doing\" List (Capacity Reclaim)", href: `${BASE}/stop-doing-list` },
      { name: "Leadership Operating Rhythm Planner", href: `${BASE}/operating-rhythm-planner` },
    ],
    explanation: "This section is the core of the Chief of Staff role \u2014 providing visibility and alignment across the organization. The Initiative Portfolio Snapshot gives an executive-level view of what is in flight: health status, owner, next milestone, and risks. The Status Update Collector provides a standard format for teams to submit updates, reducing noise and making weekly briefings easier to prepare. The Decision Log Master records every significant decision with date, context, options, owner, and impact \u2014 stopping repeated debates. The Action Items Master Tracker consolidates all action items across meetings with owners and due dates as a cross-meeting accountability hub. The Escalation Prep Page structures requests for the executive to unblock something: context, recommended ask, options, risks, and the decision needed. The OKR (Objectives and Key Results) / Priority Alignment Check maps initiatives to strategic priorities and identifies what should be paused or stopped. The \u201CStop Doing\u201D List creates focus by explicitly listing what you are dropping and why. The Leadership Operating Rhythm Planner establishes the weekly and monthly cadence: what gets reviewed when, creating a predictable leadership system.",
  },
  {
    title: "Travel, Events & Logistics",
    color: "#EA580C",
    templates: [
      { name: "Travel Request Intake", href: `${BASE}/travel-request-intake` },
      { name: "Travel Itinerary Builder", href: `${BASE}/travel-itinerary-builder` },
      { name: "Packing & Readiness Checklist", href: `${BASE}/packing-readiness-checklist` },
      { name: "Event Planning Runbook", href: `${BASE}/event-planning-runbook` },
      { name: "Weekly Executive Brief Builder", href: `${BASE}/weekly-exec-brief` },
      { name: "Contact Sheet (Emergency / On-site)", href: `${BASE}/contact-sheet` },
      { name: "Post-Event Debrief Notes", href: `${BASE}/post-event-debrief` },
    ],
    explanation: "Complex logistics should feel effortless, and these templates make that possible. The Travel Request Intake captures destination, purpose, dates, preferences, and constraints for fast travel setup. The Travel Itinerary Builder consolidates flights, hotels, ground transportation, confirmation numbers, contacts, and the schedule into one clear page. The Packing & Readiness Checklist is customizable for different trip types and includes a \u201Cdon\u2019t forget\u201D section to reduce travel friction. The Event Planning Runbook provides a timeline, vendor list, attendee list, agenda, and logistics checklist for repeatable, professional event execution. The Weekly Executive Brief Builder is an enormously valuable template \u2014 it structures the executive\u2019s top priorities, key meetings, decisions needed, risks, asks, and wins into a concise weekly briefing. The Contact Sheet organizes hotel, airline, driver, venue, and team contacts for safety and sanity during travel. The Post-Event Debrief Notes capture what worked, what did not, and follow-ups for continuous improvement.",
  },
  {
    title: "Admin, Finance & Document Control",
    color: "#6366F1",
    templates: [
      { name: "Expense & Reimbursement Tracker", href: `${BASE}/expense-tracker` },
      { name: "Approvals & Signatures Log", href: `${BASE}/approvals-signatures-log` },
      { name: "Document Library Index", href: `${BASE}/document-library-index` },
      { name: "SOP / \"How We Do Things\" Page", href: `${BASE}/sop-how-we-do-things` },
    ],
    explanation: "Operational tasks need to be organized and audit-friendly. The Expense & Reimbursement Tracker logs what has been submitted, what is pending, and where receipts are, avoiding lost reimbursements. The Approvals & Signatures Log tracks what is awaiting signature with due dates and risk flags to prevent missed approvals. The Document Library Index creates a central links page for key files, decks, SOPs (Standard Operating Procedures), and org charts \u2014 providing speed and consistency when someone asks \u201Cwhere is that document?\u201D The SOP / \u201CHow We Do Things\u201D Page documents repeatable processes like onboarding new team members, booking travel, or preparing for board meetings. This systematizes the EA/CoS role so that knowledge is not lost when people change positions.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#8B5CF6";
  const accentDark = "#4C1D95";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center">
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
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors">
            <ArrowLeft size={14} />
            Back to EA / CoS Command Center
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">EA / Chief of Staff Command Center &mdash; Command Center</h2>
              <p className="text-xs font-medium text-purple-600">Your One-Page Guide to the Entire Package</p>
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
                  EA / CHIEF OF STAFF COMMAND CENTER
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 62 Templates &nbsp;|&nbsp; 8 Sections &nbsp;|&nbsp; The Complete Executive Support System
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
                  The EA / Chief of Staff Command Center is the complete operating system for being the engine behind a leader. It includes 62 professionally formatted templates organized into 8 sections covering request management, calendar strategy, meeting execution, stakeholder relationships, initiative oversight, travel logistics, and administrative operations.
                </td>
              </tr>
            </tbody>
          </table>

          <div style={S.sectionBanner(accent)}>TEMPLATE INDEX &mdash; QUICK NAVIGATION</div>

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

          <div style={S.sectionBanner(accentDark)}>HOW TO USE THIS PACKAGE</div>

          <table style={{ ...S.tbl, marginBottom: "4px" }}>
            <tbody>
              <tr>
                <td style={{
                  ...S.td0, padding: "14px 16px", fontSize: "13px",
                  lineHeight: "1.7", color: C.textBody,
                }}>
                  <p style={{ margin: "0 0 10px 0", fontWeight: 700, fontSize: "14px", color: C.primary }}>
                    What Is the EA / Chief of Staff Command Center?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package is built for two closely related roles: Executive Assistants (EAs) and Chiefs of Staff (CoS). An EA manages the operational side of supporting a senior leader &mdash; calendar, travel, meetings, follow-ups, and administrative tasks. A Chief of Staff does all of that plus strategic work: initiative oversight, cross-team alignment, decision tracking, and organizational communication. Both roles share a common challenge: nothing can fall through the cracks.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    The templates are organized around the core workflows of executive support: capturing and triaging requests, managing the calendar strategically, running clean meetings, maintaining stakeholder relationships, overseeing initiatives and projects, coordinating travel and events, and handling administrative operations. You do not need to use every template &mdash; the Role Definition page helps you identify which sections matter most for your specific role.
                  </p>
                  <p style={{ margin: "0" }}>
                    Start with the Quick Start Guide and the Executive OS Dashboard. Set up the Exec Inbox / Triage Console as your daily intake system. Then add templates as your needs grow. Every template copies and pastes cleanly into Microsoft OneNote or Word.
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
                  ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function EACosCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
