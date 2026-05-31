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
  { id: "full", label: "Full Log", desc: "Decisions + outcomes + lessons", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decision register only", icon: AlignJustify },
];

function TailoringDecisionsLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📝 TAILORING DECISIONS LOG</td></tr>
      <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>A living record of what you tailored, when, and the outcome.</strong> Great for audit trail, lessons learned, and proving that tailoring decisions were deliberate and evidence-based — not accidental.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Total Tailoring Decisions</td><td style={S.tdAlt}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>[8]</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 TAILORING DECISION REGISTER</div>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "8%" }}>Date</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "14%" }}>Dimension</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>What Was Tailored</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Rationale</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "7%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[01/15]", dim: "Change Control", what: "[PM authority for changes &lt;$5K instead of full CCB]", rat: "[Reduce decision bottleneck; 80% of CRs are minor]", status: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[01/15]", dim: "Planning Depth", what: "[WBS to 3 levels + sprint backlogs instead of 5-level WBS]", rat: "[Hybrid approach; detailed planning at sprint level]", status: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[01/22]", dim: "Reporting", what: "[Bi-weekly status to steering instead of weekly]", rat: "[Sponsor preference; reduces overhead without losing visibility]", status: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[02/05]", dim: "Risk Mgmt", what: "[Weekly 15-min risk check instead of monthly deep review]", rat: "[Higher risk profile; more frequent = earlier detection]", status: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[02/12]", dim: "QA Process", what: "[Sprint demo + UAT per increment instead of phase-end QA]", rat: "[Continuous quality; faster feedback; matches hybrid delivery]", status: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[02/26]", dim: "Documentation", what: "[Eliminated separate risk response plan; embedded in risk register]", rat: "[Team finds combined format more usable; reduces duplication]", status: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[03/10]", dim: "Stakeholder Eng.", what: "[Added weekly informal check-ins with top 3 stakeholders]", rat: "[Stakeholder sentiment trending down; proactive engagement needed]", status: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[03/18]", dim: "Change Control", what: "[Reverted: all CRs now go through CCB after 2 scope creep incidents]", rat: "[PM-only approval led to accumulated minor changes exceeding budget threshold]", status: "Revised", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "[MM/DD]", dim: "[Dimension]", what: "[What was tailored]", rat: "[Why]", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.date}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "10px" }}>{r.dim}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.rat}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Active = Currently in effect &nbsp;|&nbsp; Revised = Changed based on outcomes &nbsp;|&nbsp; Retired = No longer applicable</p>
    </div>
  );

  const renderOutcomes = () => (
    <div ref={outcomesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>📊 TAILORING OUTCOMES REVIEW</td></tr></tbody></table>
      <CopyButton targetRef={outcomesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Tailoring Decision</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Outcome</th>
          <th style={S.thSecondary}>Evidence / Impact</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Lesson Learned</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "[Bi-weekly reporting instead of weekly]", outcome: "🟢", oBg: C.badgeGreenBg, oFg: C.badgeGreenFg, evidence: "[Saved ~4 hrs/week reporting time; sponsor satisfied with cadence]", lesson: "[Match reporting to governance cadence, not habit]" },
            { dec: "[Weekly risk checks instead of monthly]", outcome: "🟢", oBg: C.badgeGreenBg, oFg: C.badgeGreenFg, evidence: "[Caught vendor delay 2 weeks earlier than monthly review would have]", lesson: "[Frequency should match risk velocity]" },
            { dec: "[PM authority for minor CRs]", outcome: "🔴", oBg: C.badgeRedBg, oFg: C.badgeRedFg, evidence: "[Cumulative minor changes exceeded $12K; scope creep detected too late]", lesson: "[Need cumulative threshold, not just per-change threshold]" },
            { dec: "[Sprint demo + UAT per increment]", outcome: "🟢", oBg: C.badgeGreenBg, oFg: C.badgeGreenFg, evidence: "[3 defects caught per sprint avg; none escaped to production]", lesson: "[Continuous QA dramatically reduces end-of-phase defect load]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.dec}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.oBg, r.oFg)}>{r.outcome}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.evidence}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.lesson}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📝 TAILORING LOG SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Decisions Logged</td><td style={S.td0}>[8]</td></tr>
        <tr><td style={S.tdLabelAlt}>Active</td><td style={S.tdAlt}>[6] — Currently in effect and working as intended</td></tr>
        <tr><td style={S.tdLabel}>Revised</td><td style={S.td0}>[1] — Changed based on outcomes (change control threshold)</td></tr>
        <tr><td style={S.tdLabelAlt}>Retired</td><td style={S.tdAlt}>[0]</td></tr>
        <tr><td style={S.tdLabel}>Next Review Date</td><td style={S.td0}>[MM/DD/YYYY] — Monthly review aligned with domain retrospective</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderOutcomes()}{renderSummary()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Compass size={11} /> Tailoring</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Tailoring Decisions Log</h2><p className="text-xs font-medium text-teal-600">Living Tailoring Record</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Track what you tailored, when, and the outcome. Great for audit trail and lessons learned.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TailoringDecisionsLogPage() {
  return (<ThemeProvider><TailoringDecisionsLogContent /></ThemeProvider>);
}
