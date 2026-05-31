"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "All panels + follow-ups", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Today + actions only", icon: AlignJustify },
];

function CommandDashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const followupsRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🎯 MEETINGS COMMAND DASHBOARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Week of</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td><td style={{ ...S.tdLabel, width: "18%" }}>Owner</td><td style={{ ...S.td0, width: "32%" }}>[Your Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[Date / Time]</td><td style={S.tdLabelAlt}>Focus This Week</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[e.g., Q2 planning alignment]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderToday = () => (
    <div ref={todayRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📅 TODAY&apos;S MEETINGS</td></tr></tbody></table>
      <CopyButton targetRef={todayRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Time</th>
          <th style={S.thPrimary}>Meeting</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Prep?</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { time: "9:00 AM", meeting: "[Weekly Staff Meeting]", type: "Team", prep: "Agenda sent", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { time: "10:30 AM", meeting: "[1:1 with Sarah — career growth check-in]", type: "1:1", prep: "Review notes", s: "Prep", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { time: "1:00 PM", meeting: "[Project Alpha sync — milestone review]", type: "Project", prep: "RAID updated", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { time: "3:00 PM", meeting: "[Exec review — Q2 budget ask]", type: "Executive", prep: "One-pager drafted", s: "Prep", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { time: "4:30 PM", meeting: "[Ad-hoc: vendor issue escalation]", type: "Ad-hoc", prep: "None", s: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeGrayBg, C.badgeGrayFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.prep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>✅ OPEN ACTION ITEMS (Top 8)</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Source</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Send updated budget proposal to CFO]", owner: "[You]", due: "[03/07]", source: "[Exec review]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Share vendor evaluation with procurement]", owner: "[Mike]", due: "[03/07]", source: "[Project sync]", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { action: "[Draft comms plan for reorg announcement]", owner: "[You]", due: "[03/10]", source: "[Staff mtg]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Follow up with Sarah on training budget]", owner: "[You]", due: "[03/08]", source: "[1:1]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.source}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#3B82F6")}>📌 PENDING DECISIONS</td></tr></tbody></table>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thSecondary}>Decision Needed</th>
              <th style={{ ...S.thSecondary, width: "20%", textAlign: "center" as const }}>By When</th>
            </tr></thead>
            <tbody>
              {[
                { d: "[Approve vendor contract for Project Alpha]", by: "[03/10]" },
                { d: "[Decide on team restructure timeline]", by: "[03/14]" },
                { d: "[Budget allocation for Q2 training]", by: "[03/12]" },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "10px" }}>{r.d}</td>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#3B82F6" }}>{r.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>✅ RECENT DECISIONS (Last 7 days)</td></tr></tbody></table>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thSecondary}>Decision Made</th>
              <th style={{ ...S.thSecondary, width: "20%", textAlign: "center" as const }}>Date</th>
            </tr></thead>
            <tbody>
              {[
                { d: "[Approved cloud migration vendor — AWS]", date: "[03/03]" },
                { d: "[Delayed launch by 2 weeks for QA]", date: "[03/01]" },
                { d: "[Hired contractor for data migration]", date: "[02/28]" },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "10px" }}>{r.d}</td>
                  <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#059669" }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
    </div>
  );

  const renderFollowups = () => (
    <div ref={followupsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📬 FOLLOW-UPS DUE THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={followupsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Follow-Up</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Who</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { fu: "[Send recap email from Monday exec review]", who: "[You]", due: "[03/05]", done: "No" },
            { fu: "[Share project timeline with stakeholders]", who: "[Mike]", due: "[03/06]", done: "No" },
            { fu: "[Confirm Sarah\u2019s training enrollment]", who: "[You]", due: "[03/07]", done: "No" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fu}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.done}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 UPCOMING PREP NEEDED</td></tr></tbody></table>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Tomorrow</td><td style={S.td0}>[Board presentation dry-run — finalize slides + talking points]</td></tr>
        <tr><td style={S.tdLabelAlt}>This Week</td><td style={S.tdAlt}>[Quarterly business review — pull metrics, draft executive summary]</td></tr>
        <tr><td style={S.tdLabel}>Next Week</td><td style={S.td0}>[All-hands meeting — prepare team update + recognition slides]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Users size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meetings Command Dashboard</h2><p className="text-xs font-medium text-amber-600">⭐ All-Star &mdash; Your One-Page Meeting Mission Control</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Today&apos;s meetings, open actions, pending decisions, follow-ups due, and upcoming prep. One page to rule all your meetings.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderToday()}{renderActions()}{renderDecisions()}{renderFollowups()}{renderPrep()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderToday()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CommandDashboardPage() { return <ThemeProvider><CommandDashboardContent /></ThemeProvider>; }
