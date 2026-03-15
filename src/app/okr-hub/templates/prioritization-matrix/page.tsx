"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Grid3X3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Matrix", desc: "Impact/Effort matrix + scoring + decision guide", icon: LayoutDashboard },
  { id: "compact", label: "Quick Matrix", desc: "Scoring table only", icon: AlignJustify },
];

function PrioritizationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>INITIATIVE PRIORITIZATION MATRIX</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Impact vs. Effort</td></tr>
    </tbody></table>
  );

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>IMPACT vs. EFFORT QUADRANTS</div>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Plot each initiative on the grid below. The quadrant tells you what to do with it. Start with Quick Wins, then tackle Big Bets. Avoid Time Sinks.</p>
      <table style={{ ...S.tbl, marginBottom: "4px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.td0, width: "8%", textAlign: "center" as const, fontWeight: 800, fontSize: "10px", color: "#7C3AED", writingMode: "vertical-rl" as const, transform: "rotate(180deg)", padding: "20px 6px" }}>IMPACT</td>
            <td style={{ ...S.td0, width: "46%", backgroundColor: "#DCFCE7", padding: "14px 16px", verticalAlign: "top" as const }}>
              <div style={{ fontWeight: 800, fontSize: "11px", color: "#059669", marginBottom: "6px" }}>&#9989; BIG BETS (High Impact, High Effort)</div>
              <div style={{ fontSize: "9px", color: C.textBody, lineHeight: "1.8" }}>Worth the investment if you have capacity.<br />[Initiative 1]<br />[Initiative 2]<br />[Initiative 3]</div>
            </td>
            <td style={{ ...S.td0, width: "46%", backgroundColor: "#FEF3C7", padding: "14px 16px", verticalAlign: "top" as const }}>
              <div style={{ fontWeight: 800, fontSize: "11px", color: accent, marginBottom: "6px" }}>&#11088; QUICK WINS (High Impact, Low Effort)</div>
              <div style={{ fontSize: "9px", color: C.textBody, lineHeight: "1.8" }}>Do these FIRST. Maximum return for minimum cost.<br />[Initiative 1]<br />[Initiative 2]<br />[Initiative 3]</div>
            </td>
          </tr>
          <tr>
            <td style={{ ...S.td0, width: "8%" }}></td>
            <td style={{ ...S.td0, backgroundColor: "#FEE2E2", padding: "14px 16px", verticalAlign: "top" as const }}>
              <div style={{ fontWeight: 800, fontSize: "11px", color: "#DC2626", marginBottom: "6px" }}>&#10060; TIME SINKS (Low Impact, High Effort)</div>
              <div style={{ fontSize: "9px", color: C.textBody, lineHeight: "1.8" }}>Avoid these. Lots of work for little return.<br />[Initiative 1]<br />[Initiative 2]</div>
            </td>
            <td style={{ ...S.td0, backgroundColor: "#EDE9FE", padding: "14px 16px", verticalAlign: "top" as const }}>
              <div style={{ fontWeight: 800, fontSize: "11px", color: "#7C3AED", marginBottom: "6px" }}>&#128300; FILL-INS (Low Impact, Low Effort)</div>
              <div style={{ fontSize: "9px", color: C.textBody, lineHeight: "1.8" }}>Nice-to-haves. Do if time permits after Quick Wins + Big Bets.<br />[Initiative 1]<br />[Initiative 2]</div>
            </td>
          </tr>
          <tr>
            <td style={{ ...S.td0 }}></td>
            <td colSpan={2} style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "10px", color: "#7C3AED", padding: "6px" }}>EFFORT →</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderScoreAndGuide = () => (
    <div ref={scoreRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={scoreRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "65%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>🎯 WEIGHTED SCORING TABLE</td></tr></thead>
            <tbody>
              {[
                { init: "[Hire 3 support agents]", scores: "I:5 E:3 S:4 C:4", total: 16, rank: 1 },
                { init: "[Redesign onboarding emails]", scores: "I:3 E:5 S:5 C:4", total: 17, rank: 1 },
                { init: "[Launch LinkedIn ads]", scores: "I:4 E:4 S:3 C:3", total: 14, rank: 3 },
                { init: "[Build enterprise playbook]", scores: "I:5 E:3 S:3 C:4", total: 15, rank: 2 },
                { init: "[Detractor recovery program]", scores: "I:4 E:4 S:4 C:3", total: 15, rank: 2 },
                { init: "[Migrate to Intercom]", scores: "I:4 E:2 S:2 C:3", total: 11, rank: 5 },
                { init: "[In-app product walkthrough]", scores: "I:4 E:2 S:2 C:3", total: 11, rank: 5 },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      {r.init} <span style={{ fontSize: "9px", color: C.textMuted }}>{r.scores}</span>
                      <span style={{ float: "right", fontWeight: 800, color: accent, fontSize: "11px" }}>{r.total}</span>
                      <span style={{ float: "right", fontWeight: 800, color: "#7C3AED", fontSize: "10px", marginRight: "8px" }}>#{r.rank}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "35%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>💡 DECISION GUIDE</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Score 15+ = Commit.", detail: "Top-tier. Assign owners, start immediately." },
                { color: "#059669", tip: "Score 12\u201314 = Consider.", detail: "Good if capacity allows. Shortlist." },
                { color: "#DC2626", tip: "Under 12 = Defer or Drop.", detail: "Low priority. Backlog or kill." },
                { color: "#7C3AED", tip: "When in doubt, prefer speed.", detail: "Fast 70% > slow 100%." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Grid3X3 size={11} />Priority</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Grid3X3 size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Initiative Prioritization Matrix</h2><p className="text-xs font-medium text-amber-600">Impact vs. Effort &mdash; What Gets Done First?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A simple 2x2 matrix + weighted scoring to decide which initiatives to pursue. No more gut-feel prioritization.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderMatrix()}{renderScoreAndGuide()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderScoreAndGuide()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function PrioritizationMatrixPage() { return <ThemeProvider><PrioritizationContent /></ThemeProvider>; }
