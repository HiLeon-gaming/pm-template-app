"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Calculator, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Worksheet", desc: "Detailed estimates + basis + contingency", icon: LayoutDashboard },
  { id: "compact", label: "Quick Estimate", desc: "Cost summary only", icon: AlignJustify },
];

function CostEstimateContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const laborRef = useRef<HTMLDivElement>(null);
  const nonLaborRef = useRef<HTMLDivElement>(null);
  const contingencyRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const basisRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>💰 COST ESTIMATE WORKSHEET</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Cost Estimate Worksheet provides a detailed bottom-up estimate of all project costs including labor, non-labor, and contingency reserves.</strong> It forms the basis for the cost baseline and project budget.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>cost estimating</strong> to build a defensible project budget. Aligns with PMBOK Cost Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[Name, Title]</td><td style={S.tdLabelAlt}>Estimate Type</td><td style={S.tdAlt}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Definitive (-5%/+10%)</span></td></tr>
          <tr><td style={S.tdLabel}>Version</td><td style={S.td0}>[1.0]</td><td style={S.tdLabel}>Currency</td><td style={S.td0}>[USD]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLabor = () => (
    <div ref={laborRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>LABOR COSTS</div>
      <CopyButton targetRef={laborRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Role</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>FTEs</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Hours</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "right" as const }}>Rate/Hr</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "right" as const }}>Total</th>
          <th style={S.thPrimary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Project Manager", fte: "1.0", hrs: "[800]", rate: "$[125]", total: "$[100,000]", note: "[Full duration]" },
            { role: "Business Analyst", fte: "1.0", hrs: "[600]", rate: "$[110]", total: "$[66,000]", note: "[Planning + UAT phases]" },
            { role: "Solution Architect", fte: "0.5", hrs: "[300]", rate: "$[150]", total: "$[45,000]", note: "[Design + oversight]" },
            { role: "Senior Developer", fte: "2.0", hrs: "[1,600]", rate: "$[130]", total: "$[208,000]", note: "[2 devs, execution phase]" },
            { role: "QA Engineer", fte: "1.0", hrs: "[500]", rate: "$[100]", total: "$[50,000]", note: "[Testing phases]" },
            { role: "DevOps Engineer", fte: "0.5", hrs: "[200]", rate: "$[120]", total: "$[24,000]", note: "[CI/CD + deployment]" },
            { role: "Change Manager", fte: "0.5", hrs: "[250]", rate: "$[105]", total: "$[26,250]", note: "[Training + comms]" },
            { role: "[Add Role]", fte: "", hrs: "", rate: "", total: "", note: "" },
          ].map((l, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{l.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{l.fte}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{l.hrs}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const }}>{l.rate}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700 }}>{l.total}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{l.note}</td>
            </tr>);
          })}
          <tr>
            <td colSpan={4} style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white }}>LABOR SUBTOTAL</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white, textAlign: "right" as const }}>$[519,250]</td>
            <td style={{ ...S.td0, backgroundColor: C.secondary, color: C.white }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderNonLabor = () => (
    <div ref={nonLaborRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📦 NON-LABOR COSTS</td></tr></tbody></table>
      <CopyButton targetRef={nonLaborRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Category</th>
          <th style={S.thSecondary}>Description</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Qty</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "right" as const }}>Unit Cost</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "right" as const }}>Total</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Software Licenses", desc: "[e.g., Development tools, testing tools, CI/CD platform]", qty: "[5]", unit: "$[2,000]", total: "$[10,000]" },
            { cat: "Cloud Infrastructure", desc: "[e.g., AWS/Azure hosting, storage, compute for 12 months]", qty: "[12 mo]", unit: "$[3,000]", total: "$[36,000]" },
            { cat: "Hardware", desc: "[e.g., Development workstations, testing devices]", qty: "[3]", unit: "$[2,500]", total: "$[7,500]" },
            { cat: "Training", desc: "[e.g., End-user training, admin training, materials]", qty: "[1]", unit: "$[15,000]", total: "$[15,000]" },
            { cat: "Vendor / Contractor", desc: "[e.g., Specialist consultant for integration work]", qty: "[200 hrs]", unit: "$[175]", total: "$[35,000]" },
            { cat: "Travel & Expenses", desc: "[e.g., Site visits, workshops, stakeholder meetings]", qty: "[1]", unit: "$[5,000]", total: "$[5,000]" },
            { cat: "[Add Category]", desc: "[Description]", qty: "", unit: "", total: "" },
          ].map((n, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{n.cat}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{n.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{n.qty}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const }}>{n.unit}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700 }}>{n.total}</td>
            </tr>);
          })}
          <tr>
            <td colSpan={4} style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white }}>NON-LABOR SUBTOTAL</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white, textAlign: "right" as const }}>$[108,500]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderContingency = () => (
    <div ref={contingencyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ CONTINGENCY & MANAGEMENT RESERVES</div>
      <CopyButton targetRef={contingencyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Reserve Type</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>%</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "right" as const }}>Amount</th>
          <th style={S.thSecondary}>Basis / Rationale</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, fontWeight: 700 }}>Contingency Reserve</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[10%]</td><td style={{ ...S.td0, textAlign: "right" as const, fontWeight: 700 }}>$[62,775]</td><td style={{ ...S.td0, fontSize: "11px" }}>[Known-unknowns: scope changes, rework, schedule delays. Based on risk register analysis.]</td></tr>
          <tr><td style={{ ...S.tdAlt, fontWeight: 700 }}>Management Reserve</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[5%]</td><td style={{ ...S.tdAlt, textAlign: "right" as const, fontWeight: 700 }}>$[31,388]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Unknown-unknowns: unforeseen events. Requires sponsor approval to access.]</td></tr>
        </tbody>
      </table>
      <p style={S.subNote}>Contingency reserve is part of the cost baseline. Management reserve is outside the baseline and requires sponsor approval.</p>
    </div>
  );

  const renderBasis = () => (
    <div ref={basisRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📖 BASIS OF ESTIMATE</td></tr></tbody></table>
      <CopyButton targetRef={basisRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Estimating Method</td><td style={S.td0}>[Bottom-up estimate based on WBS work packages. Validated with analogous estimates from similar projects.]</td></tr>
          <tr><td style={S.tdLabelAlt}>Accuracy Range</td><td style={S.tdAlt}>[Definitive: -5% to +10% of estimated total]</td></tr>
          <tr><td style={S.tdLabel}>Key Assumptions</td><td style={S.td0}>[Rates based on FY26 blended rates; no overtime premium; cloud costs based on current pricing tier]</td></tr>
          <tr><td style={S.tdLabelAlt}>Reference Projects</td><td style={S.tdAlt}>[Similar Project X ($580K, 10 months); Project Y ($450K, 8 months)]</td></tr>
          <tr><td style={S.tdLabel}>Exclusions</td><td style={S.td0}>[Ongoing operational costs post go-live; hardware refresh; future enhancements]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>💵 COST ESTIMATE SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { item: "Labor Costs", val: "$[519,250]", pct: "[72%]" },
            { item: "Non-Labor Costs", val: "$[108,500]", pct: "[15%]" },
            { item: "Contingency Reserve (10%)", val: "$[62,775]", pct: "[9%]" },
            { item: "Management Reserve (5%)", val: "$[31,388]", pct: "[4%]" },
          ].map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, width: "40%" }}>{s.item}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700, width: "25%" }}>{s.val}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, width: "15%" }}>{s.pct}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}></td>
            </tr>);
          })}
          <tr>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>TOTAL PROJECT BUDGET</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "right" as const, fontSize: "14px" }}>$[721,913]</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>100%</td>
            <td style={{ ...S.td0, backgroundColor: C.primary, color: C.white }}></td>
          </tr>
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
    <>{renderTitleBanner()}{renderHeader()}{renderLabor()}{renderNonLabor()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderContingency()}{renderBasis()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderSummary()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Calculator size={11} /> Cost Estimate</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Calculator size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Cost Estimate Worksheet</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Cost Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Bottom-up cost estimate with labor, non-labor, contingency, and management reserves. Full Worksheet shows all detail sections; Quick Estimate shows the summary only.</p>
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

export default function CostEstimateWorksheetPage() {
  return (<ThemeProvider><CostEstimateContent /></ThemeProvider>);
}
