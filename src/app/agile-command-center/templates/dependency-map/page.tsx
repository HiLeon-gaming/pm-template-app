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
  { id: "full", label: "Full Map", desc: "Dependencies + risks", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Dependencies only", icon: AlignJustify },
];

function DependencyMapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const depsRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#B45309";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔗 DEPENDENCY MAP (TEAMS / SYSTEMS / VENDORS)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Roadmap &amp; Release Planning</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Maintained By</td><td style={S.tdAlt}>[SM / Tech Lead]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={S.tdAlt}>[Every sprint planning]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderDeps = () => (
    <div ref={depsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 ACTIVE DEPENDENCIES</div>
      <CopyButton targetRef={depsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track every external dependency that could delay your team. Most project delays come from unmanaged dependencies.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Dependency</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Depends On</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Our Story / Epic</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Need By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Risk</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { dep: "Payment gateway sandbox credentials", type: "Vendor", tBg: C.badgeRedBg, tFg: C.badgeRedFg, on: "[PayCorp vendor]", story: "[Checkout Epic]", by: "[Sprint 7]", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, s: "Waiting", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { dep: "Auth service API v3 upgrade", type: "Team", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, on: "[Platform team]", story: "[Login flow]", by: "[Sprint 8]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { dep: "Staging environment expansion", type: "Infra", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, on: "[DevOps team]", story: "[QA testing]", by: "[Sprint 9]", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { dep: "UX design review for checkout confirmation", type: "Team", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, on: "[Design team]", story: "[Checkout UX]", by: "[Sprint 7]", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { dep: "Legal review of payment T&Cs", type: "Vendor", tBg: C.badgeRedBg, tFg: C.badgeRedFg, on: "[Legal dept]", story: "[Compliance]", by: "[Sprint 9]", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, s: "In Review", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { dep: "[Add dependency]", type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, on: "", story: "", by: "", risk: "—", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg, s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.dep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.on}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisk = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🚨 DEPENDENCY RISK ASSESSMENT</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Total Dependencies", value: "[5]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "High Risk", value: "[1]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Medium Risk", value: "[2]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Resolved / Done", value: "[1]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "20px", padding: "10px 8px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ DEPENDENCY ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { a: "Follow up with PayCorp vendor PM on sandbox credentials", own: "[SM]", due: "[Tomorrow]", s: "Urgent", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { a: "Confirm Auth service v3 timeline with Platform team lead", own: "[Tech Lead]", due: "[This week]", s: "Open", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { a: "Schedule legal review kick-off for payment T&Cs", own: "[PO]", due: "[Sprint 8]", s: "Open", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { a: "[Add action]", own: "", due: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.a}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.own}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.due}</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderDeps()}{renderRisk()}{renderActions()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderDeps()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><GitBranch size={11} />Dependencies</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><GitBranch size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Dependency Map</h2><p className="text-xs font-medium text-amber-600">Teams, Systems &amp; Vendors &mdash; Track What Could Block You</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track external dependencies, assess risk, and manage actions. Most delays come from unmanaged dependencies.</p>
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

export default function DependencyMapPage() { return <ThemeProvider><DependencyMapContent /></ThemeProvider>; }
