"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Setup + rhythms + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Start", desc: "Essentials only", icon: AlignJustify },
];

function QuickStartContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚀 QUICK START GUIDE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderSetup = () => (
    <div ref={setupRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚡ 4-STEP SETUP (Do This First)</div>
      <CopyButton targetRef={setupRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { num: "1", title: "Capture Everything", desc: "Don\u2019t trust memory. Every ask goes into Exec Inbox / Request Intake.", color: "#EC4899" },
          { num: "2", title: "Triage & Assign", desc: "What matters, who owns it, when it\u2019s due. Prioritize ruthlessly.", color: "#0EA5E9" },
          { num: "3", title: "Prepare the Leader", desc: "Briefs, talking points, context. Use Meeting Brief Builder.", color: "#F59E0B" },
          { num: "4", title: "Follow Through", desc: "Actions, decisions, next steps. Use Follow-Up Master Tracker.", color: "#059669" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: item.color, color: "#FFFFFF", padding: "10px", fontFamily: S.font, fontSize: "22px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{item.num}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", padding: "8px 6px", color: item.color }}>{item.title}</td></tr>
              <tr><td style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "10px", padding: "6px 8px" }}>{item.desc}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderRhythm = () => (
    <div ref={rhythmRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🔄 RECOMMENDED RHYTHMS</div>
      <CopyButton targetRef={rhythmRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "16%" }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>What to Do</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Pages to Use</th>
        </tr></thead>
        <tbody>
          {[
            { cadence: "Daily (Morning)", time: "10 min", what: "Capture new asks → triage → assign → follow up", pages: "Executive OS Dashboard, Exec Inbox, Today Plan" },
            { cadence: "Before Meetings", time: "5-15 min", what: "Prep brief, talking points, doc links, decisions needed", pages: "Meeting Brief Builder, Decision Needed Page, Pre-Reads Index" },
            { cadence: "End of Day", time: "5 min", what: "Update follow-ups, prep tomorrow\u2019s focus", pages: "Follow-Up Queue, Tomorrow Prep" },
            { cadence: "Weekly", time: "30 min", what: "Build Weekly Executive Brief, check priorities and risks", pages: "Weekly Executive Brief Builder, Risk Radar" },
            { cadence: "Monthly", time: "45 min", what: "Review stakeholder touchpoints, clean up old requests, update preferences", pages: "Touchpoint Planner, Closeout Checklist" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.cadence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.pages}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>💡 PRO TIPS FOR SUCCESS</div>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>✅ Do This</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9" }}>
              &bull; Capture <strong>every</strong> request — even hallway asks<br />
              &bull; Use the <strong>Waiting On Tracker</strong> religiously<br />
              &bull; Prep meetings <strong>24 hours</strong> in advance<br />
              &bull; Send follow-up emails <strong>within 2 hours</strong><br />
              &bull; Update the Dashboard <strong>every morning</strong><br />
              &bull; Log wins — your exec needs reminders too
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#DC2626", color: "#FFFFFF", padding: "9px 12px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.03em", textTransform: "uppercase" as const, textAlign: "center" as const, border: `1.5px solid ${C.borderDark}` }}>❌ Avoid This</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9" }}>
              &bull; Trusting memory for action items<br />
              &bull; Letting follow-ups go silent for &gt;3 days<br />
              &bull; Skipping meeting prep for &ldquo;quick&rdquo; meetings<br />
              &bull; Storing sensitive notes in shared channels<br />
              &bull; Saying yes without checking the calendar<br />
              &bull; Forgetting to close out completed requests
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><BookOpen size={11} />Guide</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><BookOpen size={20} className="text-purple-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quick Start Guide</h2><p className="text-xs font-medium text-purple-600">How to Use This Notebook &mdash; Day 1 Success</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Daily/weekly rhythm, where to capture what, and pro tips for making this system work from day one.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderSetup()}{renderRhythm()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSetup()}{renderRhythm()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function QuickStartPage() { return <ThemeProvider><QuickStartContent /></ThemeProvider>; }
