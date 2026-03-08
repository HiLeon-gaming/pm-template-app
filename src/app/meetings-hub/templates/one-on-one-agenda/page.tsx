"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListChecks, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "All sections + growth + support", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Wins + challenges + priorities", icon: AlignJustify },
];

function OneOnOneAgendaContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📋 1:1 AGENDA TEMPLATE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Direct Report</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[30 minutes]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { title: "🏆 Wins & Highlights", items: ["What went well this week?", "Any accomplishments to celebrate?", "What are you most proud of?"], color: "#059669", time: "5 min" },
          { title: "🚧 Challenges & Blockers", items: ["What\u2019s been difficult?", "Any blockers I can help remove?", "Where do you feel stuck?"], color: "#DC2626", time: "5 min" },
          { title: "🎯 Priorities & Focus", items: ["What are your top priorities this week?", "Any changes from last week?", "Is your workload manageable?"], color: "#3B82F6", time: "5 min" },
        ].map((s, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: s.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{s.title} <span style={{ fontSize: "9px", opacity: 0.8 }}>({s.time})</span></td></tr>
              {s.items.map((item, j) => (
                <tr key={j}><td style={{ ...(j % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "6px 10px" }}>&bull; {item}</td></tr>
              ))}
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "6px 10px", fontStyle: "italic", color: C.textMuted }}>[Notes:]</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>

      <table style={{ ...LT, marginTop: "6px" }}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner(accent)}>💬 FEEDBACK</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "35%" }}>From you to them</td><td style={S.td0}>[Positive or constructive feedback]</td></tr>
            <tr><td style={S.tdLabelAlt}>From them to you</td><td style={S.tdAlt}>[Ask: &ldquo;What can I do better as your manager?&rdquo;]</td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner(accentDark)}>🤝 SUPPORT NEEDED</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "35%" }}>What do they need?</td><td style={S.td0}>[Resources, decisions, air cover, connections]</td></tr>
            <tr><td style={S.tdLabelAlt}>Your commitment</td><td style={S.tdAlt}>[What you will do by when]</td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderGrowth = () => (
    <div ref={growthRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🌱 GROWTH &amp; DEVELOPMENT (Monthly)</div>
      <CopyButton targetRef={growthRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Career Goal Progress</td><td style={S.td0}>[Check in on their stated career goals — any progress?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Learning / Training</td><td style={S.tdAlt}>[Any courses, certifications, or stretch assignments to discuss?]</td></tr>
        <tr><td style={S.tdLabel}>Energy / Engagement</td><td style={S.td0}>[How are they feeling overall? Energized, neutral, or burning out?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Step</td><td style={S.tdAlt}>[One specific action to support their growth this month]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-fuchsia-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><ListChecks size={11} />1:1 Meetings</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><ListChecks size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">1:1 Agenda Template</h2><p className="text-xs font-medium text-fuchsia-600">Wins, Challenges, Priorities, Feedback, Growth</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A consistent structure for every 1:1. Covers wins, challenges, priorities, feedback, support, and growth.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderGrowth()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function OneOnOneAgendaPage() { return <ThemeProvider><OneOnOneAgendaContent /></ThemeProvider>; }
