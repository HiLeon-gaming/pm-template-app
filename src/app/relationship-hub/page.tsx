import React from "react";
import Link from "next/link";
import {
  Layout,
  ArrowLeft,
  Handshake,
  Sparkles,
  Star,
  BookOpen,
  UserCircle,
  HeartHandshake,
  ClipboardCheck,
  MessageSquare,
  ShieldAlert,
  BarChart3,
} from "lucide-react";

const BASE = "/relationship-hub/templates";

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
    subtitle: "Setup, orientation, and your relationship management foundation",
    icon: BookOpen,
    color: "#E11D48",
    templates: [
      {
        title: "Relationship Command Dashboard (Home Base)",
        description: "One page: hot stakeholders, follow-ups due, commitments due, risks, and next key touchpoints.",
        href: `${BASE}/relationship-command-dashboard`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Instant daily clarity",
      },
      {
        title: "Quick Start Guide (Setup in 20 Minutes)",
        description: "How to create profiles, set cadence, and run weekly reviews.",
        href: `${BASE}/quick-start-guide`,
        badge: "\u2705 Built",
      },
      {
        title: "Terminology Guide",
        description: "Stakeholder, sponsor, champion, decision maker, influencer, CRM, and more — in plain English.",
        href: `${BASE}/terminology-guide`,
        badge: "\u2705 Built",
      },
      {
        title: "Confidentiality & Notes Guidelines",
        description: "How to store sensitive notes responsibly.",
        href: `${BASE}/confidentiality-guidelines`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Types Cheat Sheet",
        description: "Internal vs external; sponsor vs gatekeeper; champion vs blocker.",
        href: `${BASE}/stakeholder-types-cheat-sheet`,
        badge: "\u2705 Built",
      },
      {
        title: "Relationship Cadence Planner",
        description: "How often you should check in with each stakeholder type.",
        href: `${BASE}/relationship-cadence-planner`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Directory Index",
        description: "Name, role, org/team, importance level, cadence, link to profile page.",
        href: `${BASE}/stakeholder-directory-index`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Stakeholder Profiles (CRM-lite)",
    subtitle: "The heart of the system — duplicate these per stakeholder",
    icon: UserCircle,
    color: "#8B5CF6",
    templates: [
      {
        title: "Stakeholder Intake (Quick Capture)",
        description: "Fast capture page when you meet someone new.",
        href: `${BASE}/stakeholder-intake`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Profile Template (Master)",
        description: "Role, goals, priorities, pain points, success definition, preferences, relationship history, next steps.",
        href: `${BASE}/stakeholder-profile`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Executive memory system",
      },
      {
        title: "Communication Preferences Page",
        description: "Best channel, cadence, format, what annoys them, what they love.",
        href: `${BASE}/communication-preferences`,
        badge: "\u2705 Built",
      },
      {
        title: "Influence & Interest Snapshot",
        description: "Simple power vs interest grid — helps prioritize attention.",
        href: `${BASE}/influence-interest-snapshot`,
        badge: "\u2705 Built",
      },
      {
        title: "Decision & Approval Map",
        description: "What they can approve, block, or influence.",
        href: `${BASE}/decision-approval-map`,
        badge: "\u2705 Built",
      },
      {
        title: "Trust Builders & Trust Breakers List",
        description: "What builds trust with them; what damages trust.",
        href: `${BASE}/trust-builders-breakers`,
        badge: "\u2705 Built",
      },
      {
        title: "\"What They Care About\" Notes",
        description: "Their KPIs, goals, constraints, political realities.",
        href: `${BASE}/what-they-care-about`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Risk Notes (Landmines)",
        description: "Sensitive topics, history, friction points, red flags.",
        href: `${BASE}/stakeholder-risk-notes`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Wins & Recognition Log",
        description: "What to celebrate, when to thank them, what matters to them.",
        href: `${BASE}/stakeholder-wins-recognition`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Meeting History Index",
        description: "Links to meetings and key decisions over time.",
        href: `${BASE}/stakeholder-meeting-history`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Personal Context",
        description: "Travel schedule, preferred times, communication style notes.",
        href: `${BASE}/stakeholder-personal-context`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Contact Details Page",
        description: "Assistants, alternate contacts, escalation path.",
        href: `${BASE}/stakeholder-contact-details`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Relationship Planning",
    subtitle: "Intentional strategies — not reactive firefighting",
    icon: HeartHandshake,
    color: "#0EA5E9",
    templates: [
      {
        title: "Relationship Plan Template",
        description: "Desired relationship state, value exchange, current friction, plan to improve.",
        href: `${BASE}/relationship-plan`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Intentional management",
      },
      {
        title: "Mutual Value Map",
        description: "How your work helps their goals (and what they need from you).",
        href: `${BASE}/mutual-value-map`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Engagement Strategy",
        description: "How to keep them informed and involved without overloading them.",
        href: `${BASE}/stakeholder-engagement-strategy`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Touchpoint Planner (Monthly)",
        description: "Who needs a check-in this month and why.",
        href: `${BASE}/stakeholder-touchpoint-planner`,
        badge: "\u2705 Built",
      },
      {
        title: "Sponsor Management Plan",
        description: "How to keep your sponsor aligned, informed, and ready to help.",
        href: `${BASE}/sponsor-management-plan`,
        badge: "\u2705 Built",
      },
      {
        title: "Champion Builder Plan",
        description: "How to develop champions and supporters in other teams.",
        href: `${BASE}/champion-builder-plan`,
        badge: "\u2705 Built",
      },
      {
        title: "Blocker / Resistance Strategy Plan",
        description: "How to handle a difficult stakeholder professionally.",
        href: `${BASE}/blocker-resistance-strategy`,
        badge: "\u2705 Built",
      },
      {
        title: "Relationship Review Notes (Monthly)",
        description: "What improved, what degraded, what to do next.",
        href: `${BASE}/relationship-review-notes`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Continuous improvement",
      },
    ],
  },
  {
    title: "Commitments, Follow-Ups & Accountability",
    subtitle: "Trust comes from follow-through — never drop the ball",
    icon: ClipboardCheck,
    color: "#EA580C",
    templates: [
      {
        title: "Commitments Log (Master)",
        description: "What we promised, to whom, by when, status, next follow-up date.",
        href: `${BASE}/commitments-log`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Trust engine",
      },
      {
        title: "\"Who Owes Who What\" Tracker",
        description: "Track mutual dependencies and obligations.",
        href: `${BASE}/who-owes-who-what`,
        badge: "\u2705 Built",
      },
      {
        title: "Follow-Up Queue (Next 7 Days)",
        description: "Your daily follow-up list in priority order.",
        href: `${BASE}/follow-up-queue`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Daily execution",
      },
      {
        title: "Waiting On Tracker",
        description: "Requests pending from others; when to ping next.",
        href: `${BASE}/waiting-on-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Escalations & Stuck Items Log",
        description: "Context, impact, options, who can unblock, deadline.",
        href: `${BASE}/escalations-stuck-items`,
        badge: "\u2705 Built",
      },
      {
        title: "Relationship Health Scorecard",
        description: "Simple scoring: trust, responsiveness, alignment, friction, risk.",
        href: `${BASE}/relationship-health-scorecard`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Early warning system",
      },
      {
        title: "\"Hot Stakeholders\" Dashboard",
        description: "Top 10 stakeholders that need attention this week.",
        href: `${BASE}/hot-stakeholders-dashboard`,
        badge: "\u2705 Built",
      },
      {
        title: "Conversation Capture (Quick Notes)",
        description: "Super fast after-call notes page.",
        href: `${BASE}/conversation-capture`,
        badge: "\u2705 Built",
      },
      {
        title: "Conflict Notes & Resolution Plan",
        description: "What happened, what you want, next conversation plan.",
        href: `${BASE}/conflict-notes-resolution`,
        badge: "\u2705 Built",
      },
      {
        title: "Apology / Repair Plan (Professional)",
        description: "How to fix a mistake or miscommunication professionally.",
        href: `${BASE}/apology-repair-plan`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Meetings, Touchpoints & Communication",
    subtitle: "Stakeholder meetings that produce decisions and alignment",
    icon: MessageSquare,
    color: "#059669",
    templates: [
      {
        title: "Stakeholder Meeting Prep Brief",
        description: "Purpose, desired outcome, risks, decisions needed, talking points, pre-reads.",
        href: `${BASE}/stakeholder-meeting-prep`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Better meetings",
      },
      {
        title: "Stakeholder Meeting Agenda (Simple)",
        description: "Timeboxed agenda tied to outcomes.",
        href: `${BASE}/stakeholder-meeting-agenda`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Meeting Notes + Decisions + Actions",
        description: "Capture outputs cleanly for history and accountability.",
        href: `${BASE}/stakeholder-meeting-notes`,
        badge: "\u2705 Built",
      },
      {
        title: "Follow-Up Email Builder (Copy/Paste)",
        description: "Recap: what we decided, actions, owners, due dates, next touchpoint.",
        href: `${BASE}/follow-up-email-builder`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Fast recap + accountability",
      },
      {
        title: "Stakeholder Update Builder (Short)",
        description: "Progress, risks, asks, next steps for email/Teams.",
        href: `${BASE}/stakeholder-update-short`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Update Builder (Exec/Leadership)",
        description: "One-page executive style update.",
        href: `${BASE}/stakeholder-update-exec`,
        badge: "\u2705 Built",
      },
      {
        title: "Communication Plan (Per Stakeholder Group)",
        description: "Who gets what, when, in what format.",
        href: `${BASE}/communication-plan`,
        badge: "\u2705 Built",
      },
      {
        title: "Storytelling / Message Framing Page",
        description: "How to present updates in a way that lands well.",
        href: `${BASE}/storytelling-message-framing`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Stakeholder Analysis & Risk",
    subtitle: "Look strategic, not just organized",
    icon: ShieldAlert,
    color: "#6366F1",
    templates: [
      {
        title: "Stakeholder Map (Influence vs Interest)",
        description: "Visual map you can update quarterly.",
        href: `${BASE}/stakeholder-map`,
        badge: "\u2705 Built",
      },
      {
        title: "Stakeholder Sentiment Tracker",
        description: "Positive/neutral/negative trend + reasons.",
        href: `${BASE}/stakeholder-sentiment-tracker`,
        badge: "\u2705 Built",
      },
      {
        title: "Risk Radar (Stakeholder-Driven Risks)",
        description: "What stakeholder risks could derail progress and mitigation plans.",
        href: `${BASE}/risk-radar`,
        badge: "\u2705 Built",
      },
      {
        title: "Change Impact Notes (Stakeholder View)",
        description: "How changes impact each group; what they need.",
        href: `${BASE}/change-impact-notes`,
        badge: "\u2705 Built",
      },
      {
        title: "Objection Handling Playbook",
        description: "Common objections + responses + evidence.",
        href: `${BASE}/objection-handling-playbook`,
        badge: "\u2705 Built",
      },
      {
        title: "Negotiation Prep Sheet",
        description: "What you want, what they want, tradeoffs, boundaries.",
        href: `${BASE}/negotiation-prep-sheet`,
        badge: "\u2705 Built",
      },
      {
        title: "Escalation Prep Page",
        description: "Context, options, recommendation, decision needed, deadline.",
        href: `${BASE}/escalation-prep`,
        badge: "\u2705 Built",
      },
      {
        title: "Alignment Check Page",
        description: "What they think is happening vs what is happening.",
        href: `${BASE}/alignment-check`,
        badge: "\u2705 Built",
      },
    ],
  },
  {
    title: "Reporting & Exec Summaries",
    subtitle: "Leaders want quick clarity, not long notes",
    icon: BarChart3,
    color: "#D97706",
    templates: [
      {
        title: "Stakeholder Brief Builder (Internal)",
        description: "One-page: who matters, where things stand, key risks, asks, next steps.",
        href: `${BASE}/stakeholder-brief-builder`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Leadership-ready summaries",
      },
      {
        title: "Relationship Portfolio Snapshot (RAG)",
        description: "Red/Amber/Green health summary across all key stakeholders.",
        href: `${BASE}/relationship-portfolio-snapshot`,
        badge: "\u2705 Built",
        allStar: true,
        whyAllStar: "Quick portfolio view",
      },
      {
        title: "Quarterly Relationship Review",
        description: "What changed, what improved, what’s at risk.",
        href: `${BASE}/quarterly-relationship-review`,
        badge: "\u2705 Built",
      },
      {
        title: "Wins & Momentum Summary",
        description: "What’s going well; who to recognize; what to reinforce.",
        href: `${BASE}/wins-momentum-summary`,
        badge: "\u2705 Built",
      },
      {
        title: "Archive / Closeout Template",
        description: "Transition notes when a stakeholder changes roles or you hand off ownership.",
        href: `${BASE}/archive-closeout`,
        badge: "\u2705 Built",
      },
    ],
  },
];

export default function RelationshipHubPage() {
  const totalTemplates = categories.reduce((sum, c) => sum + c.templates.length, 0);
  const builtTemplates = categories.reduce(
    (sum, c) => sum + c.templates.filter((t) => t.href).length,
    0
  );
  const allStarCount = categories.reduce(
    (sum, c) => sum + c.templates.filter((t) => t.allStar).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* Header */}
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
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Star size={11} />
              Etsy Best Seller
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors mb-8">
          <ArrowLeft size={14} />
          Back to All Products
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center">
              <Handshake size={28} className="text-rose-600" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Relationship &amp; Stakeholder Management Hub
              </h2>
              <p className="text-sm font-medium text-rose-600 mt-0.5">
                For Professionals Who Manage People, Trust, and Follow-Through
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            Your complete OneNote system for managing stakeholder relationships like a pro. Profiles, commitments, follow-ups, meeting prep, risk tracking, and executive summaries &mdash; all in one notebook. Copy-paste any template into OneNote or Word with perfect formatting.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5">
              <span className="text-2xl font-extrabold text-slate-900">{totalTemplates}</span>
              <span className="text-sm text-slate-500 ml-1.5">Templates</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5">
              <span className="text-2xl font-extrabold text-emerald-600">{builtTemplates}</span>
              <span className="text-sm text-slate-500 ml-1.5">Built</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5">
              <span className="text-2xl font-extrabold text-amber-600">{allStarCount}</span>
              <span className="text-sm text-slate-500 ml-1.5">
                <Star size={12} className="inline -mt-0.5 mr-0.5" />
                All-Stars
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2.5">
              <span className="text-2xl font-extrabold text-slate-900">{categories.length}</span>
              <span className="text-sm text-slate-500 ml-1.5">Sections</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <section key={ci}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color + "18" }}>
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{cat.title}</h3>
                    <p className="text-xs text-slate-500">{cat.subtitle}</p>
                  </div>
                  <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: cat.color + "18", color: cat.color }}>
                    {cat.templates.length} templates
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.templates.map((t, ti) => {
                    const isBuilt = !!t.href;
                    const inner = (
                      <div className={`bg-white rounded-lg border p-4 h-full flex flex-col transition-all duration-150 ${isBuilt ? "border-slate-200 hover:border-rose-300 hover:shadow-md cursor-pointer" : "border-dashed border-slate-200 opacity-60"}`}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">{t.title}</h4>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {t.allStar && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold">
                                <Star size={9} /> All-Star
                              </span>
                            )}
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isBuilt ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-50 text-slate-400 border border-slate-200"}`}>
                              {t.badge}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed flex-1">{t.description}</p>
                        {t.allStar && t.whyAllStar && (
                          <p className="text-[10px] text-amber-600 font-medium mt-2 flex items-center gap-1">
                            <Sparkles size={9} />
                            {t.whyAllStar}
                          </p>
                        )}
                      </div>
                    );
                    return isBuilt ? (
                      <Link key={ti} href={t.href!}>{inner}</Link>
                    ) : (
                      <div key={ti}>{inner}</div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-400">
          <p>&copy; 2026 ExecNoteShop. All rights reserved.</p>
          <p>Relationship &amp; Stakeholder Management Hub</p>
        </div>
      </footer>
    </div>
  );
}
