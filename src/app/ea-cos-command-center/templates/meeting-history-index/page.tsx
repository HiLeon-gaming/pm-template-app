"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Index", desc: "All meetings + search tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Recent meetings only", icon: AlignJustify },
];

function MeetingHistoryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>MEETING HISTORY INDEX</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderIndex = () => (
    <div ref={indexRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MEETING LOG &mdash; &ldquo;What Did We Decide Last Time?&rdquo;</td></tr></tbody></table>
      <CopyButton targetRef={indexRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Links to prior meeting notes by stakeholder/topic. Never lose a decision or commitment again.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Meeting Name</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Key Stakeholder(s)</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Key Decision / Outcome</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes Link</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/14", name: "[Leadership Team Sync]", stake: "[CEO, CFO, COO]", decision: "[Approved Q2 budget with modifications]", link: "[Link to notes]" },
            { date: "03/13", name: "[1:1 with CFO]", stake: "[CEO, CFO]", decision: "[Agreed to defer hiring until May]", link: "[Link to notes]" },
            { date: "03/12", name: "[Board Prep Session]", stake: "[CEO, CoS, Legal]", decision: "[Finalized board deck v3]", link: "[Link to notes]" },
            { date: "03/11", name: "[External Partner Call]", stake: "[CEO, Partner CEO]", decision: "[MOU terms agreed — Legal drafting]", link: "[Link to notes]" },
            { date: "03/10", name: "[All-Hands Prep]", stake: "[CEO, HR, Comms]", decision: "[Key messages approved]", link: "[Link to notes]" },
            { date: "03/08", name: "[Steering Committee]", stake: "[PMO, C-Suite]", decision: "[Project X paused, Project Y accelerated]", link: "[Link to notes]" },
            { date: "03/07", name: "[Investor Update Call]", stake: "[CEO, CFO, Investor]", decision: "[Q1 results shared, follow-up by 03/15]", link: "[Link to notes]" },
            { date: "03/05", name: "[Skip-Level 1:1]", stake: "[CEO, Sr. Engineer]", decision: "[Career path discussion — follow up in April]", link: "[Link to notes]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.stake}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#0EA5E9", textDecoration: "underline" }}>{r.link}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6B7280")}>ORGANIZATION TIPS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "12px 16px" }}>
          <strong style={{ color: accent }}>Naming Convention:</strong> [YYYY-MM-DD] [Meeting Type] [Key Stakeholder] &mdash; e.g., &ldquo;2026-03-14 Leadership Sync CEO&rdquo;<br />
          <strong style={{ color: accent }}>Filing Rule:</strong> Create one section per recurring meeting type; file individual notes as sub-pages<br />
          <strong style={{ color: accent }}>Search Tip:</strong> Use OneNote&apos;s search (Ctrl+E) with stakeholder names or decision keywords<br />
          <strong style={{ color: accent }}>Archive Rule:</strong> Move meetings older than 90 days to an &ldquo;Archive&rdquo; section to keep this index clean<br />
          <strong style={{ color: accent }}>Quick Reference:</strong> Star or pin the 5 most-referenced meetings at the top of this page
        </td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><BookOpen size={11} />History</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><BookOpen size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting History Index</h2><p className="text-xs font-medium text-amber-600">&ldquo;What Did We Decide Last Time?&rdquo; &mdash; Solved</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Links to prior meeting notes by stakeholder/topic. Never lose a decision or commitment again.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderIndex()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderIndex()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingHistoryIndexPage() { return <ThemeProvider><MeetingHistoryContent /></ThemeProvider>; }
