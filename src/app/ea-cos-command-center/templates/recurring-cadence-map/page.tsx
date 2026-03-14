"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RefreshCw, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "All cadences + health check + audit", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Cadence table only", icon: AlignJustify },
];

function RecurringCadenceContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const cadenceRef = useRef<HTMLDivElement>(null);
  const auditRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RECURRING MEETING CADENCE MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderCadence = () => (
    <div ref={cadenceRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ALL RECURRING MEETINGS</div>
      <CopyButton targetRef={cadenceRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Master list of all recurring meetings. Review quarterly &mdash; cancel what no longer serves the exec.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Meeting Name</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Day / Time</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Duration</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Exec Must Attend?</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Leadership Team Sync]", cad: "Weekly", day: "Mon 9am", dur: "60 min", owner: "[CEO]", must: "Yes", health: "Good", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
            { name: "[1:1 with CFO]", cad: "Weekly", day: "Tue 10am", dur: "30 min", owner: "[CEO]", must: "Yes", health: "Good", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
            { name: "[All-Hands]", cad: "Monthly", day: "1st Fri 2pm", dur: "60 min", owner: "[HR]", must: "Yes", health: "Good", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
            { name: "[Cross-Functional Ops Sync]", cad: "Weekly", day: "Wed 11am", dur: "45 min", owner: "[COO]", must: "Optional", health: "Review", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { name: "[Marketing Status Update]", cad: "Bi-Weekly", day: "Thu 3pm", dur: "30 min", owner: "[CMO]", must: "No", health: "Cancel?", hBg: C.badgeRedBg, hFg: C.badgeRedFg },
            { name: "[Board Prep]", cad: "Monthly", day: "3rd Wed 1pm", dur: "90 min", owner: "[CoS]", must: "Yes", health: "Good", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
            { name: "[Steering Committee]", cad: "Bi-Weekly", day: "Fri 10am", dur: "60 min", owner: "[PMO]", must: "Yes", health: "Good", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
            { name: "[Skip-Level 1:1s]", cad: "Monthly", day: "Rotating", dur: "30 min", owner: "[CEO]", must: "Yes", health: "Good", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", color: accent, fontWeight: 700 }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.must}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.health}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>Total Recurring Hours / Week</td><td style={{ ...S.td0, fontWeight: 800, color: accent }}>[~8.5 hrs/week] across [8 recurring meetings]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Audit Date</td><td style={S.tdAlt}>[MM/DD/YYYY] &mdash; Next audit: [MM/DD/YYYY]</td></tr>
      </tbody></table>
    </div>
  );

  const renderAudit = () => (
    <div ref={auditRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>QUARTERLY AUDIT QUESTIONS</div>
      <CopyButton targetRef={auditRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          "Does each recurring meeting still have a clear purpose and outcome?",
          "Can the exec delegate attendance for any of these?",
          "Are any meetings consistently cancelled or half-attended?",
          "Can any bi-weekly meetings move to monthly?",
          "Are there meetings that could be replaced by async updates?",
          "Is there overlap between any recurring meetings?",
          "Do all recurring meetings have agendas and action tracking?",
        ].map((q, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", padding: "8px 14px" }}><span style={{ marginRight: "8px" }}>&#9744;</span>{q}</td></tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><RefreshCw size={11} />Cadence</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><RefreshCw size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Recurring Meeting Cadence Map</h2><p className="text-xs font-medium text-sky-600">All Recurring Meetings &mdash; Health Check &amp; Audit</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Master list of all recurring meetings with health status. Audit quarterly to reclaim the exec&apos;s time.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderCadence()}{renderAudit()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCadence()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RecurringCadenceMapPage() { return <ThemeProvider><RecurringCadenceContent /></ThemeProvider>; }
