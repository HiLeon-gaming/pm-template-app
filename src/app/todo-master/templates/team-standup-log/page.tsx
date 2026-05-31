"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, UsersRound, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "weekly" | "daily";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "weekly", label: "Weekly Log", desc: "Full week tracker", icon: LayoutDashboard },
  { id: "daily", label: "Daily View", desc: "Single day focus", icon: AlignJustify },
];

const TEAM = ["[Team Member 1]", "[Team Member 2]", "[Team Member 3]", "[Team Member 4]", "[Team Member 5]", "[Team Member 6]"];
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function TeamStandupContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("weekly");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const blockersRef = useRef<HTMLDivElement>(null);
  const depsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🤝 TEAM STANDUP LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Daily Sync, Weekly Visibility</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Team / Squad</td>
            <td style={{ ...S.td0, width: "36%" }}>[Team Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Week Of</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Scrum Master / Lead</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Sprint</td>
            <td style={S.tdAlt}>[Sprint # or Name]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderWeeklyLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📅 WEEKLY STANDUP TRACKER</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      {DAYS_SHORT.map((day, di) => (
        <table key={di} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr>
              <td colSpan={4} style={{
                backgroundColor: di % 2 === 0 ? C.secondary : C.accent,
                color: C.white, padding: "8px 14px", fontFamily: S.font,
                fontSize: "13px", fontWeight: 700, border: `1.5px solid ${C.border}`,
              }}>
                {day} — Standup
              </td>
            </tr>
            <tr>
              <th style={{ ...S.thSecondary, width: "16%" }}>Team Member</th>
              <th style={S.thSecondary}>Yesterday / Done</th>
              <th style={S.thSecondary}>Today / Planned</th>
              <th style={{ ...S.thSecondary, width: "20%" }}>Blockers</th>
            </tr>
          </thead>
          <tbody>
            {TEAM.map((member, mi) => {
              const bg = mi % 2 === 1 ? C.rowAlt : C.white;
              return (
                <tr key={mi}>
                  <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px", color: C.primary }}>{member}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{di === 0 && mi === 0 ? "[e.g., Completed auth module PR]" : ""}&nbsp;</td>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{di === 0 && mi === 0 ? "[e.g., Start dashboard filter redesign]" : ""}&nbsp;</td>
                  <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{di === 0 && mi === 0 ? "[e.g., Waiting on API key]" : ""}&nbsp;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderDailyView = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 TODAY&apos;S STANDUP</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "14%" }}>Team Member</th>
            <th style={S.thSecondary}>✅ Yesterday / Completed</th>
            <th style={S.thSecondary}>📋 Today / Planned</th>
            <th style={{ ...S.thSecondary, width: "18%" }}>🚧 Blockers</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {TEAM.map((member, mi) => {
            const bg = mi % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={mi}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px", color: C.primary }}>{member}</td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "44px" }}>{mi === 0 ? "[e.g., Completed auth module PR, fixed 3 test failures]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "44px" }}>{mi === 0 ? "[e.g., Start dashboard filter redesign, pair with UX]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{mi === 0 ? "[e.g., Waiting on API key from vendor]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={{ fontSize: "10px", color: C.textMuted }}>☐🟢 ☐🟡 ☐🔴</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBlockers = () => (
    <div ref={blockersRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🚧 ACTIVE BLOCKERS &amp; ESCALATIONS</div>
      <CopyButton targetRef={blockersRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Blocker</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Reported By</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Assigned To</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Days Open</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Severity</th>
          </tr>
        </thead>
        <tbody>
          {[
            { blocker: "[e.g., Vendor API key still pending — blocking onboarding feature]", by: "[Dev]", to: "[PM]", days: "3", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg },
            { blocker: "[e.g., Design review delayed — UX team backlogged]", by: "[Frontend]", to: "[UX Lead]", days: "1", sev: "Med", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg },
            { blocker: "[Add blocker]", by: "", to: "", days: "", sev: "—", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg },
            { blocker: "[Add blocker]", by: "", to: "", days: "", sev: "—", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.blocker}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{row.days}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sevBg, row.sevFg)}>{row.sev}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDependencies = () => (
    <div ref={depsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔗 CROSS-TEAM DEPENDENCIES</td></tr></tbody></table>
      <CopyButton targetRef={depsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thSecondary}>Dependency</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>We Need From</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>They Need From Us</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>ETA</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { dep: "[e.g., Platform API v3 endpoint]", from: "[Platform Team]", give: "[Test data set]", eta: "[Date]", stat: "Waiting", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { dep: "[e.g., Legal review of ToS changes]", from: "[Legal]", give: "[Draft ToS doc]", eta: "[Date]", stat: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { dep: "[Add dependency]", from: "", give: "", eta: "", stat: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.dep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.give}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.eta}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><UsersRound size={11} /> Team Standup</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><UsersRound size={20} className="text-emerald-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Team Standup Log</h2>
              <p className="text-xs font-medium text-emerald-600">Daily Sync, Weekly Visibility &mdash; Track the Whole Team</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Daily/weekly team standup tracker with per-member updates, blockers, and cross-team dependencies. Weekly Log shows Mon–Fri tables; Daily View is a single-day focus with status indicators.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Log Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderDateHeader()}
          {layout === "weekly" ? renderWeeklyLog() : renderDailyView()}
          <table style={LT}><tbody><tr>
            <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderBlockers()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderDependencies()}</td>
          </tr></tbody></table>
          {renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TeamStandupLogPage() {
  return (<ThemeProvider><TeamStandupContent /></ThemeProvider>);
}
