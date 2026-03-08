"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookMarked, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Catalog", desc: "Rules + validation + governance", icon: LayoutDashboard },
  { id: "compact", label: "Quick Catalog", desc: "Rules table only", icon: AlignJustify },
];

function BRCContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const validRef = useRef<HTMLDivElement>(null);
  const govRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📏 BUSINESS RULES CATALOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template captures and organizes all business rules that govern how the organization operates.</strong> Each rule is documented with its type (constraint, computation, inference, action-enabling), source, enforcement method, and linked requirements. The catalog ensures rules are explicit, testable, and consistently applied across systems and processes.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>system design input, compliance documentation,</strong> or <strong style={{ fontStyle: "italic" }}>ensuring business logic is correctly implemented in software</strong>. Aligns with BABOK Technique: Business Rules Analysis.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Document ID</td>
            <td style={{ ...S.td0, width: "36%" }}>[BRC-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Author (BA)</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Version / Date</td>
            <td style={S.tdAlt}>[1.0] — [MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Domain</td>
            <td style={S.td0}>[e.g., Order Management, Finance, HR]</td>
            <td style={S.tdLabel}>Total Rules</td>
            <td style={S.td0}>[___]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const RULES = [
    { id: "BR-001", name: "Minimum Order Value", type: "Constraint", tBg: "#FEE2E2", tFg: "#DC2626", desc: "All orders must have a total value of at least $25.00. Orders below this threshold shall be rejected with an error message.", source: "Policy Manual §3.2", enforcement: "System", eBg: "#DBEAFE", eFg: "#2563EB", req: "FR-001, FR-002", status: "Active", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "BR-002", name: "Free Shipping Threshold", type: "Computation", tBg: "#DBEAFE", tFg: "#2563EB", desc: "Orders with a subtotal of $100.00 or more qualify for free standard shipping. Shipping cost is calculated as $0.00 when threshold is met.", source: "Marketing Policy", enforcement: "System", eBg: "#DBEAFE", eFg: "#2563EB", req: "FR-003", status: "Active", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "BR-003", name: "Promo Code Single Use", type: "Constraint", tBg: "#FEE2E2", tFg: "#DC2626", desc: "Each promotional code can only be used once per customer account. Expired codes shall be rejected with expiry date displayed.", source: "Marketing Policy", enforcement: "System", eBg: "#DBEAFE", eFg: "#2563EB", req: "FR-010", status: "Active", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "BR-004", name: "Tax Calculation", type: "Computation", tBg: "#DBEAFE", tFg: "#2563EB", desc: "Sales tax is calculated based on the shipping destination state/province. Tax rates are sourced from the tax rate table updated quarterly.", source: "Finance / Legal", enforcement: "System", eBg: "#DBEAFE", eFg: "#2563EB", req: "FR-003, NFR-033", status: "Active", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "BR-005", name: "Order Cancellation Window", type: "Action-Enabling", tBg: "#D1FAE5", tFg: "#059669", desc: "Customers may cancel an order within 2 hours of placement if the order has not entered 'Picking' status. After this window, cancellation requires manager approval.", source: "CS Policy §5.1", enforcement: "System + Manual", eBg: "#FEF3C7", eFg: "#D97706", req: "FR-015", status: "Active", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "BR-006", name: "Credit Limit Check", type: "Inference", tBg: "#EDE9FE", tFg: "#7C3AED", desc: "If a B2B customer's outstanding balance plus new order total exceeds their credit limit, the order is held for credit review. System infers hold status from balance + order value.", source: "Finance Policy", enforcement: "System", eBg: "#DBEAFE", eFg: "#2563EB", req: "FR-020", status: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
    { id: "BR-007", name: "Auto-Escalation for Delayed Shipment", type: "Action-Enabling", tBg: "#D1FAE5", tFg: "#059669", desc: "If an order is not shipped within 72 hours of creation, the system automatically escalates to the warehouse manager and notifies the customer.", source: "SLA Agreement", enforcement: "System", eBg: "#DBEAFE", eFg: "#2563EB", req: "FR-025", status: "Active", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "BR-008", name: "Password Complexity", type: "Constraint", tBg: "#FEE2E2", tFg: "#DC2626", desc: "Passwords must be minimum 12 characters, include uppercase, lowercase, number, and special character. Cannot reuse last 5 passwords.", source: "Security Policy", enforcement: "System", eBg: "#DBEAFE", eFg: "#2563EB", req: "NFR-011", status: "Active", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "[Add]", name: "", type: "—", tBg: "#F3F4F6", tFg: "#6B7280", desc: "", source: "", enforcement: "—", eBg: "#F3F4F6", eFg: "#6B7280", req: "", status: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
  ];

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 BUSINESS RULES</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
            <th style={{ ...S.thPrimary, width: "12%" }}>Rule Name</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
            <th style={S.thPrimary}>Description</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Source</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Enforce</th>
            <th style={{ ...S.thPrimary, width: "8%" }}>Linked Reqs</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {RULES.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.tBg, row.tFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{row.source}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.eBg, row.eFg)}>{row.enforcement}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderValidation = () => (
    <div ref={validRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🧪 RULE VALIDATION MATRIX</div>
      <CopyButton targetRef={validRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Track how each business rule is validated — through system testing, manual review, or both.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Rule ID</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Rule Name</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Test Case</th>
            <th style={S.thSecondary}>How to Validate</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Result</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "BR-001", name: "Min Order Value", tc: "TC-050", how: "Submit order with total $24.99 → expect rejection. Submit $25.00 → expect acceptance.", result: "Pass", rBg: "#D1FAE5", rFg: "#059669" },
            { id: "BR-002", name: "Free Shipping", tc: "TC-051", how: "Order $99.99 → standard shipping charged. Order $100.00 → shipping = $0.00.", result: "Pass", rBg: "#D1FAE5", rFg: "#059669" },
            { id: "BR-003", name: "Promo Single Use", tc: "TC-052", how: "Apply valid promo → accepted. Re-use same promo → rejected with message.", result: "—", rBg: "#F3F4F6", rFg: "#6B7280" },
            { id: "BR-005", name: "Cancel Window", tc: "TC-053", how: "Cancel within 2 hrs (not picking) → allowed. Cancel after 2 hrs → requires manager.", result: "—", rBg: "#F3F4F6", rFg: "#6B7280" },
            { id: "[Add]", name: "", tc: "", how: "", result: "—", rBg: "#F3F4F6", rFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.tc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.rBg, row.rFg)}>{row.result}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGovernance = () => (
    <div ref={govRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🏛️ RULE GOVERNANCE</div>
      <CopyButton targetRef={govRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Rule type legend", a: "Constraint = restriction/limitation | Computation = calculation formula | Inference = derived conclusion | Action-Enabling = triggers an action when conditions are met" },
            { q: "Rule owner", a: "[Who has authority to approve changes to business rules? e.g., Business Process Owner + Legal for compliance rules]" },
            { q: "Change process", a: "[How are rule changes managed? e.g., Change Request required, impact analysis on linked requirements, re-testing]" },
            { q: "Review frequency", a: "[e.g., Quarterly review of all active rules; annual compliance audit]" },
            { q: "Conflict resolution", a: "[When rules conflict, which takes precedence? e.g., Regulatory rules > company policy > operational convenience]" },
            { q: "Next review date", a: "[MM/DD/YYYY]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), fontSize: "11px" }}>{row.a}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><BookMarked size={11} /> Rules</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><BookMarked size={20} className="text-purple-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Business Rules Catalog</h2>
              <p className="text-xs font-medium text-purple-600">Rules &bull; Types &bull; Validation &bull; Governance</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Comprehensive catalog of business rules with type classification, enforcement method, linked requirements, validation matrix, and governance framework. Full Catalog includes validation and governance; Quick Catalog shows the rules table.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderRules()}{renderValidation()}{renderGovernance()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderRules()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BusinessRulesCatalogPage() {
  return (<ThemeProvider><BRCContent /></ThemeProvider>);
}
