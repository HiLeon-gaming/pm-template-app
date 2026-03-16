"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, MessageCircle } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Capture + actions + follow-up + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Capture + actions only", icon: AlignJustify },
];

function CaptureContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>CONVERSATION CAPTURE (QUICK NOTES)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; After-Call Notes</td></tr>
    </tbody></table>
  );

  const renderCapture = () => (
    <div ref={captureRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>CONVERSATION DETAILS</div>
      <CopyButton targetRef={captureRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Fill this out within 5 minutes of ending the conversation. Memory fades fast. Capture the essentials now; you can polish later. The goal is speed, not perfection.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Field</th>
          <th style={S.thPrimary}>Your Notes</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Date & Time", value: "[When did the conversation happen?]" },
            { label: "With Whom", value: "[Name, role, team]" },
            { label: "Format", value: "[In-person / Video / Phone / Slack / Email / Hallway chat]" },
            { label: "Purpose / Context", value: "[Why did this conversation happen? What prompted it?]" },
            { label: "Key Points Discussed", value: "[Bullet the 3\u20135 most important things discussed. Don\u2019t write a transcript.]" },
            { label: "Decisions Made", value: "[What was decided? By whom? Any conditions or caveats?]" },
            { label: "Commitments Made (By You)", value: "[What did you promise to do? By when?]" },
            { label: "Commitments Made (By Them)", value: "[What did they promise to do? By when?]" },
            { label: "Mood / Sentiment", value: "[How did they seem? Positive? Frustrated? Neutral? Concerned? Enthusiastic?]" },
            { label: "Surprises or New Intel", value: "[Anything you didn\u2019t expect? New information? Political dynamics? Priorities shifting?]" },
            { label: "What I Should Have Asked", value: "[Anything you forgot to cover or wish you\u2019d asked?]" },
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

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>IMMEDIATE ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What do you need to do RIGHT NOW as a result of this conversation? Log commitments, send follow-ups, update trackers.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>By When</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", action: "[Add commitments to your Commitments Log]", when: "Now", done: "\u2610" },
            { n: "2", action: "[Send follow-up email / thank-you note if needed]", when: "Today", done: "\u2610" },
            { n: "3", action: "[Update stakeholder profile with new intel]", when: "Today", done: "\u2610" },
            { n: "4", action: "[Add any new follow-ups to your Follow-Up Queue]", when: "Now", done: "\u2610" },
            { n: "5", action: "[Brief your manager or team if needed]", when: "[When]", done: "\u2610" },
            { n: "6", action: "[Other action]", when: "[When]", done: "\u2610" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FFF7ED", color: "#EA580C", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #EA580C" }}>QUICK CAPTURE RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#EA580C", tip: "Capture within 5 minutes.", detail: "After 30 minutes, you\u2019ll forget 50% of what was said. After 24 hours, 80%." },
                { color: "#059669", tip: "Bullet points, not paragraphs.", detail: "Speed over polish. You can clean it up later if needed." },
                { color: "#0EA5E9", tip: "Focus on decisions and commitments.", detail: "The discussion is context. Decisions and commitments are the output that matters." },
                { color: "#D97706", tip: "Note the sentiment, not just the words.", detail: "HOW they said it matters as much as WHAT they said." },
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>AFTER CAPTURING</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Transfer commitments to your Commitments Log.", detail: "This note is temporary. Your log is permanent. Move the commitments." },
                { color: "#0EA5E9", tip: "Update the stakeholder\u2019s profile.", detail: "New intel about their priorities, concerns, or preferences? Update their profile page." },
                { color: "#D97706", tip: "Add follow-ups to your queue.", detail: "If you promised something, it needs to be in your Follow-Up Queue with a date." },
                { color: "#DC2626", tip: "Link this note to their Meeting History.", detail: "Add a line to their Meeting History Index so you can find this note later." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><MessageCircle size={11} />Quick Notes</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Handshake size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Conversation Capture (Quick Notes)</h2><p className="text-xs font-medium text-orange-600">After-Call Notes &bull; Capture in 5 Minutes</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your super-fast after-call notes page. Fill this out within 5 minutes of ending any important conversation. Capture decisions, commitments, sentiment, and surprises before they fade. Speed over polish &mdash; you can clean up later.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderCapture()}{renderActions()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCapture()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ConversationCapturePage() { return <ThemeProvider><CaptureContent /></ThemeProvider>; }
