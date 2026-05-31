"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "All decisions + context + pending", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decision table only", icon: AlignJustify },
];

function DecisionLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DECISION LOG (MASTER)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Initiatives &amp; Alignment</td></tr>
    </tbody></table>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every major exec decision in one place. Prevents revisiting settled issues.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Rationale</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Reversible?</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/14", decision: "[Approved Q2 budget with 10% reduction to marketing]", by: "[CEO]", rationale: "[Focus spend on sales pipeline]", impact: "[Marketing adjusts campaign scope]", rev: "Yes" },
            { date: "03/12", decision: "[Paused Project X — resources shifted to Project Y]", by: "[CEO + COO]", rationale: "[Project Y has higher ROI and board visibility]", impact: "[Project X team reassigned]", rev: "No" },
            { date: "03/10", decision: "[Hired external PR firm for product launch]", by: "[CEO]", rationale: "[Internal team at capacity]", impact: "[$80K budget impact]", rev: "Yes" },
            { date: "03/08", decision: "[Moved board meeting from Q2 to April 15]", by: "[Board Chair + CEO]", rationale: "[Align with Q1 results availability]", impact: "[All board prep timelines shifted]", rev: "No" },
            { date: "03/05", decision: "[Rejected acquisition proposal from Company Z]", by: "[CEO + Board]", rationale: "[Valuation too high; integration risk]", impact: "[Partnership approach instead]", rev: "No" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.rationale}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rev === "Yes" ? C.badgeBlueBg : C.badgeAmberBg, r.rev === "Yes" ? C.badgeBlueFg : C.badgeAmberFg)}>{r.rev}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPending = () => (
    <div ref={pendingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>DECISIONS PENDING</td></tr></tbody></table>
      <CopyButton targetRef={pendingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Decision Needed</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Deadline</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Blocker / Dependency</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Urgency</th>
        </tr></thead>
        <tbody>
          {[
            { decision: "[Office lease renewal — renew vs. relocate]", owner: "[COO]", deadline: "03/25", blocker: "[Waiting for cost analysis from Finance]", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
            { decision: "[VP Engineering hire — internal promote vs. external]", owner: "[CEO + CHRO]", deadline: "04/01", blocker: "[Final candidate interviews this week]", urg: "Med", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg },
            { decision: "[Partnership terms with Company X]", owner: "[CEO]", deadline: "03/18", blocker: "[Legal review pending]", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#DC2626" }}>{r.deadline}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.blocker}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.uBg, r.uFg)}>{r.urg}</span></td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Scale size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision Log (Master)</h2><p className="text-xs font-medium text-emerald-600">&#11088; All-Star &mdash; Every Major Decision in One Place</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Every major exec decision logged with rationale and impact. Prevents revisiting settled issues.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderLog()}{renderPending()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionLogMasterPage() { return <ThemeProvider><DecisionLogContent /></ThemeProvider>; }
