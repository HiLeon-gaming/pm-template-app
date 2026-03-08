"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, MessageSquare, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Matrix + escalation + tools", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Comms matrix only", icon: AlignJustify },
];

function CommunicationsPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const escalationRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> COMMUNICATIONS PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop  PM Command Center  PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Communications Plan defines who needs what information, when, how, and from whom.</strong> It ensures the right stakeholders receive the right information at the right time through the right channels.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>communications planning</strong> to establish information flow. Aligns with PMBOK Communications Management — Planning Process Group.
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

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>COMMUNICATIONS MATRIX</div>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "16%" }}>Communication</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Audience</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Method</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Frequency</th>
          <th style={{ ...S.thPrimary, width: "9%" }}>Owner</th>
          <th style={S.thPrimary}>Content / Purpose</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Direction</th>
        </tr></thead>
        <tbody>
          {[
            { comm: "Steering Committee", aud: "[Sponsor, CIO, VP]", method: "Meeting", freq: "Monthly", owner: "[PM]", content: "[Executive summary, budget/schedule status, key risks, decisions needed]", dir: "Push", dBg: C.badgeRedBg, dFg: C.badgeRedFg },
            { comm: "Weekly Status Report", aud: "[Sponsor, Stakeholders]", method: "Email", freq: "Weekly", owner: "[PM]", content: "[RAG status, milestones, risks, issues, action items, EVM metrics]", dir: "Push", dBg: C.badgeRedBg, dFg: C.badgeRedFg },
            { comm: "Team Standup", aud: "[Project Team]", method: "Meeting", freq: "Daily", owner: "[PM/SM]", content: "[Yesterday, today, blockers — 15 min timebox]", dir: "Interactive", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
            { comm: "Sprint Review / Demo", aud: "[PO, Stakeholders]", method: "Meeting", freq: "Bi-weekly", owner: "[Dev Lead]", content: "[Completed features demo, feedback collection, backlog updates]", dir: "Interactive", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
            { comm: "Risk Review", aud: "[PM, Team Leads]", method: "Meeting", freq: "Weekly", owner: "[PM]", content: "[Risk register review, new risks, trigger status, response updates]", dir: "Interactive", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
            { comm: "Change Advisory Board", aud: "[CCB Members]", method: "Meeting", freq: "As Needed", owner: "[PM]", content: "[CR review, impact analysis, approval decisions]", dir: "Interactive", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
            { comm: "Project Dashboard", aud: "[All Stakeholders]", method: "Portal", freq: "Real-time", owner: "[PM]", content: "[Live metrics, schedule, budget, quality KPIs]", dir: "Pull", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { comm: "Go-Live Comms", aud: "[All Users, Mgmt]", method: "Email + Town Hall", freq: "One-time", owner: "[Change Mgr]", content: "[Release announcement, training resources, support contacts, FAQs]", dir: "Push", dBg: C.badgeRedBg, dFg: C.badgeRedFg },
            { comm: "[Add communication]", aud: "", method: "", freq: "", owner: "", content: "", dir: "—", dBg: C.badgeGrayBg, dFg: C.badgeGrayFg },
          ].map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.comm}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{c.aud}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{c.method}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{c.freq}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{c.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.content}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(c.dBg, c.dFg)}>{c.dir}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}><strong>Push</strong> = sender initiates (email, report) • <strong>Pull</strong> = receiver retrieves (dashboard, wiki) • <strong>Interactive</strong> = two-way exchange (meeting, workshop)</p>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escalationRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🚨 ESCALATION MATRIX</div>
      <CopyButton targetRef={escalationRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Level</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Escalation To</th>
          <th style={S.thSecondary}>When to Escalate</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Response Time</th>
        </tr></thead>
        <tbody>
          {[
            { level: "Level 1", to: "[Project Manager]", when: "[Team-level issues, resource conflicts, minor scope questions, technical blockers]", time: "[4 hours]" },
            { level: "Level 2", to: "[Sponsor]", when: "[Budget variance >5%, schedule delay >1 week, unresolved stakeholder conflicts]", time: "[24 hours]" },
            { level: "Level 3", to: "[Steering Committee]", when: "[Budget overrun >10%, critical resource loss, scope baseline change, vendor dispute]", time: "[48 hours]" },
            { level: "Level 4", to: "[Executive / CIO]", when: "[Project cancellation consideration, regulatory/legal issues, organizational impact]", time: "[72 hours]" },
          ].map((e, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(i < 2 ? C.badgeBlueBg : i < 3 ? C.badgeAmberBg : C.badgeRedBg, i < 2 ? C.badgeBlueFg : i < 3 ? C.badgeAmberFg : C.badgeRedFg)}>{e.level}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{e.to}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{e.when}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{e.time}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTools = () => (
    <div ref={toolsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> COMMUNICATION TOOLS & CHANNELS</div>
      <CopyButton targetRef={toolsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "18%" }}>Tool / Channel</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Type</th>
          <th style={S.thSecondary}>Purpose & Usage Guidelines</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Access</th>
        </tr></thead>
        <tbody>
          {[
            { tool: "[e.g., MS Teams]", type: "Messaging", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, purpose: "[Day-to-day team communication; quick questions; file sharing; informal updates]", access: "[All team]" },
            { tool: "[e.g., Jira]", type: "Tracking", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, purpose: "[Task tracking, defect management, sprint planning, backlog management]", access: "[Project team]" },
            { tool: "[e.g., Confluence]", type: "Documentation", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, purpose: "[Project wiki, meeting notes, decisions, architecture docs, runbooks]", access: "[All stakeholders]" },
            { tool: "[e.g., SharePoint]", type: "Repository", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, purpose: "[Official document storage, version control, deliverable archive]", access: "[All stakeholders]" },
            { tool: "[e.g., Email]", type: "Formal", tBg: C.badgeRedBg, tFg: C.badgeRedFg, purpose: "[Status reports, escalations, formal approvals, external vendor communication]", access: "[Per distribution list]" },
            { tool: "[e.g., Zoom]", type: "Meeting", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, purpose: "[Virtual meetings, demos, workshops, stakeholder presentations]", access: "[All team]" },
          ].map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{t.tool}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(t.tBg, t.tFg)}>{t.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.purpose}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.access}</td>
            </tr>);
          })}
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
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderEscalation()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderTools()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><MessageSquare size={11} /> Comms</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><MessageSquare size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Communications Plan</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Communications Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines stakeholder communication needs with matrix, escalation paths, and tools. Full Plan includes all sections; Quick Plan shows the communications matrix only.</p>
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

export default function CommunicationsPlanPage() {
  return (<ThemeProvider><CommunicationsPlanContent /></ThemeProvider>);
}
