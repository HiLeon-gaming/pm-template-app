"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Analysis", desc: "Decision rules + tradeoff log", icon: LayoutDashboard },
  { id: "compact", label: "Quick Rules", desc: "Decision rules only", icon: AlignJustify },
];

function CalendarTradeoffContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9";
  const accentDark = "#0284C7";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&#9878;&#65039; CALENDAR TRADEOFF PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>&#128737;&#65039; DECISION RULES</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every &ldquo;yes&rdquo; is a &ldquo;no&rdquo; to something else. Use these rules before adding to the exec&apos;s calendar.</p>
      <table style={LT}><tbody><tr>
        {[
          { label: "AUTO-ACCEPT", desc: "Board, investors, CEO direct reports, regulatory, crisis.", color: "#059669", icon: "\uD83D\uDFE2" },
          { label: "EVALUATE", desc: "Cross-functional, external partners, recurring reviews. Check agenda + purpose.", color: "#F59E0B", icon: "\uD83D\uDFE1" },
          { label: "PUSH BACK", desc: "No agenda, could be async, FYI-only, low-impact recurring. Suggest email instead.", color: "#DC2626", icon: "\uD83D\uDD34" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: item.color, color: "#FFFFFF", padding: "10px", fontFamily: S.font, fontSize: "14px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{item.icon} {item.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontSize: "10px", padding: "10px 8px" }}>{item.desc}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>Before saying YES, ask:</td><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8" }}>
          1. What&apos;s the purpose and desired outcome?<br />
          2. Does the exec need to be there, or can someone represent?<br />
          3. What gets bumped or compressed if we add this?<br />
          4. Can this be handled async (email, voice memo, Slack)?
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>TRADEOFF LOG</div>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>New Request</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Decision</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>What Moved / Impact</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Rationale</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/14", req: "[Urgent investor call — 30 min]", dec: "Added", impact: "[Moved team standup to 4pm]", why: "[Revenue impact]" },
            { date: "03/13", req: "[VP Sales wants 1-hr strategy session]", dec: "Deferred", impact: "[Moved to next week Tue]", why: "[Board prep priority]" },
            { date: "03/12", req: "[Marketing keynote rehearsal]", dec: "Declined", impact: "[15-min video review instead]", why: "[Async works here]" },
            { date: "03/11", req: "[HR wants exec at town hall Q&A]", dec: "Added", impact: "[Shortened CTO 1:1 by 15 min]", why: "[Culture priority]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const decColor = r.dec === "Added" ? "#059669" : r.dec === "Declined" ? "#DC2626" : "#D97706";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: decColor }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.why}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Scale size={11} />Tradeoff</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Scale size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Calendar Tradeoff Page</h2><p className="text-xs font-medium text-sky-600">If We Say Yes, What Moves?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Decision rules for protecting focus time and priorities. Every yes is a no to something else.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderRules()}{renderLog()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRules()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CalendarTradeoffPage() { return <ThemeProvider><CalendarTradeoffContent /></ThemeProvider>; }
