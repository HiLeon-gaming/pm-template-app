"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, AlertTriangle } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Context + options + recommendation + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Prep", desc: "Context + recommendation only", icon: AlignJustify },
];

function EscalationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ESCALATION PREP PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Escalate Professionally</td></tr>
    </tbody></table>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>ESCALATION CONTEXT</td></tr></tbody></table>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Escalation is not failure &mdash; it&apos;s a professional tool for getting blocked work moving. Fill this out BEFORE the escalation conversation so you present a clear, structured case. Never escalate emotionally. Always escalate with data, options, and a recommendation.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "What Needs Escalating", value: "[One sentence: What is the specific issue that requires someone more senior to resolve?]" },
            { label: "Why It\u2019s Blocked", value: "[What have you tried? Why can\u2019t you resolve this at your level?]" },
            { label: "Impact If Not Resolved", value: "[What happens if this stays blocked? Timeline impact? Cost? Risk? Be specific with numbers.]" },
            { label: "Deadline for Resolution", value: "[By when does this need to be resolved to avoid the impact above?]" },
            { label: "Who You\u2019re Escalating To", value: "[Name, role. Why this person? What authority do they have to resolve it?]" },
            { label: "Who Else Needs to Know", value: "[Who should be informed about the escalation? Sponsor? Affected stakeholders?]" },
            { label: "What You\u2019ve Already Done", value: "[Show your work. What steps have you taken to resolve this before escalating?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent, width: "20%" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOptions = () => (
    <div ref={optionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>OPTIONS &amp; RECOMMENDATION</td></tr></tbody></table>
      <CopyButton targetRef={optionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Never escalate with just a problem. Come with options and a clear recommendation. This shows you&apos;ve thought it through and makes the decision easier for the person you&apos;re escalating to.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Option</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Pros</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Cons</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Your Pick?</th>
        </tr></thead>
        <tbody>
          {[
            { opt: "A", desc: "Have Engineering Director mandate API priority for James\u2019s team this sprint.", pros: "Fast resolution. Unblocks us immediately.", cons: "May create friction with Eng. team. Overrides their planning.", pick: "\u2b50 YES" },
            { opt: "B", desc: "Reduce scope to remove API dependency. Defer that feature to Phase 2.", pros: "No conflict. We control it.", cons: "Delivers less value. Users lose a key feature.", pick: "" },
            { opt: "C", desc: "Wait 2 more weeks for natural sprint rotation.", pros: "No escalation needed.", cons: "2-week delay. Cascading impact on Phase 2.", pick: "" },
            { opt: "[D]", desc: "[Alternative option]", pros: "[Benefits]", cons: "[Drawbacks]", pick: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.opt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#059669" }}>{r.pros}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626" }}>{r.cons}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 800, color: "#D97706" }}>{r.pick}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr><td style={{ ...S.td0, backgroundColor: "#EDE9FE", fontSize: "10px", fontWeight: 700, color: accent, width: "20%" }}>Your Recommendation</td>
          <td style={{ ...S.td0, backgroundColor: "#EDE9FE", fontSize: "10px" }}>[Option A \u2014 because speed matters more than friction here. The 2-week delay cascades into Phase 2. I\u2019ve already spoken to James and he\u2019s open to it if his Director agrees.]</td></tr>
          <tr><td style={{ ...S.td0, fontSize: "10px", fontWeight: 700, color: accent, width: "20%" }}>Decision Needed By</td>
          <td style={{ ...S.td0, fontSize: "10px" }}>[Date \u2014 because sprint planning happens on [day] and we need the decision before then.]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>ESCALATION PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Escalation is a professional tool, not a last resort.", detail: "Senior leaders EXPECT you to escalate when you\u2019re blocked. Not escalating is the mistake." },
                { color: "#059669", tip: "Warn the person being escalated about.", detail: "Say: \u201CI need to escalate this to [Director] to get it moving. Wanted you to know.\u201D No surprises." },
                { color: "#0EA5E9", tip: "Always show what you\u2019ve already tried.", detail: "This proves you\u2019re not being lazy. You exhausted your options before going up." },
                { color: "#D97706", tip: "Focus on the issue, not the person.", detail: "\u201CThe API work is blocked\u201D not \u201CJames is blocking us.\u201D Keep it professional." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>ESCALATION MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Escalating emotionally.", detail: "Wait until you\u2019re calm. Write this prep sheet. Then escalate with facts." },
                { color: "#EA580C", tip: "Escalating without warning the other party.", detail: "Blindsiding someone with an escalation destroys the relationship. Always tell them first." },
                { color: "#D97706", tip: "Escalating without options.", detail: "Don\u2019t just dump a problem. Come with options and a recommendation." },
                { color: "#6366F1", tip: "Waiting too long to escalate.", detail: "If you\u2019ve been blocked for >1 week with no progress, it\u2019s time. Don\u2019t wait for it to get worse." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
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
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><AlertTriangle size={11} />Escalation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Handshake size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Escalation Prep Page</h2><p className="text-xs font-medium text-violet-600">Professional Escalation &bull; Context + Options + Recommendation</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Escalation is not failure &mdash; it&apos;s a professional tool for getting blocked work moving. Use this page to prepare a clear, structured case with context, impact, options, and a recommendation before you escalate. Never escalate emotionally. Always escalate with data.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderContext()}{renderOptions()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderContext()}{renderOptions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function EscalationPrepPage() { return <ThemeProvider><EscalationContent /></ThemeProvider>; }
