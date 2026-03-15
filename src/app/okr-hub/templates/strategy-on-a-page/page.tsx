"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full SOaP", desc: "All sections + examples + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Builder", desc: "Fill-in template only", icon: AlignJustify },
];

function SOaPContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const builderRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STRATEGY ON A PAGE (SOaP) BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Strategy Foundation</td></tr>
    </tbody></table>
  );

  const renderBuilder = () => (
    <div ref={builderRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>YOUR STRATEGY ON A PAGE (Fill This In)</div>
      <CopyButton targetRef={builderRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A SOaP (Strategy on a Page) forces you to explain your entire strategy in one page. If you can&apos;t explain it simply, it&apos;s too complicated. Fill in each box below.</p>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Who We Serve</td><td style={S.td0}>[Your target customers/users. Be specific. Who gets the MOST value from what you do?]</td></tr>
        <tr><td style={S.tdLabelAlt}>The Problem We Solve</td><td style={S.tdAlt}>[What pain, frustration, or gap exists that your product/service fixes? Keep it one sentence.]</td></tr>
        <tr><td style={S.tdLabel}>Our Solution</td><td style={S.td0}>[What we provide and how it solves the problem. What makes us different from alternatives?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Why We Win (Moat)</td><td style={S.tdAlt}>[What is our unfair advantage? Why can\u2019t competitors easily copy us? Speed? Data? Brand? Network?]</td></tr>
        <tr><td style={S.tdLabel}>How We Make Money</td><td style={S.td0}>[Revenue model: subscription, one-time, usage-based? Average deal size? Key revenue drivers?]</td></tr>
        <tr><td style={S.tdLabelAlt}>This Year&apos;s Big Bets</td><td style={S.tdAlt}>[2\u20134 strategic themes for the year. These drive all quarterly OKRs.]</td></tr>
        <tr><td style={S.tdLabel}>North Star Metric</td><td style={S.td0}>[The ONE number that best represents the value we deliver. Everything else supports it.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Risks</td><td style={S.tdAlt}>[Top 2\u20133 things that could derail us. Be honest.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderExampleAndTips = () => (
    <div ref={exampleRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={exampleRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "60%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>📝 EXAMPLE: FILLED-IN SOaP</td></tr></thead>
            <tbody>
              <tr><td style={{ ...S.tdLabel, width: "25%" }}>Who We Serve</td><td style={S.td0}>Mid-market B2B companies (50–500 employees) struggling with meetings.</td></tr>
              <tr><td style={S.tdLabelAlt}>Problem</td><td style={S.tdAlt}>31 hrs/mo wasted in unproductive meetings. Decisions lost.</td></tr>
              <tr><td style={S.tdLabel}>Solution</td><td style={S.td0}>Meeting mgmt platform: agendas, decisions, actions, follow-ups.</td></tr>
              <tr><td style={S.tdLabelAlt}>Why We Win</td><td style={S.tdAlt}>Only platform combining meeting structure + decision tracking + automation.</td></tr>
              <tr><td style={S.tdLabel}>Revenue</td><td style={S.td0}>SaaS $15/user/mo. Avg deal $18K ARR. Enterprise $50K+.</td></tr>
              <tr><td style={S.tdLabelAlt}>Big Bets</td><td style={S.tdAlt}>1) CX 2) Enterprise Revenue 3) Ops Excellence 4) Team &amp; Culture</td></tr>
              <tr><td style={S.tdLabel}>North Star</td><td style={S.td0}>Weekly Active Teams (2+ structured meetings/week).</td></tr>
              <tr><td style={S.tdLabelAlt}>Key Risks</td><td style={S.tdAlt}>1) AI competitor 2) Long enterprise sales cycle 3) Eng capacity</td></tr>
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "40%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>💡 TIPS FOR A GREAT SOaP</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Keep it to ONE page.", detail: "If it takes more, you haven't simplified enough." },
                { color: accent, tip: "Use plain language.", detail: "A new hire should understand in 5 minutes." },
                { color: "#D97706", tip: "Update once per year.", detail: "If changing quarterly, strategy isn't solid." },
                { color: "#DC2626", tip: "Share it widely.", detail: "Every team member should know this page." },
                { color: "#0EA5E9", tip: "\u201cSo What?\u201d test.", detail: "After each answer, ask why it matters." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><FileText size={11} />SOaP</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><FileText size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Strategy on a Page (SOaP) Builder</h2><p className="text-xs font-medium text-violet-600">Your Entire Strategy &mdash; One Page</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A simple strategy summary: goals, audiences, value, differentiation. Makes strategy readable for everyone on the team.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderBuilder()}{renderExampleAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderBuilder()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StrategyOnAPagePage() { return <ThemeProvider><SOaPContent /></ThemeProvider>; }
