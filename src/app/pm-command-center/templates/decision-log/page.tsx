"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Decisions + rationale + impact", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decision register only", icon: AlignJustify },
];

function DecisionLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x2696;&#xFE0F; DECISION LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Decision Log records all significant project decisions, including the rationale, alternatives considered, decision-maker, and downstream impact.</strong> It serves as an audit trail and prevents revisiting closed decisions.<br /><br />
          Log decisions <strong style={{ fontStyle: "italic" }}>as they occur throughout the project lifecycle</strong>. Aligns with PMBOK Integration Management &#x2014; Monitoring &amp; Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Decision Authority</td><td style={S.tdAlt}>[PM / CCB / Steering Committee]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const decisions = [
    { id: "D-001", date: "[MM/DD]", dec: "[e.g., Approved CR-003 &#x2014; $25K security audit added to scope and budget]", cat: "Change", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, by: "[CCB]", rationale: "[Security compliance requirement; regulatory deadline Q4]", alternatives: "[Defer to Phase 2; reduce scope to partial audit]", impact: "[+$25K budget; +5 days schedule; security compliance achieved]", status: "Final", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "D-002", date: "[MM/DD]", dec: "[e.g., Tightened change control &#x2014; all CRs require written impact analysis]", cat: "Process", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, by: "[PM/Sponsor]", rationale: "[3 CRs in one week; scope creep risk elevated to Critical]", alternatives: "[Maintain current process; add verbal pre-screening only]", impact: "[+1-2 days per CR; better scope control; reduced scope creep risk]", status: "Final", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "D-003", date: "[MM/DD]", dec: "[e.g., Selected Vendor B for data migration services]", cat: "Vendor", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, by: "[PM + Procurement]", rationale: "[Best value score: cost 85/100, capability 92/100, references 88/100]", alternatives: "[Vendor A (cheaper, lower capability); Vendor C (highest capability, over budget)]", impact: "[$85K contract; 12-week engagement; meets quality and timeline requirements]", status: "Final", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "D-004", date: "[MM/DD]", dec: "[e.g., Approved extra requirements review session Friday PM]", cat: "Schedule", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, by: "[PM]", rationale: "[M3 milestone 3 days behind; stakeholder availability caused delay]", alternatives: "[Accept 3-day delay; compress testing phase instead]", impact: "[M3 recovery expected; no downstream schedule impact if successful]", status: "Final", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "D-005", date: "[MM/DD]", dec: "[e.g., Deferred reporting module enhancements to Phase 2]", cat: "Scope", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, by: "[Steering Committee]", rationale: "[Timeline protection; core functionality prioritized for go-live]", alternatives: "[Include partial enhancements; extend timeline by 3 weeks]", impact: "[Scope reduced by 4 user stories; schedule protected; Phase 2 backlog updated]", status: "Final", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "[D-###]", date: "", dec: "[Add decision]", cat: "&#x2014;", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, by: "", rationale: "", alternatives: "", impact: "", status: "&#x2014;", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CB; DECISION REGISTER</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thPrimary, width: "6%" }}>Date</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Decision</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Cat</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>By</th>
          <th style={{ ...S.thPrimary, width: "16%" }}>Rationale</th>
          <th style={{ ...S.thPrimary, width: "16%" }}>Alternatives Considered</th>
          <th style={{ ...S.thPrimary, width: "16%" }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {decisions.map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{d.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{d.date}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{d.dec}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(d.cBg, d.cFg), fontSize: "9px" }}>{d.cat}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{d.by}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{d.rationale}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{d.alternatives}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{d.impact}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(d.sBg, d.sFg)}>{d.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPending = () => (
    <div ref={pendingRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x23F3; PENDING DECISIONS</div>
      <CopyButton targetRef={pendingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Decision Needed</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Decision Maker</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Needed By</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>D-006</td><td style={{ ...S.td0, fontSize: "11px" }}>[Approve additional QA resource ($12K) for Sprint 4 testing ramp-up]</td><td style={{ ...S.td0, fontSize: "11px" }}>[Sponsor]</td><td style={{ ...S.td0, fontSize: "11px" }}>[MM/DD]</td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>High</span></td></tr>
          <tr><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>D-007</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Confirm go-live date hold or approve 1-week extension]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Steering Committee]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[MM/DD]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>High</span></td></tr>
          <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>D-008</td><td style={{ ...S.td0, fontSize: "11px" }}>[Authorize Dev Lead workload redistribution &#x2014; may impact velocity 10%]</td><td style={{ ...S.td0, fontSize: "11px" }}>[PM/Sponsor]</td><td style={{ ...S.td0, fontSize: "11px" }}>[MM/DD]</td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Med</span></td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CA; DECISION SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Decisions Logged</td><td style={S.td0}>[5] finalized decisions across [4] categories</td></tr>
          <tr><td style={S.tdLabelAlt}>Pending Decisions</td><td style={S.tdAlt}>[3] decisions awaiting resolution &#x2022; [2] High priority</td></tr>
          <tr><td style={S.tdLabel}>Decision Categories</td><td style={S.td0}>Change [1] &#x2022; Process [1] &#x2022; Vendor [1] &#x2022; Schedule [1] &#x2022; Scope [1]</td></tr>
          <tr><td style={S.tdLabelAlt}>Avg Decision Time</td><td style={S.tdAlt}>[3] business days from request to final decision</td></tr>
          <tr><td style={S.tdLabel}>Next Review</td><td style={S.td0}>[MM/DD/YYYY] &#x2014; [Steering Committee Meeting]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderPending()}{renderSummary()}{renderFooter()}</>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Scale size={11} /> Decisions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Scale size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Decision Log</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management &#x2022; Monitoring &amp; Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Records all significant project decisions with rationale, alternatives, and impact. Full Log includes pending decisions and summary; Quick Log shows the register only.</p>
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

export default function DecisionLogPage() {
  return (<ThemeProvider><DecisionLogContent /></ThemeProvider>);
}
