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
  { id: "full", label: "Full Log", desc: "Hypotheses + Assumptions", icon: LayoutDashboard },
  { id: "compact", label: "Assumptions Only", desc: "Quick view", icon: AlignJustify },
];

function ValueHypothesesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hypoRef = useRef<HTMLDivElement>(null);
  const assumeRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🧪 VALUE HYPOTHESES + ASSUMPTIONS LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Product Strategy &amp; Value</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Product Owner</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={S.tdAlt}>[Every sprint / bi-weekly]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderHypotheses = () => (
    <div ref={hypoRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>💡 VALUE HYPOTHESES</div>
      <CopyButton targetRef={hypoRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What we believe will deliver value. Format: &ldquo;We believe [action] will result in [outcome] for [users].&rdquo;</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "35%" }}>Hypothesis</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>How We&apos;ll Test</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Success Metric</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Result</th>
        </tr></thead>
        <tbody>
          {[
            { h: "We believe simplifying checkout to 2 steps will increase conversion by 15%", test: "A/B test with 1,000 users", metric: "Conversion rate ≥ 15% lift", status: "Testing", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, result: "Pending" },
            { h: "We believe real-time notifications will reduce support tickets by 30%", test: "Pilot with 100 power users", metric: "Support tickets drop ≥ 30%", status: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, result: "—" },
            { h: "We believe saved preferences will increase return visits by 20%", test: "Cohort analysis over 4 weeks", metric: "Return rate ≥ 20% lift", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, result: "—" },
            { h: "[Add hypothesis]", test: "", metric: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, result: "—" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.h}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.test}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.status}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{r.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAssumptions = () => (
    <div ref={assumeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>⚠️ ASSUMPTIONS LOG</div>
      <CopyButton targetRef={assumeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Things we believe to be true but have NOT validated. Track, test, and update as you learn.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Assumption</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Risk if Wrong</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>How to Validate</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { a: "Users prefer mobile checkout over desktop", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, how: "Analytics: mobile vs desktop conversion", s: "Validated ✓", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { a: "Payment gateway API supports our volume (10K txn/day)", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, how: "Load test in sandbox", s: "Testing", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { a: "Users will adopt saved payment methods", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, how: "Feature flag + opt-in tracking", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { a: "Existing DB schema can handle new order model", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, how: "Dev spike — 2 story points", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { a: "Ops team has capacity to handle 2x order volume", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, how: "Interview ops manager", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { a: "[Add assumption]", risk: "—", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg, how: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
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

  const renderTestPlan = () => (
    <div ref={testRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🧪 VALIDATION PLAN (NEXT SPRINT)</div>
      <CopyButton targetRef={testRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ TO VALIDATE THIS SPRINT</td></tr></thead>
            <tbody>
              {["Payment gateway load test (Hypothesis #1)", "Ops capacity interview (Assumption #5)", "Mobile vs desktop analytics review (Assumption #1)"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>☐ {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🚩 HIGH-RISK ITEMS (ESCALATE IF FAILED)</td></tr></thead>
            <tbody>
              {["Payment gateway volume — if fails, need alternate vendor", "DB schema — if incompatible, need migration sprint", "Mobile conversion — if low, pivot checkout UX strategy"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>⚠️ {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
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
    <>{renderTitleBanner()}{renderHeader()}{renderHypotheses()}{renderAssumptions()}{renderTestPlan()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAssumptions()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><FlaskConical size={11} />Product Strategy</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Value Hypotheses + Assumptions Log</h2><p className="text-xs font-medium text-violet-600">What We Believe &amp; What Must Be Tested</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track value hypotheses with test plans, assumptions with risk ratings, and validation priorities. Makes uncertainty visible early.</p>
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
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ValueHypothesesPage() { return <ThemeProvider><ValueHypothesesContent /></ThemeProvider>; }
