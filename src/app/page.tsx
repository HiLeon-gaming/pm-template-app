
import React from "react";
import Link from "next/link";
import {
  Layout,
  ClipboardList,
  Search,
  CheckSquare,
  Compass,
  Zap,
  ArrowRight,
  Sparkles,
  Star,
  Package,
  Users,
  Shield,
} from "lucide-react";

const products = [
  {
    id: "pm-command-center",
    title: "Project Management Command Center",
    subtitle: "For PMP-Certified Leaders & Aspiring Project Managers",
    description:
      "A comprehensive notebook of 30+ PMP-aligned templates covering every PMBOK process group — from Initiating through Closing. Professionally formatted tables with guided sample content, ready to copy-paste into OneNote or Word.",
    icon: ClipboardList,
    href: "/pm-command-center",
    color: "indigo",
    bgClass: "bg-indigo-600",
    lightBgClass: "bg-indigo-50",
    hoverBgClass: "hover:bg-indigo-100",
    textClass: "text-indigo-600",
    hoverBorderClass: "hover:border-indigo-300",
    shadowClass: "hover:shadow-indigo-100/50",
    badgeClass: "bg-indigo-100 text-indigo-700",
    templateCount: "30+",
    highlights: [
      "PMBOK 7th Edition aligned",
      "All 5 process groups covered",
      "RAG dashboards & EVM tracking",
      "Stakeholder & risk management",
    ],
  },
  {
    id: "ba-command-center",
    title: "Business Analyst Command Center",
    subtitle: "For CBAP / CCBA Professionals & BA Practitioners",
    description:
      "Essential BA toolkit with 25+ templates spanning requirements engineering, stakeholder analysis, process modeling, solution evaluation, and UAT — built on BABOK best practices.",
    icon: Search,
    href: "/ba-command-center",
    color: "violet",
    bgClass: "bg-violet-600",
    lightBgClass: "bg-violet-50",
    hoverBgClass: "hover:bg-violet-100",
    textClass: "text-violet-600",
    hoverBorderClass: "hover:border-violet-300",
    shadowClass: "hover:shadow-violet-100/50",
    badgeClass: "bg-violet-100 text-violet-700",
    templateCount: "25+",
    highlights: [
      "BABOK-aligned framework",
      "Requirements & traceability",
      "Process modeling & gap analysis",
      "UAT planning & sign-off",
    ],
  },
  {
    id: "todo-master",
    title: "The To-Do Master Template Package",
    subtitle: "For Executives, Managers & High-Performance Professionals",
    description:
      "20+ beautifully structured productivity templates — daily planners, weekly reviews, goal trackers, meeting frameworks, and personal Kanban boards. Designed for the professional who runs on structure.",
    icon: CheckSquare,
    href: "/todo-master",
    color: "emerald",
    bgClass: "bg-emerald-600",
    lightBgClass: "bg-emerald-50",
    hoverBgClass: "hover:bg-emerald-100",
    textClass: "text-emerald-600",
    hoverBorderClass: "hover:border-emerald-300",
    shadowClass: "hover:shadow-emerald-100/50",
    badgeClass: "bg-emerald-100 text-emerald-700",
    templateCount: "20+",
    highlights: [
      "Eisenhower priority matrix",
      "Weekly reviews & OKR tracking",
      "Meeting agendas & 1-on-1s",
      "Habit & goal trackers",
    ],
  },
  {
    id: "pmbok7-alignment-pack",
    title: "PMBOK\u00ae 7 Alignment Pack",
    subtitle: "For PMs Who Want Modern, Principle-Based Project Management",
    description:
      "Turn PMBOK\u00ae 7's 8 Performance Domains + 12 Principles into practical, reusable pages you can run a project with. Weekly health checks, tailoring worksheets, measurement blueprints, and uncertainty playbooks.",
    icon: Compass,
    href: "/pmbok7-alignment-pack",
    color: "teal",
    bgClass: "bg-teal-600",
    lightBgClass: "bg-teal-50",
    hoverBgClass: "hover:bg-teal-100",
    textClass: "text-teal-600",
    hoverBorderClass: "hover:border-teal-300",
    shadowClass: "hover:shadow-teal-100/50",
    badgeClass: "bg-teal-100 text-teal-700",
    templateCount: "41+",
    highlights: [
      "8 Performance Domain health checks",
      "12 Principles turned into practice pages",
      "Measurement & uncertainty toolkit",
      "PMO / audit readiness proof",
    ],
  },
  {
    id: "agile-command-center",
    title: "Agile / Scrum Delivery Command Center",
    subtitle: "For Scrum Masters, Agile PMs & Delivery Leads",
    description:
      "Mission control for Agile projects: sprint planning, daily standups, backlog mastery, retros, stakeholder demos, and simple metrics. Works alongside Jira/Asana or as your only tool.",
    icon: Zap,
    href: "/agile-command-center",
    color: "sky",
    bgClass: "bg-sky-600",
    lightBgClass: "bg-sky-50",
    hoverBgClass: "hover:bg-sky-100",
    textClass: "text-sky-600",
    hoverBorderClass: "hover:border-sky-300",
    shadowClass: "hover:shadow-sky-100/50",
    badgeClass: "bg-sky-100 text-sky-700",
    templateCount: "48+",
    highlights: [
      "Sprint planning & capacity tools",
      "Daily scrum & impediment tracking",
      "Backlog prioritization (MoSCoW + WSJF)",
      "Retros, demos & stakeholder feedback",
    ],
  },
  {
    id: "meetings-hub",
    title: "Meetings Hub Pro",
    subtitle: "For Leaders + Teams Who Run on Meetings",
    description:
      "A complete OneNote system for running meetings that actually get results. Agenda builders, minutes capture, 1:1 frameworks, decision logs, action trackers, and follow-up email scripts.",
    icon: Users,
    href: "/meetings-hub",
    color: "amber",
    bgClass: "bg-amber-500",
    lightBgClass: "bg-amber-50",
    hoverBgClass: "hover:bg-amber-100",
    textClass: "text-amber-600",
    hoverBorderClass: "hover:border-amber-300",
    shadowClass: "hover:shadow-amber-100/50",
    badgeClass: "bg-amber-100 text-amber-700",
    templateCount: "52+",
    highlights: [
      "Universal agenda & minutes builders",
      "1:1, staff, project & exec templates",
      "Decision log & action tracker",
      "Follow-up email scripts (copy/paste)",
    ],
  },
  {
    id: "ea-cos-command-center",
    title: "EA / Chief of Staff Command Center",
    subtitle: "For Executive Assistants & Chiefs of Staff",
    description:
      "The complete operating system for being the engine behind a leader. Requests, calendar strategy, meeting prep, stakeholder management, travel logistics, and executive briefs — all in one notebook.",
    icon: Shield,
    href: "/ea-cos-command-center",
    color: "purple",
    bgClass: "bg-purple-600",
    lightBgClass: "bg-purple-50",
    hoverBgClass: "hover:bg-purple-100",
    textClass: "text-purple-600",
    hoverBorderClass: "hover:border-purple-300",
    shadowClass: "hover:shadow-purple-100/50",
    badgeClass: "bg-purple-100 text-purple-700",
    templateCount: "62+",
    highlights: [
      "Executive inbox & request triage",
      "Meeting brief builder & follow-ups",
      "Stakeholder CRM & relationship plans",
      "Travel, events & weekly exec briefs",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
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
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Star size={11} />
              Etsy Best Seller
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-5">
          <Package size={12} />
          OneNote &amp; Word Template Packages
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Professional Templates That{" "}
          <span className="text-indigo-600">Copy-Paste Perfectly</span> Into
          OneNote &amp; Word
        </h2>
        <p className="text-base text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
          Real tables with visible borders, formatted headers, color-coded
          badges, and guided sample content. Select a product below to browse
          its full template library.
        </p>

        {/* How it works */}
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {[
            {
              step: "1",
              title: "Choose a Product",
              desc: "Pick the template package for your role",
            },
            {
              step: "2",
              title: "Browse & Copy",
              desc: "Copy any section or entire template",
            },
            {
              step: "3",
              title: "Paste to OneNote / Word",
              desc: "Tables, colors & formatting transfer cleanly",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-3 bg-white rounded-lg border border-slate-200 px-4 py-3 min-w-[200px] max-w-[260px] text-left"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {item.step}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 text-center">
          Our Product Line
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                href={p.href}
                className={`group bg-white rounded-xl border border-slate-200 ${p.hoverBorderClass} hover:shadow-lg ${p.shadowClass} transition-all duration-200 overflow-hidden flex flex-col`}
              >
                {/* Color bar */}
                <div className={`h-1.5 ${p.bgClass}`} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${p.lightBgClass} flex items-center justify-center ${p.hoverBgClass} transition-colors`}
                    >
                      <Icon size={24} className={p.textClass} />
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.badgeClass}`}
                    >
                      {p.templateCount} Templates
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-slate-800 transition-colors leading-tight">
                    {p.title}
                  </h4>
                  <p className={`text-xs font-semibold ${p.textClass} mt-1`}>
                    {p.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed flex-1">
                    {p.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 space-y-1.5">
                    {p.highlights.map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-2 text-xs text-slate-600"
                      >
                        <Sparkles size={10} className={p.textClass} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm font-bold ${p.textClass}`}
                  >
                    Browse Templates
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-slate-400">
          <p>&copy; 2026 ExecNoteShop. All rights reserved.</p>
          <p>
            Built for professionals who demand structure &amp; style.
          </p>
        </div>
      </footer>
    </div>
  );
}
