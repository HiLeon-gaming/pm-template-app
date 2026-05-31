"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ArrowUpCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Request", desc: "Context + impact + ask", icon: LayoutDashboard },
  { id: "compact", label: "Quick Ask", desc: "Blocker + request only", icon: AlignJustify },
];

function BlockerEscalationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const blockerRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);

  const accent = "#0891B2"; const accentDark = "#0E7490";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🆘 BLOCKER ESCALATION / HELP REQUEST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Daily Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date Raised</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Raised By</td><td style={S.tdAlt}>[SM / Dev Name]</td><td style={S.tdLabelAlt}>Urgency</td><td style={S.tdAlt}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>[Critical / High / Medium]</span></td></tr>
        <tr><td style={S.tdLabel}>Escalated To</td><td style={S.td0}>[Manager Name / Team / Vendor]</td><td style={S.tdLabel}>Response Needed By</td><td style={S.td0}>[Date / Time]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderBlocker = () => (
    <div ref={blockerRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>🚧 THE BLOCKER</td></tr></tbody></table>
      <CopyButton targetRef={blockerRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>What Is Blocked?</td><td style={{ ...S.td0, height: "40px" }}>[e.g., Apple Pay integration cannot proceed — vendor sandbox environment is not accessible]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Stories Affected</td><td style={S.tdAlt}>[S-010 Apple Pay (5 pts), S-011 Google Pay (3 pts) — 8 pts total, 35% of sprint commitment]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>When Did It Start?</td><td style={S.td0}>[MM/DD — Day 3 of sprint; has been open for 2 days]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Root Cause</td><td style={S.tdAlt}>[Vendor (PayCorp) has not provisioned our sandbox account despite request submitted 2 weeks ago]</td></tr>
      </tbody></table>
    </div>
  );

  const renderImpact = () => (
    <div ref={impactRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>💥 IMPACT ASSESSMENT</td></tr></tbody></table>
      <CopyButton targetRef={impactRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Sprint Goal at Risk?</td><td style={S.td0}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Yes</span> — [Sprint goal includes Apple Pay; cannot demo without it]</td></tr>
        <tr><td style={S.tdLabelAlt}>Points at Risk</td><td style={S.tdAlt}>[8 pts / 23 pts committed = 35% of sprint at risk]</td></tr>
        <tr><td style={S.tdLabel}>Timeline Impact</td><td style={S.td0}>[If not resolved by Day 6, Apple Pay will carry over to Sprint 9; delays release by 2 weeks]</td></tr>
        <tr><td style={S.tdLabelAlt}>Team Impact</td><td style={S.tdAlt}>[Dev 1 (Sarah) is idle on payment stories; currently working on lower-priority items]</td></tr>
        <tr><td style={S.tdLabel}>Stakeholder Impact</td><td style={S.td0}>[VP Sales expecting Apple Pay demo next Thursday; will need to reset expectations]</td></tr>
      </tbody></table>
    </div>
  );

  const renderAsk = () => (
    <div ref={askRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 THE ASK</td></tr></tbody></table>
      <CopyButton targetRef={askRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>What We Need</td><td style={{ ...S.td0, height: "40px", fontWeight: 600 }}>[e.g., Contact PayCorp account manager directly to expedite sandbox provisioning — need access by EOD Wednesday]</td></tr>
        <tr><td style={S.tdLabelAlt}>What We&apos;ve Tried</td><td style={S.tdAlt}>[Submitted ticket 2 weeks ago; followed up via email 3 times; called support — told to wait]</td></tr>
        <tr><td style={S.tdLabel}>Options Considered</td><td style={S.td0}>[1. Wait (risk sprint) 2. Use mock API (can test logic but not real integration) 3. Escalate to PayCorp exec contact]</td></tr>
        <tr><td style={S.tdLabelAlt}>Recommended Action</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Option 3: Have Engineering Director contact PayCorp VP of Partnerships directly]</td></tr>
        <tr><td style={S.tdLabel}>Fallback Plan</td><td style={S.td0}>[If no sandbox by Wednesday: switch to mock API, defer real integration to Sprint 9, adjust demo scope]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decision Made</td><td style={{ ...S.td0, height: "36px" }}>[To be filled after escalation meeting]</td></tr>
        <tr><td style={S.tdLabelAlt}>Decision By</td><td style={S.tdAlt}>[Name + Date]</td></tr>
        <tr><td style={S.tdLabel}>Outcome</td><td style={S.td0}>[To be filled]</td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><ArrowUpCircle size={11} />Escalation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><ArrowUpCircle size={20} className="text-cyan-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Blocker Escalation / Help Request</h2><p className="text-xs font-medium text-cyan-600">Structured Ask for Leadership / Vendor Help</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A structured escalation page: what&apos;s blocked, impact assessment, what you need, and fallback plan. Makes escalations fast and clear.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderBlocker()}{renderImpact()}{renderAsk()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderBlocker()}{renderAsk()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BlockerEscalationPage() { return <ThemeProvider><BlockerEscalationContent /></ThemeProvider>; }
