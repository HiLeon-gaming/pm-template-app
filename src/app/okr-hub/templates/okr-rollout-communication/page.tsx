"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Megaphone, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Audience map + messaging + timeline + channels", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Audience + messaging only", icon: AlignJustify },
];

function OKRRolloutContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const audRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OKR ROLLOUT COMMUNICATION PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Who Hears What, When, How</td></tr>
    </tbody></table>
  );

  const renderAud = () => (
    <div ref={audRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>AUDIENCE MAP</td></tr></tbody></table>
      <CopyButton targetRef={audRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Different audiences need different messages. Executives want the &ldquo;so what.&rdquo; Managers want the &ldquo;how.&rdquo; ICs want the &ldquo;what does this mean for me.&rdquo;</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Audience</th>
          <th style={S.thPrimary}>What They Need to Know</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Channel</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>When</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { aud: "Executive Team", what: "Company OKRs, strategic rationale, expected outcomes, resource asks.", ch: "Leadership mtg", when: "Week 0", owner: "[CEO]" },
            { aud: "People Managers", what: "How OKRs cascade to their teams. What's expected of them. How check-ins work.", ch: "Manager session", when: "Week 0", owner: "[COO]" },
            { aud: "Individual Contributors", what: "Company OKRs in plain language. How their work connects. What changes in their day-to-day.", ch: "All-Hands + Slack", when: "Week 1", owner: "[CEO + Mgrs]" },
            { aud: "Board / Investors", what: "Quarterly priorities and expected outcomes. No operational detail.", ch: "Board deck", when: "Week 1", owner: "[CEO / CFO]" },
            { aud: "New Hires", what: "What OKRs are, current quarter priorities, how the rhythm works.", ch: "Onboarding doc", when: "Ongoing", owner: "[HR / Ops]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.aud}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.ch}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMsg = () => (
    <div ref={msgRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>KEY MESSAGES (Use These Across All Channels)</td></tr></tbody></table>
      <CopyButton targetRef={msgRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          { label: "The WHY", msg: "[e.g., \"We're adopting OKRs because we need to focus. Last quarter we had 47 priorities. This quarter we have 3 objectives. Fewer goals = better execution.\"]" },
          { label: "The WHAT", msg: "[e.g., \"Our 3 company objectives this quarter are: 1) Improve Customer Experience, 2) Grow Revenue Pipeline, 3) Build World-Class Team. Each has measurable Key Results.\"]" },
          { label: "The HOW", msg: "[e.g., \"We'll check in weekly (30 min), review monthly (60 min MBR), and score quarterly (90 min QBR). Every team and IC will know exactly how their work connects to these goals.\"]" },
          { label: "What Changes", msg: "[e.g., \"What changes: weekly priorities align to OKRs. What doesn't change: your day-to-day autonomy. OKRs provide direction, not micromanagement.\"]" },
          { label: "How to Succeed", msg: "[e.g., \"Update your KR scores weekly. Flag blockers early. Ask for help before you're stuck. We win together.\"]" },
        ].map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, width: "12%", fontWeight: 700, fontSize: "10px", color: "#7C3AED" }}>{r.label}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.msg}</td>
            </tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderTimeAndTips = () => (
    <div ref={timeRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={timeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}> ROLLOUT TIMELINE</td></tr></thead>
            <tbody>
              {[
                { when: "Wk 0 D1", act: "Leadership alignment — present OKRs, get buy-in.", owner: "[CEO]" },
                { when: "Wk 0 D2", act: "Manager briefing — cascade, check-in expectations.", owner: "[COO]" },
                { when: "Wk 0 D3", act: "Post OKRs in Notion/Confluence. Make visible.", owner: "[Ops]" },
                { when: "Wk 1 D1", act: "All-Hands — CEO presents in plain language.", owner: "[CEO]" },
                { when: "Wk 1 D1", act: "Slack post with summary, links, FAQ.", owner: "[Comms]" },
                { when: "Wk 1 D3", act: "Team sessions — managers walk through OKRs.", owner: "[Mgrs]" },
                { when: "Wk 2", act: "First weekly check-in using new rhythm.", owner: "[Facilitator]" },
                { when: "Ongoing", act: "OKR overview in new hire onboarding.", owner: "[HR]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      <span style={{ fontWeight: 700, color: "#D97706", fontSize: "9px" }}>{r.when}</span> {r.act}<br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.owner}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}> COMMUNICATION TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Say it 7 times, 7 ways.", detail: "Repeat in meetings, Slack, docs, 1:1s, all-hands." },
                { color: "#DC2626", tip: "Address 'what's in it for me?'", detail: "Every IC wants to know: more work or help me succeed?" },
                { color: "#D97706", tip: "Make OKRs visible.", detail: "Post where people look: Slack, team pages, meeting headers." },
                { color: "#7C3AED", tip: "Model the behavior.", detail: "If leadership doesn't update OKRs, nobody else will." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Megaphone size={11} />Comms</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Megaphone size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">OKR Rollout Communication Plan</h2><p className="text-xs font-medium text-teal-600">Who Hears What &bull; When &bull; How</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Plan how to communicate OKRs to every audience. Drives adoption and prevents confusion.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderAud()}{renderMsg()}{renderTimeAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderAud()}{renderMsg()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function OKRRolloutCommunicationPage() { return <ThemeProvider><OKRRolloutContent /></ThemeProvider>; }
