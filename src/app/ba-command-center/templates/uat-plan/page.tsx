"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full UAT Plan", desc: "Scope + schedule + criteria + risks", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Scope + entry/exit only", icon: AlignJustify },
];

function UATPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const schedRef = useRef<HTMLDivElement>(null);
  const criteriaRef = useRef<HTMLDivElement>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🧪 UAT PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template defines the complete User Acceptance Testing plan including scope, testers, schedule, entry/exit criteria, environment requirements, and risk mitigation.</strong> It ensures UAT is structured, time-boxed, and has clear pass/fail criteria agreed upon by all stakeholders before testing begins.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>pre-UAT kickoff meetings, test readiness reviews,</strong> or <strong style={{ fontStyle: "italic" }}>formal documentation required for governance checkpoints</strong>. Aligns with BABOK Knowledge Area: Solution Evaluation.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>UAT Plan ID</td>
            <td style={{ ...S.td0, width: "36%" }}>[UAT-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Prepared by (BA)</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Version / Date</td>
            <td style={S.tdAlt}>[1.0] — [MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>UAT Lead</td>
            <td style={S.td0}>[Name, Role]</td>
            <td style={S.tdLabel}>UAT Window</td>
            <td style={S.td0}>[Start Date] — [End Date] ([___] business days)</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderScope = () => (
    <div ref={scopeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 UAT SCOPE</div>
      <CopyButton targetRef={scopeRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Objective", a: "[Validate that the solution meets business requirements and is acceptable for production deployment]" },
            { q: "Features in scope", a: "[List features/modules being tested — e.g., Order creation, Payment processing, Inventory validation, Notifications]" },
            { q: "Features out of scope", a: "[List features NOT being tested in this UAT cycle — e.g., Reporting module (Phase 2), Mobile app]" },
            { q: "Requirements covered", a: "[FR-001 through FR-020, NFR-001 through NFR-005 — total: [___] requirements]" },
            { q: "Test cases planned", a: "[___] test cases across [___] test scenarios" },
            { q: "Approach", a: "☐ Scenario-based ☐ Requirements-based ☐ Exploratory ☐ Combination" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr><td colSpan={4} style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>UAT TESTERS</td></tr></thead>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "20%" }}>Tester Name</th>
            <th style={{ ...S.thSecondary, width: "16%" }}>Role / Department</th>
            <th style={S.thSecondary}>Test Areas Assigned</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Availability</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[User Rep 1]", role: "[Operations]", areas: "[Order creation, Inventory validation]", avail: "[100%]" },
            { name: "[User Rep 2]", role: "[Finance]", areas: "[Payment processing, Refunds]", avail: "[50%]" },
            { name: "[User Rep 3]", role: "[Customer Service]", areas: "[Order status, Notifications]", avail: "[100%]" },
            { name: "[Add tester]", role: "", areas: "", avail: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.areas}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.avail}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSchedule = () => (
    <div ref={schedRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📅 UAT SCHEDULE</div>
      <CopyButton targetRef={schedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Activity</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Start</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>End</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { act: "UAT Plan review and approval", owner: "[BA + PM]", start: "[Date]", end: "[Date]", stat: "Complete", sBg: "#D1FAE5", sFg: "#059669" },
            { act: "Test environment setup and data preparation", owner: "[DevOps + BA]", start: "[Date]", end: "[Date]", stat: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB" },
            { act: "UAT kickoff meeting — walkthrough with testers", owner: "[BA]", start: "[Date]", end: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { act: "Test execution — Cycle 1", owner: "[Testers]", start: "[Date]", end: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { act: "Defect triage and fix", owner: "[Dev + QA]", start: "[Date]", end: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { act: "Test execution — Cycle 2 (regression)", owner: "[Testers]", start: "[Date]", end: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { act: "UAT summary report and sign-off", owner: "[BA + UAT Lead]", start: "[Date]", end: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.start}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.end}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCriteria = () => (
    <div ref={criteriaRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>🚦 ENTRY CRITERIA</td></tr></thead>
            <tbody>
              {["All code deployed to UAT environment", "System testing complete with ≥ 95% pass rate", "No critical or high-severity defects open from ST", "Test data loaded and validated", "UAT test cases reviewed and approved by testers", "Access credentials provided to all testers", "UAT kickoff meeting completed", "[Add entry criterion]"].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white }}>☐ {item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🏁 EXIT CRITERIA (Pass Conditions)</td></tr></thead>
            <tbody>
              {["100% of Must-Have test cases executed", "≥ 95% of all test cases passed", "Zero critical defects open", "≤ 3 high-severity defects (with approved workarounds)", "All business-critical workflows validated end-to-end", "UAT summary report completed", "Formal sign-off obtained from UAT Lead and Sponsor", "[Add exit criterion]"].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white }}>☐ {item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={criteriaRef} label="Copy Section" />
    </div>
  );

  const renderEnvironment = () => (
    <div ref={envRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🖥️ TEST ENVIRONMENT &amp; DATA</div>
      <CopyButton targetRef={envRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Environment URL", a: "[e.g., https://uat.orderportal.company.com]" },
            { q: "Environment owner", a: "[DevOps / Infrastructure team contact]" },
            { q: "Data strategy", a: "☐ Production copy (anonymized) ☐ Synthetic test data ☐ Combination" },
            { q: "Test accounts", a: "[List test user accounts with roles — e.g., testuser_ops@..., testuser_finance@...]" },
            { q: "Known limitations", a: "[e.g., Email notifications go to sandbox; Payment uses test mode; Performance not representative]" },
            { q: "Refresh schedule", a: "[e.g., Refreshed from production weekly on Sunday; manual refresh available on request]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>⚠️ RISKS &amp; MITIGATIONS</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Risk</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thSecondary, width: "28%" }}>Mitigation</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          </tr>
        </thead>
        <tbody>
          {[
            { risk: "Testers not available due to BAU workload", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", mit: "Secure tester commitment early; have backup testers identified", owner: "[PM]" },
            { risk: "UAT environment unstable or not ready on time", impact: "High", iBg: "#FEE2E2", iFg: "#DC2626", mit: "Environment readiness checkpoint 3 days before UAT start", owner: "[DevOps]" },
            { risk: "Too many defects found — UAT stalls", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", mit: "Daily defect triage; dev team on standby for critical fixes", owner: "[QA Lead]" },
            { risk: "Test data doesn't cover all scenarios", impact: "Med", iBg: "#FEF3C7", iFg: "#D97706", mit: "Data preparation checklist; validate data before UAT kickoff", owner: "[BA]" },
            { risk: "", impact: "—", iBg: "#F3F4F6", iFg: "#6B7280", mit: "[Add risk]", owner: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.iBg, row.iFg)}>{row.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><ClipboardList size={11} /> UAT</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><ClipboardList size={20} className="text-emerald-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">UAT Plan</h2>
              <p className="text-xs font-medium text-emerald-600">Scope &bull; Testers &bull; Schedule &bull; Entry/Exit Criteria &bull; Risks</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Comprehensive UAT plan with scope, tester assignments, schedule, entry/exit criteria, environment details, and risk mitigations. Full UAT Plan is complete; Quick Plan shows scope and entry/exit criteria.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderScope()}{renderSchedule()}{renderCriteria()}{renderEnvironment()}{renderRisks()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderScope()}{renderCriteria()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function UATPlanPage() {
  return (<ThemeProvider><UATPlanContent /></ThemeProvider>);
}
