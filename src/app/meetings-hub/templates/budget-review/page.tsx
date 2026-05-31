"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, DollarSign, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Budget vs actual + forecast + variances + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Review", desc: "Summary + variances only", icon: AlignJustify },
];

function BudgetReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>💰 BUDGET / FINANCIAL REVIEW</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Executive &amp; Leadership</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project / Dept</td><td style={{ ...S.td0, width: "32%" }}>[Project Name / Department]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Period</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Month of March / Q1 / YTD]</td><td style={S.tdLabelAlt}>Presenter</td><td style={S.tdAlt}>[Finance Lead / PM]</td></tr>
        <tr><td style={S.tdLabel}>Overall Status</td><td style={{ ...S.td0, fontWeight: 800, color: accent }}>[🟢 Under Budget / 🟡 On Budget / 🔴 Over Budget]</td><td style={S.tdLabel}>Audience</td><td style={S.td0}>[CFO, VP, Sponsor]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 BUDGET SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Category</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Budget</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Variance</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>%</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Personnel (Salaries + Benefits)", budget: "$120,000", actual: "$118,500", variance: "-$1,500", pct: "-1.3%", s: "🟢", notes: "[Under — 1 hire delayed]" },
            { cat: "Contractors / Vendors", budget: "$45,000", actual: "$52,300", variance: "+$7,300", pct: "+16.2%", s: "🔴", notes: "[Over — API vendor higher than quote]" },
            { cat: "Software / Tools", budget: "$8,000", actual: "$7,800", variance: "-$200", pct: "-2.5%", s: "🟢", notes: "[On target]" },
            { cat: "Infrastructure / Cloud", budget: "$15,000", actual: "$16,200", variance: "+$1,200", pct: "+8.0%", s: "🟡", notes: "[Slightly over — usage spike]" },
            { cat: "Travel / Training", budget: "$5,000", actual: "$3,200", variance: "-$1,800", pct: "-36.0%", s: "🟢", notes: "[Under — conference cancelled]" },
            { cat: "Contingency", budget: "$10,000", actual: "$0", variance: "-$10,000", pct: "—", s: "🟢", notes: "[Untouched — available]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const varColor = r.variance.startsWith("+") ? "#DC2626" : "#059669";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.budget}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: varColor }}>{r.variance}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: varColor }}>{r.pct}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.s}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 800 }}>TOTAL</td>
            <td style={{ ...S.tdLabel, textAlign: "center" as const, fontWeight: 800 }}>$203,000</td>
            <td style={{ ...S.tdLabel, textAlign: "center" as const, fontWeight: 800 }}>$198,000</td>
            <td style={{ ...S.tdLabel, textAlign: "center" as const, fontWeight: 800, color: "#059669" }}>-$5,000</td>
            <td style={{ ...S.tdLabel, textAlign: "center" as const, fontWeight: 800, color: "#059669" }}>-2.5%</td>
            <td style={{ ...S.tdLabel, textAlign: "center" as const, fontSize: "14px" }}>🟢</td>
            <td style={{ ...S.tdLabel, fontSize: "9px" }}>[Overall under budget]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📈 FORECAST &amp; BURN RATE</td></tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Budget</td><td style={{ ...S.td0, width: "28%", fontWeight: 700 }}>[$ Total approved budget]</td><td style={{ ...S.tdLabel, width: "22%" }}>Spent to Date</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[$ Amount spent / % of total]</td></tr>
        <tr><td style={S.tdLabelAlt}>Remaining</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>[$ Remaining budget]</td><td style={S.tdLabelAlt}>Forecast at Complete</td><td style={S.tdAlt}>[$ Projected total spend]</td></tr>
        <tr><td style={S.tdLabel}>Burn Rate</td><td style={S.td0}>[$ per month / per sprint]</td><td style={S.tdLabel}>Months Remaining</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[X months until project end]</td></tr>
        <tr><td style={S.tdLabelAlt}>Will Budget Last?</td><td colSpan={3} style={{ ...S.tdAlt, fontWeight: 700, color: "#059669" }}>[Yes / No — if no, when will we run out and by how much?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ DECISIONS &amp; ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Variances to Address</td><td style={{ ...S.td0, color: "#DC2626" }}>[Contractor costs +16% — need to renegotiate or reduce scope]</td></tr>
        <tr><td style={S.tdLabelAlt}>Budget Request</td><td style={S.tdAlt}>[Any additional budget needed? Amount and justification.]</td></tr>
        <tr><td style={S.tdLabel}>Cost Savings</td><td style={S.td0}>[Any identified savings opportunities?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Decisions Made</td><td style={S.tdAlt}>[List decisions from this review]</td></tr>
        <tr><td style={S.tdLabel}>Next Review</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Date — monthly / quarterly]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><DollarSign size={11} />Budget</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><DollarSign size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Budget / Financial Review</h2><p className="text-xs font-medium text-violet-600">Budget vs Actual &bull; Forecast &bull; Variances &bull; Actions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Budget review with category-level actuals, variance analysis, burn rate forecast, and financial decisions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderDetail()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BudgetReviewPage() { return <ThemeProvider><BudgetReviewContent /></ThemeProvider>; }
