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
  { id: "full", label: "Full Log", desc: "Stuck items + escalation path + resolved", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Active stuck items only", icon: AlignJustify },
];

function EscalationsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);

  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚧 ESCALATIONS &amp; STUCK ITEMS LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>🔴 ACTIVE STUCK ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What&apos;s stuck, the impact, your options, and recommended escalation. Helps the exec unblock fast.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>What&apos;s Stuck</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Impact If Not Resolved</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Options / Recommended Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Escalate To</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Days Stuck</th>
        </tr></thead>
        <tbody>
          {[
            { what: "[Contract redline from Legal — 9 days overdue]", impact: "[Vendor contract expires next week — service disruption risk]", action: "[Escalate to GC directly; offer to schedule a 15-min call]", to: "[CEO → GC]", days: "9" },
            { what: "[Headcount approval from HR — 13 days overdue]", impact: "[Candidate may accept another offer]", action: "[Ask CEO to call CHRO directly]", to: "[CEO → CHRO]", days: "13" },
            { what: "[Budget variance data from Finance]", impact: "[Can't finalize board deck without it]", action: "[Send direct ask with deadline; cc CFO]", to: "[CoS → CFO]", days: "4" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const daysColor = parseInt(r.days) > 7 ? "#DC2626" : "#D97706";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#DC2626" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#DC2626", fontWeight: 600 }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: daysColor }}>{r.days}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderResolved = () => (
    <div ref={resolvedRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>✅ RECENTLY RESOLVED</td></tr></tbody></table>
      <CopyButton targetRef={resolvedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Item</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Resolved</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>How It Was Resolved</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[Marketing budget signoff — was stuck 5 days]", resolved: "03/12", how: "[CEO called CMO directly; approved within 1 hour]" },
            { item: "[IT access for new team member]", resolved: "03/10", how: "[Escalated to CTO; resolved same day]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.resolved}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.how}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><AlertTriangle size={11} />Escalations</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><AlertTriangle size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Escalations &amp; Stuck Items Log</h2><p className="text-xs font-medium text-pink-600">What&apos;s Stuck &amp; How to Unblock Fast</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track what&apos;s blocked, the business impact, recommended actions, and who to escalate to.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderLog()}{renderResolved()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function EscalationsStuckItemsPage() { return <ThemeProvider><EscalationsContent /></ThemeProvider>; }
