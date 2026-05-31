"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ShieldAlert } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Strategy", desc: "Assessment + approach + escalation + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Assessment + approach only", icon: AlignJustify },
];

function BlockerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const assessRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const escalateRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#DC2626";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>BLOCKER / RESISTANCE STRATEGY PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Difficult Stakeholder Management</td></tr>
    </tbody></table>
  );

  const renderAssessment = () => (
    <div ref={assessRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; RESISTANCE ASSESSMENT</td></tr></tbody></table>
      <CopyButton targetRef={assessRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Before you can address resistance, you need to understand it. Most blockers aren&apos;t malicious &mdash; they have legitimate concerns, competing priorities, or past experiences that drive their behavior. Start by understanding, not judging.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Assessment Area</th>
          <th style={S.thPrimary}>Your Analysis</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Who Is Resisting?", value: "[Name, role, team, level of influence]" },
            { label: "What Are They Blocking?", value: "[Specific decision, resource, approval, or process they’re impeding]" },
            { label: "Why Are They Resisting?", value: "[Fear of change? Loss of control? Competing priority? Bad past experience? Legitimate concern? Don’t know yet?]" },
            { label: "Is Their Concern Valid?", value: "[Honestly assess: are they raising something real that you’re ignoring? Sometimes the “blocker” is right.]" },
            { label: "Resistance Type", value: "[Active opposition / Passive resistance / Indifference / Uninformed skepticism]" },
            { label: "Impact If Unresolved", value: "[What happens if you don’t address this? Timeline delay? Budget risk? Team morale? Political damage?]" },
            { label: "Urgency", value: "[Must resolve this week / This month / Can manage around it for now]" },
            { label: "Relationship History", value: "[Is this a new friction or a long-standing dynamic? Have you had conflict before?]" },
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

  const renderApproach = () => (
    <div ref={approachRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>ENGAGEMENT APPROACH</td></tr></tbody></table>
      <CopyButton targetRef={approachRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Choose your approach based on the type and severity of resistance. Always start with the lightest touch &mdash; escalate only if necessary.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Strategy Element</th>
          <th style={S.thPrimary}>Your Plan</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Opening Conversation Plan", value: "[How will you open the dialogue? Lead with curiosity, not accusations. “Help me understand your concerns about...”]" },
            { label: "What You’ll Listen For", value: "[Their real objection (not the surface one). What they need to feel heard. What would make this work for THEM.]" },
            { label: "What You Can Offer", value: "[Compromise, involvement, recognition, addressing their concern, adjusting scope/timeline]" },
            { label: "What You Cannot Compromise On", value: "[Your non-negotiables. Know these BEFORE the conversation.]" },
            { label: "Who Can Help Bridge", value: "[A mutual connection? Their manager? Your sponsor? Someone they trust who supports your work?]" },
            { label: "Desired Outcome", value: "[What does “success” look like? Full support? Neutrality? Reduced opposition? Specific action?]" },
            { label: "Timeline for Resolution", value: "[When do you need this resolved? What’s your deadline before escalation becomes necessary?]" },
            { label: "Fallback Plan", value: "[If the conversation fails, what’s Plan B? Can you work around them? Do you escalate?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escalateRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>ESCALATION FRAMEWORK</td></tr></tbody></table>
      <CopyButton targetRef={escalateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Escalation is a last resort, not a first move. But when direct engagement fails, you need a clear plan. Escalation done well preserves relationships; done poorly, it creates enemies.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Step</th>
          <th style={S.thPrimary}>Details</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", step: "Direct conversation", detail: "Have an honest, private conversation. Lead with curiosity and respect.", status: "[Done/Pending]" },
            { n: "2", step: "Second attempt with new info", detail: "If the first attempt failed, bring new data, a different framing, or address their concern more specifically.", status: "[Done/Pending]" },
            { n: "3", step: "Involve a mediator", detail: "Ask a mutual contact or their trusted colleague to help bridge the gap.", status: "[Done/Pending]" },
            { n: "4", step: "Escalate to your manager", detail: "Brief your manager on the situation. Get their advice and alignment before going further.", status: "[Done/Pending]" },
            { n: "5", step: "Formal escalation", detail: "If all else fails, escalate through appropriate channels with documentation and a clear ask.", status: "[Done/Pending]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#6366F1" }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.detail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const, color: C.textMuted }}>{r.status}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>RESISTANCE MANAGEMENT PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Assume positive intent first.", detail: "Most people aren’t trying to sabotage you. They have concerns, constraints, or fears you don’t see yet." },
                { color: "#059669", tip: "Listen before you persuade.", detail: "Understanding their position fully before responding shows respect and often reveals the real issue." },
                { color: "#0EA5E9", tip: "Address the concern, not the person.", detail: "Never make it personal. “This decision is being blocked” not “You are blocking this.”" },
                { color: "#D97706", tip: "Document everything privately.", detail: "Keep notes of all conversations, commitments, and agreements. You may need them later." },
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
                { color: "#DC2626", tip: "Never go around them without trying direct first.", detail: "Going over someone’s head without talking to them first creates permanent enemies." },
                { color: "#EA580C", tip: "Never badmouth them to others.", detail: "It always gets back to them. Always. And it destroys your credibility too." },
                { color: "#D97706", tip: "Never escalate without documentation.", detail: "If you escalate, have facts, dates, and specifics. “They’re being difficult” isn’t enough." },
                { color: "#6366F1", tip: "Never burn the bridge entirely.", detail: "Today’s blocker might be next quarter’s ally. Keep the door open for future collaboration." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><ShieldAlert size={11} />Sensitive</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Handshake size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Blocker / Resistance Strategy Plan</h2><p className="text-xs font-medium text-red-600">Handle Difficult Stakeholders Professionally</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Every PM eventually faces a stakeholder who resists, blocks, or opposes their work. This plan helps you understand the resistance, develop a professional engagement strategy, and escalate only when necessary. The goal is resolution, not victory.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderAssessment()}{renderApproach()}{renderEscalation()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderAssessment()}{renderApproach()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function BlockerResistanceStrategyPage() { return <ThemeProvider><BlockerContent /></ThemeProvider>; }
