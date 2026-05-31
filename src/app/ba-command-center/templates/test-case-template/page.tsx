"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TestTube2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Test Case", desc: "Detailed steps + test suite", icon: LayoutDashboard },
  { id: "compact", label: "Quick Test Case", desc: "Single test case only", icon: AlignJustify },
];

function TestCaseContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const suiteRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🧫 TEST CASE TEMPLATE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides a structured format for documenting individual test cases with preconditions, step-by-step instructions, expected results, and actual results.</strong> Each test case is linked to a requirement and includes pass/fail status tracking. The suite view provides a summary of all test cases for a feature or module.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>UAT execution, system testing,</strong> or <strong style={{ fontStyle: "italic" }}>documenting reproducible test scenarios that can be re-run across releases</strong>. Aligns with BABOK Knowledge Area: Solution Evaluation.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Test Suite</td>
            <td style={{ ...S.td0, width: "36%" }}>[e.g., Order Management — UAT Cycle 1]</td>
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

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 TEST CASE DETAILS</div>
      <CopyButton targetRef={detailRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Test Case ID", a: "[TC-001]" },
            { q: "Test Case Title", a: "[e.g., Verify successful order creation with valid data]" },
            { q: "Linked Requirement(s)", a: "[FR-001, FR-002, BR-001]" },
            { q: "Priority", a: "☐ Critical ☐ High ☐ Medium ☐ Low" },
            { q: "Test Type", a: "☐ Functional ☐ Integration ☐ Regression ☐ Smoke ☐ Exploratory" },
            { q: "Preconditions", a: "[e.g., 1) User is logged in with 'Operator' role 2) Product 'Widget-A' has ≥ 5 units in stock 3) Test payment method is configured]" },
            { q: "Test Data", a: "[e.g., Customer: testuser_ops@company.com | Product: Widget-A (SKU-001) | Qty: 2 | Promo: SAVE20]" },
            { q: "Assigned Tester", a: "[Name]" },
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

  const STEPS = [
    { step: 1, action: "Navigate to the Order Portal home page", expected: "Home page loads with product catalog displayed", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
    { step: 2, action: "Search for 'Widget-A' in the product search bar", expected: "Widget-A appears in search results with correct price ($71.25)", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
    { step: 3, action: "Click 'Add to Cart' and set quantity to 2", expected: "Cart shows Widget-A × 2 = $142.50; cart icon shows '2'", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
    { step: 4, action: "Apply promo code 'SAVE20' in the cart", expected: "20% discount applied; subtotal updates to $114.00; 'SAVE20 applied' message displayed", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
    { step: 5, action: "Click 'Checkout' and enter shipping details", expected: "Shipping form accepts valid address; shipping cost calculated; order total displayed", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
    { step: 6, action: "Select 'Standard Shipping' and proceed to payment", expected: "Free shipping applied (order > $100 per BR-002); total = $114.00 + tax", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
    { step: 7, action: "Enter test credit card details and click 'Place Order'", expected: "Payment authorized; order confirmation page shows Order ID (ORD-YYYYMMDD-NNNN format); confirmation email sent", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
    { step: 8, action: "Navigate to 'My Orders' and verify new order appears", expected: "Order listed with status 'Confirmed'; all details match (items, amounts, shipping)", actual: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
  ];

  const renderSteps = () => (
    <div ref={stepsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔢 TEST STEPS</td></tr></tbody></table>
      <CopyButton targetRef={stepsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "4%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thSecondary, width: "26%" }}>Action</th>
            <th style={{ ...S.thSecondary, width: "28%" }}>Expected Result</th>
            <th style={{ ...S.thSecondary, width: "28%" }}>Actual Result</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {STEPS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{row.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.expected}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", height: "30px" }}>{row.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "20%" }}>Overall Result</td>
            <td style={S.td0}>☐ Pass ☐ Fail ☐ Blocked ☐ Not Executed</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Execution Date</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Defects Logged</td>
            <td style={S.td0}>[DEF-XXX, DEF-YYY — or N/A if passed]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Notes / Observations</td>
            <td style={{ ...S.tdAlt, height: "36px" }}>[Any observations, screenshots referenced, or deviations from expected behavior]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSuite = () => (
    <div ref={suiteRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📚 TEST SUITE SUMMARY</div>
      <CopyButton targetRef={suiteRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>TC ID</th>
            <th style={S.thPrimary}>Test Case Title</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "8%" }}>Req ID</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Tester</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Result</th>
            <th style={{ ...S.thPrimary, width: "7%" }}>Defects</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "TC-001", title: "Verify successful order creation with valid data", pri: "Critical", priBg: "#FEE2E2", priFg: "#DC2626", req: "FR-001", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "TC-002", title: "Verify order rejected when total < $25 (BR-001)", pri: "High", priBg: "#FEF3C7", priFg: "#D97706", req: "BR-001", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "TC-003", title: "Verify free shipping applied for orders ≥ $100 (BR-002)", pri: "High", priBg: "#FEF3C7", priFg: "#D97706", req: "BR-002", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "TC-004", title: "Verify promo code single-use enforcement (BR-003)", pri: "High", priBg: "#FEF3C7", priFg: "#D97706", req: "BR-003", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "TC-005", title: "Verify payment decline handling and error message", pri: "Critical", priBg: "#FEE2E2", priFg: "#DC2626", req: "FR-004", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "TC-006", title: "Verify order cancellation within 2-hour window (BR-005)", pri: "Medium", priBg: "#DBEAFE", priFg: "#2563EB", req: "BR-005", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "TC-007", title: "Verify order status updates display correctly", pri: "Medium", priBg: "#DBEAFE", priFg: "#2563EB", req: "FR-010", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "TC-008", title: "Verify confirmation email sent on order placement", pri: "Medium", priBg: "#DBEAFE", priFg: "#2563EB", req: "FR-006", tester: "[Name]", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "—" },
            { id: "[Add]", title: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", req: "", tester: "", result: "—", rBg: "#F3F4F6", rFg: "#6B7280", defects: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.title}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.tester}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.rBg, row.rFg)}>{row.result}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.defects}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "18%" }}>Total Test Cases</td>
            <td style={{ ...S.td0, width: "15%" }}>[___]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Passed</td>
            <td style={{ ...S.td0, width: "10%", color: "#059669", fontWeight: 700 }}>[___]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Failed</td>
            <td style={{ ...S.td0, width: "10%", color: "#DC2626", fontWeight: 700 }}>[___]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Blocked</td>
            <td style={{ ...S.td0, color: "#D97706", fontWeight: 700 }}>[___]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Pass Rate</td>
            <td colSpan={7} style={S.tdAlt}>[___]% — Target: ≥ 95%</td>
          </tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><TestTube2 size={11} /> Test Case</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><TestTube2 size={20} className="text-blue-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Test Case Template</h2>
              <p className="text-xs font-medium text-blue-600">Details &bull; Steps &bull; Expected/Actual &bull; Test Suite</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured test case with preconditions, step-by-step instructions, expected vs actual results, and a test suite summary view. Full Test Case includes the suite; Quick Test Case shows a single test case.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderDetail()}{renderSteps()}{renderSuite()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderDetail()}{renderSteps()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TestCasePage() {
  return (<ThemeProvider><TestCaseContent /></ThemeProvider>);
}
