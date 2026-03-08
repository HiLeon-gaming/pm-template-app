"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListChecks, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "Agenda + notes + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Refinement notes only", icon: AlignJustify },
];

function BacklogRefinementContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔧 BACKLOG REFINEMENT AGENDA + NOTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint # — Mid-sprint refinement]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[PO / SM]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[45 min]</td></tr>
        <tr><td style={S.tdLabel}>Attendees</td><td colSpan={3} style={S.td0}>[List team members present]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 REFINEMENT AGENDA</div>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Activity</th>
          <th style={S.thPrimary}>Details / Notes</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { time: "5 min", act: "Review last actions", notes: "[Check status of items from last refinement — any still open?]", own: "SM" },
            { time: "5 min", act: "Backlog health check", notes: "[How many sprints of refined stories do we have? Any gaps?]", own: "PO" },
            { time: "25 min", act: "Story review + estimation", notes: "[PO presents stories; team asks questions, identifies gaps, estimates]", own: "PO + Team" },
            { time: "5 min", act: "Dependencies + blockers", notes: "[Identify any new dependencies or blockers for upcoming stories]", own: "Team" },
            { time: "5 min", act: "Actions + next steps", notes: "[Capture follow-ups: stories to split, spikes to schedule, questions for stakeholders]", own: "SM" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.notes}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.own}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStories = () => (
    <div ref={storiesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📝 STORIES DISCUSSED</div>
      <CopyButton targetRef={storiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%" }}>ID</th>
          <th style={S.thSecondary}>Story Title</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "28%" }}>Notes / Questions / Decisions</th>
        </tr></thead>
        <tbody>
          {[
            { id: "[S-010]", title: "[Apple Pay integration]", pts: "5", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[API contract confirmed; mockups approved; estimated at 5]" },
            { id: "[S-011]", title: "[Google Pay integration]", pts: "3", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Similar to Apple Pay; estimated at 3; can reuse payment component]" },
            { id: "[S-012]", title: "[Payment error messages]", pts: "3", s: "Needs Split", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Too big as one story; split into: error display + retry logic]" },
            { id: "[S-015]", title: "[Order tracking page]", pts: "?", s: "Needs Spike", sBg: C.badgeRedBg, sFg: C.badgeRedFg, notes: "[Need to investigate shipping API; schedule 2-pt spike next sprint]" },
            { id: "[S-016]", title: "[Saved payment methods]", pts: "5", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[PCI compliance confirmed; design approved; Sprint 10 candidate]" },
            { id: "[Add]", title: "", pts: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.title}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ ACTION ITEMS FROM REFINEMENT</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Done</th>
        </tr></thead>
        <tbody>
          {[
            { a: "[Split S-012 into two stories: error display + retry logic]", own: "[PO]", due: "[Tomorrow]" },
            { a: "[Schedule 2-pt spike for shipping API investigation]", own: "[SM]", due: "[Sprint planning]" },
            { a: "[Get mockup approval for order tracking page from designer]", own: "[PO]", due: "[This week]" },
            { a: "[Confirm PCI compliance requirements with security team]", own: "[Tech Lead]", due: "[This week]" },
            { a: "[Add action]", own: "", due: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.a}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><ListChecks size={11} />Refinement</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><ListChecks size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Backlog Refinement Agenda + Notes</h2><p className="text-xs font-medium text-red-600">Repeatable Refinement Meeting Template</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured agenda, story discussion notes, estimation results, and action items. Makes refinement consistent and efficient.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderStories()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderStories()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BacklogRefinementPage() { return <ThemeProvider><BacklogRefinementContent /></ThemeProvider>; }
