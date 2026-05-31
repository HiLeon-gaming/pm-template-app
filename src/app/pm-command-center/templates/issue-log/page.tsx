"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Issues + escalation + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Issue register only", icon: AlignJustify },
];

function IssueLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const escalationRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> ISSUE LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop  |  PM Command Center  |  PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Issue Log tracks problems that have already occurred and require resolution.</strong> Unlike risks (which are uncertain future events), issues are current problems impacting the project that need immediate attention and resolution.<br /><br />
          Maintain this log throughout <strong style={{ fontStyle: "italic" }}>project execution and monitoring</strong>. Aligns with PMBOK Integration Management — Monitoring & Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Issue Owner</td><td style={S.tdAlt}>[PM]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const issues = [
    { id: "I-001", desc: "[e.g., Test environment intermittent connectivity causing QA delays]", cat: "Technical", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, impact: "[2 days QA delay; blocking Sprint 3 testing]", owner: "[IT Ops]", raised: "[MM/DD]", target: "[MM/DD]", status: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
    { id: "I-002", desc: "[e.g., M3 milestone delayed 3 days due to stakeholder availability]", cat: "Schedule", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, impact: "[Requirements baseline delayed; downstream schedule impact TBD]", owner: "[PM]", raised: "[MM/DD]", target: "[MM/DD]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
    { id: "I-003", desc: "[e.g., Vendor API documentation incomplete — integration team blocked]", cat: "Vendor", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, impact: "[Integration work paused; 1 developer idle]", owner: "[PM]", raised: "[MM/DD]", target: "[MM/DD]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
    { id: "I-004", desc: "[e.g., Data quality issues in legacy system migration source]", cat: "Data", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, impact: "[Additional data cleansing effort needed; est. 3 days]", owner: "[DBA]", raised: "[MM/DD]", target: "[MM/DD]", status: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
    { id: "I-005", desc: "[e.g., Security scan found 2 medium vulnerabilities in Sprint 2 code]", cat: "Quality", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, pri: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, impact: "[Remediation required before UAT; no schedule impact]", owner: "[Dev Lead]", raised: "[MM/DD]", target: "[MM/DD]", status: "Resolved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "I-006", desc: "[e.g., Budget approval for CR-003 delayed by finance review process]", cat: "Process", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, pri: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, impact: "[Security audit start delayed 1 week]", owner: "[PM]", raised: "[MM/DD]", target: "[MM/DD]", status: "Closed", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "[I-###]", desc: "[Add issue]", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, pri: "", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, impact: "", owner: "", raised: "", target: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 ISSUE REGISTER</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Issue Description</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Cat</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pri</th>
          <th style={{ ...S.thPrimary, width: "16%" }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Raised</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Target</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {issues.map((is, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{is.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{is.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(is.cBg, is.cFg), fontSize: "9px" }}>{is.cat}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(is.pBg, is.pFg)}>{is.pri}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{is.impact}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{is.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{is.raised}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{is.target}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(is.sBg, is.sFg)}>{is.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Priority: <strong>High</strong> = Blocking progress • <strong>Med</strong> = Impacting but workaround exists • <strong>Low</strong> = Minor impact, can be deferred</p>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escalationRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>⚠️ ESCALATED ISSUES</td></tr></tbody></table>
      <CopyButton targetRef={escalationRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Issue</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Escalated To</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Escalated On</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Resolution</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>I-001</td><td style={{ ...S.td0, fontSize: "11px" }}>[Test environment connectivity — blocking QA team]</td><td style={{ ...S.td0, fontSize: "11px" }}>[IT Director]</td><td style={{ ...S.td0, fontSize: "11px" }}>[MM/DD]</td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Pending</span></td></tr>
          <tr><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>I-003</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Vendor API documentation gaps — integration blocked]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Vendor Account Mgr]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[MM/DD]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Pending</span></td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 ISSUE SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Issues Logged</td><td style={S.td0}>[6] issues across [5] categories</td></tr>
          <tr><td style={S.tdLabelAlt}>Open Issues</td><td style={S.tdAlt}>[2] open • [2] in progress • [1] resolved • [1] closed</td></tr>
          <tr><td style={S.tdLabel}>Critical / Blocking</td><td style={S.td0}>[2] high-priority issues currently blocking progress</td></tr>
          <tr><td style={S.tdLabelAlt}>Escalated Issues</td><td style={S.tdAlt}>[2] issues escalated to management — awaiting resolution</td></tr>
          <tr><td style={S.tdLabel}>Avg Resolution Time</td><td style={S.td0}>[5] business days (target: [3] days for High, [5] days for Med)</td></tr>
          <tr><td style={S.tdLabelAlt}>Next Review</td><td style={S.tdAlt}>[MM/DD/YYYY] — [Weekly status meeting]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderEscalation()}{renderSummary()}{renderFooter()}</>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><AlertCircle size={11} /> Issues</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><AlertCircle size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Issue Log</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Monitoring & Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Tracks current problems requiring resolution with priority, impact, and escalation tracking. Full Log includes escalation and summary; Quick Log shows the register only.</p>
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

export default function IssueLogPage() {
  return (<ThemeProvider><IssueLogContent /></ThemeProvider>);
}
