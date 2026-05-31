"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Star, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Definition", desc: "Definition + supporting metrics + examples + test", icon: LayoutDashboard },
  { id: "compact", label: "Quick Definition", desc: "Core metric only", icon: AlignJustify },
];

function NorthStarContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const defRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>NORTH STAR METRIC DEFINITION</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Strategy Foundation</td></tr>
    </tbody></table>
  );

  const renderDef = () => (
    <div ref={defRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>YOUR NORTH STAR METRIC</td></tr></tbody></table>
      <CopyButton targetRef={defRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A North Star Metric is the ONE number that best represents the value your company delivers to customers. When this number goes up, it means customers are getting more value, and your business is growing. Everything else supports it.</p>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "25%" }}>North Star Metric</td><td style={{ ...S.td0, fontWeight: 800, fontSize: "13px", color: accent }}>[Your metric name — e.g., &ldquo;Weekly Active Teams&rdquo;]</td></tr>
        <tr><td style={S.tdLabelAlt}>What It Measures</td><td style={S.tdAlt}>[Plain English: what does this number actually represent?]</td></tr>
        <tr><td style={S.tdLabel}>Why This Metric?</td><td style={S.td0}>[Why is this the BEST single indicator of value delivery?]</td></tr>
        <tr><td style={S.tdLabelAlt}>How It&apos;s Calculated</td><td style={S.tdAlt}>[Formula or definition. Be precise enough that anyone could calculate it.]</td></tr>
        <tr><td style={S.tdLabel}>Data Source</td><td style={S.td0}>[Where does this data come from? Which system/dashboard?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Update Frequency</td><td style={S.tdAlt}>[Daily? Weekly? Real-time?]</td></tr>
        <tr><td style={S.tdLabel}>Current Value</td><td style={{ ...S.td0, fontWeight: 700, color: "#D97706" }}>[Today&apos;s number]</td></tr>
        <tr><td style={S.tdLabelAlt}>12-Month Target</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#059669" }}>[Where we want to be in 12 months]</td></tr>
        <tr><td style={S.tdLabel}>Owner</td><td style={S.td0}>[Who is accountable for this metric?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderSupport = () => (
    <div ref={supportRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>SUPPORTING METRICS (Input Metrics)</td></tr></tbody></table>
      <CopyButton targetRef={supportRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your North Star doesn&apos;t move by magic. These &ldquo;input metrics&rdquo; are the levers you pull to make it go up. Think of them as the ingredients that create the result.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Supporting Metric</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>How It Drives the North Star</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "[New customer sign-ups per week]", drive: "More sign-ups = more potential active teams", current: "[50]", target: "[120]", owner: "[Marketing]" },
            { metric: "[Onboarding completion rate]", drive: "Better onboarding = more teams that actually use the product", current: "[45%]", target: "[75%]", owner: "[Product]" },
            { metric: "[Feature adoption rate (meeting templates)]", drive: "Teams using templates = teams getting value = retention", current: "[30%]", target: "[60%]", owner: "[Product]" },
            { metric: "[Customer support resolution time]", drive: "Fast support = happier teams = less churn", current: "[18 hrs]", target: "[4 hrs]", owner: "[Support]" },
            { metric: "[Monthly churn rate]", drive: "Lower churn = more teams stay active", current: "[8%]", target: "[3%]", owner: "[CS]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.drive}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderExamplesAndTest = () => (
    <div ref={examplesRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={examplesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#E0F2FE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>🌟 FAMOUS EXAMPLES</td></tr></thead>
            <tbody>
              {[
                { co: "Spotify", nsm: "Monthly Active Listeners", why: "Listening = value = retention = revenue." },
                { co: "Airbnb", nsm: "Nights Booked", why: "Measures host + guest activity. More nights = more value." },
                { co: "Slack", nsm: "Messages Sent in Teams", why: "Active teams = engaged users = sticky product." },
                { co: "HubSpot", nsm: "Weekly Active Teams 5+ Features", why: "Depth of usage predicts retention + expansion." },
                { co: "Netflix", nsm: "Monthly Viewing Hours", why: "More watching = less churn = justified subscription." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: "#0EA5E9" }}>{r.co}</strong> <strong>{r.nsm}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.why}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>✅ QUICK TEST</td></tr></thead>
            <tbody>
              {[
                "Measures VALUE to customers (not just revenue)?",
                "Every team can influence it?",
                "When it goes up, revenue follows?",
                "Measurable at least weekly?",
                "Explainable in one sentence?",
                "New employee would understand why it matters?",
                "Helps prioritize decisions?",
              ].map((q, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ fontSize: "14px" }}>&#9744;</span> {q}
                    </td>
                  </tr>
                );
              })}
              <tr><td style={{ ...S.td0, padding: "8px 10px", fontSize: "9px", fontWeight: 600, color: "#059669" }}>All 7 = Great! &nbsp; 5\u20136 = Refine it. &nbsp; Under 5 = Rethink.</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Star size={11} />North Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Star size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">North Star Metric Definition</h2><p className="text-xs font-medium text-violet-600">The ONE Number That Matters Most</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your single most important outcome metric + why it matters. Aligns every team around one shared definition of success.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDef()}{renderSupport()}{renderExamplesAndTest()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDef()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function NorthStarMetricPage() { return <ThemeProvider><NorthStarContent /></ThemeProvider>; }
