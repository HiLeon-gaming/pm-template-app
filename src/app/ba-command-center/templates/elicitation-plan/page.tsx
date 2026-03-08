"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Schedule + prep + techniques", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Activities + schedule", icon: AlignJustify },
];

function ElicitationPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const schedRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📋 ELICITATION PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template helps you plan and organize all elicitation activities for your project.</strong> It documents which techniques to use (interviews, workshops, surveys, observation, document analysis), when to conduct them, who to involve, and what to prepare.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>requirements gathering kickoff, sprint planning,</strong> or <strong style={{ fontStyle: "italic" }}>discovery phases</strong>. Aligns with BABOK Knowledge Area: Elicitation and Collaboration.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Business Analyst</td>
            <td style={S.tdAlt}>[Your Name]</td>
            <td style={S.tdLabelAlt}>Phase</td>
            <td style={S.tdAlt}>[Discovery / Analysis / Validation / UAT]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Elicitation Objective</td>
            <td colSpan={3} style={S.td0}>[What information do we need to gather? What questions must be answered?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const TECHNIQUES = [
    { tech: "Interviews", icon: "🎤", desc: "1:1 or small group structured conversations", when: "Discovery, deep-dive into specific areas", who: "SMEs, Stakeholders, End Users", bg: "#EDE9FE", fg: "#7C3AED" },
    { tech: "Workshops", icon: "🏗️", desc: "Facilitated group sessions for collaborative requirements", when: "Early discovery, resolving conflicts, complex flows", who: "Cross-functional teams", bg: "#DBEAFE", fg: "#2563EB" },
    { tech: "Surveys", icon: "📊", desc: "Structured questionnaires for broad input", when: "Validating assumptions, gathering volume data", who: "Large user groups, distributed teams", bg: "#D1FAE5", fg: "#059669" },
    { tech: "Observation", icon: "👁️", desc: "Watch users perform tasks in their environment", when: "Understanding current workflows, finding pain points", who: "End users in their workspace", bg: "#FEF3C7", fg: "#D97706" },
    { tech: "Document Analysis", icon: "📄", desc: "Review existing docs, reports, and system artifacts", when: "Understanding current state, existing rules", who: "BA (self-directed)", bg: "#FCE7F3", fg: "#BE185D" },
    { tech: "Prototyping", icon: "🎨", desc: "Create mockups/wireframes for feedback", when: "Validating UI/UX, complex interactions", who: "End users, UX designers", bg: "#CFFAFE", fg: "#0891B2" },
  ];

  const renderTechniques = () => (
    <div ref={techRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔧 ELICITATION TECHNIQUES</div>
      <CopyButton targetRef={techRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Check which techniques you plan to use. Add details for each selected technique.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>☐</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Technique</th>
            <th style={S.thPrimary}>When to Use</th>
            <th style={{ ...S.thPrimary, width: "22%" }}>Target Participants</th>
          </tr>
        </thead>
        <tbody>
          {TECHNIQUES.map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>
                  <span style={S.badge(t.bg, t.fg)}>{t.icon} {t.tech}</span>
                  <div style={{ fontSize: "10px", color: "#6B7280", marginTop: "2px" }}>{t.desc}</div>
                </td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.who}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSchedule = () => (
    <div ref={schedRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📅 ELICITATION SCHEDULE</div>
      <CopyButton targetRef={schedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Date / Time</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>Technique</th>
            <th style={S.thSecondary}>Topic / Scope</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Participants</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Duration</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { date: "[MM/DD HH:MM]", tech: "Interview", topic: "[e.g., Current order processing workflow with warehouse team]", who: "[Warehouse Mgr]", dur: "60 min", stat: "Scheduled", sBg: "#DBEAFE", sFg: "#2563EB" },
            { date: "[MM/DD HH:MM]", tech: "Workshop", topic: "[e.g., Future state payment processing requirements]", who: "[Finance + IT]", dur: "2 hrs", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { date: "[MM/DD HH:MM]", tech: "Survey", topic: "[e.g., User satisfaction with current reporting tools]", who: "[All users]", dur: "Async", stat: "Draft", sBg: "#F3F4F6", sFg: "#6B7280" },
            { date: "[MM/DD HH:MM]", tech: "Observation", topic: "[e.g., Customer service call handling process]", who: "[CS Team]", dur: "4 hrs", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { date: "", tech: "", topic: "[Add activity]", who: "", dur: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
            { date: "", tech: "", topic: "[Add activity]", who: "", dur: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.tech}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📝 PREPARATION CHECKLIST</div>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thPrimary}>Preparation Task</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Activity #</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due</th>
          </tr>
        </thead>
        <tbody>
          {[
            { task: "Review existing documentation (process maps, SOPs, previous requirements)", act: "All", due: "[Date]" },
            { task: "Prepare interview questions / workshop agenda", act: "#1, #2", due: "[Date]" },
            { task: "Send pre-read materials to participants", act: "#1, #2", due: "[Date]" },
            { task: "Book meeting rooms / set up virtual links", act: "#1-#4", due: "[Date]" },
            { task: "Prepare survey in tool (SurveyMonkey / Forms)", act: "#3", due: "[Date]" },
            { task: "Get access to observation environment", act: "#4", due: "[Date]" },
            { task: "Prepare note-taking templates for each session", act: "All", due: "[Date]" },
            { task: "[Add preparation task]", act: "", due: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{row.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>⚠️ ELICITATION RISKS &amp; ASSUMPTIONS</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Key stakeholders unavailable", a: "[Mitigation: Identify delegates, offer async alternatives]" },
            { q: "Conflicting requirements from stakeholders", a: "[Mitigation: Use workshops to resolve; escalation path to sponsor]" },
            { q: "Scope creep during elicitation", a: "[Mitigation: Define scope boundaries upfront; parking lot for out-of-scope]" },
            { q: "Assumptions", a: "[e.g., All stakeholders have been identified; current documentation is accurate]" },
            { q: "Dependencies", a: "[e.g., Access to production system for observation; survey tool license]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "30%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), fontSize: "12px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><ClipboardList size={11} /> Elicitation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><ClipboardList size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Elicitation Plan</h2>
              <p className="text-xs font-medium text-indigo-600">Techniques &bull; Schedule &bull; Preparation &bull; Risks</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Plan all elicitation activities with technique selection, scheduling, preparation checklists, and risk management. Full Plan includes everything; Quick Plan focuses on activities and schedule.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderTechniques()}{renderSchedule()}<table style={LT}><tbody><tr><td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderPrep()}</td><td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderRisks()}</td></tr></tbody></table>{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderSchedule()}{renderRisks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ElicitationPlanPage() {
  return (<ThemeProvider><ElicitationPlanContent /></ThemeProvider>);
}
