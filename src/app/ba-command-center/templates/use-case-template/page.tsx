"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, GitBranch, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Use Case", desc: "Flows + rules + catalog", icon: LayoutDashboard },
  { id: "compact", label: "Quick Use Case", desc: "Main + alternate flows", icon: AlignJustify },
];

function UseCaseContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔀 USE CASE TEMPLATE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template documents use cases with actors, preconditions, main flow, alternate flows, exception handling, and postconditions.</strong> It provides the detailed step-by-step interaction between the user and the system, covering both happy-path and edge-case scenarios. Includes a use case catalog for managing multiple use cases.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>system behavior specification, developer handoff,</strong> or <strong style={{ fontStyle: "italic" }}>test case derivation</strong>. Aligns with BABOK Technique: Use Cases and Scenarios.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Use Case ID</td>
            <td style={{ ...S.td0, width: "36%" }}>[UC-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Author (BA)</td>
            <td style={S.tdAlt}>[Your Name]</td>
            <td style={S.tdLabelAlt}>Version / Date</td>
            <td style={S.tdAlt}>[1.0] — [MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderOverview = () => (
    <div ref={overviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📋 USE CASE OVERVIEW</td></tr></tbody></table>
      <CopyButton targetRef={overviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Use Case Name", a: "[e.g., Place New Order]" },
            { q: "Brief Description", a: "[A customer places a new order through the web portal by selecting products, entering shipping details, and completing payment]" },
            { q: "Primary Actor", a: "[e.g., Registered Customer]" },
            { q: "Secondary Actors", a: "[e.g., Payment Gateway, Inventory System, Email Service]" },
            { q: "Trigger", a: "[e.g., Customer clicks 'New Order' button on dashboard]" },
            { q: "Preconditions", a: "[e.g., Customer is authenticated; at least one product is available in inventory; payment method is on file]" },
            { q: "Postconditions (Success)", a: "[e.g., Order created with status 'Confirmed'; inventory decremented; confirmation email sent; payment captured]" },
            { q: "Postconditions (Failure)", a: "[e.g., No order created; inventory unchanged; customer shown error message with resolution steps]" },
            { q: "Priority", a: "☐ Must ☐ Should ☐ Could" },
            { q: "Frequency", a: "[e.g., ~200 orders/day; peak during promotions ~500/day]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "20%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMainFlow = () => (
    <div ref={mainRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>▶️ MAIN FLOW (Happy Path)</td></tr></tbody></table>
      <CopyButton targetRef={mainRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>Step</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>Actor</th>
            <th style={S.thSecondary}>Action</th>
            <th style={{ ...S.thSecondary, width: "30%" }}>System Response</th>
          </tr>
        </thead>
        <tbody>
          {[
            { step: 1, actor: "Customer", action: "Clicks 'New Order' from dashboard", response: "System displays product catalog with available items and current prices" },
            { step: 2, actor: "Customer", action: "Selects products and quantities, clicks 'Add to Cart'", response: "System validates availability, adds items to cart, updates running total" },
            { step: 3, actor: "Customer", action: "Reviews cart and clicks 'Proceed to Checkout'", response: "System displays shipping form with saved addresses pre-populated" },
            { step: 4, actor: "Customer", action: "Confirms shipping address and selects delivery method", response: "System calculates shipping cost and displays order summary" },
            { step: 5, actor: "Customer", action: "Reviews order total and clicks 'Place Order'", response: "System sends payment request to Payment Gateway" },
            { step: 6, actor: "Payment GW", action: "Processes payment authorization", response: "Returns authorization code to system" },
            { step: 7, actor: "System", action: "Receives successful payment confirmation", response: "Creates order with status 'Confirmed'; decrements inventory; sends confirmation email" },
            { step: 8, actor: "Customer", action: "Receives confirmation page and email", response: "Displays order number, estimated delivery date, and tracking link" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{row.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.actor}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.response}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAlternate = () => (
    <div ref={altRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>↩️ ALTERNATE FLOWS</td></tr></tbody></table>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Alt #</th>
                <th style={{ ...S.thPrimary, width: "16%" }}>Branches From</th>
                <th style={S.thPrimary}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { alt: "A1", from: "Step 2", desc: "Product is out of stock — system displays 'Unavailable' badge and suggests similar products. Customer selects alternative or removes item." },
                { alt: "A2", from: "Step 4", desc: "Customer enters a new shipping address — system validates address format and saves to profile if requested." },
                { alt: "A3", from: "Step 5", desc: "Customer applies a promo code — system validates code, applies discount, and recalculates total." },
                { alt: "A4", from: "", desc: "[Add alternate flow]" },
              ].map((row, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{row.alt}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.from}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>⚠️ EXCEPTION FLOWS</td></tr></tbody></table>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Exc #</th>
                <th style={{ ...S.thSecondary, width: "16%" }}>Occurs At</th>
                <th style={S.thSecondary}>Description &amp; System Response</th>
              </tr>
            </thead>
            <tbody>
              {[
                { exc: "E1", at: "Step 6", desc: "Payment declined — system displays error message, suggests checking card details or using a different payment method. Order is not created." },
                { exc: "E2", at: "Step 6", desc: "Payment gateway timeout — system retries once after 10s. If still fails, displays 'Unable to process payment, try again later.'" },
                { exc: "E3", at: "Step 7", desc: "Inventory changed during checkout (race condition) — system notifies customer that an item is no longer available, offers to adjust order." },
                { exc: "E4", at: "", desc: "[Add exception flow]" },
              ].map((row, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#DC2626" }}>{row.exc}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.at}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={altRef} label="Copy Section" />
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📏 BUSINESS RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Rule ID</th>
            <th style={S.thPrimary}>Business Rule</th>
            <th style={{ ...S.thPrimary, width: "12%" }}>Applies To</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "BR-001", rule: "Minimum order value is $25.00 — orders below this amount are rejected with a message.", step: "Step 5" },
            { id: "BR-002", rule: "Maximum 50 items per order — exceeding this triggers a split-order prompt.", step: "Step 2" },
            { id: "BR-003", rule: "Promo codes are single-use and expire on the listed date.", step: "Alt A3" },
            { id: "BR-004", rule: "Free shipping applies to orders over $100.", step: "Step 4" },
            { id: "BR-005", rule: "[Add business rule]", step: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.rule}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.step}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCatalog = () => (
    <div ref={catalogRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📚 USE CASE CATALOG</td></tr></tbody></table>
      <CopyButton targetRef={catalogRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>UC ID</th>
            <th style={{ ...S.thSecondary, width: "18%" }}>Use Case Name</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Primary Actor</th>
            <th style={S.thSecondary}>Brief Description</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "UC-001", name: "Place New Order", actor: "Customer", desc: "Customer creates a new order through web portal", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Complete", sBg: "#D1FAE5", sFg: "#059669" },
            { id: "UC-002", name: "Cancel Order", actor: "Customer", desc: "Customer cancels a pending order before fulfillment", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "UC-003", name: "Generate Report", actor: "Manager", desc: "Manager generates order summary and analytics reports", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", stat: "Planned", sBg: "#DBEAFE", sFg: "#2563EB" },
            { id: "UC-004", name: "Manage Inventory", actor: "Admin", desc: "Admin updates product catalog and stock levels", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Planned", sBg: "#DBEAFE", sFg: "#2563EB" },
            { id: "UC-005", name: "[Add use case]", actor: "", desc: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px" }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.actor}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><GitBranch size={11} /> Use Case</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><GitBranch size={20} className="text-teal-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Use Case Template</h2>
              <p className="text-xs font-medium text-teal-600">Actors &bull; Main Flow &bull; Alternates &bull; Exceptions &bull; Business Rules</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document use cases with actors, preconditions, step-by-step main flow, alternate flows, exception handling, business rules, and a use case catalog. Full Use Case is comprehensive; Quick Use Case covers main and alternate flows.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderOverview()}{renderMainFlow()}{renderAlternate()}{renderRules()}{renderCatalog()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderOverview()}{renderMainFlow()}{renderAlternate()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function UseCasePage() {
  return (<ThemeProvider><UseCaseContent /></ThemeProvider>);
}
