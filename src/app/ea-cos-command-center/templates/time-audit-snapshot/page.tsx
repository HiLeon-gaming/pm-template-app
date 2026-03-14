"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, PieChart, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Audit", desc: "Breakdown + analysis + recommendations", icon: LayoutDashboard },
  { id: "compact", label: "Quick Snapshot", desc: "Time breakdown only", icon: AlignJustify },
];

function TimeAuditContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const breakdownRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>TIME AUDIT SNAPSHOT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Calendar &amp; Time</td></tr>
    </tbody></table>
  );

  const renderBreakdown = () => (
    <div ref={breakdownRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>WHERE DID THE EXEC&apos;S TIME GO?</div>
      <CopyButton targetRef={breakdownRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Week Of</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Total Hours Tracked</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>[40 hrs]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={S.thPrimary}>Category</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Hours</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>% of Week</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target %</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Variance</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Meetings (Internal)", hrs: "14", pct: "35%", tgt: "25%", var: "+10%", varC: "#DC2626", note: "[Too many recurring meetings — audit needed]" },
            { cat: "Meetings (External)", hrs: "6", pct: "15%", tgt: "15%", var: "0%", varC: "#059669", note: "[On target — investors + partners]" },
            { cat: "Deep Work / Strategy", hrs: "4", pct: "10%", tgt: "20%", var: "-10%", varC: "#DC2626", note: "[Below target — focus blocks invaded]" },
            { cat: "Email / Comms", hrs: "6", pct: "15%", tgt: "10%", var: "+5%", varC: "#D97706", note: "[Consider batch processing]" },
            { cat: "Admin / Operational", hrs: "4", pct: "10%", tgt: "10%", var: "0%", varC: "#059669", note: "[On track]" },
            { cat: "Travel / Transit", hrs: "3", pct: "7.5%", tgt: "5%", var: "+2.5%", varC: "#D97706", note: "[Two offsite meetings this week]" },
            { cat: "Personal / Breaks", hrs: "3", pct: "7.5%", tgt: "15%", var: "-7.5%", varC: "#DC2626", note: "[Exec skipped lunch 3x — flag this]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px" }}>{r.hrs}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.pct}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.tgt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: r.varC }}>{r.var}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#DC2626")}>PROBLEMS SPOTTED</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              <strong style={{ color: "#DC2626" }}>1.</strong> Internal meetings consuming 35% (target: 25%) — audit recurring meetings<br />
              <strong style={{ color: "#DC2626" }}>2.</strong> Deep work at only 10% (target: 20%) — focus blocks lost to meeting creep<br />
              <strong style={{ color: "#DC2626" }}>3.</strong> Exec skipped lunch 3 days — burnout risk<br />
              <strong style={{ color: "#DC2626" }}>4.</strong> Email consuming 15% — consider delegating more triage
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner("#059669")}>RECOMMENDED ACTIONS</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              <strong style={{ color: "#059669" }}>1.</strong> Cancel or shorten 3 recurring internal meetings (-3 hrs)<br />
              <strong style={{ color: "#059669" }}>2.</strong> Add 2 more protected focus blocks (+4 hrs deep work)<br />
              <strong style={{ color: "#059669" }}>3.</strong> Protect lunch as a calendar hold every day<br />
              <strong style={{ color: "#059669" }}>4.</strong> EA handles more inbox triage — exec reviews only escalations
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><PieChart size={11} />Audit</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><PieChart size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Time Audit Snapshot</h2><p className="text-xs font-medium text-sky-600">Where Did the Exec&apos;s Time Actually Go?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Weekly time breakdown vs. targets. Spots problems and recommends fixes. Run monthly at minimum.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderBreakdown()}{renderAnalysis()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderBreakdown()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TimeAuditSnapshotPage() { return <ThemeProvider><TimeAuditContent /></ThemeProvider>; }
