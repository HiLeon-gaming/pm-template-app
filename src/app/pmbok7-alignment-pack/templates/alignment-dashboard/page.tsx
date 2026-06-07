"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "All sections + details", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Domain health + actions only", icon: AlignJustify },
];

function AlignmentDashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const domainRef = useRef<HTMLDivElement>(null);
  const principleRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>⭐ PMBOK 7 ALIGNMENT DASHBOARD</td></tr>
        <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>Your weekly “home base.”</strong> This one-page dashboard gives you at-a-glance domain health, principle focus areas, current delivery approach, top outcomes, and next actions. Update this weekly and review with leadership.<br /><br />
          <strong style={{ fontStyle: "italic" }}>⭐ ALL-STAR PAGE:</strong> Becomes the front page you review with leadership. Aligns with all 8 PMBOK 7 Performance Domains.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Report Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Week #</td><td style={S.tdAlt}>[Week X of Y]</td></tr>
          <tr><td style={S.tdLabel}>Delivery Approach</td><td style={S.td0}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[Hybrid / Predictive / Agile]</span></td><td style={S.tdLabel}>Overall Health</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>🟢 On Track</span></td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const domains = [
    { domain: "Stakeholder", health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, signal: "[Champions active; 2 stakeholders need re-engagement]", action: "[Schedule 1:1 with CFO and VP Ops]" },
    { domain: "Team", health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, signal: "[Morale high; QA resource at 110% utilization]", action: "[Request QA support from shared pool]" },
    { domain: "Dev Approach & Life Cycle", health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, signal: "[Hybrid approach working; sprint cadence stable]", action: "[No change needed]" },
    { domain: "Planning", health: "🟡", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, signal: "[3 dependencies unconfirmed; critical path at risk]", action: "[Confirm vendor timeline by Friday]" },
    { domain: "Project Work", health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, signal: "[Velocity stable; 2 blockers resolved this week]", action: "[Clear remaining API blocker]" },
    { domain: "Delivery", health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, signal: "[Sprint 4 delivered; UAT acceptance 100%]", action: "[Prepare Sprint 5 release notes]" },
    { domain: "Measurement", health: "🟡", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, signal: "[CPI strong at 1.04; SPI lagging at 0.92]", action: "[Review schedule compression options]" },
    { domain: "Uncertainty", health: "🟢", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, signal: "[2 risks realized and mitigated; no new unknowns]", action: "[Refresh risk register for Sprint 5]" },
  ];

  const renderDomain = () => (
    <div ref={domainRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 8 PERFORMANCE DOMAIN HEALTH STATUS</div>
      <CopyButton targetRef={domainRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Domain</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "5%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Key Signal</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "22%" }}>Action This Week</th>
        </tr></thead>
        <tbody>
          {domains.map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{d.domain}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(d.hBg, d.hFg)}>{d.health}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.signal}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{d.action}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = Healthy &nbsp;|&nbsp; 🟡 = Watch / At Risk &nbsp;|&nbsp; 🔴 = Needs Intervention &nbsp;|&nbsp; ⬜ = Not Yet Assessed</p>
    </div>
  );

  const renderPrinciple = () => (
    <div ref={principleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>⚖️ PRINCIPLE FOCUS AREAS (This Period)</td></tr></tbody></table>
      <CopyButton targetRef={principleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Principle</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Evidence / Notes</th>
        </tr></thead>
        <tbody>
          {[
            { p: "Value", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, e: "[Value checkpoints on track; ROI indicators positive]" },
            { p: "Tailoring", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, e: "[Hybrid approach confirmed appropriate; tailoring log updated]" },
            { p: "Risk", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, e: "[2 new medium risks identified; response plans needed]" },
            { p: "Stakeholders", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, e: "[Engagement plan active; sponsor aligned]" },
            { p: "Team", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, e: "[Working agreements honored; retrospective actions in progress]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.p}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.e}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Focus on 3–5 principles per period. Rotate focus monthly based on project needs.</p>
    </div>
  );

  const renderApproach = () => (
    <div ref={approachRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 DELIVERY APPROACH & TAILORING SNAPSHOT</div>
      <CopyButton targetRef={approachRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Current Approach</td><td style={S.td0}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Hybrid</span> — [Predictive planning + 2-week agile sprints for development]</td></tr>
          <tr><td style={S.tdLabelAlt}>Approach Still Right?</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>✅ Yes</span> — [Sprint velocity stable; stakeholder feedback positive on iterative delivery]</td></tr>
          <tr><td style={S.tdLabel}>Tailoring Decisions This Period</td><td style={S.td0}>[Simplified change control for low-impact CRs (<$5K); added weekly demo to improve feedback loop]</td></tr>
          <tr><td style={S.tdLabelAlt}>Governance Cadence</td><td style={S.tdAlt}>[Weekly status • Bi-weekly steering • Monthly portfolio review]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderOutcomes = () => (
    <div ref={outcomesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>📈 TOP OUTCOMES & MEASUREMENT</td></tr></tbody></table>
      <CopyButton targetRef={outcomesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Outcome / KPI</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { outcome: "[User adoption rate]", target: "80%", actual: "85%", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Champion network driving above-target adoption]" },
            { outcome: "[Process cycle time reduction]", target: "30%", actual: "22%", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Behind target; workflow optimization in Sprint 5]" },
            { outcome: "[Schedule Performance Index]", target: "1.00", actual: "0.92", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Vendor dependency impacting schedule]" },
            { outcome: "[Cost Performance Index]", target: "1.00", actual: "1.04", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Under budget; contingency intact]" },
            { outcome: "[Stakeholder satisfaction score]", target: "4.0/5", actual: "4.3/5", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Above target; exec sponsor highly engaged]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.outcome}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600 }}>{r.target}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{r.actual}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⚡ NEXT ACTIONS (This Week)</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Due</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Confirm vendor timeline for Phase 2 dependencies]", owner: "[PM]", due: "[Fri]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { action: "[Request QA resource augmentation from shared pool]", owner: "[PM]", due: "[Wed]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { action: "[Schedule re-engagement meetings with CFO and VP Ops]", owner: "[PM]", due: "[Thu]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { action: "[Update risk register with 2 new medium risks]", owner: "[PM]", due: "[Wed]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { action: "[Prepare Sprint 5 release notes and demo agenda]", owner: "[Tech Lead]", due: "[Fri]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.action}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.due}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.pBg, a.pFg)}>{a.pri}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderDomain()}{renderOutcomes()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderPrinciple()}{renderApproach()}</td>
      </tr></tbody></table>
      {renderActions()}{renderFooter()}
    </>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderDomain()}{renderActions()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">PMBOK 7 Alignment Dashboard</h2>
              <p className="text-xs font-medium text-teal-600">All 8 Performance Domains • ⭐ All-Star</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">One-page executive view with domain health, principle focus areas, delivery approach, outcomes, and next actions. Update weekly.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function AlignmentDashboardPage() {
  return (<ThemeProvider><AlignmentDashboardContent /></ThemeProvider>);
}
