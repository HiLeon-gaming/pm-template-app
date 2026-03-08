"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FlaskConical, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Summary", desc: "Results + coverage + risks", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Test results only", icon: AlignJustify },
];

function QATestSummaryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const coverageRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🧪 QA / TEST SUMMARY</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Quality &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>QA Lead</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Test Phase</td><td style={S.tdAlt}>[In-Sprint / Pre-Release / UAT]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderResults = () => (
    <div ref={resultsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 TEST RESULTS BY STORY</div>
      <CopyButton targetRef={resultsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>Story</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>ACs</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Pass</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Fail</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Bugs</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Result</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-002", desc: "[Save address for returning users]", acs: "4", pass: "4", fail: "0", bugs: "0", res: "Pass", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { id: "S-003", desc: "[Order confirmation email + in-app]", acs: "3", pass: "2", fail: "1", bugs: "2", res: "Retest", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { id: "S-010", desc: "[Apple Pay integration]", acs: "5", pass: "3", fail: "1", bugs: "1", res: "In QA", rBg: C.badgeBlueBg, rFg: C.badgeBlueFg },
            { id: "S-012a", desc: "[Payment error display]", acs: "3", pass: "3", fail: "0", bugs: "0", res: "Pass", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { id: "S-012b", desc: "[Payment retry logic]", acs: "4", pass: "0", fail: "0", bugs: "0", res: "Not Started", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg },
            { id: "[Add]", desc: "", acs: "", pass: "", fail: "", bugs: "", res: "—", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.acs}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: "#059669" }}>{r.pass}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: r.fail !== "0" ? "#DC2626" : C.textMuted }}>{r.fail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: r.bugs !== "0" ? "#DC2626" : C.textMuted }}>{r.bugs}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.res}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCoverage = () => (
    <div ref={coverageRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📈 QUALITY METRICS</div>
      <CopyButton targetRef={coverageRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Total ACs", value: "[19]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Passed", value: "[12]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Failed", value: "[2]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Bugs Found", value: "[3]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Pass Rate", value: "[86%]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚠️ QA RISKS &amp; NOTES</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Ship Readiness</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Not Yet</span> — [2 stories still in QA; 1 critical bug open]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Key Risks</td><td style={{ ...S.tdAlt, height: "36px" }}>[Apple Pay not fully tested on all devices; Payment retry logic not yet in QA]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Untested Areas</td><td style={S.td0}>[Edge cases: slow network, expired cards, concurrent sessions]</td></tr>
        <tr><td style={S.tdLabelAlt}>QA Recommendation</td><td style={S.tdAlt}>[Fix critical bug before demo; schedule focused QA day for Apple Pay before release]</td></tr>
      </tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><FlaskConical size={11} />QA</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><FlaskConical size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">QA / Test Summary</h2><p className="text-xs font-medium text-violet-600">Per-Story Test Results + Quality Metrics</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Test results by story, quality metrics dashboard, and QA risks. Shows whether the sprint is ready to ship.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderResults()}{renderCoverage()}{renderRisks()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderResults()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function QATestSummaryPage() { return <ThemeProvider><QATestSummaryContent /></ThemeProvider>; }
