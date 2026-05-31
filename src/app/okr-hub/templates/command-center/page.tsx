"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/okr-hub/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Start Here",
    color: "#0EA5E9",
    templates: [
      { name: "Operating Rhythm Dashboard (Home Base)", href: `${BASE}/operating-rhythm-dashboard` },
      { name: "Quick Start Guide (Setup in 30 Minutes)", href: `${BASE}/quick-start-guide` },
      { name: "The Strategy-to-Execution Map", href: `${BASE}/strategy-execution-map` },
      { name: "Terminology Guide", href: `${BASE}/terminology-guide` },
      { name: "Roles & Responsibilities", href: `${BASE}/roles-responsibilities` },
      { name: "Operating Rhythm Calendar", href: `${BASE}/operating-rhythm-calendar` },
      { name: "Decision Rules Page", href: `${BASE}/decision-rules` },
      { name: "“Stop Doing” Rules (Capacity Protection)", href: `${BASE}/stop-doing-rules` },
    ],
    explanation: "Start here to get oriented and build your operating rhythm foundation. The Operating Rhythm Dashboard is your home base — one page that shows current quarter goals, this week’s priorities, key metrics, open decisions, risks, and next reviews. The Quick Start Guide walks you through setup in about 30 minutes: define goals, pick metrics, set your cadence, and run your first weekly review. The Strategy-to-Execution Map is a simple visual showing how goals connect to metrics, metrics connect to initiatives, and initiatives connect to weekly priorities. The Terminology Guide spells out every acronym in plain English with examples: OKR (Objectives and Key Results), KPI (Key Performance Indicator), QBR (Quarterly Business Review), RAG (Red/Amber/Green status), and more. Roles & Responsibilities defines who owns goals, metrics, and reviews — using Owner, Approver, and Contributor roles. The Operating Rhythm Calendar maps your weekly, monthly, and quarterly cadence with checklists for each meeting type. The Decision Rules Page defines thresholds that trigger leadership decisions, preventing unnecessary churn. The “Stop Doing” Rules page creates focus discipline: when you add something, what must be removed?",
  },
  {
    title: "Strategy Foundation",
    color: "#7C3AED",
    templates: [
      { name: "Annual Direction Snapshot (1-Page)", href: `${BASE}/annual-direction-snapshot` },
      { name: "Strategy on a Page (SOaP) Builder", href: `${BASE}/strategy-on-a-page` },
      { name: "North Star Metric Definition", href: `${BASE}/north-star-metric` },
      { name: "OKR Builder (Objectives and Key Results)", href: `${BASE}/okr-builder` },
      { name: "OKR Quality Checklist", href: `${BASE}/okr-quality-checklist` },
      { name: "Alignment Map (Company \u2192 Team \u2192 Personal)", href: `${BASE}/alignment-map` },
      { name: "OKR Ownership & Stakeholder Map", href: `${BASE}/okr-ownership-stakeholder` },
      { name: "OKR Risks & Assumptions Page", href: `${BASE}/okr-risks-assumptions` },
    ],
    explanation: "OKRs fail when strategy is fuzzy or too crowded. These templates build the strategic foundation your goals need. The Annual Direction Snapshot captures your mission, themes, focus areas, and constraints for the year on a single page. The Strategy on a Page (SOaP) Builder creates a simple strategy summary: goals, target audiences, value proposition, and differentiation. The North Star Metric Definition identifies your single most important outcome metric and explains why it matters above all others. The OKR Builder is the core goal-creation page — it walks you through writing an Objective (a clear, inspiring goal), Key Results (measurable outcomes that prove you achieved it), baselines, targets, owners, confidence levels, and linked initiatives. The OKR Quality Checklist tests whether your objectives are clear and your key results are truly measurable. The Alignment Map shows how company-level goals cascade to team goals and personal goals, reducing random work. The OKR Ownership & Stakeholder Map clarifies who owns what and who must be consulted. The OKR Risks & Assumptions Page captures what must be true for success and what could derail your goals.",
  },
  {
    title: "Quarterly Planning (OKR Cycle)",
    color: "#D97706",
    templates: [
      { name: "Quarterly Planning Checklist", href: `${BASE}/quarterly-planning-checklist` },
      { name: "Key Result Scoreboard + Scoring Rules", href: `${BASE}/key-result-scoreboard` },
      { name: "Key Result Metric Definition Sheets", href: `${BASE}/key-result-metric-definition` },
      { name: "Baseline & Target Planner", href: `${BASE}/baseline-target-planner` },
      { name: "Initiative Brainstorm & Filtering Page", href: `${BASE}/initiative-brainstorm` },
      { name: "Prioritization Matrix (Value vs Effort)", href: `${BASE}/prioritization-matrix` },
      { name: "Capacity & Constraints Planner", href: `${BASE}/capacity-constraints-planner` },
      { name: "Quarterly Commitments Page", href: `${BASE}/quarterly-commitments` },
      { name: "“Stop Doing” List (Quarterly)", href: `${BASE}/stop-doing-list-quarterly` },
      { name: "Quarterly Kickoff One-Pager", href: `${BASE}/quarterly-kickoff-one-pager` },
    ],
    explanation: "Every quarter you choose what matters for the next 90 days. The Quarterly Planning Checklist provides a repeatable flow: pre-work, meeting agenda, and required outputs. The Key Result Scoreboard defines how you score progress (0.0–1.0 scale or percentage), cadence, and confidence — removing subjective “vibes” scoring. Key Result Metric Definition Sheets define each metric precisely: what it measures, where the data comes from, who owns it, and how often it gets updated. The Baseline & Target Planner establishes starting points and targets so you know what “good progress” looks like week by week. The Initiative Brainstorm & Filtering Page generates potential initiatives and evaluates them by value, effort, and risk. The Prioritization Matrix uses a simple Value vs. Effort framework to pick the initiatives that will move key results the most. The Capacity & Constraints Planner documents team capacity, key dependencies, planned time off, and major events. The Quarterly Commitments Page lists what you will deliver and what you explicitly will not do. The “Stop Doing” List is one of the most valuable pages — it forces you to pause or stop existing work to protect focus. The Quarterly Kickoff One-Pager communicates goals, key results, initiatives, owners, cadence, and risks as an alignment tool.",
  },
  {
    title: "Weekly Execution",
    color: "#059669",
    templates: [
      { name: "Weekly Priorities Cockpit (Top 3 Outcomes)", href: `${BASE}/weekly-priorities-cockpit` },
      { name: "Weekly Plan (Time Block Guide)", href: `${BASE}/weekly-plan-time-block` },
      { name: "Weekly Commitments Tracker", href: `${BASE}/weekly-commitments-tracker` },
      { name: "Weekly Wins & Learnings Capture", href: `${BASE}/weekly-wins-learnings` },
      { name: "Blockers & Help Requests Page", href: `${BASE}/blockers-help-requests` },
      { name: "Weekly Metrics Snapshot (KPI)", href: `${BASE}/weekly-metrics-snapshot` },
      { name: "KPI Review \u2192 Actions Template", href: `${BASE}/kpi-review-actions` },
      { name: "Weekly Check-In Agenda", href: `${BASE}/weekly-check-in-agenda` },
      { name: "Weekly Check-In Notes + Decisions", href: `${BASE}/weekly-check-in-notes` },
      { name: "Personal OKR Weekly Check (Individual)", href: `${BASE}/personal-okr-weekly-check` },
      { name: "Delegation & Follow-Ups Tracker", href: `${BASE}/delegation-followups-tracker` },
      { name: "“What Changed This Week?” Change Log", href: `${BASE}/weekly-change-log` },
    ],
    explanation: "Strategy only works if it becomes weekly behavior. The Weekly Priorities Cockpit captures your top three outcomes for the week, key tasks, blockers, and “what must be true by Friday.” The Weekly Plan (Time Block Guide) assigns specific time to your priorities and protects focus blocks. The Weekly Commitments Tracker records what you promised to deliver this week and tracks status for accountability. Weekly Wins & Learnings captures victories and lessons to build momentum. The Blockers & Help Requests Page documents what is stuck, its impact, who can unblock it, and the next step. The Weekly Metrics Snapshot (KPI) shows your top Key Performance Indicators, trends, and what changed. The KPI Review \u2192 Actions Template turns reporting into action: metric \u2192 insight \u2192 decision \u2192 owner \u2192 due date. The Weekly Check-In Agenda provides a standard agenda for your weekly execution review meeting. Weekly Check-In Notes + Decisions captures outcomes and creates a history of decisions. The Personal OKR Weekly Check is for individual contributors managing their own OKRs. The Delegation & Follow-Ups Tracker records what was delegated, to whom, and when to follow up. The “What Changed This Week?” Change Log tracks scope shifts, priority changes, and the reasons behind them to reduce confusion.",
  },
  {
    title: "Metrics & Performance Reviews",
    color: "#E11D48",
    templates: [
      { name: "KPI Library (Catalog)", href: `${BASE}/kpi-library` },
      { name: "Metric Integrity Checklist", href: `${BASE}/metric-integrity-checklist` },
      { name: "Initiative Portfolio Roll-Up (RAG Status)", href: `${BASE}/initiative-portfolio-rollup` },
      { name: "Monthly Business Review (MBR) Agenda", href: `${BASE}/monthly-business-review-agenda` },
      { name: "Monthly Business Review Notes + Actions", href: `${BASE}/monthly-business-review-notes` },
      { name: "Quarterly Business Review (QBR) One-Pager", href: `${BASE}/qbr-one-pager` },
      { name: "QBR Meeting Agenda", href: `${BASE}/qbr-meeting-agenda` },
      { name: "QBR Notes + Decision Capture", href: `${BASE}/qbr-notes-decision-capture` },
    ],
    explanation: "Monthly and quarterly reviews should drive decisions, not feel like bureaucracy. The KPI Library catalogs all your metrics with owners, cadence, and purpose to avoid random or redundant metrics. The Metric Integrity Checklist asks critical questions: Is this metric reliable? Is it being gamed? Is it actionable? The Initiative Portfolio Roll-Up shows all initiatives with RAG (Red/Amber/Green) health status, owners, milestones, and blockers for leadership visibility. The MBR (Monthly Business Review) Agenda structures your monthly review: results, risks, decisions, and next month’s focus. MBR Notes + Actions captures decisions and assignments from the monthly review. The QBR (Quarterly Business Review) One-Pager summarizes the quarter’s results, OKR scores, lessons, next-quarter focus, and decisions needed — extremely executive-ready. The QBR Meeting Agenda provides a consistent quarterly governance structure. QBR Notes + Decision Capture records decisions and next steps heading into the new quarter.",
  },
  {
    title: "Decisions, Risks & Governance",
    color: "#6366F1",
    templates: [
      { name: "Decision Log Master", href: `${BASE}/decision-log-master` },
      { name: "Risk Radar (Top Risks This Quarter)", href: `${BASE}/risk-radar` },
      { name: "Assumptions Log + Validation Plan", href: `${BASE}/assumptions-log` },
      { name: "Dependency Tracker", href: `${BASE}/dependency-tracker` },
      { name: "Governance Checklist", href: `${BASE}/governance-checklist` },
      { name: "Escalation Prep Page", href: `${BASE}/escalation-prep` },
    ],
    explanation: "Strategy fails when decisions are slow and risks are invisible. The Decision Log Master records every important decision with context, options considered, the chosen option, owner, date, and impact — stopping repeated debates and rework. The Risk Radar lists the top risks this quarter with likelihood, impact, mitigation plans, and owners for proactive leadership. The Assumptions Log + Validation Plan captures what must be true for your strategy to work and how you will validate each assumption. The Dependency Tracker maps cross-team and vendor dependencies with dates and risk levels. The Governance Checklist defines the weekly, monthly, and quarterly checks required for consistency. The Escalation Prep Page structures requests for leadership help: context, options, recommendation, decision needed, and deadline.",
  },
  {
    title: "Communication & Alignment",
    color: "#0D9488",
    templates: [
      { name: "OKR Rollout Communication Plan", href: `${BASE}/okr-rollout-communication` },
      { name: "Stakeholder Update Builder (Copy/Paste)", href: `${BASE}/stakeholder-update-builder` },
    ],
    explanation: "Goals only work if people understand them. The OKR Rollout Communication Plan defines who needs to hear what, when, and how — driving adoption across the organization. It covers the initial rollout, ongoing updates, and how to handle resistance or confusion. The Stakeholder Update Builder is a simple copy/paste template tied to your OKRs: progress summary, key risks, and asks. It is designed so you can fill it in quickly and send it as an email, Slack message, or status update without reformatting.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#D97706";
  const accentDark = "#78350F";

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
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors">
            <ArrowLeft size={14} />
            Back to OKR Hub
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">OKR &amp; Operating Rhythm Hub &mdash; Command Center</h2>
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
                  OKR &amp; OPERATING RHYTHM HUB
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 54 Templates &nbsp;|&nbsp; 7 Sections &nbsp;|&nbsp; Strategy-to-Execution System
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
                  The OKR &amp; Operating Rhythm Hub turns strategy into execution with a simple, repeatable system. It includes 54 professionally formatted templates organized into 7 sections that cover the full strategy-to-execution cycle &mdash; from setting OKRs (Objectives and Key Results) and picking the right initiatives, through weekly execution rhythms, monthly reviews, and quarterly business reviews (QBRs).
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
                    What Is the OKR &amp; Operating Rhythm Hub?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This package is a complete goal-setting and execution system. OKR stands for Objectives and Key Results &mdash; a framework originally developed at Intel and made famous by Google. An Objective is a clear, inspiring goal (for example, &ldquo;Become the #1 rated customer support team in our industry&rdquo;). Key Results are the specific, measurable outcomes that prove you achieved it (for example, &ldquo;Reduce average response time from 4 hours to under 1 hour&rdquo;). Together, OKRs keep teams focused on outcomes instead of just activities.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    The &ldquo;Operating Rhythm&rdquo; part of this package is equally important. It provides the weekly, monthly, and quarterly cadence that turns goals into consistent action. Without a rhythm, goals get set and forgotten. With a rhythm, they become part of how you work every week.
                  </p>
                  <p style={{ margin: "0" }}>
                    Start with the Quick Start Guide and the Operating Rhythm Dashboard. Set your quarterly OKRs using the OKR Builder, then use the Weekly Priorities Cockpit as your weekly home base. Every template copies and pastes cleanly into Microsoft OneNote or Word.
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
                  ExecNoteShop &nbsp;&bull;&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function OKRHubCommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
