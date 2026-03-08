"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Scope Statement", desc: "All sections + WBS summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Scope", desc: "Scope + deliverables only", icon: AlignJustify },
];

function ScopeStatementContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scopeDescRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const exclusionsRef = useRef<HTMLDivElement>(null);
  const acceptanceRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📋 PROJECT SCOPE STATEMENT</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop | PM Command Center | PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Scope Statement describes the project scope, major deliverables, exclusions, assumptions, and constraints.</strong> It serves as the foundation for the WBS and provides a documented basis for making future project decisions.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>scope planning</strong> to establish what is and is not included. Aligns with PMBOK Scope Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Project ID</td><td style={{ ...S.td0, width: "32%" }}>[PRJ-YYYY-###]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabel}>Version</td><td style={S.td0}>[1.0]</td><td style={S.tdLabel}>Sponsor</td><td style={S.td0}>[Sponsor Name]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderScopeDesc = () => (
    <div ref={scopeDescRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>1 — SCOPE DESCRIPTION</div>
      <CopyButton targetRef={scopeDescRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Product Scope</td><td style={S.td0}>[Describe the features and functions of the product, service, or result. Example: ❌An automated invoicing system that generates, sends, and tracks invoices with ERP integration.]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Scope</td><td style={S.tdAlt}>[Describe the work required to deliver the product. Example: ❌Requirements gathering, system design, development, testing, training, and deployment of the invoicing module.]</td></tr>
          <tr><td style={S.tdLabel}>Business Objectives</td><td style={S.td0}>[Link to charter objectives. Example: ❌Reduce invoice errors by 95%, cut processing time by 60%.]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Boundaries</td><td style={S.tdAlt}>[Define what this project covers and where it ends. Example: ❌Covers US operations only; EMEA rollout is a separate project.]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderDeliverables = () => (
    <div ref={deliverablesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>2 — PROJECT DELIVERABLES</div>
      <CopyButton targetRef={deliverablesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Deliverable</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Phase</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { id: "D1", name: "Requirements Document", desc: "[Complete BRD with functional and non-functional requirements]", phase: "Planning", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { id: "D2", name: "System Design", desc: "[Architecture document, data model, interface specifications]", phase: "Planning", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { id: "D3", name: "Working Software", desc: "[Developed, unit-tested modules per sprint deliverables]", phase: "Execution", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { id: "D4", name: "Test Results", desc: "[UAT test cases, execution results, defect resolution log]", phase: "Execution", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { id: "D5", name: "Training Materials", desc: "[User guides, quick-reference cards, video tutorials]", phase: "Execution", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { id: "D6", name: "Deployment Package", desc: "[Release notes, runbook, rollback plan]", phase: "Closing", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { id: "D7", name: "[Add Deliverable]", desc: "[Description]", phase: "[Phase]", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg },
          ].map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={d.id}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{d.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{d.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{d.phase}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(d.pBg, d.pFg)}>{d.pri}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderExclusions = () => (
    <div ref={exclusionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>3 — EXCLUSIONS (OUT OF SCOPE)</div>
      <CopyButton targetRef={exclusionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Excluded Item</th>
          <th style={S.thSecondary}>Rationale</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[e.g., Legacy system decommissioning]", rationale: "[Handled by IT Operations as a separate initiative post go-live]" },
            { item: "[e.g., International / EMEA rollout]", rationale: "[Phase 2 project; separate charter and budget required]" },
            { item: "[e.g., Mobile app development]", rationale: "[Deferred to FY27 based on priority assessment; web-only for v1]" },
            { item: "[e.g., Hardware procurement]", rationale: "[Cloud-based solution; no on-prem hardware required]" },
            { item: "[Add excluded item]", rationale: "[Rationale]" },
          ].map((e, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{e.item}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{e.rationale}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderAcceptance = () => (
    <div ref={acceptanceRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>4 — ACCEPTANCE CRITERIA</div>
      <CopyButton targetRef={acceptanceRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Deliverable</th>
          <th style={S.thSecondary}>Acceptance Criteria</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Accepted By</th>
        </tr></thead>
        <tbody>
          {[
            { del: "Requirements Document", criteria: "[Signed off by all stakeholders; 100% of critical requirements covered; RTM complete]", by: "[BA Lead]" },
            { del: "Working Software", criteria: "[All P1 test cases pass; <2s page load; 99.5% uptime SLA; zero P1 defects]", by: "[QA Lead]" },
            { del: "Training Materials", criteria: "[Reviewed by SMEs; covers all user roles; approved by Training Manager]", by: "[Training Mgr]" },
            { del: "Go-Live Deployment", criteria: "[Smoke tests pass; rollback verified; monitoring dashboards active; support team briefed]", by: "[IT Ops]" },
            { del: "[Deliverable]", criteria: "[Criteria]", by: "[Role]" },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{a.del}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.criteria}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.by}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConstraints = () => (
    <div ref={constraintsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>5 — ASSUMPTIONS & CONSTRAINTS</div>
      <CopyButton targetRef={constraintsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "50%" }}>✅ Assumptions</th>
          <th style={{ ...S.thPrimary, width: "50%" }}>📋 Constraints</th>
        </tr></thead>
        <tbody>
          <tr><td style={S.td0}>[e.g., Requirements will be stable after sign-off with minimal changes]</td><td style={S.td0}>[e.g., Must use existing technology stack — no new platforms]</td></tr>
          <tr><td style={S.tdAlt}>[e.g., Test environment will be available 4 weeks before UAT]</td><td style={S.tdAlt}>[e.g., Go-live must occur during the Q4 change window]</td></tr>
          <tr><td style={S.td0}>[e.g., Vendor will provide API documentation on time]</td><td style={S.td0}>[e.g., No more than 3 concurrent projects for shared resources]</td></tr>
          <tr><td style={S.tdAlt}>[Add assumption]</td><td style={S.tdAlt}>[Add constraint]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>6 — SCOPE APPROVAL</div>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Name</th>
          <th style={S.thSecondary}>Signature</th>
          <th style={{ ...S.thSecondary, width: "16%" }}>Date</th>
        </tr></thead>
        <tbody>
          {["Project Sponsor", "Project Manager", "Business Lead", "[Additional Approver]"].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{r}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[Name]</td>
              <td style={{ ...S.td0, backgroundColor: bg, borderBottom: `2px solid ${C.primary}` }}>&nbsp;</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>By signing, approvers confirm the scope is complete, deliverables are understood, and exclusions are accepted. Any future scope changes must go through the Change Control process.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderScopeDesc()}{renderDeliverables()}{renderExclusions()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderAcceptance()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderConstraints()}</td>
      </tr></tbody></table>
      {renderApproval()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderScopeDesc()}{renderDeliverables()}{renderExclusions()}{renderApproval()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><FileText size={11} /> Scope</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><FileText size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Scope Statement</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Scope Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines the project and product scope with deliverables, exclusions, acceptance criteria, and constraints. Full Scope Statement includes all 6 sections; Quick Scope focuses on scope description, deliverables, and exclusions.</p>
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

export default function ScopeStatementPage() {
  return (<ThemeProvider><ScopeStatementContent /></ThemeProvider>);
}
