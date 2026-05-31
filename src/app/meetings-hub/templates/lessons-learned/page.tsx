"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Timeline + what worked + lessons + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Review", desc: "Lessons + actions only", icon: AlignJustify },
];

function LessonsLearnedContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EA580C"; const accentDark = "#C2410C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📖 LESSONS LEARNED / POST-MORTEM</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Project &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project / Event</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Project Name / Incident]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Type</td><td style={S.tdAlt}>[Project closeout / Incident post-mortem / Phase review]</td></tr>
        <tr><td style={S.tdLabel}>Participants</td><td colSpan={3} style={S.td0}>[Core team + stakeholders who participated]</td></tr>
        <tr><td style={S.tdLabelAlt}>Overall Outcome</td><td colSpan={3} style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Success / Partial Success / Failed — one-sentence summary]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderTimeline = () => (
    <div ref={timelineRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📅 PROJECT TIMELINE RECAP</td></tr></tbody></table>
      <CopyButton targetRef={timelineRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Planned</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Actual</th>
          <th style={S.thPrimary}>Milestone</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Delta</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Why?</th>
        </tr></thead>
        <tbody>
          {[
            { planned: "[03/01]", actual: "[03/01]", ms: "[Kickoff]", delta: "0", why: "[On time]" },
            { planned: "[03/15]", actual: "[03/22]", ms: "[Requirements complete]", delta: "+7d", why: "[Scope expanded — 3 new requirements]" },
            { planned: "[05/01]", actual: "[05/10]", ms: "[Development complete]", delta: "+9d", why: "[API integration harder than expected]" },
            { planned: "[05/15]", actual: "[05/20]", ms: "[UAT complete]", delta: "+5d", why: "[3 critical bugs found in UAT]" },
            { planned: "[06/01]", actual: "[06/10]", ms: "[Go-live]", delta: "+9d", why: "[Cumulative delays from above]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const isLate = r.delta !== "0";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.planned}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: isLate ? "#DC2626" : "#059669" }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.ms}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: isLate ? "#DC2626" : "#059669" }}>{r.delta}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderLessons = () => (
    <div ref={lessonsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={lessonsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>✅ WHAT WENT WELL</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            {[
              "[Team collaboration was excellent — daily standups kept everyone aligned]",
              "[Stakeholder engagement — weekly reviews caught issues early]",
              "[Testing strategy — automated tests caught 80% of bugs before UAT]",
              "[Communication — Slack channel kept everyone informed in real-time]",
              "[Decision speed — RACI matrix prevented bottlenecks]",
            ].map((item, i) => (
              <tr key={i}><td style={{ ...(i % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "6px 10px" }}>&bull; {item}</td></tr>
            ))}
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>❌ WHAT DIDN&apos;T GO WELL</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            {[
              "[Scope creep — 3 requirements added mid-sprint without change control]",
              "[Estimation — API integration was underestimated by 40%]",
              "[Resource conflict — key developer pulled for 2 weeks]",
              "[Test environment — unstable, caused 5 days of delays total]",
              "[Documentation — left to the end, rushed and incomplete]",
            ].map((item, i) => (
              <tr key={i}><td style={{ ...(i % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "6px 10px" }}>&bull; {item}</td></tr>
            ))}
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🔑 KEY LESSONS &amp; FUTURE ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Lesson Learned</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Future Action / Recommendation</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { lesson: "[Enforce change control from day 1 — no exceptions]", action: "[Add change control gate to all project kickoffs]", owner: "[PMO]" },
            { lesson: "[Add 30% buffer to integration estimates]", action: "[Update estimation playbook with integration factors]", owner: "[Tech Leads]" },
            { lesson: "[Dedicated test environment — no sharing]", action: "[Request dedicated env in project charter]", owner: "[DevOps]" },
            { lesson: "[Documentation throughout, not at the end]", action: "[Add docs tasks to each sprint, not just the last one]", owner: "[PM]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.lesson}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Share With</td><td style={S.td0}>[PMO, future project teams, leadership — add to knowledge base]</td></tr>
        <tr><td style={S.tdLabelAlt}>Knowledge Base Link</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Link to where this is stored for future reference]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><BookOpen size={11} />Lessons</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><BookOpen size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Lessons Learned / Post-Mortem</h2><p className="text-xs font-medium text-orange-600">Timeline &bull; What Worked &bull; Lessons &bull; Future Actions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured project review: timeline recap, what went well, what didn&apos;t, key lessons, and actionable recommendations.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderTimeline()}{renderLessons()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderLessons()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function LessonsLearnedPage() { return <ThemeProvider><LessonsLearnedContent /></ThemeProvider>; }
