"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Notes + decisions + commitments + follow-ups", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Notes + actions only", icon: AlignJustify },
];

function OneOnOneNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const commitmentsRef = useRef<HTMLDivElement>(null);
  const followupRef = useRef<HTMLDivElement>(null);

  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📝 1:1 NOTES + ACTIONS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Direct Report</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Mood / Energy</td><td style={{ ...S.tdAlt, fontWeight: 600, color: accent }}>[😊 Positive / 😐 Neutral / 😟 Concerned]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 DISCUSSION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Topic</th>
          <th style={S.thPrimary}>Notes / Key Points</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "Wins / Highlights", notes: "[What went well — capture their exact words when possible]" },
            { topic: "Challenges / Blockers", notes: "[What’s difficult — what support do they need?]" },
            { topic: "Priorities This Week", notes: "[What they’re focused on — any shifts from last week?]" },
            { topic: "Feedback Given", notes: "[What feedback did you share? Positive or constructive.]" },
            { topic: "Feedback Received", notes: "[What feedback did they give you? How can you improve?]" },
            { topic: "Other Topics", notes: "[Anything else discussed — personal, team dynamics, etc.]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCommitments = () => (
    <div ref={commitmentsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>✅ DECISIONS &amp; COMMITMENTS</td></tr></tbody></table>
      <CopyButton targetRef={commitmentsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Decision / Commitment</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[Approved PTO request for week of 03/17]", owner: "[You]", due: "[Done]", s: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { item: "[Send training course options by end of week]", owner: "[You]", due: "[03/07]", s: "Action", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { item: "[Draft architecture proposal for new feature]", owner: "[Sarah]", due: "[03/10]", s: "Action", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { item: "[Schedule skip-level meeting with VP]", owner: "[You]", due: "[03/14]", s: "Action", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
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

  const renderFollowup = () => (
    <div ref={followupRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📬 CARRY FORWARD TO NEXT 1:1</td></tr></tbody></table>
      <CopyButton targetRef={followupRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Topics to Revisit</td><td style={S.td0}>[List any topics that need follow-up next week]</td></tr>
        <tr><td style={S.tdLabelAlt}>Open Actions to Check</td><td style={S.tdAlt}>[Which actions from today should be reviewed next time?]</td></tr>
        <tr><td style={S.tdLabel}>Growth Check-In Due?</td><td style={S.td0}>[Monthly growth/career discussion — next one due?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next 1:1 Date</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><FileText size={11} />1:1 Meetings</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><FileText size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">1:1 Notes + Actions</h2><p className="text-xs font-medium text-fuchsia-600">Notes, Decisions, Commitments &amp; Follow-Ups</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture every 1:1 meeting&apos;s notes, decisions, commitments, and carry-forward topics. Creates continuity across weeks.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderCommitments()}{renderFollowup()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderCommitments()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function OneOnOneNotesPage() { return <ThemeProvider><OneOnOneNotesContent /></ThemeProvider>; }
