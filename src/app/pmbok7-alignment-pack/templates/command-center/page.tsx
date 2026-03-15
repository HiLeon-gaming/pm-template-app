"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/pmbok7-alignment-pack/templates";
interface TmplEntry { name: string; href: string }
interface Section { title: string; color: string; templates: TmplEntry[]; explanation: string }

const sections: Section[] = [
  {
    title: "Start Here",
    color: "#0D9488",
    templates: [
      { name: "READ THIS FIRST \u2014 How This Pack Works", href: `${BASE}/read-this-first` },
      { name: "PMBOK 7 Alignment Dashboard", href: `${BASE}/alignment-dashboard` },
      { name: "PMBOK 7 Quick Start", href: `${BASE}/quick-start` },
      { name: "Artifact-to-Domain Mapping Matrix", href: `${BASE}/artifact-to-domain-mapping` },
    ],
    explanation: "Start here to understand the pack and set up your alignment system. The READ THIS FIRST page explains what this pack is, how to use it alongside the PM Command Center or as a standalone tool, and the recommended weekly and monthly routines. The PMBOK 7 Alignment Dashboard is your home base \u2014 an at-a-glance view of domain health, principle focus, current delivery approach, top outcomes, and next actions. The Quick Start guide walks you through simple setup steps and the recommended cadence. The Artifact-to-Domain Mapping Matrix is one of the most valuable pages in the pack \u2014 it lets you map your existing project documents (charter, plan, RAID log, reports, etc.) to the 8 performance domains and 12 principles so you can prove alignment quickly without starting from scratch.",
  },
  {
    title: "Tailoring & Delivery Approach",
    color: "#7C3AED",
    templates: [
      { name: "Tailoring Strategy Worksheet", href: `${BASE}/tailoring-strategy-worksheet` },
      { name: "Delivery Approach Selector", href: `${BASE}/delivery-approach-selector` },
      { name: "Project Context Snapshot", href: `${BASE}/project-context-snapshot` },
      { name: "Governance & Decision Rights Map", href: `${BASE}/governance-decision-rights-map` },
      { name: "Tailoring Decisions Log", href: `${BASE}/tailoring-decisions-log` },
      { name: "Working Agreements & Team Norms", href: `${BASE}/working-agreements-team-norms` },
    ],
    explanation: "Tailoring is central to PMBOK 7 \u2014 it means adapting your approach to fit the project instead of forcing every project into the same template. The Tailoring Strategy Worksheet defines what you will tailor (governance depth, planning detail, reporting frequency, controls) and why, based on your project\u2019s context. The Delivery Approach Selector is a decision framework to choose between Predictive (traditional waterfall), Hybrid (mix of planned and agile), or Agile delivery \u2014 with clear tradeoffs, risks, and what changes with each choice. The Project Context Snapshot captures objectives, constraints, complexity drivers, critical stakeholders, and risk posture on one page. The Governance & Decision Rights Map clarifies who decides what, escalation paths, cadence, and what requires formal approval. The Tailoring Decisions Log is a living record of what you tailored, when, and the outcome \u2014 valuable for audits and lessons learned. Working Agreements & Team Norms document how the team operates: collaboration rules, communication norms, conflict resolution, and meeting etiquette.",
  },
  {
    title: "8 Performance Domain Health Checks",
    color: "#DC2626",
    templates: [
      { name: "Stakeholder Domain Health Check", href: `${BASE}/stakeholder-domain-health-check` },
      { name: "Team Domain Health Check", href: `${BASE}/team-domain-health-check` },
      { name: "Development Approach & Life Cycle Health Check", href: `${BASE}/dev-approach-lifecycle-health-check` },
      { name: "Planning Domain Health Check", href: `${BASE}/planning-domain-health-check` },
      { name: "Project Work Health Check", href: `${BASE}/project-work-domain-health-check` },
      { name: "Delivery Domain Health Check", href: `${BASE}/delivery-domain-health-check` },
      { name: "Measurement Domain Health Check", href: `${BASE}/measurement-domain-health-check` },
      { name: "Uncertainty Domain Health Check", href: `${BASE}/uncertainty-domain-health-check` },
    ],
    explanation: "PMBOK 7 organizes project management into 8 Performance Domains \u2014 areas of focus that work together to deliver successful outcomes. Each health check in this section gives you a structured assessment for one domain. The Stakeholder Domain checks power/interest alignment, sentiment, engagement risks, and friction points. The Team Domain assesses capacity, morale, conflict, skill gaps, and ownership clarity. The Development Approach & Life Cycle domain asks whether the chosen approach is still right and whether controls are proportional. The Planning Domain evaluates plan quality, readiness, dependency clarity, and planning risks. The Project Work domain examines execution reality: blockers, flow, decision latency, and operational load. The Delivery Domain tracks increment delivery, acceptance health, quality trends, and release readiness. The Measurement Domain asks whether you are measuring the right things and whether metrics are driving decisions. The Uncertainty Domain catches volatility, unknown-unknowns, and contingency posture \u2014 the domain where projects most often \u201Cflip red\u201D without warning.",
  },
  {
    title: "12 Principles \u2014 Practice Pages",
    color: "#2563EB",
    templates: [
      { name: "Principles-to-Practice Master Checklist", href: `${BASE}/principles-master-checklist` },
      { name: "Stewardship Practice Page", href: `${BASE}/principle-stewardship` },
      { name: "Team Practice Page", href: `${BASE}/principle-team` },
      { name: "Stakeholders Practice Page", href: `${BASE}/principle-stakeholders` },
      { name: "Value Practice Page", href: `${BASE}/principle-value` },
      { name: "Systems Thinking Practice Page", href: `${BASE}/principle-systems-thinking` },
      { name: "Leadership Practice Page", href: `${BASE}/principle-leadership` },
      { name: "Tailoring Practice Page", href: `${BASE}/principle-tailoring` },
      { name: "Quality Practice Page", href: `${BASE}/principle-quality` },
      { name: "Complexity Practice Page", href: `${BASE}/principle-complexity` },
      { name: "Risk Practice Page", href: `${BASE}/principle-risk` },
      { name: "Adaptability & Resiliency Practice Page", href: `${BASE}/principle-adaptability` },
      { name: "Change Practice Page", href: `${BASE}/principle-change` },
    ],
    explanation: "PMBOK 7 defines 12 Principles of Project Management that guide how project managers should think and behave. These practice pages turn each abstract principle into concrete actions. The Master Checklist gives you a single-page view of all 12 principles with what \u201Cgood\u201D looks like, evidence/artifacts, and current status \u2014 perfect for self-audits and PMO (Project Management Office) reviews. Each individual practice page then dives deeper: Stewardship covers ethics, transparency, and accountability. Team focuses on collaboration, psychological safety, and conflict patterns. Stakeholders addresses engagement strategies by type. Value defines intended outcomes and success measures. Systems Thinking prompts you to consider upstream and downstream impacts, constraints, and feedback loops. Leadership covers decision clarity and empowerment. Tailoring reinforces adapting your approach. Quality addresses quality strategy and acceptance integrity. Complexity identifies complexity drivers and simplification plans. Risk covers risk posture and response integrity. Adaptability & Resiliency addresses pivot readiness and resilience planning. Change examines change impact and adoption friction.",
  },
  {
    title: "Measurement & Outcomes",
    color: "#059669",
    templates: [
      { name: "Measurement Strategy Blueprint", href: `${BASE}/measurement-strategy` },
      { name: "Outcome & Benefits Evidence Planner", href: `${BASE}/outcome-benefits` },
      { name: "Metrics Review Notes + Actions", href: `${BASE}/metrics-review` },
    ],
    explanation: "These templates turn the Measurement Performance Domain into a real operating system. The Measurement Strategy Blueprint defines your KPIs (Key Performance Indicators) and OKRs (Objectives and Key Results), distinguishes between leading indicators (which predict future results) and lagging indicators (which measure past results), and establishes targets, data sources, owners, cadence, and decision rules. The Outcome & Benefits Evidence Planner links project outcomes to measurable evidence: before/after comparisons, adoption signals, and financial or operational proof. This is critical for demonstrating that the project delivered real value, not just completed tasks. The Metrics Review Notes + Actions is a recurring notes page that turns metrics into decisions and assignments \u2014 preventing \u201Creporting theater\u201D where numbers are presented but nothing changes as a result.",
  },
  {
    title: "Uncertainty & Complexity Toolkit",
    color: "#D97706",
    templates: [
      { name: "Uncertainty / Complexity Assessment + Response Playbook", href: `${BASE}/assessment-playbook` },
      { name: "Assumption Stress Test Worksheet", href: `${BASE}/assumption-stress-test` },
      { name: "Contingency Triggers & Pivot Plan", href: `${BASE}/contingency-triggers` },
      { name: "Decision Latency Tracker", href: `${BASE}/decision-latency` },
    ],
    explanation: "Uncertainty and complexity are two of the biggest challenges in modern projects, and PMBOK 7 gives them dedicated attention. The Uncertainty / Complexity Assessment + Response Playbook helps you score your project\u2019s uncertainty and complexity levels, identify the specific drivers, choose response strategies, and set triggers for when to escalate or pivot \u2014 giving you a structured way to manage the unknown instead of just adding buffer time. The Assumption Stress Test Worksheet lists every key assumption, evaluates the likelihood of being wrong, defines a validation plan, and identifies the consequence if the assumption turns out to be invalid. The Contingency Triggers & Pivot Plan establishes \u201Cif X happens, we do Y\u201D rules with clear thresholds and approval processes. The Decision Latency Tracker is a unique and powerful tool that tracks slow decisions, calculates their cost to the project, and escalates them \u2014 because decision latency (the time it takes to make a decision) is one of the largest hidden risks in any project.",
  },
  {
    title: "Continuous Improvement & Alignment Proof",
    color: "#BE185D",
    templates: [
      { name: "Domain Retrospective (Monthly)", href: `${BASE}/domain-retro` },
      { name: "Principle-Based Lessons Learned Capture", href: `${BASE}/principle-lessons` },
      { name: "PMBOK 7 Alignment Summary", href: `${BASE}/alignment-summary` },
      { name: "PMO / Audit Readiness Checklist", href: `${BASE}/pmo-audit-checklist` },
    ],
    explanation: "These templates close the loop on continuous improvement and provide the evidence trail that PMOs and auditors look for. The Domain Retrospective is a monthly review that asks what improved across the 8 domains, what degraded, and what actions will fix it. The Principle-Based Lessons Learned Capture frames lessons through the lens of the 12 principles, making them reusable across projects instead of one-off notes. The PMBOK 7 Alignment Summary is a pre-formatted document you can paste into status reports, charters, or steering committee updates to demonstrate alignment. The PMO / Audit Readiness Checklist is a quick compliance scan covering evidence, decisions, tailoring proof, measurement integrity, and uncertainty posture \u2014 everything an auditor would ask about, organized so you can answer confidently.",
  },
];

function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#0D9488";
  const accentDark = "#134E4A";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center">
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
          <Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors">
            <ArrowLeft size={14} />
            Back to PMBOK 7 Alignment Pack
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <ClipboardList size={20} className="text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">PMBOK&reg; 7 Alignment Pack &mdash; Command Center</h2>
              <p className="text-xs font-medium text-teal-600">Your One-Page Guide to the Entire Package</p>
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
                  PMBOK&reg; 7 ALIGNMENT PACK
                </td>
              </tr>
              <tr>
                <td style={{
                  backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
                  fontSize: "11px", fontWeight: 600, fontFamily: S.font,
                  textAlign: "center" as const, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}>
                  ExecNoteShop &nbsp;|&nbsp; 42 Templates &nbsp;|&nbsp; 7 Sections &nbsp;|&nbsp; 8 Domains + 12 Principles
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
                  The PMBOK&reg; 7 Alignment Pack turns the latest edition of the Project Management Body of Knowledge into practical, reusable templates you can actually run a project with. It includes 42 professionally formatted pages organized into 7 sections covering the 8 Performance Domains, 12 Principles, tailoring strategies, measurement systems, uncertainty management, and continuous improvement.
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
                    What Is the PMBOK&reg; 7 Alignment Pack?
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    PMBOK stands for Project Management Body of Knowledge, published by PMI (Project Management Institute). The 7th edition, released in 2021, was a major shift: instead of prescribing specific processes and documents, it focuses on 8 Performance Domains (areas of focus like Stakeholders, Team, Planning, Delivery, and Measurement) and 12 Principles (guiding behaviors like Stewardship, Value, Quality, Risk, and Adaptability). This makes PMBOK 7 more flexible but also harder to implement &mdash; because it tells you what to think about, not what document to create.
                  </p>
                  <p style={{ margin: "0 0 10px 0" }}>
                    This pack solves that problem. It gives you a concrete template for every domain and every principle, plus tools for tailoring your approach, measuring outcomes, managing uncertainty, and proving alignment to your PMO or auditors. You can use it as a standalone alignment system or as a companion to the PM Command Center.
                  </p>
                  <p style={{ margin: "0" }}>
                    Start with the Quick Start guide and the Alignment Dashboard. Use the Artifact-to-Domain Mapping Matrix to map your existing documents. Then work through the domain health checks and principle practice pages at your own pace. Every template copies and pastes cleanly into Microsoft OneNote or Word.
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
                  ExecNoteShop &nbsp;&bull;&nbsp; PMBOK&reg; 7 Alignment Pack &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
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

export default function PMBOK7CommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
