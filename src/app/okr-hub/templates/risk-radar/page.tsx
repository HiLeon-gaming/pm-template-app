"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Radar, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Radar", desc: "Risk register + heat map + mitigation + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Risk table only", icon: AlignJustify },
];

function RiskRadarContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RISK RADAR — TOP RISKS THIS QUARTER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Q[X] [YEAR]</td></tr>
    </tbody></table>
  );

  const renderRisk = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>ACTIVE RISK REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Top risks that could derail OKR achievement this quarter. Updated weekly. Each risk has an owner, mitigation, and trigger point.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Risk</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Likelihood</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Mitigation Plan</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Affects</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "Enterprise pipeline too thin. Not enough opps to close 3 deals.", like: "High", lBg: C.badgeRedBg, lFg: C.badgeRedFg, imp: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, sev: "Critical", sBg: C.badgeRedBg, sFg: C.badgeRedFg, mit: "SDR team hired. Referral program launched. If < 5 opps by Week 6, pivot strategy.", owner: "[VP Sales]", affects: "KR 2.2" },
            { risk: "Employee engagement continues to decline despite manager training.", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, imp: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, mit: "Pulse surveys + CEO listening sessions. If < 70% by Week 8, bring in external consultant.", owner: "[PeopleOps]", affects: "KR 3.2" },
            { risk: "VP Engineering role unfilled — key initiatives blocked.", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, imp: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, mit: "External recruiters engaged. Interim lead assigned. Deadline: Week 8.", owner: "[HR Dir.]", affects: "KR 3.1" },
            { risk: "NPS data access still blocked — detractor program can't launch.", like: "Low", lBg: C.badgeGreenBg, lFg: C.badgeGreenFg, imp: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, mit: "Escalated to CTO. Alternative: use support ticket sentiment as proxy.", owner: "[CX Lead]", affects: "KR 1.3" },
            { risk: "Key support agent quits during onboarding of new hires.", like: "Low", lBg: C.badgeGreenBg, lFg: C.badgeGreenFg, imp: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, sev: "Low", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, mit: "Cross-train 2 agents. Document all processes. Retention bonus for top performer.", owner: "[Tom R.]", affects: "KR 1.1" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#DC2626" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.lBg, r.lFg)}>{r.like}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.imp}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.affects}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHeatAndTips = () => (
    <div ref={heatRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={heatRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>🟥 RISK HEAT MAP</td></tr></thead>
            <thead><tr>
              <th style={{ ...S.thPrimary, width: "25%" }}></th>
              <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Low Impact</th>
              <th style={{ ...S.thPrimary, textAlign: "center" as const }}>Med Impact</th>
              <th style={{ ...S.thPrimary, textAlign: "center" as const }}>High Impact</th>
            </tr></thead>
            <tbody>
              <tr>
                <td style={{ ...S.td0, fontWeight: 700, fontSize: "10px" }}>High Likelihood</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#FEF3C7", fontSize: "10px" }}>Medium</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#FED7AA", fontSize: "10px", fontWeight: 700 }}>High</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#FECACA", fontSize: "10px", fontWeight: 800, color: "#DC2626" }}>CRITICAL (#1)</td>
              </tr>
              <tr>
                <td style={{ ...S.td0, fontWeight: 700, fontSize: "10px", backgroundColor: C.rowAlt }}>Med Likelihood</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#D1FAE5", fontSize: "10px" }}>Low</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#FEF3C7", fontSize: "10px" }}>Medium (#3,#4)</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#FED7AA", fontSize: "10px", fontWeight: 700 }}>High (#2)</td>
              </tr>
              <tr>
                <td style={{ ...S.td0, fontWeight: 700, fontSize: "10px" }}>Low Likelihood</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#D1FAE5", fontSize: "10px" }}>Low (#5)</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#D1FAE5", fontSize: "10px" }}>Low</td>
                <td style={{ ...S.td0, textAlign: "center" as const, backgroundColor: "#FEF3C7", fontSize: "10px" }}>Medium (#4)</td>
              </tr>
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💡 RISK MANAGEMENT TIPS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Every risk needs a trigger point.", detail: "\u201cIf X happens by Y date, we escalate / pivot.\u201d" },
                { color: accent, tip: "Review risks weekly.", detail: "Spend 2 min at each check-in: any risk changed?" },
                { color: "#D97706", tip: "Limit to 5–7 active risks.", detail: "If everything is a risk, nothing gets attention." },
                { color: "#059669", tip: "Closed risks are wins.", detail: "When mitigated, celebrate. The system is working." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Radar size={11} />Risk</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Radar size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Risk Radar</h2><p className="text-xs font-medium text-indigo-600">Top Risks This Quarter &bull; Proactive Leadership</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Risk, likelihood, impact, mitigation, and owner. See what could go wrong before it does.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderRisk()}{renderHeatAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRisk()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RiskRadarPage() { return <ThemeProvider><RiskRadarContent /></ThemeProvider>; }
