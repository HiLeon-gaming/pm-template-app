"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Lightbulb, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Register", desc: "Lessons + analysis + recommendations", icon: LayoutDashboard },
  { id: "compact", label: "Quick Register", desc: "Lesson log only", icon: AlignJustify },
];

function LessonsLearnedRegisterContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>💡 LESSONS LEARNED REGISTER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Lessons Learned Register captures knowledge gained during the project that can improve future project performance.</strong> It documents what went well, what could be improved, and what should be avoided, with actionable recommendations for the organization.<br /><br />
          Collect lessons <strong style={{ fontStyle: "italic" }}>throughout the project lifecycle, not just at closure</strong>. Conduct formal lessons learned sessions at phase gates and project close. Aligns with PMBOK Integration Management — Manage Project Knowledge.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Session Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name]</td></tr>
          <tr><td style={S.tdLabel}>Phase</td><td style={S.td0}>[e.g., Project Closure / Phase Gate 3]</td><td style={S.tdLabel}>Participants</td><td style={S.td0}>[PM, BA, Dev Lead, QA Lead, Sponsor, Business Owner]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const lessons = [
    { id: "LL-001", phase: "Initiating", cat: "Stakeholder", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: " Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, desc: "[Early stakeholder mapping identified 3 previously unknown influencers who became project champions]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rec: "[Conduct stakeholder analysis workshop in first 2 weeks of all future projects]" },
    { id: "LL-002", phase: "Planning", cat: "Scope", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, type: " Improve", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, desc: "[Initial requirements elicitation was insufficient — 6 CRs submitted during execution, adding 17% to schedule]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rec: "[Add scope freeze milestone; invest 2x time in requirements workshops; require BA sign-off before baseline]" },
    { id: "LL-003", phase: "Planning", cat: "Resource", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: " Avoid", tBg: C.badgeRedBg, tFg: C.badgeRedFg, desc: "[Dev Lead assigned at 110% utilization — burnout risk materialized, velocity dropped 20% in Sprint 5]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rec: "[Cap resource allocation at 90%; require cross-training plan for all critical roles; no single points of failure]" },
    { id: "LL-004", phase: "Executing", cat: "Vendor", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, type: " Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, desc: "[Weekly vendor checkpoint meetings kept integration on track despite documentation gaps]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, rec: "[Include weekly vendor progress reports as contract requirement; assign PM liaison for all vendor engagements]" },
    { id: "LL-005", phase: "Executing", cat: "Quality", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, type: " Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, desc: "[Automated testing pipeline caught 85% of defects before QA, reducing QA cycle by 30%]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, rec: "[Mandate automated testing framework setup in Sprint 0 for all development projects]" },
    { id: "LL-006", phase: "Executing", cat: "Technical", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: " Avoid", tBg: C.badgeRedBg, tFg: C.badgeRedFg, desc: "[Test environment instability caused 2-week cumulative QA delay — shared environment with other projects]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rec: "[Provision dedicated test environment in project charter; include infra readiness as Phase Gate 1 criteria]" },
    { id: "LL-007", phase: "M&C", cat: "Change Mgmt", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, type: " Improve", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, desc: "[Change control process was too informal initially — 3 CRs in one week before enforcement tightened]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, rec: "[Implement formal change control from Day 1; require written impact analysis for all CRs before CCB review]" },
    { id: "LL-008", phase: "Closing", cat: "Adoption", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, type: " Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, desc: "[User champion network achieved 95% adoption in 30 days vs 80% target — champions drove peer-to-peer training]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rec: "[Establish champion network during planning phase for all user-facing projects; budget for champion incentives]" },
    { id: "[LL-###]", phase: "", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, desc: "[Add lesson]", impact: "", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, rec: "" },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 LESSON LOG</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Phase</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Cat</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Recommendation</th>
        </tr></thead>
        <tbody>
          {lessons.map((l, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{l.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{l.phase}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(l.cBg, l.cFg), fontSize: "9px" }}>{l.cat}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(l.tBg, l.tFg), fontSize: "9px" }}>{l.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{l.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(l.iBg, l.iFg)}>{l.impact}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{l.rec}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📊 LESSON ANALYSIS BY CATEGORY</td></tr></tbody></table>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Category</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Total</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}> Wins</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}> Improve</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}> Avoid</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Stakeholder / Adoption", total: "2", wins: "2", improve: "0", avoid: "0" },
            { cat: "Scope / Change Mgmt", total: "2", wins: "0", improve: "2", avoid: "0" },
            { cat: "Resource / Technical", total: "2", wins: "0", improve: "0", avoid: "2" },
            { cat: "Vendor / Quality", total: "2", wins: "2", improve: "0", avoid: "0" },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{a.cat}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{a.total}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{a.wins}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{a.improve}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{a.avoid}</td>
            </tr>);
          })}
          <tr><td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white }}>TOTAL</td><td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>8</td><td style={{ ...S.td0, fontWeight: 700, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>4</td><td style={{ ...S.td0, fontWeight: 700, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>2</td><td style={{ ...S.td0, fontWeight: 700, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>2</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderRec = () => (
    <div ref={recRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 TOP ORGANIZATIONAL RECOMMENDATIONS</div>
      <CopyButton targetRef={recRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Recommendation</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { rec: "[Invest more time in requirements elicitation — add scope freeze milestone to project methodology]", owner: "[PMO]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { rec: "[Cap resource allocation at 90% and require cross-training plan for all critical roles]", owner: "[Resource Mgr]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { rec: "[Provision dedicated test environments — add infra readiness to Phase Gate 1 criteria]", owner: "[IT Ops]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { rec: "[Establish user champion network during planning phase for all user-facing projects]", owner: "[Change Mgmt]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { rec: "[Mandate automated testing framework in Sprint 0 for all development projects]", owner: "[QA Practice]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.rec}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Recommendations to be submitted to PMO for incorporation into organizational project methodology and lessons learned library.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderAnalysis()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderRec()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Lightbulb size={11} /> Lessons</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Lightbulb size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Lessons Learned Register</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Manage Project Knowledge</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Captures project knowledge with wins, improvements, and avoidance items. Full Register includes analysis and recommendations; Quick Register shows the lesson log only.</p>
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
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function LessonsLearnedRegisterPage() {
  return (<ThemeProvider><LessonsLearnedRegisterContent /></ThemeProvider>);
}
