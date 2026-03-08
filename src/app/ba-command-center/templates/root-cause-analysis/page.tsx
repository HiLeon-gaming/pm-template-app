"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Microscope, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full RCA", desc: "5 Whys + fishbone + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick RCA", desc: "5 Whys + actions only", icon: AlignJustify },
];

function RCAContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const whysRef = useRef<HTMLDivElement>(null);
  const fishRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const preventRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔬 ROOT CAUSE ANALYSIS</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template combines the 5 Whys technique and Ishikawa (fishbone) diagram to systematically identify the root cause of a problem.</strong> It guides you from the observable symptom through successive &ldquo;why&rdquo; questions to uncover the true underlying cause, then maps contributing factors across 6 categories and defines corrective actions.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>defect investigation, process failures,</strong> or <strong style={{ fontStyle: "italic" }}>recurring issues that need permanent resolution rather than quick fixes</strong>. Aligns with BABOK Technique: Root Cause Analysis.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "16%" }}>Problem Title</td>
            <td style={{ ...S.td0, width: "34%" }}>[e.g., Order Processing Errors Exceeding 8% Error Rate]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Date</td>
            <td style={{ ...S.td0, width: "34%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Analyst</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Severity</td>
            <td style={S.tdAlt}>☐ Critical ☐ High ☐ Medium ☐ Low</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Problem Statement</td>
            <td colSpan={3} style={S.td0}>[Describe the problem clearly: What is happening? When did it start? What is the impact? Be specific and measurable.]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Impact</td>
            <td colSpan={3} style={S.tdAlt}>[e.g., 120 orders/month affected | $45K/month in rework costs | Customer satisfaction dropped 15 points]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderWhys = () => (
    <div ref={whysRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>❓ 5 WHYS ANALYSIS</div>
      <CopyButton targetRef={whysRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Start with the problem and ask &ldquo;Why?&rdquo; repeatedly until you reach the root cause. You may need fewer or more than 5 levels.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { level: "Problem", color: "#DC2626", bg: "#FEE2E2", q: "What is the problem?", a: "[e.g., 8% of orders have errors that require manual correction before fulfillment]" },
            { level: "Why #1", color: "#D97706", bg: "#FEF3C7", q: "Why does this happen?", a: "[e.g., Order entry staff are entering incorrect product codes and quantities]" },
            { level: "Why #2", color: "#D97706", bg: "#FEF3C7", q: "Why are they entering incorrect data?", a: "[e.g., The order form does not validate product codes against the catalog in real-time]" },
            { level: "Why #3", color: "#D97706", bg: "#FEF3C7", q: "Why is there no real-time validation?", a: "[e.g., The legacy system cannot connect to the product catalog database during entry]" },
            { level: "Why #4", color: "#D97706", bg: "#FEF3C7", q: "Why can't it connect?", a: "[e.g., The product catalog is maintained in a separate spreadsheet that is updated weekly, not via a shared database]" },
            { level: "ROOT CAUSE", color: "#059669", bg: "#D1FAE5", q: "Why is it maintained in a spreadsheet?", a: "[e.g., No master data management system exists — product data was never centralized when the company grew from 50 to 500 SKUs]" },
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ backgroundColor: row.bg, color: row.color, padding: "10px 14px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, width: "12%", border: `1.5px solid ${C.border}`, textAlign: "center" as const, verticalAlign: "top" as const }}>
                {row.level}
              </td>
              <td style={{ ...S.td0, borderLeft: `3px solid ${row.color}`, verticalAlign: "top" as const }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: row.color, marginBottom: "3px" }}>{row.q}</div>
                <div style={{ fontSize: "12px" }}>{row.a}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const FISH_CATS = [
    { cat: "People", icon: "👥", color: "#2563EB", bg: "#DBEAFE", factors: ["[e.g., Insufficient training on data entry procedures]", "[e.g., High staff turnover — new hires not onboarded properly]", "[Add factor]"] },
    { cat: "Process", icon: "⚙️", color: "#059669", bg: "#D1FAE5", factors: ["[e.g., No validation step before order submission]", "[e.g., Manual data entry from email/fax — error-prone]", "[Add factor]"] },
    { cat: "Technology", icon: "💻", color: "#7C3AED", bg: "#EDE9FE", factors: ["[e.g., Legacy system lacks real-time validation]", "[e.g., No integration between order system and product catalog]", "[Add factor]"] },
    { cat: "Data", icon: "📊", color: "#D97706", bg: "#FEF3C7", factors: ["[e.g., Product catalog not centralized — maintained in spreadsheet]", "[e.g., SKU format inconsistencies across systems]", "[Add factor]"] },
    { cat: "Environment", icon: "🏢", color: "#BE185D", bg: "#FCE7F3", factors: ["[e.g., Growing from 50 to 500 SKUs without upgrading systems]", "[e.g., Multiple offices entering orders with different conventions]", "[Add factor]"] },
    { cat: "Management", icon: "📋", color: "#0891B2", bg: "#CFFAFE", factors: ["[e.g., No data governance policy or master data owner assigned]", "[e.g., KPIs don't include data quality metrics]", "[Add factor]"] },
  ];

  const renderFishbone = () => (
    <div ref={fishRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🐟 ISHIKAWA (FISHBONE) DIAGRAM</div>
      <CopyButton targetRef={fishRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Contributing factors organized by category. Each factor may have contributed to the root cause.</p>
      <table style={LT}><tbody>
        <tr>
          {FISH_CATS.slice(0, 3).map((cat, ci) => (
            <td key={ci} style={{ ...LC, width: "33.33%", padding: ci < 2 ? "0 3px 4px 0" : "0 0 4px 0" }}>
              <table style={S.tbl}>
                <thead><tr><td style={{ backgroundColor: cat.bg, color: cat.color, padding: "8px 10px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${cat.color}` }}>{cat.icon} {cat.cat}</td></tr></thead>
                <tbody>
                  {cat.factors.map((f, i) => (
                    <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "26px" }}>{f}</td></tr>
                  ))}
                </tbody>
              </table>
            </td>
          ))}
        </tr>
        <tr>
          {FISH_CATS.slice(3, 6).map((cat, ci) => (
            <td key={ci} style={{ ...LC, width: "33.33%", padding: ci < 2 ? "0 3px 0 0" : "0" }}>
              <table style={S.tbl}>
                <thead><tr><td style={{ backgroundColor: cat.bg, color: cat.color, padding: "8px 10px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${cat.color}` }}>{cat.icon} {cat.cat}</td></tr></thead>
                <tbody>
                  {cat.factors.map((f, i) => (
                    <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "26px" }}>{f}</td></tr>
                  ))}
                </tbody>
              </table>
            </td>
          ))}
        </tr>
      </tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔨 CORRECTIVE ACTIONS</div>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
            <th style={S.thPrimary}>Action</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { type: "Immediate", tBg: "#FEE2E2", tFg: "#DC2626", action: "[e.g., Add manual product code verification step to existing process (quick fix)]", owner: "[Ops Mgr]", due: "[1 week]", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB" },
            { type: "Short-term", tBg: "#FEF3C7", tFg: "#D97706", action: "[e.g., Create centralized product catalog database with unique SKU validation]", owner: "[Data Team]", due: "[4 weeks]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { type: "Short-term", tBg: "#FEF3C7", tFg: "#D97706", action: "[e.g., Add real-time product code lookup to order entry form]", owner: "[Dev Team]", due: "[6 weeks]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { type: "Long-term", tBg: "#D1FAE5", tFg: "#059669", action: "[e.g., Implement master data management (MDM) platform with governance policies]", owner: "[Data + BA]", due: "[Q4]", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
            { type: "Long-term", tBg: "#D1FAE5", tFg: "#059669", action: "[e.g., Replace legacy order system with modern web portal (self-service)]", owner: "[Dev Team]", due: "[Q1 next yr]", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
            { type: "—", tBg: "#F3F4F6", tFg: "#6B7280", action: "[Add corrective action]", owner: "", due: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.tBg, row.tFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPrevention = () => (
    <div ref={preventRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🛡️ PREVENTION &amp; MONITORING</div>
      <CopyButton targetRef={preventRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "How will we verify the fix works?", a: "[e.g., Monitor error rate weekly for 8 weeks — target < 1%]" },
            { q: "Success metric", a: "[e.g., Order error rate drops from 8% to <1% within 60 days of deployment]" },
            { q: "Monitoring period", a: "[e.g., 60 days post-implementation with weekly reviews]" },
            { q: "How do we prevent recurrence?", a: "[e.g., Add data quality KPI to ops dashboard; quarterly data governance reviews; automated validation rules]" },
            { q: "Lessons learned", a: "[What should we do differently in the future? What process/policy changes are needed?]" },
            { q: "Review date", a: "[MM/DD/YYYY — date to confirm root cause is resolved and actions are effective]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "28%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><Microscope size={11} /> RCA</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Microscope size={20} className="text-rose-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Root Cause Analysis</h2>
              <p className="text-xs font-medium text-rose-600">5 Whys &bull; Fishbone Diagram &bull; Corrective Actions &bull; Prevention</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Systematic root cause investigation using 5 Whys and Ishikawa fishbone diagram with corrective actions and prevention monitoring. Full RCA includes all techniques; Quick RCA focuses on 5 Whys and actions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderWhys()}{renderFishbone()}{renderActions()}{renderPrevention()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderWhys()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RootCauseAnalysisPage() {
  return (<ThemeProvider><RCAContent /></ThemeProvider>);
}
