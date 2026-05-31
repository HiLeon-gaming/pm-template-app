"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/relationship-hub/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Start Here",
    color: "#E11D48",
    templates: [
      { name: "Relationship Command Dashboard (Home Base)", href: `${BASE}/relationship-command-dashboard` },
      { name: "Quick Start Guide (Setup in 20 Minutes)", href: `${BASE}/quick-start-guide` },
      { name: "Terminology Guide", href: `${BASE}/terminology-guide` },
      { name: "Confidentiality & Notes Guidelines", href: `${BASE}/confidentiality-guidelines` },
      { name: "Stakeholder Types Cheat Sheet", href: `${BASE}/stakeholder-types-cheat-sheet` },
      { name: "Relationship Cadence Planner", href: `${BASE}/relationship-cadence-planner` },
      { name: "Stakeholder Directory Index", href: `${BASE}/stakeholder-directory-index` },
    ],
    explanation: "Start here to get oriented and build your relationship management foundation. The Relationship Command Dashboard is your daily home base \u2014 one page showing hot stakeholders, follow-ups due, commitments at risk, and upcoming touchpoints. The Quick Start Guide walks you through setup in about 20 minutes: create your first stakeholder profiles, set your cadence, and run your first weekly review. The Terminology Guide defines every term in plain English \u2014 stakeholder, sponsor, champion, decision maker, influencer, CRM (Customer Relationship Management), and more. The Confidentiality & Notes Guidelines page explains how to store sensitive relationship notes responsibly, including what to write down and what to keep out of written records. The Stakeholder Types Cheat Sheet explains the difference between internal and external stakeholders, sponsors versus gatekeepers, and champions versus blockers. The Relationship Cadence Planner helps you decide how often to check in with each type of stakeholder based on their influence and interest level. The Stakeholder Directory Index is your master list of every stakeholder with links to their profile pages.",
  },
  {
    title: "Stakeholder Profiles (CRM-lite)",
    color: "#8B5CF6",
    templates: [
      { name: "Stakeholder Intake (Quick Capture)", href: `${BASE}/stakeholder-intake` },
      { name: "Stakeholder Profile Template (Master)", href: `${BASE}/stakeholder-profile` },
      { name: "Communication Preferences Page", href: `${BASE}/communication-preferences` },
      { name: "Influence & Interest Snapshot", href: `${BASE}/influence-interest-snapshot` },
      { name: "Decision & Approval Map", href: `${BASE}/decision-approval-map` },
      { name: "Trust Builders & Trust Breakers List", href: `${BASE}/trust-builders-breakers` },
      { name: "\u201CWhat They Care About\u201D Notes", href: `${BASE}/what-they-care-about` },
      { name: "Stakeholder Risk Notes (Landmines)", href: `${BASE}/stakeholder-risk-notes` },
      { name: "Stakeholder Wins & Recognition Log", href: `${BASE}/stakeholder-wins-recognition` },
      { name: "Stakeholder Meeting History Index", href: `${BASE}/stakeholder-meeting-history` },
      { name: "Stakeholder Personal Context", href: `${BASE}/stakeholder-personal-context` },
      { name: "Stakeholder Contact Details Page", href: `${BASE}/stakeholder-contact-details` },
    ],
    explanation: "This section is the heart of the system \u2014 your CRM (Customer Relationship Management) for stakeholders. Duplicate these pages for each key stakeholder you manage. The Stakeholder Intake is a fast capture page for when you first meet someone new. The Stakeholder Profile Template (Master) is the most important page in the entire package \u2014 it captures their role, goals, priorities, pain points, how they define success, communication preferences, relationship history, and next steps. The Communication Preferences Page records how each person prefers to communicate: best channel, ideal cadence, format, what annoys them, and what they love. The Influence & Interest Snapshot uses a simple power-versus-interest grid to help you prioritize who gets the most attention. The Decision & Approval Map records what each stakeholder can approve, block, or influence. The Trust Builders & Trust Breakers List captures what builds trust with this specific person and what damages it. The \u201CWhat They Care About\u201D Notes page records their KPIs (Key Performance Indicators), goals, constraints, and political realities. Stakeholder Risk Notes (Landmines) captures sensitive topics, past friction, and red flags you need to be aware of. The Wins & Recognition Log tracks what to celebrate and when to thank them. The Meeting History Index provides a running log of meetings and key decisions over time. Stakeholder Personal Context records scheduling preferences and communication style notes. The Contact Details Page stores assistant information, alternate contacts, and escalation paths.",
  },
  {
    title: "Relationship Planning",
    color: "#0EA5E9",
    templates: [
      { name: "Relationship Plan Template", href: `${BASE}/relationship-plan` },
      { name: "Mutual Value Map", href: `${BASE}/mutual-value-map` },
      { name: "Stakeholder Engagement Strategy", href: `${BASE}/stakeholder-engagement-strategy` },
      { name: "Stakeholder Touchpoint Planner (Monthly)", href: `${BASE}/stakeholder-touchpoint-planner` },
      { name: "Sponsor Management Plan", href: `${BASE}/sponsor-management-plan` },
      { name: "Champion Builder Plan", href: `${BASE}/champion-builder-plan` },
      { name: "Blocker / Resistance Strategy Plan", href: `${BASE}/blocker-resistance-strategy` },
      { name: "Relationship Review Notes (Monthly)", href: `${BASE}/relationship-review-notes` },
    ],
    explanation: "Move from reactive firefighting to intentional relationship management. The Relationship Plan Template is a strategic document for each key stakeholder: where you want the relationship to be, the value exchange, current friction, and your plan to improve. The Mutual Value Map clarifies how your work helps their goals and what they need from you \u2014 turning relationships into partnerships. The Stakeholder Engagement Strategy defines how to keep each person informed and involved without overloading them, including escalation triggers. The Touchpoint Planner (Monthly) schedules who needs a check-in this month and why, so nobody falls through the cracks. The Sponsor Management Plan focuses specifically on your executive sponsor \u2014 how to keep them aligned, informed, and ready to advocate for you. The Champion Builder Plan helps you develop supporters and allies in other teams who will advocate for your work. The Blocker / Resistance Strategy Plan provides a professional framework for handling difficult or resistant stakeholders. Relationship Review Notes (Monthly) is your monthly reflection: what improved, what deteriorated, and what to do differently next month.",
  },
  {
    title: "Commitments, Follow-Ups & Accountability",
    color: "#EA580C",
    templates: [
      { name: "Commitments Log (Master)", href: `${BASE}/commitments-log` },
      { name: "\u201CWho Owes Who What\u201D Tracker", href: `${BASE}/who-owes-who-what` },
      { name: "Follow-Up Queue (Next 7 Days)", href: `${BASE}/follow-up-queue` },
      { name: "Waiting On Tracker", href: `${BASE}/waiting-on-tracker` },
      { name: "Escalations & Stuck Items Log", href: `${BASE}/escalations-stuck-items` },
      { name: "Relationship Health Scorecard", href: `${BASE}/relationship-health-scorecard` },
      { name: "\u201CHot Stakeholders\u201D Dashboard", href: `${BASE}/hot-stakeholders-dashboard` },
      { name: "Conversation Capture (Quick Notes)", href: `${BASE}/conversation-capture` },
      { name: "Conflict Notes & Resolution Plan", href: `${BASE}/conflict-notes-resolution` },
      { name: "Apology / Repair Plan (Professional)", href: `${BASE}/apology-repair-plan` },
    ],
    explanation: "Trust comes from follow-through. This section ensures you never drop the ball. The Commitments Log (Master) is your central record of every promise made \u2014 what you committed to, to whom, by when, current status, and next follow-up date. The \u201CWho Owes Who What\u201D Tracker maps mutual dependencies and obligations in both directions. The Follow-Up Queue (Next 7 Days) is your daily execution list, sorted by priority and urgency. The Waiting On Tracker records requests pending from others and when to follow up if they are late. The Escalations & Stuck Items Log documents blockers with context, impact, options, and who can unblock them. The Relationship Health Scorecard provides a simple scoring system across five dimensions: trust, responsiveness, alignment, friction, and risk \u2014 acting as an early warning system for relationship problems. The \u201CHot Stakeholders\u201D Dashboard identifies your top stakeholders needing attention this week. Conversation Capture is a super-fast after-call notes page for capturing key points immediately. Conflict Notes & Resolution Plan helps you document and plan through difficult situations. The Apology / Repair Plan provides a professional framework for fixing mistakes or miscommunications before they damage the relationship.",
  },
  {
    title: "Meetings, Touchpoints & Communication",
    color: "#059669",
    templates: [
      { name: "Stakeholder Meeting Prep Brief", href: `${BASE}/stakeholder-meeting-prep` },
      { name: "Stakeholder Meeting Agenda (Simple)", href: `${BASE}/stakeholder-meeting-agenda` },
      { name: "Stakeholder Meeting Notes + Decisions + Actions", href: `${BASE}/stakeholder-meeting-notes` },
      { name: "Follow-Up Email Builder (Copy/Paste)", href: `${BASE}/follow-up-email-builder` },
      { name: "Stakeholder Update Builder (Short)", href: `${BASE}/stakeholder-update-short` },
      { name: "Stakeholder Update Builder (Exec/Leadership)", href: `${BASE}/stakeholder-update-exec` },
      { name: "Communication Plan (Per Stakeholder Group)", href: `${BASE}/communication-plan` },
      { name: "Storytelling / Message Framing Page", href: `${BASE}/storytelling-message-framing` },
    ],
    explanation: "Stakeholder meetings should produce decisions and alignment, not just fill calendars. The Stakeholder Meeting Prep Brief ensures you walk into every meeting prepared: purpose, desired outcome, risks, decisions needed, talking points, and pre-read materials. The Meeting Agenda (Simple) provides a timeboxed structure tied to specific outcomes. Meeting Notes + Decisions + Actions captures outputs cleanly for accountability and history. The Follow-Up Email Builder is a copy-paste template that recaps what was decided, who owns what, due dates, and next touchpoint \u2014 sent within 24 hours of every meeting. The Stakeholder Update Builder (Short) creates quick progress updates for email or Microsoft Teams with progress, risks, asks, and next steps. The Stakeholder Update Builder (Exec/Leadership) creates polished one-page executive-style updates for senior leaders. The Communication Plan (Per Stakeholder Group) defines who gets what information, when, and in what format across all your stakeholder groups. The Storytelling / Message Framing Page helps you present updates in a way that lands well \u2014 framing messages for different audiences using narrative structure.",
  },
  {
    title: "Stakeholder Analysis & Risk",
    color: "#6366F1",
    templates: [
      { name: "Stakeholder Map (Influence vs Interest)", href: `${BASE}/stakeholder-map` },
      { name: "Stakeholder Sentiment Tracker", href: `${BASE}/stakeholder-sentiment-tracker` },
      { name: "Risk Radar (Stakeholder-Driven Risks)", href: `${BASE}/risk-radar` },
      { name: "Change Impact Notes (Stakeholder View)", href: `${BASE}/change-impact-notes` },
      { name: "Objection Handling Playbook", href: `${BASE}/objection-handling-playbook` },
      { name: "Negotiation Prep Sheet", href: `${BASE}/negotiation-prep-sheet` },
      { name: "Escalation Prep Page", href: `${BASE}/escalation-prep` },
      { name: "Alignment Check Page", href: `${BASE}/alignment-check` },
    ],
    explanation: "This section helps you look strategic, not just organized. The Stakeholder Map (Influence vs Interest) is a visual quadrant map showing where each stakeholder sits in terms of power and engagement \u2014 update it quarterly. The Stakeholder Sentiment Tracker monitors how each person FEELS about your project: positive, neutral, or negative, with trend direction. Sentiment is a leading indicator \u2014 it changes before behavior does. The Risk Radar focuses on stakeholder-driven risks: sponsor departures, priority shifts, budget cuts, and hidden resistance. These are the risks that blindside project managers because they are political, not technical. Change Impact Notes assess how changes (scope, timeline, budget) affect each stakeholder group differently and help you plan communication accordingly. The Objection Handling Playbook documents common objections with prepared responses and supporting evidence \u2014 so you are never caught off-guard. The Negotiation Prep Sheet prepares you for resource requests, scope discussions, and timeline negotiations with clear positions, tradeoffs, and alternatives. The Escalation Prep Page structures professional escalations with context, options, a recommendation, and a decision deadline. The Alignment Check Page identifies gaps between what stakeholders THINK is happening versus what IS actually happening, so you can close those gaps before they become surprises.",
  },
  {
    title: "Reporting & Exec Summaries",
    color: "#D97706",
    templates: [
      { name: "Stakeholder Brief Builder (Internal)", href: `${BASE}/stakeholder-brief-builder` },
      { name: "Relationship Portfolio Snapshot (RAG)", href: `${BASE}/relationship-portfolio-snapshot` },
      { name: "Quarterly Relationship Review", href: `${BASE}/quarterly-relationship-review` },
      { name: "Wins & Momentum Summary", href: `${BASE}/wins-momentum-summary` },
      { name: "Archive / Closeout Template", href: `${BASE}/archive-closeout` },
    ],
    explanation: "Leaders want quick clarity, not long notes. The Stakeholder Brief Builder (Internal) creates a one-page leadership brief covering who matters, where things stand, key risks, and what you need \u2014 perfect for sponsor onboarding, SteerCo (Steering Committee) pre-reads, and monthly health checks. The Relationship Portfolio Snapshot uses RAG (Red/Amber/Green) status to show the health of every key stakeholder relationship at a glance, with trend direction and priority actions. The Quarterly Relationship Review is a strategic retrospective: what changed this quarter, what improved, what is at risk, and what to focus on next quarter. The Wins & Momentum Summary captures what is going well, who to recognize, and what to reinforce \u2014 because project managers who only report problems lose credibility. The Archive / Closeout Template preserves institutional knowledge when stakeholders change roles or you hand off ownership: relationship context, what works with each person, what to avoid, open commitments, and lessons learned for the next person.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#E11D48";
  const accentDark = "#881337";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center">
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
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors">
            <ArrowLeft size={14} />
            Back to Relationship Hub
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-rose-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Relationship &amp; Stakeholder Management Hub &mdash; Command Center</h2>
              <p className="text-xs font-medium text-rose-600">Your One-Page Guide to the Entire Package</p>
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
                  RELATIONSHIP &amp; STAKEHOLDER MANAGEMENT HUB
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 58 Templates &nbsp;|&nbsp; 7 Sections &nbsp;|&nbsp; Professional Stakeholder Management System
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
                  The Relationship &amp; Stakeholder Management Hub is a complete system for managing professional relationships with intention, consistency, and follow-through. It includes 58 professionally formatted templates organized into 7 sections that cover the full relationship lifecycle &mdash; from building stakeholder profiles and planning engagement strategies, through managing commitments and running effective meetings, to analyzing risks, handling objections, and producing executive-ready summaries. Every template copies and pastes cleanly into Microsoft OneNote or Word.
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
                    What Is the Relationship &amp; Stakeholder Management Hub?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package is a complete system for managing professional stakeholder relationships. A stakeholder is anyone who has influence over, interest in, or is affected by your work &mdash; sponsors, executives, cross-functional partners, vendors, and customers. Managing these relationships well is often the difference between project success and failure. Most project managers (PMs) track tasks and timelines meticulously but manage stakeholder relationships reactively. This hub changes that by providing a structured, repeatable system.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    The system works like a personal CRM (Customer Relationship Management) built inside your OneNote notebook. You create a profile for each key stakeholder, track your commitments and follow-ups, prepare for meetings with intention, and monitor relationship health over time. It covers everything from the first time you meet someone new (Stakeholder Intake) through quarterly strategic reviews (Quarterly Relationship Review) and eventually handing off relationships cleanly when you transition (Archive / Closeout Template).
                  </p>
                  <p style={{ margin: "0" }}>
                    Start with the Quick Start Guide and the Relationship Command Dashboard. Create profiles for your top 5 stakeholders using the Stakeholder Profile Template. Set up the Commitments Log and Follow-Up Queue for daily execution. Then use the Relationship Health Scorecard weekly to monitor how your relationships are tracking. Every template copies and pastes cleanly into Microsoft OneNote or Word.
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
                    Section {String.fromCharCode(65 + i)}: {section.title} ({section.templates.length} templates)
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
                  ExecNoteShop &nbsp;&bull;&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function RelationshipHubCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
