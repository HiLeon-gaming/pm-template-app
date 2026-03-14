"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Share2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Delegations + follow-up + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Delegation table only", icon: AlignJustify },
];

function DelegationTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📤 DELEGATION TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderTable = () => (
    <div ref={tableRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 WHAT THE EXEC DELEGATED</div>
      <CopyButton targetRef={tableRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track what was handed off, to whom, and when to follow up. Makes delegation real — not just words.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Task / Deliverable</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Delegated To</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Follow-Up</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/10", task: "[Prepare competitive analysis for board deck]", to: "[VP Strategy]", due: "03/17", fu: "03/14", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/10", task: "[Draft new hire announcement for all-hands]", to: "[HR Director]", due: "03/14", fu: "03/13", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/08", task: "[Review vendor proposals and recommend top 2]", to: "[Procurement]", due: "03/15", fu: "03/12", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "03/07", task: "[Update team capacity plan for Q3]", to: "[PM Lead]", due: "03/21", fu: "03/18", s: "Not Started", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "03/05", task: "[Compile customer feedback themes from Q1]", to: "[Product]", due: "03/12", fu: "03/11", s: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: "#D97706" }}>{r.fu}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>💡 DELEGATION BEST PRACTICES</div>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "12px 16px" }}>
          <strong style={{ color: accent }}>🎯 Be specific:</strong> &ldquo;Prepare a 1-page competitive analysis comparing vendors A, B, C by March 17&rdquo; — not &ldquo;look into vendors.&rdquo;<br />
          <strong style={{ color: accent }}>📅 Set a follow-up date:</strong> Don&apos;t wait for the due date. Check in at the midpoint to catch issues early.<br />
          <strong style={{ color: accent }}>✅ Confirm understanding:</strong> After delegating, ask: &ldquo;Can you tell me back what you&apos;re delivering and by when?&rdquo;<br />
          <strong style={{ color: accent }}>🔄 Track, don&apos;t micromanage:</strong> Update this tracker and check status at agreed intervals. Trust but verify.<br />
          <strong style={{ color: accent }}>🏁 Close the loop:</strong> When done, confirm completion and notify the exec. Mark it complete here.
        </td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><Share2 size={11} />Delegation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><Share2 size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Delegation Tracker</h2><p className="text-xs font-medium text-pink-600">What the Exec Delegated &amp; When to Follow Up</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track what was delegated, to whom, with due dates and follow-up checkpoints. Makes delegation real.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderTable()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTable()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DelegationTrackerPage() { return <ThemeProvider><DelegationTrackerContent /></ThemeProvider>; }
