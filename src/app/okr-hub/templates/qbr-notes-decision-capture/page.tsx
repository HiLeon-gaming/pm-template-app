"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Summary + decisions + actions + carry-forwards", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Decisions & actions only", icon: AlignJustify },
];

function QBRNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const summRef = useRef<HTMLDivElement>(null);
  const decRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLDivElement>(null);
  const carryRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QBR NOTES + DECISION CAPTURE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Q[X] [YEAR] &nbsp;|&nbsp; Decisions &amp; Next Steps</td></tr>
    </tbody></table>
  );

  const renderSumm = () => (
    <div ref={summRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>QBR SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>Date / Time</td><td style={S.td0}>[Date] &nbsp;|&nbsp; [Time] &nbsp;|&nbsp; [Duration: 90 min]</td></tr>
        <tr><td style={S.tdLabelAlt}>Attendees</td><td style={S.tdAlt}>[List names / teams present]</td></tr>
        <tr><td style={S.tdLabel}>Facilitator</td><td style={S.td0}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Note-Taker</td><td style={S.tdAlt}>[Name]</td></tr>
        <tr><td style={S.tdLabel}>Quarter Score</td><td style={{ ...S.td0, fontWeight: 800, fontSize: "14px", color: accent }}>Avg: 0.68 &nbsp;|&nbsp; <span style={{ ...S.badge(C.badgeAmberBg, C.badgeAmberFg) }}>Amber</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Quarter Headline</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[e.g., &ldquo;Strong CX and hiring progress. Enterprise revenue is the critical gap for Q2.&rdquo;]</td></tr>
        <tr><td style={S.tdLabel}>Mood / Energy</td><td style={S.td0}>[e.g., Cautiously optimistic. Team proud of CX improvements. Concerned about enterprise deals.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderDec = () => (
    <div ref={decRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>DECISIONS MADE AT QBR</td></tr></tbody></table>
      <CopyButton targetRef={decRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every decision made during the QBR — with context, rationale, and owner. Share within 24 hours so there&apos;s no ambiguity.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Rationale</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Effective</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "Keep outsourced SDR team for Q2. Extend contract 3 months.", rat: "Too early to hire internal SDR. Need pipeline results first.", by: "[CEO]", eff: "Q2 Day 1" },
            { dec: "NPS target stays at 50 for Q2. No further reduction.", rat: "47 achieved in Q1 — 50 is realistic and still stretches the team.", by: "[CEO]", eff: "Q2 Day 1" },
            { dec: "Shift $20K from events budget to digital marketing.", rat: "LinkedIn ROI dramatically higher than events. Full reallocation approved.", by: "[CFO + CMO]", eff: "Q2 Week 1" },
            { dec: "Manager training program launches Q2 Week 2. Budget: $8K.", rat: "Engagement won't improve without better managers. Non-negotiable.", by: "[COO]", eff: "Q2 Week 2" },
            { dec: "VP Engineering: extend search to external recruiters if no hire by Q2 Week 4.", rat: "Internal pipeline too thin. Can't delay this role another quarter.", by: "[CEO + HR Dir.]", eff: "Q2 Week 4" },
            { dec: "[Your decision]", rat: "", by: "", eff: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#7C3AED" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.rat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.eff}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActAndCarry = () => (
    <div ref={actRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={actRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "60%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>✅ ACTION ITEMS FROM QBR</td></tr></thead>
            <tbody>
              {[
                { action: "Extend SDR agency contract \u2014 sign by Q2 Day 1.", owner: "[VP Sales]", due: "Q2 D1" },
                { action: "Update all OKR scoreboard targets for Q2.", owner: "[Ops]", due: "Q2 W1" },
                { action: "Reallocate $20K events \u2192 digital in finance.", owner: "[Finance]", due: "Q2 W1" },
                { action: "Source and book manager training vendor.", owner: "[HR Dir.]", due: "Q2 W1" },
                { action: "Engage 2 external recruiters for VP Eng.", owner: "[Recruiter]", due: "Q2 W2" },
                { action: "Draft Q2 OKRs and circulate for feedback.", owner: "[CEO / COO]", due: "Q2 W1" },
                { action: "Share QBR notes + decisions (Slack + email).", owner: "[Facilitator]", due: "24 hrs" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      \u2610 {r.action}<br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.owner} \u2022 {r.due}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "40%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>➡️ CARRY-FORWARDS</td></tr></thead>
            <tbody>
              {[
                { item: "KR 2.2: Close 3 enterprise deals (>$100K)", score: "0.33", change: "Adding SDR + referral. Target stays at 3.", owner: "[VP Sales]" },
                { item: "KR 3.2: Employee engagement > 85%", score: "0.55", change: "Pulse surveys + mgr training. Target 85%.", owner: "[PeopleOps]" },
                { item: "VP Engineering hire", score: "Unfilled", change: "External recruiters. Deadline: Q2 Wk 4.", owner: "[Recruiter]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      <strong style={{ color: accent }}>{r.item}</strong> <span style={{ fontSize: "9px", color: "#059669", fontWeight: 800 }}>{r.score}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.change} \u2022 {r.owner}</span>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><FileCheck size={11} />QBR Notes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><FileCheck size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">QBR Notes + Decision Capture</h2><p className="text-xs font-medium text-rose-600">Decisions &bull; Actions &bull; Carry-Forwards &bull; Next Quarter</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Record decisions, actions, and carry-forwards from the QBR. Share within 24 hours.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderSumm()}{renderDec()}{renderActAndCarry()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDec()}{renderActAndCarry()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QBRNotesDecisionCapturePage() { return <ThemeProvider><QBRNotesContent /></ThemeProvider>; }
