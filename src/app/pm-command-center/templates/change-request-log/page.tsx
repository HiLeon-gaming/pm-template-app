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
  { id: "full", label: "Full CR Log", desc: "Log + form + impact analysis", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "CR register only", icon: AlignJustify },
];

function ChangeRequestLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔄 CHANGE REQUEST LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop | PM Command Center | PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Change Request Log tracks all proposed changes to the project scope, schedule, cost, or quality baselines.</strong> Each CR goes through a formal evaluation, impact analysis, and CCB decision before implementation.<br /><br />
          Use this template to <strong style={{ fontStyle: "italic" }}>maintain change control discipline</strong> throughout the project. Aligns with PMBOK Integration Management — Monitoring & Controlling Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const crs = [
    { id: "CR-001", title: "[e.g., Add multi-currency support]", type: "Scope", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, requestor: "[Name]", date: "[MM/DD]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "CR-002", title: "[e.g., Extend UAT by 2 weeks]", type: "Schedule", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, requestor: "[Name]", date: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "Pending", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
    { id: "CR-003", title: "[e.g., Add $25K for security audit]", type: "Cost", tBg: C.badgeRedBg, tFg: C.badgeRedFg, requestor: "[Name]", date: "[MM/DD]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, status: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "CR-004", title: "[e.g., Remove mobile app from v1]", type: "Scope", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, requestor: "[Name]", date: "[MM/DD]", pri: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, status: "Rejected", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
    { id: "CR-005", title: "[e.g., Change vendor from X to Y]", type: "Procurement", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, requestor: "[Name]", date: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "Under Review", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
    { id: "[CR-###]", title: "[Add change request]", type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, requestor: "", date: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
  ];

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> CHANGE REQUEST REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>CR ID</th>
          <th style={S.thPrimary}>Change Description</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "9%" }}>Requestor</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Date</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {crs.map((cr, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{cr.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{cr.title}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(cr.tBg, cr.tFg)}>{cr.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{cr.requestor}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{cr.date}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(cr.pBg, cr.pFg)}>{cr.pri}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(cr.sBg, cr.sFg)}>{cr.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderForm = () => (
    <div ref={formRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> CHANGE REQUEST FORM (TEMPLATE)</td></tr></tbody></table>
      <CopyButton targetRef={formRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>CR Number</td><td style={S.td0}>[CR-###]</td></tr>
          <tr><td style={S.tdLabelAlt}>Change Title</td><td style={S.tdAlt}>[Brief descriptive title]</td></tr>
          <tr><td style={S.tdLabel}>Requested By</td><td style={S.td0}>[Name, Role, Date]</td></tr>
          <tr><td style={S.tdLabelAlt}>Change Type</td><td style={S.tdAlt}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Scope</span> <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Schedule</span> <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Cost</span> <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Quality</span> <span style={S.badge(C.badgeGrayBg, C.badgeGrayFg)}>Other</span></td></tr>
          <tr><td style={S.tdLabel}>Description of Change</td><td style={S.td0}>[Detailed description of what is being requested and why]</td></tr>
          <tr><td style={S.tdLabelAlt}>Justification / Business Need</td><td style={S.tdAlt}>[Why is this change needed? What happens if we don’t do it?]</td></tr>
          <tr><td style={S.tdLabel}>Affected Deliverables</td><td style={S.td0}>[List WBS elements, requirements, or documents impacted]</td></tr>
          <tr><td style={S.tdLabelAlt}>Affected Baselines</td><td style={S.tdAlt}>[Scope / Schedule / Cost — check all that apply]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderImpact = () => (
    <div ref={impactRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> IMPACT ANALYSIS</td></tr></tbody></table>
      <CopyButton targetRef={impactRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "20%" }}>Impact Area</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Severity</th>
          <th style={S.thSecondary}>Details</th>
        </tr></thead>
        <tbody>
          {[
            { area: "Schedule Impact", sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, detail: "[e.g., +2 weeks to development phase; critical path affected]" },
            { area: "Cost Impact", sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, detail: "[e.g., +$25K for additional development and testing effort]" },
            { area: "Scope Impact", sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, detail: "[e.g., 3 new requirements added to RTM; WBS updated]" },
            { area: "Quality Impact", sev: "Low", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, detail: "[e.g., Additional test cases required; no quality risk]" },
            { area: "Resource Impact", sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, detail: "[e.g., Need 1 additional developer for 4 weeks]" },
            { area: "Risk Impact", sev: "Low", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, detail: "[e.g., No new risks identified; existing R3 mitigated]" },
          ].map((imp, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{imp.area}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(imp.sBg, imp.sFg)}>{imp.sev}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{imp.detail}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>CCB Member</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Decision</th>
          <th style={S.thSecondary}>Comments</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Sponsor Name]", dec: "Approve", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { name: "[PM Name]", dec: "Approve", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { name: "[Tech Lead]", dec: "Approve w/ Conditions", dBg: C.badgeAmberBg, dFg: C.badgeAmberFg },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{m.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(m.dBg, m.dFg)}>{m.dec}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>&nbsp;</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> CR SUMMARY DASHBOARD</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "20%" }}>Status</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Count</th>
          <th style={{ ...S.thSecondary, width: "16%", textAlign: "right" as const }}>Cost Impact</th>
          <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Schedule Impact</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          <tr><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Approved</span></td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[2]</td><td style={{ ...S.td0, textAlign: "right" as const, fontWeight: 600 }}>+$[amount]</td><td style={{ ...S.td0, textAlign: "center" as const }}>+[X] weeks</td><td style={{ ...S.td0, fontSize: "11px" }}>[Baselines updated]</td></tr>
          <tr><td style={S.tdAlt}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Pending</span></td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[1]</td><td style={{ ...S.tdAlt, textAlign: "right" as const }}>TBD</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>TBD</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Awaiting CCB review]</td></tr>
          <tr><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Under Review</span></td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[1]</td><td style={{ ...S.td0, textAlign: "right" as const }}>TBD</td><td style={{ ...S.td0, textAlign: "center" as const }}>TBD</td><td style={{ ...S.td0, fontSize: "11px" }}>[Impact analysis in progress]</td></tr>
          <tr><td style={S.tdAlt}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Rejected</span></td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[1]</td><td style={{ ...S.tdAlt, textAlign: "right" as const }}>$0</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>None</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Deferred to Phase 2]</td></tr>
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
    <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderForm()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderImpact()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderSummary()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderSummary()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><RefreshCw size={11} /> Change Requests</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><RefreshCw size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Change Request Log</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Monitoring & Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Tracks all change requests with formal evaluation, impact analysis, and CCB decisions. Full CR Log includes the form template and impact analysis; Quick Log shows the register and summary dashboard.</p>
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

export default function ChangeRequestLogPage() {
  return (<ThemeProvider><ChangeRequestLogContent /></ThemeProvider>);
}
