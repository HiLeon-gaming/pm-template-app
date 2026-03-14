"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Collector", desc: "Template + submissions + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Template", desc: "Submission form only", icon: AlignJustify },
];

function StatusUpdateCollectorContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STATUS UPDATE COLLECTOR</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Initiatives &amp; Alignment</td></tr>
    </tbody></table>
  );

  const renderTemplate = () => (
    <div ref={templateRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STANDARD UPDATE FORMAT (Send to Team Leads)</div>
      <CopyButton targetRef={templateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Standard format for updates to reduce noise. Easier weekly briefings for the exec.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Team / Initiative</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Top Win This Week</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Top Risk / Blocker</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Key Ask of Exec</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Submitted?</th>
        </tr></thead>
        <tbody>
          {[
            { team: "[Engineering]", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, win: "[Released v2.1 on schedule]", risk: "[QA backlog growing]", ask: "[None]", sub: true },
            { team: "[Sales]", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, win: "[Closed $500K deal]", risk: "[Pipeline soft for Q3]", ask: "[Approve 2 new hires]", sub: true },
            { team: "[Marketing]", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, win: "[Campaign launched — 2x expected leads]", risk: "[Budget running hot]", ask: "[Budget reallocation approval]", sub: true },
            { team: "[HR]", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, win: "[Reduced time-to-hire by 20%]", risk: "[3 senior departures pending]", ask: "[Exec to do retention conversations]", sub: false },
            { team: "[Finance]", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, win: "[Q1 close completed early]", risk: "[Audit timeline tight]", ask: "[Sign audit engagement letter]", sub: true },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.win}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: "#DC2626" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ask}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sub ? C.badgeGreenBg : C.badgeRedBg, r.sub ? C.badgeGreenFg : C.badgeRedFg)}>{r.sub ? "Yes" : "Missing"}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>EXEC BRIEFING SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Week Of</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Updates Received</td><td style={S.tdAlt}>[4 of 5 teams submitted] &mdash; <strong style={{ color: "#DC2626" }}>HR outstanding</strong></td></tr>
        <tr><td style={S.tdLabel}>Overall Portfolio Health</td><td style={S.td0}><span style={{ color: "#059669", fontWeight: 700 }}>3 Green</span> &nbsp;/&nbsp; <span style={{ color: "#D97706", fontWeight: 700 }}>2 Amber</span> &nbsp;/&nbsp; <span style={{ color: "#DC2626", fontWeight: 700 }}>0 Red</span></td></tr>
        <tr><td style={S.tdLabelAlt}>Top Wins</td><td style={{ ...S.tdAlt, fontSize: "10px" }}>[v2.1 released on time; $500K deal closed; Q1 close completed early]</td></tr>
        <tr><td style={S.tdLabel}>Top Risks</td><td style={{ ...S.td0, fontSize: "10px", color: "#DC2626" }}>[3 senior departures pending; Q3 pipeline soft; audit timeline tight]</td></tr>
        <tr><td style={S.tdLabelAlt}>Exec Actions Needed</td><td style={{ ...S.tdAlt, fontSize: "10px", fontWeight: 700 }}>[1) Approve 2 Sales hires, 2) Do retention conversations, 3) Sign audit letter]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><ClipboardList size={11} />Updates</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><ClipboardList size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Status Update Collector</h2><p className="text-xs font-medium text-emerald-600">Standard Format for Team Updates</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Standard format for updates to reduce noise. Easier weekly briefings for the exec.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderTemplate()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTemplate()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StatusUpdateCollectorPage() { return <ThemeProvider><StatusUpdateCollectorContent /></ThemeProvider>; }
