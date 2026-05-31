"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All 12 principles + scoring", icon: LayoutDashboard },
  { id: "compact", label: "Quick Checklist", desc: "Scores only", icon: AlignJustify },
];

function PrinciplesMasterChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED"; const accentDark = "#5B21B6";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const principles = [
    { num: "1", name: "Stewardship", question: "Are we acting as responsible stewards of project resources, organizational assets, and stakeholder trust?", score: "4", evidence: "[Budget managed within 2% variance; ethical procurement practices; transparent reporting to sponsor]" },
    { num: "2", name: "Team", question: "Have we built a collaborative, empowered, and accountable team environment?", score: "5", evidence: "[Working agreements honored; psychological safety high; retro actions implemented; velocity stable]" },
    { num: "3", name: "Stakeholders", question: "Are we proactively engaging stakeholders and managing their expectations?", score: "4", evidence: "[Regular engagement cadence; sentiment tracking active; 1 disengaged stakeholder being re-engaged]" },
    { num: "4", name: "Value", question: "Are we continuously focused on delivering value, not just outputs?", score: "4", evidence: "[Pipeline dashboard delivering early value; ROI tracking initiated; value metrics in place]" },
    { num: "5", name: "Systems Thinking", question: "Are we considering the broader system and interdependencies?", score: "3", evidence: "[Cross-project dependencies mapped; some organizational impacts not fully assessed yet]" },
    { num: "6", name: "Leadership", question: "Is leadership demonstrated at all levels, not just by the PM?", score: "4", evidence: "[Tech Lead taking ownership of architecture decisions; team members mentoring juniors]" },
    { num: "7", name: "Tailoring", question: "Have we tailored our approach to fit the project context?", score: "5", evidence: "[8 tailoring decisions documented; outcomes tracked; approach adapted based on evidence]" },
    { num: "8", name: "Quality", question: "Is quality built into processes and deliverables, not just inspected at the end?", score: "4", evidence: "[DoD enforced; code reviews 100%; UAT per sprint; 0 defects escaped to production]" },
    { num: "9", name: "Complexity", question: "Are we navigating complexity effectively with appropriate responses?", score: "3", evidence: "[Complexity drivers identified; some responses reactive rather than proactive]" },
    { num: "10", name: "Risk", question: "Are we optimizing risk responses and managing uncertainty proactively?", score: "4", evidence: "[14 active risks managed; weekly risk reviews; contingency reserves adequate]" },
    { num: "11", name: "Adaptability &amp; Resilience", question: "Can the project adapt to change and recover from setbacks?", score: "4", evidence: "[Hybrid approach allows flexibility; team adapted to vendor delay with mock API strategy]" },
    { num: "12", name: "Change", question: "Are we enabling change to achieve the envisioned future state?", score: "3", evidence: "[Change management plan exists but champion network activation just starting]" },
  ];

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⭐ 12 PRINCIPLES MASTER CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; ⭐ All-Star</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Score each principle 1–5, track evidence, and identify improvement actions.</strong> This is the single-page “am I living the principles?” check. Use monthly for self-assessment or quarterly for PMO/audit evidence.<br /><br /><strong style={{ fontStyle: "italic" }}>⭐ ALL-STAR PAGE:</strong> The single most important principles alignment tool in the pack.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Assessment Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Assessed By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Overall Score</td><td style={S.tdAlt}><span style={S.badge("#DDD6FE", "#5B21B6")}>47 / 60 (78%)</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderChecklist = () => (
    <div ref={checklistRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ PRINCIPLES ASSESSMENT</td></tr></tbody></table>
      <CopyButton targetRef={checklistRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "12%" }}>Principle</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Key Question</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "6%", textAlign: "center" as const }}>Score</th>
          {layout === "full" && <th style={{ ...S.thPrimary, backgroundColor: accent }}>Evidence</th>}
        </tr></thead>
        <tbody>
          {principles.map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const scoreNum = parseInt(p.score);
            const scoreBg = scoreNum >= 4 ? C.badgeGreenBg : scoreNum >= 3 ? C.badgeAmberBg : C.badgeRedBg;
            const scoreFg = scoreNum >= 4 ? C.badgeGreenFg : scoreNum >= 3 ? C.badgeAmberFg : C.badgeRedFg;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{p.num}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{p.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{p.question}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(scoreBg, scoreFg)}>{p.score}/5</span></td>
              {layout === "full" && <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{p.evidence}</td>}
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Scoring: 5 = Exemplary &nbsp;|&nbsp; 4 = Strong &nbsp;|&nbsp; 3 = Adequate &nbsp;|&nbsp; 2 = Needs Work &nbsp;|&nbsp; 1 = Not Addressed</p>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 SCORE SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Score</td><td style={S.td0}>[47] / 60 — <span style={S.badge("#DDD6FE", "#5B21B6")}>78% — Strong</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Strongest Principles</td><td style={S.tdAlt}>[Team (5/5), Tailoring (5/5)] — Exemplary performance</td></tr>
        <tr><td style={S.tdLabel}>Weakest Principles</td><td style={S.td0}>[Systems Thinking (3/5), Complexity (3/5), Change (3/5)] — Need focused improvement</td></tr>
        <tr><td style={S.tdLabelAlt}>Trend vs Last Assessment</td><td style={S.tdAlt}>[+3 points vs last month] — Improving ↗</td></tr>
        <tr><td style={S.tdLabel}>Target Score</td><td style={S.td0}>[52/60 (87%)] — Target for next quarterly review</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ IMPROVEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "10%" }}>Principle</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "8%" }}>Due</th></tr></thead>
        <tbody>
          {[
            { act: "[Map organizational dependencies and assess downstream impacts of project decisions]", prin: "Systems", owner: "[PM]", due: "[Week 8]" },
            { act: "[Develop complexity response playbook with proactive triggers]", prin: "Complexity", owner: "[PM]", due: "[Week 9]" },
            { act: "[Activate champion network and formalize change management communications]", prin: "Change", owner: "[PM + BA]", due: "[Week 8]" },
            { act: "[Schedule systems thinking workshop with cross-functional stakeholders]", prin: "Systems", owner: "[PM]", due: "[Week 10]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.prin}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.due}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#F5F3FF", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Principles Master Checklist • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderSummary()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">⭐ All-Star</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Compass size={20} className="text-violet-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">12 Principles Master Checklist</h2><p className="text-xs font-medium text-violet-600">⭐ All-Star • Monthly Self-Assessment</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Score each PMBOK 7 principle 1–5, track evidence, and identify improvement actions.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PrinciplesMasterChecklistPage() {
  return (<ThemeProvider><PrinciplesMasterChecklistContent /></ThemeProvider>);
}
