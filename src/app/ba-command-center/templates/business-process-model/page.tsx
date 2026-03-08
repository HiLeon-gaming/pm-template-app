"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Workflow, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Model", desc: "Steps + RACI + metrics + rules", icon: LayoutDashboard },
  { id: "compact", label: "Quick Model", desc: "Steps + swim lanes only", icon: AlignJustify },
];

function BPMContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const swimRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const improvRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>⚙️ BUSINESS PROCESS MODEL</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template documents a business process as a structured step-by-step model with swim lane assignments, decision points, and process metrics.</strong> Each step includes the actor, action, inputs/outputs, system involved, and decision logic. Use it to map current-state or future-state processes in a table-based format that copies cleanly into any document.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>process documentation, workflow automation requirements,</strong> or <strong style={{ fontStyle: "italic" }}>onboarding new team members to understand how work flows</strong>. Aligns with BABOK Technique: Process Modelling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Process Name</td>
            <td style={{ ...S.td0, width: "36%" }}>[e.g., Order-to-Cash Process]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Process ID</td>
            <td style={{ ...S.td0, width: "36%" }}>[BP-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Process Owner</td>
            <td style={S.tdAlt}>[Name, Role]</td>
            <td style={S.tdLabelAlt}>State</td>
            <td style={S.tdAlt}>☐ Current (As-Is) ☐ Future (To-Be)</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Author (BA)</td>
            <td style={S.td0}>[Name]</td>
            <td style={S.tdLabel}>Version / Date</td>
            <td style={S.td0}>[1.0] — [MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Trigger</td>
            <td style={S.tdAlt}>[What starts this process? e.g., Customer submits order via web portal]</td>
            <td style={S.tdLabelAlt}>End State</td>
            <td style={S.tdAlt}>[What is the final outcome? e.g., Order fulfilled and payment collected]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const STEPS = [
    { step: 1, type: "Start", tBg: "#D1FAE5", tFg: "#059669", actor: "Customer", action: "Submits order via web portal", input: "Product selections, shipping info", output: "Order request created", system: "Web Portal", decision: "—" },
    { step: 2, type: "Task", tBg: "#DBEAFE", tFg: "#2563EB", actor: "System", action: "Validates order data and checks inventory", input: "Order request", output: "Validation result", system: "Order Mgmt + Inventory", decision: "—" },
    { step: 3, type: "Decision", tBg: "#FEF3C7", tFg: "#D97706", actor: "System", action: "Is inventory sufficient for all items?", input: "Validation result", output: "Yes → Step 4 | No → Step 3a", system: "Inventory System", decision: "If No: Notify customer, suggest alternatives" },
    { step: 4, type: "Task", tBg: "#DBEAFE", tFg: "#2563EB", actor: "System", action: "Processes payment via payment gateway", input: "Order + payment method", output: "Payment confirmation", system: "Payment Gateway", decision: "—" },
    { step: 5, type: "Decision", tBg: "#FEF3C7", tFg: "#D97706", actor: "System", action: "Payment authorized?", input: "Payment response", output: "Yes → Step 6 | No → Step 5a", system: "Payment Gateway", decision: "If No: Display error, retry or cancel" },
    { step: 6, type: "Task", tBg: "#DBEAFE", tFg: "#2563EB", actor: "System", action: "Creates order, decrements inventory, sends confirmation", input: "Authorized payment", output: "Order confirmed, email sent", system: "Order Mgmt + Email", decision: "—" },
    { step: 7, type: "Task", tBg: "#DBEAFE", tFg: "#2563EB", actor: "Warehouse", action: "Picks, packs, and ships order", input: "Order details", output: "Shipment + tracking #", system: "WMS", decision: "—" },
    { step: 8, type: "End", tBg: "#EDE9FE", tFg: "#7C3AED", actor: "System", action: "Updates order status to 'Delivered', closes order", input: "Delivery confirmation", output: "Order complete", system: "Order Mgmt", decision: "—" },
  ];

  const renderSteps = () => (
    <div ref={stepsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 PROCESS STEPS</div>
      <CopyButton targetRef={stepsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Actor</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Action</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Input</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Output</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>System</th>
            <th style={S.thPrimary}>Decision / Notes</th>
          </tr>
        </thead>
        <tbody>
          {STEPS.map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{row.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.tBg, row.tFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.actor}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.input}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.output}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.system}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.decision}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSwimLanes = () => (
    <div ref={swimRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🏊 SWIM LANE SUMMARY</div>
      <CopyButton targetRef={swimRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "16%" }}>Actor / Lane</th>
            <th style={S.thSecondary}>Steps Involved</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Responsibility</th>
          </tr>
        </thead>
        <tbody>
          {[
            { actor: "Customer", steps: "Step 1 — Submits order", resp: "Initiator", rBg: "#D1FAE5", rFg: "#059669" },
            { actor: "System (Automated)", steps: "Steps 2, 3, 4, 5, 6, 8 — Validation, payment, confirmation, closure", resp: "Processor", rBg: "#DBEAFE", rFg: "#2563EB" },
            { actor: "Warehouse Team", steps: "Step 7 — Pick, pack, ship", resp: "Fulfiller", rBg: "#FEF3C7", rFg: "#D97706" },
            { actor: "[Add actor]", steps: "", resp: "—", rBg: "#F3F4F6", rFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.actor}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.steps}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.rBg, row.rFg)}>{row.resp}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 PROCESS METRICS</div>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Total cycle time", a: "[e.g., 48 hours order-to-delivery (target: 24 hours)]" },
            { q: "Number of steps", a: "[8 total: 5 tasks, 2 decisions, 1 start/end]" },
            { q: "Manual steps", a: "[1 — Warehouse pick/pack/ship]" },
            { q: "Automated steps", a: "[6 — Validation, payment, confirmation, status updates]" },
            { q: "Handoff points", a: "[2 — System→Warehouse (Step 6→7), Warehouse→System (Step 7→8)]" },
            { q: "Error rate", a: "[Current: ___% | Target: ___%]" },
            { q: "Volume", a: "[e.g., 200 orders/day average, 500/day peak]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "24%" }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📏 BUSINESS RULES</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Rule ID</th>
            <th style={S.thSecondary}>Rule</th>
            <th style={{ ...S.thSecondary, width: "10%" }}>Applies to</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "BR-001", rule: "Minimum order value is $25; orders below are rejected", step: "Step 2" },
            { id: "BR-002", rule: "Payment must be authorized before order is created", step: "Step 4-5" },
            { id: "BR-003", rule: "Inventory is reserved at order creation, released if payment fails", step: "Step 5-6" },
            { id: "BR-004", rule: "Orders not shipped within 72 hours are auto-escalated", step: "Step 7" },
            { id: "[Add]", rule: "", step: "" },
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

  const renderImprovement = () => (
    <div ref={improvRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>💡 IMPROVEMENT OPPORTUNITIES</div>
      <CopyButton targetRef={improvRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Step</th>
            <th style={S.thPrimary}>Improvement</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Effort</th>
          </tr>
        </thead>
        <tbody>
          {[
            { step: "Step 7", imp: "[e.g., Automate pick list generation to reduce warehouse prep time by 50%]", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", effort: "Med", eBg: "#FEF3C7", eFg: "#D97706" },
            { step: "Step 2-3", imp: "[e.g., Add predictive inventory check during browsing to prevent checkout failures]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", effort: "Low", eBg: "#D1FAE5", eFg: "#059669" },
            { step: "Overall", imp: "[e.g., Implement real-time tracking dashboard for all stakeholders]", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", effort: "Med", eBg: "#FEF3C7", eFg: "#D97706" },
            { step: "", imp: "[Add improvement]", impact: "—", iBg: "#F3F4F6", iFg: "#6B7280", effort: "—", eBg: "#F3F4F6", eFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{row.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.imp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.iBg, row.iFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.eBg, row.eFg)}>{row.effort}</span></td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Workflow size={11} /> Process</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Workflow size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Business Process Model</h2>
              <p className="text-xs font-medium text-indigo-600">Steps &bull; Swim Lanes &bull; Decisions &bull; Metrics &bull; Rules</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document business processes with step-by-step flows, swim lane assignments, decision points, process metrics, business rules, and improvement opportunities. Full Model is comprehensive; Quick Model shows steps and swim lanes.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderSteps()}{renderSwimLanes()}{renderMetrics()}{renderRules()}{renderImprovement()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderSteps()}{renderSwimLanes()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BusinessProcessModelPage() {
  return (<ThemeProvider><BPMContent /></ThemeProvider>);
}
