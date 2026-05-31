"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Complete setup + rhythms + index", icon: LayoutDashboard },
  { id: "compact", label: "Quick Start", desc: "Key essentials only", icon: AlignJustify },
];

function ReadThisFirstContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const topSixRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📖 READ THIS FIRST &mdash; Meetings Hub Pro</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; For Leaders + Teams</td></tr>
    </tbody></table>
  );

  const renderWhat = () => (
    <div ref={whatRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💡 WHAT THIS PACK IS</td></tr></tbody></table>
      <CopyButton targetRef={whatRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "10px 14px", fontSize: "11px", lineHeight: "1.7" }}>
          This is a <strong>complete OneNote system for running meetings that actually get results.</strong><br /><br />
          Most people don&apos;t hate meetings. They hate:<br />
          &bull; Meetings with <strong>no clear purpose</strong><br />
          &bull; <strong>No decisions</strong> made<br />
          &bull; Action items <strong>forgotten</strong><br />
          &bull; The same topics <strong>repeating</strong><br />
          &bull; &ldquo;We talked about it&rdquo; but <strong>nothing changed</strong><br /><br />
          This Meetings Hub fixes that with a simple repeatable system:<br />
          <strong>1. Plan</strong> the meeting (purpose + outcomes) &rarr; <strong>2. Run</strong> it (capture decisions + actions) &rarr; <strong>3. Follow up</strong> (owners + due dates + accountability) &rarr; <strong>4. Build a history</strong> (so you never re-litigate the same stuff)
        </td></tr>
      </tbody></table>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>This Pack Replaces</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8" }}>&bull; Scattered notes<br />&bull; Random documents<br />&bull; Action items stuck in chat<br />&bull; &ldquo;Where did we decide that?&rdquo; confusion</td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Works Perfectly With</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8" }}>&bull; Outlook / Google Calendar<br />&bull; Teams / Zoom / Slack<br />&bull; Jira / Asana / Planner / Trello<br />&bull; Any task tool you already use</td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderHow = () => (
    <div ref={howRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🎯 THE SIMPLEST MEETING SYSTEM</td></tr></tbody></table>
      <CopyButton targetRef={howRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every good meeting needs only 4 things. If you do these 4 things, your meetings become &ldquo;worth it.&rdquo;</p>
      <table style={LT}><tbody><tr>
        {[
          { num: "1", q: "Why are we meeting?", a: "Purpose", color: "#059669" },
          { num: "2", q: "What are we deciding?", a: "Outcomes", color: "#3B82F6" },
          { num: "3", q: "Who owns what next?", a: "Action Items", color: "#D946EF" },
          { num: "4", q: "What did we decide?", a: "Decision Log", color: "#EA580C" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: item.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "18px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{item.num}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", padding: "8px 6px" }}>{item.q}</td></tr>
              <tr><td style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: item.color }}>{item.a}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderRhythm = () => (
    <div ref={rhythmRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔄 RECOMMENDED RHYTHMS</td></tr></tbody></table>
      <CopyButton targetRef={rhythmRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>What to Do</th>
        </tr></thead>
        <tbody>
          {[
            { cadence: "Daily / As Needed", time: "5 min", what: "Capture meetings fast with Quick Capture pages. Record decisions and action items in one place." },
            { cadence: "Weekly", time: "15 min", what: "Review your Action Tracker and Decision Log. Prep next week\u2019s key meetings using the agenda builders." },
            { cadence: "Monthly", time: "30 min", what: "Review recurring meeting health and fix what\u2019s not working. Use the Meeting Effectiveness Scorecard and Retro format." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.cadence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTopSix = () => (
    <div ref={topSixRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⭐ IF YOU ONLY USE 6 PAGES, USE THESE</td></tr></tbody></table>
      <CopyButton targetRef={topSixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Page</th>
          <th style={S.thPrimary}>Why It Matters</th>
        </tr></thead>
        <tbody>
          {[
            { page: "Meetings Command Dashboard", why: "One place to see meetings, actions, and decisions" },
            { page: "Universal Agenda Builder", why: "Makes meetings shorter and clearer" },
            { page: "Universal Minutes + Actions", why: "Prevents \u201Cwe talked about it\u201D syndrome" },
            { page: "Action Items Master Tracker", why: "Creates accountability without nagging" },
            { page: "Decision Log Master", why: "Stops repeated debates" },
            { page: "Follow-Up Email Builder", why: "Makes follow-up effortless and professional" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>All-Star</span> {r.page}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderIndex = () => (
    <div ref={indexRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 SECTION INDEX (52 Pages)</td></tr></tbody></table>
      <CopyButton targetRef={indexRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Section</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Pages</th>
          <th style={S.thSecondary}>Focus</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Color</th>
        </tr></thead>
        <tbody>
          {[
            { section: "A \u2014 Start Here", pages: "6", focus: "Setup, orientation, meeting standards, universal agenda builder", color: "Amber", cHex: "#F59E0B" },
            { section: "B \u2014 Meeting Prep & Execution", pages: "10", focus: "Core templates: minutes, quick capture, parking lot, decisions, closeout", color: "Blue", cHex: "#3B82F6" },
            { section: "C \u2014 1:1 Meetings", pages: "8", focus: "Manager + direct report: agenda, notes, coaching, feedback, career growth", color: "Fuchsia", cHex: "#D946EF" },
            { section: "D \u2014 Team Meetings", pages: "8", focus: "Staff meetings, metrics review, cross-team sync, retros, escalations", color: "Emerald", cHex: "#059669" },
            { section: "E \u2014 Project & Delivery", pages: "7", focus: "Project sync, design review, scope tradeoffs, go/no-go, war room", color: "Orange", cHex: "#EA580C" },
            { section: "F \u2014 Executive & Leadership", pages: "6", focus: "Exec review, steering committee, one-pager builder, action tracker", color: "Indigo", cHex: "#6366F1" },
            { section: "G \u2014 Logs, Follow-Up & Emails", pages: "7", focus: "Decision log, cadence planner, stakeholder CRM, email builder", color: "Teal", cHex: "#0D9488" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.section}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: r.cHex }}>{r.pages}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.focus}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(r.cHex + "22", r.cHex), fontWeight: 700 }}>{r.color}</span></td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><BookOpen size={11} />Guide</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><BookOpen size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Read This First</h2><p className="text-xs font-medium text-amber-600">Your Complete Meetings Hub Pro Setup Guide</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What this pack is, what it replaces, the simplest meeting system, recommended rhythms, and a section index.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderWhat()}{renderHow()}{renderRhythm()}{renderTopSix()}{renderIndex()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderWhat()}{renderHow()}{renderTopSix()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ReadThisFirstPage() { return <ThemeProvider><ReadThisFirstContent /></ThemeProvider>; }
