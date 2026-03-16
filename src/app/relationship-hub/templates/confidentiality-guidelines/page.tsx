"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ShieldCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Rules + classification + do/don\u2019t examples + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Rules", desc: "Golden rules table only", icon: AlignJustify },
];

function ConfidentialityContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>CONFIDENTIALITY &amp; NOTES GUIDELINES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Trust &amp; Professionalism</td></tr>
    </tbody></table>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>GOLDEN RULES FOR STAKEHOLDER NOTES</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Follow these guidelines to keep your notes professional, useful, and safe. If a stakeholder ever saw your notes, you should feel confident &mdash; not embarrassed.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Guideline</th>
          <th style={S.thPrimary}>Why It Matters</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Good vs Bad Example</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", rule: "Write as if the stakeholder could read your notes tomorrow.", why: "Keeps language professional and factual, not emotional or gossipy.", ex: "\u2705 \u201CDeclined proposal; cited budget timing.\u201D \u274C \u201CShot us down again, typical.\u201D" },
            { n: "2", rule: "Stick to observable facts, not personal judgments.", why: "Facts are defensible. Judgments create risk and erode trust if discovered.", ex: "\u2705 \u201CRescheduled 3 times this month.\u201D \u274C \u201CDoesn\u2019t care about our project.\u201D" },
            { n: "3", rule: "Mark sensitive notes clearly with [CONFIDENTIAL] at the top.", why: "Anyone scanning your notes instantly knows to handle that page carefully.", ex: "\u2705 \u201C[CONFIDENTIAL] Org restructure may affect Sarah\u2019s team.\u201D" },
            { n: "4", rule: "Never store passwords, SSNs, or financial account numbers here.", why: "OneNote/Notion are not secure vaults. Use company-approved tools for PII.", ex: "\u2705 Contact details only. \u274C Credit card numbers, SSNs, salaries." },
            { n: "5", rule: "Store notes in a private section or password-protected notebook.", why: "If your notebook is shared, sensitive notes could be seen by anyone on the team.", ex: "\u2705 Private \u201CStakeholder Notes\u201D section. \u274C Shared team wiki." },
            { n: "6", rule: "Review monthly. Delete anything no longer needed.", why: "Stale sensitive notes are a liability, not an asset. Old context can mislead.", ex: "\u2705 Monthly cleanup in your Relationship Review. \u274C Notes from 2 years ago still sitting there." },
            { n: "7", rule: "Use Archive/Closeout Template when stakeholders transition out.", why: "Clean handoffs protect relationships and institutional knowledge.", ex: "\u2705 Formal closeout with transition notes. \u274C Just stop updating the profile." },
            { n: "8", rule: "Separate observation from interpretation.", why: "Keep raw notes factual. Add your interpretation in a clearly labeled section.", ex: "\u2705 \u201CFact: Missed 3 meetings. My read: likely overloaded.\u201D" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.rule}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderClassification = () => (
    <div ref={classRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#6366F1")}>CLASSIFICATION GUIDE &mdash; WHAT GOES WHERE</div>
      <CopyButton targetRef={classRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Not all notes belong in the same place. Use this guide to decide where each type of information should live for maximum safety and usefulness.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Note Type</th>
          <th style={S.thPrimary}>Where to Store</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Sensitivity</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Example</th>
        </tr></thead>
        <tbody>
          {[
            { type: "General context (goals, preferences, communication style)", where: "Stakeholder Profile (standard section)", sens: "Low", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ex: "\u201CPrefers email over Slack; values data-driven arguments; avoids Monday meetings.\u201D" },
            { type: "Meeting notes, decisions, and action items", where: "Meeting History Index + Meeting Notes page", sens: "Low", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, ex: "\u201CAgreed to fund Phase 2 if ROI exceeds 15%. Action: send analysis by Friday.\u201D" },
            { type: "Relationship friction, political dynamics, or risk", where: "Stakeholder Risk Notes [mark CONFIDENTIAL]", sens: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, ex: "\u201CTension between VP Product and VP Sales over roadmap priorities.\u201D" },
            { type: "Personal context (time zone, travel, work hours)", where: "Stakeholder Personal Context [mark CONFIDENTIAL]", sens: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ex: "\u201CTravels Mon\u2013Wed; best meetings Thu\u2013Fri AM EST.\u201D" },
            { type: "Trust observations and relationship strategy", where: "Trust Builders & Breakers + Relationship Plan", sens: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, ex: "\u201CValues being consulted before decisions go to leadership.\u201D" },
            { type: "Compensation, HR issues, or legal matters", where: "DO NOT store here. Use company HR/legal tools only.", sens: "Critical", sBg: C.badgeRedBg, sFg: C.badgeRedFg, ex: "N/A \u2014 Never put this in OneNote or personal notes." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.where}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.sens}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTipsPanel = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>DO THIS</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Use factual, neutral language.", detail: "Describe what happened, not how you feel about it." },
                { color: "#0EA5E9", tip: "Date-stamp sensitive observations.", detail: "Context changes. A note from 6 months ago may no longer be accurate." },
                { color: "#8B5CF6", tip: "Label your interpretation.", detail: "\u201CMy read:\u201D or \u201CInterpretation:\u201D makes it clear what\u2019s fact vs. opinion." },
                { color: "#D97706", tip: "Keep a clean handoff document.", detail: "If you leave the role, your successor should be able to build on your notes." },
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>NEVER DO THIS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Write emotional or judgmental notes.", detail: "\u201CHe\u2019s impossible\u201D is unprofessional and could damage YOU if discovered." },
                { color: "#EA580C", tip: "Store notes in shared channels.", detail: "Slack channels, shared drives, or public wikis are NOT for sensitive stakeholder context." },
                { color: "#D97706", tip: "Keep notes you no longer need.", detail: "Old sensitive notes are a liability. If it\u2019s no longer relevant, delete it." },
                { color: "#6366F1", tip: "Gossip in written form.", detail: "If you wouldn\u2019t say it to their face, don\u2019t write it in your notes." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><ShieldCheck size={11} />Guidelines</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Handshake size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Confidentiality &amp; Notes Guidelines</h2><p className="text-xs font-medium text-rose-600">Trust &amp; Professionalism &bull; How to Store Sensitive Notes Responsibly</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your stakeholder notes contain valuable context &mdash; and potentially sensitive information. This guide ensures your notes are professional, safe, and useful. Follow these rules and you&apos;ll never be caught off guard.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderRules()}{renderClassification()}{renderTipsPanel()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRules()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ConfidentialityGuidelinesPage() { return <ThemeProvider><ConfidentialityContent /></ThemeProvider>; }
