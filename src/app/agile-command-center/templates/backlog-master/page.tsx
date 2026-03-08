"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Layers, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Backlog", desc: "Epics + stories + detail", icon: LayoutDashboard },
  { id: "compact", label: "Story List", desc: "Flat story view", icon: AlignJustify },
];

function BacklogMasterContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const epicsRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📋 BACKLOG MASTER (EPICS / FEATURES / STORIES)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Product Owner</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Total Items</td><td style={S.tdAlt}>[## Epics / ## Stories]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const epicCard = (id: string, title: string, color: string, status: string, sBg: string, sFg: string, stories: { id: string; story: string; pts: string; pri: string; pBg: string; pFg: string; sprint: string; st: string; stBg: string; stFg: string }[]) => (
    <table style={S.tbl}>
      <thead>
        <tr><td colSpan={6} style={{ backgroundColor: color, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{id}: {title} <span style={{ float: "right" as const }}><span style={{ ...S.badge(sBg, sFg), fontSize: "10px" }}>{status}</span></span></td></tr>
        <tr>
          <th style={{ ...S.thSecondary, width: "8%" }}>ID</th>
          <th style={S.thSecondary}>User Story</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Sprint</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {stories.map((s, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: color }}>{s.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.story}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{s.pts}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.pBg, s.pFg)}>{s.pri}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{s.sprint}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.stBg, s.stFg)}>{s.st}</span></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderEpics = () => (
    <div ref={epicsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🏗️ EPICS &amp; STORIES</div>
      <CopyButton targetRef={epicsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Organize your backlog by Epic → Stories. Each story should be small enough to complete in one sprint.</p>

      <div style={{ marginBottom: "8px" }}>
        {epicCard("E-001", "[Checkout Flow v2]", accentDark, "In Progress", C.badgeAmberBg, C.badgeAmberFg, [
          { id: "S-001", story: "[As a shopper, I want to checkout in 2 steps so I can buy faster]", pts: "5", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "Sprint 7", st: "Done", stBg: C.badgeGreenBg, stFg: C.badgeGreenFg },
          { id: "S-002", story: "[As a shopper, I want to save my address so I don\u2019t retype it]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, sprint: "Sprint 8", st: "In Dev", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
          { id: "S-003", story: "[As a shopper, I want order confirmation via email + in-app]", pts: "2", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "Sprint 8", st: "Ready", stBg: C.badgeBlueBg, stFg: C.badgeBlueFg },
          { id: "S-004", story: "[Add story]", pts: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, sprint: "", st: "—", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
        ])}
      </div>
      <div style={{ marginBottom: "8px" }}>
        {epicCard("E-002", "[Payment Gateway Integration]", "#0891B2", "Planned", C.badgeBlueBg, C.badgeBlueFg, [
          { id: "S-010", story: "[As a shopper, I want to pay with Apple Pay]", pts: "5", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "Sprint 8", st: "In Dev", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
          { id: "S-011", story: "[As a shopper, I want to pay with Google Pay]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, sprint: "Sprint 9", st: "Ready", stBg: C.badgeBlueBg, stFg: C.badgeBlueFg },
          { id: "S-012", story: "[As a shopper, I want clear error messages for failed payments]", pts: "3", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "Sprint 9", st: "Backlog", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
          { id: "S-013", story: "[Add story]", pts: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, sprint: "", st: "—", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
        ])}
      </div>
      <div>
        {epicCard("E-003", "[Add Epic]", "#6B7280", "Backlog", C.badgeGrayBg, C.badgeGrayFg, [
          { id: "S-020", story: "[Add story]", pts: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, sprint: "", st: "—", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
          { id: "S-021", story: "[Add story]", pts: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, sprint: "", st: "—", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
        ])}
      </div>
    </div>
  );

  const renderStories = () => (
    <div ref={storiesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 FLAT STORY LIST (ALL EPICS)</div>
      <CopyButton targetRef={storiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "7%" }}>ID</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Epic</th>
          <th style={S.thPrimary}>Story</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Sprint</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-001", epic: "E-001", story: "[2-step checkout]", pts: "5", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "7", st: "Done", stBg: C.badgeGreenBg, stFg: C.badgeGreenFg },
            { id: "S-002", epic: "E-001", story: "[Save address]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, sprint: "8", st: "In Dev", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
            { id: "S-003", epic: "E-001", story: "[Order confirmation]", pts: "2", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "8", st: "Ready", stBg: C.badgeBlueBg, stFg: C.badgeBlueFg },
            { id: "S-010", epic: "E-002", story: "[Apple Pay]", pts: "5", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "8", st: "In Dev", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
            { id: "S-011", epic: "E-002", story: "[Google Pay]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, sprint: "9", st: "Ready", stBg: C.badgeBlueBg, stFg: C.badgeBlueFg },
            { id: "S-012", epic: "E-002", story: "[Payment error messages]", pts: "3", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, sprint: "9", st: "Backlog", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
            { id: "[Add]", epic: "", story: "", pts: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, sprint: "", st: "—", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.epic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.sprint}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.stBg, r.stFg)}>{r.st}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 BACKLOG HEALTH SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Total Stories", value: "[21]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Ready for Sprint", value: "[8]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "In Progress", value: "[4]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Done", value: "[6]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Unrefined", value: "[3]", color: C.badgeRedBg, fg: C.badgeRedFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderEpics()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderStories()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Layers size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Backlog Master</h2><p className="text-xs font-medium text-red-600">⭐ All-Star &mdash; Epics, Features &amp; Stories — Your Single Source of Truth</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Organize your entire backlog by Epic → Stories with priority, points, sprint assignment, and status. Two views: Epic cards or flat list.</p>
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
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BacklogMasterPage() { return <ThemeProvider><BacklogMasterContent /></ThemeProvider>; }
