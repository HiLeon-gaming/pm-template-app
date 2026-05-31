"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckSquare, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Commitments + hit rate + accountability tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Commitment table only", icon: AlignJustify },
];

function WeeklyCommitmentsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const commitRef = useRef<HTMLDivElement>(null);
  const hitRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY COMMITMENTS TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderCommit = () => (
    <div ref={commitRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>THIS WEEK&apos;S COMMITMENTS</td></tr></tbody></table>
      <CopyButton targetRef={commitRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>At the start of each week, each person or team states what they will deliver by Friday. At the end of the week, mark it Done or Missed. No excuses — just honest tracking.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Person / Team</th>
          <th style={S.thPrimary}>Commitment (Specific Deliverable)</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Links to KR</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Result</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { who: "[Tom R.]", commit: "Send 2 offer letters for support agent roles", kr: "KR 1.1", due: "Fri", result: "Done", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "Both accepted. Start date: Week 4." },
            { who: "[Lisa P.]", commit: "Complete onboarding email draft + get CX feedback", kr: "KR 1.2", due: "Wed", result: "Done", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "Minor edits needed, final by Mon." },
            { who: "[CX Lead]", commit: "Design detractor recovery call script", kr: "KR 1.3", due: "Thu", result: "Missed", rBg: C.badgeRedBg, rFg: C.badgeRedFg, notes: "Blocked on NPS data access. Escalated." },
            { who: "[Amy K.]", commit: "Launch LinkedIn ad campaign with 3 variations", kr: "KR 2.1", due: "Wed", result: "Done", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "First impressions: 12K in 2 days." },
            { who: "[Mike D.]", commit: "Schedule discovery calls with 3 enterprise prospects", kr: "KR 2.2", due: "Fri", result: "Partial", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, notes: "2 of 3 scheduled. 3rd pending intro." },
            { who: "[HR]", commit: "Post VP Engineering role on 4 platforms", kr: "KR 3.1", due: "Tue", result: "Done", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, notes: "Posted + referral bonus announced." },
            { who: "[Your name]", commit: "[Your commitment]", kr: "", due: "", result: "", rBg: "transparent", rFg: C.textMuted, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.commit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.result && <span style={S.badge(r.rBg, r.rFg)}>{r.result}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHit = () => (
    <div ref={hitRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>WEEKLY HIT RATE (Rolling 4 Weeks)</td></tr></tbody></table>
      <CopyButton targetRef={hitRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track how often commitments are met. A healthy team hits 80%+. Below 60% means you&apos;re over-committing or under-executing.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Week</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Total</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Done</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Partial</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Missed</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Hit Rate</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Health</th>
        </tr></thead>
        <tbody>
          {[
            { week: "Week 1", total: "8", done: "6", partial: "1", missed: "1", rate: "75%", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { week: "Week 2", total: "7", done: "5", partial: "1", missed: "1", rate: "71%", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { week: "Week 3 (Current)", total: "7", done: "4", partial: "1", missed: "1", rate: "71%", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { week: "Week 4", total: "—", done: "—", partial: "—", missed: "—", rate: "—", h: "—", hBg: "transparent", hFg: C.textMuted },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.week}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.total}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: accent, fontWeight: 700 }}>{r.done}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: "#D97706", fontWeight: 700 }}>{r.partial}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: "#DC2626", fontWeight: 700 }}>{r.missed}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.rate}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.h !== "—" && <span style={S.badge(r.hBg, r.hFg)}>{r.h}</span>}{r.h === "—" && "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>ACCOUNTABILITY TIPS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: accent }}>Make commitments specific and binary.</strong> Not &ldquo;work on hiring&rdquo; but &ldquo;send 2 offer letters by Friday.&rdquo;<br />
          <strong style={{ color: "#DC2626" }}>Missed commitments aren&apos;t failures — they&apos;re signals.</strong> If you keep missing, you&apos;re over-committing or under-resourced.<br />
          <strong style={{ color: "#D97706" }}>Limit to 3–5 commitments per person per week.</strong> More than that = no focus.<br />
          <strong style={{ color: "#7C3AED" }}>Review hit rates monthly.</strong> If team hit rate drops below 60%, have a capacity conversation — not a blame conversation.
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><CheckSquare size={11} />Tracker</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><CheckSquare size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Commitments Tracker</h2><p className="text-xs font-medium text-emerald-600">What You Promised &mdash; Did It Get Done?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track what was promised, delivered, and missed each week. Builds accountability without blame.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderCommit()}{renderHit()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCommit()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyCommitmentsTrackerPage() { return <ThemeProvider><WeeklyCommitmentsContent /></ThemeProvider>; }
