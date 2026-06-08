"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Target, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Actions + aging + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Tracker", desc: "Action register only", icon: AlignJustify },
];

function ActionItemTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const agingRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> ACTION ITEM TRACKER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop  |  PM Command Center  |  PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Action Item Tracker is the central repository for all project action items from meetings, reviews, and status updates.</strong> It tracks ownership, due dates, priority, and completion status to ensure accountability and follow-through.<br /><br />
          Update this tracker <strong style={{ fontStyle: "italic" }}>after every meeting and during weekly status reviews</strong>. Aligns with PMBOK Integration Management — Monitoring & Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Total Open Items</td><td style={S.tdAlt}>[#] of [#] total</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const actions = [
    { id: "AI-001", action: "[e.g., Update project baselines to include CR-003 scope and budget]", source: "CCB Meeting", owner: "[PM]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
    { id: "AI-002", action: "[e.g., Schedule extra requirements review session for Friday]", source: "Status Mtg", owner: "[BA]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "AI-003", action: "[e.g., Distribute updated change control process to team leads]", source: "Status Mtg", owner: "[PM]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
    { id: "AI-004", action: "[e.g., Complete vendor security audit SOW for procurement]", source: "CCB Meeting", owner: "[QA Lead]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
    { id: "AI-005", action: "[e.g., Resolve test environment connectivity issue]", source: "Issue Log", owner: "[IT Ops]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
    { id: "AI-006", action: "[e.g., Brief VP Ops on Q3 efficiency metrics from pilot]", source: "Engagement Plan", owner: "[PM]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
    { id: "AI-007", action: "[e.g., Recruit 5 user champions from each department]", source: "Engagement Plan", owner: "[Change Mgr]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
    { id: "AI-008", action: "[e.g., Update risk register with new vendor delivery risk]", source: "Risk Review", owner: "[PM]", assigned: "[MM/DD]", due: "[MM/DD]", pri: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
    { id: "[AI-###]", action: "[Add action item]", source: "", owner: "", assigned: "", due: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 ACTION ITEM REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Action Item</th>
          <th style={{ ...S.thPrimary, width: "9%" }}>Source</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Assigned</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Due</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pri</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {actions.map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{a.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.action}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{a.source}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{a.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{a.assigned}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{a.due}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.pBg, a.pFg)}>{a.pri}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.sBg, a.sFg)}>{a.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAging = () => (
    <div ref={agingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> OVERDUE / AGING ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={agingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Due Date</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Days Over</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Escalation</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>AI-001</td><td style={{ ...S.td0, fontSize: "11px" }}>[Update project baselines for CR-003]</td><td style={{ ...S.td0, fontSize: "11px" }}>[PM]</td><td style={{ ...S.td0, fontSize: "11px" }}>[MM/DD]</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, color: "#DC2626" }}>[3]</td><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Escalate if &gt;5d</span></td></tr>
          <tr><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>[AI-###]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Add overdue item]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}></td><td style={{ ...S.tdAlt, fontSize: "11px" }}></td><td style={{ ...S.tdAlt, textAlign: "center" as const }}></td><td style={{ ...S.tdAlt, textAlign: "center" as const }}></td></tr>
        </tbody>
      </table>
      <p style={S.subNote}>Aging thresholds: <strong>🟢 &lt;3 days</strong> = On track • <strong>🟡 3-5 days</strong> = At risk • <strong>🔴 &gt;5 days</strong> = Escalate to PM/Sponsor</p>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📊 ACTION ITEM SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Status</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Count</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>High</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Med</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Low</th>
        </tr></thead>
        <tbody>
          <tr><td style={S.td0}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>New</span></td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[3]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[0]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[3]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[0]</td></tr>
          <tr><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>In Progress</span></td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[3]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>[2]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>[1]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>[0]</td></tr>
          <tr><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Complete</span></td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[2]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[1]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[0]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[1]</td></tr>
          <tr><td style={{ ...S.tdAlt, fontWeight: 800 }}>TOTAL</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 800 }}>[8]</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[3]</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[4]</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[1]</td></tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Overdue Items</td><td style={S.td0}>[1] item overdue by [3] days — approaching escalation threshold</td></tr>
          <tr><td style={S.tdLabelAlt}>Completion Rate</td><td style={S.tdAlt}>[25%] complete — [75%] open (target: close all High within 5 business days)</td></tr>
          <tr><td style={S.tdLabel}>Top Source</td><td style={S.td0}>[Status/CCB Meetings] — [5] of [8] items originated from meetings</td></tr>
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
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderAging()}{renderSummary()}{renderFooter()}</>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Target size={11} /> Actions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Target size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Action Item Tracker</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Monitoring & Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Central action item register with aging analysis and summary dashboard. Full Tracker includes aging and summary; Quick Tracker shows the register only.</p>
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

export default function ActionItemTrackerPage() {
  return (<ThemeProvider><ActionItemTrackerContent /></ThemeProvider>);
}
