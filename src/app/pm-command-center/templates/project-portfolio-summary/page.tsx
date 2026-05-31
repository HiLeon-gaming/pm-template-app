"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Briefcase, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Summary", desc: "Portfolio + health + financials", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Portfolio register only", icon: AlignJustify },
];

function ProjectPortfolioSummaryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const finRef = useRef<HTMLDivElement>(null);
  const resourceRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>💼 PROJECT PORTFOLIO SUMMARY</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Project Portfolio Summary provides a consolidated view of all active projects across the organization.</strong> It enables portfolio-level decision making by showing health status, resource allocation, financial performance, and strategic alignment for each project in the portfolio.<br /><br />
          Present at <strong style={{ fontStyle: "italic" }}>monthly portfolio review meetings and quarterly steering committee sessions</strong>. Aligns with PMBOK Portfolio Management — Strategic & Business Management.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Portfolio Name</td><td style={{ ...S.td0, width: "32%" }}>[IT Project Portfolio / Enterprise PMO]</td><td style={{ ...S.tdLabel, width: "18%" }}>Report Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Portfolio Manager</td><td style={S.tdAlt}>[Name, PfMP/PMP]</td><td style={S.tdLabelAlt}>Review Period</td><td style={S.tdAlt}>[Month / Quarter]</td></tr>
          <tr><td style={S.tdLabel}>Active Projects</td><td style={S.td0}>[8] active • [2] on hold • [1] closing</td><td style={S.tdLabel}>Total Portfolio Budget</td><td style={S.td0}>$[4.2M]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const projects = [
    { id: "PRJ-001", name: "[CRM Implementation]", sponsor: "[VP Sales]", pm: "[Name]", phase: "Executing", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, budget: "$595K", pctComp: "85%", priority: "1", strategic: "Revenue" },
    { id: "PRJ-002", name: "[ERP Upgrade]", sponsor: "[CFO]", pm: "[Name]", phase: "Planning", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, budget: "$1.2M", pctComp: "15%", priority: "2", strategic: "Efficiency" },
    { id: "PRJ-003", name: "[Cloud Migration]", sponsor: "[CTO]", pm: "[Name]", phase: "Executing", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, health: "🟡", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, budget: "$850K", pctComp: "60%", priority: "1", strategic: "Infrastructure" },
    { id: "PRJ-004", name: "[Mobile App v2]", sponsor: "[VP Product]", pm: "[Name]", phase: "Executing", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, health: "🔴", hBg: C.badgeRedBg, hFg: C.badgeRedFg, budget: "$420K", pctComp: "45%", priority: "2", strategic: "Revenue" },
    { id: "PRJ-005", name: "[Data Warehouse]", sponsor: "[CDO]", pm: "[Name]", phase: "Initiating", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, budget: "$380K", pctComp: "5%", priority: "3", strategic: "Analytics" },
    { id: "PRJ-006", name: "[Security Compliance]", sponsor: "[CISO]", pm: "[Name]", phase: "Executing", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, budget: "$275K", pctComp: "70%", priority: "1", strategic: "Compliance" },
    { id: "PRJ-007", name: "[HR Portal Refresh]", sponsor: "[CHRO]", pm: "[Name]", phase: "On Hold", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, health: "🟡", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, budget: "$180K", pctComp: "30%", priority: "4", strategic: "People" },
    { id: "PRJ-008", name: "[Customer Portal]", sponsor: "[VP CX]", pm: "[Name]", phase: "Planning", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg, health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, budget: "$310K", pctComp: "10%", priority: "2", strategic: "CX" },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 PORTFOLIO REGISTER</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Project</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>PM</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Phase</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "right" as const }}>Budget</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>%</th>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>Pri</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Strategic</th>
        </tr></thead>
        <tbody>
          {projects.map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{p.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{p.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{p.pm}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(p.pBg, p.pFg), fontSize: "9px" }}>{p.phase}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(p.hBg, p.hFg)}>{p.health}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontSize: "10px", fontWeight: 600 }}>{p.budget}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{p.pctComp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{p.priority}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{p.strategic}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🚦 PORTFOLIO HEALTH OVERVIEW</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Green (On Track)</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>5 projects</span> — PRJ-001, 002, 005, 006, 008</td></tr>
          <tr><td style={S.tdLabelAlt}>Amber (At Risk)</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>2 projects</span> — PRJ-003 (schedule delay), PRJ-007 (on hold — resource conflict)</td></tr>
          <tr><td style={S.tdLabel}>Red (Off Track)</td><td style={S.td0}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>1 project</span> — PRJ-004 (scope creep + budget overrun, escalation required)</td></tr>
          <tr><td style={S.tdLabelAlt}>Executive Summary</td><td style={S.tdAlt}>[62% of portfolio on track. PRJ-004 requires steering committee decision on scope reduction or additional funding. PRJ-007 on hold pending Q3 resource availability.]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFin = () => (
    <div ref={finRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>💰 PORTFOLIO FINANCIALS</div>
      <CopyButton targetRef={finRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Metric</th>
          <th style={{ ...S.thSecondary, width: "18%", textAlign: "right" as const }}>Value</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Total Portfolio Budget", val: "$[4,210,000]", note: "Sum of all approved project budgets" },
            { metric: "Total Spent to Date", val: "$[1,890,000]", note: "45% of total budget consumed" },
            { metric: "Portfolio CPI (Weighted)", val: "[1.04]", note: "🟢 Slightly under budget overall" },
            { metric: "Portfolio SPI (Weighted)", val: "[0.92]", note: "🟡 Slightly behind schedule (PRJ-003, 004 dragging)" },
            { metric: "Forecast at Completion", val: "$[4,048,000]", note: "Expected to finish $162K under total budget" },
            { metric: "Contingency Remaining", val: "$[320,000]", note: "7.6% of total portfolio budget" },
          ].map((f, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{f.metric}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 700 }}>{f.val}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{f.note}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderResource = () => (
    <div ref={resourceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>👥 RESOURCE ALLOCATION</td></tr></tbody></table>
      <CopyButton targetRef={resourceRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Resource Pool</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Capacity</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Allocated</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Utilization</th>
          <th style={S.thSecondary}>Conflicts / Notes</th>
        </tr></thead>
        <tbody>
          {[
            { pool: "Development", cap: "[18 FTE]", alloc: "[17 FTE]", util: "94%", uColor: "#D97706", notes: "[Near capacity; PRJ-005 start may require contractor support]" },
            { pool: "QA / Testing", cap: "[6 FTE]", alloc: "[5 FTE]", util: "83%", uColor: "#16A34A", notes: "[Adequate capacity; UAT surge in Q3 planned]" },
            { pool: "Business Analysis", cap: "[4 FTE]", alloc: "[4 FTE]", util: "100%", uColor: "#DC2626", notes: "[Fully allocated; PRJ-007 resume will require additional BA]" },
            { pool: "Project Management", cap: "[5 FTE]", alloc: "[5 FTE]", util: "100%", uColor: "#DC2626", notes: "[At capacity; considering PMO contractor for PRJ-005]" },
            { pool: "Infrastructure / DevOps", cap: "[4 FTE]", alloc: "[3 FTE]", util: "75%", uColor: "#16A34A", notes: "[Available capacity for PRJ-003 cloud migration ramp]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.pool}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.cap}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.alloc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: r.uColor }}>{r.util}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisk = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚠️ PORTFOLIO-LEVEL RISKS</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Portfolio Risk</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Rating</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Affected Projects</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Mitigation</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[Resource contention — BA and PM pools at 100% utilization]", rating: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, affected: "[All active]", mit: "[Contractor pipeline; prioritize by strategic value]" },
            { risk: "[Budget pressure — PRJ-004 may need additional $60K]", rating: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, affected: "[PRJ-004, Portfolio]", mit: "[Scope reduction option presented to steering committee]" },
            { risk: "[Vendor dependency across 3 projects]", rating: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, affected: "[PRJ-001, 003, 008]", mit: "[Consolidated vendor management; shared contract terms]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.risk}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.rating}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.affected}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mit}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderHealth()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderFin()}{renderRisk()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderResource()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Briefcase size={11} /> Portfolio</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Briefcase size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Project Portfolio Summary</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Portfolio Management • Strategic & Business Management</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Consolidated portfolio view with health, financials, resource allocation, and portfolio-level risks. Full Summary includes all sections; Quick Summary shows the register only.</p>
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

export default function ProjectPortfolioSummaryPage() {
  return (<ThemeProvider><ProjectPortfolioSummaryContent /></ThemeProvider>);
}
