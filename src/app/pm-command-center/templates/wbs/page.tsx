"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, GitBranch, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full WBS", desc: "Hierarchy + dictionary + effort", icon: LayoutDashboard },
  { id: "compact", label: "Quick WBS", desc: "Hierarchy only", icon: AlignJustify },
];

function WBSContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hierarchyRef = useRef<HTMLDivElement>(null);
  const dictionaryRef = useRef<HTMLDivElement>(null);
  const effortRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x1F333; WORK BREAKDOWN STRUCTURE (WBS)</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The WBS hierarchically decomposes the total scope of work into manageable work packages.</strong> Each level represents an increasingly detailed definition of project work. The WBS dictionary provides descriptions, acceptance criteria, and owners for each element.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>scope definition</strong> to create the scope baseline. Aligns with PMBOK Scope Management &#x2014; Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Project ID</td><td style={{ ...S.td0, width: "32%" }}>[PRJ-YYYY-###]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const wbsData = [
    { code: "1.0", name: "[Project Name]", level: 0, type: "Project" },
    { code: "1.1", name: "Initiation", level: 1, type: "Phase" },
    { code: "1.1.1", name: "Develop Project Charter", level: 2, type: "WP" },
    { code: "1.1.2", name: "Identify Stakeholders", level: 2, type: "WP" },
    { code: "1.1.3", name: "Conduct Kickoff Meeting", level: 2, type: "WP" },
    { code: "1.2", name: "Planning", level: 1, type: "Phase" },
    { code: "1.2.1", name: "Develop Project Management Plan", level: 2, type: "WP" },
    { code: "1.2.2", name: "Define Scope &amp; WBS", level: 2, type: "WP" },
    { code: "1.2.3", name: "Develop Schedule", level: 2, type: "WP" },
    { code: "1.2.4", name: "Estimate Costs &amp; Budget", level: 2, type: "WP" },
    { code: "1.2.5", name: "Plan Risk Management", level: 2, type: "WP" },
    { code: "1.3", name: "Execution", level: 1, type: "Phase" },
    { code: "1.3.1", name: "Requirements Gathering", level: 2, type: "WP" },
    { code: "1.3.2", name: "System Design", level: 2, type: "WP" },
    { code: "1.3.3", name: "Development / Build", level: 2, type: "WP" },
    { code: "1.3.4", name: "Testing &amp; QA", level: 2, type: "WP" },
    { code: "1.3.5", name: "Training &amp; Change Management", level: 2, type: "WP" },
    { code: "1.4", name: "Deployment", level: 1, type: "Phase" },
    { code: "1.4.1", name: "UAT Execution &amp; Sign-off", level: 2, type: "WP" },
    { code: "1.4.2", name: "Production Deployment", level: 2, type: "WP" },
    { code: "1.4.3", name: "Post-Go-Live Support", level: 2, type: "WP" },
    { code: "1.5", name: "Closing", level: 1, type: "Phase" },
    { code: "1.5.1", name: "Lessons Learned", level: 2, type: "WP" },
    { code: "1.5.2", name: "Project Closure Report", level: 2, type: "WP" },
    { code: "1.5.3", name: "Archive Documents", level: 2, type: "WP" },
  ];

  const renderHierarchy = () => (
    <div ref={hierarchyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CA; WBS HIERARCHY</div>
      <CopyButton targetRef={hierarchyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>WBS Code</th>
          <th style={S.thPrimary}>Element Name</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Level</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Type</th>
        </tr></thead>
        <tbody>
          {wbsData.map((w, i) => {
            const bg = w.level === 0 ? C.primary : w.level === 1 ? C.secondary : i % 2 === 0 ? C.white : C.rowAlt;
            const fg = w.level <= 1 ? C.white : C.textDark;
            const fw = w.level <= 1 ? 800 : 400;
            const indent = w.level * 20;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, color: fg, fontWeight: 700, textAlign: "center" as const, fontSize: "11px" }}>{w.code}</td>
              <td style={{ ...S.td0, backgroundColor: bg, color: fg, fontWeight: fw, paddingLeft: `${12 + indent}px`, fontSize: w.level <= 1 ? "12px" : "11px" }}>{w.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, color: fg, textAlign: "center" as const, fontSize: "11px" }}>{w.level}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                <span style={S.badge(
                  w.type === "Project" ? C.primary : w.type === "Phase" ? C.secondary : C.badgeBlueBg,
                  w.type === "Project" || w.type === "Phase" ? C.white : C.badgeBlueFg
                )}>{w.type}</span>
              </td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Level 0 = Project | Level 1 = Phase/Deliverable | Level 2 = Work Package (lowest level for estimating &amp; assigning)</p>
    </div>
  );

  const renderDictionary = () => (
    <div ref={dictionaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F4D6; WBS DICTIONARY (SAMPLE)</div>
      <CopyButton targetRef={dictionaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>WBS Code</th>
          <th style={{ ...S.thSecondary, width: "16%" }}>Work Package</th>
          <th style={S.thSecondary}>Description &amp; Acceptance Criteria</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "right" as const }}>Est. Hours</th>
        </tr></thead>
        <tbody>
          {[
            { code: "1.1.1", wp: "Develop Charter", desc: "[Draft project charter with objectives, scope, stakeholders; accepted when sponsor signs]", owner: "[PM]", hrs: "[40]" },
            { code: "1.2.2", wp: "Define Scope &amp; WBS", desc: "[Create scope statement and WBS decomposition; accepted when baseline approved]", owner: "[PM]", hrs: "[60]" },
            { code: "1.3.1", wp: "Requirements", desc: "[Elicit, analyze, document requirements; accepted when BRD is signed off]", owner: "[BA]", hrs: "[120]" },
            { code: "1.3.3", wp: "Development", desc: "[Code, unit test all modules per design specs; accepted when all unit tests pass]", owner: "[Dev Lead]", hrs: "[400]" },
            { code: "1.3.4", wp: "Testing &amp; QA", desc: "[Execute test cases, log defects, retest; accepted when exit criteria met]", owner: "[QA Lead]", hrs: "[160]" },
            { code: "1.4.2", wp: "Deployment", desc: "[Deploy to production per runbook; accepted when smoke tests pass]", owner: "[DevOps]", hrs: "[40]" },
            { code: "[X.X.X]", wp: "[Add WP]", desc: "[Description and acceptance criteria]", owner: "[Role]", hrs: "[hrs]" },
          ].map((d, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "11px" }}>{d.code}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{d.wp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{d.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{d.hrs}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEffort = () => (
    <div ref={effortRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4C8; EFFORT SUMMARY BY PHASE</div>
      <CopyButton targetRef={effortRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Phase</th>
          <th style={{ ...S.thSecondary, width: "15%", textAlign: "right" as const }}>Est. Hours</th>
          <th style={{ ...S.thSecondary, width: "15%", textAlign: "right" as const }}>Est. Cost</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>% of Total</th>
          <th style={S.thSecondary}>Key Resources</th>
        </tr></thead>
        <tbody>
          {[
            { phase: "1.1 Initiation", hrs: "[80]", cost: "$[amt]", pct: "[5%]", res: "[PM, Sponsor]" },
            { phase: "1.2 Planning", hrs: "[200]", cost: "$[amt]", pct: "[12%]", res: "[PM, BA, Architect]" },
            { phase: "1.3 Execution", hrs: "[800]", cost: "$[amt]", pct: "[60%]", res: "[Dev Team, BA, QA]" },
            { phase: "1.4 Deployment", hrs: "[160]", cost: "$[amt]", pct: "[15%]", res: "[DevOps, QA, Training]" },
            { phase: "1.5 Closing", hrs: "[60]", cost: "$[amt]", pct: "[8%]", res: "[PM, Team]" },
          ].map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{p.phase}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{p.hrs}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{p.cost}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{p.pct}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.res}</td>
            </tr>);
          })}
          <tr>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white }}>TOTAL</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "right" as const }}>[1,300]</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "right" as const }}>$[total]</td>
            <td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.primary, color: C.white, textAlign: "center" as const }}>100%</td>
            <td style={{ ...S.td0, backgroundColor: C.primary, color: C.white, fontSize: "11px" }}>[All resources]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderHierarchy()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderDictionary()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderEffort()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderHierarchy()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><GitBranch size={11} /> WBS</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><GitBranch size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Work Breakdown Structure</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Scope Management &#x2022; Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Hierarchical decomposition of total scope into work packages with dictionary and effort estimates. Full WBS includes hierarchy, dictionary, and effort summary; Quick WBS shows the hierarchy only.</p>
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

export default function WBSPage() {
  return (<ThemeProvider><WBSContent /></ThemeProvider>);
}
