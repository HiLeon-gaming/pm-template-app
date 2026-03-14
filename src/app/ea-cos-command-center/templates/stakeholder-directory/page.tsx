"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Directory", desc: "All contacts + cadence + notes", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Name + role + importance", icon: AlignJustify },
];

function StakeholderDirectoryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef<HTMLDivElement>(null);

  const accent = "#EF4444";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER DIRECTORY</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Stakeholders &amp; Relationships</td></tr>
    </tbody></table>
  );

  const renderDir = () => (
    <div ref={dirRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>KEY STAKEHOLDERS</div>
      <CopyButton targetRef={dirRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Quick-reference directory of everyone the exec regularly engages with.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Name</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Title / Role</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Organization</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Importance</th>
          {layout === "full" && <th style={{ ...S.thPrimary, width: "12%" }}>Preference</th>}
          {layout === "full" && <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Cadence</th>}
          {layout === "full" && <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Last Touch</th>}
        </tr></thead>
        <tbody>
          {[
            { name: "[Board Chair]", title: "Chair of the Board", org: "[Board]", imp: "Critical", iBg: C.badgeRedBg, iFg: C.badgeRedFg, pref: "[Brief emails, no jargon]", cad: "Monthly", last: "03/10" },
            { name: "[Lead Investor]", title: "Managing Partner", org: "[VC Firm]", imp: "Critical", iBg: C.badgeRedBg, iFg: C.badgeRedFg, pref: "[Data-driven, concise]", cad: "Bi-Weekly", last: "03/08" },
            { name: "[CFO]", title: "Chief Financial Officer", org: "[Internal]", imp: "High", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, pref: "[Spreadsheets, morning]", cad: "Weekly", last: "03/14" },
            { name: "[CHRO]", title: "Chief HR Officer", org: "[Internal]", imp: "High", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, pref: "[Slack, quick calls]", cad: "Weekly", last: "03/12" },
            { name: "[VP Sales]", title: "VP of Sales", org: "[Internal]", imp: "Medium", iBg: C.badgeBlueBg, iFg: C.badgeBlueFg, pref: "[Text, fast replies]", cad: "Bi-Weekly", last: "03/05" },
            { name: "[External Counsel]", title: "Partner", org: "[Law Firm]", imp: "High", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, pref: "[Formal emails]", cad: "As needed", last: "03/01" },
            { name: "[Vendor X CEO]", title: "CEO", org: "[Vendor X]", imp: "Medium", iBg: C.badgeBlueBg, iFg: C.badgeBlueFg, pref: "[Phone calls]", cad: "Monthly", last: "02/28" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.title}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.org}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.imp}</span></td>
                {layout === "full" && <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.pref}</td>}
                {layout === "full" && <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.cad}</td>}
                {layout === "full" && <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", color: accent, fontWeight: 700 }}>{r.last}</td>}
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Users size={11} />Directory</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Users size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Directory</h2><p className="text-xs font-medium text-red-600">Quick List &mdash; Who Matters &amp; How to Reach Them</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Name, role, org, importance, preferences, cadence. Simple directory for fast reference.</p>
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
          {renderTitleBanner()}{renderDir()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderDirectoryPage() { return <ThemeProvider><StakeholderDirectoryContent /></ThemeProvider>; }
