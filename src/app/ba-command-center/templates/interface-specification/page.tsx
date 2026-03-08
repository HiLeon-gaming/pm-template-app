"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Cable, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Spec", desc: "Endpoints + payload + errors + catalog", icon: LayoutDashboard },
  { id: "compact", label: "Quick Spec", desc: "Endpoint table only", icon: AlignJustify },
];

function InterfaceSpecContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const endpointsRef = useRef<HTMLDivElement>(null);
  const payloadRef = useRef<HTMLDivElement>(null);
  const errorsRef = useRef<HTMLDivElement>(null);
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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔌 INTERFACE SPECIFICATION</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template documents system-to-system interfaces including API endpoints, data payloads, authentication, error handling, and SLA requirements.</strong> Each interface is specified with its protocol, direction, frequency, data format, and error codes. Use it to ensure all integration points are clearly defined before development begins.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>API design handoff, integration testing planning,</strong> or <strong style={{ fontStyle: "italic" }}>documenting data flows between internal and external systems</strong>. Aligns with BABOK Technique: Interface Analysis.
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
            <td style={{ ...S.td0, width: "36%" }}>[IF-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Author (BA)</td>
            <td style={S.tdAlt}>[Name]</td>
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
      <div style={S.sectionBanner()}>📋 INTERFACE OVERVIEW</div>
      <CopyButton targetRef={overviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Interface Name", a: "[e.g., Order Management → Payment Gateway Integration]" },
            { q: "Source System", a: "[e.g., Order Management System (OMS) — internal]" },
            { q: "Target System", a: "[e.g., Stripe Payment Gateway — external SaaS]" },
            { q: "Direction", a: "☐ Unidirectional (Source → Target) ☐ Bidirectional ☐ Pub/Sub" },
            { q: "Protocol / Method", a: "☐ REST API ☐ SOAP ☐ GraphQL ☐ File Transfer (SFTP) ☐ Message Queue ☐ Webhook ☐ Other: [___]" },
            { q: "Data Format", a: "☐ JSON ☐ XML ☐ CSV ☐ Protobuf ☐ Other: [___]" },
            { q: "Authentication", a: "☐ API Key ☐ OAuth 2.0 ☐ JWT ☐ mTLS ☐ Basic Auth ☐ None" },
            { q: "Frequency / Trigger", a: "[e.g., Real-time (per transaction) | Batch: daily at 02:00 UTC | Event-driven: on order creation]" },
            { q: "SLA / Latency", a: "[e.g., < 500ms response time at 99th percentile; 99.9% uptime]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "18%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const ENDPOINTS = [
    { method: "POST", mBg: "#D1FAE5", mFg: "#059669", path: "/v1/payments/authorize", desc: "Submit payment authorization request", auth: "OAuth 2.0", rate: "100/min", req: "FR-004" },
    { method: "GET", mBg: "#DBEAFE", mFg: "#2563EB", path: "/v1/payments/{payment_id}", desc: "Retrieve payment status by ID", auth: "OAuth 2.0", rate: "200/min", req: "FR-010" },
    { method: "POST", mBg: "#D1FAE5", mFg: "#059669", path: "/v1/payments/{payment_id}/capture", desc: "Capture a previously authorized payment", auth: "OAuth 2.0", rate: "100/min", req: "FR-004" },
    { method: "POST", mBg: "#D1FAE5", mFg: "#059669", path: "/v1/payments/{payment_id}/refund", desc: "Process a full or partial refund", auth: "OAuth 2.0", rate: "50/min", req: "FR-015" },
    { method: "POST", mBg: "#D1FAE5", mFg: "#059669", path: "/v1/webhooks/payment-status", desc: "Receive async payment status updates (webhook)", auth: "HMAC Sig", rate: "N/A", req: "FR-010" },
    { method: "—", mBg: "#F3F4F6", mFg: "#6B7280", path: "[Add endpoint]", desc: "", auth: "", rate: "", req: "" },
  ];

  const renderEndpoints = () => (
    <div ref={endpointsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🔗 API ENDPOINTS</div>
      <CopyButton targetRef={endpointsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>Method</th>
            <th style={{ ...S.thSecondary, width: "22%" }}>Endpoint Path</th>
            <th style={S.thSecondary}>Description</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Auth</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Rate</th>
            <th style={{ ...S.thSecondary, width: "7%" }}>Req ID</th>
          </tr>
        </thead>
        <tbody>
          {ENDPOINTS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.mBg, row.mFg)}>{row.method}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{row.path}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{row.auth}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{row.rate}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: C.accent }}>{row.req}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPayload = () => (
    <div ref={payloadRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <div style={S.sectionBanner()}>📤 REQUEST PAYLOAD</div>
          <p style={{ ...S.subNote, marginBottom: "3px" }}>POST /v1/payments/authorize</p>
          <table style={S.tbl}>
            <thead><tr>
              <th style={{ ...S.thPrimary, width: "22%" }}>Field</th>
              <th style={{ ...S.thPrimary, width: "14%" }}>Type</th>
              <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Req</th>
              <th style={S.thPrimary}>Description</th>
            </tr></thead>
            <tbody>
              {[
                { field: "order_id", type: "string", req: "Yes", desc: "Unique order identifier from OMS" },
                { field: "amount", type: "decimal", req: "Yes", desc: "Payment amount in cents (e.g., 14250 = $142.50)" },
                { field: "currency", type: "string(3)", req: "Yes", desc: "ISO 4217 currency code (e.g., USD)" },
                { field: "payment_method", type: "object", req: "Yes", desc: "Card details or token reference" },
                { field: "customer_email", type: "string", req: "No", desc: "For receipt notification" },
                { field: "metadata", type: "object", req: "No", desc: "Key-value pairs for custom data" },
              ].map((row, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{row.field}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontFamily: "monospace" }}>{row.type}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{row.req}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <div style={S.sectionBanner(C.secondary)}>📥 RESPONSE PAYLOAD</div>
          <p style={{ ...S.subNote, marginBottom: "3px" }}>200 OK — Success Response</p>
          <table style={S.tbl}>
            <thead><tr>
              <th style={{ ...S.thSecondary, width: "22%" }}>Field</th>
              <th style={{ ...S.thSecondary, width: "14%" }}>Type</th>
              <th style={S.thSecondary}>Description</th>
            </tr></thead>
            <tbody>
              {[
                { field: "payment_id", type: "string", desc: "Unique payment identifier (gateway-generated)" },
                { field: "status", type: "enum", desc: "authorized | captured | declined | error" },
                { field: "authorization_code", type: "string", desc: "Bank authorization code (if authorized)" },
                { field: "amount", type: "decimal", desc: "Authorized amount in cents" },
                { field: "created_at", type: "datetime", desc: "ISO 8601 timestamp of authorization" },
                { field: "error_code", type: "string|null", desc: "Error code if declined/error (see error table)" },
              ].map((row, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{row.field}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontFamily: "monospace" }}>{row.type}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.desc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={payloadRef} label="Copy Section" />
    </div>
  );

  const renderErrors = () => (
    <div ref={errorsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ ERROR CODES &amp; HANDLING</div>
      <CopyButton targetRef={errorsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>HTTP</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Error Code</th>
            <th style={S.thPrimary}>Description</th>
            <th style={{ ...S.thPrimary, width: "30%" }}>OMS Handling</th>
          </tr>
        </thead>
        <tbody>
          {[
            { http: "200", code: "card_declined", desc: "Card issuer declined the transaction", handling: "Display 'Payment declined' to customer; suggest different payment method", hBg: "#FEF3C7" },
            { http: "200", code: "insufficient_funds", desc: "Insufficient funds on the card", handling: "Display 'Insufficient funds' message; do not create order", hBg: "#FEF3C7" },
            { http: "400", code: "invalid_request", desc: "Missing or malformed request parameters", handling: "Log error; display generic error; alert dev team", hBg: "#FEE2E2" },
            { http: "401", code: "authentication_error", desc: "Invalid or expired API credentials", handling: "Retry with refreshed token; if fails, alert ops team", hBg: "#FEE2E2" },
            { http: "429", code: "rate_limited", desc: "Too many requests — rate limit exceeded", handling: "Implement exponential backoff; retry after Retry-After header value", hBg: "#FEF3C7" },
            { http: "500", code: "server_error", desc: "Gateway internal error", handling: "Retry once after 10s; if fails, queue for manual processing; alert ops", hBg: "#FEE2E2" },
            { http: "504", code: "timeout", desc: "Gateway did not respond within SLA", handling: "Retry once; check payment status via GET endpoint before retrying auth", hBg: "#FEE2E2" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontFamily: "monospace" }}>{row.http}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontFamily: "monospace", fontWeight: 600 }}>{row.code}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: row.hBg, fontSize: "10px" }}>{row.handling}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCatalog = () => (
    <div ref={catalogRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📚 INTERFACE CATALOG</div>
      <CopyButton targetRef={catalogRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
            <th style={{ ...S.thSecondary, width: "18%" }}>Interface Name</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>Source</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>Target</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Protocol</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Direction</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "IF-001", name: "Payment Authorization", src: "OMS", tgt: "Stripe", proto: "REST", dir: "Bi-dir", stat: "Designed", sBg: "#DBEAFE", sFg: "#2563EB" },
            { id: "IF-002", name: "Inventory Check", src: "OMS", tgt: "Inventory DB", proto: "REST", dir: "Request", stat: "Developed", sBg: "#D1FAE5", sFg: "#059669" },
            { id: "IF-003", name: "Order Notification", src: "OMS", tgt: "Email Service", proto: "Queue", dir: "Pub/Sub", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "IF-004", name: "Warehouse Dispatch", src: "OMS", tgt: "WMS", proto: "REST", dir: "Push", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "IF-005", name: "ERP Sync", src: "OMS", tgt: "SAP", proto: "SFTP", dir: "Batch", stat: "Not Started", sBg: "#F3F4F6", sFg: "#6B7280" },
            { id: "[Add]", name: "", src: "", tgt: "", proto: "—", dir: "—", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.src}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.tgt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{row.proto}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{row.dir}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><Cable size={11} /> Interface</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><Cable size={20} className="text-fuchsia-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Interface Specification</h2>
              <p className="text-xs font-medium text-fuchsia-600">Endpoints &bull; Payloads &bull; Error Handling &bull; Interface Catalog</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document system interfaces with API endpoints, request/response payloads, error handling, and a full interface catalog. Full Spec is comprehensive; Quick Spec shows the endpoint table only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-md shadow-fuchsia-200" : "bg-white text-slate-600 border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-fuchsia-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderOverview()}{renderEndpoints()}{renderPayload()}{renderErrors()}{renderCatalog()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderEndpoints()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function InterfaceSpecPage() {
  return (<ThemeProvider><InterfaceSpecContent /></ThemeProvider>);
}
