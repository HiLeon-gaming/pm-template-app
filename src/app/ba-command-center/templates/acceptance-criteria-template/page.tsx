"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Template", desc: "GWT + scenarios + sign-off", icon: LayoutDashboard },
  { id: "compact", label: "Quick AC", desc: "GWT table only", icon: AlignJustify },
];

function AcceptanceCriteriaContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gwtRef = useRef<HTMLDivElement>(null);
  const scenarioRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const signoffRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>✅ ACCEPTANCE CRITERIA TEMPLATE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template defines testable acceptance criteria using the Given/When/Then (GWT) format.</strong> Each requirement is broken into specific scenarios with expected results, test status tracking, and formal sign-off. The GWT format ensures criteria are unambiguous, testable, and directly traceable to test cases.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>sprint review preparation, QA handoff,</strong> or <strong style={{ fontStyle: "italic" }}>UAT test case derivation</strong>. Aligns with BABOK Technique: Acceptance and Evaluation Criteria.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Requirement ID</td>
            <td style={{ ...S.td0, width: "36%" }}>[FR-001 / US-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Feature / Story</td>
            <td style={S.tdAlt}>[e.g., Place New Order — Inventory validation at checkout]</td>
            <td style={S.tdLabelAlt}>Author (BA)</td>
            <td style={S.tdAlt}>[Your Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Version</td>
            <td style={S.td0}>[1.0]</td>
            <td style={S.tdLabel}>Date</td>
            <td style={S.td0}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const AC_ITEMS = [
    { id: "AC-001", g: "A customer has items in their cart and proceeds to checkout", w: "The system checks inventory for each item in the cart", t: "All items with sufficient stock show a green ✓ and the 'Place Order' button is enabled", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Pass", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "AC-002", g: "One or more items in the cart are out of stock", w: "The system checks inventory for each item", t: "Out-of-stock items are flagged with a red ✗ badge, 'Place Order' is disabled, and a message suggests removing or replacing the item", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Pass", sBg: "#D1FAE5", sFg: "#059669" },
    { id: "AC-003", g: "An item has exactly 1 unit remaining in inventory", w: "Customer adds 2 units of that item to cart and proceeds to checkout", t: "System shows 'Only 1 available' message, adjusts quantity to 1, and recalculates total", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", stat: "Fail", sBg: "#FEE2E2", sFg: "#DC2626" },
    { id: "AC-004", g: "Inventory changes between cart and checkout (race condition)", w: "Customer clicks 'Place Order' but inventory was decremented by another customer", t: "System re-validates inventory, displays 'Item no longer available' for affected items, and does not create the order", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", stat: "Not Tested", sBg: "#F3F4F6", sFg: "#6B7280" },
    { id: "AC-005", g: "Cart contains items from multiple warehouses", w: "System checks inventory across all warehouses", t: "System aggregates availability across warehouses and selects optimal fulfillment location", pri: "Could", priBg: "#DBEAFE", priFg: "#2563EB", stat: "Not Tested", sBg: "#F3F4F6", sFg: "#6B7280" },
    { id: "AC-006", g: "", w: "[Add acceptance criterion]", t: "", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
  ];

  const renderGWT = () => (
    <div ref={gwtRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 ACCEPTANCE CRITERIA (Given / When / Then)</div>
      <CopyButton targetRef={gwtRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>AC #</th>
            <th style={{ ...S.thPrimary, width: "22%" }}>GIVEN (Context)</th>
            <th style={{ ...S.thPrimary, width: "22%" }}>WHEN (Action)</th>
            <th style={{ ...S.thPrimary, width: "24%" }}>THEN (Expected Result)</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Test Result</th>
          </tr>
        </thead>
        <tbody>
          {AC_ITEMS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.g}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.w}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.t}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderScenarios = () => (
    <div ref={scenarioRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🧪 TEST SCENARIOS</div>
      <CopyButton targetRef={scenarioRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Detailed test scenarios derived from the acceptance criteria above. Each scenario maps to one or more AC items.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>TC #</th>
            <th style={{ ...S.thSecondary, width: "8%" }}>Maps to</th>
            <th style={S.thSecondary}>Test Scenario</th>
            <th style={{ ...S.thSecondary, width: "20%" }}>Test Data</th>
            <th style={{ ...S.thSecondary, width: "18%" }}>Expected Result</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Result</th>
          </tr>
        </thead>
        <tbody>
          {[
            { tc: "TC-01", maps: "AC-001", scenario: "Add 3 in-stock items to cart, proceed to checkout", data: "SKU-A (50 units), SKU-B (10), SKU-C (200)", expected: "All items show green ✓, Place Order enabled", result: "Pass", rBg: "#D1FAE5", rFg: "#059669" },
            { tc: "TC-02", maps: "AC-002", scenario: "Add 1 out-of-stock item + 2 in-stock items, checkout", data: "SKU-D (0 units), SKU-A, SKU-B", expected: "SKU-D flagged red, Place Order disabled", result: "Pass", rBg: "#D1FAE5", rFg: "#059669" },
            { tc: "TC-03", maps: "AC-003", scenario: "Add 2 units of item with only 1 in stock", data: "SKU-E (1 unit), qty=2", expected: "Quantity adjusted to 1 with warning message", result: "Fail", rBg: "#FEE2E2", rFg: "#DC2626" },
            { tc: "TC-04", maps: "AC-004", scenario: "Simulate concurrent checkout — deplete inventory mid-checkout", data: "SKU-F: decrement to 0 between cart and order", expected: "Order blocked, item flagged unavailable", result: "—", rBg: "#F3F4F6", rFg: "#6B7280" },
            { tc: "TC-05", maps: "", scenario: "[Add test scenario]", data: "", expected: "", result: "—", rBg: "#F3F4F6", rFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.tc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.maps}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.scenario}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.data}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.expected}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.rBg, row.rFg)}>{row.result}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <div style={S.sectionBanner()}>📊 TEST SUMMARY</div>
          <table style={S.tbl}>
            <tbody>
              {[
                { q: "Total acceptance criteria", a: "[6]" },
                { q: "Passed", a: "[2] ✅" },
                { q: "Failed", a: "[1] ❌" },
                { q: "Not tested", a: "[2] ⏳" },
                { q: "Blocked", a: "[0]" },
                { q: "Pass rate", a: "[67%] (of tested)" },
              ].map((row, i) => {
                const isAlt = i % 2 === 1;
                return (
                  <tr key={i}>
                    <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "40%" }}>{row.q}</td>
                    <td style={{ ...(isAlt ? S.tdAlt : S.td0), fontWeight: 700 }}>{row.a}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <div style={S.sectionBanner(C.secondary)}>🐛 DEFECTS FROM FAILED CRITERIA</div>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Defect ID</th>
                <th style={{ ...S.thSecondary, width: "12%" }}>AC #</th>
                <th style={S.thSecondary}>Description</th>
                <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "[DEF-001]", ac: "AC-003", desc: "[System does not adjust quantity — shows generic error instead of specific message]", sev: "High", sevBg: "#FEE2E2", sevFg: "#DC2626" },
                { id: "[DEF-___]", ac: "", desc: "[Add defect]", sev: "—", sevBg: "#F3F4F6", sevFg: "#6B7280" },
              ].map((row, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#DC2626", fontSize: "11px" }}>{row.id}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.ac}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sevBg, row.sevFg)}>{row.sev}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
    </div>
  );

  const renderSignoff = () => (
    <div ref={signoffRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>✍️ SIGN-OFF</div>
      <CopyButton targetRef={signoffRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "20%" }}>Reviewer</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Role</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Decision</th>
            <th style={S.thPrimary}>Comments / Conditions</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[Product Owner]", role: "Business Approval", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[QA Lead]", role: "Test Verification", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Tech Lead]", role: "Technical Review", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.dBg, row.dFg)}>{row.dec}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>[MM/DD]</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold"><CheckCircle size={11} /> Acceptance</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-green-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center"><CheckCircle size={20} className="text-green-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Acceptance Criteria Template</h2>
              <p className="text-xs font-medium text-green-600">Given/When/Then &bull; Test Scenarios &bull; Defects &bull; Sign-off</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Define testable acceptance criteria using Given/When/Then format with test scenarios, result tracking, defect linkage, and formal sign-off. Full Template is comprehensive; Quick AC focuses on the GWT table.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-200" : "bg-white text-slate-600 border-slate-200 hover:border-green-300 hover:text-green-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-green-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderGWT()}{renderScenarios()}{renderSummary()}{renderSignoff()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderGWT()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AcceptanceCriteriaPage() {
  return (<ThemeProvider><AcceptanceCriteriaContent /></ThemeProvider>);
}
