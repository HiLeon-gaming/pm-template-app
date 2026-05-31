"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, XOctagon, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full List", desc: "Stopped items + freed capacity + review history + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Stopped items table only", icon: AlignJustify },
];

function StopDoingListContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const freedRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STOP DOING LIST — Q[X] [YEAR]</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; What We&apos;re Removing This Quarter</td></tr>
    </tbody></table>
  );

  const renderList = () => (
    <div ref={listRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>ITEMS WE ARE STOPPING OR PAUSING THIS QUARTER</td></tr></tbody></table>
      <CopyButton targetRef={listRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every new initiative needs room. These are the things we&apos;re stopping, pausing, or reducing to free up capacity for our quarterly OKRs. No new work without something removed.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>What We&apos;re Stopping / Pausing</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Action</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Why (Makes Room For)</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Team Affected</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Approved By</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Est. Hrs/Wk Freed</th>
        </tr></thead>
        <tbody>
          {[
            { item: "Weekly internal status email (replaced by Dashboard)", action: "Stop", aBg: C.badgeRedBg, aFg: C.badgeRedFg, why: "Dashboard replaces this. Frees ops time.", team: "[Ops]", approved: "[COO]", hrs: "4" },
            { item: "Monthly all-hands presentation prep (simplify to 1-pager)", action: "Reduce", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg, why: "Too much prep time. 1-pager is sufficient.", team: "[Leadership]", approved: "[CEO]", hrs: "8" },
            { item: "Internal blog redesign project", action: "Pause", aBg: C.badgeBlueBg, aFg: C.badgeBlueFg, why: "Doesn't serve current OKRs. Resume Q3.", team: "[Marketing]", approved: "[CMO]", hrs: "10" },
            { item: "Weekly team retrospective (shift to bi-weekly)", action: "Reduce", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg, why: "Same quality at half the frequency.", team: "[Engineering]", approved: "[VP Eng]", hrs: "3" },
            { item: "Social media posting on 3 low-ROI platforms", action: "Stop", aBg: C.badgeRedBg, aFg: C.badgeRedFg, why: "Focus on LinkedIn + Twitter only.", team: "[Marketing]", approved: "[CMO]", hrs: "6" },
            { item: "Manual monthly financial report (automate or eliminate)", action: "Stop", aBg: C.badgeRedBg, aFg: C.badgeRedFg, why: "Dashboard handles this now.", team: "[Finance]", approved: "[CFO]", hrs: "5" },
            { item: "[Your item here]", action: "", aBg: "transparent", aFg: C.textMuted, why: "", team: "", approved: "", hrs: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#DC2626" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.action && <span style={S.badge(r.aBg, r.aFg)}>{r.action}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.approved}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800, color: "#059669" }}>{r.hrs}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFreedAndTips = () => (
    <div ref={freedRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={freedRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>📊 CAPACITY FREED</td></tr></thead>
            <tbody>
              <tr><td style={S.tdLabel}>Total Hrs/Wk Freed</td><td style={{ ...S.td0, fontWeight: 800, fontSize: "14px", color: "#059669" }}>[~36 hrs/week]</td></tr>
              <tr><td style={S.tdLabelAlt}>Where It Goes</td><td style={S.tdAlt}>[KR 1.1 (Support), KR 2.1 (Marketing), KR 3.2 (Culture)]</td></tr>
              <tr><td style={S.tdLabel}>Net Impact</td><td style={S.td0}>[~1 FTE freed up for OKR work]</td></tr>
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>💡 STOP DOING TIPS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Aim for 5–10 items per quarter.", detail: "Can't find anything to stop? You're not looking hard enough." },
                { color: accent, tip: "Zombie meetings = easiest wins.", detail: "Recurring meetings nobody finds useful — cancel them." },
                { color: "#059669", tip: "Reports nobody reads = stop.", detail: "'If I stopped sending this, would anyone notice?'" },
                { color: "#7C3AED", tip: "Review at every MBR.", detail: "Things creep back. Monthly checks keep the list alive." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MONTHLY REVIEW: HAS ANYTHING CREPT BACK IN?</td></tr></tbody></table>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Things you stopped have a habit of creeping back. Check monthly: is the stopped item still stopped?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Stopped Item</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Month 1</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Month 2</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Month 3</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { item: "Weekly status email", m1: "Still stopped", m2: "", m3: "", notes: "" },
            { item: "All-hands prep (reduced)", m1: "1-pager working", m2: "", m3: "", notes: "" },
            { item: "Internal blog redesign", m1: "Still paused", m2: "", m3: "", notes: "" },
            { item: "Low-ROI social media", m1: "Still stopped", m2: "", m3: "", notes: "" },
            { item: "Manual financial report", m1: "Still stopped", m2: "", m3: "", notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", color: "#059669", fontWeight: 600 }}>{r.m1 || "—"}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.m2 || "—"}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.m3 || "—"}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><XOctagon size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stop Doing List — Quarterly</h2><p className="text-xs font-medium text-red-600">&#11088; All-Star &mdash; What We&apos;re Removing This Quarter</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The actual list of things paused, stopped, or reduced to protect team capacity and focus on OKRs.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderList()}{renderFreedAndTips()}{renderReview()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderList()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StopDoingListQuarterlyPage() { return <ThemeProvider><StopDoingListContent /></ThemeProvider>; }
