"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckCircle2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full DoD", desc: "Checklist + examples + health", icon: LayoutDashboard },
  { id: "compact", label: "Checklist Only", desc: "Quick reference", icon: AlignJustify },
];

function DefinitionOfDoneContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0891B2"; const accentDark = "#0E7490";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>✅ DEFINITION OF DONE (DoD)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Daily Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Reviewed</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Agreed By</td><td style={S.tdAlt}>[PO + SM + Dev Team]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={S.tdAlt}>[Every 3 sprints or after quality issues]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderChecklist = () => (
    <div ref={checklistRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ DoD CHECKLIST — Story Must Pass ALL Before Marking Complete</td></tr></tbody></table>
      <CopyButton targetRef={checklistRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Category</th>
          <th style={S.thPrimary}>Criteria</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Required</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Code", crit: "Code is written and committed to the main branch (or feature branch merged)", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Code", crit: "Code follows team coding standards and style guide", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Code Review", crit: "Code reviewed and approved by at least one other developer", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Code Review", crit: "All code review comments addressed or resolved", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Testing", crit: "Unit tests written and passing (minimum coverage met)", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Testing", crit: "Integration tests passing in CI pipeline", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Testing", crit: "QA has tested and approved all acceptance criteria", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Testing", crit: "No critical or high-severity bugs remain", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Deployment", crit: "Deployed to staging / pre-prod environment", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Deployment", crit: "Feature flag configured (if applicable)", req: "If needed", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { cat: "Documentation", crit: "README / API docs updated (if applicable)", req: "If API", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { cat: "Documentation", crit: "Release notes drafted for this story", req: "If user-facing", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { cat: "PO Review", crit: "PO has reviewed and accepted the implementation", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600, color: accent }}>{r.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.crit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.req}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderExamples = () => (
    <div ref={examplesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📖 DONE vs. NOT DONE — EXAMPLES</td></tr></tbody></table>
      <CopyButton targetRef={examplesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ DONE (Can demo + potentially ship)</td></tr></thead>
            <tbody>
              {["Code merged, reviewed, all tests passing in CI", "QA tested all ACs — 0 critical bugs, 1 minor logged for later",
                "Deployed to staging; PO reviewed and accepted", "API docs updated; release notes drafted"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🚫 NOT DONE (Carry over or fix)</td></tr></thead>
            <tbody>
              {["\u201CCode works on my machine\u201D but not merged or deployed", "Unit tests not written — \u201CI\u2019ll add them later\u201D",
                "QA found 2 critical bugs — not yet fixed", "PO hasn\u2019t reviewed — \u201CWe\u2019ll show them in demo\u201D"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔍 DoD HEALTH CHECK</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Question</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Yes/No</th>
          <th style={{ ...S.thSecondary, width: "35%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            "Did any stories get marked \u201Cdone\u201D that didn\u2019t fully meet the DoD?",
            "Did we find bugs in production that should have been caught by the DoD?",
            "Does the team feel the DoD criteria are achievable within a sprint?",
            "Should we add or relax any criteria based on recent experience?",
          ].map((q, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐ Y &nbsp;☐ N</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"><CheckCircle2 size={11} />DoD</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><CheckCircle2 size={20} className="text-cyan-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Definition of Done (DoD)</h2><p className="text-xs font-medium text-cyan-600">Quality Gate — When Is a Story TRULY Done?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Checklist of what must be true before a story is marked complete. Prevents &quot;almost done&quot; stories and tech debt.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderExamples()}{renderHealth()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DefinitionOfDonePage() { return <ThemeProvider><DefinitionOfDoneContent /></ThemeProvider>; }
