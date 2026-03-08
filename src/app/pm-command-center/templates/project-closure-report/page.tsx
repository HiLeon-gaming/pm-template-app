"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckCircle2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Report", desc: "All closure sections + signoff", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Summary + performance only", icon: AlignJustify },
];

function ProjectClosureReportContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLDivElement>(null);
  const deliverableRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);
  const signoffRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x2705; PROJECT CLOSURE REPORT</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Closure Report formally documents the completion of all project work, confirms deliverable acceptance, and transitions the project to operations.</strong> It captures final performance metrics, open items, and lessons learned for organizational knowledge.<br /><br />
          Complete this report <strong style={{ fontStyle: "italic" }}>after all deliverables are accepted and before the project team is released</strong>. Aligns with PMBOK Integration Management &#x2014; Close Project or Phase.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Project ID</td><td style={{ ...S.td0, width: "32%" }}>[PRJ-YYYY-###]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Sponsor</td><td style={S.tdAlt}>[Name, Title]</td></tr>
          <tr><td style={S.tdLabel}>Closure Date</td><td style={S.td0}>[MM/DD/YYYY]</td><td style={S.tdLabel}>Closure Type</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Completed Successfully</span></td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4DD; EXECUTIVE SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "22%" }}>Project Objective</td><td style={S.td0}>[e.g., Implement an enterprise CRM system to improve customer retention by 15% and reduce support ticket resolution time by 25%]</td></tr>
          <tr><td style={S.tdLabelAlt}>Final Status</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>&#x2705; Completed</span> &#x2014; All deliverables accepted, go-live successful, warranty period complete</td></tr>
          <tr><td style={S.tdLabel}>Duration</td><td style={S.td0}>Planned: [26 weeks] &#x2022; Actual: [30.5 weeks] &#x2022; Variance: [+4.5 weeks (+17%)]</td></tr>
          <tr><td style={S.tdLabelAlt}>Budget</td><td style={S.tdAlt}>Planned: $[612,750] &#x2022; Actual: $[595,000] &#x2022; Variance: [-$17,750 (-2.9%)] &#x2022; <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Under Budget</span></td></tr>
          <tr><td style={S.tdLabel}>Scope</td><td style={S.td0}>[54] user stories delivered of [54] planned (100%) &#x2022; [6] change requests approved during execution</td></tr>
          <tr><td style={S.tdLabelAlt}>Key Achievement</td><td style={S.tdAlt}>[e.g., System launched on revised date with 100% planned functionality; 95% user adoption within 30 days; zero critical defects in production]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderPerformance = () => (
    <div ref={performanceRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4CA; FINAL PERFORMANCE METRICS</div>
      <CopyButton targetRef={performanceRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Metric</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Baseline</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Variance</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Commentary</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Schedule (weeks)", base: "[26]", actual: "[30.5]", variance: "+17%", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, comment: "[6 approved CRs added 4.5 weeks; core work on schedule]" },
            { metric: "Budget ($)", base: "$[612,750]", actual: "$[595,000]", variance: "-2.9%", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Under budget despite scope additions; CPI 1.13 at close]" },
            { metric: "Final CPI", base: "[1.00]", actual: "[1.03]", variance: "+3%", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Consistently under budget throughout project]" },
            { metric: "Final SPI", base: "[1.00]", actual: "[0.85]", variance: "-15%", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, comment: "[Behind due to approved scope additions; re-baselined twice]" },
            { metric: "Scope Delivery", base: "[48] stories", actual: "[54] stories", variance: "+12.5%", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[All approved CRs delivered; no deferred items]" },
            { metric: "Quality (Defects)", base: "&#x2264;[2]/KLOC", actual: "[1.2]/KLOC", variance: "-40%", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Well within quality targets; 0 critical defects in prod]" },
            { metric: "User Adoption", base: "[80%] @ 30d", actual: "[95%] @ 30d", variance: "+19%", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, comment: "[Champion network and training program highly effective]" },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{m.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{m.base}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 700 }}>{m.actual}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{m.variance}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(m.sBg, m.sFg)}>&#x2022;</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.comment}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDeliverable = () => (
    <div ref={deliverableRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4E6; DELIVERABLE ACCEPTANCE</div>
      <CopyButton targetRef={deliverableRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Deliverable</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Accepted?</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Accepted By</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { del: "[e.g., CRM Application &#x2014; all modules deployed to production]", acc: "&#x2705; Yes", by: "[Sponsor]", date: "[MM/DD]" },
            { del: "[e.g., Data Migration &#x2014; legacy data verified and reconciled]", acc: "&#x2705; Yes", by: "[Data Owner]", date: "[MM/DD]" },
            { del: "[e.g., User Training &#x2014; 150 users certified across 3 departments]", acc: "&#x2705; Yes", by: "[Training Mgr]", date: "[MM/DD]" },
            { del: "[e.g., Technical Documentation &#x2014; admin guide, API docs, runbooks]", acc: "&#x2705; Yes", by: "[IT Ops]", date: "[MM/DD]" },
            { del: "[e.g., Warranty Period &#x2014; 30-day support period completed]", acc: "&#x2705; Yes", by: "[Sponsor]", date: "[MM/DD]" },
            { del: "[Add deliverable]", acc: "", by: "", date: "" },
          ].map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.del}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{d.acc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.by}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.date}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOpen = () => (
    <div ref={openRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4CC; OPEN ITEMS &amp; TRANSITION</div>
      <CopyButton targetRef={openRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Item</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Transferred To</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Due Date</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[e.g., Phase 2 backlog &#x2014; 4 deferred user stories + analytics dashboard]", type: "Backlog", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, to: "[Product Owner]", due: "[Q3 planning]" },
            { item: "[e.g., Performance tuning &#x2014; optimize report generation query (non-critical)]", type: "Defect", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, to: "[Support Team]", due: "[MM/DD]" },
            { item: "[e.g., Vendor contract renewal &#x2014; annual license review due Q4]", type: "Contract", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, to: "[Procurement]", due: "[MM/DD]" },
            { item: "[Add open item]", type: "&#x2014;", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, to: "", due: "" },
          ].map((o, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{o.item}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(o.tBg, o.tFg)}>{o.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{o.to}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{o.due}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderLessons = () => (
    <div ref={lessonsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4A1; KEY LESSONS LEARNED (TOP 5)</div>
      <CopyButton targetRef={lessonsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thSecondary}>Lesson</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Recommendation</th>
        </tr></thead>
        <tbody>
          {[
            { type: "&#x1F7E2; Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "[User champion network drove 95% adoption vs 80% target]", rec: "[Establish champion network on all future projects during planning phase]" },
            { type: "&#x1F7E2; Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "[Proactive vendor management kept integration on track]", rec: "[Include weekly vendor checkpoints in all vendor-dependent projects]" },
            { type: "&#x1F7E1; Improve", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lesson: "[6 change requests added 17% to schedule &#x2014; initial scope definition insufficient]", rec: "[Invest more time in requirements elicitation; add scope freeze milestone]" },
            { type: "&#x1F7E1; Improve", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lesson: "[Dev Lead burnout risk materialized &#x2014; single point of failure]", rec: "[Ensure cross-training and no resource exceeds 90% allocation]" },
            { type: "&#x1F534; Avoid", tBg: C.badgeRedBg, tFg: C.badgeRedFg, lesson: "[Test environment instability caused 2-week cumulative QA delay]", rec: "[Provision dedicated test environment before development starts; include in project charter]" },
          ].map((l, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(l.tBg, l.tFg)}>{l.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{l.lesson}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{l.rec}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Full lessons learned are documented in the Lessons Learned Register (separate template).</p>
    </div>
  );

  const renderSignoff = () => (
    <div ref={signoffRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x270D;&#xFE0F; FORMAL CLOSURE SIGNOFF</div>
      <CopyButton targetRef={signoffRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Role</th>
          <th style={S.thSecondary}>Name</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Signature</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Date</th>
        </tr></thead>
        <tbody>
          {["Project Sponsor", "Project Manager", "Business Owner", "IT Director", "PMO Director"].map((role, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{role}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[Name]</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>__________________</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>By signing above, the undersigned confirm that all project deliverables have been accepted, all contractual obligations have been fulfilled, and the project is formally closed.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderPerformance()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderDeliverable()}{renderLessons()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderOpen()}{renderSignoff()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderPerformance()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><CheckCircle2 size={11} /> Closing</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><CheckCircle2 size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Closure Report</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management &#x2022; Close Project or Phase</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Formal project completion document with performance metrics, deliverable acceptance, lessons learned, and signoff. Full Report includes all sections; Quick Summary shows summary and performance only.</p>
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

export default function ProjectClosureReportPage() {
  return (<ThemeProvider><ProjectClosureReportContent /></ThemeProvider>);
}
