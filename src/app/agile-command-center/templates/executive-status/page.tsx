"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileBarChart, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Report", desc: "Status + metrics + risks + next", icon: LayoutDashboard },
  { id: "compact", label: "Executive Summary", desc: "Key highlights only", icon: AlignJustify },
];

function ExecutiveStatusContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📋 STAKEHOLDER / EXECUTIVE STATUS REPORT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Metrics &amp; Reporting</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Report Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint</td><td style={S.tdAlt}>[Sprint # — End Date]</td><td style={S.tdLabelAlt}>Prepared By</td><td style={S.tdAlt}>[SM / PM Name]</td></tr>
        <tr><td style={S.tdLabel}>Audience</td><td colSpan={3} style={S.td0}>[VP Engineering, Product Director, Stakeholders]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 EXECUTIVE SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Overall Status", value: "[On Track]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Sprint Goal", value: "[Met]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Velocity", value: "[20/23 pts]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Release On Track", value: "[Yes]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Blockers", value: "[0 active]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "15px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>Key Accomplishments</td><td style={S.td0}>[Apple Pay integration shipped; Payment error handling complete; Checkout v2 is 80% done]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Key Concerns</td><td style={S.tdAlt}>[Analytics tracking delayed 1 sprint due to vendor API key issue; QA bottleneck at sprint end]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Stakeholder Ask</td><td style={S.td0}>[None this sprint. Google Pay request noted for backlog prioritization.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderProgress = () => (
    <div ref={progressRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 RELEASE PROGRESS</div>
      <CopyButton targetRef={progressRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Epic / Feature</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Total</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Remain</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>% Done</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Target</th>
        </tr></thead>
        <tbody>
          {[
            { epic: "[Checkout v2 — Payment Methods]", total: "15 pts", done: "13 pts", remain: "2 pts", pct: "87%", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, target: "[Sprint 9]" },
            { epic: "[Checkout v2 — Order Management]", total: "10 pts", done: "5 pts", remain: "5 pts", pct: "50%", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, target: "[Sprint 10]" },
            { epic: "[Analytics & Tracking]", total: "8 pts", done: "0 pts", remain: "8 pts", pct: "0%", s: "Delayed", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, target: "[Sprint 10]" },
            { epic: "[Performance Optimization]", total: "5 pts", done: "5 pts", remain: "0 pts", pct: "100%", s: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, target: "[Done]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const pctNum = parseInt(r.pct);
            const pctColor = pctNum >= 75 ? "#059669" : pctNum >= 40 ? "#F59E0B" : "#DC2626";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.epic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.total}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 700, color: "#059669" }}>{r.done}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.remain}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "13px", color: pctColor }}>{r.pct}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: accent }}>{r.target}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚠️ RISKS &amp; ISSUES FOR LEADERSHIP</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Risk / Issue</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Mitigation / Ask</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[Analytics vendor (DataCo) slow to provide API keys — delays analytics epic by 1 sprint]", sev: "Medium", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, mit: "[Escalated; eng director contacting DataCo. Fallback: use alternative analytics SDK]", s: "Mitigating", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { risk: "[QA bottleneck at end of sprint — stories finishing faster than QA can test]", sev: "Low", sevBg: C.badgeBlueBg, sevFg: C.badgeBlueFg, mit: "[Starting QA earlier; devs helping with testing in final 2 days]", s: "Mitigating", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { risk: "[Google Pay request from VP Sales — not in current release scope]", sev: "Info", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg, mit: "[Added to backlog; PO will prioritize for Release 3]", s: "Noted", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNext = () => (
    <div ref={nextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🔮 NEXT SPRINT PREVIEW</div>
      <CopyButton targetRef={nextRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Sprint 9 Goal</td><td style={{ ...S.td0, fontWeight: 700 }}>[Complete Checkout v2 payment methods; start analytics integration]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Deliverables</td><td style={S.tdAlt}>[Google Pay investigation spike, Analytics event tracking, Remaining payment bug fixes]</td></tr>
        <tr><td style={S.tdLabel}>Capacity</td><td style={S.td0}>[Full team — 5 devs, 1 QA; estimated 25-28 pts]</td></tr>
        <tr><td style={S.tdLabelAlt}>Decisions Needed</td><td style={S.tdAlt}>[Should we prioritize Google Pay over remaining order management features?]</td></tr>
        <tr><td style={S.tdLabel}>Release Timeline</td><td style={S.td0}>[On track for Release 2.5 at end of Sprint 10 (4 weeks)]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><FileBarChart size={11} />Status</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><FileBarChart size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder / Executive Status Report</h2><p className="text-xs font-medium text-teal-600">Leadership-Ready Sprint &amp; Release Update</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Executive summary, release progress by epic, risks for leadership attention, and next sprint preview. The report stakeholders actually want.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderProgress()}{renderRisks()}{renderNext()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderSummary()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ExecutiveStatusPage() { return <ThemeProvider><ExecutiveStatusContent /></ThemeProvider>; }
