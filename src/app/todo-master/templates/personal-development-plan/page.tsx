"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Sparkles, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "summary";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Assessment + goals + timeline", icon: LayoutDashboard },
  { id: "summary", label: "Quick Plan", desc: "Goals + actions only", icon: AlignJustify },
];

function PersonalDevContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const assessRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>✨ PERSONAL DEVELOPMENT PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Invest in Yourself, Intentionally</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Name</td>
            <td style={{ ...S.td0, width: "36%" }}>[Your Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Current Role</td>
            <td style={{ ...S.td0, width: "36%" }}>[Title @ Company]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Plan Period</td>
            <td style={S.tdAlt}>[Start] — [End] (e.g., 6 months / 1 year)</td>
            <td style={S.tdLabelAlt}>Target Role</td>
            <td style={S.tdAlt}>[Where do I want to be? e.g., Senior PM, Engineering Manager]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Career Vision (3-5 years)</td>
            <td colSpan={3} style={S.td0}>[Paint the big picture: What kind of leader / professional do I want to become?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const SKILLS = [
    { skill: "[e.g., Strategic Thinking]", current: "3", target: "5", gap: "2", pri: "High", priBg: "#FEE2E2", priFg: "#DC2626" },
    { skill: "[e.g., Data Analysis / SQL]", current: "2", target: "4", gap: "2", pri: "High", priBg: "#FEE2E2", priFg: "#DC2626" },
    { skill: "[e.g., Executive Presence]", current: "3", target: "5", gap: "2", pri: "Med", priBg: "#FEF3C7", priFg: "#D97706" },
    { skill: "[e.g., Technical Architecture]", current: "2", target: "3", gap: "1", pri: "Med", priBg: "#FEF3C7", priFg: "#D97706" },
    { skill: "[e.g., Conflict Resolution]", current: "3", target: "4", gap: "1", pri: "Low", priBg: "#F3F4F6", priFg: "#6B7280" },
    { skill: "[Add skill]", current: "", target: "", gap: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280" },
  ];

  const renderAssessment = () => (
    <div ref={assessRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 SKILLS ASSESSMENT (1-5 Scale)</div>
      <CopyButton targetRef={assessRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Rate yourself 1 (novice) to 5 (expert). Gap = Target − Current. Focus on the biggest gaps first.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary}>Skill / Competency</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Current</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Gap</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{s.skill}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{s.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{s.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{s.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.priBg, s.priFg)}>{s.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const DEV_GOALS = [
    { num: 1, goal: "[e.g., Develop executive communication skills]", measure: "[Present to leadership 3x, score 4+/5 on feedback]", color: "#DC2626", bg: "#FEE2E2" },
    { num: 2, goal: "[e.g., Build data fluency — SQL + dashboard creation]", measure: "[Build 2 self-service dashboards, pass SQL cert]", color: "#2563EB", bg: "#DBEAFE" },
    { num: 3, goal: "[e.g., Strengthen cross-functional leadership]", measure: "[Lead 1 cross-team initiative, 360 feedback ≥ 4.0]", color: "#059669", bg: "#D1FAE5" },
  ];

  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🎯 DEVELOPMENT GOALS</td></tr></tbody></table>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      {DEV_GOALS.map((g) => (
        <table key={g.num} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr>
              <td colSpan={4} style={{
                backgroundColor: g.bg, color: g.color,
                padding: "10px 14px", fontFamily: S.font, fontSize: "14px",
                fontWeight: 800, borderBottom: `3px solid ${g.color}`,
                border: `1.5px solid ${C.border}`,
              }}>
                GOAL #{g.num}: {g.goal}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...S.tdLabel, width: "16%" }}>Success Measure</td>
              <td colSpan={3} style={S.td0}>{g.measure}</td>
            </tr>
            <tr>
              <td style={S.tdLabelAlt}>Skills Targeted</td>
              <td style={{ ...S.tdAlt, width: "34%" }}>[Which skills from assessment?]</td>
              <td style={{ ...S.tdLabelAlt, width: "14%" }}>Timeline</td>
              <td style={S.tdAlt}>[By when?]</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🚀 LEARNING ACTIVITIES &amp; ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Activity / Action</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Goal #</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {[
            { activity: "[e.g., Enroll in 'Executive Presence' course on LinkedIn Learning]", type: "Course", typeBg: "#EDE9FE", typeFg: "#7C3AED", goal: "G1", due: "[Date]" },
            { activity: "[e.g., Shadow CFO in next board meeting + debrief after]", type: "Stretch", typeBg: "#FEF3C7", typeFg: "#D97706", goal: "G1", due: "[Date]" },
            { activity: "[e.g., Complete SQL fundamentals (Mode Analytics)]", type: "Course", typeBg: "#EDE9FE", typeFg: "#7C3AED", goal: "G2", due: "[Date]" },
            { activity: "[e.g., Build customer churn dashboard in Looker]", type: "Project", typeBg: "#DBEAFE", typeFg: "#2563EB", goal: "G2", due: "[Date]" },
            { activity: "[e.g., Volunteer to lead the Q4 cross-team planning initiative]", type: "Stretch", typeBg: "#FEF3C7", typeFg: "#D97706", goal: "G3", due: "[Date]" },
            { activity: "[e.g., Read 'Crucial Conversations' and apply one technique per week]", type: "Book", typeBg: "#D1FAE5", typeFg: "#059669", goal: "G3", due: "[Date]" },
            { activity: "[Add activity]", type: "—", typeBg: "#F3F4F6", typeFg: "#6B7280", goal: "", due: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.activity}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.typeBg, row.typeFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{row.goal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTimeline = () => (
    <div ref={timelineRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📅 MILESTONE TIMELINE</td></tr></tbody></table>
      <CopyButton targetRef={timelineRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "14%" }}>Timeframe</th>
            <th style={S.thSecondary}>Milestone</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: "Month 1", milestone: "[e.g., Complete skills assessment, enroll in first course, schedule shadow sessions]", stat: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { time: "Month 3", milestone: "[e.g., Finish 2 courses, deliver first leadership presentation, build first dashboard]", stat: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { time: "Month 6", milestone: "[e.g., Lead cross-team initiative, complete all courses, pass certification]", stat: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { time: "Month 9", milestone: "[e.g., Present results, gather 360 feedback, prepare for promotion discussion]", stat: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { time: "Month 12", milestone: "[e.g., Achieve target role or readiness confirmation from manager]", stat: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, color: C.accent }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.milestone}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 PROGRESS REVIEW</div>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Goals on track vs. total", a: "[___] / [___]" },
            { q: "Activities completed vs. planned", a: "[___] / [___]" },
            { q: "Biggest growth area so far", a: "" },
            { q: "Biggest challenge / gap remaining", a: "" },
            { q: "Support needed from manager", a: "" },
            { q: "Revised priorities (if any)", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}{renderAssessment()}{renderGoals()}{renderActions()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderTimeline()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderReview()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderSummaryLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderGoals()}{renderActions()}{renderReview()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><Sparkles size={11} /> Growth Plan</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Sparkles size={20} className="text-purple-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Personal Development Plan</h2>
              <p className="text-xs font-medium text-purple-600">Invest in Yourself, Intentionally &mdash; Skills &bull; Goals &bull; Actions &bull; Timeline</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured development plan with skills assessment (1-5 scale), colored goal cards, learning activities, milestone timeline, and progress review. Full Plan includes assessment and timeline; Quick Plan focuses on goals and actions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Plan Depth</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "summary" && renderSummaryLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PersonalDevelopmentPlanPage() {
  return (<ThemeProvider><PersonalDevContent /></ThemeProvider>);
}
