"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Report", desc: "All sections + EVM + milestones", icon: LayoutDashboard },
  { id: "compact", label: "Quick Update", desc: "Health + accomplishments + next week", icon: AlignJustify },
];

function WeeklyStatusReportContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const accomplishmentsRef = useRef<HTMLDivElement>(null);
  const plannedRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📊 WEEKLY STATUS REPORT</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Weekly Status Report provides stakeholders with a concise summary of project health, accomplishments, upcoming activities, and key risks/issues.</strong> It uses RAG (Red/Amber/Green) indicators and EVM metrics for objective reporting.<br /><br />
          Distribute this report <strong style={{ fontStyle: "italic" }}>every Friday by end of business</strong> to all stakeholders per the Communications Plan. Aligns with PMBOK Communications Management — Monitoring & Controlling.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Report Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Reporting Period</td><td style={S.tdAlt}>[Week of MM/DD – MM/DD]</td></tr>
          <tr><td style={S.tdLabel}>Sponsor</td><td style={S.td0}>[Name, Title]</td><td style={S.tdLabel}>Distribution</td><td style={S.td0}>[Sponsor, Steering Committee, Team Leads]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>Project Health Dashboard</div>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Dimension</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Trend</th>
          <th style={S.thPrimary}>Commentary</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Overall", status: "Amber", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, trend: "Stable", comment: "[On track for budget; slightly behind on schedule — recovery plan in place]" },
            { dim: "Schedule", status: "Amber", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, trend: "Stable", comment: "[SPI 0.96 — M3 delayed 3 days; extra review session scheduled to close gap]" },
            { dim: "Budget", status: "Green", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, trend: "Improving", comment: "[CPI 1.13 — under budget; vendor line fully committed but manageable]" },
            { dim: "Scope", status: "Amber", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, trend: "Declining", comment: "[3 CRs submitted this week — change control enforcement tightened per CCB decision]" },
            { dim: "Quality", status: "Green", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, trend: "Stable", comment: "[Code coverage at 78% (target 80%); defect density 1.5/KLOC within target]" },
            { dim: "Risk", status: "Amber", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, trend: "Stable", comment: "[7 risks tracked; R2 (scope creep) elevated to Critical; 87% contingency available]" },
            { dim: "Resources", status: "Green", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, trend: "Stable", comment: "[All positions filled; Dev Lead at 110% — monitoring for burnout]" },
            { dim: "Stakeholders", status: "Green", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, trend: "Improving", comment: "[User awareness campaign launched; 5 champions recruited; sponsor engagement strong]" },
          ].map((h, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{h.dim}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(h.sBg, h.sFg)}>{h.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{h.trend}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{h.comment}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Green = On Track • Amber = At Risk / Needs Attention • Red = Off Track / Escalation Required</p>
    </div>
  );

  const renderAccomplishments = () => (
    <div ref={accomplishmentsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>Key Accomplishments This Week</td></tr></tbody></table>
      <CopyButton targetRef={accomplishmentsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Accomplishment</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Category</th>
        </tr></thead>
        <tbody>
          {[
            { acc: "[e.g., Completed system design review — all stakeholders approved architecture]", cat: "Scope", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg },
            { acc: "[e.g., CR-003 ($25K security audit) approved by CCB and baselines updated]", cat: "Change", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg },
            { acc: "[e.g., Sprint 3 delivered — 12/14 user stories completed (86% velocity)]", cat: "Delivery", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
            { acc: "[e.g., User champion network established — 5 champions across 3 departments]", cat: "Stakeholder", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg },
            { acc: "[e.g., Vendor integration milestone 2 of 4 completed on schedule]", cat: "Vendor", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg },
            { acc: "[Add accomplishment]", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.acc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.cBg, a.cFg)}>{a.cat}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPlanned = () => (
    <div ref={plannedRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>Planned Activities Next Week</div>
      <CopyButton targetRef={plannedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Activity</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { act: "[e.g., Begin Sprint 4 — focus on reporting module (8 user stories)]", owner: "[Dev Lead]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { act: "[e.g., Complete extra requirements review session to close M3 gap]", owner: "[BA]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { act: "[e.g., Start integration testing for API endpoints (Phase 1)]", owner: "[QA Lead]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { act: "[e.g., Distribute updated change control process to all team leads]", owner: "[PM]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { act: "[e.g., Vendor integration milestone 3 kickoff meeting]", owner: "[PM]", pri: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { act: "[Add activity]", owner: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg },
          ].map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(p.pBg, p.pFg)}>{p.pri}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>Top Risks & Issues</td></tr></tbody></table>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thSecondary}>Description</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Rating</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { id: "R2", type: "Risk", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, desc: "[Scope creep — 3 CRs submitted this week; approaching trigger threshold]", rating: "Critical", rBg: C.badgeRedBg, rFg: C.badgeRedFg, status: "Open", ssBg: C.badgeRedBg, ssFg: C.badgeRedFg, owner: "[BA]" },
            { id: "R1", type: "Risk", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, desc: "[Key developer burnout — Dev Lead at 110% utilization]", rating: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, status: "Monitoring", ssBg: C.badgeAmberBg, ssFg: C.badgeAmberFg, owner: "[PM]" },
            { id: "I1", type: "Issue", tBg: C.badgeRedBg, tFg: C.badgeRedFg, desc: "[M3 milestone delayed 3 days — stakeholder availability for review]", rating: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, status: "Active", ssBg: C.badgeRedBg, ssFg: C.badgeRedFg, owner: "[PM]" },
            { id: "I2", type: "Issue", tBg: C.badgeRedBg, tFg: C.badgeRedFg, desc: "[Test environment intermittent connectivity — affecting QA productivity]", rating: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, status: "Active", ssBg: C.badgeRedBg, ssFg: C.badgeRedFg, owner: "[IT Ops]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{r.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.rating}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.ssBg, r.ssFg)}>{r.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>Open Action Items</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Due</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "AI-1", action: "[Update baselines for CR-003]", owner: "[PM]", due: "[MM/DD]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { id: "AI-2", action: "[Schedule extra requirements review]", owner: "[BA]", due: "[MM/DD]", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "AI-3", action: "[Distribute updated change control process]", owner: "[PM]", due: "[MM/DD]", status: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { id: "AI-4", action: "[Resolve test environment connectivity issue]", owner: "[IT Ops]", due: "[MM/DD]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { id: "[AI-#]", action: "[Add action]", owner: "", due: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{a.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.action}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.due}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.sBg, a.sFg)}>{a.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMilestones = () => (
    <div ref={milestonesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>Milestone Status</td></tr></tbody></table>
      <CopyButton targetRef={milestonesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Milestone</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Planned</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Forecast</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Var</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: "M1", name: "[Project Kickoff]", planned: "[MM/DD]", forecast: "[MM/DD]", variance: "0d", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "M2", name: "[Design Approved]", planned: "[MM/DD]", forecast: "[MM/DD]", variance: "0d", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { id: "M3", name: "[Requirements Baselined]", planned: "[MM/DD]", forecast: "[MM/DD+3]", variance: "+3d", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { id: "M4", name: "[Development Complete]", planned: "[MM/DD]", forecast: "[MM/DD]", variance: "0d", status: "On Track", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { id: "M5", name: "[UAT Complete]", planned: "[MM/DD]", forecast: "[MM/DD]", variance: "0d", status: "Upcoming", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { id: "M6", name: "[Go-Live]", planned: "[MM/DD]", forecast: "[MM/DD]", variance: "0d", status: "Upcoming", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((m, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{m.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{m.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{m.planned}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{m.forecast}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: m.variance !== "0d" ? "#DC2626" : "#059669" }}>{m.variance}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(m.sBg, m.sFg)}>{m.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBudget = () => (
    <div ref={budgetRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>💵 BUDGET SNAPSHOT</div>
      <CopyButton targetRef={budgetRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>BAC (Total Budget)</td><td style={{ ...S.td0, fontWeight: 700 }}>$[690,525]</td></tr>
          <tr><td style={S.tdLabelAlt}>Actual Cost to Date</td><td style={S.tdAlt}>$[292,000] — [42%] of budget</td></tr>
          <tr><td style={S.tdLabel}>CPI (Cost Performance)</td><td style={S.td0}>[1.13] — <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Under Budget</span></td></tr>
          <tr><td style={S.tdLabelAlt}>SPI (Schedule Performance)</td><td style={S.tdAlt}>[0.96] — <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Slightly Behind</span></td></tr>
          <tr><td style={S.tdLabel}>EAC (Estimate at Completion)</td><td style={S.td0}>$[611,084] — projected $[79,441] under budget</td></tr>
          <tr><td style={S.tdLabelAlt}>Contingency Remaining</td><td style={S.tdAlt}>$[54,775] of $[62,775] — [87%] available</td></tr>
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
    <>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderAccomplishments()}{renderPlanned()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderRisks()}{renderActions()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderMilestones()}{renderBudget()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderAccomplishments()}{renderPlanned()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><BarChart3 size={11} /> Status</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><BarChart3 size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Weekly Status Report</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Communications Management • Monitoring & Controlling</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The most frequently used PM artifact. Full Report includes RAG health dashboard, accomplishments, risks/issues, milestones, and EVM budget snapshot. Quick Update shows health, accomplishments, and next week only.</p>
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

export default function WeeklyStatusReportPage() {
  return (<ThemeProvider><WeeklyStatusReportContent /></ThemeProvider>);
}
