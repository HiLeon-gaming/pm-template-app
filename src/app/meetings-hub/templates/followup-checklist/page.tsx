"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Clock, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All follow-up items + tracker", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Essential items only", icon: AlignJustify },
];

function FollowupChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);

  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⏰ FOLLOW-UP CHECKLIST (24-Hour Rule)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Meeting Prep &amp; Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%" }}>[Title]</td><td style={{ ...S.tdLabel, width: "18%" }}>Meeting Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Follow-Up Owner</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Follow-Up Deadline</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#DC2626" }}>[Within 24 hours of meeting]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderCheck = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 POST-MEETING FOLLOW-UP CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Complete all items within 24 hours of the meeting ending. This builds accountability without stress.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done?</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Follow-Up Item</th>
          <th style={S.thPrimary}>What to Do</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Time</th>
        </tr></thead>
        <tbody>
          {[
            { item: "Send meeting recap", what: "Email or Teams message with: purpose, key points, decisions, action items. Use Follow-Up Email Builder.", time: "10 min" },
            { item: "Update Action Tracker", what: "Add all new action items to the Action Items Master Tracker with owners and due dates.", time: "5 min" },
            { item: "Update Decision Log", what: "Log all decisions in the Decision Log Master with date, context, and owner.", time: "5 min" },
            { item: "Share meeting notes", what: "Post notes to OneNote / SharePoint / Teams channel. Include link in recap email.", time: "3 min" },
            { item: "Confirm action owners", what: "Reach out to each action owner to confirm they saw the assignment and understand the deadline.", time: "5 min" },
            { item: "Update project docs", what: "If applicable: update RAID log, project plan, risk register, or status report.", time: "5 min" },
            { item: "Schedule follow-ups", what: "If new meetings were requested, send calendar invites with preliminary agenda.", time: "3 min" },
            { item: "File parking lot items", what: "Add parking lot items to the appropriate backlog or topic list for future meetings.", time: "2 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600, color: accent }}>{r.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Estimated Time</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>~38 minutes (most meetings need only 15-20 min)</td></tr>
      </tbody></table>
    </div>
  );

  const renderTracker = () => (
    <div ref={trackerRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📊 FOLLOW-UP COMPLETION TRACKER</td></tr></tbody></table>
      <CopyButton targetRef={trackerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Meeting</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Recap Sent?</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Tracker Updated?</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Owners Confirmed?</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>All Done?</th>
        </tr></thead>
        <tbody>
          {[
            { mtg: "[Weekly Staff Meeting]", date: "[03/05]" },
            { mtg: "[1:1 with Sarah]", date: "[03/05]" },
            { mtg: "[Project Alpha Sync]", date: "[03/04]" },
            { mtg: "[Exec Review]", date: "[03/03]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mtg}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: C.textMuted }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><Clock size={11} />24-Hour Rule</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Clock size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Follow-Up Checklist</h2><p className="text-xs font-medium text-blue-600">The 24-Hour Rule &mdash; Builds Accountability Without Stress</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Send recap, update trackers, share notes, confirm owners. Complete within 24 hours of every meeting.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderTracker()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderCheck()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FollowupChecklistPage() { return <ThemeProvider><FollowupChecklistContent /></ThemeProvider>; }
