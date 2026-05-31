"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Rocket, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Kickoff", desc: "Overview + roles + timeline + risks + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Kickoff", desc: "Overview + roles + actions only", icon: AlignJustify },
];

function ProjectKickoffContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EA580C"; const accentDark = "#C2410C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚀 PROJECT KICKOFF</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Project &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Sponsor</td><td style={S.tdAlt}>[Executive Sponsor]</td></tr>
        <tr><td style={S.tdLabel}>Duration</td><td style={S.td0}>[60 minutes]</td><td style={S.tdLabel}>Attendees</td><td style={S.td0}>[Core team + stakeholders]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderOverview = () => (
    <div ref={overviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 PROJECT OVERVIEW</td></tr></tbody></table>
      <CopyButton targetRef={overviewRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Business Problem</td><td style={S.td0}>[What problem are we solving? Why now?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Project Goal</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[What does success look like? Be specific and measurable.]</td></tr>
        <tr><td style={S.tdLabel}>Scope (In)</td><td style={S.td0}>[What’s included in this project?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Scope (Out)</td><td style={S.tdAlt}>[What’s explicitly NOT included?]</td></tr>
        <tr><td style={S.tdLabel}>Key Deliverables</td><td style={S.td0}>[List the major outputs / deliverables]</td></tr>
        <tr><td style={S.tdLabelAlt}>Success Metrics</td><td style={S.tdAlt}>[How will we measure success? KPIs?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderRoles = () => (
    <div ref={rolesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>👥 TEAM &amp; ROLES</td></tr></tbody></table>
      <CopyButton targetRef={rolesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Role</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Name</th>
          <th style={S.thPrimary}>Responsibilities</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Executive Sponsor", name: "[Name]", resp: "[Final decision authority, budget approval, escalation path]" },
            { role: "Project Manager", name: "[Name]", resp: "[Plan, track, report, remove blockers, facilitate meetings]" },
            { role: "Technical Lead", name: "[Name]", resp: "[Architecture, technical decisions, code review]" },
            { role: "Business Analyst", name: "[Name]", resp: "[Requirements, user stories, acceptance criteria]" },
            { role: "QA Lead", name: "[Name]", resp: "[Test strategy, test execution, defect management]" },
            { role: "Stakeholder Rep", name: "[Name]", resp: "[Business input, UAT, sign-off]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: accent }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.resp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTimeline = () => (
    <div ref={timelineRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📅 KEY MILESTONES</td></tr></tbody></table>
      <CopyButton targetRef={timelineRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Milestone</th>
          <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Target Date</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { ms: "[Requirements complete]", date: "[03/15]", owner: "[BA]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { ms: "[Design approved]", date: "[03/28]", owner: "[Tech Lead]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { ms: "[Development complete]", date: "[05/01]", owner: "[Dev Team]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { ms: "[UAT complete]", date: "[05/15]", owner: "[QA + Stakeholders]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { ms: "[Go-live]", date: "[06/01]", owner: "[PM]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.ms}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚠️ KNOWN RISKS &amp; ASSUMPTIONS</td></tr></tbody></table>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: "#DC2626", color: "#FFFFFF" }}>⚠️ Risks</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "10px" }}>
              &bull; [Resource availability — key developer may be pulled]<br />
              &bull; [Third-party API dependency — timeline uncertain]<br />
              &bull; [Scope creep risk — stakeholders adding requirements]<br />
              &bull; [Budget constraint — no contingency buffer]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: "#3B82F6", color: "#FFFFFF" }}>📌 Assumptions</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "10px" }}>
              &bull; [Full team available from project start]<br />
              &bull; [Stakeholders available for weekly reviews]<br />
              &bull; [Existing infrastructure supports new features]<br />
              &bull; [No major organizational changes during project]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ IMMEDIATE NEXT STEPS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Communication Plan</td><td style={S.td0}>[How will we communicate? Slack channel, email list, meetings?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Meeting Cadence</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Weekly status Tuesdays 10am, Daily standup 9:15am]</td></tr>
        <tr><td style={S.tdLabel}>First Deliverable</td><td style={S.td0}>[What’s due first? Requirements doc by 03/15]</td></tr>
        <tr><td style={S.tdLabelAlt}>Questions / Concerns</td><td style={S.tdAlt}>[Capture any open questions from the kickoff]</td></tr>
        <tr><td style={S.tdLabel}>Recap Sent By</td><td style={S.td0}>[PM — within 24 hours of kickoff]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Rocket size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Project Kickoff</h2><p className="text-xs font-medium text-orange-600">⭐ All-Star &mdash; Overview &bull; Roles &bull; Timeline &bull; Risks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Complete kickoff template: project overview, team roles, milestones, risks, assumptions, and immediate next steps.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderOverview()}{renderRoles()}{renderTimeline()}{renderRisks()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderOverview()}{renderRoles()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProjectKickoffPage() { return <ThemeProvider><ProjectKickoffContent /></ThemeProvider>; }
