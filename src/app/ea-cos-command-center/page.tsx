"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layout,
  Shield,
  CheckCircle2,
  Settings,
  Lock,
  Star,
  BookOpen,
  Inbox,
  Calendar,
  Users,
  Briefcase,
  Heart,
  Plane,
  FileText,
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

const BASE = "/ea-cos-command-center/templates";

const categories: Category[] = [
  {
    title: "Start Here",
    subtitle: "Setup, orientation & executive operating system",
    icon: BookOpen,
    color: "#8B5CF6",
    templates: [
      {
        title: "Executive OS Dashboard (Home Base)",
        description:
          "Today’s priorities, upcoming key meetings, open requests, waiting on, and risks — instant clarity every morning.",
        href: `${BASE}/exec-os-dashboard`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Instant clarity every morning.",
      },
      {
        title: "Quick Start Guide",
        description:
          "Daily/weekly rhythm + where to capture what. Buyer success in day 1.",
        href: `${BASE}/quick-start`,
        badge: "\u2705 Built",
      },
      {
        title: "Role Definition: EA vs Chief of Staff",
        description:
          "Explains which sections matter most depending on role. Makes the pack broad but relevant.",
        href: `${BASE}/role-definition`,
        badge: "\u2705 Built",
      },
      {
        title: "Confidentiality & Sensitive Notes Guidelines",
        description:
          "How to store sensitive info safely and consistently. Executive support often touches sensitive topics.",
        href: `${BASE}/confidentiality-guidelines`,
        badge: "\u2705 Built",
      },
      {
        title: "Executive Preferences & Operating Style",
        description:
          "Meeting preferences, communication style, priorities, pet peeves, how they like decisions presented.",
        href: `${BASE}/exec-preferences`,
        badge: "\u2705 Built",
      },
      {
        title: "Exec Inbox / Request Intake (Triage Console)",
        description:
          "Capture every ask with priority, owner, due date, and status. The single most-used EA page.",
        href: `${BASE}/exec-inbox-triage`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "The single most-used EA page.",
      },
    ],
  },
  {
    title: "Requests, Follow-Ups & Accountability",
    subtitle: "The execution engine of an EA/CoS",
    icon: Inbox,
    color: "#EC4899",
    templates: [
      {
        title: "Request Intake Form (Quick Capture)",
        description:
          "One-page capture for calls, Slack, hallway asks. Reduce dropped balls.",
        href: `${BASE}/request-intake-form`,
        badge: "\u2705 Built",
      },
      {
        title: "Delegation Tracker",
        description:
          "What the exec delegated, to whom, and when to follow up. Makes delegation real.",
        href: `${BASE}/delegation-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Approvals Queue (Sign-offs / Reviews / Decisions)",
        description:
          "Items waiting for exec approval + deadline + what’s needed. Prevents last-minute fire drills.",
        href: `${BASE}/approvals-queue`,
        badge: "\u2705 Built",
      },
      {
        title: "\"Waiting On\" Tracker (Per Person / Team)",
        description:
          "Track responses and deliverables from others. Follow-up without nagging.",
        href: `${BASE}/waiting-on-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Follow-Up Queue (Next 7 Days)",
        description:
          "A prioritized follow-up list with the next touchpoint date. Stops silent stalls.",
        href: `${BASE}/follow-up-queue`,
        badge: "\u2705 Built",
      },
      {
        title: "Waiting On / Follow-Up Master Tracker",
        description:
          "Single source of truth for everything you’re chasing. Your second-most used page.",
        href: `${BASE}/follow-up-master-tracker`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Your second-most used page.",
      },
      {
        title: "Escalations & Stuck Items Log",
        description:
          "What’s stuck, impact, options, recommended escalation. Helps the exec unblock fast.",
        href: `${BASE}/escalations-stuck-items`,
        badge: "\u2705 Built",
      },
      {
        title: "Commitments Log (External Promises)",
        description:
          "Promises made to others + deadlines + owner. Protects trust and reputation.",
        href: `${BASE}/commitments-log`,
        badge: "\u2705 Built",
      },
      {
        title: "\"What Could Blow Up This Week?\" Risk Radar",
        description:
          "Quick weekly risk scan with mitigation actions. Prevents surprises.",
        href: `${BASE}/risk-radar`,
        badge: "\u2705 Built",
      },
      {
        title: "Closeout Checklist (Request Complete)",
        description:
          "Confirm completion, notify stakeholders, archive notes. Keeps the system clean.",
        href: `${BASE}/closeout-checklist`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Calendar, Time & Priorities",
    subtitle: "The exec’s calendar is the battlefield",
    icon: Calendar,
    color: "#0EA5E9",
    templates: [
      {
        title: "Weekly Calendar Strategy (Focus Themes)",
        description:
          "What matters this week and what must be protected. Keeps time aligned to strategy.",
        href: `${BASE}/weekly-calendar-strategy`,
        badge: "\u2705 Built",
      },
      {
        title: "Today Plan (Top 3 + Must-Do Meetings)",
        description:
          "Today’s focus + what success looks like today. Clarity for busy days.",
        href: `${BASE}/today-plan`,
        badge: "\u2705 Built",
      },
      {
        title: "Tomorrow Prep Page",
        description:
          "What to tee up, pre-reads, reminders, key messages. Reduces morning chaos.",
        href: `${BASE}/tomorrow-prep`,
        badge: "\u2705 Built",
      },
      {
        title: "Meeting Brief Builder (Prep Page)",
        description:
          "Purpose, attendees, agenda, risks, decisions needed, talking points, doc links.",
        href: `${BASE}/meeting-brief-builder`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Exec looks prepared every time.",
      },
      {
        title: "Pre-Reads & Links Index (Meeting Pack)",
        description:
          "All docs/links in one clean table. No more “where’s the deck?”",
        href: `${BASE}/pre-reads-links-index`,
        badge: "\u2705 Built",
      },
      {
        title: "Calendar Tradeoff Page",
        description:
          "Decision rules for protecting focus time and priorities. “If we say yes, what moves?”",
        href: `${BASE}/calendar-tradeoff`,
        badge: "\u2705 Built",
      },
      {
        title: "Focus Time / Deep Work Planner",
        description:
          "Protected blocks + rules + what to do when interrupted. Aligns with high-performer audience.",
        href: `${BASE}/focus-time-planner`,
        badge: "\u2705 Built",
      },
      {
        title: "Time Audit Snapshot",
        description:
          "Category-based time tracking and improvement notes. Improves calendar quality over time.",
        href: `${BASE}/time-audit-snapshot`,
        badge: "\u2705 Built",
      },
      {
        title: "Travel / Meeting Buffer Rules",
        description:
          "Set rules for realistic transition time. Reduces “impossible calendar” syndrome.",
        href: `${BASE}/buffer-rules`,
        badge: "\u2705 Built",
      },
      {
        title: "Recurring Meeting Cadence Map",
        description:
          "List recurring meetings, purpose, and if they’re still needed. Reduces meeting overload.",
        href: `${BASE}/recurring-cadence-map`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Meetings Engine (Executive Support Edition)",
    subtitle: "Decisions happen in meetings — make them clean",
    icon: Users,
    color: "#F59E0B",
    templates: [
      {
        title: "Universal Meeting Notes + Actions",
        description:
          "Notes, decisions, action items, owners, due dates. Clean and repeatable.",
        href: `${BASE}/meeting-notes-actions`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Clean outputs from every meeting.",
      },
      {
        title: "Decision Needed Page (Decision Framing)",
        description:
          "Problem, options, recommendation, owner, deadline, impact. Turns talk into decisions.",
        href: `${BASE}/decision-needed`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Turns talk into decisions.",
      },
      {
        title: "Parking Lot",
        description:
          "Capture distractions without losing them. Keeps meetings on track.",
        href: `${BASE}/parking-lot`,
        badge: "\u2705 Built",
      },
      {
        title: "Meeting Closeout Checklist",
        description:
          "Decisions captured, actions assigned, recap sent. Prevents loose ends.",
        href: `${BASE}/meeting-closeout`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Profile Template (CRM-lite)",
        description:
          "Who they are, goals, concerns, preferences, last touch, next step. Executive memory system.",
        href: `${BASE}/stakeholder-profile`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Executive memory system.",
      },
      {
        title: "VIP Meeting Prep Page",
        description:
          "High-stakes meetings: objectives, risks, negotiation points, desired outcome.",
        href: `${BASE}/vip-meeting-prep`,
        badge: "\u2705 Built",
      },
      {
        title: "Exec Talking Points Builder",
        description:
          "Key messages, phrasing options, objections, responses. Fast prep for exec communications.",
        href: `${BASE}/talking-points-builder`,
        badge: "\u2705 Built",
      },
      {
        title: "Follow-Up Email Builder (Recap Template)",
        description:
          "Copy/paste recap email with decisions/actions/next steps. Huge time saver.",
        href: `${BASE}/follow-up-email-builder`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Saves time daily.",
      },
      {
        title: "Meeting History Index",
        description:
          "Links to prior meeting notes by stakeholder/topic. “What did we decide last time?” solved.",
        href: `${BASE}/meeting-history-index`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Stakeholders & Relationships (CRM-lite)",
    subtitle: "EAs/CoS manage relationships as much as tasks",
    icon: Heart,
    color: "#EF4444",
    templates: [
      {
        title: "Stakeholder Directory (Quick List)",
        description:
          "Name, role, org, importance, preferences, cadence. Simple directory.",
        href: `${BASE}/stakeholder-directory`,
        badge: "\u2705 Built",
      },
      {
        title: "Relationship Plan (Key Stakeholders)",
        description:
          "What they care about, how to support them, what to avoid. Proactive relationship management.",
        href: `${BASE}/relationship-plan`,
        badge: "\u2705 Built",
      },
      {
        title: "Touchpoint / Outreach Planner",
        description:
          "Who needs a check-in this week/month. Prevents neglected relationships.",
        href: `${BASE}/touchpoint-planner`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Issues & Sensitivities Log",
        description:
          "Landmines, history, context, and how to navigate. Protects the exec.",
        href: `${BASE}/stakeholder-sensitivities`,
        badge: "\u2705 Built",
      },
      {
        title: "\"Who Owes Who What?\" Commitments Map",
        description:
          "Cross-team commitments and dependencies. Prevents dropped handoffs.",
        href: `${BASE}/commitments-map`,
        badge: "\u2705 Built",
      },
      {
        title: "External Partners / Vendors Tracker",
        description:
          "Key vendors, renewals, owner, current status. Very corporate-useful.",
        href: `${BASE}/vendors-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Recognition & Wins Log",
        description:
          "Who did great work; what should be acknowledged. Helps leaders be great leaders.",
        href: `${BASE}/recognition-wins-log`,
        badge: "\u2705 Built",
      },
      {
        title: "Executive Networking Notes",
        description:
          "Conferences, contacts, introductions, follow-ups. Expands value beyond operations.",
        href: `${BASE}/networking-notes`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Initiatives, Projects & Alignment",
    subtitle: "Chief of Staff core — visibility across the org",
    icon: Briefcase,
    color: "#059669",
    templates: [
      {
        title: "Initiative Portfolio Snapshot",
        description:
          "What’s in flight, health, owner, next milestone, risks. Exec-level view.",
        href: `${BASE}/initiative-portfolio`,
        badge: "\u2705 Built",
      },
      {
        title: "Status Update Collector (From Teams)",
        description:
          "Standard format for updates to reduce noise. Easier weekly briefings.",
        href: `${BASE}/status-update-collector`,
        badge: "\u2705 Built",
      },
      {
        title: "Decision Log Master",
        description:
          "Decision, date, context, options, owner, impact. Stops repeated debates.",
        href: `${BASE}/decision-log-master`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Stops repeated debates.",
      },
      {
        title: "Action Items Master Tracker (Cross-Meeting)",
        description:
          "All actions across meetings with owners and due dates. Accountability hub.",
        href: `${BASE}/action-items-master`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Cross-meeting execution.",
      },
      {
        title: "Escalation Prep Page (For the Exec)",
        description:
          "Context, recommended ask, options, risks, decision needed. Helps exec unblock quickly.",
        href: `${BASE}/escalation-prep`,
        badge: "\u2705 Built",
      },
      {
        title: "OKR / Priority Alignment Check",
        description:
          "How initiatives map to priorities; what to pause/stop. Strategy-to-execution.",
        href: `${BASE}/okr-alignment-check`,
        badge: "\u2705 Built",
      },
      {
        title: "\"Stop Doing\" List (Capacity Reclaim)",
        description:
          "What we’re dropping and why. Creates focus.",
        href: `${BASE}/stop-doing-list`,
        badge: "\u2705 Built",
      },
      {
        title: "Leadership Operating Rhythm Planner",
        description:
          "Weekly/monthly cadence: what gets reviewed when. Predictable leadership system.",
        href: `${BASE}/operating-rhythm-planner`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Travel, Events & Logistics",
    subtitle: "Make complex logistics feel effortless",
    icon: Plane,
    color: "#EA580C",
    templates: [
      {
        title: "Travel Request Intake",
        description:
          "Destination, purpose, dates, preferences, constraints. Fast travel setup.",
        href: `${BASE}/travel-request-intake`,
        badge: "\u2705 Built",
      },
      {
        title: "Travel Itinerary Builder",
        description:
          "Flight/hotel/ground, confirmation numbers, contacts, schedule. One-page travel clarity.",
        href: `${BASE}/travel-itinerary-builder`,
        badge: "\u2705 Built",
      },
      {
        title: "Packing & Readiness Checklist",
        description:
          "Customizable packing and “don’t forget” list. Reduces travel friction.",
        href: `${BASE}/packing-readiness-checklist`,
        badge: "\u2705 Built",
      },
      {
        title: "Event Planning Runbook",
        description:
          "Timeline, vendors, attendee list, agenda, logistics. Repeatable and pro.",
        href: `${BASE}/event-planning-runbook`,
        badge: "\u2705 Built",
      },
      {
        title: "Weekly Executive Brief Builder",
        description:
          "Top priorities, key meetings, decisions needed, risks, asks, wins. Enormous value.",
        href: `${BASE}/weekly-exec-brief`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Enormous value; exec loves this.",
      },
      {
        title: "Contact Sheet (Emergency / On-site)",
        description:
          "Hotel, airline, drivers, venue, team contacts. Safety and sanity.",
        href: `${BASE}/contact-sheet`,
        badge: "\u2705 Built",
      },
      {
        title: "Post-Event Debrief Notes",
        description:
          "What worked, what didn’t, follow-ups. Continuous improvement.",
        href: `${BASE}/post-event-debrief`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Admin, Finance & Document Control",
    subtitle: "Operational tasks organized & audit-friendly",
    icon: FileText,
    color: "#6366F1",
    templates: [
      {
        title: "Expense & Reimbursement Tracker",
        description:
          "What’s submitted, what’s pending, receipts. Avoids lost reimbursements.",
        href: `${BASE}/expense-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Approvals & Signatures Log",
        description:
          "What’s awaiting signature, due dates, risks. Avoids missed approvals.",
        href: `${BASE}/approvals-signatures-log`,
        badge: "\u2705 Built",
      },
      {
        title: "Document Library Index",
        description:
          "Links to key files, decks, SOPs, org charts. Speed + consistency.",
        href: `${BASE}/document-library-index`,
        badge: "\u2705 Built",
      },
      {
        title: "SOP / \"How We Do Things\" Page",
        description:
          "Repeatable processes: onboarding, travel booking, etc. Systematizes the role.",
        href: `${BASE}/sop-how-we-do-things`,
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

export default function EACosCommandCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center">
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
            <Shield size={11} />
            EA / Chief of Staff
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Shield size={28} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Executive Assistant / Chief of Staff Command Center
              </h2>
              <p className="text-sm font-medium text-purple-600 mt-0.5">
                Requests &bull; Calendar &bull; Briefs &bull; Stakeholders &bull; Follow-Through
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 mt-3 leading-relaxed max-w-3xl">
            The complete operating system for being the &ldquo;engine&rdquo; behind a leader.
            Capture requests, triage priorities, prep meetings, manage stakeholders,
            coordinate travel, and ensure nothing falls through the cracks.
          </p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <CheckCircle2 size={12} />
              {builtCount} Templates Ready
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
              <Settings size={12} />
              {totalTemplates - builtCount} Coming Soon
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Star size={12} />
              10 All-Star Pages
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
                                  ? "text-slate-900 group-hover:text-purple-700"
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
                            <p className="text-[10px] mt-1 text-purple-600 font-medium italic">
                              Why All-Star: {tmpl.whyAllStar}
                            </p>
                          )}
                        </div>
                        {isBuilt && (
                          <ArrowRight
                            size={14}
                            className="text-slate-300 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                          />
                        )}
                      </div>
                    );

                    if (isBuilt) {
                      return (
                        <Link
                          key={tmpl.title}
                          href={tmpl.href!}
                          className="group rounded-lg border px-4 py-3.5 transition-all duration-150 bg-white border-slate-200 hover:border-purple-300 hover:shadow-md hover:shadow-purple-50 cursor-pointer"
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
            Built for EAs &amp; Chiefs of Staff who run the show behind the scenes.
          </p>
        </div>
      </footer>
    </div>
  );
}
