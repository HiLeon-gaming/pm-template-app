"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, GitPullRequest, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Changes + impact + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Change register only", icon: AlignJustify },
];

function ChangeControlLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> CHANGE CONTROL LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop | PM Command Center | PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Change Control Log tracks all change requests through the formal change management process, from submission through CCB review to implementation or rejection.</strong> It ensures all scope, schedule, and budget changes are formally evaluated and approved before implementation.<br /><br />
          Maintain this log as part of <strong style={{ fontStyle: "italic" }}>Integrated Change Control throughout execution</strong>. Aligns with PMBOK Integration Management — Perform Integrated Change Control.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>CCB Chair</td><td style={S.tdAlt}>[Name, Title]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const changes = [
    { id: "CR-001", date: "[MM/DD]", title: "[e.g., Add user role management module]", type: "Scope", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, requestor: "[Business Owner]", schedule: "+2 weeks", budget: "+$35,000", quality: "None", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ccbDate: "[MM/DD]" },
    { id: "CR-002", date: "[MM/DD]", title: "[e.g., Migrate to cloud-native database instead of on-prem]", type: "Technical", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, requestor: "[Architect]", schedule: "+1 week", budget: "+$18,000", quality: "Improved uptime", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ccbDate: "[MM/DD]" },
    { id: "CR-003", date: "[MM/DD]", title: "[e.g., Add $25K security audit to scope]", type: "Scope", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, requestor: "[CISO]", schedule: "+5 days", budget: "+$25,000", quality: "Security compliance", status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ccbDate: "[MM/DD]" },
    { id: "CR-004", date: "[MM/DD]", title: "[e.g., Add advanced analytics dashboard to Phase 1]", type: "Scope", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, requestor: "[VP Sales]", schedule: "+3 weeks", budget: "+$42,000", quality: "None", status: "Rejected", sBg: C.badgeRedBg, sFg: C.badgeRedFg, ccbDate: "[MM/DD]" },
    { id: "CR-005", date: "[MM/DD]", title: "[e.g., Extend UAT period from 2 weeks to 3 weeks]", type: "Schedule", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, requestor: "[QA Lead]", schedule: "+1 week", budget: "+$8,000", quality: "Improved coverage", status: "Under Review", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ccbDate: "[Pending]" },
    { id: "CR-006", date: "[MM/DD]", title: "[e.g., Replace vendor API with in-house microservice]", type: "Technical", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, requestor: "[Dev Lead]", schedule: "+2 weeks", budget: "-$5,000", quality: "Better control", status: "Under Review", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ccbDate: "[Pending]" },
    { id: "[CR-###]", date: "", title: "[Add change request]", type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, requestor: "", schedule: "", budget: "", quality: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, ccbDate: "" },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> CHANGE REQUEST REGISTER</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thPrimary, width: "5%" }}>Date</th>
          <th style={S.thPrimary}>Change Request</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Requestor</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Schedule</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Budget</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Quality</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "6%" }}>CCB</th>
        </tr></thead>
        <tbody>
          {changes.map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{c.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{c.date}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{c.title}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(c.tBg, c.tFg), fontSize: "9px" }}>{c.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{c.requestor}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{c.schedule}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{c.budget}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{c.quality}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(c.sBg, c.sFg)}>{c.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{c.ccbDate}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderImpact = () => (
    <div ref={impactRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> CUMULATIVE CHANGE IMPACT</td></tr></tbody></table>
      <CopyButton targetRef={impactRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Baseline Dimension</th>
          <th style={{ ...S.thSecondary, width: "18%", textAlign: "right" as const }}>Original Baseline</th>
          <th style={{ ...S.thSecondary, width: "18%", textAlign: "right" as const }}>Approved Changes</th>
          <th style={{ ...S.thSecondary, width: "18%", textAlign: "right" as const }}>Current Baseline</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Var %</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Budget", orig: "$[612,750]", changes: "+$[78,000]", current: "$[690,750]", pct: "+12.7%", color: "#DC2626" },
            { dim: "Schedule (weeks)", orig: "[26] weeks", changes: "+[4.5] weeks", current: "[30.5] weeks", pct: "+17.3%", color: "#DC2626" },
            { dim: "Scope (user stories)", orig: "[48] stories", changes: "+[6] stories", current: "[54] stories", pct: "+12.5%", color: "#D97706" },
            { dim: "Team Size", orig: "[8] FTEs", changes: "+[1] FTE", current: "[9] FTEs", pct: "+12.5%", color: "#D97706" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.dim}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontSize: "11px" }}>{r.orig}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontSize: "11px", fontWeight: 600 }}>{r.changes}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontSize: "11px", fontWeight: 800 }}>{r.current}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: r.color }}>{r.pct}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Cumulative impact includes only <strong>approved</strong> changes. Pending CRs (CR-005, CR-006) would add +[1 week] schedule and +[3,000] budget if approved.</p>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> CHANGE CONTROL SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total CRs Submitted</td><td style={S.td0}>[6] change requests logged</td></tr>
          <tr><td style={S.tdLabelAlt}>Approved</td><td style={S.tdAlt}>[3] approved • cumulative impact: +$78K budget, +4.5 weeks schedule</td></tr>
          <tr><td style={S.tdLabel}>Rejected</td><td style={S.td0}>[1] rejected (CR-004: advanced analytics deferred to Phase 2)</td></tr>
          <tr><td style={S.tdLabelAlt}>Under Review</td><td style={S.tdAlt}>[2] pending CCB review — next CCB meeting [MM/DD]</td></tr>
          <tr><td style={S.tdLabel}>Avg Processing Time</td><td style={S.td0}>[4] business days from submission to CCB decision</td></tr>
          <tr><td style={S.tdLabelAlt}>Change Control Health</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>🟡 Amber</span> — 3 CRs this week exceeds 2/month threshold; enforcement tightened</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderImpact()}{renderSummary()}{renderFooter()}</>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><GitPullRequest size={11} /> Changes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><GitPullRequest size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Change Control Log</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Integrated Change Control</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Tracks all change requests through formal CCB review with cumulative impact analysis. Full Log includes impact analysis and summary; Quick Log shows the register only.</p>
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

export default function ChangeControlLogPage() {
  return (<ThemeProvider><ChangeControlLogContent /></ThemeProvider>);
}
