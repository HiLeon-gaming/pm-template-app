"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Clock, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Template", desc: "Agenda + minutes + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Agenda only", icon: AlignJustify },
];

function MeetingAgendaMinutesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📝 MEETING AGENDA & MINUTES</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template combines the meeting agenda (distributed before) and minutes (captured during and distributed after) into a single document.</strong> It ensures meetings are structured, productive, and result in clear decisions and action items.<br /><br />
          Use this template for <strong style={{ fontStyle: "italic" }}>all formal project meetings</strong> including steering committees, status reviews, and workshops. Aligns with PMBOK Communications Management.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting Title</td><td style={{ ...S.td0, width: "32%" }}>[e.g., Weekly Status Review]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date / Time</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY, HH:MM – HH:MM]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Name</td><td style={S.tdAlt}>[Project Name]</td><td style={S.tdLabelAlt}>Location</td><td style={S.tdAlt}>[Room / Virtual Link]</td></tr>
          <tr><td style={S.tdLabel}>Facilitator</td><td style={S.td0}>[Name]</td><td style={S.tdLabel}>Note Taker</td><td style={S.td0}>[Name]</td></tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Attendee</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Required?</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Attended?</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Name 1]", role: "[PM]", req: "Yes", att: "", notes: "" },
            { name: "[Name 2]", role: "[Sponsor]", req: "Yes", att: "", notes: "" },
            { name: "[Name 3]", role: "[BA Lead]", req: "Yes", att: "", notes: "" },
            { name: "[Name 4]", role: "[Dev Lead]", req: "Yes", att: "", notes: "[Sent delegate]" },
            { name: "[Name 5]", role: "[QA Lead]", req: "Optional", att: "", notes: "" },
            { name: "[Add attendee]", role: "", req: "", att: "", notes: "" },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{a.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{a.req}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{a.att}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.notes}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> AGENDA</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Topic</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Presenter</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "Opening / Roll Call", time: "5 min", presenter: "[Facilitator]", type: "Info", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg },
            { topic: "Review Previous Action Items", time: "10 min", presenter: "[PM]", type: "Review", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg },
            { topic: "[e.g., Schedule Status & Milestone Update]", time: "15 min", presenter: "[PM]", type: "Discussion", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { topic: "[e.g., Budget / EVM Review]", time: "10 min", presenter: "[PM]", type: "Info", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg },
            { topic: "[e.g., Risk & Issue Review]", time: "10 min", presenter: "[PM]", type: "Discussion", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { topic: "[e.g., Change Request CR-003 Review]", time: "10 min", presenter: "[BA]", type: "Decision", tBg: C.badgeRedBg, tFg: C.badgeRedFg },
            { topic: "New Business / Open Floor", time: "5 min", presenter: "[All]", type: "Discussion", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg },
            { topic: "Action Item Review & Close", time: "5 min", presenter: "[Facilitator]", type: "Review", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{a.topic}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{a.time}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.presenter}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.tBg, a.tFg)}>{a.type}</span></td>
            </tr>);
          })}
          <tr>
            <td colSpan={2} style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white }}>TOTAL MEETING TIME</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>70 min</td>
            <td colSpan={2} style={{ ...S.td0, backgroundColor: C.secondary, color: C.white }}></td>
          </tr>
        </tbody>
      </table>
      <p style={S.subNote}>Meeting objective: [State the primary purpose. Example: “Review project status, resolve blockers, and approve CR-003.”]</p>
    </div>
  );

  const renderMinutes = () => (
    <div ref={minutesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> MEETING MINUTES (KEY DISCUSSION POINTS)</td></tr></tbody></table>
      <CopyButton targetRef={minutesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Topic</th>
          <th style={S.thSecondary}>Discussion Summary</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "Schedule Status", summary: "[e.g., On track overall. M3 (Requirements Baselined) delayed by 3 days due to stakeholder availability. Mitigation: extra review session scheduled for Friday.]" },
            { topic: "Budget Review", summary: "[e.g., CPI = 1.13 (under budget). Vendor consulting line fully committed — any additional work requires CR. Contingency 87% available.]" },
            { topic: "Risk Review", summary: "[e.g., R2 (scope creep) elevated to Critical. 3 CRs submitted this week. PM recommends tighter change control enforcement. No new risks identified.]" },
            { topic: "CR-003 Review", summary: "[e.g., $25K security audit request. Impact analysis presented. All CCB members recommend approval. Formal vote: Approved unanimously.]" },
            { topic: "[Add topic]", summary: "[Discussion notes]" },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{m.topic}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.summary}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}> DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Decision</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Decided By</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { id: "D1", dec: "[e.g., CR-003 approved — $25K security audit to be added to scope and budget baseline]", by: "[CCB / Sponsor]", date: "[MM/DD]" },
            { id: "D2", dec: "[e.g., Change control enforcement tightened — all CRs require written impact analysis before CCB review]", by: "[PM / Sponsor]", date: "[MM/DD]" },
            { id: "D3", dec: "[e.g., Extra requirements review session approved for Friday to close M3 gap]", by: "[PM]", date: "[MM/DD]" },
            { id: "[D#]", dec: "[Add decision]", by: "", date: "" },
          ].map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{d.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.dec}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.by}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.date}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> ACTION ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Action Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Due Date</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "AI-1", action: "[e.g., Update project baselines to include CR-003 scope and budget]", owner: "[PM]", due: "[MM/DD]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { id: "AI-2", action: "[e.g., Schedule extra requirements review session for Friday PM]", owner: "[BA]", due: "[MM/DD]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { id: "AI-3", action: "[e.g., Distribute updated change control process document to all team leads]", owner: "[PM]", due: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { id: "AI-4", action: "[e.g., Complete vendor security audit SOW and submit to procurement]", owner: "[QA Lead]", due: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { id: "[AI-#]", action: "[Add action item]", owner: "", due: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{a.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.action}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.due}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.pBg, a.pFg)}>{a.pri}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.sBg, a.sFg)}>{a.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Next meeting: [Date, Time, Location]. Minutes distributed by [Name] within [24 hours].</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderMinutes()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderDecisions()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderActions()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Clock size={11} /> Meeting</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Clock size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Meeting Agenda & Minutes</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Communications Management • Executing Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Combined agenda and minutes template with decisions and action items. Full Template includes all sections; Quick Agenda shows the agenda and attendees only.</p>
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

export default function MeetingAgendaMinutesPage() {
  return (<ThemeProvider><MeetingAgendaMinutesContent /></ThemeProvider>);
}
