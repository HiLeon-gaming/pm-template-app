"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Megaphone, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "All sections + Q&A + follow-up", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Agenda + key messages only", icon: AlignJustify },
];

function AllHandsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const followupRef = useRef<HTMLDivElement>(null);

  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📢 ALL-HANDS / TOWN HALL</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Team Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Event</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Q1 All-Hands / Monthly Town Hall]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Host / MC</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[60 minutes]</td></tr>
        <tr><td style={S.tdLabel}>Audience</td><td style={S.td0}>[Full department / All engineering / Entire company]</td><td style={S.tdLabel}>Format</td><td style={S.td0}>[In-person / Hybrid / Virtual]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 AGENDA &amp; KEY MESSAGES</div>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Mins</th>
          <th style={S.thPrimary}>Topic</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Presenter</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Key Message / Notes</th>
        </tr></thead>
        <tbody>
          {[
            { time: "1:00", mins: "5", topic: "[Welcome + energy check + ground rules]", presenter: "[MC]", msg: "[Set the tone — positive, transparent, two-way]" },
            { time: "1:05", mins: "10", topic: "[Company / department update — big picture]", presenter: "[Leader]", msg: "[Revenue, headcount, strategic priorities, wins]" },
            { time: "1:15", mins: "10", topic: "[Team spotlight — achievements & demos]", presenter: "[Team Lead]", msg: "[Celebrate wins, show real work, recognize people]" },
            { time: "1:25", mins: "10", topic: "[Strategic initiative deep-dive]", presenter: "[Project Lead]", msg: "[What\u2019s coming, why it matters, how it affects everyone]" },
            { time: "1:35", mins: "5", topic: "[People & culture update]", presenter: "[HR / People]", msg: "[Hiring, engagement, upcoming events, policy changes]" },
            { time: "1:40", mins: "15", topic: "[Q&A — open floor]", presenter: "[MC]", msg: "[Pre-submitted + live questions. Be honest.]" },
            { time: "1:55", mins: "5", topic: "[Closing — key takeaways + next steps]", presenter: "[Leader]", msg: "[3 things to remember. What\u2019s next. Thank you.]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accentDark }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.mins}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.presenter}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.msg}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderQA = () => (
    <div ref={qaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>❓ Q&amp;A CAPTURE</div>
      <CopyButton targetRef={qaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Question</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Answer / Response</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Follow-Up?</th>
        </tr></thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => {
            const bg = i % 2 === 0 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Question asked]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Answer given or \u201CWill follow up\u201D]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>[Yes/No — Owner]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFollowup = () => (
    <div ref={followupRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📬 POST-EVENT FOLLOW-UP</div>
      <CopyButton targetRef={followupRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Recording Shared?</td><td style={S.td0}>[Yes — link to recording / No]</td></tr>
        <tr><td style={S.tdLabelAlt}>Slides / Deck</td><td style={S.tdAlt}>[Link to presentation materials]</td></tr>
        <tr><td style={S.tdLabel}>Unanswered Questions</td><td style={S.td0}>[List questions that need follow-up + owner + deadline]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Announcements</td><td style={S.tdAlt}>[Summary of announcements for those who missed it]</td></tr>
        <tr><td style={S.tdLabel}>Next All-Hands</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Date / Tentative topic]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Megaphone size={11} />All-Hands</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Megaphone size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">All-Hands / Town Hall</h2><p className="text-xs font-medium text-emerald-600">Agenda &bull; Key Messages &bull; Q&amp;A &bull; Follow-Up</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured agenda for large team gatherings. Key messages, Q&amp;A capture, and post-event follow-up.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderQA()}{renderFollowup()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AllHandsPage() { return <ThemeProvider><AllHandsContent /></ThemeProvider>; }
