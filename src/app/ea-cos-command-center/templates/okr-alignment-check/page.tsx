"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Target, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Check", desc: "OKRs + alignment status + gaps", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "OKR table only", icon: AlignJustify },
];

function OKRAlignmentContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const okrRef = useRef<HTMLDivElement>(null);
  const gapsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OKR / GOAL ALIGNMENT CHECK</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Initiatives &amp; Alignment</td></tr>
    </tbody></table>
  );

  const renderOKR = () => (
    <div ref={okrRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>COMPANY OKRs &mdash; ALIGNMENT STATUS</td></tr></tbody></table>
      <CopyButton targetRef={okrRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Is the exec&apos;s time and energy aligned to what matters most? Quick quarterly check.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Objective</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Key Results</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Progress</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Exec Time Aligned?</th>
        </tr></thead>
        <tbody>
          {[
            { obj: "[Grow revenue by 25% in FY26]", kr: "[Close $10M in new ARR by Q2]", owner: "[VP Sales]", prog: "40%", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, aligned: "Yes — weekly pipeline reviews" },
            { obj: "[Grow revenue by 25% in FY26]", kr: "[Launch 3 new product features]", owner: "[CTO]", prog: "33%", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, aligned: "Partial — needs more exec attention" },
            { obj: "[Build world-class team]", kr: "[Reduce attrition below 10%]", owner: "[CHRO]", prog: "60%", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, aligned: "Yes — retention conversations scheduled" },
            { obj: "[Build world-class team]", kr: "[Fill 5 VP-level roles by Q2]", owner: "[CHRO]", prog: "20%", health: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, aligned: "No — exec not involved in recruiting" },
            { obj: "[Operational excellence]", kr: "[Reduce operating costs by 15%]", owner: "[CFO]", prog: "25%", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, aligned: "Partial — cost review pending" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.obj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{r.prog}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.aligned}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGaps = () => (
    <div ref={gapsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>ALIGNMENT GAPS &amp; RECOMMENDATIONS</td></tr></tbody></table>
      <CopyButton targetRef={gapsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          { gap: "[Exec spending 30% of time on low-priority meetings not tied to any OKR]", rec: "[Audit calendar — cut 5 hrs/week of non-OKR meetings]" },
          { gap: "[VP hiring OKR at 20% with no exec involvement in sourcing]", rec: "[Block 2 hrs/week for exec recruiting conversations]" },
          { gap: "[Product feature OKR behind — CTO needs exec air cover]", rec: "[Add monthly product review to exec cadence]" },
        ].map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, width: "50%", fontSize: "10px", color: "#DC2626" }}><strong>Gap:</strong> {r.gap}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#059669" }}><strong>Recommendation:</strong> {r.rec}</td>
            </tr>
          );
        })}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Target size={11} />OKRs</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Target size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">OKR / Goal Alignment Check</h2><p className="text-xs font-medium text-emerald-600">Is the Exec&apos;s Time Aligned to What Matters?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Quick check: are exec time and energy aligned to company OKRs? Identifies gaps and recommends corrections.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderOKR()}{renderGaps()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderOKR()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function OKRAlignmentCheckPage() { return <ThemeProvider><OKRAlignmentContent /></ThemeProvider>; }
