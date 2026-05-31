"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Scale } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Positions + tradeoffs + BATNA + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Prep", desc: "Positions + tradeoffs only", icon: AlignJustify },
];

function NegotiationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<HTMLDivElement>(null);
  const tradeRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>NEGOTIATION PREP SHEET</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Know Your Position Before You Walk In</td></tr>
    </tbody></table>
  );

  const renderPositions = () => (
    <div ref={posRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>NEGOTIATION POSITIONS</td></tr></tbody></table>
      <CopyButton targetRef={posRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Before any negotiation, know exactly what you want, what they want, and where the overlap is. The PM who walks in without a prep sheet loses. Fill this out before every negotiation &mdash; resource requests, scope discussions, timeline negotiations, vendor talks.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Element</th>
          <th style={{ ...S.thPrimary, width: "37%" }}>Your Position</th>
          <th style={{ ...S.thPrimary, width: "38%" }}>Their Position (Best Estimate)</th>
        </tr></thead>
        <tbody>
          {[
            { label: "What You Want (Ideal)", yours: "[Your best-case outcome. Be specific.]", theirs: "[What they ideally want. Think from their perspective.]" },
            { label: "What You’ll Accept (Minimum)", yours: "[Your walk-away line. What’s the minimum you can live with?]", theirs: "[What’s the minimum they’d accept?]" },
            { label: "Your BATNA", yours: "[Best Alternative To Negotiated Agreement. What’s your plan B if this fails?]", theirs: "[Their alternative if they don’t agree with you. How strong is it?]" },
            { label: "What You Can Offer", yours: "[What do you have that they value? Flexibility, resources, timeline?]", theirs: "[What can they offer you? Budget, headcount, priority?]" },
            { label: "Their Key Concern", yours: "[What are they most worried about?]", theirs: "[What do they think YOU’RE most worried about?]" },
            { label: "Your Opening Move", yours: "[How will you start the conversation? What’s your framing?]", theirs: "[How do you expect them to open?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.yours}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.theirs}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTradeoffs = () => (
    <div ref={tradeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>TRADEOFF MATRIX &mdash; WHAT CAN YOU FLEX?</td></tr></tbody></table>
      <CopyButton targetRef={tradeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every negotiation has multiple dimensions. Know which ones you can flex on and which are non-negotiable. If you give on timeline, can you hold on scope? If they give on budget, can you flex on approach?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Dimension</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Flexibility</th>
          <th style={S.thPrimary}>Your Range</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>If You Give Here, Get This</th>
        </tr></thead>
        <tbody>
          {[
            { dim: "Timeline", flex: "Medium", range: "Can extend 2 weeks max. Beyond that, Phase 2 is at risk.", give: "If we extend timeline, need confirmation of full team allocation." },
            { dim: "Budget", flex: "Low", range: "Already at minimum viable. Could cut $5K from training line.", give: "If budget is cut, scope must reduce proportionally." },
            { dim: "Scope", flex: "High", range: "Phase 2 features are deferrable. Core platform is non-negotiable.", give: "Defer Phase 2 features in exchange for keeping timeline." },
            { dim: "Resources", flex: "Medium", range: "Need minimum 3 FTEs. Could work with 2.5 if senior.", give: "If fewer resources, need longer timeline or reduced scope." },
            { dim: "Approach", flex: "High", range: "Can switch from custom build to vendor solution for module 3.", give: "Vendor approach saves time but costs more in licensing." },
            { dim: "[Dimension]", flex: "[H/M/L]", range: "[Your acceptable range]", give: "[Reciprocal concession you’d want]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const fc = r.flex === "High" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.flex === "Medium" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.flex === "Low" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.dim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(fc.bg, fc.fg)}>{r.flex}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.range}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.give}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>NEGOTIATION PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Preparation wins negotiations.", detail: "The person who prepares more wins. This sheet IS your preparation." },
                { color: "#059669", tip: "Seek win-win, not zero-sum.", detail: "Internal negotiations are not battles. Both sides need to walk away feeling good." },
                { color: "#0EA5E9", tip: "Never negotiate against yourself.", detail: "Make your ask, then wait. Don’t lower your position before they’ve even responded." },
                { color: "#D97706", tip: "Know your BATNA before you start.", detail: "If you don’t know your alternative, you’ll accept a bad deal out of fear." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>TACTICAL MOVES</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Anchor first.", detail: "The first number on the table sets the frame. Make your ask early and let them negotiate down." },
                { color: "#DC2626", tip: "Never give without getting.", detail: "Every concession should come with a reciprocal ask. “I can flex on X if you can give me Y.”" },
                { color: "#EA580C", tip: "Use silence.", detail: "After making your ask, stop talking. Silence makes people uncomfortable and they often concede." },
                { color: "#059669", tip: "Summarize agreements in writing.", detail: "After the negotiation, send a follow-up email confirming what was agreed. Memories differ." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Scale size={11} />Negotiation</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Negotiation Prep Sheet</h2><p className="text-xs font-medium text-violet-600">Strategic &bull; Know Your Position Before You Walk In</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Prepare for any negotiation &mdash; resource requests, scope discussions, timeline talks, vendor negotiations. Know what you want, what they want, where you can flex, and what your alternative is. The PM who walks in without a prep sheet loses.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderPositions()}{renderTradeoffs()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPositions()}{renderTradeoffs()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function NegotiationPrepSheetPage() { return <ThemeProvider><NegotiationContent /></ThemeProvider>; }
