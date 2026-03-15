"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Rules + thresholds + escalation + examples", icon: LayoutDashboard },
  { id: "compact", label: "Quick Rules", desc: "Decision thresholds only", icon: AlignJustify },
];

function DecisionRulesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const threshRef = useRef<HTMLDivElement>(null);
  const escalRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DECISION RULES PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; What Requires a Decision Meeting?</td></tr>
    </tbody></table>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>CORE DECISION PRINCIPLES</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>These rules prevent two problems: (1) decisions that take too long, and (2) decisions made by the wrong person. Simple rules = fast teams.</p>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: "#059669" }}>Rule 1: If it can be reversed easily, decide fast.</strong> Don&apos;t schedule a meeting for things you can undo. Just decide and move.<br />
          <strong style={{ color: accent }}>Rule 2: If it affects more than one team, it needs a decision owner.</strong> Cross-team decisions must have ONE person who makes the call.<br />
          <strong style={{ color: "#D97706" }}>Rule 3: If it costs more than [$ threshold], it needs approval.</strong> Set a clear dollar amount. Below it = team decides. Above it = leadership decides.<br />
          <strong style={{ color: "#7C3AED" }}>Rule 4: If a Key Result goes Red, escalate within 48 hours.</strong> Don&apos;t wait for the monthly review if something is failing now.<br />
          <strong style={{ color: "#DC2626" }}>Rule 5: Silence is not agreement.</strong> If a decision is pending and nobody responds in 48 hours, the decision owner decides and moves forward.
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderThresh = () => (
    <div ref={threshRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>DECISION THRESHOLDS (Fill In Your Numbers)</div>
      <CopyButton targetRef={threshRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Set clear thresholds so people know when they can decide on their own and when they need to escalate. Fill in the brackets with your team&apos;s actual numbers.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Trigger / Situation</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Who Decides</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Timeframe</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Escalation Path</th>
        </tr></thead>
        <tbody>
          {[
            { trigger: "Spending under [$5,000]", who: "[Team Lead]", time: "Same day", esc: "No escalation needed" },
            { trigger: "Spending [$5,000 \u2013 $25,000]", who: "[Dept Head]", time: "48 hours", esc: "Notify CFO" },
            { trigger: "Spending over [$25,000]", who: "[CEO + CFO]", time: "1 week", esc: "Board if >$100K" },
            { trigger: "Hiring a new role", who: "[Dept Head + HR]", time: "1 week", esc: "CEO for director+" },
            { trigger: "Changing an OKR mid-quarter", who: "[OKR Owner + Leader]", time: "48 hours", esc: "Leadership team meeting" },
            { trigger: "Pausing or killing an initiative", who: "[Initiative Owner + Dept Head]", time: "48 hours", esc: "CEO if cross-team" },
            { trigger: "A Key Result goes Red (off track)", who: "[KR Owner]", time: "48 hours", esc: "Dept Head + weekly review" },
            { trigger: "Adding new work to the quarter", who: "[Team Lead]", time: "Same day", esc: "Must use Stop Doing List" },
            { trigger: "Vendor or contract change", who: "[Dept Head + Legal]", time: "1 week", esc: "CFO if >$50K" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.trigger}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#7C3AED", fontWeight: 600 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.esc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalAndExamples = () => (
    <div ref={escalRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={escalRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🚨 ESCALATION RULES</td></tr></thead>
            <tbody>
              {[
                { level: "1", when: "Team can\u2019t agree. Two good options, no clear winner.", who: "[Team Lead]", time: "24 hrs", color: "#059669" },
                { level: "2", when: "Cross-team dependency blocking progress.", who: "[Dept Head(s)]", time: "48 hrs", color: "#D97706" },
                { level: "3", when: "Budget, headcount, or strategic direction change.", who: "[CEO / COO]", time: "1 week", color: "#DC2626" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 800, fontSize: "14px", color: r.color }}>{r.level}</span> <strong>{r.when}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.who} &bull; <span style={{ color: r.color, fontWeight: 700 }}>{r.time}</span></span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💡 REAL-WORLD EXAMPLES</td></tr></thead>
            <tbody>
              {[
                { sit: "Marketing wants to spend $3K on a new tool.", result: "Under $5K \u2192 Team Lead decides. No meeting. Done." },
                { sit: "Sales wants to hire a new SDR ($80K).", result: "Hiring \u2192 Dept Head + HR. CEO notified. 1 week." },
                { sit: "Customer retention KR went Red.", result: "Red KR \u2192 Escalate 48h. Weekly review + Dept Head." },
                { sit: "Product wants major feature mid-quarter.", result: "New work \u2192 Must use Stop Doing List first." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ fontStyle: "italic" }}>{r.sit}</span><br />
                      <span style={{ fontSize: "9px", color: "#059669", fontWeight: 600 }}>{r.result}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Scale size={11} />Decisions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Scale size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision Rules Page</h2><p className="text-xs font-medium text-sky-600">What Requires a Decision Meeting?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines thresholds that trigger leadership decisions. Prevents churn and speeds up your team.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderRules()}{renderThresh()}{renderEscalAndExamples()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderThresh()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionRulesPage() { return <ThemeProvider><DecisionRulesContent /></ThemeProvider>; }
