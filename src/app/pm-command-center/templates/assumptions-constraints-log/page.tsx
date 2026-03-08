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
  { id: "full", label: "Full Log", desc: "Assumptions + constraints + dependencies", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Combined register only", icon: AlignJustify },
];

function AssumptionsConstraintsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const assumptionsRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const depsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📓 ASSUMPTIONS & CONSTRAINTS LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This living document tracks all project assumptions, constraints, and external dependencies with their validation status.</strong> Assumptions that prove false become risks; constraints define the boundaries within which the project must operate.<br /><br />
          Review and update this log at <strong style={{ fontStyle: "italic" }}>every planning gate, status meeting,</strong> and <strong style={{ fontStyle: "italic" }}>change request review</strong>. Aligns with PMBOK Integration Management — Initiating Process Group.
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

  const renderAssumptions = () => (
    <div ref={assumptionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>✅ ASSUMPTIONS LOG</div>
      <CopyButton targetRef={assumptionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Assumption</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Validate By</th>
        </tr></thead>
        <tbody>
          {[
            { id: "A1", desc: "[e.g., Executive sponsorship will remain active throughout the project lifecycle]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, status: "Open", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, owner: "[PM]", date: "[MM/DD]" },
            { id: "A2", desc: "[e.g., Existing IT infrastructure can support the new system without major upgrades]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, status: "Validated", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[IT Lead]", date: "[MM/DD]" },
            { id: "A3", desc: "[e.g., SMEs will be available for 20% of their time during requirements phase]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, status: "Open", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, owner: "[BA]", date: "[MM/DD]" },
            { id: "A4", desc: "[e.g., Vendor API documentation is accurate and current]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, status: "Invalid", sBg: C.badgeRedBg, sFg: C.badgeRedFg, owner: "[Dev Lead]", date: "[MM/DD]" },
            { id: "A5", desc: "[e.g., Training can be completed in 2 weeks]", impact: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg, status: "Open", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, owner: "[PM]", date: "[MM/DD]" },
            { id: "A6", desc: "[Add assumption]", impact: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, owner: "", date: "" },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={a.id}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{a.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.iBg, a.iFg)}>{a.impact}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.sBg, a.sFg)}>{a.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.date}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Status: <strong>Open</strong> (not yet validated) ❌ <strong>Validated</strong> (confirmed true) ❌ <strong>Invalid</strong> (proved false — convert to risk)</p>
    </div>
  );

  const renderConstraints = () => (
    <div ref={constraintsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🚫 CONSTRAINTS LOG</div>
      <CopyButton targetRef={constraintsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Category</th>
          <th style={S.thSecondary}>Constraint Description</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Mitigation / Workaround</th>
        </tr></thead>
        <tbody>
          {[
            { id: "C1", cat: "Schedule", desc: "[e.g., Must go-live by Dec 31, 2026 — fiscal year-end deadline]", sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, mit: "[Fast-track critical path; reduce scope if needed]" },
            { id: "C2", cat: "Budget", desc: "[e.g., Total budget capped at $500K with no additional funding available]", sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, mit: "[Phased delivery; prioritize must-have features]" },
            { id: "C3", cat: "Resource", desc: "[e.g., Max 3 FTEs allocated; no external contractors permitted]", sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, mit: "[Skill cross-training; focus on highest-value work]" },
            { id: "C4", cat: "Regulatory", desc: "[e.g., Must comply with SOX / HIPAA / GDPR requirements]", sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, mit: "[Engage compliance team early; build into requirements]" },
            { id: "C5", cat: "Technical", desc: "[e.g., Must integrate with existing SAP ERP — no system replacement]", sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, mit: "[API-first approach; validate integration early]" },
            { id: "C6", cat: "[Category]", desc: "[Add constraint]", sev: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, mit: "" },
          ].map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={c.id}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{c.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.cat}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(c.sBg, c.sFg)}>{c.sev}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.mit}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDeps = () => (
    <div ref={depsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔗 EXTERNAL DEPENDENCIES</div>
      <CopyButton targetRef={depsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Dependency Description</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Dependent On</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Needed By</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { id: "D1", desc: "[e.g., Network infrastructure upgrade must complete before UAT]", dep: "[IT Ops]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, date: "[MM/DD]", owner: "[IT Mgr]" },
            { id: "D2", desc: "[e.g., Vendor contract must be signed before development starts]", dep: "[Procurement]", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, date: "[MM/DD]", owner: "[PM]" },
            { id: "D3", desc: "[e.g., Data migration from legacy system]", dep: "[DBA Team]", status: "Not Started", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, date: "[MM/DD]", owner: "[Dev Lead]" },
            { id: "D4", desc: "[Add dependency]", dep: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, date: "", owner: "" },
          ].map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={d.id}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{d.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.dep}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(d.sBg, d.sFg)}>{d.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.date}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📋 LOG SUMMARY DASHBOARD</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Category</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Total</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Open</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Validated</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Invalid / At Risk</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, fontWeight: 700 }}>Assumptions</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[5]</td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[3]</span></td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>[1]</span></td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>[1]</span></td><td style={{ ...S.td0, fontSize: "11px" }}>[1 invalid — converted to Risk R-XX]</td></tr>
          <tr><td style={{ ...S.tdAlt, fontWeight: 700 }}>Constraints</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[5]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>[3 High]</span></td><td style={{ ...S.tdAlt, textAlign: "center" as const }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>[2 Med]</span></td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>—</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[No changes since last review]</td></tr>
          <tr><td style={{ ...S.td0, fontWeight: 700 }}>Dependencies</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[3]</td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>[1 On Track]</span></td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>[1 At Risk]</span></td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[1 Not Started]</span></td><td style={{ ...S.td0, fontSize: "11px" }}>[D2 escalated to Procurement VP]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAssumptions()}{renderConstraints()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderDeps()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderSummary()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAssumptions()}{renderConstraints()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><ClipboardList size={11} /> Assumptions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><ClipboardList size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Assumptions & Constraints Log</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Initiating Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Living document tracking all project assumptions, constraints, and dependencies with validation status. Full Log includes all three registers plus a summary dashboard; Quick Log shows assumptions and constraints only.</p>
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

export default function AssumptionsConstraintsLogPage() {
  return (<ThemeProvider><AssumptionsConstraintsContent /></ThemeProvider>);
}
