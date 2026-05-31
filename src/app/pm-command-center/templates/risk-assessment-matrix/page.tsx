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
  { id: "full", label: "Full Matrix", desc: "5x5 grid + heat map + thresholds", icon: LayoutDashboard },
  { id: "compact", label: "Quick Matrix", desc: "Heat map only", icon: AlignJustify },
];

function RiskAssessmentMatrixContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const thresholdRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}> RISK ASSESSMENT MATRIX</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop  PM Command Center  PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Risk Assessment Matrix (Probability-Impact Matrix) provides a visual tool for prioritizing risks based on their likelihood and potential impact.</strong> It maps each risk to a 5×5 grid to determine severity ratings that drive response prioritization.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>qualitative risk analysis</strong> to prioritize the risk register. Aligns with PMBOK Risk Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const getHeatColor = (score: number): { bg: string; fg: string } => {
    if (score >= 16) return { bg: "#991B1B", fg: "#FFFFFF" };
    if (score >= 10) return { bg: "#DC2626", fg: "#FFFFFF" };
    if (score >= 5) return { bg: "#F59E0B", fg: "#78350F" };
    if (score >= 2) return { bg: "#10B981", fg: "#064E3B" };
    return { bg: "#D1FAE5", fg: "#065F46" };
  };

  const probLabels = ["5 - Almost Certain (>80%)", "4 - Likely (60-80%)", "3 - Possible (40-60%)", "2 - Unlikely (20-40%)", "1 - Rare (<20%)"];
  const impLabels = ["1 - Negligible", "2 - Minor", "3 - Moderate", "4 - Major", "5 - Catastrophic"];

  const riskPlots: Record<string, string[]> = {
    "5-5": [], "5-4": [], "5-3": [], "5-2": [], "5-1": [],
    "4-5": [], "4-4": ["R2"], "4-3": [], "4-2": [], "4-1": [],
    "3-5": ["R7"], "3-4": ["R1","R4"], "3-3": ["R3","R6"], "3-2": [], "3-1": [],
    "2-5": [], "2-4": ["R5"], "2-3": [], "2-2": [], "2-1": [],
    "1-5": [], "1-4": [], "1-3": [], "1-2": [], "1-1": [],
  };

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> PROBABILITY × IMPACT MATRIX (5×5)</div>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Probability / Impact →</th>
          {impLabels.map((l, i) => (<th key={i} style={{ ...S.thPrimary, textAlign: "center" as const, fontSize: "9px", padding: "6px 4px" }}>{l}</th>))}
        </tr></thead>
        <tbody>
          {probLabels.map((pLabel, pi) => {
            const pVal = 5 - pi;
            return (<tr key={pi}>
              <td style={{ ...S.td0, fontWeight: 700, fontSize: "10px", backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>{pLabel}</td>
              {[1, 2, 3, 4, 5].map(iVal => {
                const score = pVal * iVal;
                const hc = getHeatColor(score);
                const key = `${pVal}-${iVal}`;
                const risks = riskPlots[key] || [];
                return (<td key={iVal} style={{ ...S.td0, backgroundColor: hc.bg, color: hc.fg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", padding: "12px 6px", verticalAlign: "middle" as const }}>
                  {score}
                  {risks.length > 0 && <div style={{ fontSize: "9px", fontWeight: 600, marginTop: "2px" }}>{risks.join(", ")}</div>}
                </td>);
              })}
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Score = Probability × Impact. Risk IDs plotted on the matrix correspond to entries in the Risk Register.</p>
    </div>
  );

  const renderScale = () => (
    <div ref={scaleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> PROBABILITY & IMPACT SCALES</td></tr></tbody></table>
      <CopyButton targetRef={scaleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Probability</th>
          <th style={S.thSecondary}>Probability Definition</th>
        </tr></thead>
        <tbody>
          {[
            { s: "5", label: "Almost Certain", def: "[>80% chance of occurrence. Has happened on similar projects; expected to happen]" },
            { s: "4", label: "Likely", def: "[60-80% chance. Probable based on current conditions; has precedent]" },
            { s: "3", label: "Possible", def: "[40-60% chance. Could go either way; some indicators present]" },
            { s: "2", label: "Unlikely", def: "[20-40% chance. Not expected but conceivable; would require specific conditions]" },
            { s: "1", label: "Rare", def: "[<20% chance. Very unlikely; only in exceptional circumstances]" },
          ].map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800 }}>{p.s}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{p.label}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.def}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Impact</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Schedule</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Cost</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Scope</th>
          <th style={S.thSecondary}>Quality</th>
        </tr></thead>
        <tbody>
          {[
            { s: "5", label: "Catastrophic", sched: "[>3 months delay]", cost: "[>40% overrun]", scope: "[Project cancelled]", qual: "[Product unusable]" },
            { s: "4", label: "Major", sched: "[1-3 months delay]", cost: "[20-40% overrun]", scope: "[Major scope reduction]", qual: "[Significant defects]" },
            { s: "3", label: "Moderate", sched: "[2-4 weeks delay]", cost: "[10-20% overrun]", scope: "[Some features cut]", qual: "[Workarounds needed]" },
            { s: "2", label: "Minor", sched: "[1-2 weeks delay]", cost: "[5-10% overrun]", scope: "[Minor adjustments]", qual: "[Minor defects]" },
            { s: "1", label: "Negligible", sched: "[<1 week delay]", cost: "[<5% overrun]", scope: "[No impact]", qual: "[Cosmetic only]" },
          ].map((im, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800 }}>{im.s}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{im.label}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{im.sched}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{im.cost}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{im.scope}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{im.qual}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderThreshold = () => (
    <div ref={thresholdRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> RISK THRESHOLDS & RESPONSE TRIGGERS</div>
      <CopyButton targetRef={thresholdRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Rating</th>
          <th style={S.thSecondary}>Required Response</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Escalation</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Review Freq</th>
        </tr></thead>
        <tbody>
          {[
            { range: "16-25", rating: "Critical", rBg: "#991B1B", rFg: "#FFFFFF", resp: "[Immediate action required. Develop detailed response plan within 24 hours. Assign dedicated owner. Daily monitoring.]", esc: "[Sponsor + PMO]", freq: "Daily" },
            { range: "10-15", rating: "High", rBg: "#DC2626", rFg: "#FFFFFF", resp: "[Active management required. Response plan within 1 week. Assign owner. Report in weekly status.]", esc: "[Sponsor]", freq: "Weekly" },
            { range: "5-9", rating: "Medium", rBg: "#F59E0B", rFg: "#78350F", resp: "[Monitor actively. Document response strategy. Include in risk review meetings.]", esc: "[PM]", freq: "Bi-weekly" },
            { range: "1-4", rating: "Low", rBg: "#10B981", rFg: "#064E3B", resp: "[Accept and monitor. Document in risk register. Review at phase gates.]", esc: "[PM]", freq: "Monthly" },
          ].map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800 }}>{t.range}</td>
              <td style={{ ...S.td0, backgroundColor: bg }}><span style={{ ...S.badge(t.rBg, t.rFg), fontWeight: 700 }}>{t.rating}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.resp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.esc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{t.freq}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPlot = () => (
    <div ref={plotRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}> RISK PLOT SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={plotRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>ID</th>
          <th style={S.thSecondary}>Risk</th>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>P</th>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>I</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Rating</th>
        </tr></thead>
        <tbody>
          {[
            { id: "R1", risk: "[Key developer leaves mid-project]", p: 3, i: 4, score: 12, rating: "High", rBg: "#DC2626", rFg: "#FFFFFF" },
            { id: "R2", risk: "[Requirements scope creep]", p: 4, i: 4, score: 16, rating: "Critical", rBg: "#991B1B", rFg: "#FFFFFF" },
            { id: "R3", risk: "[Third-party API breaks integration]", p: 3, i: 3, score: 9, rating: "Medium", rBg: "#F59E0B", rFg: "#78350F" },
            { id: "R4", risk: "[Vendor delivers late]", p: 3, i: 4, score: 12, rating: "High", rBg: "#DC2626", rFg: "#FFFFFF" },
            { id: "R5", risk: "[Budget overrun]", p: 2, i: 4, score: 8, rating: "Medium", rBg: "#F59E0B", rFg: "#78350F" },
            { id: "R6", risk: "[Low user adoption]", p: 3, i: 3, score: 9, rating: "Medium", rBg: "#F59E0B", rFg: "#78350F" },
            { id: "R7", risk: "[Security vulnerability]", p: 3, i: 5, score: 15, rating: "High", rBg: "#DC2626", rFg: "#FFFFFF" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{r.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.risk}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{r.p}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{r.i}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800 }}>{r.score}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(r.rBg, r.rFg), fontWeight: 700 }}>{r.rating}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderScale()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderThreshold()}</td>
      </tr></tbody></table>
      {renderPlot()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderMatrix()}{renderPlot()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Grid3X3 size={11} /> Risk Matrix</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Grid3X3 size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Risk Assessment Matrix</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Risk Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Visual 5×5 probability-impact heat map with defined scales, thresholds, and risk plots. Full Matrix includes scales and response thresholds; Quick Matrix shows the heat map and risk plot.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RiskAssessmentMatrixPage() {
  return (<ThemeProvider><RiskAssessmentMatrixContent /></ThemeProvider>);
}
