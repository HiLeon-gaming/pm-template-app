"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, UserCheck, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "All panels + history + goals", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Next agenda + actions only", icon: AlignJustify },
];

function OneOnOneDashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👤 1:1 MEETING DASHBOARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Per-Person Dashboard</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Direct Report</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Role / Title</td><td style={{ ...S.td0, width: "32%" }}>[Senior Developer]</td></tr>
        <tr><td style={S.tdLabelAlt}>Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Cadence</td><td style={S.tdAlt}>[Weekly — Tuesdays 10:00 AM]</td></tr>
        <tr><td style={S.tdLabel}>Next 1:1 Date</td><td style={S.td0}>[MM/DD/YYYY]</td><td style={S.tdLabel}>Last 1:1 Date</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderTopics = () => (
    <div ref={topicsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 RUNNING TOPICS &amp; NEXT AGENDA</div>
      <CopyButton targetRef={topicsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Topics for Next 1:1</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "11px", padding: "10px 14px", lineHeight: "1.8" }}>
              &bull; [Career growth check-in — training budget update]<br />
              &bull; [Project Alpha timeline concerns]<br />
              &bull; [Feedback on cross-team collaboration]<br />
              &bull; [PTO request for Q2]<br />
              &bull; [Recognition: great work on deployment]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Last 1:1 Summary</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "11px", padding: "10px 14px", lineHeight: "1.8" }}>
              &bull; [Discussed workload — agreed to reassign 2 tasks]<br />
              &bull; [Career goal: wants to lead a feature team by Q3]<br />
              &bull; [Action: You to check on training budget]<br />
              &bull; [Action: Sarah to draft tech proposal by Friday]<br />
              &bull; [Mood: positive, engaged]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>✅ OPEN COMMITMENTS &amp; ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Commitment / Action</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Check on Q2 training budget availability]", owner: "[You]", due: "[03/07]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Draft tech proposal for new feature architecture]", owner: "[Sarah]", due: "[03/07]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Share cross-team collaboration feedback]", owner: "[You]", due: "[03/10]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Review and approve PTO request]", owner: "[You]", due: "[03/06]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 GOALS &amp; DEVELOPMENT</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Current Goals</td><td style={S.td0}>[1) Lead a feature team by Q3. 2) Complete AWS certification. 3) Improve presentation skills.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Strengths</td><td style={S.tdAlt}>[Deep technical skills, reliable delivery, good mentoring instincts]</td></tr>
        <tr><td style={S.tdLabel}>Growth Areas</td><td style={S.td0}>[Cross-team influence, executive-level communication, delegation]</td></tr>
        <tr><td style={S.tdLabelAlt}>Support Needed</td><td style={S.tdAlt}>[Training budget, opportunity to present at all-hands, stretch assignment]</td></tr>
      </tbody></table>
    </div>
  );

  const renderHistory = () => (
    <div ref={historyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📅 1:1 HISTORY (Recent)</div>
      <CopyButton targetRef={historyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Key Topics Discussed</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Mood</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/05]", topics: "[Workload reassignment, career goals, training budget, deployment recognition]", mood: "😊 Positive" },
            { date: "[02/26]", topics: "[Sprint retro feedback, cross-team friction, Q2 priorities alignment]", mood: "😐 Neutral" },
            { date: "[02/19]", topics: "[Performance review prep, PTO planning, tech debt concerns]", mood: "😊 Positive" },
            { date: "[02/12]", topics: "[Project Alpha kickoff, role expectations, workload concerns]", mood: "😟 Concerned" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topics}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.mood}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-fuchsia-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><UserCheck size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">1:1 Meeting Dashboard</h2><p className="text-xs font-medium text-fuchsia-600">⭐ All-Star &mdash; Per-Person Running Dashboard</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Running topics, goals, commitments, last discussion summary, and next agenda. Makes 1:1s feel organized and caring.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-fuchsia-500 text-white border-fuchsia-500 shadow-md shadow-fuchsia-200" : "bg-white text-slate-600 border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-fuchsia-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderTopics()}{renderActions()}{renderGoals()}{renderHistory()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderTopics()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function OneOnOneDashboardPage() { return <ThemeProvider><OneOnOneDashboardContent /></ThemeProvider>; }
