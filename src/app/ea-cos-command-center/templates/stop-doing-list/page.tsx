"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, XCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full List", desc: "Stop + start + continue", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Stop items only", icon: AlignJustify },
];

function StopDoingListContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const stopRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&ldquo;STOP DOING&rdquo; LIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Initiatives &amp; Alignment</td></tr>
    </tbody></table>
  );

  const renderStop = () => (
    <div ref={stopRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>STOP DOING &mdash; Exec Time Freed</div>
      <CopyButton targetRef={stopRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What should the exec stop attending, reviewing, or owning? Protect the most valuable resource: their time.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Activity to Stop</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Current Time/Week</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Why Stop?</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Delegate To</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { act: "[Attending weekly ops standup — not decision-making level]", time: "1 hr/wk", why: "[COO can handle; exec gets summary]", delegate: "[COO]", s: "Ready to Drop", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { act: "[Reviewing every marketing campaign draft]", time: "2 hrs/wk", why: "[CMO should own; exec only sees final]", delegate: "[CMO]", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { act: "[Attending all candidate interviews below VP level]", time: "3 hrs/wk", why: "[CHRO + hiring managers can screen]", delegate: "[CHRO]", s: "Proposed", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { act: "[Manually reviewing weekly expense reports]", time: "1 hr/wk", why: "[Finance can flag exceptions only]", delegate: "[CFO]", s: "Ready to Drop", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { act: "[Sitting in on all vendor renewal calls]", time: "1.5 hrs/wk", why: "[Procurement can handle; exec only for strategic vendors]", delegate: "[CoS]", s: "Proposed", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.delegate}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Time Recoverable</td><td style={{ ...S.td0, fontWeight: 800, color: "#059669", fontSize: "14px" }}>~8.5 hrs / week</td></tr>
      </tbody></table>
    </div>
  );

  const renderStart = () => (
    <div ref={startRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#059669")}>START DOING</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; [Weekly 30-min strategic thinking block]<br />
              &bull; [Monthly skip-level conversations]<br />
              &bull; [Bi-weekly customer/market pulse check]<br />
              &bull; [Quarterly personal development time]<br />
              &bull; [Daily 15-min CoS sync for priorities]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner("#0EA5E9")}>CONTINUE DOING</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; [Weekly leadership team sync]<br />
              &bull; [Monthly board chair pre-brief]<br />
              &bull; [1:1s with direct reports]<br />
              &bull; [Quarterly all-hands town hall]<br />
              &bull; [Annual strategic planning offsite]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={startRef} label="Copy Section" />
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><XCircle size={11} />Stop List</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><XCircle size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">&ldquo;Stop Doing&rdquo; List</h2><p className="text-xs font-medium text-emerald-600">Protect the Most Valuable Resource: Their Time</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What should the exec stop attending, reviewing, or owning? Paired with start/continue lists.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderStop()}{renderStart()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderStop()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StopDoingListPage() { return <ThemeProvider><StopDoingListContent /></ThemeProvider>; }
