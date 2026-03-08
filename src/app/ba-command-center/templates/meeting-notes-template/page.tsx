"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Agenda + discussion + actions + decisions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Actions + decisions only", icon: AlignJustify },
];

function MeetingNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const discussRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📝 MEETING NOTES</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template captures meeting outcomes in a structured format with attendees, agenda items, discussion notes, decisions made, and action items with owners and due dates.</strong> Designed for BA-led meetings such as requirements reviews, stakeholder workshops, and sprint planning sessions where clear documentation of decisions and follow-ups is critical.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>requirements review meetings, stakeholder workshops,</strong> or <strong style={{ fontStyle: "italic" }}>any BA-facilitated session where decisions and actions must be formally tracked</strong>. Aligns with BABOK Knowledge Area: BA Planning &amp; Monitoring.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Meeting Title</td>
            <td style={{ ...S.td0, width: "36%" }}>[e.g., Requirements Review — Order Management Module]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date / Time</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY] [HH:MM] — [HH:MM]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Facilitator</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Location</td>
            <td style={S.tdAlt}>[Room / Video Link]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Project</td>
            <td style={S.td0}>[Project Name]</td>
            <td style={S.tdLabel}>Meeting Type</td>
            <td style={S.td0}>☐ Requirements Review ☐ Workshop ☐ Sprint Planning ☐ Stakeholder Sync ☐ Other</td>
          </tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "20%" }}>Attendee</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Role</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Present</th>
            <th style={{ ...S.thSecondary, width: "20%" }}>Attendee</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Role</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Present</th>
          </tr>
        </thead>
        <tbody>
          {[
            { n1: "[Name]", r1: "[Sponsor]", n2: "[Name]", r2: "[Dev Lead]" },
            { n1: "[Name]", r1: "[PM]", n2: "[Name]", r2: "[QA Lead]" },
            { n1: "[Name]", r1: "[BA]", n2: "[Name]", r2: "[User Rep]" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.n1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.r1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.n2}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.r2}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 AGENDA</div>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Topic</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Presenter</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Duration</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { topic: "[e.g., Review FR-001 through FR-005 — Order Creation requirements]", pres: "[BA]", dur: "15 min", stat: "☐" },
            { topic: "[e.g., Discuss open question: Payment retry logic — how many retries?]", pres: "[Tech Lead]", dur: "10 min", stat: "☐" },
            { topic: "[e.g., Review updated process flow for order cancellation (BR-005)]", pres: "[BA]", dur: "10 min", stat: "☐" },
            { topic: "[e.g., UAT timeline and tester availability confirmation]", pres: "[PM]", dur: "10 min", stat: "☐" },
            { topic: "[e.g., Open items and parking lot review]", pres: "[BA]", dur: "5 min", stat: "☐" },
            { topic: "[Add topic]", pres: "", dur: "", stat: "☐" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.pres}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.stat}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDiscussion = () => (
    <div ref={discussRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>💬 DISCUSSION NOTES</div>
      <CopyButton targetRef={discussRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "12%" }}>Agenda Item</th>
            <th style={S.thSecondary}>Key Points Discussed</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>Raised By</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "Item 1", notes: "[e.g., FR-001 through FR-003 approved as written. FR-004 needs clarification on payment retry count — Tech Lead to confirm with vendor.]", by: "[BA]" },
            { item: "Item 2", notes: "[e.g., Agreed on 3 retry attempts with exponential backoff. After 3rd failure, queue for manual processing. This aligns with vendor SLA.]", by: "[Tech Lead]" },
            { item: "Item 3", notes: "[e.g., Updated cancellation flow reviewed. Sponsor confirmed 2-hour window is acceptable. Cancel after picking requires manager approval via email.]", by: "[BA]" },
            { item: "Item 4", notes: "[e.g., UAT window confirmed for Sprint 11-12. 3 testers committed at 100%. Finance tester available at 50% only.]", by: "[PM]" },
            { item: "[Add item]", notes: "", by: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.notes}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.by}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚖️ DECISIONS MADE</div>
      <CopyButton targetRef={decisionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>ID</th>
            <th style={S.thPrimary}>Decision</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Decided By</th>
            <th style={{ ...S.thPrimary, width: "12%" }}>Impact</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "DEC-010", dec: "[e.g., Payment retry logic: 3 attempts with exponential backoff (1s, 5s, 30s)]", by: "[Tech Lead + Sponsor]", impact: "[Updates FR-004 acceptance criteria]" },
            { id: "DEC-011", dec: "[e.g., Order cancellation after picking requires manager email approval — no self-service]", by: "[Sponsor]", impact: "[Updates BR-005 and UI wireframe]" },
            { id: "DEC-012", dec: "[e.g., UAT Cycle 1 window: Sprint 11-12 (May 5-16)]", by: "[PM]", impact: "[UAT Plan dates confirmed]" },
            { id: "[Add]", dec: "", by: "", impact: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.impact}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🎯 ACTION ITEMS</div>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Action</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "[e.g., Update FR-004 acceptance criteria to include 3-retry logic with backoff timings]", owner: "[BA]", due: "[MM/DD]", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "[e.g., Confirm payment gateway retry limits with vendor support team]", owner: "[Tech Lead]", due: "[MM/DD]", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "[e.g., Update BR-005 and cancel flow wireframe with manager approval step]", owner: "[BA]", due: "[MM/DD]", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "[e.g., Send UAT kickoff meeting invite to all testers]", owner: "[PM]", due: "[MM/DD]", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "[Add action]", owner: "", due: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFollowUp = () => (
    <div ref={followRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={S.tdLabel}>Next Meeting</td><td style={S.td0}>[Date / Time / Location — or 'TBD']</td></tr>
          <tr><td style={S.tdLabelAlt}>Parking Lot Items</td><td style={S.tdAlt}>[Items deferred for future discussion — e.g., Reporting module scope, Mobile app requirements]</td></tr>
          <tr><td style={S.tdLabel}>Distribution</td><td style={S.td0}>[Who receives these notes? e.g., All attendees + [Absent stakeholder name]]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={followRef} label="Copy Section" />
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><FileText size={11} /> Notes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><FileText size={20} className="text-sky-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Meeting Notes Template</h2>
              <p className="text-xs font-medium text-sky-600">Agenda &bull; Discussion &bull; Decisions &bull; Actions</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured meeting notes with attendees, agenda, discussion notes, decisions made, and action items. Full Notes includes all sections; Quick Notes shows actions and decisions only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderAgenda()}{renderDiscussion()}{renderDecisions()}{renderActions()}{renderFollowUp()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderDecisions()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingNotesPage() {
  return (<ThemeProvider><MeetingNotesContent /></ThemeProvider>);
}
