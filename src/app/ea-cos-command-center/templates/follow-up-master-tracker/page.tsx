"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Database, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Master", desc: "All items + stats + archive", icon: LayoutDashboard },
  { id: "compact", label: "Active Only", desc: "Open items only", icon: AlignJustify },
];

function FollowUpMasterContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const masterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📊 WAITING ON / FOLLOW-UP MASTER TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderMaster = () => (
    <div ref={masterRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 SINGLE SOURCE OF TRUTH &mdash; Everything You&apos;re Chasing</div>
      <CopyButton targetRef={masterRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your second-most used page. If it&apos;s not here, it doesn&apos;t exist. Review daily.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Created</th>
          <th style={S.thPrimary}>Item Description</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>For</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Next Touch</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/05", item: "[Contract redline from Legal]", from: "[GC]", forr: "[CEO]", type: "Waiting", due: "03/10", touch: "TODAY", s: "🔴 Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "03/08", item: "[Budget approval for Q2 marketing]", from: "[CFO]", forr: "[CMO]", type: "Approval", due: "03/15", touch: "03/13", s: "⏳ Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/10", item: "[Board deck feedback]", from: "[CEO]", forr: "[CoS]", type: "Waiting", due: "03/13", touch: "TODAY", s: "⏳ Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/11", item: "[Vendor proposal comparison]", from: "[Procurement]", forr: "[CEO]", type: "Waiting", due: "03/14", touch: "03/13", s: "⏳ Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/12", item: "[Confirm offsite venue]", from: "[Events Co.]", forr: "[EA]", type: "Follow-Up", due: "03/16", touch: "03/14", s: "📝 Active", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "03/12", item: "[Customer data analysis]", from: "[BI Team]", forr: "[CEO]", type: "Waiting", due: "03/18", touch: "03/15", s: "📝 Active", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "03/13", item: "[Travel confirmation for CEO trip]", from: "[Travel Agency]", forr: "[EA]", type: "Follow-Up", due: "03/20", touch: "03/17", s: "📝 Active", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const touchColor = r.touch === "TODAY" ? "#DC2626" : accent;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.forr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "9px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "9px", color: touchColor }}>{r.touch}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStats = () => (
    <div ref={statsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 DASHBOARD STATS</div>
      <CopyButton targetRef={statsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Total Open", value: "[7]", color: accent },
          { label: "Overdue", value: "[1]", color: "#DC2626" },
          { label: "Due This Week", value: "[4]", color: "#D97706" },
          { label: "Awaiting Approval", value: "[1]", color: "#0EA5E9" },
          { label: "Closed This Month", value: "[12]", color: "#059669" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "26px", color: item.color, padding: "12px 6px 2px" }}>{item.value}</td></tr>
              <tr><td style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "9px", fontWeight: 600, padding: "2px 6px 10px", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{item.label}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><Database size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Waiting On / Follow-Up Master Tracker</h2><p className="text-xs font-medium text-pink-600">⭐ All-Star &mdash; Single Source of Truth</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Everything you&apos;re chasing in one place. Your second-most used page. If it&apos;s not here, it doesn&apos;t exist.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderMaster()}{renderStats()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMaster()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FollowUpMasterTrackerPage() { return <ThemeProvider><FollowUpMasterContent /></ThemeProvider>; }
