"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckCircle2, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Readiness", desc: "Checklist + risks + comms + rollback", icon: LayoutDashboard },
  { id: "compact", label: "Quick Checklist", desc: "Go/No-Go checklist only", icon: AlignJustify },
];

function GoLiveReadinessContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const commsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C"; const accentDark = "#C2410C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>✅ GO-LIVE / LAUNCH READINESS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Project &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Go-Live Date</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Release Version</td><td style={S.tdAlt}>[v2.1.0]</td><td style={S.tdLabelAlt}>Decision Meeting</td><td style={S.tdAlt}>[MM/DD/YYYY — Go/No-Go call]</td></tr>
        <tr><td style={S.tdLabel}>Release Manager</td><td style={S.td0}>[Name]</td><td style={S.tdLabel}>Decision</td><td style={{ ...S.td0, fontWeight: 800, fontSize: "14px", color: "#059669" }}>[🟢 GO / 🔴 NO-GO]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderChecklist = () => (
    <div ref={checklistRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 GO/NO-GO CHECKLIST</div>
      <CopyButton targetRef={checklistRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Readiness Area</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Ready?</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Notes / Evidence</th>
        </tr></thead>
        <tbody>
          {[
            { area: "All features complete & tested", owner: "[Dev Lead]", notes: "[100% stories done, all tests passing]" },
            { area: "UAT complete & signed off", owner: "[BA / Stakeholder]", notes: "[Sign-off received MM/DD]" },
            { area: "Performance testing passed", owner: "[QA Lead]", notes: "[Load test: 1000 concurrent users OK]" },
            { area: "Security review complete", owner: "[Security]", notes: "[Pen test passed, no critical findings]" },
            { area: "Data migration validated", owner: "[DBA]", notes: "[Test migration successful, rollback tested]" },
            { area: "Monitoring & alerts configured", owner: "[DevOps]", notes: "[Datadog dashboards + PagerDuty alerts]" },
            { area: "Rollback plan tested", owner: "[Release Mgr]", notes: "[Rollback tested in staging — 15 min RTO]" },
            { area: "Support team trained", owner: "[Support Lead]", notes: "[Training complete, runbook shared]" },
            { area: "Communication plan ready", owner: "[PM / Comms]", notes: "[Emails drafted, stakeholders notified]" },
            { area: "Documentation updated", owner: "[Tech Writer]", notes: "[User guide, API docs, release notes]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.area}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>⚠️ OPEN RISKS &amp; ROLLBACK PLAN</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Open Risks</td><td style={S.td0}>[Any remaining risks going into go-live? List them.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Accepted Risks</td><td style={S.tdAlt}>[Risks stakeholders have accepted — documented approval]</td></tr>
        <tr><td style={S.tdLabel}>Rollback Trigger</td><td style={{ ...S.td0, color: "#DC2626", fontWeight: 700 }}>[What conditions trigger a rollback? Be specific.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Rollback Steps</td><td style={S.tdAlt}>[1) Disable feature flag. 2) Restore database backup. 3) Notify users. 4) Post-mortem.]</td></tr>
        <tr><td style={S.tdLabel}>Rollback Time</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Estimated: 15 minutes]</td></tr>
        <tr><td style={S.tdLabelAlt}>On-Call Team</td><td style={S.tdAlt}>[Name 1 (primary), Name 2 (secondary) — phone numbers]</td></tr>
      </tbody></table>
    </div>
  );

  const renderComms = () => (
    <div ref={commsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📢 LAUNCH COMMUNICATION</div>
      <CopyButton targetRef={commsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Audience</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Channel</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>When</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Sent?</th>
        </tr></thead>
        <tbody>
          {[
            { audience: "[Internal team — launch day briefing]", channel: "[Slack]", when: "[Launch day]", owner: "[PM]" },
            { audience: "[Leadership — go-live confirmation]", channel: "[Email]", when: "[Launch +1hr]", owner: "[PM]" },
            { audience: "[End users — feature announcement]", channel: "[In-app + email]", when: "[Launch +2hr]", owner: "[Comms]" },
            { audience: "[Support team — go-live runbook]", channel: "[Teams]", when: "[Launch -24hr]", owner: "[Support Lead]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.audience}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.channel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><CheckCircle2 size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Go-Live / Launch Readiness</h2><p className="text-xs font-medium text-orange-600">⭐ All-Star &mdash; Checklist &bull; Risks &bull; Rollback &bull; Comms</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Complete go/no-go checklist, rollback plan, open risks, and launch communication plan. The final gate before go-live.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderRisks()}{renderComms()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function GoLiveReadinessPage() { return <ThemeProvider><GoLiveReadinessContent /></ThemeProvider>; }
