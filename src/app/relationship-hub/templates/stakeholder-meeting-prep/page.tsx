"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, FileCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Brief", desc: "Context + talking points + risks + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Brief", desc: "Context + talking points only", icon: AlignJustify },
];

function PrepContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const talkRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER MEETING PREP BRIEF</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Pre-Meeting Preparation</td></tr>
    </tbody></table>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MEETING CONTEXT &amp; OBJECTIVES</td></tr></tbody></table>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Complete this 24&ndash;48 hours before the meeting. Walking in prepared is the single biggest differentiator between PMs who get results and PMs who waste everyone&apos;s time.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Field</th>
          <th style={S.thPrimary}>Your Notes</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Meeting With", value: "[Name, role, team. Include anyone else attending.]" },
            { label: "Date / Time / Format", value: "[When? In-person / Video / Phone?]" },
            { label: "Purpose", value: "[Why are you meeting? What triggered this? Be specific.]" },
            { label: "Desired Outcome", value: "[What MUST be true when this meeting ends? Decision? Agreement? Information?]" },
            { label: "What They Care About", value: "[Review their profile. What are their priorities, KPIs, concerns right now?]" },
            { label: "Relationship Status", value: "[Where do you stand? Any recent friction? Any wins to acknowledge?]" },
            { label: "Last Interaction Summary", value: "[What did you discuss last time? Any open commitments from either side?]" },
            { label: "Pre-Read / Materials to Send", value: "[Do they need to review anything before the meeting? Send it 48h early.]" },
            { label: "Decisions Needed", value: "[What specific decisions do you need from this meeting? List them.]" },
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

  const renderTalking = () => (
    <div ref={talkRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#0EA5E9")}>TALKING POINTS &amp; KEY MESSAGES</td></tr></tbody></table>
      <CopyButton targetRef={talkRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Prepare 3&ndash;5 key points. Frame everything in terms of what THEY care about. Lead with what matters to them, not what matters to you.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Talking Point</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>How It Connects to Their Priorities</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", point: "[Your first key message — lead with the most important point]", connect: "[Why THEY should care about this]" },
            { n: "2", point: "[Supporting point or data]", connect: "[How it affects their goals/KPIs]" },
            { n: "3", point: "[Risk or concern to raise]", connect: "[Why it matters to them specifically]" },
            { n: "4", point: "[Ask or request]", connect: "[What’s in it for them if they agree]" },
            { n: "5", point: "[Next steps / proposed path forward]", connect: "[How this moves their priorities forward]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.point}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.connect}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>RISKS, LANDMINES &amp; TOUGH QUESTIONS</td></tr></tbody></table>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Anticipate what could go wrong. What tough questions might they ask? What topics are sensitive? Prepare your responses in advance.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "30%" }}>Potential Question / Risk</th>
          <th style={S.thPrimary}>Your Prepared Response</th>
        </tr></thead>
        <tbody>
          {[
            { q: "[What’s the hardest question they could ask?]", a: "[Your prepared, honest answer. Don’t be caught off-guard.]" },
            { q: "[Any sensitive topics to avoid?]", a: "[How you’ll redirect if it comes up]" },
            { q: "[What if they push back on your ask?]", a: "[Your fallback position or compromise]" },
            { q: "[What if they bring up a past issue?]", a: "[How you’ll acknowledge and move forward]" },
            { q: "[What if they say no?]", a: "[Your next step if you don’t get what you want]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.a}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>MEETING PREP BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Prep takes 15 minutes. Winging it wastes 60.", detail: "The ROI on meeting prep is enormous. Do it." },
                { color: "#0EA5E9", tip: "Start with THEIR perspective.", detail: "What do THEY need from this meeting? Lead with that, not your agenda." },
                { color: "#8B5CF6", tip: "Know your desired outcome before you walk in.", detail: "If you don’t know what success looks like, you can’t achieve it." },
                { color: "#D97706", tip: "Send pre-reads 48 hours early.", detail: "Never surprise stakeholders with information in the meeting. Let them process first." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>AFTER THE MEETING</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Send a follow-up within 24 hours.", detail: "Recap decisions, actions, owners, and deadlines. Use the Follow-Up Email Builder." },
                { color: "#DC2626", tip: "Log all commitments immediately.", detail: "Add to your Commitments Log within 5 minutes of the meeting ending." },
                { color: "#EA580C", tip: "Update their profile with new intel.", detail: "Any new information about their priorities, concerns, or preferences." },
                { color: "#059669", tip: "Capture quick notes.", detail: "Use the Conversation Capture template for key takeaways and sentiment." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><FileCheck size={11} />Pre-Meeting</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Meeting Prep Brief</h2><p className="text-xs font-medium text-emerald-600">Pre-Meeting &bull; Walk In Prepared, Walk Out with Results</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">15 minutes of prep saves 60 minutes of wasted meeting time. This brief ensures you walk into every stakeholder meeting knowing the context, objectives, talking points, and potential landmines. The best PMs never wing it.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderContext()}{renderTalking()}{renderRisks()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderContext()}{renderTalking()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderMeetingPrepPage() { return <ThemeProvider><PrepContent /></ThemeProvider>; }
