"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Grid3X3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full RACI", desc: "Matrix + guidelines + analysis", icon: LayoutDashboard },
  { id: "compact", label: "Quick RACI", desc: "Matrix only", icon: AlignJustify },
];

function RACIMatrixContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const guidelinesRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>👥 RACI MATRIX</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop | PM Command Center | PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The RACI Matrix clarifies roles and responsibilities for every key deliverable or decision.</strong> Each activity has exactly one Accountable person, with Responsible, Consulted, and Informed parties clearly identified to eliminate ambiguity.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>resource and communications planning</strong> to ensure clear ownership. Aligns with PMBOK Resource Management — Planning Process Group.
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

  const raciColors: Record<string, { bg: string; fg: string }> = {
    R: { bg: "#DBEAFE", fg: "#1E40AF" },
    A: { bg: "#FEE2E2", fg: "#DC2626" },
    C: { bg: "#FEF3C7", fg: "#D97706" },
    I: { bg: "#D1FAE5", fg: "#059669" },
    "": { bg: C.white, fg: C.textMuted },
  };

  const renderLegend = () => (
    <div ref={legendRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📖 RACI LEGEND</td></tr></tbody></table>
      <CopyButton targetRef={legendRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Code</th>
          <th style={{ ...S.thSecondary, width: "16%" }}>Role</th>
          <th style={S.thSecondary}>Definition</th>
        </tr></thead>
        <tbody>
          {[
            { code: "R", role: "Responsible", def: "Does the work. Multiple people can be Responsible for a single activity." },
            { code: "A", role: "Accountable", def: "Ultimately answerable for the activity. Only ONE person can be Accountable per activity." },
            { code: "C", role: "Consulted", def: "Provides input before or during the work. Two-way communication." },
            { code: "I", role: "Informed", def: "Kept up-to-date on progress or decisions. One-way communication." },
          ].map((l, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const rc = raciColors[l.code];
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(rc.bg, rc.fg), fontWeight: 800, fontSize: "13px", padding: "4px 10px" }}>{l.code}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{l.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{l.def}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const roles = ["Sponsor", "PM", "BA", "Dev Lead", "QA Lead", "Architect", "Change Mgr"];
  const activities = [
    { activity: "Approve Project Charter", raci: ["A", "R", "C", "", "", "I", "I"] },
    { activity: "Develop Project Management Plan", raci: ["I", "A/R", "C", "C", "C", "C", "I"] },
    { activity: "Define Scope & WBS", raci: ["I", "A", "R", "C", "C", "C", ""] },
    { activity: "Gather & Document Requirements", raci: ["C", "I", "A/R", "C", "C", "", "I"] },
    { activity: "Create System Design", raci: ["", "I", "C", "R", "", "A/R", ""] },
    { activity: "Develop / Build Solution", raci: ["", "I", "C", "A/R", "I", "C", ""] },
    { activity: "Execute Testing & QA", raci: ["", "I", "C", "C", "A/R", "", ""] },
    { activity: "Manage UAT", raci: ["I", "A", "R", "C", "R", "", "C"] },
    { activity: "Deploy to Production", raci: ["I", "A", "", "R", "C", "C", ""] },
    { activity: "Manage Change & Training", raci: ["I", "I", "C", "", "", "", "A/R"] },
    { activity: "Manage Risks & Issues", raci: ["C", "A/R", "C", "C", "C", "C", "I"] },
    { activity: "Approve Budget Changes", raci: ["A", "R", "I", "I", "I", "I", "I"] },
    { activity: "Close Project", raci: ["A", "R", "C", "C", "C", "I", "C"] },
    { activity: "[Add Activity]", raci: ["", "", "", "", "", "", ""] },
  ];

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 RACI ASSIGNMENT MATRIX</td></tr></tbody></table>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Activity / Deliverable</th>
          {roles.map((r, i) => (<th key={i} style={{ ...S.thPrimary, textAlign: "center" as const, fontSize: "10px", padding: "8px 4px" }}>{r}</th>))}
        </tr></thead>
        <tbody>
          {activities.map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{a.activity}</td>
              {a.raci.map((val, j) => {
                const baseCode = val.replace("/", "").charAt(0);
                const rc = raciColors[baseCode] || raciColors[""];
                return (<td key={j} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  {val ? <span style={{ ...S.badge(rc.bg, rc.fg), fontWeight: 800 }}>{val}</span> : <span style={{ color: C.textMuted, fontSize: "10px" }}>—</span>}
                </td>);
              })}
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>A/R = both Accountable and Responsible (when one person does and owns the work). Every row must have exactly one “A”.</p>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🔍 RACI ANALYSIS</td></tr></tbody></table>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "16%" }}>Role</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>R</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>A</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>C</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>I</th>
          <th style={S.thSecondary}>Observation</th>
        </tr></thead>
        <tbody>
          {roles.map((r, ri) => {
            const counts = { R: 0, A: 0, C: 0, I: 0 };
            activities.forEach(a => {
              const val = a.raci[ri];
              if (val.includes("R")) counts.R++;
              if (val.includes("A")) counts.A++;
              if (val === "C") counts.C++;
              if (val === "I") counts.I++;
            });
            const bg = ri % 2 === 1 ? C.rowAlt : C.white;
            const obs = counts.A > 5 ? "[May be overloaded as Accountable — consider delegation]" :
              counts.R > 6 ? "[Heavy workload — monitor capacity]" :
              (counts.R + counts.A + counts.C + counts.I) < 3 ? "[Low involvement — verify if needed on project]" : "[Balanced assignment]";
            return (<tr key={ri}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(raciColors.R.bg, raciColors.R.fg)}>{counts.R}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(raciColors.A.bg, raciColors.A.fg)}>{counts.A}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(raciColors.C.bg, raciColors.C.fg)}>{counts.C}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(raciColors.I.bg, raciColors.I.fg)}>{counts.I}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{obs}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGuidelines = () => (
    <div ref={guidelinesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>✅ RACI GUIDELINES</td></tr></tbody></table>
      <CopyButton targetRef={guidelinesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "28%" }}>Rule</th>
          <th style={S.thSecondary}>Description</th>
        </tr></thead>
        <tbody>
          {[
            { rule: "One “A” Per Row", desc: "Every activity must have exactly one Accountable person. No more, no less." },
            { rule: "Minimize “R” Per Row", desc: "Too many Responsible parties causes confusion. Aim for 1–3 per activity." },
            { rule: "Avoid Vertical Overload", desc: "If one person has too many A’s or R’s, they may be a bottleneck. Redistribute." },
            { rule: "No Empty Rows", desc: "Every activity needs at least an A and an R (can be the same person)." },
            { rule: "No Empty Columns", desc: "Every person should have at least one assignment. Remove if not needed." },
            { rule: "Review With Stakeholders", desc: "Walk through the matrix with each stakeholder to confirm understanding and agreement." },
          ].map((g, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{g.rule}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{g.desc}</td>
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
    <>{renderTitleBanner()}{renderHeader()}{renderLegend()}{renderMatrix()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderAnalysis()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderGuidelines()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderLegend()}{renderMatrix()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Grid3X3 size={11} /> RACI</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Grid3X3 size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">RACI Matrix</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Resource Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Clarifies Responsible, Accountable, Consulted, and Informed roles for every key activity. Full RACI includes analysis and guidelines; Quick RACI shows the matrix with legend.</p>
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

export default function RACIMatrixPage() {
  return (<ThemeProvider><RACIMatrixContent /></ThemeProvider>);
}
