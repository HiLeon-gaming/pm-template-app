"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListChecks, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "All actions + overdue + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Tracker", desc: "Open actions only", icon: AlignJustify },
];

function ActionTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>✅ ACTION ITEM TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Logs &amp; Follow-Up</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Owner</td><td style={{ ...S.td0, width: "32%" }}>[Your Name / Team]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Scope</td><td colSpan={3} style={S.tdAlt}>[All meetings / Project X / 1:1s only]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 ACTION ITEMS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action Item</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Source Meeting</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Fix test environment — restore staging server]", src: "[Standup 03/03]", owner: "[DevOps]", due: "[03/07]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, notes: "[ETA tomorrow AM]" },
            { action: "[Send sprint 12 recap to stakeholders]", src: "[Sprint review]", owner: "[PM]", due: "[03/05]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Sent 03/05]" },
            { action: "[Schedule load test for API v2]", src: "[Exec update]", owner: "[QA Lead]", due: "[03/10]", pri: "Medium", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "[Waiting on env fix]" },
            { action: "[Create training plan for Sarah]", src: "[1:1 — 03/03]", owner: "[You]", due: "[03/08]", pri: "Medium", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, notes: "[Draft 50% done]" },
            { action: "[Review vendor pricing proposal]", src: "[Vendor call]", owner: "[Procurement]", due: "[03/12]", pri: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "[Awaiting revised quote]" },
            { action: "[Update risk register with new item]", src: "[Steering 03/01]", owner: "[PM]", due: "[03/04]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg, notes: "[Was due 03/04 — do today]" },
            { action: "[Share brainstorm results with design team]", src: "[Workshop 03/05]", owner: "[PM]", due: "[03/06]", pri: "Medium", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "" },
            { action: "[ ]", src: "[ ]", owner: "[ ]", due: "[ ]", pri: " ", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, s: " ", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.src}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.pri.trim() ? <span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span> : ""}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.s.trim() ? <span style={S.badge(r.sBg, r.sFg)}>{r.s}</span> : ""}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 ACTION SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Actions</td><td style={{ ...S.td0, width: "28%", fontWeight: 700 }}>[7]</td><td style={{ ...S.tdLabel, width: "22%" }}>Completed</td><td style={{ ...S.td0, fontWeight: 700, color: "#059669" }}>[1 (14%)]</td></tr>
        <tr><td style={S.tdLabelAlt}>In Progress</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#3B82F6" }}>[2]</td><td style={S.tdLabelAlt}>Not Started</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>[3]</td></tr>
        <tr><td style={{ ...S.tdLabel, color: "#DC2626", fontWeight: 700 }}>Overdue</td><td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>[1 — risk register update]</td><td style={S.tdLabel}>Blocked</td><td style={S.td0}>[1 — load test waiting on env fix]</td></tr>
        <tr><td style={S.tdLabelAlt}>Actions by Owner</td><td colSpan={3} style={S.tdAlt}>[PM: 3, DevOps: 1, QA Lead: 1, Procurement: 1, You: 1]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><ListChecks size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Action Item Tracker</h2><p className="text-xs font-medium text-teal-600">⭐ All-Star &mdash; Track &bull; Prioritize &bull; Follow Up</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Central tracker for all meeting action items. Track source, owner, priority, status, and overdue items.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderActions()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ActionTrackerPage() { return <ThemeProvider><ActionTrackerContent /></ThemeProvider>; }
