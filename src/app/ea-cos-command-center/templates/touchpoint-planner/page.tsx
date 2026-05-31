"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Phone, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Planner", desc: "Schedule + overdue + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "This week's touchpoints", icon: AlignJustify },
];

function TouchpointPlannerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const overdueRef = useRef<HTMLDivElement>(null);

  const accent = "#EF4444";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>TOUCHPOINT / OUTREACH PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Stakeholders &amp; Relationships</td></tr>
    </tbody></table>
  );

  const renderSchedule = () => (
    <div ref={scheduleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>UPCOMING TOUCHPOINTS</td></tr></tbody></table>
      <CopyButton targetRef={scheduleRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Who needs a check-in this week/month? Prevents neglected relationships.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Type</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Purpose / Topic</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/15", name: "[Board Chair]", type: "Email", purpose: "[Quarterly update + board prep preview]", done: false },
            { date: "03/16", name: "[CFO]", type: "1:1", purpose: "[Q2 budget alignment check]", done: false },
            { date: "03/17", name: "[Lead Investor]", type: "Call", purpose: "[Monthly investor update]", done: false },
            { date: "03/18", name: "[VP Sales]", type: "Slack", purpose: "[Quick check on pipeline forecast]", done: false },
            { date: "03/20", name: "[External Counsel]", type: "Email", purpose: "[Contract status follow-up]", done: false },
            { date: "03/22", name: "[CHRO]", type: "Coffee", purpose: "[Informal relationship building]", done: false },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.purpose}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done ? "&#9745;" : "&#9744;"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOverdue = () => (
    <div ref={overdueRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>OVERDUE / NEGLECTED RELATIONSHIPS</td></tr></tbody></table>
      <CopyButton targetRef={overdueRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Last Touch</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Days Since</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Target Cadence</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Suggested Action</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Vendor X CEO]", last: "02/10", days: "32", target: "Monthly", action: "[Send check-in email + renewal timeline]" },
            { name: "[Board Member Y]", last: "01/28", days: "45", target: "Monthly", action: "[Schedule 15-min pre-brief call]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.last}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#DC2626" }}>{r.days}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Phone size={11} />Outreach</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Phone size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Touchpoint / Outreach Planner</h2><p className="text-xs font-medium text-red-600">Who Needs a Check-In This Week?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Scheduled outreach with overdue alerts. Prevents neglected relationships.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderSchedule()}{renderOverdue()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSchedule()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TouchpointPlannerPage() { return <ThemeProvider><TouchpointPlannerContent /></ThemeProvider>; }
