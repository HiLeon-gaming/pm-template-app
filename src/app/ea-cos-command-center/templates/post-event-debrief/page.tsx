"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Debrief", desc: "What worked + what didn't + follow-ups", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Key takeaways + follow-ups", icon: AlignJustify },
];

function PostEventDebriefContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const followupsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EA580C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>POST-EVENT DEBRIEF NOTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Travel, Events &amp; Logistics</td></tr>
    </tbody></table>
  );

  const renderOverview = () => (
    <div ref={overviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>EVENT SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={overviewRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Event Name</td><td style={{ ...S.td0, fontWeight: 700 }}>[Event Title]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Venue</td><td style={S.td0}>[Venue name, location]</td></tr>
        <tr><td style={S.tdLabelAlt}>Attendees</td><td style={S.tdAlt}>[Number attended / Number invited = XX% attendance]</td></tr>
        <tr><td style={S.tdLabel}>Overall Rating</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Excellent</span> / <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Good</span> / <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Needs Improvement</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Key Outcome</td><td style={{ ...S.tdAlt, fontWeight: 600 }}>[What was the main result or takeaway?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>WHAT WORKED WELL</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            {[
              "[Venue was perfect — right size, good AV, easy parking]",
              "[Agenda was tight — finished on time with no dead spots]",
              "[Catering was excellent — dietary needs handled perfectly]",
              "[CEO's keynote was well-received — strong applause]",
              "[Registration was smooth — name badges ready]",
            ].map((item, i) => {
              const bg = i % 2 === 1 ? C.rowAlt : C.white;
              return <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 12px", color: "#059669" }}>&bull; {item}</td></tr>;
            })}
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>WHAT DIDN&apos;T WORK / IMPROVE NEXT TIME</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            {[
              "[AV had a 10-min delay at start — test earlier next time]",
              "[Breakout rooms were too small — book larger rooms]",
              "[Afternoon session ran 20 min over — stricter timeboxing]",
              "[No post-event survey sent — set up in advance next time]",
              "[Parking was confusing — send map with invite]",
            ].map((item, i) => {
              const bg = i % 2 === 1 ? C.rowAlt : C.white;
              return <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 12px", color: "#DC2626" }}>&bull; {item}</td></tr>;
            })}
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
    </div>
  );

  const renderFollowups = () => (
    <div ref={followupsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>FOLLOW-UP ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={followupsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due Date</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Send thank-you notes to speakers and VIP attendees]", owner: "[EA]", due: "03/22", done: false },
            { action: "[Share event photos + recap email to all attendees]", owner: "[Comms]", due: "03/23", done: false },
            { action: "[Send post-event satisfaction survey]", owner: "[EA]", due: "03/22", done: false },
            { action: "[Submit expense report + vendor invoices]", owner: "[EA]", due: "03/25", done: false },
            { action: "[Update event template with lessons learned]", owner: "[CoS]", due: "03/28", done: false },
            { action: "[Schedule follow-up meetings from event conversations]", owner: "[EA]", due: "03/24", done: false },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.done ? C.badgeGreenBg : C.badgeAmberBg, r.done ? C.badgeGreenFg : C.badgeAmberFg)}>{r.done ? "Done" : "Pending"}</span></td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><ClipboardCheck size={11} />Debrief</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><ClipboardCheck size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Post-Event Debrief Notes</h2><p className="text-xs font-medium text-orange-600">What Worked, What Didn&apos;t, Follow-Ups</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture what worked, what didn&apos;t, and follow-up actions. Continuous improvement for every event.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderOverview()}{renderReview()}{renderFollowups()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderOverview()}{renderFollowups()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PostEventDebriefPage() { return <ThemeProvider><PostEventDebriefContent /></ThemeProvider>; }
