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
  { id: "full", label: "Full Tracker", desc: "Dependencies + risk + timeline + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Dependency table only", icon: AlignJustify },
];

function DependencyTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const depRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DEPENDENCY TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Cross-Team &amp; Vendor Dependencies</td></tr>
    </tbody></table>
  );

  const renderDep = () => (
    <div ref={depRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>ACTIVE DEPENDENCIES</div>
      <CopyButton targetRef={depRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Dependencies are things you need from OTHER teams, vendors, or systems to complete your work. If they slip, you slip. Track them proactively.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>What We Need</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>For (Our Initiative)</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Need By</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Risk</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Backup Plan</th>
        </tr></thead>
        <tbody>
          {[
            { what: "NPS data access (Delighted API credentials)", from: "[IT Team]", forInit: "NPS Recovery (KR 1.3)", by: "Week 3", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg, s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg, backup: "Use support ticket sentiment as proxy." },
            { what: "Legal-approved enterprise contract template", from: "[Legal]", forInit: "Enterprise Deals (KR 2.2)", by: "Week 4", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, s: "In Review", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, backup: "Use old template with amendment. Get retroactive approval." },
            { what: "Design specs for onboarding flow v2", from: "[Design Team]", forInit: "Onboarding (KR 1.2)", by: "Week 5", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, s: "Delayed", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, backup: "Assign backup designer or do quick iteration on existing flow." },
            { what: "Comp bands approved for 2 IC roles", from: "[Finance / HR]", forInit: "Hiring (KR 3.1)", by: "Week 3", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, backup: "N/A — completed." },
            { what: "Customer references for enterprise case studies", from: "[CS Team]", forInit: "Sales Playbook (KR 2.2)", by: "Week 5", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg, s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, backup: "Use anonymized case studies if customers decline." },
            { what: "[Your dependency]", from: "", forInit: "", by: "", risk: "", rBg: "transparent", rFg: C.textMuted, s: "", sBg: "transparent", sFg: C.textMuted, backup: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#7C3AED", fontWeight: 600 }}>{r.forInit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.risk && <span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.s && <span style={S.badge(r.sBg, r.sFg)}>{r.s}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "8px" }}>{r.backup}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTimeAndTips = () => (
    <div ref={timeRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={timeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>📅 DEPENDENCY TIMELINE</td></tr></thead>
            <tbody>
              {[
                { week: "Week 4", deps: "Legal contract template, NPS data access (overdue)", count: "2", risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
                { week: "Week 5", deps: "Design specs, customer references", count: "2", risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
                { week: "Week 6", deps: "SDR agency deliverables, pulse survey vendor", count: "2", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
                { week: "Week 7", deps: "Manager training vendor confirmed", count: "1", risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 700, color: "#D97706" }}>{r.week}</span> &mdash; <span style={{ fontWeight: 800 }}>{r.count}</span> deps <span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.deps}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💡 DEPENDENCY TIPS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Always have a backup plan.", detail: "If a dep slips, what's Plan B? Never let a dep stall you completely." },
                { color: accent, tip: "Identify deps at planning time.", detail: "Ask: 'What do we need from others to hit this KR?'" },
                { color: "#D97706", tip: "Follow up proactively.", detail: "Check in 1 week before due date. Don't wait." },
                { color: "#059669", tip: "Escalate early.", detail: "At risk? Escalate before it becomes a blocker. Prevention > reaction." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><GitBranch size={11} />Dependencies</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><GitBranch size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Dependency Tracker</h2><p className="text-xs font-medium text-indigo-600">Cross-Team &amp; Vendor Dependencies + Dates + Risks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track what you need from other teams and vendors. If they slip, you slip. Proactive tracking prevents surprises.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDep()}{renderTimeAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDep()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function DependencyTrackerPage() { return <ThemeProvider><DependencyTrackerContent /></ThemeProvider>; }
