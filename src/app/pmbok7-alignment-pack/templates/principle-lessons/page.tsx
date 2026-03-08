"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RefreshCw, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Lessons", desc: "All principles + insights", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Lessons table only", icon: AlignJustify },
];

function PrincipleLessonsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📖 PRINCIPLE LESSONS LEARNED</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Improvement &amp; Proof</td></tr>
      <tr><td style={descStyle}>Capture lessons learned through the lens of the 12 PMBOK 7 Principles. This structured approach ensures lessons are actionable and transferable to future projects, not just filed away.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Review Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitated By</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Phase/Period</td><td style={S.tdAlt}>[Phase 1 Closure / Sprint 1-6]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLessons = () => (
    <div ref={lessonsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 LESSONS BY PRINCIPLE</div>
      <CopyButton targetRef={lessonsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "15%" }}>Principle</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>What We Learned</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "25%" }}>Recommendation for Future Projects</th>
        </tr></thead>
        <tbody>
          {[
            { p: "Stewardship", l: "[Early stakeholder alignment on budget saved rework; transparent reporting built sponsor trust]", r: "[Establish budget transparency dashboard from Week 1; schedule sponsor alignment sessions bi-weekly]" },
            { p: "Team", l: "[Investing in working agreements and psychological safety in Sprint 1 paid compound returns in velocity and quality]", r: "[Prioritize team culture building in first 2 weeks of any project; don't skip this for 'efficiency']" },
            { p: "Stakeholders", l: "[Regional resistance was detected late; earlier champion activation would have prevented 2-week delay]", r: "[Map resistance risks in Week 1; activate champions before changes are announced, not after]" },
            { p: "Value", l: "[Early value delivery (pipeline dashboard in Sprint 3) built stakeholder confidence and momentum]", r: "[Always plan for a 'quick win' deliverable in first 3-4 sprints to build credibility]" },
            { p: "Systems Thinking", l: "[Cross-project dependency with ERP team caused unexpected delays; wasn't on our radar until Sprint 4]", r: "[Run dependency mapping workshop in Week 1; include adjacent project PMs in kickoff]" },
            { p: "Leadership", l: "[Rotating meeting facilitation developed leadership skills and increased team ownership]", r: "[Build leadership development into project team roles from the start]" },
            { p: "Tailoring", l: "[Hybrid approach was right choice; documented tailoring decisions helped during PMO audit]", r: "[Always document tailoring rationale, not just decisions; PMO values the 'why']" },
            { p: "Quality", l: "[Test automation investment in Sprint 2 reduced defect escape rate by 40% by Sprint 4]", r: "[Front-load quality infrastructure; the ROI compounds over time]" },
            { p: "Complexity", l: "[Over-engineered some processes for low-complexity areas; wasted team capacity]", r: "[Use complexity assessment to right-size processes; simpler is better when complexity is low]" },
            { p: "Risk", l: "[Focused on threats, missed opportunities; could have exploited vendor relationship for additional features]", r: "[Include 'opportunities' in risk register; assign owners for positive risks too]" },
            { p: "Adaptability", l: "[Mock API workaround when vendor delayed showed team resilience; pair programming enabled bus factor coverage]", r: "[Build contingency skills from Day 1; cross-training is insurance, not overhead]" },
            { p: "Change", l: "[Pipeline dashboard adoption was 85% because we involved users in design; future features need same approach]", r: "[Co-design with users for every major feature; adoption starts during development, not at deployment]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.p}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.l}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.r}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderInsights = () => (
    <div ref={insightsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>💡 TOP INSIGHTS</div>
      <CopyButton targetRef={insightsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Most Impactful Lesson</td><td style={S.td0}>[Team culture investment (Principle 2) had the highest ROI — it enabled improvements across every other principle]</td></tr>
        <tr><td style={S.tdLabelAlt}>Biggest Miss</td><td style={S.tdAlt}>[Systems thinking (Principle 5) — dependency mapping should happen in Week 1, not discovered in Sprint 4]</td></tr>
        <tr><td style={S.tdLabel}>Pattern Observed</td><td style={S.td0}>[Front-loading investments (team culture, quality infrastructure, stakeholder mapping) consistently produced better outcomes than reactive approaches]</td></tr>
        <tr><td style={S.tdLabelAlt}>Share With PMO</td><td style={S.tdAlt}>[Tailoring documentation, team culture playbook, early value delivery approach — all reusable across projects]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚡ KNOWLEDGE TRANSFER ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "10%" }}>Target</th></tr></thead>
        <tbody>
          {[
            { act: "[Submit lessons learned to PMO knowledge base with principle tags for searchability]", owner: "[PM]", target: "[Week 12]" },
            { act: "[Present top 5 lessons at PM Community of Practice meeting]", owner: "[PM]", target: "[Next CoP]" },
            { act: "[Create reusable “Team Culture Playbook” based on Principle 2 lessons for future projects]", owner: "[PM]", target: "[Post-project]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.target}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#ECFDF5", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Section G: Improvement &amp; Proof • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderLessons()}{renderInsights()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderLessons()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><RefreshCw size={11} /> Lessons</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><RefreshCw size={20} className="text-emerald-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Principle Lessons Learned</h2><p className="text-xs font-medium text-emerald-600">Section G: Improvement &amp; Proof</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture structured lessons through the lens of the 12 PMBOK 7 Principles for actionable knowledge transfer.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PrincipleLessonsPage() {
  return (<ThemeProvider><PrincipleLessonsContent /></ThemeProvider>);
}
