"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Features + fixes + details", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Highlights only", icon: AlignJustify },
];

function ReleaseNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const deployRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📦 DEPLOYMENT / RELEASE NOTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Quality &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Release</td><td style={{ ...S.td0, width: "32%" }}>[v2.4.0 — Checkout v2]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint</td><td style={S.tdAlt}>[Sprint 8]</td><td style={S.tdLabelAlt}>Deployed By</td><td style={S.tdAlt}>[Name / CI Pipeline]</td></tr>
        <tr><td style={S.tdLabel}>Environment</td><td style={S.td0}>[Production / Staging]</td><td style={S.tdLabel}>Rollback Plan</td><td style={S.td0}>[Revert to v2.3.1 via CI rollback]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderHighlights = () => (
    <div ref={highlightsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✨ RELEASE HIGHLIGHTS</td></tr></tbody></table>
      <CopyButton targetRef={highlightsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🆕 NEW FEATURES</td></tr></thead>
            <tbody>
              {["Apple Pay checkout integration", "Payment error handling with retry", "Saved address for returning users", "Order confirmation email + in-app notification"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#0891B2", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🐛 BUG FIXES</td></tr></thead>
            <tbody>
              {["Fixed checkout total showing $0 with 10+ items", "Fixed Apple Pay button visibility on Android", "Fixed confirmation email missing order number", "Fixed payment retry duplicate flash on slow connections"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderDetails = () => (
    <div ref={detailsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 DETAILED CHANGES</td></tr></tbody></table>
      <CopyButton targetRef={detailsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>Story</th>
          <th style={S.thPrimary}>Change Description</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { id: "S-002", desc: "[Save address for returning users — auto-fills shipping on repeat purchase]", type: "Feature", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, impact: "User", iBg: C.badgeBlueBg, iFg: C.badgeBlueFg, own: "[Sarah]" },
            { id: "S-003", desc: "[Order confirmation email with order details + in-app notification]", type: "Feature", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, impact: "User", iBg: C.badgeBlueBg, iFg: C.badgeBlueFg, own: "[Mike]" },
            { id: "S-010", desc: "[Apple Pay integration — new payment method for iOS/Safari users]", type: "Feature", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, impact: "User", iBg: C.badgeBlueBg, iFg: C.badgeBlueFg, own: "[Sarah]" },
            { id: "S-012a", desc: "[Payment error messages — clear error display with retry option]", type: "Feature", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, impact: "User", iBg: C.badgeBlueBg, iFg: C.badgeBlueFg, own: "[Priya]" },
            { id: "S-012b", desc: "[Payment retry logic — auto-retry on transient payment failures]", type: "Feature", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, impact: "Internal", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, own: "[Priya]" },
            { id: "BUG-01", desc: "[Checkout total $0 fix — cart calculation edge case with 10+ items]", type: "Bug Fix", tBg: C.badgeRedBg, tFg: C.badgeRedFg, impact: "User", iBg: C.badgeBlueBg, iFg: C.badgeBlueFg, own: "[Priya]" },
            { id: "[Add]", desc: "", type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, impact: "—", iBg: C.badgeGrayBg, iFg: C.badgeGrayFg, own: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.own}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDeploy = () => (
    <div ref={deployRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🚀 DEPLOYMENT DETAILS</td></tr></tbody></table>
      <CopyButton targetRef={deployRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Deploy Time</td><td style={S.td0}>[MM/DD/YYYY HH:MM — Maintenance window]</td></tr>
        <tr><td style={S.tdLabelAlt}>Downtime Expected</td><td style={S.tdAlt}>[None — zero-downtime deployment / Rolling deploy]</td></tr>
        <tr><td style={S.tdLabel}>Feature Flags</td><td style={S.td0}>[Apple Pay: enabled for 10% of users initially; full rollout after 24h monitoring]</td></tr>
        <tr><td style={S.tdLabelAlt}>Database Changes</td><td style={S.tdAlt}>[New saved_addresses table; migration runs automatically; backward compatible]</td></tr>
        <tr><td style={S.tdLabel}>Monitoring</td><td style={S.td0}>[Watch: payment success rate, checkout conversion, error rates for 24h post-deploy]</td></tr>
        <tr><td style={S.tdLabelAlt}>Rollback Trigger</td><td style={S.tdAlt}>[If payment error rate exceeds 5% or checkout conversion drops more than 10%]</td></tr>
        <tr><td style={S.tdLabel}>Post-Deploy Verification</td><td style={S.td0}>[Smoke test: complete 1 checkout with Apple Pay + 1 with credit card in production]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><FileText size={11} />Release Notes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><FileText size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Deployment / Release Notes</h2><p className="text-xs font-medium text-violet-600">What Shipped, Deployment Details &amp; Rollback Plan</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">New features, bug fixes, deployment details, monitoring plan, and rollback triggers. The complete release record.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderHighlights()}{renderDetails()}{renderDeploy()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderHighlights()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ReleaseNotesPage() { return <ThemeProvider><ReleaseNotesContent /></ThemeProvider>; }
