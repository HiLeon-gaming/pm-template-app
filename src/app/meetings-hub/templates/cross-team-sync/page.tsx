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
  { id: "full", label: "Full Sync", desc: "Updates + dependencies + escalations", icon: LayoutDashboard },
  { id: "compact", label: "Quick Sync", desc: "Updates + actions only", icon: AlignJustify },
];

function CrossTeamSyncContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);
  const depsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔗 CROSS-TEAM SYNC</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Team Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Teams</td><td style={{ ...S.td0, width: "32%" }}>[Team A + Team B (+ Team C)]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name — rotates between teams]</td><td style={S.tdLabelAlt}>Cadence</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Weekly / Bi-weekly]</td></tr>
        <tr><td style={S.tdLabel}>Duration</td><td style={S.td0}>[30 minutes]</td><td style={S.tdLabel}>Shared Goal</td><td style={S.td0}>[What project/initiative connects these teams?]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderUpdates = () => (
    <div ref={updatesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 TEAM UPDATES (3 min each)</div>
      <CopyButton targetRef={updatesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Team</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Status</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Key Update</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Need from Other Teams</th>
        </tr></thead>
        <tbody>
          {[
            { team: "[Team A — Engineering]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, update: "[API v2 on schedule for 03/15 release]", need: "[Need QA test plan from Team B by 03/10]" },
            { team: "[Team B — QA]", status: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, update: "[Test environment down — blocked 2 days]", need: "[Need DevOps to restore staging by 03/07]" },
            { team: "[Team C — Design]", status: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, update: "[UX review complete — handoff ready]", need: "[Need engineering to review mockups by 03/08]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.status}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.update}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.need}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDeps = () => (
    <div ref={depsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🔗 DEPENDENCIES &amp; RISKS</div>
      <CopyButton targetRef={depsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Dependency / Risk</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>To</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Risk</th>
        </tr></thead>
        <tbody>
          {[
            { dep: "[API endpoint documentation]", from: "[Eng]", to: "[QA]", due: "[03/08]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { dep: "[Staging environment restore]", from: "[DevOps]", to: "[QA]", due: "[03/07]", s: "Blocked", sBg: C.badgeRedBg, sFg: C.badgeRedFg, risk: "High", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { dep: "[UX mockup review & approval]", from: "[Design]", to: "[Eng]", due: "[03/08]", s: "Ready", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, risk: "Low", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg },
            { dep: "[Data migration script testing]", from: "[Eng]", to: "[QA]", due: "[03/12]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, risk: "Med", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.dep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.risk}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ ACTIONS &amp; ESCALATIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Actions</td><td style={S.td0}>[1) DevOps to restore staging by 03/07. 2) Eng to review mockups by 03/08. 3) QA to share test plan by 03/10.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Escalations</td><td style={{ ...S.tdAlt, color: "#DC2626", fontWeight: 600 }}>[Staging environment outage — escalate to VP Engineering if not resolved by EOD Friday]</td></tr>
        <tr><td style={S.tdLabel}>Parking Lot</td><td style={S.td0}>[Topics deferred for separate discussion]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Sync</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Date / Time]</td></tr>
      </tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><GitBranch size={11} />Cross-Team</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><GitBranch size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Cross-Team Sync</h2><p className="text-xs font-medium text-emerald-600">Dependencies &bull; Handoffs &bull; Escalations</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Coordinate across teams with status updates, dependency tracking, risk flags, and clear action items.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderUpdates()}{renderDeps()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderUpdates()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CrossTeamSyncPage() { return <ThemeProvider><CrossTeamSyncContent /></ThemeProvider>; }
