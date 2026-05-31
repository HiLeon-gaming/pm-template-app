"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Ruler, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Scale + reference stories", icon: LayoutDashboard },
  { id: "compact", label: "Quick Scale", desc: "Point scale only", icon: AlignJustify },
];

function EstimationGuideContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const refRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📏 ESTIMATION GUIDE + REFERENCE STORIES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Estimation Method</td><td style={{ ...S.td0, width: "32%" }}>[Planning Poker / T-Shirt / Fibonacci]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Avg Velocity</td><td style={S.tdAlt}>[## pts/sprint]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderScale = () => (
    <div ref={scaleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 POINT SCALE DEFINITION</td></tr></tbody></table>
      <CopyButton targetRef={scaleRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Story points measure complexity + effort + uncertainty, NOT hours. Use Fibonacci: 1, 2, 3, 5, 8, 13.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Points</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>T-Shirt</th>
          <th style={S.thPrimary}>What It Means</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Confidence</th>
          <th style={{ ...S.thPrimary, width: "16%" }}>Typical Work</th>
        </tr></thead>
        <tbody>
          {[
            { pts: "1", ts: "XS", desc: "Trivial change. No unknowns. Copy/config/text update.", conf: "Very High", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, work: "Text change, toggle" },
            { pts: "2", ts: "S", desc: "Small, well-understood. Single component, clear AC.", conf: "High", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, work: "Simple form field" },
            { pts: "3", ts: "M", desc: "Moderate complexity. Multiple components, some decisions.", conf: "Medium", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, work: "New page with API call" },
            { pts: "5", ts: "L", desc: "Significant work. Multiple touchpoints, some unknowns.", conf: "Medium", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, work: "Full feature with tests" },
            { pts: "8", ts: "XL", desc: "Large and complex. Multiple integrations, higher risk.", conf: "Low", cBg: C.badgeRedBg, cFg: C.badgeRedFg, work: "Payment integration" },
            { pts: "13", ts: "XXL", desc: "Very large. Should probably be split. High uncertainty.", conf: "Very Low", cBg: C.badgeRedBg, cFg: C.badgeRedFg, work: "Consider splitting" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", color: accent }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px" }}>{r.ts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.cBg, r.cFg)}>{r.conf}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: C.textMuted }}>{r.work}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRef = () => (
    <div ref={refRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📖 REFERENCE STORIES (CALIBRATION)</td></tr></tbody></table>
      <CopyButton targetRef={refRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Anchor stories the team has already completed. Use these as comparison points when estimating new work.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Pts</th>
          <th style={S.thSecondary}>Reference Story</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Epic</th>
          <th style={{ ...S.thSecondary, width: "28%" }}>Why This Size?</th>
        </tr></thead>
        <tbody>
          {[
            { pts: "1", story: "[Update checkout button text from “Buy” to “Place Order”]", epic: "[Checkout v1]", why: "[Single text change, no logic, no testing needed beyond visual check]" },
            { pts: "2", story: "[Add email validation to signup form]", epic: "[Onboarding]", why: "[One component, clear regex rule, one test case]" },
            { pts: "3", story: "[Build order confirmation page with dynamic order details]", epic: "[Checkout v1]", why: "[New page, API call to fetch order, some conditional rendering]" },
            { pts: "5", story: "[Implement Apple Pay checkout flow]", epic: "[Payments]", why: "[New vendor SDK, payment processing logic, error handling, 3+ ACs]" },
            { pts: "8", story: "[Build real-time order tracking with status updates]", epic: "[Post-purchase]", why: "[WebSocket integration, shipping API, multiple states, complex UI]" },
            { pts: "—", story: "[Add your team’s reference story]", epic: "", why: "" },
            { pts: "—", story: "[Add your team’s reference story]", epic: "", why: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{r.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.epic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💡 ESTIMATION TIPS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ DO</td></tr></thead>
            <tbody>
              {["Compare against reference stories, not clock hours", "Include testing, code review, and deployment in your estimate", "Use Planning Poker — reveal simultaneously to avoid anchoring", "Flag stories over 8 pts for splitting", "Re-estimate if scope changes after planning"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🚫 DON&apos;T</td></tr></thead>
            <tbody>
              {["Don’t convert points to hours — they’re relative, not absolute", "Don’t let one person dominate estimation — everyone votes", "Don’t estimate without understanding acceptance criteria", "Don’t use velocity as a performance metric — it’s for planning", "Don’t compare velocity across teams — it’s team-specific"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Ruler size={11} />Estimation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Ruler size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Estimation Guide + Reference Stories</h2><p className="text-xs font-medium text-red-600">Calibrate Your Team&apos;s Estimates</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Point scale definition, reference stories for calibration, and estimation do&apos;s and don&apos;ts. Makes estimates more consistent.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderScale()}{renderRef()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderScale()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function EstimationGuidePage() { return <ThemeProvider><EstimationGuideContent /></ThemeProvider>; }
