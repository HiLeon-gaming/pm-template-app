"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Notes + decisions + actions + parking lot", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Notes + actions only", icon: AlignJustify },
];

function MeetingNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const parkingRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>UNIVERSAL MEETING NOTES + ACTIONS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MEETING DETAILS</td></tr></tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Meeting Name</td><td style={{ ...S.td0, fontWeight: 700 }}>[Meeting Title]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date &amp; Time</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Day, MM/DD/YYYY &mdash; HH:MM]</td></tr>
        <tr><td style={S.tdLabel}>Attendees</td><td style={S.td0}>[Name 1, Name 2, Name 3]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name]</td></tr>
        <tr><td style={S.tdLabel}>Purpose / Goal</td><td style={{ ...S.td0, fontWeight: 600 }}>[One sentence: what must come out of this meeting?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>DISCUSSION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Topic</th>
          <th style={S.thPrimary}>Key Points / Discussion</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Decision Made</th>
        </tr></thead>
        <tbody>
          {[1, 2, 3, 4].map((n, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>[Topic {n}]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Key points discussed]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>[Decision or &ldquo;No decision &mdash; carry forward&rdquo;]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>ACTION ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due Date</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((n, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#059669" }}>{n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Action item description]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>[Name]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>[MM/DD]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Open</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderParking = () => (
    <div ref={parkingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>PARKING LOT &amp; FOLLOW-UPS</td></tr></tbody></table>
      <CopyButton targetRef={parkingRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
          &bull; [Topic deferred from this meeting &mdash; add to next agenda]<br />
          &bull; [Item that needs more research before deciding]<br />
          &bull; [Question raised that nobody could answer &mdash; assign follow-up]
        </td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Next Meeting Date</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Recap Sent?</td><td style={S.tdAlt}>&#9744; Yes &mdash; sent to [distribution list] on [date]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><FileText size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Universal Meeting Notes + Actions</h2><p className="text-xs font-medium text-amber-600">&#11088; All-Star &mdash; Clean Outputs From Every Meeting</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Notes, decisions, action items, owners, due dates. Clean and repeatable for any meeting type.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderActions()}{renderParking()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingNotesActionsPage() { return <ThemeProvider><MeetingNotesContent /></ThemeProvider>; }
