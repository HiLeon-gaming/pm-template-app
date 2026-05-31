"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertTriangle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Issues + context + navigation tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Issues list only", icon: AlignJustify },
];

function StakeholderSensitivitiesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EF4444";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER ISSUES &amp; SENSITIVITIES LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Stakeholders &amp; Relationships</td></tr>
    </tbody></table>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>ACTIVE SENSITIVITIES &amp; LANDMINES</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Landmines, history, context, and how to navigate. Protects the exec from avoidable missteps.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Sensitivity / Issue</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Context / History</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>How to Navigate</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Board Chair]", issue: "[Unhappy with pace of digital transformation]", context: "[Raised concerns at last 2 board meetings]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, nav: "[Lead with progress metrics; acknowledge delay transparently]" },
            { name: "[CFO]", issue: "[Frustrated with headcount requests without ROI]", context: "[Rejected 3 hiring requests last quarter]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, nav: "[Always attach business case with ROI to hiring asks]" },
            { name: "[VP Sales]", issue: "[Feels sidelined from strategy discussions]", context: "[Wasn&apos;t invited to last planning session]", sev: "Med", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, nav: "[Include in quarterly planning; send advance agenda]" },
            { name: "[External Counsel]", issue: "[Slow response time on contract reviews]", context: "[Two contracts delayed in Q1]", sev: "Low", sevBg: C.badgeBlueBg, sevFg: C.badgeBlueFg, nav: "[Set expectations early; send docs 2 weeks before deadline]" },
            { name: "[Lead Investor]", issue: "[Concerned about burn rate]", context: "[Monthly burn is 15% above forecast]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, nav: "[Proactively share mitigation plan before next update]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.issue}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.context}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.nav}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6B7280")}>NAVIGATION PRINCIPLES</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          "Never surprise a stakeholder with bad news in a group setting",
          "Pre-brief the exec before any meeting where a sensitivity might surface",
          "Update this log after every significant stakeholder interaction",
          "Share relevant sensitivities with the exec before 1:1s and key meetings",
          "When in doubt, address concerns proactively rather than waiting for them to escalate",
        ].map((tip, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", padding: "8px 14px" }}><strong style={{ color: accent, marginRight: "8px" }}>{i + 1}.</strong> {tip}</td></tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><AlertTriangle size={11} />Sensitivities</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><AlertTriangle size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Issues &amp; Sensitivities Log</h2><p className="text-xs font-medium text-red-600">Landmines, History &amp; How to Navigate</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track sensitivities, past conflicts, and navigation strategies. Protects the exec from missteps.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderLog()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderSensitivitiesPage() { return <ThemeProvider><StakeholderSensitivitiesContent /></ThemeProvider>; }
