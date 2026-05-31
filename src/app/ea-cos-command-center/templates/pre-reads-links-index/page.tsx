"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Link2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Index", desc: "All docs + meeting pack + archive", icon: LayoutDashboard },
  { id: "compact", label: "Quick Links", desc: "Active docs only", icon: AlignJustify },
];

function PreReadsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📎 PRE-READS &amp; LINKS INDEX</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderIndex = () => (
    <div ref={indexRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 MEETING PACK &mdash; All Docs in One Place</td></tr></tbody></table>
      <CopyButton targetRef={indexRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>No more &ldquo;where&apos;s the deck?&rdquo; — every doc for upcoming meetings lives here.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Meeting Date</th>
          <th style={S.thPrimary}>Meeting Name</th>
          <th style={S.thPrimary}>Document / Link</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/14", meeting: "[Leadership Team Sync]", doc: "[Q2 Budget Summary — 1-pager]", type: "Pre-Read", s: "✅ Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "03/14", meeting: "[1:1 with CFO]", doc: "[Q2 Forecast Deck v3]", type: "Deck", s: "✅ Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "03/15", meeting: "[Board Prep Session]", doc: "[Board Deck Draft — final]", type: "Deck", s: "⚠️ Draft", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/15", meeting: "[Board Prep Session]", doc: "[Financial Appendix]", type: "Appendix", s: "❌ Missing", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "03/16", meeting: "[External Partner Call]", doc: "[Contract Draft v3 — redlined]", type: "Contract", s: "⚠️ Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/18", meeting: "[Steering Committee]", doc: "[Initiative Status Report]", type: "Report", s: "✅ Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.doc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderArchive = () => (
    <div ref={archiveRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6B7280")}>📁 STANDING DOCS &amp; REFERENCE LINKS</td></tr></tbody></table>
      <CopyButton targetRef={archiveRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Document</th>
          <th style={{ ...S.thSecondary, width: "15%" }}>Type</th>
          <th style={{ ...S.thSecondary, width: "15%", textAlign: "center" as const }}>Last Updated</th>
        </tr></thead>
        <tbody>
          {[
            { doc: "[Org Chart — current]", type: "Reference", updated: "03/01" },
            { doc: "[Board Member Bios & Preferences]", type: "Reference", updated: "02/15" },
            { doc: "[Company Fact Sheet]", type: "Reference", updated: "01/30" },
            { doc: "[Executive Calendar Rules]", type: "SOP", updated: "02/20" },
            { doc: "[Travel Policy]", type: "Policy", updated: "01/15" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.doc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.updated}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Link2 size={11} />Docs</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Link2 size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Pre-Reads &amp; Links Index</h2><p className="text-xs font-medium text-sky-600">Meeting Pack &mdash; All Docs in One Place</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">All docs and links for upcoming meetings in one clean table. No more &ldquo;where&apos;s the deck?&rdquo;</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderIndex()}{renderArchive()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderIndex()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PreReadsLinksIndexPage() { return <ThemeProvider><PreReadsContent /></ThemeProvider>; }
