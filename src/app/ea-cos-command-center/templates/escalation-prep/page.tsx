"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertOctagon, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Context + options + recommendation + brief", icon: LayoutDashboard },
  { id: "compact", label: "Quick Brief", desc: "Summary + recommendation only", icon: AlignJustify },
];

function EscalationPrepContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const briefRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ESCALATION / EXEC BRIEF PREP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Initiatives &amp; Alignment</td></tr>
    </tbody></table>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>ESCALATION DETAILS</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Issue / Escalation</td><td style={{ ...S.td0, fontWeight: 700 }}>[Clear, specific description of what needs exec attention]</td></tr>
        <tr><td style={S.tdLabelAlt}>Escalated By</td><td style={S.tdAlt}>[Name / Team]</td></tr>
        <tr><td style={S.tdLabel}>Date Escalated</td><td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Urgency</td><td style={S.tdAlt}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Critical</span> / <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>High</span> / <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Medium</span></td></tr>
        <tr><td style={S.tdLabel}>Background</td><td style={{ ...S.td0, fontSize: "10px" }}>[What happened? Timeline of events. What&apos;s been tried already?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Impact if Unresolved</td><td style={{ ...S.tdAlt, color: "#DC2626", fontWeight: 600 }}>[Revenue loss / client churn / team attrition / legal exposure]</td></tr>
        <tr><td style={S.tdLabel}>Who&apos;s Involved</td><td style={S.td0}>[List all stakeholders affected or needed for resolution]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr>
          <th style={S.thPrimary}>Option</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Pros</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Cons</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Est. Cost / Time</th>
        </tr></thead>
        <tbody>
          {[
            { opt: "[Option A: Do nothing — accept risk]", pros: "[No cost, no disruption]", cons: "[Problem worsens, potential client loss]", cost: "[$0 / 0 days]" },
            { opt: "[Option B: Quick fix — temporary workaround]", pros: "[Fast, low cost]", cons: "[Doesn't address root cause]", cost: "[$5K / 2 days]" },
            { opt: "[Option C: Full resolution — proper fix]", pros: "[Permanent fix, builds trust]", cons: "[Higher cost, needs resources]", cost: "[$25K / 2 wks]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.opt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#059669" }}>{r.pros}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#DC2626" }}>{r.cons}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.cost}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Recommendation</td><td style={{ ...S.td0, fontWeight: 800, color: accent }}>[Option C — full resolution. The relationship and revenue justify the investment.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderBrief = () => (
    <div ref={briefRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>EXEC BRIEF (30-SECOND VERSION)</div>
      <CopyButton targetRef={briefRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "11px", lineHeight: "2.0", padding: "14px 18px" }}>
          <strong style={{ color: "#DC2626" }}>What happened:</strong> [One sentence summary]<br />
          <strong style={{ color: accent }}>Why it matters:</strong> [Impact in business terms]<br />
          <strong style={{ color: "#7C3AED" }}>What I recommend:</strong> [Your recommendation]<br />
          <strong style={{ color: "#D97706" }}>What I need from you:</strong> [Specific ask — approve, decide, call someone]<br />
          <strong style={{ color: "#0EA5E9" }}>By when:</strong> [Deadline for exec action]
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><AlertOctagon size={11} />Escalation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><AlertOctagon size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Escalation / Exec Brief Prep</h2><p className="text-xs font-medium text-emerald-600">Structured Problem &rarr; Options &rarr; Recommendation</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structure escalations so the exec can decide fast. Problem, options, recommendation, ask.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderContext()}{renderBrief()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderBrief()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function EscalationPrepPage() { return <ThemeProvider><EscalationPrepContent /></ThemeProvider>; }
