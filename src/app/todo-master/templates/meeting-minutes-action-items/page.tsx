"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "detailed" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "detailed", label: "Detailed Minutes", desc: "Full notes + decisions", icon: LayoutDashboard },
  { id: "compact", label: "Action Focus", desc: "Decisions + actions only", icon: AlignJustify },
];

function MeetingMinutesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("detailed");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const followupRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📝 MEETING MINUTES &amp; ACTION ITEMS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Capture Every Decision, Own Every Action</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Meeting Title</td>
            <td style={{ ...S.td0, width: "36%" }}>[Meeting Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date &amp; Time</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY] at [HH:MM]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Note Taker</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Duration</td>
            <td style={S.tdAlt}>[___] minutes (planned: [___])</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Attendees</td>
            <td colSpan={3} style={S.td0}>[List: ✓ Present, ✗ Absent — e.g., ✓Sarah (PM), ✓Marcus (Dev), ✗Alex (UX)]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Meeting Purpose</td>
            <td colSpan={3} style={S.tdAlt}>[Original meeting objective — copy from agenda]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 DISCUSSION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Time</th>
            <th style={S.thSecondary}>Topic &amp; Discussion Summary</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Speaker</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: "0:00", topic: "[e.g., Opened with review of last meeting's action items — 3 of 5 completed]", speaker: "[PM]" },
            { time: "0:10", topic: "[e.g., Q3 budget discussion — finance presented revised revenue projections, up 12% from initial estimate]", speaker: "[Finance]" },
            { time: "0:25", topic: "[e.g., Sprint demo — showed v2.1 features; stakeholders flagged UX issue with dashboard filters]", speaker: "[Dev Lead]" },
            { time: "0:40", topic: "[e.g., Launch timeline discussion — agreed to push 1 week to address UX feedback]", speaker: "[PM]" },
            { time: "", topic: "[Continue notes...]", speaker: "" },
            { time: "", topic: "[Continue notes...]", speaker: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600, color: C.accent }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.speaker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: "#DBEAFE", color: "#2563EB",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #2563EB",
              border: `1.5px solid ${C.border}`,
            }}>
              ⚖️ DECISIONS MADE
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>D#</th>
            <th style={S.thSecondary}>Decision</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Decided By</th>
          </tr>
        </thead>
        <tbody>
          {[
            { decision: "[e.g., Launch date moved to May 30th (+1 week) to incorporate UX feedback]", by: "[PM + Stakeholders]" },
            { decision: "[e.g., Approved $5K additional budget for contractor UX support]", by: "[Sponsor]" },
            { decision: "[e.g., Dashboard filter redesign will be in Sprint 13, not Sprint 12]", by: "[Dev Lead + PM]" },
            { decision: "[Add decision]", by: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: "#2563EB" }}>D{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.by}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={5} style={{
              backgroundColor: "#D1FAE5", color: "#059669",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #059669",
              border: `1.5px solid ${C.border}`,
            }}>
              🎯 ACTION ITEMS
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>A#</th>
            <th style={S.thSecondary}>Action Item</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Due Date</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "[e.g., Redesign dashboard filter UX — create 3 mockup options]", owner: "[UX Designer]", due: "[Date]", stat: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[e.g., Update project timeline in JIRA to reflect new launch date]", owner: "[PM]", due: "[Date]", stat: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[e.g., Engage UX contractor — send scope and availability request]", owner: "[PM]", due: "[Date]", stat: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[e.g., Prepare revised demo for stakeholder group next Tuesday]", owner: "[Dev Lead]", due: "[Date]", stat: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Add action]", owner: "", due: "", stat: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Add action]", owner: "", due: "", stat: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: "#059669" }}>A{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
    </div>
  );

  const renderFollowUp = () => (
    <div ref={followupRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📅 FOLLOW-UP</td></tr></tbody></table>
      <CopyButton targetRef={followupRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "30%" }}>Next meeting date</td>
            <td style={S.td0}>[MM/DD/YYYY] at [HH:MM]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Next meeting&apos;s focus</td>
            <td style={S.tdAlt}>[What will the next meeting cover?]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Minutes distributed to</td>
            <td style={S.td0}>[All attendees + stakeholders list]</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, fontWeight: 700, color: C.accent }}>Meeting effectiveness</td>
            <td style={S.tdAlt}>☐ Very Productive ☐ Productive ☐ Could Be Better ☐ Waste of Time</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderDetailed = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}{renderNotes()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderDecisions()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderActions()}</td>
      </tr></tbody></table>
      {renderFollowUp()}{renderFooter()}
    </>
  );

  const renderCompact = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderDecisions()}{renderActions()}{renderFollowUp()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"><FileText size={11} /> Minutes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"><FileText size={20} className="text-slate-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Meeting Minutes &amp; Action Items</h2>
              <p className="text-xs font-medium text-slate-600">Capture Every Decision, Own Every Action</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured meeting notes with colored Decision (blue) and Action (green) sections, discussion log, and follow-up planning. Detailed mode captures everything; Action Focus shows just decisions and actions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Minutes Style</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "detailed" && renderDetailed()}
          {layout === "compact" && renderCompact()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingMinutesPage() {
  return (<ThemeProvider><MeetingMinutesContent /></ThemeProvider>);
}
