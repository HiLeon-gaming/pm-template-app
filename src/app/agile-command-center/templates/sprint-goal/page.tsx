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
  { id: "full", label: "Full View", desc: "Goal + backlog + scope", icon: LayoutDashboard },
  { id: "compact", label: "Goal Only", desc: "Sprint goal + backlog", icon: AlignJustify },
];

function SprintGoalContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);
  const backlogRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🎯 SPRINT GOAL + SPRINT BACKLOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Sprint Planning &amp; Commitments</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint # — Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Dates</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD – MM/DD]</td></tr>
        <tr><td style={S.tdLabelAlt}>Team</td><td style={S.tdAlt}>[Team Name]</td><td style={S.tdLabelAlt}>Capacity</td><td style={S.tdAlt}>[## pts committed]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGoal = () => (
    <div ref={goalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 SPRINT GOAL</div>
      <CopyButton targetRef={goalRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ backgroundColor: accent + "15", padding: "16px", fontFamily: S.font, fontSize: "14px", fontWeight: 700, border: `2px solid ${accent}40`, color: C.primary, textAlign: "center" as const }}>
          [e.g., Complete checkout v2 core flow with Apple Pay and error handling — ready for internal QA]
        </td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Success Definition</td><td style={S.td0}>[e.g., PO can demo full checkout with Apple Pay end-to-end in staging environment]</td></tr>
        <tr><td style={S.tdLabelAlt}>Aligned to Roadmap</td><td style={S.tdAlt}>[e.g., NOW horizon — Checkout Flow v2 initiative]</td></tr>
        <tr><td style={S.tdLabel}>Key Metric Impact</td><td style={S.td0}>[e.g., Moves us toward 15% conversion lift target]</td></tr>
      </tbody></table>
    </div>
  );

  const renderBacklog = () => (
    <div ref={backlogRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📋 SPRINT BACKLOG</div>
      <CopyButton targetRef={backlogRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>ID</th>
          <th style={S.thPrimary}>Story</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-002", story: "[Save address for returning users]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, own: "[Dev 1]", s: "To Do", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "S-003", story: "[Order confirmation email + in-app]", pts: "2", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, own: "[Dev 2]", s: "To Do", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "S-010", story: "[Apple Pay integration]", pts: "5", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, own: "[Dev 1]", s: "In Dev", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { id: "S-012a", story: "[Payment error display]", pts: "2", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, own: "[Dev 3]", s: "To Do", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "S-012b", story: "[Payment retry logic]", pts: "3", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, own: "[Dev 3]", s: "To Do", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "S-014", story: "[Analytics event tracking]", pts: "3", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, own: "[Dev 2]", s: "To Do", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "Spike", story: "[Shipping API investigation]", pts: "2", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, own: "[Dev 1]", s: "To Do", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "Bug", story: "[Bug fixes from Sprint 7]", pts: "3", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, own: "[Team]", s: "To Do", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "[Add]", story: "", pts: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, own: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
          <tr><td colSpan={2} style={{ ...S.tdLabel, textAlign: "right" as const, fontWeight: 800 }}>TOTAL</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>[23 pts]</td><td colSpan={3}></td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderScope = () => (
    <div ref={scopeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📦 IN / OUT OF SPRINT</div>
      <CopyButton targetRef={scopeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: accent, color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ IN THIS SPRINT</td></tr></thead>
            <tbody>
              {["Checkout v2 core flow", "Apple Pay integration", "Payment error handling + retry", "Analytics event tracking", "Sprint 7 bug fixes", "Shipping API spike"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🚫 NOT THIS SPRINT</td></tr></thead>
            <tbody>
              {["Google Pay (Sprint 9)", "Saved payment methods (Sprint 10)", "Order tracking page (needs spike first)", "International payments (Phase 2)", "Native mobile app (separate project)", "Loyalty program integration (backlog)"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Target size={11} />Sprint Goal</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Target size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Goal + Sprint Backlog</h2><p className="text-xs font-medium text-emerald-600">Clear Goal + What&apos;s In/Out + Success Definition</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Clear sprint goal with backlog, scope boundaries, and success definition. Keeps the sprint focused and aligned.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderGoal()}{renderBacklog()}{renderScope()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderGoal()}{renderBacklog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintGoalPage() { return <ThemeProvider><SprintGoalContent /></ThemeProvider>; }
