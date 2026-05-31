"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Building2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "Agenda + discussion + decisions + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Agenda + decisions only", icon: AlignJustify },
];

function BoardLeadershipContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const discussionRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🏛️ BOARD / LEADERSHIP MEETING</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Executive &amp; Leadership</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Monthly Leadership / Board Meeting]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Chair</td><td style={S.tdAlt}>[CEO / Chair Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[90 minutes]</td></tr>
        <tr><td style={S.tdLabel}>Attendees</td><td colSpan={3} style={S.td0}>[Board members / Leadership team — names and titles]</td></tr>
        <tr><td style={S.tdLabelAlt}>Quorum?</td><td style={S.tdAlt}>[Yes / No — [X] of [Y] present]</td><td style={S.tdLabelAlt}>Minutes By</td><td style={S.tdAlt}>[Secretary / EA Name]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 AGENDA</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Topic</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Presenter</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Pre-Read</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "[Call to order + approval of previous minutes]", type: "Admin", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, presenter: "[Chair]", time: "5 min", preread: "[\u2014]" },
            { topic: "[CEO / GM report — business performance overview]", type: "Report", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, presenter: "[CEO]", time: "15 min", preread: "[CEO Report — pg 3-8]" },
            { topic: "[Financial report — P&L, budget vs. actual]", type: "Report", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, presenter: "[CFO]", time: "15 min", preread: "[Financial Pack — pg 9-15]" },
            { topic: "[Strategic initiative update — Project Alpha]", type: "Discussion", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, presenter: "[VP Strategy]", time: "20 min", preread: "[Strategy Brief — pg 16-20]" },
            { topic: "[Hiring plan approval — Q2 headcount]", type: "Decision", tBg: C.badgeRedBg, tFg: C.badgeRedFg, presenter: "[CHRO]", time: "10 min", preread: "[Headcount Proposal]" },
            { topic: "[Risk & compliance update]", type: "Report", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, presenter: "[CLO]", time: "10 min", preread: "[Risk Register]" },
            { topic: "[Any other business + next meeting date]", type: "Admin", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, presenter: "[Chair]", time: "5 min", preread: "[\u2014]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.presenter}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.preread}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDiscussion = () => (
    <div ref={discussionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>💬 DISCUSSION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={discussionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>Item</th>
          <th style={S.thSecondary}>Key Points Discussed</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Speaker</th>
        </tr></thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => {
            const bg = i % 2 === 0 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Key points from agenda item {i}]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Speaker name]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ DECISIONS &amp; ACTION ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Item</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Decision", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, item: "[Q2 headcount plan approved — 5 new roles]", owner: "[CHRO]", due: "[Immediate]" },
            { type: "Decision", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, item: "[Project Alpha budget increased by $100K]", owner: "[CFO]", due: "[Immediate]" },
            { type: "Action", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, item: "[Prepare vendor shortlist for board review]", owner: "[VP Ops]", due: "[04/15]" },
            { type: "Action", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, item: "[Update risk register with new compliance item]", owner: "[CLO]", due: "[03/20]" },
            { type: "Follow-Up", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, item: "[Schedule deep-dive on M&A opportunity]", owner: "[CEO]", due: "[03/25]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Minutes Circulated By</td><td style={S.td0}>[Secretary — within 48 hours]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Meeting</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Date / Time / Location]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Building2 size={11} />Board</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Building2 size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Board / Leadership Meeting</h2><p className="text-xs font-medium text-violet-600">Formal Agenda &bull; Discussion Notes &bull; Decisions &bull; Actions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Formal board or leadership meeting template with structured agenda, discussion notes, decisions, and action items with owners.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderDiscussion()}{renderDecisions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderDecisions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BoardLeadershipPage() { return <ThemeProvider><BoardLeadershipContent /></ThemeProvider>; }
