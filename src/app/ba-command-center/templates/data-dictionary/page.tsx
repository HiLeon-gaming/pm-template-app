"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Database, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dictionary", desc: "Fields + relationships + glossary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Field definitions only", icon: AlignJustify },
];

function DataDictionaryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const relRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const govRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🗄️ DATA DICTIONARY</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template documents every data element in a system or project scope with its definition, type, format, constraints, source, and business meaning.</strong> It serves as the single source of truth for data definitions, ensuring consistency between business stakeholders, developers, and testers. Includes entity relationships, a business glossary, and data governance notes.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>database design input, API specification,</strong> or <strong style={{ fontStyle: "italic" }}>ensuring all teams share a common understanding of data elements</strong>. Aligns with BABOK Technique: Data Dictionary.
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
            <td style={{ ...S.td0, width: "36%" }}>[DD-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Author (BA)</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Version / Date</td>
            <td style={S.tdAlt}>[1.0] — [MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Domain / Entity</td>
            <td style={S.td0}>[e.g., Order Management — Order Entity]</td>
            <td style={S.tdLabel}>Source System</td>
            <td style={S.td0}>[e.g., Order Management System (OMS)]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const FIELDS = [
    { name: "order_id", biz: "Order Number", type: "VARCHAR(20)", format: "ORD-YYYYMMDD-NNNN", req: "Yes", pk: "PK", pkBg: "#FEE2E2", pkFg: "#DC2626", def: "Unique identifier for each order, auto-generated at order creation", valid: "Must match pattern; unique across system", src: "System-generated", ex: "ORD-20260115-0042" },
    { name: "customer_id", biz: "Customer ID", type: "INT", format: "Numeric", req: "Yes", pk: "FK", pkBg: "#DBEAFE", pkFg: "#2563EB", def: "Reference to the customer placing the order", valid: "Must exist in Customer table", src: "Customer module", ex: "10452" },
    { name: "order_date", biz: "Order Date", type: "DATETIME", format: "YYYY-MM-DD HH:MM:SS", req: "Yes", pk: "—", pkBg: "#F3F4F6", pkFg: "#6B7280", def: "Date and time when the order was placed", valid: "Cannot be future date; must be within business hours for phone orders", src: "System timestamp", ex: "2026-01-15 14:32:08" },
    { name: "status", biz: "Order Status", type: "ENUM", format: "Draft|Confirmed|Picking|Shipped|Delivered|Cancelled", req: "Yes", pk: "—", pkBg: "#F3F4F6", pkFg: "#6B7280", def: "Current status of the order in the fulfillment lifecycle", valid: "Must be one of defined values; transitions follow state machine rules", src: "System / Warehouse", ex: "Confirmed" },
    { name: "total_amount", biz: "Order Total", type: "DECIMAL(10,2)", format: "$#,##0.00", req: "Yes", pk: "—", pkBg: "#F3F4F6", pkFg: "#6B7280", def: "Total order value including items, tax, and shipping", valid: "Must be ≥ $25.00 (BR-001); 2 decimal places", src: "Calculated", ex: "$142.50" },
    { name: "shipping_method", biz: "Shipping Method", type: "VARCHAR(30)", format: "Standard|Express|Overnight", req: "Yes", pk: "—", pkBg: "#F3F4F6", pkFg: "#6B7280", def: "Selected delivery method for the order", valid: "Must be one of defined values", src: "Customer selection", ex: "Standard" },
    { name: "promo_code", biz: "Promo Code", type: "VARCHAR(20)", format: "Alphanumeric", req: "No", pk: "—", pkBg: "#F3F4F6", pkFg: "#6B7280", def: "Promotional discount code applied to the order", valid: "Must exist in promo table; single-use per customer (BR-003); not expired", src: "Customer input", ex: "SAVE20" },
    { name: "notes", biz: "Order Notes", type: "TEXT", format: "Free text, max 500 chars", req: "No", pk: "—", pkBg: "#F3F4F6", pkFg: "#6B7280", def: "Customer or internal notes associated with the order", valid: "Max 500 characters; no HTML allowed", src: "Customer / CS Rep", ex: "Please leave at front door" },
    { name: "[add_field]", biz: "", type: "", format: "", req: "", pk: "—", pkBg: "#F3F4F6", pkFg: "#6B7280", def: "", valid: "", src: "", ex: "" },
  ];

  const renderFields = () => (
    <div ref={fieldsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 FIELD DEFINITIONS</div>
      <CopyButton targetRef={fieldsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "10%" }}>Field Name</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Business Name</th>
            <th style={{ ...S.thPrimary, width: "8%" }}>Data Type</th>
            <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>Key</th>
            <th style={{ ...S.thPrimary, width: "3%", textAlign: "center" as const }}>Req</th>
            <th style={S.thPrimary}>Definition &amp; Validation</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {FIELDS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "10px", fontFamily: "monospace" }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.biz}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontFamily: "monospace" }}>{row.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.pkBg, row.pkFg)}>{row.pk}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{row.def}{row.valid ? <><br /><span style={{ color: C.accent, fontWeight: 600 }}>Validation:</span> {row.valid}</> : null}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontFamily: "monospace" }}>{row.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRelationships = () => (
    <div ref={relRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🔗 ENTITY RELATIONSHIPS</div>
      <CopyButton targetRef={relRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "16%" }}>Parent Entity</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Relationship</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Child Entity</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>FK Field</th>
            <th style={S.thSecondary}>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            { parent: "Customer", rel: "1 → Many", child: "Order", fk: "customer_id", desc: "One customer can place many orders" },
            { parent: "Order", rel: "1 → Many", child: "Order_Item", fk: "order_id", desc: "One order contains many line items" },
            { parent: "Product", rel: "1 → Many", child: "Order_Item", fk: "product_id", desc: "One product can appear in many order line items" },
            { parent: "Order", rel: "1 → 1", child: "Payment", fk: "order_id", desc: "One order has one payment record" },
            { parent: "Order", rel: "1 → Many", child: "Order_Status_History", fk: "order_id", desc: "One order has many status change records (audit trail)" },
            { parent: "[Add]", rel: "—", child: "", fk: "", desc: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.parent}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.rel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.child}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontFamily: "monospace" }}>{row.fk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGlossary = () => (
    <div ref={glossRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📖 BUSINESS GLOSSARY</div>
      <CopyButton targetRef={glossRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "18%" }}>Term</th>
            <th style={S.thPrimary}>Business Definition</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Synonym(s)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { term: "Order", def: "A confirmed request from a customer to purchase one or more products, including delivery and payment details", syn: "Purchase Order, Sales Order" },
            { term: "SKU", def: "Stock Keeping Unit — unique identifier for each distinct product variant (size, color, etc.)", syn: "Product Code, Item Number" },
            { term: "Fulfillment", def: "The complete process of picking, packing, and shipping an order to the customer", syn: "Order Processing" },
            { term: "Backorder", def: "An order or part of an order that cannot be fulfilled immediately due to insufficient inventory", syn: "Out of Stock Order" },
            { term: "Credit Limit", def: "Maximum outstanding balance allowed for a B2B customer before orders are held for review", syn: "Credit Cap" },
            { term: "[Add term]", def: "", syn: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700 }}>{row.term}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" as const }}>{row.syn}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGovernance = () => (
    <div ref={govRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🏛️ DATA GOVERNANCE</div>
      <CopyButton targetRef={govRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Data owner", a: "[Who is the business owner of this data? e.g., VP of Operations for Order data]" },
            { q: "Data steward", a: "[Who maintains data quality? e.g., BA / Data Team]" },
            { q: "Data classification", a: "☐ Public ☐ Internal ☐ Confidential ☐ Restricted (PII/PHI)" },
            { q: "Retention policy", a: "[e.g., Active orders: indefinite; Cancelled: 7 years; Archived: 10 years then purge]" },
            { q: "PII fields", a: "[List any personally identifiable information fields — e.g., customer_name, email, shipping_address]" },
            { q: "Change process", a: "[How are data dictionary changes managed? e.g., CR required; impact analysis on reports and integrations]" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Database size={11} /> Data Dict</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Database size={20} className="text-teal-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Data Dictionary</h2>
              <p className="text-xs font-medium text-teal-600">Fields &bull; Types &bull; Relationships &bull; Glossary &bull; Governance</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Comprehensive data dictionary with field definitions, data types, validation rules, entity relationships, business glossary, and governance. Full Dictionary includes all sections; Quick Reference shows field definitions only.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderFields()}{renderRelationships()}{renderGlossary()}{renderGovernance()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderFields()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DataDictionaryPage() {
  return (<ThemeProvider><DataDictionaryContent /></ThemeProvider>);
}
