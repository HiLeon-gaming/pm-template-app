"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Index", desc: "Documents + context + history", icon: LayoutDashboard },
  { id: "compact", label: "Quick Links", desc: "Links only", icon: AlignJustify },
];

function PreReadContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);

  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📚 PRE-READ / ATTACHMENTS INDEX</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Meeting Prep &amp; Execution</td></tr>
    </tbody></table>
  );

  const renderDocs = () => (
    <div ref={docsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📎 DOCUMENTS &amp; LINKS</div>
      <CopyButton targetRef={docsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Document / Link</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Why It Matters</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Required?</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Added</th>
        </tr></thead>
        <tbody>
          {[
            { doc: "[Q2 Priorities Doc — link to SharePoint]", type: "Report", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, why: "[Review before staff meeting]", req: "Yes", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, added: "[03/03]" },
            { doc: "[Budget Proposal v2 — link to OneDrive]", type: "Proposal", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, why: "[Exec review decision needed]", req: "Yes", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, added: "[03/04]" },
            { doc: "[API Integration Timeline — Confluence]", type: "Plan", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, why: "[Understand dependency risk]", req: "Optional", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg, added: "[03/02]" },
            { doc: "[Customer Feedback Summary — PDF]", type: "Report", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, why: "[Context for product discussion]", req: "Optional", rBg: C.badgeGrayBg, rFg: C.badgeGrayFg, added: "[03/01]" },
            { doc: "[Vendor Evaluation Scorecard — Excel]", type: "Analysis", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, why: "[Vendor selection decision]", req: "Yes", rBg: C.badgeGreenBg, rFg: C.badgeGreenFg, added: "[02/28]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.doc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.req}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: C.textMuted }}>{r.added}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>💡 CONTEXT NOTES</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Background</td><td style={S.td0}>[Any context attendees need to understand the documents above]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Questions</td><td style={S.tdAlt}>[What should people be thinking about as they review?]</td></tr>
        <tr><td style={S.tdLabel}>Previous Decisions</td><td style={S.td0}>[Reference any prior decisions that inform today&apos;s discussion]</td></tr>
        <tr><td style={S.tdLabelAlt}>Time to Review</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Estimated 15-20 minutes of reading]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><BookOpen size={11} />Prep & Execution</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><BookOpen size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Pre-Read / Attachments Index</h2><p className="text-xs font-medium text-blue-600">Links to Docs, Decks, Reports &amp; Context</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Organize all meeting materials in one place. Saves time and creates a searchable history.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDocs()}{renderContext()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDocs()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PreReadPage() { return <ThemeProvider><PreReadContent /></ThemeProvider>; }
