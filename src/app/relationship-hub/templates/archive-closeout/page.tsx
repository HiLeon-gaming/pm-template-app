"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Archive } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Closeout", desc: "Transition notes + handoff + lessons + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Closeout", desc: "Transition notes + handoff only", icon: AlignJustify },
];

function ArchiveContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const transRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ARCHIVE / CLOSEOUT TEMPLATE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Clean Handoff</td></tr>
    </tbody></table>
  );

  const renderTransition = () => (
    <div ref={transRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>TRANSITION CONTEXT</td></tr></tbody></table>
      <CopyButton targetRef={transRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>When a stakeholder changes roles, you move to a new project, or ownership transfers &mdash; don&apos;t let institutional knowledge disappear. This template captures everything the next person needs to know about each stakeholder relationship. A clean handoff protects the relationship and the project.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "Transition Type", value: "[Stakeholder role change / PM handoff / Project closeout / Re-org]" },
            { label: "Effective Date", value: "[When does the transition happen?]" },
            { label: "Outgoing Owner", value: "[Your name \u2014 who currently manages these relationships]" },
            { label: "Incoming Owner", value: "[New PM / new stakeholder contact / TBD]" },
            { label: "Handoff Meeting Date", value: "[When will you brief the incoming owner?]" },
            { label: "Critical Context", value: "[What\u2019s the ONE thing the incoming person MUST know to avoid a disaster?]" },
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

  const renderHandoff = () => (
    <div ref={handoffRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>STAKEHOLDER HANDOFF NOTES</td></tr></tbody></table>
      <CopyButton targetRef={handoffRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>For each key stakeholder, capture the essential context the next person needs. Don&apos;t just list facts &mdash; share the nuance. What works with this person? What to avoid? What promises were made?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Relationship Summary</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>What Works With Them</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>What to Avoid</th>
          <th style={S.thPrimary}>Open Commitments</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", health: "Green", summary: "Strong sponsor. Monthly 1:1s. Trusts your judgment. Champions project in leadership.", works: "BLUF updates. Pre-brief before SteerCo. Respect her time.", avoid: "Surprises. Long emails. Going around her.", commits: "Committed to Q2 budget. Expects monthly update." },
            { name: "David Park", health: "Amber", summary: "Improving. Was Red 3 months ago. Monthly budget updates rebuilt trust.", works: "Numbers first. ROI framing. Proactive updates.", avoid: "Surprises about money. Vague timelines.", commits: "Approved Q2 budget with condition of monthly reporting." },
            { name: "James Wu", health: "Red", summary: "Disengaged. API dependency overdue. Feels deprioritized. Escalation planned.", works: "Technical specifics. Working sessions > status meetings.", avoid: "Vague asks. Ignoring his priorities. CC\u2019ing his manager without warning.", commits: "API delivery promised for sprint 7. Currently at risk." },
            { name: "Sarah Chen", health: "Amber", summary: "Feels sidelined. Needs re-engagement in Phase 2 planning.", works: "Inclusion in planning. Asking for input early.", avoid: "Making decisions without consulting her. Last-minute requests.", commits: "Expects involvement in go-to-market planning." },
            { name: "[Stakeholder]", health: "[RAG]", summary: "[Current state of relationship]", works: "[Communication style that works]", avoid: "[Landmines and sensitivities]", commits: "[Outstanding promises or commitments]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const hc = r.health === "Green" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.health === "Amber" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.health === "Red" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(hc.bg, hc.fg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.summary}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#059669" }}>{r.works}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626" }}>{r.avoid}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.commits}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderLessons = () => (
    <div ref={lessonsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>LESSONS &amp; ADVICE FOR THE NEXT PERSON</td></tr></tbody></table>
      <CopyButton targetRef={lessonsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Topic</th>
          <th style={S.thPrimary}>Lesson / Advice</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", topic: "Sponsor Management", advice: "Maria is your most important relationship. Pre-brief her before every SteerCo. Never let her be surprised. She will champion you if you keep her informed." },
            { n: "2", topic: "Finance", advice: "David was burned by a previous PM who hid budget issues. Proactive monthly updates are non-negotiable. Show him the numbers before he asks." },
            { n: "3", topic: "Engineering", advice: "James responds to technical specifics, not status meetings. Schedule working sessions, not check-ins. Respect his team\u2019s sprint process." },
            { n: "4", topic: "Communication Cadence", advice: "Weekly team standup, bi-weekly sponsor 1:1, monthly SteerCo, monthly finance update. Don\u2019t let any of these slip." },
            { n: "5", topic: "Political Dynamics", advice: "Maria and David have a complex relationship. Don\u2019t triangulate. Keep your updates consistent to both." },
            { n: "6", topic: "[Topic]", advice: "[What would you tell the next person?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px", color: "#059669" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.advice}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>HANDOFF CHECKLIST</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Brief the incoming person live, not just in writing.", detail: "Written notes miss nuance. Schedule a 1-hour handoff meeting minimum." },
                { color: "#059669", tip: "Introduce them to key stakeholders personally.", detail: "A warm introduction from you carries trust. A cold email doesn\u2019t." },
                { color: "#0EA5E9", tip: "Transfer all open commitments in writing.", detail: "Every promise you made must be documented and handed over. Nothing falls through." },
                { color: "#DC2626", tip: "Flag the landmines.", detail: "What are the sensitive topics? Past conflicts? Broken promises? Don\u2019t let the next person step on them." },
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>TRANSITION TIMELINE</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Week 1: Write this document.", detail: "Capture everything while it\u2019s fresh. Don\u2019t wait until your last day." },
                { color: "#0EA5E9", tip: "Week 2: Handoff meeting with incoming owner.", detail: "Walk through every stakeholder. Answer questions. Share the unwritten rules." },
                { color: "#6366F1", tip: "Week 3: Joint meetings with key stakeholders.", detail: "Introduce the new person in meetings. Let them observe your style." },
                { color: "#D97706", tip: "Week 4: Shadow period. Then clean handoff.", detail: "Be available for questions but let them own the relationships." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Archive size={11} />Closeout</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Handshake size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Archive / Closeout Template</h2><p className="text-xs font-medium text-amber-600">Clean Handoff &bull; Transition Notes &bull; Protect Institutional Knowledge</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">When stakeholders change roles, you move to a new project, or ownership transfers &mdash; don&apos;t let institutional knowledge disappear. This template captures everything the next person needs: relationship context, what works, what to avoid, open commitments, and lessons learned.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderTransition()}{renderHandoff()}{renderLessons()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTransition()}{renderHandoff()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ArchiveCloseoutPage() { return <ThemeProvider><ArchiveContent /></ThemeProvider>; }
