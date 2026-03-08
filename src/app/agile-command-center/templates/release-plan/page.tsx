"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Package, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Releases + details", icon: LayoutDashboard },
  { id: "compact", label: "Summary", desc: "Release overview", icon: AlignJustify },
];

function ReleasePlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const releasesRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#B45309";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📦 RELEASE / INCREMENT PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Roadmap &amp; Release Planning</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Release Name</td><td style={{ ...S.td0, width: "32%" }}>[v2.0 / Q1 Release / MVP]</td></tr>
        <tr><td style={S.tdLabelAlt}>Target Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Release Owner</td><td style={S.td0}>[PO / Release Manager]</td><td style={S.tdLabel}>Sprints Included</td><td style={S.td0}>[Sprint 7–10]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderReleases = () => (
    <div ref={releasesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 RELEASE OVERVIEW</div>
      <CopyButton targetRef={releasesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Release Goal</td><td style={{ ...S.td0, height: "40px" }}>[e.g., Launch checkout v2 with 3 new payment methods and under 2s mobile load time]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Success Criteria</td><td style={{ ...S.tdAlt, height: "40px" }}>[e.g., 15% conversion lift within 30 days of launch; zero P1 defects in first week]</td></tr>
        <tr><td style={S.tdLabel}>Target Users</td><td style={S.td0}>[e.g., All mobile shoppers in US market]</td></tr>
      </tbody></table>

      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Sprint</th>
          <th style={S.thPrimary}>Theme / Focus</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Stories</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Points</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Key Deliverable</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { sp: "7", theme: "[Checkout UI + payment API scaffold]", stories: "12", pts: "34", del: "[API connected, UI skeleton]", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { sp: "8", theme: "[Payment methods + error handling]", stories: "10", pts: "30", del: "[3 payment methods working]", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { sp: "9", theme: "[Mobile optimization + analytics]", stories: "8", pts: "24", del: "[<2s load, events tracked]", s: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { sp: "10", theme: "[QA hardening + release prep]", stories: "6", pts: "18", del: "[Release candidate ready]", s: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: accent, fontSize: "14px" }}>{r.sp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.theme}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.stories}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.del}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderScope = () => (
    <div ref={scopeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📋 SCOPE SUMMARY</div>
      <CopyButton targetRef={scopeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ IN SCOPE</td></tr></thead>
            <tbody>
              {["Checkout flow v2 (2-step)", "3 new payment methods (Apple Pay, Google Pay, PayPal)", "Mobile performance optimization", "Analytics event tracking", "Error handling & retry logic"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🚫 OUT OF SCOPE (THIS RELEASE)</td></tr></thead>
            <tbody>
              {["International payment support (Phase 2)", "Native mobile app (separate project)", "Saved payment methods (Next release)", "Admin bulk import tool (backlog)", "Customer loyalty program integration"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚠️ RELEASE RISKS &amp; MITIGATIONS</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Risk</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thSecondary, width: "28%" }}>Mitigation</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { r: "Payment vendor API sandbox delays", imp: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, mit: "Escalated to vendor PM; have backup vendor identified", own: "[SM]" },
            { r: "Dev capacity reduced (1 dev on training)", imp: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, mit: "Adjusted sprint 8 commitment; pair programming coverage", own: "[Tech Lead]" },
            { r: "QA time compressed if sprint 9 slips", imp: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, mit: "Automate regression tests in sprint 8; QA starts early", own: "[QA Lead]" },
            { r: "[Add risk]", imp: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, mit: "", own: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.r}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.imp}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.own}</td>
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
    <>{renderTitleBanner()}{renderHeader()}{renderReleases()}{renderScope()}{renderRisks()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderReleases()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Package size={11} />Release Planning</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Package size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Release / Increment Plan</h2><p className="text-xs font-medium text-amber-600">Major Releases, Themes &amp; Target Outcomes</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Plan releases across sprints with scope, deliverables, risks, and milestones. Keeps delivery cohesive and stakeholders informed.</p>
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

export default function ReleasePlanPage() { return <ThemeProvider><ReleasePlanContent /></ThemeProvider>; }
