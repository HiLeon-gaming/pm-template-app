"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TrendingUp, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Benefits + measurement + ROI", icon: LayoutDashboard },
  { id: "compact", label: "Quick Tracker", desc: "Benefits register only", icon: AlignJustify },
];

function BenefitsRealizationTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📈 BENEFITS REALIZATION TRACKER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Benefits Realization Tracker monitors whether the project delivers the expected business benefits after go-live.</strong> It connects project deliverables to measurable business outcomes and tracks realization over time against the original business case.<br /><br />
          Begin tracking at <strong style={{ fontStyle: "italic" }}>go-live and continue through the benefits realization period (typically 6-12 months post-launch)</strong>. Aligns with PMBOK Benefits Management — Strategic & Business Management.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Report Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Benefits Owner</td><td style={S.tdAlt}>[Business Owner / Sponsor]</td><td style={S.tdLabelAlt}>Realization Period</td><td style={S.tdAlt}>[Go-Live + 12 months]</td></tr>
          <tr><td style={S.tdLabel}>Go-Live Date</td><td style={S.td0}>[MM/DD/YYYY]</td><td style={S.tdLabel}>Months Post-Launch</td><td style={S.td0}>[#] of [12] months</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const benefits = [
    { id: "B1", benefit: "[Customer retention improvement]", cat: "Revenue", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, target: "[+15%]", baseline: "[72%]", current: "[81%]", pct: "[60%]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[VP Sales]" },
    { id: "B2", benefit: "[Support ticket resolution time reduction]", cat: "Efficiency", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, target: "[-25%]", baseline: "[48 hrs]", current: "[38 hrs]", pct: "[42%]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[Support Dir]" },
    { id: "B3", benefit: "[Manual data entry elimination]", cat: "Efficiency", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, target: "[-80%]", baseline: "[40 hrs/wk]", current: "[12 hrs/wk]", pct: "[88%]", status: "Exceeded", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[Ops Mgr]" },
    { id: "B4", benefit: "[Cross-sell revenue increase]", cat: "Revenue", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, target: "[+$500K/yr]", baseline: "[$1.2M/yr]", current: "[$1.35M/yr]", pct: "[30%]", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, owner: "[VP Sales]" },
    { id: "B5", benefit: "[Employee satisfaction (CRM users)]", cat: "People", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, target: "[+20 pts]", baseline: "[62 NPS]", current: "[74 NPS]", pct: "[60%]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[HR]" },
    { id: "B6", benefit: "[Regulatory compliance achievement]", cat: "Compliance", cBg: C.badgeRedBg, cFg: C.badgeRedFg, target: "[100%]", baseline: "[75%]", current: "[100%]", pct: "[100%]", status: "Achieved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, owner: "[CISO]" },
    { id: "[B#]", benefit: "[Add benefit]", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, target: "", baseline: "", current: "", pct: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, owner: "" },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 BENEFITS REGISTER</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Expected Benefit</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Cat</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Baseline</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>%</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {benefits.map((b, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{b.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{b.benefit}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(b.cBg, b.cFg), fontSize: "9px" }}>{b.cat}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{b.target}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{b.baseline}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{b.current}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{b.pct}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(b.sBg, b.sFg)}>{b.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{b.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMeasure = () => (
    <div ref={measureRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> MEASUREMENT PLAN</td></tr></tbody></table>
      <CopyButton targetRef={measureRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>KPI / Metric</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Data Source</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Frequency</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Measured By</th>
        </tr></thead>
        <tbody>
          {[
            { id: "B1", kpi: "[Customer retention rate — % of customers retained quarter-over-quarter]", source: "[CRM Reports]", freq: "Quarterly", by: "[Analytics]" },
            { id: "B2", kpi: "[Avg ticket resolution time — hours from open to resolved]", source: "[ServiceDesk]", freq: "Monthly", by: "[Support Mgr]" },
            { id: "B3", kpi: "[Manual data entry hours per week]", source: "[Time Tracking]", freq: "Monthly", by: "[Ops Mgr]" },
            { id: "B4", kpi: "[Cross-sell revenue — $ from existing customer upsells]", source: "[CRM + Finance]", freq: "Quarterly", by: "[Finance]" },
            { id: "B5", kpi: "[Employee NPS survey score for CRM users]", source: "[Survey Tool]", freq: "Semi-annual", by: "[HR]" },
            { id: "B6", kpi: "[Regulatory compliance audit score]", source: "[Audit Report]", freq: "Annual", by: "[Compliance]" },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{m.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.kpi}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.source}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{m.freq}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.by}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderROI = () => (
    <div ref={roiRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>💰 ROI SUMMARY</div>
      <CopyButton targetRef={roiRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Project Cost</td><td style={{ ...S.td0, fontWeight: 700 }}>$[595,000]</td></tr>
          <tr><td style={S.tdLabelAlt}>Annual Benefits (Projected)</td><td style={S.tdAlt}>$[850,000] — efficiency savings + revenue increase + compliance avoidance</td></tr>
          <tr><td style={S.tdLabel}>Annual Benefits (Actual YTD)</td><td style={S.td0}>$[425,000] at [6] months — on track for $[850K] annualized</td></tr>
          <tr><td style={S.tdLabelAlt}>Payback Period</td><td style={S.tdAlt}>Projected: [8.4 months] • Actual trending: [8.4 months] — <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>On Track</span></td></tr>
          <tr><td style={S.tdLabel}>3-Year ROI</td><td style={S.td0}>Projected: [329%] • Current trajectory: [329%] — ($2.55M benefits / $595K cost)</td></tr>
          <tr><td style={S.tdLabelAlt}>NPV (3-Year, 8% discount)</td><td style={S.tdAlt}>$[1,601,000] — strongly positive net present value</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderTimeline = () => (
    <div ref={timelineRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📅 REALIZATION TIMELINE</td></tr></tbody></table>
      <CopyButton targetRef={timelineRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Milestone</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Target Date</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Expected Benefits at This Point</th>
        </tr></thead>
        <tbody>
          {[
            { ms: "[Go-Live]", date: "[MM/DD]", status: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, benefits: "[System operational; compliance achieved; data entry reduction begins]" },
            { ms: "[+3 Months]", date: "[MM/DD]", status: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, benefits: "[Efficiency gains measurable; user adoption stabilized at 95%]" },
            { ms: "[+6 Months — Current]", date: "[MM/DD]", status: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, benefits: "[50% of annual benefits realized; cross-sell revenue trailing]" },
            { ms: "[+9 Months]", date: "[MM/DD]", status: "⬜", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, benefits: "[75% of annual benefits; retention target should be fully achieved]" },
            { ms: "[+12 Months — Final Review]", date: "[MM/DD]", status: "⬜", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, benefits: "[100% benefits realization; formal ROI report to steering committee]" },
          ].map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{t.ms}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.date}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(t.sBg, t.sFg)}>{t.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.benefits}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderMeasure()}{renderROI()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderTimeline()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><TrendingUp size={11} /> Benefits</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><TrendingUp size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Benefits Realization Tracker</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Benefits Management • Strategic & Business Management</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Tracks post-launch business benefits against the original business case with measurement plan and ROI analysis. Full Tracker includes measurement, ROI, and timeline; Quick Tracker shows the register only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BenefitsRealizationTrackerPage() {
  return (<ThemeProvider><BenefitsRealizationTrackerContent /></ThemeProvider>);
}
