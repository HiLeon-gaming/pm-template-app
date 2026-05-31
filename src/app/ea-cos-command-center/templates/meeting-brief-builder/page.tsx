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
  { id: "full", label: "Full Brief", desc: "Context + agenda + talking points + risks", icon: LayoutDashboard },
  { id: "compact", label: "Quick Brief", desc: "Essentials only", icon: AlignJustify },
];

function MeetingBriefContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const talkingRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9"; const accentDark = "#0284C7";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📋 MEETING BRIEF BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📍 MEETING DETAILS</td></tr></tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Meeting Name</td><td style={{ ...S.td0, fontWeight: 700 }}>[Meeting Title]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date &amp; Time</td><td style={{ ...S.tdAlt, color: accent, fontWeight: 700 }}>[Day, MM/DD/YYYY — HH:MM AM/PM]</td></tr>
        <tr><td style={S.tdLabel}>Duration</td><td style={S.td0}>[30 min / 60 min]</td></tr>
        <tr><td style={S.tdLabelAlt}>Location / Link</td><td style={S.tdAlt}>[Room name / Zoom link / Teams link]</td></tr>
        <tr><td style={S.tdLabel}>Meeting Type</td><td style={S.td0}>[Internal / External / Board / 1:1]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Purpose / Why This Meeting</td><td style={{ ...S.td0, fontWeight: 600 }}>[One sentence: what must come out of this meeting?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Decision(s) Needed</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#DC2626" }}>[What needs to be decided? By whom?]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={S.thPrimary}>Attendee</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Role</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>What They Care About</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Prep Note</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[CEO]", role: "Decision Maker", care: "[Budget impact, timeline]", prep: "[Wants 1-pager summary]" },
            { name: "[CFO]", role: "Advisor", care: "[Financial projections]", prep: "[Bring Q2 forecast data]" },
            { name: "[VP Product]", role: "Presenter", care: "[Roadmap alignment]", prep: "[Slides ready?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.care}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.prep}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📝 AGENDA &amp; DOCS</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={S.thSecondary}>Topic</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Lead</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Desired Outcome</th>
        </tr></thead>
        <tbody>
          {[
            { time: "5 min", topic: "[Opening / context setting]", lead: "[CEO]", outcome: "[Everyone aligned on purpose]" },
            { time: "15 min", topic: "[Presentation / update]", lead: "[VP Product]", outcome: "[Roadmap understood]" },
            { time: "15 min", topic: "[Discussion / Q&A]", lead: "[All]", outcome: "[Concerns surfaced]" },
            { time: "10 min", topic: "[Decision + next steps]", lead: "[CEO]", outcome: "[Decision made, actions assigned]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.lead}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Pre-Read / Docs</td><td style={S.td0}>[Link 1: Forecast deck] [Link 2: Roadmap summary] [Link 3: Budget 1-pager]</td></tr>
      </tbody></table>
    </div>
  );

  const renderTalking = () => (
    <div ref={talkingRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#F59E0B")}>💬 TALKING POINTS FOR EXEC</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              <strong style={{ color: "#F59E0B" }}>Opening:</strong> &ldquo;[Thanks for making time. Today we need to align on X and decide Y.]&rdquo;<br /><br />
              <strong style={{ color: "#F59E0B" }}>Key Message 1:</strong> [Main point to convey]<br />
              <strong style={{ color: "#F59E0B" }}>Key Message 2:</strong> [Supporting data or context]<br />
              <strong style={{ color: "#F59E0B" }}>Key Message 3:</strong> [The ask or recommendation]<br /><br />
              <strong style={{ color: "#F59E0B" }}>Close:</strong> &ldquo;[Let&apos;s confirm the decision and assign next steps before we wrap.]&rdquo;
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>⚠️ RISKS &amp; LANDMINES</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              <strong style={{ color: "#DC2626" }}>Watch for:</strong><br />
              &bull; [CFO may push back on budget increase — have ROI data ready]<br />
              &bull; [VP Product may ask for more time — be prepared to hold timeline]<br />
              &bull; [Board member X tends to ask about competitive landscape]<br /><br />
              <strong style={{ color: "#DC2626" }}>If challenged:</strong><br />
              &bull; [Redirect to data: &ldquo;The numbers show...&rdquo;]<br />
              &bull; [Defer if needed: &ldquo;Let me get you that detail by EOD&rdquo;]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={talkingRef} label="Copy Section" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><FileText size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Brief Builder</h2><p className="text-xs font-medium text-sky-600">⭐ All-Star &mdash; Exec Looks Prepared Every Time</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Purpose, attendees, agenda, risks, decisions needed, talking points, doc links. Complete meeting prep in one page.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderTalking()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingBriefBuilderPage() { return <ThemeProvider><MeetingBriefContent /></ThemeProvider>; }
