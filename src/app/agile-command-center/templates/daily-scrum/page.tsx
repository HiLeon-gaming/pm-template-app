"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, MessageCircle, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full View", desc: "Notes + impediments + decisions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Team updates only", icon: AlignJustify },
];

function DailyScrumContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const impedimentsRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);

  const accent = "#0891B2"; const accentDark = "#0E7490";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🗣️ DAILY SCRUM NOTES + IMPEDIMENT LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Daily Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint Day</td><td style={S.tdAlt}>[Day # of 10]</td><td style={S.tdLabelAlt}>Sprint Goal</td><td style={S.tdAlt}>[One-line sprint goal]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>👥 TEAM UPDATES</div>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "14%" }}>Team Member</th>
          <th style={S.thPrimary}>Yesterday</th>
          <th style={S.thPrimary}>Today</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Blockers</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Sarah — Dev 1]", y: "[Completed Apple Pay SDK integration; passed unit tests]", t: "[Start Apple Pay UI component; code review for S-003]", b: "[None]" },
            { name: "[Mike — Dev 2]", y: "[Order confirmation email template done; in QA]", t: "[Start analytics event tracking S-014]", b: "[Waiting for analytics API key — asked DevOps]" },
            { name: "[Priya — Dev 3]", y: "[Payment error display component — 80% done]", t: "[Finish error display; start retry logic S-012b]", b: "[None]" },
            { name: "[Alex — QA]", y: "[Tested S-003 order confirmation — 2 minor bugs found]", t: "[Retest S-003 fixes; start Apple Pay test plan]", b: "[Test environment slow — DevOps aware]" },
            { name: "[Add member]", y: "", t: "", b: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px", color: accent }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.y}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.t}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: r.b === "[None]" ? C.textMuted : "#DC2626", fontWeight: r.b === "[None]" ? 400 : 600 }}>{r.b}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderImpediments = () => (
    <div ref={impedimentsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🚧 IMPEDIMENT LOG</div>
      <CopyButton targetRef={impedimentsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Impediment</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Next Step</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { imp: "[Analytics API key not provided by DevOps — blocking S-014]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, own: "[SM]", next: "[SM to escalate to DevOps lead today]", s: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { imp: "[Test environment slow — affecting QA throughput]", impact: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg, own: "[DevOps]", next: "[DevOps investigating; ETA tomorrow]", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { imp: "[Vendor sandbox access delayed for shipping API]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, own: "[SM]", next: "[Spike deferred to Sprint 9; no sprint impact]", s: "Mitigated", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { imp: "[Add impediment]", impact: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, own: "", next: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.imp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.next}</td>
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
      <div style={S.sectionBanner(accent)}>⚡ DECISIONS &amp; PARKING LOT</div>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Item</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[Decided: Use Mixpanel for analytics events (not GA4)]", type: "Decision", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, own: "[PO]", due: "Done" },
            { item: "[Park: Discuss mobile-specific checkout flow in next refinement]", type: "Parking Lot", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, own: "[PO]", due: "[Next refine]" },
            { item: "[Action: Send sprint scope change request to stakeholders]", type: "Action", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, own: "[SM]", due: "[Today]" },
            { item: "[Add item]", type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, own: "", due: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.due}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><MessageCircle size={20} className="text-cyan-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Daily Scrum Notes + Impediment Log</h2><p className="text-xs font-medium text-cyan-600">⭐ All-Star &mdash; Simplest Daily Momentum System</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Yesterday / today / blockers for each team member, plus impediment tracking and daily decisions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderImpediments()}{renderDecisions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DailyScrumPage() { return <ThemeProvider><DailyScrumContent /></ThemeProvider>; }
