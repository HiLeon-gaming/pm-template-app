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
  { id: "full", label: "Full Map", desc: "All governance + escalation", icon: LayoutDashboard },
  { id: "compact", label: "Quick Map", desc: "Decision rights only", icon: AlignJustify },
];

function GovernanceDecisionRightsMapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rightsRef = useRef<HTMLDivElement>(null);
  const escalationRef = useRef<HTMLDivElement>(null);
  const cadenceRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🏛️ GOVERNANCE & DECISION RIGHTS MAP</td></tr>
      <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Who decides what, escalation paths, cadence, and what requires formal approval.</strong> Clear governance prevents decision bottlenecks and ensures the right people make the right decisions at the right time.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Governance Model</td><td style={S.tdAlt}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[Hybrid — Phase Gates + Sprint Reviews]</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRights = () => (
    <div ref={rightsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>⚖️ DECISION RIGHTS MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={rightsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Decision Type</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "12%" }}>Decision Maker</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "10%" }}>Consulted</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "10%" }}>Informed</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "10%", textAlign: "center" as const }}>Threshold</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "Scope changes (minor)", dm: "PM", consult: "Tech Lead", inform: "Sponsor", thresh: "<$5K" },
            { dec: "Scope changes (major)", dm: "Steering Committee", consult: "PM, Tech Lead", inform: "Team", thresh: ">$5K" },
            { dec: "Budget reallocation", dm: "Sponsor", consult: "PM, Finance", inform: "Steering", thresh: ">5%" },
            { dec: "Schedule changes (<2 weeks)", dm: "PM", consult: "Team Leads", inform: "Sponsor", thresh: "<2 wks" },
            { dec: "Schedule changes (>2 weeks)", dm: "Steering Committee", consult: "PM", inform: "PMO", thresh: ">2 wks" },
            { dec: "Resource additions/changes", dm: "PM + Sponsor", consult: "HR, Func. Mgr", inform: "Team", thresh: "Any" },
            { dec: "Vendor selection/changes", dm: "Sponsor", consult: "PM, Procurement", inform: "Steering", thresh: "Any" },
            { dec: "Risk response activation", dm: "PM", consult: "Risk Owner", inform: "Sponsor", thresh: "<$10K" },
            { dec: "Contingency release", dm: "Sponsor", consult: "PM, Finance", inform: "Steering", thresh: "Any" },
            { dec: "Go/No-Go (phase gate)", dm: "Steering Committee", consult: "PM, QA Lead", inform: "All", thresh: "N/A" },
            { dec: "Technical architecture", dm: "Tech Lead", consult: "PM, Security", inform: "Sponsor", thresh: "N/A" },
            { dec: "Sprint priorities", dm: "PM (Product Owner)", consult: "Team", inform: "Sponsor", thresh: "N/A" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.dec}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#0D9488" }}>{r.dm}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.consult}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.inform}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.thresh}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escalationRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>🚨 ESCALATION PATH</td></tr></tbody></table>
      <CopyButton targetRef={escalationRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>Level</th>
          <th style={{ ...S.thSecondary, width: "15%" }}>Escalation To</th>
          <th style={S.thSecondary}>When to Escalate</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Response SLA</th>
        </tr></thead>
        <tbody>
          {[
            { level: "1", to: "Project Manager", when: "[Team-level blockers, resource conflicts, minor risks materializing]", sla: "Same day" },
            { level: "2", to: "Project Sponsor", when: "[Budget impact >5%, schedule slip >1 week, sponsor-level decisions needed]", sla: "24 hours" },
            { level: "3", to: "Steering Committee", when: "[Go/No-Go decisions, major scope changes, cross-project conflicts]", sla: "Next meeting" },
            { level: "4", to: "PMO / Executive", when: "[Project cancellation risk, organizational policy exceptions, portfolio conflicts]", sla: "48 hours" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488", fontSize: "14px" }}>{r.level}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.to}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.when}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.sla}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCadence = () => (
    <div ref={cadenceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📅 GOVERNANCE CADENCE</td></tr></tbody></table>
      <CopyButton targetRef={cadenceRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Forum</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Frequency</th>
          <th style={{ ...S.thSecondary, width: "15%" }}>Attendees</th>
          <th style={S.thSecondary}>Purpose / Decisions</th>
        </tr></thead>
        <tbody>
          {[
            { forum: "Daily Standup", freq: "Daily", att: "Team + PM", purpose: "[Blockers, today’s focus, dependencies]" },
            { forum: "Sprint Review / Demo", freq: "Bi-weekly", att: "Team + Stakeholders", purpose: "[Demonstrate increment; gather feedback; accept/reject deliverables]" },
            { forum: "Sprint Retrospective", freq: "Bi-weekly", att: "Team + PM", purpose: "[Process improvement; team health; tailoring adjustments]" },
            { forum: "Status Report", freq: "Bi-weekly", att: "PM → Sponsor", purpose: "[Health update, domain status, risks, decisions needed]" },
            { forum: "Steering Committee", freq: "Monthly", att: "Sponsor + Executives", purpose: "[Phase gate decisions, budget reviews, strategic alignment]" },
            { forum: "PMO Portfolio Review", freq: "Monthly", att: "PM → PMO", purpose: "[Portfolio roll-up, resource conflicts, cross-project dependencies]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.forum}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.freq}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.att}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.purpose}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>🔒 FORMAL APPROVAL REQUIREMENTS</td></tr></tbody></table>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={S.thSecondary}>Requires Formal Approval</th><th style={{ ...S.thSecondary, width: "15%" }}>Approver</th><th style={{ ...S.thSecondary, width: "12%" }}>Method</th></tr></thead>
        <tbody>
          {[
            { item: "Project Charter / Business Case changes", approver: "Sponsor", method: "Written sign-off" },
            { item: "Baseline schedule changes (>2 weeks)", approver: "Steering Committee", method: "Meeting vote" },
            { item: "Budget increase / contingency release", approver: "Sponsor + Finance", method: "Written sign-off" },
            { item: "Vendor contract modifications", approver: "Sponsor + Procurement", method: "Written sign-off" },
            { item: "Phase gate Go/No-Go", approver: "Steering Committee", method: "Meeting vote" },
            { item: "Go-Live decision", approver: "Sponsor + QA + Ops", method: "Written sign-off" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.item}</td><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "10px" }}>{r.approver}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.method}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderRights()}{renderEscalation()}{renderCadence()}{renderApproval()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderRights()}{renderEscalation()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Compass size={11} /> Governance</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Governance & Decision Rights Map</h2><p className="text-xs font-medium text-teal-600">Decision Authority + Escalation</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Who decides what, escalation paths, cadence, and what requires formal approval.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function GovernanceDecisionRightsMapPage() {
  return (<ThemeProvider><GovernanceDecisionRightsMapContent /></ThemeProvider>);
}
