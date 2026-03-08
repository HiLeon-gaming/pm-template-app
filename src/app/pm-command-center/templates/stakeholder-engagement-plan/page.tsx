"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Assessment + strategies + action plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Engagement matrix only", icon: AlignJustify },
];

function StakeholderEngagementPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>👥 STAKEHOLDER ENGAGEMENT PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Stakeholder Engagement Plan assesses each stakeholder’s current and desired engagement level, then defines strategies and actions to close the gap.</strong> It ensures stakeholders are appropriately involved throughout the project lifecycle.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>stakeholder planning and throughout monitoring</strong>. Aligns with PMBOK Stakeholder Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const levels = ["Unaware", "Resistant", "Neutral", "Supportive", "Leading"];
  const levelColors: Record<string, { bg: string; fg: string }> = {
    Unaware: { bg: C.badgeGrayBg, fg: C.badgeGrayFg },
    Resistant: { bg: C.badgeRedBg, fg: C.badgeRedFg },
    Neutral: { bg: C.badgeAmberBg, fg: C.badgeAmberFg },
    Supportive: { bg: C.badgeBlueBg, fg: C.badgeBlueFg },
    Leading: { bg: C.badgeGreenBg, fg: C.badgeGreenFg },
  };

  const stakeholders = [
    { name: "[CIO / Sponsor]", role: "Sponsor", power: "High", interest: "High", current: "Supportive", desired: "Leading" },
    { name: "[VP Operations]", role: "Key Stakeholder", power: "High", interest: "Med", current: "Neutral", desired: "Supportive" },
    { name: "[Finance Director]", role: "Approver", power: "High", interest: "Low", current: "Resistant", desired: "Neutral" },
    { name: "[IT Manager]", role: "Technical Lead", power: "Med", interest: "High", current: "Supportive", desired: "Leading" },
    { name: "[End User Group]", role: "Users", power: "Low", interest: "High", current: "Unaware", desired: "Supportive" },
    { name: "[External Vendor]", role: "Vendor", power: "Med", interest: "Med", current: "Neutral", desired: "Supportive" },
    { name: "[HR Director]", role: "Change Sponsor", power: "Med", interest: "Med", current: "Neutral", desired: "Supportive" },
    { name: "[Add stakeholder]", role: "", power: "", interest: "", current: "", desired: "" },
  ];

  const renderAssessment = () => (
    <div ref={assessmentRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 ENGAGEMENT ASSESSMENT MATRIX</div>
      <CopyButton targetRef={assessmentRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "14%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Role</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Power</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Interest</th>
          {levels.map((l, i) => (<th key={i} style={{ ...S.thPrimary, textAlign: "center" as const, fontSize: "9px", padding: "6px 2px" }}>{l}</th>))}
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Gap?</th>
        </tr></thead>
        <tbody>
          {stakeholders.map((s, si) => {
            const bg = si % 2 === 1 ? C.rowAlt : C.white;
            const hasGap = s.current !== s.desired && s.current !== "";
            return (<tr key={si}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{s.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{s.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{s.power}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{s.interest}</td>
              {levels.map((l, li) => {
                const isCurrent = s.current === l;
                const isDesired = s.desired === l;
                return (<td key={li} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "12px" }}>
                  {isCurrent && isDesired ? <span style={{ fontWeight: 800 }}>C/D</span> :
                   isCurrent ? <span style={{ fontWeight: 800, color: C.primary }}>C</span> :
                   isDesired ? <span style={{ fontWeight: 800, color: "#059669" }}>D</span> : ""}
                </td>);
              })}
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                {hasGap ? <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Gap</span> : s.current ? <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>OK</span> : ""}
              </td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}><strong>C</strong> = Current engagement level • <strong>D</strong> = Desired engagement level • <strong>Gap</strong> = Action needed to move stakeholder from C to D</p>
    </div>
  );

  const renderStrategy = () => (
    <div ref={strategyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🎯 ENGAGEMENT STRATEGIES</div>
      <CopyButton targetRef={strategyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "14%" }}>Stakeholder</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Gap</th>
          <th style={S.thSecondary}>Engagement Strategy</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Key Message</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[CIO / Sponsor]", gap: "S→L", gBg: C.badgeBlueBg, gFg: C.badgeBlueFg, strategy: "[Position as executive champion; provide talking points for leadership meetings; invite to showcase demos; celebrate wins publicly]", msg: "[Strategic value]", owner: "[PM]" },
            { name: "[VP Operations]", gap: "N→S", gBg: C.badgeAmberBg, gFg: C.badgeAmberFg, strategy: "[1:1 monthly updates focused on operational benefits; involve in process design decisions; address efficiency gains]", msg: "[Operational ROI]", owner: "[PM]" },
            { name: "[Finance Director]", gap: "R→N", gBg: C.badgeRedBg, gFg: C.badgeRedFg, strategy: "[Address budget concerns directly; share detailed ROI analysis; invite to steering committee; provide financial transparency]", msg: "[Cost control]", owner: "[Sponsor]" },
            { name: "[IT Manager]", gap: "S→L", gBg: C.badgeBlueBg, gFg: C.badgeBlueFg, strategy: "[Empower as technical decision-maker; co-present at architecture reviews; recognize technical contributions]", msg: "[Tech ownership]", owner: "[PM]" },
            { name: "[End User Group]", gap: "U→S", gBg: C.badgeRedBg, gFg: C.badgeRedFg, strategy: "[Early awareness campaign; pilot group involvement; user champions network; training previews; feedback loops]", msg: "[Ease of use]", owner: "[Change Mgr]" },
            { name: "[External Vendor]", gap: "N→S", gBg: C.badgeAmberBg, gFg: C.badgeAmberFg, strategy: "[Regular touchpoints; clear expectations; joint problem-solving sessions; performance incentives]", msg: "[Partnership]", owner: "[PM]" },
          ].map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{s.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.gBg, s.gFg)}>{s.gap}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.strategy}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{s.msg}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAction = () => (
    <div ref={actionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📝 ENGAGEMENT ACTION PLAN</div>
      <CopyButton targetRef={actionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Target Stakeholder</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Due Date</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Schedule 1:1 with Finance Director to present ROI analysis]", target: "[Finance Dir]", due: "[MM/DD]", owner: "[PM]", status: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Launch user awareness campaign — email + intranet article]", target: "[End Users]", due: "[MM/DD]", owner: "[Change Mgr]", status: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { action: "[Recruit 5 user champions from each department]", target: "[End Users]", due: "[MM/DD]", owner: "[Change Mgr]", status: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Invite Sponsor to next sprint demo for leadership visibility]", target: "[CIO]", due: "[MM/DD]", owner: "[PM]", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { action: "[Set up monthly vendor performance review meeting]", target: "[Vendor]", due: "[MM/DD]", owner: "[PM]", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { action: "[Brief VP Ops on Q3 efficiency metrics from pilot]", target: "[VP Ops]", due: "[MM/DD]", owner: "[PM]", status: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Add action]", target: "", due: "", owner: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.action}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{a.target}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.due}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{a.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(a.sBg, a.sFg)}>{a.status}</span></td>
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
    <>{renderTitleBanner()}{renderHeader()}{renderAssessment()}{renderStrategy()}{renderAction()}{renderFooter()}</>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAssessment()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Users size={11} /> Engagement</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Users size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Engagement Plan</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Stakeholder Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Assesses current vs desired engagement levels with strategies and action plans to close gaps. Full Plan includes all sections; Quick Plan shows the engagement matrix only.</p>
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

export default function StakeholderEngagementPlanPage() {
  return (<ThemeProvider><StakeholderEngagementPlanContent /></ThemeProvider>);
}
