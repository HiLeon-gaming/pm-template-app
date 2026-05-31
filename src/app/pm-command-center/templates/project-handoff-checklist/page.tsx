"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Send, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All handoff categories + signoff", icon: LayoutDashboard },
  { id: "compact", label: "Quick Checklist", desc: "Core checklist only", icon: AlignJustify },
];

function ProjectHandoffChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const opsRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);
  const signoffRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📤 PROJECT HANDOFF CHECKLIST</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Handoff Checklist ensures a smooth transition from the project team to the operations/support team.</strong> It verifies that all technical, operational, documentation, training, and administrative handoff activities are complete before the project team is released.<br /><br />
          Complete this checklist <strong style={{ fontStyle: "italic" }}>during the transition period between go-live and formal project closure</strong>. Aligns with PMBOK Integration Management — Close Project or Phase.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Handoff Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Receiving Manager</td><td style={S.tdAlt}>[Name, Title]</td></tr>
          <tr><td style={S.tdLabel}>Handoff From</td><td style={S.td0}>[Project Team]</td><td style={S.tdLabel}>Handoff To</td><td style={S.td0}>[IT Operations / Support Team]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const checkSection = (ref: React.RefObject<HTMLDivElement | null>, title: string, color: string | undefined, items: { item: string; owner: string; status: string; sBg: string; sFg: string; notes: string }[]) => (
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(color)}>{title}</td></tr></tbody></table>
      <CopyButton targetRef={ref} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Checklist Item</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {items.map((it, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{it.item}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{it.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(it.sBg, it.sFg)}>{it.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{it.notes}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const techItems = [
    { item: "[Production environment deployed and verified]", owner: "[DevOps]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[All services running; health checks passing]" },
    { item: "[Database backups configured and tested]", owner: "[DBA]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Daily backups; 30-day retention; restore tested]" },
    { item: "[Monitoring and alerting configured]", owner: "[IT Ops]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Uptime, CPU, memory, error rate alerts active]" },
    { item: "[SSL certificates and security configs documented]", owner: "[Security]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Cert expiry: MM/DD/YYYY; renewal process documented]" },
    { item: "[Service account credentials transferred to ops vault]", owner: "[DevOps]", status: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Scheduled for [MM/DD]]" },
    { item: "[Add technical item]", owner: "", status: "-", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "" },
  ];
  const opsItems = [
    { item: "[Incident response procedures documented and reviewed]", owner: "[IT Ops]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Severity 1-4 response matrix included]" },
    { item: "[Escalation matrix finalized with contact info]", owner: "[PM]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[L1 → L2 → L3 → Vendor contacts]" },
    { item: "[SLA/SLO targets defined and agreed]", owner: "[IT Ops]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[99.5% uptime; 4hr P1 response; 24hr P2 response]" },
    { item: "[Support team trained on application]", owner: "[Support Mgr]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[6 support staff certified; shadowing complete]" },
    { item: "[Known issues and workarounds documented]", owner: "[QA Lead]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[3 minor known issues with workarounds]" },
  ];
  const docItems = [
    { item: "[Admin guide and system architecture documentation]", owner: "[Tech Lead]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Stored in [SharePoint/Confluence]]" },
    { item: "[API documentation and integration specs]", owner: "[Dev Lead]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Swagger docs + postman collection]" },
    { item: "[Operational runbooks (deploy, rollback, DR)]", owner: "[DevOps]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Step-by-step with screenshots]" },
    { item: "[User guides and FAQ documents]", owner: "[BA]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Online help + PDF versions available]" },
    { item: "[Configuration management documentation]", owner: "[DevOps]", status: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Due [MM/DD] — environment configs]" },
  ];
  const trainingItems = [
    { item: "[End-user training completed for all departments]", owner: "[Training Mgr]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[150 users across 3 depts; 95% completion]" },
    { item: "[Admin/power user training completed]", owner: "[Training Mgr]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[8 admins certified; can manage configs]" },
    { item: "[Training materials archived and accessible]", owner: "[Training Mgr]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[LMS course + recorded sessions + job aids]" },
    { item: "[Support team knowledge transfer complete]", owner: "[PM]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[3 KT sessions completed; quiz passed by all]" },
  ];
  const adminItems = [
    { item: "[Project team access permissions revoked/transferred]", owner: "[IT Ops]", status: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Scheduled for closure date +5 days]" },
    { item: "[Vendor contracts transitioned to ops management]", owner: "[Procurement]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Vendor B contract → IT Ops; renewal Q4]" },
    { item: "[Project financials closed and final invoice paid]", owner: "[PM]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Final cost: $595K; under budget by $17.7K]" },
    { item: "[Project SharePoint/repo archived]", owner: "[PM]", status: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Read-only archive created; PMO notified]" },
    { item: "[Project team formally released]", owner: "[PM]", status: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[After closure signoff — [MM/DD]]" },
  ];

  const renderSignoff = () => (
    <div ref={signoffRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> HANDOFF ACCEPTANCE</td></tr></tbody></table>
      <CopyButton targetRef={signoffRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Role</th>
          <th style={S.thSecondary}>Name</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Signature</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Date</th>
        </tr></thead>
        <tbody>
          {["Project Manager (Handing Off)", "Ops/Support Manager (Receiving)", "IT Director", "Business Owner"].map((role, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{role}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[Name]</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>__________________</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>[MM/DD/YYYY]</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>By signing, the receiving party confirms all handoff items are complete or have an agreed remediation plan in place.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{checkSection(techRef, "TECHNICAL HANDOFF", undefined, techItems)}{checkSection(docRef, "DOCUMENTATION", undefined, docItems)}{checkSection(adminRef, "ADMINISTRATIVE CLOSURE", undefined, adminItems)}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{checkSection(opsRef, "OPERATIONAL READINESS", C.secondary, opsItems)}{checkSection(trainingRef, "TRAINING & KNOWLEDGE TRANSFER", C.secondary, trainingItems)}{renderSignoff()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{checkSection(techRef, "TECHNICAL HANDOFF", undefined, techItems)}{checkSection(opsRef, "OPERATIONAL READINESS", C.secondary, opsItems)}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Send size={11} /> Handoff</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Send size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Handoff Checklist</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management • Close Project or Phase</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Comprehensive handoff checklist covering technical, operational, documentation, training, and administrative categories. Full Checklist includes all categories and signoff; Quick Checklist shows core items only.</p>
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

export default function ProjectHandoffChecklistPage() {
  return (<ThemeProvider><ProjectHandoffChecklistContent /></ThemeProvider>);
}
