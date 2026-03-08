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
  { id: "full", label: "Full Charter", desc: "All 9 sections", icon: LayoutDashboard },
  { id: "compact", label: "Quick Charter", desc: "Overview + scope + approval", icon: AlignJustify },
];

function ProjectCharterContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const businessCaseRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const stakeholderRef = useRef<HTMLDivElement>(null);
  const milestoneRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const assumptionsRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📋 PROJECT CHARTER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Charter formally authorizes a project and grants the project manager authority to apply organizational resources.</strong> It documents the business need, objectives, high-level scope, stakeholders, milestones, budget, risks, and approval signatures.<br /><br />
          Use this template at <strong style={{ fontStyle: "italic" }}>project initiation</strong> to gain formal authorization. Aligns with PMBOK Integration Management — Initiating Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderOverview = () => (
    <div ref={overviewRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>1 — PROJECT OVERVIEW</div>
      <CopyButton targetRef={overviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Project Name</td><td style={S.td0}>[Enter Project Name]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project ID</td><td style={S.tdAlt}>[PRJ-YYYY-###]</td></tr>
          <tr><td style={S.tdLabel}>Project Manager</td><td style={S.td0}>[Name, PMP] — [Email] — [Phone]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Sponsor</td><td style={S.tdAlt}>[Sponsor Name, Title]</td></tr>
          <tr><td style={S.tdLabel}>Department / Division</td><td style={S.td0}>[e.g., IT, Operations, Marketing]</td></tr>
          <tr><td style={S.tdLabelAlt}>Priority Level</td><td style={S.tdAlt}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>High</span><span style={{ fontSize: "11px", color: C.textMuted, marginLeft: "8px" }}>Options: Critical · High · Medium · Low</span></td></tr>
          <tr><td style={S.tdLabel}>Start Date</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Target End Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabel}>Charter Version</td><td style={S.td0}>1.0 — [Date]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderBusinessCase = () => (
    <div ref={businessCaseRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>2 — BUSINESS CASE &amp; OBJECTIVES</div>
      <CopyButton targetRef={businessCaseRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "28%" }}>Element</th><th style={S.thSecondary}>Description</th></tr></thead>
        <tbody>
          <tr><td style={S.tdLabel}>Business Need</td><td style={S.td0}>[Describe the business problem or opportunity. Example: &quot;Current manual invoicing causes 5% error rate and 3-day payment delays.&quot;]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Purpose</td><td style={S.tdAlt}>[Link to strategic goals. Example: &quot;Automate invoicing to support Q3 operational efficiency target of 15% cost reduction.&quot;]</td></tr>
          <tr><td style={S.tdLabel}>SMART Objective 1</td><td style={S.td0}>[Example: &quot;Reduce invoice error rate from 5% to &lt;1% within 6 months of go-live.&quot;]</td></tr>
          <tr><td style={S.tdLabelAlt}>SMART Objective 2</td><td style={S.tdAlt}>[Enter second objective]</td></tr>
          <tr><td style={S.tdLabel}>SMART Objective 3</td><td style={S.td0}>[Enter third objective]</td></tr>
          <tr><td style={S.tdLabelAlt}>Expected Benefits</td><td style={S.tdAlt}>[Example: &quot;$200K annual savings, improved vendor satisfaction, audit compliance.&quot;]</td></tr>
          <tr><td style={S.tdLabel}>Success Criteria</td><td style={S.td0}>[Example: &quot;Delivered within ±10% of budget, all critical requirements met, sponsor sign-off.&quot;]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderScope = () => (
    <div ref={scopeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>3 — HIGH-LEVEL SCOPE</div>
      <CopyButton targetRef={scopeRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "28%" }}>Category</th><th style={S.thSecondary}>Details</th></tr></thead>
        <tbody>
          <tr><td style={S.tdLabel}>In-Scope Deliverables</td><td style={S.td0}><span style={{ display: "block" }}>• [Deliverable 1 — e.g., Requirements document]</span><span style={{ display: "block" }}>• [Deliverable 2 — e.g., System configuration]</span><span style={{ display: "block" }}>• [Deliverable 3 — e.g., UAT sign-off]</span><span style={{ display: "block" }}>• [Deliverable 4 — e.g., Training materials]</span></td></tr>
          <tr><td style={S.tdLabelAlt}>Out of Scope</td><td style={S.tdAlt}><span style={{ display: "block" }}>• [Item 1 — e.g., Legacy system decommissioning]</span><span style={{ display: "block" }}>• [Item 2 — e.g., International rollout]</span></td></tr>
          <tr><td style={S.tdLabel}>Key Deliverables</td><td style={S.td0}>[Summarize primary deliverable. Example: &quot;Fully operational automated invoicing system integrated with ERP.&quot;]</td></tr>
          <tr><td style={S.tdLabelAlt}>Acceptance Criteria</td><td style={S.tdAlt}>[Example: &quot;Passes all UAT test cases, &lt;2s page load, 99.5% uptime SLA.&quot;]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderStakeholders = () => (
    <div ref={stakeholderRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>4 — KEY STAKEHOLDERS</div>
      <CopyButton targetRef={stakeholderRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "16%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Role / Title</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Interest</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Influence</th>
          <th style={S.thPrimary}>Engagement Strategy</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Name]", role: "Executive Sponsor", int: "High", inf: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, strat: "Manage Closely — Weekly 1:1 updates" },
            { name: "[Name]", role: "Business Unit Lead", int: "High", inf: "Medium", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, strat: "Keep Satisfied — Bi-weekly steering committee" },
            { name: "[Name]", role: "IT Director", int: "Medium", inf: "High", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, strat: "Keep Informed — Monthly tech review" },
            { name: "[Name]", role: "End Users / SMEs", int: "High", inf: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg, strat: "Monitor — Sprint demos & feedback surveys" },
            { name: "[Add]", role: "[Role]", int: "—", inf: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, strat: "[Strategy]" },
          ].map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{s.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.iBg, s.iFg)}>{s.int}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.iBg, s.iFg)}>{s.inf}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.strat}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Engagement: High Interest + High Influence = Manage Closely | High Interest + Low Influence = Keep Informed | Low Interest + High Influence = Keep Satisfied | Low Interest + Low Influence = Monitor</p>
    </div>
  );

  const renderMilestones = () => (
    <div ref={milestoneRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>5 — MILESTONE SCHEDULE</div>
      <CopyButton targetRef={milestoneRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Milestone</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Target Date</th>
          <th style={{ ...S.thSecondary, width: "13%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "M1", name: "Project Charter Approved", owner: "[PM]" },
            { id: "M2", name: "Requirements Baselined", owner: "[BA]" },
            { id: "M3", name: "Design Sign-off", owner: "[Arch]" },
            { id: "M4", name: "Development Complete", owner: "[Dev Lead]" },
            { id: "M5", name: "UAT Complete & Approved", owner: "[QA Lead]" },
            { id: "M6", name: "Go-Live / Deployment", owner: "[PM]" },
            { id: "M7", name: "Project Closure", owner: "[PM]" },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={m.id}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{m.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>{m.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>{m.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Not Started</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBudget = () => (
    <div ref={budgetRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>6 — BUDGET SUMMARY</div>
      <CopyButton targetRef={budgetRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "35%" }}>Cost Category</th>
          <th style={{ ...S.thSecondary, width: "18%", textAlign: "right" as const }}>Estimated Cost</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Internal Labor", note: "[# FTEs × rate × duration]" },
            { cat: "External Contractors / Vendors", note: "[Vendor name, SOW reference]" },
            { cat: "Software / Licenses", note: "[Product names, subscription vs perpetual]" },
            { cat: "Hardware / Infrastructure", note: "[Cloud, on-prem, etc.]" },
            { cat: "Training & Change Management", note: "[Training sessions, materials]" },
            { cat: "Contingency Reserve (10-15%)", note: "[Known risks buffer]" },
            { cat: "Management Reserve (5-10%)", note: "[Unknown risks — sponsor controlled]" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={row.cat}><td style={{ ...S.td0, backgroundColor: bg }}>{row.cat}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const }}>$[amount]</td><td style={{ ...S.td0, backgroundColor: bg }}>{row.note}</td></tr>);
          })}
          <tr>
            <td style={{ ...S.td0, fontWeight: 800, color: C.white, backgroundColor: C.primary, fontSize: "13px" }}>TOTAL PROJECT BUDGET</td>
            <td style={{ ...S.td0, fontWeight: 800, color: C.white, backgroundColor: C.primary, textAlign: "right" as const, fontSize: "13px" }}>$[total]</td>
            <td style={{ ...S.td0, fontWeight: 600, color: C.white, backgroundColor: C.primary, fontSize: "12px" }}>Approved funding source: [source]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>7 — INITIAL RISK REGISTER</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Risk Description</th>
          <th style={{ ...S.thSecondary, width: "9%", textAlign: "center" as const }}>Prob.</th>
          <th style={{ ...S.thSecondary, width: "9%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thSecondary, width: "9%", textAlign: "center" as const }}>Score</th>
          <th style={S.thSecondary}>Response Strategy</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { id: "R1", desc: "[e.g., Key resource may leave mid-project]", p: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, im: "High", imBg: C.badgeRedBg, imFg: C.badgeRedFg, sc: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, resp: "Mitigate — Cross-train backup resource", own: "[Name]" },
            { id: "R2", desc: "[e.g., Vendor delivery delay]", p: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, im: "Med", imBg: C.badgeAmberBg, imFg: C.badgeAmberFg, sc: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, resp: "Transfer — Contractual SLA penalties", own: "[Name]" },
            { id: "R3", desc: "[e.g., Scope creep from stakeholders]", p: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, im: "Med", imBg: C.badgeAmberBg, imFg: C.badgeAmberFg, sc: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, resp: "Avoid — Strict change control process", own: "[PM]" },
            { id: "R4", desc: "[Add risk]", p: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, im: "—", imBg: C.badgeGrayBg, imFg: C.badgeGrayFg, sc: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, resp: "[Mitigate / Transfer / Avoid / Accept]", own: "[Name]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={r.id}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{r.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.p}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.imBg, r.imFg)}>{r.im}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.sc}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.resp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.own}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>PMBOK Response Strategies: <strong>Mitigate</strong> (reduce probability/impact) · <strong>Transfer</strong> (shift to third party) · <strong>Avoid</strong> (eliminate threat) · <strong>Accept</strong> (acknowledge &amp; monitor)</p>
    </div>
  );

  const renderAssumptions = () => (
    <div ref={assumptionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>8 — ASSUMPTIONS &amp; CONSTRAINTS</div>
      <CopyButton targetRef={assumptionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "50%" }}>✅ Assumptions</th>
          <th style={{ ...S.thPrimary, width: "50%" }}>🚧 Constraints</th>
        </tr></thead>
        <tbody>
          <tr><td style={S.td0}>[e.g., Executive sponsorship will remain active throughout the project lifecycle]</td><td style={S.td0}>[e.g., Project must be completed by fiscal year-end (12/31/YYYY)]</td></tr>
          <tr><td style={S.tdAlt}>[e.g., Existing IT infrastructure can support new system without major upgrades]</td><td style={S.tdAlt}>[e.g., Budget is capped at $[amount] with no additional funding]</td></tr>
          <tr><td style={S.td0}>[e.g., SMEs will be available for 20% of their time]</td><td style={S.td0}>[e.g., Must comply with SOX / HIPAA / GDPR regulations]</td></tr>
          <tr><td style={S.tdAlt}>[Add assumption]</td><td style={S.tdAlt}>[Add constraint]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>9 — CHARTER APPROVAL SIGNATURES</div>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "22%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Name</th>
          <th style={S.thSecondary}>Signature</th>
          <th style={{ ...S.thSecondary, width: "16%" }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Project Sponsor", name: "[Name]" },
            { role: "Project Manager", name: "[Name, PMP]" },
            { role: "Functional Manager", name: "[Name]" },
            { role: "[Additional Approver]", name: "[Name]" },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{a.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>{a.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, borderBottom: `2px solid ${C.primary}` }}>&nbsp;</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>By signing above, signatories authorize this project to proceed as described and commit the necessary organizational resources.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;•&nbsp; PM Command Center &nbsp;•&nbsp; © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderOverview()}{renderBusinessCase()}{renderScope()}{renderStakeholders()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderMilestones()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderBudget()}</td>
      </tr></tbody></table>
      {renderRisks()}{renderAssumptions()}{renderApproval()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderOverview()}{renderScope()}{renderMilestones()}{renderApproval()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><FileText size={11} /> Charter</span>
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
              <h2 className="text-2xl font-extrabold text-slate-900">Project Charter</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Initiating Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Formally authorizes the project with business case, scope, stakeholders, milestones, budget, risks, and approval signatures. Full Charter includes all 9 sections; Quick Charter is a compact overview + scope + approval view.</p>
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

export default function ProjectCharterPage() {
  return (<ThemeProvider><ProjectCharterContent /></ThemeProvider>);
}
