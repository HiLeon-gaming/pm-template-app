"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "summary";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full BRD", desc: "All sections", icon: LayoutDashboard },
  { id: "summary", label: "BRD Summary", desc: "Key sections only", icon: AlignJustify },
];

function BRDContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bizNeedRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const stakeholderRef = useRef<HTMLDivElement>(null);
  const funcRef = useRef<HTMLDivElement>(null);
  const nfRef = useRef<HTMLDivElement>(null);
  const assumeRef = useRef<HTMLDivElement>(null);
  const approvalRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📄 BUSINESS REQUIREMENTS DOCUMENT (BRD)</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides the comprehensive structure for documenting business requirements.</strong> It covers the business need, project scope, stakeholder summary, functional and non-functional requirements, assumptions, constraints, and formal approval. This is the definitive requirements artifact that stakeholders sign off on.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>waterfall projects, formal change initiatives,</strong> or <strong style={{ fontStyle: "italic" }}>any effort requiring documented and approved requirements</strong>. Aligns with BABOK Knowledge Area: Requirements Analysis and Design Definition.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "16%" }}>Project Name</td>
            <td style={{ ...S.td0, width: "34%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "16%" }}>Document ID</td>
            <td style={{ ...S.td0, width: "34%" }}>[BRD-001]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Business Analyst</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Project Sponsor</td>
            <td style={S.tdAlt}>[Name, Title]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Version</td>
            <td style={S.td0}>[1.0 — Draft / Approved]</td>
            <td style={S.tdLabel}>Date</td>
            <td style={S.td0}>[MM/DD/YYYY]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderBizNeed = () => (
    <div ref={bizNeedRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 BUSINESS NEED &amp; BACKGROUND</div>
      <CopyButton targetRef={bizNeedRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Business Problem / Opportunity", a: "[What business problem are we solving? Or what opportunity are we pursuing? Why now?]" },
            { q: "Business Objectives", a: "[Measurable objectives this project must achieve — e.g., reduce processing time by 40%, increase NPS by 10 pts]" },
            { q: "Current State Summary", a: "[Brief description of how things work today — key pain points, inefficiencies, gaps]" },
            { q: "Desired Future State", a: "[What does the world look like when this project succeeds?]" },
            { q: "Business Case / ROI", a: "[Expected financial or strategic return — cost savings, revenue increase, risk reduction]" },
            { q: "Strategic Alignment", a: "[Which corporate strategy, OKR, or initiative does this support?]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "24%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "40px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderScope = () => (
    <div ref={scopeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📐 SCOPE</td></tr></tbody></table>
      <CopyButton targetRef={scopeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>✅ IN SCOPE</td></tr></thead>
            <tbody>
              {["[e.g., Order management module redesign]", "[e.g., Integration with ERP system]", "[e.g., Customer-facing portal for order tracking]", "[e.g., Reporting dashboard for ops team]", "[Add item]"].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white }}>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>❌ OUT OF SCOPE</td></tr></thead>
            <tbody>
              {["[e.g., Inventory management module (Phase 2)]", "[e.g., Legacy system decommission]", "[e.g., Mobile app (separate initiative)]", "[e.g., International localization]", "[Add item]"].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white }}>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderStakeholders = () => (
    <div ref={stakeholderRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>👥 KEY STAKEHOLDERS</div>
      <CopyButton targetRef={stakeholderRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "18%" }}>Name</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Role / Title</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>RACI</th>
            <th style={S.thPrimary}>Responsibility</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[Sponsor Name]", role: "Project Sponsor", raci: "A", raciBg: "#FEE2E2", raciFg: "#DC2626", resp: "Final approval authority, funding, executive escalation" },
            { name: "[PM Name]", role: "Project Manager", raci: "R", raciBg: "#D1FAE5", raciFg: "#059669", resp: "Project execution, timeline, resource coordination" },
            { name: "[BA Name]", role: "Business Analyst", raci: "R", raciBg: "#D1FAE5", raciFg: "#059669", resp: "Requirements elicitation, documentation, traceability" },
            { name: "[Tech Lead]", role: "Technical Lead", raci: "C", raciBg: "#DBEAFE", raciFg: "#2563EB", resp: "Technical feasibility, architecture decisions" },
            { name: "[User Rep]", role: "End User Rep", raci: "C", raciBg: "#DBEAFE", raciFg: "#2563EB", resp: "User perspective, UAT participation" },
            { name: "[Add]", role: "", raci: "I", raciBg: "#F3F4F6", raciFg: "#6B7280", resp: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px" }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.raciBg, row.raciFg)}>{row.raci}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.resp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFunctional = () => (
    <div ref={funcRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>⚙️ FUNCTIONAL REQUIREMENTS</td></tr></tbody></table>
      <CopyButton targetRef={funcRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Req ID</th>
            <th style={S.thSecondary}>Requirement</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thSecondary, width: "12%" }}>Source</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "FR-001", req: "[e.g., The system shall allow users to create, edit, and cancel orders through a web interface]", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", src: "[Stakeholder]", stat: "Approved", sBg: "#D1FAE5", sFg: "#059669" },
            { id: "FR-002", req: "[e.g., The system shall send email notifications when order status changes]", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", src: "[Workshop #2]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "FR-003", req: "[e.g., The system shall generate daily order summary reports with filtering by date range, status, and region]", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", src: "[Interview]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "FR-004", req: "[e.g., The system shall integrate with the ERP system via REST API for real-time inventory checks]", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", src: "[Tech Lead]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "FR-005", req: "[Add functional requirement]", pri: "Could", priBg: "#DBEAFE", priFg: "#2563EB", src: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
            { id: "FR-006", req: "[Add functional requirement]", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", src: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{row.src}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNonFunctional = () => (
    <div ref={nfRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔒 NON-FUNCTIONAL REQUIREMENTS</div>
      <CopyButton targetRef={nfRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Req ID</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Category</th>
            <th style={S.thPrimary}>Requirement</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Measurable Target</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "NFR-001", cat: "Performance", catBg: "#DBEAFE", catFg: "#2563EB", req: "[e.g., Page load time under 2 seconds]", target: "< 2s @ 95th percentile" },
            { id: "NFR-002", cat: "Availability", catBg: "#D1FAE5", catFg: "#059669", req: "[e.g., System uptime during business hours]", target: "99.9% uptime M-F 6am-10pm" },
            { id: "NFR-003", cat: "Security", catBg: "#FEE2E2", catFg: "#DC2626", req: "[e.g., Role-based access control for all modules]", target: "SOC 2 Type II compliant" },
            { id: "NFR-004", cat: "Scalability", catBg: "#EDE9FE", catFg: "#7C3AED", req: "[e.g., Support concurrent users without degradation]", target: "500 concurrent users" },
            { id: "NFR-005", cat: "Usability", catBg: "#FEF3C7", catFg: "#D97706", req: "[e.g., New user can complete primary workflow without training]", target: "SUS score ≥ 75" },
            { id: "NFR-006", cat: "—", catBg: "#F3F4F6", catFg: "#6B7280", req: "[Add non-functional requirement]", target: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.catBg, row.catFg)}>{row.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.target}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAssumptions = () => (
    <div ref={assumeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📌 ASSUMPTIONS, CONSTRAINTS &amp; DEPENDENCIES</td></tr></tbody></table>
      <CopyButton targetRef={assumeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "33%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#2563EB", padding: "8px 10px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #2563EB" }}>💭 ASSUMPTIONS</td></tr></thead>
            <tbody>
              {["[e.g., ERP API is available and documented]", "[e.g., Budget approved for full scope]", "[e.g., Users will adopt new system with training]", "[Add]"].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "24px" }}>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "33%", paddingLeft: "3px", paddingRight: "3px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 10px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🚧 CONSTRAINTS</td></tr></thead>
            <tbody>
              {["[e.g., Must go-live by Q4 2026]", "[e.g., Budget capped at $250K]", "[e.g., Must use existing cloud platform]", "[Add]"].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "24px" }}>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "34%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 10px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>🔗 DEPENDENCIES</td></tr></thead>
            <tbody>
              {["[e.g., ERP team delivers API by Sprint 3]", "[e.g., Security review before UAT]", "[e.g., Data migration team completes mapping]", "[Add]"].map((item, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, fontSize: "11px", height: "24px" }}>{item}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderApproval = () => (
    <div ref={approvalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>✍️ APPROVAL &amp; SIGN-OFF</div>
      <CopyButton targetRef={approvalRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "20%" }}>Approver</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Role</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Status</th>
            <th style={S.thPrimary}>Comments</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[Sponsor Name]", role: "Project Sponsor", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { name: "[PM Name]", role: "Project Manager", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { name: "[Tech Lead]", role: "Technical Lead", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
            { name: "[User Rep]", role: "End User Rep", stat: "Pending", sBg: "#FEF3C7", sFg: "#D97706" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><FileText size={11} /> BRD</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><FileText size={20} className="text-blue-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Business Requirements Document (BRD)</h2>
              <p className="text-xs font-medium text-blue-600">Business Need &bull; Scope &bull; Requirements &bull; Approval</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Comprehensive BRD covering business need, scope (in/out), stakeholders, functional & non-functional requirements, assumptions/constraints/dependencies, and formal approval. Full BRD includes all sections; BRD Summary covers key sections.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderBizNeed()}{renderScope()}{renderStakeholders()}{renderFunctional()}{renderNonFunctional()}{renderAssumptions()}{renderApproval()}{renderFooter()}</>}
          {layout === "summary" && <>{renderTitleBanner()}{renderDateHeader()}{renderBizNeed()}{renderScope()}{renderFunctional()}{renderApproval()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BRDPage() {
  return (<ThemeProvider><BRDContent /></ThemeProvider>);
}
