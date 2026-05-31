"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, BookOpen } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Framework", desc: "Message builder + audience framing + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Builder", desc: "Message builder only", icon: AlignJustify },
];

function StoryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const builderRef = useRef<HTMLDivElement>(null);
  const framingRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STORYTELLING / MESSAGE FRAMING PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Persuasion Through Framing</td></tr>
    </tbody></table>
  );

  const renderBuilder = () => (
    <div ref={builderRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MESSAGE BUILDER</td></tr></tbody></table>
      <CopyButton targetRef={builderRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>The same information framed differently produces completely different reactions. Use this builder to craft your message BEFORE the meeting, email, or presentation. Start with your audience, then build your narrative.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Element</th>
          <th style={S.thPrimary}>Your Message</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Your Audience", value: "[Who are you speaking to? What\u2019s their role and what do they care about?]" },
            { label: "Their #1 Priority", value: "[What is the single thing they care about most right now? Frame everything around this.]" },
            { label: "The Core Message", value: "[One sentence. If they remember nothing else, what should they remember?]" },
            { label: "The Problem / Challenge", value: "[What\u2019s the situation? Frame it as THEIR problem, not yours.]" },
            { label: "The Impact If Ignored", value: "[What happens if we don\u2019t act? Make the cost of inaction clear.]" },
            { label: "Your Proposal / Solution", value: "[What do you recommend? Be specific and concrete.]" },
            { label: "Why This Is the Right Approach", value: "[Evidence, data, precedent. Why should they trust this recommendation?]" },
            { label: "What You Need From Them", value: "[Be explicit. Decision? Budget? Support? Time?]" },
            { label: "The Call to Action", value: "[One specific thing you want them to do after hearing your message.]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFraming = () => (
    <div ref={framingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>AUDIENCE-SPECIFIC FRAMING</td></tr></tbody></table>
      <CopyButton targetRef={framingRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>The same message needs different framing for different audiences. What resonates with your sponsor won&apos;t resonate with engineering. Adapt your language, emphasis, and evidence for each audience.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Audience</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>They Care About</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Frame It As</th>
          <th style={S.thPrimary}>Message for This Audience</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Evidence to Use</th>
        </tr></thead>
        <tbody>
          {[
            { who: "Exec / Sponsor", care: "ROI, risk, reputation, speed", frame: "Business impact", msg: "[Frame in terms of revenue, cost savings, competitive advantage, or risk reduction]", evidence: "Numbers, benchmarks, market data" },
            { who: "Finance", care: "Budget, forecasts, variance", frame: "Financial impact", msg: "[Frame in terms of cost, savings, ROI, budget impact, payback period]", evidence: "Financial models, projections" },
            { who: "Engineering", care: "Feasibility, tech debt, timeline", frame: "Technical solution", msg: "[Frame in terms of architecture, scalability, technical risk, and implementation approach]", evidence: "Technical POC, architecture diagrams" },
            { who: "Marketing", care: "Customer impact, brand, positioning", frame: "Customer value", msg: "[Frame in terms of customer benefit, market positioning, and competitive differentiation]", evidence: "Customer feedback, market research" },
            { who: "Team Members", care: "Workload, clarity, growth", frame: "Team benefit", msg: "[Frame in terms of what changes for them, why it matters, and how it makes their work better]", evidence: "Process improvements, reduced friction" },
            { who: "[Audience]", care: "[Their priorities]", frame: "[Your angle]", msg: "[Your message for this specific audience]", evidence: "[What will convince them]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#6366F1" }}>{r.care}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.frame}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.msg}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.evidence}</td>
              </tr>
            );
          })}
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>FRAMING PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Start with THEIR world, not yours.", detail: "\u201CYour Q2 targets are at risk because...\u201D > \u201CMy project needs more budget because...\u201D" },
                { color: "#0EA5E9", tip: "Make the cost of inaction vivid.", detail: "People are more motivated by loss avoidance than gain. Show what they\u2019ll LOSE if they don\u2019t act." },
                { color: "#8B5CF6", tip: "Use the \u201CAnd therefore\u201D test.", detail: "State your core message, then add \u201Cand therefore...\u201D \u2014 the action should follow logically." },
                { color: "#D97706", tip: "One message per conversation.", detail: "If you try to make 5 points, they\u2019ll remember zero. Pick the ONE thing that matters most." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>STORYTELLING STRUCTURES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Situation \u2192 Complication \u2192 Resolution (SCR)", detail: "Classic consulting structure. Here\u2019s where we are, here\u2019s what\u2019s threatening it, here\u2019s what to do." },
                { color: "#EA580C", tip: "Problem \u2192 Impact \u2192 Solution \u2192 Ask (PISA)", detail: "Lead with the problem, show the impact, propose a solution, make your ask." },
                { color: "#D97706", tip: "Before \u2192 After \u2192 Bridge (BAB)", detail: "Show the current pain, paint the better future, then explain how to get there." },
                { color: "#6366F1", tip: "What? So What? Now What?", detail: "Simple and powerful. State the fact, explain why it matters, then say what to do about it." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><BookOpen size={11} />Persuasion</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Handshake size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Storytelling / Message Framing</h2><p className="text-xs font-medium text-emerald-600">Persuasion &bull; Frame Your Message for Maximum Impact</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The same information framed differently produces completely different reactions. This page helps you craft your message before any important communication &mdash; starting with your audience&apos;s perspective, building your narrative, and adapting it for different stakeholder groups.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderBuilder()}{renderFraming()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderBuilder()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StorytellingMessageFramingPage() { return <ThemeProvider><StoryContent /></ThemeProvider>; }
