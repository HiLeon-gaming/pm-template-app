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
  { id: "full", label: "Full Notes", desc: "Decisions + actions + scores + parking lot", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Decisions & actions only", icon: AlignJustify },
];

function WeeklyCheckInNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const summRef = useRef<HTMLDivElement>(null);
  const decRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLDivElement>(null);
  const parkRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY CHECK-IN NOTES + DECISIONS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderSumm = () => (
    <div ref={summRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>MEETING SUMMARY</div>
      <CopyButton targetRef={summRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>Date / Time</td><td style={S.td0}>[Monday, DATE] &nbsp;|&nbsp; [9:00 AM – 9:30 AM]</td></tr>
        <tr><td style={S.tdLabelAlt}>Attendees</td><td style={S.tdAlt}>[List names or teams present]</td></tr>
        <tr><td style={S.tdLabel}>Facilitator</td><td style={S.td0}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Overall Pulse</td><td style={S.tdAlt}>[e.g., Team energy: 7/10. Feeling momentum on CX but concerned about enterprise pipeline.]</td></tr>
        <tr><td style={S.tdLabel}>KR Score Summary</td><td style={{ ...S.td0, fontWeight: 700 }}>[e.g., 2 Green, 4 Amber, 2 Red — same as last week. Enterprise deals still Red.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderDec = () => (
    <div ref={decRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>DECISIONS MADE</div>
      <CopyButton targetRef={decRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every decision should be documented so no one says &ldquo;I didn&apos;t know we decided that.&rdquo;</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Relates To</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "Shift $2K from conference budget to LinkedIn ads — top-performing ad gets extra spend.", by: "[CMO + CFO]", rel: "KR 2.1" },
            { dec: "Pivot enterprise outreach to warm intros only. Stop cold emails for now.", by: "[VP Sales]", rel: "KR 2.2" },
            { dec: "Launch pulse survey this Wednesday, not next week. Can't wait any longer.", by: "[COO]", rel: "KR 3.2" },
            { dec: "[Your decision here]", by: "", rel: "" },
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

  const renderActAndPark = () => (
    <div ref={actRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={actRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "60%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>✅ ACTION ITEMS</td></tr></thead>
            <tbody>
              {[
                { action: "Reallocate $2K LinkedIn budget and launch best ad variation", owner: "[Amy K.]", due: "Tue", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
                { action: "Ask 5 existing customers for enterprise warm intros", owner: "[Mike D.]", due: "Thu", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
                { action: "Send pulse survey to all employees", owner: "[PeopleOps]", due: "Wed", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
                { action: "IT to grant NPS data access to CX team", owner: "[IT Admin]", due: "Tue EOD", s: "Escalated", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
                { action: "Onboard 2 new support agents (start: Week 4)", owner: "[Tom R.]", due: "Week 4", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
                { action: "[Your action here]", owner: "", due: "", s: "", sBg: "transparent", sFg: C.textMuted },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      &#9744; <span style={{ fontWeight: 600 }}>{r.action}</span><br />
                      {r.owner && <span style={{ fontSize: "9px", color: C.textMuted }}>{r.owner} &nbsp;|&nbsp; Due: <span style={{ fontWeight: 700 }}>{r.due}</span> &nbsp;|&nbsp; {r.s && <span style={S.badge(r.sBg, r.sFg)}>{r.s}</span>}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "40%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>📝 PARKING LOT</td></tr></thead>
            <tbody>
              {[
                "Hire a dedicated SDR for enterprise outreach? (Discuss at MBR)",
                "Intercom migration timeline — need IT deep-dive (Schedule Thu)",
                "[Your parked topic here]",
              ].map((item, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 800, color: "#D97706" }}>{i + 1}.</span> {item}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><FileText size={11} />Notes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><FileText size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Check-In Notes + Decisions</h2><p className="text-xs font-medium text-emerald-600">Capture Outcomes &bull; Decisions &bull; Next Steps</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document what was decided and what needs to happen. Creates a searchable history of weekly decisions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderSumm()}{renderDec()}{renderActAndPark()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDec()}{renderActAndPark()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyCheckInNotesPage() { return <ThemeProvider><WeeklyCheckInNotesContent /></ThemeProvider>; }
