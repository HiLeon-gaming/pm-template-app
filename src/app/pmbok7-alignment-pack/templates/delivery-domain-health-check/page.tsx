"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Health Check", desc: "All assessments + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Health indicators only", icon: AlignJustify },
];

function DeliveryDomainHealthCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#DC2626"; const accentDark = "#991B1B";
  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: accent, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📦 DELIVERY DOMAIN HEALTH CHECK</td></tr>
      <tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Performance Domain 6 of 8</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>Deliverable acceptance, value realized, scope delivered vs planned, quality gates, and stakeholder feedback.</strong> Are we delivering what was promised, and is the customer happy with it?</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Check Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Week #</td><td style={S.tdAlt}>[Week X of Y]</td><td style={S.tdLabelAlt}>Overall Domain Health</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>🟢 Healthy</span></td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 HEALTH INDICATORS</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Indicator</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent }}>Evidence / Signal</th>
          <th style={{ ...S.thPrimary, backgroundColor: accent, width: "8%", textAlign: "center" as const }}>Trend</th>
        </tr></thead>
        <tbody>
          {[
            { ind: "Deliverables on track", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Sprint 4 deliverables 100% accepted; Phase 1 milestones complete]", trend: "→" },
            { ind: "Acceptance rate", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[100% UAT acceptance in Sprint 4; 0 rejected stories]", trend: "↗" },
            { ind: "Value delivery pace", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Pipeline visibility feature live; sales team actively using it]", trend: "↗" },
            { ind: "Scope delivered vs planned", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[92% of Sprint 4 scope delivered; 1 story deferred (non-critical)]", trend: "→" },
            { ind: "Quality gate compliance", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[All DoD criteria met; code review, unit tests, UAT all passed]", trend: "→" },
            { ind: "Stakeholder feedback", s: "🟢", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ev: "[Sprint demo feedback: 4.5/5 avg; sponsor praised pipeline dashboard]", trend: "↗" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.ind}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ev}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.trend}</td></tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>🟢 = Healthy &nbsp;|&nbsp; 🟡 = Watch &nbsp;|&nbsp; 🔴 = Needs Intervention &nbsp;|&nbsp; Trend: ↗ Improving → Stable ↘ Declining</p>
    </div>
  );

  const renderDeliverables = () => (
    <div ref={deliverablesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 DELIVERABLE STATUS TRACKER</td></tr></tbody></table>
      <CopyButton targetRef={deliverablesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Deliverable</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Planned</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { del: "[Pipeline Dashboard]", planned: "Sprint 3", actual: "Sprint 3", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Delivered on time; 85% daily active usage]" },
            { del: "[Lead Scoring Module]", planned: "Sprint 4", actual: "Sprint 4", s: "✅", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[UAT accepted; sales team trained]" },
            { del: "[Automated Reports]", planned: "Sprint 5", actual: "—", s: "🟡", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[In progress; on track for Sprint 5 delivery]" },
            { del: "[CRM Integration]", planned: "Sprint 6", actual: "—", s: "⬜", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "[Not started; dependent on vendor API]" },
            { del: "[Data Migration]", planned: "Sprint 7", actual: "—", s: "⬜", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, notes: "[Scripts 80% tested in staging]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.del}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.planned}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.actual}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ DELIVERY ACTIONS THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th><th style={S.thSecondary}>Action</th><th style={{ ...S.thSecondary, width: "12%" }}>Owner</th><th style={{ ...S.thSecondary, width: "8%" }}>Due</th><th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Done?</th></tr></thead>
        <tbody>
          {[
            { act: "[Prepare Sprint 5 release notes and demo agenda for automated reports]", owner: "[Tech Lead]", due: "[Fri]", done: "⬜" },
            { act: "[Collect Sprint 4 user feedback from sales champions]", owner: "[BA]", due: "[Wed]", done: "⬜" },
            { act: "[Confirm vendor API timeline for CRM integration in Sprint 6]", owner: "[PM]", due: "[Thu]", done: "⬜" },
            { act: "[Update deliverable roadmap with latest sprint velocity data]", owner: "[PM]", due: "[Fri]", done: "⬜" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: accent }}>{i + 1}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.act}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.due}</td><td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td></tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: accent, color: "#FEF2F2", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • Domain Health Check 6/8 • © 2026</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderDeliverables()}{renderActions()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderHealth()}{renderActions()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Compass size={11} /> Domain 6/8</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Compass size={20} className="text-red-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Delivery Domain Health Check</h2><p className="text-xs font-medium text-red-600">Performance Domain 6/8</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">Deliverable acceptance, value realized, scope delivered vs planned, and stakeholder feedback.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DeliveryDomainHealthCheckPage() {
  return (<ThemeProvider><DeliveryDomainHealthCheckContent /></ThemeProvider>);
}
