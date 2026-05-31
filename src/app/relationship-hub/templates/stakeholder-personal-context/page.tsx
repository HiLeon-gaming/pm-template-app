"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, UserCircle } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Context", desc: "Scheduling + rapport builders + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Card", desc: "Scheduling context only", icon: AlignJustify },
];

function PersonalContextContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<HTMLDivElement>(null);
  const rapportRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER PERSONAL CONTEXT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; [CONFIDENTIAL] &nbsp;|&nbsp; Professional Use Only</td></tr>
    </tbody></table>
  );

  const renderContext = () => (
    <div ref={ctxRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; PERSONAL &amp; SCHEDULING CONTEXT</td></tr></tbody></table>
      <CopyButton targetRef={ctxRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Professional context that helps you schedule and communicate more effectively. Keep it respectful and factual. This page is confidential &mdash; it&apos;s your private reference, not something you share.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Area</th>
          <th style={S.thPrimary}>Your Notes</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Why This Matters</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Time Zone", value: "[e.g., EST, PST, CET]", why: "Critical for scheduling. Don\u2019t propose meetings during their off-hours." },
            { label: "Typical Work Hours", value: "[e.g., 8 AM\u20136 PM; doesn\u2019t check email after 7 PM]", why: "Respect boundaries. Sending messages late signals poor awareness." },
            { label: "Travel Schedule", value: "[e.g., Travels Mon\u2013Wed most weeks; best reached Thu\u2013Fri]", why: "Know their availability patterns to avoid scheduling friction." },
            { label: "Office vs Remote", value: "[In-office Tu/Th; remote M/W/F]", why: "Affects whether to suggest in-person or video meetings." },
            { label: "Preferred Meeting Days", value: "[e.g., Prefers Tue\u2013Thu; Mondays reserved for planning]", why: "Scheduling on their preferred days increases acceptance rates." },
            { label: "Avoid These Times", value: "[e.g., Fridays after 2 PM; month-end close week]", why: "Avoiding no-go windows shows you respect their calendar." },
            { label: "Communication Style", value: "[e.g., Very formal in writing; casual in person; prefers bullet points]", why: "Matching their style builds rapport and reduces friction." },
            { label: "Cultural Considerations", value: "[Greeting style, formality level, holidays observed]", why: "Small cultural awareness gestures build outsized trust." },
            { label: "Assistant / Gatekeeper", value: "[Name of their EA; best way to get on their calendar]", why: "The EA is your ally. Know them by name." },
            { label: "Professional Interests", value: "[Industry topics, conferences, books they reference]", why: "Great for building rapport in small talk and showing genuine interest." },
            { label: "Notes", value: "[Any other professional context]", why: "Anything that helps you work with them more effectively." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRapport = () => (
    <div ref={rapportRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>RAPPORT-BUILDING INTEL</td></tr></tbody></table>
      <CopyButton targetRef={rapportRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Notes that help you build authentic rapport. These come from natural conversation &mdash; never pry. The best PMs remember what matters to people.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Topic</th>
          <th style={S.thPrimary}>What You Know</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>How to Use This</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "What excites them professionally", what: "[e.g., AI applications in their industry; building high-performing teams]", how: "Share relevant articles or insights. Shows you listen and think of them." },
            { topic: "Recent career milestone", what: "[e.g., Just got promoted to SVP; celebrating 10 years at company]", how: "Congratulate sincerely. Acknowledge their achievements." },
            { topic: "Preferred conversation starters", what: "[e.g., Ask about their team\u2019s latest project; mention industry news]", how: "Use these to warm up meetings naturally." },
            { topic: "Pet peeves (professional)", what: "[e.g., Hates being late; dislikes meetings without agendas; can\u2019t stand jargon]", how: "Avoid these at all costs. Knowing pet peeves prevents accidental friction." },
            { topic: "How they like to be recognized", what: "[e.g., Private thank-you email; public mention in reviews; prefers no fuss]", how: "Recognize them in the way THEY prefer, not the way you prefer." },
            { topic: "[Other context]", what: "[What you\u2019ve learned]", how: "[How to apply it]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.how}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>USING PERSONAL CONTEXT WELL</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "This page is for YOUR reference only.", detail: "Never share or discuss this page with anyone. It\u2019s your private relationship intelligence." },
                { color: "#059669", tip: "Only note things they\u2019ve shared openly.", detail: "If it came up in natural conversation, it\u2019s fair to note. Never research personal details." },
                { color: "#0EA5E9", tip: "Use context naturally, never awkwardly.", detail: "\u201CI saw that article about AI in healthcare and thought of you\u201D is natural. Reciting facts about them is creepy." },
                { color: "#D97706", tip: "Update after every meaningful interaction.", detail: "Add new insights from conversations. Remove anything outdated." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>BOUNDARIES TO RESPECT</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Never note anything about their personal life unless they share it.", detail: "Family, health, finances \u2014 these are off-limits unless they bring them up." },
                { color: "#EA580C", tip: "Don\u2019t over-personalize your approach.", detail: "Using too much personal intel feels calculated. Keep it light and natural." },
                { color: "#D97706", tip: "Delete anything that feels inappropriate.", detail: "If you\u2019d be uncomfortable if they saw this page, remove the entry." },
                { color: "#6366F1", tip: "Focus on professional effectiveness.", detail: "The goal is better communication and scheduling, not surveillance." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><UserCircle size={11} />Confidential</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Personal Context</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; Optional &bull; Professional Use Only</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">An optional, confidential page for professional context that helps you schedule meetings, communicate effectively, and build genuine rapport. Only note things people have shared openly. The goal is better relationships through thoughtful awareness, not surveillance.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderContext()}{renderRapport()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderContext()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderPersonalContextPage() { return <ThemeProvider><PersonalContextContent /></ThemeProvider>; }
