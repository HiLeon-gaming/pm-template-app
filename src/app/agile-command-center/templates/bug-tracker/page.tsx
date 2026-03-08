"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Bug, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Bugs + summary + triage", icon: LayoutDashboard },
  { id: "compact", label: "Bug List", desc: "Bug table only", icon: AlignJustify },
];

function BugTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bugsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const triageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🐛 BUG / DEFECT TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Quality &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>QA Lead</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Open Bugs</td><td style={S.tdAlt}>[##]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderBugs = () => (
    <div ref={bugsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 BUG LOG</div>
      <CopyButton targetRef={bugsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Found</th>
          <th style={S.thPrimary}>Bug Description</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Story</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Assigned</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[MM/DD]", desc: "[Checkout total shows $0 when cart has 10+ items]", sev: "Critical", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, pri: "P1", priBg: C.badgeRedBg, priFg: C.badgeRedFg, story: "[S-010]", who: "[Priya]", s: "Fixing", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "[MM/DD]", desc: "[Apple Pay button not visible on Android (expected — should hide)]", sev: "Major", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, pri: "P2", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg, story: "[S-010]", who: "[Sarah]", s: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "[MM/DD]", desc: "[Confirmation email missing order number in subject line]", sev: "Minor", sevBg: C.badgeGreenBg, sevFg: C.badgeGreenFg, pri: "P3", priBg: C.badgeBlueBg, priFg: C.badgeBlueFg, story: "[S-003]", who: "[Mike]", s: "Fixed", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "[MM/DD]", desc: "[Payment retry shows duplicate error flash on slow connections]", sev: "Minor", sevBg: C.badgeGreenBg, sevFg: C.badgeGreenFg, pri: "P3", priBg: C.badgeBlueBg, priFg: C.badgeBlueFg, story: "[S-012b]", who: "[Priya]", s: "Open", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { date: "[MM/DD]", desc: "[Accessibility: error messages not read by screen reader]", sev: "Major", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, pri: "P2", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg, story: "[S-012a]", who: "[TBD]", s: "Triaged", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "[Add]", desc: "", sev: "—", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg, pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg, story: "", who: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: accent, fontWeight: 600 }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.priBg, r.priFg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: accent }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 BUG SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Total", value: "[5]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Critical", value: "[1]", color: C.badgeRedBg, fg: C.badgeRedFg },
          { label: "Open", value: "[3]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Fixed", value: "[1]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Ship Blocker?", value: "[Yes]", color: C.badgeRedBg, fg: C.badgeRedFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "5px 8px", fontFamily: S.font, fontSize: "9px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "18px", padding: "8px 6px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderTriage = () => (
    <div ref={triageRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🔧 TRIAGE RULES</div>
      <CopyButton targetRef={triageRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          { sev: "Critical (P1)", rule: "Fix immediately. Blocks release. Drop current work.", bg: C.badgeRedBg, fg: C.badgeRedFg },
          { sev: "Major (P2)", rule: "Fix this sprint. Schedule within 24 hours.", bg: C.badgeAmberBg, fg: C.badgeAmberFg },
          { sev: "Minor (P3)", rule: "Fix if time allows this sprint. Otherwise add to backlog.", bg: C.badgeBlueBg, fg: C.badgeBlueFg },
          { sev: "Cosmetic (P4)", rule: "Add to backlog. Fix in a future sprint.", bg: C.badgeGreenBg, fg: C.badgeGreenFg },
        ].map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, width: "20%", textAlign: "center" as const }}><span style={S.badge(r.bg, r.fg)}>{r.sev}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.rule}</td>
            </tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Bug size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Bug / Defect Tracker</h2><p className="text-xs font-medium text-violet-600">⭐ All-Star &mdash; Severity, Priority &amp; Triage Rules</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track bugs with severity, priority, triage rules, and summary metrics. Keeps quality visible and actionable.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderBugs()}{renderSummary()}{renderTriage()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderBugs()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BugTrackerPage() { return <ThemeProvider><BugTrackerContent /></ThemeProvider>; }
