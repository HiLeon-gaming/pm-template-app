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
  { id: "full", label: "Full Business Case", desc: "All sections + financials", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Problem + recommendation", icon: AlignJustify },
];

function BusinessCaseContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const alternativesRef = useRef<HTMLDivElement>(null);
  const financialRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const recommendRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>💰 BUSINESS CASE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Business Case provides the financial and strategic justification for undertaking a project.</strong> It documents the problem or opportunity, evaluates alternatives, presents cost-benefit analysis, and delivers a formal recommendation to decision-makers.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>project selection, portfolio prioritization,</strong> or <strong style={{ fontStyle: "italic" }}>investment committee presentations</strong>. Aligns with PMBOK Integration Management — Initiating Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[Name, Title]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
          <tr><td style={S.tdLabel}>Sponsor</td><td style={S.td0}>[Sponsor Name]</td><td style={S.tdLabel}>Department</td><td style={S.td0}>[Department]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderProblem = () => (
    <div ref={problemRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 PROBLEM / OPPORTUNITY STATEMENT</div>
      <CopyButton targetRef={problemRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Current Situation</td><td style={S.td0}>[Describe the current state, pain points, and inefficiencies. Example: "Manual invoice processing takes 5 days with a 5% error rate."]</td></tr>
          <tr><td style={S.tdLabelAlt}>Business Impact</td><td style={S.tdAlt}>[Quantify the cost of inaction. Example: "$150K annually in rework, late fees, and lost discounts."]</td></tr>
          <tr><td style={S.tdLabel}>Strategic Alignment</td><td style={S.td0}>[Which strategic goals does this support? Example: "Supports FY26 Goal #3: Operational Efficiency."]</td></tr>
          <tr><td style={S.tdLabelAlt}>Urgency / Drivers</td><td style={S.tdAlt}>[Why now? Example: "Regulatory deadline Dec 2026; competitor already automated."]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderAlternatives = () => (
    <div ref={alternativesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔄 ALTERNATIVES ANALYSIS</td></tr></tbody></table>
      <CopyButton targetRef={alternativesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Option</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "right" as const }}>Est. Cost</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Timeline</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Risk</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Recommend?</th>
        </tr></thead>
        <tbody>
          {[
            { opt: "Option A", desc: "[e.g., Do nothing — maintain status quo]", cost: "$0", time: "N/A", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, rec: "No", recBg: C.badgeGrayBg, recFg: C.badgeGrayFg },
            { opt: "Option B", desc: "[e.g., Buy commercial off-the-shelf solution]", cost: "$[amount]", time: "[months]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, rec: "No", recBg: C.badgeGrayBg, recFg: C.badgeGrayFg },
            { opt: "Option C", desc: "[e.g., Build custom solution in-house]", cost: "$[amount]", time: "[months]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, rec: "✓ Yes", recBg: C.badgeGreenBg, recFg: C.badgeGreenFg },
            { opt: "[Option D]", desc: "[Add alternative]", cost: "$[amount]", time: "[months]", risk: "—", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg, rec: "—", recBg: C.badgeGrayBg, recFg: C.badgeGrayFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700 }}>{a.opt}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{a.cost}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{a.time}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.rBg, a.rFg)}>{a.risk}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.recBg, a.recFg)}>{a.rec}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFinancial = () => (
    <div ref={financialRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>💵 FINANCIAL ANALYSIS</div>
      <CopyButton targetRef={financialRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "35%" }}>Financial Metric</th>
          <th style={{ ...S.thSecondary, width: "20%", textAlign: "right" as const }}>Value</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Total Investment (CapEx + OpEx)", val: "$[amount]", note: "[Breakdown: software, labor, infrastructure, training]" },
            { metric: "Annual Operating Cost (Yr 1)", val: "$[amount]", note: "[Licensing, maintenance, support FTEs]" },
            { metric: "Annual Cost Savings", val: "$[amount]", note: "[Labor reduction, error elimination, efficiency gains]" },
            { metric: "Revenue Impact", val: "$[amount]", note: "[New revenue streams or accelerated revenue]" },
            { metric: "Net Present Value (NPV)", val: "$[amount]", note: "[Discount rate: [X]%, over [N] years]" },
            { metric: "Internal Rate of Return (IRR)", val: "[X]%", note: "[Hurdle rate: [X]%]" },
            { metric: "Return on Investment (ROI)", val: "[X]%", note: "[= (Benefits - Costs) / Costs × 100]" },
            { metric: "Payback Period", val: "[X] months", note: "[When cumulative benefits exceed investment]" },
          ].map((f, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{f.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700, color: C.primary }}>{f.val}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{f.note}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>All financial projections should be validated by the Finance department before presentation to the investment committee.</p>
    </div>
  );

  const renderBenefits = () => (
    <div ref={benefitsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>✅ BENEFITS SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={benefitsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "50%" }}>Tangible Benefits</th>
          <th style={{ ...S.thSecondary, width: "50%" }}>Intangible Benefits</th>
        </tr></thead>
        <tbody>
          <tr><td style={S.td0}>[e.g., $200K annual cost savings from automation]</td><td style={S.td0}>[e.g., Improved employee satisfaction / morale]</td></tr>
          <tr><td style={S.tdAlt}>[e.g., 40% reduction in processing time]</td><td style={S.tdAlt}>[e.g., Enhanced brand reputation]</td></tr>
          <tr><td style={S.td0}>[e.g., 95% reduction in error rate]</td><td style={S.td0}>[e.g., Better regulatory compliance posture]</td></tr>
          <tr><td style={S.tdAlt}>[Add tangible benefit]</td><td style={S.tdAlt}>[Add intangible benefit]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ RISKS & DEPENDENCIES</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Risk / Dependency</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Likelihood</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={S.thSecondary}>Mitigation</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[e.g., Budget overrun due to scope changes]", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, imp: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, mit: "[e.g., Fixed-scope contract with 10% contingency]" },
            { risk: "[e.g., Vendor delivery delay]", like: "Low", lBg: C.badgeGreenBg, lFg: C.badgeGreenFg, imp: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, mit: "[e.g., Penalty clause in contract; identify backup vendor]" },
            { risk: "[e.g., User adoption resistance]", like: "High", lBg: C.badgeRedBg, lFg: C.badgeRedFg, imp: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, mit: "[e.g., Change management program; early user involvement]" },
            { risk: "[Add risk]", like: "—", lBg: C.badgeGrayBg, lFg: C.badgeGrayFg, imp: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, mit: "[Mitigation strategy]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.risk}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.lBg, r.lFg)}>{r.like}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.imp}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.mit}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRecommendation = () => (
    <div ref={recommendRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🏆 RECOMMENDATION & DECISION</td></tr></tbody></table>
      <CopyButton targetRef={recommendRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Recommended Option</td><td style={{ ...S.td0, fontWeight: 700 }}>[Option C — Build custom solution in-house]</td></tr>
          <tr><td style={S.tdLabelAlt}>Rationale</td><td style={S.tdAlt}>[Summarize why this option best meets the business need, balancing cost, risk, and strategic alignment.]</td></tr>
          <tr><td style={S.tdLabel}>Requested Investment</td><td style={{ ...S.td0, fontWeight: 700, color: C.primary }}>$[total amount]</td></tr>
          <tr><td style={S.tdLabelAlt}>Expected Timeline</td><td style={S.tdAlt}>[X months from approval to go-live]</td></tr>
          <tr><td style={S.tdLabel}>Decision Required By</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Approver</th>
          <th style={{ ...S.thSecondary, width: "16%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Decision</th>
          <th style={S.thSecondary}>Comments</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Name]", role: "Sponsor", dec: "Approve", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg },
            { name: "[Name]", role: "Finance", dec: "Pending", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
            { name: "[Name]", role: "CIO / CTO", dec: "Pending", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{a.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.dBg, a.dFg)}>{a.dec}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>&nbsp;</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;•&nbsp; PM Command Center &nbsp;•&nbsp; © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderHeader()}{renderProblem()}{renderAlternatives()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderFinancial()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderBenefits()}</td>
      </tr></tbody></table>
      {renderRisks()}{renderRecommendation()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderProblem()}{renderRecommendation()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><DollarSign size={11} /> Business Case</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><DollarSign size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Business Case</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Initiating Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Cost-benefit analysis justifying the project investment. Full Business Case includes alternatives analysis, financial metrics, and risk assessment; Quick Summary focuses on problem statement and recommendation.</p>
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

export default function BusinessCasePage() {
  return (<ThemeProvider><BusinessCaseContent /></ThemeProvider>);
}
