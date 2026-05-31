"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Target } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Motivations + framing guide + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Motivations only", icon: AlignJustify },
];

function CareAboutContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const careRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&quot;WHAT THEY CARE ABOUT&quot; NOTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Speak Their Language</td></tr>
    </tbody></table>
  );

  const renderCare = () => (
    <div ref={careRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; WHAT MATTERS TO THEM</td></tr></tbody></table>
      <CopyButton targetRef={careRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Understanding what someone cares about is the single most powerful relationship tool. Fill this out gradually as you learn more. Update after every meaningful interaction.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Area</th>
          <th style={S.thPrimary}>Your Notes</th>
          <th style={{ ...S.thPrimary, width: "28%" }}>How to Use This</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Their Top KPIs", value: "[Revenue growth? Customer satisfaction? Cost reduction? Team velocity?]", how: "Frame your updates in terms of THEIR metrics. If you help their KPIs, you\u2019re invaluable." },
            { label: "Their Goals This Quarter", value: "[What are they trying to achieve in the next 90 days?]", how: "Align your requests to their quarterly goals. They\u2019ll say yes faster." },
            { label: "Their Annual Goals", value: "[What does success look like for them this year?]", how: "Connect your work to their annual narrative. Show how you help them win." },
            { label: "Their Biggest Constraint", value: "[Budget? Headcount? Time? Technology? Political support?]", how: "Never ask for something that makes their constraint worse. Work within it." },
            { label: "What Keeps Them Up", value: "[Their top worry or stress point right now]", how: "If you can solve their biggest worry, you become their most trusted partner." },
            { label: "What They Want From You", value: "[Updates? Deliverables? Decisions? Problem-solving? Support?]", how: "Deliver this consistently and you\u2019ll never have a trust problem." },
            { label: "Their Definition of Success", value: "[What would make them say \u201Cthat went well\u201D?]", how: "Use their exact language when reporting progress. Mirror their success criteria." },
            { label: "Political Realities", value: "[Competing priorities, rival teams, restructuring, etc.]", how: "Understand the political landscape so you frame requests they can say yes to." },
            { label: "Hot-Button Topics", value: "[Topics that get an immediate emotional reaction]", how: "Know what excites them (leverage it) and what triggers them (avoid it)." },
            { label: "Their Success Language", value: "[\u201CROI,\u201D \u201Ccustomer impact,\u201D \u201Cspeed,\u201D \u201Cquality\u201D \u2014 mirror their words]", how: "Use THEIR vocabulary in updates and presentations. It signals alignment." },
            { label: "What They DON\u2019T Care About", value: "[Topics or details they don\u2019t want to hear about]", how: "Knowing what to exclude is as valuable as knowing what to include." },
            { label: "What They Want From Leadership", value: "[More resources? Clearer direction? Recognition?]", how: "Understanding their upward pressures helps you empathize and frame requests better." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.how}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFraming = () => (
    <div ref={frameRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#0EA5E9")}>FRAMING GUIDE &mdash; HOW TO PRESENT YOUR WORK TO THEM</td></tr></tbody></table>
      <CopyButton targetRef={frameRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Use this section to pre-plan how you frame updates, requests, and presentations for this specific stakeholder. The same information presented differently gets very different reactions.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Situation</th>
          <th style={S.thPrimary}>How to Frame It for This Person</th>
        </tr></thead>
        <tbody>
          {[
            { situation: "Sharing good news", frame: "[Lead with the metric they care about. e.g., \u201CWe hit 120% of the target you asked about.\u201D]" },
            { situation: "Sharing bad news", frame: "[Lead with the impact, then the plan. e.g., \u201CWe\u2019re going to miss by 10%, here\u2019s why and what we\u2019re doing about it.\u201D]" },
            { situation: "Asking for a decision", frame: "[Give 2\u20133 options with your recommendation. Frame in their success language. Make it easy to say yes.]" },
            { situation: "Asking for resources", frame: "[Show ROI in their terms. Connect to their goals. Show what happens if they DON\u2019T invest.]" },
            { situation: "Giving a status update", frame: "[Use their preferred format and length. Lead with what they care about, not what you\u2019ve been busy doing.]" },
            { situation: "Escalating a risk", frame: "[Be direct and factual. Show you\u2019ve already started mitigation. Ask for specific help.]" },
            { situation: "[Enter situation]", frame: "[How to frame for this stakeholder]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#0EA5E9" }}>{r.situation}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.frame}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>HOW TO LEARN WHAT THEY CARE ABOUT</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "Listen more than you talk.", detail: "In your first 3 meetings, aim for a 30/70 talk/listen ratio. Their words reveal their priorities." },
                { color: "#059669", tip: "Ask: \u201CWhat does success look like for you?\u201D", detail: "This one question unlocks more insight than 10 status updates." },
                { color: "#0EA5E9", tip: "Watch what they react to in meetings.", detail: "When their energy changes \u2014 up or down \u2014 that\u2019s a signal of what matters." },
                { color: "#D97706", tip: "Read their OKRs or performance goals.", detail: "If you can find them, their formal goals tell you exactly how they\u2019re measured." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Assuming they care about what YOU care about.", detail: "Your priorities \u2260 their priorities. Always lead with what matters to THEM." },
                { color: "#EA580C", tip: "Not updating this page.", detail: "Priorities shift with org changes, market conditions, and new mandates. Review quarterly." },
                { color: "#D97706", tip: "Talking about your work, not their outcomes.", detail: "\u201CWe built 3 features\u201D means nothing. \u201CWe reduced churn by 8%\u201D means everything." },
                { color: "#6366F1", tip: "Ignoring political realities.", detail: "What they SAY they care about and what they ACTUALLY care about may differ. Read between the lines." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Target size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">&quot;What They Care About&quot; Notes</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; Speak Their Language</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The most powerful stakeholder skill: knowing what each person actually cares about and framing your work in those terms. This template captures their goals, constraints, hot buttons, and success language so every interaction resonates.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCare()}{renderFraming()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCare()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WhatTheyCareAboutPage() { return <ThemeProvider><CareAboutContent /></ThemeProvider>; }
