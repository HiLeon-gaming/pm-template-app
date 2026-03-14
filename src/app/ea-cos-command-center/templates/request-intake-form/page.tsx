"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Form", desc: "Capture + context + follow-up", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Essentials only", icon: AlignJustify },
];

function RequestIntakeContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);

  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📝 REQUEST INTAKE FORM (QUICK CAPTURE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderForm = () => (
    <div ref={formRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 REQUEST DETAILS</div>
      <CopyButton targetRef={formRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>Date Received</td><td style={{ ...S.td0, width: "25%" }}>[MM/DD/YYYY]</td><td style={{ ...S.tdLabel, width: "25%" }}>Time</td><td style={{ ...S.td0, width: "25%" }}>[HH:MM AM/PM]</td></tr>
        <tr><td style={S.tdLabelAlt}>Requested By</td><td style={S.tdAlt}>[Name + Role]</td><td style={S.tdLabelAlt}>Channel</td><td style={S.tdAlt}>[Email / Slack / Call / Hallway / Meeting]</td></tr>
        <tr><td style={S.tdLabel}>Request Summary</td><td colSpan={3} style={{ ...S.td0, fontWeight: 700 }}>[One-line description of the ask]</td></tr>
        <tr><td style={S.tdLabelAlt}>Details / Notes</td><td colSpan={3} style={S.tdAlt}>[Additional context, links, attachments, exact words used]</td></tr>
        <tr><td style={S.tdLabel}>Priority</td><td style={S.td0}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>[🔴 High / 🟡 Med / 🟢 Low]</span></td><td style={S.tdLabel}>Due Date</td><td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>[MM/DD/YYYY or ASAP]</td></tr>
        <tr><td style={S.tdLabelAlt}>Assigned To</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Owner Name]</td><td style={S.tdLabelAlt}>Status</td><td style={S.tdAlt}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[Not Started / In Progress / Done]</span></td></tr>
      </tbody></table>
    </div>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🔍 TRIAGE &amp; FOLLOW-UP</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>Triage Decision</td><td style={S.td0}>[Do Now / Schedule / Delegate / Defer]</td></tr>
        <tr><td style={S.tdLabelAlt}>Dependencies</td><td style={S.tdAlt}>[Does this need input from someone else first?]</td></tr>
        <tr><td style={S.tdLabel}>Follow-Up Date</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[When to check on this]</td></tr>
        <tr><td style={S.tdLabelAlt}>Completion Notes</td><td style={S.tdAlt}>[What was done, who was notified, any open items]</td></tr>
        <tr><td style={S.tdLabel}>Closed Date</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><ClipboardList size={11} />Requests</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><ClipboardList size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Request Intake Form</h2><p className="text-xs font-medium text-pink-600">Quick Capture for Calls, Slack &amp; Hallway Asks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">One-page capture for any request. Reduces dropped balls by giving every ask a place to live.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200" : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-pink-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderForm()}{renderContext()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderForm()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RequestIntakeFormPage() { return <ThemeProvider><RequestIntakeContent /></ThemeProvider>; }
