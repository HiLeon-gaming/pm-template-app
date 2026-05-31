"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Decisions + context + impact", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decisions table only", icon: AlignJustify },
];

function DecisionLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⚖️ DECISION LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Logs &amp; Follow-Up</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project / Team</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Project Name / Team]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Owner</td><td colSpan={3} style={S.tdAlt}>[PM / Team Lead — responsible for maintaining this log]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Context / Rationale</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Meeting</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Impact</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/05]", dec: "[Use React + Next.js for frontend rebuild]", ctx: "[Evaluated 3 frameworks — React won on team skills + ecosystem]", by: "[CTO]", meeting: "[Arch Review]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg },
            { date: "[03/04]", dec: "[Delay mobile app to Phase 2]", ctx: "[Resources needed for core platform — mobile can wait]", by: "[VP Product]", meeting: "[Steering]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg },
            { date: "[03/03]", dec: "[Hire 2 contractors for QA]", ctx: "[Internal QA team at capacity — need help for UAT]", by: "[PM + Sponsor]", meeting: "[Budget Review]", impact: "Medium", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg },
            { date: "[03/01]", dec: "[Use Stripe for payment processing]", ctx: "[Best API docs, team familiarity, competitive pricing]", by: "[Tech Lead]", meeting: "[Sprint Planning]", impact: "Medium", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg },
            { date: "[02/28]", dec: "[2-week sprints instead of 3-week]", ctx: "[Team feedback — 3 weeks too long for feedback loops]", by: "[Scrum Master]", meeting: "[Retro]", impact: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg },
            { date: "[ ]", dec: "[ ]", ctx: "[ ]", by: "[ ]", meeting: "[ ]", impact: " ", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accentDark }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.ctx}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.impact.trim() ? <span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span> : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPending = () => (
    <div ref={pendingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⏳ PENDING DECISIONS</td></tr></tbody></table>
      <CopyButton targetRef={pendingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Decision Needed</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Needed By</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Decision Maker</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Options</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Urgency</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "[Choose hosting provider — AWS vs GCP vs Azure]", by: "[03/15]", maker: "[CTO]", options: "[AWS (preferred), GCP, Azure]", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
            { dec: "[Approve additional $20K for contractor extension]", by: "[03/10]", maker: "[Sponsor]", options: "[Approve, Reject, Partial]", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
            { dec: "[Select design system — Material UI vs Chakra]", by: "[03/20]", maker: "[Tech Lead]", options: "[MUI (team vote), Chakra]", urg: "Medium", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.maker}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.options}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.uBg, r.uFg)}>{r.urg}</span></td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Scale size={11} />Decisions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Scale size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision Log</h2><p className="text-xs font-medium text-teal-600">Decisions Made &bull; Context &bull; Pending Decisions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Running log of all decisions from meetings. Track rationale, who decided, impact level, and pending decisions needing resolution.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderPending()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionLogPage() { return <ThemeProvider><DecisionLogContent /></ThemeProvider>; }
