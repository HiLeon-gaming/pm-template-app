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
  { id: "full", label: "Full Queue", desc: "7-day follow-ups + completed", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Active follow-ups only", icon: AlignJustify },
];

function FollowUpQueueContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📅 FOLLOW-UP QUEUE (NEXT 7 DAYS)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderQueue = () => (
    <div ref={queueRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 PRIORITIZED FOLLOW-UP LIST</div>
      <CopyButton targetRef={queueRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Sorted by next touchpoint date. Review each morning. If something goes silent for 3+ days, escalate.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Touch Date</th>
          <th style={S.thPrimary}>Follow-Up Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>With / From</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Method</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { date: "Today", item: "[Get board deck feedback from CEO]", with: "[CEO]", method: "In-person", pri: "🔴 High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, notes: "[Bring printed copy to 1:1]" },
            { date: "Today", item: "[Nudge Legal on contract redline]", with: "[GC]", method: "Email", pri: "🔴 High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, notes: "[Cc procurement lead]" },
            { date: "Tomorrow", item: "[Check vendor proposal status]", with: "[Procurement]", method: "Slack", pri: "🟡 Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, notes: "[Need by Friday]" },
            { date: "Wed", item: "[Confirm offsite venue booking]", with: "[Events Co.]", method: "Phone", pri: "🟡 Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, notes: "[Deposit due Thursday]" },
            { date: "Thu", item: "[Follow up on headcount approval]", with: "[CHRO]", method: "Email", pri: "🟡 Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, notes: "[2 weeks overdue]" },
            { date: "Fri", item: "[Confirm travel arrangements for CEO trip]", with: "[Travel Agency]", method: "Email", pri: "🟢 Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, notes: "[Flight + hotel confirmed?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const dateColor = r.date === "Today" ? "#DC2626" : r.date === "Tomorrow" ? "#D97706" : accent;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: dateColor }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.with}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.method}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontStyle: "italic" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDone = () => (
    <div ref={doneRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>✅ COMPLETED THIS WEEK</div>
      <CopyButton targetRef={doneRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Item</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Closed</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Outcome</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[Team offsite budget approval]", closed: "03/12", outcome: "[Approved — notified Operations team]" },
            { item: "[Contractor extension sign-off]", closed: "03/10", outcome: "[Extended 3 months — Procurement notified]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.closed}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.outcome}</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><ListChecks size={11} />Follow-Up</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><ListChecks size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Follow-Up Queue (Next 7 Days)</h2><p className="text-xs font-medium text-pink-600">Prioritized Follow-Up List &mdash; Stops Silent Stalls</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A prioritized follow-up list with the next touchpoint date. Review each morning to keep things moving.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200" : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-pink-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderQueue()}{renderDone()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderQueue()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FollowUpQueuePage() { return <ThemeProvider><FollowUpQueueContent /></ThemeProvider>; }
