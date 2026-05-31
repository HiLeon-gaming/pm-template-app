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
  { id: "full", label: "Full Tracker", desc: "Issues + impact + escalation", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Active issues only", icon: AlignJustify },
];

function IssuesBlockersContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const issuesRef = useRef<HTMLDivElement>(null);
  const escRef = useRef<HTMLDivElement>(null);

  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⚠️ ISSUES / BLOCKERS CAPTURE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Meeting Prep &amp; Execution</td></tr>
    </tbody></table>
  );

  const renderIssues = () => (
    <div ref={issuesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🚧 ACTIVE ISSUES &amp; BLOCKERS</td></tr></tbody></table>
      <CopyButton targetRef={issuesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Issue / Blocker</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Impact if Not Resolved</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Next Update</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { issue: "[API team has not delivered integration spec — blocks development]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, impact: "[2-week delay to launch]", owner: "[Tech Lead]", next: "[03/07]", s: "Blocked", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { issue: "[Vendor contract approval stuck in legal review]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, impact: "[Cannot start migration]", owner: "[You]", next: "[03/06]", s: "Escalated", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { issue: "[Test environment down — QA cannot validate]", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, impact: "[QA delayed 2-3 days]", owner: "[DevOps]", next: "[03/06]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { issue: "[Budget approval needed for additional cloud resources]", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, impact: "[Performance risk]", owner: "[Finance]", next: "[03/10]", s: "Open", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { issue: "[Key team member on unexpected leave — coverage gap]", sev: "Low", sevBg: C.badgeGreenBg, sevFg: C.badgeGreenFg, impact: "[Minor slowdown]", owner: "[You]", next: "[03/08]", s: "Monitoring", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.issue}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.next}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📢 ESCALATION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={escRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Escalated To</td><td style={S.td0}>[VP Engineering / CFO / Sponsor — name + date]</td></tr>
        <tr><td style={S.tdLabelAlt}>What Was Asked</td><td style={S.tdAlt}>[Specific ask: approval, resource, decision, intervention]</td></tr>
        <tr><td style={S.tdLabel}>Response / Decision</td><td style={S.td0}>[What was decided or when to expect a response]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Step</td><td style={S.tdAlt}>[Follow up by date X if no response]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><AlertTriangle size={11} />Prep & Execution</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><AlertTriangle size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Issues / Blockers Capture</h2><p className="text-xs font-medium text-blue-600">What&apos;s Stuck, Who Owns It, When It&apos;s Due</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track what&apos;s stuck, the impact, who owns removing it, and the next update date. Meetings should unblock work.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderIssues()}{renderEscalation()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderIssues()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function IssuesBlockersPage() { return <ThemeProvider><IssuesBlockersContent /></ThemeProvider>; }
