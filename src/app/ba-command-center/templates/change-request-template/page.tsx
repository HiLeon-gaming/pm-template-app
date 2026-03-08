"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileDiff, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full CR", desc: "Impact + approval + plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick CR", desc: "Request + impact only", icon: AlignJustify },
];

function ChangeRequestContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);
  const implRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📝 CHANGE REQUEST</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template formalizes proposed changes to baselined requirements, scope, or deliverables.</strong> It documents the change description, business justification, impact analysis across scope, schedule, cost, and risk, along with a formal approval workflow and implementation plan. Every change should be evaluated before implementation.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>scope change management, requirements baseline updates,</strong> or <strong style={{ fontStyle: "italic" }}>governance and audit trail documentation</strong>. Aligns with BABOK Knowledge Area: Requirements Lifecycle Management.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "16%" }}>CR Number</td>
            <td style={{ ...S.td0, width: "34%" }}>[CR-001]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Date Submitted</td>
            <td style={{ ...S.td0, width: "34%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Project</td>
            <td style={S.tdAlt}>[Project / Initiative Name]</td>
            <td style={S.tdLabelAlt}>Requested By</td>
            <td style={S.tdAlt}>[Name, Role]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Priority</td>
            <td style={S.td0}>☐ Critical ☐ High ☐ Medium ☐ Low</td>
            <td style={S.tdLabel}>CR Status</td>
            <td style={S.td0}>☐ Submitted ☐ Under Review ☐ Approved ☐ Rejected ☐ Deferred</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderDescription = () => (
    <div ref={descRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 CHANGE DESCRIPTION</div>
      <CopyButton targetRef={descRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Change Title", a: "[Brief, descriptive title — e.g., Add bulk import functionality to order management]" },
            { q: "Detailed Description", a: "[Describe the change in detail. What is being added, modified, or removed? Be specific about the current state vs. proposed state.]" },
            { q: "Business Justification", a: "[Why is this change needed? What business problem does it solve? What happens if we don't make this change?]" },
            { q: "Requirements Affected", a: "[List Req IDs impacted — e.g., FR-001, FR-005, NFR-003]" },
            { q: "Change Type", a: "☐ New Requirement ☐ Modification ☐ Deletion ☐ Scope Change ☐ Defect Fix ☐ Enhancement" },
            { q: "Originating Source", a: "☐ Stakeholder request ☐ Defect ☐ Regulatory change ☐ Technology change ☐ Process change ☐ Other: [___]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "20%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderImpact = () => (
    <div ref={impactRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>⚡ IMPACT ANALYSIS</div>
      <CopyButton targetRef={impactRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#2563EB", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #2563EB" }}>📐 SCOPE IMPACT</td></tr></thead>
            <tbody>
              {[
                { q: "In-scope additions", a: "[What new work is being added?]" },
                { q: "In-scope modifications", a: "[What existing scope is changing?]" },
                { q: "Items removed from scope", a: "[Anything being descoped to accommodate this change?]" },
                { q: "Impact on other requirements", a: "[Does this change affect other approved requirements?]" },
              ].map((row, i) => {
                const isAlt = i % 2 === 1;
                return (
                  <tr key={i}>
                    <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%", verticalAlign: "top" as const }}>{row.q}</td>
                    <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "30px", fontSize: "11px" }}>{row.a}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>📅 SCHEDULE IMPACT</td></tr></thead>
            <tbody>
              {[
                { q: "Estimated additional effort", a: "[e.g., 40 dev hours + 16 QA hours]" },
                { q: "Timeline impact", a: "[e.g., Delays Sprint 5 delivery by 1 week]" },
                { q: "Milestone affected", a: "[e.g., UAT start date moves from MM/DD to MM/DD]" },
                { q: "Go-live impact", a: "☐ No impact ☐ Delay of [___] days/weeks" },
              ].map((row, i) => {
                const isAlt = i % 2 === 1;
                return (
                  <tr key={i}>
                    <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%", verticalAlign: "top" as const }}>{row.q}</td>
                    <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "30px", fontSize: "11px" }}>{row.a}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <table style={{ ...LT, marginTop: "6px" }}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💰 COST IMPACT</td></tr></thead>
            <tbody>
              {[
                { q: "Development cost", a: "[$ or hours]" },
                { q: "Infrastructure / licensing", a: "[$ estimate]" },
                { q: "Ongoing operational cost", a: "[$/month or $/year]" },
                { q: "Total estimated cost", a: "[$___]" },
              ].map((row, i) => {
                const isAlt = i % 2 === 1;
                return (
                  <tr key={i}>
                    <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%", verticalAlign: "top" as const }}>{row.q}</td>
                    <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "30px", fontSize: "11px" }}>{row.a}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>⚠️ RISK IMPACT</td></tr></thead>
            <tbody>
              {[
                { q: "New risks introduced", a: "[e.g., Bulk import could introduce data quality issues]" },
                { q: "Risk to existing functionality", a: "[e.g., May affect order validation flow]" },
                { q: "Risk mitigation", a: "[e.g., Add data validation layer; require CSV format spec]" },
                { q: "Overall risk rating", a: "☐ Low ☐ Medium ☐ High ☐ Critical" },
              ].map((row, i) => {
                const isAlt = i % 2 === 1;
                return (
                  <tr key={i}>
                    <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%", verticalAlign: "top" as const }}>{row.q}</td>
                    <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "30px", fontSize: "11px" }}>{row.a}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>✍️ APPROVAL WORKFLOW</div>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "18%" }}>Approver</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Role</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Decision</th>
            <th style={S.thPrimary}>Comments / Conditions</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[BA Name]", role: "Impact Assessor", dec: "Assessed", dBg: "#D1FAE5", dFg: "#059669" },
            { name: "[PM Name]", role: "Project Manager", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[Sponsor]", role: "Sponsor / CCB", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
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
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "20%" }}>Final Decision</td>
            <td style={S.td0}>☐ Approved ☐ Approved with conditions ☐ Rejected ☐ Deferred to [Phase/Date]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Conditions (if any)</td>
            <td style={S.tdAlt}>[e.g., Approved only if delivered within existing budget; must not delay go-live]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderImplementation = () => (
    <div ref={implRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🔨 IMPLEMENTATION PLAN (if approved)</div>
      <CopyButton targetRef={implRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Task</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Due Date</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { task: "Update requirements documentation (BRD, FRS)", owner: "[BA]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { task: "Update design documents / wireframes", owner: "[UX/Tech Lead]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { task: "Develop and unit test changes", owner: "[Dev Team]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { task: "Update test cases and execute regression", owner: "[QA]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { task: "Update RTM with new/modified requirements", owner: "[BA]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { task: "Stakeholder communication / training update", owner: "[BA/PM]", due: "[Date]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { task: "[Add implementation task]", owner: "", due: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><FileDiff size={11} /> Change Req</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><FileDiff size={20} className="text-rose-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Change Request Template</h2>
              <p className="text-xs font-medium text-rose-600">Description &bull; Impact Analysis &bull; Approval &bull; Implementation</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Formal change request with description, 4-dimension impact analysis (scope, schedule, cost, risk), approval workflow, and implementation plan. Full CR includes everything; Quick CR focuses on the request and impact.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderDescription()}{renderImpact()}{renderApproval()}{renderImplementation()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderDescription()}{renderImpact()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ChangeRequestPage() {
  return (<ThemeProvider><ChangeRequestContent /></ThemeProvider>);
}
