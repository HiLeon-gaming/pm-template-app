"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Rocket, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "checklist";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Step-by-step", icon: LayoutDashboard },
  { id: "checklist", label: "Checklist Only", desc: "Quick setup", icon: AlignJustify },
];

function QuickStartContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const sprintRef = useRef<HTMLDivElement>(null);
  const dailyRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9"; const accentDark = "#0369A1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚀 QUICK START + SETUP CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Get Started in 45 Minutes</td></tr>
    </tbody></table>
  );

  const checklistSection = (title: string, emoji: string, color: string, items: { task: string; time: string; template: string }[]) => (
    <table style={S.tbl}>
      <thead>
        <tr><td colSpan={4} style={{ backgroundColor: color, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, letterSpacing: "0.02em" }}>{emoji} {title}</td></tr>
        <tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={S.thSecondary}>Task</th>
          <th style={{ ...S.thSecondary, width: "24%" }}>Template to Use</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Time</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.task}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600, color: accent }}>{r.template}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.time}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderSetup = () => (
    <div ref={setupRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🛠️ PHASE 1 — INITIAL SETUP (45 min)</td></tr></tbody></table>
      <CopyButton targetRef={setupRef} label="Copy Section" />
      {checklistSection("One-Time Setup", "📋", accentDark, [
        { task: "Define your product vision and success outcomes", time: "10 min", template: "Product Vision + Outcome Statement" },
        { task: "Map your high-level roadmap (Now / Next / Later)", time: "10 min", template: "Product Roadmap" },
        { task: "Load your backlog with epics, features, and top stories", time: "10 min", template: "Backlog Master" },
        { task: "Score your top backlog items by value/effort/urgency", time: "5 min", template: "Backlog Prioritization" },
        { task: "Agree on Definition of Ready + Definition of Done with team", time: "5 min", template: "DoR + DoD" },
        { task: "Set up your Command Dashboard home page", time: "5 min", template: "Command Dashboard" },
      ])}
    </div>
  );

  const renderSprint = () => (
    <div ref={sprintRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🏃 PHASE 2 — EVERY SPRINT START (60–90 min)</td></tr></tbody></table>
      <CopyButton targetRef={sprintRef} label="Copy Section" />
      {checklistSection("Sprint Start Rhythm", "⚡", "#059669", [
        { task: "Check team capacity and availability", time: "10 min", template: "Capacity Planner" },
        { task: "Run sprint planning — select stories, set sprint goal", time: "45 min", template: "Sprint Planning Worksheet" },
        { task: "Document sprint goal and committed backlog", time: "10 min", template: "Sprint Goal + Sprint Backlog" },
        { task: "Update Command Dashboard with new sprint info", time: "5 min", template: "Command Dashboard" },
      ])}
    </div>
  );

  const renderDaily = () => (
    <div ref={dailyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>☀️ PHASE 3 — DAILY RHYTHM (5–10 min)</td></tr></tbody></table>
      <CopyButton targetRef={dailyRef} label="Copy Section" />
      {checklistSection("Daily Flow", "🔄", "#F59E0B", [
        { task: "Run daily scrum — capture yesterday/today/blockers", time: "5 min", template: "Daily Scrum Notes" },
        { task: "Update impediment log if any blocker is active", time: "2 min", template: "Impediment Log" },
        { task: "Escalate if blocker needs leadership/vendor help", time: "3 min", template: "Blocker Escalation" },
      ])}
    </div>
  );

  const renderEnd = () => (
    <div ref={endRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🏁 PHASE 4 — END OF SPRINT (60 min)</td></tr></tbody></table>
      <CopyButton targetRef={endRef} label="Copy Section" />
      {checklistSection("Sprint Close Rhythm", "🎯", "#DC2626", [
        { task: "Run sprint review / demo — capture what was shown & feedback", time: "30 min", template: "Sprint Review / Demo Notes" },
        { task: "Log stakeholder feedback themes and decisions", time: "10 min", template: "Stakeholder Feedback Log" },
        { task: "Run retro — Start/Stop/Continue or 4Ls format", time: "15 min", template: "Retro Template" },
        { task: "Create retro action items with owners and due dates", time: "5 min", template: "Retro Action Plan Tracker" },
      ])}
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💡 PRO TIPS FOR SUCCESS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}><thead><tr><td style={{ backgroundColor: C.badgeGreenBg, color: C.badgeGreenFg, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ DO THIS</td></tr></thead><tbody>
            {["Start with just the All-Star pages", "Review the Command Dashboard every morning", "Keep retro action items visible all sprint", "Update the backlog before every refinement", "Use Burndown Tracker for stakeholder updates"].map((t, i) => (
              <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
            ))}
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}><thead><tr><td style={{ backgroundColor: C.badgeRedBg, color: C.badgeRedFg, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>❌ AVOID THIS</td></tr></thead><tbody>
            {["Don't try to fill every template on day 1", "Don't skip the retro — it's where teams level up", "Don't let blockers age more than 24 hours", "Don't change sprint scope without logging it", "Don't skip the Definition of Ready check"].map((t, i) => (
              <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
            ))}
          </tbody></table>
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

  const renderFullLayout = () => (
    <>{renderTitleBanner()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderSetup()}{renderDaily()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderSprint()}{renderEnd()}</td>
      </tr></tbody></table>
      {renderTips()}{renderFooter()}
    </>
  );

  const renderChecklistLayout = () => (
    <>{renderTitleBanner()}{renderSetup()}{renderSprint()}{renderDaily()}{renderEnd()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Rocket size={11} />Quick Start</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Rocket size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quick Start + Setup Checklist</h2><p className="text-xs font-medium text-sky-600">Get Started in 45 Minutes &mdash; Then Follow the Sprint Rhythm</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Step-by-step setup guide with phase-by-phase checklists. Covers initial setup, sprint start, daily rhythm, and sprint close — with template references for every step.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Guide View</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "checklist" && renderChecklistLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function QuickStartPage() { return <ThemeProvider><QuickStartContent /></ThemeProvider>; }
