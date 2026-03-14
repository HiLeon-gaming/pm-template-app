"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileBarChart, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Brief", desc: "Priorities + meetings + decisions + risks + wins", icon: LayoutDashboard },
  { id: "compact", label: "Quick Brief", desc: "Priorities + decisions only", icon: AlignJustify },
];

function WeeklyExecBriefContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const meetingsRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY EXECUTIVE BRIEF</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Travel, Events &amp; Logistics</td></tr>
    </tbody></table>
  );

  const renderPriorities = () => (
    <div ref={prioritiesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>WEEK OF [MM/DD] &mdash; TOP PRIORITIES</div>
      <CopyButton targetRef={prioritiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Deadline</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { pri: "[Finalize partnership term sheet]", owner: "[CEO]", due: "03/18", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { pri: "[Approve Q2 budget]", owner: "[CEO + CFO]", due: "03/20", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { pri: "[Board deck final review]", owner: "[CoS]", due: "03/22", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { pri: "[Retention conversations with at-risk leaders]", owner: "[CEO]", due: "03/22", s: "Not Started", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { pri: "[Sign audit engagement letter]", owner: "[CEO]", due: "03/17", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.pri}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: r.s === "Overdue" ? "#DC2626" : accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMeetings = () => (
    <div ref={meetingsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>KEY MEETINGS THIS WEEK</div>
      <CopyButton targetRef={meetingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%" }}>Day</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>Meeting</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Prep Needed</th>
        </tr></thead>
        <tbody>
          {[
            { day: "Mon", time: "9:00", meet: "[Leadership Team Sync]", prep: "[Status updates collected]" },
            { day: "Tue", time: "10:00", meet: "[1:1 with CFO — Q2 budget]", prep: "[Budget draft reviewed]" },
            { day: "Wed", time: "2:00", meet: "[Partner negotiation call]", prep: "[Term sheet + talking points]" },
            { day: "Thu", time: "11:00", meet: "[Board Chair pre-brief]", prep: "[Board deck v3 ready]" },
            { day: "Fri", time: "3:00", meet: "[All-hands rehearsal]", prep: "[Slides + key messages]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: "#0EA5E9" }}>{r.day}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.meet}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.prep}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>DECISIONS NEEDED THIS WEEK</div>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          "[1. Approve 2 new Sales hires — VP Sales requesting by Wed]",
          "[2. Partnership term sheet — Company X waiting for response by Fri]",
          "[3. Office lease — renew or relocate decision by 03/25]",
        ].map((d, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600, padding: "8px 14px" }}>{d}</td></tr>;
        })}
      </tbody></table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>RISKS &amp; WINS</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", color: "#DC2626" }}>Top Risks</td><td style={{ ...S.td0, fontSize: "10px" }}>[1. 3 senior leaders at risk of leaving — retention convos needed ASAP]<br />[2. Q3 pipeline soft — Sales needs exec support on 2 key deals]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, color: "#059669" }}>Wins to Celebrate</td><td style={{ ...S.tdAlt, fontSize: "10px" }}>[1. Engineering shipped v2.1 on schedule — team morale high]<br />[2. Marketing campaign generated 2x expected leads]</td></tr>
        <tr><td style={S.tdLabel}>FYI / Heads-Up</td><td style={{ ...S.td0, fontSize: "10px" }}>[Board Chair may call about M&A — use talking points from 03/10 prep]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><FileBarChart size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Executive Brief Builder</h2><p className="text-xs font-medium text-orange-600">&#11088; All-Star &mdash; The Brief Your Exec Will Love</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Top priorities, key meetings, decisions needed, risks, asks, wins. Enormous value every week.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderPriorities()}{renderMeetings()}{renderDecisions()}{renderRisks()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPriorities()}{renderDecisions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyExecBriefPage() { return <ThemeProvider><WeeklyExecBriefContent /></ThemeProvider>; }
