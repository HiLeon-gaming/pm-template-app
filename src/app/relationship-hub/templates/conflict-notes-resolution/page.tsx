"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Swords } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Context + resolution plan + conversation prep + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Context + resolution plan only", icon: AlignJustify },
];

function ConflictContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>CONFLICT NOTES &amp; RESOLUTION PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Confidential</td></tr>
    </tbody></table>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>CONFLICT CONTEXT</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Document the situation clearly and factually. Separate facts from feelings. This helps you prepare for a productive resolution conversation.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Area</th>
          <th style={S.thPrimary}>Your Notes</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Who Is Involved?", value: "[Names, roles, teams. Include anyone directly or indirectly involved.]" },
            { label: "What Happened?", value: "[Facts only. What specifically occurred? When? Where? Be precise, not emotional.]" },
            { label: "What\u2019s the Disagreement About?", value: "[The core issue. Is it about priorities? Resources? Approach? Communication? Respect?]" },
            { label: "Your Perspective", value: "[How you see the situation. What you believe is right and why.]" },
            { label: "Their Likely Perspective", value: "[Try to see it from their side. What might they believe is right and why?]" },
            { label: "Impact If Unresolved", value: "[What happens if you don\u2019t resolve this? Project delay? Team morale? Reputation damage?]" },
            { label: "History / Context", value: "[Is this a new conflict or a recurring pattern? Any relevant backstory?]" },
            { label: "Your Emotional State", value: "[Be honest. Are you angry? Hurt? Frustrated? Anxious? This affects how you show up.]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPlan = () => (
    <div ref={planRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>RESOLUTION PLAN</div>
      <CopyButton targetRef={planRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Plan your approach before having the conversation. Going in prepared dramatically increases the chances of a productive outcome.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Planning Element</th>
          <th style={S.thPrimary}>Your Plan</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Desired Outcome", value: "[What does \u201Csuccess\u201D look like? Agreement? Compromise? Cleared air? Specific action?]" },
            { label: "What You Want", value: "[Be specific. What concrete change or agreement are you seeking?]" },
            { label: "What You Can Offer", value: "[What are you willing to compromise on? What can you give to get what you need?]" },
            { label: "What You Cannot Compromise On", value: "[Your non-negotiables. Know these before the conversation starts.]" },
            { label: "Opening Statement", value: "[Draft your opening line. Lead with curiosity and collaboration, not accusation.]" },
            { label: "Key Points to Make", value: "[3\u20134 points max. Focus on impact and solutions, not blame.]" },
            { label: "Questions to Ask Them", value: "[What do you need to understand from their side?]" },
            { label: "Fallback Position", value: "[If you can\u2019t reach agreement, what\u2019s Plan B?]" },
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

  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>POST-CONVERSATION NOTES</div>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Fill this out immediately after the resolution conversation. What was agreed? What changed? What are the next steps?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Area</th>
          <th style={S.thPrimary}>Your Notes</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Date of Conversation", value: "[When did the resolution conversation happen?]" },
            { label: "What Was Agreed?", value: "[Specific agreements, decisions, or compromises made.]" },
            { label: "What Changed?", value: "[Did their position shift? Did yours? What new information emerged?]" },
            { label: "Commitments Made", value: "[What did each party commit to doing? By when?]" },
            { label: "Remaining Tension", value: "[Is anything still unresolved? Any lingering friction?]" },
            { label: "Follow-Up Needed", value: "[When will you check in to confirm the resolution is holding?]" },
            { label: "Lessons Learned", value: "[What would you do differently next time? What worked well?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>CONFLICT RESOLUTION PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Address it, don\u2019t avoid it.", detail: "Unresolved conflict festers and gets worse. Have the conversation sooner, not later." },
                { color: "#EA580C", tip: "Attack the problem, not the person.", detail: "\u201CThis decision is causing a delay\u201D not \u201CYou are causing a delay.\u201D" },
                { color: "#059669", tip: "Listen more than you talk.", detail: "Understanding their position fully often reveals the real issue, which may not be what you think." },
                { color: "#D97706", tip: "Focus on interests, not positions.", detail: "Positions are rigid. Interests are flexible. Find the underlying need and solve for that." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>THINGS TO NEVER DO IN CONFLICT</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Never have the conversation via email.", detail: "Tone is lost in text. Hard conversations deserve face-to-face (or at minimum, video)." },
                { color: "#EA580C", tip: "Never bring an audience.", detail: "Resolving conflict in public humiliates people. Have the conversation privately first." },
                { color: "#D97706", tip: "Never use \u201Calways\u201D or \u201Cnever.\u201D", detail: "These absolutes feel like attacks. Use specifics: \u201CIn the March 5th meeting...\u201D" },
                { color: "#6366F1", tip: "Never leave without clear next steps.", detail: "A conversation without agreed actions is just venting. End with specifics." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Swords size={11} />Confidential</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Conflict Notes &amp; Resolution Plan</h2><p className="text-xs font-medium text-red-600">Confidential &bull; Prepare &bull; Resolve &bull; Learn</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">When conflict arises, this template helps you document the situation factually, plan your resolution approach, and capture the outcome. Going in prepared turns a difficult conversation into a productive one. Remember: the goal is resolution, not winning.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderContext()}{renderPlan()}{renderPrep()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderContext()}{renderPlan()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ConflictNotesResolutionPage() { return <ThemeProvider><ConflictContent /></ThemeProvider>; }
