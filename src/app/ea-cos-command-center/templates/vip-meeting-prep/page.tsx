"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Crown, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Intel + strategy + risks + talking points", icon: LayoutDashboard },
  { id: "compact", label: "Quick Prep", desc: "Key details + talking points", icon: AlignJustify },
];

function VIPMeetingPrepContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const intelRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>VIP MEETING PREP PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderDetails = () => (
    <div ref={detailsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MEETING DETAILS</td></tr></tbody></table>
      <CopyButton targetRef={detailsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>VIP Name / Title</td><td style={{ ...S.td0, fontWeight: 700, fontSize: "13px" }}>[Name &mdash; Title, Organization]</td></tr>
        <tr><td style={S.tdLabelAlt}>Meeting Type</td><td style={S.tdAlt}>[Board / Investor / Client / Regulator / Partner]</td></tr>
        <tr><td style={S.tdLabel}>Date &amp; Time</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Day, MM/DD/YYYY &mdash; HH:MM]</td></tr>
        <tr><td style={S.tdLabelAlt}>Location</td><td style={S.tdAlt}>[Room / Restaurant / Zoom link]</td></tr>
        <tr><td style={S.tdLabel}>Meeting Objective</td><td style={{ ...S.td0, fontWeight: 700 }}>[What must come out of this meeting?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Desired Outcome</td><td style={{ ...S.tdAlt, color: "#059669", fontWeight: 700 }}>[Best-case result]</td></tr>
      </tbody></table>
    </div>
  );

  const renderIntel = () => (
    <div ref={intelRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>VIP INTEL &amp; CONTEXT</td></tr></tbody></table>
      <CopyButton targetRef={intelRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Background / Bio</td><td style={S.td0}>[Key facts: career history, recent news, board seats, known interests]</td></tr>
        <tr><td style={S.tdLabelAlt}>Their Current Priorities</td><td style={S.tdAlt}>[What they care about right now]</td></tr>
        <tr><td style={S.tdLabel}>Relationship History</td><td style={S.td0}>[Last interaction, what was discussed, any open items]</td></tr>
        <tr><td style={S.tdLabelAlt}>Known Preferences</td><td style={S.tdAlt}>[Communication style, meeting format, dietary restrictions for meals]</td></tr>
        <tr><td style={S.tdLabel}>Sensitive Topics to Avoid</td><td style={{ ...S.td0, color: "#DC2626", fontWeight: 600 }}>[Landmines, past conflicts, topics that derail]</td></tr>
      </tbody></table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={strategyRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>TALKING POINTS</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "10px 14px" }}>
              <strong style={{ color: "#059669" }}>Opening:</strong> &ldquo;[Warm opener — reference last interaction or recent win]&rdquo;<br /><br />
              <strong style={{ color: "#059669" }}>Key Message 1:</strong> [Main point to convey]<br />
              <strong style={{ color: "#059669" }}>Key Message 2:</strong> [Supporting data or context]<br />
              <strong style={{ color: "#059669" }}>The Ask:</strong> [What you need from them]<br /><br />
              <strong style={{ color: "#059669" }}>Close:</strong> &ldquo;[Graceful close with clear next step]&rdquo;
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>RISKS &amp; OBJECTION PREP</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "10px 14px" }}>
              <strong style={{ color: "#DC2626" }}>If they push back on:</strong><br />
              &bull; [Budget] &rarr; &ldquo;[Counter with ROI data]&rdquo;<br />
              &bull; [Timeline] &rarr; &ldquo;[Show phased approach]&rdquo;<br />
              &bull; [Scope] &rarr; &ldquo;[Reference competitor benchmark]&rdquo;<br /><br />
              <strong style={{ color: "#DC2626" }}>Worst-case scenario:</strong><br />
              [If they say no, the fallback plan is...]<br /><br />
              <strong style={{ color: "#DC2626" }}>Negotiation floor:</strong><br />
              [Minimum acceptable outcome]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={strategyRef} label="Copy Section" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Crown size={11} />VIP</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Crown size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">VIP Meeting Prep Page</h2><p className="text-xs font-medium text-amber-600">High-Stakes Meeting Preparation</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Objectives, VIP intel, risks, negotiation points, talking points, desired outcome. For meetings that really matter.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDetails()}{renderIntel()}{renderStrategy()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDetails()}{renderStrategy()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function VIPMeetingPrepPage() { return <ThemeProvider><VIPMeetingPrepContent /></ThemeProvider>; }
