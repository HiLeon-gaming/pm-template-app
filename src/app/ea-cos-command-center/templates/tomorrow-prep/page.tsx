"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Moon, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Meetings + pre-reads + reminders", icon: LayoutDashboard },
  { id: "compact", label: "Quick Prep", desc: "Key items only", icon: AlignJustify },
];

function TomorrowPrepContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const remindRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9"; const accentDark = "#0284C7";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🌙 TOMORROW PREP PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 TOMORROW&apos;S SETUP</div>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Tomorrow&apos;s Date</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Day, MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Theme / Focus</td><td style={S.tdAlt}>[e.g., External meetings day / Board prep / Team operations]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>Meeting / Event</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Prep Done?</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Pre-Read / Doc Links</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Key Message / Decision</th>
        </tr></thead>
        <tbody>
          {[
            { time: "9:00 AM", meeting: "[CFO 1:1 — Q2 budget review]", prep: "☐", docs: "[Link to forecast deck]", key: "[Get signoff on marketing spend]" },
            { time: "10:30 AM", meeting: "[External partner call]", prep: "☐", docs: "[Contract draft v3]", key: "[Align on renewal terms]" },
            { time: "1:00 PM", meeting: "[All-hands prep with CEO]", prep: "☐", docs: "[Slide deck draft]", key: "[Review key announcements]" },
            { time: "3:00 PM", meeting: "[Steering committee]", prep: "☐", docs: "[Status report, risk log]", key: "[Escalate vendor issue]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.prep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.docs}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.key}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRemind = () => (
    <div ref={remindRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>⚡ REMINDERS &amp; TEE-UPS</div>
      <CopyButton targetRef={remindRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>Docs to Print / Send</td><td style={S.td0}>[Board deck printout, forecast 1-pager for CFO meeting]</td></tr>
        <tr><td style={S.tdLabelAlt}>Talking Points to Prep</td><td style={S.tdAlt}>[Key messages for partner call — see Talking Points Builder]</td></tr>
        <tr><td style={S.tdLabel}>Follow-Ups Due Tomorrow</td><td style={{ ...S.td0, fontWeight: 600, color: "#DC2626" }}>[Legal contract — 2nd follow-up; HR headcount — escalate if no reply]</td></tr>
        <tr><td style={S.tdLabelAlt}>Calendar Changes</td><td style={S.tdAlt}>[CEO asked to move 3pm to 4pm; add 15-min buffer before partner call]</td></tr>
        <tr><td style={S.tdLabel}>Exec Mood / Context</td><td style={S.td0}>[Exec traveling back from dinner tonight — may be tired. Keep morning light.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Personal Reminders</td><td style={S.tdAlt}>[Exec birthday next week — start planning; Bring umbrella — rain forecast]</td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Moon size={11} />Prep</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Moon size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Tomorrow Prep Page</h2><p className="text-xs font-medium text-sky-600">Tee Up, Pre-Reads &amp; Reminders</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What to tee up tonight: pre-reads, reminders, key messages, doc links. Reduces morning chaos.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderPrep()}{renderRemind()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPrep()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TomorrowPrepPage() { return <ThemeProvider><TomorrowPrepContent /></ThemeProvider>; }
