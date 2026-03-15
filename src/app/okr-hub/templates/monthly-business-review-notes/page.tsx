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
  { id: "full", label: "Full Notes", desc: "Summary + decisions + actions + next month focus", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Decisions & actions only", icon: AlignJustify },
];

function MBRNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const summRef = useRef<HTMLDivElement>(null);
  const decRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>MONTHLY BUSINESS REVIEW — NOTES + ACTIONS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Month [X] of Q[X] [YEAR]</td></tr>
    </tbody></table>
  );

  const renderSumm = () => (
    <div ref={summRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>MEETING SUMMARY</div>
      <CopyButton targetRef={summRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>Date</td><td style={S.td0}>[Date] &nbsp;|&nbsp; [Time]</td></tr>
        <tr><td style={S.tdLabelAlt}>Attendees</td><td style={S.tdAlt}>[List names / teams]</td></tr>
        <tr><td style={S.tdLabel}>Facilitator</td><td style={S.td0}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>OKR Score Summary</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>[e.g., Avg score: 0.42. 2 Green, 4 Amber, 2 Red. Slight improvement vs last month.]</td></tr>
        <tr><td style={S.tdLabel}>Portfolio Health</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Amber</span> — 3 Green, 3 Amber, 1 Red initiative. Detractor program still blocked.</td></tr>
        <tr><td style={S.tdLabelAlt}>Month Headline</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[e.g., &ldquo;Good progress on CX and hiring. Enterprise pipeline is the critical gap.&rdquo;]</td></tr>
      </tbody></table>
    </div>
  );

  const renderDec = () => (
    <div ref={decRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>DECISIONS MADE</div>
      <CopyButton targetRef={decRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Relates To</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "Hire outsourced SDR team to supplement enterprise outreach. Budget: $15K/mo.", by: "[CEO + VP Sales]", rel: "KR 2.2" },
            { dec: "Reduce NPS target from 55 → 50 based on mid-quarter data. Still ambitious.", by: "[CEO]", rel: "KR 1.3" },
            { dec: "Descope Intercom migration from Q1. Move to Q2.", by: "[VP Eng + COO]", rel: "Capacity" },
            { dec: "Manager training program approved. Budget: $8K. Start Week 6.", by: "[COO + HR Dir.]", rel: "KR 3.2" },
            { dec: "[Your decision]", by: "", rel: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#7C3AED" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.rel}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActAndFocus = () => (
    <div ref={actRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={actRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "60%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>✅ ACTION ITEMS</td></tr></thead>
            <tbody>
              {[
                { action: "Contract outsourced SDR agency — sign by Week 5.", owner: "[VP Sales]", due: "Week 5" },
                { action: "Update KR 1.3 target in scoreboard from 55 → 50.", owner: "[Ops]", due: "Today" },
                { action: "Communicate Intercom descoping to eng team.", owner: "[VP Eng]", due: "This week" },
                { action: "Source and book manager training vendor.", owner: "[HR Dir.]", due: "Week 5" },
                { action: "NPS data access — final escalation to CTO.", owner: "[COO]", due: "Wed" },
                { action: "[Your action]", owner: "", due: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      &#9744; <span style={{ fontWeight: 600 }}>{r.action}</span><br />
                      {r.owner && <span style={{ fontSize: "9px", color: C.textMuted }}>{r.owner} &nbsp;|&nbsp; Due: <span style={{ fontWeight: 700 }}>{r.due}</span></span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "40%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>🎯 NEXT MONTH FOCUS</td></tr></thead>
            <tbody>
              {[
                { focus: "Unblock and launch detractor recovery program — #1 CX priority.", color: "#DC2626" },
                { focus: "Onboard SDR agency and start enterprise outreach wave.", color: "#D97706" },
                { focus: "Launch first pulse survey and get baseline engagement data.", color: "#059669" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 800, color: r.color, fontSize: "14px" }}>{i + 1}.</span> <span style={{ fontWeight: 600 }}>{r.focus}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><FileText size={11} />MBR Notes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><FileText size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Monthly Business Review Notes + Actions</h2><p className="text-xs font-medium text-rose-600">Decisions &bull; Actions &bull; Next Month Focus</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture decisions and actions from the MBR. Creates a searchable history of monthly decisions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderSumm()}{renderDec()}{renderActAndFocus()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDec()}{renderActAndFocus()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function MonthlyBusinessReviewNotesPage() { return <ThemeProvider><MBRNotesContent /></ThemeProvider>; }
