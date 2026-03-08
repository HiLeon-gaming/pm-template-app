"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RotateCcw, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Retro", desc: "Comprehensive review", icon: LayoutDashboard },
  { id: "quick", label: "Quick Retro", desc: "15-minute version", icon: AlignJustify },
];

function RetroContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const wentWellRef = useRef<HTMLDivElement>(null);
  const improveRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔄 PROJECT RETROSPECTIVE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Learn from Every Project</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "16%" }}>Project / Sprint</td>
            <td style={{ ...S.td0, width: "34%" }}>[Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Facilitator</td>
            <td style={{ ...S.td0, width: "36%" }}>[Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Duration</td>
            <td style={S.tdAlt}>[Start] — [End]</td>
            <td style={S.tdLabelAlt}>Retro Date</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Participants</td>
            <td colSpan={3} style={S.td0}>[List all participants]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Overall Outcome</td>
            <td colSpan={3} style={S.tdAlt}>☐ Exceeded Expectations ☐ Met Expectations ☐ Partially Met ☐ Below Expectations</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderWentWell = () => (
    <div ref={wentWellRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: "#D1FAE5", color: "#059669",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #059669",
              border: `1.5px solid ${C.border}`,
            }}>
              ✅ WHAT WENT WELL
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>+</th>
            <th style={S.thSecondary}>Item</th>
            <th style={{ ...S.thSecondary, width: "20%" }}>Why It Worked</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "[e.g., Team collaboration was exceptional — daily syncs kept everyone aligned]", why: "[Clear communication cadence]" },
            { item: "[e.g., Delivered MVP 3 days ahead of schedule]", why: "[Good scope management]" },
            { item: "[e.g., Zero critical bugs in UAT — testing was thorough]", why: "[Automated test coverage at 85%]" },
            { item: "[Add item]", why: "" },
            { item: "[Add item]", why: "" },
            { item: "[Add item]", why: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, color: "#059669", fontWeight: 700, fontSize: "14px" }}>+</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontStyle: "italic" as const }}>{row.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={wentWellRef} label="Copy Section" />
    </div>
  );

  const renderImprove = () => (
    <div ref={improveRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: "#FEE2E2", color: "#DC2626",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #DC2626",
              border: `1.5px solid ${C.border}`,
            }}>
              ❌ WHAT DIDN&apos;T GO WELL
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>−</th>
            <th style={S.thSecondary}>Issue</th>
            <th style={{ ...S.thSecondary, width: "25%" }}>Root Cause</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "[e.g., Requirements changed 3x mid-sprint — caused rework]", cause: "[Scope not locked before kickoff]" },
            { item: "[e.g., Vendor API was unreliable — 2 days of downtime]", cause: "[No fallback plan / SLA not enforced]" },
            { item: "[e.g., Burnout in final week — team worked weekends]", cause: "[Under-estimated complexity by 40%]" },
            { item: "[Add issue]", cause: "" },
            { item: "[Add issue]", cause: "" },
            { item: "[Add issue]", cause: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, color: "#DC2626", fontWeight: 700, fontSize: "14px" }}>−</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontStyle: "italic" as const }}>{row.cause}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={improveRef} label="Copy Section" />
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 ACTION ITEMS FOR IMPROVEMENT</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Action Item</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due Date</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "[e.g., Implement scope freeze policy — no changes after sprint planning]", owner: "[PM]", due: "[Date]", pri: "High", priBg: "#FEE2E2", priFg: "#DC2626" },
            { action: "[e.g., Add 30% buffer to all complexity estimates]", owner: "[Tech Lead]", due: "[Date]", pri: "High", priBg: "#FEE2E2", priFg: "#DC2626" },
            { action: "[e.g., Set up vendor SLA monitoring & alerting]", owner: "[DevOps]", due: "[Date]", pri: "Med", priBg: "#FEF3C7", priFg: "#D97706" },
            { action: "[e.g., Create 'Definition of Ready' checklist for stories]", owner: "[BA]", due: "[Date]", pri: "Med", priBg: "#FEF3C7", priFg: "#D97706" },
            { action: "[Add action]", owner: "", due: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280" },
            { action: "[Add action]", owner: "", due: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📊 PROJECT METRICS</div>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { metric: "Scope delivered vs. planned", value: "[___]% &nbsp;&nbsp; ☐ All ☐ Most ☐ Partial ☐ Significantly reduced" },
            { metric: "Schedule — days early/late", value: "[___] days &nbsp;&nbsp; ☐ Early ☐ On Time ☐ Late" },
            { metric: "Budget — over/under", value: "$[___] &nbsp;&nbsp; ☐ Under ☐ On Budget ☐ Over" },
            { metric: "Quality — critical bugs post-launch", value: "[___] bugs &nbsp;&nbsp; Target: [___]" },
            { metric: "Team satisfaction (1-10)", value: "[___] / 10" },
            { metric: "Stakeholder satisfaction (1-10)", value: "[___] / 10" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%" }}>{row.metric}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTeamFeedback = () => (
    <div ref={teamRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>💬 TEAM FEEDBACK &amp; KUDOS</div>
      <CopyButton targetRef={teamRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "20%" }}>Team Member</th>
            <th style={S.thPrimary}>Shout-Out / Feedback</th>
          </tr>
        </thead>
        <tbody>
          {[
            { member: "[e.g., Sarah]", feedback: "[Exceptional job leading the design sprint — output was ahead of schedule and high quality]" },
            { member: "[e.g., Marcus]", feedback: "[Solved the critical API issue in hours — unblocked the entire team]" },
            { member: "[Add name]", feedback: "" },
            { member: "[Add name]", feedback: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.member}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.feedback}&nbsp;</td>
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
      {renderTitleBanner()}{renderDateHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderWentWell()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderImprove()}</td>
      </tr></tbody></table>
      {renderActions()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "10px" }}>{renderMetrics()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "10px" }}>{renderTeamFeedback()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderQuickLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderWentWell()}{renderImprove()}{renderActions()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><RotateCcw size={11} /> Retrospective</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><RotateCcw size={20} className="text-pink-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Retrospective</h2>
              <p className="text-xs font-medium text-pink-600">Learn from Every Project &mdash; What Went Well, What Didn&apos;t, What&apos;s Next</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured retrospective with green/red sections, action items, project metrics, and team kudos. Full Retro is comprehensive; Quick Retro is a focused 15-minute version.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Retro Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-200" : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-pink-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "quick" && renderQuickLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProjectRetrospectivePage() {
  return (<ThemeProvider><RetroContent /></ThemeProvider>);
}
