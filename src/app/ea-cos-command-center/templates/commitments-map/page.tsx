"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, GitBranch, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "All commitments + at-risk + closed", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Active commitments only", icon: AlignJustify },
];

function CommitmentsMapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const atRiskRef = useRef<HTMLDivElement>(null);

  const accent = "#EF4444";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WHO OWES WHO WHAT? &mdash; COMMITMENTS MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Stakeholders &amp; Relationships</td></tr>
    </tbody></table>
  );

  const renderActive = () => (
    <div ref={activeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>ACTIVE CROSS-TEAM COMMITMENTS</td></tr></tbody></table>
      <CopyButton targetRef={activeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Cross-team commitments and dependencies. Prevents dropped handoffs.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Commitment</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>To</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Direction</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due Date</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { commit: "[Deliver Q2 forecast model]", from: "[CFO]", to: "[CEO]", dir: "They owe us", due: "03/20", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { commit: "[Send partnership term sheet]", from: "[CEO]", to: "[Partner CEO]", dir: "We owe them", due: "03/18", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { commit: "[Provide legal review of contract]", from: "[External Counsel]", to: "[CEO]", dir: "They owe us", due: "03/22", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { commit: "[Submit board deck final version]", from: "[CEO]", to: "[Board Chair]", dir: "We owe them", due: "03/25", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { commit: "[Headcount approval decision]", from: "[CFO]", to: "[CHRO]", dir: "They owe them", due: "03/15", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { commit: "[Sales pipeline update]", from: "[VP Sales]", to: "[CEO]", dir: "They owe us", due: "03/17", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const dirColor = r.dir === "We owe them" ? "#DC2626" : r.dir === "They owe us" ? "#059669" : "#6B7280";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.commit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "8px", fontWeight: 800, color: dirColor }}>{r.dir}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAtRisk = () => (
    <div ref={atRiskRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>AT-RISK / OVERDUE COMMITMENTS</td></tr></tbody></table>
      <CopyButton targetRef={atRiskRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Active Commitments</td><td style={{ ...S.td0, fontWeight: 800, color: accent }}>[6]</td></tr>
        <tr><td style={S.tdLabelAlt}>We Owe Others</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#DC2626" }}>[2 commitments]</td></tr>
        <tr><td style={S.tdLabel}>Others Owe Us</td><td style={{ ...S.td0, fontWeight: 700, color: "#059669" }}>[3 commitments]</td></tr>
        <tr><td style={S.tdLabelAlt}>Overdue</td><td style={{ ...S.tdAlt, fontWeight: 800, color: "#DC2626" }}>[1 commitment &mdash; needs immediate follow-up]</td></tr>
        <tr><td style={S.tdLabel}>At Risk</td><td style={{ ...S.td0, fontWeight: 700, color: "#D97706" }}>[1 commitment &mdash; term sheet to Partner CEO by 03/18]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><GitBranch size={11} />Commitments</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><GitBranch size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">&ldquo;Who Owes Who What?&rdquo; Commitments Map</h2><p className="text-xs font-medium text-red-600">Cross-Team Commitments &amp; Dependencies</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Cross-team commitments and dependencies tracked in one place. Prevents dropped handoffs.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderActive()}{renderAtRisk()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderActive()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CommitmentsMapPage() { return <ThemeProvider><CommitmentsMapContent /></ThemeProvider>; }
