"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Target, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "worksheet" | "summary";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "worksheet", label: "Full Worksheet", desc: "Deep goal definition", icon: LayoutDashboard },
  { id: "summary", label: "Goal Summary", desc: "Quick reference card", icon: AlignJustify },
];

const SMART = [
  { letter: "S", word: "Specific", color: "#DC2626", bg: "#FEE2E2", prompt: "What exactly do I want to accomplish? Who is involved? Where? What resources?", example: "[e.g., Launch a self-service onboarding portal for enterprise customers that reduces setup time from 14 days to 3 days]" },
  { letter: "M", word: "Measurable", color: "#2563EB", bg: "#DBEAFE", prompt: "How will I know I've achieved it? What metrics will I track?", example: "[e.g., Onboarding time ≤ 3 days, CSAT ≥ 4.5/5, 90% self-service completion rate]" },
  { letter: "A", word: "Achievable", color: "#059669", bg: "#D1FAE5", prompt: "Is this realistic with my current resources, skills, and constraints?", example: "[e.g., Yes — we have the dev team, budget is approved, similar portal took competitor 8 weeks]" },
  { letter: "R", word: "Relevant", color: "#D97706", bg: "#FEF3C7", prompt: "Why does this matter now? How does it align with bigger goals?", example: "[e.g., Directly supports Q3 OKR to reduce customer time-to-value; CEO priority]" },
  { letter: "T", word: "Time-bound", color: "#7C3AED", bg: "#EDE9FE", prompt: "What is the deadline? What are the interim milestones?", example: "[e.g., MVP by Week 4 (Mar 28), Beta by Week 8 (Apr 25), Full launch by Week 12 (May 23)]" },
];

function SMARTGoalContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("worksheet");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const smartRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🎯 SMART GOAL SETTING WORKSHEET</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Specific &bull; Measurable &bull; Achievable &bull; Relevant &bull; Time-bound</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Goal Title</td>
            <td style={{ ...S.td0, width: "36%" }}>[Give your goal a clear, concise name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Goal Owner</td>
            <td style={{ ...S.td0, width: "36%" }}>[Your Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Category</td>
            <td style={S.tdAlt}>☐ Career ☐ Project ☐ Financial ☐ Health ☐ Learning ☐ Other</td>
            <td style={S.tdLabelAlt}>Priority</td>
            <td style={S.tdAlt}>☐ Critical ☐ High ☐ Medium ☐ Low</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Start Date</td>
            <td style={S.td0}>[MM/DD/YYYY]</td>
            <td style={S.tdLabel}>Target Date</td>
            <td style={S.td0}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSMARTFramework = () => (
    <div ref={smartRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📝 S.M.A.R.T. FRAMEWORK</div>
      <CopyButton targetRef={smartRef} label="Copy Section" />
      {SMART.map((s, i) => (
        <table key={i} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr>
              <td colSpan={2} style={{
                backgroundColor: s.bg, color: s.color,
                padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
                fontWeight: 800, letterSpacing: "0.02em",
                borderBottom: `3px solid ${s.color}`,
                border: `1.5px solid ${C.border}`,
              }}>
                <span style={{ fontSize: "20px", marginRight: "8px" }}>{s.letter}</span> — {s.word}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...S.tdLabel, width: "20%", verticalAlign: "top" as const, fontSize: "11px" }}>Guiding Question</td>
              <td style={{ ...S.td0, fontSize: "12px", fontStyle: "italic" as const }}>{s.prompt}</td>
            </tr>
            <tr>
              <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Your Answer</td>
              <td style={{ ...S.tdAlt, height: "52px" }}>{s.example}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderGoalStatement = () => (
    <table style={{ ...S.tbl, marginBottom: "12px" }}>
      <thead>
        <tr><td style={{ backgroundColor: C.accent, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>✨ COMPLETE SMART GOAL STATEMENT</td></tr>
      </thead>
      <tbody>
        <tr><td style={{ ...S.td0, height: "60px", fontSize: "13px", fontStyle: "italic" as const, padding: "12px 16px" }}>[Write your full goal statement combining all 5 SMART elements into one clear, powerful sentence.]</td></tr>
      </tbody>
    </table>
  );

  const renderActionPlan = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🚀 ACTION PLAN &amp; MILESTONES</td></tr></tbody></table>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Action Step / Milestone</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Due Date</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Resources</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {[
            { step: "[e.g., Research competitor onboarding flows — document top 5]", due: "[Date]", res: "[Notion, team]" },
            { step: "[e.g., Wireframe MVP screens — get design approval]", due: "[Date]", res: "[Figma]" },
            { step: "[e.g., Build core portal — auth, dashboard, setup wizard]", due: "[Date]", res: "[Dev team]" },
            { step: "[e.g., Beta test with 5 enterprise customers]", due: "[Date]", res: "[CS team]" },
            { step: "[e.g., Iterate on feedback, fix top 10 issues]", due: "[Date]", res: "[QA]" },
            { step: "[e.g., Full launch with documentation & training]", due: "[Date]", res: "[Marketing]" },
            { step: "[Add step]", due: "", res: "" },
            { step: "[Add step]", due: "", res: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{row.res}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderObstacles = () => (
    <div ref={obstaclesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🚧 OBSTACLES &amp; MITIGATION</div>
      <CopyButton targetRef={obstaclesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary}>Potential Obstacle</th>
            <th style={{ ...S.thPrimary, width: "35%" }}>Mitigation Strategy</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Likelihood</th>
          </tr>
        </thead>
        <tbody>
          {[
            { obs: "[e.g., Dev team may get pulled to urgent bug fixes]", mit: "[Pre-allocate 2 devs as dedicated; escalation path to CTO]", like: "Medium" },
            { obs: "[e.g., Customer feedback may require major pivots]", mit: "[Build modular architecture; limit beta to 5 customers]", like: "Low" },
            { obs: "[Add obstacle]", mit: "", like: "" },
            { obs: "[Add obstacle]", mit: "", like: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.obs}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{row.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  {row.like ? <span style={S.badge(row.like === "Medium" ? C.badgeAmberBg : C.badgeGreenBg, row.like === "Medium" ? C.badgeAmberFg : C.badgeGreenFg)}>{row.like}</span> : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 GOAL REVIEW</div>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Check-in</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          {[
            { q: "Milestones completed vs. planned", a: "[___] / [___]" },
            { q: "Am I still on track for the deadline?", a: "☐ Yes ☐ Behind ☐ Ahead ☐ Need to re-scope" },
            { q: "Biggest win so far", a: "" },
            { q: "Biggest blocker right now", a: "" },
            { q: "Support or resources I need", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Final outcome</td>
            <td style={S.td0}>☐ Achieved ☐ Partially ☐ Not Achieved &nbsp;&nbsp; Score: [___] / 10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderWorksheet = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderSMARTFramework()}{renderGoalStatement()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderActionPlan()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderObstacles()}</td>
      </tr></tbody></table>
      {renderReview()}{renderFooter()}
    </>
  );

  const renderSummaryLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderGoalStatement()}{renderActionPlan()}{renderReview()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Target size={11} /> SMART Goals</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Target size={20} className="text-emerald-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">SMART Goal Setting Worksheet</h2>
              <p className="text-xs font-medium text-emerald-600">Specific &bull; Measurable &bull; Achievable &bull; Relevant &bull; Time-bound</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Define goals with the SMART framework. Each letter gets its own colored card with guiding questions. Includes action plan, obstacle mitigation, and goal review. Full Worksheet is comprehensive; Goal Summary is a quick reference.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "worksheet" && renderWorksheet()}
          {layout === "summary" && renderSummaryLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SMARTGoalSettingPage() {
  return (<ThemeProvider><SMARTGoalContent /></ThemeProvider>);
}
