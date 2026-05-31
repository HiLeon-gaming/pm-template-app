"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Status", desc: "Progress + blockers + risks + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Status", desc: "Progress + actions only", icon: AlignJustify },
];

function SprintStatusContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const blockersRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C"; const accentDark = "#C2410C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📊 SPRINT / ITERATION STATUS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Project &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Sprint / Iteration</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Sprint 12 / Iteration 5]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date Range</td><td style={S.tdAlt}>[03/03 — 03/14/2026]</td><td style={S.tdLabelAlt}>Meeting Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Overall Status</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[🟢 On Track / 🟡 At Risk / 🔴 Off Track]</td><td style={S.tdLabel}>Sprint Goal</td><td style={S.td0}>[One-sentence sprint goal]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderProgress = () => (
    <div ref={progressRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📈 DELIVERY PROGRESS</td></tr></tbody></table>
      <CopyButton targetRef={progressRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Work Item / Story</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Assignee</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Points</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[User authentication — login flow]", assignee: "[Dev 1]", pts: "5", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Completed ahead of schedule]" },
            { item: "[Dashboard — chart components]", assignee: "[Dev 2]", pts: "8", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, notes: "[70% complete — on track]" },
            { item: "[API integration — payments]", assignee: "[Dev 3]", pts: "8", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, notes: "[Waiting on API key from vendor]" },
            { item: "[Email notification service]", assignee: "[Dev 1]", pts: "3", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "[Scheduled for day 8]" },
            { item: "[Unit tests — auth module]", assignee: "[Dev 2]", pts: "3", s: "Blocked", sBg: C.badgeRedBg, sFg: C.badgeRedFg, notes: "[Waiting on test env fix]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.assignee}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Points Committed</td><td style={{ ...S.td0, width: "12%", fontWeight: 700 }}>[27]</td><td style={{ ...S.tdLabel, width: "22%" }}>Points Completed</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[5 / 27 = 19%]</td></tr>
      </tbody></table>
    </div>
  );

  const renderBlockers = () => (
    <div ref={blockersRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🚧 BLOCKERS &amp; RISKS</td></tr></tbody></table>
      <CopyButton targetRef={blockersRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Blocker / Risk</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Mitigation</th>
        </tr></thead>
        <tbody>
          {[
            { blocker: "[Test environment down — 2 days]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, impact: "[Blocks all QA testing]", owner: "[DevOps]", mit: "[Escalated — ETA tomorrow]" },
            { blocker: "[API vendor key delayed]", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, impact: "[Delays payment integration by 2 days]", owner: "[PM]", mit: "[Follow up today — have backup plan]" },
            { blocker: "[Design changes requested mid-sprint]", sev: "Low", sevBg: C.badgeGreenBg, sevFg: C.badgeGreenFg, impact: "[Minor rework — 4 hours]", owner: "[Design]", mit: "[Accepted — fits within capacity]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.blocker}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.mit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ ACTIONS &amp; DECISIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decisions Made</td><td style={S.td0}>[List any decisions from this status meeting]</td></tr>
        <tr><td style={S.tdLabelAlt}>Actions</td><td style={S.tdAlt}>[1) DevOps fix test env by EOD. 2) PM follow up on API key. 3) Team to flag scope changes immediately.]</td></tr>
        <tr><td style={S.tdLabel}>Scope Changes?</td><td style={S.td0}>[Any items added/removed from sprint? Document here.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Status</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Date / Time]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><BarChart3 size={11} />Sprint Status</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><BarChart3 size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint / Iteration Status</h2><p className="text-xs font-medium text-orange-600">Progress &bull; Blockers &bull; Risks &bull; Actions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track sprint progress with delivery status, blockers, risks, and action items. Clear visibility for the whole team.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderProgress()}{renderBlockers()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderProgress()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintStatusPage() { return <ThemeProvider><SprintStatusContent /></ThemeProvider>; }
