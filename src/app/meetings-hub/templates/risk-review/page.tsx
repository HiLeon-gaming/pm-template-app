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
  { id: "full", label: "Full RAID", desc: "Risks + Assumptions + Issues + Dependencies", icon: LayoutDashboard },
  { id: "compact", label: "Quick Risks", desc: "Risks + Issues only", icon: AlignJustify },
];

function RiskReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const depsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EA580C"; const accentDark = "#C2410C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🛡️ RISK REVIEW / RAID</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Project &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[PM Name]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Weekly / Bi-weekly]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>⚠️ RISKS</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Risk</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Prob</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Mitigation</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[Key developer leaves mid-project]", prob: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, owner: "[PM]", mit: "[Cross-train + document]", s: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { risk: "[Third-party API breaking changes]", prob: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, owner: "[Tech Lead]", mit: "[Abstraction layer + monitoring]", s: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { risk: "[Budget overrun — scope creep]", prob: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, owner: "[PM]", mit: "[Strict change control process]", s: "Mitigating", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { risk: "[Vendor contract delay]", prob: "Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, owner: "[Procurement]", mit: "[Alternative vendor identified]", s: "Closed", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.prob}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAI = () => (
    <div ref={aiRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#3B82F6")}>📌 ASSUMPTIONS</div>
          <table style={S.tbl}><tbody>
            {[
              "[Full team available for project duration]",
              "[Stakeholders available for weekly review]",
              "[Cloud infrastructure ready by sprint 3]",
              "[No major regulatory changes expected]",
            ].map((a, i) => (
              <tr key={i}><td style={{ ...(i % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "6px 10px" }}>&bull; {a}</td></tr>
            ))}
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner(accentDark)}>🔥 ISSUES (Active)</div>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thPrimary}>Issue</th>
              <th style={{ ...S.thPrimary, width: "20%" }}>Owner</th>
              <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Severity</th>
            </tr></thead>
            <tbody>
              {[
                { issue: "[Test env down 2 days]", owner: "[DevOps]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg },
                { issue: "[API docs incomplete]", owner: "[Dev 3]", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg },
                { issue: "[Stakeholder vacation conflict]", owner: "[PM]", sev: "Low", sevBg: C.badgeGreenBg, sevFg: C.badgeGreenFg },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.issue}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={aiRef} label="Copy Section" />
    </div>
  );

  const renderDeps = () => (
    <div ref={depsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🔗 DEPENDENCIES</div>
      <CopyButton targetRef={depsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Dependency</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>To</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Needed By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { dep: "[API endpoint ready for integration]", from: "[Backend]", to: "[Frontend]", by: "[03/10]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { dep: "[Design mockups approved]", from: "[Design]", to: "[Dev]", by: "[03/08]", s: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { dep: "[Security review complete]", from: "[Security]", to: "[Release]", by: "[05/15]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.dep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><ShieldAlert size={11} />RAID</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><ShieldAlert size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Risk Review / RAID</h2><p className="text-xs font-medium text-orange-600">Risks &bull; Assumptions &bull; Issues &bull; Dependencies</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Full RAID log for project risk review meetings. Track risks, validate assumptions, manage issues, and monitor dependencies.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderRisks()}{renderAI()}{renderDeps()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderRisks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RiskReviewPage() { return <ThemeProvider><RiskReviewContent /></ThemeProvider>; }
