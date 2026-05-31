"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RefreshCw, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Changes + impact + approval + history", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Change table only", icon: AlignJustify },
];

function WeeklyChangeLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const changeRef = useRef<HTMLDivElement>(null);
  const histRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&ldquo;WHAT CHANGED THIS WEEK?&rdquo; CHANGE LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderChange = () => (
    <div ref={changeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>CHANGES THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={changeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Document any scope shifts, priority changes, new information, or resource changes that affect OKRs or initiatives. Reduces confusion and creates a paper trail.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>What Changed</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Why</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Impact on OKRs</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Approved By</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Priority", tBg: C.badgeRedBg, tFg: C.badgeRedFg, what: "Enterprise playbook moved from Week 6 → Week 4 deadline.", why: "Sales pipeline is weaker than expected. Need playbook sooner.", impact: "KR 2.2 — accelerates case study work", approved: "[VP Sales]" },
            { type: "Scope", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, what: "Intercom migration descoped from Q1. Moved to Q2.", why: "Engineering capacity insufficient. Protecting other KR work.", impact: "KR 1.1 — alternative: hire agents first", approved: "[VP Eng + COO]" },
            { type: "Resource", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, what: "Marketing contractor starting Week 5 to help with case studies.", why: "Internal team at capacity. Contractor fills the gap.", impact: "KR 2.2 — speeds up case study output", approved: "[CMO]" },
            { type: "Target", tBg: C.badgeRedBg, tFg: C.badgeRedFg, what: "NPS target adjusted from 55 → 50 based on mid-Q analysis.", why: "20-point jump in one quarter is unrealistic. 50 is still ambitious.", impact: "KR 1.3 — more achievable, still stretch", approved: "[CEO]" },
            { type: "New Info", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, what: "Competitor launched similar product. Our enterprise prospects are comparing.", why: "Market intelligence from sales calls.", impact: "KR 2.2 — need differentiation messaging", approved: "[N/A — info only]" },
            { type: "", tBg: "transparent", tFg: C.textMuted, what: "[Your change here]", why: "", impact: "", approved: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#DC2626" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.type && <span style={S.badge(r.tBg, r.tFg)}>{r.type}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: "#7C3AED" }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.approved}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHist = () => (
    <div ref={histRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>CHANGE HISTORY (Rolling Quarter)</td></tr></tbody></table>
      <CopyButton targetRef={histRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Keep a running log of all changes made during the quarter. This creates transparency and prevents &ldquo;when did we decide that?&rdquo; confusion.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Week</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Change Summary</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Approved By</th>
        </tr></thead>
        <tbody>
          {[
            { week: "Week 1", type: "Scope", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, summary: "Added recruiter sprint for VP Eng — not in original plan.", approved: "[CEO]" },
            { week: "Week 2", type: "Priority", tBg: C.badgeRedBg, tFg: C.badgeRedFg, summary: "LinkedIn ads budget approved and moved to Week 2 start (was Week 3).", approved: "[CFO]" },
            { week: "Week 3", type: "Scope", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, summary: "Intercom migration descoped from Q1.", approved: "[VP Eng + COO]" },
            { week: "Week 3", type: "Target", tBg: C.badgeRedBg, tFg: C.badgeRedFg, summary: "NPS target adjusted from 55 → 50.", approved: "[CEO]" },
            { week: "Week 3", type: "Resource", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, summary: "Marketing contractor approved for case study support.", approved: "[CMO]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.week}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.summary}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.approved}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>CHANGE MANAGEMENT TIPS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: "#DC2626" }}>Every change needs a &ldquo;why&rdquo; and an &ldquo;approved by.&rdquo;</strong> No silent changes. If it affects OKRs, someone owns the decision.<br />
          <strong style={{ color: accent }}>Target changes are OK if documented.</strong> Adjusting a target mid-quarter is better than pretending it&apos;s still realistic.<br />
          <strong style={{ color: "#D97706" }}>Track the pattern.</strong> If you&apos;re making 5+ changes per week, your planning was too optimistic. Learn for next quarter.<br />
          <strong style={{ color: "#7C3AED" }}>Share the log at weekly check-ins.</strong> 30 seconds: &ldquo;Here&apos;s what changed this week and why.&rdquo; Keeps everyone aligned.
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><RefreshCw size={11} />Changes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><RefreshCw size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">&ldquo;What Changed This Week?&rdquo; Change Log</h2><p className="text-xs font-medium text-emerald-600">Scope Shifts &bull; Priority Changes &bull; Why</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document scope shifts, priority changes, and why. Reduces confusion and creates accountability.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderChange()}{renderHist()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderChange()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyChangeLogPage() { return <ThemeProvider><WeeklyChangeLogContent /></ThemeProvider>; }
