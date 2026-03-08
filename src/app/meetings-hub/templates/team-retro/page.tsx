"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, RefreshCw, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Retro", desc: "Start/Stop/Continue + actions + health", icon: LayoutDashboard },
  { id: "compact", label: "Quick Retro", desc: "Start/Stop/Continue + actions only", icon: AlignJustify },
];

function TeamRetroContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sscRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔄 RETROSPECTIVE / TEAM RETRO</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Team Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Period</td><td style={S.tdAlt}>[Sprint 12 / Feb 2026 / Q1]</td><td style={S.tdLabelAlt}>Facilitator</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Name]</td></tr>
        <tr><td style={S.tdLabel}>Participants</td><td colSpan={3} style={S.td0}>[Name 1, Name 2, Name 3, Name 4, Name 5]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderSSC = () => (
    <div ref={sscRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={sscRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { title: "🟢 START", subtitle: "What should we begin doing?", color: "#059669", items: ["[More pair programming on complex tasks]", "[Sharing weekly wins in Slack channel]", "[Timebox agenda items with hard stops]", "[Pre-read materials sent 24h before meetings]", "[ ]"] },
          { title: "🔴 STOP", subtitle: "What should we stop doing?", color: "#DC2626", items: ["[Long status meetings — use async updates]", "[Multitasking during standups]", "[Scope creep without change requests]", "[Skipping code reviews under time pressure]", "[ ]"] },
          { title: "🔵 CONTINUE", subtitle: "What\u2019s working well?", color: "#3B82F6", items: ["[Daily standups — keep them at 15 min]", "[Knowledge sharing sessions on Fridays]", "[Collaborative sprint planning]", "[Using decision log for all key decisions]", "[ ]"] },
        ].map((s, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: s.color, color: "#FFFFFF", padding: "10px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{s.title}</td></tr>
              <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{s.subtitle}</td></tr>
              {s.items.map((item, j) => (
                <tr key={j}><td style={{ ...(j % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "5px 10px" }}>&bull; {item}</td></tr>
              ))}
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>✅ IMPROVEMENT ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Pick 2-3 actions max. Assign owners and due dates. Review progress next retro.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Improvement Action</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Implement timebox for all agenda items]", owner: "[Facilitator]", due: "[Next sprint]", s: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Create async status update template in Teams]", owner: "[PM]", due: "[03/12]", s: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Schedule knowledge share for API patterns]", owner: "[Tech Lead]", due: "[03/14]", s: "New", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Previous Actions</td><td style={S.td0}>[Review: Did we complete last retro\u2019s actions? What happened?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>💚 TEAM HEALTH PULSE</div>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Dimension</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Rating</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Team morale / energy", rating: "[1-5]", notes: "[How is the team feeling?]" },
            { dim: "Communication quality", rating: "[1-5]", notes: "[Are we communicating effectively?]" },
            { dim: "Workload balance", rating: "[1-5]", notes: "[Is the workload manageable and fair?]" },
            { dim: "Collaboration", rating: "[1-5]", notes: "[Are we working well together?]" },
            { dim: "Psychological safety", rating: "[1-5]", notes: "[Can people speak up without fear?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "10px" }}>{r.dim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px", color: accent }}>{r.rating}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><RefreshCw size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Retrospective / Team Retro</h2><p className="text-xs font-medium text-emerald-600">⭐ All-Star &mdash; Start / Stop / Continue + Health Check</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured team retro with Start/Stop/Continue, improvement actions, and a team health pulse check.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderSSC()}{renderActions()}{renderHealth()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderSSC()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TeamRetroPage() { return <ThemeProvider><TeamRetroContent /></ThemeProvider>; }
