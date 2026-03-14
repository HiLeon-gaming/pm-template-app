"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Clock, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Per-person tracker + aging alerts", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Tracker table only", icon: AlignJustify },
];

function WaitingOnTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const agingRef = useRef<HTMLDivElement>(null);

  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⏳ &ldquo;WAITING ON&rdquo; TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderTable = () => (
    <div ref={tableRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 RESPONSES &amp; DELIVERABLES WE&apos;RE WAITING ON</div>
      <CopyButton targetRef={tableRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track what you&apos;re waiting on from others. Follow up without nagging — just check this list daily.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>What We&apos;re Waiting For</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>From (Person)</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Team</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Asked On</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Expected</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Days Open</th>
        </tr></thead>
        <tbody>
          {[
            { what: "[Board deck feedback]", from: "[CEO]", team: "[Exec]", asked: "03/11", exp: "03/13", days: "3", hot: true },
            { what: "[Budget approval for Q2]", from: "[CFO]", team: "[Finance]", asked: "03/08", exp: "03/12", days: "6", hot: true },
            { what: "[Contract redline]", from: "[GC]", team: "[Legal]", asked: "03/05", exp: "03/10", days: "9", hot: true },
            { what: "[Headcount approval]", from: "[CHRO]", team: "[HR]", asked: "03/01", exp: "03/07", days: "13", hot: true },
            { what: "[Vendor proposal comparison]", from: "[J. Smith]", team: "[Procurement]", asked: "03/10", exp: "03/14", days: "4", hot: false },
            { what: "[Customer data analysis]", from: "[Analyst]", team: "[BI]", asked: "03/12", exp: "03/18", days: "2", hot: false },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const daysColor = parseInt(r.days) > 7 ? "#DC2626" : parseInt(r.days) > 3 ? "#D97706" : "#059669";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.asked}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.exp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: daysColor }}>{r.days}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAging = () => (
    <div ref={agingRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🚦 AGING ALERT RULES</div>
      <CopyButton targetRef={agingRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "4px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" as const, border: "none" }}><tbody><tr>
            {[
              { label: "🟢 0-3 days", desc: "On track. No action needed yet.", color: "#059669" },
              { label: "🟡 4-7 days", desc: "Send a gentle nudge. \u201CJust checking in on [X].\u201D", color: "#D97706" },
              { label: "🔴 7+ days", desc: "Escalate. Flag to exec or send a direct follow-up.", color: "#DC2626" },
            ].map((item, i) => (
              <td key={i} style={{ padding: i < 2 ? "0 8px 0 0" : "0", verticalAlign: "top" as const, border: "none", width: "33.3%" }}>
                <table style={S.tbl}><tbody>
                  <tr><td style={{ backgroundColor: item.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{item.label}</td></tr>
                  <tr><td style={{ ...S.td0, textAlign: "center" as const, fontSize: "10px", padding: "8px" }}>{item.desc}</td></tr>
                </tbody></table>
              </td>
            ))}
          </tr></tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><Clock size={11} />Waiting</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><Clock size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">&ldquo;Waiting On&rdquo; Tracker</h2><p className="text-xs font-medium text-pink-600">Per Person / Team &mdash; Follow-Up Without Nagging</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track responses and deliverables from others with aging alerts. Check daily and follow up at the right time.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderTable()}{renderAging()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTable()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function WaitingOnTrackerPage() { return <ThemeProvider><WaitingOnTrackerContent /></ThemeProvider>; }
