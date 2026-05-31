"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileEdit, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Request + impact + decision + log", icon: LayoutDashboard },
  { id: "compact", label: "Quick Review", desc: "Request + decision only", icon: AlignJustify },
];

function ChangeReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C"; const accentDark = "#C2410C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📝 CHANGE REVIEW / SCOPE CHANGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Project &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Requested By</td><td style={S.tdAlt}>[Name / Role]</td><td style={S.tdLabelAlt}>Priority</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Critical / High / Medium / Low]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRequest = () => (
    <div ref={requestRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 CHANGE REQUEST</td></tr></tbody></table>
      <CopyButton targetRef={requestRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Change Description</td><td style={S.td0}>[What is being requested? Be specific.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Business Justification</td><td style={S.tdAlt}>[Why is this change needed? What happens if we don’t do it?]</td></tr>
        <tr><td style={S.tdLabel}>Change Type</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Scope / Schedule / Budget / Resource / Requirements]</td></tr>
        <tr><td style={S.tdLabelAlt}>Affected Areas</td><td style={S.tdAlt}>[Which deliverables, teams, or milestones are affected?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderImpact = () => (
    <div ref={impactRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚡ IMPACT ANALYSIS</td></tr></tbody></table>
      <CopyButton targetRef={impactRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Impact Area</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Severity</th>
          <th style={S.thPrimary}>Details</th>
        </tr></thead>
        <tbody>
          {[
            { area: "Schedule Impact", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, details: "[Adds 2 weeks to timeline — pushes go-live from 06/01 to 06/15]" },
            { area: "Budget Impact", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, details: "[Additional $15K for developer time + QA]" },
            { area: "Scope Impact", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, details: "[3 new user stories, 15 additional story points]" },
            { area: "Resource Impact", sev: "Low", sevBg: C.badgeGreenBg, sevFg: C.badgeGreenFg, details: "[Existing team can absorb — no additional headcount]" },
            { area: "Risk Impact", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, details: "[Increases integration complexity — new risk added]" },
            { area: "Quality Impact", sev: "Low", sevBg: C.badgeGreenBg, sevFg: C.badgeGreenFg, details: "[Additional testing needed but manageable]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: accent }}>{r.area}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.details}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Recommendation</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Approve / Approve with conditions / Defer / Reject]</td></tr>
        <tr><td style={S.tdLabelAlt}>Conditions (if any)</td><td style={S.tdAlt}>[What conditions must be met for approval?]</td></tr>
        <tr><td style={S.tdLabel}>Decision</td><td style={{ ...S.td0, fontWeight: 800, fontSize: "12px", color: accentDark }}>[APPROVED / REJECTED / DEFERRED]</td></tr>
        <tr><td style={S.tdLabelAlt}>Decided By</td><td style={S.tdAlt}>[Name / Role — Date]</td></tr>
      </tbody></table>
    </div>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 CHANGE LOG (Running Record)</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Change</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Requested By</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Decision</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Impact</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/05]", change: "[Add PDF export to dashboard]", by: "[VP Product]", dec: "Approved", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg, impact: "[+2 weeks, +$15K]" },
            { date: "[02/20]", change: "[Remove mobile app from scope]", by: "[PM]", dec: "Approved", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg, impact: "[-3 weeks, -$25K]" },
            { date: "[02/10]", change: "[Add SSO authentication]", by: "[Security]", dec: "Deferred", dBg: C.badgeAmberBg, dFg: C.badgeAmberFg, impact: "[TBD — phase 2]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.change}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.dBg, r.dFg)}>{r.dec}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.impact}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><FileEdit size={11} />Change</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><FileEdit size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Change Review / Scope Change</h2><p className="text-xs font-medium text-orange-600">Request &bull; Impact Analysis &bull; Decision &bull; Log</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured change request with impact analysis across schedule, budget, scope, and resources. Includes running change log.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderRequest()}{renderImpact()}{renderLog()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderRequest()}{renderImpact()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ChangeReviewPage() { return <ThemeProvider><ChangeReviewContent /></ThemeProvider>; }
