"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ShieldAlert, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full RAID", desc: "All 4 categories", icon: LayoutDashboard },
  { id: "compact", label: "Risks & Issues", desc: "High-priority only", icon: AlignJustify },
];

function RaidLiteContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const assumeRef = useRef<HTMLDivElement>(null);
  const issuesRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#B45309";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🛡️ AGILE RAID-LITE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Risks &bull; Assumptions &bull; Issues &bull; Decisions</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Maintained By</td><td style={S.tdAlt}>[SM / PO]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={S.tdAlt}>[Every sprint planning + refinement]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>🔴 RISKS</td></tr></tbody></table>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Things that MIGHT happen and would hurt delivery if they do.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Risk</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Likelihood</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Mitigation</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { r: "[Payment vendor may not deliver sandbox on time]", l: "High", lBg: C.badgeRedBg, lFg: C.badgeRedFg, i: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, m: "[Backup vendor identified; escalation in progress]", o: "[SM]" },
            { r: "[Key dev leaving mid-sprint]", l: "Low", lBg: C.badgeGreenBg, lFg: C.badgeGreenFg, i: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, m: "[Knowledge sharing sessions; pair programming]", o: "[Tech Lead]" },
            { r: "[Scope creep from stakeholder requests]", l: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, i: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, m: "[Sprint Scope Change Log; PO gatekeeping]", o: "[PO]" },
            { r: "[Add risk]", l: "—", lBg: C.badgeGrayBg, lFg: C.badgeGrayFg, i: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, m: "", o: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.r}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.lBg, r.lFg)}>{r.l}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.i}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.m}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.o}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAssumptions = () => (
    <div ref={assumeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🟡 ASSUMPTIONS</td></tr></tbody></table>
      <CopyButton targetRef={assumeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Things we believe to be true but haven&apos;t fully validated.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Assumption</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Risk if Wrong</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>How to Validate</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { a: "[Users prefer 2-step checkout over current 6-step]", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, how: "[A/B test in Sprint 8]", s: "Testing", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { a: "[API can handle 10K transactions/day]", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, how: "[Load test in sandbox]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { a: "[Ops team can handle 2x order volume]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, how: "[Interview ops manager]", s: "Validated ✓", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { a: "[Add assumption]", risk: "—", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg, how: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.a}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderIssues = () => (
    <div ref={issuesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#EF4444")}>🔴 ISSUES (ACTIVE NOW)</td></tr></tbody></table>
      <CopyButton targetRef={issuesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Things that ARE happening right now and need resolution.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Issue</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Next Step</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { iss: "[Staging disk space at 95% — builds failing]", sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, next: "[Infra ticket #4521 — expanding storage]", o: "[DevOps]", st: "In Progress", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
            { iss: "[Test data not refreshed since last sprint]", sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, next: "[QA lead refreshing data set today]", o: "[QA Lead]", st: "In Progress", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
            { iss: "[Add issue]", sev: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, next: "", o: "", st: "—", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.iss}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.next}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.o}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.stBg, r.stFg)}>{r.st}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>🟢 DECISIONS</td></tr></tbody></table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Key decisions made — so nobody asks &ldquo;why did we do that?&rdquo; later.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Decision</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Rationale</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Decided By</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[MM/DD]", dec: "[Use PayCorp as primary payment vendor]", rat: "[Best API docs, competitive rates, existing relationship]", by: "[PO]" },
            { date: "[MM/DD]", dec: "[2-week sprints instead of 1-week]", rat: "[Team too small for weekly ceremonies; 2-week gives better flow]", by: "[SM + Team]" },
            { date: "[MM/DD]", dec: "[Defer native mobile app to Phase 2]", rat: "[Responsive web covers 90% of use cases; faster to market]", by: "[PO + Sponsor]" },
            { date: "[Add]", dec: "", rat: "", by: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600, color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.rat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.by}</td>
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

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderRisks()}{renderIssues()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderAssumptions()}{renderDecisions()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRisks()}{renderIssues()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><ShieldAlert size={11} />RAID-Lite</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><ShieldAlert size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Agile RAID-Lite</h2><p className="text-xs font-medium text-amber-600">Risks &bull; Assumptions &bull; Issues &bull; Decisions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Lightweight log for the 4 things that kill Agile projects silently. Prevents hidden project killers with minimal overhead.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function RaidLitePage() { return <ThemeProvider><RaidLiteContent /></ThemeProvider>; }
