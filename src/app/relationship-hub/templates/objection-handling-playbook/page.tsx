"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ShieldQuestion } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Playbook", desc: "Objections + responses + evidence + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Objections + responses only", icon: AlignJustify },
];

function ObjectionContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const playbookRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OBJECTION HANDLING PLAYBOOK</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Prepared Responses</td></tr>
    </tbody></table>
  );

  const renderPlaybook = () => (
    <div ref={playbookRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>OBJECTION &amp; RESPONSE MATRIX</div>
      <CopyButton targetRef={playbookRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Document every objection you&apos;ve heard (or expect to hear) and prepare your response in advance. Being caught off-guard by a predictable objection is a failure of preparation, not a failure of persuasion.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Objection</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>From Whom</th>
          <th style={S.thPrimary}>Your Response</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Supporting Evidence</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", obj: "\"We don\u2019t have the budget for this.\"", from: "Finance / CFO", resp: "\"I understand budget is tight. Here\u2019s the cost of NOT doing this: [impact data]. I\u2019ve prepared a lean option at 60% of the cost that still delivers the core value.\"", evidence: "ROI analysis, cost-of-delay model" },
            { n: "2", obj: "\"This isn\u2019t a priority right now.\"", from: "Sponsor / Leadership", resp: "\"I hear you. Can we align on WHEN it becomes a priority? If we wait until Q3, we risk [specific impact]. What would need to be true for this to move up?\"", evidence: "Timeline impact, competitor data" },
            { n: "3", obj: "\"We tried this before and it failed.\"", from: "Any stakeholder", resp: "\"You\u2019re right, and I\u2019ve studied what happened. Here\u2019s what\u2019s different this time: [3 specific differences]. We\u2019ve addressed the root causes of the previous failure.\"", evidence: "Post-mortem from previous attempt" },
            { n: "4", obj: "\"My team doesn\u2019t have capacity.\"", from: "Engineering / Ops", resp: "\"I understand. Could we look at what we could defer to create capacity? Alternatively, here\u2019s a phased approach that only needs [X hours/week] from your team initially.\"", evidence: "Phased plan, resource estimate" },
            { n: "5", obj: "\"I need to think about it.\"", from: "Any decision-maker", resp: "\"Absolutely. What specific concerns can I address to help? I\u2019ll follow up with [supporting info] by [date]. Can we reconnect [specific date] to discuss?\"", evidence: "Follow-up materials ready" },
            { n: "6", obj: "[Common objection you hear]", from: "[Who says this]", resp: "[Your prepared, thoughtful response]", evidence: "[Data or evidence that supports your response]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700, color: "#DC2626" }}>{r.obj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.resp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.evidence}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>OBJECTION ANTICIPATION CHECKLIST</div>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Before any important meeting or presentation, run through this checklist to anticipate objections.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>\u2610</th>
          <th style={S.thPrimary}>Pre-Meeting Objection Prep</th>
        </tr></thead>
        <tbody>
          {[
            "What\u2019s the hardest question someone could ask? Am I prepared for it?",
            "Who in the room is most likely to push back? What\u2019s their concern?",
            "Do I have data/evidence ready for my top 3 objections?",
            "Have I prepared a \u201Clean\u201D or \u201Cphased\u201D alternative if they reject the full proposal?",
            "Am I ready to say \u201CI don\u2019t know, I\u2019ll find out\u201D if I genuinely don\u2019t have the answer?",
            "Have I validated my responses with a trusted colleague or advisor?",
          ].map((item, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>\u2610</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{item}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>OBJECTION HANDLING PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Listen fully before responding.", detail: "Don\u2019t interrupt. Let them finish. Then acknowledge before you counter." },
                { color: "#059669", tip: "Acknowledge, don\u2019t dismiss.", detail: "\u201CThat\u2019s a fair concern\u201D > \u201CActually, that\u2019s not right.\u201D Validate first, then redirect." },
                { color: "#0EA5E9", tip: "Use \u201CAnd\u201D instead of \u201CBut.\u201D", detail: "\u201CI hear your concern AND here\u2019s what we\u2019ve done to address it\u201D is more collaborative." },
                { color: "#D97706", tip: "Have data ready, but lead with empathy.", detail: "Data wins arguments. Empathy wins relationships. You need both." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>THINGS TO NEVER DO</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Never get defensive.", detail: "Defensiveness signals insecurity. Stay calm, stay curious, stay professional." },
                { color: "#EA580C", tip: "Never make up an answer.", detail: "If you don\u2019t know, say so. \u201CGreat question. Let me get you the accurate data by tomorrow.\u201D" },
                { color: "#D97706", tip: "Never dismiss their concern publicly.", detail: "Even if the objection is wrong, dismissing it in front of others damages the relationship." },
                { color: "#6366F1", tip: "Never argue past the close.", detail: "If they agree, stop talking. Over-explaining after agreement reopens objections." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><ShieldQuestion size={11} />Playbook</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Objection Handling Playbook</h2><p className="text-xs font-medium text-violet-600">Prepared Responses &bull; Never Be Caught Off-Guard</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document every objection you&apos;ve heard (or expect to hear) and prepare your response in advance with supporting evidence. Being caught off-guard by a predictable objection is a failure of preparation, not persuasion.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderPlaybook()}{renderPrep()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPlaybook()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ObjectionHandlingPlaybookPage() { return <ThemeProvider><ObjectionContent /></ThemeProvider>; }
