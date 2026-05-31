"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ArrowLeftRight, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Changes + impact + rules", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Changes only", icon: AlignJustify },
];

function SprintScopeChangeContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const changesRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔄 SPRINT SCOPE CHANGE LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Sprint Planning &amp; Commitments</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Original Commitment</td><td style={{ ...S.td0, width: "32%" }}>[## pts / ## stories]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint Goal</td><td colSpan={3} style={S.tdAlt}>[One-line sprint goal]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderChanges = () => (
    <div ref={changesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 SCOPE CHANGES</td></tr></tbody></table>
      <CopyButton targetRef={changesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>If something is added mid-sprint, something else should leave — or explain why capacity changed.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Story / Item</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pts</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Reason</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Approved</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[MM/DD]", type: "Added", tBg: C.badgeRedBg, tFg: C.badgeRedFg, story: "[Critical bug: checkout fails on Safari mobile]", pts: "3", reason: "[Production issue reported by 12 users; must fix this sprint]", app: "PO + SM", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg },
            { date: "[MM/DD]", type: "Removed", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, story: "[Analytics event tracking — moved to Sprint 9]", pts: "3", reason: "[Removed to make room for Safari bug fix; equal points trade]", app: "PO", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg },
            { date: "[MM/DD]", type: "Added", tBg: C.badgeRedBg, tFg: C.badgeRedFg, story: "[Stakeholder requested: add promo code field to checkout]", pts: "5", reason: "[VP Sales escalated; marketing campaign launches next week]", app: "Pending", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg },
            { date: "[MM/DD]", type: "Descoped", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, story: "[Shipping API spike — deferred]", pts: "2", reason: "[Vendor delayed sandbox access; spike impossible this sprint]", app: "SM + PO", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg },
            { date: "[Add]", type: "—", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, story: "", pts: "", reason: "", app: "—", aBg: C.badgeGrayBg, aFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.reason}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.aBg, r.aFg)}>{r.app}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderImpact = () => (
    <div ref={impactRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 SCOPE IMPACT SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={impactRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Original", value: "[23 pts]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Added", value: "[+8 pts]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Removed", value: "[-5 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Current", value: "[26 pts]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "At Risk?", value: "[Yes]", color: C.badgeRedBg, fg: C.badgeRedFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Sprint Goal at Risk?</td><td style={S.td0}>[Yes — promo code field adds 5 pts over capacity; need PO decision on what to defer]</td></tr>
        <tr><td style={S.tdLabelAlt}>SM Recommendation</td><td style={S.tdAlt}>[Reject promo code addition OR defer Google Pay to create room; discuss with PO today]</td></tr>
      </tbody></table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📏 SCOPE CHANGE RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: accent, color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ ACCEPTABLE</td></tr></thead>
            <tbody>
              {["Production bugs that affect real users", "Equal-point trade: add X, remove Y of same size", "Team discovers a blocker that makes a story impossible this sprint", "PO and SM agree the change protects the sprint goal"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🚫 NOT ACCEPTABLE</td></tr></thead>
            <tbody>
              {["Adding work without removing something of equal size", "Stakeholder pressure without PO approval", "\"Just one more small thing\" — death by a thousand cuts", "Changes that fundamentally alter the sprint goal"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><ArrowLeftRight size={11} />Scope Change</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><ArrowLeftRight size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sprint Scope Change Log</h2><p className="text-xs font-medium text-emerald-600">Track What Was Added, Removed &amp; Why</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">If something is added, what leaves (or why capacity changes). Stops scope creep and keeps the sprint goal protected.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderChanges()}{renderImpact()}{renderRules()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderChanges()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SprintScopeChangePage() { return <ThemeProvider><SprintScopeChangeContent /></ThemeProvider>; }
