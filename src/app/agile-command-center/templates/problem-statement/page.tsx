"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, SearchCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Analysis", desc: "Problems + Personas", icon: LayoutDashboard },
  { id: "compact", label: "Summary", desc: "Problem only", icon: AlignJustify },
];

function ProblemStatementContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const personaRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔍 PROBLEM STATEMENT + TARGET USERS / PERSONAS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Product Strategy &amp; Value</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Product Owner</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Validated By</td><td style={S.tdAlt}>[User research / stakeholder interview / data analysis]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderProblem = () => (
    <div ref={problemRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 PROBLEM STATEMENT</div>
      <CopyButton targetRef={problemRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>The Problem</td><td style={{ ...S.td0, height: "44px" }}>[Describe the core problem — what is painful, slow, broken, or missing?]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Who is affected?</td><td style={{ ...S.tdAlt, height: "36px" }}>[Which users, teams, or segments experience this pain?]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Impact if unsolved</td><td style={{ ...S.td0, height: "36px" }}>[Revenue loss, customer churn, wasted time, competitive risk]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Current workaround</td><td style={{ ...S.tdAlt, height: "36px" }}>[How do users cope today? Manual processes, competitor tools, etc.]</td></tr>
        <tr><td style={{ ...S.tdLabel, fontWeight: 700, color: accent }}>Success = Solved when</td><td style={{ ...S.td0, fontWeight: 600, height: "36px" }}>[What measurable outcome proves this problem is solved?]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ backgroundColor: accent + "15", padding: "12px 16px", fontFamily: S.font, fontSize: "12px", fontWeight: 700, border: `1.5px solid ${accent}40`, textAlign: "center" as const, color: C.primary }}>
          💡 One-Line Problem: <span style={{ fontWeight: 400 }}>[User] needs [solution] because [problem] which causes [impact]</span>
        </td></tr>
      </tbody></table>
    </div>
  );

  const personaCard = (name: string, emoji: string, color: string, attrs: { label: string; value: string }[]) => (
    <table style={S.tbl}>
      <thead><tr><td style={{ backgroundColor: color, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{emoji} {name}</td></tr></thead>
      <tbody>
        {attrs.map((a, i) => (
          <tr key={i}>
            <td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>
              <strong style={{ color: C.primary }}>{a.label}:</strong> {a.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderPersonas = () => (
    <div ref={personaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>👤 TARGET USER PERSONAS</div>
      <CopyButton targetRef={personaRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Define 2–4 personas. Focus on their goals, frustrations, and what &ldquo;success&rdquo; means for them.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px", paddingBottom: "8px" }}>
          {personaCard("PERSONA 1: [Name / Role]", "👤", "#059669", [
            { label: "Who", value: "[e.g., Mobile shopper, age 25-40, tech-savvy]" },
            { label: "Goal", value: "[e.g., Complete purchases quickly on mobile]" },
            { label: "Frustration", value: "[e.g., Current checkout takes 6+ steps, often times out]" },
            { label: "Frequency", value: "[e.g., 3-4 purchases per week]" },
            { label: "Success metric", value: "[e.g., Checkout in under 30 seconds]" },
          ])}
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px", paddingBottom: "8px" }}>
          {personaCard("PERSONA 2: [Name / Role]", "👤", "#0891B2", [
            { label: "Who", value: "[e.g., Operations manager, manages 50+ daily orders]" },
            { label: "Goal", value: "[e.g., Real-time visibility into order status]" },
            { label: "Frustration", value: "[e.g., Currently checks 3 different systems to get status]" },
            { label: "Frequency", value: "[e.g., Checks dashboard 10+ times per day]" },
            { label: "Success metric", value: "[e.g., Single dashboard with <5 sec refresh]" },
          ])}
        </td>
      </tr></tbody></table>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          {personaCard("PERSONA 3: [Name / Role]", "👤", "#D946EF", [
            { label: "Who", value: "[Add persona details]" },
            { label: "Goal", value: "" },
            { label: "Frustration", value: "" },
            { label: "Frequency", value: "" },
            { label: "Success metric", value: "" },
          ])}
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          {personaCard("PERSONA 4: [Name / Role]", "👤", "#EA580C", [
            { label: "Who", value: "[Add persona details]" },
            { label: "Goal", value: "" },
            { label: "Frustration", value: "" },
            { label: "Frequency", value: "" },
            { label: "Success metric", value: "" },
          ])}
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderJourney = () => (
    <div ref={journeyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🗺️ HIGH-LEVEL USER JOURNEY (PRIMARY PERSONA)</div>
      <CopyButton targetRef={journeyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Step</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Stage</th>
          <th style={S.thPrimary}>What User Does</th>
          <th style={{ ...S.thPrimary, width: "24%" }}>Pain Point</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Emotion</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", stage: "Discover", does: "[How they find the product]", pain: "[e.g., Hard to find on mobile]", emotion: "😐" },
            { step: "2", stage: "Onboard", does: "[First experience / setup]", pain: "[e.g., 8-step registration]", emotion: "😤" },
            { step: "3", stage: "Use (Core)", does: "[Primary task they complete]", pain: "[e.g., Checkout flow too long]", emotion: "😟" },
            { step: "4", stage: "Get Value", does: "[Moment they get the benefit]", pain: "[e.g., Delayed confirmation]", emotion: "😊" },
            { step: "5", stage: "Return", does: "[Why they come back]", pain: "[e.g., No saved preferences]", emotion: "😐" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: accent }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px" }}>{r.stage}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.does}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.pain}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px" }}>{r.emotion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderProblem()}{renderPersonas()}{renderJourney()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderProblem()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><SearchCheck size={11} />Product Strategy</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><SearchCheck size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Problem Statement + Target Users / Personas</h2><p className="text-xs font-medium text-violet-600">Who We&apos;re Helping &amp; What Pain We&apos;re Solving</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured problem definition, persona cards, and user journey mapping. Improves prioritization and story clarity.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ProblemStatementPage() { return <ThemeProvider><ProblemStatementContent /></ThemeProvider>; }
