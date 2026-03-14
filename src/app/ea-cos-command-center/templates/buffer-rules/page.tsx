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
  { id: "full", label: "Full Rules", desc: "Buffer types + exceptions + examples", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Core buffer rules only", icon: AlignJustify },
];

function BufferRulesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>BUFFER &amp; TRANSITION TIME RULES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STANDARD BUFFER RULES</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Back-to-back meetings burn out executives. Build in breathing room automatically.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Scenario</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Buffer Before</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Buffer After</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Why / Notes</th>
        </tr></thead>
        <tbody>
          {[
            { scenario: "Internal 1:1 meetings", before: "5 min", after: "5 min", why: "Quick context switch — note previous action items" },
            { scenario: "Internal group meetings (3+)", before: "10 min", after: "10 min", why: "Review agenda, gather docs, debrief after" },
            { scenario: "External meetings (partners, vendors)", before: "15 min", after: "10 min", why: "Review brief, talking points; capture follow-ups after" },
            { scenario: "Board / investor meetings", before: "30 min", after: "15 min", why: "Final prep, mental reset; capture decisions + actions" },
            { scenario: "Presentations / keynotes", before: "30 min", after: "15 min", why: "Tech check, slides review; decompress after" },
            { scenario: "Difficult / sensitive conversations", before: "15 min", after: "20 min", why: "Mental prep; reflection + notes after" },
            { scenario: "Travel days (airport meetings)", before: "45 min", after: "30 min", why: "Transit buffer, check-in, settle in; travel delays" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.scenario}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#059669" }}>{r.before}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.after}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderExamples = () => (
    <div ref={examplesRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#DC2626")}>WITHOUT BUFFERS</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "10px 14px" }}>
              <strong>9:00</strong> — Leadership sync (runs 5 min over)<br />
              <strong style={{ color: "#DC2626" }}>10:00</strong> — Investor call (joins late, flustered)<br />
              <strong style={{ color: "#DC2626" }}>11:00</strong> — Board prep (no time to review notes)<br />
              <strong style={{ color: "#DC2626" }}>12:00</strong> — Lunch skipped<br />
              <strong>1:00</strong> — Team 1:1s (exhausted, distracted)<br />
              <strong style={{ color: "#DC2626" }}>Result:</strong> Exec is reactive, makes poor decisions, burns out
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner("#059669")}>WITH BUFFERS</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "10px 14px" }}>
              <strong>9:00</strong> — Leadership sync<br />
              <strong style={{ color: "#059669" }}>9:55</strong> — 5-min buffer (capture actions, reset)<br />
              <strong>10:15</strong> — Investor call (prepped, on time)<br />
              <strong style={{ color: "#059669" }}>11:00</strong> — 15-min buffer (debrief, send follow-ups)<br />
              <strong>11:15</strong> — Board prep (focused, prepared)<br />
              <strong style={{ color: "#059669" }}>12:15</strong> — Lunch protected<br />
              <strong>Result:</strong> Exec is proactive, makes quality decisions, sustainable pace
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={examplesRef} label="Copy Section" />
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; 2026 All Rights Reserved
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Clock size={11} />Buffer</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Clock size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Buffer &amp; Transition Time Rules</h2><p className="text-xs font-medium text-sky-600">Breathing Room Between Meetings</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Standard buffer times by meeting type. Prevents burnout, improves decision quality.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderRules()}{renderExamples()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRules()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BufferRulesPage() { return <ThemeProvider><BufferRulesContent /></ThemeProvider>; }
